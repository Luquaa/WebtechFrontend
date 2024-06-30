<template>
  <div class="info-checkbox-container">
    <span>Möchtest du mehr Information zu den Film anzeigen?</span>
    <input type="checkbox" v-model="showMoreInfo"/>
  </div>
  <div class="searchbar">
    <input type="text" placeholder="Search Watchlist..." v-model="searchQuery" @keyup="filterWatchlist">
  </div>
  <div class="fix">
    <div v-if="watchlist.length === 0">
      Noch keine Filme in der Watchlist!
    </div>
    <div v-else>
      <div class="movies-container">
        <div class="movie-box" v-for="movie in filteredWatchlist" :key="movie.filmId">
          <img :src="movie.poster_path" alt="Movie poster">
          <div class="title-and-checkbox">
            <h2>{{ movie.title }}</h2>
            <input type="checkbox" class="watched-checkbox" @change="markAsWatched(movie)">
          </div>
          <p>{{ movie.overview }}</p>
          <button class="remove-button" @click="removeFromWatchlist(movie)">Entfernen</button>
          <div v-if="showMoreInfo">
            <h3>Mehr Informationen:</h3>
            <p class="info-label">Veröffentlichungsdatum:</p>
            <p>{{ movie.release_date }}</p>
            <p class="info-label">Durchschnittliche Bewertung:</p>
            <p>{{ movie.vote_average }}</p>
            <p class="info-label">Anzahl der Bewertungen:</p>
            <p>{{ movie.vote_count }}</p>
            <p class="info-label">Budget:</p>
            <p v-if="movie.budget === 0">not available</p>
            <p v-else>{{ movie.budget }}$</p>
            <p class="info-label">Genre:</p>
            <p>{{ movie.genre }}</p>
          </div>
        </div>
      </div>
    </div>
    <h2 v-if="watchedMovies.length">Bereits angeschaut:</h2>
    <div class="movies-container" v-if="watchedMovies.length">
      <div class="movie-box" v-for="movie in watchedMovies" :key="movie.id">
        <img :src="`${IMAGE_BASE_URL}${movie.poster_path}`" alt="Movie poster">
        <div class="title-and-checkbox">
          <h2>{{ movie.titel }}</h2>
          <input type="checkbox" class="watched-checkbox" :checked="isMovieWatched(movie)"
                 @change="toggleWatched(movie)">
        </div>
        <p>{{ movie.overview }}</p>
        <div v-if="showMoreInfo">
          <h3>Mehr Informationen:</h3>
          <p class="info-label">Veröffentlichungsdatum:</p>
          <p>{{ movie.release_date }}</p>
          <p class="info-label">Durchschnittliche Bewertung:</p>
          <p>{{ movie.vote_average }}</p>
          <p class="info-label">Anzahl der Bewertungen:</p>
          <p>{{ movie.vote_count }}</p>
          <p class="info-label">Budget:</p>
          <p v-if="movie.budget === 0">not available</p>
          <p v-else>{{ movie.budget }}$</p>
          <p class="info-label">Genre:</p>
          <p>{{ movie.genre }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {ref, onMounted, computed, watch} from 'vue'
import axios from "axios";
import {showMovies} from "@/services/apiService.js";

const watchlist = ref([]);
const watchedMovies = ref([]);
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';
const showMoreInfo = ref(false);
const searchQuery = ref('');
const filteredWatchlist = ref([]);

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
      movie.release_date = movieDetails.release_date;
      movie.vote_average = movieDetails.vote_average;
      movie.vote_count = movieDetails.vote_count;
      movie.budget = movieDetails.budget;
      movie.genre = movieDetails.genres.map(genre => genre.name).join(', ');
    }
  } catch (error) {
    console.log(error);
  }

  const watchedMoviesFromStorage = localStorage.getItem('watchedMovies');
  if (watchedMoviesFromStorage) {
    watchedMovies.value = JSON.parse(watchedMoviesFromStorage);
  }
});


const removeFromWatchlist = async (movie) => {
  const index = watchlist.value.indexOf(movie);
  if (index !== -1) {
    const movieToRemove = watchlist.value.splice(index, 1)[0];

    try {
      await axios.delete(`${import.meta.env.VITE_BACKEND_BASE_URL}/watchlist/${movieToRemove.id}`);
    } catch (err) {
      console.error('Failed to remove movie from watchlist:', err);
    }
  }
};

const markAsWatched = (movie) => {
  watchedMovies.value.push(movie);
  watchlist.value = watchlist.value.filter(m => m.filmId !== movie.filmId);

  localStorage.setItem('watchedMovies', JSON.stringify(watchedMovies.value));
};

const isMovieWatched = (movie) => {
  return watchedMovies.value.some(watchedMovie => watchedMovie.filmId === movie.filmId);
};

const unwatchedMovies = computed(() => {
  return watchlist.value.filter(movie => !isMovieWatched(movie));
});

const toggleWatched = (movie) => {
  if (isMovieWatched(movie)) {
    removeFromWatched(movie);
  } else {
    markAsWatched(movie);
  }
};

const removeFromWatched = (movie) => {
  const index = watchedMovies.value.findIndex(watchedMovie => watchedMovie.filmId === movie.filmId);
  if (index !== -1) {
    watchedMovies.value.splice(index, 1);

    if (!watchlist.value.some(w => w.filmId === movie.filmId)) {
      watchlist.value.push(movie);
    }
    localStorage.setItem('watchedMovies', JSON.stringify(watchedMovies.value));
  }
};

const filterWatchlist = () => {
  if (searchQuery.value.trim()) {
    filteredWatchlist.value = unwatchedMovies.value.filter(movie => movie.title.toLowerCase().includes(searchQuery.value.toLowerCase()));
  } else {
    filteredWatchlist.value = unwatchedMovies.value;
  }
};

watch([unwatchedMovies], () => {
  filterWatchlist();
});
</script>


<style scoped>
.movies-container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

.movie-box {
  position: relative;
  margin: 10px;
  padding-top: 10px;
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
  padding: 10px;
}

.movie-box h2 {
  font-size: 16px;
  margin: 10px 0;
}

.movie-box p {
  font-size: 14px;
  color: #555;
  padding-left: 10px;
  padding-right: 10px;
  padding-bottom: 10px;
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

.watched-checkbox {
  position: absolute;
  top: 0;
  right: 0;
}

.info-checkbox-container {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
}

h2 {
  margin-top: 20px;
}

.fix {
  max-width: 1200px;
  padding-left: 50px;
}

.info-label {
  color: #8be8cb;
  font-weight: bold;
  background-color: #8be8cb;
  box-shadow: 0px 10px 20px rgba(48, 54, 51, 0.2);
  border-radius: 10px;
}

.searchbar {
  box-shadow: 0px 10px 20px rgba(48, 54, 51, 0.2);
  margin: 10px;
  background-color: #8be8cb;
  border-color: #8be8cb;
}
</style>