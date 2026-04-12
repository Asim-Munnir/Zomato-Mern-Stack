import app from "./src/app.js";
import connectDb from "./src/db/db.js";
import dotenv from "dotenv"

dotenv.config()

connectDb()
    .then(() => {
        app.listen(3000, () => {
            console.log("server listening on port 3000")
        })
    })
    .catch(() => {
        console.error("❌ Failed to connect to DB. Server not started.");
    })
