const arrowNext = document.querySelector('.slider__arrow_next');
const arrowPrev = document.querySelector('.slider__arrow_prev');
const arraySliderItems = [...document.querySelectorAll('.slider__item')];
const arrayDotItems = [...document.querySelectorAll('.slider__dot')];

//Events
arrowNext.addEventListener('click', () => {
  const count = arraySliderItems.findIndex(el => el.classList.contains('slider__item_active'));
  count < arraySliderItems.length - 1
    ? changeSlide(count + 1)
    : changeSlide(0);
});
arrowPrev.addEventListener('click', () => {
  const count = arraySliderItems.findIndex(el => el.classList.contains('slider__item_active'));
  count <= 0
    ? changeSlide(count + arraySliderItems.length - 1)
    : changeSlide(count - 1);

});
arrayDotItems.forEach((el, index) => {
   el.addEventListener('click', (e) => {
     changeSlide(index);
   });
 });

//Handlers
function changeSlide(count) {
  arraySliderItems.forEach(el => el.classList.remove('slider__item_active'));
  arraySliderItems[count].classList.add('slider__item_active');
  arrayDotItems.forEach(el => el.classList.remove('slider__dot_active'));
  arrayDotItems[count].classList.add('slider__dot_active');
}
