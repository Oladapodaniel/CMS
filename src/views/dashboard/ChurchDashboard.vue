<template>
  <main :class="{ 'container-slim': lgAndUp || xlAndUp }" id="main">
    <div class="second-col container-top">
      <div class="create-btn-div">
        <div>
          <h2 class="head-text">Dashboard</h2>
        </div>
      </div>
      <div class="d-flex justify-content-between flex-column flex-md-row  px-0">
        <div class="help-text2">
          <img src="../../assets/thingstodo.svg" alt="" />
          <div class="can-do">
            <h4>Things You Can Do</h4>
            <div class="can-do-links can-do">
              <router-link to="/tenant/people/add">Add Member</router-link>
              <router-link to="/tenant/sms/compose">Send SMS</router-link>
              <router-link to="/tenant/people/addfirsttimer">Add First Timer</router-link>
              <router-link to="" v-if="false">Add Follow-up</router-link>
            </div>
          </div>
        </div>

        <div v-if="tenantInfoBasic.memberCount === 0"
          class="d-flex justify-content-center mt-4 justify-content-md-end mt-md-0">
          <img src="../../assets/welcome_user.svg" style="width: 250px" />
        </div>
        <div class="number-boxes" v-else>
          <div class="box mr-4" v-loading="dashboardLoading">
            <div class="top p-3">
              <div class="d-flex justify-content-between">
                <img src="../../assets/usergroup.svg" alt="" style="position: relative; top: -5px; left: -8px;">
                <div class="">
                  <p class="mb-0 s-8">FIRST TIMERS</p>
                  <h4 class="primary--text font-weight-700 mt-1 s-16">{{ tenantInfoBasic.firstTimerCount }}</h4>
                </div>
              </div>
              <div>
                <h1 class="font-weight-700 s-30 mt-2">{{ tenantInfoBasic.memberCount }}</h1>
                <span class="size-text">Church Size</span>
              </div>
            </div>
            <div class="box-bottom px-3 py-2">
              <el-tooltip class="box-item" effect="dark" :content="planUserIs" placement="top-start">
                <div class="s-12 font-weight-bold">
                  {{ planUserIs }}
                </div>
              </el-tooltip>
              <router-link :to="{ name: 'Subscription' }" class="mt-1">
                <el-button :color="!buttonTextCheck.color ? '#136acd' : ''" class="mt-2" style="height: 25px"
                  :class="[buttonTextCheck.color, { 'bg-warning': calculatedPercentage >= 90 }]" round>
                  <p class="mb-0 small" :class="[buttonTextCheck.color]">{{ buttonTextCheck.text }}</p>
                </el-button>
              </router-link>
            </div>
          </div>
          <div class="box" v-loading="dashboardLoading">
            <div class="top p-3">
              <img src="../../assets/inboxgroup.svg" alt="" style="position: relative; left: -8px;">
              <div>
                <h1 class="font-weight-700 s-30">{{ tenantInfoBasic.smsUnit }}</h1>
                <span class="size-text">SMS Units</span>
              </div>
            </div>
            <div class="box-bottom px-3 py-2">
              <router-link :to="{ name: 'BuyUnits', path: '/tenant/buyunits' }" class="no-decoration">
                <el-button type="info" class="push-down small" style="height: 25px" round>
                  <p class="mb-0 small">BUY UNITS</p>
                </el-button>
              </router-link>
            </div>
          </div>
        </div>
      </div>

      <div class="mt-5" v-loading="dashboardLoading"></div>

      <div class="container-fluid">
        <div class="row">
          <div class="col-8 offset-2 offset-md-0 col-md-3 p-0" v-if="
            tenantInfoCeleb.length > 0 ||
            (tenantInfoFirstTimerWeekly[0] && tenantInfoFirstTimerWeekly[0].data.some(i => i > 0)) ||
            (tenantInfoAttendanceWeekly[0] && tenantInfoAttendanceWeekly[0].data.some(i => i > 0))
          ">
            <div class="more-things side p-3" v-if="!tenantInfoExtra.hasWebsite">
              <!-- <i class="pi pi-times"></i> -->
              <img src="../../assets/website2.svg" class="w-100" />
              <div class="mt-4">Website</div>
              <div class="more-body mt-2">
                Get a user engaging website for your church.
              </div>
              <a href="https://churchplus.co/awoofwebsite/" target="_blank">
                <el-button color="#136ACD" class="mt-1" round plain>Get one now</el-button>
              </a>
            </div>

            <div class="more-things side p-3 mt-4" v-if="!tenantInfoExtra.hasOnlineGiving">
              <img src="../../assets/onlinegiving2.svg" class="w-100" />
              <div class="mt-4">Online Giving</div>
              <div class="more-body mt-2">
                Make online donations to your church.
              </div>
              <router-link to="/tenant/payments">
                <el-button color="#136ACD" class="mt-1" round plain>Set up now</el-button>
              </router-link>
            </div>

            <div class="more-things side p-3 mt-4" v-if="!tenantInfoExtra.hasMobileApp">
              <img src="../../assets/mobileapp2.svg" class="w-100" />
              <div class="mt-4">Mobile App</div>
              <div class="more-body mt-2">
                Get a customized mobile app for your church.
              </div>
              <router-link :to="{ name: 'MobileOnboarding' }">
                <el-button color="#136ACD" class="mt-1" round plain>Set up now</el-button>
              </router-link>
            </div>
          </div>

          <div :class="{
            'col-12 col-md-9':
              !tenantInfoExtra.hasMobileApp ||
              !tenantInfoExtra.hasOnlineGiving ||
              !tenantInfoExtra.hasWebsite,
            'col-md-12 px-0':
              tenantInfoExtra.hasMobileApp &&
              tenantInfoExtra.hasOnlineGiving &&
              tenantInfoExtra.hasWebsite,
          }">
            <!-- Celebrations -->
            <div v-if="tenantInfoCeleb && tenantInfoCeleb.length > 0">
              <div class="celeb-header">
                <div class="celeb-icon">
                  <img src="../../assets/celeb-icon.svg" alt="Celebration Icon" />
                </div>
                <div class="celeb-header-text">
                  <p>Celebrations</p>
                </div>
              </div>
              <EasyDataTable :headers="celebHeaders" :items="tenantInfoCeleb" class="mt-4">
                <template #item-name="{ name, dayOfCelebration }">
                  <div class="player-wrapper">
                    <img src="../../assets/people/avatar-male.png" alt="" class="celeb-img" />
                    <span class="ml-3">{{ name }}</span>
                    <div class="celeb-badge-desc celeb-badge"
                      v-if="dayOfCelebration.toString().toLowerCase().includes('today')"></div>
                  </div>
                </template>
                <template #item-date="{ date }">
                  {{ dateFormat(date) }}
                </template>
              </EasyDataTable>
            </div>
            <div v-show="
              tenantInfoCeleb.length > 0 ||
              (tenantInfoFirstTimerWeekly[0] &&
                tenantInfoFirstTimerWeekly[0].data.length > 0) ||
              (tenantInfoFirstTimerWeekly[0] &&
                tenantInfoFirstTimerWeekly[0].data[0] > 0) ||
              (tenantInfoAttendanceWeekly[0] &&
                tenantInfoAttendanceWeekly[0].data.length > 0) ||
              (tenantInfoAttendanceWeekly[0] &&
                tenantInfoAttendanceWeekly[0].data[0] > 0)
            ">
              <div v-if="tenantInfoAttendanceWeekly && attendanceDataExist">
                <div class="adjust-view col-10 col-sm-3 offset-sm-9 mt-5 mt-md-0">
                  <div class="view-report">View Reports</div>
                  <div class="weekly">
                    <span @click="weeklyAttendance"
                      :class="{ active: attendanceBoolean }">Weekly</span>&nbsp;&nbsp;&nbsp;<span
                      @click="monthlyAttendance" :class="{ active: !attendanceBoolean }">Monthly</span>
                  </div>
                </div>
                <div v-if="attendanceBoolean" class="mt-4">
                  <ColumnChart domId="chart1" title="Event Attendance" subtitle="Weekly Attendance of Events"
                    header="Members Attendance" :data="chartData" :series="series"
                    :attendanceSeries="attendanceSeries" />
                </div>
                <div v-else class="mt-4">
                  <ColumnChart domId="chart1" title="Event Attendance" subtitle="Monthly Attendance of Events"
                    header="Members Attendance" :data="monthlyAttendanceObj" :series="series"
                    :attendanceSeries="attendanceSeries" />
                </div>
              </div>

              <div v-if="tenantInfoFirstTimerWeekly && firstTimerDataExist">
                <div class="adjust-view col-10 col-sm-3 offset-sm-9">
                  <div class="view-report">View Reports</div>
                  <div class="weekly">
                    <span @click="weeklyFirstTimer"
                      :class="{ active: firstTimerBoolean }">Weekly</span>&nbsp;&nbsp;&nbsp;<span
                      @click="monthlyFirstTimer" :class="{ active: !firstTimerBoolean }">Monthly</span>
                  </div>
                </div>

                <div v-if="firstTimerBoolean">
                  <ColumnChart domId="chart3" title="First Timer Inflow" subtitle="How First Timers Come to Church"
                    header="First Timers Attendance" :data="chartData2" :series="series2"
                    :attendanceSeries="attendanceSeries" />
                </div>
                <div v-else class="ColumnChartDiv">
                  <ColumnChart domId="chart4" title="First Timer Inflow" subtitle="How First Timer Come to Church"
                    header="First Timers Attendance" :data="monthlyFirstTimerObj" :series="series2"
                    :attendanceSeries="attendanceSeries" />
                </div>
              </div>
              <!-- </div> -->

              <div class="mt-4" v-show="firstTimerPieExist">
                <div class="">
                  <div class="row">
                    <div class="col-12 col-md-6 d-flex justify-content-center">
                      <ByGenderChart domId="source" title="Invitation Source" distance="5" :titleMargin="10" :summary="
                        tenantInfoInvitationSource
                          ? tenantInfoInvitationSource
                          : []
                      " />
                    </div>
                    <div class="col-12 col-md-6 mt-3 mt-md-0 d-flex justify-content-center">
                      <ByMaritalStatusChart domId="join" title="Interested In Joining" :titleMargin="10" :summary="
                        tenantInfoInterestedInJoining
                          ? tenantInfoInterestedInJoining
                          : []
                      " />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="
        tenantInfoCeleb.length === 0 &&
        (tenantInfoFirstTimerWeekly[0] && tenantInfoFirstTimerWeekly[0].data.every(i => i === 0)) &&
        (tenantInfoAttendanceWeekly[0] && tenantInfoAttendanceWeekly[0].data.every(i => i === 0))
      ">
        <div class="container-fluid mt-5">
          <div class="row">
            <div class="col-12 more-things">
              <div class="can-do">
                <h4>More Benefits You Can Get</h4>
              </div>
            </div>
          </div>
          <div class="row mt-4">
            <div class="col-12 col-sm-6 col-md-4 more-things">
              <img src="../../assets/website2.svg" />
              <div class="mt-4">
                <div class="can-do">
                  <h4>Website</h4>
                </div>
              </div>
              <div class="more-body mt-2">
                Get a user engaging website for your church.
              </div>
              <a href="https://churchplus.co/awoofwebsite/" target="_blank">
                <el-button color="#136ACD" class="mt-1" round plain>Get one now</el-button>
              </a>
            </div>
            <div class="col-12 col-sm-6 col-md-4 mt-5 mt-sm-0 more-things second">
              <img src="../../assets/onlinegiving2.svg" />
              <div class="mt-4">
                <div class="can-do">
                  <h4>Online giving</h4>
                </div>
              </div>
              <div class="more-body mt-2">
                Allow members to make online donations to your church.
              </div>
              <router-link to="/tenant/payments">
                <el-button color="#136ACD" class="mt-1" round plain>Set up now</el-button>
              </router-link>
            </div>
            <div class="col-12 col-sm-6 col-md-4 mt-5 mt-md-0 more-things">
              <img src="../../assets/mobileapp2.svg" />
              <div class="mt-4">
                <div class="can-do">
                  <h4>Mobile app</h4>
                </div>
              </div>
              <div class="more-body mt-2">
                Get a customized mobile app for your church.
              </div>
              <router-link :to="{ name: 'MobileOnboarding' }">
                <el-button color="#136ACD" class="mt-1" round plain>Set up now</el-button>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import ByMaritalStatusChart from "@/components/charts/PieChart";
import ByGenderChart from "@/components/charts/PieChart";
import ColumnChart from "@/components/charts/ColumnChart.vue";
import { computed, onMounted, ref } from "vue";
import mixin from "@/mixins/currentUser.mixin.js"
import router from "@/router/index";
import axios from "@/gateway/backendapi";
import moment from "moment";
import stopProgressBar from "../../services/progressbar/progress";
import setupService from "../../services/setup/setupservice";
import formatDate from "../../services/dates/dateformatter";
import useSubscription from "../../services/subscription/useSubscription";
import deviceBreakpoint from "../../mixins/deviceBreakpoint";

export default {
  mixins: [mixin],
  components: {
    ColumnChart,
    ByMaritalStatusChart,
    ByGenderChart,

  },
  data() {
    return {}

  },
  created() {
      this.getCurrentUser()
  },

  setup() {
    const moreLinksVissible = ref(false);
    const offering = ref([23, 45, 65, 78, 89]);
    const attendanceBoolean = ref(true);
    const firstTimerBoolean = ref(true);
    const attendanceDataExist = ref(false);
    const firstTimerDataExist = ref(false);
    const firstTimerPieExist = ref(false);
    const summed = ref(0);
    const planUserIs = ref("");
    const today = new Date();
    
    


    const toggleMoreLinkVissibility = () => {
      moreLinksVissible.value != moreLinksVissible.value;
    };

    const celebrations = [];
    const tenantInfo = ref({});
    const tenantInfoBasic = ref({});
    const celeb = ref([]);
    const attendanceSeries = ref("weekly");
    const firstTimerSeries = ref("weekly");
    const tenantInfoAttendanceWeekly = ref([]);
    const tenantInfoAttendanceMonthly = ref([]);
    const tenantInfoFirstTimerWeekly = ref([]);
    const tenantInfoFirstTimerMonthly = ref([]);
    const tenantInfoInvitationSource = ref([]);
    const tenantInfoInterestedInJoining = ref([]);
    const tenantInfoExtra = ref({});

    const subscriptionPlan = ref([]);
    const dashboardLoading = ref(false)

    const xAxis = ref([]);
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

    const { lgAndUp, xlAndUp } = deviceBreakpoint()


    const celebHeaders = ref([
      { text: "NAME", value: "name" },
      { text: "DATE", value: "date" },
      { text: "DAY", value: "phone" },
      { text: "TYPE", value: "celebration" },
      { text: "PHONE", value: "phone" },
    ]);

    const series = computed(() => {
      if (attendanceSeries.value === "weekly") return xAxis.value;
      return monthXaxis.value;
    });

    const series2 = computed(() => {
      if (firstTimerSeries.value === "weekly") return xAxis.value;
      return monthXaxis.value;
    });

    onMounted(() => {
      getBasicDashboard()
    })

    const getBasicDashboard = () => {
      dashboardLoading.value = true
      axios
        .get("/dashboard/basic")
        .then((res) => {
          dashboardLoading.value = false
          tenantInfoBasic.value = res.data.returnObject;
          tenantInfoExtra.value.hasMobileApp = res.data.returnObject.hasMobileApp;
          tenantInfoExtra.value.hasOnlineGiving = res.data.returnObject.hasOnlineGiving;
          tenantInfoExtra.value.hasWebsite = res.data.returnObject.hasWebsite;
          let sum = 0;
          tenantInfo.value.firstTimerSummary.invitationSource.forEach((i) => {
            sum += +i.value;
          });
          summed.value = sum;
        })
        .catch((err) => {
          stopProgressBar();
          if (err.response && err.response.status === 401) {
            dashboardLoading.value = false
            localStorage.removeItem("token");
            setupService.clearStore();
            router.push("/");
          }
        });
    };

    

//     function expiryDate(date_string) {
//   var expiration = moment(date_string).format("YYYY-MM-DD");
//   // console.log(expiration, "bim")
//   var current_date = moment().format("YYYY-MM-DD");
//   console.log(current_date,"wetin be this")
//   var days = moment(expiration).diff(current_date, 'days');
//   return days;
// }

// alert("Days remaining = " + expiryDate(""));
// console.log("Days remaining = " + expiryDate(""));

//   expiryDate();
  
    function getCelebDashboard() {
      axios.get("/dashboard/celebrations").then((res) => {
        celeb.value=res.data.returnObject.celebrations;
      });
    }
    getCelebDashboard();

    let tenantInfoCeleb = computed(() => {
      if (celeb.value.length === 0) return []
      return celeb.value.sort((b, a) => new Date(b.date) - new Date(a.date))
    })

    onMounted(() => {
      axios
        .get("/dashboard/attendance")
        .then((res) => {
          tenantInfoAttendanceWeekly.value =
            res.data.returnObject.eventAttendanceChartDataWeekly;
          tenantInfoAttendanceMonthly.value =
            res.data.returnObject.eventAttendanceChartDataMonthly;

          tenantInfoFirstTimerWeekly.value =
            res.data.returnObject.firstTimerSummary.firstTimerWeekly;
          tenantInfoFirstTimerMonthly.value =
            res.data.returnObject.firstTimerSummary.firstTimerMonthly;

          tenantInfoInvitationSource.value =
            res.data.returnObject.firstTimerSummary.invitationSource;
          tenantInfoInterestedInJoining.value =
            res.data.returnObject.firstTimerSummary.interestedInJoining;

          tenantInfoAttendanceWeekly.value[0].data.forEach((element) => {
            if (element > 0) {
              attendanceDataExist.value = true;
            }
          });

          tenantInfoFirstTimerWeekly.value[0].data.forEach((element) => {
            if (element > 0) {
              firstTimerDataExist.value = true;
            }
          });

          let sum = 0;
          tenantInfoInterestedInJoining.value.forEach((i) => {
            sum += +i.value;
          });
          if (sum > 0) {
            firstTimerPieExist.value = true;
          } else {
            firstTimerPieExist.value = false;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    });

    const showPieChart = computed(() => {
      if (!tenantInfo.value || tenantInfo.value.firstTimerSummary) return [];
      return tenantInfo.value.firstTimerSummary;
    });

    onMounted(() => {
      for (let i = 1; i <= 52; i++) {
        xAxis.value.push(i);
      }
    });

    const weeklyAttendance = () => {
      attendanceSeries.value = "weekly";
      attendanceBoolean.value = true;
    };

    const monthlyAttendance = () => {
      attendanceBoolean.value = false;
      attendanceSeries.value = "monthly";

    };

    const weeklyFirstTimer = () => {
      firstTimerSeries.value = "weekly";
      firstTimerBoolean.value = true;
    };

    const monthlyFirstTimer = () => {
      firstTimerBoolean.value = false;
      firstTimerSeries.value = "monthly";
    };

    const chartData = computed(() => {
      if (!tenantInfoAttendanceWeekly.value) return [];
      let chartWeekly = []
      let chartObj = tenantInfoAttendanceWeekly.value.find(i => i.name === "Attendance")
      chartObj['color'] = '#002044'
      chartWeekly.push(chartObj)
      return chartWeekly
    });
    const monthlyAttendanceObj = computed(() => {
      if (!tenantInfoAttendanceMonthly.value) return [];
      let chartMonthly = []
      let chartObj = tenantInfoAttendanceMonthly.value.find(i => i.name === "Attendance")
      chartObj['color'] = '#002044'
      chartMonthly.push(chartObj)
      return chartMonthly
    });

    const chartData2 = computed(() => {
      if (!tenantInfoFirstTimerWeekly.value) return [];
      tenantInfoFirstTimerWeekly.value[0].color = '#002044';
      return tenantInfoFirstTimerWeekly.value
    });

    const monthlyFirstTimerObj = computed(() => {
      if (!tenantInfoFirstTimerMonthly.value) return [];
      tenantInfoFirstTimerMonthly.value[0].color = '#002044';
      return tenantInfoFirstTimerMonthly.value
    });

    const chartDataNewConvert = computed(() => {
      if (!tenantInfo.value.eventAttendanceChartData) return [];
      return tenantInfo.value.eventAttendanceChartData[2];
    });

    const sumIt = computed(() => {
      if (!summed.value) return false;
      return true;
    });

    const dateFormat = (payload) => {
      return formatDate.monthDayYear(payload);
    };

    const retrieveSubscriptionInfo = () => { };

    const useSubscriptionResponse = ref([]);
    const getRenewalDate = ref("");

    const countDownDate = () =>{
                    // Set the date we're counting down to
          let countDownDates = new Date("Feb 3, 2023 15:37:25").getTime();
          console.log(countDownDates, "jklkj");

          // Update the count down every 1 second
          // let x = setInterval(() => {

            // Get today's date and time
            let now = new Date().getTime();
              
            // Find the distance between now and the count down date
            let distance = countDownDates - now;
            console.log(distance,  "dsksdshkj");
              
            // Time calculations for days, hours, minutes and seconds
            let days = Math.floor(distance / (1000 * 60 * 60 * 24));
            console.log(days + ' ' + 'days left', "kjhkj")
            // let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            // let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            // let seconds = Math.floor((distance % (1000 * 60)) / 1000);
              
            // Output the result in an element with id="demo"
            // document.getElementById("demo").innerHTML = days + "d " + hours + "h "
            // + minutes + "m " + seconds + "s ";
              
            // If the count down is over, write some text 
            // if (distance < 0) {
            //   clearInterval(x);
            //   document.getElementById("demo").innerHTML = "EXPIRED";
            // }
          // }, 1000);
    }
    countDownDate()

    useSubscription.getPlan().then((res) => {
      planUserIs.value = res.description;
      getRenewalDate.value = res.subscriptionExpiration;
      useSubscriptionResponse.value = res;
    });

    const calculatedPercentage = computed(() => {
      if (!useSubscriptionResponse.value || !useSubscriptionResponse.value.id)
        return 0;
      return calculatePercentage(tenantInfoBasic.value.memberCount);
    });

    const checkRenewalDate = computed(() => {
      if (!getRenewalDate.value) return false;
      return new Date(Date.now()) > new Date(getRenewalDate.value);
    });

    const buttonTextCheck = computed(() => {
      if (checkRenewalDate.value && planUserIs.value === "TRIAL") return {
        text: "SUBSCRIBE",
        color: "btn-danger-upgrade"
      };

      if (checkRenewalDate.value && planUserIs.value !== "FREE PLAN") return {
        text: "RENEW",
        color: "renew-btn-color",
      };

      if (checkRenewalDate.value && planUserIs.value === "FREE PLAN") return {
        text: "SUBSCRIBE",
        color: "btn-danger-upgrade",
      };

      if (planUserIs.value === "UNLIMITED") return { text: "PRODUCT" };
      return { text: "UPGRADE" };

    });

    let currentPlan;
    const calculatePercentage = (totalMembers) => {
      currentPlan = useSubscriptionResponse.value.subscriptionPlans.find(
        (i) => {
          return i.id === useSubscriptionResponse.value.id;
        }
      );
      return (totalMembers / currentPlan.membershipSize) * 100;
    };


    return {
      celebrations,
      getRenewalDate,
      tenantInfo,
      tenantInfoBasic,
      tenantInfoCeleb,
      moreLinksVissible,
      toggleMoreLinkVissibility,
      offering,
      moment,
      attendanceBoolean,
      weeklyAttendance,
      monthlyAttendance,
      firstTimerBoolean,
      weeklyFirstTimer,
      monthlyFirstTimer,
      chartData,
      monthlyAttendanceObj,
      xAxis,
      monthXaxis,
      series,
      showPieChart,
      chartData2,
      series2,
      monthlyFirstTimerObj,
      chartDataNewConvert,
      firstTimerSeries,
      attendanceDataExist,
      firstTimerDataExist,
      firstTimerPieExist,
      summed,
      sumIt,
      dateFormat,
      tenantInfoAttendanceWeekly,
      tenantInfoAttendanceMonthly,
      tenantInfoFirstTimerWeekly,
      tenantInfoFirstTimerMonthly,
      tenantInfoInvitationSource,
      tenantInfoInterestedInJoining,
      tenantInfoExtra,
      subscriptionPlan,
      retrieveSubscriptionInfo,
      planUserIs,
      useSubscriptionResponse,
      calculatedPercentage,
      calculatePercentage,
      checkRenewalDate,
      buttonTextCheck,
      celeb,
      attendanceSeries,
      lgAndUp,
      xlAndUp,
      celebHeaders,
      dashboardLoading
    };
  },
};
</script>

<style scoped>
.renew-btn-color {
  background-color: #ffbf00 !important;
}

.btn-danger-upgrade {
  color: #fff !important;
  background-color: #E60023 !important;
}

/* * {
  color: #02172e;
} */

#main {
  display: flex;
  justify-content: space-between;
}

.menu-links {
  width: 20%;
  min-width: 255px;
}

.main-content {
  display: flex;
  justify-content: space-around;
  width: 90%;
  margin: 0 auto;
  /* background: #F1F5F8; */
  padding: 10px;
}

.second-col {
  width: 100%;
}

.charts {
  margin-bottom: 2rem;
}

.top-bar {
  display: flex;
  justify-content: space-between;
  padding: 10px;
}

.create-btn-div {
  display: flex;
  padding: 0 10px 10px 0;
  justify-content: space-between;
  margin-bottom: 24px;
}

.top-row {
  display: flex;
  padding: 10px;
  margin-bottom: 30px;
  justify-content: space-between;
}

.second-col .create-btn-div .create-btn {
  background: #136acd;
  color: #fff;
  border-radius: 22px;
  border: none;
  padding: 4px 14px;
  height: 40px;
  align-self: center;
  font-size: 16px;
  outline: none;
  display: flex;
  align-items: center;
}

.second-col .create-btn-div .create-btn:hover {
  cursor: pointer;
}

.top-icon-div {
  background: #f1f5f8;
  padding: 4px;
  border-radius: 50%;
}

.top-icon-div i {
  color: #136acd;
  font-size: 24px;
  padding: 4px;
  /* filter: invert(29%) sepia(74%) saturate(1909%) hue-rotate(197deg) brightness(91%) contrast(89%); */
}

/* .box-top-text p {
  font-weight: 600;
}

.box-top-text h4 {
  color: #136acd;
  font-size: larger;
} */

.create-dd {
  padding: 0 9px;
  color: #fff;
}

.first-col {
  padding: 10px 30px;
}

.can-do h4 {
  margin: 0;
  font-weight: 700;
  font-size: 20px;
}

.can-do {
  display: flex;
  flex-direction: column;
}

.can-do-links a {
  margin-top: 20px;
  text-decoration: none;
  color: #2b6ecd;
  font-weight: 700;
  font-size: 16px;
}

.celebrant {
  display: flex;
  justify-content: space-between;
  margin: 5px 0;
  text-decoration: none;
  color: #2b6ecd;
  font-weight: 600;
  opacity: 0.9;
}

.view-more {
  text-align: center;
  margin-top: 0.5rem;
}

.second-col .number-boxes {
  /* width: 100%; */
  max-width: 450px;
  display: flex;
  justify-content: flex-end;
}

.box {
  width: 170px;
  /* margin-left: 20px; */

  background: #FFFFFF;
  box-shadow: 0px 2px 7.5px rgba(0, 0, 0, 0.0588235);
  border-radius: 15px;
}


.box-bottom {
  background: #F1F5F8;
  box-shadow: 0px 11px 17px rgba(206, 205, 205, 0.360784);
  border-radius: 0px 0px 15px 15px;
}

/* 
.box2 .bottom {
  
  border-radius: 0px 0px 28px 28px;
} */







/* .upgrade-btn2:hove
.buy-btn {
  width: 109.5px;
} */

/* .plan-text {
  font-size: 9px;
  align-self: center;
  text-transform: uppercase;
  font-weight: 800;
  width: 80px;
  margin-left: 10px;
} */

/* .box-top {
  display: flex;
  justify-content: space-between;
  align-items: start;
} */

/* .box-middle {
  padding: 24px 0;
} */

/* .box-top-text h4, */
/* .box-top-text p {
  margin: 0;
  font-size: 12px;
}

.box-top-text h4 {
  font-size: 20px;
  font-weight: 800;
} */

/* .box-middle h1 {
  margin: 0;
  font-size: 30px;
  font-weight: 400;
} */

.celebrations {
  padding: 10px;
  /* border: 1px solid red; */
  border: 1px solid #e6e5f2;
  border-radius: 28px;
  margin-top: 80px;
}

.pie-con {
  margin: 24px 0;
}

/* Table */
.table-top {
  display: flex;
  justify-content: flex-end;
}

.view-all {
  padding: 10px;
  width: 120px;
  box-shadow: 0px 3px 6px #2c28281c;
  border: 1px solid #136acd;
  border-radius: 1000px;
  text-align: center;
  margin: 4px;
}

.celeb-header {
  display: flex;
  align-items: center;
  font-weight: 700;
  font-size: 20px;
  margin-top: 20px;
}

@media (max-width: 767px) {

  .top-row {
    display: flex;
    flex-direction: column;
  }

  .box {
    margin-top: 30px;
  }


  .adjust-view {
    display: none;
  }



  .container-fluid-mobile {
    border: 1px solid !important;
    width: 85% !important;
    box-shadow: 0px 1px 4px #b1bfce45 !important;
    border-radius: 30px;
    border: 1px solid #DDE2E6 !important;
  }
}

.celeb-header-text p {
  margin: 0;
}

.celeb-icon {
  height: 81px;
  margin-left: -33px;
}

.help-text2 {
  display: flex;
  align-items: flex-start;
}

.help-text2 img {
  width: 76px;
  margin-top: -9px;
  margin-left: -14px
}

.pies {
  margin-top: 50px;
}

tbody tr:nth-child(even) {
  background: #f7fafc;
}

.table-body {
  font-size: 14px;
}

.phone.one {
  margin-left: -20px;
}

/* .box-btn-text {
  margin: 0px;
  font-size: 12px;
  font-weight: 700;
  
  color: #136acd;
} */

/* .box-btn-text2 {
  margin: 0px;
  font-size: 12px;
  font-weight: 800;

  color: #136acd;
} */

.size-text {
  color: #136acd;
  font-weight: 700;
}

.more-links {
  margin-top: -10px !important;
  background: transparent !important;
  border-top: none !important;
  position: absolute !important;
  width: inherit;
}

.table thead {
  background: #f1f3f9;
  color: #8898aa;
  font-size: 11px;
}

.table tr td img {
  width: 40px;
}

.table tbody {
  font-size: 14px;
  align-items: center;
}

.more-links a {
  text-decoration: none;
}

.pie-con {
  border: 0.4000000059604645px solid #dde2e6;
  box-shadow: 0px 1px 4px #02172e45;
  border-radius: 10px;
}

.project-name {
  margin-left: 10px;
  font-weight: 700;
}

.adjust-view {
  position: relative;
  top: 80px;
  right: 10px;
  z-index: 1;
}

.more-things {
  text-align: center;
  font: normal normal 800 26px/35px Nunito Sans;
  letter-spacing: 0px;
  color: #020e1c;
  opacity: 0.8;
}

.more-body {
  text-align: center;
  font: normal normal 600 16px/22px Nunito Sans;
  letter-spacing: 0px;
  color: #020e1c;
  opacity: 0.8;
}

/* .learn-more {
  border: 1px solid #707070;
  border-radius: 25px;
  padding: 10px;
  opacity: 1;
  font: normal normal bold 14px/19px Nunito Sans;
  letter-spacing: 0px;
  color: #020e1c;
  background: #ffffff 0% 0% no-repeat padding-box;
}

.learn-more.second {
  margin-top: 21px;
} */

.more-things.side {
  background: #ecf0f3 0% 0% no-repeat padding-box;
  border-radius: 15px;
  opacity: 1;
}

/* .welcome-user {
  width: 64%;
  float: right;
} */

@media (max-width: 575px) {
  .adjust-view {
    left: 65px;
    top: 150px;
  }

  .view-report {
    display: none;
  }
}

@media (max-width: 705px) {
  .can-do-links {
    display: flex;
    flex-direction: column;
    /* text-align: center;
    margin-left: -3rem; */
  }
}

@media (max-width: 305px) {
  /* .ColumnChartDiv {
    font-size: 25px;
    font-weight: 600;
    margin: 0 0 -24px 0;
  } */
  /* .adjust-view {
    top: 85.5em;
  } */
}

@media (min-width: 509px) and (max-width: 515px) {
  /* .adjust-view {
    position: absolute;
    left: 20em;
    top: 60.7em;
} */
}

@media (min-width: 516px) and (max-width: 576px) {
  /* .adjust-view {
    position: absolute;
    left: 20em;
    top: 58.7em;
} */
}

.view-report {
  font: normal normal 800 16px/22px Nunito Sans;
  letter-spacing: 0px;
  color: #2b6ecd;
  /* text-align: right;
  margin-right: 40px; */
  cursor: pointer;
}

.weekly {
  /* text-align: right;
  margin-right: 40px; */
  cursor: pointer;
}

.active {
  color: #2b6ecd;
}

.chart-con {
  width: 100%;
  display: flex;
  justify-content: space-between;
  box-shadow: 0px 1px 4px #02172e45;
  border: 1px solid #dde2e6;
  border-radius: 30px;
  margin: 0 0 24px 0;
  padding: 25px 0;
}

.table td {
  vertical-align: baseline;
}

/* WIP */

/* @media screen and (max-width: 376px) {
  .top-row {
    flex-direction: column;
  }

  .can-do, .can-do-links {
    width: 90%;
  }
} */

@media screen and (max-width: 940px) {
  /* .help-text2 {
    display: flex;
    align-items: flex-start;
  } */

  .second-col .number-boxes {
    max-width: 100%;
    justify-content: space-between;
  }

  .box {
    /* width: 40%; */
    margin-left: 0;
  }

  .can-do {
    width: 100%;
  }

  .can-do-links {
    flex-direction: column;
    justify-content: space-around;
  }
}

@media (min-width: 1101px) and (max-width: 1231px) {
  /* .top-row {
      flex-direction: column;
  }

  .number-boxes {
     margin: 0;
  }

  .box {
    margin-top: 20px;
  } */
}

@media screen and (min-width: 1300px) {
  /* .box-middle {
     padding: 43px 0;
  } */
}

@media (max-width: 556px) {
  .can-do-links {
    justify-content: space-between;
    flex-wrap: wrap;
  }

  .can-do-links a {
    min-width: 100px;
  }
}

@media (max-width: 508px) {


  /* .create-btn-div {
    flex-direction: column;
    align-items: center;
  } */

  .second-col .create-btn-div .create-btn {
    margin-top: 10px;
  }

  .top-row {
    margin-top: 40px;
  }

}

.push-down {
  margin-top: 32px;
}

.fade-text {
  color: #a8a8a8;
  cursor: not-allowed;
}

.text-color {
  color: #212529;
}


@media screen and (max-width: 480px) {
  .firstTimerClass {
    padding-top: 9px;
    /* background-color: lightgreen; */
  }

}

@media screen and (max-width: 360px) {
  /* .box {
    width: 100%;
  } */

  .number-boxes {
    flex-direction: column;
    /* width: 70%; */
    align-self: center;
    margin-top: 10px;
  }

}

.celeb-badge {
  border-radius: 50%;
  border: 1px solid red;
  width: 10px;
  height: 10px;
  background: red;
}

.celeb-badge-desc {
  position: relative;
  left: 24px;
  top: -26px;
}

.celeb-img {
  width: 30px;
  height: 30px;
  object-fit: cover;
  border-radius: 50%;
}
</style>