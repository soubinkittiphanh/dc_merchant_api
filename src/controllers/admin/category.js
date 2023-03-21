const Db = require('../../config/dbcon')
const createCate = async (req, res) => {
    const cat_id = req.body.cat_id;
    console.log("*************** CREATE CATE ***************");
    console.log(`*************Payload: ${cat_id} *****************`);
    const cat_name = req.body.cat_name;
    const cat_desc = req.body.cat_desc;
    console.log(req.body.cat_id);
    console.log(req.body);
    let gen_cat_id = 1000;
    // console.log("GEN: " + gen_cat_id);
    // cat_id=gen_cat_id;
     Db.query("SELECT MAX(categ_id) AS ID FROM product_category HAVING MAX(categ_id) IS NOT null", (er, re) => {
        if (er) res.send("Error: " + er);
        if (re.length < 1)  gen_cat_id=1000 
        else gen_cat_id=parseInt((re[0]['ID'])) + 1
        console.log("RES1: " + gen_cat_id);
        Db.query("INSERT INTO `product_category`(`categ_id`,`categ_name`,`categ_desc`)VALUES(?,?,?)", [gen_cat_id, cat_name, cat_desc], (er, re) => {
            if (er) {
                res.send('Error: ' + er).status(503);
            } else if (re) {
                console.log("GEN2: " + gen_cat_id);
                res.send('Transaction completed').status(200);
            }
        });
    })
    console.log("GEN1.5: " + gen_cat_id);
    
}
const updateCate = async (req, res) => {
    console.log("*************** UPDATE CATEG ***************");
    const cat_id = req.body.cat_id;
    console.log(`*************Payload: ${cat_id} *****************`);
    const cat_name = req.body.cat_name;
    const cat_desc = req.body.cat_desc;
    console.log(req.body);
    const sqlCom = `UPDATE product_category SET categ_name='${cat_name}', categ_desc='${cat_desc}' WHERE categ_id=${cat_id}`;
     Db.query(sqlCom, (er, re) => {
        if (er) {
            res.send("Error: " + er).status(503)
        } else if (re) {
            res.send('Transactoin completed').status();
        }

    })
}
const fetchCate=async(req,res)=>{
    console.log("*************** FETCH CATEG ***************");
    console.log(`*************Payload:*****************`);
     Db.query("SELECT categ_id, categ_name,categ_desc FROM product_category",(er,re)=>{
        if (er) return res.send("Error: "+er)
        res.send(re);
    })
}
// ******* FUNCTION BELOW IS NOT USED ||PROBLEM WITH A WAIT IS NOT AWAIT******
const generateId = async () => {
    console.log("*************** GENERATE ID CATEG  ***************");
    console.log(`*************Payload: *****************`);
     Db.query("SELECT MAX(categ_id) AS ID FROM product_category HAVING MAX(categ_id) IS NOT null", (er, re) => {
        if (er) return console.log("Error: " + er);
        if (re.length < 1) { return 1000 }
        const id = parseInt((re[0]['ID'])) + 1
        console.log("RES: " + id);
        console.log("RES: " + re[0]['ID'] + 1);
        return id
    })
}

module.exports = {
    createCate,
    updateCate,
    fetchCate,
}