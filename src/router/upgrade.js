
const logger = require('../api/logger');
const dbAsync = require('../config/dbconAsync');

const router = require("express").Router()
router.use((req, res, next) => {
    next()
})

router.post("/movefeedistcount", async (req, res) => {
    const sql = `SELECT locking_session_id, product_discount, cod_fee, rider_fee FROM user_order`
    const [rows, fields] = await dbAsync.query(sql)
    rows.forEach(async (el) => {
        logger.info("Fee " + el.cod_fee + " discount " + el.product_discount + " rider " + el.rider_fee)
        const updateDycustomer = `update dynamic_customer SET discount=${el.product_discount},cod_fee=${el.cod_fee},rider_fee=${el.rider_fee} WHERE locking_session_id = '${el.locking_session_id}'`
        await updateDynCustomer(updateDycustomer)
    })
    res.status(200).send("Upgrade")
})

const updateDynCustomer = async (sql) => {
    const [rows, fields] = await dbAsync.query(sql)
    logger.info("=> Update result " + rows.message + "Change rows" + rows.changedRows)
}

module.exports = router