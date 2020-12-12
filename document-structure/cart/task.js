const cartContainer = document.querySelector('.cart__products');
const addBtns = [...document.querySelectorAll('.product__add')];
const productsContainer = document.querySelector('.products');
const cart = [];

productsContainer.addEventListener('click', (e) => {
  const currentElement = e.target;
  if (currentElement.classList.contains('product__quantity-control_inc')) {
    increaseQuantity(currentElement);
  }
  if (currentElement.classList.contains('product__quantity-control_dec')) {
    decreaseQuantity(currentElement);
  }
});
addBtns.forEach((btn) => btn.addEventListener('click', (e) => {
  e.preventDefault();
  const currentElement = e.target;
  addProductInCart(currentElement);
}));

function increaseQuantity(element) {
  const quantityValue = element
    .closest('.product__quantity-controls')
    .querySelector('.product__quantity-value');
  quantityValue.textContent = +quantityValue.textContent + 1;
}

function decreaseQuantity(element) {
  const quantityValue = element
    .closest('.product__quantity-controls')
    .querySelector('.product__quantity-value');
  if (+quantityValue.textContent === 1) {
    return;
  }
  quantityValue.textContent = +quantityValue.textContent - 1;
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
    return;
  }
  const cartObject = {
    id,
    imgURL,
    productCount,
  };
  cart.push(cartObject);
  const template = templateProduct(cartObject);
  cartContainer.insertAdjacentHTML('afterbegin', template);
}

function templateProduct({ id, imgURL, productCount }) {
  return `
    <div class="cart__product" data-id="${id}">
      <img class="cart__product-image" src="${imgURL}" alt="Cart picture">
      <div class="cart__product-count">${productCount}</div>
    </div>
  `;
}
