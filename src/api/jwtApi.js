
const jwt = require('jsonwebtoken');
const secretKey = require('../config').actksecret;
function validateToken(req, res, next) {
    const dateTime = new Date(Date.now()).toLocaleString()
    console.log("Request date time ",dateTime);
    const authHeader = req.headers['authorization']
    console.log("Middleware header: "+authHeader);
    const token = authHeader && authHeader.split(' ')[1]
    console.log("Token: ",token || "No token provided");
    if (token == null) return res.status(401).send('Invalid token')
    jwt.verify(token, secretKey, (er, user) => {
        if (er) return res.status(403).send('Token invalid or expired!')//res.sendStatus(403).send('invalid')
        console.log(user);
        req.user = user;
        next()
    })
}

module.exports = validateToken