import { cheapPrice } from "./database.js";

// Jquery $(window) allows the scroll listener to run only once
// https://stackoverflow.com/questions/32134451/call-function-on-scroll-only-once#:~:text=Try%20using%20.-,one,-()%3A

// #region - points popup //
const pointsPopup = document.querySelector(".points-popup");
const html = document.querySelector("html");
const body = document.querySelector("body");
const mainHeading = document.querySelector(".heading-image-container");

// pop-up on scroll
$(window).one("scroll", function () {
  // checking window.ScrollY prevents popup glitch when returning from contact to blog section page
  if (window.scrollY < 100) {
    mainHeading.classList.toggle("make-invisible");
    pointsPopup.classList.toggle("make-flex");
    // lock screen (main styles.scss)
    html.classList.toggle("stop-scrolling");
    body.classList.toggle("stop-scrolling");
  }
});

// close event
const xDiv = document.querySelector(".x-div-container");

const close = () => {
  mainHeading.classList.toggle("make-invisible");
  pointsPopup.classList.toggle("make-flex");
  // enable scroll (main styles.scss)
  html.classList.toggle("stop-scrolling");
  body.classList.toggle("stop-scrolling");
};

// listens only if element exists (contact)
if (xDiv) xDiv.addEventListener("click", close);

// #endregion - points popup //

// #region - hamburger focus //
const hamburger = document.querySelector(".hamburger-menu-icon");
const nav = document.querySelector(".nav-container");
const navLinks = document.querySelector("nav>ul");

const toggleHamburger = () => {
  const burgerLines = document.querySelectorAll(".hamburger-menu-icon .lines");

  /* #region - add burger-line styles */
  burgerLines[0].classList.toggle("a");
  burgerLines[1].classList.toggle("b");
  burgerLines[2].classList.toggle("make-invisible");
  /* #endregion - add burger-line styles */

  nav.classList.toggle("increase-height");
  navLinks.classList.toggle("make-flex");
};

hamburger.addEventListener("click", toggleHamburger);

// #endregion - hamburger focus //

// #region - cart
const cartIcon = document.querySelector(".cart-info-heading");
const cartDropdown = document.querySelector(".cart-dropdown");
const cartCounter = document.querySelector(".item-num > p");

// #region - cart dropdown
const showCart = () => {
  cartDropdown.classList.toggle("make-block");
};
cartIcon.addEventListener("click", showCart);
// #endregion - cart dropdown

// #region - cart counter
// get product buttons
const productButtons = document.querySelectorAll(".product-link > button");
let cartItemTotal = parseInt(cartCounter.textContent);

// forEach has built in parameters (element, index, array etc...)
productButtons.forEach((button, index) => {
  button.onclick = (e) => {
    // add to cart item counter with each click
    cartItemTotal += 1;
    cartCounter.textContent = cartItemTotal;
    console.log("You clicked button number " + index);
  };
});
// figure out where to put this
// if (cartCounter.textContent > 0) {

//     const emptyCartMessage = document.querySelector('.empty-cart-message');

//     console.log(emptyCartMessage);

//     emptyCartMessage.classList.toggle('make-invisible');
// }
// #endregion - cart counter
// #endregion - cart
