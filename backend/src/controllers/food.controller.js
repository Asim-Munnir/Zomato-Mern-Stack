import cloudinary from "../../utils/cloudinary.js";
import getDataUri from "../../utils/datauri.js";
import { FoodItem } from "../models/fooditem.model.js";
import { FoodPartner } from "../models/foodpartner.model.js";
import { Like } from "../models/likes.model.js";
import { Save } from "../models/save.model.js";


export const createFood = async (req, res) => {
    try {
        const { name, description } = req.body
        const video = req.file;

        if (!name || !description || !video) {
            return res.status(400).json({
                success: false,
                message: "All Fields is required"
            });
        }

        const foodPartnerUser = req.foodPartnerUser?._id

        const foodPartner = await FoodPartner.findById(foodPartnerUser).select("-password")

        if (!foodPartner) {
            return res.status(404).json({
                success: false,
                message: "Food Partner User Not Found"
            })
        }

        const existingFood = await FoodItem.findOne({ name, foodPartner: foodPartnerUser })
        if (existingFood) {
            return res.status(400).json({
                success: false,
                message: "Food already exists"
            });
        }

        let cloudResponse;

        if (video) {
            const fileUri = getDataUri(video)

            cloudResponse = await cloudinary.uploader.upload(fileUri, {
                resource_type: "auto"
            })

        }

        const newFood = await FoodItem.create({
            name,
            video: cloudResponse?.secure_url || "",
            description,
            foodPartner: foodPartnerUser
        })

        res.status(201).json({
            success: true,
            message: "Food item created",
            newFood
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
}


// get Food Items

export const getFoodItems = async (req, res) => {
    try {
        const userId = req.user?._id

        if (!userId) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            })
        }

        const foodItems = await FoodItem.find({})

        if (!foodItems) {
            return res.status(200).json({
                success: true,
                foodItems: []
            })
        }

        return res.status(200).json({
            success: true,
            foodItems
        })

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
}

export const likeFood = async (req, res) => {
    try {
        const { foodId } = req.body;
        const user = req.user;

        const existingLike = await Like.findOne({
            user: user._id,
            food: foodId
        });

        if (existingLike) {
            await Like.deleteOne({
                user: user._id,
                food: foodId
            });

            await FoodItem.findByIdAndUpdate(foodId, {
                $inc: { likeCount: -1 }
            })

            return res.status(200).json({
                success: true,
                message: "Unliked successfully"
            });
        }

        const like = await Like.create({
            user: user._id,
            food: foodId
        });

        await FoodItem.findByIdAndUpdate(foodId, {
            $inc: { likeCount: 1 }
        })

        return res.status(201).json({
            success: true,
            message: "Liked successfully",
            like
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};

export const saveFood = async (req, res) => {
    try {
        const { foodId } = req.body
        const user = req.user

        const isAlreadySavedFood = await Save.findOne({ user: user?._id, food: foodId })

        if (isAlreadySavedFood) {
            await Save.deleteOne({
                user: user._id,
                food: foodId
            });

            await FoodItem.findByIdAndUpdate(foodId, {
                $inc: { savesCount: -1 }
            })

            return res.status(200).json({
                success: true,
                message: "UnSaved successfully"
            });
        }

        const save = await Save.create({
            user: user._id,
            food: foodId
        })

        await FoodItem.findByIdAndUpdate(foodId, {
            $inc: { savesCount: 1 }
        })

        return res.status(201).json({
            success: true,
            message: "Saved successfully",
            save
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
}


export const getSavedFoods = async (req, res) => {
    try {
        const userId = req.user?._id;
        if (!userId) {
            return res.status(400).json({
                success: false,
                message: "User Id Is Required"
            })
        }

        const savedFoods = await Save.find({ user: userId }).populate("food")

        if (!savedFoods || savedFoods.length === 0) {
            return res.status(200).json({
                success: true,
                message: "No saved foods found",
                savedFoods: []
            });
        }

        return res.status(200).json({
            success: true,
            message: "Saved foods retrieved successfully",
            savedFoods
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
}