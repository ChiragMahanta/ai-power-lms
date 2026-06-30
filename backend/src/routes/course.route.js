import express from 'express'
import { adminRoutes, protectRoutes } from '../middleware/auth.middleware.js'
import { upload } from '../middleware/upload.js' // FIXED: Removed the space!
import { 
    createCourse, 
    getPurchasedCourse,
    getCourse, 
    getSingleCourse, 
    getAllCoursePurchased 
} from '../controllers/course.controller.js' // FIXED: Added 's' to controllers and added missing imports

const courseRoute = express.Router()

// FIXED: Changed protectRoute to protectRoutes
courseRoute.post('/createCourse', protectRoutes, adminRoutes, upload.single("thumbnail"), createCourse)
courseRoute.get('/getCourse', protectRoutes, getCourse)
courseRoute.get('/getSingleCourse/:id', protectRoutes, getSingleCourse)

courseRoute.get('/purchasedCourse/:id', protectRoutes, getPurchasedCourse)
courseRoute.get('/getAllCoursePurchased/:id', protectRoutes, getAllCoursePurchased)

export default courseRoute