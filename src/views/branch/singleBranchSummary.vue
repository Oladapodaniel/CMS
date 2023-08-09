<template>
  <div class="row">
    <div class="container-fluid">
      <div class="py-5 px-3 row flex-wrap justify-content-around branch-corner">
        <div class="col-md-12 d-flex justify-content-end pb-3">
          <div>
            <el-dropdown trigger="click" class="w-100">
              <span class="el-dropdown-link w-100">
                <div
                  class="d-flex justify-content-between p-2 border-round bg-dark text-white w-100"
                  size="large"
                >
                  <span class="text-white">{{ selectedAction }}</span>
                  <div>
                    <el-icon class="el-icon--right">
                      <arrow-down />
                    </el-icon>
                  </div>
                </div>
              </span>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item>
                    <router-link
                      class="w-100 text-dark text-decoration-none"
                      to="/tenant/sms/compose"
                    >
                      <el-icon class="text-primary"><ChatDotRound /></el-icon>
                      Send SMS
                    </router-link>
                  </el-dropdown-item>
                  <el-dropdown-item>
                    <router-link
                      class="w-100 text-dark text-decoration-none"
                      to="/tenant/email/compose"
                    >
                      <el-icon class="text-primary"><Message /></el-icon>
                      Send Email
                    </router-link>
                  </el-dropdown-item>
                  <el-dropdown-item>
                    <router-link
                      class="w-100 text-dark text-decoration-none"
                      to="/tenant/branch/singleBaranhSummary"
                    >
                      <el-icon class="text-primary"><ChatRound /></el-icon>
                      Send Whatsap
                    </router-link>
                  </el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
        </div>
        <div class="col-md-3 mt-3 mt-md-0 font-weight-bold">
          <div class="row card-summary shadow">
            <div class="col-md-2">
              <div class="row">
                <div class="text-primary col-md-2 mt-2">
                  <el-icon :size="35" class="rounded-circle p-1 icon"
                    ><UserFilled
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
              Total People
            </div>
          </div>
        </div>
        <div class="col-md-3 mt-3 mt-md-0 font-weight-bold">
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
              30
            </div>
            <div
              class="total-bg col-md-12 py-3 font-weight-bold px-0 box-bottom text-center"
            >
              Average Attendance
            </div>
          </div>
        </div>
        <div class="col-md-3 mt-3 mt-md-0 font-weight-bold">
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
            <div class="col-md-12 mt-4 pt-2 font-weight-bold h4 text-right">
              2,986
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
    <div class="container-fluid">
      <div class="row border mt-4">
        <div class="col-md-12 d-flex justify-content-end py-3">
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
            :header="IncomeExpHeader"
          />
        </div>
      </div>
      <div class="row border mt-4">
        <div class="col-md-12 d-flex justify-content-end py-3">
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
            domId="chart2"
            :data="branchData2"
            :series="seriesData"
            :title="firstTimerHeader"
            :header="firstTimerHeader"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, inject, onMounted, onUpdated } from "vue";
import ColumnChart from "@/components/charts/BranchColumnChart.vue";
export default {
  components: {
    ColumnChart,
  },
  setup() {
    const selectedAction = ref("Quick Action");
    const firstTimerHeader = ref("First Timer Attendance");
    const selectedMonthly = ref("Monthly");
    const selectedWeekly = ref("Monthly");
    const IncomeExpHeader = ref("Income & Expenses");

    const QuickActions = ref([
      { name: "Send SMS", id: 1 },
      { name: "Send Email", id: 2 },
      { name: "Send Whatsap", id: 3 },
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

    const chartItemdropdown = ref([
      // { name: "Branches", id: 1 },
      { name: "Weekly", id: 2 },
      { name: "Monthly", id: 3 },
    ]);

    const selectedType2 = (item) => {
      selectedWeekly.value = item;
    };
    const selectedType1 = (item) => {
      selectedMonthly.value = item;
    };

    return {
      selectedAction,
      selectedType2,
      selectedType1,
      chartItemdropdown,
      selectedMonthly,
      selectedWeekly,
      QuickActions,
      seriesData,
      branchData2,
      firstTimerHeader,
      IncomeExpHeader,
    };
  },
};
</script>

<style scoped>
.branch-corner {
  border-radius: 0.5rem;
  background: #f3f3f3;
}
.border-round {
  border-radius: 5rem;
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