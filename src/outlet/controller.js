
const Outlet = require('../models').outlet;
const { body, validationResult } = require('express-validator');
const logger = require('../api/logger');

const { Op } = require('sequelize');

// Get all outlets
const getAllOutlets = async (req, res) => {
  try {
    const outlets = await Outlet.findAll();
    res.status(200).json(outlets);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get a single Outlet by ID
const getOutletById = async (req, res) => {
  const { id } = req.params;
  try {
    const Outlet = await Outlet.findOne({ where: { id } });
    if (!Outlet) {
      return res.status(404).json({ message: 'Outlet not found' });
    }
    res.status(200).json(Outlet);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Create a new Outlet
const createOutlet = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { name, tel, remark, isActive } = req.body;
  try {
    const newOutlet = await Outlet.create({
      name,
      tel,
      remark,
      isActive,
    });
    res.status(200).json(newOutlet);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Update an existing Outlet by ID
const updateOutletById = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { id } = req.params;
  const { name, tel, remark, isActive } = req.body;
  try {
    const Outlet = await Outlet.findOne({ where: { id } });
    if (!Outlet) {
      return res.status(404).json({ message: 'Outlet not found' });
    }
    await Outlet.update(
      {
        name,
        tel,
        remark,
        isActive,
      },
      { where: { id } }
    );
    res.status(200).json({ message: 'Outlet updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Delete an Outlet by ID
const deleteOutletById = async (req, res) => {
  const { id } = req.params;
  try {
    const Outlet = await Outlet.findOne({ where: { id } });
    if (!Outlet) {
      return res.status(404).json({ message: 'Outlet not found' });
    }
    await Outlet.destroy({ where: { id } });
    res.status(200).json({ message: 'Outlet deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  getAllOutlets,
  getOutletById,
  createOutlet,
  updateOutletById,
  deleteOutletById,
};
