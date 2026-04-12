import jwt from "jsonwebtoken"
import { FoodPartner } from "../models/foodpartner.model.js"
import { User } from "../models/user.model.js"


const isFoodPartnerAuthenticated = async (req, res, next) => {
    const token = req.cookies.token

    if (!token) {
        return res.status(401).json({
            success: false,
            message: "User not Authenticated"
        })
    }

    try {

        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        if (!decoded) {
            return res.status(401).json({
                success: false,
                message: "Invalid Token"
            })
        }

        const user = await FoodPartner.findById(decoded?._id)
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        // if user is find now attach to request
        req.foodPartnerUser = user
        next()

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Authentication failed",
            error: error.message
        });
    }
}


const isUserAuthenticated = async (req, res, next) => {
    const token = req.cookies.token

    if (!token) {
        return res.status(401).json({
            success: false,
            message: "User not Authenticated"
        })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        if (!decoded) {
            return res.status(401).json({
                success: false,
                message: "Invalid Token"
            })
        }

        const user = await User.findById(decoded?._id)
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        req.user = user
        next()

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Authentication failed",
            error: error.message
        });
    }
}

export default {
    isFoodPartnerAuthenticated,
    isUserAuthenticated
}