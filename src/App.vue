<template>
  <div class="container-fluid connectionbar">
    <div class="row">
      <div class="col-md-12 px-0">
        <ConnectionBar />
      </div>
    </div>
  </div>
    <ThemeProvider>
      <HandleCache ref="cacheBuster">
    <template v-slot="{ isLoading, isLatestVersionAvailable }">
      <div v-if="isLoading" class="vh-100 d-flex justify-content-center align-items-center">
        <GridLoader :loading="true" color="#136acd" size="20px" />
      </div>
      <div v-else-if="isLatestVersionAvailable">
      <router-view />
    </div>
      <template v-else>
        {{ cacheBuster.clearCacheAndReload() }}
      </template>
    </template>
  </HandleCache>
    </ThemeProvider>
</template>

<script>
import ConnectionBar from "@/components/connectivity/ConnectionStatus.vue";
import setupService from "./services/setup/setupservice";
import mixin from "@/mixins/currentUser.mixin.js";
import ThemeProvider from "./theme/ThemeProvider.vue";
import HandleCache from '@/components/cache/HandleCache.vue';
import { GridLoader } from "vue3-spinner";
import { ref } from "vue";

export default {
  name: "App",

  components: {
    ConnectionBar,
    ThemeProvider,
    HandleCache,
    GridLoader
  },
  mixins: [mixin],
  setup() {
    const cacheBuster = ref(null)

    return {
      cacheBuster
    }
  },
  data() {
    return {
      transitionName: null,
      alartRoute: true,
    };
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
};
</script>

<style>
@import "./styles/style.css";
@import "./styles/styles2.css";

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: var(--el-text-color-primary);
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
