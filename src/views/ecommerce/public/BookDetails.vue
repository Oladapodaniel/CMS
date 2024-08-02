<script setup>
import { ref } from "vue";
import Combien from "../../../assets/ecommerce/Combien.png";
import Products from "./component/Products.vue";

const goBack = () => {
  // Logic to navigate back
  window.history.back();
};

const book = ref({
  image: Combien, // replace with actual path
  title: "Combien De Temps?",
  author: "Kyle Corbeett",
  price: "NGN 7,000",
  description:
    "This book is not for the faint of heart. It delves into the darker aspects of human nature and provides strategies for success that can be ruthless at times.",
});

const reviews = ref([
  {
    text:
      "Best Book I have come across so far, I recommend you get own a copy in your Library.",
    author: "Sam Loko",
    rating: 4.5,
  },
  {
    text: "Amazing read, very insightful and engaging.",
    author: "Jane Doe",
    rating: 4.8,
  },
  {
    text: "A must-read for anyone interested in the topic.",
    author: "John Smith",
    rating: 4.7,
  },
  {
    text: "Well-written and informative. Highly recommend!",
    author: "Mary Johnson",
    rating: 4.6,
  },
  {
    text: "An excellent book with valuable information.",
    author: "James Brown",
    rating: 4.5,
  },
  {
    text: "One of the best books I've read this year.",
    author: "Patricia Williams",
    rating: 4.9,
  },
]);
</script>
<template>
  <div class="row">
    <div class="col-md-12 d-flex bg-black-2 py-4">
      <div
        class="d-flex col-md-3 align-items-center justify-content-center mr-2 text-white"
        @click="goBack"
      >
        <el-icon :size="25"><Back /></el-icon>
        <span class="ml-1">Back</span>
      </div>
      <div class="col-md-6 ml-3">
        <el-input
          class="w-100 rounded-border"
          :suffix-icon="Search"
          placeholder="Search items product & services"
          v-model="searchQuery"
          size="large"
        />
      </div>
    </div>
  </div>
  <div class="container-slim mt-4">
    <div class="row">
      <div class="col-md-6">
        <img :src="book.image" alt="Book Image" class="img-fluid rounded" />
      </div>
      <div class="col-md-6">
        <h2 class="font-weight-bold">{{ book.title }}</h2>
        <p>
          <strong>Author</strong>
          <span class="text-muted">{{ book.author }}</span>
        </p>
        <h4 class="font-weight-bold">{{ book.price }}</h4>
        <p>
          <strong>Product Description</strong>
          <span class="text-muted">{{ book.description }}</span>
        </p>
        <div class="d-flex justify-content-between align-items-center mt-4">
          <button class="btn btn-outline-secondary">
            <i class="fas fa-heart"></i> Add to favourite
          </button>
          <button class="btn btn-warning">
            <i class="fas fa-shopping-cart"></i> Add to Cart
          </button>
        </div>
      </div>
    </div>
    <h2 class="fw-500 s-24 mt-5 mb-4">
      Product reviews <span class="text-warning">★</span>
      <span class="s-20 fw-400">4.5</span>
    </h2>
    <div class="row">
      <div v-for="(review, index) in reviews" :key="index" class="col-md-6 mb-4">
        <div class="bg-gray-500 border-radius-8 p-3 col-md-12 h-100">
          <div class="card-body d-flex justify-content-between align-items-center">
            <div>
              <p class="card-text mb-2">{{ review.text }}</p>
              <p class="text-muted mb-0">{{ review.author }}</p>
            </div>
            <div class="d-flex align-items-center">
              <span class="text-warning h4 mb-0 mr-2">★</span>
              <span class="text-dark h5 mb-0">{{ review.rating }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12">
        <Products />
      </div>
    </div>
  </div>
</template>
