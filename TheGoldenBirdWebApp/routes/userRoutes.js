const express = require("express");
const userController = require(`${process.cwd()}/public/controllers/userController.js`);

const router = express.Router();
router
  .route("/")
  .get(userController.getAllUsers)
  .post(userController.createUser);
router.route("/:id").get(userController.getUser);

module.exports = router;
