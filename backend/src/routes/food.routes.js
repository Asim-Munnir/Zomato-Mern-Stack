import express from "express"
import authMiddleware from "../middlewares/isAuthenticated.js"
import { createFood, getFoodItems } from "../controllers/food.controller.js"
import multer from "multer"

const router = express.Router()

const upload = multer({
    storage: multer.memoryStorage()
})


router.route("/").post(authMiddleware.isFoodPartnerAuthenticated, upload.single("video"), createFood)
router.route("/getFoodItems").get(authMiddleware.isUserAuthenticated, getFoodItems)


export default router