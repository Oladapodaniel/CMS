<template>
  <div class="container-wide mt-5">
    <div class="d-flex flex-column flex-sm-row justify-content-sm-between mb-3">
      <div class="text-head font-weight-bold h2 py-0 my-0 text-black">
        Manage Branches
      </div>
      <div class="d-flex flex-column flex-sm-row mt-2 my-1 mb-3">
        <div>
          <el-dropdown
            trigger="click"
            class="align-items-center justify-content-center d-flex ml-md-3 ml-0 default-btn py-0 mr-2"
            style="height: 2.2rem"
          >
            <span
              class="el-dropdown-link w-100 primary--text text-center font-weight-600"
            >
              More
              <el-icon class="el-icon--right">
                <arrow-down />
              </el-icon>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item class="text-black"> duc </el-dropdown-item>
                <el-dropdown-item class="text-black"> div </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
        <div class="c-pointer">
          <el-button round class=" w-100 mt-sm-0 mt-3" @click="showModal" :color="primarycolor">
            Add Branch
          </el-button>
        </div>
      </div>
    </div>
    <!-- Top Summary -->
    <div class="row">
      <div class="col-md-3 mb-4">
        <div class="card border-radius-15 bg-gray-500 border-no-radius h-100 p-3">
          <div class="card-icon my-2">
            <img :src="BranchIcon" style="height: 3rem" alt="" />
          </div>
          <div class="card-content mt-1">
            <div class="d-flex justify-content-between mb-2">
              <span class="card-text">Total Branches</span>
              <h5 class="card-title font-weight-600">23</h5>
            </div>
            <div class="d-flex justify-content-between mb-1">
              <span class="card-text">Total People</span>
              <h5 class="card-title font-weight-600">4,000</h5>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-3 mb-4">
        <div class="card border-radius-15 bg-gray-500 border-no-radius h-100 p-3">
          <div class="card-icon my-2">
            <img :src="WalkIcon" style="height: 3rem" alt="" />
          </div>
          <div class="card-content mt-1">
            <div class="mb-2">
              <span class="card-text">Average Monthly Attendance</span>
            </div>
            <div class="mb-1">
              <h5 class="card-title s-24 font-weight-600">865</h5>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-3 mb-4">
        <div class="card border-radius-15 bg-gray-500 border-no-radius h-100 p-3">
          <div class="card-icon d-flex justify-content-between my-2">
            <img :src="ArrowDown" style="height: 3rem" alt="" />
            <span class="text-success d-flex align-items-center"
              ><span>+23%</span><el-icon class="text-success" :size="25"><Top /></el-icon
            ></span>
          </div>
          <div class="card-content mt-1">
            <div class="mb-2">
              <span class="card-text">Monthly Inflow</span>
            </div>
            <div class="mb-1">
              <h5 class="card-title s-24 font-weight-600">NGN 368,000</h5>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-3 mb-4">
        <div class="card border-radius-15 bg-gray-500 border-no-radius h-100 p-3">
          <div class="card-icon d-flex justify-content-between my-2">
            <img :src="ArrowUp" style="height: 3rem" alt="" />
            <span class="text-danger d-flex align-items-center"
              ><span>+23%</span><el-icon class="text-danger" :size="25"><Top /></el-icon
            ></span>
          </div>
          <div class="card-content mt-1">
            <div class="mb-1">
              <span class="card-text">Monthly Outflow</span>
            </div>
            <div class="mb-1">
              <h5 class="card-title s-24 font-weight-600">NGN 6,414,000</h5>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Branch Data Overview -->
    <div class="table-responsive mt-4 border-radius-8 bg-gray-100 border-radius-border-8">
      <div class="row px-5 pt-4">
        <div class="col-md-12 align-items-center d-flex flex-column flex-sm-row justify-content-md-between">
          <div style="color: #0b55d4" class="font-weight-600 s-24">Branch Data Overview</div>
          <div class="d-flex flex-column flex-sm-row align-items-center  justify-content-sm-end">
            <div class="col-md-5">
              <el-dropdown
                trigger="click"
                class="align-items-center justify-sm-content-center border-radius-60 d-flex ml-md-3 ml-0 bg-gray-600 py-0 mr-2"
                style="height: 2.8rem"
              >
                <span
                  class="el-dropdown-link w-100  text-center fw-400"
                >
                  Sort Table
                  <el-icon class="el-icon--right">
                    <arrow-down />
                  </el-icon>
                </span>
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item class="text-black"> Branch Name </el-dropdown-item>
                    <el-dropdown-item class="text-black">
                      Membership size
                    </el-dropdown-item>
                    <el-dropdown-item class="text-black">Attendance </el-dropdown-item>
                    <el-dropdown-item class="text-black"> Income </el-dropdown-item>
                    <el-dropdown-item class="text-black"> Expense </el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
            </div>
            <div class="col-md-5 mt-sm-0 mt-3">
              <el-input
                class="w-100 rounded-border"
                :prefix-icon="Search"
                placeholder="Search"
                v-model="searchText"
              />
            </div>
          </div>
        </div>
      </div>
      <table class="table border table-hover">
        <thead>
          <tr>
            <th>Branch</th>
            <th>Membership Size</th>
            <th>Avg. Attendance</th>
            <th>Avg. Income</th>
            <th>Avg. Expenses</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="branch in branches" :key="branch.name">
            <td class="fw-500">{{ branch.name }}</td>
            <td>{{ branch.membershipSize }}</td>
            <td>{{ branch.avgAttendance }}</td>
            <td>{{ branch.avgIncome }}</td>
            <td>{{ branch.avgExpenses }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { ref, inject } from "vue";
import BranchIcon from "../../assets/ecommerce/branchIcon.png";
import ArrowUp from "../../assets/ecommerce/ArrowUp.png";
import ArrowDown from "../../assets/ecommerce/ArrowDown.png";
import WalkIcon from "../../assets/ecommerce/WalkIcon.png";
import { Search } from "@element-plus/icons-vue";

export default {
  setup() {
    const displayModal = ref(false);
    const searchText = ref('');

    const primarycolor = inject("primarycolor");
    const showModal = () => {
      displayModal.value = true;
    };
    const branches = ref([
      {
        name: "Higher Ground",
        membershipSize: 256,
        avgAttendance: 62,
        avgIncome: "NGN 2,000,000",
        avgExpenses: "NGN 1,000,000",
      },
      {
        name: "Amazing",
        membershipSize: 2542,
        avgAttendance: 62,
        avgIncome: "NGN 2,000,000",
        avgExpenses: "NGN 1,000,000",
      },
      {
        name: "Faith Abound",
        membershipSize: 348,
        avgAttendance: 62,
        avgIncome: "NGN 2,000,000",
        avgExpenses: "NGN 1,000,000",
      },
      {
        name: "Prayer Mountain",
        membershipSize: 26,
        avgAttendance: 62,
        avgIncome: "NGN 2,000,000",
        avgExpenses: "NGN 1,000,000",
      },
      {
        name: "Hossanna",
        membershipSize: 425,
        avgAttendance: 62,
        avgIncome: "NGN 2,000,000",
        avgExpenses: "NGN 1,000,000",
      },
      {
        name: "Way Up",
        membershipSize: 1225,
        avgAttendance: 62,
        avgIncome: "NGN 2,000,000",
        avgExpenses: "NGN 1,000,000",
      },
    ]);

    return {
      displayModal,
      primarycolor,
      BranchIcon,
      ArrowUp,
      ArrowDown,
      WalkIcon,
      showModal,
      branches,
      searchText,
      Search
    };
  },
};
</script>

<style>
.card-custom {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
}
.card-icon {
  font-size: 18px;
}
.card-text {
  margin: 0;
  font-size: 15px;
  color: #555555;
}
.card-title {
  font-size: 20px;
  margin: 0;
}
.text-success {
  color: green;
}
.text-danger {
  color: red;
}
.table {
  width: 100% !important;
  box-shadow: none !important;
  border: none !important;
  text-align: left;
  margin-bottom: auto !important;
  padding-bottom: 0.5rem;
}

.table th,
.table td {
  vertical-align: middle;
  justify-content: center;
  padding: 1rem 3rem;
}

.table thead th {
  border-bottom: 2px solid #dee2e6;
  color: #787878;
  font-weight: 600 !important;
  border: none;
}

.table tbody tr:hover {
  background-color: #f1f1f1;
}
</style>
