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
                <el-dropdown-item class="text-black"
                  ><router-link
                    class="text-dak text-decoration-none"
                    to="/tenant/people/add"
                    >Add Member</router-link
                  >
                </el-dropdown-item>
                <el-dropdown-item class="text-black">
                  <router-link
                    class="text-dak text-decoration-none cursor-pointer"
                    to="/tenant/people/addfirsttimer"
                    >Add First Timer</router-link
                  >
                </el-dropdown-item>
                <el-dropdown-item class="text-black">
                  <div @click="sendMarkedMemberSms">Send Sms</div>
                </el-dropdown-item>
                <el-dropdown-item class="text-black" @click="sendMarkedBranchEmail">
                  Send Email
                </el-dropdown-item>
                <el-dropdown-item class="text-black" @click="displayWhatsappDrawer">
                  Send Whatsapp
                </el-dropdown-item>
                <el-dropdown-item class="text-black w-100">
                  <router-link
                    class="text-black text-decoration-none w-100"
                    to="/tenant/branch/hierarchicalbranch"
                  >
                    Hierarchy setup
                  </router-link>
                </el-dropdown-item>
                <el-dropdown-item class="text-black font-weight-bold w-100">
                  <router-link
                    class="text-dak text-decoration-none w-100"
                    to="/tenant/reports"
                  >
                    <div class="d-flex justify-content-between w-100">
                      <span>Report </span>
                      <span
                        ><img style="height: 1.5rem" :src="AnalysicIcon" alt=""
                      /></span>
                    </div>
                  </router-link>
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
        <div
          class="card border-radius-15 bg-gray-500 border-no-radius h-100 pb-2 px-3 pt-1"
          v-loading="branchLoading"
        >
          <div class="card-icon d-flex justify-content-between my-2">
            <img :src="BranchIcon" style="height: 3rem" alt="" />
            <div class="mb-1">
              <span class="card-text">Total People</span>
              <h5 class="card-title text-right font-weight-600">
                {{ getTotalPeopleBch.toLocaleString() }}
              </h5>
            </div>
          </div>
          <div class="card-content mt-3">
            <div class="mb-2">
              <span class="card-text">Total Branches</span>
              <h5 class="card-title font-weight-600">
                {{ allBranchDetail.length.toLocaleString() }}
              </h5>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-3 mb-4">
        <div
          class="card border-radius-15 bg-gray-500 border-no-radius h-100 pb-2 px-3 pt-1"
          v-loading="branchLoading"
        >
          <div class="card-icon my-2">
            <img :src="WalkIcon" style="height: 3rem" alt="" />
          </div>
          <div class="card-content mt-3">
            <div class="mb-2">
              <span class="card-text">Average Attendance</span>
              <h5 class="card-title s-24 font-weight-600">
                {{ Math.round(getTotalAverageAttendance).toLocaleString() }}
              </h5>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-3 mb-4">
        <div
          class="card border-radius-15 bg-gray-500 border-no-radius h-100 pb-2 px-3 pt-1"
          v-loading="branchLoading"
        >
          <div class="card-icon d-flex justify-content-between my-2">
            <img :src="ArrowDown" class="inflow" style="height: 3rem" alt="" />
            <div class="text-right">
              <div class="s-15">Current year inflow</div>
              <div class="font-weight-600 s-15">
                {{
                  allBranchDetail && allBranchDetail[0] && allBranchDetail[0].currency
                    ? allBranchDetail[0].currency.shortCode
                    : ""
                }}
                {{ Math.round(getCurrentYearInflow).toLocaleString() }}
              </div>
            </div>
          </div>
          <div class="card-content d-flex justify-content-between mt-3">
            <div class="mb-2">
              <span class="card-text">{{ currentMonth }} Inflow</span>
              <h5 class="card-title s-24 font-weight-600">
                {{
                  allBranchDetail && allBranchDetail[0] && allBranchDetail[0].currency
                    ? allBranchDetail[0].currency.shortCode
                    : ""
                }}
                {{ Math.round(getTotalMonthlyInflow).toLocaleString() }}
              </h5>
            </div>
            <span class="text-success d-flex align-items-center">
              <span>+{{ Math.round(incomePercentage) }}%</span>
              <el-icon class="text-success" :size="25"><Top /></el-icon>
            </span>
          </div>
        </div>
      </div>
      <div class="col-md-3 mb-4">
        <div
          class="card border-radius-15 bg-gray-500 border-no-radius h-100 pb-2 px-3 pt-1"
          v-loading="branchLoading"
        >
          <div class="card-icon d-flex justify-content-between my-2">
            <img :src="ArrowUp" class="outflow" style="height: 3rem" alt="" />
            <div class="text-right">
              <div class="s-15">Current year Outflow</div>
              <div class="font-weight-600 s-15">
                {{
                  allBranchDetail && allBranchDetail[0] && allBranchDetail[0].currency
                    ? allBranchDetail[0].currency.shortCode
                    : ""
                }}{{ Math.round(getCurrentYearOutflow).toLocaleString() }}
              </div>
            </div>
          </div>
          <div class="card-content d-flex justify-content-between mt-3">
            <div class="mb-1">
              <span class="card-text"> {{ currentMonth }} Outflow</span>
              <h5 class="card-title s-24 font-weight-600">
                {{
                  allBranchDetail && allBranchDetail[0] && allBranchDetail[0].currency
                    ? allBranchDetail[0].currency.shortCode
                    : ""
                }}
                {{ Math.round(getTotalMonthlyOutflow).toLocaleString() }}
              </h5>
            </div>
            <span class="text-danger d-flex align-items-center"
              ><span>+{{ Math.round(expensePercentage) }}%</span
              ><el-icon class="text-danger" :size="25"><Top /></el-icon
            ></span>
          </div>
        </div>
      </div>
    </div>
    <!-- Branch Data Overview -->

    <div class="container-fluid" v-show="allBranchDetail && allBranchDetail.length > 0 && !branchLoading && !networkError">
      <div
        class="mt-4 row border-radius-8 bg-gray-100 border-radius-border-8"
        v-loading="branchLoading"
      >
        <div class="col-md-12 px-0">
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
                <!-- <div class="col-md-5">
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
                  <el-dropdown-menu @command="(command) => (sortOption.value = command)">
                    <el-dropdown-item command="Branch Name" class="text-black"
                      >Branch Name</el-dropdown-item
                    >
                    <el-dropdown-item command="Membership size" class="text-black"
                      >Membership Size</el-dropdown-item
                    >
                    <el-dropdown-item command="Attendance" class="text-black"
                      >Attendance</el-dropdown-item
                    >
                    <el-dropdown-item command="Income" class="text-black"
                      >Income</el-dropdown-item
                    >
                    <el-dropdown-item command="Expense" class="text-black"
                      >Expense</el-dropdown-item
                    >
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
            </div> -->
                <div class="col-md-10 mt-sm-0 mt-3">
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
        </div>
        <div class="col-md-12 px-0">
          <CustomTable
            :data="searchBranchDetail"
            :headers="branchHeaders"
            :checkMultipleItem="false"
            v-loading="branchLoading"
          >
            <template v-slot:name="{ item }">
              <div class="c-pointer fw-500" @click="viewBranch(item)">
                {{ item.name }}
              </div>
            </template>
            <template v-slot:membershipSize="{ item }">
              <div class="c-pointer" @click="viewBranch(item)">
                {{ item.membershipSize.toLocaleString() }}
              </div>
            </template>
            <template v-slot:currentYearAverageAttendance="{ item }">
              <div class="c-pointer" @click="viewBranch(item)">
                {{ Math.abs(item.currentYearAverageAttendance).toLocaleString() }}
              </div>
            </template>
            <template v-slot:currentYearIncome="{ item }">
              <div class="c-pointer" @click="viewBranch(item)">
                {{
                  item.currency && item.currency.shortCode ? item.currency.shortCode : ""
                }}
                {{ Math.abs(item.currentYearIncome).toLocaleString() }}
              </div>
            </template>
            <template v-slot:currentYearExpense="{ item }">
              <div class="c-pointer" @click="viewBranch(item)">
                {{
                  item.currency && item.currency.shortCode ? item.currency.shortCode : ""
                }}
                {{ Math.abs(item.currentYearExpense).toLocaleString() }}
              </div>
            </template>
            <!-- <template v-slot:action="{ item }">
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
        </template> -->
          </CustomTable>
        </div>
      </div>
      <div class="row border mt-4" v-loading="branchLoading">
        <!-- <div class="adjust-view col-md-12 d-flex justify-content-end">
          <div class="py-2 pl-4 primary--text s-15 bg-gray-500 fw-500">
            <el-dropdown trigger="click" class="w-100">
              <span class="el-dropdown-link w-100">
                <div
                  class="d-flex justify-content-between primary--text w-100"
                  size="large"
                >
                  <span class="my-2"
                    >Sort By
                    {{
                      selectedWeekly && selectedWeekly.name
                        ? selectedWeekly.name
                        : selectedWeekly
                    }}</span
                  >
                  <div class="bg-white d-flex py-1 my-1">
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
        </div> -->
        <div class="col-md-12 mt-4" v-loading="branchLoading">
          <ColumnChart
            :series="series2"
            :data="incomeExpenseCharrt"
            header="Income vs Expense Trend"
            domId="chart"
            title="Showing All branch Data"
          />
        </div>
      </div>
      <div class="row border mt-4" v-loading="branchLoading">
        <!-- <div class="adjust-view col-md-12 d-flex justify-content-end">
          <div class="py-2 pl-4 primary--text s-15 bg-gray-500 fw-500">
            <el-dropdown trigger="click" class="w-100">
              <span class="el-dropdown-link w-100">
                <div
                  class="d-flex justify-content-between primary--text w-100"
                  size="large"
                >
                  <span class="my-2"
                    >Sort By
                    {{
                      selectedCurrYear && selectedCurrYear.name
                        ? selectedCurrYear.name
                        : selectedCurrYear
                    }}
                  </span>
                  <div class="bg-white d-flex py-1 my-1">
                    <el-icon class="el-icon--right">
                      <arrow-down />
                    </el-icon>
                  </div>
                </div>
              </span>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item
                    v-for="(itm, indx) in currentYearItem"
                    :key="indx"
                    @click="selectedType(itm)"
                    >{{ itm.name }}
                  </el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
        </div> -->
        <div class="col-md-12 mt-4" v-loading="branchLoading">
          <ColumnChart
            :series="series"
            :data="incomeExpenseChart"
            header="Income vs Expense by Branch"
            domId="chart3"
          />
        </div>
      </div>
      <div class="row border mt-4" v-loading="branchLoading">
        <!-- <div class="adjust-view col-md-12 d-flex justify-content-end">
          <div class="py-2 pl-4 primary--text s-15 bg-gray-500 fw-500">
            <el-dropdown trigger="click" class="w-100">
              <span class="el-dropdown-link w-100">
                <div
                  class="d-flex justify-content-between primary--text w-100"
                  size="large"
                >
                  <span class="my-2"
                    >Sort By
                    {{
                      selectedWeekly && selectedWeekly.name
                        ? selectedWeekly.name
                        : selectedWeekly
                    }}</span
                  >
                  <div class="bg-white d-flex py-1 my-1">
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
        </div> -->
        <div class="col-md-12 mt-4" v-loading="branchLoading">
          <LineChart
            domId="Attendance"
            :categories="series2"
            title=""
            header="Average Service Attendance"
            :seriesData="averageAttendanceCharrt"
          />
        </div>
      </div>
      <div class="row border mt-4" v-loading="branchLoading">
        <!-- <div class="adjust-view col-md-12 d-flex justify-content-end">
          <div class="py-2 pl-4 primary--text s-15 bg-gray-500 fw-500">
            <el-dropdown trigger="click" class="w-100">
              <span class="el-dropdown-link w-100">
                <div
                  class="d-flex justify-content-between primary--text w-100"
                  size="large"
                >
                  <span class="my-2"
                    >Sort By
                    {{
                      selectedCurrYear && selectedCurrYear.name
                        ? selectedCurrYear.name
                        : selectedCurrYear
                    }}</span
                  >
                  <div class="bg-white d-flex py-1 my-1">
                    <el-icon class="el-icon--right">
                      <arrow-down />
                    </el-icon>
                  </div>
                </div>
              </span>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item
                    v-for="(itm, indx) in currentYearItem"
                    :key="indx"
                    @click="selectedType(itm)"
                    >{{ itm.name }}
                  </el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
        </div> -->
        <div class="col-md-12 mt-4" v-loading="branchLoading">
          <ColumnChart
            :series="series"
            :data="averageAttendanceChart"
            header="Service attendance by Branch"
            domId="chart4"
            title="Showing All branch Data"
          />
        </div>
      </div>
    </div>
    <div
      class="no-person"
      v-if="
        !branchLoading && allBranchDetail && allBranchDetail.length === 0 && !networkError
      "
    >
      <div class="empty-img">
        <p><img src="../../assets/people/people-empty.svg" alt="" /></p>
        <p class="tip">You haven't added any Branch yet</p>
        <el-button round class="header-btn" @click="showModal" :color="primarycolor">
          Add Branch
        </el-button>
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
          <whatSappComponent
            :allBranchDetail="allBranchDetail"
            @closesidemodal="() => (showWhatsapp = false)"
          />
        </div>
      </template>
    </el-drawer>
    <el-skeleton class="w-100" animated v-if="branchLoading">
      <template #template>
        <div
          style="
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-top: 20px;
          "
        >
          <el-skeleton-item variant="text" style="width: 240px; height: 240px" />
          <el-skeleton-item variant="text" style="width: 240px; height: 240px" />
        </div>
        <el-skeleton class="w-100 mt-5" style="height: 25px" :rows="20" animated />
      </template>
    </el-skeleton>
    <el-dialog
      class="border-radius-20"
      v-model="displayModal"
      :width="mdAndUp || lgAndUp || xlAndUp ? `50%` : `90%`"
      align-center
    >
      <div class="row">
        <div class="col-md-12 d-flex justify-content-center">
          <div class="text-dak s-24 fw-500" v-if="hierarchies.length === 0">
            Click the button to setup
          </div>
          <div class="text-dak s-24 fw-500" v-else>
            Which of these option best suit your intentions?
          </div>
        </div>
        <div class="col-md-12 mt-4">
          <div class="row d-flex justify-content-center">
            <div
              class="col-md-6 d-flex flex-column align-items-center justify-content-center"
            >
              <el-button
                v-if="hierarchies.length === 0"
                round
                size="large"
                @click="simpleBranch"
                :color="primarycolor"
                class="w-100 mb-3 py-4 text-center c-pointer"
              >
                <span class="fw-400">Simple Branch Setup</span>
              </el-button>
              <el-button
                v-else
                round
                size="large"
                :color="primarycolor"
                @click="hierarchicalBranch"
                class="w-100 border-black text-white py-4 mb-3 text-center c-pointer"
              >
                <span class="fw-400">Advance Branch Setup</span>
              </el-button>
            </div>
          </div>
        </div>
      </div>
    </el-dialog>
    <el-dialog
      v-model="displayHierarchiesModal"
      :width="mdAndUp || lgAndUp || xlAndUp ? `50%` : `90%`"
      align-center
      class="border-radius-20"
    >
      <div class="row">
        <div class="col-md-12">
          <HierarchiesSample />
          <!-- <div class=" py-3 col-md-12">
            <h5 class=" font-weight-700" id="importgroupModalLabel">
              Church Hierarchies and Organisation Structure
            </h5>
          </div> -->

          <!-- <div class="row">
            <div class="col-md-12">
              <div class="mb-3" style="font-size: 1.2em">
                Set up your branch hierarchies, your branch hierarchies represent the church organisation structure,
                Fill the form below to create yours. For example Headquarter,Regionetc.
              </div>
              <button
                class="mt-3 mb-3 offset-5 col-4 default-btn primary-bg text-white font-weight-bold c-pointer border-0 text-center"
                data-dismiss="modal" @click="goToAddBranch">
                Proceed
              </button>
            </div>
          </div> -->
        </div>
        <div class="col-md-12 d-flex justify-content-center">
          <div class="col-md-6">
            <el-button
              round
              size="large"
              class="mt-3 mb-3 w-100 primary-bg text-white text-center"
              @click="proceedToBranchHierachy"
            >
              Proceed
            </el-button>
          </div>
        </div>
      </div>
      <!-- <BranchSettings /> -->
    </el-dialog>
  </div>
</template>

<script>
import { ref, inject, onMounted, watch, computed, watchEffect } from "vue";
import axios from "@/gateway/backendapi";
import BranchIcon from "../../assets/ecommerce/branchIcon.png";
import router from "../../router";
import deviceBreakpoint from "../../mixins/deviceBreakpoint";
import AnalysicIcon from "../../assets/ecommerce/analysicIcon.png";
import HierarchiesSample from "./component/HierarchiesSample.vue";
import ArrowUp from "../../assets/ecommerce/ArrowUp.png";
import ArrowDown from "../../assets/ecommerce/ArrowDown.png";
import WalkIcon from "../../assets/ecommerce/WalkIcon.png";
import LineChart from "@/components/charts/LineChart.vue";
import ColumnChart from "@/components/charts/BranchColumnChart.vue";
import whatSappComponent from "../groups/component/whatSappComponent.vue";
import smsComponent from "../groups/component/smsComponent.vue";
import CustomTable from "@/components/table/CustomTable";
import emailComponent from "../groups/component/emailComponent.vue";
import { Search } from "@element-plus/icons-vue";
import { useRoute } from "vue-router";
import store from "../../store/store";
import { socket } from "@/socket";
import swal from "sweetalert";
import { ElMessage, ElMessageBox } from "element-plus";

export default {
  components: {
    ColumnChart,
    LineChart,
    CustomTable,
    emailComponent,
    whatSappComponent,
    smsComponent,
    HierarchiesSample,
  },
  setup() {
    const displayModal = ref(false);
    const showSMS = ref(false);
    const showEmail = ref(false);
    const networkError = ref(false);
    const showWhatsapp = ref(false);
    const branchLoading = ref(false);
    const firstTimerMonthlyAtt = ref(false);
    const firstTimerWeeklyAtt = ref(false);
    const sendWhatsappToMultiple = ref(false);
    const mainIncomeExpenseData = ref([]);
    const mainAverageAttData = ref([]);
    const hierarchies = ref([]);
    const displayHierarchiesModal = ref(false);
    const series = ref([]);
    const route = useRoute();
    const expenseData = ref([]);
    const incomeData = ref([]);
    const data1 = ref({});
    const branchChatDetail = ref([]);
    const searchText = ref("");
    const weekdays = ref(["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]);
    const attendanceData = ref([
      {
        name: "Attendance",
        data: [12, 10, 8, 9, 7],
      },
    ]);
    const tenantInfo = ref({});
    const tenantInfoFirstTimerMonthly = ref([]);
    const averageAttData = ref([]);
    const firstTimerDataExist = ref(false);
    const sendingwhatsappmessage = ref(false);
    const mappedBranch = ref([]);
    const incomeExpenseCharrtData = ref([]);
    const averageAttChartData = ref([]);
    const xAxis = ref([]);
    const selectedWeekly = ref("Month");
    const selectedCurrYear = ref("Current Year");
    const allBranchDetail = ref(store.getters["branch/getbranches"]);
    const { mdAndUp, lgAndUp, xlAndUp, xsOnly } = deviceBreakpoint();
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

    const branchHeaders = ref([
      { name: "BRANCH", value: "name" },
      { name: "MEMBERS", value: "membershipSize" },
      { name: "AVG.ATTENDANCE.", value: "currentYearAverageAttendance" },
      { name: "INCOME", value: "currentYearIncome" },
      { name: "EXPENSE", value: "currentYearExpense" },
      // { name: "ACTION", value: "action" },
    ]);

    const sendMarkedMemberSms = () => {
      showSMS.value = true;
    };
    const sendMarkedBranchEmail = () => {
      showEmail.value = true;
    };
    const sortOption = ref(""); // Add this line

    // Watch for changes in the sortOption to trigger sorting
    watch(sortOption, (newSortOption) => {
      sortBranches(newSortOption);
    });

    const currentMonth = ref("");

    // Function to get the current month
    const getCurrentMonth = () => {
      const date = new Date();
      // Get the month as a string (e.g., January, February)
      const month = date.toLocaleString("default", { month: "long" });
      currentMonth.value = month;
    };

    // Call the function when the component is mounted
    onMounted(() => {
      getCurrentMonth();
    });
    const proceedToBranchHierachy = () => {
      displayModal.value = false;
      router.push("/tenant/branch/initialhierachysetup");
    };

    const hierarchicalBranch = () => {
      if (hierarchies.value.length === 0) {
        displayHierarchiesModal.value = true;
      } else {
        displayModal.value = false;
        router.push("/tenant/branch/addbranch");
      }
    };
    const getHierarchies = async () => {
      try {
        let { data } = await axios.get("/branching/hierarchies");
        console.log(data);
        hierarchies.value = data.returnObject;
      } catch (err) {
        console.log(err);
      }
    };
    getHierarchies();

    const getIncomeExpenseChartForBranches = async () => {
      try {
        const { data } = await axios.get(
          "/api/Branching/GetIncomeExpenseChatDataForBranches"
        );
        incomeExpenseCharrtData.value = data.returnObject;
      } catch (error) {
        console.log(error);
      }
    };
    getIncomeExpenseChartForBranches();

    const getAverageAttChartForBranches = async () => {
      try {
        const { data } = await axios.get(
          "/api/Branching/GetaverageAttendanceChatDataForBranches"
        );
        averageAttChartData.value = data.returnObject;
        console.log(data, "getAverageAttChartForBranches");
      } catch (error) {
        console.log(error);
      }
    };
    getAverageAttChartForBranches();

    const incomeExpenseCharrt = computed(() => {
      const incomeData = [];
      const expenseData = [];

      // Populate the arrays based on the raw data
      incomeExpenseCharrtData.value.forEach((item) => {
        incomeData.push(Math.abs(item.income)); // Add income to the incomeData array
        expenseData.push(item.expense); // Add expense to the expenseData array
      });

      // Return the transformed data
      return [
        {
          name: "Income",
          color: "#08A53D",
          data: incomeData,
        },
        {
          name: "Expense",
          color: "#F45C1A",
          data: expenseData,
        },
      ];
    });
    const averageAttendanceCharrt = computed(() => {
      const averageAttChart = [];

      // Populate the arrays based on the raw data
      averageAttChartData.value.forEach((item) => {
        averageAttChart.push(Math.abs(item.attendance)); // Add income to the incomeData array
      });

      // Return the transformed data
      return [
        {
          name: "Attendance",
          color: "#0745AF",
          data: averageAttChart,
        },
      ];
    });

    // Define the sorting function
    const sortBranches = (criteria) => {
      // Implement sorting logic based on the criteria
      searchBranchDetail.value.sort((a, b) => {
        switch (criteria) {
          case "Branch Name":
            return a.name.localeCompare(b.name);
          case "Membership size":
            return a.membershipSize - b.membershipSize;
          case "Attendance":
            return a.currentYearAverageAttendance - b.currentYearAverageAttendance;
          case "Income":
            return a.currentYearIncome - b.currentYearIncome;
          case "Expense":
            return a.currentYearExpense - b.currentYearExpense;
          default:
            return 0;
        }
      });
    };
    watchEffect(() => {
      socket.on("messagesent", (data) => {
        console.log(data, "status");

        swal(" Success", "Whatsapp message sent successfully!", "success");
        showWhatsapp.value = false;
        sendingwhatsappmessage.value = false;
      });
    });
    const displayWhatsappDrawer = (item) => {
      showWhatsapp.value = true;
      if (item) {
        sendWhatsappToMultiple.value = false;
      } else {
        sendWhatsappToMultiple.value = true;
      }
    };

    const primarycolor = inject("primarycolor");
    const showModal = () => {
      displayModal.value = true;
    };
    const chartItemdropdown = ref([
      { name: "Month", id: 1 },
      // { name: "Week", id: 2 },
    ]);
    const currentYearItem = ref([
      { name: "Current Year", id: 1 },
      // { name: "Week", id: 2 },
    ]);
    const tenantId = ref(
      store.getters.currentUser && store.getters.currentUser.tenantId
        ? store.getters.currentUser.tenantId
        : 0
    );
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
    });

    const getCurrentlySignedInUser = async () => {
      try {
        const res = await axios.get("/api/Membership/GetCurrentSignedInUser");
        tenantId.value = res.data.tenantId;
        console.log(tenantId.value, "hhgh");
      } catch (err) {
        /*eslint no-undef: "warn"*/
        console.log(err);
      }
    };
    getCurrentlySignedInUser();

    const viewBranch = (item) => {
      console.log(item, "mmmmmmmm");
      localStorage.setItem("branchId", item.id);
      localStorage.setItem("branchName", item.name);
      router.push("/tenant/branches/summary");
    };

    const simpleBranch = () => {
      router.push("/tenant/branch/simplebranch");
    };
    // const hierarchicalBranch = () => {
    //   router.push("/tenant/branch/hierarchicalbranch");
    // };

    const selectedType2 = (item) => {
      selectedWeekly.value = item;
    };
    const selectedType = (item) => {
      selectedCurrYear.value = item;
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
    const getFirtTimerSeris = () => {
      branchChatDetail.value.forEach((i) => {
        let serviceIndex = Object.keys(i).findIndex((i) => i === "name");
        let serviceValue = Object.values(i)[serviceIndex];

        series.value.unshift(serviceValue);
      });
    };
    const getBranchChartDetail = async () => {
      branchLoading.value = true;

      try {
        let { data } = await axios.get("/api/Branching");
        console.log(data, "kkkk");
        branchChatDetail.value = data.returnObject;
        // getAverageIncomeChart.value = data.returnObject.map((i) => ({
        //   name: i.name,
        //   value: i.currentYearAverageIncome,
        // }));
        // getAverageAttendanceItem.value = data.returnObject.map((i) => ({
        //   name: i.name,
        //   value: i.currentYearAverageAttendance,
        // }));
        mappedBranch.value = branchChatDetail.value.map((i) => {
          return {
            mainID: i.id,
            data: { name: i.name, avatar: i.logo, label: "CEO" },
            parent: i.parentID,
            styleClass: "p-person",
          };
        });
        let matchedValues = [];

        const allIDs = mappedBranch.value.map((i) => i.mainID);
        let sum = 0;
        allIDs.forEach((i) => {
          mappedBranch.value.forEach((j, ind) => {
            if (i == j.parent) {
              j.id = ind;
              j.parentid = sum;
              matchedValues.push(j);
            }
          });
          sum++;
        });
        const unflatten = function (array, parent, tree) {
          tree = typeof tree !== "undefined" ? tree : [];
          parent = typeof parent !== "undefined" ? parent : { id: 0 };
          var children = _.filter(array, function (child) {
            return child.parentid == parent.id;
          });
          if (!_.isEmpty(children)) {
            if (parent.id == 0) {
              tree = children;
            } else {
              parent["children"] = children;
            }
            _.each(children, function (child) {
              unflatten(array, child);
            });
          }
          return tree;
        };
        let treeConstruted = unflatten(matchedValues);
        const HQ = branchChatDetail.value.find((i) =>
          i.parentID.includes("00000000-000")
        );
        const belowHQ = branchChatDetail.value[0];
        let treeData = {
          key: "0",
          type: "person",
          styleClass: "p-hq",
          data: {
            label: HQ ? HQ : belowHQ,
            name: HQ && HQ.name ? HQ.name : belowHQ.name,
            avatar: HQ && HQ.logo ? HQ.logo : belowHQ.logo,
          },
          children: treeConstruted,
        };
        data1.value = treeData;
        getFirtTimerSeris();
        // averageIncomeChart(data.returnObject, "currentYearAverageIncome");
        branchLoading.value = false;
      } catch (error) {
        console.log(error, "sssddsd");
        branchLoading.value = false;
        networkError.value = true;
        if (error.toString().toLowerCase().includes("network error")) {
          networkError.value = true;
        } else {
          networkError.value = false;
        }
      }
    };
    getBranchChartDetail();

    const showConfirmModal = (id, index) => {
      ElMessageBox.confirm("Are you sure you want to proceed?", "Confirm delete", {
        confirmButtonText: "OK",
        cancelButtonText: "Cancel",
        type: "error",
      })
        .then(() => {
          deleteBranch(id, index);
        })
        .catch(() => {
          ElMessage({
            type: "info",
            message: "Delete canceled",
            duration: 5000,
          });
        });
    };
    const deleteBranch = (id) => {
      axios
        .delete(`/api/Branching/${id}`)
        .then((res) => {
          console.log(res);
          ElMessage({
            type: "success",
            message: "Branch form deleted",
            duration: 5000,
          });
          allBranchDetail.value = allBranchDetail.value.filter(
            (branchlist) => branchlist.id !== id
          );
          // store.dispatch("pledge/removePledgeFromStore", id);
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
              message: "Unable to delete",
              duration: 5000,
            });
          }
        });
    };
    // branchChatDetail.value.forEach((i) => {
    //   let incomeIndex = Object.keys(i).findIndex((i) => i === "currentYearIncome");
    //   let incomeValue = Object.values(i)[incomeIndex];
    //   incomeData.value.unshift(Math.abs(incomeValue));

    //   let expenseIndex = Object.keys(i).findIndex((i) => i === "currentYearExpense");
    //   let expenseValue = Object.values(i)[expenseIndex];
    //   expenseData.value.unshift(expenseValue);
    // });

    // mainIncomeExpenseData.value.push({
    //   name: " Income ",
    //   color: "#08A53D",
    //   data: incomeData.value,
    // });
    // mainIncomeExpenseData.value.push({
    //   name: " Expenses ",
    //   color: "#F45C1A",
    //   data: expenseData.value,
    // });

    // return mainIncomeExpenseData.value;

    const incomeExpenseChart = computed(() => {
      if (branchChatDetail.value.length === 0) return [];
      const incomeData = [];
      const expenseData = [];

      // Populate the arrays based on the raw data
      branchChatDetail.value.forEach((item) => {
        incomeData.push(Math.abs(item.currentYearIncome)); // Add income to the incomeData array
        expenseData.push(item.currentYearExpense); // Add expense to the expenseData array
      });

      // Return the transformed data
      return [
        {
          name: "Income",
          color: "#08A53D",
          data: incomeData,
        },
        {
          name: "Expense",
          color: "#F45C1A",
          data: expenseData,
        },
      ];
    });
    // branchChatDetail.value.forEach((i) => {
    //     let averageAttIndex = Object.keys(i).findIndex((i) => i === "currentYearAverageAttendance");
    //     let averageAttValue = Object.values(i)[averageAttIndex];
    //     averageAttData.value.unshift(averageAttValue);
    //   });

    //   mainAverageAttData.value.push({
    //     name: " Attendance ",
    //     color: "#0745AF",
    //     data: averageAttData.value,
    //   });
    //   return mainAverageAttData.value;
    const averageAttendanceChart = computed(() => {
      if (branchChatDetail.value.length === 0) return [];
      const currentYearAttendanceData = [];
      branchChatDetail.value.forEach((item) => {
        currentYearAttendanceData.push(Math.abs(item.currentYearAverageAttendance));
      });

      // Return the transformed data
      return [
        {
          name: "Attendance",
          color: "#0745AF",
          data: currentYearAttendanceData,
        },
      ];
    });

    const getTotalPeopleBch = computed(() => {
      if (allBranchDetail.value && allBranchDetail.value.length > 0) {
        return allBranchDetail.value
          .map((i) => i.membershipSize)
          .reduce((b, a) => b + a, 0);
      } else {
        return 0;
      }
    });
    const getTotalMonthlyInflow = computed(() => {
      if (allBranchDetail.value && allBranchDetail.value.length > 0) {
        return allBranchDetail.value
          .map((i) => i.currentMonthIncome)
          .reduce((b, a) => b + a, 0);
      } else {
        return 0;
      }
    });
    const getTotalAverageAttendance = computed(() => {
      if (allBranchDetail.value && allBranchDetail.value.length > 0) {
        return allBranchDetail.value
          .map((i) => i.currentYearAverageAttendance)
          .reduce((b, a) => b + a, 0);
      } else {
        return 0;
      }
    });
    const getTotalMonthlyOutflow = computed(() => {
      if (allBranchDetail.value && allBranchDetail.value.length > 0) {
        return allBranchDetail.value
          .map((i) => i.currentMonthExpense)
          .reduce((b, a) => b + a, 0);
      } else {
        return 0;
      }
    });
    const getCurrentYearInflow = computed(() => {
      if (allBranchDetail.value && allBranchDetail.value.length > 0) {
        return allBranchDetail.value
          .map((i) => i.currentYearIncome)
          .reduce((b, a) => b + a, 0);
      } else {
        return 0;
      }
    });
    const getCurrentYearOutflow = computed(() => {
      if (allBranchDetail.value && allBranchDetail.value.length > 0) {
        return allBranchDetail.value
          .map((i) => i.currentYearExpense)
          .reduce((b, a) => b + a, 0);
      } else {
        return 0;
      }
    });
    const lastMonthIncomeSum = computed(() => {
      return allBranchDetail.value.reduce((sum, item) => {
        return sum + (item.lastMonthIncome || 0);
      }, 0);
    });
    const lastMonthExpenseSum = computed(() => {
      return allBranchDetail.value.reduce((sum, item) => {
        return sum + (item.lastMonthExpense || 0);
      }, 0);
    });
    const expensePercentage = computed(() => {
      return lastMonthExpenseSum.value === 0
        ? 0
        : (getTotalMonthlyOutflow.value / lastMonthExpenseSum.value) * 100;
    });

    const incomePercentage = computed(() => {
      return lastMonthIncomeSum.value === 0
        ? 0
        : (getTotalMonthlyInflow.value / lastMonthIncomeSum.value) * 100;
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
      branchLoading.value = true;
      try {
        const { data } = await axios.get(
          `/DashboardForTenant?_TenantId=${tenantId.value}`
        );
        tenantInfo.value = data;
        console.log(tenantInfo.value, "ghhs");
        // tenantInfoFirstTimerWeekly.value =
        //   data.firstTimerSummary.firstTimerWeekly;
        tenantInfoFirstTimerMonthly.value = data.firstTimerSummary.firstTimerMonthly;

        tenantInfoFirstTimerMonthly.value[0].data.forEach((element) => {
          if (element > 0) {
            firstTimerDataExist.value = true;
          }
        });
        branchLoading.value = false;
      } catch (error) {
        if (error.toString().toLowerCase().includes("network error")) {
          networkError.value = true;
        } else {
          networkError.value = false;
        }
        branchLoading.value = false;
      }
    };
    getBranchTenantDashboard();

    const monthlyFirstTimerObj = computed(() => {
      if (!tenantInfoFirstTimerMonthly.value) return [];
      // tenantInfoFirstTimerMonthly.value[0].color = '#002044';
      return tenantInfoFirstTimerMonthly.value;
    });

    onMounted(() => {
      if (allBranchDetail.value && allBranchDetail.value.length == 0) getBranches();
    });

    return {
      tenantInfo,
      mappedBranch,
      viewBranch,
      averageAttendanceCharrt,
      incomeExpenseCharrtData,
      expensePercentage,
      incomePercentage,
      incomeExpenseCharrt,
      averageAttChartData,
      mainIncomeExpenseData,
      lastMonthIncomeSum,
      lastMonthExpenseSum,
      selectedWeekly,
      tenantId,
      getTotalPeopleBch,
      allBranchDetail,
      route,
      branchHeaders,
      networkError,
      displayModal,
      branchLoading,
      primarycolor,
      BranchIcon,
      ArrowUp,
      ArrowDown,
      WalkIcon,
      AnalysicIcon,
      firstTimerWeeklyAtt,
      sendWhatsappToMultiple,
      displayHierarchiesModal,
      mainAverageAttData,
      averageAttData,
      showModal,
      hierarchies,
      displayWhatsappDrawer,
      firstTimerDataExist,
      monthlyFirstTimerObj,
      searchText,
      searchBranchDetail,
      tenantInfoFirstTimerMonthly,
      firstTimerMonthlyAtt,
      currentMonth,
      Search,
      series2,
      monthXaxis,
      xAxis,
      chartItemdropdown,
      selectedType2,
      selectedType,
      simpleBranch,
      hierarchicalBranch,
      showConfirmModal,
      proceedToBranchHierachy,
      series,
      currentYearItem,
      incomeExpenseChart,
      mdAndUp,
      selectedCurrYear,
      lgAndUp,
      xlAndUp,
      xsOnly,
      data1,
      attendanceData,
      getTotalMonthlyInflow,
      getTotalMonthlyOutflow,
      getCurrentYearInflow,
      getCurrentYearOutflow,
      getTotalAverageAttendance,
      weekdays,
      showEmail,
      showSMS,
      showWhatsapp,
      sendingwhatsappmessage,
      incomeData,
      expenseData,
      averageAttendanceChart,
      branchChatDetail,
      sendMarkedMemberSms,
      sendMarkedBranchEmail,
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
.inflow {
  transform: rotate(180deg);
}
.outflow {
  transform: rotate(-180deg);
}
.card-text {
  margin: 0;
  font-size: 14px;
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
.adjust-view {
  position: relative;
  top: 35px;
  right: 10px;
  z-index: 1;
}

.table tbody tr:hover {
  background-color: #f1f1f1;
}
.empty-img {
  width: 85%;
  margin: auto;
}

.empty-img img {
  width: 100%;
  max-width: 200px;
}
.no-person {
  height: 80vh;
  display: flex;
  text-align: center;
}
</style>
