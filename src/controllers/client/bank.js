const Db = require('../../config/dbcon')

const createBankID = async (req, res) => {
    const body = req.body;
    console.log("************* CREATE BANK ID *****************");
    console.log(`*************Payload: ${body} *****************`);
    const bnk_code = body.bnk_code;
    const bnk_name = body.bnk_name;
    const bnk_remark = body.bnk_remark;
    const sqlCom = `INSERT INTO bank( code, bank_name, bank_remark) VALUES ('${bnk_code}','${bnk_name}','${bnk_remark}')`
     Db.query(sqlCom, (er, re) => {
        if (er) return res.send("Error: " + er);
        res.send("Transaction completed");
    });
}

const updateBankID = async (req, res) => {
    const body = req.body;
    console.log("************* UPDATE BANK ID *****************");
    console.log(`*************Payload: ${body} *****************`);
    const bnk_id = body.bnk_id;
    const bnk_code = body.bnk_code;
    const bnk_name = body.bnk_name;
    const bnk_remark = body.bnk_remark;
    const sqlCom = `UPDATE  bank SET code='${bnk_code}', bank_name='${bnk_name}', bank_remark='${bnk_remark}', code='${bnk_code}' WHERE id=${bnk_id}`
     Db.query(sqlCom, (er, re) => {
        if (er) return res.send("Error: " + er);
        res.send("Transaction completed");
    });
}
const fetchBanks = async (req, res) => {
    const body = req.body;
    console.log("************* FETCH BANKS *****************");
    console.log(`*************Payload: ${body} *****************`);
    const sqlCom=`SELECT * FROM bank`
     Db.query(sqlCom, (er, re) => {
        if (er) return res.send("Error: " + er);
        res.send(re);
    });

}
const createBankAcc = async (req, res) => {
    const body = req.body;
    console.log("************* CREATE BANK ACCOUNT *****************");
    console.log(`*************Payload: ${body} *****************`);
    const user_id = body.user_id;
    const bnk_id = body.bnk_id;
    const bnk_acc_id = body.bnk_acc_id;
    const bnk_acc_name = body.bnk_acc_name;
    const sqlCom = `INSERT INTO bank_account(bank_acc_id, bank_acc_name, user_id, bank_id) VALUES ('${bnk_acc_id}','${bnk_acc_name}','${user_id}','${bnk_id}')`
     Db.query(sqlCom, (er, re) => {
        if (er) return res.send("Error: " + er);
        res.send("Transaction completed");
    });


}
const updateBankAcc = async (req, res) => {
    const body = req.body;
    console.log("************* UPDATE BANK ACCOUNT *****************");
    console.log(`*************Payload: ${body} *****************`);
    const user_id = body.user_id;
    const bnk_id = body.bnk_id;
    const bnk_acc_id = body.bnk_acc_id;
    const bnk_acc_name = body.bnk_acc_name;
    const sqlCom = `UPDATE bank_account SET bank_acc_id='${bnk_acc_id}', bank_acc_name='${bnk_acc_name}', user_id='${user_id}', bank_id ='${bnk_id}' WHERE bank_acc_id='${bnk_acc_id}'`
     Db.query(sqlCom, (er, re) => {
        if (er) return res.send("Error: " + er);
        res.send("Transaction completed");
    });
}

const fetchBankAccByUserID = async (req, res) => {
    const body = req.query;
    console.log("************* FETCH BANK ACCOUNT BY ID *****************");
    console.log(`*************Payload: ${body} *****************`);
    const user_id = body.user_id;
    const sqlCom=`SELECT * FROM bank_account WHERE user_id='${user_id}'`
     Db.query(sqlCom, (er, re) => {
        if (er) return res.send("Error: " + er);
        res.send(re);
    });

}
const fetchBankAccByID = async (req, res) => {
    const body = req.query;
    console.log("************* FETCH BANK ACCOUNT BY ID *****************");
    console.log(`*************Payload: ${body} *****************`);
    const bnk_acc_id = body.bnk_acc_id;
    const sqlCom=`SELECT * FROM bank_account WHERE bank_acc_id='${bnk_acc_id}'`
     Db.query(sqlCom, (er, re) => {
        if (er) return res.send("Error: " + er);
        res.send(re);
    });

}
module.exports = {
    createBankID,
    updateBankID,
    createBankAcc,
    updateBankAcc,
    fetchBankAccByUserID,
    fetchBanks,
    fetchBankAccByID
}