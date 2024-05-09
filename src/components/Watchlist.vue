<template>
  <h3>Deine Watchlist!</h3>
  <ul id="list" class="list">
    <li v-for="movie in movies":key="movie.id">
      {{movie.name}} <span>min{{movie.length}}</span>
      <bu class="delete-btn">X</bu>
    </li>
  </ul>
</template>

<script setup>
/*
import { defineProps } from 'vue';

const props = defineProps({
  movies: {
    type: Array,
    required: true,
  },
});*/

import {ref} from "vue";

const movies =  ref([
  {id: 1, name: 'Interstellar', length: 169},
  {id: 2, name: 'Marley und Ich', length: 120},
  {id: 3, name: 'No Time to Die', length: 163},
  {id: 4, name: 'Skyfall', length: 143}
]);
</script>

<style scoped>
/*
h3{
  font-size: 30px;
  color: #5f5566;
  text-align: center;
  margin: 5px;
  text-shadow: #282828;
}

li{
  font-size: 20px;
  color: #5f5566;
  text-align: left;
  margin: 5px;
}

ul{
  text-align: center;
}*/

</style>