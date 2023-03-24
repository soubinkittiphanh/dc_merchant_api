const Db = require('../../config/dbcon')
const getShippingList = async (req, res) => {
    console.log("*************** GET OUTLET ***************");
    const sqlCom = `SELECT * FROM shipping`;
     Db.query(sqlCom, (er, re) => {
        if (er) {
            res.send("Error: " + er).status(503)
        } else if (re) {
            res.send(re);
        }

    })
}
module.exports = {
    getShippingList
}