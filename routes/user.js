import express from "express" 
import login from "../controllers/login.js";
import getData from "../controllers/getdata.js";
import userAuth from "../middleware/userAuth.js";
import logout from "../controllers/logout.js";
const userRouter = express.Router() ; 

userRouter.post("/login",login)
userRouter.get("/getdata",userAuth,getData) ; 
userRouter.get("/logout",userAuth,logout) ; 

export default userRouter ; 