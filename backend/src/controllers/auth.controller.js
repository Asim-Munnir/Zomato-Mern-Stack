import { User } from "../models/user.model.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { FoodPartner } from "../models/foodpartner.model.js"


// register code here

export const register = async (req, res) => {
    try {
        const { fullName, email, password } = req.body

        if (!fullName?.trim() || !email?.trim() || !password?.trim()) {
            return res.status(400).json({
                success: false,
                message: "All Fileds Are Required"
            })
        }

        const normalizedEmail = email.toLowerCase().trim();

        let user = await User.findOne({ email: normalizedEmail })

        if (user) {
            return res.status(400).json({
                success: false,
                message: "User Already Exist"
            })
        }

        // hash password
        const genSalt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, genSalt)

        const newUser = await User.create({
            fullName,
            email: normalizedEmail,
            password: hashedPassword
        })

        const token = jwt.sign({ _id: newUser?._id }, process.env.JWT_SECRET, { expiresIn: '1d' })


        return res.cookie('token', token, {
            httpOnly: true,
            sameSite: 'strict',
            secure: process.env.NODE_ENV === "production",
            maxAge: 24 * 60 * 60 * 1000,
            path: "/"
        }).status(201).json({
            success: true,
            message: "Account Created Successfully...!",
            user: {
                _id: newUser?._id,
                fullName: newUser?.fullName,
                email: newUser?.email
            }
        })

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
}


// login code here

export const login = async (req, res) => {
    try {
        const { email, password } = req.body

        if (!email?.trim() || !password?.trim()) {
            return res.status(400).json({
                success: false,
                message: "All Fileds Are Required"
            })
        }

        const normalizedEmail = email.toLowerCase().trim();

        let user = await User.findOne({ email: normalizedEmail })

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Invalid email or password"
            })
        }

        // Password Match 
        const isPasswordMatch = await bcrypt.compare(password, user.password)
        if (!isPasswordMatch) {
            return res.status(400).json({
                success: false,
                message: "Incorrect Email Or Password"
            })
        }

        const token = jwt.sign({ _id: user?._id }, process.env.JWT_SECRET, { expiresIn: '1d' })

        user = {
            _id: user?._id,
            fullName: user?.fullName,
            email: user?.email
        }

        return res.cookie('token', token, {
            httpOnly: true,
            sameSite: 'strict',
            secure: process.env.NODE_ENV === "production",
            maxAge: 24 * 60 * 60 * 1000,
            path: "/"
        }).status(200).json({
            success: true,
            message: `Welcome Back ${user?.fullName}`,
            user
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Failed To login"
        })
    }
}


// logout code here

export const logout = async (req, res) => {
    try {
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: 'strict',
            path: "/"
        })

        return res.status(200).json({
            success: true,
            message: "Logout Successfully...!"
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Failed To logout"
        })
    }
}



// foodPartner registration
export const registerFoodPartner = async (req, res) => {
    try {
        const { name, contactName, phone, email, password, address } = req.body;

        if (!name?.trim() || !email?.trim() || !password?.trim()) {
            return res.status(400).json({
                success: false,
                message: "All Fileds Are Required"
            })
        }

        const normalizedEmail = email.toLowerCase().trim();

        const foodPartner = await FoodPartner.findOne({ email: normalizedEmail })
        if (foodPartner) {
            return res.status(400).json({
                success: false,
                message: "Food Partner Account Already Exist"
            })
        }

        // password create

        const genSalt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, genSalt)

        const newFoodPartner = await FoodPartner.create({
            name,
            contactName,
            phone,
            email: normalizedEmail,
            password: hashedPassword,
            address
        })

        const token = jwt.sign({ _id: newFoodPartner?._id }, process.env.JWT_SECRET, { expiresIn: '1d' })

        return res.cookie('token', token, {
            httpOnly: true,
            sameSite: 'strict',
            secure: process.env.NODE_ENV === "production",
            maxAge: 24 * 60 * 60 * 1000,
            path: "/"
        }).status(201).json({
            success: true,
            message: "FoodPartner Account Created Successfully...!",
            foodPartner: {
                _id: newFoodPartner?._id,
                fullName: newFoodPartner?.name,
                email: newFoodPartner?.email
            }
        })

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
}

// foodPartner Login 
export const loginFoodPartner = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email?.trim() || !password?.trim()) {
            return res.status(400).json({
                success: false,
                message: "All Fileds Are Required"
            })
        }

        const normalizedEmail = email.toLowerCase().trim();

        let foodPartner = await FoodPartner.findOne({ email: normalizedEmail })

        if (!foodPartner) {
            return res.status(400).json({
                success: false,
                message: "Invalid Email Or Password"
            })
        }

        // password Match
        const isPasswordMatch = await bcrypt.compare(password, foodPartner.password)

        if (!isPasswordMatch) {
            return res.status(400).json({
                success: false,
                message: "Incorrect Email Or Password"
            })
        }

        const token = jwt.sign({ _id: foodPartner?._id }, process.env.JWT_SECRET, { expiresIn: '1d' })

        foodPartner = {
            _id: foodPartner?._id,
            fullName: foodPartner?.name,
            email: foodPartner?.email
        }

        return res.cookie('token', token, {
            httpOnly: true,
            sameSite: 'strict',
            secure: process.env.NODE_ENV === "production",
            maxAge: 24 * 60 * 60 * 1000,
            path: "/"
        }).status(200).json({
            success: true,
            message: `Welcome Back ${foodPartner?.fullName}`,
            foodPartner
        })


    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
}


// logout FoodPartner
export const logoutFoodPartner = (req, res) => {
    try {
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: 'strict',
            path: "/"
        })

        return res.status(200).json({
            success: true,
            message: "Logout Successfully...!"
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Failed To logout"
        })
    }
}