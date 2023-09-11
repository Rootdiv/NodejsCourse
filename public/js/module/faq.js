const hide = (elem, answer) => {
  if (!elem.classList.contains('faq__item_show') || elem.collapsing) return;
  answer.style.height = `${answer.offsetHeight}px`;
  answer.offsetHeight;
  answer.style.display = 'block';
  answer.style.height = 0;
  answer.style.overflow = 'hidden';
  answer.style.transition = 'height 360ms ease-in-out';
  elem.classList.remove('faq__item_show');
  //elem.classList.add('collapse');
  elem.collapsing = true;
  setTimeout(() => {
    answer.removeAttribute('style');
    //elem.classList.remove('collapse');
    elem.collapsing = false;
  }, 360);
};

const show = (elem, answer) => {
  if (elem.classList.contains('faq__item_show') || elem.collapsing) return;
  answer.style.display = 'block';
  const height = answer.offsetHeight;
  answer.style.height = 0;
  answer.style.overflow = 'hidden';
  answer.style.transition = 'height 360ms ease-in-out';
  answer.offsetHeight;
  answer.style.height = `${height}px`;
  //elem.classList.add('collapse');
  elem.collapsing = true;
  setTimeout(() => {
    elem.classList.add('faq__item_show');
    answer.removeAttribute('style');
    //elem.classList.remove('collapse');
    elem.collapsing = false;
  }, 360);
};

export const accordion = () => {
  const list = document.querySelector('.faq__list');
  const faqItems = list.querySelectorAll('.faq__item');
  list.addEventListener('click', event => {
    const button = event.target.closest('.faq__question');
    if (button) {
      const item = button.closest('.faq__item');
      faqItems.forEach(faqItem => {
        const answer = faqItem.querySelector('.faq__answer');
        if (item === faqItem) {
          faqItem.classList.contains('faq__item_show') ? hide(faqItem, answer) : show(faqItem, answer);
        } else {
          hide(faqItem, answer);
        }
      });
    }
  });
};
