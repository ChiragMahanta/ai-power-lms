import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
    },
    totalAmount: {
        type: Number,
        required: true
    },
    stripeSessionId: {
        type: String,      
        unique: true
    }
    
    },{timestamps: true})

export const Order = mongoose.model("Order", orderSchema)
