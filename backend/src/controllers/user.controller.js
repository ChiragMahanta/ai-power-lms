import User from "../models/user.model.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const Register = async (req, res) => {
    try {
        const { fullName, email, password } = req.body;

        // 1. Pehle check karo ki sab fields bhari hain ya nahi
        if (!fullName || !email || !password) {
            return res.status(400).json({
                message: "Please fill all the details",
                success: false
            });
        }

        // 2. Phir check karo ki user pehle se toh nahi hai
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({
                message: "Email already registered",
                success: false
            });
        }

        // 3. Ab password ko hash karo
        const hashedPassword = await bcrypt.hash(password, 10);

        // 4. Last mein user create karo (Admin logic yahan hai)
        const newUser = await User.create({
            fullName,
            email,
            password: hashedPassword,
            admin: email === "admin@gmail.com" // ✅ Yeh line ab sahi jagah hai
        });

        return res.status(201).json({
            message: "User registered successfully",
            success: true,
            user: {
                _id: newUser._id,
                fullName: newUser.fullName,
                email: newUser.email,
                admin: newUser.admin // ✅ Admin status bhi response mein bhejo
            }
        });
    } catch (error) {
        console.log(`error from register backend, ${error}`);
        return res.status(500).json({
            message: "Server error",
            success: false
        });
    }
};

export const Login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: "Please fill all the details",
                success: false
            });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({
                message: "Invalid credentials",
                success: false
            });
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(401).json({
                message: "Invalid credentials",
                success: false
            });
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);

        const cookieOptions = {
            maxAge: 1 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            secure: false,
            sameSite: "lax"
        };

        // ✅ Yahan se fix shuru hota hai - proper closing brackets
        return res.status(200)
            .cookie("token", token, cookieOptions)
            .json({
                message: `Welcome back ${user.fullName}`,
                success: true,
                user: {
                    _id: user._id,
                    fullName: user.fullName,
                    email: user.email,
                    admin: user.admin,
                    purchasedCourses: user.purchasedCourses
                }
            });
            
    } catch (error) {
        console.log(`error from login backend, ${error}`);
        return res.status(500).json({
            message: "Server error",
            success: false
        });
    }
}; // ✅ Login function yahan close hua

export const logout = async (req, res) => {
    try {
        return res.status(200)
            .cookie("token", "", { maxAge: 0 })
            .json({
                message: "Logged out successfully",
                success: true
            });
    } catch (error) {
        console.log(`error from logout backend, ${error}`);
        return res.status(500).json({
            message: "Server error",
            success: false
        });
    }
};

export const getUser = async (req, res) => {
    try {
        const userId = req.id;
        const user = await User.findById(userId).select("-password");
        
        if (!user) {
            return res.status(404).json({
                message: "User not found",
                success: false
            });
        }

        return res.status(200).json({
            success: true,
            user: user
        });
    } catch (error) {
        console.log(`error from getUser backend, ${error}`);
        return res.status(500).json({
            message: "Server error",
            success: false
        });
    }
};