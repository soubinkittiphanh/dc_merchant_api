
// const Db = require('../../config/dbcon')
const db = require('../config/dbcon')
const dbAsync = require('../config/dbconAsync');

const createUserOrderHeader = async (headerRecord) => {
    // const headerRecord ={
    //     orderId,
    //     discount,
    //     codFee,
    //     riderFee,
    //     lockingSessionId
    // }
    console.log('Order header ',headerRecord);
    const sql = `INSERT INTO user_order_head(user_order_id, discount, cod_fee, rider_fee, locking_session_id) VALUES
     ('${headerRecord.orderId}','${headerRecord.discount}','${headerRecord.codFee}','${headerRecord.riderFee}','${headerRecord.lockingSessionId}')`
    try {
        const [rows, fields] = await dbAsync.execute(sql)
        console.log("create order header done");
        return '00'
    } catch (error) {
        console.log("create order header fail",error);
        return '01'
    }
}
const createDynCustomer = async (customer, lockingSessionId,orderHeader) => {
    const name = customer.name;
    const tel = customer.tel;
    const shipping = customer.shipping;
    const custAddress = customer.address;
    const payment = customer.payment;
    const outlet = customer.outlet;
    const shippingFee = customer.shippingFee;
    const bookingDay = customer.workingDay;
    const sqlCom = `INSERT INTO dynamic_customer(name, tel, source_delivery_branch, 
        dest_delivery_branch, payment_code, shop_name,locking_session_id,shipping_fee_by,txn_date) 
    VALUES ('${name}','${tel}','${shipping}','${custAddress}','${payment}','${outlet}','${lockingSessionId}','${shippingFee}','${bookingDay}')`
    console.log("customer sql: ", sqlCom);
    try {
        const [rows, fields] = await dbAsync.execute(sqlCom);
        console.log("create dy customer done");
        createUserOrderHeader(orderHeader);
        
        return '00'
    } catch (error) {
        console.log("create dy customer fail");
        return '01'
    }
}

module.exports = {
    createUserOrderHeader,
    createDynCustomer,
}