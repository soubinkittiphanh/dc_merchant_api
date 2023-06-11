require('dotenv').config()
const express = require("express");
const cors = require("cors");
const Router = require('./router/router')
const myRouter = require("./router")
const buildApp = async () => {
    const app = express();
    app.use(cors());
    app.use(express.json());
    app.use('/uploads', express.static('uploads'));// Link uploads folder available via static route
    console.log("DIRNAME " + __dirname);
    app.get("/hello", (req, res) => {
        res.send("Succeed server is ready")
    })
    app.use("/api",myRouter.dymCustomerRouter)
    app.use("/api",myRouter.orderRouter);
    app.use("/api",myRouter.reportRouter);
    app.use("/api/financial",myRouter.generalLedger)
    app.use("/api/financial",myRouter.chartAccount)
    app.use("/api/upgrade",myRouter.upgrade)
    app.use("/api/rider",myRouter.rider)
    app.use("/api/campaign",myRouter.campaign)
    app.use("/api/campaignEntry",myRouter.campaignEntry)
    app.use("/api/card",myRouter.card)

    Router.category(app);
    Router.product(app);
    Router.sale(app);
    Router.user(app);
    Router.customer(app);
    Router.txntype(app);
    Router.txn(app);
    Router.txnHis(app);
    Router.login(app);
    Router.upload(app);
    Router.authenticate(app);
    Router.userorder(app);
    Router.updateUserInfo(app);
    Router.fetchStockCategory(app);
    Router.stockAction(app);
    Router.userIbox(app);
    Router.registerCus(app);
    Router.card(app);
    Router.advertise(app);
    Router.bank(app);
    Router.chatType(app);
    Router.chat(app);
    Router.walletTxn(app);
    Router.report(app);
    Router.ticket(app);
    Router.outlet(app);
    Router.payment(app);
    Router.shipping(app);
    return app;
}

module.exports = buildApp;