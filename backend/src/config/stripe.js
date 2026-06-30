// Mock payment system - No real API keys needed!

import { stripe } from 'stripe'

export const stripe = new Stripe(STRIPE_SECRET-KEY){}
//     createOrder: async (amount, currency = "INR") => {
//         // Simulate order creation
//         return {
//             id: "mock_order_" + Date.now(),
//             amount: amount,
//             currency: currency,
//             status: "created"
//         };
//     },
    
//     verifyPayment: async (paymentId) => {
//         // Simulate payment verification (always successful for testing)
//         return {
//             success: true,
//             paymentId: paymentId,
//             message: "Payment verified successfully (MOCK MODE)"
//         };
//     },
    
//     refundPayment: async (paymentId) => {
//         // Simulate refund
//         return {
//             success: true,
//             refundId: "mock_refund_" + Date.now(),
//             message: "Refund processed successfully (MOCK MODE)"
//         };
//     }
// };