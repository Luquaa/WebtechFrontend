<template>
  <div>
    <h1>Search Results</h1>
    <div v-if="loading">Loading...</div>
    <div v-else-if="error">{{ error }}</div>
    <div v-else class="movies-container">
      <div v-for="movie in movies" :key="movie.id" class="movie-box">
        <img :src="movie.poster" :alt="movie.title" />
        <h2>{{ movie.title }}</h2>
        <p>{{ movie.description }}</p>
        <button class="add-button" @click="addToWatchlistHandler(movie)">Add to Watchlist</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { searchMovies } from '@/services/apiService.js'

const route = useRoute()
const movies = ref([])
const loading = ref(false)
const error = ref(null)

const notificationMessage = ref('')
const notificationType = ref('success')
const showNotification = ref(false)

const fetchSearchResults = async () => {
  loading.value = true
  error.value = null
  try {
    const query = route.query.query;
    movies.value = await searchMovies(query);
  } catch (error) {
    error.value = 'Failed to load search results'
  } finally {
    loading.value = false
  }
}

const addToWatchlist = async (movie) => {
  const result = await addToWatchlist(movie)
  notificationMessage.value = result.message
  notificationType.value = result.success ? 'success' : 'error'
  showNotification.value = true;

  setTimeout(() => {
    showNotification.value = false;
  }, 3000);
};
</script>

<style scoped>
.movies-container {
  display: flex;
  flex-wrap: wrap;}

.movie-box {
  margin: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 200px;
  text-align: center;
}

.movie-box img {
  width: 100%;
height: auto; }

.movie-box h2 {
  margin: 10px 0;
  font-size: 16px;
}
.add-button {
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