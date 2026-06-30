import express from "express";
import { protectRoute} from "../middleware/auth.middleware.js";
import { checkQuiz } from "../controller/quiz.controller.js";

const quizRoute = express.Router()

quizRoute.get("/checkQuiz:id", protectRoute, checkQuiz)
quizRoute.post("/generateQuiz", protectRoute, generateQuiz)
quizRoute.get("/getQuiz:id", protectRoute, getQuiz)

export default quizRoute