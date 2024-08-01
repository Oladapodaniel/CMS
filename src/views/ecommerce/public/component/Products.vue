<template>
  <div class="container">
    <h2>People also View</h2>
    <div class="row">
      <div class="col-md-3" v-for="product in products" :key="product.id">
        <ProductCard
          :image="product.image"
          :title="product.title"
          :review="product.review"
          :price="product.price"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import ProductCard from "./ProductCard.vue";

const products = ref([
  {
    id: 1,
    image: "path_to_image",
    title: "48 Laws of Power",
    review: "4.5 stars",
    price: "₦3,000,000",
  },
  {
    id: 2,
    image: "path_to_image",
    title: "48 Laws of Power",
    review: "4.5 stars",
    price: "₦3,000,000",
  },
  // Add more products here
]);
</script>

<style>
.container {
  margin-top: 20px;
}
</style>
