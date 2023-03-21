// let datea =new Date().getTime().toLocaleString()//.toISOString().slice(0, 19).replace('T', ' ')
// console.log("DATE"+datea);
// var d = new Date;



// var date = [
//     d.getFullYear(),
//     ('00' + d.getMonth() + 1).slice(-2),
//     ('00' + d.getDate() + 1).slice(-2)
// ].join('-');

// var time = [
//     ('00' + d.getHours()).slice(-2),
//     ('00' + d.getMinutes()).slice(-2),
//     ('00' + d.getSeconds()).slice(-2)
// ].join(':');

// var dateTime = date + ' ' + time;
// console.log(dateTime) // 2021-01-41 13:06:01

// var sqlDatetime = new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60 * 1000).toJSON().slice(0, 19).replace('T', ' ');
// console.log(sqlDatetime);

// const Db=require("./config/dbcon")
// Db.query("INSERT INTO card(card_type_code,product_id,card_number,card_isused,update_user,update_time,inputter) SELECT card_type_code,product_id,card_number,'2',inputter,card_input_date,inputter FROM card_his",(er,re)=>{
//     if(er){
//         console.log("ERROR: "+er);
//     }else{
//         console.log(("Transaction inserted"));
//     }
// })

const getRandomInt = (max) => {
    // console.log("*************** GET RANDOM INT  ***************");

    return Math.floor(Math.random() * max);
}

const generateQR = () => {
    console.log("*************** GENERATE QR  ***************");

    let QRCodeStr = '';
    for (let i = 0; i < 16; i++) {
        const subQR = getRandomInt(10)
        console.log("RND: "+subQR);
        QRCodeStr += subQR.toString();
    }

    console.log(

        QRCodeStr
    ); 
}

generateQR();