import { displayItems } from './database.js';

// #region - points popup //
const pointsPopup = document.querySelector('.points-popup');
const html = document.querySelector('html');
const body = document.querySelector('body');
const mainHeading = document.querySelector('.heading-image-container');

// close event
const xDiv = document.querySelector('.x-div-container');

const close = () => {
  mainHeading.classList.toggle('make-invisible');
  pointsPopup.classList.toggle('make-flex');
  // enable scroll (main styles.scss)
  html.classList.toggle('stop-scrolling');
  body.classList.toggle('stop-scrolling');
};

// listens only if element exists (contact)
if (xDiv) xDiv.addEventListener('click', close);

// #endregion - points popup //

// #region - hamburger focus //
const hamburger = document.querySelector('.hamburger-menu-icon');
const nav = document.querySelector('.nav-container');
const navLinks = document.querySelector('nav>ul');

const toggleHamburger = () => {
  const burgerLines = document.querySelectorAll('.hamburger-menu-icon .lines');

  /* #region - add burger-line styles */
  burgerLines[0].classList.toggle('a');
  burgerLines[1].classList.toggle('b');
  burgerLines[2].classList.toggle('make-invisible');
  /* #endregion - add burger-line styles */

  nav.classList.toggle('increase-height');
  navLinks.classList.toggle('make-flex');
};

hamburger.addEventListener('click', toggleHamburger);

// #endregion - hamburger focus //

// #region - cart
const cartIcon = document.querySelector('.cart-info-heading');
const cartDropdown = document.querySelector('.cart-dropdown');
const main = document.querySelectorAll('.main--section');

// #region - cart dropdown
const showCart = (e) => {
  // prevents the page scrolling to the top whenever cart is opened
  e.preventDefault();
  cartDropdown.classList.toggle('make-block');
};
cartIcon.addEventListener('click', showCart);
// #endregion - cart dropdown
// #endregion - cart

// closes the cart when clicked anywhere other than the navbar area
main.forEach((sectionWebsite) => {
  sectionWebsite.addEventListener('click', function (e) {
    const productButtons = (e.target.parentElement.classList[1] === "product-link");
    if (!productButtons) { cartDropdown.classList.remove('make-block'); }
  });
});
