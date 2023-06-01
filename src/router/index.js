const orderRouter = require("./orderRouter")
const dymCustomerRouter =require("./dymCustomerRouter")
const reportRouter =  require("./reportRouter")
const generalLedger = require("./generalLedger")
const chartAccount = require("./chartOfAccount")
const upgrade = require("./upgrade")
const rider = require("../controllers/admin/rider").router
module.exports={
    orderRouter,
    dymCustomerRouter,
    reportRouter,
    generalLedger,
    chartAccount,
    upgrade,
    rider
}