const express = require("express");
const {
  getCustomers,
  getCustomerDetails,
  createCustomer,
  addItemToCustomer,
  deleteCustomer,
  deleteItem,
} = require("../controllers/customerController");
const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

// require auth for all workout routes
router.use(requireAuth);

router.post("/", createCustomer);

router.get("/", getCustomers);

router.get("/:customerId", getCustomerDetails);

router.delete("/:customerId", deleteCustomer);

router.post("/:customerId/item", addItemToCustomer);

router.delete("/:customerId/:itemId", deleteItem);

module.exports = router;
