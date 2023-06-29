const config={
    port:process.env.PORT||8080,
    nodeEnv:process.env.NODE_ENV||"development",
    host:process.env.HOST||"localhost",
    actksecret:'Jacke3848b9bd2e3eee522325953aafc118ed017c811cc93fae99a4b2f5ba3506e0e217636b3b509055900cb1da7594b0ce6c7192907213291818a4fdc89bf605ce8',
    rfTkSecret:'Jacke3848b9bd2e3eee522325953aafc118ed017c811cc93fae99a4b2f5ba3506e0e217636b3b509055900cb1da7',
    db:{
        host:'209.209.40.80',
        user:'soubin',
        password:'SDAT@3480',
        // user:'jack42',
        // password:'sdat@3480',
        // database:'peeair_demo',
        database:'dcommerce_dev_1',
        // database:'dcommerce_jack42_production',
        // database:'dcommerce_production',
        port: 34248,
    }
}
module.exports=config;