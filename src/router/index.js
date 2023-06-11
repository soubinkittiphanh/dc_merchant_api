const orderRouter = require("./orderRouter")
const dymCustomerRouter =require("./dymCustomerRouter")
const reportRouter =  require("./reportRouter")
const generalLedger = require("./generalLedger")
const chartAccount = require("./chartOfAccount")
const upgrade = require("./upgrade")
const rider = require("../controllers/admin/rider").router
const campaign = require("../controllers/admin/campaign").router
const campaignEntry = require("../controllers/admin/campaign/entry").router
const card = require("../card").router
module.exports={
    orderRouter,
    dymCustomerRouter,
    reportRouter,
    generalLedger,
    chartAccount,
    upgrade,
    rider,
    campaign,
    campaignEntry,
    card,
}