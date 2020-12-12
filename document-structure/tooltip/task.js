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
    tooltips.forEach((tooltip) => tooltip.remove());
  }
  const currentPosition = link.dataset.position;
  const proportionsTooltip = getProportionsTooltip(link);
  const position = calcPosition(currentPosition, proportionsTooltip, link.getBoundingClientRect());
  const template = createTooltipTemplate(position, element.title);
  link.insertAdjacentHTML('afterend', template);
}

function calcPosition(currentPosition, { width, height }, dataPosition) {
  switch (currentPosition) {
    case 'top':
      return {
        posX: dataPosition.left,
        posY: dataPosition.top - height,
      };
    case 'left':
      return {
        posX: dataPosition.left - width,
        posY: dataPosition.top,
      };
    case 'bottom':
      return {
        posX: dataPosition.left,
        posY: dataPosition.bottom,
      };
    case 'right':
      return {
        posX: dataPosition.left + dataPosition.width,
        posY: dataPosition.top,
      };
    default:
      break;
  }
  return null;
}

function getProportionsTooltip(link) {
  const template = createTooltipTemplate({ posX: 0, posY: 0 }, link.title);
  link.insertAdjacentHTML('afterend', template);
  const tooltip = document.querySelector('.tooltip');
  const proportions = {
    width: tooltip.clientWidth,
    height: tooltip.clientHeight,
  };
  tooltip.remove();
  return proportions;
}
function createTooltipTemplate({ posX, posY }, title) {
  return `
  <div class="tooltip tooltip_active" style="left: ${posX}px; top: ${posY}px">${title}</div>
  `;
}
