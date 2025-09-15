import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    email : {
        type : String,
        required : true,
        unique : true,
        lowercase : true,
        trim : true
    }, 
    password : {
        type : String,
        required : true
    }, 
    prefrence : {
        type : String , 
        enum : ["farmer" , "researcher", "policymaker"] 
    }
},{timestamps : true})
const User = mongoose.model("User", userSchema);
export default User 