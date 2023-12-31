const {Sequelize,DataTypes} = require('sequelize')
const logger = require('../api/logger')
const env = require('../config/env').db
const sequelize = new Sequelize(
    env.database,
    env.user,
    env.password,
    {
        host:env.host,
        dialect: 'mariadb',
        port:env.port,
        pool:{
            max:10,
            min:10,
            acquire:30000,
            idle:10000
        }
    }
)

// DataTypes.NUMBER
sequelize.authenticate().then(()=>{
    logger.info("DB Connection established")
}).catch(err=>{
    logger.error("DB Connection error: "+err);
})

const db={}
db.sequelize = sequelize;
db.Sequelize = Sequelize
db.chartAccount =  require("../account/model")(sequelize,DataTypes);
db.gl = require("../GL/model")(sequelize,DataTypes);
db.apPaymentHeader = require("../AP/payment/header/model")(sequelize,DataTypes);
db.arReceiveHeader = require("../AR/receive/header/model")(sequelize,DataTypes);
db.campaign = require("../controllers/admin/campaign/model")(sequelize,DataTypes);
db.campaignEntry = require("../controllers/admin/campaign/entry/model")(sequelize,DataTypes);
db.rider = require("../rider/model")(sequelize,DataTypes);
db.card = require("../card/model")(sequelize,DataTypes);
db.product = require("../product/model")(sequelize,DataTypes);
db.category = require("../category/model")(sequelize,DataTypes);
db.outlet = require("../outlet/model")(sequelize,DataTypes);
db.poHeader = require("../PO/model")(sequelize,DataTypes);
db.poLine = require("../PO/line/model")(sequelize,DataTypes);
db.currency = require("../currency/model")(sequelize,DataTypes);
db.geography = require("../geography/model")(sequelize,DataTypes);
db.customer = require("../dynamicCustomer/model")(sequelize,DataTypes);

db.sequelize.sync({force:false,alter: true}).then(()=>{
    logger.info("Datatase is synchronize")
})


//Campaign relation
db.campaign.hasMany(db.campaignEntry,{
    as: 'entries'
})
db.campaignEntry.belongsTo(db.campaign,{
    foreignKey:'campaign_id',
    as:'campaign'
})
db.chartAccount.hasMany(db.gl,{
    as:'gls'
})
db.gl.belongsTo(db.chartAccount,{
    foreignKey:'account_id',
    as:'chart_of_account'
})

//********************************** */
// ***** NEW RELATION ************** */
//********************************** */
db.category.hasMany(db.product,{
    as:'products'
})
db.product.belongsTo(db.category,{
    foreignKey:'pro_category',
    as:'category'
})

db.outlet.hasMany(db.product,{
    as:'products'
})
db.product.belongsTo(db.outlet,{
    foreignKey:'outlet',
    as:'outletObject'
})
db.poHeader.hasMany(db.poLine,{
    as:'lines'
})
db.poLine.belongsTo(db.poHeader,{
    foreignKey:'headerId',
    as:'header'
})

// db.poLine.hasOne(db.product)
db.poLine.belongsTo(db.product,{
    foreignKey:'productId',
    as:'product'
})
db.poLine.belongsTo(db.currency,{
    foreignKey:'currencyId',
    as:'currency'
})
db.rider.hasMany(db.customer,{
    as:'orders'
})
db.customer.belongsTo(db.rider,{
    foreignKey:'riderId',
    as:'rider'
})
db.customer.belongsTo(db.geography,{
    foreignKey:'geoId',
    as:'geography'
})
// User.hasMany(Post, { onUpdate: 'CASCADE' });
// User.hasMany(Post, { onDelete: 'CASCADE' });

module.exports = db