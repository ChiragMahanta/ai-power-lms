import express from "express";
import { protectRoute, verifyPayment, processRefund, createCheckOutSession, createCheckOutSuccess } from "../controllers/payment.controller.js";

const paymentRoute = express.Router();

paymentRoute.post('/checkOut', protectRoute, createCheckOutSession);
paymentRoute.post("/checkOut-success", protectRoute, createCheckOutSuccess);
paymentRoute.post("/verify", verifyPayment);
paymentRoute.post("/refund", processRefund);

export default paymentRoute;