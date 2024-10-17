"use strict";

const menuSlider = document.querySelector(".menuSlider");
const hamburgerMenu = document.querySelector(".hamburgerIcon");
const closeWindow = document.querySelector(".closeWindow");
const signInPageMenuLink = document.getElementById("menuSliderLogin");

let basketQuantity = document.getElementById("basketQuantity");
let basketPriceElement = document.getElementById("basketPrice");

const mainHeader = document.getElementById("mainHeader");
const logInForm = document.getElementById("formLogin");
const createForm = document.querySelector(".formCreate");
const createLink = document.getElementById("create");
const createNotice = document.getElementById("createNotice");
const inputElements = document.querySelectorAll(".inputs");
const regexPatterns = {
  username: /^([a-zA-Z\d\.-_]{2,})@([a-z]{2,})\.([a-z]{2,})(\.[a-z]{2,})?$/,
  password:
    /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[`¬!"£$%^&*])[a-zA-Z0-9`¬!"£$%^&*]{8,}/,
};
const backIcon = document.querySelector(".pageBack");
const createAccount = document.getElementById("create");

// Log-in form elements
const usernameElement = document.getElementById("username");
const usernameInfo = document.querySelector(".username");
const passwordElement = document.getElementById("password");
const passwordInfo = document.querySelector(".password");
const passwordConfirmElement = document.getElementById("password2");
const passwordConfirmationInfo = document.querySelector(".password2");
// Create account form elements
const createUsername = document.getElementById("createUsername");
const createUsernameInfo = document.querySelector(".createUsername");
const confirmUsername = document.getElementById("createUsername2");
const confirmUsernameInfo = document.querySelector(".createUsername2");
const createPassword = document.getElementById("createPassword");
const createPasswordInfo = document.querySelector(".createPassword");
const confirmPassword = document.getElementById("createPassword2");
const confirmPasswordInfo = document.querySelector(".createPassword2");

const validationSuccessStyle = "1px solid #41a934";
const validationFailureStyle = "1px solid red";
let validationWarningStyle;
if (window.innerWidth < 800) {
  validationWarningStyle = `
    font-size: 0.9em;
    color: red;
    `;
} else {
  validationWarningStyle = `
    font-size: 1.1em;
    color: red;
    `;
}

hamburgerMenu.addEventListener("click", function () {
  menuSlider.classList.toggle("hidden");
});

closeWindow.addEventListener("click", function () {
  menuSlider.classList.toggle("hidden");
});

createLink.addEventListener("click", function () {
  logInForm.style.display = "none";
  createForm.classList.toggle("hidden");
  mainHeader.textContent = "Create an account";
  createNotice.style.display = "none";
});

const validate = function () {
  // Log-in form elements validation
  if (!regexPatterns["username"].test(usernameElement.value)) {
    usernameInfo.classList.remove("hidden");
    usernameInfo.style.cssText = validationWarningStyle;
    usernameElement.style.border = validationFailureStyle;
  } else {
    usernameInfo.classList.add("hidden");
    usernameElement.style.border = validationSuccessStyle;
  }

  if (!regexPatterns["password"].test(passwordElement.value)) {
    passwordInfo.classList.remove("hidden");
    passwordInfo.style.cssText = validationWarningStyle;
    passwordElement.style.border = validationFailureStyle;
  } else {
    passwordInfo.classList.add("hidden");
    passwordElement.style.border = validationSuccessStyle;
  }

  if (
    passwordConfirmElement.value === passwordElement.value &&
    passwordConfirmElement.value !== "" &&
    passwordElement.value !== ""
  ) {
    passwordConfirmationInfo.classList.add("hidden");
    passwordConfirmElement.style.border = validationSuccessStyle;
  } else {
    passwordConfirmationInfo.classList.remove("hidden");
    passwordConfirmationInfo.style.cssText = validationWarningStyle;
    passwordConfirmElement.style.border = validationFailureStyle;
  }

  // Create account elements validation
  if (!backIcon.classList.contains("hidden")) {
    if (!regexPatterns["username"].test(createUsername.value)) {
      createUsernameInfo.classList.remove("hidden");
      createUsernameInfo.style.cssText = validationWarningStyle;
      createUsername.style.border = validationFailureStyle;
    } else {
      createUsernameInfo.classList.add("hidden");
      createUsername.style.border = validationSuccessStyle;
    }

    if (
      confirmUsername.value === createUsername.value &&
      confirmUsername.value !== ""
    ) {
      confirmUsernameInfo.classList.add("hidden");
      confirmUsername.style.border = validationSuccessStyle;
    } else {
      confirmUsernameInfo.classList.remove("hidden");
      confirmUsernameInfo.style.cssText = validationWarningStyle;
      confirmUsername.style.border = validationFailureStyle;
    }

    if (!regexPatterns["password"].test(createPassword.value)) {
      createPasswordInfo.classList.remove("hidden");
      createPasswordInfo.style.cssText = validationWarningStyle;
      createPassword.style.border = validationFailureStyle;
    } else {
      createPasswordInfo.classList.add("hidden");
      createPassword.style.border = validationSuccessStyle;
    }

    if (
      confirmPassword.value === createPassword.value &&
      confirmPassword.value !== ""
    ) {
      confirmPasswordInfo.classList.add("hidden");
      confirmPassword.style.border = validationSuccessStyle;
    } else {
      confirmPasswordInfo.classList.remove("hidden");
      confirmPasswordInfo.style.cssText = validationWarningStyle;
      confirmPassword.style.border = validationFailureStyle;
    }
  }
};

inputElements.forEach((inputElement) => {
  inputElement.addEventListener("keyup", validate);
});

createAccount.addEventListener("click", function () {
  backIcon.classList.remove("hidden");
});

const button = document.querySelector(".btn");

button.addEventListener("click", function (event) {
  event.preventDefault();
  const formData = new FormData(logInForm);
  const data = Object.fromEntries(formData);
  const baseURL = "/api/v1/users";
  fetch(baseURL, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((error) => {
      console.log(error);
    });
});
