// routes/customerRoutes.js

const Customer = require("../models/customerModal");
const Item = require("../models/itemModal");

// Add a new customer
const createCustomer = async (req, res) => {
  try {
    // Extracting data from the request body
    const { name, email, phone, items } = req.body;

    // Creating a new customer document
    const newCustomer = new Customer({
      name,
      email,
      phone,
      items,
    });

    // Saving the new customer to the database
    await newCustomer.save();

    res
      .status(201)
      .json({ message: "Customer added successfully", customer: newCustomer });
  } catch (error) {
    console.error("Error adding customer:", error);
    res.status(500).json({ message: "Failed to add customer" });
  }
};

// Get all customers
const getCustomers = async (req, res) => {
  try {
    const customers = await Customer.find();
    res.status(200).json(customers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteCustomer = async (req, res) => {
  console.log("customerID", req.params);

  try {
    const { customerId } = req.params;
    console.log("customerID", customerId);

    // Delete the customer document
    const customer = await Customer.findByIdAndDelete(customerId);
    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    // Delete the related item documents
    const item = await Item.deleteMany({ customer: customerId });

    res.status(200).json({
      message: "Customer and related items deleted successfully",
      customer,
      item,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get customer details including borrowed items and total cost
const getCustomerDetails = async (req, res) => {
  try {
    const { customerId } = req.params;
    const customer = await Customer.findById(customerId).populate("items");

    let totalCost = 0;
    customer.items.forEach((item) => {
      totalCost += item.cost;
    });
    res.status(200).json({ customer, totalCost });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const addItemToCustomer = async (req, res) => {
  try {
    const { customerId } = req.params;
    const item = await Item.create({ ...req.body, customer: customerId });
    const customer = await Customer.findById({ _id: customerId });
    customer.items.push(item._id);
    customer.save();

    res.send({
      item,
      message: "Product added successfully",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteItem = async (req, res) => {
  try {
    const { customerId, itemId } = req.params;
    const customer = await Customer.findById(customerId);
    if (!customer) {
      return res.status(404).json({ error: "Customer not found" });
    }

    const item = await Item.findById(itemId);
    if (!item) {
      return res.status(404).json({ error: "Item not found" });
    }

    if (item.customer.toString() !== customerId) {
      return res
        .status(403)
        .json({ error: "Item does not belong to the customer" });
    }

    customer.items = customer.items.filter(
      (itemId) => itemId.toString() !== item._id.toString()
    );

    await customer.save();

    // Delete the item from the database
    await item.remove();

    res.json({ message: "Item deleted successfully" });
  } catch (error) {
    console.error("Error deleting item:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  createCustomer,
  getCustomers,
  getCustomerDetails,
  addItemToCustomer,
  deleteCustomer,
  deleteItem,
};
