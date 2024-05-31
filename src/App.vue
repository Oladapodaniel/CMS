<template>
  <div class="container-fluid connectionbar">
    <div class="row">
      <div class="col-md-12 px-0">
        <ConnectionBar />
      </div>
    </div>
  </div>
  <AlatFaith v-if="getChurchType && alartRoute " @route="setRouteValue"  />
  <router-view v-else />
</template>

<script>
import ConnectionBar from "@/components/connectivity/ConnectionStatus.vue";
import setupService from "./services/setup/setupservice";
import AlatFaith from "./components/churcheslandingpage/AlatFaith.vue";
import mixin from "@/mixins/currentUser.mixin.js";
import getSubdomain from "./services/churchTypeMiddlware";
import router from "./router/index";

export default {
  name: "App",

  components: { ConnectionBar, AlatFaith },
  mixins: [mixin],
  data() {
    return {
      transitionName: null,
      alartRoute: true,
    };
  },
  methods: {
    setRouteValue(payload) {
      this.alartRoute = false;
      payload == 1 ? router.push('/login') :  router.push('/alatregister')
    },
  },
  created() {
    if (localStorage.getItem("token")) {
      const expiryDate = localStorage.getItem("expiryDate");
      if (expiryDate && new Date(expiryDate) < Date.now()) {
        localStorage.removeItem("token");
        localStorage.removeItem("expiryDate");
        setupService.clearStore();
      }
      this.getCurrentUser();
      setupService.setup();
    }
  },
  computed: {
    getChurchType() {
      if (getSubdomain() === "alat") return true;
      return false;
    },
  },
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
</style>
