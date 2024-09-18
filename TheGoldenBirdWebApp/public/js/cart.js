"use strict";

const menuSlider = document.querySelector(".menuSlider");
const hamburgerMenu = document.querySelector(".hamburgerIcon");
const closeWindow = document.querySelector(".closeWindow");

hamburgerMenu.addEventListener("click", function () {
  menuSlider.classList.toggle("hidden");
});

closeWindow.addEventListener("click", function () {
  menuSlider.classList.toggle("hidden");
});

let basketTotal = JSON.parse(localStorage.getItem("basketTotal"));
let div = document.createElement("div");
// For css styling purposes
div.setAttribute("id", "totalDiv");
let divParagraph = document.createElement("p");
// For css styling purposes
divParagraph.setAttribute("id", "divParagraph");
let divSpan = document.createElement("span");
// For css styling purposes
divSpan.setAttribute("id", "divSpan");

divParagraph.textContent = "Total :";
divSpan.textContent = `£${Number(basketTotal).toFixed(2)}`;
divParagraph.appendChild(divSpan);
div.appendChild(divParagraph);

const run = function () {
  const order = localStorage.getItem("order");
  let orderObj = JSON.parse(order);

  for (let menuItemTitle of Object.keys(orderObj)) {
    const main = document.querySelector(".main");
    let section = document.createElement("section");
    // For CSS styling purposes
    section.setAttribute("id", "orderItemSection");
    let p = document.createElement("p");
    // For CSS styling purposes
    p.setAttribute("class", "sectionParagraph");
    let quantityBtnRight = document.createElement("button");
    // For CSS styling purposes
    quantityBtnRight.setAttribute("class", "quantityBtnRight");
    let quantityBtnLeft = document.createElement("button");
    // For CSS styling purposes
    quantityBtnLeft.setAttribute("class", "quantityBtnLeft");
    let quantityBtnLess = document.createElement("img");
    let quantityBtnMore = document.createElement("img");
    let priceSpan = document.createElement("span");
    let removeItem = document.createElement("a");
    // For CSS styling purposes
    removeItem.setAttribute("class", "removeLink");

    p.textContent =
      `${orderObj[menuItemTitle].itemQuantity} x ` + menuItemTitle;

    quantityBtnLess.src = "icons\\basket_remove_icon.svg";

    quantityBtnMore.src = "icons\\basket_add_icon.svg";

    quantityBtnLeft.appendChild(quantityBtnLess);

    quantityBtnRight.appendChild(quantityBtnMore);

    priceSpan.textContent = `£${Number(
      orderObj[menuItemTitle].itemTotal
    ).toFixed(2)}`;
    if (orderObj[menuItemTitle].sauce || orderObj[menuItemTitle].can) {
      priceSpan.style.cssText = `
        margin-left: 0.5rem;
        margin-bottom: 1rem;
        font-weight: 380;
        color: 
        `;
    } else {
      priceSpan.style.cssText = `
        margin-left: 0.5rem;
        margin-bottom: 4rem;
        font-weight: 380;
        color: 
        `;
    }

    removeItem.textContent = "Remove";

    let sauceSelect;
    if (orderObj[menuItemTitle].sauce) {
      sauceSelect = document.createElement("select");
      let optionsArr = [
        "Curry Sauce 🌶️",
        "Gravy",
        "Sweet & Sour Sauce",
        "Barbecue Sauce",
      ];

      for (let sauceChoice of optionsArr) {
        let option = document.createElement("option");
        option.value = sauceChoice;
        option.innerText = sauceChoice;
        let currentChoice = orderObj[menuItemTitle].sauce;
        if (sauceChoice === currentChoice) {
          option.setAttribute("selected", "selected");
        }
        sauceSelect.appendChild(option);
        sauceSelect.setAttribute("id", "sauceSelect");
      }
    }

    let canSelect;
    if (orderObj[menuItemTitle].can) {
      canSelect = document.createElement("select");
      let optionsArr = [
        "Coke",
        "Diet Coke",
        "Pepsi",
        "Diet Pepsi",
        "Dr Pepper",
        "Fanta Orange",
        "Vimto",
      ];

      for (let canChoice of optionsArr) {
        let option = document.createElement("option");
        option.value = canChoice;
        option.innerText = canChoice;
        let currentChoice = orderObj[menuItemTitle].can;
        if (canChoice === currentChoice) {
          option.setAttribute("selected", "selected");
        }
        canSelect.appendChild(option);
        canSelect.setAttribute("id", "canSelect");
      }
    }

    quantityBtnLeft.appendChild(quantityBtnLess);
    quantityBtnRight.appendChild(quantityBtnMore);
    section.appendChild(p);
    section.appendChild(priceSpan);
    if (sauceSelect) {
      section.appendChild(sauceSelect);
    } else if (canSelect) {
      section.appendChild(canSelect);
    }
    section.appendChild(quantityBtnLeft);
    section.appendChild(removeItem);
    section.appendChild(quantityBtnRight);
    main.appendChild(section);

    if (orderObj[menuItemTitle].sauce) {
      let sauceSelectElement = document.getElementById("sauceSelect");
      sauceSelectElement.addEventListener("change", function () {
        let options = sauceSelect.options;
        let selectedIndex = sauceSelect.selectedIndex;
        let newSauceChoice = options[selectedIndex].value;

        orderObj[menuItemTitle].sauce = newSauceChoice;
        let previousMenuItemTitle = menuItemTitle;
        let newMenuItemTitle = `${
          menuItemTitle.split("(")[0]
        }(${newSauceChoice})`;
        orderObj[newMenuItemTitle] = orderObj[previousMenuItemTitle];
        delete orderObj[previousMenuItemTitle];
        localStorage.removeItem("order");

        const JSONorder = JSON.stringify(orderObj);
        localStorage.setItem("order", JSONorder);

        p.textContent = `${orderObj[newMenuItemTitle].itemQuantity} ${
          menuItemTitle.split("(")[0]
        }(${newSauceChoice})`;

        menuItemTitle = newMenuItemTitle;
      });
    }

    if (orderObj[menuItemTitle].can) {
      let canSelectElement = document.getElementById("canSelect");
      canSelectElement.addEventListener("change", function () {
        let options = canSelect.options;
        let selectedIndex = canSelect.selectedIndex;
        let newCanChoice = options[selectedIndex].value;

        orderObj[menuItemTitle].can = newCanChoice;
        localStorage.removeItem("order");
        const JSONorder = JSON.stringify(orderObj);
        localStorage.setItem("order", JSONorder);
      });
    }

    removeItem.addEventListener("click", function () {
      basketTotal -= orderObj[menuItemTitle].itemTotal;
      localStorage.removeItem("basketTotal");
      const JSONbasketTotal = JSON.stringify(basketTotal.toFixed(2));
      localStorage.setItem("basketTotal", JSONbasketTotal);
      let total = JSON.parse(localStorage.getItem("basketTotal"));
      divSpan.textContent = `£${Number(total).toFixed(2)}`;
      delete orderObj[menuItemTitle];
      localStorage.removeItem("order");
      const JSONorder = JSON.stringify(orderObj);
      localStorage.setItem("order", JSONorder);
      removeItem.parentElement.style.display = "none";
      if (localStorage.getItem("order") === "{}") {
        localStorage.removeItem("order");
      }
    });

    let currentItemQuantity = orderObj[menuItemTitle].itemQuantity;
    let currentItemPrice;
    quantityBtnLeft.addEventListener("click", function () {
      if (currentItemQuantity > 1) {
        currentItemQuantity--;
        currentItemPrice = Number(
          currentItemQuantity * orderObj[menuItemTitle].itemPrice
        ).toFixed(2);
        orderObj[menuItemTitle].itemTotal = currentItemPrice;
        orderObj[menuItemTitle].itemQuantity = currentItemQuantity;
        p.textContent = `${currentItemQuantity} x ` + menuItemTitle;
        priceSpan.textContent = `£${currentItemPrice}`;

        basketTotal -= orderObj[menuItemTitle].itemPrice;
        localStorage.removeItem("basketTotal");
        let JSONbasketTotal = JSON.stringify(basketTotal.toFixed(2));
        localStorage.setItem("basketTotal", JSONbasketTotal);
        let total = JSON.parse(localStorage.getItem("basketTotal"));
        divSpan.textContent = `£${Number(total).toFixed(2)}`;

        localStorage.removeItem("order");
        const JSONorder = JSON.stringify(orderObj);
        localStorage.setItem("order", JSONorder);
      } else if (currentItemQuantity === 1) {
        basketTotal -= orderObj[menuItemTitle].itemPrice;
        localStorage.removeItem("basketTotal");
        const JSONbasketTotal = JSON.stringify(basketTotal.toFixed(2));
        localStorage.setItem("basketTotal", JSONbasketTotal);
        let total = JSON.parse(localStorage.getItem("basketTotal"));
        divSpan.textContent = `£${Number(total).toFixed(2)}`;

        delete orderObj[menuItemTitle];
        localStorage.removeItem("order");
        const JSONorder = JSON.stringify(orderObj);
        localStorage.setItem("order", JSONorder);
        removeItem.parentElement.style.display = "none";
        if (localStorage.getItem("order") === "{}") {
          localStorage.removeItem("order");
        }
      }
    });

    quantityBtnRight.addEventListener("click", function () {
      if (currentItemQuantity < 10) {
        currentItemQuantity++;
        currentItemPrice = Number(
          currentItemQuantity * orderObj[menuItemTitle].itemPrice
        ).toFixed(2);
        orderObj[menuItemTitle].itemTotal = currentItemPrice;
        orderObj[menuItemTitle].itemQuantity = currentItemQuantity;

        basketTotal =
          Number(basketTotal) + Number(orderObj[menuItemTitle].itemPrice);
        localStorage.removeItem("basketTotal");
        let JSONbasketTotal = JSON.stringify(Number(basketTotal).toFixed(2));
        localStorage.setItem("basketTotal", JSONbasketTotal);
        let total = JSON.parse(localStorage.getItem("basketTotal"));
        divSpan.textContent = `£${total}`;

        localStorage.removeItem("order");
        const JSONorder = JSON.stringify(orderObj);
        localStorage.setItem("order", JSONorder);

        p.textContent = `${currentItemQuantity} x ` + menuItemTitle;
        priceSpan.textContent = `£${currentItemPrice}`;
      }
    });
  }
};
if (localStorage.getItem("order")) {
  window.addEventListener("load", function () {
    run();

    let checkoutBtn = document.createElement("button");
    checkoutBtn.setAttribute("type", "button");
    // For CSS styling purposes
    checkoutBtn.setAttribute("id", "checkoutBtn");
    checkoutBtn.className = "checkoutBtn";
    checkoutBtn.textContent = "Checkout";

    this.document.body.appendChild(div);
    this.document.body.appendChild(checkoutBtn);

    this.document
      .querySelector(".checkoutBtn")
      .addEventListener("click", function () {
        window.location.href = "checkout";
      });
  });
} else {
  window.addEventListener("load", function () {
    const notification = document.createElement("p");
    const heading = document.getElementById("mainHeading");
    heading.style.display = "none";
    notification.textContent = "Basket is currently empty";
    notification.style.cssText = `
    display: flex;
    text-align: center;
    margin: auto;
    padding: 5rem;
    font-family: inherit;
    font-weight: 300;
    `;

    document.body.appendChild(notification);
    this.document.body.appendChild(div);
  });
}
