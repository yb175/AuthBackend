import mongoose from "mongoose";
const OtpSchema = new mongoose.Schema({
    email : {
        type : String,
        required : true,
        unique : true
    }, 
    otp : {
        type : String,
        required : true, 
        createdAt: { type: Date, default: Date.now, index: { expires: 300 } }  // 300 seconds = 5 min
    }
})

const Otp = mongoose.model("Otp", OtpSchema);
export default Otp ;