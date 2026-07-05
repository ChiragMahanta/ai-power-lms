import { Course } from "../models/course.model.js";
import  Modules  from "../models/module.model.js";

export const createModule = async (req, res) => {
    try {
        const { courseId, title, video: bodyVideo } = req.body;
        const video = req.file?.path || req.file?.filename || bodyVideo;

        if (!courseId) {
            return res.status(400).json({ error: "courseId is required" });
        }
        if (!title || !video) {
            return res.status(400).json({ error: "title and video are required" });
        }

        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({ error: "Course not found" });
        }

        const module = await Modules.create({
            courseId,
            title,
            video
        });

        course.modules.push(module._id);
        await course.save();

        return res.status(201).json({
            message: "Module created successfully",
            module
        });
    } catch (error) {
        console.log(`error from create module, ${error}`);
        return res.status(500).json({ error: "Server error" });
    }
};
