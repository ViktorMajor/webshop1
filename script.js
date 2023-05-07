document.addEventListener('DOMContentLoaded', function () {
  const menuToggle = document.getElementById('menu-toggle');
  const sideMenu = document.createElement('div');
  sideMenu.classList.add('side-menu');

  // Hozzáadja a menüpontokat a sideMenu-hez
  sideMenu.innerHTML += '<h2>Menü</h2>'
  const menuItems = document.querySelectorAll('h2');
  menuItems.forEach((item) => {
    const menuItem = document.createElement('div');
    menuItem.innerHTML = item.innerHTML;
    sideMenu.appendChild(menuItem);
  });
  sideMenu.innerHTML += '<button>Egyéni tervezés elkezdése</button>'

  document.body.appendChild(sideMenu);

  menuToggle.addEventListener('click', function () {
    if (!cartContainer.classList.contains('active')) {
      sideMenu.classList.toggle('active');
    }
  });

  const cartToggle = document.getElementById('cart-toggle');
  const cartContainer = document.createElement('div');
  cartContainer.classList.add('cart-container');

  // Ide jöhetnek a kosár tartalmával kapcsolatos kódok
  cartContainer.innerHTML = '<h2>Kosár tartalma</h2>';

  document.body.appendChild(cartContainer);

  cartToggle.addEventListener('click', function () {
    if (!sideMenu.classList.contains('active')) {
      cartContainer.classList.toggle('active');
    }
  });
});

document.addEventListener("DOMContentLoaded", function() {
  const productContainers = document.querySelectorAll(".product-container");

  productContainers.forEach((productContainer) => {
    const products = productContainer.querySelectorAll(".img-container");

    productContainer.addEventListener("scroll", function() {
      const containerRect = productContainer.getBoundingClientRect();

      products.forEach((product) => {
        const productRect = product.getBoundingClientRect();

        // ellenőrizze, hogy az elem vízszintesen középen van-e a termék konténeren belül
        const isCentered = productRect.left >= containerRect.left &&
          productRect.right <= containerRect.right;

        if (isCentered) {
          product.classList.add("zoomed");
        } else {
          product.classList.remove("zoomed");
        }
      });
    });
  });
});







/*
 sideMenu.innerHTML += '<a><h2>Egyéni tervezés elkezdése</h2></a>'
const addToCartButtons = document.querySelectorAll('button');

addToCartButtons.forEach(button => {
  button.addEventListener('click', addToCart);
});

function addToCart(event) {
  const product = event.target.parentElement;
  const id = product.getAttribute('data-id');
  const name = product.querySelector('p').textContent;
  const price = parseFloat(product.querySelector('p:nth-child(3)').textContent.split(' ')[1]);

  const cartItem = {
    id,
    name,
    price
  };

  addCartItemToStorage(cartItem);
}

function addCartItemToStorage(cartItem) {
  let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

  const itemExists = cartItems.find(item => item.id === cartItem.id);

  if (itemExists) {
    itemExists.quantity++;
  } else {
    cartItem.quantity = 1;
    cartItems.push(cartItem);
  }

  localStorage.setItem('cartItems', JSON.stringify(cartItems));
}

function displayCartItems() {
  const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
  const cartItemsContainer = document.querySelector('#cart-items-container');
  const totalPriceElement = document.querySelector('#total-price');
  let totalPrice = 0;

  cartItems.forEach(item => {
    const cartItem = document.createElement('div');
    cartItem.innerHTML = `
      <h2>${item.name}</h2>
      <p>Ár: ${item.price} Ft</p>
      <p>Mennyiség: ${item.quantity} db</p>
    `;

    cartItemsContainer.appendChild(cartItem);

    totalPrice += item.price * item.quantity;
  });

  totalPriceElement.innerHTML = `
  <h2>Összesen:</h2>
  <p>Teljes összeg: ${totalPrice} Ft</p>`;
}

displayCartItems();

function deleteCartItems() {
  localStorage.removeItem('cartItems');
  const cartItemsContainer = document.querySelector('#cart-items-container');
  cartItemsContainer.innerHTML = '';
  const totalPriceElement = document.querySelector('#total-price');
  totalPriceElement.textContent = 'Teljes összeg: 0 Ft';
}
*/
