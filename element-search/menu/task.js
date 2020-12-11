const menuLinkElements = document.querySelectorAll('.menu__link');

// Events
[...menuLinkElements].forEach((el) => {
  el.addEventListener('click', dropdownActive);
});

// Handlers
function dropdownActive(e) {
  if (e.target.nextElementSibling.classList.contains('menu_active')) {
    e.target.nextElementSibling.classList.remove('menu_active');
    e.preventDefault();
    return;
  }
  const menuElements = document.querySelectorAll('.menu_sub');
  [...menuElements].forEach((el) => el.classList.remove('menu_active'));
  const nextSibling = e.target.nextElementSibling;
  if (nextSibling && nextSibling.classList.contains('menu_sub')) {
    nextSibling.classList.toggle('menu_active');
    e.preventDefault();
  }
}
