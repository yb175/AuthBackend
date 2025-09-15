import mongoose from "mongoose";

async function connectDB() {
    try {
        await mongoose.connect("mongodb+srv://bhatiayug175:bhatiabhai@cluster0.ic1q8bn.mongodb.net/sih");
        console.log("Database connected");
    } catch (error) {
        console.log("Error is ", error.message);
    }
}

export default connectDB ; 