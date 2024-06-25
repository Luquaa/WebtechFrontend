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
    }
  },
  watch: {
    message(newVal) {
      if (newVal) {
        this.show()
      }
    }
  },
  methods: {
    show() {
      console.log('showing notification', this.message, this.type)
      this.visible = true
      console.log('visible', this.visible)
      setTimeout(() => {
        this.visible = false
      }, this.duration)
    }
  }
}
const show = () => {
  visible.value = true
  setTimeout(() => {
    visible.value = false
  }, 3000)
}

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
  border: 1px solid black;
}

.success {
  background-color: green;
}

.error {
  background-color: red;
}
</style>
