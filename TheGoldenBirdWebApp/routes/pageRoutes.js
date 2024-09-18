const fs = require("fs");
const express = require("express");

const app = express();

// HTML documents
const homePage = fs.readFileSync(`${process.cwd()}/public/html/home.html`);
const menuPage = fs.readFileSync(`${process.cwd()}/public/html/menu.html`);
const cartPage = fs.readFileSync(`${process.cwd()}/public/html/cart.html`);
const checkoutPage = fs.readFileSync(
  `${process.cwd()}/public/html/checkout.html`
);
const contactPage = fs.readFileSync(
  `${process.cwd()}/public/html/contact.html`
);
const signInPage = fs.readFileSync(`${process.cwd()}/public/html/signIn.html`);

// Route handlers
const getRootPage = (request, response) => {
  response.status(200).end(homePage);
};

const getHomePage = (request, response) => {
  response.status(200).end(homePage);
};

const getMenuPage = (request, response) => {
  response.status(200).end(menuPage);
};

const getCartPage = (request, response) => {
  response.status(200).end(cartPage);
};

const getCheckoutPage = (request, response) => {
  response.status(200).end(checkoutPage);
};

const getContactPage = (request, response) => {
  response.status(200).end(contactPage);
};

const getSignInPage = (request, response) => {
  response.status(200).end(signInPage);
};

const router = express.Router();
router.route("/").get(getRootPage);
router.route("/home").get(getHomePage);
router.route("/menu").get(getMenuPage);
router.route("/cart").get(getCartPage);
router.route("/checkout").get(getCheckoutPage);
router.route("/contact").get(getContactPage);
router.route("/signIn").get(getSignInPage);

module.exports = router;
