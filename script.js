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

  totalPriceElement.textContent = `Teljes összeg: ${totalPrice} Ft`;
}

displayCartItems();

function deleteCartItems() {
  localStorage.removeItem('cartItems');
  const cartItemsContainer = document.querySelector('#cart-items-container');
  cartItemsContainer.innerHTML = '';
  const totalPriceElement = document.querySelector('#total-price');
  totalPriceElement.textContent = 'Teljes összeg: 0 Ft';
}

