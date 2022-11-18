<template>
  <main class="container-slim" id="main">
    <div class="second-col container-top">
      <div class="create-btn-div">
        <div>
          <h2 class="title">Dashboard</h2>
        </div>

        <div>
          <button
            class="create-btn"
            @click="moreLinksVissible = !moreLinksVissible"
          >
            Create new
            <i class="pi pi-angle-down create-dd"></i>
          </button>
          <div class="more-items ml-1" v-if="moreLinksVissible">
            <div class="container">
              <div class="row">
                <div
                  class="
                    col-md-12
                    d-flex
                    flex-column
                    border
                    rounded
                    more-links
                    px-4
                  "
                >
                  <router-link
                    to="/tenant/people/add"
                    class="font-weight-bold mt-3 text-dec-none"
                    >Member</router-link
                  >
                  <router-link
                    to="/tenant/people/addfirsttimer"
                    class="font-weight-bold text-dec-none firstTimerClass"
                    >First timer</router-link
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- <div class="help-text1">
            <img src="../../assets/can-do.svg" alt="">
            <div class="can-do">
              <h4>Things You Can Do</h4>
              <div class="can-do-links">
                <a href="">Add member</a>
                <a href="">Send SMS</a>
                <a href="">Add First Timer</a>
                <a href="">Add Follow-up</a>
              </div>
            </div>
          </div> -->
      <div class="top-row px-0">
        <div class="help-text2">
          <img src="../../assets/can-do.svg" alt="" />
          <div class="can-do">
            <h4>Things You Can Do</h4>
            <div class="can-do-links can-do">
              <router-link to="/tenant/people/add">Add Member</router-link>
              <router-link to="/tenant/sms/compose">Send SMS</router-link>
              <router-link to="/tenant/people/addfirsttimer"
                >Add First Timer</router-link
              >
              <router-link to="" v-if="false">Add Follow-up</router-link>
            </div>
          </div>
        </div>

        <div v-if="tenantInfoBasic.memberCount === 0">
          <img src="../../assets/welcome_user.svg" class="welcome-user" />
        </div>
        <div class="number-boxes" v-else>
          <div class="box one">
            <div class="top">
              <div class="box-top">
                <div class="top-icon-div">
                  <i class="pi pi-users"></i>
                </div>
                <div class="box-top-text">
                  <p>FIRST TIMERS</p>
                  <h4>{{ tenantInfoBasic.firstTimerCount }}</h4>
                </div>
              </div>
              <div class="box-middle">
                <h1>{{ tenantInfoBasic.memberCount }}</h1>
                <span class="size-text">Church Size</span>
              </div>
            </div>
            <div class="bottom">
              <div class="box-bottom">
                <div style="font-size: 0.8em; padding-top:0.3rem; font-weight: 700"  v-tooltip.top="planUserIs">
                  {{ planUserIs }}
                  <!-- {{ planUserIs.length > 11 ? `${planUserIs.slice(0, 9)}...` : planUserIs }} -->
                </div>
                <router-link :to="{ name: 'Subscription' }" class="mt-1">
                  <!-- <span class="plan-text">YOU'RE ON A FREE PLAN</span> -->
                  <button

                  class="upgrade-btn"
                  :class="[buttonTextCheck.color, { 'bg-warning': calculatedPercentage >= 90}]"
                  >
                    <h4 class="box-btn-text" :class="[buttonTextCheck.color]"> {{buttonTextCheck.text}} </h4>
                  </button>
                  <!-- <div v-if="expirationNotice" class="small-text h5 w-100 font-weight-bold">
                  Subscription will expire soon 
                </div> -->
                </router-link>
              </div>
            </div>
          </div>
          <div class="box box2">
            <div class="top">
              <div class="box-top">
                <div class="top-icon-div">
                  <i class="pi pi-envelope"></i>
                </div>
                <div class="box-top-text"></div>
              </div>
              <div class="box-middle">
                <h1>{{ tenantInfoBasic.smsUnit }}</h1>
                <span class="size-text">SMS Units</span>
              </div>
            </div>
            <div class="bottom">
              <div class="box-bottom">
                <span class="plan-text"></span>
                <router-link :to="{ name: 'BuyUnits', path: '/tenant/buyunits' }" class="push-down">
                  <button class="upgrade-btn2 buy-btn">
                    <h4 class="box-btn-text2">BUY UNITS</h4>
                  </button>
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="container-fluid">
        <div class="row">
          <div
            class="col-8 offset-2 offset-md-0 col-md-3 p-0"
            v-if="
              tenantInfoCeleb.length > 0 ||
              (tenantInfoFirstTimerWeekly[0] && tenantInfoFirstTimerWeekly[0].data.some(i => i > 0)) ||
              (tenantInfoAttendanceWeekly[0] && tenantInfoAttendanceWeekly[0].data.some(i => i > 0))
            "
          >
            <div
              class="more-things side p-3"
              v-if="!tenantInfoExtra.hasWebsite"
            >
              <!-- <i class="pi pi-times"></i> -->
              <img src="../../assets/website.svg" class="w-100" />
              <div class="mt-4">Website</div>
              <div class="more-body mt-2">
                Get a user engaging website for your church.
              </div>
              <a href="https://churchplus.co/awoofwebsite/" target="_blank"
                ><div class="learn-more mt-3 col-12 cursor-pointer">
                  Get One Now
                </div></a
              >
            </div>

            <div
              class="more-things side p-3 mt-4"
              v-if="!tenantInfoExtra.hasOnlineGiving"
            >
              <img src="../../assets/online_giving.png" class="w-100" />
              <div class="mt-4">Online Giving</div>
              <div class="more-body mt-2">
                Make online donations to your church.
              </div>
              <router-link to="/tenant/payments"
                ><div class="learn-more mt-3 col-12 cursor-pointer">
                  Set Up Now
                </div></router-link
              >
            </div>

            <div
              class="more-things side p-3 mt-4"
              v-if="!tenantInfoExtra.hasMobileApp"
            >
              <img src="../../assets/mobile_app.svg" class="w-100" />
              <div class="mt-4">Mobile App</div>
              <div class="more-body mt-2">
                Get a customized mobile app for your church.
              </div>
              <router-link :to="{ name: 'MobileOnboarding' }"
                ><div class="learn-more mt-3 col-12 cursor-pointer">
                  Set Up Now
                </div></router-link
              >
            </div>
          </div>

          <div
            class="pl-5 pr-0"
            :class="{
              'col-12 col-md-9':
                !tenantInfoExtra.hasMobileApp ||
                !tenantInfoExtra.hasOnlineGiving ||
                !tenantInfoExtra.hasWebsite,
              'col-md-12':
                tenantInfoExtra.hasMobileApp &&
                tenantInfoExtra.hasOnlineGiving &&
                tenantInfoExtra.hasWebsite,
            }"
          >
            <!-- Celebrations -->
            <div v-if="tenantInfoCeleb && tenantInfoCeleb.length > 0">
              <div class="celeb-header">
                <div class="celeb-icon">
                  <img
                    src="../../assets/celeb-icon.svg"
                    alt="Celebration Icon"
                  />
                </div>
                <div class="celeb-header-text">
                  <p>Celebrations</p>
                </div>
              </div>
              <div class="table table-responsive">
                <div class="table-top">
                  <router-link to="" class="view-all" v-if="false"
                    >View all</router-link
                  >
                </div>
                <!-- <div class="d-flex justify-content-start ml-3 my-3">
                  <div class="celeb-badge align-self-center"></div>
                  <div class="ml-2">represents celebrations for today</div> 
                </div> -->

                <table class="w-100">
                  <thead>
                    <tr>
                      <th>NAME</th>
                      <th>DATE</th>
                      <th>DAY</th>
                      <th>TYPE</th>
                      <th>PHONE</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="celebration in tenantInfoCeleb"
                      :key="celebration.id"
                    >
                      <td>
                        <img
                          src="../../assets/people/avatar-male.png"
                          alt=""
                        /><span class="project-name">{{
                          celebration.name
                        }}</span>
                        <div class="celeb-badge-desc celeb-badge" v-if="celebration.dayOfCelebration.toString().toLowerCase().includes('today')"></div>
                      </td>
                      <td>
                        {{ dateFormat(celebration.date) }}
                      </td>
                      <td>{{ celebration.dayOfCelebration }}</td>
                      <td>{{ celebration.celebration }}</td>
                      <td>{{ celebration.phone }}</td>
                      <td>
                        <i
                          class="fas fa-ellipsis-v cursor-pointer"
                          id="dropdownMenuButton"
                          data-toggle="dropdown"
                          aria-haspopup="true"
                          aria-expanded="false"
                        ></i>
                        <div
                          class="dropdown-menu"
                          aria-labelledby="dropdownMenuButton"
                        >
                          <!-- v-if="person.mobilePhone" -->
                          <a class="dropdown-item elipsis-items" >
                            <router-link
                              :to="celebration.phone ? `/tenant/sms/compose?phone=${celebration.phone}` : ''" :class="{ 'fade-text': !celebration.phone, 'text-color': celebration.phone }"
                              >Send SMS</router-link
                            >
                          </a>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div
              v-show="
                tenantInfoCeleb.length > 0 ||
                (tenantInfoFirstTimerWeekly[0] &&
                  tenantInfoFirstTimerWeekly[0].data.length > 0) ||
                (tenantInfoFirstTimerWeekly[0] &&
                  tenantInfoFirstTimerWeekly[0].data[0] > 0) ||
                (tenantInfoAttendanceWeekly[0] &&
                  tenantInfoAttendanceWeekly[0].data.length > 0) ||
                (tenantInfoAttendanceWeekly[0] &&
                  tenantInfoAttendanceWeekly[0].data[0] > 0)
              "
            >
              <!-- <div class="charts" id="plot"> -->
              <div v-if="tenantInfoAttendanceWeekly && attendanceDataExist">
                <div
                  class="adjust-view col-10 col-sm-3 offset-sm-9 mt-5 mt-md-0"
                >
                  <div class="view-report">View Reports</div>
                  <div class="weekly">
                    <span
                      @click="weeklyAttendance"
                      :class="{ active: attendanceBoolean }"
                      >Weekly</span
                    >&nbsp;&nbsp;&nbsp;<span
                      @click="monthlyAttendance"
                      :class="{ active: !attendanceBoolean }"
                      >Monthly</span
                    >
                  </div>
                </div>
                <div v-if="attendanceBoolean">
                  <ColumnChart
                    domId="chart1"
                    title="Event Attendance"
                    subtitle="Weekly Attendance of Events"
                    header="Members Attendance"
                    :data="chartData"
                    :series="series"
                    :attendanceSeries="attendanceSeries"
                  />
                </div>
                <div v-else>
                  <ColumnChart
                    domId="chart1"
                    title="Event Attendance"
                    subtitle="Monthly Attendance of Events"
                    header="Members Attendance"
                    :data="monthlyAttendanceObj"
                    :series="series"
                    :attendanceSeries="attendanceSeries"
                  />
                </div>
              </div>

              <div v-if="tenantInfoFirstTimerWeekly && firstTimerDataExist">
                <div class="adjust-view col-10 col-sm-3 offset-sm-9">
                  <div class="view-report">View Reports</div>
                  <div class="weekly">
                    <span
                      @click="weeklyFirstTimer"
                      :class="{ active: firstTimerBoolean }"
                      >Weekly</span
                    >&nbsp;&nbsp;&nbsp;<span
                      @click="monthlyFirstTimer"
                      :class="{ active: !firstTimerBoolean }"
                      >Monthly</span
                    >
                  </div>
                </div>

                <div v-if="firstTimerBoolean">
                  <ColumnChart
                    domId="chart3"
                    title="First Timer Inflow"
                    subtitle="How First Timers Come to Church"
                    header="First Timers Attendance"
                    :data="chartData2"
                    :series="series2"
                    :attendanceSeries="attendanceSeries"
                  />
                </div>
                <div v-else class="ColumnChartDiv">
                  <ColumnChart
                    domId="chart4"
                    title="First Timer Inflow"
                    subtitle="How First Timer Come to Church"
                    header="First Timers Attendance"
                    :data="monthlyFirstTimerObj"
                    :series="series2"
                    :attendanceSeries="attendanceSeries"
                  />
                </div>
              </div>
              <!-- </div> -->

              <div class="chart-div chart-div-mobile" v-show="firstTimerPieExist">
                <div class="container-fluid container-fluid-mobile">
                  <div class="row">
                    <div class="col-12 col-md-6 d-flex justify-content-center">
                      <ByGenderChart
                        domId="source"
                        title="Invitation Source"
                        distance="5"
                        :titleMargin="10"
                        :summary="
                          tenantInfoInvitationSource
                            ? tenantInfoInvitationSource
                            : []
                        "
                      />
                    </div>
                    <div class="col-12 col-md-6 d-flex justify-content-center">
                      <ByMaritalStatusChart
                        domId="join"
                        title="Interested In Joining"
                        :titleMargin="10"
                        :summary="
                          tenantInfoInterestedInJoining
                            ? tenantInfoInterestedInJoining
                            : []
                        "
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        v-if="
          tenantInfoCeleb.length === 0 &&
          (tenantInfoFirstTimerWeekly[0] && tenantInfoFirstTimerWeekly[0].data.every(i => i === 0)) &&
          (tenantInfoAttendanceWeekly[0] && tenantInfoAttendanceWeekly[0].data.every(i => i === 0))
        "
      >
        <div class="container-fluid">
          <div class="row">
            <div class="col-12 more-things">More Benefits You Can Get</div>
          </div>
          <div class="row mt-4">
            <div class="col-12 col-sm-6 col-md-4 more-things">
              <img src="../../assets/website.svg" />
              <div class="mt-4">Website</div>
              <div class="more-body mt-2">
                Get a user engaging website for your church.
              </div>
              <a href="https://churchplus.co/awoofwebsite/" target="_blank"
                ><div class="learn-more mt-3 col-6 offset-3 cursor-pointer">
                  Get One Now
                </div></a
              >
            </div>
            <div class="col-12 col-sm-6 col-md-4 more-things second">
              <img src="../../assets/online_giving.png" />
              <div class="mt-4">Online Giving</div>
              <div class="more-body mt-2">
                Allow members to make online donations to your church.
              </div>
              <router-link to="/tenant/payments"
                ><div class="learn-more second col-6 offset-3 cursor-pointer">
                  Set Up Now
                </div></router-link
              >
            </div>
            <div class="col-12 col-sm-6 col-md-4 more-things">
              <img src="../../assets/mobile_app.svg" />
              <div class="mt-4">Mobile App</div>
              <div class="more-body mt-2">
                Get a customized mobile app for your church.
              </div>
              <router-link :to="{ name: 'MobileOnboarding' }"
                ><div class="learn-more mt-3 col-6 offset-3 cursor-pointer">
                  Set Up Now
                </div></router-link
              >
            </div>
          </div>
        </div>
      </div>
      <div class="text-center" v-if="attendanceLoading">
        <i
          class="pi pi-spin pi-spinner text-primary"
          style="fontsize: 3rem"
        ></i>
      </div>

      <!-- <div class="table-footer" v-if="tenantInfo.celebrations && tenantInfo.celebrations.length > 0">
          <button class="tbl-footer-btn">
            <i class="pi pi-angle-left"></i>
          </button>
          <button class="tbl-footer-btn">1</button>
          <button class="tbl-footer-btn">2</button>
          <button class="tbl-footer-btn">
            <i class="pi pi-angle-right"></i>
          </button>
        </div> -->
      <!-- </div> -->
      <!-- <div>{{ tenantInfo.eventAttendanceChartData }}</div> -->

      <!-- <div>{{ tenantInfo.eventAttendanceChartData }}</div> -->
      <!-- <div>{{ chartData2 }}</div> -->

      <!-- <div class="pies">
          <div class="pie-con">
            <PieChart
              domId="pichart"
              title="Offering Breakdown"
              subtitle="Overview"
              distance="5"
              :titleMarginLeft="70"
              height="400"
              :summary="tenantInfoInterestedInJoining ? tenantInfoInterestedInJoining : []"
            />
          </div>

          <div class="pie-con">
            <PieChart
              domId="pchart"
              title="Offering Breakdown"
              subtitle="Overview"
              distance="1"
              :titleMarginLeft="70"
              height="400"
              :summary="tenantInfoInterestedInJoining ? tenantInfoInterestedInJoining : []"
            />
          </div>
        </div> -->
      <!-- </div> -->

      <!-- </div> -->
      
    </div>
  </main>
</template>

<script>
import ByMaritalStatusChart from "@/components/charts/PieChart";
import ByGenderChart from "@/components/charts/PieChart";
import ColumnChart from "@/components/charts/ColumnChart.vue";
// import PieChart from "@/components/charts/PieChart"
import { computed, onMounted, ref } from "vue";
// import { useRoute } from 'vue-router';
import mixin from "@/mixins/expiredSub.mixin.js"
import router from "@/router/index";
import axios from "@/gateway/backendapi";
import axio from  'axios'
import moment from "moment";
import stopProgressBar from "../../services/progressbar/progress";
import setupService from "../../services/setup/setupservice";
import formatDate from "../../services/dates/dateformatter";
import useSubscription from "../../services/subscription/useSubscription";
import Tooltip from "primevue/tooltip";

export default {
   mixins: [mixin],
  components: {
    ColumnChart,
    ByMaritalStatusChart,
    ByGenderChart,
    
  },
 

  directives: {
    tooltip: Tooltip,
  },

  setup() {
    // const store = useStore();
    const moreLinksVissible = ref(false);
    const offering = ref([23, 45, 65, 78, 89]);
    const attendanceBoolean = ref(true);
    const firstTimerBoolean = ref(true);
    const attendanceDataExist = ref(false);
    const firstTimerDataExist = ref(false);
    const firstTimerPieExist = ref(false);
    const summed = ref(0);
    const planUserIs = ref("");
    // const currentUser = ref(store.getters.currentUser);

    // const attendance

    const toggleMoreLinkVissibility = () => {
      moreLinksVissible.value != moreLinksVissible.value;
    };
    const fxRates = async () =>{
      try{
        let { data } = await axio.get('https://churcchplusbackgroundprocessor.azurewebsites.net/fxRates')
        console.log(data, 'thehreh');
      }
      catch(error){
        console.log(error);
      }
    }
    fxRates()

    // onMounted(() =>{
    //   axio.get('https://churcchplusbackgroundprocessor.azurewebsites.net/fxRates')
    //   .then((res)=>{
    //     console.log(res, "thfxRates")
    //   }).catch(((error)=>{
    //     console.log(error);
    //   }))
    // })
    // const mixinsCurrentUser = () => {
    //   console.log(store.getters.currentUser)
    // };

    const celebrations = [];
    // const route = useRoute();

    const tenantInfo = ref({});
    const tenantInfoBasic = ref({});
    const celeb = ref([]);
    const attendanceSeries = ref("weekly");
    const firstTimerSeries = ref("weekly");
    const tenantInfoAttendanceWeekly = ref([]);
    const tenantInfoAttendanceMonthly = ref([]);
    const attendanceLoading = ref(false);
    const tenantInfoFirstTimerWeekly = ref([]);
    const tenantInfoFirstTimerMonthly = ref([]);
    const tenantInfoInvitationSource = ref([]);
    const tenantInfoInterestedInJoining = ref([]);
    const tenantInfoExtra = ref({});
    // const warningAgainstExpire = ref("")
  

    // const monthlyFirstTimerObj = ref({})

    const subscriptionPlan = ref([]);

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

    const series = computed(() => {
      if (attendanceSeries.value === "weekly") return xAxis.value;
      return monthXaxis.value;
    });

    const series2 = computed(() => {
      if (firstTimerSeries.value === "weekly") return xAxis.value;
      return monthXaxis.value;
    });

    const getBasicDashboard = () => {
      axios
        .get("/dashboard/basic")
        .then((res) => {
          tenantInfoBasic.value = res.data.returnObject;
          tenantInfoExtra.value.hasMobileApp = res.data.returnObject.hasMobileApp;
          tenantInfoExtra.value.hasOnlineGiving = res.data.returnObject.hasOnlineGiving;
          tenantInfoExtra.value.hasWebsite = res.data.returnObject.hasWebsite;
          // tenantInfo.value.eventAttendanceChartDataWeekly[0].data.forEach(element => {
          //   if (element > 0) {
          //     attendanceDataExist.value = true
          //   }
          // });
          // tenantInfo.value.firstTimerSummary.firstTimerWeekly[0].data.forEach(element => {
          //   if (element > 0) {
          //     firstTimerDataExist.value = true
          //   }
          // });
          let sum = 0;
          tenantInfo.value.firstTimerSummary.invitationSource.forEach((i) => {
            sum += +i.value;
          });
          summed.value = sum;
          // if (sum > 0) {
          //   firstTimerPieExist.value = true
          // }
        })
        .catch((err) => {
          stopProgressBar();
          if (err.response && err.response.status === 401) {
            localStorage.removeItem("token");
            setupService.clearStore();
            router.push("/");
          }
        });
    };
    getBasicDashboard();

    let getCelebDashboard = () => {
      axios.get("/dashboard/celebrations").then((res) => {
        celeb.value = res.data.returnObject.celebrations;
      });
    };
    getCelebDashboard();

    let tenantInfoCeleb = computed (() => {
      if (celeb.value.length === 0) return []
      return celeb.value.sort((b, a) => new Date(b.date) - new Date(a.date))
    })

    onMounted(() => {
      attendanceLoading.value = true;
      axios
        .get("/dashboard/attendance")
        .then((res) => {
          attendanceLoading.value = false;
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

    // const subPlan = () => {
    //   axios.get("/api/GetAllSubscriptionPlans").then((res) => {
    //     console.log(res.data);
    //   });
    // };
    // subPlan();

    const weeklyAttendance = () => {
      attendanceSeries.value = "weekly";
      attendanceBoolean.value = true;
    };

    const monthlyAttendance = () => {
      attendanceBoolean.value = false;
      attendanceSeries.value = "monthly";

      // axios.get('/Dashboard/period?period=Months')
      //   .then(res => {
      //     monthlyAttendanceObj.value = res.data.eventAttendanceChartData[0]

      //  })
    };

    const weeklyFirstTimer = () => {
      firstTimerSeries.value = "weekly";
      firstTimerBoolean.value = true;
    };

    const monthlyFirstTimer = () => {
      firstTimerBoolean.value = false;
      firstTimerSeries.value = "monthly";
      // axios.get('/Dashboard/period?period=Months')
      //   .then(res => {
      //     monthlyFirstTimerObj.value = res.data.eventAttendanceChartData[1]
      //  })
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
      // return [tenantInfoAttendanceMonthly.value.find(i => i.name === "Attendance")];
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

    const retrieveSubscriptionInfo = () => {};

    const useSubscriptionResponse = ref([]);
    const getRenewalDate = ref("");

    useSubscription.getPlan().then((res) => {
      planUserIs.value = res.description;
      getRenewalDate.value = res.subscriptionExpiration;
      useSubscriptionResponse.value = res;
      console.log(res, "iiiopiop");
      // let d = new Date(res.subscriptionExpiration);
      // d.setDate(d.getDate() - 4)
      //     warningAgainstExpire.value = d
      //     console.log(warningAgainstExpire.value, "warning")
    });
    // 

    // const expirationNotice = computed(() =>{
    //   let myDate = new Date()
    //   if( myDate === warningAgainstExpire.value && warningAgainstExpire.value < getRenewalDate.value   ){
    //        return true
    //       }
    // })

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
      if (checkRenewalDate.value && planUserIs.value === "TRIAL") return {text: "SUBSCRIBE",
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

      if ( planUserIs.value === "UNLIMITED" ) return {text: "PRODUCT"};
      return {text: "UPGRADE"} ;

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
      // expirationNotice,
      // warningAgainstExpire,
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
      attendanceLoading,
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
      attendanceSeries
    };
  },
};
</script>

<style scoped>
.renew-btn-color {
 background-color: #ffbf00 !important;
}

.btn-danger-upgrade{
  color: #fff !important;
  background-color: #E60023 !important;
}

* {
  color: #02172e;
}

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

.box-top-text p {
  font-weight: 600;
}

.box-top-text h4 {
  color: #136acd;
  font-size: larger;
}

.create-dd {
  padding: 0 9px;
  color: #fff;
}

.first-col {
  padding: 10px 30px;
}

.can-do h4 {
  margin: 0;
  font-weight: 600;
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
  width: 200px;
  margin-left: 20px;

  /* background: #F1F5F8; */
}

.top {
  border-radius: 28px 28px 0 0;
  padding: 20px;
  border: 1px solid #e6e5f2;
  box-shadow: 0px 1px 4px #02172e45;
  border-bottom: transparent;
}

.box-bottom {
  display: flex;
  flex-direction: column;
  border-radius: 0px 0px 28px 28px;
  background: #f1f5f8;
  padding: 10px 20px;
  border: 1px solid #e6e5f2;
  box-shadow: 0px 1px 4px #02172e45;
  border-top: transparent;
}

.box2 .bottom {
  /* border: 1px solid #e6e5f2; */
  border-radius: 0px 0px 28px 28px;
}

.box2 .upgrade-btn {
  /* background: #136acd; */
  color: #fff;
  justify-self: flex-end;
  margin-left: auto;
  outline: none;
}

.upgrade-btn {
  align-self: center;
  padding: 7px;
  background: #136acd4b;
  /* background: orange; */
  border-radius: 20px;
  border: none;
  font-weight: 800;
  outline: none;
  width: 80px;
}
.upgrade-btn2 {
  align-self: center;
  padding: 7px;
  /* background: #136acd4b; */
  background: rgba(255, 166, 0, 0.241);
  border-radius: 20px;
  border: none;
  font-weight: 800;
  outline: none;
  width: 80px;
}


.upgrade-btn:hover{
  background: #136acd91;
}
.upgrade-btn2:hover,
.buy-btn:hover {
  /* background: #136acd91; */
  background: rgba(255, 166, 0, 0.179);
  /* font-weight: 600; */
}

.buy-btn {
  width: 109.5px;
}

.plan-text {
  font-size: 9px;
  align-self: center;
  text-transform: uppercase;
  font-weight: 800;
  width: 80px;
  margin-left: 10px;
}

.box-top {
  display: flex;
  justify-content: space-between;
  align-items: start;
}

/* .box-middle {
  padding: 24px 0;
} */

.box-top-text h4,
.box-top-text p {
  margin: 0;
  font-size: 12px;
}

.box-top-text h4 {
  font-size: 20px;
  font-weight: 800;
}

.box-middle h1 {
  margin: 0;
  font-size: 39px;
  font-weight: 400;
}

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
  font-size: 25px;
  font-weight: 600;
  margin-top: -18px;
}

@media (max-width: 767px) {
  .celeb-header {
    margin-top: 0;
  }
  .adjust-view {
    display: none;
  }
  .chart-div-mobile {
    margin-left: -3rem!important;
    border: none !important;
    box-shadow: none !important
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
  width: 100px;
  margin-top: -20px;
  margin-left: -35px;
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

.title {
  margin: 0 0 15px 0;
}

.box-btn-text {
  margin: 0px;
  font-size: 12px;
  font-weight: 700;
  /* color: #ffe50f; */
  color: #136acd;
}
.box-btn-text2 {
  margin: 0px;
  font-size: 12px;
  font-weight: 800;
  /* color: rgb(147, 95, 0) */
  /* color: #ffe50f; */
  color: #136acd;
}

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
  top: 120px;
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

.learn-more {
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
}

.more-things.side {
  background: #ecf0f3 0% 0% no-repeat padding-box;
  border-radius: 15px;
  opacity: 1;
}

.welcome-user {
  width: 64%;
  float: right;
}

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
    text-align: center;
    margin-left: -3rem;
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

.chart-div {
  border: 1px solid #dde2e6;
  border-radius: 30px;
  margin: 0 0 24px 0;
  box-shadow: 0px 1px 4px #02172e45;
  border: 1px solid #dde2e6;
  padding: 25px 0;
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
  .top-row {
    display: flex;
    flex-direction: column;
  }

  .help-text2 {
    display: flex;
    align-items: flex-start;
  }

  .second-col .number-boxes {
    max-width: 100%;
    justify-content: space-between;
  }

  .box {
    margin-top: 20px;
    width: 40%;
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
  .box {
    width: 100%;
  }

  .number-boxes {
    flex-direction: column;
    width: 70%;
    align-self: center;
    margin-top: 10px;
  }

  .create-btn-div {
    flex-direction: column;
    align-items: center;
  }

  .second-col .create-btn-div .create-btn {
    margin-top: 10px;
  }

  .top-row {
    margin-top: 40px;
  }

}
  
.push-down {
  margin-top: 26px;
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
  padding-top:9px;
  /* background-color: lightgreen; */
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
  left: 34px;
  top: -41px;
}

</style>