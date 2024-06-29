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
        <div class="hinweis">
          <p v-if="showMessage" class="message">Hinzugefügt!</p>
          <h3>Hinweis:</h3>
          <p>Auf dieser Seite werden nur die aktuellsten Filme angezeigt, wenn du einen speziellen
            Film suchen möchtest probier die Searchbar aus!</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {ref, onMounted} from 'vue'
import {fetchImages} from '../services/apiService'
import axios from 'axios'

const movies = ref([])
const loading = ref(false)
const error = ref(null)
const watchlist = ref([])
const showMessage = ref(false);

const showMovies = async () => {
  loading.value = true
  error.value = null
  try {
    movies.value = await fetchImages()
  } catch (err) {
    error.value = 'Failed to load movies'
  } finally {
    loading.value = false
  }
}
const addToWatchlist = async (movie) => {
  watchlist.value.push(movie)
  const movieToSave = {
    filmId: movie.id,
    titel: movie.title
  }
  try {
    await axios.post(`${import.meta.env.VITE_BACKEND_BASE_URL}/watchlist`, movieToSave);
    showMessage.value = true;
    setTimeout(() => {
      showMessage.value = false;
    }, 2000);
  } catch (err) {
    console.error('Failed to add movie to watchlist:', err);
  }
}

onMounted(() => {
  showMovies()
})
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
  box-shadow: 0px 10px 20px rgba(48, 54, 51, 0.2);
  border-radius: 3px;
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
  padding-bottom: 10px;
}

.add-button {
  position: absolute;
  bottom: 5px;
  left: 50%;
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

.message {
  position: fixed;
  right: 35px;
  top: 85px;
  background-color: #8be8cb;
  color: #303633;
  padding: 10px;
  text-align: center;
  z-index: 1000;
}

.hinweis {
  position: fixed;
  max-width: 150px;
  right: 10px;
  top: 120px;
  background-color: #ebe4d4;
  padding: 80px 0;
  margin-top: 20px;
}
</style>
