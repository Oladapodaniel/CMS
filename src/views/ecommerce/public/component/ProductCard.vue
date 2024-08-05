<template>
  <div class="card p-3 mt-4 bg-white border-radius-8">
    <img :src="image" style="height: 11rem" class="w-100" alt="Product Image" />
    <div class="row">
      <div class="col-md-12 mt-2 mb-1  fw-500">{{ title }}</div>
      <div class="col-md-12">
        <hr class="w-100 my-2">
      </div>
      <div class="col-md-12"><span class="s-8 fw-400">Product review:</span></div>
      <div class="col-md-12 s-12 fw-400">{{ review }}</div>
      <div class="col-md-12">
        <hr class="w-100 my-2">
      </div>
      <div class="col-md-12 d-flex justify-content-between">
        <p class="card-text">{{ price }}</p>
        <a href="#">Add to Cart</a>
      </div>
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
