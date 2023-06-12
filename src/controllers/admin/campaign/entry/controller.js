



const  CampaignEntry = require('../../../../models').campaignEntry;
const { body, validationResult } = require('express-validator');
// Get all campaign entries


const campaignEntryController = {
  getAllCampaignEntries: async (req, res) => {
    try {
      const campaignEntries = await CampaignEntry.findAll();
      res.json(campaignEntries);
    } catch (err) {
      console.error(err);
      res.status(500).send('Server Error');
    }
  },

  getCampaignEntryById: async (req, res) => {
    try {
      const campaignEntry = await CampaignEntry.findByPk(req.params.id);
      if (!campaignEntry) {
        return res.status(404).send('Campaign entry not found');
      }
      res.json(campaignEntry);
    } catch (err) {
      console.error(err);
      res.status(500).send('Server Error');
    }
  },

  createCampaignEntry: async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    try {
      const newCampaignEntry = await CampaignEntry.create(req.body);
      res.json(newCampaignEntry);
    } catch (err) {
      console.error(err);
      res.status(500).send('Server Error');
    }
  },

  updateCampaignEntryById: async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    try {
      const campaignEntry = await CampaignEntry.findByPk(req.params.id);
      if (!campaignEntry) {
        return res.status(404).send('Campaign entry not found');
      }
      const updatedCampaignEntry = await campaignEntry.update(req.body);
      res.json(updatedCampaignEntry);
    } catch (err) {
      console.error(err);
      res.status(500).send('Server Error');
    }
  },

  deleteCampaignEntryById: async (req, res) => {
    try {
      const campaignEntry = await CampaignEntry.findByPk(req.params.id);
      if (!campaignEntry) {
        return res.status(404).send('Campaign entry not found');
      }
      await campaignEntry.destroy();
      res.send('Campaign entry deleted successfully');
    } catch (err) {
      console.error(err);
      res.status(500).send('Server Error');
    }
  },
};

module.exports = campaignEntryController;



