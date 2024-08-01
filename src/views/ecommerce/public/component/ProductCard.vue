<template>
  <div class="card">
    <img :src="image" class="card-img-top" alt="Product Image" />
    <div class="card-body">
      <h5 class="card-title">{{ title }}</h5>
      <p class="card-text">Product review: {{ review }}</p>
      <p class="card-text">{{ price }}</p>
      <a href="#" class="btn btn-primary">Add to Cart</a>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from "vue";

defineProps({
  image: String,
  title: String,
  review: String,
  price: String,
});
</script>

<style scoped>
.card {
  margin-bottom: 20px;
}
</style>
