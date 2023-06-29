

const validateToken = require("../../../api/jwtApi")
const controller = require("./controller")
const service = require("./service")
const express = require("express")
const router = express.Router()

const validator = require("./validator")
router.use(validateToken)
// No auth 
// router.use((req,res,next)=>{
//     next()
// })
router.post("/create",validator.createReceiveHeaderValidation, controller.createOutlet)
    .put("/update/:id",validator.updateReceiveHeaderValidation, controller.updateOutletById)
    .delete("/find/:id", controller.deleteOutletById)
    .get("/find", controller.getAllOutlets)
    .get("/find/:id", controller.getOutletById)
    // .post("/bulkCreate",service.createHulkStockCard)
module.exports = router