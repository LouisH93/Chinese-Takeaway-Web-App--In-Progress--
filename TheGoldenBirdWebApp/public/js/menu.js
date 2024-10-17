"use strict";

const menuSlider = document.querySelector(".menuSlider");
const hamburgerMenu = document.querySelector(".hamburgerIcon");
const closeWindow = document.querySelector(".closeWindow");
const menuPageMenuSliderLink = document.getElementById("menuSliderFoodMenu");

let date = new Date();
const openBanner = document.getElementById("openBanner");
const openInfo = document.getElementById("openInfo");

const moreBtnElements = document.querySelectorAll(".moreBtn");
const lessBtnElements = document.querySelectorAll(".lessBtn");
const seeMore = document.querySelectorAll(".seeMore");

const timeFormatter = function () {
  let timeStr = date.toLocaleString().substring(11).trimStart();
  let hour = timeStr.slice(0, 2);
  let minute = timeStr.slice(3, 5);
  let formattedTime = `${hour}:${minute}`;
  return formattedTime;
};

window.addEventListener("load", function () {
  let time = timeFormatter();
  if (date.getUTCDay() !== 2 && time >= "16:30" && time < "22:00") {
    openBanner.textContent = "open";
    openBanner.style.color = "green";
    openInfo.textContent = "Open Today: 16:30PM - 22:00PM";
    openInfo.style.fontWeight = "350";
  } else if (date.getUTCDay() === 2) {
    openBanner.textContent = "closed";
    openBanner.style.color = "#ff4d4d";
    openInfo.textContent = "Open Wednesday: 16:30 PM - 22:00PM";
    openInfo.style.fontWeight = "350";
  } else if (date.getUTCDay() !== 1 && time >= "22:00" && time < "0:00") {
    openBanner.textContent = "closed";
    openBanner.style.color = "#ff4d4d";
    openInfo.textContent = "Open Tomorrow: 16:30 PM - 22:00PM";
    openInfo.style.fontWeight = "350";
  } else {
    openBanner.textContent = "closed";
    openBanner.style.color = "#ff4d4d";
    openInfo.textContent = "Open Today: 16:30 PM - 22:00PM";
    openInfo.style.fontWeight = "350";
  }
});

hamburgerMenu.addEventListener("click", function () {
  menuSlider.classList.toggle("hidden");
});

closeWindow.addEventListener("click", function () {
  menuSlider.classList.toggle("hidden");
});

const iconSwap = function (icon) {
  if (icon.src.includes("arrow_drop_down_icon.svg")) {
    icon.src = "icons\\arrow_drop_up_icon.svg";
  } else {
    icon.src = "icons\\arrow_drop_down_icon.svg";
  }
};

moreBtnElements.forEach((moreBtn, index) => {
  moreBtn.addEventListener("click", (event) => {
    let clickedElementId = event.target.parentElement.id;
    document.querySelector("." + clickedElementId).classList.toggle("hidden");
    iconSwap(seeMore[index]);
  });
});

lessBtnElements.forEach((lessBtn, index) => {
  lessBtn.addEventListener("click", (event) => {
    let clickedElement = event.target;
    clickedElement.closest("div").classList.toggle("hidden");
    iconSwap(seeMore[index]);
  });
});

let basketQuantity = document.getElementById("basketQuantity");
let basketPriceElement = document.getElementById("basketPrice");
const order = {};
const menuButton = document.querySelectorAll(".menuBtn");
menuButton.forEach((button) =>
  button.addEventListener("click", function () {
    let menuItemTitle = button.parentElement.children[0].textContent.trim();
    let menuItemPrice = Number(
      button.parentElement.children[2].textContent.substring(1)
    );
    let selectIndex = button.parentElement.children[3].selectedIndex;
    let selectOptions = button.parentElement.children[3].options;
    let menuItemQuantity = Number(button.parentElement.children[3].value);
    let priceAddedToCart =
      Number(selectOptions[selectIndex].value) * Number(menuItemPrice);

    if (
      button.parentElement.childElementCount === 6 &&
      button.parentElement.children[4].className === "sauceChoice"
    ) {
      let sauceChoice = button.parentElement.children[4].value;
      order[`${menuItemTitle} (${sauceChoice})`] = {
        itemPrice: menuItemPrice.toFixed(2),
        itemQuantity: menuItemQuantity,
        itemTotal: priceAddedToCart.toFixed(2),
        sauce: sauceChoice,
      };
    } else if (
      button.parentElement.childElementCount === 6 &&
      button.parentElement.children[4].className === "canChoice"
    ) {
      let canChoice = button.parentElement.children[4].value;
      order[menuItemTitle] = {
        itemPrice: menuItemPrice.toFixed(2),
        itemQuantity: menuItemQuantity,
        itemTotal: priceAddedToCart.toFixed(2),
        can: canChoice,
      };
    } else {
      order[menuItemTitle] = {
        itemPrice: menuItemPrice.toFixed(2),
        itemQuantity: menuItemQuantity,
        itemTotal: priceAddedToCart.toFixed(2),
      };
    }

    if (localStorage.getItem("order")) {
      let orderObj = JSON.parse(localStorage.getItem("order"));
      for (let key of Object.keys(orderObj)) {
        order[key] = orderObj[key];
        order[key].itemQuantity = orderObj[key].itemQuantity;

        if (orderObj[key] === order[menuItemTitle]) {
          order[menuItemTitle].itemQuantity =
            Number(order[menuItemTitle].itemQuantity) +
            Number(selectOptions[selectIndex].value);
          order[menuItemTitle].itemTotal =
            Number(order[menuItemTitle].itemTotal) + Number(priceAddedToCart);
        }
      }
    }

    let quantity = Number(basketQuantity.textContent);
    basketQuantity.textContent = quantity + menuItemQuantity;
    let basketPrice = Number(basketPriceElement.textContent.substring(1));
    let x = (basketPrice += priceAddedToCart).toFixed(2);
    basketPriceElement.textContent = `£${x}`;

    const JSONorder = JSON.stringify(order);
    localStorage.setItem("order", JSONorder);
    const JSONbasketTotal = JSON.stringify(x);
    localStorage.setItem("basketTotal", JSONbasketTotal);
  })
);

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
