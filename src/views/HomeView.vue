<template>
  <div>
    <Movie/>
  </div>
</template>

<script setup>
import { ref, provide } from 'vue';
import Movie from "@/components/Movie.vue";
import NotificationPopup from '@/components/NotificationPopup.vue';

const notificationMessage = ref(null);
const notificationType = ref('success');
const showNotification = ref(false);

function showNotificationPopup(message, type) {
  notificationMessage.value = message;
  notificationType.value = type;
  showNotification.value = true;
}
provide ('showNotification', showNotification);

</script>

<style scoped>

</style>