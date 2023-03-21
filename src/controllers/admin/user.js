const Db = require('../../config/dbcon');
const createUser = async (req, res) => {
    console.log("*************** CREATE USER  ***************");
    console.log(`*************Payload: ${req.body} *****************`);
    console.log(req.body);
    const body = req.body;
    let user_id = body.user_id;
    const user_name = body.user_name;
    const user_pass = body.user_pass;
    const user_tel = body.user_tel;
    const user_addr = body.user_addr;
    const user_wallet = body.user_wallet;
    const user_desc = body.user_desc

     Db.query("SELECT MAX(user_id) AS ID FROM user_account HAVING MAX(user_id) IS NOT null ", (er, re) => {

        if (er) {
            return res.send("Error: " + er)
        } else {
            if (re.length < 1) user_id = 1000
            else user_id = parseInt(re[0]['ID']) + 1
            const sqlCom = `INSERT INTO user_account(user_id, user_pass, user_name, user_tel, user_addr, user_wallet, user_desc) VALUES 
            ('${user_id}','${user_pass}','${user_name}','${user_tel}','${user_addr}','${user_wallet}','${user_desc}')`
            Db.query(sqlCom, (er, re) => {
                if (er) {
                    res.send('Error: ' + er).status();
                } else if (re) {
                    res.send('Transaction completed').status();
                } else {
                    res.send('Something went wrong: Unknow error')
                }
            })

        }
    })


}
const updateUser = async (req, res) => {
    console.log("*************** UPDATE USER  ***************");
    console.log(`*************Payload: ${req.body} *****************`);
    console.log(req.body);
    const body = req.body;
    const user_id = body.user_id;
    const user_name = body.user_name;
    const user_pass = body.user_pass;
    const user_tel = body.user_tel;
    const user_addr = body.user_addr;
    const user_wallet = body.user_wallet;
    const user_desc = body.user_desc
    const sqlCom = `UPDATE user_account SET user_pass='${user_pass}',user_name='${user_name}',user_tel='${user_tel}',user_addr='${user_addr}',user_wallet='${user_wallet}',user_desc='${user_desc}' WHERE user_id='${user_id}'`

    Db.query(sqlCom, (er, re) => {
        if (er) {
            res.send('Error: ' + er).status();
        } else if (re) {
            res.send('Transaction completed').status();
        } else {
            res.send('Something went wrong: Unknow error')
        }
    })
}
const fetchUser = async (req, res) => {
    console.log("*************** FETCH USER  ***************");
    console.log(`*************Payload: ${req.body} *****************`);
     Db.query("SELECT * FROM user_account", (er, re) => {
        if (er) return res.send("Error: " + er)
        res.send(re)
    })
}


module.exports = {
    createUser,
    updateUser,
    fetchUser
}