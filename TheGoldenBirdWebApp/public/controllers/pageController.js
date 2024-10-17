const fs = require("fs");

// HTML documents retrieval
const basePath = `${process.cwd()}/public/html/`;
const homePage = fs.readFileSync(`${basePath}home.html`);
const menuPage = fs.readFileSync(`${basePath}menu.html`);
const cartPage = fs.readFileSync(`${basePath}cart.html`);
const checkoutPage = fs.readFileSync(`${basePath}checkout.html`);
const contactPage = fs.readFileSync(`${basePath}contact.html`);
const signInPage = fs.readFileSync(`${basePath}signIn.html`);

// Route handlers
exports.getRootPage = (request, response) => {
  response.status(200).end(homePage);
};

exports.getHomePage = (request, response) => {
  response.status(200).end(homePage);
};

exports.getMenuPage = (request, response) => {
  response.status(200).end(menuPage);
};

exports.getCartPage = (request, response) => {
  response.status(200).end(cartPage);
};

exports.getCheckoutPage = (request, response) => {
  response.status(200).end(checkoutPage);
};

exports.getContactPage = (request, response) => {
  response.status(200).end(contactPage);
};

exports.getSignInPage = (request, response) => {
  response.status(200).end(signInPage);
};
