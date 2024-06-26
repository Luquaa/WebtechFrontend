<script setup> //lang="ts"
import { RouterLink, RouterView } from 'vue-router'
import Header from "@/components/Header.vue";
import Movie from "@/components/Movie.vue";
import Watchlist from "@/components/Watchlist.vue";
import WatchlistView from "@/views/WatchlistView.vue";

/*
<nav>
    <button class="button"><RouterLink to="/">Home</RouterLink></button>
    <button class="button"><RouterLink to="/about">About</RouterLink></button>
    <button class="button"><RouterLink to="/watchlist">Watchlist</RouterLink></button>
  </nav>
  */

</script>

<template>
  <Header/>
  <RouterView/>
</template>

<style scoped>

.button{
  margin-right: 5px;
  background-color: #9c88ff;
  text-align: center;
}

</style>
