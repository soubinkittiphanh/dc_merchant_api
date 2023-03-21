const Db = require('../../config/dbcon');

const createTxnHis = async (req, res) => {

    const body = req.body
    console.log("************* CREATE TXN_HISTORY *****************");
    console.log(`*************Payload: ${body.txn_his_inputter} *****************`);
    console.log(req.body);
    let txn_his_id = body.txn_his_id;
    const txn_id = body.txn_id;
    const txn_his_amount = body.txn_his_amount;
    const user_id = body.user_id;
    const txn_his_inputter = body.txn_his_inputter;
    const txn_his_date = body.txn_his_date;
    let txn_date;
     Db.query("SELECT MAX(txn_his_id) AS ID FROM transaction_history HAVING MAX(txn_his_id) IS NOT NULL", (er, re) => {
        if (er) return res.send("Error: " + er)
        if (re.length < 1) txn_his_id = 1000
        else txn_his_id = parseInt(re[0]['ID']) + 1
        const sqlCom = `INSERT INTO transaction_history(txn_his_id, txn_id, txn_his_amount, user_id, txn_his_inputter) VALUES
        ('${txn_his_id}','${txn_id}','${txn_his_amount}','${user_id}','${txn_his_inputter}')`
        Db.query(sqlCom, (er, re) => {
            if (er) return res.send('Error: ' + er)
            res.send('Transaction completed')
        })
    })
}
const updateTxnHis = async (req, res) => {
    console.log("*************** UPDATE TXN HIS  ***************");
    console.log(`*************Payload: ${req.body} *****************`);
    console.log(req.body);
    const body = req.body
    let txn_his_id = body.txn_his_id;
    const txn_id = body.txn_id;
    const txn_his_amount = body.txn_his_amount;
    const user_id = body.user_id;
    const txn_his_inputter = body.txn_his_inputter;
    const txn_his_date = body.txn_his_date;
    let txn_date = new Date().toISOString().slice(0, 19).replace('T', ' ');
    console.log("Date: " + new Date().toISOString().slice(0, 19).replace('T', ' '));
    const sqlCom = `UPDATE transaction_history SET txn_his_id='${txn_his_id}', txn_id='${txn_id}', txn_his_amount='${txn_his_amount}',
    txn_his_amount='${txn_his_amount}',user_id='${user_id}',txn_his_inputter='${txn_his_inputter}',txn_his_date='${txn_date}' WHERE txn_his_id='${txn_his_id}'`
     Db.query(sqlCom, (er, re) => {
        if (er) return res.send('Error: ' + er)
        res.send('Transaction completed')
    })
}
const fetchTxnHis = async (req, res) => {
    console.log("*************** FETCH TXN HIS  ***************");
    console.log(`*************Payload: ${req.body} *****************`);
     Db.query('SELECT * FROM transaction_history', (er, re) => {
        if (er) res.send("Error: " + er)
        res.send(re)
    })
}

module.exports = {
    createTxnHis,
    updateTxnHis,
    fetchTxnHis,

}