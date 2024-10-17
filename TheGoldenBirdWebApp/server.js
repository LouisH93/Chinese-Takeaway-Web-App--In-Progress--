const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: `${__dirname}/config.env` });
const app = require(`${__dirname}/app.js`);

// CONNECT TO DATABASE
mongoose
  .connect(process.env.DATABASE_LOCAL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(console.log("Database connection successful"));

// START SERVER
const port = process.env.PORT;
app.listen(port, "127.0.0.1", () => {
  console.log(
    `App running in ${process.env.NODE_ENV} mode, using port: ${port}`
  );
});
