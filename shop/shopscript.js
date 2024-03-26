"use strict";
let shop = document.getElementById("shop");
const categoryButtons = document.querySelectorAll(".category-btn");
const btnEl = document.querySelector(".search-btn");
const inputEl = document.querySelector(".form-control");

// get products
const shopItemsData = fetch("./products.json")
  .then((response) => response.json())
  .then((data) => {
    console.log(data);

    // Display Products
    function displayProducts(products) {
      shop.innerHTML = products
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

    // get Random products
    function randomProducts(displayRandomProducts) {
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

    // Filter by category
    categoryButtons.forEach((button) => {
      button.addEventListener("click", (e) => {
        const category = e.target.dataset.id;
        console.log(category);
        const productCategory = data.filter(function (products) {
          if (products.category === category) {
            return products;
          }
        });
        console.log(productCategory);
        displayProducts(productCategory);
      });
    });

    // Search by name
    btnEl.addEventListener("click", function (e) {
      let searchValue = inputEl.value;

      if (searchValue !== "") {
        let searchCategory = data.filter(function (data) {
          if (data.type.includes(searchValue)) {
            return data;
          } else if (data.name.includes(searchValue)) {
            return data;
          }
        });
        if (searchCategory) {
          displayProducts(searchCategory);
        }
        console.log(searchCategory);
      }
    });
  })
  .catch((error) => console.error("Error loading JSON file", error));
