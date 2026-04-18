import express from "express"
import { getFoodPartnerById } from "../controllers/food-partner.controller.js"

const router = express.Router()

router.route("/:id").get(getFoodPartnerById)

export default router