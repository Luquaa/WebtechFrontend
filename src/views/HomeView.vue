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
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { fetchImages } from '../services/apiService';

const movies = ref([]);
const loading = ref(false);
const error = ref(null);

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
  margin: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  width: 200px;
  text-align: center;
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
</style>