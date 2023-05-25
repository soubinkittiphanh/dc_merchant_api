
const logger = require("../../api/logger");
module.exports = (sequelize, DataTypes) => {
    const PaymentAR = sequelize.define('payment_ar', {
        // Model attributes are defined here

        date: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        amount: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        },
        payment_method: {
            type: DataTypes.STRING,
            allowNull: false
        },
        ar_invoice_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'ARInvoice',
                key: 'id'
            }
        },

        inputter: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        authorisor: {
            DataTypes: INTEGER,
            allowNull: false
        },
    }, {
        sequelize,
        // don't forget to enable timestamps!
        timestamps: true,
        // I don't want createdAt
        createdAt: true,
        // I want updatedAt to actually be called updateTimestamp
        updatedAt: 'updateTimestamp'
    })
    return PaymentAR;
};


// 1. STRING: A variable length string.

// 2. CHAR: A fixed length string.

// 3. TEXT: A long string.

// 4. INTEGER: A 32-bit integer.

// 5. BIGINT: A 64-bit integer.

// 6. FLOAT: A floating point number.

// 7. DOUBLE: A double floating point number.

// 8. DECIMAL: A fixed-point decimal number.

// 9. BOOLEAN: A boolean value.

// 10. DATE: A date object.

// 11. DATEONLY: A date object without time.

// 12. TIME: A time object.

// 13. UUID: A universally unique identifier.

// 14. ENUM: A value from a predefined list of values.

// 15. ARRAY: An array of values.

// 16. JSON: A JSON object.

// 17. JSONB: A JSON object stored as a binary format.

