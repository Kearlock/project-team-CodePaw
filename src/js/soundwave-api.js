import axios from 'axios';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

// 🔄 Лоадер
function showLoader() {
    document.body.classList.add('loading');
}

function hideLoader() {
    document.body.classList.remove('loading');
}

// 📦 Axios instance
const api = axios.create({
    baseURL: 'https://sound-wave.b.goit.study/api',
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use(
    config => {
        showLoader();
        return config;
    },
    error => {
        hideLoader();
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    response => {
        hideLoader();
        return response;
    },
    error => {
        hideLoader();
        iziToast.error({
            title: 'Помилка',
            message: 'Сталася помилка при запиті до сервера. Спробуйте ще раз.',
            position: 'topRight',
        });
        return Promise.reject(error);
    }
);

// ✅ Експортовані функції
export async function fetchArtists() {
    const response = await api.get('/artists');
    return response.data;
}

export async function fetchArtistById(id) {
    const response = await api.get(`/artists/${id}`);
    return response.data;
}

export async function fetchReviews() {
    const response = await api.get('/reviews');
    return response.data;
}