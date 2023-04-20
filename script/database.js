import app from "./firebase-config.js";

import {
  getDatabase,
  ref,
  set,
  onValue,
  get,
  push,
} from "https://www.gstatic.com/firebasejs/9.19.1/firebase-database.js";

const myDatabase = getDatabase(app);
// should not be called dbRef
const dbRef = ref(myDatabase);
const cartRef = ref(myDatabase, '/cart');
const inventoryRef = ref(myDatabase, '/inventory');

// creating a function to add to database

const addToDatabase = (key, value) => {
  const customRef = ref(myDatabase, key);
  set(customRef, value);
};

// DATA SECTION
export const cheapPrice = () =>
  parseFloat(Math.random() * (5 - 1) + 1).toFixed(2);
const expPrice = () => parseFloat(Math.random() * (15 - 10) + 10).toFixed(2);

const totalInventory = [
  {
    productName: "Tomatoes",
    id: 0,
    qty: 0,
    src: "./organic-project/assets/product1.jpeg",
    price: cheapPrice(),
    type: "$",
  },
  {
    productName: "Lime",
    id: 1,
    qty: 0,
    src: "./organic-project/assets/product2.jpeg",
    price: cheapPrice(),
    type: "$",
  },
  {
    productName: "Organic Eggplant",
    id: 2,
    qty: 0,
    src: "./organic-project/assets/product3.jpeg",
    price: expPrice(),
    type: "$$",
  },
  {
    productName: "Cucumber",
    id: 3,
    qty: 0,
    src: "./organic-project/assets/product4.jpeg",
    price: cheapPrice(),
    type: "$",
  },
  {
    productName: "Organic Peas",
    id: 4,
    qty: 0,
    src: "./organic-project/assets/product5.jpeg",
    price: expPrice(),
    type: "$$",
  },
  {
    productName: "Lettuce",
    id: 5,
    qty: 0,
    src: "./organic-project/assets/product6.jpeg",
    price: cheapPrice(),
    type: "$",
  },
  {
    productName: "Cabbage",
    id: 6,
    qty: 0,
    src: "./organic-project/assets/product7.jpeg",
    price: cheapPrice(),
    type: "$",
  },
  {
    productName: "Organic Lettuce",
    id: 7,
    qty: 0,
    src: "./organic-project/assets/product8.jpeg",
    price: expPrice(),
    type: "$$",
  },
];

const cart = [];
// adding the inventory to database
// addToDatabase("inventory", totalInventory);

// adding cart to data
// addToDatabase("cart", cart);
// console.log(cart);

// Importing data from Firebase

// created a global variable to store inventory data from firebase
let inventory;
onValue(dbRef, function (snapshot) {
  const ourData = snapshot.val();
  // storing the data in inventory variable
  inventory = ourData.inventory;
  displayItems(inventory);
});

// Function to Display the items on the page
const productGallery = document.querySelector(".inventory");

const displayItems = (stock) => {
  productGallery.innerHTML = "";

  stock.forEach((item) => {
    const newListItem = document.createElement("li");
    newListItem.innerHTML = `
    <img
        src= ${item.src}
        alt="Image of ${item.productName}"
      />
      <div class="text-container">
        <div class="info-container">
          <h4>${item.productName}</h4>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </p>
          <p class="price">$${item.price}</p>
          
        </div>

        <!-- Cart Button -->
        <div class="link-container product-link">
          <button tabindex="0" dataindex="${item.id}">Add To Cart</button>
        </div>
      </div>
    `;
    // console.log(item);
    productGallery.appendChild(newListItem);
  });
};

// #region - cart counter
const cartCounter = document.querySelector(".item-num > p");
// get product buttons
const productButtons = document.querySelectorAll(".product-link > button");
let cartItemTotal = parseInt(cartCounter.textContent);

productGallery.addEventListener("click", function (e) {
  // get parent list item from child button
  const chosenProduct = e.target.closest('li');
  const chosenProductIndex = e.target.attributes.dataindex.value;

  const selectedProductRef = ref(myDatabase, `/inventory/${chosenProductIndex}`); 

  get(selectedProductRef)
    .then ((snapshot) => {
      const productSnapshot = snapshot.val();
      console.log(productSnapshot);
      productSnapshot.qty = 1;
      push(cartRef, productSnapshot);
    });

  // if (e.target.tagName === "BUTTON") {
  //   // should only add item to array if item doesn't exist. If it does exist, change quantity > use update?
  //   cart.push(chosenProduct);
    
  //   const chosenProductObject = totalInventory[chosenProductIndex];
  //   console.log(chosenProductObject);
  //   // add elements
  //   addToCart(cart);
  // }
});

onValue(cartRef, function (snapshot) {
  const cartData = snapshot.val();
  
  updateCart(cartData);
});

const updateCart = (cartData) => {
  const cartDropdownList = document.querySelector('.cart-dropdown ul');
  const emptyCartMessage = document.querySelector('.empty-cart-message');
  cartDropdownList.innerHTML = "";
  console.log(cartData)
  // removes empty cart message when cart contains items
  if (Object.keys(cartData).length > 0) {
    emptyCartMessage.classList.add('make-invisible');
  }

 for (let key in cartData) {
    const newCartItem = document.createElement('li');
    newCartItem.classList.add('full-cart');
    const item = cartData[key];
    newCartItem.innerHTML = `
      <div class="arrows">
          <image class=arrows src="./organic-project/assets/icons/chevron-up-outline.svg" alt="up arrow"></image>
          <p>${item.qty}</p>
          <img class=arrows src="./organic-project/assets/icons/chevron-down-outline.svg" alt="down arrow">
      </div>
      <img class="product-image" src=${item.src} alt=${item.alt}/>
      <div class="cart-dropdown-info-container">
          <h4>${item.productName}</h4>
          <p class="price">${item.price}</p>
      </div>
      <div class="cart-x">
          <div class="lines a"></div>
          <div class="lines b"></div>
      </div>
    `;
    cartDropdownList.append(newCartItem);
 }
}

// forEach has built in parameters (element, index, array etc...)
// productButtons.forEach((button, index) => {
//   button.onclick = (e) => {
//     // add to cart item counter with each click
//     cartItemTotal += 1;
//     cartCounter.textContent = cartItemTotal;
//     // console.log("You clicked button number " + index);
//   };
// });
// #endregion - cart counter
