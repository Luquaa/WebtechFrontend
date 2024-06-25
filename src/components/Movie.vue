<template>
  <div>
    <h1>Movies</h1>
    <div v-if="loading">Loading...</div>
    <div v-else-if="error">{{ error }}</div>
    <div v-else class="movies-container">
      <div v-for="movie in movies" :key="movie.id" class="movie-box">
        <img :src="movie.imageUrl" :alt="movie.title" />
        <h2>{{ movie.title }}</h2>
        <p>{{ movie.description }}</p>
        <button class="add-button" @click="addToWatchlistHandler(movie)">Hinzufügen</button>
      </div>
    </div>
    <NotificationPopup
      :type="notificationType"
      :message="notificationMessage"
      v-if="showNotification"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { fetchImages } from '../services/apiService';
import {addToWatchlist} from '@/services/watchlistService.js';
import NotificationPopup from '@/components/NotificationPopup.vue';

const movies = ref([])
const loading = ref(false)
const error = ref(null)
const watchlist = ref([])

const notificationMessage = ref('')
const notificationType = ref('success')
const showNotification = ref(false)

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

const addToWatchlistHandler = async (movie) => {
  const result = await addToWatchlist(movie);
  notificationMessage.value = result.message;
  notificationType.value = result.success ? 'success' : 'error';
  showNotification.value = true;

  if (result.success) {
    watchlist.value.push(movie);
  }

  setTimeout(() => {
    showNotification.value = false;
  }, 3000);
};

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
  position: relative; /* Added */
  margin: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  width: 200px;
  text-align: center;
  padding-bottom: 50px; /* Added */
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
  position: absolute; /* Added */
  bottom: 5px; /* Added */
  left: 50%; /* Added */
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
