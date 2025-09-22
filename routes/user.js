import express from "express" 
import login from "../controllers/login.js";
import getData from "../controllers/getdata.js";
import userAuth from "../middleware/userAuth.js";
const userRouter = express.Router() ; 

userRouter.post("/login",login)
userRouter.get("/getdata",userAuth,getData) ; 

export default userRouter ; 