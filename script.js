
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

