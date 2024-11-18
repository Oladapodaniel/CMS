<!-- HeaderSection.vue -->
<template>
  <header class="header col-md-12 bg-dark text-white py-5">
    <div class="row justify-content-center">
      <div class="col-md-5 col-11">
        <h1 class="s-36">{{ title }}</h1>
        <p>{{ subtitle }}</p>
      </div>
    </div>
  </header>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
  subtitle: {
    type: String,
    required: true,
  },
});
</script>

<style scoped>
.header {
  background-color: #12091c !important; /* Adjust background color as needed */
  color: white; /* Adjust text color as needed */
}
</style>
