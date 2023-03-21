const Db = require('../../config/dbcon');
const userOrder=require("../client/userOrder");
const createStockTransaction=async(req,res)=>{
    const body=req.body;
    console.log("*************** CREATE STOCK TXN  ***************");
    console.log(`*************Payload: ${body} *****************`);
    const inputter=body.inputter_id;
    const tranastion_data=body.tranastion_data;
    const card_type=body.card_type;
    const product_id=body.product_id;
    let sqlCom=`INSERT INTO card(card_type_code, card_number, card_isused, inputter,product_id) VALUES `;
    let sqlSurveyElement='';
    let i=0;
    tranastion_data.forEach(el=>{
        console.log("start i "+i);
        // let cardText=el.replaceAll("\\","|");
        // let cardText=el.replaceAll(" ","|");
        // console.log("===>: "+cardText);
        if(i==tranastion_data.length-1){
            //Last row
            // sqlSurveyElement=sqlSurveyElement+`'${el}'`
            sqlSurveyElement=sqlSurveyElement+`'${el}'`
            sqlCom=sqlCom+`(${card_type},'${el}',0,${inputter},'${product_id}');`;
        }else{
            // sqlSurveyElement=sqlSurveyElement+`'${el}',`
            sqlSurveyElement=sqlSurveyElement+`'${el}',`
            sqlCom=sqlCom+`(${card_type},'${el}',0,${inputter},'${product_id}'),`;
        }
        i=i+1;
        
    });
    const sqlSurvey=`SELECT COUNT(c.card_number) as exist_count FROM card c WHERE c.card_number IN (${sqlSurveyElement})`
    console.log("Survey sql: "+sqlSurvey);
     Db.query(sqlSurvey,(er,re)=>{
        if(er)return res.send("Error: "+er);
        const exist_count=re[0]["exist_count"]
        if(exist_count>0) return res.send("ລາຍການຊ້ຳ ເລກບັດຊ້ຳ ຈຳນວນ: "+exist_count);
        Db.query(sqlCom,(er,re)=>{
            console.log(er);
            if (er)return res.send("Error: "+er)
            res.send("Transaction completed");
        })
    });
    //Update stock amount in product table
    updateProductStockCountDirect();

}

const updateProductStockCountDirect = async () => {
    //update product table set product sale statistic [sale amount]
  console.log(`************* ${new Date()}  updateProductStockCountDirect **************`);
  const sqlCom = `UPDATE product pro  INNER JOIN  (SELECT d.product_id AS card_pro_id,COUNT(d.card_number)-COUNT(cs.card_code) AS card_count 
  FROM card d LEFT JOIN card_sale cs ON cs.card_code=d.card_number 
  WHERE d.card_isused!=2  
  GROUP BY d.product_id) proc ON proc.card_pro_id=pro.pro_id 
  SET pro.stock_count=proc.card_count;`
  
    try {
        const [rows, fields]  = await dbAsync.execute(sqlCom);
        console.log(`*********** ${new Date()} PROCESSED RECORD: ${rows.affectedRows}`);
    } catch (error) {
        console.log("Cannot get product sale count");
    }

}

module.exports={
    createStockTransaction, 
}