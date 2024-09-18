const fs = require("fs");
const express = require("express");

const app = express();

const orderDataJsonFilePath = `${process.cwd()}/public/dev-data/order-data.json`;
const orderData = JSON.parse(fs.readFileSync(orderDataJsonFilePath, "utf-8"));

// Route handlers
const getAllOrders = (request, response) => {
  response.status(200).json({
    status: "success",
    numberOfItems: orderData.length,
    requestedAt: request.requestTime,
    data: {
      order: orderData,
    },
  });
};

const getOrder = (request, response) => {
  const requestId = request.params.id;
  if (requestId > orderData.length) {
    response.status(404).json({
      status: "failed",
      message: `Error. Cannot GET order for non-existent ID: ${requestId}`,
    });
  } else {
    response.status(200).json({
      status: "success",
      message: `Order ${requestId} successfully retrieved`,
      requestedAt: request.requestTime,
      data: {
        order: orderData[requestId],
      },
    });
  }
};

const createOrder = (request, response) => {
  const newId = orderData.length;
  const newOrder = Object.assign({ orderId: newId }, request.body);
  orderData.push(newOrder);
  fs.writeFile(orderDataJsonFilePath, JSON.stringify(orderData), (error) => {
    if (error) {
      throw new error();
    }
    console.log("File written successfully");
  });
  response.status(201).json({
    status: "success",
    message: `Order ${newId} created successfully`,
    requestedAt: request.requestTime,
    data: {
      order: newOrder,
    },
  });
};

const deleteOrder = (request, response) => {
  const requestId = request.params.id;
  if (requestId > orderData.length) {
    response.status(404).json({
      status: "failed",
      message: `Error, cannot DELETE order with non-existent ID: ${requestId}`,
    });
  } else {
    delete orderData[requestId];
    fs.writeFile(orderDataJsonFilePath, JSON.stringify(orderData), (error) => {
      if (error) {
        throw new error();
      }
      console.log("File written successfully");
    });
    response.status(204).json({
      status: "success",
      data: null,
    });
  }
};

const router = express.Router();
router.route("/").get(getAllOrders).post(createOrder);
router.route("/:id").get(getOrder).delete(deleteOrder);

module.exports = router;
