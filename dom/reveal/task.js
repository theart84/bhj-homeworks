const revealElements = [...document.querySelectorAll('.reveal')];

// Events
document.addEventListener('scroll', showHiddenElement);

// Handlers
function showHiddenElement() {
  const windowHeight = window.innerHeight;
  revealElements.forEach((el) => {
    const currentPosition = el.getBoundingClientRect().top;
    if (windowHeight > currentPosition) {
      el.classList.add('reveal_active');
    }
  });
}
