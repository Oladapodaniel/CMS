<template>
  <div class="container-fluid">
    <div class="row flex-column flex-sm-row justify-content-sm-between">
      <div>
        <h2 class="text-head font-weight-bold py-0 my-0 text-black">Continue to payment</h2>
        <div @click="goBack">
          <span class="s-18 fw-400 cursor-pointer text-black">
            <img src="../../../assets/goback.png" alt="" /> Go back</span
          >
        </div>
      </div>
    </div>
    <div class="row justify-content-center mt-4">
      <div class="col-md-6 col-11 bg-gray-600 p-4 border-radius-border-8">
        <h5 class="fw-500 s-20 mb-4">Choose a Payment Gateway</h5>
        <div class="list-group">
          <label
            v-for="(gateway, index) in gateways"
            :key="index"
            class="list-group-item list-group-item-action d-flex align-items-center"
          >
            <img
              :src="gateway.logo"
              alt=""
              class="mr-3"
              style="width: 40px; height: auto"
            />
            <div class="flex-grow-1">{{ gateway.name }}</div>
            <input
              type="radio"
              name="paymentGateway"
              :value="gateway.name"
              v-model="selectedGateway"
              class="ml-auto"
            />
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
// import AlatFaithIcon from "./icons/AlatFaithIcon.vue";
import AlatPay from "./icons/AlatPay.vue";
import FlutterWaveIcon from "./icons/FlutterWaveIcon.vue";
import PaystackIcon from "./icons/PaystackIcon.vue";
import router from "../../../router";

// List of payment gateways with logos and names
const gateways = ref([
  { name: "Alatpay via Transfer", logo: "./icons/alatfaithicon.svg" },
  { name: "Alatpay", logo: AlatPay },
  { name: "Flutterwave", logo: FlutterWaveIcon },
  { name: "Paystack", logo: PaystackIcon },
]);

// Selected gateway
const selectedGateway = ref(null);
const goBack = () => {
  router.go(-1);
};
</script>

<style scoped>
.container {
  max-width: 400px;
}

.list-group-item {
  cursor: pointer;
  border: 1px solid #e9ecef;
  transition: background-color 0.2s;
}

.list-group-item:hover {
  background-color: #f8f9fa;
}
</style>
