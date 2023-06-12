const logger = require('../api/logger');
const dbAsync = require('../config/dbconAsync');
const Card = require('../models').card
function generateRandomString(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;

    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
}

const createHulkStockCard = (req, res) => {

    const { inputter, product_id, totalCost, stocCardkQty } = req.body;
    const costPerUnit = totalCost / stocCardkQty;
    const lockingSessionId = Date.now();
    const rowsToInsert = [

    ]
    for (let index = 0; index < stocCardkQty; index++) {
        const cardSequenceNumber = Date.now().toString().concat(generateRandomString(10))
        logger.warn(cardSequenceNumber)
        rowsToInsert.push({
            //Card object
            card_type_code: 10010,// FIX Value and No meaning
            product_id: product_id,
            cost: costPerUnit, // 50.99,
            card_number: cardSequenceNumber, //'1234-5678-9012-3456',
            card_isused: 0,
            locking_session_id: lockingSessionId,
            card_input_date: new Date(),
            inputter: inputter,
            update_user: inputter,
            update_time: new Date(),
            update_time_new: new Date(),
            isActive: true,
        })
    }
    Card.bulkCreate(rowsToInsert)
        .then(() => {
            logger.info('Rows inserted successfully')
            return res.status(200).send("Transction completed")
        })
        .catch((error) => {
            logger.error('Error inserting rows:', error)
            return res.status(403).send("Server error " + error)
        });
}
const rebuildStockValue = async (req, res) => {
    logger.warn("****** Rebuild stock is on going ******")
    logger.info(`************* updateProductStockCountDirect **************`);
    const sqlCom = `UPDATE product pro INNER JOIN (SELECT d.product_id AS card_pro_id,COUNT(d.card_number)-COUNT(cs.card_code) AS card_count 
  FROM card d LEFT JOIN card_sale cs ON cs.card_code=d.card_number 
  WHERE d.card_isused!=2  
  GROUP BY d.product_id) proc ON proc.card_pro_id=pro.pro_id 
  SET pro.stock_count=proc.card_count;`

    try {
        const [rows, fields] = await dbAsync.execute(sqlCom);
        logger.info(`*********** ${new Date()} PROCESSED RECORD: ${rows.affectedRows}`);
        return res.status(200).send("Transaction completed")
    } catch (error) {
        logger.error("Cannot get product sale count");
        return res.status(401).send(error);
    }

}

module.exports = {
    createHulkStockCard,
    rebuildStockValue,
}