import express from "express"
import isAuthenticated from "../middlewares/isAuthenticated.js"
import { getFoodPartnerById } from "../controllers/food-partner.controller.js"

const router = express.Router()

router.route("/:id").get(isAuthenticated.isUserAuthenticated, getFoodPartnerById)

export default router