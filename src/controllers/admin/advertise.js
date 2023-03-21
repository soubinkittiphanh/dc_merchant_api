const Db = require('../../config/dbcon')
const fetchAd=async(req,res)=>{

    console.log("************* FETCH ADVERTISE *****************");
    console.log(`*************Payload: NONE *****************`);

    const sqlCom=`SELECT * FROM image_path_ad WHERE id =(SELECT MAX(id) FROM image_path_ad)`
     Db.query(sqlCom,(er,re)=>{
        if(er)return res.send("Error: "+er)
        res.send(re);
    })
}
const updateAd=async(req,res)=>{

    const body=req.body;
    console.log("************* TOGGLE ADVERTISE *****************");
    console.log(`*************Payload: ${body} *****************`);
    const id=body.id;
    const isactive=body.active;
    const sqlCom=`UPDATE image_path_ad SET isactive='${isactive}' WHERE id=${id}`
    console.log(sqlCom);
     Db.query(sqlCom,(er,re)=>{
        if(er)return res.send("Error: "+er)
        res.send("Transaction completed");
    })
}

module.exports={
    fetchAd,
    updateAd,
}