const cartWrapper = document.querySelector('.cart');
const cartContainer = document.querySelector('.cart__products');
const addBtns = [...document.querySelectorAll('.product__add')];
const productsContainer = document.querySelector('.products');
let cart = [];

// Events
productsContainer.addEventListener('click', (e) => {
  const currentElement = e.target;
  if (currentElement.classList.contains('product__quantity-control_inc')) {
    changeQuantity(currentElement, 'inc');
  }
  if (currentElement.classList.contains('product__quantity-control_dec')) {
    changeQuantity(currentElement, 'dec');
  }
});

cartContainer.addEventListener('click', (e) => {
  const currentElement = e.target;
  if (!currentElement.classList.contains('product__remove')) {
    return;
  }
  deleteProduct(currentElement);
});

addBtns.forEach((btn) => btn.addEventListener('click', (e) => {
  e.preventDefault();
  const currentElement = e.target;
  addProductInCart(currentElement);
}));

// Handlers
function changeQuantity(element, action) {
  const quantityValue = element
    .closest('.product__quantity-controls')
    .querySelector('.product__quantity-value');
  if (+quantityValue.textContent < 1) {
    return;
  }
  // eslint-disable-next-line no-unused-expressions
  action === 'inc'
    ? quantityValue.textContent = +quantityValue.textContent + 1
    : quantityValue.textContent = +quantityValue.textContent - 1;
}

function addProductInCart(element) {
  const id = +element.closest('.product').dataset.id;
  const imgURL = element
    .closest('.product')
    .querySelector('.product__image')
    .getAttribute('src');
  const productCount = +element
    .previousElementSibling.querySelector('.product__quantity-value')
    .textContent;
  const findProduct = cart.find((product) => id === product.id);
  if (findProduct) {
    const cartElement = document
      .querySelector(`.cart__product[data-id="${findProduct.id}"]`)
      .querySelector('.cart__product-count');
    cartElement.textContent = +cartElement.textContent + productCount;
    animationAddProduct(id);
    return;
  }
  const cartObject = {
    id,
    imgURL,
    productCount,
  };
  cart.push(cartObject);
  cartWrapper.classList.remove('cart__hidden');
  const template = templateProduct(cartObject);
  cartContainer.insertAdjacentHTML('beforeend', template);
  animationAddProduct(id);
}

function deleteProduct(element) {
  const currentProduct = element.closest('.cart__product');
  const id = +currentProduct.dataset.id;
  const findProduct = cart.filter((product) => !(id === product.id));
  cart = [...findProduct];
  currentProduct.remove();
  if (!cart.length) {
    cartWrapper.classList.add('cart__hidden');
  }
}
function animationAddProduct(id) {
  const cartElement = document
    .querySelector(`.cart__product[data-id="${id}"]`)
    .querySelector('.cart__product-image');
  const productElement = document
    .querySelector(`.product[data-id="${id}"]`)
    .querySelector('img');
  const cartElementPosition = cartElement.getBoundingClientRect();
  const productElementPosition = productElement.getBoundingClientRect();
  const flyImg = `<img src="${cartElement.getAttribute('src')}" class="product__flyImg" style="left: ${productElementPosition.left}px; top: ${productElementPosition.top}px;" alt="Fly picture">`;
  document.body.insertAdjacentHTML('afterbegin', flyImg);
  const timerID = setInterval(() => {
    const flyPic = document.querySelector('.product__flyImg');
    const { left, top } = flyPic.getBoundingClientRect();
    if (cartElementPosition.left < left || cartElementPosition.top > top) {
      clearInterval(timerID);
      flyPic.remove();
    }
    flyPic.style.left = `${left * 1.1}px`;
    flyPic.style.top = `${top / 1.27}px`;
  }, 50);
}

function templateProduct({ id, imgURL, productCount }) {
  return `
    <div class="cart__product" data-id="${id}">
      <img class="cart__product-image" src="${imgURL}" alt="Cart picture">
      <div class="cart__product-count">${productCount}</div>
      <div class="product__remove">&times;</div>
    </div>
  `;
}
