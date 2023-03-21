const Db= require('../../config/dbcon');
const createSale=async(req,res)=>{
    console.log("*************** CREATE SALE  ***************");
    console.log(`*************Payload: ${req.body}*****************`);
    console.log(req.body);
    const body=req.body
    const sale_id=body.sale_id;
    const pro_id=body.pro_id;
    const sale_amt=body.sale_amount;
    const sale_price=body.sale_price;
    const user_id=body.user_id;
    const inputter=body.inputter_id;
    const date= Date().toString();
    console.log(date.substr(0,8));
    const sale_status=body.sale_status;
    const sale_desc=body.sale_desc;
    const sqlCom=`INSERT INTO sale(sale_id, prod_id, sale_amount, sale_price, user_id, inputter, sale_status, sale_desc) VALUES ('${sale_id}','${pro_id}','${sale_amt}','${sale_price}','${user_id}','${inputter}','${sale_status}','${sale_desc}')`
    Db.query(sqlCom,(er,re)=>{
        if(er){
            res.send('Error: '+er).status();
        }else if(re){
            res.send('Transaction completed').status();
        }else{
            res.send('Something went wrong: Unknow error');
        }
    })
    
}
const updateSale=async(req,res)=>{
    console.log("*************** UPDATE SALE  ***************");
    console.log(`*************Payload: *****************`);
    console.log(req.body);
    const body=req.body;
    const sale_id=body.sale_id;
    const pro_id=body.pro_id;
    const sale_amt=body.sale_amount;
    const sale_price=body.sale_price;
    const user_id=body.user_id;
    const inputter=body.inputter_id;
    const date= Date().toString();
    console.log(date.substr(0,8));
    const sale_status=body.sale_status;
    const sale_desc=body.sale_desc;
    const sqlCom=`UPDATE sale SET prod_id='${pro_id}', sale_amount='${sale_amt}', 
    sale_price='${sale_price}', user_id='${user_id}', inputter='${inputter}', sale_status='${sale_status}', sale_desc='${sale_desc}' WHERE  sale_id='${sale_id}'`
    Db.query(sqlCom,(er,re)=>{
        if(er){
            res.send('Error: '+er).status();
        }else if(re){
            res.send('Transaction completed').status();
        }else{
            res.send('Something went wrong: Unknow error');
        }
    })
}

module.exports={
    createSale,
    updateSale,
}