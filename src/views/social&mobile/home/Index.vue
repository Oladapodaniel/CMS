<template>
  <div class="container-top" :class="{ 'container-wide': lgAndUp || xlAndUp }">
    <router-view></router-view>
    <!-- <div class="row main-con">
      <div class="col-md-3">
        <NavLinks />
      </div>
      <div class="col-md-9">
        
      </div>
    </div> -->
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
