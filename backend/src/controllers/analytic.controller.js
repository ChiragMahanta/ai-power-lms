import  User from "../models/user.model.js"
import { Course } from "../models/course.model.js"
import  Order  from "../models/order.model.js"

export const getAnalyticsData = async()=>{
    const totalUser = await User.countDocuments()
    const totalCourse = await Course.countDocuments()
    const saleData = await Order.aggregate([
        {
            $group:{
                _id:null,
                totalEnrollments: {$sum:1},
                totalRevenue: {$sum:'$totalAmount'}
            }
        }
    ])
    const{
        totalEnrollments = 0, 
        totalRevenue = 0 
    } = saleData[0] || {}

    return{
        users: totalUser,
        courses: totalCourse,
        totalEnrollments,
        totalRevenue
    }
}

export const getAnalyticsDataController = async(req, res)=>{
    try {
        const data = await getAnalyticsData()
        return res.status(200).json(data)
    } catch (error) {
        console.log(error)
        return res.status(500).json({message: "Error fetching analytics"})
    }
}

export const dailyEnrollmentData = async(startDate, endDate) => {
    try {
        const dailyData = await Order.aggregate([
            {
                $match:{
                    createdAt:{
                        $gte: startDate,
                        $lte: endDate
                    }
                }
            },
            {
                $group:{
                    _id:{
                        $dateToString:{format:"%y-%m-%d", date:"$createdAt"}
                    },
                    enrollments:{$sum:1},
                    revenue:{$sum:"$totalAmount"}
                }
            },
            {$sort:{_id:1}}
        ])
        const dateArray = getDatesInRange(startDate,endDate)

        return dateArray.map((date)=>{
            const sound = dailyData.find((item)=>item._id===date)
            return{
                date,
                enrollments:found?.enrollments||0,
                revenue:found?.revenue||0
            }
        })
    } catch (error) {
        console.log(error)
        throw error
    }
}
function getDatesInRange(startDate, endDate){
    const dates = []
    let currentDate = new Date(startDate)
    while(currentDate<= endDate){
        dates.push(currentDate.toISOString().split("T")[0]);
        currentDate.setDate(currentDate.getDate()+1)
    }
    return dates
}
export const getDailyAnalyticController=async(req, res)=>{
    try {
        const {startDate, endDate} = req.query
        if ( !startDate || !endDate){
            return res.status(401).json({message:"Date not found"})

        }
        const start = new Date(startDate)
        const end = new Date(endDate)

        const data = await dailyEnrollmentData(start, end)

        return res.status(201).json(data)
    } catch (error) {
        console.log(error)
    }
}
