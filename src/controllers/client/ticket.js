const Db=require("../../config/dbcon");

const getTicketHeaderInfo=async(req,res)=>{
    Db.query('SELECT * FROM ticket_header ORDER BY ticket_price',(er,re)=>{
        if(er){
         return   console.log("Cannot get ticket header "+er);
        }
        return res.send(re);
    })
}

module.exports={getTicketHeaderInfo}