"use strict";
let shop = document.getElementById("shop");
let cartActive = document.getElementById("cart-active");
const categoryButtons = document.querySelectorAll(".category-btn");
const btnEl = document.querySelector(".search-btn");
const inputEl = document.querySelector(".form-control");
const displayCatEl = document.querySelector(".display-cat");
const itemBox = document.querySelector(".item-box");

let listOfProducts = [];
console.log(listOfProducts);

let basket = [];
// ! Fetching section + filter by category + search by name or type
// get products
const shopItemsData = fetch("./products.json")
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    listOfProducts.push(...data);
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
      displayProducts(randomProducts);
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

        // Display category name on click
        displayCatEl.textContent = `${category}`;

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

    // ! Cart Section

    // add to cart
    const addToCartBtn = document.querySelectorAll(".add-to-cart");
  })
  .catch((error) => console.error("Error loading JSON file", error));

// ! SideBar Cart Section
const cartEl = document.querySelector(".cart");
const cartIconEl = document.querySelector(".cart-icon");
const closeCartEl = document.querySelector("#close-cart");
const cartBoxEl = document.querySelector(".cart-box");

// Closing cart on reload
if (cartEl.classList.contains("active")) cartEl.classList.toggle("active");

// Open Cart
cartIconEl.addEventListener("click", function () {
  cartEl.classList.toggle("active");
});
// Close Cart
closeCartEl.addEventListener("click", function () {
  cartEl.classList.toggle("active");
});

// Cart Working
if (document.readyState == "loading") {
  document.addEventListener("DOMContentLoaded", ready);
} else {
  ready();
}

function ready() {
  // Remove items from cart
  const removeCartButtons = document.querySelectorAll(".cart-remove");
  console.log(removeCartButtons);

  for (let i = 0; i < removeCartButtons.length; i++) {
    let button = removeCartButtons[i];
    button.addEventListener("click", removeCartItem);
  }
}
function removeCartItem() {
  cartBoxEl.remove();
}
