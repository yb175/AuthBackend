import mongoose from "mongoose";
import jwt from "jsonwebtoken" 
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

userSchema.methods.getemail = function (){
    return this.email
}
userSchema.methods.getJwt = function (){
     const key = process.env.jwt_key 
    const token = jwt.sign({id : this._id, email : this.email},key,{expiresIn: "5d"}) 
    return token ; 
}
const User = mongoose.model("User", userSchema);
export default User 