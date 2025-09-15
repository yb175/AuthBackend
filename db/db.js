import mongoose from "mongoose";

async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGODB_KEY);
        console.log("Database connected");
    } catch (error) {
        console.log("Error is ", error.message);
    }
}

export default connectDB ; 