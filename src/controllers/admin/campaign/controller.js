
const Campaign = require('../../../models').campaign;
const { body, validationResult } = require('express-validator');
const entryService = require('./entry/service')
const dbAsync = require('../../../config/dbconAsync');
exports.create = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    try {
        const campaign = await Campaign.create(req.body);
        let { entry } = req.body;
        entry = assignCampaingIdToEntry(entry, campaign.id)
        /* 
        Create campaign entry
        */
        entryService.createBulk(req, res, entry)
        // entryController.createCampaignEntry(req,res)
        // res.status(200).json(campaign);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

assignCampaingIdToEntry = (entry, campaignId) => {
    for (let i = 0; i < entry.length; i++) {
        entry[i]['campaign_id'] = campaignId;
        entry[i]['campaignId'] = campaignId;
    }
    return entry
}

exports.findAll = async (req, res) => {
    try {
        const campaigns = await Campaign.findAll({ include: 'entries' });
        res.status(200).json(campaigns);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.findOne = async (req, res) => {
    try {
        const campaign = await Campaign.findByPk(req.params.id, { include: 'entries' });
        if (campaign) {
            res.status(200).json(campaign);
        } else {
            res.status(404).json({ message: 'Campaign not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
exports.findCampaignWithSummary = async (req, res) => {
    const [rows, fields] = await dbAsync.query(`SELECT c.title,c.start,c.end,
    p.pro_name,c.budget,
    SUM(e.reach) AS reach,
    SUM(e.comments) AS comments,
    SUM(e.results) AS results,
    SUM(e.purchaseQty) AS closed,
    SUM(e.budgetSpend) AS budgetSpend
    FROM campaign c 
    LEFT JOIN campaignEntry e ON e.campaignId = c.id 
    LEFT JOIN product p ON p.pro_id=c.productId
    WHERE c.isActive=true GROUP BY c.id `)
    const fieldList =getFieldNameList(fields)
    res.status(200).send({rows,fieldList} )

}
const getFieldNameList = (fields) => {
    let fieldList = []
    for (const iterator of fields) {
        fieldList.push(iterator.name)
    }
    return fieldList
}
exports.update = async (req, res) => {
    try {
        const campaign = await Campaign.findByPk(req.params.id);
        if (campaign) {
            await campaign.update(req.body);

            // ************** Update entry process ************** //
            let { entry } = req.body;
            // entry = assignCampaingIdToEntry(entry,campaign)
            entryService.bulkUpdateCampaignEntryByListOfId(req, res, entry, campaign.id)
            // res.status(200).json(campaign);
            // ************** Update entry process ************** //

        } else {
            res.status(404).json({ message: 'Campaign not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.delete = async (req, res) => {
    try {
        const campaign = await Campaign.findByPk(req.params.id);
        if (campaign) {
            await campaign.destroy();
            res(204).end();
        } else {
            res.status(404).json({ message: 'Campaign not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
