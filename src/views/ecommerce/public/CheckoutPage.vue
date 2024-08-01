<script setup>
import { ref, computed } from "vue";

// Dummy data for cart items
const cartItems = ref([
  {
    id: 1,
    title: "Rediscovering Emily",
    price: 15000,
    quantity: 1,
  },
  {
    id: 2,
    title: "Rediscovering Emily",
    price: 15000,
    quantity: 1,
  },
  {
    id: 3,
    title: "Rediscovering Emily",
    price: 15000,
    quantity: 1,
  },
]);

const orderTotal = computed(() => {
  return (
    cartItems.value.reduce((acc, item) => acc + item.price * item.quantity, 0) + 1000
  );
});

const goBack = () => {
  // Logic to navigate back
  window.history.back();
};

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
  <div class="container-slim my-5 ">
    <h2>Checkout</h2>
    <div class="row mt-3">
      <div class="col-md-8">
        <div class="card bg-gray-500 p-5 mb-3">
          <label class="fw-400 s-24">Shipping Address</label>
          <el-input
            type="text"
            class="w-100 mb-3"
            placeholder="No 40, co-op Estate Lagos Nigeria"
          />

          <div class="s-24 fw-400 mt-4">Payment Information</div>
          <div class="d-flex px-0 mb-3">
            <img
              src="../../../assets/gatewayicon.png"
              alt="Mastercard"
              class=" w-50"
            />
          </div>

          <div class="form-group mt-3">
            <label for="cardName" class="font-weight-600">Name on Card</label>
            <el-input type="text" class="w-100" placeholder="Name" />
          </div>
          <div class="form-group mt-2">
            <label for="cardNumber" class="font-weight-600">Card Number</label>
            <el-input
              type="text"
              class="w-100"
              placeholder="9858 25452 25452 25452"
            />
          </div>
          <div class="form-row mt-2">
            <div class="form-group col-md-6">
              <label for="expiration" class="font-weight-600">Expiration</label>
              <el-input
                type="text"
                class="w-100"
                placeholder="24/05"
              />
            </div>
            <div class="form-group col-md-6">
              <label for="cvv" class="font-weight-600">CVV</label>
              <el-input type="text" id="cvv" class="w-100" placeholder="123" />
            </div>
          </div>

          <div class="row mt-4">
            <div class="col-md-12 d-flex justify-content-center">
                <div class="col-md-6">
                    <el-button round size="large" color="#FF5906" class="text-white w-100 py-4">Confirm payment</el-button>
                </div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-md-4">
        <div class="card w-100 bg-gray-500 mb-3">
          <div class="p-4">
            <h4>Order summary</h4>
            <div
              v-for="item in cartItems"
              :key="item.id"
              class="d-flex justify-content-between align-items-center mb-2"
            >
              <div>
                <p class="mb-0 fw-500">{{ item.quantity }}x {{ item.title }}</p>
              </div>
              <div class="d-flex">
                <p class="mb-0 fw-400">NGN {{ item.price }}</p>
                <span class="text-danger"><el-icon :size="20"><Delete /></el-icon></span>
              </div>
            </div>
          </div>
          <hr />
          <div class="px-4">
            <div class="d-flex justify-content-between">
              <p class="mb-0 fw-500">Delivery</p>
              <p class="mb-0 fw-400">NGN 1,000</p>
            </div>
            <div class="d-flex justify-content-between">
              <p class="mb-0 fw-500">Discount</p>
              <p class="mb-0 fw-400">NGN 0</p>
            </div>
          </div>
          <hr />
          <div class="px-4">
            <div class="d-flex justify-content-between font-weight-bold pb-3">
              <span>Order Total</span>
              <span>NGN {{ orderTotal }}</span>
            </div>
            <div class="d-flex align-items-cen">
              <div>
                <el-input type="text" class="w-100 mb-2" placeholder="Coupon" />
              </div>
              <div class="ml-2">
                <el-button  size="large" class="text-white bg-black-2 py-3">Apply</el-button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card {
  border: 1px solid #e0e0e0;
  border-radius: 8px;
}
</style>
