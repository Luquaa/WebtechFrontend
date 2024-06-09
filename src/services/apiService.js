// src/services/apiService.js
import axios from 'axios';

const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

console.log('API key:', import.meta.env.VITE_API_KEY);

const HEADERS = {
  accept: 'application/json',
  Authorization: `import.meta.env.VITE_API_KEY`,
};

export const fetchMovies = async () => {
  const url = `${BASE_URL}/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc`;
  try {
    const response = await axios.get(url, { headers: HEADERS });
    return response.data.results;
  } catch (error) {
    console.error('Error fetching movies:', error);
    throw error;
  }
};

export const fetchImages = async () => {
  try {
    const movies = await fetchMovies();
    const images = movies.map(movie => ({
      id: movie.id,
      title: movie.title,
      imageUrl: `${IMAGE_BASE_URL}${movie.poster_path}`,
      description: movie.overview, // Ensure this key exists in the API response
    }));
    return images;
  } catch (error) {
    console.error('Error fetching images:', error);
    throw error;
  }
};
