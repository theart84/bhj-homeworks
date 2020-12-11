const rotators = [...document.querySelectorAll('.rotator')];

rotators.forEach((el) => {
  const childrenElements = [...el.children];
  changeBlock(childrenElements);

});

function changeBlock(elements) {
  let counter = 0;
  setInterval(() => {
    elements.forEach((el) => el.classList.remove('rotator__case_active'));
    if(counter < elements.length - 1) {
      elements[counter + 1].style.color = elements[counter + 1].dataset.color;
      elements[counter + 1].classList.add('rotator__case_active');
      counter++;
    } else {
      elements[0].style.color = elements[0].dataset.color;
      elements[0].classList.add('rotator__case_active');
      counter = 0;
    }
  }, 1000);
}