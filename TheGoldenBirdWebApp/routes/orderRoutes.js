const express = require("express");
const orderController = require(`${process.cwd()}/public/controllers/orderController.js`);

const router = express.Router();
router
  .route("/")
  .get(orderController.getAllOrders)
  .post(orderController.createOrder);
router
  .route("/:id")
  .get(orderController.getOrder)
  .delete(orderController.deleteOrder);

module.exports = router;
