// src/services/apiService.js
import axios from 'axios';

// Create the axios instance using the base URL and headers from environment variables
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${import.meta.env.VITE_API_KEY}`, // Use the API key from environment variable
  }
});

// Function to fetch movies
export const fetchMovies = async () => {
  const options = {
    method: 'GET',
    url: '/discover/movie', // Use relative URL with apiClient baseURL
    params: {
      include_adult: false,
      include_video: false,
      language: 'en-US',
      page: 1,
      sort_by: 'popularity.desc',
    },
    headers: {
      accept: 'application/json',
    },
  };

  try {
    const response = await apiClient.request(options);
    return response.data;
  } catch (error) {
    console.error('Error fetching movies:', error);
    throw error;
  }
};

// Usage example
fetchMovies().then(data => {
  console.log(data);
}).catch(error => {
  console.error(error);
});
