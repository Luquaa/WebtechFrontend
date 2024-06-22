<template>
  <div v-if="visible" :class="['notification', type]">
    <p>{{ message }}</p>
  </div>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: 'success'
    },
    message: {
      type: String,
      required: true
    },
    duration: {
      type: Number,
      default: 3000 // Duration in milliseconds
    }
  },
  data() {
    return {
      visible: false
    };
  },
  watch: {
    message(newVal) {
      if (newVal) {
        this.show();
      }
    }
  },
  methods: {
    show() {
      this.visible = true;
      setTimeout(() => {
        this.visible = false;
      }, this.duration);
    }
  }
};
</script>

<style scoped>
.notification {
  position: fixed;
  bottom: 20px;
  right: 20px;
  padding: 10px 20px;
  border-radius: 5px;
  color: white;
  z-index: 1000;
}
.success {
  background-color: green;
}
.error {
  background-color: red;
}
</style>
