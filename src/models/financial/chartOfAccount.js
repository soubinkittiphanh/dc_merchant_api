module.exports = (sequelize, DataTypes) => {
    const ChartOfAccounts = sequelize.define('ChartOfAccounts', {
        accountNumber: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true
        },
        accountName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        accountLLName: {
            type: DataTypes.STRING,
            allowNull: true
        },
        accountType: {
            type: DataTypes.ENUM('Asset', 'Liability', 'Equity', 'Revenue', 'Expense'),
            allowNull: false
        },
        isActive: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,
          }
    }, {
        sequelize,

        // don't forget to enable timestamps!
        timestamps: true,

        // I don't want createdAt
        createdAt: true,

        // I want updatedAt to actually be called updateTimestamp
        updatedAt: 'updateTimestamp'
    });
    return ChartOfAccounts
}