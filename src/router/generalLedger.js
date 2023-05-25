const controller = require('../controllers/financial/generalLedger')
const express = require('express')
const router = express.Router();
const {body,validationResult,check} = require('express-validator')
const validator = require('validator');
router.use((req,res,next)=>{
    // res.send("test")
    console.log('Routing for GL');
    next()
})


const createValidation = [
body('accountNumber').notEmpty().withMessage('accountNumber is required'),
body("accountName").notEmpty().withMessage("Account name is require"),
check('accountNumber').custom((value) => {
    if (!value) {
        throw new Error('accountNumber is required');
      }
    if (!validator.isNumeric(value)) {
      throw new Error('accountNumber type is number');
    }
    return true;
  })
]

const updateValidation = [
    body("accountName").notEmpty().withMessage("Account name is require"),
    body("id").notEmpty().withMessage("Id  is require"),
]
router
.post('/generate',controller.generateGL)
.get("/find",controller.findAll)
.post("/create",createValidation,controller.create)
.put("/update",updateValidation,controller.update)





module.exports = router;