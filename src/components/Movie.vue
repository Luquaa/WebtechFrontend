<template>
  <div>
    <h1>Movies</h1>
    <div v-if="loading">Loading...</div>
    <div v-else-if="error">{{ error }}</div>
    <div v-else class="movies-container">
      <div v-for="movie in movies" :key="movie.id" class="movie-box">
        <img :src="movie.imageUrl" :alt="movie.title"/>
        <h2>{{ movie.title }}</h2>
        <p>{{ movie.description }}</p>
        <button class="add-button" @click="addToWatchlist(movie)">Hinzufügen</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import {ref, onMounted} from 'vue';
import {fetchImages} from '../services/apiService';
import axios from 'axios';

const movies = ref([]);
const loading = ref(false);
const error = ref(null);
const watchlist = ref([]);

const showMovies = async () => {
  loading.value = true;
  error.value = null;
  try {
    movies.value = await fetchImages();
  } catch (err) {
    error.value = 'Failed to load movies';
  } finally {
    loading.value = false;
  }
};

const addToWatchlist = async (movie) => { // Fügen Sie das async Schlüsselwort hinzu
  watchlist.value.push(movie);

  const movieToSave = {
    filmId: movie.id, // Hinzufügen der filmId
    titel: movie.title,
  };

  try {
    await axios.post(`${import.meta.env.VITE_BACKEND_BASE_URL}/watchlist`, movieToSave);
  } catch (err) {
    console.error('Failed to add movie to watchlist:', err);
  }
};


onMounted(() => {
  showMovies();
});
</script>


<style scoped>
.movies-container {
  display: flex;
  flex-wrap: wrap;
}

.movie-box {
  position: relative; /* Hinzugefügt */
  margin: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  width: 200px;
  text-align: center;
  padding-bottom: 50px; /* Hinzugefügt */
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

.add-button {
  position: absolute; /* Hinzugefügt */
  bottom: 5px; /* Hinzugefügt */
  left: 50%; /* Hinzugefügt */
  transform: translateX(-50%);
  background-color: #8be8cb;
  border: none;
  color: #303633;
  padding: 10px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 20px;
  margin: 4px 2px;
  cursor: pointer;
}
</style>