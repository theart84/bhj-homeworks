document.addEventListener('DOMContentLoaded', () => {
  const modalMainEl = document.getElementById('modal_main');
  const modalSuccessEl = document.getElementById('modal_success');
  const modalCloseElements = document.querySelectorAll('.modal__close_times');
  const showSuccessBtn = document.querySelector('.show-success');

  modalMainEl.classList.add('modal_active');

//Events
  modalCloseElements.forEach((el) => {
    el.addEventListener('click', closeModalWindow)
  });
  showSuccessBtn.addEventListener('click', showSuccessModal)

//Handlers
  function closeModalWindow(e) {
    const modalWindow = e.target.closest('.modal');
    modalWindow.classList.remove('modal_active');
  }

  function showSuccessModal() {
    modalMainEl.classList.remove('modal_active');
    modalSuccessEl.classList.add('modal_active');
  }
});
