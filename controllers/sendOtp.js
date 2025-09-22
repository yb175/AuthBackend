import crypto from "crypto";
import Otp from "../db/schema/otpSchema.js";
import nodemailer from "nodemailer"
import dotenv from "dotenv" 
import bcrypt from "bcrypt" 
dotenv.config() ; 
export default async function sendOtp(req, res, next) {
    try {
        const { email} = req.body;
        const otp = crypto.randomInt(1000, 9999).toString(); 
        const otpHash = await bcrypt.hash(otp,10) ; 
        await Otp.findOneAndDelete({ email });
        const newOtp = new Otp({email,otp : otpHash}) ; 
        await newOtp.save() ; 
        console.log(process.env.GMAILID)
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user : process.env.GMAILID,
                pass : process.env.PASSWORD
            }

        })
        await transporter.sendMail({
            from : process.env.GMAILID, 
            to : email , 
            subject : "Your Otp for registration",
            text: `Your OTP is ${otp}. Use this to complete your registration.`
        })
        res.status(200).send("Otp sent successfully") ; 
    }catch (error) {
        return res.status(400).json({ message: error.message });
    }
}