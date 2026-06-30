import { json } from "express";
import { Quiz }  from "../models/quiz.model.js"
export const checkQuiz = async(req,res)=>{

    const genAi = new GoogleGenerativeAI(ENV.GEMINI_API_KEY)
    const model = genAi.GenerativeModel({model:'gemini-3.5-flash'})
    try {
        const moduleId = req.params.id;
        const quiz = await Quiz.findOne({
            userId:req.user._id,
            moduleId
        })
        return res.status(200).json({
            success: true,
            hasQuiz: quiz,
            quiz: quiz|| null
        })

    } catch (error) {
        console.log(error, "from check quiz")
        return res.status(500).json({ success: false, error: 'Server error' })
        
    }
}

export const generateQuiz = async (req, res) => {
    try {
        const { moduleId, content } = req.body;
        if (!moduleId || !content) {
            return res.status(401).json({ message: "Something is missing" });
        }

        const existingQuiz = await Quiz.findOne({
            userId: req.user._1d,
            moduleId
        });

        if (existingQuiz && existingQuiz.questions.length > 0) {
            return res.status(401).json({ message: "You already generated quiz for module" });
        }

        const newQuiz = await Quiz.create({
            userId: req.user._id,
            moduleId
        });

        const genAi = new GoogleGenerativeAI(ENV.GEMINI_API_KEY);
        const model = genAi.GenerativeModel({ model: 'gemini-3.5-flash' });

        const prompt = `Generate 10 technical questions for ${content}. Each question should be multiple choice with 4 options. Return the response in this JSON format, no additional text:
{
  "questions": [
    {
      "question": "string",
      "options": ["string", "string", "string", "string"],
      "correctOption": "string",
      "explanation": "string"
    }
  ]
}`;

        const result = await model.generateContent(prompt);
        const response = result.response;
        const text = response.text();
        const cleanText = text
            .replace(/'''json/gi, "")
            .replace(/'''/g, "")
            .trim();

        let parsed;
        try {
            parsed = JSON.parse(cleanText);
        } catch (error) {
            console.log("failed to parsed gemini object ", error);
            await Quiz.findByIdAndDelete(newQuiz._id);
            return res.status(500).json({ message: "Quiz cannot be generated" });
        }

        const generateQuestion = parsed.questions || [];
        if (!Array.isArray(generateQuestion) || generateQuestion.length === 0) {
            await Quiz.findByIdAndDelete(newQuiz._id);
            return res.status(500).json({ message: "No question is generated" });
        }

        const createdQuestion = [];
        for (const q of generateQuestion) {
            const doc = await Questions.Create({
                quizID: newQuiz._id,
                content: q.question,
                options: q.options,
                correctOptions: q.correctOptions,
                explanation: q.explanation
            });
            createdQuestion.push(doc);
        }

        const ids = createdQuestion.map((q) => q._id);
        await Quiz.findByIdAndUpdate(
            newQuiz._id,
            { $push: { questions: { $each: ids } } },
            { new: true }
        );

        await Modules.findByIdAndUpdate(
            moduleId,
            { quiz: newQuiz._id },
            { new: true }
        );

        return res.status(201).json({ message: "Quiz generated" });
    } catch (error) {
        console.log(error, 'from generateQuiz');
        return res.status(500).json({ success: false, error: 'Server error' });
    }
}
export const getQuiz = async (req, res) => {
    try {
        const quizId =  req.params.id;
        if (!quizId) {
            return res.status(401).json({message:"Quiz not found"})
            
        }
        const quiz = await Quiz.findOne({
            _id : quizId,
            userId:req.user._id
        }).populate("questions")
        if (!quiz) {
            return res.status(401).json({message:"Quiz not found"})
        }
        return res.status(201).json({success:true,quiz})
    } catch (error) {
        console.log(error)
        
    }
    
}