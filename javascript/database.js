const cheapPrice = () => parseFloat(Math.random() * (5 - 1) + 1).toFixed(2);
const expPrice = () => parseFloat(Math.random() * (15 - 10) + 10).toFixed(2);

export const totalInventory = [
  {
    productName: "Tomatoes",
    id: 1,
    qty: 1,
    src: "./organic-project/assets/product1.jpeg",
    price: cheapPrice(),
    type: "$",
  },
  {
    productName: "Lime",
    id: 2,
    qty: 1,
    src: "./organic-project/assets/product2.jpeg",
    price: cheapPrice(),
    type: "$",
  },
  {
    productName: "Organic Eggplant",
    id: 3,
    qty: 1,
    src: "./organic-project/assets/product3.jpeg",
    price: expPrice(),
    type: "$$",
  },
  {
    productName: "Cucumber",
    id: 4,
    qty: 1,
    src: "./organic-project/assets/product4.jpeg",
    price: cheapPrice(),
    type: "$",
  },
  {
    productName: "Organic Peas",
    id: 5,
    qty: 1,
    src: "./organic-project/assets/product5.jpeg",
    price: expPrice(),
    type: "$$",
  },
  {
    productName: "Lettuce",
    id: 6,
    qty: 1,
    src: "./organic-project/assets/product6.jpeg",
    price: cheapPrice(),
    type: "$",
  },
  {
    productName: "Cabbage",
    id: 7,
    qty: 1,
    src: "./organic-project/assets/product7.jpeg",
    price: cheapPrice(),
    type: "$",
  },
  {
    productName: "Organic Lettuce",
    id: 8,
    qty: 1,
    src: "./organic-project/assets/product8.jpeg",
    price: expPrice(),
    type: "$$",
  },
];

// console.log(cheapPrice());
// console.log(expPrice());
// console.log(cheapPrice());
