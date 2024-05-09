<script setup> //lang="ts"
import { RouterLink, RouterView } from 'vue-router'
import Header from "@/components/Header.vue";
import Movie from "@/components/Movie.vue";
import Watchlist from "@/components/Watchlist.vue";
import WatchlistView from "@/views/WatchlistView.vue";


</script>

<template>
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
        <RouterLink to="/watchlist">Watchlist</RouterLink>
      </nav>
  <RouterView/>
</template>

<style scoped>
RouterView{
  margin: 15px;
}
</style>
