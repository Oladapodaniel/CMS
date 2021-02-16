<template>
  <main class="container-slim" id="main">
    <!-- <div class="menu-links">
      <menu-links />
    </div> -->
    <!-- <div class="main-content"> -->
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
            <i class="fa fa-angle-down create-dd"></i>
          </button>
          <div class="more-items ml-1" v-if="moreLinksVissible">
            <div class="container">
              <div class="row">
                <div
                  class="col-md-12 d-flex flex-column border rounded more-links px-4"
                >
                  <router-link
                    to="/tenant/people/add"
                    class="font-weight-bold mt-3 text-dec-none"
                    >Member</router-link
                  >
                  <router-link
                    to="/tenant/people/addfirsttimer"
                    class="font-weight-bold text-dec-none"
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
            <div class="can-do-links">
              <router-link to="/tenant/people/add"
                >Add member</router-link
              >
              <router-link to="/tenant/sms/compose"
                >Send SMS</router-link
              >
              <router-link to="/tenant/people/addfirsttimer"
                >Add First Timer</router-link
              >
              <router-link to="">Add Follow-up</router-link>
            </div>
          </div>
        </div>

        <div class="number-boxes">
          <div class="box one">
            <div class="top">
              <div class="box-top">
                <div class="top-icon-div">
                  <i class="fa fa-users"></i>
                </div>
                <div class="box-top-text">
                  <p>FIRST TIMERS</p>
                  <h4>{{ firstTimerArr.length }}</h4>
                </div>
              </div>
              <div class="box-middle">
                <h1>{{ tenantInfo.memberCount }}</h1>
                <span class="size-text">Church Size</span>
              </div>
            </div>
            <div class="bottom">
              <div class="box-bottom">
                <span class="plan-text">YOU'RE ON A FREE PLAN</span>
                <button class="upgrade-btn">
                  <h4 class="box-btn-text">UPGRADE</h4>
                </button>
              </div>
            </div>
          </div>
          <div class="box box2">
            <div class="top">
              <div class="box-top">
                <div class="top-icon-div">
                  <i class="fa fa-envelope"></i>
                </div>
                <div class="box-top-text"></div>
              </div>
              <div class="box-middle">
                <h1>{{ tenantInfo.smsUnit }}</h1>
                <span class="size-text">SMS Units</span>
              </div>
            </div>
            <div class="bottom">
              <div class="box-bottom">
                <span class="plan-text"></span>
                <router-link :to="{ name: 'BuyUnits', path: '/tenant/units' }">
                  <button class="upgrade-btn buy-btn">
                    <h4 class="box-btn-text">BUY UNIT</h4>
                  </button>
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="celeb-header">
        <div class="celeb-icon">
          <img src="../../assets/celeb-icon.svg" alt="Celebration Icon" />
        </div>
        <div class="celeb-header-text">
          <p>Celebrations</p>
        </div>
      </div>
      <!-- <div class="table">
          <div class="table-top">
            <router-link to="" class="view-all">View all</router-link>
          </div>

          <div class="table-header">
         
            <div class="picture">
              <p>PICTURE</p>
            </div>
            <div class="firstname">
              <p>FIRSTNAME</p>
            </div>
            <div class="lastname">
              <p>LASTNAME</p>
            </div>
            <div class="phone one">
              <p>PHONE</p>
            </div>
            <div class="action"></div>
          </div>

          <div
            class="table-body"
            v-for="person in celebrations"
            :key="person.id"
          >
            <div class="data-row">
           
              <div class="picture data">
                <div class="data-con">
                  <div class="data-text">
                    <p>Picture</p>
                  </div>
                  <div class="data-value">
                    <div class="image-con">
                      <img src="../../assets/people/phone-import.svg"  alt="" />
                    </div>
                  </div>
                </div>
              </div>
              <div class="firstname data">
                <div class="data-con">
                  <div class="data-text">
                    <p>Firstnmae</p>
                  </div>
                  <div class="data-value">{{ person.firstName }}</div>
                </div>
              </div>
              <div class="lastname data">
                <div class="data-con">
                  <div class="data-text">
                    <p>Lastname</p>
                  </div>
                  <div class="data-value">{{ person.lastName }}</div>
                </div>
              </div>
              <div class="phone data">
                <div class="data-con">
                  <div class="data-text">
                    <p>Phone</p>
                  </div>
                  <div class="data-value">{{ person.mobilePhone }}</div>
                </div>
              </div>
              <div class="action data action-icon">
                <i class="fas fa-ellipsis-v"></i>
              </div>
            </div>
            <hr class="row-divider" />
          </div>

          <div class="table-footer">
            <button class="tbl-footer-btn">
              <i class="fa fa-angle-left"></i>
            </button>
            <button class="tbl-footer-btn">A</button>
            <button class="tbl-footer-btn">A</button>
            <button class="tbl-footer-btn">
              <i class="fa fa-angle-right"></i>
            </button>
          </div>
        </div> -->
      <div class="table table-responsive">
        <div class="table-top">
          <router-link to="" class="view-all">View all</router-link>
        </div>
        
          <table class="w-100">
          <thead>
            <tr>
              <th>NAME</th>
              <th>DATE</th>
              <th>TYPE</th>
              <th>PHONE</th>
              <th></th>
            </tr>
          </thead>
          <tbody v-if="tenantInfo.celebrations && tenantInfo.celebrations.length > 0">
            <tr
              v-for="celebration in tenantInfo.celebrations"
              :key="celebration.id" 
            >
              <td>
                <img src="../../assets/people/phone-import.svg" alt="" /><span
                  class="project-name"
                  >{{ celebration.name }}</span
                >
              </td>
              <td>
                {{
                  moment.parseZone(
                    new Date(celebration.date).toLocaleDateString(),
                    "YYYY MM DD HH ZZ"
                  )._i
                }}
              </td>
              <td>{{ celebration.celebration }}</td>
              <td>{{ celebration.phone }}</td>
              <td>
                <i class="fas fa-ellipsis-v cursor-pointer"
                  id="dropdownMenuButton"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"></i>
                  <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    <!-- v-if="person.mobilePhone" -->
                <a class="dropdown-item elipsis-items">
                  <router-link
                    :to="`/tenant/sms/compose?phone=${celebration.phone}`"
                    >Send SMS</router-link
                  >
                </a>
                <!-- v-if="person.email" -->
                <!-- <a class="dropdown-item elipsis-items" >
                  <router-link
                    :to="`/tenant/email/compose?phone=${person.email}`"
                    >Send Email</router-link
                  >
                </a> -->
                <!-- <a class="dropdown-item elipsis-items">
                  <router-link :to="`/tenant/people/add/${person.id}`"
                    >Edit</router-link
                  >
                </a> -->
                <!-- <a
                  class="dropdown-item elipsis-items"
                  href="#"
                  @click.prevent="showConfirmModal(person.id)"
                  >Delete</a 
               > -->
              </div>
              </td>
            </tr>
          </tbody>
          <tbody>
            <tr>
              
              
              <td colspan="5"><div class=" text-center p-3" style="font-weight: 700; font-size: 1.2em;">No Celebrations Yet</div></td>
              
            </tr>
          </tbody>
        </table>
        <div class="table-footer" v-if="tenantInfo.celebrations && tenantInfo.celebrations.length > 0">
          <button class="tbl-footer-btn">
            <i class="fa fa-angle-left"></i>
          </button>
          <button class="tbl-footer-btn">1</button>
          <button class="tbl-footer-btn">2</button>
          <button class="tbl-footer-btn">
            <i class="fa fa-angle-right"></i>
          </button>
        </div>
      </div>
      <div class="charts" id="plot">
        <div v-if="tenantInfo.eventAttendanceChartData && attendanceDataExist">
          <div class="adjust-view">
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


      <div v-if="tenantInfo.eventAttendanceChartData && firstTimerDataExist">
        <div class="adjust-view">
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
          <ColumnChart2
            domId="chart3"
            title="First Timer And New Convert Inflow"
            subtitle="How First Timer Come to Church"
            header="First Timer Attendence"
            :data="chartData2"
            :chartDataNewConvert="chartDataNewConvert"
            :series2="series2"
          />
        </div>
        <div v-else>
          <ColumnChart2
            domId="chart4"
            title="First Timer And New Convert Inflow"
            subtitle="How First Timer Come to Church"
            header="First Timer Attendence"
            :data="monthlyFirstTimerObj"
            :chartDataNewConvert="chartDataNewConvert"
            :series2="series2"
          />
        </div>
      </div>
    </div>
      <!-- <div>{{ chartData2 }}</div>
      <div>{{ monthlyFirstTimerObj }}</div>
      <div>{{ chartDataNewConvert }}</div> -->
      <!-- <div>{{ series2 }}</div> -->


        <div class="chart-con" v-if="firstTimerPieExist">
          <div style="width: 45%" class="ml-md-4 chart1">
            <ByGenderChart
              domId="source"
              title="Invitation Source"
              distance="5"
              :titleMargin="10"
              :summary="tenantInfo.firstTimerSummary ? tenantInfo.firstTimerSummary.invitationSource : [] "
            />
          </div>
          <div style="width: 45%;" class="chart2">
            <ByMaritalStatusChart
              domId="join"
              title="Interested In Joining"
              :titleMargin="10"
              :summary="tenantInfo.firstTimerSummary ? tenantInfo.firstTimerSummary.interestedInJoining : [] "
            />
          </div>
        </div>
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
              :summary="offering"
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
              :summary="offering"
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
import ColumnChart2 from "@/components/charts/ColumnChart2.vue";
import { computed, onMounted, ref } from "vue";
// import { useRoute } from 'vue-router';
// import store from "@/store/store.js"
import router from "@/router/index";
import axios from "@/gateway/backendapi";
import moment from "moment";

export default {
  components: {
    // PieChart,
    ColumnChart,
    ColumnChart2,
    ByMaritalStatusChart,
    ByGenderChart
    
  },

  setup() {
    const moreLinksVissible = ref(false);
    const firstTimerArr = ref([]);
    const offering = ref([23, 45, 65, 78, 89]);
    const attendanceBoolean = ref(true);
    const firstTimerBoolean = ref(true);
    const attendanceDataExist = ref(false)
    const firstTimerDataExist = ref(false)
    const firstTimerPieExist = ref(false)

    // const attendance

    const toggleMoreLinkVissibility = () => {
      moreLinksVissible.value != moreLinksVissible.value;
    };

    const celebrations = [];
    // const route = useRoute();

    const tenantInfo = ref({});
    const attendanceSeries = ref("weekly");
    const firstTimerSeries = ref("weekly")

    const monthlyAttendanceObj = ref({})
    const monthlyFirstTimerObj = ref({})

    const xAxis = ref([])
    const monthXaxis = ref(['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'])

    const series = computed(() => {
      if (attendanceSeries.value === "weekly") return xAxis.value;
      return monthXaxis.value;
    })

    const series2 = computed(() => {
      if (firstTimerSeries.value === "weekly") return xAxis.value;
      return monthXaxis.value;
    })

    const getDashboard = () => {
      axios
      .get("/dashboard")
      .then((res) => {
        tenantInfo.value = res.data;
        // celebrations.value = res.data
        console.log(res.data);
        tenantInfo.value.eventAttendanceChartData[0].data.forEach(element => {
          if (element > 0) {
            attendanceDataExist.value = true
          }
        });
        tenantInfo.value.eventAttendanceChartData[1].data.forEach(element => {
          if (element > 0) {
            firstTimerDataExist.value = true
          }
        });
        tenantInfo.value.firstTimerSummary.invitationSource.forEach(element => {
          if (element > 0) {
            firstTimerPieExist.value = true
          }
        });

      })
      .catch((err) => {
        console.log(err.response);
        if (err.response.status === 401) {
          localStorage.removeItem("token");
          router.push("/");
        }
      });
    }
    getDashboard()

    const firstTimer = () => {
      axios.get("/api/People/FirstTimer").then((res) => {
        firstTimerArr.value = res.data;
        console.log(res.data);
      });
    };
    firstTimer();

    const showPieChart = computed(() => {
      if (!tenantInfo.value || tenantInfo.value.firstTimerSummary) return [];
      return tenantInfo.value.firstTimerSummary;
    })

    onMounted(() => {
      console.log(tenantInfo.value.eventAttendanceChartData);

      
      for (let i = 1; i <= 52; i++) {
        xAxis.value.push(i)
      }
    });

    const subPlan = () => {
      axios.get("/api/GetAllSubscriptionPlans").then((res) => {
        console.log(res.data);
      });
    };
    subPlan();

    const weeklyAttendance = () => {
      console.log("weekly");
      attendanceSeries.value = "weekly";
      attendanceBoolean.value = true;
    };

    const monthlyAttendance = () => {
      
      attendanceBoolean.value = false;
      attendanceSeries.value = "monthly";

      axios.get('/Dashboard/period?period=Months')
        .then(res => {
          monthlyAttendanceObj.value = res.data.eventAttendanceChartData[0]
          
       })
    };

    const weeklyFirstTimer = () => {
      console.log("weekly");
      firstTimerSeries.value = "weekly"
      firstTimerBoolean.value = true;
    };

    const monthlyFirstTimer = () => {

        firstTimerBoolean.value = false;
          firstTimerSeries.value = "monthly"
      axios.get('/Dashboard/period?period=Months')
        .then(res => {
          monthlyFirstTimerObj.value = res.data.eventAttendanceChartData[1]  
       })
      console.log(monthlyFirstTimerObj.value)
    };

    const chartData = computed(() => {
      if (!tenantInfo.value.eventAttendanceChartData) return [];
      return tenantInfo.value.eventAttendanceChartData[0]
    });
    
    const chartData2 = computed(() => {
      if (!tenantInfo.value.eventAttendanceChartData) return [];
      return tenantInfo.value.eventAttendanceChartData[1]
    });

    const chartDataNewConvert = computed(() => {
      if (!tenantInfo.value.eventAttendanceChartData) return [];
      return tenantInfo.value.eventAttendanceChartData[2]
    });

    

    return {
      celebrations,
      tenantInfo,
      moreLinksVissible,
      toggleMoreLinkVissibility,
      firstTimer,
      firstTimerArr,
      subPlan,
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
      firstTimerPieExist
    };
  },
};
</script>

<style scoped>
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

.can-do-links {
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
  justify-content: space-between;
  border-radius: 0px 0px 28px 28px;
  background: #f1f5f8;
  padding: 10px;
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
  border-radius: 20px;
  border: none;
  font-weight: 800;
  outline: none;
  width: 80px;
}

.upgrade-btn:hover,
.buy-btn:hover {
  background: #136acd91;
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
  top: 12em;
  z-index: 1;
}

.view-report {
  font: normal normal 800 16px/22px Nunito Sans;
  letter-spacing: 0px;
  color: #2b6ecd;
  text-align: right;
  margin-right: 40px;
  cursor: pointer;
}

.weekly {
  text-align: right;
  margin-right: 40px;
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
  border: 1px solid #DDE2E6;
  border-radius: 30px;
  margin: 0 0 24px 0;
  padding: 25px 0
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
    flex-direction: row;
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
  .box-middle {
    /* padding: 43px 0; */
  }
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
</style>