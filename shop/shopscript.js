"use strict";
let products = [];
let cart = [];

// ! Selectors
const selectors = {
  products: document.querySelector(".shop"),
  cartBtn: document.querySelector(".cart-icon"),
  cartQty: document.querySelector(".cart-amount"),
  cartClose: document.querySelector("#close-cart"),
  cart: document.querySelector(".cart"),
  cartOverlay: document.querySelector(".cart-overlay"),
  cartBody: document.querySelector(".cart-content"),
  cartItem: document.querySelector(".cart-box"),
  cartTotal: document.querySelector(".total-price"),
  cartRemoveBtn: document.querySelector(".cart-remove"),
  displayCatEl: document.querySelector(".display-cat"),
  categoryButtons: document.querySelectorAll(".category-btn"),
  inputEl: document.querySelector(".form-control"),
  searchBtnEl: document.querySelector(".search-btn"),
  inputEl: document.querySelector(".form-control"),
};

// ! Event Listeners

const setupListeners = () => {
  document.addEventListener("DOMContentLoaded", initStore);

  // Product event
  selectors.products.addEventListener("click", addToCart);

  // Cart Events
  selectors.cartBtn.addEventListener("click", showCart);
  selectors.cartOverlay.addEventListener("click", hideCart);
  selectors.cartClose.addEventListener("click", hideCart);
  selectors.cartBody.addEventListener("click", updateCart);
  selectors.searchBtnEl.addEventListener("click", searchInput);
};

// ! Event Handlers

const initStore = () => {
  loadProducts("./products.json").then(renderProducts);
};

const showCart = () => {
  selectors.cart.classList.add("active");
  selectors.cartOverlay.classList.add("show");
};
const hideCart = () => {
  selectors.cart.classList.remove("active");
  selectors.cartOverlay.classList.remove("show");
};

const addToCart = (e) => {
  if (e.target.hasAttribute("data-id")) {
    const id = parseInt(e.target.dataset.id);

    const inCart = cart.find((x) => x.id === id);

    if (inCart) {
      alert("Item is already in cart");
      return;
    }

    cart.push({ id, qty: 1 });
    // renderProducts();
    renderCart();
    showCart();
  }
};

const removeFromCart = (id) => {
  cart = cart.filter((x) => x.id !== id);

  renderProducts();
};

const increaseQty = (id) => {
  const item = cart.find((x) => x.id === id);
  if (!item) return;

  item.qty++;
};

const decreaseQty = (id) => {
  const item = cart.find((x) => x.id === id);
  if (!item) return;

  item.qty--;

  if (item.qty === 0) removeFromCart(id);
};

const deleteFromCartBtn = (id) => {
  const item = cart.find((x) => x.id === id);
  if (!item) return;

  if (item) removeFromCart(id);
};

const updateCart = (e) => {
  if (e.target.hasAttribute("data-btn")) {
    console.log(e.target);
    const cartItem = e.target.closest(".cart-box");
    const id = parseInt(cartItem.dataset.id);
    console.log(cartItem);
    const btn = e.target.dataset.btn;

    btn === "incr" && increaseQty(id);
    btn === "decr" && decreaseQty(id);
    btn === "delete" && deleteFromCartBtn(id);

    renderCart();
  }
};

// ! Render Functions

const renderCart = () => {
  // show cart total
  selectors.cartTotal.textContent = calculateTotal() + " RON";

  // show cart items
  selectors.cartBody.innerHTML = cart
    .map(({ id, qty }) => {
      // get product info for each of cart item
      const product = products.find((x) => x.id === id);

      const { name, image, price } = product;

      const amount = price * qty;

      return `
      <div class="cart-box" data-id="${id}">
          <img src="${image}" alt="Product photo" class="cart-img">
          <div class="detail-box">
            <div class="cart-product-title">${name}</div>
            <div class="cart-price">${amount} RON</div>
            <div class="cart-item-amount">
                  <i class="bi bi-dash-lg" data-btn="decr"></i>
                  <span class="qty">${qty}</span>
                  <i class="bi bi-plus-lg" data-btn="incr"></i>
                </div>
          </div>
          <!-- Remove cart -->
          <i class="bi bi-trash3 cart-remove" data-btn="delete"></i>
        </div>
       
    `;
    })
    .join("");
};

const renderProducts = () => {
  selectors.products.innerHTML = products
    .map((product) => {
      const { id, name, price, description, image } = product;

      // Check if the products is already in cart
      const inCart = cart.find((x) => x.id === id);

      // Make the add to cart button disabled if already in cart

      const disabled = inCart ? "disabled" : "";

      // Change the text if already in cart
      const text = inCart ? "Adaugat in Cos" : "Adauga in Cos";

      return `
        <div  class="item-box" ">
          <img class="item-img" src="${image}" alt="product image" />
          <h3 class="item-name">${name}</h3>
          <p class="item-description">${description}</p>
          <h3 class="item-price"><span>${price} </span> RON</h3>
          <a data-id="${id}" class="add-to-cart ${disabled}">${text}</a>
        </div>
      `;
    })
    .join("");
};

// Render Filtered Products
const filteredProducts = (filteredProducts) => {
  selectors.products.innerHTML = filteredProducts
    .map((product) => {
      const { id, name, price, description, image } = product;

      // Check if the products is already in cart
      const inCart = cart.find((x) => x.id === id);

      // Make the add to cart button disabled if already in cart

      const disabled = inCart ? "disabled" : "";

      // Change the text if already in cart
      const text = inCart ? "Adaugat in Cos" : "Adauga in Cos";

      return `
        <div  class="item-box" ">
          <img class="item-img" src="${image}" alt="product image" />
          <h3 class="item-name">${name}</h3>
          <p class="item-description">${description}</p>
          <h3 class="item-price"><span>${price} </span> RON</h3>
          <a data-id="${id}" class="add-to-cart ${disabled}">${text}</a>
        </div>
      `;
    })
    .join("");
};

// Filter by category
selectors.categoryButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    const category = e.target.dataset.id;
    console.log(category);
    const productCategory = products.filter(function (products) {
      if (products.category === category) {
        return products;
      }
    });

    // Display category name on click
    selectors.displayCatEl.textContent = `${category}`;

    console.log(productCategory);
    filteredProducts(productCategory);
  });
});

// Search input
const searchInput = () => {
  let searchValue = selectors.inputEl.value;

  if (searchValue !== "") {
    let searchCategory = products.filter(function (products) {
      if (products.type.includes(searchValue)) {
        return products;
      } else if (products.name.includes(searchValue)) {
        return products;
      }
    });
    if (searchCategory) {
      filteredProducts(searchCategory);
    }
    console.log(searchCategory);
  }
};

// ! Api Functions

const loadProducts = async (apiURL) => {
  try {
    const response = await fetch(apiURL);
    if (!response.ok) {
      throw new Error(`https error! status= ${response.status}`);
    }
    products = await response.json();
    console.log(products);
  } catch (error) {
    console.error("fetch error:", error);
  }
};

// ! Helper Functions

const calculateTotal = () => {
  return cart
    .map(({ id, qty }) => {
      const { price } = products.find((x) => x.id === id);

      return qty * price;
    })
    .reduce((sum, number) => {
      return sum + number;
    }, 0);
};

// ! INITIALIZE

setupListeners();
