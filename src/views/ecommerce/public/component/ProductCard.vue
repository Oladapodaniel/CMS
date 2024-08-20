<template>
  <div class=" p-3 mt-4 bg-white border-radius-10">
    <img :src="image" style="height: 11rem" class="w-100" alt="Product Image" />
    <div class="row">
      <div class="col-md-12 mt-2 mb-1 fw-500">{{ title }}</div>
      <div class="col-md-12">
        <hr class="w-100 my-2" />
      </div>
      <div class="col-md-12"><span class="s-8 fw-400">Product review:</span></div>
      <div class="col-md-12 d-flex justify-content-between">
        <span class="s-12 fw-400">
          <img style="height: 1.5rem" :src="StarBoldIcon" alt="" />{{ review }}</span
        >
       <div class="d-flex align-items-center">
        <img style="height: 1.5rem" :src="truckIcon" alt="" />
        <span class="fw-400 s-11 ml-1">Free Shipping</span>
       </div>
      </div>
      <div class="col-md-12">
        <hr class="w-100 my-2" />
      </div>
      <div class="col-md-12 d-flex justify-content-between align-items-center">
        <div class="text-dak font-weight-600 s-14">{{ price }}</div>
        <div class="d-flex align-items-center">
          <a class="s-10 fw-500 text-dak" @click="addToCart" href="#">Add to Cart</a>
          <span><img style="height: 1.5rem" :src="ShoppingCartIcon" alt="" /></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";
import StarBoldIcon from "../../../../assets/ecommerce/starBoldIcon.png";
import truckIcon from "../../../../assets/ecommerce/Truck.png";
import ShoppingCartIcon from "../../../../assets/ecommerce/ShoppingCartBlack.png";

defineProps({
  image: String,
  title: String,
  review: String,
  price: String,
});
const emit = defineEmits(['add-to-cart']);

const addToCart = (product) => {
  emit('add-to-cart', product);
};
</script>

<style scoped>
.card {
  margin-bottom: 20px;
}
</style>
