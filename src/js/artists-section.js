// === artist-section.js ===
import { fetchArtists } from './soundwave-api.js';
import { openArtistModal } from './artist-details-modal.js';

let offset = 0;
const limit = 8;
let allArtists = [];

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
}

async function createCard(artist) {
  const card = document.createElement('div');
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
  // const genresStrong = document.createElement('strong');
  // genresStrong.textContent = 'Genres: ';
  // genresP.appendChild(genresStrong);
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
  card.appendChild(learnMoreButton);

  const learnMoreIcon = document.createElement('svg');
  // learnMoreIcon.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
  // learnMoreIcon.setAttribute('viewBox', '0 0 24 24');
  learnMoreIcon.setAttribute('class', 'learn-more-icon');
  learnMoreIcon.setAttribute('width', '24');
  learnMoreIcon.setAttribute('height', '24');
  learnMoreIcon.setAttribute('fill', '#fff');
  learnMoreButton.appendChild(learnMoreIcon);

  const useElement = document.createElement('use');
  useElement.setAttribute(
    'href',
    `${import.meta.env.BASE_URL}img/icons.svg#icon-filled-arrow`
  );
  learnMoreIcon.appendChild(useElement);

  return card;
}

async function loadArtistsDataAndDisplay() {
  try {
    showLoader();

    if (offset === 0) {
      const data = await fetchArtists();
      const artistsArray = Array.isArray(data?.artists) ? data.artists : null;
      if (!artistsArray) {
        alert('Error: Received invalid data from server.');
        loadMoreBtn?.classList.add('hidden');
        loadMoreBtn?.setAttribute('disabled', true);
        return;
      }
      allArtists = artistsArray;
      artistsContainer.innerHTML = '';
    }

    const artistsToDisplay = allArtists.slice(offset, offset + limit);
    for (const artist of artistsToDisplay) {
      const card = await createCard(artist);
      artistsContainer.appendChild(card);
    }

    offset += limit;

    if (offset >= allArtists.length) {
      loadMoreBtn?.classList.add('hidden');
      loadMoreBtn?.setAttribute('disabled', true);
    } else {
      loadMoreBtn?.classList.remove('hidden');
      loadMoreBtn?.removeAttribute('disabled');
    }
  } catch (error) {
    alert('Failed to load artists. Please try again later.');
    loadMoreBtn?.classList.add('hidden');
    loadMoreBtn?.setAttribute('disabled', true);
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
