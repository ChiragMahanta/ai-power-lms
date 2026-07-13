import express from "express";
import { getUser, Login, logout, Register } from "../controllers/user.controller.js";
// ❌ import isAuthenticated from "../middlewares/isAuthenticated.js"; // ABHI COMMENT/REMOVE KAREIN

const router = express.Router();

router.post("/register", Register);
router.post("/login", Login);
router.get("/getUser", getUser); 
router.post("/logout", logout);

export default router;