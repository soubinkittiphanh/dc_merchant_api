const Db = require('../../config/dbcon');
const createProd = async (req, res) => {
    console.log("*************** CREATE PRODUCT  ***************");
    console.log(`*************Payload: *****************`);
    console.log(req.body.FORM);
    const body = JSON.parse(req.body.FORM);
    const pro_cat = body.pro_category;
    let pro_id = body.pro_id;
    const pro_name = body.pro_name;
    const pro_price = body.pro_price;
    const pro_desc = body.pro_desc;
    const pro_status = +body.pro_status;
    const image_path = req.body.imagesObj;
    const outlet = body.pro_outlet
    const costPrice = body.pro_cost_price;
    const retail_percent = body.pro_retail_price||0.0;
    let sqlComImages = 'INSERT INTO image_path(pro_id, img_name, img_path)VALUES';
    console.log("************* CREATE PRODUCT *****************");
    console.log(`*************Payload: ${image_path} *****************`);/// test upload
    //*****************  QUERY LAST PRODUCT ID SQL  *****************//
     Db.query('SELECT MAX(pro_id) AS ID FROM product HAVING MAX(pro_id) IS NOT NULL', (er, re) => {
        console.log("=====> Processing product db");
        if (er) return res.send("Error: " + er)
        if (re.length < 1) pro_id = 1000;
        else pro_id = parseInt(re[0]['ID']) + 1
        image_path.forEach((i, idx, element) => {
            console.log("Element len: " + element.length);
            console.log("Element name: " + i.name);
            console.log("Element i: " + i);
            console.log("Element idx: " + idx);
            if (idx === element.length - 1) sqlComImages += `(${pro_id},'${i.name}','${i.path}');`;
            else sqlComImages += `(${pro_id},'${i.name}','${i.path}'),`;

        });
        const sqlCom = `INSERT INTO product(pro_category, pro_id, pro_name, pro_price, pro_desc, pro_status,retail_cost_percent,outlet,cost_price)VALUES('${pro_cat}','${pro_id}','${pro_name}','${pro_price}','${pro_desc}','${pro_status}','${retail_percent}','${outlet}','${costPrice}');`
        //*****************  INSERT PRODUCT SQL  *****************//
        Db.query(sqlCom, (er, re) => {
            console.log("Execute:=>");
            if (er) {
                // res.status(503).({"Error":er});
                res.send('Error naja :-) ໂປແກມເມີ ກາກ.... ' + er);
            } else if (re) {
                //*****************  INSERT IMAGES SQL  *****************//
                Db.query(sqlComImages, (er, re) => {
                    if (er) return res.send("Error: naja :-) ໂປແກມເມີ ກາກ.... " + er);
                    res.send("Transaction completed");
                });
            }
        })
    })

}
const updateProd = async (req, res) => {
    console.log("*************** UPDATE PRODUCT  ***************");
    console.log(`*************Payload: *****************`);
    console.log(req.body.FORM);
    const body = JSON.parse(req.body.FORM);
    const pro_cat = body.pro_category;
    let pro_id = body.pro_id;
    const pro_name = body.pro_name;
    const pro_price = body.pro_price;
    const pro_desc = body.pro_desc;
    const pro_status = +body.pro_status;
    const image_path = req.body.imagesObj;
    const cost_price = body.pro_cost_price;
    const outlet = body.outlet;
    console.log('cost '+cost_price);
    console.log('outlet '+outlet);
    const retail_percent = body.pro_retail_price||0.0;
    let sqlComImages = 'INSERT INTO image_path(pro_id, img_name, img_path)VALUES';
    const sqlCom = `UPDATE product SET pro_category='${pro_cat}', pro_name='${pro_name}', pro_price='${pro_price}', pro_desc='${pro_desc}', pro_status='${pro_status}',retail_cost_percent='${retail_percent}',cost_price='${cost_price}',outlet='${outlet}' WHERE pro_id='${pro_id}'`
    console.log("************* UPDATE PRODUCT *****************");
    console.log(`*************Payload: ${req.body.imagesObj} *****************`);
     Db.query(sqlCom, (er, re) => {
        if (er) return res.send('Error: ' + er)

        if (image_path.length < 1) return res.send('Transaction completed');
        image_path.forEach((i, idx, element) => {
            console.log("Element len: " + element.length);
            console.log("Element name: " + i.name);
            console.log("Element i: " + i);
            console.log("Element idx: " + idx);
            if (idx === element.length - 1) sqlComImages += `(${pro_id},'${i.name}','${i.path}');`;
            else sqlComImages += `(${pro_id},'${i.name}','${i.path}'),`;

        });
        //*****************  INSERT IMAGES SQL  *****************//
        Db.query(sqlComImages, (er, re) => {
            if (er) return res.send("Error: naja :-) ໂປແກມເມີ ກາກ.... " + er);
            res.send("Transaction completed");
        });

    })
}
const fetchProd = async (req, res) => {
    console.log("*************** FETCH PRODUCT ***************");
    console.log(`*************Payload: *****************ss`);
    // const sqlCom=`SELECT p.*,c.categ_name,IFNULL(i.img_name,'No image') AS img_name,i.img_path,IFNULL(d.card_count,0) AS card_count ,IFNULL(s.cnt,0) AS sale_count FROM product p 
    // LEFT JOIN product_category c ON c.categ_id=p.pro_category 
    // LEFT JOIN image_path i ON i.pro_id=p.pro_id
    // LEFT JOIN  (SELECT IFNULL(COUNT(pro_id),0) AS cnt,pro_id FROM card_sale GROUP BY pro_id ) s ON s.pro_id=p.pro_id 
    // LEFT JOIN (SELECT d.product_id AS card_pro_id,COUNT(d.card_number)-COUNT(cs.card_code) AS card_count FROM card d
    //            LEFT JOIN card_sale cs ON cs.card_code=d.card_number
    //             WHERE d.card_isused!=2
    //            GROUP BY d.product_id) d 
    // ON d.card_pro_id=p.pro_id ORDER BY p.pro_price;`;
    const sqlCom =`SELECT p.*,c.categ_name,IFNULL(i.img_name,'No image') AS img_name,i.img_path,
    p.stock_count AS card_count ,IFNULL(s.cnt,0) AS sale_count, o.name AS outlet_name
    FROM product p 
    LEFT JOIN product_category c ON c.categ_id=p.pro_category
    LEFT JOIN outlet o ON o.id = p.outlet
    LEFT JOIN image_path i ON i.pro_id=p.pro_id
    LEFT JOIN  (SELECT IFNULL(COUNT(pro_id),0) AS cnt,pro_id FROM card_sale GROUP BY pro_id ) s ON s.pro_id=p.pro_id ORDER BY p.pro_price;`
    // const sqlCom =`SELECT p.*,c.categ_name,IFNULL(i.img_name,'No image') AS img_name,i.img_path,
    // p.stock_count AS card_count ,IFNULL(s.cnt,0) AS sale_count 
    // FROM product p 
    // LEFT JOIN product_category c ON c.categ_id=p.pro_category
    
    // LEFT JOIN image_path i ON i.pro_id=p.pro_id
    // LEFT JOIN  (SELECT IFNULL(COUNT(pro_id),0) AS cnt,pro_id FROM card_sale GROUP BY pro_id ) s ON s.pro_id=p.pro_id ORDER BY p.pro_price;`
     Db.query(sqlCom, (er, re) => {
        if (er) return res.send('SQL ' + er)
        res.send(re)
    })
}
const fetchProdMobile = async (req, res) => {
    console.log("*************** FETCH PRODUCT ***************");
    console.log(`*************Payload: *****************ss`);
    const sqlCom=`SELECT p.*,c.categ_name,IFNULL(i.img_name,'No image') AS img_name,i.img_path,
    p.stock_count AS card_count ,IFNULL(s.cnt,0) AS sale_count, o.name AS outlet_name
    FROM product p 
    LEFT JOIN product_category c ON c.categ_id=p.pro_category
    LEFT JOIN outlet o ON o.id = p.outlet
    LEFT JOIN image_path i ON i.pro_id=p.pro_id
    LEFT JOIN  (SELECT IFNULL(COUNT(pro_id),0) AS cnt,pro_id FROM card_sale GROUP BY pro_id ) s ON s.pro_id=p.pro_id ORDER BY p.pro_price;`;
    Db.query(sqlCom, (er, re) => {
        if (er) return res.send('SQL ' + er)
        res.send(re)
    })
}
const fetchProdId = async (req, res) => {
    console.log("*************** FETCH PRODUCT BY ID  ***************");
    console.log(`*************Payload: *****************`);
    const pro_id = req.body.proid;
    Db.query(`SELECT p.*,i.img_name,i.img_path FROM product p 
    LEFT JOIN image_path i ON i.pro_id=p.pro_id 
    WHERE p.pro_id=${pro_id}`, (er, re) => {
        if (er) return res.send('SQL ' + er)
        res.send(re)
    })
    //1635062891981300
}

module.exports = {
    createProd,
    updateProd,
    fetchProd,
    fetchProdId,
    fetchProdMobile,
}