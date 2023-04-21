import app from './firebase-config.js';

import {
  getDatabase,
  ref,
  set,
  onValue,
  get,
  push,
  remove,
} from 'https://www.gstatic.com/firebasejs/9.19.1/firebase-database.js';

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
    productName: 'Tomatoes',
    id: 0,
    qty: 0,
    src: './organic-project/assets/product1.jpeg',
    price: cheapPrice(),
    type: '$',
  },
  {
    productName: 'Lime',
    id: 1,
    qty: 0,
    src: './organic-project/assets/product2.jpeg',
    price: cheapPrice(),
    type: '$',
  },
  {
    productName: 'Organic Eggplant',
    id: 2,
    qty: 0,
    src: './organic-project/assets/product3.jpeg',
    price: expPrice(),
    type: '$$',
  },
  {
    productName: 'Cucumber',
    id: 3,
    qty: 0,
    src: './organic-project/assets/product4.jpeg',
    price: cheapPrice(),
    type: '$',
  },
  {
    productName: 'Organic Peas',
    id: 4,
    qty: 0,
    src: './organic-project/assets/product5.jpeg',
    price: expPrice(),
    type: '$$',
  },
  {
    productName: 'Lettuce',
    id: 5,
    qty: 0,
    src: './organic-project/assets/product6.jpeg',
    price: cheapPrice(),
    type: '$',
  },
  {
    productName: 'Cabbage',
    id: 6,
    qty: 0,
    src: './organic-project/assets/product7.jpeg',
    price: cheapPrice(),
    type: '$',
  },
  {
    productName: 'Organic Lettuce',
    id: 7,
    qty: 0,
    src: './organic-project/assets/product8.jpeg',
    price: expPrice(),
    type: '$$',
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

onValue(dbRef, function (snapshot) {
  const ourData = snapshot.val();
  // storing the data in inventory variable
  const inventory = ourData.inventory;
  displayItems(inventory);
});

// Function to Display the items on the page
const productGallery = document.querySelector('.inventory');

const displayItems = (stock) => {
  productGallery.innerHTML = '';

  stock.forEach((item) => {
    const newListItem = document.createElement('li');
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
// #region - cart counter
const cartCounter = document.querySelector('.item-num > p');
// get product buttons
const productButtons = document.querySelectorAll('.product-link > button');
let cartItemTotal = parseInt(cartCounter.textContent);

productGallery.addEventListener('click', function (e) {
  // get parent list item from child button
  const chosenProduct = e.target.closest('li');
  const chosenProductIndex = e.target.attributes.dataindex.value;

  const selectedProductRef = ref(
    myDatabase,
    `/inventory/${chosenProductIndex}`
  );

  get(selectedProductRef).then((snapshot) => {
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
  cartDropdownList.innerHTML = '';
  // console.log(cartData);

  // removes empty cart message when cart contains items
  if (Object.keys(cartData).length > 0) {
    emptyCartMessage.classList.add('make-invisible');
  }

  for (let key in cartData) {
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
      <div id=${uniqueId} class="cart-x">
          <div class="lines a"></div>
          <div class="lines b"></div>
      </div>
    `;
      cartDropdownList.append(newCartItem);
    }
  }
};

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

// Search bar implementation

const btnSearch = document.querySelector('.product__search');
const searchInput = document.querySelector('[data-search]');
const resetInput = document.querySelector('.product__reset');

// search function
const searchFunction = (stock, value) => {
  console.log(stock);
  // console.log(value);
  let counter = 0;
  productGallery.innerHTML = '';
  stock.forEach((item, i) => {
    if (item.productName.toLowerCase().includes(value.trim().toLowerCase())) {
      console.log('true', stock[i]);

      const newListItem = document.createElement('li');
      newListItem.innerHTML = `
      <div class="product__box"> 
      <img 
          src= ${stock[i].src}
          alt="Image of ${stock[i].productName}"
        />
        <div class="text-container">
          <div class="info-container">
            <h4>${stock[i].productName}</h4>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </p>
            <p class="price">$${stock[i].price}</p>

          </div>

          <!-- Cart Button -->
          <div class="link-container product-link">
            <button tabindex="0" dataindex="${stock[i].id}">Add To Cart</button>
          </div>
        </div>
        </div>
      `;
      productGallery.appendChild(newListItem);
      counter++;
    }
  });
  if (counter === 0) {
    const newListItem = document.createElement('li');
    newListItem.innerHTML = `<h2>Sorry Product not found. Try again ! </h2>`;
    productGallery.appendChild(newListItem);
  }
};

// intitiates the event by getting the snapshot from firebase
btnSearch.addEventListener('click', function (e) {
  e.preventDefault();
  // extracting search input value
  const value = searchInput.value;

  get(inventoryRef).then((snapshot) => {
    const stock = snapshot.val();
    // sending the stock and search value to the search function
    searchFunction(stock, value);
  });
  // clearing the input field
  searchInput.value = '';
});

resetInput.addEventListener('click', function (e) {
  e.preventDefault();

  get(inventoryRef).then((snapshot) => {
    const stock = snapshot.val();
    // using displayItems function to reset
    displayItems(stock);
  });
  // clearing the input field
  searchInput.value = '';
  btnFilter.value = 'default';
});

// filter the
const btnFilter = document.querySelector('#filter');
// resetting the filter at every refresh
btnFilter.value = 'default';

// price up function
const priceUp = (stock) => {
  console.log(stock);
  stock.sort(function (a, b) {
    return b.price - a.price;
  });
  console.log(stock);
  displayItems(stock);
};

// price up function
const priceDown = (stock) => {
  console.log(stock);
  stock.sort(function (a, b) {
    return a.price - b.price;
  });
  console.log(stock);
  displayItems(stock);
};

// bestselling function
const bestSelling = (stock) => {
  console.log(stock);
  stock.sort(function (a, b) {
    return Math.random() - 0.5;
  });
  console.log(stock);
  displayItems(stock);
};

btnFilter.addEventListener('change', function () {
  const value = this.value;
  console.log(value);
  get(inventoryRef).then((snapshot) => {
    const stock = snapshot.val();
    // sending the stock and search value to the search function
    if (value === 'price-up') {
      priceUp(stock);
    } else if (value === 'price-down') {
      priceDown(stock);
    } else if (value === 'bestselling') {
      bestSelling(stock);
    } else {
      displayItems(stock);
    }
  });
});
