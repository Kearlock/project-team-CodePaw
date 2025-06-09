const burger = document.querySelector('.burger');
const menu = document.querySelector('.mobile-menu');
const closeBtn = document.querySelector('.close-btn');
const links = document.querySelectorAll('.mobile-menu a');

burger?.addEventListener('click', () => {
  menu?.classList.add('open');
});

closeBtn?.addEventListener('click', () => {
  menu?.classList.remove('open');
});

links.forEach(link => {
  link.addEventListener('click', () => {
    menu?.classList.remove('open');
  });
});
