import mongoose from "mongoose";

const quizSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    moduleId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Modules"
    },
    questions: [
        {       
            questions: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Question"
                
            }
        }
    ]
}, { timestamps: true })
export const Quiz = mongoose.model("Quiz", quizSchema);