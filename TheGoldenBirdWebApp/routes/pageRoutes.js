const express = require("express");
const pageController = require(`${process.cwd()}/public/controllers/pageController.js`);

const router = express.Router();
router.route("/").get(pageController.getRootPage);
router.route("/home").get(pageController.getHomePage);
router.route("/menu").get(pageController.getMenuPage);
router.route("/cart").get(pageController.getCartPage);
router.route("/checkout").get(pageController.getCheckoutPage);
router.route("/contact").get(pageController.getContactPage);
router.route("/signIn").get(pageController.getSignInPage);

module.exports = router;
