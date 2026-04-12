import mongoose from "mongoose";

const foodItemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    video: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    foodPartner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'FoodPartner'
    }
}, { timestamps: true })

export const FoodItem = mongoose.model("FoodItem", foodItemSchema)