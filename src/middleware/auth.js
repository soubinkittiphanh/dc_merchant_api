const secret=require('../config/').actksecret
const jwt=require('jsonwebtoken');
const validateToken=async(req,res,done)=>{
    const {authorization} =req.headers;
    const token =authorization&&authorization.split(" ")[1];
    console.log("Token: "+token);
    console.log("Secret: "+secret);
    if (token == null) return res.json({status:"02",desc:"No token"})
    jwt.verify(token,secret,(er,result)=>{
        if(er) return res.json({status:"02",desc:er})
        // res.send({"status":"00",desc:"Token is valid"})
        done();

    })
}
module.exports={
    validateToken,
}