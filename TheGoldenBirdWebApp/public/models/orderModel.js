const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "An order requires a customer's name"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "An order requires a customer's email"],
    unique: true,
    trim: true,
  },
  pickUpTime: {
    type: String,
    required: [true, "An order must have a pick up time"],
  },
  order: {
    type: Object,
    required: [true, "An order must be non-empty"],
  },
  orderTotal: {
    type: String,
    required: [true, "An order must have a total"],
  },
});

const Order = new mongoose.model("Order", orderSchema);

module.exports = Order;
