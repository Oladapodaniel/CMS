<template>
  <!-- <transition name="fade" mode="out-in"> -->
  <div class="container-fluid connectionbar">
      <div class="row">
        <div class="col-md-12 px-0">
          <ConnectionBar />
        </div>
        <!-- <div class="col-md-12 px-0 text-center p-2 font-weight-700 bg-white" style="border: 2px solid red" v-if="speed">
          🖐 Slow network detected, kindly reload or wait till you have a strong network.
        </div> -->
      </div>
    </div>
  <router-view />
  <!-- <Toast /> -->
  <!-- </transition> -->
</template>

<script>
import axios from "@/gateway/backendapi";
import store from "@/store/store.js";
// import { createNamespacedHelpers } from 'vuex';
import router from "@/router/index";
// import { mapAction } from createNamespacedHelpers("lookups");
// import Multiselect from '@vueform/multiselect'
import ConnectionBar from "@/components/connectivity/ConnectionStatus.vue";
import setupService from "./services/setup/setupservice"
import mixin from "@/mixins/currentUser.mixin.js"
// import celebAnim from "./services/celebration-animation/party"
// import speed from "./services/network/networkSpeed"

export default {
  name: "App",

  components: { ConnectionBar },
  mixins: [mixin],
  data() {
    return {
      transitionName: null,
      // speed: null
    };
  },

  methods: {
    // async getCurrentUser() {
    //   try {
    //     const res = await axios.get("/api/Membership/GetCurrentSignedInUser");
    //     store.dispatch("setCurrentUser", res.data);
    //     if (res.data.subStatus.toLowerCase() === 'expired'){
    //         return router.push('/errorpage/expiredSubscription')
    //     }
    //   } catch (err) {
    //     /*eslint no-undef: "warn"*/
    //     NProgress.done();
    //     if (err.response && err.response.status === 401) {
    //       localStorage.setItem("token", "");
    //       router.push("/");
    //     }
    //   }
    // },
  },

  created() {
    if (localStorage.getItem("token")) {
      
      const expiryDate = localStorage.getItem("expiryDate");
      if (expiryDate && new Date(expiryDate) < Date.now()) {
        localStorage.removeItem("token")
        localStorage.removeItem("expiryDate")
        setupService.clearStore();
      }
      
      this.getCurrentUser();

      setupService.setup();
    }
  },
  updated() {
    // console.log('updated triggered')
   
    // navigator.connection.onchange =  (speed) => {
    //         //do what you need to do ,on speed change event
    //         // console.log('Connection Speed Changed');
    //         // console.log(speed)
    //         if (speed.currentTarget.downlink > 7 && speed.currentTarget.downlink < 10) {
    //           this.speed = true
    //           // this.$toast.add({
    //           //   severity: "info",
    //           //   summary: "Slow network detected",
    //           //   detail: "You have a slow network, kindly reload or wait till you have a strong network",
    //           //   life: 5000,
    //           // });
    //         } else {
    //           this.speed = false
    //         }

    //        }
  },

  mounted() {
    // console.log('mounted triggered')
    //  this.speed = false
    // let res = speed.speed()
    // console.log(res)
  //   window.addEventListener('DOMContentLoaded', () => {
  //     const script = document.createElement("script");
  //     script.src = 'https://embed.tawk.to/60ba6591de99a4282a1b7128/1f7c1pgqv';
  //     document.getElementsByTagName("head")[0].appendChild(script);
  //   });
  }
};
</script>

<style>
@import "./styles/style.css";
@import "./styles/styles2.css";

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.btn-loading {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

html {
  scroll-behavior: smooth;
}

.connectionbar {
  position: fixed;
  z-index: 9;
}

/* .fade-enter-active{
  transition: all 1s cubic-bezier(.67,.01,.86,.65);
}

.fade-leave-active{
  transition: all 0.6s cubic-bezier(.67,.01,.86,.65);
}

.fade-enter-from,
.fade-leave-to{
  transition: translateX(20px);
  opacity: 0;
} */
</style>
