const express = require("express");
const morgan = require("morgan");
const pageRouter = require(`${__dirname}/routes/pageRoutes.js`);
const orderRouter = require(`${__dirname}/routes/orderRoutes.js`);
const userRouter = require(`${__dirname}/routes/userRoutes.js`);

const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(express.json());
app.use(express.static("public"));
app.use((request, response, next) => {
  // return a substring of the localeString in the form - DD/MM/YYYY, HH:MM
  request.requestTime = new Date().toLocaleString().substring(0, 17);
  next();
});
app.use("/", pageRouter);
app.use("/api/v1/orders", orderRouter);
app.use("/api/v1/users", userRouter);

module.exports = app;
