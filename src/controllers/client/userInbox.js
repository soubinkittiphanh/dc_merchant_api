const Db = require('../../config/dbcon')

const fetchInbox=async(req,res)=>{
    const body =req.query;
    console.log("************* LOAD INBOX *****************");
    console.log(`*************Payload: ${body.cust_id} *****************`);
    const custId=body.cust_id;
    const sqlCom=`SELECT s.*,p.pro_category FROM card_sale s LEFT JOIN product p ON p.pro_id=s.pro_id WHERE s.card_order_id IN (SELECT order_id FROM user_order WHERE user_id='${custId}') ORDER BY s.id DESC`
    Db.query(sqlCom,(er,re)=>{
        if(er) return res.send("Error: "+er)
        res.send(re);
    })
}
const fetchInboxByOrderId=async(req,res)=>{
    const body =req.query;
    console.log("************* LOAD INBOX *****************");
    console.log(`*************Payload: ${body.cust_id} *****************`);
    const custId=body.cust_id;
    const sqlCom=`SELECT s.*,p.pro_category FROM card_sale s LEFT JOIN product p ON p.pro_id=s.pro_id WHERE s.card_order_id IN (SELECT order_id FROM user_order WHERE user_id='${custId}') ORDER BY s.id DESC`
     Db.query(sqlCom,(er,re)=>{
        if(er) return res.send("Error: "+er)
        res.send(re);
    })
}
const markReaded=async(req,res)=>{
    const body =req.body;
    console.log("************* MARK INBOX AS READED *****************");
    console.log(`*************Payload: ${body.card_number} *****************`);
    
    const card_number=body.card_number;
    console.log("===>> "+card_number);
     Db.query(`UPDATE card_sale SET mark_readed=1 WHERE card_code='${card_number}'`,(er,re)=>{
        if(er) return res.send("Error: "+er);
        res.send("Transaction completed");
    });
}
module.exports={
    fetchInbox,
    markReaded,
}