<script setup>
import { ref } from "vue";
import ProductCard from "./ProductCard.vue";
import ProductOneIcon from "../../../../assets/ecommerce/Temps.png";

const products = ref([
  {
    id: 1,
    image: ProductOneIcon,
    title: "48 Laws of Power",
    review: "4.5 stars",
    price: "₦3,000,000",
  },
  {
    id: 2,
    image: ProductOneIcon,
    title: "48 Laws of Power",
    review: "4.5 stars",
    price: "₦3,000,000",
  },
  {
    id: 3,
    image: ProductOneIcon,
    title: "48 Laws of Power",
    review: "4.5 stars",
    price: "₦3,000,000",
  },
  {
    id: 4,
    image: ProductOneIcon,
    title: "48 Laws of Power",
    review: "4.5 stars",
    price: "₦3,000,000",
  },
  // Add more products here
]);
</script>

<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-12 p-5 bg-gray-500 border-radius-8">
        <div class="s-22 font-weight-600">People also View</div>
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
    </div>
  </div>
</template>

<style>
.container {
  margin-top: 20px;
}
</style>
