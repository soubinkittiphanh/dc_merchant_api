const logger = require("../../api/logger");

const ChartOfAccounts = require("../../models/financial").chartAccount
// const create = async (req, res) => {

//     const txn = req.body
//     // const txn ={
//     //     accountNumber: 3001,
//     //     accountName: 'Owner\'s Equity',
//     //     accountLLName: 'ທຶນ',
//     //     accountType: 'Equity',
//     //     isActive: true,
//     // }
//     try {
//         const transaction = await db.create(txn);
//         res.status(200).send(transaction);
//     } catch (error) {
//         logger.error("Server error: " + error)
//         res.status(201).send('server error ' + error)
//     }


// }
// const findAll = async (req,res)=>{
//     const transaction = await db.findAll()
//     return res.status(200).send( transaction);

// }


// Create a new account
const createAccount = async (req, res) => {
  const accountData = req.body
  logger.info(accountData)
  try {
    const account = await ChartOfAccounts.create(accountData);
    return res.status(200).send(account);
  } catch (error) {
    logger.error(error);
    res.send("Server error " + error)
    throw new Error('Failed to create account');
  }
};

// Get all accounts
const getAccounts = async (req, res) => {
  try {
    const accounts = await ChartOfAccounts.findAll({
      order: [['accountNumber', 'DESC'],],
      where:{isActive:true}
    });
    return res.status(200).send(accounts);
  } catch (error) {
    console.error(error);
    throw new Error('Failed to get accounts');
  }
};

// Get an account by ID
const getAccountById = async (req, res) => {
  const accountId = req.params.id
  logger.info("Account id " + accountId)
  try {
    const account = await ChartOfAccounts.findByPk(accountId);
    if (!account) {
      throw new Error('Account not found');
    }
    return res.status(200).send(account)
  } catch (error) {
    console.error(error);
    res.status(201).send("Account not found")
    throw new Error('Failed to get account');
  }
};

// Update an account by ID
const updateAccountById = async (req, res) => {
  const accountId = req.params.id
  const { accountData } = req.body
  try {
    const account = await ChartOfAccounts.findByPk(accountId);
    if (!account) {
      throw new Error('Account not found');
    }
    await account.update(accountData);
    return res.status(200).send(account);
  } catch (error) {
    console.error(error);
    res.status(201).send("Error")
    throw new Error('Failed to update account');
  }
};

// Delete an account by ID
const deleteAccountById = async (req, res) => {
  const accountId = req.body
  try {
    const account = await ChartOfAccounts.findByPk(accountId);
    if (!account) {
      throw new Error('Account not found');
    }
    await account.destroy();
    return res.status(200).send('Account ' + account + ' has been deleted');
  } catch (error) {
    console.error(error);
    res.status(201).send("Server error " + error)
    throw new Error('Failed to delete account');
  }
};

module.exports = {
  createAccount,
  getAccounts,
  getAccountById,
  updateAccountById,
  deleteAccountById,
};

