import express from "express"
import cookieParser from "cookie-parser"
import cors from "cors"


// import routes here
import authRoute from "./routes/auth.routes.js"
import foodRoute from "./routes/food.routes.js"
import foodPartnerRoute from "./routes/food-partner.routes.js"


const app = express()

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))

app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))




app.get("/", (_, res) => {
    return res.status(200).json({
        success: true,
        message: "I am coming from backend"
    })
})


app.use("/api/v1/user", authRoute)
app.use("/api/v1/food", foodRoute)
app.use("/api/v1/food-partner", foodPartnerRoute)


export default app