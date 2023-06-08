
const { body } = require('express-validator');

exports.createCampaignEntryValidator = [
    body('date').notEmpty().withMessage('Date is required').isDate().withMessage('Invalid date format'),
    body('reach').notEmpty().withMessage('Reach is required').isInt().withMessage('Reach must be an integer'),
    body('comments').notEmpty().withMessage('Comments is required').isInt().withMessage('Comments must be an integer'),
    body('results').notEmpty().withMessage('Results is required').isInt().withMessage('Results must be an integer'),
    body('purchaseQty').notEmpty().withMessage('Purchase quantity is required').isFloat().withMessage('Purchase quantity must be a number'),
    body('costPerCustomer').notEmpty().withMessage('Cost per customer is required').isFloat().withMessage('Cost per customer must be a number'),
    body('budgetSpend').notEmpty().withMessage('Budget spend is required').isFloat().withMessage('Budget spend must be a number'),
    // body('isActive').notEmpty().withMessage('Active status is required').isBoolean().withMessage('Active status must be a boolean')
];

exports.updateCampaignEntryValidator = [
    body('date').optional().isDate().withMessage('Invalid date format'),
    body('reach').optional().isInt().withMessage('Reach must be an integer'),
    body('comments').optional().isInt().withMessage('Comments must be an integer'),
    body('results').optional().isInt().withMessage('Results must be an integer'),
    body('purchaseQty').optional().isFloat().withMessage('Purchase quantity must be a number'),
    body('costPerCustomer').optional().isFloat().withMessage('Cost per customer must be a number'),
    body('budgetSpend').optional().isFloat().withMessage('Budget spend must be a number'),
    // body('isActive').optional().isBoolean().withMessage('Active status must be a boolean')
];
