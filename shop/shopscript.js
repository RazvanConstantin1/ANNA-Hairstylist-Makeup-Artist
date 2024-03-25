"use strict";
let shop = document.getElementById("shop");

const shopItemsData = fetch("./products.json")
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    return (shop.innerHTML = data
      .map((x) => {
        let { id, name, price, description, image } = x;
        return `
      <div id = product-id-${id} class="item-box">
      <img class="item-img" src="${image}" alt="product image" />
      <h3 class="item-name">${name}</h3>
      <p class="item-description">
        ${description}
      </p>
      <h3 class="item-price"><span>${price} </span> RON</h3>
    
      <a class="add-to-cart">Adauga in cos</a>
    </div>`;
      })
      .join(""));
  })
  .catch((error) => console.error("Error loading JSON file", error));
