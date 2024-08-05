<script setup>
import { ref } from "vue";
import Combien from "../../../assets/ecommerce/Combien.png";
import AudioBookIcon from "../../../assets/ecommerce/audioBookIcon.png";
import Products from "./component/Products.vue";
import { Search } from "@element-plus/icons-vue";

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
        <img
          :src="book.image"
          alt="Book Image"
          style="width: 32rem"
          class="img-fluid rounded"
        />
      </div>
      <div class="col-md-6">
        <div class="col-md-12 d-flex align-items-center justify-content-between">
          <div class="fw-500 s-36 text-dak">{{ book.title }}</div>
          <div class="s-13 fw-400 d-flex align-items-center"><img style="width: 20px" class="mr-1" :src="AudioBookIcon" alt=""><div>AudioBook</div></div>
        </div>
        <div class="col-md-12 mt-3 d-flex justify-content-between">
          <div>
            <div class="fw-400 s-24 text-grey-1">Author</div>
            <span class="s-20 fw-500 text-dak">{{ book.author }}</span>
          </div>
          <h2 class="fw-500 text-dak">{{ book.price }}</h2>
        </div>
        <div class="col-md-12 mt-3">
          <div class="text-grey-1 s-24">Product Description</div>
          <div class="text-dak">{{ book.description }}</div>
        </div>
        <div class="col-md-12 mt-4">
          <div class="row">
            <div class="col-md-12">
              <el-button round class="w-100 py-4">
                Add to favourite <i class="fas fa-heart"></i>
              </el-button>
            </div>
            <div class="col-md-12">
              <el-button
                size="large"
                round
                color="#FF5906"
                class="mt-3 w-100 text-white py-4"
              >
              Add to Cart <i class="fas fa-shopping-cart"></i>
              </el-button>
            </div>
          </div>
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
