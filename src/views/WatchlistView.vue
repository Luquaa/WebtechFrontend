<script setup>
import Watchlist from "@/components/Watchlist.vue";
import {ref, onMounted} from 'vue'


const message = ref('')
const name = ref('')
const isEditing = ref(false) // Neue Variable für den Bearbeitungsstatus

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

  <h3>Hinweis:</h3>
  <p>In der oberen rechten Ecke der Movieboxen ist eine Checkbox,</p>
  <p>mit der du den Film als gesehen markieren kannst.</p>
  <p>Sobald die Checkbox wieder unchecked ist, ist der Film wieder in der Watchlist und du kannst ihn löschen.</p>

  <Watchlist/>
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