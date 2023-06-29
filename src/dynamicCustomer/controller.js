const Customer = require('../models').customer; // assuming your model file is named Geography.js

const customerController = {
  async getAll(req, res) {
    const customers = Customer.findAll();
    res.json(customers);
  },

  async getById(req, res) {
    const { id } = req.params;
    const customer = await Customer.findByPk(id);
    if (!customer) {
      res.status(404).json({ error: 'Customer not found' });
    } else {
      res.json(customer);
    }
  },

  async create(req, res) {
    const newCustomer = await Customer.create(req.body);
    res.status(201).json(newCustomer);
  },

  async update(req, res) {
    const { id } = req.params;
    const [updated] = await Customer.update(req.body, {
      where: { id: id }
    });
    if (updated) {
      const updatedCustomer = await Customer.findByPk(id);
      res.json(updatedCustomer);
    } else {
      res.status(404).json({ error: 'Customer not found' });
    }
  },

  async delete(req, res) {
    const { id } = req.params;
    const deleted = await Customer.destroy({
      where: { id: id }
    });
    if (deleted) {
      res.sendStatus(204);
    } else {
      res.status(404).json({ error: 'Customer not found' });
    }
  }
};

module.exports = customerController;
