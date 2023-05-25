const logger = require("../../api/logger")
const db = require("../../models/financial").gl
const {validationResult} = require('express-validator')
const generateGL = (req, res) => {
    logger.info("***************** GENERATE GL ****************")

    const tableData = [
        { accountNumber: 1000, accountName: 'Cash' },
        { accountNumber: 1100, accountName: 'Accounts Receivable' },
        { accountNumber: 1200, accountName: 'Inventory' },
        { accountNumber: 1300, accountName: 'Property, Plant, and Equipment' },
        { accountNumber: 1400, accountName: 'Accounts Payable' },
        { accountNumber: 1500, accountName: 'Notes Payable' },
        { accountNumber: 1600, accountName: "Owner's Equity" },
        { accountNumber: 1700, accountName: 'Sales' },
        { accountNumber: 1800, accountName: 'Cost of Goods Sold' },
        { accountNumber: 1900, accountName: 'Salaries and Wages' },
        { accountNumber: 2000, accountName: 'Rent Expense' },
        { accountNumber: 2100, accountName: 'Depreciation' },
        { accountNumber: 2200, accountName: 'Interest Expense' }
    ];

    for (let index = 0; index < tableData.length; index++) {
        const element = tableData[index];
        db.create(element).then(re => {
            logger.info("Transaction complete")
        }).catch(err => {
            logger.error("Transaction fail " + err);
        })
    }
    res.send("Transaction completed")

}

const create = (req, res) => {
    // const error = validationResult(req)
    // if(!error.isEmpty()){
    //     return res.status(422).json({erors:error.array()})
    // }
    // const { accountNumber, accountName } = req.body
    // const element = { accountNumber, accountName }
    const txn = req.body;
    // const txn = {
    //     accountNumber: 3001,
    //     bookingDate: new Date(),
    //     postingReference: 'REF-001 N/A',
    //     debit: 14625000.00,
    //     credit: 0.00,
    //     description: 'Investment',
    //     descriptionLL: 'ລົງທຶນ ຊື້ ເຄື່ອງມາຂາຍ ແບ້ 40 ຕຸ້ຍ 30 ໂອບີ 30',
    //     currency: 'LAK',
    //     rate: 1,
    //     source: 'GL',
    //   }
    db.create(txn).then(re => {
        logger.info("Transaction complete")
        res.status(200).send(re)
    }).catch(err => {
        logger.error("Transaction fail " + err);
        res.status(201).send("Server error "+err)
    })
}

const update =async (req, res) =>{
    const error = validationResult(req)
    if(!error.isEmpty()){
        return res.status(422).json({erors:error.array()})
    }
    const {id,accountName} = req.body;
    const dbGL =await  db.findOne({where:{id:id}});
    if(!dbGL) return res.status(201).send("User not found in database")
    const updateGL = await dbGL.update({
        accountName : accountName,
    })
    res.send (updateGL);

}
const findAll = async (req, res) => {
    logger.info("********* find all user *********")
    res.send(await db.findAll());

}

module.exports = {
    generateGL,
    findAll,
    create,
    update
}