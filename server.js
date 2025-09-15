import express from "express" ; 
import connectDB from "./db/db.js";
import createUser from "./api/createUser.js";
import sendOtp from "./api/sendOtp.js";
import verifyOtp from "./api/verifyOtp.js";
import login from "./api/login.js";
import cookieParser from "cookie-parser";
import getData from "./api/getdata.js";
const app = express();
app.use(express.json()) ; 
app.use(cookieParser()) ; 
app.post("/createUser",createUser,sendOtp)
app.post("/verifyOtp",verifyOtp)
app.post("/login",login)
app.get("/getdata",getData) ; 
await connectDB()
.then(()=>{
    app.listen(3000 , ()=>{
        console.log("Server is running on port 3000");
    })
})
.catch((error)=>{
    console.log("Error is ", error.message);
})