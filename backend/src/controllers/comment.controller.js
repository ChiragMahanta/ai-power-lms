import Comment from '../models/comment.model.js';
import Module from '../models/module.model.js';

export const createComment = async (req, res) => {
    try {
        const moduleId = req.params.id;
        const {comment } = req.body;
       const userId = req.user._id


        if(!moduleId){
            return res.status(401).json({message:"Module Id not found"})
        }
        if(!comment){
            return res.status(401).json({message:"Comment not found"})
        }

        const module = await Module.findById(moduleId)
        if(!module){
            return res.status(201).json({message:"Module is not found"})
        }

        const newComment = await Comment.create({
            userId,
            moduleId,
            comment
        })
        await Module.findByIdAndUpdate(
            moduleId,
            {$push:{comments:newComment._id}},
            {new:true}
        )
        const populateComment = await Comment.findById(newComment._id).populate('userId'," fullName email")
        return res.status(201).json({
            message:"comment added",
            populatedComment
        })

    } catch (error) {
        
    }
}