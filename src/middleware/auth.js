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

const getUserFromToken= (req, res) =>{
    const dateTime = new Date(Date.now()).toLocaleString()
    console.log("Get user from Token: ",dateTime);
    const authHeader = req.headers['authorization']
    console.log("Middleware header: "+authHeader);
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.status(401).send('Invalid token')
    jwt.verify(token, secret, (er, user) => {
        if (er) return res.status(403).send('Token invalid or expired!')//res.sendStatus(403).send('invalid')
        console.log(user);
        res.status(200).send({user})
    })
}

const deleteToken = (req,res)=>{
    const dateTime = new Date(Date.now()).toLocaleString()
    console.log("Signout: ",dateTime);
    const authHeader = req.headers['authorization']
    console.log("Middleware header: "+authHeader);
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.status(401).send('Invalid token')
    const decodedToken = jwt.decode(token);
    decodedToken.exp = 0;
    res.status(200).send({status:'succeed'})
}
module.exports={
    validateToken,
    getUserFromToken,
    deleteToken,
}