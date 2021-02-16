<template >
  <!-- <transition name="fade" mode="out-in"> -->
  <div class="container-fluid connectionbar">
      <div class="row">
        <div class="col-md-12 px-0">
          <ConnectionBar />
        </div>
      </div>
    </div>
  <router-view class="view" />
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

export default {
  name: "App",

  components: { ConnectionBar },

  data() {
    return {
      transitionName: null,
    };
  },

  methods: {
    async getCurrentUser() {
      try {
        const res = await axios.get("/api/Membership/GetCurrentSignedInUser");
        store.dispatch("setCurrentUser", res.data);
        console.log(res.data);
      } catch (err) {
        /*eslint no-undef: "warn"*/
        NProgress.done();
        console.log(err.response);
        if (err.response && err.response.status === 401) {
          localStorage.setItem("token", "");
          router.push("/");
        }
      }
    },
  },

  created() {
    if (localStorage.getItem("token")) {

      this.getCurrentUser();

      setupService.setup();
    }
  },
};
</script>

<style>
@import "./styles/style.css";

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.btn-loading {
  display: flex;
  justify-content: space-between;
  align-items: center;
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
