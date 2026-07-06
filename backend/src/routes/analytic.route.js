import express from 'express';
import { protectRoute, adminRoute } from '../middleware/auth.middleware.js';
import { getAnalyticsDataController } from '../controllers/analytic.controller.js';

const analyticRoute = express.Router();

analyticRoute.get('/getAnalytic', protectRoute, adminRoute, getAnalyticsDataController);

export default analyticRoute;