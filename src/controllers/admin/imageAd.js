const Db = require('../../config/dbcon');
const createAd = async (req, res) => {
    const body = req.body
    const img_name = body.img_name;
    const img_pth=body.img_pth;
    // const img_name=body.img_name;
    const sqlCom=`INSERT INTO image_path_ad(img_name,img_path)VALUES('${img_name}','${img_pth}')`
     Db.query(sqlCom, (er, re) => {
        if (er) return res.send("Error: " + er);
        return res.send("Transaction completed");
    })
}
const fetchAd = async (req, res) => {
     Db.query('', (er, re) => {
        if (er) return res.send("Error: " + er);
        return res.send(re);
    })
}
module.exports = {
    createAd,
    fetchAd,

}