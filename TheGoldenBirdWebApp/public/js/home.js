"use strict";

const menuSlider = document.querySelector(".menuSlider");
const hamburgerMenu = document.querySelector(".hamburgerIcon");
const closeWindow = document.querySelector(".closeWindow");
const homePageMenuLink = document.getElementById("menuSliderHome");
const mainBtn = document.querySelector(".mainBtn");
const carouselImages = [
  "images\\carousel1.jpg",
  "images\\carousel2.jpg",
  "images\\carousel3.jpg",
  "images\\carousel4.jpg",
  "images\\carousel5.jpg",
];
const carouselImage = document.getElementById("carouselImg");
let currentIndex = carouselImages.indexOf(carouselImages[0]);

hamburgerMenu.addEventListener("click", function () {
  menuSlider.classList.toggle("hidden");
  homePageMenuLink.style.cssText = `
  text-decoration: underline;
  text-decoration-color: black;
  `;
});

closeWindow.addEventListener("click", function () {
  menuSlider.classList.toggle("hidden");
});

// const automaticImageSlider = function () {
//   if (currentIndex >= 0 && currentIndex < carouselImages.length - 1) {
//     currentIndex++;
//     carouselImage.src = carouselImages[currentIndex];
//   } else {
//     currentIndex = 0;
//     carouselImage.src = carouselImages[currentIndex];
//   }
// };
// setTimeout(setInterval(automaticImageSlider, 2000), 3000);
