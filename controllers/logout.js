import redisClient, { client } from "../config/redis.js";
import jwt from "jsonwebtoken"
export default async function  logout(req,res) {
    try{
        const payload = jwt.decode(req.cookies.token); 
        await client.set(`token:${req.cookies.token}`,"blacklisted") ;
        await client.expireAt(`token:${req.cookies.token}`,payload.exp) ;  
        res.cookie("token",null,{expires : new Date(Date.now())}) ; 
        res.status(200).send("logout successful") ; 
    }catch(err){
        res.status(500).send({err: err.message}) ;
    }
}