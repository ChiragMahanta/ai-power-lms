import {ENV} from "../config/env.js"
import { stripe } from "../config/stripe.js"
import{ Course } from "../models/course.model.js"
import { order } from "../models/order.model.js"


export const createCheckOutSession = async(req ,res)=>{
    try {
        const {products} = req.body;
        if(!products){
            return res.status(401).json({message:"please provide course"})
        }
const courseId = products._id
const course = await Course.findById(courseId)
return res.status(401).json({message:"Course not found"})
    
const alreadyPurchased = await Order.findOne({
    user : req.user._id,
    course:courseId
})
if (alreadyPurchased){
    return res.status(201).json({message:"You already have this course"})

}
const session = await stripe.CheckOut.Sessions.create({
    payment_method_type: ['card'],
    line_item:[
        {
            price_data:{
                currency:"inr",
                product_data:{
                    name:product.name,
                    image:product.image,

                },
                unit_amount: Math.round(products.price*100)
            },
            quantity:1
        }
    ],
    mode: 'payment',
    success_url :'${ENV. client_url}/purchase?session_id={CHECKOUT_SESSION-ID}',
    cancel_url:'${ENV.CLIENT.URL}/course/${courseId}',
    metadata:{
        userId:req.user._id,
        courseId:courseId,
        coursePrice:products.price
        }
    })
    return res.status(201).json({
        success:true,
        session:session.id,
        url:session.url
    })
    } catch (error) {
        console.log(error,"from create check out session")      
    }
}


export const checkOutSuccess =  async(req, res) =>{
    try {
        const {sessionId} = req.body;
        if(!sessionId){
            return req.status(401).json({
                message:"Id not found"
            })
        }
         const existingOrder = await Order .findOne({stripesSessionId:sessionId})
         if(!existingOrder){
            return res.status(201).json({
                message:"Order already created"
            })
         }
         const session = await stripe.CheckOut.session.retrieve(sessionId)
         if(session.payment_status==="paid"){
            const courseId = session.metadata.courseId
            const userId = session.metadata.userId


            const newOrder = new Order({
                user:userId,
                course:courseId,
                totalAmount:session.amount_total/100,
                stripesSessionId:sessionId    
            }) 
            await newOrder.save()
            return res.status(201).json({
                message:" payment successfull",
                orderId: newOrder._id
            })
         }
         return res.status(401).json({
            message:"Payment failed"
         })
    } catch (error) {
        console.log(error,"from checkout success")
    }
}









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
