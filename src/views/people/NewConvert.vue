<template>
  <div
    :class="{ 'container-slim': lgAndUp || xlAndUp }"
    class="container-top h-100"
  >
    <div class="d-flex flex-column flex-md-row justify-content-md-between">
      <div class="head-text">
        <div>New Convert</div>
      </div>
      <div class="mt-3 mt-md-0">
        <router-link :to="{ name: 'AddFirstTimer' }" class="text-decoration-none">
          <el-button :color="primarycolor" class="ml-2 header-btn" round
            >Add New Convert</el-button
          >
        </router-link>
      </div>
    </div>
    <div class="event-list">
    </div>
    <!-- <div
      v-if="firstTimersList.length === 0 && !loading && !networkError"
      class="no-person"
    >
      <div class="empty-img">
        <p><img src="../../assets/people/people-empty.svg" alt="" /></p>
        <p class="tip">You haven't added any first timer yet</p>
      </div>
    </div> -->
    <!-- <div v-else-if="networkError && !loading" class="adjust-network">
      <img src="../../assets/network-disconnected.png" />
      <div>Opps, Your internet connection was disrupted</div>
    </div> -->

    <!-- <el-skeleton class="w-100" animated v-if="loading">
      <template #template>
        <div
          style="
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-top: 20px;
          "
        >
          <el-skeleton-item
            variant="text"
            style="width: 240px; height: 240px"
          />
          <el-skeleton-item
            variant="text"
            style="width: 240px; height: 240px"
          />
        </div>
        <el-skeleton
          class="w-100 mt-5"
          style="height: 25px"
          :rows="20"
          animated
        />
      </template>
    </el-skeleton> -->
  </div>
</template>

<script>
import { ref, inject } from "vue";
import axios from "@/gateway/backendapi";
import deviceBreakpoint from "../../mixins/deviceBreakpoint";

export default {
  setup() {
    const { mdAndUp, lgAndUp, xlAndUp } = deviceBreakpoint()
    const primarycolor = inject('primarycolor')


    const getAllNewConvert = async () =>{

        try{
            const res = await axios.get('/api/People/GetAllNewConverts')
            console.log(res, "ttttt");
        }
        catch(err){
            console.log(err);

        }
    }
    getAllNewConvert()

    return {
    mdAndUp, lgAndUp ,xlAndUp, primarycolor
    }
  },
};
</script>

<style scoped>
</style>