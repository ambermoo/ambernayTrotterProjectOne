// Shoppping cart
// Define cart-related elements in the DOM
const cartContainer = document.querySelector(".cart");
const cartArea = document.querySelector(".cartItems");
const closeBtn = document.querySelector(".btn--close-cart");
const cartOpen = document.querySelector(".cart--icon");

// Define an array of items to be displayed in the store
const items_array = [
  {
    // Since ID is a unique value . It is being used to identify each element
    id: 1,
    count: 1,
    src: "./assets/product1.jpeg",
    price: "$35",
  },
  {
    id: 2,
    count: 1,
    src: "./assets/product2.jpeg",
    price: "$35",
  },
  {
    id: 3,
    count: 1,
    src: "./assets/product3.jpeg",
    price: "$35",
  },
  {
    id: 4,
    count: 1,
    src: "./assets/product4.jpeg",
    price: "$35",
  },
  {
    id: 5,
    count: 1,
    src: "./assets/product5.jpeg",
    price: "$35",
  },
  {
    id: 6,
    count: 1,
    src: "./assets/product6.jpeg",
    price: "$35",
  },
  {
    id: 7,
    count: 1,
    src: "./assets/product7.jpeg",
    price: "$35",
  },
  {
    id: 8,
    count: 1,
    src: "./assets/product8.jpeg",
    price: "$35",
  },
];

// Define an empty array to store items added to the cart
let cart = [];

// Define a function to add a product to the cart
const addToCart = function (product) {
  // Check if the product is already in the cart
  const existingProduct = cart.find((p) => p.id === product.id);
  if (existingProduct) {
    // If it is, increment its count
    existingProduct.count += 1;
  } else {
    // Otherwise, add it to the cart with a count of 1
    cart.push({ ...product, count: 1 });
  }
};
//  Define a function to render the cart items on the page
const renderCartItems = function () {
  const cartItems = cart
    .map(function (product) {
      return `
        <div class="cart--card">
          <div class="cart__image">
            <img src="${product.src}" alt="product image" />
          </div>
          <p>Qty: ${product.count}</p>
          <p>Price: ${product.price} </p>
        </div>
        `;
    })
    .join("");

  // Clear the previous cart items and replace them with the new ones
  cartArea.innerHTML = "";
  cartArea.insertAdjacentHTML("beforeend", cartItems);
};

// Add a click event listener to each "Add to Cart" link
const addToCartLinks = document.querySelectorAll(".cart--button a");

addToCartLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    // Get the index of the clicked product from the data attribute on the link
    const productIndex = link.getAttribute("data-product-index");
    // Get the product object from the items array using its index
    const product = items_array[productIndex];
    // Add the product to the cart and render the updated cart items
    addToCart(product);
    renderCartItems();
  });
});
// Add a click event listener to the cart icon to open the cart
cartOpen.addEventListener("click", () => {
  cartContainer.classList.remove("hidden");
});

// Add a click event listener to the close button to close the cart
closeBtn.addEventListener("click", () => {
  cartContainer.classList.add("hidden");
});
