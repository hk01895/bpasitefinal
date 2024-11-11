
  const urlParams = new URLSearchParams(window.location.search);
  const cartTotal = urlParams.get('total'); 

  if (cartTotal) {
      document.getElementById('cart-total').innerText = `$${parseFloat(cartTotal).toFixed(2)}`;
  }


