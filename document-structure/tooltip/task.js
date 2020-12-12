const linkElements = [...document.querySelectorAll('a')];

linkElements.forEach((el) => el.addEventListener('click', (e) => {
  e.preventDefault();
  showTooltipMessage(e.target);
}));

function showTooltipMessage(element) {
  const link = element;
  const tooltips = [...document.querySelectorAll('.tooltip')];
  if (link.nextElementSibling && link.nextElementSibling.classList.contains('tooltip')) {
    link.nextElementSibling.remove();
    return;
  }
  if (tooltips.length) {
    tooltips.forEach((item) => item.remove());
  }
  const { left, bottom } = link.getBoundingClientRect();
  const template = createTooltipTemplate(left, bottom, element.title);
  link.insertAdjacentHTML('afterend', template);
}

function createTooltipTemplate(left, bottom, title) {
  return `
  <div class="tooltip tooltip_active" style="left: ${left}px; top: ${bottom}px">${title}</div>
  `;
}
