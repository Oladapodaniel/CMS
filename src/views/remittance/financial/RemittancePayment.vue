<template>
  <div class="container-fluid">
    <div class="row flex-column flex-sm-row justify-content-sm-between">
      <div>
        <h2 class="text-head font-weight-bold py-0 my-0 text-black">
          Remittance Payment
        </h2>
        <div @click="goBack">
          <span class="s-18 fw-400 cursor-pointer text-black">
            <img src="../../../assets/goback.png" alt="" /> Go back</span
          >
        </div>
      </div>
    </div>
    <div class="row mt-4">
      <div class="col-md-12 d-flex justify-content-center">
        <div class="col-md-7 col-11 border-radius-10 bg-gray-600 mt-4 p">
          <!-- Header with month and remittance summary -->
          <div
            class="header primary-bg text-white d-flex align-items-center justify-content-between p-3 my-4"
          >
            <span class="mb-0 s-24 font-weight-600">{{
              formatDate(singleRemittanceData.dateCreated)
            }}</span>
            <span class="fw-400">Remittance summary</span>
          </div>

          <!-- Remittance details -->
          <div class="remittance-details p-4 rounded">
            <div class="mb-4 d-flex text-center">
              <span class="h5"
                >Remittance ID: {{ singleRemittanceData.remittanceID }}</span
              >
              <span class="ml-2">
                <img src="../../../assets/form/copyIcon.png" alt="" />
              </span>
            </div>

            <ul class="list-group">
              <li
                class="list-group-item border-botom d-flex justify-content-between align-items-center"
              >
                Total Collection
                <span>NGN {{ singleRemittanceData.totalCollection }}</span>
              </li>
              <li
                class="list-group-item border-botom d-flex justify-content-between align-items-center"
              >
                Remittable
                <span>NGN {{ singleRemittanceData.totalRemittableAmount }}</span>
              </li>
              <li
                class="list-group-item border-botom d-flex justify-content-between align-items-center"
              >
                Amount Paid
                <span>NGN {{ singleRemittanceData.amountPaid }}</span>
              </li>
              <li
                class="list-group-item border-botom d-flex justify-content-between align-items-center"
              >
                Payment date
                <span>{{ formatDate(singleRemittanceData.lastPaymentDate) }}</span>
              </li>
              <li
                class="list-group-item border-botom d-flex justify-content-between align-items-center"
              >
                Status
                <span>{{ singleRemittanceData.paymentStatus }}</span>
              </li>
              <li
                class="list-group-item border-botom d-flex justify-content-between align-items-center"
              >
                Record status
                <span>{{ singleRemittanceData.recordStatus }}</span>
              </li>
            </ul>

            <!-- Payment buttons -->
            <div class="row">
              <div class="col-md-12">
                <div class="row justify-content-center">
                  <div class="col-md-10 col-11 text-center mt-4">
                    <div
                      class="col-md-12 d-flex flex-column flex-sm-row align-items-center justify-content-center"
                    >
                      <el-button
                        round
                        color="#111111"
                        @click="manualPayment"
                        size="large"
                        class="text-white col-md-6 mr-0 mr-md-2"
                        >Manual Payment</el-button
                      >
                      <el-button
                        color="#FF5906"
                        round
                        size="large"
                        class="mt-3 col-md-6 text-white mt-sm-0"
                        >Pay Online</el-button
                      >
                    </div>

                    <!-- Pay Later link -->
                    <div class="mt-2 col-md-12">
                      or <a href="#" class="fw-400">Pay Later</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <el-dialog
      v-model="showBankDetail"
      title=""
      :width="mdAndUp || lgAndUp || xlAndUp ? `50%` : xsOnly ? `90%` : `70%`"
      align-center
      class="border-radius-20"
    >
      <div class="row">
        <div class="col-md-12 my-3 text-center text-black font-weight-bold s-24">
          Manual Payment info
        </div>
        <div class="col-md-12  my-3  justify-content-center d-flex">
          <div class="col-md-10 border-radius-10 bg-gray-600 py-3">
            <div class="col-md-12 font-weight-bold text-dak">Manual Payment info</div>
            <div class="col-md-12 mt-3 text-dak d-flex justify-content-between">
              <span class="fw-400">Account Name:</span>
              <span class="fw-500">Complustech Limited</span>
            </div>
            <div class="col-md-12 mt-3 text-dak d-flex justify-content-between">
              <span class="fw-400">Account Number:</span>
              <span class="fw-500">0017934252</span>
            </div>
            <div class="col-md-12 mt-3 text-dak d-flex justify-content-between">
              <span class="fw-400">Bank:</span>
              <span class="fw-500">Access</span>
            </div>
            <div class="col-md-12 mt-3 text-dak d-flex justify-content-between">
              <span class="fw-400">Send Prove of Payment to:</span>
              <span class="fw-500">08023739961</span>
            </div>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref } from "vue";
import router from "../../../router";
import axios from "@/gateway/backendapi";
import dateFormatter from "../../../services/dates/dateformatter";
import deviceBreakpoint from "../../../mixins/deviceBreakpoint";

import { useRoute } from "vue-router";

const route = useRoute();
const { mdAndUp, lgAndUp, xlAndUp, xsOnly } = deviceBreakpoint();
const singleRemittanceData = ref({});
const showBankDetail = ref(false)
const goBack = () => {
  router.go(-1);
};

const formatDate = (date) => {
  return dateFormatter.monthDayYear(date);
};
const manualPayment = () => {
  showBankDetail.value = true;
};

const getRemittancebyId = async () => {
  try {
    const { data } = await axios.get(`/api/Remittance/remittance/${route.query.id}`);
    singleRemittanceData.value = data;
    console.log(data, "datahj");
  } catch (error) {
    console.log(error);
  }
};
getRemittancebyId();
</script>

<style scoped>
/* Header styles */
.header {
  border-radius: 8px;
}

/* Remittance details styles */
/* .remittance-details h5 {
  color: #333;
} */

.list-group-item {
  border: none;
  padding: 0.75rem 1.25rem;
  background: none !important;
}

.list-group-item span {
  font-weight: 600;
}

.btn-lg {
  padding: 0.6rem 1.5rem;
}

a {
  color: #000;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}
</style>
