import User from "../db/schema/userSchema.js";
import bcrypt from "bcrypt"
import dotenv from "dotenv" 
import jwt from "jsonwebtoken" 
dotenv.config() ; 
export default async function login(req, res) {
    try {
        const {email,password} = req.body ; 
        console.log(email) ; 
        const user = await User.findOne({email}) ;
        if(!user) {
            throw new Error("User not found") ; 
        }
        let isValid = await bcrypt.compare(password,user.password) ; 
        if(!isValid) throw new Error("Invalid credentials") ; 
        const key = process.env.jwt_key 
        const token = jwt.sign({id : user._id, email : user.email},key,{expiresIn: "5d"}) ; 
        res.cookie("token", token, { httpOnly: true, maxAge: 5*24*60*60*1000 });
        res.status(200).send("login success") ; 
    }catch(err){
        res.status(500).send({err : err.message}) ; 
    }
}