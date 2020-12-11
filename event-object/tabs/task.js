const tabNavElements = [...document.querySelectorAll('.tab')];
const tabContentElements = [...document.querySelectorAll('.tab__content')];

// Events
tabNavElements.forEach((el, index) => el.addEventListener('click', (e) => {
  setActiveClass(e, index);
}));

// Handlers
function setActiveClass(e, index) {
  const blockContentParent = e.target.closest('.tab__navigation').nextElementSibling;
  const blockContentElements = [...blockContentParent.querySelectorAll('.tab__content')];
  blockContentElements.forEach((el) => el.classList.remove('tab__content_active'));
  tabNavElements.forEach((el) => el.classList.remove('tab_active'));
  tabNavElements[index].classList.add('tab_active');
  tabContentElements[index].classList.add('tab__content_active');
}
