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
          <span class="s-20 font-weigth-600">Remittance ID: ADF544215</span>
          <span>
            <img src="../../../assets/form/copyIcon.png" alt="" />
          </span>
        </div>
      </div>
    </div>
    <!-- Summary Information -->
    <div class="col-md-12 mt-4 px-0 border-radius-10 border">
      <div class="car p-4 mb-4">
        <div class="row text-center">
          <div class="col">
            <p class="fw-400">Period</p>
            <div class="s-20 font-weight-600">June 2024</div>
          </div>
          <div class="col border-left border-none">
            <p class="fw-400">Remittable</p>
            <div class="s-20 font-weight-600">NGN 25,000</div>
          </div>
          <div class="col border-left border-none">
            <p class="fw-400">Amount Paid</p>
            <div class="s-20 font-weight-600">NGN 0</div>
          </div>
          <div class="col border-left border-none">
            <p class="fw-400">Payment date</p>
            <div class="s-20 font-weight-600">-</div>
          </div>
          <div class="col border-left border-none">
            <p class="fw-400">Status</p>
            <div class="s-20 font-weight-600">Not Paid</div>
          </div>
          <div class="col border-left border-none">
            <p class="fw-400">Record Status</p>
            <h6 class="s-20 font-weight-600">Pending</h6>
          </div>
        </div>
      </div>

      <!-- Income Table -->
      <div class="income-table px-0 mx-0 table-responsive">
        <table class="table shadow-none">
          <thead class="">
            <tr class="table-header grey-backg mb-3">
              <th scope="col">Income Item</th>
              <th scope="col">Amount</th>
              <th scope="col">Remittable Amount</th>
              <th scope="col">Net Amount</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody class="grey-backg mt-2">
            <tr v-for="(item, index) in remittanceItems" :key="index">
              <td>
                <div>
                  <el-input type="text" class="w-100" v-model="item.name" />
                </div>
              </td>
              <td>
                <!-- <div class="input-group">
                  <div class="input-group-prepend">
                    <span class="input-group-text">NGN</span>
                  </div>
                  <el-input type="number" class="w-100" v-model="item.amount" />
                </div> -->
                <div>
                  <el-input
                    v-model="item.amount"
                    placeholder="Please input"
                    class="input-with-select"
                  >
                    <template #prepend>
                      <el-select
                        v-model="selectShortCode"
                        placeholder="Select"
                        style="width: 80px"
                      >
                        <el-option label="NGN" value="1" />
                        <el-option label="GHS" value="2" />
                        <el-option label="SWE" value="3" />
                      </el-select>
                    </template>
                    <template #append>
                      <el-button :icon="Search" />
                    </template>
                  </el-input>
                </div>
              </td>
              <td>
                <div>
                  <el-input type="text" v-model="item.amount" />
                  <!-- {{ calculateRemittable(item.amount) }} -->
                </div>
              </td>
              <td>
                <div>
                  <el-input type="text" v-model="item.amount" />
                </div>
              </td>
              <!-- <td>{{ calculateNet(item.amount) }}</td> -->
              <td>
                <div @click="removeItem(index)">
                  <el-icon><Delete /></el-icon>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Total Amounts Section -->
      <div class="row totals mt-4">
        <div class="col">
          <label>Total Amount:</label>
          <div class="input-group">
            <div class="input-group-prepend">
              <span class="input-group-text">NGN</span>
            </div>
            <el-input type="text" class="w-100" v-model="totalAmount" readonly />
          </div>
        </div>
        <div class="col">
          <label>Total Remittable Amount:</label>
          <div class="input-group">
            <div class="input-group-prepend">
              <span class="input-group-text">NGN</span>
            </div>
            <el-input
              type="text"
              class="w-100"
              v-model="totalRemittableAmount"
              readonly
            />
          </div>
        </div>
        <div class="col">
          <label>Total Net Amount:</label>
          <div class="input-group">
            <div class="input-group-prepend">
              <span class="input-group-text">NGN</span>
            </div>
            <el-input type="text" class="w-100" v-model="totalNetAmount" readonly />
          </div>
        </div>
      </div>
    </div>

    <!-- Action Buttons -->
    <div class="col-md-12 mt-4">
      <div class="row justify-content-center">
        <div class="col-md-10">
          <div class="row">
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
            <div class="col-md-6">
              <el-button
                class="text-white w-100"
                color="#FF5906"
                size="large"
                round
                @click="makePayment"
                >Make Payment</el-button
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, inject } from "vue";
const primarycolor = inject("primarycolor");
const selectShortCode = ref("");

const remittanceItems = ref([
  { name: "Offering", amount: 520000, shortCode: "NGN" },
  { name: "Donations", amount: 520000, shortCode: "NGN" },
  { name: "Tithe", amount: 520000, shortCode: "NGN" },
  { name: "Goodwill", amount: 520000, shortCode: "NGN" },
]);

const calculateRemittable = (amount) => (amount * 0.1).toFixed(0); // 10% remittable
const calculateNet = (amount) => (amount - amount * 0.1).toFixed(0);

// Computed values for totals
const totalAmount = computed(() =>
  remittanceItems.value.reduce((sum, item) => sum + parseFloat(item.amount), 0)
);
const totalRemittableAmount = computed(() =>
  remittanceItems.value.reduce(
    (sum, item) => sum + parseFloat(calculateRemittable(item.amount)),
    0
  )
);
const totalNetAmount = computed(() =>
  remittanceItems.value.reduce(
    (sum, item) => sum + parseFloat(calculateNet(item.amount)),
    0
  )
);

// Methods for saving and making payments
const saveRemittance = () => {
  alert("Remittance saved successfully!");
};
const makePayment = () => {
  alert("Proceeding to payment...");
};

// Remove item from the table
const removeItem = (index) => {
  remittanceItems.value.splice(index, 1);
};
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
.totals .form-control {
  border-left: none;
}
.totals label {
  font-size: 0.9rem;
  color: #333;
  font-weight: bold;
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
