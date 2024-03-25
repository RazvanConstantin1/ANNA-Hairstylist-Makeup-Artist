"use strict";
let shop = document.getElementById("shop");

// get products
const shopItemsData = fetch("./products.json")
  .then((response) => response.json())
  .then((data) => {
    console.log(data);

    // get Random products
    function randomProducts() {
      const randomProducts = [];
      while (randomProducts.length < 4) {
        const randomIndex = Math.floor(Math.random() * data.length);
        if (!randomProducts.includes(data[randomIndex])) {
          randomProducts.push(data[randomIndex]);
        }
      }
      console.log(randomProducts);

      // display Random products
      function displayRandomProducts(randomProducts) {
        shop.innerHTML = randomProducts
          .map((product) => {
            let { id, name, price, description, image } = product;
            return ` 
        <div id="product-id-${id}" class="item-box">
        <img class="item-img" src="${image}" alt="product image" />
        <h3 class="item-name">${name}</h3>
        <p class="item-description">${description}</p>
        <h3 class="item-price"><span>${price} </span> RON</h3>
        <a class="add-to-cart">Adauga in cos</a>
      </div>
        `;
          })
          .join("");
      }
      displayRandomProducts(randomProducts);
    }
    randomProducts();
  })
  .catch((error) => console.error("Error loading JSON file", error));
