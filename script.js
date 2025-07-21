
  // Function to add product to cart
function addToCart(productName, productPrice, productImage) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    const existingProduct = cart.find(item => item.name === productName);
    if (existingProduct) {
        existingProduct.qty += 1; // Increase quantity
    } else {
        cart.push({
            name: productName,
            price: productPrice,
            img: productImage,
            qty: 1
        });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${productName} added to cart!`);
}


function loadCart() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const cartItemsContainer = document.getElementById('cart-items');
  const totalPriceElement = document.getElementById('total-price');
  cartItemsContainer.innerHTML = '';

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = `
      <div class="empty-cart-message">
        🛒 Your cart is empty! <br>
        <a href="product_list.html" class="back-to-shop">Start Shopping</a>
      </div>
    `;
    totalPriceElement.innerText = 0;
    return;
  }

  let total = 0;

  cart.forEach((item, index) => {
    total += item.price * item.qty;

    const cartItemHTML = `
      <div class="cart-item" data-index="${index}">
        <img src="${item.img}" alt="${item.name}">
        <div class="item-details">
          <div class="item-name">${item.name}</div>
          <div class="item-price">₹${item.price}</div>
          <div class="quantity-controls">
            <button class="qty-btn decrease">−</button>
            <span class="qty-value">${item.qty}</span>
            <button class="qty-btn increase">+</button>
          </div>
        </div>
        <button class="remove-btn">Remove</button>
      </div>`;
    cartItemsContainer.insertAdjacentHTML('beforeend', cartItemHTML);
  });

  totalPriceElement.innerText = total;
  attachEventListeners();
}


function attachEventListeners() {
    document.querySelectorAll('.qty-btn').forEach(btn => {
        btn.addEventListener('click', function () {
            const itemIndex = this.closest('.cart-item').dataset.index;
            let cart = JSON.parse(localStorage.getItem('cart')) || [];
            if (this.classList.contains('increase')) {
                cart[itemIndex].qty++;
            } else if (this.classList.contains('decrease') && cart[itemIndex].qty > 1) {
                cart[itemIndex].qty--;
            }
            localStorage.setItem('cart', JSON.stringify(cart));
            loadCart();
        });
    });

    document.querySelectorAll('.remove-btn').forEach(btn => {
        btn.addEventListener('click', function () {
            const itemIndex = this.closest('.cart-item').dataset.index;
            let cart = JSON.parse(localStorage.getItem('cart')) || [];
            cart.splice(itemIndex, 1);
            localStorage.setItem('cart', JSON.stringify(cart));
            loadCart();
        });
    });
}

window.onload = loadCart;

