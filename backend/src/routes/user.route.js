import express from "express";
import { getUser, Login, logout, Register } from "../controllers/user.controller.js";
import{ protectRoute } from "../middleware/auth.middleware.js";


const userRoute = express.Router()
 

userRoute.post('/register',Register)
userRoute.post('/login', Login)
userRoute.post('/logout', logout)
userRoute.get('/getUser',protectRoute, getUser)
export default userRoute