import cloudinary from "../config/cloudinary.js";
import { Course } from "../models/course.model.js";
import { GoogleGenAI } from '@google/genai';
import { user } from "../models/user.model.js";
import { Modules } from "../models/module.model.js";

const genAI = new GoogleGenAI(process.env.GEMINI_API_KEY)
const model = genAI.getGenaiModel({model:'gemini-3.5-flash'})


export const createCourse = async (req, res) => {
    try {
        const { tittle, description, amount } = req.body;
        const thumbnail = req.file;

        if (!tittle || !description || !amount) {
            return res.status(401).json({
                message: "Please provide all the details"
            });
        }

        const base64 = `data:${thumbnail.mimetype};base64,${thumbnail.buffer.toString("base64")}`;
        const uploadRes = await cloudinary.uploader.upload(base64, {
            folder: "ai-power-lms"
        });
        const imageUrl = uploadRes.secure_url;

        const newCourse = new Course({
            userId: req.user._id,
            tittle,
            description,
            thumbnail: imageUrl,
            amount
        });
        await newCourse.save();

        return res.status(201).json({
            message: "Course created successfully",
            course: newCourse
        });
    } catch (error) {
        console.log(`error from create course. ${error}`);
        return res.status(401).json({ message: "Server error" });
    }
};

export const getCourse = async (req, res) => {
    try {
        const { search } = req.query;
        if (!search || search.trim() === "") {
            const allCourses = await Course.find();
            return res.status(200).json({ courses: allCourses });
        }
        // ...existing code...
        const prompt =`You are an intelligent Assistant For a learning Management Platform System.A user is searching for courses Analyze The query and Return the Relevant Keyword From these Categories

        -Artificial Intelligence,
        -MERN stack,
        -Mobile Development,
        _DevOps,
        
        Only reply with keywords that Match the best query. No explanation 
        User query ${search}
    
        `

        const result = await model.generateContent(prompt);

        const aiText = result?.response?.candidates?.[0]?.content?.parts?.[0]?.text?.trim()
            .replace(/[`"\n]/g, "") || "";
        console.log("search", search)
        console.log("Ai text", aiText)
        const searchTerm = aiText || search;
        const mongoQuery = {
            $or: [
                { tittle: { $regex: searchTerm, $options: "i" } },
                { description: { $regex: searchTerm, $options: "i" } },
            ],
        };

        const courses = await Course.find(mongoQuery).lean();
        console.log(`found ${courses.length} courses for ${searchTerm}`);
        return res.status(200).json({
            success: true,
            courses,
            count: courses.length,
            searchTerm: searchTerm,
        });
    } catch (error) {
        console.log(`error from get course. ${error}`);
        return res.status(401).json({ message: "Server error" });
    }
};

export const getSingleCourse = async (req, res) => {
    try {
        const courseId = req.params.id;
        const course = await Course.findById(courseId).populate("userId");
        if (!course) return res.status(404).json({ message: "Course not found" });
        return res.status(200).json(course);
    } catch (error) {
        console.log(`error from get single course. ${error}`);
        return res.status(401).json({ message: "Server error" });
    }
};

export const getPurchasedCourse = async(req,res)=>{
    try{
        const courseId = req.params.id;
        if(!courseId){
            return res.status(401).json({message:"course not found"})
        }
        const purchasedOrder = await Course.findById(courseId).populate("modules")

        if(!purchasedOrder){
            return res.status(401).json({
                message:"Course not found"
            })
        }
        return res.status(201).json(purchasedOrder)
    }catch (error) {
        console.log(error, "from getPurchased course")
        return res.status(401).json({ message: "Server error" });
    }
}
