<template>
  <div>
    <div class="searchbar">
      <input type="text" placeholder="Search Movies..." v-model="searchQuery" @keyup.enter="handleSearch">
    </div>
    <div v-if="searchResults.length">
      <h2 class="searchResults">Search Results:</h2>
      <div class="fix">
        <div class="movies-container">
          <div class="movie-box" v-for="movie in searchResults" :key="movie.id">
            <img :src="`${IMAGE_BASE_URL}${movie.poster_path}`" :alt="movie.title"/>
            <h2>{{ movie.title }}</h2>
            <p>{{ movie.overview }}</p>
            <button class="add-button" @click="addToWatchlist(movie)">Hinzufügen</button>
            <p v-if="showMessage" class="message">Hinzugefügt!</p>
          </div>
        </div>
      </div>
    </div>
    <Movie v-else/>

  </div>
</template>

<script setup>
import {ref} from 'vue';
import {searchMovies} from '@/services/apiService.js';
import Movie from '@/components/Movie.vue'
import axios from 'axios';

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

const searchQuery = ref('');
const searchResults = ref([]);
const showMessage = ref(false);

const handleSearch = async () => {
  if (searchQuery.value.trim()) {
    searchResults.value = await searchMovies(searchQuery.value);
  }
};

const addToWatchlist = async (movie) => {
  const movieToSave = {
    filmId: movie.id,
    titel: movie.title
  };
  try {
    await axios.post(`${import.meta.env.VITE_BACKEND_BASE_URL}/watchlist`, movieToSave);
    showMessage.value = true;
    setTimeout(() => {
      showMessage.value = false;
    }, 2000);
  } catch (err) {
    console.error('Failed to add movie to watchlist:', err);
  }
};
</script>

<style scoped>
.searchbar {
  position: fixed;
  top: 5px;
  right: 0;
  padding: 10px 20px;
  z-index: 999;
}

.searchbar input {
  background-color: #8be8cb;
  border-color: #8be8cb;
  padding: 10px;
}

.movies-container {
  display: flex;
  flex-wrap: wrap;
  margin-top: 40px;
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
  right: 250px;
  top: 15px;
  background-color: #8be8cb;
  color: #303633;
  padding: 8px;
  z-index: 1000;

}

.searchResults {
  margin-top: 100px;
  padding-left: 50px;
  max-width: 300px;
  margin-left: 450px;
}

.fix {
  max-width: 1200px;
  padding-left: 50px;
}
</style>