const cartWrapper = document.querySelector('.cart');
const cartContainer = document.querySelector('.cart__products');
const productsContainer = document.querySelector('.products');

// Events
document.addEventListener('DOMContentLoaded', () => loadProductsFromLocalStorage());
productsContainer.addEventListener('click', (e) => {
  const currentElement = e.target;
  if (currentElement.classList.contains('product__quantity-control_inc')) {
    changeQuantity(currentElement, 'inc');
  }
  if (currentElement.classList.contains('product__quantity-control_dec')) {
    changeQuantity(currentElement, 'dec');
  }
  if (currentElement.classList.contains('product__add')) {
    addProductInCart(currentElement);
  }
});

cartContainer.addEventListener('click', (e) => {
  const currentElement = e.target;
  if (!currentElement.classList.contains('product__remove')) {
    return;
  }
  delTaskFromLocalStorage(currentElement);
  loadProductsFromLocalStorage();
});

// Handlers
function changeQuantity(element, action) {
  const quantityValue = element
    .closest('.product__quantity-controls')
    .querySelector('.product__quantity-value');
  if (action === 'inc') {
    quantityValue.textContent = +quantityValue.textContent + 1;
  } else {
    if (+quantityValue.textContent === 1) {
      return;
    }
    quantityValue.textContent = +quantityValue.textContent - 1;
  }
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
  const findProduct = getProductsFromLocalStorage().find((product) => id === product.id);
  if (findProduct) {
    const cartElement = document
      .querySelector(`.cart__product[data-id="${findProduct.id}"]`)
      .querySelector('.cart__product-count');
    cartElement.textContent = +cartElement.textContent + productCount;
    animationAddProduct(id);
    setProductsFromLocalStorage(id, imgURL, +cartElement.textContent);
    return;
  }
  setProductsFromLocalStorage(id, imgURL, productCount);
  cartWrapper.classList.remove('cart__hidden');
  const template = templateProduct(id, imgURL, productCount);
  cartContainer.insertAdjacentHTML('beforeend', template);
  animationAddProduct(id);
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
  let posX = productElementPosition.left;
  let posY = productElementPosition.top;
  const stepX = (cartElementPosition.left - productElementPosition.left) / 50;
  const stepY = (productElementPosition.top - cartElementPosition.top) / 50;
  const flyImg = `<img src="${cartElement.getAttribute('src')}" class="product__flyImg" style="left: ${productElementPosition.left}px; top: ${productElementPosition.top}px;" alt="Fly picture">`;
  document.body.insertAdjacentHTML('afterbegin', flyImg);
  const flyPic = document.querySelector('.product__flyImg');
  const timerID = setInterval(() => {
    posX += stepX;
    posY -= stepY;
    if (cartElementPosition.left < posX || cartElementPosition.top > posY) {
      clearInterval(timerID);
      flyPic.remove();
    }
    flyPic.style.left = `${posX}px`;
    flyPic.style.top = `${posY}px`;
  }, 10);
}

function templateProduct(id, imgURL, productCount) {
  return `
    <div class="cart__product" data-id="${id}">
      <img class="cart__product-image" src="${imgURL}" alt="Cart picture">
      <div class="cart__product-count">${productCount}</div>
      <div class="product__remove">&times;</div>
    </div>
  `;
}

// LocalStorage
function loadProductsFromLocalStorage() {
  cartContainer.innerHTML = '';
  const cart = getProductsFromLocalStorage();
  if (!cart) {
    localStorage.setItem('cart', JSON.stringify([]));
  }
  if (!cart.length) {
    cartWrapper.classList.add('cart__hidden');
  }
  cart.forEach((product) => {
    const { id, imgURL, productCount } = product;
    const template = templateProduct(id, imgURL, productCount);
    cartContainer.insertAdjacentHTML('beforeend', template);
    cartWrapper.classList.remove('cart__hidden');
  });
}

function getProductsFromLocalStorage() {
  return JSON.parse(localStorage.getItem('cart'));
}

function setProductsFromLocalStorage(id, imgURL, productCount) {
  const currentProduct = {
    id,
    imgURL,
    productCount,
  };
  const products = getProductsFromLocalStorage();
  localStorage.removeItem('cart');
  const newProducts = products.filter((product) => product.id !== currentProduct.id);
  newProducts.push(currentProduct);
  localStorage.setItem('cart', JSON.stringify(newProducts));
}

function delTaskFromLocalStorage(currentProduct) {
  const { id } = currentProduct.closest('.cart__product').dataset;
  const cart = getProductsFromLocalStorage();
  const newProducts = cart.filter((product) => product.id !== +id);
  localStorage.removeItem('cart');
  localStorage.setItem('cart', JSON.stringify(newProducts));
}
