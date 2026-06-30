import  User  from "../models/user.model.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const Register = async (req, res) => {
    try {
        const { fullName, email, password } = req.body;

        if (!fullName || !email || !password) {
            return res.status(401).json({
                message: "Please fill all the details",
                success: false
            });
        }

        const user = await User.findOne({ email });
        if (user) {
            return res.status(401).json({
                message: "User already exists",
                success: false
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({
            fullName ,
            email,
            password: hashedPassword
        });

        const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET);
        const cookieOptions = {
            maxAge: 1 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            secure: true,
            sameSite: "none"
        };

        if (newUser.email === process.env.ADMIN) {
            newUser.admin = true;
            await newUser.save();

            return res.status(201)
                .cookie("token", token, cookieOptions)
                .json({
                    message: `welcome admin ${newUser.fullName}`,
                    success: true,
                    token
                });
        }

        return res.status(201)
            .cookie("token", token, cookieOptions)
            .json({
                message: `welcome user ${newUser.fullName}`,
                success: true,
                token
            });
    } catch (error) {
        console.log(`error from register backend, ${error}`);
        return res.status(401).json({
            message: "Server error",
            success: false
        });
    }
};

export const Login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(401).json({
                message: "Please fill all the details",
                success: false
            });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({
                message: "Error in email or password",
                success: false
            });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(401).json({
                message: "Error in email or password",
                success: false
            });
        }

        if (user.email === process.env.ADMIN) {
            user.admin = true;
            await user.save();
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
        res.cookie("token", token, {
            maxAge: 1 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            secure: true,
            sameSite: "none"
        });

        if (user.admin) {
            return res.status(201).json({
                message: "welcome back admin",
                success: true,
                token
            });
        }

        return res.status(200).json({
            message: `welcome ${user.fullName}`,
            success: true,
            token
        });
    } catch (error) {
        console.log(`error from login backend, ${error}`);
        return res.status(401).json({
            message: "Server error",
            success: false
        });
    }
};
export const getUser = async(req,res)=>{
    try{
        const userId = req.user._id
        const user = await User.findById(userId)
        if(!user){
            return res.status(401).json({
                message: "User not found"
            })
        }
        return res.status(201).json(user)

    }catch(error){
        console.log(`error from get User, ${error}`)
    }
}
    
export const logout = async (req, res)=>{
    try {
        return res.cookie("token","").status(201).json({message:"User logged out "})
    } catch (error) {
        console.log(error)
    }
}