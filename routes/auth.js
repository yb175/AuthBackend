import express from "express";
import createUser from "../controllers/createUser.js";
import sendOtp from "../controllers/sendOtp.js";
import verifyOtp from "../controllers/verifyOtp.js";
const AuthRouter = express.Router() ; 

AuthRouter.post("/createUser",createUser,sendOtp)
AuthRouter.post("/verifyOtp",verifyOtp)

export default AuthRouter ; 