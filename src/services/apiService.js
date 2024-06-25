import axios from 'axios';

const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

export const fetchMovies = async () => {
  const url = `${BASE_URL}/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&api_key=${import.meta.env.VITE_API_KEY}`;
  try {
    const response = await axios.get(url);
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
      description: movie.overview,
    }));
    return images;
  } catch (error) {
    console.error('Error fetching images:', error);
    throw error;
  }
};

export const showMovies = async (filmId) => {
  const url = `${BASE_URL}/movie/${filmId}?api_key=${import.meta.env.VITE_API_KEY}`;
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error('Error fetching movie:', error);
    throw error;
  }
};

export const searchMovies = async () => {
  const url = `${BASE_URL}/search/movie?<query>&api_key=${import.meta.env.VITE_API_KEY}`;
  try {
    const response = await axios.get(url);
    return response.data.results;
  } catch (error) {
    console.error('Error searching movies:', error);
    throw error;
  }
}