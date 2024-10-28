<template>
  <div class="container-fluid">
    <!-- Header -->
    <div class="row flex-column flex-sm-row justify-content-sm-between">
      <div>
        <h2 class="text-head font-weight-bold py-0 my-0 text-black">Remittance Info</h2>
        <div @click="goBack">
          <span class="s-18 fw-400 cursor-pointer text-black">
            <img src="../../../assets/goback.png" alt="" /> Go back</span
          >
        </div>
      </div>
      <div class="col-md-12 d-flex justify-content-end">
        <div class="d-flex">
          <span class="s-20 font-weigth-600"
            >Remittance ID: {{ singleRemittanceData.remittanceCode }}</span
          >
          <span>
            <img src="../../../assets/form/copyIcon.png" alt="" />
          </span>
        </div>
      </div>
    </div>
    <!-- Summary Information -->
    <div class="col-md-12 mt-4 px-0 border-radius-10 border-no-radius">
      <div class="car p-4">
        <div class="row text-center">
          <div class="col">
            <p class="fw-400">Period</p>
            <div class="s-20 font-weight-600">
              {{ singleRemittanceData.periodMonth }} {{ singleRemittanceData.periodYear }}
            </div>
          </div>
          <div class="col br-left border-none">
            <p class="fw-400">Remittable</p>
            <div class="s-20 font-weight-600">
              NGN
              {{ Math.abs(singleRemittanceData.totalRemittableAmount).toLocaleString() }}
            </div>
          </div>
          <div class="col br-left border-none">
            <p class="fw-400">Amount Paid</p>
            <div class="s-20 font-weight-600">
              NGN {{ Math.abs(singleRemittanceData.amountPaid).toLocaleString() }}
            </div>
          </div>
          <div class="col br-left border-none">
            <p class="fw-400">Payment date</p>
            <div class="s-20 font-weight-600">
              {{ formatDate(singleRemittanceData.lastPaymentDate) }}
            </div>
          </div>
          <div class="col br-left border-none">
            <p class="fw-400">Status</p>
            <div class="s-20 font-weight-600">
              {{ paymentStatus[singleRemittanceData.paymentStatus] }}
            </div>
          </div>
          <div class="col br-left border-none">
            <p class="fw-400">Record Status</p>
            <h6 class="s-20 font-weight-600">
              {{ recordStatus[singleRemittanceData.recordStatus] }}
            </h6>
          </div>
        </div>
      </div>

      <!-- Income Table -->
      <div class="income-table table-container px-0 mx-0 table-responsive">
        <table class="table shadow-none">
          <thead class="mb-5">
            <tr class="table-header grey-backg mb-3">
              <th scope="col">Income Item</th>
              <th scope="col">Amount</th>
              <th scope="col">Remittable Amount</th>
              <th scope="col">Net Amount</th>
              <!-- <th scope="col"></th> -->
            </tr>
          </thead>
          <tbody class="grey-backg mt-2">
            <tr v-for="(item, index) in remittanceItems" :key="index">
              <td>
                <div>
                  <el-input
                    type="text"
                    disabled
                    class="w-100"
                    v-model="item.remittableItem.name"
                  />
                </div>
              </td>
              <td>
                <div>
                  <el-input v-model="item.amount" class="input-with-select w-100">
                    <template #prepend>
                      <div>NGN</div>
                      <!-- <el-select
                        v-model="selectShortCode"
                        placeholder="Select"
                        style="width: 70px"
                      >
                        <el-option label="NGN" value="NGN" />
                        <el-option label="GHS" value="GHS" />
                        <el-option label="SWE" value="SWE" />
                      </el-select> -->
                    </template>
                  </el-input>
                </div>
              </td>
              <td>
                <div>
                  <el-input
                    type="text"
                    class="w-100"
                    disabled
                    v-model="item.remittableAmount"
                  />
                </div>
              </td>
              <td>
                <div>
                  <el-input type="text" class="w-100" disabled v-model="item.netAmount" />
                </div>
              </td>
              <!-- <td>
                <div @click="removeItem(index)">
                  <el-icon><Delete /></el-icon>
                </div>
              </td> -->
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Total Amounts Section -->
      <div class="row totals justify-content-center my-4">
        <div class="col-md-10">
          <div class="row justify-content-center">
            <div class="col-md-4">
              <label>Total Amount:</label>
              <div class="input-group">
                <el-input
                  type="text"
                  class="w-100"
                  v-model="singleRemittanceData.totalCollection"
                  readonly
                >
                  <template #prepend>
                    <div>{{ selectShortCode }}</div>
                  </template>
                </el-input>
              </div>
            </div>
            <div class="col-md-4">
              <label>Total Remittable Amount:</label>
              <div class="input-group">
                <div class="input-group">
                  <el-input
                    type="text"
                    class="w-100"
                    disabled
                    v-model="singleRemittanceData.totalRemittableAmount"
                    readonly
                  >
                    <template #prepend>
                      <div>{{ selectShortCode }}</div>
                    </template>
                  </el-input>
                </div>
              </div>
            </div>
            <div class="col-md-4">
              <label>Total Net Amount:</label>
              <div class="input-group">
                <el-input
                  type="text"
                  class="w-100"
                  v-model="singleRemittanceData.totalNetAmount"
                  readonly
                >
                  <template #prepend>
                    <div>{{ selectShortCode }}</div>
                  </template>
                </el-input>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Action Buttons -->
    <div class="col-md-12 mt-4">
      <div class="row justify-content-center">
        <div class="col-md-10">
          <div class="row justify-content-center">
            <div class="col-md-6">
              <el-button
                class="text-white w-100 mr-3"
                round
                size="large"
                :color="primarycolor"
                @click="saveRemittance"
                >Save</el-button
              >
            </div>
            <!-- <div class="col-md-6">
              <el-button
                class="text-white w-100"
                color="#FF5906"
                size="large"
                round
                @click="makePayment"
                >Make Payment</el-button
              >
            </div> -->
          </div>
        </div>
      </div>
    </div>
    <el-dialog
      v-model="showConfirmRemittance"
      title=""
      :width="mdAndUp || lgAndUp || xlAndUp ? `50%` : xsOnly ? `90%` : `70%`"
      align-center
      class="border-radius-20"
    >
      <div class="row">
        <div class="col-md-12 mt-4 text-center text-black font-weight-bold s-24">
          Confirm Remittance information
        </div>
        <div class="col-md-12 text-center justify-content-center d-flex">
          <div class="col-md-8 text-black fw-400 s-20">
            By continuing with this process, you’ve confirmed that the remittance
            information logged is correct
          </div>
        </div>
        <div class="col-md-12 text-center justify-content-center d-flex">
          <div class="col-md-12 d-flex justify-content-center">
            <div class="col-md-6 mt-4">
              <el-button
                class="w-100 py-4"
                @click="confirmRemittance"
                round
                size="large"
                :color="primarycolor"
                >Yes confirm</el-button
              >
            </div>
          </div>
        </div>
        <div class="col-md-12 d-flex text-center justify-content-center">
          <div class="col-md-6 text-center mt-2">or</div>
        </div>
        <div class="col-md-12 mt-2 text-center justify-content-center d-flex">
          <div class="col-md-10 d-flex justify-content-center">
            <div class="col-md-6 fw-400 s-20">
              <el-button round @click="cancel" text class="w-100 text-dark" size="large"
                >Cancel</el-button
              >
            </div>
          </div>
        </div>
      </div>
    </el-dialog>
    <el-dialog
      v-model="showContinuePayment"
      title=""
      :width="mdAndUp || lgAndUp || xlAndUp ? `50%` : xsOnly ? `90%` : `70%`"
      align-center
      class="border-radius-20"
    >
      <div class="row">
        <div class="col-md-12 text-center justify-content-center d-flex">
          <div class="col-md-8 text-black text-black font-weight-bold s-24">
            Are you sure you want to proceed to payment?
          </div>
        </div>
        <div class="col-md-12 text-center justify-content-center d-flex">
          <div class="col-md-12 d-flex justify-content-center">
            <div class="col-md-6 mt-4">
              <el-button
                class="w-100 py-4 text-white"
                @click="proceedPayment"
                round
                size="large"
                color="#FF5906"
                >Yes, continue to payment</el-button
              >
            </div>
          </div>
        </div>
        <div class="col-md-12 d-flex text-center justify-content-center">
          <div class="col-md-6 text-center mt-2">or</div>
        </div>
        <div class="col-md-12 mt-2 text-center justify-content-center d-flex">
          <div class="col-md-10 d-flex justify-content-center">
            <div class="col-md-6 fw-400 s-20">
              <el-button round @click="cancel" text class="w-100 text-dark" size="large"
                >Cancel</el-button
              >
            </div>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, inject } from "vue";
import dateFormatter from "../../../services/dates/dateformatter";
import router from "../../../router";
import axios from "@/gateway/backendapi";
import { useRoute } from "vue-router";
import deviceBreakpoint from "../../../mixins/deviceBreakpoint";

const route = useRoute();
const primarycolor = inject("primarycolor");
const selectShortCode = ref("NGN");
const singleRemittanceData = ref({});
// const saveRemittanceData = ref({});
const { mdAndUp, lgAndUp, xlAndUp, xsOnly } = deviceBreakpoint();
const showConfirmRemittance = ref(false);
const showContinuePayment = ref(false);

const remittanceItems = ref([]);

const paymentStatus = ["NotPaid", "FullyPaid", "PartialPayment"];
const recordStatus = ["Pending", "Editable", "Locked"];

const goBack = () => {
  router.go(-1);
};

const formatDate = (date) => {
  return dateFormatter.monthDayYear(date);
};

// const calculateRemittable = (amount) => (amount * 0.1).toFixed(0); // 10% remittable
// const calculateNet = (amount) => (amount - amount * 0.1).toFixed(0);

// Computed values for totals
// const totalAmount = computed(() =>
//   remittanceItems.value.reduce((sum, item) => sum + parseFloat(item.amount), 0)
// );
// const totalRemittableAmount = computed(() =>
//   remittanceItems.value.reduce(
//     (sum, item) => sum + parseFloat(calculateRemittable(item.amount)),
//     0
//   )
// );
// const totalNetAmount = computed(() =>
//   remittanceItems.value.reduce(
//     (sum, item) => sum + parseFloat(calculateNet(item.amount)),
//     0
//   )
// );

const getRemittancebyId = async () => {
  try {
    const { data } = await axios.get(`/api/Remittance/remittance/${route.query.id}`);
    singleRemittanceData.value = data;
    remittanceItems.value = data.remittanceItems;
    // localStorage.setItem(
    //   JSON.stringify(singleRemittanceData.value),
    //   "singleRemittanceData"
    // );
    console.log(data, "datahj");
  } catch (error) {
    console.log(error);
  }
};
getRemittancebyId();
const confirmRemittance = async () => {
  showConfirmRemittance.value = false;
    showContinuePayment.value = true;
  // try {
  //   const { data } = await axios.post("/api/Remittance/SaveRemittance", payload);
  //   console.log(data, "Remittance saved successfully");
  //   saveRemittanceData.value = data;
  //   showConfirmRemittance.value = false;
  //   showContinuePayment.value = true;

  // } catch (error) {
  //   console.error("Error saving remittance:", error);
  // }
};

// Methods for saving and making payments
const saveRemittance = () => {
  showConfirmRemittance.value = true;
};
const cancel = () => {
  if (showConfirmRemittance.value) {
    showConfirmRemittance.value = false 
  } else {
    showContinuePayment.value = false;
  }
}
const proceedPayment = () => {
  router.push(`/tenant/remittance/remittancepayment?id=${singleRemittanceData.value.id}`);
};
// const makePayment = () => {
//   alert("Proceeding to payment...");
// };

// Remove item from the table
// const removeItem = (index) => {
//   remittanceItems.value.splice(index, 1);
// };
</script>

<style scoped>
/* Header Section */
.header-section {
  border-bottom: 2px solid #f1f1f1;
}
.remittance-id {
  font-size: 1.2rem;
  color: #333;
}
.input-with-select .el-input-group__prepend {
  background-color: var(--el-fill-color-blank);
}
.table-container {
  overflow-x: auto;
}

.table-container table {
  width: 100%;
  min-width: 600px; /* Ensures the table takes up enough space to allow scrolling */
}

/* Summary Information Styling *
  
  /* Table Styling */
/* .income-table {
    background: #EBEDFF;
    padding: 1.5rem;
  } */
.table-header th {
  color: #111111;
  font-weight: 600 !important;
  font-size: 16px;
}
.table td,
.table th {
  vertical-align: middle;
  text-align: center;
}

/* Input and Totals */
.totals .input-group-text {
  background: #fff;
  border-right: none;
}
.totals label {
  color: #1e1e1e;
  font-weight: 600;
}

/* Action Buttons */
.btn-lg {
  min-width: 150px;
}
.btn-primary {
  background-color: #0067f4;
  border: none;
}
.btn-danger {
  background-color: #f45642;
  border: none;
}
</style>
