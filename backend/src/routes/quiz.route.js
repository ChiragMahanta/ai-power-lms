import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
// 1. "controllers" folder ka naam sahi kiya aur saare functions import kiye
import { checkQuiz, generateQuiz, getQuiz } from "../controllers/quiz.controller.js";

const quizRoute = express.Router();

// 2. Paths ke andar parameter ke pehle dynamic '/' lagaya
quizRoute.get("/checkQuiz/:id", protectRoute, checkQuiz);
quizRoute.post("/generateQuiz", protectRoute, generateQuiz);
quizRoute.get("/getQuiz/:id", protectRoute, getQuiz);

export default quizRoute;