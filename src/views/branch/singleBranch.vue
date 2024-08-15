<template>
  <main class="container-top" :class="{ 'container-wide': lgAndUp || xlAndUp }">
    <div class="container-fluid">
      <div class="row">
        <div class="text-head h2 font-weight-bold py-0 my-0 text-black">{{ branchName }}</div>
        <div class="col-12 mt-1 px-0">
          <div @click="previousPage">
            <span class="s-18 fw-400 cursor-pointer text-black">
              <img src="../../assets/goback.png" alt="" /> Go back</span
            >
          </div>
        </div>
        <!-- <div class="col-md-12 toggle-icon mb-2 cursor-pointer" @click="toggleMenu">
          <div class="d-flex">
            <el-icon :class="{ 'rotate-icon': rotateIcon }" :size="25"
              ><ArrowDownBold /></el-icon
            ><span class="mt-0">{{ showMenu ? "Hide..." : " Show..." }}</span>
          </div>
        </div> -->
      </div>
      <div class="row mt-5">
        <div class="col-md-12 mb-5  px-0">
          <TabComponent class="d-flex flex-wrap justify-content-between" :tabs="tabs" :routes="tabRoutes" />
        </div>
        <!-- <div
          class="col-md-12 div-on-off"
          :class="{ 'show-menu': showMenu, 'hide-menu': !showMenu }"
        >
          <div class="row">
            <div class="col-md-11 branch-corner">
              <div class="row">
                <router-link
                  @click="toggleDashboard"
                  class="py-3 d-flex col-md-12 rounded text-decoration-none"
                  :class="{
                    'side-icon': showDashboard,
                    'text-dark': !showDashboard,
                  }"
                  to="/tenant/branches/summary"
                >
                  <el-icon :size="25"><HomeFilled /></el-icon>
                  <div class="mt-1 pl-1">Dashboard</div>
                </router-link>
                <router-link
                  @click="togglePeople"
                  class="py-3 d-flex col-md-12 text-decoration-none"
                  :class="{ 'side-icon': showPeople, 'text-dark': !showPeople }"
                  to="/tenant/branches/members_branch"
                >
                  <img
                    class="rounded-circle p-1 icon"
                    src="../../assets/dashboardlinks/people.svg"
                    alt=""
                  />
                  <div class="ml-1">People</div>
                </router-link>
                <router-link
                  @click="toggleCommunication"
                  class="py-3 d-flex col-md-12 text-decoration-none"
                  :class="{
                    'side-icon': showCommunication,
                    'text-dark': !showCommunication,
                  }"
                  to="/tenant/branches/branch_communication"
                >
                  <el-icon :size="23" class="rounded-circle ml-1 icon"
                    ><ChatLineRound
                  /></el-icon>
                  <div class="ml-1">Communication</div>
                </router-link>
                <router-link
                  @click="toggleAttendance"
                  class="py-3 d-flex col-md-12 text-decoration-none"
                  :class="{
                    'side-icon': showAttendance,
                    'text-dark': !showAttendance,
                  }"
                  to="/tenant/branches/branchattendance"
                >
                  <el-icon class="rounded-circle p-1 icon" :size="30"><Memo /></el-icon>
                  <div class="mt-1">Attendance</div>
                </router-link>
                <router-link
                  @click="toggleFinancial"
                  class="py-3 col-md-12 text-decoration-none"
                  :class="{
                    'side-icon': showFinancial,
                    'text-dark': !showFinancial,
                  }"
                  to="/tenant/branches/branchtransaction"
                >
                  <img
                    class="rounded-circle p-1 icon"
                    src="../../assets/dashboardlinks/acc-icon.svg"
                    alt=""
                  />
                  Financial
                </router-link>
                <router-link
                  @click="toggleReport"
                  class="py-3 col-md-12 text-decoration-none"
                  :class="{ 'side-icon': showReport, 'text-dark': !showReport }"
                  to="/tenant/branches/branchreport"
                >
                  <img
                    class="rounded-circle p-1 icon"
                    src="../../assets/dashboardlinks/reports-icon.svg"
                    alt=""
                  />
                  Reports
                </router-link>
              </div>
            </div>
          </div>
        </div> -->
        <div class="col-md-12  px-0">
          <el-dialog
            v-model="dialogVisible"
            title=""
            :width="mdAndUp || lgAndUp || xlAndUp ? `50%` : `90%`"
          >
            <div class="row">
              <div class="col-md-12">
                <div class="primary--text font-weight-bold">
                  Request access to manage Data
                </div>
                <div>
                  You will be able to manage information about this branch after you are
                  Granted Access
                </div>
              </div>
            </div>
            <template #footer>
              <div class="dialog-footer">
                <el-button class="bg-dark text-white p-4" @click="sendRequest">
                  Send Request
                </el-button>
              </div>
            </template>
          </el-dialog>
          <router-view />
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import { ref } from "vue";
import deviceBreakpoint from "../../mixins/deviceBreakpoint";
import router from "../../router";
import TabComponent from "../../components/Tab/BaseTab.vue";
export default {
  components: {
    TabComponent,
  },
  setup() {
    const { lgAndUp, mdAndUp, xlAndUp } = deviceBreakpoint();
    const dialogVisible = ref(false);
    const showDashboard = ref(true);
    const showPeople = ref(false);
    const showAttendance = ref(false);
    const sendingwhatsappmessage = ref(false);
    const showFinancial = ref(false);
    const showCommunication = ref(false);
    const showReport = ref(false);
    const showMenu = ref(false);
    const rotateIcon = ref(false);
    const branchName = ref("");
    const tabs = [
      "Dashboard",
      "People",
      "Attendance",
      "Financial",
      "Report",
      "PastorInfo",
    ];

    const tabRoutes = ref({
      Dashboard: "singleBranchSummary",
      People: "MemberBranch",
      Attendance: "BranchAttendanc",
      Financial: "BranchTransaction",
      Report: "BranchRepot",
      PastorInfo: "PastorInfo",
    });

    branchName.value = localStorage.getItem("branchName");

    const displayVisible = () => {
      dialogVisible.value = true;
    };
    const sendRequest = () => {
      // dialogVisible.value = true
    };

    const toggleMenu = () => {
      showMenu.value = !showMenu.value;
      rotateIcon.value = !rotateIcon.value;
    };

    const toggleDashboard = () => {
      showDashboard.value = true;
      showPeople.value = false;
      showAttendance.value = false;
      showFinancial.value = false;
      showReport.value = false;
      showCommunication.value = false;
    };
    const togglePeople = () => {
      showDashboard.value = false;
      showPeople.value = true;
      showAttendance.value = false;
      showFinancial.value = false;
      showReport.value = false;
      showCommunication.value = false;
    };
    const toggleCommunication = () => {
      showCommunication.value = true;
      showDashboard.value = false;
      showPeople.value = false;
      showAttendance.value = false;
      showFinancial.value = false;
      showReport.value = false;
    };
    const toggleAttendance = () => {
      showCommunication.value = false;
      showDashboard.value = false;
      showPeople.value = false;
      showAttendance.value = true;
      showFinancial.value = false;
      showReport.value = false;
    };
    const toggleFinancial = () => {
      showDashboard.value = false;
      showCommunication.value = false;
      showPeople.value = false;
      showAttendance.value = false;
      showFinancial.value = true;
      showReport.value = false;
    };
    const toggleReport = () => {
      showDashboard.value = false;
      showCommunication.value = false;
      showPeople.value = false;
      showAttendance.value = false;
      showFinancial.value = false;
      showReport.value = true;
    };

    const previousPage = () => {
      router.push("/tenant/branch/branchdashboard");
    };

    return {
      lgAndUp,
      toggleDashboard,
      toggleAttendance,
      toggleFinancial,
      tabs,
      showMenu,
      rotateIcon,
      togglePeople,
      tabRoutes,
      toggleCommunication,
      showCommunication,
      toggleReport,
      showReport,
      toggleMenu,
      showAttendance,
      showDashboard,
      sendingwhatsappmessage,
      showFinancial,
      showPeople,
      previousPage,
      mdAndUp,
      branchName,
      displayVisible,
      sendRequest,
      dialogVisible,
      xlAndUp,
    };
  },
};
</script>

<style scoped>
.branch-corner {
  border-radius: 0.5rem;
  background: #f3f3f3;
}
.rotate-icon {
  transform: rotate(180deg);
}
.div-on-off {
  display: block !important;
}
.red-cicle {
  background: red;
  border-radius: 50%;
  height: 10px;
  width: 10px;
}

.icon-size {
  width: 35px;
}

.icon {
  background: #c0dbfacc;
  /* padding: 1rem; */
}
.side-icon {
  background: #136acd;
  color: white !important;
}
/* .side-icon:hover{
background: #136acd;
color: white;
} */
.toggle-icon {
  display: none;
}

@media screen and (max-width: 767px) {
  .toggle-icon {
    display: block;
  }

  .hide-menu {
    height: 0 !important;
    transition: all 0.5s ease-in-out;
    overflow: hidden !important;
  }
  .show-menu {
    height: 25rem !important;
    transition: all 0.5s ease-in-out;
    overflow: hidden !important;
  }
}
</style>
