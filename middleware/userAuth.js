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
