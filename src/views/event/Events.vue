<template>
  <div class="container-top" :class="{ 'container-wide': lgAndUp || xlAndUp }">
    <div class="main-body main-con">
      <div class="d-flex flex-column flex-sm-row justify-content-sm-between">
        <div>
          <div class="text-head font-weight-bold h2 py-0 my-0 text-black">Service Report</div>
          <div class="s-18">Manage your Event & Services</div>
        </div>
        <div class="d-flex flex-wrap flex-sm-nowrap mt-3 mt-sm-0">
          <div class="d-flex mt-1 mr-3 w-100" @click="watchVideo">
            <span class="s-18 fw-400  primary--text">Watch Video </span>
            <span class="mt-0 ml-1"
              ><el-icon :size="27" class="primary--text"><VideoPlay /></el-icon
            ></span>
          </div>
          <!-- <el-button @click="importMembers" class="header-btn secondary-button" round>Import</el-button> -->
          <router-link :to="{ name: 'Event' }" class="no-decoration w-100">
            <el-button round :color="primarycolor" class="header-btn ml-0 ml-sm-2 mt-sm-0 mt-3 w-100 ">
              Add Event
            </el-button>
          </router-link>
        </div>
      </div>
      <!-- <div class="top mt-3 p-0">
        <div>
          <div class="h2 font-weight-bold text-head text-black">Events</div>
        </div>
        <div class="actions">
          <button class="more-btn button" v-if="false">
            More
            <span><i class="pi pi-angle-down btn-icon"></i></span>
          </button>
          <router-link :to="{ name: 'Event' }">
            <el-button round :color="primarycolor" class="header-btn">
              Add Event
            </el-button>
          </router-link>
        </div>
      </div> -->
      <!-- <div class="container-fluid  ">
          <div class="row">
            <div class="col-md-12 px-0">
              <hr class=" w-100 hr mt-4" />
            </div>
          </div>
            
          </div> -->

      <el-skeleton class="w-100" animated v-if="loading">
        <template #template>
          <div
            style="
              display: flex;
              align-items: center;
              justify-content: space-between;
              margin-top: 20px;
            "
          >
            <el-skeleton-item variant="text" style="width: 240px; height: 240px" />
            <el-skeleton-item variant="text" style="width: 240px; height: 240px" />
          </div>
          <el-skeleton class="w-100 mt-5" style="height: 25px" :rows="20" animated />
        </template>
      </el-skeleton>

      <div
        v-if="eventList && eventList.length > 0 && !loading && !networkError"
        class="container-fluid px-0"
      >
        <EventList
          :eventList="eventList"
          :eventSummary="eventSummary"
          :totalItems="totalItems"
          @activity-per-page="getPageActivity"
          @delete-event="deleteFromView"
        />
      </div>
      <div
        v-else-if="eventList && eventList.length === 0 && !loading & !networkError"
        class="no-person"
      >
        <div class="empty-img">
          <p><img src="../../assets/people/people-empty.svg" alt="" /></p>
          <p class="tip">You haven't added any event yet</p>
        </div>
      </div>
      <div v-else-if="networkError" class="adjust-network">
        <img src="../../assets/network-disconnected.png" />
        <div>Opps, Your internet connection was disrupted</div>
      </div>

      <!-- <router-view class="view" /> -->
    </div>
    <el-dialog
      style="border-radius: 20px"
      v-model="showAddMemberVideo"
      :width="mdAndUp || lgAndUp || xlAndUp ? `50%` : `90%`"
      top
    >
      <div class="row justify-content-center" v-loading>
        <div class="col-md-12">
          <iframe
            width="100%"
            height="315"
            :src="videoURL"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerpolicy="strict-origin-when-cross-origin"
            allowfullscreen
          ></iframe>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// import axios from '@/gateway/backendapi'
import { ref, onMounted, inject } from "vue";
import EventList from "./EventList";
import Loader from "../accounting/offering/SkeletonLoader";
import finish from "../../services/progressbar/progress";
import deviceBreakpoint from "../../mixins/deviceBreakpoint";
// import { useStore } from 'vuex'
import store from "../../store/store";
// import router from "@/router/index";
// import { useRoute } from "vue-router";

export default {
  components: {
    EventList,
    Loader,
  },
  setup() {
    const primarycolor = inject("primarycolor");
    const {  mdAndUp,lgAndUp, xlAndUp } = deviceBreakpoint();
    const eventSummary = ref(store.getters["event/geteventreportsummary"]);
    console.log(eventSummary.value, "hhh");
    const loading = ref(false);
    const networkError = ref(false);
    const showAddMemberVideo = ref(false);
    const videoURL = ref("https://www.youtube.com/embed/JSI7IksFUNQ?si=updEhHP30u4H1Z40");
    const eventList = ref(store.getters["event/geteventitems"].data);
    const totalItems = ref(store.getters["event/geteventitems"].totalItems);

    const getEventList = async () => {
      loading.value = true;
      try {
        await store.dispatch("event/setEventItems").then((res) => {
          finish();
          eventList.value = res.data;
          totalItems.value = res.totalItems;
          loading.value = false;
          finish();
        });
      } catch (err) {
        console.log(err);
        loading.value = false;
        finish();
        if (err.toString().toLowerCase().includes("network error")) {
          networkError.value = true;
        } else {
          networkError.value = false;
        }
      }
    };

    const watchVideo = () => {
      showAddMemberVideo.value = true;
    };


    const getEventReportSummary = async () => {
      loading.value = true;
      try {
        await store.dispatch("event/setEventReportSummary").then((res) => {
          finish();
          eventSummary.value = res;
          loading.value = false;
          finish();
        });
      } catch (err) {
        console.log(err);
        loading.value = false;
        finish();
        if (err.toString().toLowerCase().includes("network error")) {
          networkError.value = true;
        } else {
          networkError.value = false;
        }
      }
    };
    const getPageActivity = (payload) => {
      eventList.value = payload;
    };

    const deleteFromView = (payload) => {
      eventList.value.splice(payload, 1);
    };
    onMounted(() => {
      if (
        !eventList.value ||
        (eventList.value && eventList.value.data && eventList.value.data.length == 0)
      ) {
        getEventList();
      }
      if (eventSummary.value && Object.keys(eventSummary.value).length == 0)
        getEventReportSummary();
    });

    return {
      eventList,
      totalItems,
      getEventList,
      lgAndUp,
      xlAndUp,
      loading,
      eventSummary,
      getPageActivity,
      networkError,
      deleteFromView,
      primarycolor,
      mdAndUp,
      videoURL,
      watchVideo,
      showAddMemberVideo
    };
  },
};
</script>

<style scoped>
* {
  box-sizing: border-box;
}

.events {
  font: normal normal 800 28px Nunito sans;
}

.whole-con {
  display: flex;
  /* background: #f1f5f8; */
  height: 100vh;
}

.main-con {
  width: 100%;
  height: 70%;
}

.main-body {
  height: 100%;
}

.top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
}

.button {
  padding: 8px 10px;
  border: none;
  border-radius: 22px;
  width: 180px;
  font-size: 16px;
  font-weight: 600;
  margin: 0 8px;
  outline: none;
  text-decoration: none;
  box-sizing: border-box;
}

.button:hover {
  cursor: pointer;
}

.more-btn {
  background: #dde2e6;
}

.add-person-btn {
  background: #136acd;
  color: #fff;
}

.btn-icon {
  padding: 0 8px;
}
.no-person {
  height: 100%;
  display: flex;
  text-align: center;
}

.empty-img {
  width: 30%;
  min-width: 397px;
  margin: auto;
}

.empty-img img {
  width: 100%;
  max-width: 200px;
}

.hr {
  border: 0.8px solid #0020440a;
  /* margin: 0 45px; */
}

@media (max-width: 346px) {
  .actions {
    display: flex;
    flex-direction: column;
    margin-top: 10px;
  }

  .actions a {
    margin-top: 10px;
  }
}

@media (max-width: 566px) {
  .button {
    width: 140px;
  }
}

@media (max-width: 575px) {
  .top {
    flex-direction: column;
  }
  .actions {
    margin-top: 20px;
  }
}

@media screen and (min-width: 990px) {
  .main-body {
    margin: 0 auto;
  }
}

@media screen and (min-width: 1400px) {
  /* .main-con {
    width: 90%;
    margin: 0 auto;
  } */

  .no-person {
    height: calc(100% - 90px);
  }
}

/* Route Transition */
.btn-loading {
  display: flex;
  justify-content: space-between;
}

.fade-enter-active {
  transition: all 1s cubic-bezier(0.67, 0.01, 0.86, 0.65);
}

.fade-leave-active {
  transition: all 0.6s cubic-bezier(0.67, 0.01, 0.86, 0.65);
}

.fade-enter-from,
.fade-leave-to {
  transition: translateX(20px);
  opacity: 0;
}
</style>
