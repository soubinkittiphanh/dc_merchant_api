

const validateToken = require("../api/jwtApi")
const controller = require("./controller")
const service = require("./service")
const express = require("express")
const router = express.Router()
const validator = require("./validator")
router.use(validateToken)

router
.post("/create",validator.createReceiveHeaderValidation, controller.createCategory)
.put("/update/:id",validator.updateReceiveHeaderValidation, controller.updateCategoryById)
.delete("/find/:id", controller.deleteCategoryById)
.get("/find", controller.getAllCategories)
.get("/find/:id", controller.getCategoryById)
// .post("/bulkCreate",service.createHulkStockCard)
module.exports = router