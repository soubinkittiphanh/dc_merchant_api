const  Db =require('../config/dbcon');
const remove=async(req)=>{
    const image_name=req;
     Db.query(`DELETE FROM image_path WHERE img_name='${image_name}'`,(er,re)=>{
        er&&console.log('Error: '+er);
        if (er) return false
        return true
    })

}
module.exports={
    remove,
}