import { createClient } from 'redis';
const client = createClient({
    username: 'default',
    password: 'SRtGUYyrHtRdH6BHjsbVE1XaW3BP7frB',
    socket: {
        host: 'redis-18620.c114.us-east-1-4.ec2.redns.redis-cloud.com',
        port: 18620
    }
});

async function redisClient(){
    try{
    await client.connect() ; 
    console.log("redis connected") ; 
    }catch(err){
        console.log(`err : ${err.message}`);
    }
}
export {client} ; 
export default redisClient ; 