import express from "express";
import { adminRoute,protectRoute} from "../middleware/auth.middleware.js";
import { createModule } from "../controllers/module.controller.js";

const moduleRoute = express.Router()

moduleRoute.all.post('/createModule', protectRoute, adminRoute, VideoUpload.single, createModule)
moduleRoute.get('/getModule/:id',protectRoute, getSingleCourseModule)
moduleRoute.post('/comment/:id', protectRoute, getComment)
export default moduleRoute