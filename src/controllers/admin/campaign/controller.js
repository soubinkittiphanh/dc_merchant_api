
const Campaign = require('../../../models/financial').campaign;
const CampaignEntry = require('../../../models/financial').campaignEntry;
const entryController =  require("./entry/controller")
const { body, validationResult } = require('express-validator');

exports.create = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    try {
        const campaign = await Campaign.create(req.body);
        const {entry} = req.body;
        /* 
        Create campaign entry
        */
        // entryController.createCampaignEntry(req,res)
        res.status(200).json(campaign);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.findAll = async (req, res) => {
    try {
        const campaigns = await Campaign.findAll();
        res.status(200).json(campaigns);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.findOne = async (req, res) => {
    try {
        const campaign = await Campaign.findByPk(req.params.id);
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

exports.update = async (req, res) => {
    try {
        const campaign = await Campaign.findByPk(req.params.id);
        if (campaign) {
            await campaign.update(req.body);
            res.status(200).json(campaign);
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
