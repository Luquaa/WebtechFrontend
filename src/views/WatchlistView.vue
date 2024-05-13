<script setup>
import Watchlist from "@/components/Watchlist.vue";
import { ref } from 'vue'

const message = ref('')
const name = ref('')

const save = () => {
  // Speichern des Namens und der Nachricht im lokalen Speicher
  localStorage.setItem('savedName', name.value);
  localStorage.setItem('savedMessage', message.value);
}

</script>

<template>
    <div id="description">
      Name: {{ name }}
      <br>
      <input v-model="name" placeholder="der Name deiner Liste" @keyup.enter="save()" />
      <br>
      <span>Description:</span>
      <p style="white-space: pre-line;">{{ savedMessage }}</p>
      <br>
      <textarea v-model="message" placeholder="füge deine Beschreibung hinzu" @keyup.enter="save()"></textarea>
    </div>
  <button type="button" @click="save()">Save</button>

  <Watchlist movies="movie"/>
</template>

<style scoped>
#description{
  width: 700px;
  border: #000000 ;
  background-color: #ebe4d4;
  padding: 10px;
  margin-top: 100px;
}
</style>