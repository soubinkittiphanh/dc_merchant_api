
const PoHeader = require('../models').poHeader;
const { body, validationResult } = require('express-validator');
const logger = require('../api/logger');
const service = require('./line/service')

// Create Payment Header
function replaceAll(str, find, replace) {
  return str.replace(new RegExp(find, 'g'), replace);
}
// Get all PO headers
const getAllPOHeaders = async (req, res) => {
  try {
    const poHeaders = await PoHeader.findAll();
    res.status(200).json(poHeaders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get a single PO header by ID
const getPOHeaderById = async (req, res) => {
  const { id } = req.params;
  try {
    const poHeader = await PoHeader.findOne({ where: { id } });
    if (!poHeader) {
      return res.status(404).json({ message: 'PO header not found' });
    }
    res.status(200).json(poHeader);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

//  Create a new PO header
const createPOHeader = async (req, res) => {
  // const errors = validationResult(req);
  // if (!errors.isEmpty()) {
  //   return res.status(400).json({ errors: errors.array() });
  // }
  let { bookingDate, deliveryDate, vendor, notes, locking_session_id, isActive,lines } = req.body;
  locking_session_id = Date.now()
  try {
    const newPOHeader = await PoHeader.create({
      bookingDate,
      deliveryDate,
      vendor,
      notes,
      locking_session_id,
      isActive,
    });
    lines.locking_session_id = newPOHeader.locking_session_id
    service.createBulk(req,res,lines,newPOHeader.id);
    // res.status(200).json(newPOHeader);
  } catch (error) {
    logger.error(error)
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Update an existing PO header by ID
const updatePOHeaderById = async (req, res) => {
  // const errors = validationResult(req);
  // if (!errors.isEmpty()) {
  //   return res.status(400).json({ errors: errors.array() });
  // }
  const { id } = req.params;
  const { bookingDate, deliveryDate, vendor, notes, locking_session_id, isActive,lines } = req.body;
  try {
    const poHeader = await PoHeader.findOne({ where: { id } });
    if (!poHeader) {
      return res.status(404).json({ message: 'PO header not found' });
    }
    await PoHeader.update(
      {
        bookingDate,
        deliveryDate,
        vendor,
        notes,
        locking_session_id,
        isActive,
      },
      { where: { id } }
    );
    service.updateBulk(req,res,lines,id)
    // res.status(200).json({ message: 'PO header updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Delete a PO header by ID
const deletePOHeaderById = async (req, res) => {
  const { id } = req.params;
  try {
    const poHeader = await PoHeader.findOne({ where: { id } });
    if (!poHeader) {
      return res.status(404).json({ message: 'PO header not found' });
    }
    await PoHeader.destroy({ where: { id } });
    res.status(200).json({ message: 'PO header deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  getAllPOHeaders,
  getPOHeaderById,
  createPOHeader,
  updatePOHeaderById,
  deletePOHeaderById,
};