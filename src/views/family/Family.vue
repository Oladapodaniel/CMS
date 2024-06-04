<template>
  <div :class="{ 'container-slim': lgAndUp || xlAndUp }">
    <div class="container-fluid container-top">
      <div class="row d-flex flex-column flex-sm-row justify-content-sm-between">
        <div>
          <div class="text-head font-weight-bold h2 py-0 my-0 text-black ">Family</div>
          <div class="s-18">Showing all Families</div>
        </div>
        <router-link to="/tenant/addfamily" class="no-decoration w-100">
          <el-button class="header-btn w-100" :color="primarycolor" round>
            Add New Family
          </el-button>
        </router-link>
      </div>
      <transition name="el-fade-in-linear">
      <div class="row" v-show="membershipCapacityExceeded">
        <div class="w-100 mt-3">
          <MemberCapExceeded />
        </div>
      </div>
    </transition>

      <el-skeleton class="w-100" animated v-if="loading">
        <template #template>
          <div style="
              display: flex;
              align-items: center;
              justify-content: space-between;
              margin-top: 20px;
            ">
            <el-skeleton-item variant="text" style="width: 240px; height: 240px" />
            <el-skeleton-item variant="text" style="width: 240px; height: 240px" />
          </div>

          <el-skeleton class="w-100 mt-5" style="height: 25px" :rows="20" animated />
        </template>
      </el-skeleton>

      <div class="row" v-if="familyList.length > 0 && !loading && !networkError">
        <FamilyList :familyList="familyList" @list-filtered="resetList" />
      </div>

      <div class="no-person" v-else-if="familyList.length === 0 && !loading && !networkError">
        <div class="empty-img">
          <p><img src="../../assets/people/people-empty.svg" alt="" /></p>
          <p class="tip">You haven't added any family yet</p>
          <div class="c-pointer primary-bg col-sm-6 col-md-4 offset-sm-3 offset-md-4 default-btn border-0 text-white"
            @click="navigateToAddFamily">
            Add Family
          </div>
        </div>
      </div>

      <div class="adjust-network" v-else-if="networkError">
        <img src="../../assets/network-disconnected.png" />
        <div>Opps, Your internet connection was disrupted</div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, inject, onMounted, watchEffect, computed } from "vue";
import axios from "@/gateway/backendapi";
import finish from "../../services/progressbar/progress";
import FamilyList from "./FamilyList.vue";
import Loader from "../accounting/offering/SkeletonLoader.vue";
import router from "../../router";
import deviceBreakpoint from "../../mixins/deviceBreakpoint";
import store from "../../store/store";
import MemberCapExceeded from "@/components/membership/MembershipCapExceeded.vue";

export default {
  components: {
    FamilyList,
    Loader,
    MemberCapExceeded
  },
  setup() {
    const primarycolor = inject("primarycolor");
    const familyList = ref(store.getters["family/allFamilies"]);
    const loading = ref(false);
    const networkError = ref(false);
    const { lgAndUp, xlAndUp } = deviceBreakpoint();
    const membershipCapacityExceeded = ref(false)

    const getAllFamilies = async () => {
      loading.value = true;
      try {
        let data = await store.dispatch("family/getAllFamilies");
        console.log(data);
        familyList.value = data;
        loading.value = false;
      } catch (err) {
        finish();
        console.log(err);
        loading.value = false;
        loading.value = false;
        if (err.toString().toLowerCase().includes("network error")) {
          networkError.value = true;
        } else {
          networkError.value = false;
        }
      }
    };

    onMounted(() => {
      if (familyList.value && familyList.value.length == 0) getAllFamilies();
    });

    const resetList = (payload) => {
      familyList.value = payload;
    };

    const navigateToAddFamily = () => {
      router.push("/tenant/addfamily");
    };

    const getUser = computed(() => {
      if (
        !store.getters.currentUser ||
        (store.getters.currentUser &&
          Object.keys(store.getters.currentUser).length == 0)
      )
        return "";
      return store.getters.currentUser;
    });

    watchEffect(() => {
      if (getUser.value) {
        if (getUser.value.churchSize >= getUser.value.subscribedChurchSize) {
          membershipCapacityExceeded.value = true;
        } else {
          membershipCapacityExceeded.value = false;
        }
      }
    });

    return {
      familyList,
      getAllFamilies,
      resetList,
      loading,
      networkError,
      navigateToAddFamily,
      lgAndUp,
      xlAndUp,
      primarycolor,
      membershipCapacityExceeded,
      getUser
    };
  },
};
</script>

<style scoped>
.page-header {
  font: normal normal 800 29px Nunito sans;
}

.no-person {
  height: 80vh;
  display: flex;
  text-align: center;
}

.empty-img {
  width: 85%;
  /* min-width: 397px; */
  margin: auto;
}

.empty-img img {
  width: 100%;
  max-width: 200px;
}
</style>