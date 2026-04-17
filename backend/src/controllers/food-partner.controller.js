import { FoodItem } from "../models/fooditem.model.js"
import { FoodPartner } from "../models/foodpartner.model.js"



export const getFoodPartnerById = async (req, res) => {
    try {

        const foodPartnerId = req.params.id

        if (!foodPartnerId) {
            return res.status(400).json({
                success: false,
                message: "Food Partner ID is required"
            })
        }

        const foodPartner = await FoodPartner.findById(foodPartnerId).select("-password")

        if (!foodPartner) {
            return res.status(404).json({
                success: false,
                message: "Food Partner Not Found"
            })
        }

        const foodItemsByFoodPartner = await FoodItem.find({ foodPartner: foodPartnerId })


        return res.status(200).json({
            success: true,
            message: "Food partner retrieved successfully",
            foodPartner: {
                ...foodPartner.toObject(),
                foodItems: foodItemsByFoodPartner
            }
        })

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
}