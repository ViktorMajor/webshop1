document.addEventListener('DOMContentLoaded', function () {
  let containers = document.querySelectorAll('.product-container');
  for(let i = 0; i < containers.length; i++) {
      if(i % 2 !== 0) {
          containers[i].style.backgroundColor = 'rgba(51, 51, 51, 0.5';
          containers[i].style.borderRadius = '5px';
      }
  }
  const menuToggle = document.getElementById('menu-toggle');
  const sideMenu = document.createElement('div');
  sideMenu.classList.add('side-menu');
  
  // Hozzáadja a menüpontokat a sideMenu-hez
  sideMenu.innerHTML += '<h1>Menü</h1>';
  
  const menuItems = document.querySelectorAll('h2');
  const fragment = new DocumentFragment();



 
  menuItems.forEach((item, index) => {
    const menuItemWrapper = document.createElement('div');
    menuItemWrapper.classList.add('menu-item-wrapper');
    const subMenuItemWrapper = document.createElement('div');
    subMenuItemWrapper.className = 'submenu-item-wrapper'
  
    const menuItem = document.createElement('a');
    
    
    if (index < 3) {
      const menuItemArrow = document.createElement('img');
      menuItemArrow.src ="images/arrow.png";
      menuItemWrapper.appendChild(menuItemArrow);
  
      let toggle = true;  // Egy változó, ami minden kattintásnál megfordul
  
      menuItemArrow.addEventListener('click', function(event) {
        // Megkeressük a submenu-itemeket a fragmentben
        const subMenuItemWrapper = menuItemWrapper.querySelectorAll('.submenu-item-wrapper');
      
        // Végigmegyünk mindegyiken, és beállítjuk a display tulajdonságukat 'block'-ra vagy 'none'-ra, a toggle állapotától függően
        subMenuItemWrapper.forEach(function(subMenuItemWrapper) {
          if (toggle) {
            subMenuItemWrapper.style.display = 'block';
          } else {
            subMenuItemWrapper.style.display = 'none';
          }
        });
      
        toggle = !toggle;  // Megfordítjuk a toggle állapotát minden kattintásnál
      });
    }
  
    
    menuItem.innerHTML = item.innerHTML;
    menuItem.classList.add('menu-item');
    menuItem.href = `#section${index}`;
  
    menuItem.addEventListener('click', function (event) {
      event.preventDefault();
      sideMenu.classList.remove('active');
      console.log('running');
  
      const section = document.getElementById(`section${index}`);
      const headerHeight = 130;
  
      window.scrollTo({
        top: section.offsetTop - headerHeight,
        behavior: 'smooth'
      });
    });
  
    menuItemWrapper.appendChild(menuItem);
  
    fragment.appendChild(menuItemWrapper);

   
    
    const subMenuItems = item.nextElementSibling.querySelectorAll('h3');
  

      subMenuItems.forEach((subItem, subIndex) => {
      const subMenuItem = document.createElement('a');
      subMenuItem.innerHTML = subItem.innerHTML;
      subMenuItem.classList.add('submenu-item');
      subMenuItem.href = `#subsection${index}${subIndex}`; // Módosítva a helyes subsection ID-hez
      subMenuItem.addEventListener('click', function (event) {
        event.preventDefault();
        sideMenu.classList.remove('active');
        console.log('running');

        const subSection = document.getElementById(`subsection${index}${subIndex}`); // Módosítva a helyes subsection ID-hez
        const headerHeight = 130;

        // Görgetés a szakaszhoz a képernyő tetejétől kivonva a fejléc magasságát
        window.scrollTo({
          top: subSection.offsetTop - headerHeight,
          behavior: 'smooth'
        });
      });

    
     

      subMenuItemWrapper.appendChild(subMenuItem);
      menuItemWrapper.appendChild(subMenuItemWrapper);
    });
    




    
    const hr = document.createElement('hr');
    fragment.appendChild(hr);
  });
  
  sideMenu.appendChild(fragment);
  
  
  sideMenu.addEventListener('click', function (event) {
    if (event.target.tagName === 'A') {
      event.preventDefault();
    }
  });
  
  document.body.appendChild(sideMenu);

 
  


  const cartToggle = document.getElementById('cart-toggle');
  const cartContainer = document.createElement('div');
  cartContainer.classList.add('cart-side');

  

  cartContainer.innerHTML = `
  <h2>Kosár tartalma</h2>
  <div id="cart-container"></div>
  <p id="total-price">Teljes összeg: 0 Ft</p>
  <button onclick="emptyCart()">Kosár tartalmának kiürítése</button>
  <button onclick="send()">Rendelés továbbítása</button>
  
`;

 

  document.body.appendChild(cartContainer);

  menuToggle.addEventListener('click', function () {
    if (cartContainer.classList.contains('active')) {
      cartContainer.classList.remove('active');
      setTimeout(function() {
        sideMenu.classList.toggle('active');
      }, 100); // Az animáció időtartama alatt szükséges késleltetés. Állítsa be a tényleges animáció időtartamához.
    } else {
      sideMenu.classList.toggle('active');
    }
  });
  
  cartToggle.addEventListener('click', function () {
    if (sideMenu.classList.contains('active')) {
      sideMenu.classList.remove('active');
      setTimeout(function() {
        cartContainer.classList.toggle('active');
      }, 100); // Az animáció időtartama alatt szükséges késleltetés. Állítsa be a tényleges animáció időtartamához.
    } else {
      cartContainer.classList.toggle('active');
    }
  });

 

  document.addEventListener('click', function(event) {
    const isClickInsideMenu = sideMenu.contains(event.target);
    const isClickInsideMenuToggle = menuToggle.contains(event.target);
    const isClickInsideCart = cartContainer.contains(event.target);
    const isClickInsideCartToggle = cartToggle.contains(event.target);
    
    const isEmptyCartButton = event.target.matches('button');
    const isSendButton = event.target.matches('button');
    const isRemoveIcon = event.target.matches('.remove-icon'); // Check if clicked on remove-icon
  
    if (!isClickInsideMenu && !isClickInsideMenuToggle && sideMenu.classList.contains('active')) {
      sideMenu.classList.remove('active');
    }
  
    if (!isClickInsideCart && !isClickInsideCartToggle && !isEmptyCartButton && !isSendButton && !isRemoveIcon && cartContainer.classList.contains('active')) {
      // Only remove 'active' if clicked outside of cart and not on the remove-icon
      cartContainer.classList.remove('active');
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
      cart[id] = { ...product, quantity: 1, comment: "" }; // Add 'comment' property here
    }
    renderCart();
    updateCartCount();
  };
  

  const removeFromCart = (id) => {
    delete cart[id];
    renderCart();
    updateCartCount();
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
      cartItem.classList.add('cartItem');
  
      cartItem.innerHTML = `
      <img src="${product.imgSrc}" alt="${product.name}">
      <img src="images/x.png" class="remove-icon" data-id="${productId}">
      <div id="text-container">
        <p>${product.name}</p>
        <p>Ár: ${product.price} Ft</p>
        <p><input type="number" value="${product.quantity}" min="1" class="quantity-input" data-id="${productId}">db</p>
      </div>
      <div id="comment">
        <p>Megjegyzés:</p>
        <textarea class="comment-input" data-id="${productId}">${product.comment}</textarea>
        </div>
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
        updateCartCount();
      });
    });
    
    // Here is the newly added code
    const commentInputs = document.querySelectorAll('.comment-input');
    commentInputs.forEach((commentInput) => {
      commentInput.addEventListener('input', () => {
        const id = commentInput.dataset.id;
        const newComment = commentInput.value;
        cart[id].comment = newComment;
      });
    });
  };
  

  const emptyCart = () => {
    for (const productId in cart) {
      delete cart[productId];
    }
    renderCart();
    updateCartCount();
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
  const updateCartCount = () => {
    const cartCount = document.getElementById('cart-count');
    let totalQuantity = 0;
  
    for (const productId in cart) {
      totalQuantity += cart[productId].quantity;
    }
  
    cartCount.innerText = totalQuantity;
  };
  
  const commentInputs = document.querySelectorAll('.comment-input');
  commentInputs.forEach((commentInput) => {
    commentInput.addEventListener('input', () => {
      const id = commentInput.dataset.id;
      const newComment = commentInput.value;
      cart[id].comment = newComment;
    });
  });

});

