<template>
  <header class="header">
    <div class="header-left">
      <h1>Watchlist.com</h1>
    </div>
    <div class="header-center">
      <nav>
        <button class="button"><RouterLink to="/">Home</RouterLink></button>
        <button class="button"><RouterLink to="/about">About</RouterLink></button>
        <button class="button"><RouterLink to="/watchlist">Watchlist</RouterLink></button>
      </nav>
      <!-- Fügen Sie hier weitere Links zu anderen Views hinzu -->
    </div>
    <div class="header-right">
      <input type="text" placeholder="Search Movies..." v-model="searchQuery">
      <!-- Hier können Sie die Suchfunktionalität implementieren -->
    </div>
  </header>
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Watchlist from "@/components/Watchlist.vue";
</script>

/*
const searchQuery = ref('');
*/

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #303633;
  color: #8be8cb;
  padding: 10px 20px;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 999; /* Stellt sicher, dass der Header über dem restlichen Inhalt liegt */
}

.header-left,
.header-right {
  flex: 1;
}

.header-center {
  flex: 2;
  display: flex;
  justify-content: center;
}

.router-link {
  color: #fff;
  text-decoration: none;
  margin: 0 10px;
}

.button{
  margin-right: 5px;
  background-color: #8be8cb;
  text-align: center;
  color: #303633;
  font-size: 30px;
}
</style>