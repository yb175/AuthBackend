# Methods
- Functions inside a class.
- Prevent code repetition.

# Static Function(Read about it)
- Can verify passwords.
- Useful across different environments (dev, test, prod).
- `process.env` is global; attach variables to it.

# Express Routing
- Define routes to handle requests.

# Logout functionality 
**Solution 1 : send wrong expiry**
```Js
export default async function  logout(req,res) {
    try{
        res.cookie("token","9jifmif") ; 
        res.status(200).send("logout successful") ; 
    }catch(err){
        res.status(500).send({err: err.message}) ;
    }
}
```

**Solution 2 : expire the cookies**
```Js
export default async function  logout(req,res) {
    try{
        res.cookie("token",null,{expires : new Date(Date.now())}) ; 
        res.status(200).send("logout successful") ; 
    }catch(err){
        res.status(500).send({err: err.message}) ;
    }
}
```

**There is a huge loop hole in this logic if someone copy prev token that person can access data even after logout, token is removed from the cookie but doesn't expired yet**
**Solution 3: Mantain a hashset**
```Js
import blacklistToken from "../utils/blacklist.js" ;
export default async function  logout(req,res) {
    try{
        blacklistToken.add(req.cookies.token) ;
        res.status(200).send("logout successful") ; 
    }catch(err){
        res.status(500).send({err: err.message}) ;
    }
}
```
**Drawbacks of this system**
- One major drawback of this system is that all data will be lost if the server restarts.
- When there are a large number of users, it will put extensive load on the RAM.
- It will cause problems in a sharded or multi-server setup.


**Suppose old passport lost and I have a new passport old password is not expired yet**
**Solution 4 : We would mantain a blocklist and check and after expiry I can delete from the db**
```Js
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
```
```Js
import jwt from "jsonwebtoken";
import { client } from "../config/redis.js";
export default async function userAuth(req, res, next) {
  try {
    if (!req.cookies) return res.status(404).send("Cookie not found");
    const { token } = req.cookies;
    if (!token) {
      return res.status(404).send("Token not found");
    }
    const isClient = await client.get(`token:${token}`) ; 
    if(isClient){
        return res.status(401).send("Bad request, token not valid");
    }
    const payload = jwt.verify(token, process.env.jwt_key);
    if (!payload) return res.status(401).send("Bad request, token not valid");
    req.info = payload;
    next();
  } catch (err) {
    return res.status(500).send({ err: err.message });
  }
}
```
- We would use a new db redis very fast (because data is stored in RAM) 
- Redis store info in the form of key and value for fast retrivel of data 

<p align="center">
  <img src="https://i.ibb.co/dwwMtqp7/Screenshot-2025-09-22-153551.png" alt="Logout Function Screenshot" width="600"/>
</p>