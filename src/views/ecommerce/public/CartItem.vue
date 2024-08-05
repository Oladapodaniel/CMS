<script setup>
import { ref, computed } from "vue";
import BkDellIcon from "../../../assets/ecommerce/BKDell.png";
import HindsightIcon from "../../../assets/ecommerce/HindSight.png";
import TempsIcon from "../../../assets/ecommerce/Temps.png";
import { Search } from "@element-plus/icons-vue";

// Dummy data for cart items
const cartItems = ref([
  {
    id: 1,
    title: "Rediscovering Emily",
    image: BkDellIcon,
    price: 15000,
    quantity: 1,
  },
  {
    id: 2,
    title: "Hindsight 2020",
    image: HindsightIcon,
    price: 15000,
    quantity: 1,
  },
  {
    id: 3,
    title: "Can’t Hurt Me",
    image: TempsIcon,
    price: 15000,
    quantity: 1,
  },
]);

const searchQuery = ref('');

const increment = (item) => {
  item.quantity++;
};

const decrement = (item) => {
  if (item.quantity > 1) {
    item.quantity--;
  }
};

const goBack = () => {
  // Logic to navigate back
  window.history.back();
};

const removeItem = (id) => {
  cartItems.value = cartItems.value.filter((item) => item.id !== id);
};

const subtotal = computed(() => {
  return cartItems.value.reduce((acc, item) => acc + item.price * item.quantity, 0);
});
</script>
<template>
  <div class="row">
    <div class="col-md-12 d-flex bg-black-2 py-4">
      <div class="d-flex col-md-3 align-items-center justify-content-center  mr-2 text-white" @click="goBack">
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
  <div class="container my-5">
    <h2>My Cart</h2>
    <div class="card p-4 mt-3 bg-gray-500 mb-3" v-for="item in cartItems" :key="item.id">
      <div class="row no-gutters align-items-center">
        <div class="col-md-2">
          <img :src="item.image" class="card-img" alt="" />
        </div>
        <div class="col-md-6">
          <div class="card-body">
            <h5 class="card-title fw-500 s-24">{{ item.title }}</h5>
            <p class="card-text fw-400 s-24">
              <img src="../../../assets/ecommerce/audioBookIcon.png" alt="" /> AudioBook
            </p>
            <div class="input-group col-md-12 align-items-center">
              <div class="fw-400 s-24 mr-1">Quantity</div>
              <div
                class="input-group-prepend cursor-pointer p-2"
                @click="increment(item)"
              >
                <div>+</div>
              </div>
              <div>
                <div class="border rounded px-3 py-2 mx-2">{{ item.quantity }}</div>
              </div>
              <div
                class="input-group-prepend cursor-pointer p-2"
                @click="decrement(item)"
              >
                <div>-</div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-4 d-flex flex-column align-items-end justify-content-between">
          <div class="cursor-pointer text-danger" @click="removeItem(item.id)">
            <el-icon :size="20"><Delete /></el-icon>
          </div>
          <div class="mt-5">
            <p class="mb-0">
              <span class="s-32 fw-500 text-dak">NGN {{ item.price }}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12 d-flex justify-content-center">
        <div
          class="col-md-4 bg-gray-500 d-flex justify-content-center align-items-center border-radius-border-8 py-3 my-4"
        >
          <h4 class="mt-2">SubTotal : NGN {{ subtotal }}</h4>
        </div>
      </div>
      <div class="col-md-12 d-flex justify-content-center">
        <div class="col-md-4 px-0">
          <router-link to="/store/checkout">
            <el-button round color="#FF5906" class="w-100 py-4 text-white"
            >Checkout</el-button
          >
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card-img {
  max-width: 100%;
  height: auto;
}

.quantity-group {
  max-width: 150px;
}
.card-text img {
  height: 2.2rem;
  width: 2.2rem;
}

.rounded-border div .el-input__wrapper{
  padding: 6px 11px !important;
  background: #FCFCFC !important;
  border-radius: 60px !important;
  box-shadow: none !important;
}
</style>
