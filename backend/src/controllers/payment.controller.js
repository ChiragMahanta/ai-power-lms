import { ENV } from "../config/env.js";
import { stripe } from "../config/stripe.js";
import { Course } from "../models/course.model.js";
import Order from "../models/order.model.js"; // ✅ Fixed: Default import + Capital O




export const createCheckOutSession = async (req, res) => {
    try {
        const { products } = req.body;
        if (!products) {
            return res.status(401).json({ message: "Please provide course" });
        }

        const courseId = products._id;
        const course = await Course.findById(courseId);

        // ✅ Fixed: Added return so code stops here if course not found
        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }

        const alreadyPurchased = await Order.findOne({
            userId: req.user._id,
            course: courseId
        });

        if (alreadyPurchased) {
            return res.status(200).json({ message: "You already have this course" });
        }

        // ✅ Fixed: stripe.checkout.sessions (lowercase)
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'], // ✅ Fixed: types not type
            line_items: [
                {
                    price_data: {
                        currency: "inr",
                        product_data: {
                            name: products.title || products.name, // ✅ Fixed: products not product
                            images: products.thumbnail ? [products.thumbnail] : [], // ✅ Fixed
                        },
                        unit_amount: Math.round(products.amount * 100), // ✅ Fixed: amount not price
                    },
                    quantity: 1
                }
            ],
            mode: 'payment',
            success_url: `${ENV.CLIENT_URL}/purchase?session_id={CHECKOUT_SESSION_ID}`, // ✅ Fixed: backticks
            cancel_url: `${ENV.CLIENT_URL}/course/${courseId}`, // ✅ Fixed: backticks
            metadata: {
                userId: req.user._id.toString(),
                courseId: courseId.toString(),
                coursePrice: products.amount.toString()
            }
        });

        return res.status(200).json({
            success: true,
            sessionId: session.id,
            url: session.url
        });
    } catch (error) {
        console.log(error, "from create checkout session");
        return res.status(500).json({ message: "Server error" });
    }
};

// ✅ Fixed: Export name matches what route expects
export const createCheckOutSuccess = async (req, res) => {
    try {
        const { sessionId } = req.body;
        if (!sessionId) {
            return res.status(401).json({ message: "Session ID not found" }); // ✅ Fixed: res not req
        }

        const existingOrder = await Order.findOne({ stripeSessionId: sessionId }); // ✅ Fixed: stripeSessionId not stripesSessionId

        if (existingOrder) {
            return res.status(200).json({ message: "Order already created" }); // ✅ Fixed: Logic was reversed
        }

        // ✅ Fixed: stripe.checkout.sessions (lowercase)
        const session = await stripe.checkout.sessions.retrieve(sessionId);

        if (session.payment_status === "paid") {
            const { courseId, userId } = session.metadata;

            const newOrder = new Order({
                userId: userId, // ✅ Fixed: userId not user
                course: courseId,
                totalAmount: session.amount_total / 100,
                stripeSessionId: sessionId // ✅ Fixed: stripeSessionId not stripesSessionId
            });

            await newOrder.save();

            return res.status(201).json({
                message: "Payment successful",
                orderId: newOrder._id
            });
        }

        return res.status(401).json({ message: "Payment failed" });
    } catch (error) {
        console.log(error, "from checkout success");
        return res.status(500).json({ message: "Server error" });
    }
};









// import { mockPayment } from "../config/stripe.js";

// export const createPayment = async (req, res) => {
//     try {
//         const { amount, currency } = req.body;
        
//         if (!amount) {
//             return res.status(400).json({
//                 message: "Amount is required"
//             });
//         }

//         // Create mock order
//         const order = await mockPayment.createOrder(amount, currency);
        
//         return res.status(200).json({
//             success: true,
//             order: order,
//             message: "Mock order created successfully"
//         });
//     } catch (error) {
//         console.log(`Error from createPayment: ${error}`);
//         return res.status(500).json({
//             message: "Server error",
//             success: false
//         });
//     }
// };

// export const verifyPayment = async (req, res) => {
//     try {
//         const { paymentId } = req.body;
        
//         // Always verify successfully in mock mode
//         const result = await mockPayment.verifyPayment(paymentId);
        
//         return res.status(200).json({
//             success: true,
//             ...result
//         });
//     } catch (error) {
//         console.log(`Error from verifyPayment: ${error}`);
//         return res.status(500).json({
//             message: "Server error",
//             success: false
//         });
//     }
// };

// export const processRefund = async (req, res) => {
//     try {
//         const { paymentId } = req.body;
        
//         const result = await mockPayment.refundPayment(paymentId);
        
//         return res.status(200).json({
//             success: true,
//             ...result
//         });
//     } catch (error) {
//         console.log(`Error from processRefund: ${error}`);
//         return res.status(500).json({
//             message: "Server error",
//             success: false
//         });
//     }
// };
