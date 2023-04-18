import firebaseInfo from './firebaseConfig.js';
import { getDatabase, ref, set, onValue } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-database.js";

const database = getDatabase(firebaseInfo);
const dbRef = ref(database);

// We've written some code you'll need for this app. Read through to understand what you're starting with, then work through the commented steps!

// This is the store's inventory data. It's great that it's sitting here, but I'd like to take advantage of FireBase and store our inventory in there. That means we're going to need to set up a new database, import some modules, etc. Let's go ahead and create a firebase.js file, get all our db configuration info pasted in there, and import it in here.

// Step 1: Set up our FIREBASE database. This includes initializing our database and our dbRef.

// ALSO don't forget, we're using modules, which means we'll need to turn on our Live Server!

// Errors we encountered and then vanquished
// Error #1 - missing type="module" in our html 
// Uncaught SyntaxError: import declarations may only appear at top level of a module

// Error #2 - our firebase-database and firebase-app versions didn't match 
// Uncaught Error: Service database is not available

// Error #3 - we tried to link to firebase.js without the js
// Loading module from "http://127.0.0.1:5500/firebase" was blocked because of a disallowed MIME type ("text/html").


// Step 2: Next, let's declare a function that will add our data, both the inventory and the currencies, to our database. We'll want to set up specific key names to go with our data as well.

// create a function that we pass the info we want to store and the property name under which to store it
const addToDatabase = (key, value) => {
  // create a ref where we want our info to live
  const customRef = ref(database, key);
  // set our info as the value of our ref
  set(customRef, value);
}

// const totalInventory = [
//   {
//     title: 'Bowie Tee',
//     url: 'images/bowie.jpg',
//     price: 19.99,
//     stock: 4,
//   },
//   {
//     title: 'Don\'t Know Tee',
//     url: 'images/dontevenknow.jpg',
//     price: 22.50,
//     stock: 8,
//   },
//   {
//     title: 'Doughnut Jean Jacket',
//     url: 'images/doughnut.jpg',
//     price: 59.00,
//     stock: 5,
//   },
//   {
//     title: 'Journey Tee',
//     url: 'images/journey.jpg',
//     price: 22.99,
//     stock: 6,
//   },
//   {
//     title: 'Skeleton Jean Jacket',
//     url: 'images/someurl.jpg',
//     price: 30.00,
//     stock: 0,
//   },
//   {
//     title: 'Skeleton Hand Tee',
//     url: 'images/skeleton.jpg',
//     price: 30.00,
//     stock: 10,
//   },
//   {
//     title: 'Juno Hoodie',
//     price: 50.00,
//     stock: 4,
//   }
// ]

// An object that allows us to organize information that will be displayed conditionally depending on what currency the user selects:
// const currencies = {
//   usd: {
//     exchange: 1,
//     symbol: `$`,
//     displayName: `USD`,
//     altText: `the US flag`,
//     flag: `images/USD-flag.png`
//   },
//   cad: {
//     exchange: 1.28,
//     symbol: `$`,
//     displayName: `CAD`,
//     altText: `the Canadian flag`,
//     flag: `images/CAD-flag.png`
//   },
//   gbp: {
//     exchange: 0.76,
//     symbol: `£`,
//     displayName: `GBP`,
//     altText: `the UK flag`,
//     flag: `images/GBP-flag.png`
//   }
// }

// Step 3: Now let's call our function twice, once to add our inventory data, and another time to add our currencies!

// addToDatabase("inventory", totalInventory);
// addToDatabase("currencies", currencies);

// Now our data lives in our database. Let's comment the local data out just to make sure we aren't accidentally pulling from there. Then we can go ahead and start pulling it from our Database!

// Step 4: Let's use the OnValue method to pull in our data from firebase - Don't forget to import it at the top of the page!


// set up an onValue listener so that when our data changes (and on initial load) we get our data from firebase
onValue(dbRef, function(data) {
  // store our currencies and inventory data in variables
  const ourData = data.val(); 
  const currencies = ourData.currencies;
  const inventory = ourData.inventory;
  // Step 5: Write a function that will filter the inventory, so that we will display only items which are both in stock and have images.
  // filter our inventory data to remove items that are out of stock or have no images
    //filter will return a new array that only includes items that meet our specifications
  const currentStock = inventory.filter((item) => {
    // filter runs a callback function on each item in the array, and will return the item if our condition is true
    return item.stock > 0 && item.url !== undefined;
    // all the returned items will populate the new array that our filter method created and we have stored in our currentStock variable
  });
  // put the filtered inventory on the page
  // use a chosenCurrency param to allow it to display in different currencies
  const displayItems = (chosenCurrency) => {
    // Find the existing .inventory UL from our index.html file and empty it of any contents
    const inventoryElement = document.querySelector('.inventory');
    inventoryElement.innerHTML = '';
    // Loop through our currentStock, and create an LI for each item
    currentStock.forEach( (item) => {
      // use createElement to make the LI
      const newListItem = document.createElement('li');
      // alter its innerHTML to have...
      // an H2 with the title
      // an image using the url
      // a paragraph with the price * the exchange rate
      newListItem.innerHTML = `
        <h2>${item.title}</h2>
        <img src=${item.url} alt="a model wearing the ${item.title}" />
        <p>${chosenCurrency.symbol}${(item.price * chosenCurrency.exchange).toFixed(2)}</p>
      `
      // Append the LI to the UL
      inventoryElement.appendChild(newListItem);
    });
  }
  // create a function that will add an event listener to our currency buttons
  const currencyChanger = () => {
    // go get our button elements
    const buttons = document.querySelectorAll('button');
    // go get the flag image and currency code
    const flagImage = document.querySelector('#flag');
    const nameOfCurrency = document.querySelector('#currency');
    // querySelectorAll returns a NodeList, which is an array-like object, which means we can use forEach to attach an event listener for each button
    buttons.forEach( (individualButton) => {
      // on click...
      individualButton.addEventListener('click', function() {
        // get that currency name
        const selectedCurrency = this.id;
        // call the display items function with that currency
        displayItems(currencies[selectedCurrency]);
        // ALSO change the flag icon at top, we can do this by changing the src and alt of the <IMG> (don't forget alt text)
        flagImage.src = currencies[selectedCurrency].flag;
        flagImage.alt = currencies[selectedCurrency].altText;
        // AND change currency code at top
        nameOfCurrency.textContent = currencies[selectedCurrency].displayName;
      });
    });
  }
  currencyChanger();
  displayItems(currencies.usd);
});

// Step 6: Write a function that displays the available inventory on the page, in the correct currency. -> Since we've filtered already, we can use the "currentStock" ARRAY that was created as a result of the filter.
    // Hint: Consider what kind of information this function needs (ie. which parameters it should take) to properly display all of our information.
    // For now, display items on the page by passing in USD as the default currency.



// Step 7: Attach an event listener that will notice when a user clicks on a currency button, finds out which currency they have selected, and calls our display items method again. Don't forget to update the flag at the top right, too!


// Step 8: Well, we've declared two functions: one to display our items, another to handle and currency changes. Let's call them both here!