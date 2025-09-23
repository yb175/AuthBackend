import express from "express" ; 
import connectDB from "./db/db.js";
import cookieParser from "cookie-parser";
import AuthRouter from "./routes/auth.js";
import userRouter from "./routes/user.js";
import redisClient from "./config/redis.js";

const app = express();
app.use(express.json()) ; 
app.use(cookieParser()) ; 
app.use("/auth",AuthRouter) ; 
app.use("/user",userRouter) ; 

async function initialiseConnection(){
    try{
    await Promise.all([redisClient(),connectDB()]) ;
    app.listen(3000 , ()=>{
        console.log("Server is running on port 3000");
    })
    }catch(err){
        console.log("Error is ", err.message);
    }
}

await initialiseConnection() ;