import app from "./firebase-config.js";

import {
  getDatabase,
  ref,
  set,
  onValue,
} from "https://www.gstatic.com/firebasejs/9.19.1/firebase-database.js";

const myDatabase = getDatabase(app);
const dbRef = ref(myDatabase);
// const cartRef = ref(myDatabase);

// creating a function to add to database

const addToDatabase = (key, value) => {
  const customRef = ref(myDatabase, key);
  set(customRef, value);
};

// DATA SECTION
export const cheapPrice = () =>
  parseFloat(Math.random() * (5 - 1) + 1).toFixed(2);
const expPrice = () => parseFloat(Math.random() * (15 - 10) + 10).toFixed(2);

// const totalInventory = [
//   {
//     productName: "Tomatoes",
//     id: 0,
//     qty: 0,
//     src: "./organic-project/assets/product1.jpeg",
//     price: cheapPrice(),
//     type: "$",
//   },
//   {
//     productName: "Lime",
//     id: 1,
//     qty: 0,
//     src: "./organic-project/assets/product2.jpeg",
//     price: cheapPrice(),
//     type: "$",
//   },
//   {
//     productName: "Organic Eggplant",
//     id: 2,
//     qty: 0,
//     src: "./organic-project/assets/product3.jpeg",
//     price: expPrice(),
//     type: "$$",
//   },
//   {
//     productName: "Cucumber",
//     id: 3,
//     qty: 0,
//     src: "./organic-project/assets/product4.jpeg",
//     price: cheapPrice(),
//     type: "$",
//   },
//   {
//     productName: "Organic Peas",
//     id: 4,
//     qty: 0,
//     src: "./organic-project/assets/product5.jpeg",
//     price: expPrice(),
//     type: "$$",
//   },
//   {
//     productName: "Lettuce",
//     id: 5,
//     qty: 0,
//     src: "./organic-project/assets/product6.jpeg",
//     price: cheapPrice(),
//     type: "$",
//   },
//   {
//     productName: "Cabbage",
//     id: 6,
//     qty: 0,
//     src: "./organic-project/assets/product7.jpeg",
//     price: cheapPrice(),
//     type: "$",
//   },
//   {
//     productName: "Organic Lettuce",
//     id: 7,
//     qty: 0,
//     src: "./organic-project/assets/product8.jpeg",
//     price: expPrice(),
//     type: "$$",
//   },
// ];

const cart = ["cart is empty"];
// adding the inventory to database
// addToDatabase("inventory", totalInventory);

// adding cart to data
// addToDatabase("cart", cart);
// console.log(cart);

// Function to Display the items on the page

const displayItems = (stock) => {
  const productGallery = document.querySelector(".inventory");
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
                    <button tabindex="0" data-index="${item.id}">Add To Cart</button>
                  </div>
                </div>

    `;
    console.log(item);
    productGallery.appendChild(newListItem);
  });
};

// created a global variable inventory which will store the incoming product infomration from firebase
let inventory;
// Importing data from Firebase
onValue(dbRef, function (snapshot) {
  const ourData = snapshot.val();
  // storing the data in inventory variable
  inventory = ourData.inventory;

  // Inventory is basically the downloaded inventory data from firebase
  displayItems(inventory);
});
