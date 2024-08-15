<template>
  <div class="container-fluid px-0">
    <div class="py-5 row justify-content-between">
      <div class="col-md-3 mb-4">
        <div
          class="card card-summary border-radius-15 bg-gray-400 border-no-radius h-100 pb-2 px-3 pt-1"
          v-loading="loading"
        >
          <div class="card-icon my-2">
            <img src="../../assets/users4.png" class="rounded-circle p-1 icon" alt="" />
          </div>
          <div class="card-content mt-4">
            <div class="mb-2">
              <h3 class="card-title font-weight-600">
                {{
                  tenantInfo && tenantInfo.memberCount
                    ? tenantInfo.memberCount.toLocaleString()
                    : ""
                }}
              </h3>
              <span class="card-text">Total People</span>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-3 mb-4">
        <div
          class="card card-summary border-radius-15 bg-gray-400 border-no-radius h-100 pb-2 px-3 pt-1"
          v-loading="loading"
        >
          <div class="card-icon my-2">
            <img src="../../assets/Vector.png" class="rounded-circle p-1 icon" alt="" />
          </div>
          <div class="card-content mt-4">
            <div class="mb-2">
              <h3 class="card-title font-weight-600">
                {{ getAllAverageAttendance.toLocaleString() }}
              </h3>
              <span class="card-text">Average Attendance</span>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-3 mb-4">
        <div
          class="card card-summary border-radius-15 bg-gray-400 border-no-radius h-100 pb-2 px-3 pt-1"
          v-loading="loading"
        >
          <div class="card-icon my-2">
            <img src="../../assets/money.png" class="rounded-circle p-1 icon" alt="" />
          </div>
          <div class="card-content mt-4">
            <div class="mb-2">
              <h3 class="card-title font-weight-600">
                {{
                  Math.round(singleBranchInfo.currentYearAverageIncome).toLocaleString()
                }}
              </h3>
              <span class="card-text">Average Income</span>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-3 mb-4">
        <div
          class="card card-summary border-radius-15 bg-gray-400 border-no-radius h-100 pb-2 px-3 pt-1"
          v-loading="loading"
        >
          <div class="card-icon my-2">
            <img src="../../assets/money.png" class="rounded-circle p-1 icon" alt="" />
          </div>
          <div class="card-content mt-4">
            <div class="mb-2">
              <h3 class="card-title font-weight-600">
                {{
                  Math.round(singleBranchInfo.currentYearAverageExpense).toLocaleString()
                }}
              </h3>
              <span class="card-text"> Average Expense</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="container-fluid px-0 mt-5">
    <div class="row">
      <div class="col-md-12">
        <h4>Quick Actions</h4>
        <div class="d-flex flex-wrap">
          <el-button
            round
            color="#E3FEFF"
            size="large"
            class="mr-2 py-4 mb-3"
            @click="toggleSMS(singleBranchInfo.id)"
          >
            <el-icon :size="23"><ChatDotSquare /></el-icon>
            <span class="fw-500 s-15">Send SMS</span>
          </el-button>
          <el-button
            round
            color="#E3FEFF"
            class="mx-2 d-flex py-4 mb-3"
            size="large"
            @click="toggleEMAIL(singleBranchInfo.id)"
          >
            <el-icon :size="23"><Message /></el-icon>
            <span class="fw-500 s-15">Send Email</span>
          </el-button>
          <el-button
            round
            color="#E3FEFF"
            class="mx-2 d-flex py-4 mb-3"
            size="large"
            @click="displayWhatsappDrawer(singleBranchInfo)"
          >
            <el-icon :size="23"><ChatLineRound /></el-icon>
            <span class="fw-500 s-15">Send WhatsApp</span>
          </el-button>
        </div>
      </div>
    </div>
  </div>
  <!-- <div>{{ tenantInfo }}</div> -->
  <div class="container-fluid" v-show="!loading && tenantInfo && tenantInfo.churchName">
    <div class="row border mt-4" v-loading="loading">
      <div class="col-md-12">
        <ColumnChart
          domId="chart1"
          :data="incomeExpenseChart"
          :series="series"
          :header="IncomeExpHeader"
        />
      </div>
    </div>
    <div
      class="row border mt-4"
      v-loading="loading"
      v-if="tenantInfoFirstTimerWeekly && firstTimerDataExist"
    >
      <div class="adjust-view col-md-12 d-flex justify-content-end">
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
      <div class="col-md-12" v-if="firstTimerWeeklyAtt" v-loading="loading">
        <!-- <LineChart
          domId="Firsttimer"
          title=""
          :categories="weeklyFirstTimerObj"
          :seriesData="series2"
          :header="firstTimerHeader"
        /> -->
        <ColumnChart
          domId="chart2"
          :data="weeklyFirstTimerObj"
          :series="series2"
          title="First Timer InFlow"
          :header="firstTimerHeader"
        />
      </div>
      <div class="col-md-12" v-if="firstTimerMonthlyAtt" v-loading="loading">
        <!-- <LineChart
          domId="Firsttimer"
          title=""
          :categories="monthlyFirstTimerObj"
          :seriesData="series2"
          :header="firstTimerHeader"
        /> -->
        <ColumnChart
          domId="chart2"
          :data="monthlyFirstTimerObj"
          :series="series2"
          title="First Timer InFlow"
          :header="firstTimerHeader"
        />
      </div>
    </div>
    <div
      class="row border mt-4"
      v-loading="loading"
      v-if="tenantInfoAttendanceMonthly && MemberAttDataExist"
    >
      <div class="col-md-12 d-flex justify-content-end adjust-view">
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
                  v-for="(itm, indx) in chartItemdropdown2"
                  :key="indx"
                  @click="selectedType3(itm)"
                  >{{ itm.name }}
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </div>
      <div class="col-md-12" v-if="attendancerWeeklyAtt" v-loading="loading">
        <ColumnChart
          domId="chart3"
          :data="weeklyAttendanceObj"
          :series="series1"
          title="Event Attendance"
          subtitle="Weekly Attendance of Events"
          :header="MemberAttendanceHeader"
        />
      </div>
      <div class="col-md-12" v-if="attendancerMonthlyAtt" v-loading="loading">
        <ColumnChart
          domId="chart3"
          :data="monthlyAttendanceObj"
          :series="series1"
          title="Event Attendance"
          subtitle="Monthly Attendance of Events"
          :header="MemberAttendanceHeader"
        />
      </div>
    </div>
  </div>

  <div v-if="!loading && !networkError && !tenantInfo" class="no-person w-100 mt-4">
    <div class="empty-img">
      <p><img src="../../assets/people/people-empty.svg" alt="" /></p>
      <p class="tip">No Record Found for this branch</p>
      <!-- <el-button :color="primarycolor" @click="addNewFirsttimer" class="ml-2 header-btn" round>Add First Timers</el-button> -->
    </div>
  </div>
  <div class="adjust-network" v-else-if="networkError">
    <img src="../../assets/network-disconnected.png" />
    <div>Opps, Your internet connection was disrupted</div>
  </div>
  <el-drawer
    v-model="showSMS"
    :size="mdAndUp || lgAndUp || xlAndUp ? '70%' : '100%'"
    direction="rtl"
  >
    <template #header>
      <h4>Send SMS</h4>
    </template>
    <template #default>
      <div>
        <smsComponent @closesidemodal="() => (showSMS = false)" />
        <!-- <smsComponent :phoneNumbers="contacts" @closesidemodal="() => showSMS = false" /> -->
      </div>
    </template>
  </el-drawer>
  <el-drawer
    v-model="showEmail"
    :size="mdAndUp || lgAndUp || xlAndUp ? '70%' : '100%'"
    direction="rtl"
  >
    <template #header>
      <h4>Send Email</h4>
    </template>
    <template #default>
      <div>
        <emailComponent @closesidemodal="() => (showEmail = false)" />
        <!-- <emailComponent :selectedGroupMembers="markedMembers" @closesidemodal="() => showEmail = false" /> -->
      </div>
    </template>
  </el-drawer>
  <el-drawer
    v-model="showWhatsapp"
    :size="mdAndUp || lgAndUp || xlAndUp ? '70%' : '100%'"
    direction="rtl"
  >
    <template #default>
      <div>
        <whatSappComponent @closesidemodal="() => (showWhatsapp = false)" />
        <!-- <emailComponent :selectedGroupMembers="markedMembers" @closesidemodal="() => showEmail = false" /> -->
      </div>
    </template>
  </el-drawer>
  <!-- <el-drawer
      v-model="showWhatsapp"
      :size="mdAndUp || lgAndUp || xlAndUp ? '70%' : '100%'"
      direction="rtl"
      class="whatsappdrawer"
    >
      <template #header> </template>
      <template #default>
        <div v-if="!whatsappClientState">
          <div class="d-flex justify-content-center align-items-center">
            <img src="../../assets/whatsappwhiteoutline.svg" />
            <h4 class="font-weight-700 text-dark mb-0 ml-2">
              Send Whatsapp message to
            </h4>
          </div>
          <h4 class="text-center text-secondary font-weight-600">
            {{
              sendWhatsappToMultiple
                ? "Selected Members"
                : whatsappRecipient.firstName
            }}
          </h4>
        </div>
          <div v-if="whatsappClientState">
          <div>
            <div>
              Recipient{{ sendWhatsappToMultiple ? "s" : "" }}
              <el-tooltip
                class="box-item"
                effect="customized"
                content="<div>Make sure that the numbers are correctly formatted.</div> <div>A correct format should include the country code with the phone number. E.g +2349059403948.</div> <div>It works either with the '+' symbol or without it.</div>"
                raw-content
                placement="top"
              >
                <el-icon>
                  <InfoFilled />
                </el-icon>
              </el-tooltip>
            </div>
            <div
              class="d-flex align-items-center flex-wrap"
              v-if="sendWhatsappToMultiple"
            >
              <el-tag
                class="mx-1"
                size="large"
                closable
                v-for="(item, index) in marked
                  .filter((i) => i.mobilePhone)
                  .splice(0, 10)"
                :key="item.id"
                @close="marked.splice(index, 1)"
                >{{ item.mobilePhone }}</el-tag
              >
            </div>
            <vue-tel-input
              class="mt-2"
              style="height: 40px"
              v-model="whatsappRecipient.mobilePhone"
              mode="international"
              v-else
            ></vue-tel-input>
            <div
              v-if="sendWhatsappToMultiple && marked.length > 10"
              class="text-secondary font-weight-600 mt-2"
            >
              and {{ marked.length - 10 }}
              {{ marked.length - 10 > 1 ? "others" : "other" }}
            </div>
          </div>
          <div class="mt-4">
            <el-input
              type="textarea"
              rows="8"
              placeholder="Enter your message"
              v-model="whatsappmessage"
            ></el-input>
          </div>
        </div>
        <div v-else class="mt-5">
          <AuthenticateWhatsapp />
        </div>
      </template>
      <template #footer v-if="whatsappClientState">
        <el-button
          :color="primarycolor"
          :loading="sendingwhatsappmessage"
          @click="sendWhatsapp()"
          round
          >Send <img src="../../assets/send-jet.svg" class="ml-2"
        /></el-button>
      </template>
    </el-drawer> -->
</template>

<script>
import { ref, inject, onMounted, watchEffect, computed } from "vue";
import ColumnChart from "@/components/charts/BranchColumnChart.vue";
import axios from "@/gateway/backendapi";
import smsComponent from "../groups/component/smsComponent.vue";
import emailComponent from "../groups/component/emailComponent.vue";
import whatSappComponent from "../groups/component/whatSappComponent.vue";
import { socket } from "@/socket";
// import { ElMessage } from "element-plus";
// import AuthenticateWhatsapp from "../../components/whatsapp/AuthenticateWhatsapp.vue";
import deviceBreakpoint from "../../mixins/deviceBreakpoint";
import LineChart from "@/components/charts/LineChart.vue";
import store from "../../store/store";
import swal from "sweetalert";
export default {
  components: {
    ColumnChart,
    whatSappComponent,
    smsComponent,
    emailComponent,
    LineChart,
    // AuthenticateWhatsapp,
  },
  setup() {
    const selectedAction = ref("Quick Action");
    const firstTimerHeader = ref("First Timer Attendance");
    const MemberAttendanceHeader = ref("Members Attendance");
    const selectedMonthly = ref("Monthly");
    const selectedWeekly = ref("Monthly");
    const primarycolor = inject("primarycolor");
    const branchesAnalytics = ref({});
    const IncomeExpHeader = ref("Income & Expenses");
    const branchId = ref("");
    const loading = ref(false);
    const getAllAverageIncome = ref("");
    const getAllAverageAttendance = ref("");
    const getTotalPeople = ref("");
    const allBranches = ref([]);
    const expenseData = ref([]);
    const incomeData = ref([]);
    const series = ref([]);
    const showWhatsapp = ref(false);
    const mainIncomeExpenseData = ref([]);
    const firstTimerAttendanceData = ref([]);
    const tenantInfoFirstTimerWeekly = ref([]);
    const tenantInfoFirstTimerMonthly = ref([]);
    const tenantInfoAttendanceWeekly = ref([]);
    const tenantInfoAttendanceMonthly = ref([]);
    const sendingwhatsappmessage = ref(false);
    const firstTimerWeeklyAtt = ref(false);
    const attendancerWeeklyAtt = ref(false);
    const attendancerMonthlyAtt = ref(false);
    const sendWhatsappToMultiple = ref(false);
    const networkError = ref(false);
    const xAxis = ref([]);
    const firstTimerMonthlyAtt = ref(true);
    const firstTimerData = ref([]);
    const firstTimerDataExist = ref(false);
    const MemberAttDataExist = ref(false);
    const showEmail = ref(false);
    const showSMS = ref(false);
    const singleBranchInfo = ref({});
    const tenantInfo = ref({});
    const { mdAndUp, lgAndUp, xlAndUp, xsOnly } = deviceBreakpoint();
    const branchItem = ref(store.getters.currentBranch);
    console.log(store.getters.currentBranch, "i have more than a soing");
    const monthXaxis = ref([
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ]);

    const getBranchItem = () => {
      branchItem.value = store.getters.currentBranch;
      console.log(branchItem.value, "lllll");
    };
    getBranchItem();

    onMounted(() => {
      const branchID = localStorage.getItem("branchId");
      branchId.value = branchID;
      // if (branchItem.value && Object.keys(branchItem.value).length == 0)
      // getBranchItem()
    });

    const getBranchesAnalytics = async () => {
      const branchID = localStorage.getItem("branchId");
      try {
        let { data } = await axios.get(`/api/Branching/analytics?branchID=${branchID}`);
        branchesAnalytics.value = data;
      } catch (error) {
        console.log(error);
      }
    };
    getBranchesAnalytics();

    const series1 = computed(() => {
      if (attendancerWeeklyAtt.value === true) return xAxis.value;
      return monthXaxis.value;
    });

    const series2 = computed(() => {
      if (firstTimerWeeklyAtt.value === true) return xAxis.value;
      return monthXaxis.value;
    });

    onMounted(() => {
      for (let i = 1; i <= 52; i++) {
        xAxis.value.push(i);
      }
      if (selectedWeekly.value === "Monthly") {
        firstTimerMonthlyAtt.value = true;
        getBranchTenantDashboard();
      }
      if (selectedMonthly.value === "Monthly") {
        attendancerMonthlyAtt.value = true;
        getBranchTenantAttendance();
      }
    });

    const whatsappClientState = computed(() => {
      return store.getters["communication/isWhatsappClientReady"];
    });

    const toggleSMS = (id) => {
      showSMS.value = true;
      console.log(id, "id 1");
    };
    const toggleEMAIL = (id) => {
      showEmail.value = true;
      console.log(id, "id 2");
    };

    watchEffect(() => {
      socket.on("messagesent", (data) => {
        console.log(data, "status");
        swal(" Success", "Whatsapp message sent successfully!", "success");
        showWhatsapp.value = false;
        sendingwhatsappmessage.value = false;
      });
    });
    // const sendWhatsapp = () => {
    //   sendingwhatsappmessage.value = true
    //   if (sendWhatsappToMultiple.value) {
    //     socket.emit('sendwhatsappmessage', {
    //       id: clientSessionId.value,
    //       phone_number: marked.value.map(i => i.mobilePhone),
    //       message: whatsappmessage.value
    //     })
    //   }
    //   else {
    //     socket.emit('sendwhatsappmessage', {
    //       id: clientSessionId.value,
    //       phone_number: whatsappRecipient.value.mobilePhone,
    //       message: whatsappmessage.value
    //     })
    //   }
    // }

    const getBranchTenantDashboard = async () => {
      loading.value = true;
      const branchID = localStorage.getItem("branchId");
      try {
        const { data } = await axios.get(`/DashboardForTenant?_TenantId=${branchID}`);
        tenantInfo.value = data ? data : [];
        tenantInfoFirstTimerWeekly.value = data.firstTimerSummary.firstTimerWeekly;
        tenantInfoFirstTimerMonthly.value = data.firstTimerSummary.firstTimerMonthly;

        tenantInfoFirstTimerMonthly.value[0].data.forEach((element) => {
          if (element > 0) {
            firstTimerDataExist.value = true;
          }
        });
        loading.value = false;
      } catch (error) {
        if (error.toString().toLowerCase().includes("network error")) {
          networkError.value = true;
        } else {
          networkError.value = false;
        }
        loading.value = false;
      }
    };
    getBranchTenantDashboard();

    const weeklyFirstTimerObj = computed(() => {
      if (!tenantInfoFirstTimerWeekly.value) return [];
      tenantInfoFirstTimerWeekly.value[0].color = "#002044";
      return tenantInfoFirstTimerWeekly.value;
    });

    const monthlyFirstTimerObj = computed(() => {
      if (!tenantInfoFirstTimerMonthly.value) return [];
      tenantInfoFirstTimerMonthly.value[0].color = "#002044";
      return tenantInfoFirstTimerMonthly.value;
    });

    const getBranchTenantCelebrants = async () => {
      const branchID = localStorage.getItem("branchId");
      try {
        const { data } = await axios.get(
          `/Dashboard/CelebrationsForTenant?_TenantId=${branchID}`
        );
        console.log(data, "DashboardCelebrant");
      } catch (error) {}
    };
    getBranchTenantCelebrants();

    const getBranchTenantAttendance = async () => {
      loading.value = true;
      const branchID = localStorage.getItem("branchId");
      try {
        const { data } = await axios.get(
          `/Dashboard/AttendanceForTenant?_TenantId=${branchID}`
        );
        tenantInfoAttendanceWeekly.value =
          data.returnObject.eventAttendanceChartDataWeekly;
        tenantInfoAttendanceMonthly.value =
          data.returnObject.eventAttendanceChartDataMonthly;

        tenantInfoAttendanceMonthly.value[0].data.forEach((element) => {
          if (element > 0) {
            MemberAttDataExist.value = true;
          }
        });
        loading.value = false;
      } catch (error) {
        if (error.toString().toLowerCase().includes("network error")) {
          networkError.value = true;
        } else {
          networkError.value = false;
        }
        loading.value = false;
      }
    };
    getBranchTenantAttendance();

    const weeklyAttendanceObj = computed(() => {
      if (!tenantInfoAttendanceWeekly.value) return [];
      let chartWeekly = [];
      let chartObj = tenantInfoAttendanceWeekly.value.find(
        (i) => i.name === "Attendance"
      );
      chartObj["color"] = "#002044";
      chartWeekly.push(chartObj);
      return chartWeekly;
    });
    const monthlyAttendanceObj = computed(() => {
      if (!tenantInfoAttendanceMonthly.value) return [];
      let chartMonthly = [];
      let chartObj = tenantInfoAttendanceMonthly.value.find(
        (i) => i.name === "Attendance"
      );
      chartObj["color"] = "#002044";
      chartMonthly.push(chartObj);
      return chartMonthly;
    });

    const displayWhatsappDrawer = (item) => {
      showWhatsapp.value = true;
      if (item) {
        // whatsappRecipient.value = item;
        sendWhatsappToMultiple.value = false;
      } else {
        // marked.value = marked.value.filter(i => i.mobilePhone).splice(0, 10)
        sendWhatsappToMultiple.value = true;
      }
    };

    const getAllBranches = async () => {
      // const singleBranchID = localStorage.getItem('branchId')
      mainIncomeExpenseData.value = [];
      loading.value = true;
      try {
        let { data } = await axios.get(`/api/Branching/${branchId.value}`);

        allBranches.value = data.returnObject;
        getTotalPeople.value = data.returnObject
          .map((i) => i.membershipSize)
          .reduce((b, a) => b + a, 0);
        getFirtTimerSeris();

        loading.value = false;
      } catch (error) {
        loading.value = false;
        console.log(error);
      }
    };
    getAllBranches();

    const geSingleBranchInfo = async () => {
      const singleBranchID = localStorage.getItem("branchId");
      loading.value = true;
      try {
        let { data } = await axios.get(
          `/api/Branching/GetBranchInformation?Id=${singleBranchID}`
        );
        singleBranchInfo.value = data.returnObject;
        getAllAverageAttendance.value = data.returnObject.currentYearAverageAttendance.toFixed(
          0
        );
        console.log(singleBranchInfo.value, "kksingle");
        getFirtTimerSeris();

        loading.value = false;
      } catch (error) {
        loading.value = false;
        console.log(error);
      }
    };
    geSingleBranchInfo();

    const incomeExpenseChart = computed(() => {
      mainIncomeExpenseData.value = [];
      mainIncomeExpenseData.value.push({
        name: " Income ",
        color: "#01058A",
        data: [Math.abs(singleBranchInfo.value.currentYearIncome)],
      });
      mainIncomeExpenseData.value.push({
        name: " Expenses ",
        color: "#1AA8E9",
        data: [singleBranchInfo.value.currentYearExpense],
      });

      return mainIncomeExpenseData.value;
    });

    const firstTimerChart = computed(() => {
      firstTimerAttendanceData.value = [];

      firstTimerAttendanceData.value.push({
        name: "First Timer",
        color: `#1AA8E9`,
        // color: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
        data: [singleBranchInfo.value.firstTimerCount],
      });
      return firstTimerAttendanceData.value;
    });

    const getFirtTimerSeris = () => {
      let branchName = singleBranchInfo.value.name;
      series.value.unshift(branchName);
    };

    const chartItemdropdown = ref([
      // { name: "Branches", id: 1 },
      { name: "Weekly", id: 2 },
      { name: "Monthly", id: 3 },
    ]);

    const chartItemdropdown2 = ref([
      // { name: "Branches", id: 1 },
      { name: "Weekly", id: 2 },
      { name: "Monthly", id: 3 },
    ]);

    const selectedType2 = (item) => {
      selectedWeekly.value = item;
      if (item.name === "Weekly") {
        firstTimerWeeklyAtt.value = true;
        firstTimerMonthlyAtt.value = false;
        getBranchTenantDashboard();
      }
      if (item.name === "Monthly") {
        firstTimerWeeklyAtt.value = false;
        firstTimerMonthlyAtt.value = true;
        getBranchTenantDashboard();
      }
    };
    const selectedType3 = (item) => {
      selectedMonthly.value = item;
      if (item.name === "Weekly") {
        attendancerWeeklyAtt.value = true;
        attendancerMonthlyAtt.value = false;
        getBranchTenantAttendance();
      }
      if (item.name === "Monthly") {
        attendancerWeeklyAtt.value = false;
        attendancerMonthlyAtt.value = true;
        getBranchTenantAttendance();
      }
    };
    const selectedType1 = (item) => {
      selectedMonthly.value = item;
    };

    return {
      selectedAction,
      tenantInfoFirstTimerMonthly,
      weeklyFirstTimerObj,
      monthlyFirstTimerObj,
      tenantInfoFirstTimerWeekly,
      tenantInfoAttendanceWeekly,
      tenantInfoAttendanceMonthly,
      branchId,
      selectedType2,

      selectedType3,
      firstTimerMonthlyAtt,
      firstTimerWeeklyAtt,
      attendancerMonthlyAtt,
      MemberAttDataExist,
      attendancerWeeklyAtt,
      monthlyAttendanceObj,
      displayWhatsappDrawer,
      whatsappClientState,
      firstTimerDataExist,
      weeklyAttendanceObj,
      sendWhatsappToMultiple,
      networkError,
      mdAndUp,
      lgAndUp,
      xlAndUp,
      series1,
      xsOnly,
      toggleEMAIL,
      toggleSMS,
      selectedType1,
      chartItemdropdown,
      chartItemdropdown2,
      getAllAverageIncome,
      sendingwhatsappmessage,
      allBranches,
      branchesAnalytics,
      getAllAverageAttendance,
      incomeExpenseChart,
      getTotalPeople,
      loading,
      selectedMonthly,
      selectedWeekly,
      series2,
      branchItem,
      series,
      firstTimerAttendanceData,
      showWhatsapp,
      singleBranchInfo,
      showSMS,
      showEmail,
      firstTimerData,
      firstTimerChart,
      firstTimerHeader,
      MemberAttendanceHeader,
      monthXaxis,
      xAxis,
      incomeData,
      expenseData,
      tenantInfo,
      IncomeExpHeader,
      mainIncomeExpenseData,
      primarycolor,
    };
  },
};
</script>

<style scoped>
.branch-corner {
  border-radius: 0.5rem;
  background: #f3f3f3;
}
.card-title {
  font-size: 30px !important;
  margin: 0;
}
.card-text {
  margin: 0;
  font-size: 17px !important;
  font-weight: 400 !important;
  color: #555555 !important;
}

.btn-outline-primary {
  background-color: #e0f7fa; /* light blue background */
  color: #333;
  border: none;
  padding: 10px 20px;
  display: flex;
  align-items: center;
}

.btn-outline-primary i {
  margin-right: 8px;
  font-size: 18px;
}

.no-person {
  height: 80vh;
  display: flex;
  text-align: center;
}

.empty-img {
  width: 85%;
  /* min-width: 397px; */
  margin: auto;
}

.empty-img img {
  width: 100%;
  max-width: 200px;
}

.border-round {
  border-radius: 5rem;
}

/* .icon {
  background: #c0dbfacc;

} */

.adjust-view {
  position: relative;
  top: 35px;
  right: 10px;
  z-index: 1;
}

.card-summary {
  border-radius: 8px;
  box-shadow: 2px 5px 10px 0px #00000026;
}

/* @media screen and (min-width: 1400px) {

  .no-person {
    height: calc(100% - 20px);
  }
} */

@media (max-width: 767px) {
  .adjust-view {
    position: relative;
    top: 0px;
    z-index: 1;
    padding-top: 2rem;
  }
}
</style>
