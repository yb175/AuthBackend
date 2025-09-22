import User from "../db/schema/userSchema.js";
import bcrypt from "bcrypt"
import dotenv from "dotenv" 

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
        const token = user.getJwt() ; 
        res.cookie("token", token, { httpOnly: true, maxAge: 5*24*60*60*1000 });
        res.status(200).send("login success") ; 
    }catch(err){
        res.status(500).send({err : err.message}) ; 
    }
}