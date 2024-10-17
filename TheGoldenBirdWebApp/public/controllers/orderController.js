const Order = require(`${process.cwd()}/public/models/orderModel.js`);

exports.getAllOrders = async (request, response) => {
  try {
    const orders = await Order.find();
    response.status(200).json({
      status: "success",
      numberOfItems: orders.length,
      requestedAt: request.requestTime,
      data: {
        order: orders,
      },
    });
  } catch (error) {
    response.status(404).json({
      status: "Failed",
      message: error,
    });
  }
};

exports.getOrder = async (request, response) => {
  try {
    const order = await Order.findById(request.params.id);
    response.status(200).json({
      status: "success",
      requestedAt: request.requestTime,
      data: {
        order,
      },
    });
  } catch (error) {
    response.status(404).json({
      status: "Failed",
      message: error,
    });
  }
};

exports.createOrder = async (request, response) => {
  try {
    const newOrder = await Order.create(request.body);
    response.status(201).json({
      status: "success",
      requestedAt: request.requestTime,
      data: {
        order: newOrder,
      },
    });
  } catch (error) {
    response.status(400).json({
      status: "Failed",
      message: error,
    });
  }
};

exports.deleteOrder = async (request, response) => {
  try {
    await Order.findByIdAndDelete(request.params.id);
    response.status(204).json({
      status: "success",
      data: null,
    });
  } catch (error) {
    response.status(404).json({
      status: "Failed",
      message: error,
    });
  }
};
