import express from 'express'
import { protectRoute } from '../middleware/auth.middleware.js'
import { getAnalyticsDataController, getDailyAnalyticController } from '../controllers/analytic.controller.js'

const analyticRoute = express.Router()
analyticRoute.get('/getAnalytic', protectRoute, adminRoute, getAnalyticsDataController)
analyticRoute.get('/getDailyData', protectRoute, adminRoute, getDailyAnalyticController)
export default analyticRoute