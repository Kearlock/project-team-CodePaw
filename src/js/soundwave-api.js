import axios from 'axios';

const api = axios.create({
    baseURL: 'https://sound-wave.b.goit.study/api-docs/',
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.response.use(
    response => response,
    error => {
        alert('Сталася помилка при запиті до сервера. Спробуйте ще раз.');
        return Promise.reject(error);
    }
);

/**
 * Отримує список артистів з пагінацією.
 * @param {number} page - Номер сторінки (починається з 1).
 * @param {number} limit - Кількість артистів на сторінку.
 * @returns {Promise<Object>} Дані артистів.
 */
export async function fetchArtists(page = 1, limit = 8) {
    try {
        // Передаємо параметри запиту через query params
        const response = await api.get('/artists', {
            params: {
                page,
                limit,
            },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}

export async function fetchArtistById(id) {
    try {
        const response = await api.get(`/artists/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export async function fetchReviews() {
    try {
        const response = await api.get('/reviews');
        return response.data;
    } catch (error) {
        throw error;
    }
}