<template>
  <div class="container-wide container-top">
    <div class="row justify-content-between">
      <div class="mb-4 col-md-6">
        <div class="text-head font-weight-bold h2 py-0 my-0 text-black">
          First Timer Analytics
        </div>
        <div @click="goBack">
          <span class="s-18 fw-400 cursor-pointer text-black">
            <img src="../../assets/goback.png" alt="" /> Go back</span
          >
        </div>
      </div>
      <div class="col-md-6 mt-2">
        <div class="col-md-12 bg-gray-500 d-flex justify-content-end py-3 px-2">
          <div
            class="col-md-11 fw-500 s-12 primary-text flex-wrap d-flex justify-content-between align-items-center"
          >
            <span
              class="px-2 mb-3 mb-md-0 cursor-pointer"
              v-for="(item, indx) in periodRange"
              :key="indx"
              @click="getAllDatePeriods(item)"
              >{{ item.name }}</span
            >
            <div class="d-flex justify-content-between align-items-center">
              <el-dropdown trigger="click" class="w-100">
                <span class="el-dropdown-link w-100">
                  <div
                    class="d-flex justify-content-between mt-1 s-12 fw-500 primary--text w-100"
                    size="large"
                  >
                    <span>{{
                      selectedContactOwner && selectedContactOwner.name
                        ? selectedContactOwner.name
                        : "Select Contact"
                    }}</span>
                    <div class="bg-white">
                      <el-icon class="el-icon--right">
                        <arrow-down />
                      </el-icon>
                    </div>
                  </div>
                </span>
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item
                      v-for="(itm, indx) in contactOwners"
                      :key="indx"
                      @click="getAllDatePeriods(itm)"
                      >{{ itm.name }}
                    </el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
            </div>
            <!-- <div class="dropdown">
            <button
              class="btn btn-outline-secondary dropdown-toggle"
              type="button"
              id="dropdownMenuButton"
              data-toggle="dropdown"
            >
              Custom
            </button>
            <div class="dropdown-menu">
              <a class="dropdown-item" href="#">Action</a>
              <a class="dropdown-item" href="#">Another action</a>
            </div>
          </div> -->
          </div>
        </div>
      </div>
    </div>
    <div class="container-fuild mt-5 px-0">
      <div class="row justify-content-between">
        <!-- First Column -->
        <div class="col-md-6 pr-sm-1">
          <div class="col-md-12 h-100 px-0 bg-gray-500 border-radius-border-8">
            <div class="row align-items-center h-100">
              <div class="col-md-4 text-center">
                <div class="fw-500 text-head">Total First Timers</div>
                <div class="h2 font-weight-600">{{ analyticsData.totalGuests }}</div>
              </div>
              <div class="col-md-4 text-center">
                <div class="fw-500 text-head">Activity Involved</div>
                <div class="h2 font-weight-600">{{ analyticsData.averageActivity }}</div>
              </div>
              <div class="col-md-4 text-center">
                <div class="fw-500 text-head">Retention Rate</div>
                <div class="h2 font-weight-600">{{ analyticsData.retentionRate }}%</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Second Column -->
        <div class="col-md-6 pr-sm-1 pr-md-0 mt-3 mt-md-0">
          <div class="col-md-12 h-100 border-radius-border-8">
            <div class="row justify-content-between align-items-center">
              <div class="col">
                <div class="s-18 text-head mt-2 font-weight-600">
                  How did u hear about us?
                </div>
                <div class="d-flex flex-wrap justify-content-around mt-2">
                  <div
                    class="text-center d-flex align-items-center mb-3"
                    v-for="(item, index) in topThreeSources"
                    :key="index"
                  >
                    <!-- <i class="fas fa-globe fa-2x text-primary"></i> -->
                    <span class="rounded-circle bg-color p-3"><GlobeIcon /></span>
                    <div class="ml-2">
                      <p class="fw-400 s-20 my-1">{{ item.name }}</p>
                      <p class="font-weight-600 s-20">
                        {{ item.value }}
                      </p>
                    </div>
                  </div>
                  <!-- <div class="text-center mb-3 d-flex align-items-center">
                    <span><MegaPhoneIcon /></span>
                    <div class="ml-2">
                      <p class="fw-400 s-20 my-1">Referrals</p>
                      <p class="font-weight-600 s-20">
                        {{ analyticsData2.acquisitionChannels.referrals }}%
                      </p>
                    </div>
                  </div> -->
                  <!-- <div class="text-center mb-3 d-flex align-items-center">
                    <span><CalenderIcon /></span>
                    <div class="ml-2">
                      <p class="fw-400 s-20 my-1">Events</p>
                      <p class="font-weight-600 s-20">
                        {{ analyticsData2.acquisitionChannels.events }}%
                      </p>
                    </div>
                  </div> -->
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row mt-5">
      <div class="col-md-6 col-12 mb-5">
        <div class="p-3">
          <FunnelChart domId="funnel" :funneldata="analyticsData.lifeCycleSummary" />
        </div>
      </div>
      <div class="col-md-6 col-12">
        <div class="p-3">
          <ColumnChart
            domId="column"
            :columndata="analyticsData.retentionSummary"
            :yAxis="`Number of Guest`"
            :desc="`First timer inflow`"
          />
        </div>
      </div>
    </div>

    <!-- <div class="row my-3 mother-row">
      <div class="col-md-6">
        <div class="p-3">
          <PieChart
            domId="piechart"
            :piedata1="analyticsData.interestedSummary"
            :data="name1"
          />
        </div>
      </div>
      <div class="col-md-6 col-12">
        <div class="p-3">
          <PieChart
            domId="piechart2"
            :piedata1="analyticsData.sourceSummary"
            :data="name2"
          />
        </div>
      </div>
    </div> -->
    <div class="container-fluid px-4">
      <div class="row">
        <div class="col-md-12 bg-gray-500 border-radius-border-8 py-5 px-4">
          <div class="row">
            <div class="col-md-12 mb-3">
              <span class="mb-4 h2 fw-500">First Timers Demographics</span>
            </div>

            <!-- Age Group -->
            <div class="col-md-4">
              <div class="card">
                <div class="card-body">
                  <h5 class="card-title">Age Group</h5>
                  <!-- <ChartComponent :data="ageGroupData" /> -->
                  <AnalyticsPieChart
                    domId="join"
                    title="Age Group"
                    :titleMargin="10"
                    :summary="[{ Femi: '30' }, { male: '30' }, { female: '20' }]"
                  />
                </div>
              </div>
            </div>

            <!-- Gender -->
            <div class="col-md-4">
              <div class="card">
                <div class="card-body">
                  <h5 class="card-title">Gender</h5>
                  <!-- <ChartComponent :data="genderData" /> -->
                </div>
              </div>
            </div>

            <!-- Marital Status -->
            <div class="col-md-4">
              <div class="card">
                <div class="card-body">
                  <h5 class="card-title">Marital Status</h5>
                  <!-- <ChartComponent :data="maritalStatusData" /> -->
                </div>
              </div>
            </div>

            <!-- Location -->
            <div class="col-md-4">
              <div class="card">
                <div class="card-body">
                  <!-- <h5 class="card-title">How did you hear about us?</h5> -->
                  <!-- <ChartComponent :data="locationData" /> -->
                  <PieChart
                    domId="piechart2"
                    :piedata1="analyticsData.sourceSummary"
                    :data="name2"
                  />
                </div>
              </div>
            </div>

            <!-- Giving Percentage -->
            <div class="col-md-4">
              <div class="card h-100">
                <div class="card-body">
                  <!-- <h5 class="card-title">Interested in Joining us ?</h5> -->
                  <div class="p-3">
                    <PieChart
                      domId="piechart3"
                      :piedata1="analyticsData.interestedSummary"
                      :data="name1"
                    />
                  </div>
                </div>
              </div>
            </div>

            <!-- Event Attendance -->
            <div class="col-md-4">
              <div class="card">
                <div class="card-body">
                  <h5 class="card-title">Want to be Visited</h5>
                  <!-- <ChartComponent :data="eventAttendanceData" /> -->
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="container-fluid mt-5 px-4">
      <div
        class="row"
        v-if="
          analyticsData &&
          analyticsData.retentionSummary &&
          analyticsData.retentionSummary.series[1].name == 'Converted'
        "
      >
        <div class="col-md-12 bg-gray-500 border-radius-border-8 py-5 px-4">
          <div class="row">
            <div class="col-md-12">
              <div class="card">
                <div class="card-body">
                  <div class="p-3">
                    <AnalyticsColumnChart
                      domId="column2"
                      :columndata="[analyticsData.retentionSummary.series[1]]"
                      :xAxisData="analyticsData.retentionSummary.categories"
                      :desc="`Membership Conversion Chart`"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="container-fluid mt-5">
      <div class="row">
        <div class="col-md-12">
          <span class="s-32 fw-500 text-black">First Timers Feedbacks</span>
        </div>
      </div>
      <div class="col-md-12 border-radius-border-8 mt-2 py-4 px-3">
        <div class="row align-items-center">
          <div class="col-md-8 fw-500 s-24 text-black">First service attended</div>
          <div class="col-md-4">Chart</div>
        </div>
      </div>
    </div>

    <!-- <div class="row pl-3 border-radius-border-8 align-items-center">
      <div class="col-md-3">
        <div class="col-md-11 px-0 text-center">
          <div class="text-head s-18 font-weight-600">Total Guest</div>
          <div class="h2 font-weight-600">
            {{ analyticsData.totalGuests }}
          </div>
        </div>
      </div>
      <div class="col-md-3">
        <div class="col-md-11 px-0 text-center">
          <div class="text-head s-18 font-weight-600">Retention Rate</div>
          <div class="h2 font-weight-600">{{ analyticsData.retentionRate }}%</div>
        </div>
      </div>
      <div class="col-md-3">
        <div class="col-md-11 px-0 text-center">
          <div class="text-head s-18 font-weight-600">Activity Involved</div>
          <div class="h2 font-weight-600">
            {{ analyticsData.averageActivity }}
          </div>
        </div>
      </div>
    </div> -->
  </div>
  <!-- <div class="row mt-5 mb-4">
    <div class="col-md-5 sub-header primary--text px-0">Overview</div>
    <div class="col-md-4 mb-2 px-0 pr-md-1 mt-2 mt-md-0">
      <el-select-v2
        v-model="contactOwnerId"
        @change="getAllDatePeriods"
        :options="contactOwners.map((i) => ({ label: i.name, value: i.id }))"
        placeholder="Select contact owner"
        size="large"
        class="w-100"
      />
    </div>
    <div class="col-md-3 px-0 pl-md-1">
      <el-select-v2
        v-model="periodId"
        @change="getAllDatePeriods"
        :options="periodRange.map((i) => ({ label: i.name, value: i.code }))"
        placeholder="Select period"
        size="large"
        class="w-100"
      />
    </div>
  </div> -->
</template>

<script>
import { ref, computed } from "vue";
import axios from "@/gateway/backendapi";
import router from "../../router";
import FunnelChart from "@/components/charts/FunnelChart.vue";
import PieChart from "@/components/charts/FirstTimerPiechart.vue";
import ColumnChart from "../../components/charts/FirstTimersColumnchart.vue";
import AnalyticsColumnChart from "../../components/charts/AnalyticsColumnChart.vue";
import GlobeIcon from "../../components/svg/GlobeIcon.vue";
// import CalenderIcon from "../../components/svg/CalenderIcon.vue";
// import MegaPhoneIcon from "../../components/svg/MegaPhoneIcon.vue";
import AnalyticsPieChart from "@/components/charts/PieChart";
// import PieChartSmall from "../../components/charts/PieChartSmall.vue";
export default {
  components: {
    FunnelChart,
    PieChart,
    GlobeIcon,
    // MegaPhoneIcon,
    // CalenderIcon,
    ColumnChart,
    AnalyticsColumnChart,
    AnalyticsPieChart,
    // PieChartSmall,
  },
  emits: ["firsttimers", "totalfirstimer"],
  setup(props, { emit }) {
    const name1 = ref("Interested Visitors");
    const name2 = ref("How Did You Hear About Us");
    const startDate = ref("");
    const endDate = ref("");
    const analyticsData = ref([]);
    const showFirstTimer = ref(false);
    const pieAnalyticsData = ref([]);
    const selectedPeriod = ref({});
    const periodRange = ref([
      {
        name: "Last 30days",
        code: new Date(new Date().setDate(new Date().getDate() - 30)).toLocaleDateString(
          "en-US"
        ),
      },
      {
        name: "Last 90days",
        code: new Date(new Date().setDate(new Date().getDate() - 90)).toLocaleDateString(
          "en-US"
        ),
      },
      {
        name: "Last 120days",
        code: new Date(new Date().setDate(new Date().getDate() - 120)).toLocaleDateString(
          "en-US"
        ),
      },
      {
        name: "One Year",
        code: new Date(new Date().setDate(new Date().getDate() - 365)).toLocaleDateString(
          "en-US"
        ),
      },
    ]);
    const defaultStartDate = new Date(
      new Date().setDate(new Date().getDate() - 30)
    ).toLocaleDateString("en-US");
    const defaultEndDate = new Date().toLocaleDateString("en-US");
    const contactOwners = ref([]);
    const selectedContactOwner = ref({});
    const contactOwnerId = ref(null);
    const periodId = ref(null);
    const analyticsData2 = ref({
      totalFirstTimers: 12630,
      becameMember: 5530,
      retentionRate: 89,
      acquisitionChannels: {
        website: 25,
        referrals: 50,
        events: 25,
      },
    });

    const getAllDatePeriods = (item) => {
      selectedContactOwner.value = item;
      selectedContactOwner.value = contactOwners.value.find((i) => {
        return i.id == contactOwnerId.value;
      });

      selectedPeriod.value = periodRange.value.find((i) => {
        return i.code == periodId.value;
      });

      let startDate = selectedPeriod.value.code;
      let endDate = new Date().toLocaleDateString("en-US");

      if (
        selectedContactOwner.value &&
        Object.keys(selectedContactOwner.value).length > 0
      ) {
        axios
          .get(
            `/api/FirsttimerManager/analyticsDashboard?startDate=${startDate}&endDate=${endDate}&personId=${selectedContactOwner.value.id}`
          )
          .then((res) => {
            analyticsData.value = res.data.returnObject;
            emit("firsttimers", res.data.returnObject.firsttimers);
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        axios
          .get(
            `/api/FirsttimerManager/analyticsDashboard?startDate=${startDate}&endDate=${endDate}`
          )
          .then((res) => {
            analyticsData.value = res.data.returnObject;
            emit("firsttimers", res.data.returnObject.firsttimers);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    };

    // const percentage = computed(() => {
    //   if (totalVisitorsSinceLastMonth.value === 0) {
    //     return 0;
    //   }
    //   return ((firstTimers.value / totalVisitorsSinceLastMonth.value) * 100).toFixed(2);
    // });

    const topThreeSources = computed(() => {
      // Create a shallow copy of the array to avoid mutating the original array
      return [...analyticsData.value.sourceSummary]
        .sort((a, b) => b.value - a.value)
        .slice(0, 3);
    });

    const ViewFirstTimer = () => {
      showFirstTimer.value = !showFirstTimer.value;
      if (showFirstTimer.value) {
        getAllDatePeriods();
      }
    };
    const goBack = () => {
      router.go(-1);
    };

    const getContactOwners = () => {
      axios
        .get(`/api/FirsttimerManager/contactowners`)
        .then((res) => {
          contactOwners.value = res.data.map((i) => {
            i.name = i.firstName + " " + i.lastName;
            return i;
          });
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getContactOwners();

    const showItem = () => {
      selectedPeriod.value = periodRange.value.find((i) => i.name.includes("30"));
      periodId.value = periodRange.value.find((i) => i.name.includes("30")).code;
      axios
        .get(
          `/api/FirsttimerManager/analyticsDashboard?startDate=${defaultStartDate}&endDate=${defaultEndDate}`
        )
        .then((res) => {
          analyticsData.value = res.data.returnObject;
          emit("totalfirstimer", res.data.returnObject.totalGuests);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    showItem();

    return {
      name1,
      name2,
      startDate,
      endDate,
      analyticsData,
      pieAnalyticsData,
      periodRange,
      selectedPeriod,
      getAllDatePeriods,
      defaultStartDate,
      defaultEndDate,
      showItem,
      contactOwners,
      selectedContactOwner,
      contactOwnerId,
      periodId,
      showFirstTimer,
      ViewFirstTimer,
      topThreeSources,
      analyticsData2,
      goBack,
    };
  },
};
</script>

<style scoped>
.overview {
  margin-left: -27px !important;
}

/* .header1{
  text-align: left;
  font: normal normal bold 34px/46px Nunito Sans;
  letter-spacing: 0px;
  color: #02172e;
  opacity: 1;
  } */

.sub-header {
  font-size: 25px;
  font-weight: 600;
}

/* .mother-row {
    margin-left: -1.75rem !important;
  } */

.overview-Area {
  border-radius: 30px;
  box-shadow: 0px 3px 6px #2c28281c;
  padding: 24px 10px;
  padding-right: 10px;
  padding-left: 10px;
  background: #fff;
  box-shadow: 0px 3px 6px #2c28281c;
  border: 1px solid #00204424;
}

.item-Area {
  padding: 0px 10px;
  /* background: #fff; */
  box-shadow: 0px 2px 7.5px rgb(0 0 0 / 6%);
}

.item-text {
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #212529;
}

.item-total {
  font-size: 20px;
  line-height: 1.2;
}
.bg-colour {
  background-color: #217bcd;
}

.top-icon-div {
  color: #136acd;
  font-size: 24px;
  width: 30px;
  height: 30px;
  background: #f1f5f8;
  padding: 4px;
  border-radius: 50%;
}
.card-title {
  font-size: 16px;
  font-weight: 500;
}

/* .chart-border {
    box-shadow: 0px 2px 7.5px rgb(0 0 0 / 6%)
  } */

/* .pi{
  font-size: 1.5rem;
  } */

/* @media screen and (max-width: 500px) {
    .header1{
  text-align: left;
  font: normal normal bold 24px/36px Nunito Sans;
  letter-spacing: 0px;
  color: #02172e;
  opacity: 1;
  }
  
  } */
</style>
