"use strict";

const menuSlider = document.querySelector(".menuSlider");
const hamburgerMenu = document.querySelector(".hamburgerIcon");
const closeWindow = document.querySelector(".closeWindow");
const contactPageMenuLink = document.getElementById("menuSliderContact");

let basketQuantity = document.getElementById("basketQuantity");
let basketPriceElement = document.getElementById("basketPrice");

const map = document.querySelector(".map");
const loadingIcon = document.querySelector(".iconLoading");

hamburgerMenu.addEventListener("click", function () {
  menuSlider.classList.toggle("hidden");
});

closeWindow.addEventListener("click", function () {
  menuSlider.classList.toggle("hidden");
});

if (localStorage.getItem("order")) {
  let numItems = 0;
  let price = 0;
  let orderObj = JSON.parse(localStorage.getItem("order"));
  for (let key of Object.keys(orderObj)) {
    numItems += orderObj[key].itemQuantity;
    price += Number(orderObj[key].itemTotal);
  }
  basketQuantity.textContent = numItems;
  basketPriceElement.textContent = `£${price.toFixed(2)}`;
}

window.addEventListener("load", function () {
  map.classList.toggle("hidden");
  loadingIcon.style.display = "none";
});
