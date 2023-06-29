const logger = require('../api/logger');
const dbAsync = require('../config/dbconAsync');
const Geography = require('../models').geography
function generateRandomString(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;

    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
}

const generateProvince = async (req, res) => {
    const rowsToInsert = [
        { abbr: 'VTE', description: 'ນະຄອນຫຼວງ' },
        { abbr: 'VTP', description: 'ແຂວງວຽງຈັນ' },
        { abbr: 'SVK', description: 'ສະຫວັນນະເຂດ' },
        { abbr: 'CPS', description: 'ຈຳປາສັກ' },
        { abbr: 'SK', description: 'ເຊກອງ' },
        { abbr: 'SLV', description: 'ສາລະວັນ' },
        { abbr: 'ATP', description: 'ອັດຕະປື' },
        { abbr: 'LPB', description: 'ຫຼວງພະບາງ' },
        { abbr: 'BK', description: 'ບໍ່ແກ້ວ' },
        { abbr: 'ODX', description: 'ອຸດົມໄຊ' },
        { abbr: 'LNT', description: 'ຫຼວງນ້ຳທາ' },
        { abbr: 'XYL', description: 'ໄຊຍະບູລີ' },
        { abbr: 'PSL', description: 'ຜົ້ງສາລີ' },
        { abbr: 'KM', description: 'ຄຳມ່ວນ' },
        { abbr: 'BLX', description: 'ບໍລິຄຳໄຊ' },
        { abbr: 'XSB', description: 'ໄຊສົມບູນ' },
        { abbr: 'HP', description: 'ຫົວພັນ' },
        { abbr: 'XK', description: 'ຊຽງຂວາງ' }
    ]
    Geography.bulkCreate(rowsToInsert)
        .then(() => {
            logger.info('Rows inserted successfully')
            return res.status(200).send("Transction completed")
        })
        .catch((error) => {
            logger.error('Error inserting rows:', error)
            return res.status(403).send("Server error " + error)
        });
}


module.exports = {
    generateProvince
}