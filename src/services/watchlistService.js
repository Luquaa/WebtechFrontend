import axios from 'axios';

export const addToWatchlist = async (movie) => {
  const movieToSave = {
    filmId: movie.id,
    title: movie.title,
  };

  try {
    const response = await axios.post(`${import.meta.env.VITE_BACKEND_BASE_URL}/watchlist`, movieToSave);

    if (response.status === 200) {
      return { success: true, message: 'Movie added to watchlist' };
    } else if (response.status === 409) {
      return { success: false, message: 'Movie already in watchlist' };
    }
  } catch (error) {
    console.error('Failed to add movie to watchlist:', error.message);
    return { success: false, message: 'Failed to add movie to watchlist' };
  }
};
