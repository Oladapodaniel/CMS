<template>
  <div class="container-top" :class="{ 'container-wide': lgAndUp || xlAndUp }">
    <div
      class="d-flex flex-column flex-sm-row justify-content-sm-between"
      v-if="!isFormPage"
    >
      <div>
        <div class="text-head font-weight-bold h2 py-0 my-0 text-black">
          Social & Mobile App
        </div>
        <div class="s-18">You are in Charge!</div>
      </div>
      <div class="d-flex flex-wrap flex-sm-nowrap mt-3 mt-sm-0">
        <el-dropdown
          trigger="click"
          class="align-items-center justify-content-center d-flex ml-md-3 ml-0 default-btn py-0 m-0 border"
          style="height: 2.2rem"
        >
          <span class="el-dropdown-link w-100 primary--text text-center font-weight-600">
            Menu
            <el-icon class="el-icon--right">
              <arrow-down />
            </el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item>
                <router-link
                  :to="`/tenant/sms/sent`"
                  class="no-decoration fw-400 text-black"
                >
                  <img src="../../../assets/sent.png" alt="" />
                  Sent
                </router-link>
              </el-dropdown-item>
              <el-dropdown-item>
                <router-link
                  :to="`/tenant/sms/scheduled`"
                  class="no-decoration fw-400 text-black"
                >
                  <img src="../../../assets/CalendarCheck.png" alt="" />
                  Scheduled
                </router-link>
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
    <div class="row">
      <!-- <div class="col-md-12 pb-4">
        <div class="text-head font-weight-bold h2 py-0 my-0 text-black">
          Social and Mobile
        </div>
        <div class="s-18">You are in Charge!</div>
      </div> -->
    </div>
    <div class="row main-con">
      <div class="col-md-3">
        <NavLinks />
      </div>
      <div class="col-md-9">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import deviceBreakpoint from "../../../mixins/deviceBreakpoint";
import NavLinks from "./components/NavLinks";
export default {
  components: { NavLinks },

  setup() {
    const { lgAndUp, xlAndUp, mdAndUp, xsOnly } = deviceBreakpoint();

    return {
      lgAndUp,
      xlAndUp,
      mdAndUp,
      xsOnly,
    };
  },
};
</script>

<style scoped>
.main-con {
  border: 0.20000000298023224px solid #e9eef0;
  border-radius: 30px;
}

.main-color {
  color: #02172e;
}

.main-title {
  font-size: 2.2rem;
}
</style>
