import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Swiper from 'swiper';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import axios from 'axios';
import 'css-star-rating/css/star-rating.min.css';

const feedBack = document.querySelector('.swiper-wrapper');

document.addEventListener('DOMContentLoaded', () => {
  async function getFeedBack() {
    try {
      const baseURL = 'https://sound-wave.b.goit.study/api';
      const endPoint = '/feedbacks';
      const url = baseURL + endPoint;
      const params = { limit: 12 };
      const res = await axios.get(url, { params });
      return res.data;
    } catch (e) {
      console.error('Error fetching feedback:', e);
      return null;
    }
  }

  function renderStars(count) {
    const max = 5;
    let starsHTML = '';
    for (let i = 1; i <= max; i++) {
      const starClass = i <= count ? 'star-filled' : 'star-empty';
      starsHTML += `
        <svg class="star ${starClass}" width="20" height="19">
          <use href="${import.meta.env.BASE_URL}img/icons.svg#${i <= count ? 'icon-star' : 'icon-star'}"></use>
        </svg>
      `;
    }
    return starsHTML;
  }

  function createFeedBack(feedBacks) {
    const markup = feedBacks
      .map(({ _id, name, rating, descr }) => {
        const roundedRating = Math.round(rating);
        return `
          <div class="swiper-slide" data-id="${_id || ''}">
            <div class="rating">
              <div class="star-rating">${renderStars(roundedRating)}</div>
            </div>
            <p class='feed-back-descr'>"${descr || ''}"</p>
            <p class='feed-back-name'>${name || ''}</p>
          </div>
        `;
      })
      .join('');

    feedBack.innerHTML = markup;

    // Створюємо новий Swiper
    const swiper = new Swiper('.modal-product__slider', {
      modules: [Navigation, Pagination, Autoplay],
      pagination: {
        el: '.swiper-pagination',
        clickable: false,
        type: 'custom',
        renderBullet: function (index, className) {
          if (index === 0)
            return '<span class="' + className + ' bullet left" data-slide="0"></span>';
          if (index === 1)
            return '<span class="' + className + ' bullet center" data-slide="middle"></span>';
          if (index === 2)
            return '<span class="' + className + ' bullet right" data-slide="last"></span>';
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
        console.log('Sliding to first slide:', 0);
      });

      document.querySelector('.bullet.center')?.addEventListener('click', () => {
        const middleIndex = Math.floor(swiperInstance.slides.length / 2);
        swiperInstance.slideTo(middleIndex);
        console.log('Sliding to middle slide:', middleIndex);
      });

      document.querySelector('.bullet.right')?.addEventListener('click', () => {
        const lastIndex = swiperInstance.slides.length - 1;
        swiperInstance.slideTo(lastIndex);
      });
    }
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

  getFeedBack().then(data => {
    if (data) {
      const feedBacks = Array.isArray(data) ? data : data.results || data.data || [];
      createFeedBack(feedBacks);
    }
  });
});