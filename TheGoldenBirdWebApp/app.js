const fs = require("fs");
const express = require("express");
const pageRouter = require(`${__dirname}/routes/pageRoutes.js`);
const orderRouter = require(`${__dirname}/routes/orderRoutes.js`);
const userRouter = require(`${__dirname}/routes/userRoutes.js`);

const app = express();

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

const port = 443;
app.listen(port, "127.0.0.1", () => {
  console.log(`Server listening to requests on port: ${port}`);
});
