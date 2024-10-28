<template>
  <div class="container-fluid">
    <div class="row flex-column flex-sm-row justify-content-sm-between">
      <div>
        <h2 class="text-head font-weight-bold py-0 my-0 text-black">Add Remittance</h2>
        <div @click="goBack">
          <span class="s-18 fw-400 cursor-pointer text-black">
            <img src="../../../assets/goback.png" alt="" /> Go back</span
          >
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12 px-0 border-radius-10 border-no-radius my-4">
        <!-- Select Month and Year -->
        <div class="row mb-3 mt-4">
          <div class="col-md-6 px-4">
            <div class="row">
              <div class="col-12 col-md-6 mb-2 mb-md-0">
                <div class="fw-500">Select Month:</div>
                <el-select
                  v-model="selectedMonth"
                  placeholder="Select Month"
                  class="w-100"
                >
                  <el-option
                    v-for="(item, index) in months"
                    :label="item"
                    :value="item"
                    :key="index"
                  ></el-option>
                  <!-- Add other months here -->
                </el-select>
              </div>
              <div class="col-12 col-md-6">
                <div class="fw-500">Select Year:</div>
                <!-- <el-select-v2
                  v-model="selectedYear"
                  :options="[
                    { label: 'Year', value: 0 },
                    ...yearsArr.map((i) => ({ label: i, value: i })),
                  ]"
                  placeholder="Select Year"
                  size="large"
                  class="w-100 ml-1"
                /> -->
                <el-select v-model="selectedYear" placeholder="Select Year" class="w-100">
                  <el-option
                    v-for="(item, index) in yearsArr"
                    :label="item"
                    :value="item"
                    :key="index"
                  ></el-option>
                  <!-- Add other months here -->
                </el-select>
                <!-- <el-select v-model="selectedYear" placeholder="Select Year" class="w-100">
                  <el-option label="2024" value="2024"></el-option>
                </el-select> -->
              </div>
            </div>
          </div>
        </div>

        <!-- Income Table -->
        <div class="table-container p-0 mx-0">
          <table class="table table-bordere shadow-none border-none text-center">
            <thead class="table-header border-none">
              <tr class="grey-backg">
                <th>Income Item</th>
                <th>Amount</th>
                <th>Remittable Amount</th>
                <th>Net Amount</th>
                <th></th>
              </tr>
            </thead>
            <tbody class="grey-backg">
              <tr v-for="(item, index) in remittanceItems" :key="index">
                <td>
                  <el-select-v2
                    v-model="item.name"
                    class="w-100 font-weight-normal"
                    placeholder="Select item"
                    @change="setSelectedItem(item.name, index)"
                    :options="
                      allRemittanceItems.map((i) => ({
                        label: i.name,
                        value: i.id,
                      }))
                    "
                    size="large"
                  />
                </td>
                <td>
                  <el-input
                    v-model="item.amount"
                    placeholder="Amount"
                    class="input-with-select"
                  >
                    <template #prepend>
                      <div>{{selectShortCode}}</div>
                      <!-- <el-select v-model="selectShortCode" style="width: 70px">
                        <el-option label="NGN" value="NGN"></el-option>
                      </el-select> -->
                    </template>
                  </el-input>
                </td>
                <td>
                  <el-input
                    v-model="item.remittableAmount"
                    placeholder="Remittable"
                  ></el-input>
                </td>
                <td>
                  <el-input v-model="item.netAmount" placeholder="Net"></el-input>
                </td>
                <td>
                  <el-icon @click="removeItem(index)"><Delete /></el-icon>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Total Amounts -->
        <div
          class="row my-4 totals justify-content-center align-items-center text-center"
        >
          <div class="col-md-10 col-11">
            <div class="row">
              <div
                @click="addNewItem"
                class="col-md-3 d-flex align-items-center cursor-pointer primary--text fw-500 col-12 mb-3 mb-md-0"
              >
                <span class="d-flex align-items-center"
                  ><el-icon><Plus /></el-icon> <span>New income item</span></span
                >
              </div>
              <div class="col-12 col-md-3 mb-3 mb-md-0">
                <label>Total Amount:</label>
                <el-input v-model="totalAmount" readonly></el-input>
              </div>
              <div class="col-12 col-md-3 mb-3 mb-md-0">
                <label>Total Remittable Amount:</label>
                <el-input v-model="totalRemittableAmount" readonly></el-input>
              </div>
              <div class="col-12 col-md-3">
                <label>Total Net Amount:</label>
                <el-input v-model="totalNetAmount" readonly></el-input>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Save Button -->
    <div class="row justify-content-center my-4">
      <div class="col-sm-4 col-11">
        <el-button
          :loading="loading"
          :color="primarycolor"
          size="large"
          round
          @click="saveRemittance"
          class="w-100"
        >
          Save
        </el-button>
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
              <el-button round text class="w-100 text-dark" size="large"
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
import { ref, computed, inject } from "vue";
import router from "../../../router";
import axios from "@/gateway/backendapi";
import deviceBreakpoint from "../../../mixins/deviceBreakpoint";
import store from "../../../store/store";

// Data
const primarycolor = inject("primarycolor");
const selectedMonth = ref("");
const selectedYear = ref("");
const selectShortCode = ref("NGN");
const tenantCurrency = ref("");
const selectedRemittanceItem = ref({});
const saveRemittanceData = ref({});
const loading = ref(false);
const showConfirmRemittance = ref(false);
const showContinuePayment = ref(false);
const allRemittanceItems = ref([]);
const { mdAndUp, lgAndUp, xlAndUp, xsOnly } = deviceBreakpoint();
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

// Remittance items array
const remittanceItems = ref([
  { name: null, amount: "", remittableAmount: "", netAmount: "" },
]);
const tenantId = ref(
  store.getters.currentUser && store.getters.currentUser.tenantId
    ? store.getters.currentUser.tenantId
    : 0
);

const goBack = () => {
  router.go(-1);
};
const yearsArr = computed(() => {
  const arrOfYears = [];
  let currentYear = new Date().getFullYear();
  while (arrOfYears.length <= 100) {
    arrOfYears.push(currentYear);
    currentYear = currentYear - 1;
  }
  return arrOfYears;
});

// Computed totals
const totalAmount = computed(() =>
  remittanceItems.value.reduce((sum, item) => sum + parseFloat(item.amount || 0), 0)
);
const totalRemittableAmount = computed(() =>
  remittanceItems.value.reduce(
    (sum, item) => sum + parseFloat(item.remittableAmount || 0),
    0
  )
);
const totalNetAmount = computed(() =>
  remittanceItems.value.reduce((sum, item) => sum + parseFloat(item.netAmount || 0), 0)
);

const getCurrentlySignedInUser = async () => {
  try {
    const res = await axios.get("/api/Membership/GetCurrentSignedInUser");
    tenantId.value = res.data.tenantId;
    console.log(store.getters.currentUser);
    if (store.getters.currentUser === undefined) {
      axios
        .get(`/api/Lookup/TenantCurrency?tenantID=${res.data.tenantId}`)
        .then((res) => {
          tenantCurrency.value = res.data.currency;
          console.log(res.data);
        })
        .catch((err) => console.log(err));
    } else {
      axios
        .get(`/api/Lookup/TenantCurrency?tenantID=${store.getters.currentUser.tenantId}`)
        .then((res) => {
          tenantCurrency.value = res.data.currency;
        })
        .catch((err) => console.log(err));
    }
  } catch (err) {
    /*eslint no-undef: "warn"*/
    console.log(err);
  }
};
getCurrentlySignedInUser();

// Methods
const addNewItem = () => {
  remittanceItems.value.push({
    id: "",
    name: null,
    amount: "",
    remittableAmount: "",
    netAmount: "",
  });
};

const removeItem = (index) => {
  remittanceItems.value.splice(index, 1);
};

const getAllRemittableItem = async () => {
  try {
    const { data } = await axios.get("/api/Remittance/GetAllRemittableItem");
    allRemittanceItems.value = data;
    console.log(data, "jejej");
  } catch (error) {
    console.log(error);
  }
};
getAllRemittableItem();
const setSelectedItem = (item, index) => {
  selectedRemittanceItem.value = allRemittanceItems.value.find((i) => i.id == item);
  console.log(selectedRemittanceItem.value, "jjjj");
  remittanceItems.value[index].name = selectedRemittanceItem.value.name;
  remittanceItems.value[index].id = selectedRemittanceItem.value.id;
};

const saveRemittance = () => {
  showConfirmRemittance.value = true;
};
const confirmRemittance = async () => {
  // Constructing the payload
  let payload = {
    // id: "d7c4d68b-1b5d-4c7a-b9a6-49b63b9f4b9f",
    // remittanceID: "RM-001",
    // totalRemittableAmount: totalRemittableAmount.value,
    // totalNetAmount: totalNetAmount.value,
    periodMonth: selectedMonth.value,
    periodYear: selectedYear.value,
    // recordStatus: 0,
    // paymentStatus: 1,
    dateCreated: new Date().toISOString(),
    // lastPaymentDate: new Date().toISOString(),
    tenantId: tenantId.value ? tenantId.value : "", // Adjust as per your requirement
    remittanceItems: remittanceItems.value.map((item) => ({
      remittableItemID: item.id, // Replace with the actual ID if available
      amount: parseFloat(item.amount || 0),
      netAmount: item.netAmount,
      remittableAmount: item.remittableAmount,
    })),
  };

  try {
    const { data } = await axios.post("/api/Remittance/SaveRemittance", payload);
    console.log(data, "Remittance saved successfully");
    saveRemittanceData.value = data;
    showConfirmRemittance.value = false;
    showContinuePayment.value = true;

    // Optionally, alert or handle success
  } catch (error) {
    console.error("Error saving remittance:", error);
    // Optionally, handle error
  }
};
const cancel = () => {
  if (showConfirmRemittance.value) {
    showConfirmRemittance.value = false 
  } else {
    showContinuePayment.value = false;
  }
}
const proceedPayment = () => {
  router.push(`/tenant/remittance/remittancepayment?id=${saveRemittanceData.value.id}`);
};
</script>

<style scoped>
/* General container styles */

/* Table styles */
.table-header th {
  color: #111111;
  font-weight: 600 !important;
  font-size: 16px !important;
}

.input-with-select .el-input-group__prepend {
  background-color: #f3f4f6;
}

.totals .el-input {
  background-color: #f3f4f6;
  border-radius: 5px;
}

/* Button styling */
.el-button {
  border-radius: 25px;
  color: white;
}

/* .el-button[plain] {
  color: #0067f4;
} */

/* Scrollable table container */
.table-container {
  overflow-x: auto;
}

.table-container table {
  width: 100%;
  min-width: 600px; /* Ensures the table takes up enough space to allow scrolling */
}

/* Responsive adjustments for mobile views */
@media (max-width: 576px) {
  .income-table table {
    font-size: 0.85rem;
  }

  .el-input {
    font-size: 0.9rem;
  }

  .el-select {
    font-size: 0.9rem;
  }

  .table-header th,
  .table-bordered td {
    padding: 0.5rem;
  }

  .input-with-select .el-input-group__prepend {
    width: 50px;
  }

  /* Make the total inputs stack on mobile */
  .totals .col-md-4 {
    margin-bottom: 1rem;
  }
}
</style>
