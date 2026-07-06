import Comment from '../models/comment.model.js';
import Module from '../models/module.model.js';

export const createComment = async (req, res) => {
    try {
        const moduleId = req.params.id;
        const { comment } = req.body;
        const userId = req.user._id;

        if (!moduleId) {
            return res.status(400).json({ message: "Module Id not found" });
        }
        if (!comment) {
            return res.status(400).json({ message: "Comment not found" });
        }

        const module = await Module.findById(moduleId);
        if (!module) {
            return res.status(404).json({ message: "Module not found" });
        }

        const newComment = await Comment.create({
            userId,
            moduleId,
            comment
        });

        await Module.findByIdAndUpdate(
            moduleId,
            { $push: { comments: newComment._id } },
            { new: true }
        );

        const populatedComment = await Comment.findById(newComment._id).populate('userId', 'fullName email');

        return res.status(201).json({
            message: "Comment added",
            comment: populatedComment
        });
    } catch (error) {
        console.log(`error from createComment: ${error}`);
        return res.status(500).json({ message: "Server error" });
    }
};