const advantageButtons = document.querySelectorAll('.advantage__button');
const advantageItemsContent = document.querySelectorAll('.advantage__item-content');

advantageButtons.forEach((button, index) => {
  button.addEventListener('click', () => {
    advantageItemsContent.forEach((advantageItemContent, idx) => {
      if (index === idx) {
        advantageButtons[idx].classList.add('advantage__button_active');
        advantageItemContent.classList.add('advantage__item-content_active');
      } else {
        advantageButtons[idx].classList.remove('advantage__button_active');
        advantageItemContent.classList.remove('advantage__item-content_active');
      }
    });
  });
});
