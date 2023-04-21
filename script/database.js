import app from "./firebase-config.js";

import {
  getDatabase,
  ref,
  set,
  onValue,
  get,
  push,
  update,
  remove
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

// adding the inventory to database
// addToDatabase("inventory", totalInventory);

// adding cart to data
// addToDatabase("cart", cart);

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

const emptyCartMessage = document.querySelector('.empty-cart-message');

productGallery.addEventListener("click", function (e) {
  // get parent list item from child button
  
  if (e.target.tagName === "BUTTON") {
    const chosenProductIndex = e.target.attributes.dataindex.value;
    const selectedProductRef = ref(myDatabase, `/inventory/${chosenProductIndex}`); 
    
    get(selectedProductRef)
      .then((snapshot) => {
        const productData = snapshot.val();
        productData.qty = 1;
        push(cartRef, productData);
      });
  }
});

onValue(cartRef, function (snapshot) {
  const cartData = snapshot.val();
  
  updateCart(cartData);
});

const updateCart = (cartData) => {
 
  const cartDropdownList = document.querySelector('.cart-dropdown ul');

  cartDropdownList.innerHTML = "";
  for (let key in cartData){
    console.log(cartData[key].id);
  }
  
  // removes empty cart message when cart exists and contains items
  if (cartData && Object.keys(cartData).length > 0) {
    emptyCartMessage.classList.add('make-invisible');
  }
  // adds empty cart message back when when cart is empty
  else{
    emptyCartMessage.classList.remove('make-invisible');
  }

  let listItemIndex = 0;
  // for cart totals
  const qtyArray = [];
  const costArray = [];

  for (let key in cartData) {
    const newCartItem = document.createElement('li');

    newCartItem.classList.add('full-cart');
    const item = cartData[key];
    
    const uniqueId = Object.keys(cartData)[listItemIndex];
    listItemIndex += 1;

    newCartItem.innerHTML = `
      <div class="arrows" id=${uniqueId}>
          <image class="arrows up" src="./organic-project/assets/icons/chevron-up-outline.svg" alt="up arrow"></image>
          <p>${item.qty}</p>
          <img class="arrows down" src="./organic-project/assets/icons/chevron-down-outline.svg" alt="down arrow">
      </div>
      <img class="product-image" src=${item.src} alt=${item.alt}/>
      <div class="cart-dropdown-info-container">
          <h4>${item.productName}</h4>
          <p class="price"><span>$</span>${item.price}</p>
      </div>
      <div id=${uniqueId} class="cart-x">
          <div class="lines a"></div>
          <div class="lines b"></div>
      </div>
    `;
    cartDropdownList.append(newCartItem);

    // for cart totals
    const quantities = cartData[key].qty;
    const prices = parseFloat((cartData[key].price));
    // push to local arrays
    qtyArray.push(quantities);
    costArray.push(prices);
    
 }
  cartTotals(qtyArray, costArray);
}

const cartTotals = (qtyArray, costArray) => {
  const cartCounter = document.querySelector(".item-num > p");
  const totalCost = document.querySelector(".total-cost > p");
  const subtotal = document.querySelector('.subtotal').lastElementChild;

  if (qtyArray.length > 0){
    const cartItemTotal = qtyArray.reduce((total, num) => { return total + num });
    const cartCostTotal = costArray.reduce((total, num) => { return total + num });
    cartCounter.textContent = cartItemTotal;
 
    totalCost.textContent = "$" + (cartCostTotal).toFixed(2);
    subtotal.textContent = "$" + (cartCostTotal).toFixed(2);
  }
}

/* #region - cart arrows */

const cartArrows = (clickedElement) => {
  const qtyToChangeId = clickedElement.parentElement.id;
  const qtyToChangeRef = ref(myDatabase, `/cart/${qtyToChangeId}`);

  get(qtyToChangeRef)
    .then((snapshot) => {
      const cartItemData = snapshot.val();
      const itemBasePrice = parseFloat(cartItemData.base);

      if (clickedElement.classList[1] === 'up') {
        const changeQty = {
          qty: cartItemData.qty += 1,
          // take base price from and multiply it by quantity
          price: (itemBasePrice * cartItemData.qty).toFixed(2)
        }
        
        update(qtyToChangeRef, changeQty);
      }
      else if (clickedElement.classList[1] === 'down') {
        console.log(itemBasePrice)
        const changeQty = {
          qty: cartItemData.qty -= 1,
          // take base price from and multiply it by quantity
          price: (itemBasePrice * cartItemData.qty).toFixed(2)
        }
        update(qtyToChangeRef, changeQty);
      }
    });
}
/* #endregion - cart arrows */

/* #region - cart item removal */
const cartDropdownList = document.querySelector('.cart-dropdown-list');

const removeCartItem = (clickedElement) => {
    // gets parent div IF child is clicked
    clickedElement = clickedElement.closest('.cart-x');
    const nodeToDelete = ref(myDatabase, `/cart/${clickedElement.id}`);

    remove(nodeToDelete);
  // }
}
const manageCartButtons = (e) => {
  let clickedElement = e.target;
  // if X button or child of X button is clicked
  if (clickedElement.className === 'cart-x' || clickedElement.parentElement.className === 'cart-x') {
    // function to remove item
    removeCartItem(clickedElement);
  }
  // gets first className of arrow element
  else if (clickedElement.classList[0] === 'arrows') {
    // function to change item quantity
    cartArrows(clickedElement);
  }

}
cartDropdownList.addEventListener("click", manageCartButtons);

/* #endregion - cart item removal */

