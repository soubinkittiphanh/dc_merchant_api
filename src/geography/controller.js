const Geography = require('../models').geography; // assuming your model file is named Geography.js

const geographyController = {
  async getAll(req, res) {
    try {
      const geographies = await Geography.findAll();
      return res.json(geographies);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  async getById(req, res) {
    const { id } = req.params;
    try {
      const geography = await Geography.findByPk(id);
      if (!geography) {
        return res.status(404).json({ error: 'Geography not found' });
      }
      return res.json(geography);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  async create(req, res) {
    const { abbr, description, isActive } = req.body;
    try {
      const newGeography = await Geography.create({
        abbr,
        description,
        isActive
      });
      return res.status(200).json(newGeography);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  async update(req, res) {
    const { id } = req.params;
    const { abbr, description, isActive } = req.body;
    try {
      const geographyToUpdate = await Geography.findByPk(id);
      if (!geographyToUpdate) {
        return res.status(404).json({ error: 'Geography not found' });
      }
      geographyToUpdate.abbr = abbr;
      geographyToUpdate.description = description;
      geographyToUpdate.isActive = isActive;
      await geographyToUpdate.save();
      return res.status(200).json(geographyToUpdate);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  async delete(req, res) {
    const { id } = req.params;
    try {
      const geographyToDelete = await Geography.findByPk(id);
      if (!geographyToDelete) {
        return res.status(404).json({ error: 'Geography not found' });
      }
      await geographyToDelete.destroy();
      return res.status(204).send('Transaction completed');
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
};

module.exports = geographyController;