<template>
  <div>
    <h1>Movies</h1>
    <div v-if="loading">Loading...</div>
    <div v-else-if="error">{{ error }}</div>
    <div v-else>
      <div v-for="movie in movies" :key="movie.id" class="movie">
        <h2>{{ movie.title }}</h2>
        <p>{{ movie.description }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { fetchMovies } from '../services/apiService';

const movies = ref([]);
const loading = ref(false);
const error = ref(null);

const showMovies = async () => {
  loading.value = true;
  error.value = null;
  try {
    movies.value = await fetchMovies();
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
.movie {
  margin-bottom: 20px;
}
</style>
