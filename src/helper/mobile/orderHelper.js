const dbAsync = require('../../config/dbconAsync')

const checkStockAvailability = async (product_id, order_qty, lockingSessionId) => {

    // 200 = no error available
    // 500 = SQL ERROR
    // 503 = Product stock not suffient
    console.log("Product: " + product_id);
    console.log("Product qty: " + order_qty);
    // const sqlCom = `SELECT p.pro_id,IFNULL(s.card_count,0) AS card_count FROM product p LEFT JOIN (SELECT d.product_id AS card_pro_id,COUNT(d.card_number)-COUNT(cs.card_code) AS card_count FROM card d LEFT JOIN card_sale cs ON cs.card_code=d.card_number WHERE d.product_id ='${product_id}' GROUP BY d.product_id) s ON s.card_pro_id = p.pro_id WHERE p.pro_id='${product_id}'`;
    const sqlCom = `SELECT c.product_id AS pro_id,IFNULL(COUNT(c.card_number),0) AS card_count FROM card c WHERE c.product_id='${product_id}' AND c.card_isused=0`;
    let stockCount = 0;
    let statusCode = 0;
    try {
        const response = await dbAsync.query(sqlCom);
        stockCount = response[0][0]["card_count"];
        const productId = response[0][0]["pro_id"];
        console.log("Stock count: " + stockCount + ', Product: ' + productId);
        if (stockCount - order_qty < 0) {
            statusCode = 503
            console.log("Statuscode: " + statusCode);
        } else {
            statusCode = 200;
            console.log("Statuscode: " + statusCode);
            let cardLockingResponse = await lockCardRecord(lockingSessionId, order_qty,product_id);
            if (cardLockingResponse.includes('05')) {
                statusCode = 503
            } else {
                // ******* gen some log for no error *********
            }
        }
    } catch (error) {
        console.log(("Error: " + error));
    }
    console.log("Status: " + statusCode);
    return statusCode;
}

//******** Lock card record during processing order inorder to avoid dupplicate card number saling ******* */
const lockCardRecord = async (lockingSessionId, order_qty,product_id) => {
    let lockCardRecordResponse = '00';
    const sqlCom = `UPDATE card SET locking_session_id='${lockingSessionId}',card_isused=3 WHERE product_id='${product_id}' AND card_isused=0 LIMIT ${order_qty}`
    try {
        const response = await dbAsync.query(sqlCom);
        console.log(`******* Locking card sale response( no error ): +${response}`);
    } catch (error) {
        console.log("SOME ERROR DURING LOCKING card RECORD " + error);
        lockCardRecordResponse = '05'
        console.log(("Error: " + error));
    }
    return lockCardRecordResponse;
}

module.exports = {
    checkStockAvailability,
}