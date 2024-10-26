<template>
  <div class="container-fuild">
    <div class="d-flex flex-column flex-sm-row justify-content-sm-between">
      <div>
        <div class="text-head font-weight-bold h2 py-0 my-0 text-black">Remittance</div>
        <div class="s-18">Showing all Inflow & Remittance</div>
      </div>
      <div class="d-flex flex-wrap flex-sm-nowrap mt-3 mt-sm-0">
        <router-link :to="`/tenant/remittance/addremittance`" class="no-decoration w-100">
          <el-button
            :color="primarycolor"
            class="ml-0 ml-sm-2 mt-sm-0 mt-3 w-100 header-btn"
            round
            >Add Remittance</el-button
          >
        </router-link>
      </div>
    </div>
    <div class="row p-3 border rounded mt-4 align-items-center">
      <!-- Total Remitted Amount -->
      <div class="col-md-3 text-center">
        <div class="font-weight-600 text-head">Total Remitted Amount</div>
        <div class="s-24 font-weight-600">NGN {{ totalAmount }}</div>
      </div>

      <!-- Last Month -->
      <div class="col-md-3 text-center">
        <div class="font-weight-600 text-head">Last Month</div>
        <div class="font-weight-600 s-24">NGN {{ lastMonthAmount }}</div>
      </div>

      <!-- Chart and Percentage Growth -->
      <div class="col-md-6 d-flex align-items-center justify-content-end">
        <canvas class="w-100" id="myChart" width="5" height="1"></canvas>
        <div class="text-right w-100">
          <div class="fw-400">
            <span class="text-success">+{{ growthPercentage }}% </span>
            <span>Guests Since last month</span>
          </div>
          <div class="mt-4"><a href="#" class="text-secondary fw-400">Show more</a></div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12 my-4">
        <Table
          :data="allRemittanceData"
          :headers="paymentRecordHeaders"
          :checkMultipleItem="true"
          @checkedrow="handleSelectionChange"
          v-loading="loading"
        >
          <template v-slot:month="{ item }">
            <div class="font-weight-600">
              {{ item.periodMonth }}
            </div>
          </template>
          <template v-slot:totalCollection="{ item }">
            <div>
              {{ Math.abs(item.totalCollection).toLocaleString() }}
            </div>
          </template>
          <template v-slot:totalRemittableAmount="{ item }">
            <div>
              {{ Math.abs(item.totalRemittableAmount).toLocaleString() }}
            </div>
          </template>
          <template v-slot:paymentStatus="{ item }">
            <div class="text-success" :class="item.status">
              {{ item.paymentStatus }}
            </div>
          </template>
          <template v-slot:recordStatus="{ item }">
            <div :class="item.recordStatus">
              {{ item.recordStatus }}
            </div>
          </template>
          <template v-slot:action="{ item }">
            <el-dropdown trigger="click">
              <el-icon>
                <MoreFilled />
              </el-icon>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item>
                    <div
                      @click.prevent="showConfirmModal(item.id, index)"
                      class="text-color"
                    >
                      Delete
                    </div>
                  </el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </template>
        </Table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, inject } from "vue";
// import finish from "../../services/progressbar/progress";
import axios from "@/gateway/backendapi";
import Chart from "chart.js";
import Table from "@/components/table/Table";
import { ElMessage, ElMessageBox } from "element-plus";

// Reactive properties
const primarycolor = inject("primarycolor");
const totalAmount = ref(680500);
const lastMonthAmount = ref(280500);
const growthPercentage = ref(9.2025); // Percentage growth
const marked = ref([]);
const loading = ref(false);
const allRemittanceData = ref([]);
const paymentRecordHeaders = ref([
  { name: " MONTH", value: "month" },
  { name: " TOTAL COLLECTION", value: "totalCollection" },
  { name: " REMITTABLE", value: "totalRemittableAmount" },
  { name: " STATUS", value: "paymentStatus" },
  { name: " RECORD STATUS", value: "recordStatus" },
  { name: " ACTION", value: "action" },
]);

const handleSelectionChange = (val) => {
  marked.value = val;
};

const getAllremittance = async () => {
  try {
    const { data } = await axios.get("/api/Remittance/GetAllRemittance");
    allRemittanceData.value = data;
  } catch (error) {
    console.log(error);
  }
};
getAllremittance();
const getRemittanceDB = async () => {
  try {
    const { data } = await axios.get("/api/Remittance/GetRemittanceDashboard");
    //  allRemittanceData.value = data
    console.log(data, "ggahh");
  } catch (error) {
    console.log(error);
  }
};
getRemittanceDB();
const deletePaymentRecord = (id) => {
  axios
    .delete(`/api/Remittance/DeleteRemittance/${id}`)
    .then((res) => {
      console.log(res);
      ElMessage({
        type: "success",
        message: "Remittance Record deleted Successfully",
        duration: 5000,
      });
      allRemittanceData.value = allRemittanceData.value.filter(
        (paymentRecords) => paymentRecords.id !== id
      );
    })
    .catch((err) => {
      if (err.response.status === 400) {
        ElMessage({
          type: "error",
          message: "Unable to delete",
          duration: 5000,
        });
      } else {
        ElMessage({
          type: "error",
          message: "Unable to delete, An error occurred, please try again",
          duration: 5000,
        });
      }
    });
};
const showConfirmModal = (id, index) => {
  ElMessageBox.confirm("Are you sure you want to proceed?", "Confirm delete", {
    confirmButtonText: "OK",
    cancelButtonText: "Cancel",
    type: "error",
  })
    .then(() => {
      deletePaymentRecord(id, index);
    })
    .catch(() => {
      ElMessage({
        type: "info",
        message: "Delete canceled",
        duration: 5000,
      });
    });
};

// Chart setup on component mount
onMounted(() => {
  const ctx = document.getElementById("myChart").getContext("2d");
  new Chart(ctx, {
    type: "bar",
    data: {
      labels: ["J", "F", "M", "A"], // Months
      datasets: [
        {
          label: "Guests",
          data: [20, 50, 20, 50], // Example data
          backgroundColor: "#76B7B2",
        },
      ],
    },
    options: {
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
      legend: {
        display: false,
      },
    },
  });
});
</script>
<style scoped>
.h4 {
  font-size: 1.5rem;
}

.canvas-container {
  display: flex;
  align-items: center;
}

.text-success {
  color: #28a745 !important;
}
</style>
