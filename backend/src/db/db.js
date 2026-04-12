import mongoose from "mongoose";

// username : asimmunnir1_db_user
// password : exJaAKI7eC8wQ0Rx
// connection url = mongodb+srv://asimmunnir1_db_user:exJaAKI7eC8wQ0Rx@cluster0.fn5nfws.mongodb.net/

const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("MongoDB Connected");
    } catch (error) {
        console.log("error Occured", error);
    }
}

export default connectDb