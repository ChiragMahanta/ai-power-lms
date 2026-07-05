import jwt from 'jsonwebtoken'
import User from '../models/user.model.js' 

export const protectRoute = async (req, res, next) => {
    try {
        const { token } = req.cookies;
        if (!token) {
            return res.status(401).json({
                message: 'token not found'
            })
        }
        const decode = jwt.verify(token, process.env.JWT_SECRET)
        if (!decode){
            return res.status(401).json({
            message: "not decode please check token"
            })
        }
        const user = await User.findById(decode.userId).select('-password')
        if(!user){
            return res.status(401).json({
                message :"User not found"

            })
        }
        req.user = user
        next()
    } catch (error) {
        console.log(`error from protectRoute: ${error}`)
        return res.status(401).json({
            message: 'Unauthorized'
        })
    }
}

export const adminRoute = async(req, res, next) => {
    try{
        if (req.user && req.user.email === process.env.ADMIN) {
            return next()
        }

        return res.status(403).json({ message: 'Admin resource. Access denied' })

    }
    catch(error){
        console.log(`error from admin route,${error}`)
    }
 }