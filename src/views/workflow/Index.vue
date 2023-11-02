<template>
  <div class="container-top" :class="{ 'container-slim': lgAndUp || xlAndUp }">
    <div class="row mt-4">
      <div class="col-md-6">
        <div class="head-text mt-1">Ministry Workflows</div>
      </div>
      <div class="col-md-6 d-flex justify-content-end">
        <router-link
          to="/tenant/workflow/add?fw=true"
          class="text-decoration-none font-weight-bold"
          ><el-button :color="primarycolor" round class="border-0 header-btn text-white"
            >Add</el-button
          ></router-link
        >
      </div>
    </div>
    <div class="row">
      <div class="col-md-12">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import { inject } from "vue";
import { useRoute } from "vue-router";
import deviceBreakpoint from "../../mixins/deviceBreakpoint";
import router from "../../router";
import authMixin from "../../mixins/auth.mixins";
export default {
  mixins: [authMixin],
  setup() {
    const route = useRoute();
    const primarycolor = inject("primarycolor");
    const { lgAndUp, xlAndUp } = deviceBreakpoint();

    return {
      route,
      primarycolor,
      lgAndUp,
      xlAndUp,
    };
  },
};
</script>

<style scoped>
.w-tab {
  border: 1px solid #d3d4dca6;
  /* border: 1px solid #ced4da; */
  border-radius: 8px;
  border-bottom: 5px solid #fff;
}

.w-links-con {
  border-bottom: 1px solid #d3d4dca6;
}

.router-link-exact-active {
  color: #000 !important;
}
.heading-text {
  font: normal normal 800 1.5rem Nunito sans;
  font-size: 35px;
}
</style>
