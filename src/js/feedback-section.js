import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Swiper from 'swiper';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import axios from 'axios';
import 'css-star-rating/css/star-rating.min.css';

const feedBack = document.querySelector('.swiper-wrapper');

document.addEventListener('DOMContentLoaded', () => {
  const swiper = new Swiper('.modal-product__slider', {
    loop: false,
    modules: [Navigation, Pagination, Autoplay],
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
      renderBullet: function (index, className) {
        if (index === 0)
          return (
            '<span class="' + className + ' bullet left" data-slide="0"></span>'
          );
        if (index === 1)
          return (
            '<span class="' +
            className +
            ' bullet center" data-slide="middle"></span>'
          );
        if (index === 2)
          return (
            '<span class="' +
            className +
            ' bullet right" data-slide="last"></span>'
          );
        return '';
      },
      bulletClass: 'bullet',
      bulletActiveClass: 'swiper-pagination-bullet-active',
    },
    navigation: {
      nextEl: '.custom-next',
      prevEl: '.custom-prev',
    },
    autoplay: {
      delay: 5000,
    },
    on: {
      init() {
        updateCustomBullets(this.realIndex, this.slides.length);
        setupBulletClicks(this);
      },
      slideChange() {
        updateCustomBullets(this.realIndex, this.slides.length);
      },
    },
  });

  async function getFeedBack() {
    try {
      const baseURL = 'https://sound-wave.b.goit.study/api';
      const endPoint = '/feedbacks';
      const url = baseURL + endPoint;
      const params = { limit: 12 };
      const res = await axios.get(url, { params });
      console.log('API Data:', res.data);
      return res.data;
    } catch (e) {
      console.error('Error fetching feedback:', e);
      return null;
    }
  }

  function createFeedBack(feedBacks) {
    const markup = feedBacks
      .map(({ _id, name, rating, descr }) => {
        const roundedRating = Math.round(rating);
        console.log('Rating for', name, ':', roundedRating);
        return `
          <div class="swiper-slide" data-id="${_id || ''}">
            <div class="rating" data-rating="${roundedRating}"></div>
            <p class='feed-back-descr'>${descr || ''}</p>
            <p class='feed-back-name'>${name || ''}</p>
          </div>
        `;
      })
      .join('');

    feedBack.innerHTML = markup;
    initializeStarRatings(); // Ініціалізація зірок після рендерингу
    swiper.update();
  }

  function initializeStarRatings() {
    document.querySelectorAll('.rating').forEach(element => {
      const rating = parseInt(element.dataset.rating);
      if (isNaN(rating)) {
        console.error('Invalid rating value:', element.dataset.rating);
        return;
      }
      element.innerHTML = `
        <span class="star-rating">
          ${[...Array(5)]
            .map(
              (_, i) =>
                `<span class="star ${i < rating ? 'filled' : ''}">★</span>`
            )
            .join('')}
        </span>
      `;
    });
  }

  function updateCustomBullets(index, total) {
    const bullets = document.querySelectorAll('.swiper-pagination .bullet');
    bullets.forEach(b => b.classList.remove('swiper-pagination-bullet-active'));

    if (index === 0) {
      bullets[0].classList.add('swiper-pagination-bullet-active');
    } else if (index === total - 1) {
      bullets[2].classList.add('swiper-pagination-bullet-active');
    } else {
      bullets[1].classList.add('swiper-pagination-bullet-active');
    }
  }

  function setupBulletClicks(swiperInstance) {
    document.querySelector('.bullet.left')?.addEventListener('click', () => {
      swiperInstance.slideTo(0);
    });

    document.querySelector('.bullet.center')?.addEventListener('click', () => {
      const middleIndex = Math.floor((total - 1) / 2);
      swiperInstance.slideTo(middleIndex);
    });

    document.querySelector('.bullet.right')?.addEventListener('click', () => {
      swiperInstance.slideTo(swiperInstance.slides.length - 1);
    });
  }

  getFeedBack().then(data => {
    if (data) {
      const feedBacks = Array.isArray(data)
        ? data
        : data.results || data.data || [];
      createFeedBack(feedBacks);
    }
  });
});
