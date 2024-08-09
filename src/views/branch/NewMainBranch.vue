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
                <el-dropdown-item class="text-black"> Add Member </el-dropdown-item>
                <el-dropdown-item class="text-black"> Add First timer </el-dropdown-item>
                <el-dropdown-item class="text-black"> Send Sms </el-dropdown-item>
                <el-dropdown-item class="text-black"> Send Email </el-dropdown-item>
                <el-dropdown-item class="text-black"> Send Whatsapp </el-dropdown-item>
                <el-dropdown-item class="text-black font-weight-bold w-100">
                  <div class="d-flex justify-content-between w-100">
                    <span>Report </span>
                    <span><img style="height: 1.5rem" :src="AnalysicIcon" alt="" /></span>
                  </div>
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
        <div class="c-pointer">
          <el-button
            round
            class="w-100 mt-sm-0 mt-3"
            @click="showModal"
            :color="primarycolor"
          >
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
              <h5 class="card-title font-weight-600">
                {{ allBranchDetail.length.toLocaleString() }}
              </h5>
            </div>
            <div class="d-flex justify-content-between mb-1">
              <span class="card-text">Total People</span>
              <h5 class="card-title font-weight-600">
                {{ getTotalPeopleBch.toLocaleString() }}
              </h5>
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
        <div
          class="col-md-12 align-items-center d-flex flex-column flex-sm-row justify-content-md-between"
        >
          <div style="color: #0b55d4" class="font-weight-600 s-24">
            Branch Data Overview
          </div>
          <div
            class="d-flex flex-column flex-sm-row align-items-center justify-content-sm-end"
          >
            <div class="col-md-5">
              <el-dropdown
                trigger="click"
                class="align-items-center justify-sm-content-center border-radius-60 d-flex ml-md-3 ml-0 bg-gray-600 py-0 mr-2"
                style="height: 2.8rem"
              >
                <span class="el-dropdown-link w-100 text-center fw-400">
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
          <tr v-for="(branch, index) in searchBranchDetail" :key="index">
            <td @click="viewBranch(branch)" class="fw-500">{{ branch.name }}</td>
            <td>{{ branch.membershipSize.toLocaleString() }}</td>
            <td @click="viewBranch(branch)">
              {{
                branch.currency && branch.currency.shortCode
                  ? branch.currency.shortCode
                  : ""
              }}
              {{ Math.abs(branch.currentYearAverageAttendance).toLocaleString() }}
            </td>
            <td @click="viewBranch(branch)">
              {{
                branch.currency && branch.currency.shortCode
                  ? branch.currency.shortCode
                  : ""
              }}
              {{ Math.abs(branch.currentYearAverageIncome).toLocaleString() }}
            </td>
            <td @click="viewBranch(branch)">
              {{
                branch.currency && branch.currency.shortCode
                  ? branch.currency.shortCode
                  : ""
              }}
              {{ Math.abs(branch.currentYearAverageExpense).toLocaleString() }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="container-fluid">
      <div
        class="row border mt-4"
        v-loading="branchLoading"
      >
        <div class="adjust-view col-md-12 d-flex justify-content-end">
          <div>
            <el-dropdown trigger="click" class="w-100">
              <span class="el-dropdown-link w-100">
                <div
                  class="d-flex justify-content-between h5 text-secondary w-100"
                  size="large"
                >
                  <span>Sort By {{
                    selectedWeekly && selectedWeekly.name
                      ? selectedWeekly.name
                      : selectedWeekly
                  }}</span>
                  <div>
                    <el-icon class="el-icon--right">
                      <arrow-down />
                    </el-icon>
                  </div>
                </div>
              </span>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item
                    v-for="(itm, indx) in chartItemdropdown"
                    :key="indx"
                    @click="selectedType2(itm)"
                    >{{ itm.name }}
                  </el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
        </div>
        <div class="col-md-12"  v-loading="branchLoading">
          <ColumnChart
            domId="chart2"
            title="First Timer InFlow"
          />
        </div>
        <!-- <div class="col-md-12" v-if="firstTimerWeeklyAtt" v-loading="loading">
          <ColumnChart
            domId="chart2"
            :data="weeklyFirstTimerObj"
            :series="series2"
            title="First Timer InFlow"
            :header="firstTimerHeader"
          />
        </div> -->
        <div class="col-md-12" v-loading="branchLoading">
          <ColumnChart
            domId="chart2"
            title="First Timer InFlow"

          />
        <!-- <div class="col-md-12" v-if="firstTimerMonthlyAtt" v-loading="loading">
          <ColumnChart
            domId="chart2"
            :data="monthlyFirstTimerObj"
            :series="series2"
            title="First Timer InFlow"
            :header="firstTimerHeader"
          /> -->
        </div>
      </div>
    </div>
    <el-dialog class="border-radius-20" v-model="displayModal" :width="mdAndUp || lgAndUp || xlAndUp ? `50%` : `90%`" align-center>
      <div class="row ">
        <div class="col-md-12 d-flex justify-content-center">
          <div class="text-dak s-24 fw-500">
            Which of these option best suit your intentions?
          </div>
        </div>
        <div class="col-md-12 mt-4">
          <div class="row d-flex justify-content-center ">
            <div class="col-md-6 d-flex flex-column align-items-center justify-content-center">
              <el-button round size="large" @click="simpleBranch" :color="primarycolor" class="w-100 mb-3 py-4 text-center c-pointer">
                <span class="fw-400 s-20">Simple branch network</span>
              </el-button>
              <el-button round size="large"  class=" w-100 border-black text-dak  py-4 mb-3 text-center c-pointer">
                <span class="fw-400 s-20">Hierarchical Branch Network</span>
              </el-button>
            </div>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { ref, inject, onMounted, computed } from "vue";
import axios from "@/gateway/backendapi";
import BranchIcon from "../../assets/ecommerce/branchIcon.png";
import router from "../../router";
import deviceBreakpoint from "../../mixins/deviceBreakpoint";
import AnalysicIcon from "../../assets/ecommerce/analysicIcon.png";
import ArrowUp from "../../assets/ecommerce/ArrowUp.png";
import ArrowDown from "../../assets/ecommerce/ArrowDown.png";
import WalkIcon from "../../assets/ecommerce/WalkIcon.png";
import ColumnChart from "@/components/charts/BranchColumnChart.vue";
import { Search } from "@element-plus/icons-vue";
import { useRoute } from "vue-router";
import store from "../../store/store";
const tenantId = ref(
      store.getters.currentUser && store.getters.currentUser.tenantId
        ? store.getters.currentUser.tenantId
        : 0
    );
// import router from "../../router";

export default {
  components: {
    ColumnChart
  },
  setup() {
    const displayModal = ref(false);
    const networkError = ref(false);
    const branchLoading = ref(false);
    const route = useRoute();
    const searchText = ref("");
    const tenantInfo = ref({});
    const selectedWeekly = ref("Month");
    const allBranchDetail = ref(store.getters["branch/getbranches"]);
    const { mdAndUp, lgAndUp, xlAndUp, xsOnly } = deviceBreakpoint();

    const primarycolor = inject("primarycolor");
    const showModal = () => {
      displayModal.value = true;
    };
    const chartItemdropdown = ref([
      { name: "Month", id: 1 },
      { name: "Week", id: 2 },
    ]);
    const viewBranch = (item) => {
      console.log(item, "mmmmmmmm");
      localStorage.setItem("branchId", item.id);
      localStorage.setItem("branchName", item.name);
      router.push("/tenant/branches/summary");
    };

    const simpleBranch = () => {
      router.push('/tenant/branch/simplebranch')
    }

    const selectedType2 = (item) => {
      selectedWeekly.value = item;
    };
    const getBranches = async () => {
      branchLoading.value = true;

      try {
        await store.dispatch("branch/getBranches").then((res) => {
          allBranchDetail.value = res;
          branchLoading.value = false;
        });
      } catch (error) {
        branchLoading.value = false;
        networkError.value = true;
        if (error.toString().toLowerCase().includes("network error")) {
          networkError.value = true;
        } else {
          networkError.value = false;
        }
      }
    };

    const getTotalPeopleBch = computed(() => {
      if (allBranchDetail.value && allBranchDetail.value.length > 0) {
        return allBranchDetail.value
          .map((i) => i.membershipSize)
          .reduce((b, a) => b + a, 0);
      } else {
        return 0;
      }
    });
    const searchBranchDetail = computed(() => {
      if (searchText.value !== "" && allBranchDetail.value.length > 0) {
        return allBranchDetail.value.filter((i) => {
          if (i.name)
            return i.name.toLowerCase().includes(searchText.value.toLowerCase());
        });
      } else {
        return allBranchDetail.value;
      }
    });
    const getBranchTenantDashboard = async () => {
      branchLoading.value = true
      try {
        const { data } = await axios.get(
          `/DashboardForTenant?_TenantId=${tenantId.value}`
        );
        tenantInfo.value = data
        console.log(tenantInfo.value, 'ghhs');
        // tenantInfoFirstTimerWeekly.value =
        //   data.firstTimerSummary.firstTimerWeekly;
        // tenantInfoFirstTimerMonthly.value =
        //   data.firstTimerSummary.firstTimerMonthly;

        // tenantInfoFirstTimerMonthly.value[0].data.forEach((element) => {
        //   if (element > 0) {
        //     firstTimerDataExist.value = true;
        //   }
        // });
        branchLoading.value = false
      } catch (error) {
        if (error.toString().toLowerCase().includes("network error")) {
          networkError.value = true
        } else {
          networkError.value = false
        }
        branchLoading.value = false
      }
    };
    getBranchTenantDashboard();

    onMounted(() => {
      if (allBranchDetail.value && allBranchDetail.value.length == 0) getBranches();
    });
    

    return {
      tenantInfo,
      viewBranch,
      selectedWeekly,
      tenantId,
      getTotalPeopleBch,
      allBranchDetail,
      route,
      networkError,
      displayModal,
      branchLoading,
      primarycolor,
      BranchIcon,
      ArrowUp,
      ArrowDown,
      WalkIcon,
      AnalysicIcon,
      showModal,
      searchText,
      searchBranchDetail,
      Search,
      chartItemdropdown,
      selectedType2,
      simpleBranch,
      mdAndUp, lgAndUp, xlAndUp, xsOnly
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
