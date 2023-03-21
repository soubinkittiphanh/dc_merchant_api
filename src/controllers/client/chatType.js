const Db = require('../../config/dbcon')

const createChatType=async(req,res)=>{
    const body =req.body;
    console.log("************* CREATE CHAT TYPE *****************");
    console.log(`*************Payload: ${body.cust_id} *****************`);
    
    const chat_type_code=body.chat_type_code;
    const chat_type_name=body.chat_type_name;
    const chat_type_remark=body.chat_type_remark;
    const custId=body.cust_id;
    const sqlCom=`INSERT INTO chat_type( code, name, remark) VALUES ('${chat_type_code}','${chat_type_name}','${chat_type_remark}')`
     Db.query(sqlCom,(er,re)=>{
        if(er) return res.send("Error: "+er)
        res.send("Transaction completed");
    })
}
const updateChatType=async(req,res)=>{
    const body =req.body;
    console.log("************* UPDATE CHAT TYPE *****************");
    console.log(`*************Payload: ${body.chat_type_id} *****************`);
    const chat_type_id=body.chat_type_id;
    const chat_type_code=body.chat_type_code;
    const chat_type_name=body.chat_type_name;
    const chat_type_remark=body.chat_type_remark;
    
    const sqlCom=`UPDATE chat_type SET  name='${chat_type_name}', remark='${chat_type_remark}',code='${chat_type_code}' WHERE id='${chat_type_id}'`
    
     Db.query(sqlCom,(er,re)=>{
        if(er) return res.send("Error: "+er);
        res.send("Transaction completed");
    });
}
const fetchChatType=async(req,res)=>{
    
    console.log("************* FETCH CHAT TYPE *****************");
    console.log(`*************Payload: NONE *****************`);
    const sqlCom=`SELECT * FROM chat_type`
     Db.query(sqlCom,(er,re)=>{
        if(er) return res.send("Error: "+er);
        res.send(re);
    });
}
module.exports={
    createChatType,
    updateChatType,
    fetchChatType,
}