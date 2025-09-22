import express from "express" ; 
import connectDB from "./db/db.js";
import cookieParser from "cookie-parser";
import AuthRouter from "./routes/auth.js";
import userRouter from "./routes/user.js";

const app = express();
app.use(express.json()) ; 
app.use(cookieParser()) ; 
app.use("/auth",AuthRouter) ; 
app.use("/user",userRouter) ; 
await connectDB()
.then(()=>{
    app.listen(3000 , ()=>{
        console.log("Server is running on port 3000");
    })
})
.catch((error)=>{
    console.log("Error is ", error.message);
})