const Db = require('../../config/dbcon');

const createTxn = async (req, res) => {
    console.log("*************** CREATE TXN  ***************");
    console.log(`*************Payload: ${req.body} *****************`);
    console.log(req.body);
    const body = req.body
    let txn_id = body.txn_id;
    const txn_type = body.txn_type;
    const txn_name = body.txn_name;
    const txn_amount = body.txn_amount;
    const txn_user_id = body.txn_user_id;
    const txn_inputter = body.txn_inputter;
    let txn_date;
     Db.query("SELECT MAX(txn_id) AS ID FROM transaction HAVING MAX(txn_id) IS NOT NULL", (er, re) => {
        if (er) return res.send("Error: " + er)
        if (re.length < 1) txn_id = 1000
        else txn_id = parseInt(re[0]['ID']) + 1
        const sqlCom = `INSERT INTO transaction(txn_id, txn_code, txn_name, txn_amount, txn_user_id, txn_inputter) VALUES
        ('${txn_id}','${txn_type}','${txn_name}','${txn_amount}','${txn_user_id}','${txn_inputter}')`
        Db.query(sqlCom, (er, re) => {
            if (er) return res.send('Error: ' + er)
            res.send('Transaction completed')
        })
    })
}
const updateTxn = async (req, res) => {
    console.log("*************** UPDATE TXN  ***************");
    console.log(`*************Payload: ${req.body} *****************`);
    console.log(req.body);
    const body = req.body
    let txn_id = body.txn_id;
    const txn_type = body.txn_type;
    const txn_name = body.txn_name;
    const txn_amount = body.txn_amount;
    const txn_user_id = body.txn_user_id;
    const txn_inputter = body.txn_inputter;
    let txn_date=new Date().toISOString().slice(0, 19).replace('T', ' ');
    console.log("Date: "+new Date().toISOString().slice(0, 19).replace('T', ' '));
    const sqlCom = `UPDATE transaction SET txn_code='${txn_type}', txn_name='${txn_name}',
    txn_amount='${txn_amount}',txn_user_id='${txn_user_id}',txn_inputter='${txn_inputter}',txn_date='${txn_date}' WHERE txn_id='${txn_id}'`
     Db.query(sqlCom, (er, re) => {
        if (er) return res.send('Error: ' + er)
        res.send('Transaction completed')
    })
}
const fetchTxn = async (req, res) => {
    console.log("*************** FETCH TXN  ***************");
    console.log(`*************Payload: ${req.body} *****************`);
     Db.query('SELECT * FROM transaction', (er, re) => {
        if (er) res.send("Error: " + er)
        res.send(re)
    })
}

module.exports = {
    createTxn,
    updateTxn,
    fetchTxn,

}