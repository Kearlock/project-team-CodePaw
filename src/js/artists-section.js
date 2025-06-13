// === artist-section.js ===
import { fetchArtists } from './soundwave-api.js';
import { openArtistModal } from './artist-details-modal.js';

const limit = 8;

let artistsContainer;
let loadMoreBtn;

function showLoader() {
  const loader = document.getElementById('loader');
  if (loader) loader.classList.remove('hidden');
}

function hideLoader() {
  const loader = document.getElementById('loader');
  if (loader) loader.classList.add('hidden');
}

function getGenres(artist) {
  if (!artist || typeof artist !== 'object') return [];

  if (Array.isArray(artist.genres) && artist.genres.length > 0) {
    return artist.genres.filter(Boolean);
  }
  return [];
}

async function createCard(artist) {
  const card = document.createElement('li');
  card.className = 'artist-card';

  const img = document.createElement('img');
  img.src =
    artist.strArtistThumb ||
    'https://placehold.co/150x150/cccccc/333333?text=No+Image';
  img.alt = artist.strArtist || 'No Image';
  img.addEventListener('error', function () {
    this.src = 'https://placehold.co/150x150/cccccc/333333?text=No+Image';
    this.alt = 'No Image Available';
  });
  card.appendChild(img);

  const genresP = document.createElement('p');
  const genresList = getGenres(artist);
  if (genresList.length) {
    const ul = document.createElement('ul');
    ul.classList.add('artist-genres-list');
    genresList.forEach(genre => {
      const li = document.createElement('li');
      li.classList.add('genres-list-item');
      li.textContent = genre;
      ul.appendChild(li);
    });
    genresP.appendChild(ul);
  } else {
    genresP.appendChild(document.createTextNode('N/A'));
  }
  card.appendChild(genresP);

  const h3 = document.createElement('h3');
  h3.textContent = artist.strArtist || 'Unknown Artist';
  card.appendChild(h3);

  const shortInfoP = document.createElement('p');
  shortInfoP.className = 'artist-description';
  const bio = artist.strBiographyEN || 'No short info available.';
  shortInfoP.textContent = bio.length > 200 ? bio.slice(0, 200) + '...' : bio;
  card.appendChild(shortInfoP);

  const learnMoreButton = document.createElement('button');
  learnMoreButton.className = 'learn-more-btn';
  learnMoreButton.textContent = 'Learn More';
  learnMoreButton.dataset.artistId = artist._id;

  const learnMoreIcon = document.createElementNS(
    'http://www.w3.org/2000/svg',
    'svg'
  );
  learnMoreIcon.setAttribute('class', 'learn-more-icon');
  learnMoreIcon.setAttribute('width', '24');
  learnMoreIcon.setAttribute('height', '24');

  const useElement = document.createElementNS(
    'http://www.w3.org/2000/svg',
    'use'
  );
  useElement.setAttribute(
    'href',
    `${import.meta.env.BASE_URL}img/icons.svg#icon-filled-arrow`
  );

  learnMoreIcon.appendChild(useElement);
  learnMoreButton.appendChild(learnMoreIcon);
  card.appendChild(learnMoreButton);

  return card;
}

let currentPage = 1;

async function loadArtistsDataAndDisplay() {
  try {
    showLoader();

    const data = await fetchArtists({ page: currentPage, limit: 8 });
    const artistsArray = Array.isArray(data?.artists) ? data.artists : [];

    if (!artistsArray.length) {
      loadMoreBtn.classList.add('hidden');
      loadMoreBtn.setAttribute('disabled', true);
      return;
    }

    for (const artist of artistsArray) {
      const card = await createCard(artist);
      artistsContainer.appendChild(card);
    }

    currentPage++;

    if (artistsArray.length < 8) {
      loadMoreBtn.classList.add('hidden');
      loadMoreBtn.setAttribute('disabled', true);
    }
  } catch (error) {
    alert('Failed to load artists. Please try again later.');
    loadMoreBtn.classList.add('hidden');
    loadMoreBtn.setAttribute('disabled', true);
  } finally {
    hideLoader();
  }
}

function initArtistSection() {
  artistsContainer = document.getElementById('artists');
  loadMoreBtn = document.getElementById('loadMoreBtn');

  if (!artistsContainer || !loadMoreBtn) return;

  loadMoreBtn.onclick = loadArtistsDataAndDisplay;
  loadArtistsDataAndDisplay();

  artistsContainer.addEventListener('click', e => {
    const button = e.target.closest('.learn-more-btn');
    if (button) {
      const artistId = button.dataset.artistId;
      if (artistId) openArtistModal(artistId);
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initArtistSection();
});

export { initArtistSection };
