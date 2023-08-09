<template>
  <div class="container-fluid px-0">
    <div class="d-flex flex-column flex-sm-row justify-content-sm-between mb-3">
      <div class="head-text">Manage Branches</div>
      <div class="mb-3">
        <div class="c-pointer">
          <el-button round class="header-btn" :color="primarycolor">
            Add Branch
          </el-button>
        </div>
      </div>
    </div>
    <div class="container-fluid">
      <div
        class="py-5 pr-3 row flex-wrap justify-content-between branch-corner"
      >
        <div class="d-flex align-items-start">
          <img src="../../assets/thingstodo.svg" alt="" />
          <div class="font-weight-bold">
            <div class="font-weight-bold h5">Things You Can Do</div>
            <div class="mt-2">
              <router-link class="primary--text" to="/tenant/people/add"
                >Add Member</router-link
              >
            </div>
            <div class="mt-2">
              <router-link class="primary--text" to="/tenant/sms/compose"
                >Send SMS</router-link
              >
            </div>
            <div class="mt-2">
              <router-link
                class="primary--text"
                to="/tenant/people/addfirsttimer"
                >Add First Timer</router-link
              >
            </div>
          </div>
        </div>
        <div class="col-md-2 mt-3 mt-md-0 font-weight-bold">
          <div class="row card-summary shadow">
            <div class="col-md-2">
              <div class="row">
                <div class="text-primary col-md-2 mt-2">
                  <el-icon :size="35" class="rounded-circle p-1 icon"
                    ><Share
                  /></el-icon>
                </div>
              </div>
            </div>
            <div class="col-md-12 mt-4 pt-2 font-weight-bold h4 text-right">
              30
            </div>
            <div
              class="total-bg col-md-12 py-3 font-weight-bold px-0 box-bottom text-center"
            >
              Total Branches
            </div>
          </div>
        </div>
        <div class="col-md-2 mt-3 mt-md-0 font-weight-bold">
          <div class="row card-summary shadow">
            <div class="col-md-2">
              <div class="row">
                <div class="text-primary col-md-2 mt-2">
                  <el-icon :size="35" class="rounded-circle p-1 icon"
                    ><User
                  /></el-icon>
                </div>
              </div>
            </div>
            <div class="col-md-12 mt-4 pt-2 font-weight-bold h4 text-right">
              2,986
            </div>
            <div
              class="total-bg col-md-12 py-3 font-weight-bold px-0 box-bottom text-center"
            >
              Total People
            </div>
          </div>
        </div>
        <div class="col-md-2 mt-3 mt-md-0 font-weight-bold">
          <div class="row card-summary shadow">
            <div class="col-md-2">
              <div class="row">
                <div class="text-primary col-md-2 mt-2">
                  <el-icon :size="35" class="rounded-circle p-1 icon"
                    ><Notebook
                  /></el-icon>
                </div>
              </div>
            </div>
            <div class="col-md-12 mt-4 pt-2 font-weight-bold h4 text-right">
              85
            </div>
            <div
              class="total-bg col-md-12 py-3 font-weight-bold px-0 box-bottom text-center"
            >
              {{ averageAttendace }}
            </div>
          </div>
        </div>
        <div class="col-md-2 mt-3 mt-md-0 font-weight-bold">
          <div class="row card-summary shadow">
            <div class="col-md-2">
              <div class="row">
                <div class="text-primary col-md-2 mt-2">
                  <el-icon :size="35" class="rounded-circle p-1 icon"
                    ><TrendCharts
                  /></el-icon>
                </div>
              </div>
            </div>
            <div
              class="col-md-12 mt-4 pt-2 font-weight-bold h4 text-right"
              v-if="openHideAmonut"
            >
              150,000
            </div>
            <div
              class="col-md-12 mt-4 pt-2 font-weight-bold text-secondary h4 text-right"
              v-if="!openHideAmonut"
            >
              **********
            </div>
            <div
              class="total-bg col-md-12 py-3 font-weight-bold px-0 box-bottom text-center"
            >
              Average Income
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="container-fluid mt-3">
      <div class="row justify-content-between">
        <div class="col-md-7 col-12">
          <div class="row rounded shadow" style="height: 30vh">
            <div class="col-md-12 mt-3 d-flex justify-content-between">
              <div class="font-weight-bold">Total Attendance Chart</div>
              <div>view All</div>
            </div>
            <div class="col-md-12 d-flex justify-content-center">
              <!-- <div><DonutChart domId="charts" /></div> -->
            </div>
          </div>
          <div class="row">
            <div class="col-md-12 mt-4">
              <div class="font-weight-bold">Top Performing Branches</div>
            </div>
            <div class="col-md-12 mt-3">
              <div class="row">
                <div class="col-md-12">
                  <div class="font-weight-bold">First Timers</div>
                  <!-- <div class="mt-3 col-md-12">
                    <RadialChart domId="view2" />
                  </div> -->
                </div>
                <!-- <div class="col-md-4">
                  <div class="font-weight-bold">Finance</div>
                  <div class="mt-3"><RadialChart domId="view4" /></div>
                </div>
                <div class="col-md-4">
                  <div class="font-weight-bold">New Convert</div>
                  <div class="mt-3" style=""><RadialChart domId="view1" /></div>
                </div> -->
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-4 col-12 mt-3 mt-md-0 shadow rounded">
          <div class="row">
            <div class="col-md-12">
              <div class="mt-2">Average income</div>
              <div @click="hideOpen">
                <div class="mt-2" v-if="openHideAmonut">
                  <el-icon :size="25"><View /></el-icon>
                </div>
                <div class="mt-2" v-if="!openHideAmonut">
                  <el-icon :size="25"><Hide /></el-icon>
                </div>
              </div>

              <div class="font-weight-bold h5 mt-2" v-if="openHideAmonut">
                NGN 150,000
              </div>
              <div
                class="font-weight-bold mt-2 text-secondary h5"
                v-if="!openHideAmonut"
              >
                HIDDEN
              </div>
            </div>
            <div class="col-md-12">
              <PieChart
                domId="view"
                distance="5"
                :titleMargin="10"
                :summary="branchData"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="container-fluid mt-4">
      <div class="row border">
        <!-- <div
          class="col-md-12 border border-bottom-0 h5 font-weight-bold py-3 rounded"
        >
          First Timer Attendance
        </div> -->
        <div
          class="col-md-12  d-flex justify-content-end py-3"
        >
          <div>
            <el-dropdown trigger="click" class="w-100">
              <span class="el-dropdown-link w-100">
                <div
                  class="d-flex justify-content-between h5 text-secondary w-100"
                  size="large"
                >
                  <span>{{
                    selectedBranches && selectedBranches.name
                      ? selectedBranches.name
                      : selectedBranches
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
                    @click="selectedType3(itm)"
                    >{{ itm.name }}
                  </el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
        </div>
        <div class="col-md-12">
          <ColumnChart
            domId="chart2"
            :data="branchData2"
            :series="seriesData"
            :title="firstTimerHeader"
            :header=" firstTimerHeader"
          />
        </div>
      </div>
    </div>
    <div class="container-fluid mt-4">
      <div class="row border">
        <!-- <div
          class="col-md-12 border border-bottom-0 h5 font-weight-bold py-3 rounded"
        >
          Members Attendance
        </div> -->
        <div
          class="col-md-12 mt-2 d-flex justify-content-end py-3"
        >
          <div>
            <el-dropdown trigger="click" class="w-100">
              <span class="el-dropdown-link w-100">
                <div
                  class="d-flex justify-content-between h5 text-secondary w-100"
                  size="large"
                >
                  <span>{{
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
        <div class="col-md-12">
          <ColumnChart
            domId="chart4"
            :data="branchData2"
            :series="seriesData"
            :title="membersHeader"
            :header=" membersHeader"
          />
        </div>
      </div>
    </div>
    <div class="container-fluid mt-4">
      <div class="row border">
        <!-- <div
          class="col-md-12 border border-bottom-0 h5 font-weight-bold py-3 rounded"
        >
          Income & Expenses
        </div> -->
        <div
          class="col-md-12  d-flex justify-content-end py-3"
        >
          <div>
            <el-dropdown trigger="click" class="w-100">
              <span class="el-dropdown-link w-100">
                <div
                  class="d-flex justify-content-between h5 text-secondary w-100"
                  size="large"
                >
                  <span>{{
                    selectedMonthly && selectedMonthly.name
                      ? selectedMonthly.name
                      : selectedMonthly
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
                    @click="selectedType1(itm)"
                    >{{ itm.name }}
                  </el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
        </div>
        <div class="col-md-12">
          <ColumnChart
            domId="chart1"
            :data="branchData2"
            :series="seriesData"
            :title="IncomeExpHeader"
            :header=" IncomeExpHeader"
          />
        </div>
      </div>
    </div>
    <div class="container-fluid mt-4">
      <div class="row border">
        <div class="col-md-6">
          <div class="row">
            <div class="col-md-12 py-3  primary-bg text-white ">
              <el-icon :size="20"><List /></el-icon> Branch list
            </div>
            <div class="col-md-12 d-flex justify-content-end mt-3">
              <div>Member Size</div>
            </div>
            <div class="col-md-12 mt-3">
              <div class="row border">
                <div
                  class="col-md-12 py-2 border bg-secondary d-flex justify-content-between"
                >
                  <div class="font-weight-bold h6">Amazing Grace</div>
                  <div>150,000</div>
                </div>
                <div
                  class="col-md-12 py-2 border d-flex justify-content-between"
                >
                  <div class="font-weight-bold h6">Amazing</div>
                  <div>150,000</div>
                </div>
                <div
                  class="col-md-12 d-flex py-2 border justify-content-between"
                >
                  <div class="font-weight-bold h6">Amazing</div>
                  <div>150,000</div>
                </div>
                <div
                  class="col-md-12 d-flex py-2 border justify-content-between"
                >
                  <div class="font-weight-bold h6">Amazing</div>
                  <div>150,000</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-6">
          <div class="row">
            <div class="col-md-12 bg-secondary py-3">
              <el-icon :size="20" class=""><Expand /></el-icon> Branch Hierarchy
            </div>
            <div class="col-md-12">
              <div class="row">
                <div class="col-md-12 d-flex justify-content-between mt-3">
                  <div class="font-weight-bold">Amazing Grace</div>
                  <div class="small text-primary">View Branch</div>
                </div>
                <div class="col-md-12 mt-3">
                  <div class="mt-2">
                    First Timer : <span class="font-weight-bold">250</span>
                  </div>
                  <div class="mt-2">
                    Member Size : <span class="font-weight-bold">150,000</span>
                  </div>
                  <div class="mt-2">
                    Average Income :
                    <span class="font-weight-bold">NGN 3,000,000</span>
                  </div>
                  <div class="mt-2">
                    Average Expenses :
                    <span class="font-weight-bold">NGN 800,000</span>
                  </div>
                </div>
                <div class="col-md-12">
                  <hr class="w-100" />
                </div>
                <div class="col-md-12 d-flex justify-content-center">
                  <div class="small">Pastor's Profile</div>
                </div>
                <div class="col-md-12 d-flex justify-content-center">
                  <img src="../../assets/best-Copy.jpg" alt="" />
                </div>
                <div class="col-md-12 d-flex justify-content-center">
                  <div class="font-weight-bold">Dr. Paul Akasas</div>
                </div>
                <div class="col-md-12 d-flex justify-content-center">
                  <div>0705560884767</div>
                </div>
                <div class="col-md-12 d-flex justify-content-center">
                  <div>paualgg@gmail.com</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, inject, onMounted, onUpdated } from "vue";
import PieChart from "../../components/charts/BranchPieChart.vue";
import DonutChart from "../../components/charts/DonutChart.vue";
import RadialChart from "../../components/charts/RadialChart.vue";
import ColumnChart from "@/components/charts/BranchColumnChart.vue";
export default {
  components: {
    PieChart,
    DonutChart,
    RadialChart,
    ColumnChart,
  },
  setup() {
    const primarycolor = inject("primarycolor");
    const openHideAmonut = ref(true);
    const selectedMonthly = ref("Branches");
    const firstTimerHeader = ref("First Timer Attendance");
    const membersHeader = ref("Members Attendance");
    const IncomeExpHeader = ref("Income & Expenses");
    const selectedBranches = ref("Branches");
    const selectedWeekly = ref("Branches");
    const attendance = ref("Average Attendance");
    const averageAttendace = ref("");
    const branchData = ref([
      { name: null, value: 34 },
      { name: "Website", value: 2 },
      { name: "Flyer", value: 5 },
      { name: "Friend", value: 9 },
      { name: "Not Specified", value: 2 },
      { name: "Social Media", value: 6 },
    ]);
    const branchData2 = ref([
      {
        name: "Income",
        color: "#002044",
        data: [2, 1, 0, 1, 4, 4, 4, 0, 10, 2, 6, 6],
      },
      {
        name: "Expense",
        color: "#4baaf5",
        data: [1, 1, 2, 1, 4, 55, 4, 4, 9, 12, 6, 50],
      },
    ]);
    const seriesData = ref([
      "Amazing",
      "beatidah",
      "Covenant",
      "Hope",
      "Delight",
      "Royalp",
      "Gracious",
      "Solanata",
      "Delight",
      "Hope",
      "Redeeemed",
      "ChritApo",
    ]);

    onUpdated(() => {
      if (branchData.value) {
        branchData.value;
      } else {
        branchData.value;
      }
    });
    onMounted(() => {
      const lastCharacters = attendance.value.slice(-3);
      averageAttendace.value = attendance.value.replace(lastCharacters, "...");
    });
    const chartItemdropdown = ref([
      { name: "Branches", id: 1 },
      { name: "Weekly", id: 2 },
      { name: "Monthly", id: 3 },
    ]);

    const hideOpen = () => {
      openHideAmonut.value = !openHideAmonut.value;
    };
    const selectedType1 = (item) => {
      selectedMonthly.value = item;
    };
    const selectedType2 = (item) => {
      selectedWeekly.value = item;
    };
    const selectedType3 = (item) => {
      selectedBranches.value = item;
    };

    return {
      primarycolor,
      branchData2,
      firstTimerHeader,
      selectedBranches,
      selectedMonthly,
      selectedWeekly,
      selectedType1,
      selectedType2,
      selectedType3,
      IncomeExpHeader,
      membersHeader,
      hideOpen,
      branchData,
      seriesData,
      chartItemdropdown,
      openHideAmonut,
      attendance,
      averageAttendace,
    };
  },
};
</script>

<style scoped>
.branch-corner {
  border-radius: 0.5rem;
  background: #f3f3f3;
}
.box-bottom {
  background: #f1f5f8;
  box-shadow: 0px 11px 17px rgba(206, 205, 205, 0.360784);
  border-radius: 0px 0px 15px 15px;
}
.icon {
  background: #c0dbfacc;
  /* padding: 1rem; */
}
.total-bg {
  background: #f1f5f8;
}
.card-summary {
  background: #ffff;
  border-radius: 0.5rem;
}
</style>