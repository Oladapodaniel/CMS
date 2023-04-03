<template>



  <div class="whole-con">
    <div class="main-con">
      <div class="main-body">
        <div class="top container-wide mt-3 p-0">
          <div class="header">
            <div class="head-text">Events</div>
          </div>
          <div class="actions">
            <button class="more-btn button" v-if="false">
              More
              <span><i class="pi pi-angle-down btn-icon"></i></span>
            </button>
              <router-link :to="{ name: 'Event' }">
                <el-button round color="#136acd" class="header-btn">
                  Add Event
                </el-button>
              </router-link>
          </div>
        </div>
      
        <hr class="hr container-wide mt-4" />

        <div v-if="loading">
          <Loader />
      </div>

        <div v-if="eventList.length > 0 && !loading && !networkError" class="container-wide">
            <EventList :eventList="eventList" :eventSummary="eventSummary" @activity-per-page="getPageActivity" @delete-event="deleteFromView"/>
        </div>
        <div v-else-if="eventList.length === 0 && !loading &!networkError" class="no-person" >
        <div class="empty-img">
            <p><img src="../../assets/people/people-empty.svg" alt="" /></p>
            <p class="tip">You haven't added any event yet</p>
        </div>
        </div>
          <div v-else-if="networkError" class="adjust-network">
        <img src="../../assets/network-disconnected.png" >
        <div>Opps, Your internet connection was disrupted</div>
      </div>

  
          <!-- <router-view class="view" /> -->
   
      </div>
    </div>
  </div>
</template>

<script>
    import axios from '@/gateway/backendapi'
    import { ref } from 'vue'
    import EventList from './EventList'
    import Loader from '../accounting/offering/SkeletonLoader'
    import finish from "../../services/progressbar/progress"
    // import { useStore } from 'vuex'
    // import  store  from "../../store/store"
// import router from "@/router/index";
// import { useRoute } from "vue-router";

export default {
       components: {
        EventList, Loader
       },
  setup() {
      
      const eventList = ref([])
      const eventSummary = ref({})
      const loading = ref(false)
      const networkError = ref(false)


      const getEventList = () => {
        loading.value = true

           axios.get('/api/eventreports/eventReports')
          .then(res => {
            eventList.value = res.data.activities
            eventSummary.value = res.data
            console.log(res.data)
            loading.value = false
            finish()
          })
          .catch(err => {
            console.log(err)
            loading.value = false
            finish()
             if(err.toString().toLowerCase().includes("network error")) {
                networkError.value = true
              } else {
                networkError.value = false
              }
          })
        // }
        // console.log(store.getters['event/eventList'])
        // console.log(store.getters['contributions/contributionList'])
      }
      getEventList()
    // const people = ref([]);
    // const loading = ref(true);
    // onMounted(async () => {
    //   try {
    //     const { data } = await axios.get("/api/People/GetPeopleBasicInfo");
    //     people.value = data;
    //     loading.value = false;
    //   } catch (err) {
    //     loading.value = false;
    //     console.log(err);
    //   }
    // });

    const getPageActivity = (payload) => {
      eventList.value = payload
    }

    const deleteFromView = (payload) => {
      eventList.value.splice(payload, 1)
    }
  
    return { eventList, getEventList, loading, eventSummary, getPageActivity, networkError, deleteFromView };

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
  margin: 0 45px;
}

@media (max-width: 346px) {
  .actions {
    display: flex;
    flex-direction: column;
    margin-top: 10px
  }

  .actions a {
    margin-top: 10px;
  }
}

@media(max-width: 566px) {
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
    width: 95%;
    /* max-width: 1021px; */
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

