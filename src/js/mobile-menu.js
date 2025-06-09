const burgerBtn = document.querySelector('.burger-btn');
const mobileMenu = document.querySelector('.mobileMenu');
const closeBtn = document.querySelector('.closeMenuBtn');

burgerBtn.addEventListener('click', () => {
  mobileMenu.classList.add('is-active'); // Додаємо клас для показу меню
  document.body.style.overflow = 'hidden'; // Блокуємо прокрутку сторінки
});


closeBtn.addEventListener('click', () => {
  mobileMenu.classList.remove('is-active');
  document.body.style.overflow = 'auto';
});


document.querySelectorAll('.mobileMenu a').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('is-active');
    document.body.style.overflow = 'auto';
  });
});