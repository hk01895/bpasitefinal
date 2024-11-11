let products = [
  {
    id: 1,
    title: "Stage Fright Shirt",
    image: "m1.jpg",  
    price: 19.99
  },
  {
    id: 2,
    title: "Stage Fright Hoodie",
    image: "m2.jpg",  
    price: 29.99
  },
  {
    id: 3,
    title: "Stage Fright Hoodie",
    image: "m3.jpg",  
    price: 23.66
  },
  {
    id: 4,
    title: "Stage Fright Cap",
    image: "m4.jpg",  
    price: 59.99
  },
  {
    id: 5,
    title: "Stage Fright Waterbottle",
    image: "m5.jpg",  
    price: 19.99
  },
  {
    id: 6,
    title: "Stage Fright Sunglasses",
    image: "m6.jpg",  
    price: 79.99
  },
  {
    id: 7,
    title: "Stage Fright Bag",
    image: "m7.jpg",  
    price:319.99
  },
  {
    id: 8,
    title: "Stage Fright Gray Shirt",
    image: "m8.jpg",  
    price: 36.99
  },
  {
    id: 9,
    title: "Stage Fright Blue Shirt",
    image: "m9.jpg",  
    price: 19.99
  },
  {
    id: 10,
    title: "Stage Fright Phone Case",
    image: "m10.jpg",  
    price: 23.99
  },
  {
    id: 11,
    title: "Stage Fright Gray hoodie",
    image: "m11.jpg",  
    price: 32.99
  },
  {
    id: 12,
    title: "Stage Fright Vinyl",
    image: "your-square-image.jpg",  
    price: 19.99
  }
  
];

let cart = [];

const selectors = {
  products: document.querySelector(".products"),
  cartBtn: document.querySelector(".cart-btn"),
  cartQty: document.querySelector(".cart-qty"),
  cartClose: document.querySelector(".cart-close"),
  cart: document.querySelector(".cart"),
  cartOverlay: document.querySelector(".cart-overlay"),
  cartClear: document.querySelector(".cart-clear"),
  cartBody: document.querySelector(".cart-body"),
  cartTotal: document.querySelector(".cart-total"),
};

const setupListeners = () => {
  document.addEventListener("DOMContentLoaded", initStore);

  
  selectors.products.addEventListener("click", addToCart);

  
  selectors.cartBtn.addEventListener("click", showCart);
  selectors.cartOverlay.addEventListener("click", hideCart);
  selectors.cartClose.addEventListener("click", hideCart);
  selectors.cartBody.addEventListener("click", updateCart);
  selectors.cartClear.addEventListener("click", clearCart);
};

const initStore = () => {
  loadCart();
  renderProducts();
  renderCart();
};

const showCart = () => {
  selectors.cart.classList.add("show");
  selectors.cartOverlay.classList.add("show");
};

const hideCart = () => {
  selectors.cart.classList.remove("show");
  selectors.cartOverlay.classList.remove("show");
};

const clearCart = () => {
  cart = [];
  saveCart();
  renderProducts();  
  renderCart();
  setTimeout(hideCart, 500);
};

const addToCart = (e) => {
  if (e.target.hasAttribute("data-id")) {
    const id = parseInt(e.target.dataset.id);
    const inCart = cart.find((x) => x.id === id);

    if (inCart) {
      alert("Item is already in cart.");
      return;
    }

    cart.push({ id, qty: 1 });
    saveCart();
    renderProducts();  
    renderCart();
    showCart();
  }
};

const removeFromCart = (id) => {
  cart = cart.filter((x) => x.id !== id);

  
  cart.length === 0 && setTimeout(hideCart, 500);

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

const updateCart = (e) => {
  if (e.target.hasAttribute("data-btn")) {
    const cartItem = e.target.closest(".cart-item");
    const id = parseInt(cartItem.dataset.id);
    const btn = e.target.dataset.btn;

    btn === "incr" && increaseQty(id);
    btn === "decr" && decreaseQty(id);

    saveCart();
    renderCart();
  }
};

const saveCart = () => {
  localStorage.setItem("online-store", JSON.stringify(cart));
};

const loadCart = () => {
  cart = JSON.parse(localStorage.getItem("online-store")) || [];
};

const renderCart = () => {
  const cartQty = cart.reduce((sum, item) => {
    return sum + item.qty;
  }, 0);

  selectors.cartQty.textContent = cartQty;
  selectors.cartQty.classList.toggle("visible", cartQty);

  
  selectors.cartTotal.textContent = calculateTotal().format();

  
  if (cart.length === 0) {
    selectors.cartBody.innerHTML =
      '<div class="cart-empty">Your cart is empty.</div>';
    return;
  }

  
  selectors.cartBody.innerHTML = cart
    .map(({ id, qty }) => {
      const product = products.find((x) => x.id === id);

      const { title, image, price } = product;

      const amount = price * qty;

      return `
        <div class="cart-item" data-id="${id}">
          <img src="${image}" alt="${title}" />
          <div class="cart-item-detail">
            <h3>${title}</h3>
            <h5>${price.format()}</h5>
            <div class="cart-item-amount">
              <i class="bi bi-dash-lg" data-btn="decr"></i>
              <span class="qty">${qty}</span>
              <i class="bi bi-plus-lg" data-btn="incr"></i>

              <span class="cart-item-price">
                ${amount.format()}
              </span>
            </div>
          </div>
        </div>`;
    })
    .join("");
};

const renderProducts = () => {
  selectors.products.innerHTML = products
    .map((product) => {
      const { id, title, image, price } = product;

      
      const inCart = cart.find((x) => x.id === id);

      
      const disabled = inCart ? "disabled" : "";

      
      const text = inCart ? "Added to Cart" : "Add to Cart";

      return `
        <div class="product">
          <img src="${image}" alt="${title}" />
          <h3>${title}</h3>
          <h5>${price.format()}</h5>
          <button ${disabled} data-id=${id}>${text}</button>
        </div>
      `;
    })
    .join("");
};

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

Number.prototype.format = function () {
  return this.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
};

setupListeners();

const checkoutButton = document.querySelector('.checkout button');

checkoutButton.addEventListener('click', () => {
   
   window.location.href = 'checkout.html';
});
