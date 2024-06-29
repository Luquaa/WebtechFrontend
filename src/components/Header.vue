<template>
  <header class="header">
    <div class="header-left">
      <h1>Build your Watchlist!</h1>
    </div>
    <div class="header-center">
      <nav>
        <button class="button">
          <RouterLink to="/">Home</RouterLink>
        </button>
        <button class="button">
          <RouterLink to="/about">About</RouterLink>
        </button>
        <button class="button">
          <RouterLink to="/watchlist">Watchlist</RouterLink>
        </button>
      </nav>
    </div>
  </header>
</template>


<script setup>
</script>

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
  z-index: 999;
}

.header-left {
  flex: 1;
}

.header-center {
  flex: 2;
  display: flex;
  justify-content: center;
  margin-right: 25%;
}

.button {
  margin-right: 5px;
  background-color: #8be8cb;
  text-align: center;
  color: #303633;
  font-size: 30px;
  border-color: #8be8cb;
  padding-left: 5px;
  padding-right: 5px;
}

.button a {
  text-decoration: none;
}

.button:hover {
  background-color: #303633;
  color: #8be8cb;
}

h1 {
  font-size: 30px;
}
</style>
