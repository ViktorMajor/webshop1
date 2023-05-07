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
  cartContainer.classList.add('cart-side');


  cartContainer.innerHTML = `
  <h2>Kosár tartalma</h2>
  <p id="total-price">Teljes összeg: 0 Ft</p>
  <button onclick="emptyCart()">Kosár tartalmának kiürítése</button>
  <div id="cart-container"></div>

  
`;


  document.body.appendChild(cartContainer);

  cartToggle.addEventListener('click', function () {
    if (!sideMenu.classList.contains('active')) {
      cartContainer.classList.toggle('active');
    }
  });

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

  const cart = {};

  const addToCart = (product) => {
    const { id, imgSrc, name, price } = product;
    if (cart[id]) {
      cart[id].quantity++;
    } else {
      cart[id] = { ...product, quantity: 1 };
    }
    renderCart();
  };

  const removeFromCart = (id) => {
    delete cart[id];
    renderCart();
  };
  
  const renderCart = () => {
    console.log(cart)
    const cartContainer = document.getElementById('cart-container');
    cartContainer.innerHTML = '';
  
    let totalPrice = 0;
  
    for (const productId in cart) {
      const product = cart[productId];
      totalPrice += product.price * product.quantity;
  
      const cartItem = document.createElement('div');
  
      cartItem.innerHTML = `
        <img src="${product.imgSrc}" alt="${product.name}">
        <img src="images/x.png" class="remove-icon" data-id="${productId}">
        <p>${product.name}</p>
        <p>Ár: ${product.price} Ft</p>
        <input type="number" value="${product.quantity}" min="1" class="quantity-input" data-id="${productId}">
        <textarea class="comment-input" data-id="${productId}">
      `;
  
      cartContainer.appendChild(cartItem);
    }
  
    document.getElementById('total-price').innerText = `Teljes összeg: ${totalPrice} Ft`;
  
    const removeIcons = document.querySelectorAll('.remove-icon');
    removeIcons.forEach((removeIcon) => {
      removeIcon.addEventListener('click', () => {
        const id = removeIcon.dataset.id;
        removeFromCart(id);
      });
    });
  
    const quantityInputs = document.querySelectorAll('.quantity-input');
    quantityInputs.forEach((quantityInput) => {
      quantityInput.addEventListener('change', () => {
        const id = quantityInput.dataset.id;
        const newQuantity = parseInt(quantityInput.value);
        cart[id].quantity = newQuantity;
        renderCart();
      });
    });
  };
  

  const emptyCart = () => {
    for (const productId in cart) {
      delete cart[productId];
    }
    renderCart();
  };

  window.emptyCart = emptyCart;

  const cartButtons = document.querySelectorAll('.cart-button');
  cartButtons.forEach((cartButton, index) => {
    cartButton.addEventListener('click', () => {
      const product = cartButton.parentElement;
      const id = product.id;
      const imgSrc = product.querySelector('img').src;
      const name = product.querySelector('p:nth-of-type(1)').innerText;
      const price = parseInt(product.querySelector('p:nth-of-type(2)').innerText.split(' ')[1]);
      
      addToCart({ id, imgSrc, name, price });
    });
  });
  

});





