import jwt from "jsonwebtoken" ; 
export default function userAuth(req,res,next){
    if(!req.cookies) return res.status(404).send("Cookie not found")
    const {token} = req.cookies;
    if(!token){
        return res.status(404).send("Token not found") ; 
    }
    const payload = jwt.verify(token,process.env.jwt_key) ; 
    if(!payload) return res.status(401).send("Bad request, token not valid") ; 
    req.info = payload ; 
    next() ; 
}