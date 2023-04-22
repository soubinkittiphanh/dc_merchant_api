const express = require("express")
const router = express.Router()
const orderController = require("../controllers/client/userOrder")
const validateToken = require('../api').jwtApi
router.use(validateToken)
// router.use((req,res,next)=>{
//     const isAuthen = true;
//     console.log("Request raised: ",Date.now().toLocaleString());
//     if(!isAuthen) return res.status(403).send("Unauthorize request")
//     next();
// })

router.get("/findByUserId",orderController.findOrderByUserId)
.put("/changeOrderStatus",orderController.changeOrderStatus)

module.exports = router;