import express from "express"
import { login, loginFoodPartner, logout, logoutFoodPartner, register, registerFoodPartner } from "../controllers/auth.controller.js"

const router = express.Router()

// user auth APIs

router.route("/register").post(register)
router.route("/login").post(login)
router.route("/logout").get(logout)


// food partner auth api
router.route("/food-partner/register").post(registerFoodPartner)
router.route("/food-partner/login").post(loginFoodPartner)
router.route("/food-partner/logout").get(logoutFoodPartner)

export default router