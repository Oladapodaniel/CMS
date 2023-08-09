<template>
  <div class="container-top" :class="{ 'container-slim': lgAndUp || xlAndUp }">
    <div class="row">
      <div class="col-md-12 mb-3 px-0 d-flex">
        <el-icon :size="30"><Back /></el-icon>
        <el-icon :size="30" class="ml-2 primary--text"><Share /></el-icon>
        <div class="ml-2 head-text">Amazing Grace</div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-3">
        <div class="row">
          <div class="col-md-11 branch-corner">
            <div class="row">
              <router-link
                class="py-3 d-flex col-md-12 text-white rounded primary-bg text-decoration-none"
                to="/tenant/branch/singleBaranhSummary"
              >
                <el-icon :size="25"><HomeFilled /></el-icon>
                <div class="mt-1">Dashboard</div>
              </router-link>
              <router-link
                class="py-3 text-dark col-md-12 text-decoration-none"
                to="/tenant/branch/singleBaranhSummary"
              >
                <img class="rounded-circle p-1 icon" src="../../assets/dashboardlinks/people.svg" alt="" />
                People
              </router-link>
              <router-link
                class="py-3 d-flex text-dark col-md-12 text-decoration-none"
                to="/tenant/branch/singleBaranhSummary"
              >
                <el-icon class="rounded-circle p-1 icon" :size="30"><Memo /></el-icon>
                <div class="mt-1">Attendance</div>
              </router-link>
              <router-link
                class="py-3 text-dark col-md-12 text-decoration-none"
                to="/tenant/branch/singleBaranhSummary"
              >
                <img class="rounded-circle p-1 icon" src="../../assets/dashboardlinks/acc-icon.svg" alt="" />
                Financial
              </router-link>
              <router-link
                class="py-3 text-dark col-md-12 text-decoration-none"
                to="/tenant/branch/singleBaranhSummary"
              >
                <img class="rounded-circle p-1 icon"
                  src="../../assets/dashboardlinks/reports-icon.svg"
                  alt=""
                />
                Reports
              </router-link>
            </div>
          </div>
          <div class="col-md-12 my-3">
            <el-button @click="displayVisible" round size="large w-100">
              <el-icon :size="20"><Unlock /></el-icon> Access
            </el-button>
          </div>
        </div>
      </div>
      <div class="col-md-9">
        <el-dialog v-model="dialogVisible" title="" 
          :width="mdAndUp || lgAndUp || xlAndUp ? `50%` : `90%`">
         <div class="row">
            <div class="col-md-12">
              <div class="primary--text font-weight-bold">Request access to manage Data</div>
              <div>You will be able to manage information about this branch after you are Granted Access</div>
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
</template>

<script>
import { ref } from "vue";
import deviceBreakpoint from "../../mixins/deviceBreakpoint";
export default {
  setup() {
    const { lgAndUp, mdAndUp, xlAndUp } = deviceBreakpoint();
    const dialogVisible = ref(false)

    const displayVisible = () =>{
      dialogVisible.value = true
    }
    const sendRequest = () =>{
      // dialogVisible.value = true
    }

    return {
      lgAndUp,
      mdAndUp,
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

.icon {
  background: #c0dbfacc;
  /* padding: 1rem; */
}
</style>