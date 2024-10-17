"use strict";

const menuSlider = document.querySelector(".menuSlider");
const hamburgerMenu = document.querySelector(".hamburgerIcon");
const closeWindow = document.querySelector(".closeWindow");

let basketQuantity = document.getElementById("basketQuantity");
let basketPriceElement = document.getElementById("basketPrice");

const seeMore = document.getElementById("seeMore");
const summarySection = document.querySelector(".orderSummary");
const arrowIcon = document.getElementById("arrowDownIcon");

const form = document.getElementById("form");

const regexPatterns = {
  email: /^([a-zA-Z\d\.-]{2,})@([a-z]{2,})\.([a-z]{2,})(\.[a-z]{2,})?$/,
};

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

    const summarySection = document.querySelector(".orderSummary");
    let p = document.createElement("p");
    p.className = "orderItems";
    if (orderObj[key].can) {
      p.textContent = `${orderObj[key].itemQuantity} x ${key} (${orderObj[key].can})`;
      summarySection.appendChild(p);
    } else {
      p.textContent = `${orderObj[key].itemQuantity} x ${key}`;
      summarySection.appendChild(p);
    }
  }
  basketQuantity.textContent = numItems;
  basketPriceElement.textContent = `£${price.toFixed(2)}`;
}

seeMore.addEventListener("click", function () {
  summarySection.classList.toggle("hidden");
  if (arrowIcon.src.includes("arrow_drop_down_icon.svg")) {
    arrowIcon.src = "icons\\arrow_drop_up_icon.svg";
  } else {
    arrowIcon.src = "icons\\arrow_drop_down_icon.svg";
  }
});

form.addEventListener("submit", function (event) {
  event.preventDefault();
  const formData = new FormData(form);
  const orderData = {};
  const orderObj = JSON.parse(localStorage.getItem("order"));
  orderData["name"] = Object.fromEntries(formData).name;
  orderData["email"] = Object.fromEntries(formData).email;
  orderData["order"] = orderObj;
  let total = 0;
  for (let orderItem of Object.keys(orderObj)) {
    total += orderObj[orderItem].itemTotal * 1;
  }
  orderData["orderTotal"] = `£${total.toFixed(2)}`;
  orderData["pickUpTime"] = Object.fromEntries(formData).pickup;
  console.log(orderData);
  let data = JSON.stringify(orderData);
  let baseURL = "/api/v1/orders";
  fetch(baseURL, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: data,
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      localStorage.clear();
    })
    .catch((error) => console.log(error));
});
