
let cart = JSON.parse(localStorage.getItem('cart')) || [];
const cartBtn = document.querySelector('.cart-btn');
const cartSidebar = document.getElementById('cartSidebar');
const cartItemsContainer = document.getElementById('cartItems');
const cartTotal = document.getElementById('cartTotal');



const saveCart = () => localStorage.setItem('cart', JSON.stringify(cart));



const updateCart = () => {
  cartItemsContainer.innerHTML = '';
  let total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  cart.forEach(item => {
    cartItemsContainer.innerHTML += `
      <li class="cart-item">
        <span>${item.name} x${item.quantity}</span>
        <span>$${(item.price * item.quantity).toFixed(2)}</span>
        <button class="remove-btn" onclick="removeFromCart('${item.name}')">X</button>
      </li>`;
  });
  cartTotal.textContent = `Total: $${total.toFixed(2)}`;
  cartBtn.textContent = `Cart (${cart.reduce((s, i) => s + i.quantity, 0)})`;
};

const toggleCart = () => cartSidebar.classList.toggle('active');



const addToCart = (name, price) => {
  let item = cart.find(i => i.name === name);
  item ? item.quantity++ : cart.push({ name, price, quantity: 1 });
  saveCart(); updateCart();
};

const removeFromCart = name => {
  cart = cart.filter(i => i.name !== name);
  saveCart(); updateCart();
};

const checkout = () => {
  if (!cart.length) return alert('Your cart is empty!');
  alert('Checkout successful! Thank you.');
  cart = []; saveCart(); updateCart();
};

cartBtn?.addEventListener('click', toggleCart);
updateCart();
