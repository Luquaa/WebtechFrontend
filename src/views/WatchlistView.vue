<script setup>
import Watchlist from "@/components/Watchlist.vue";
import {ref, onMounted} from 'vue'
import axios from "axios";

const message = ref('')
const name = ref('')
const isEditing = ref(false) // Neue Variable für den Bearbeitungsstatus
const watchlist = ref([]); // Neue Referenz für die Watchlist-Daten

// Abrufen der gespeicherten Werte beim Laden der Seite
onMounted(async () => {

  const savedName = localStorage.getItem('savedName');
  const savedMessage = localStorage.getItem('savedMessage');

  if (savedName) {
    name.value = savedName;
  }

  if (savedMessage) {
    message.value = savedMessage;
  }

  try {
    const response = await axios.get(`${import.meta.env.VITE_BACKEND_BASE_URL}/watchlist`);
    watchlist.value = response.data;
  } catch (error) {
    console.log(error);
  }
});

const save = () => {
  console.log('save function called')
  console.log(name.value, message.value)
  localStorage.setItem('savedName', name.value);
  localStorage.setItem('savedMessage', message.value);
}

const toggleEditing = () => {
  isEditing.value = !isEditing.value
}

</script>

<template>
  <div id="description">
    Name: {{ name }}
    <br>
    <input v-if="isEditing" v-model="name" placeholder="der Name deiner Liste" @keyup.enter="save()"/>
    <br>
    <span>Description:</span>
    <p style="white-space: pre-line;">{{ message }}</p>
    <br>
    <textarea v-if="isEditing" v-model="message" placeholder="füge deine Beschreibung hinzu"
              @keyup.enter="save()"></textarea>
  </div>
  <button type="button" @click="save()">Save</button>
  <button type="button" @click="toggleEditing()">Edit</button>

  <Watchlist :movies="watchlist"/>
</template>

<style scoped>
#description {
  width: 700px;
  border: #000000;
  background-color: #ebe4d4;
  padding: 10px;
  margin-top: 100px;
}
</style>