const Db = require('../../config/dbcon');

const createTxnType = async (req, res) => {
    console.log("*************** CREATE TXN TYPE  ***************");
    console.log(`*************Payload: ${req.body} *****************`);
    console.log(req.body);
    const body = req.body
    let txn_type_id = body.txn_type_id;
    const txn_type_name = body.txn_type_name;
    const txn_type_desc = body.txn_type_desc;
    const txn_sign = body.txn_sign;
     Db.query("SELECT MAX(txn_code_id) AS ID FROM transaction_code HAVING MAX(txn_code_id) IS NOT NULL", (er, re) => {
        if (er) return res.send("Error: " + er)
        if (re.length < 1) txn_type_id = 1000
        else txn_type_id = parseInt(re[0]['ID']) + 1
        const sqlCom = `INSERT INTO transaction_code(txn_code_id, txn_code_name, txn_code_desc, txn_sign) VALUES('${txn_type_id}','${txn_type_name}','${txn_type_desc}','${txn_sign}')`
        Db.query(sqlCom, (er, re) => {
            if (er) return res.send('Error: ' + er)
            res.send('Transaction completed')
        })
    })
}
const updateTxnType = async (req, res) => {
    console.log("*************** UPDATE TXN TYPE  ***************");
    console.log(`*************Payload: ${req.body} *****************`);
    console.log(req.body);
    const body = req.body
    let txn_type_id = body.txn_type_id;
    const txn_type_name = body.txn_type_name;
    const txn_type_desc = body.txn_type_desc;
    const txn_sign = body.txn_sign;

    const sqlCom = `UPDATE transaction_code SET txn_code_name='${txn_type_name}', txn_code_desc='${txn_type_desc}',
    txn_sign='${txn_sign}' WHERE txn_code_id='${txn_type_id}'`
     Db.query(sqlCom, (er, re) => {
        if (er) return res.send('Error: ' + er)
        res.send('Transaction completed')
    })
}
const fetchTxnType = async (req, res) => {
    console.log("*************** FETCH TXN TYPE  ***************");
    console.log(`*************Payload: ${req.body} *****************`);
     Db.query('SELECT * FROM transaction_code', (er, re) => {
        if (er) res.send("Error: " + er)
        res.send(re)
    })
}

module.exports = {
    createTxnType,
    updateTxnType,
    fetchTxnType,

}