const Db = require('../../config/dbcon');

const fetchStockCategory=async(req,res)=>{
    const body=req.body;
    console.log("*************** FETCH STOCK CATEOGRY  ***************");
    console.log(`*************Payload: ${body} *****************`);
     Db.query("SELECT card_type_code,card_type_name FROM card_type",(er,re)=>{
        if (er) return res.send("Error: "+er);
        res.send(re);
    })
}

module.exports={
    fetchStockCategory,
}