<template>
  <h3>Deine Watchlist!</h3>
  <div class="movies-container">
    <div class="movie-box" v-for="movie in watchlist" :key="movie.filmId">
      <h2>{{ movie.title }}</h2>
      <img :src="movie.poster_path" alt="Movie poster">
      <p>{{ movie.overview }}</p>
      <button class="remove-button" @click="removeFromWatchlist(movie)">Entfernen</button> <!-- Button innerhalb der movie-box div -->
    </div>
  </div>
</template>

<script setup>
import {ref, onMounted} from 'vue'
import axios from "axios";
import { showMovies } from "@/services/apiService.js";

const watchlist = ref([]); // Neue Referenz für die Watchlist-Daten
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

// Abrufen der Watchlist-Daten beim Laden der Seite
onMounted(async () => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_BACKEND_BASE_URL}/watchlist`);
    watchlist.value = response.data;
    for (let movie of watchlist.value) {
      const movieDetails = await showMovies(movie.filmId);
      movie.title = movieDetails.title;
      movie.poster_path = `${IMAGE_BASE_URL}${movieDetails.poster_path}`;
      movie.overview = movieDetails.overview;
    }
  } catch (error) {
    console.log(error);
  }
});

const removeFromWatchlist = async (movie) => {
  const index = watchlist.value.indexOf(movie);
  if (index !== -1) {
    const movieToRemove = watchlist.value.splice(index, 1)[0];

    try {
      // Verwenden Sie movieToRemove.id anstelle von movie.filmId
      await axios.delete(`${import.meta.env.VITE_BACKEND_BASE_URL}/watchlist/${movieToRemove.id}`);
    } catch (err) {
      console.error('Failed to remove movie from watchlist:', err);
    }
  }
};
</script>


<style scoped>
.movies-container {
  display: flex;
  flex-wrap: wrap;
}

.movie-box {
  position: relative;
  margin: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  width: 200px;
  text-align: center;
  padding-bottom: 50px;
}

.movie-box img {
  max-width: 100%;
  height: auto;
}

.movie-box h2 {
  font-size: 16px;
  margin: 10px 0;
}

.movie-box p {
  font-size: 14px;
  color: #555;
}

.remove-button {
  position: absolute;
  bottom: 5px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #f8d7da;
  border: none;
  color: #721c24;
  padding: 10px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 20px;
  margin: 4px 2px;
  cursor: pointer;
}
</style>