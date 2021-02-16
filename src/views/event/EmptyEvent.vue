<template>



  <div class="whole-con">
    <div class="main-con">
      <div class="main-body">
        <div class="col-sm-12">
        <div class="top mt-3">
          <div class="header">
            <h2>Events</h2>
          </div>
          <div class="actions">
            <button class="more-btn button">
              More
              <span><i class="fa fa-angle-down btn-icon"></i></span>
            </button>
              <router-link :to="{ name: 'Event' }">
                <button class="button add-person-btn">
                  Add Event
                </button>
              </router-link>
          </div>
        </div>
      </div>
        <!-- <div class="top">
          <div class="header">
            <h2>Event</h2>
          </div>
          <div class="actions">
            <router-link :to="{ name: 'Event' }">
            <button class="button add-person-btn">
              Add Event
            </button>
            </router-link>
          </div>
        </div> -->
        <hr class="hr" />
<!-- v-if="!loading && people.length === 0" -->
<!-- v-if="!loading && people.length > 0" -->
        <div v-if="eventList.length === 0" class="no-person" >
        <div class="empty-img">
            <p><img src="../../assets/people/people-empty.svg" alt="" /></p>
            <p class="tip">You haven't added any event yet</p>
        </div>
        </div>
        <div v-else class="event-list">
            <EventList />
        </div>

        <!-- Transitio area -->
        <!-- <transition
          :name="$store.state.pageTransition.name"
          :mode="$store.state.pageTransition.mode"
          v-on:after-enter="afterEvent"
          v-on:after-leave="afterLeave"
        >
          <router-view class="view transition" />
        </transition> -->
        <!-- End of Transition -->
        <!-- <transition name="fade" mode="out-in"> -->
          <router-view class="view" />
        <!-- </transition> -->
      </div>
    </div>
  </div>
</template>

<script>
    import axios from '@/gateway/backendapi'
    import { ref } from 'vue'
    import EventList from './EventList'
// import store from "@/store/index";
// import router from "@/router/index";
// import { useRoute } from "vue-router";

export default {
       components: { EventList },
  setup() {

      const eventList = ref(getEventList())


      function getEventList () {
        return axios.get('/api/eventreports/eventReports')
          .then(res => {
            eventList.value = res.data
            console.log(res.data)
          })
          .catch(err => console.log(err))
      }
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
  
    return { eventList, getEventList };

  },
};

</script>

<style scoped>
* {
  box-sizing: border-box;
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
}/*

.tip {
  color: #02172e;
  font-size: 20px;
  font-weight: 600;
} */

.hr {
  border: 0.8px solid #0020440a;
  margin: 0 4px;
}

@media(max-width: 566px) {
  .button {
    width: 140px;
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
  .main-con {
    width: 90%;
    margin: 0 auto;
  }

  .top {
    height: 90px;
  }

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

