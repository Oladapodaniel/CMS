<template>



  <div class="whole-con">
    <div class="main-con">
      <div class="main-body">
       
        
        <div class="col-sm-12">
        <div class="top container-wide mt-3">
          <div class="header">
            <h2>First Timers
            </h2>
          </div>
          <div class="actions">
            <button class="more-btn button">
              More
              <span><i class="fa fa-angle-down btn-icon"></i></span>
            </button>
              <router-link :to="{ name: 'AddFirstTimer' }">
                <button class="button add-person-btn">
                  Add First Timers
                </button>
              </router-link>
          </div>
        </div>
      </div>
        <hr class="hr" />
         <div v-if="firstTimersList.length === 0 && !loading" class="no-person" >
        <div class="empty-img">
            <p><img src="../../assets/people/people-empty.svg" alt="" /></p>
            <p class="tip">You haven't added any first timer yet</p>
        </div>
      </div>
      <div v-else-if="firstTimersList.length > 0 && !loading" class="event-list">
            <FirstTimersList />
        </div>

        <div class="row" v-if="loading">
    <div class="col-md-12">
      <div class="row my-2 d-md-flex justify-content-between">
        <div class="col-md-4">
          <Skeleton width="100%" height="200px" shape="circle" />
        </div>
        <div class="col-md-4">
          <Skeleton width="100%" height="200px" shape="circle" />
        </div>
        <div class="col-md-4">
          <Skeleton width="100%" height="200px" shape="circle" />
        </div>
      </div>

      <div
        class="row my-2 d-md-flex justify-content-center"
        v-for="i in 10"
        :key="i"
      >
        <div class="col-md-2 my-2">
          <Skeleton width="100%" height="2rem" borderRadius="16px" />
        </div>
        <div class="col-md-2 my-2">
          <Skeleton width="100%" height="2rem" borderRadius="16px" />
        </div>
        <div class="col-md-2 my-2">
          <Skeleton width="100%" height="2rem" borderRadius="16px" />
        </div>
        <div class="col-md-2 my-2">
          <Skeleton width="100%" height="2rem" borderRadius="16px" />
        </div>
        <div class="col-md-2 my-2">
          <Skeleton width="100%" height="2rem" borderRadius="16px" />
        </div>
        <div class="col-md-2 my-2">
          <Skeleton width="100%" height="2rem" />
        </div>
      </div>
    </div>
  </div>
<!-- v-if="!loading && people.length === 0" -->
<!-- v-if="!loading && people.length > 0" -->
       
        
         

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
    import FirstTimersList from './FirstTimersList'
    import { ref } from 'vue';
// import store from "@/store/index";
// import router from "@/router/index";
// import { useRoute } from "vue-router";

export default {
       components: { FirstTimersList },
  setup() {
      const firstTimersList = ref([])
      const loading = ref(false)

      const getFirstTmersList = () => {
        loading.value = true
          axios.get("/api/People/FirstTimer")
          .then(res => {
            firstTimersList.value = res.data;
            loading.value = false
            console.log(res.data)
          })
      }
      getFirstTmersList()
  
    return { firstTimersList, getFirstTmersList, loading };

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
@media (max-width: 1500px) {
    .table {
        border: 2px solid red;
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

@media (max-width: 640px) {
    .top {
  display: flex;;
  align-items: center;
  flex-direction: column;
    }
    .actions {
        margin-top: 15px;
    }
}

@media (max-width: 566px) {
    .button {
        width: 160px;
    }
}

@media (max-width: 399px) {
    .actions {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .button {
        margin-top: 10px;
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

