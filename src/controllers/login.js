
const Token=require('../config')
const jwt=require('jsonwebtoken');
const login=(reg,res)=>{

    console.log("*************** LOGIN  ***************");
    const username={user:reg.body.username};
    const accessToken=jwt.sign(username,Token.actksecret,{expiresIn:'1m'});
    res.json({accessToken:accessToken})
}

module.exports={login}