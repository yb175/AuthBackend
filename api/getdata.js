export default async function getData(req,res){
    try{
        res.status(200).send(req.cookies) ; 
    }catch(err){
        res.status(500).send({err : err.message}) ;
    }
}