<script setup>
import { ref, defineProps, watch, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";

const props = defineProps({
  tabs: {
    type: Array,
    required: true,
  },
  routes: {
    type: Object,
    required: true,
  },
  class: {
    type: String,
    default: "", // Optional: Set a default class if none is provided
  },
});

const router = useRouter();
const route = useRoute();
const selectedTab = ref("");

// Function to update the selected tab based on the current route
const updateSelectedTab = (routeName) => {
  const matchedTab = Object.keys(props.routes).find(
    (tab) => props.routes[tab] === routeName
  );
  if (matchedTab) {
    selectedTab.value = matchedTab;
  }
};

// Set the selected tab on component mount
onMounted(() => {
  updateSelectedTab(route.name);
});

const selectTab = (tab) => {
  selectedTab.value = tab;
  
  router.push({ name: props.routes[tab] });
};

// Watch for route changes and update the selected tab accordingly
watch(
  () => route.name,
  (newRouteName) => {
    updateSelectedTab(newRouteName);
  }
);
</script>

<template>
  <!-- Tabs -->
  <div :class="props.class" class="border-bottom">
    <div
      v-for="tab in tabs"
      :key="tab"
      class="position-relative mb-2 mr-0 mr-sm-2 cursor-pointer"
      @click="selectTab(tab)"
    >
      <span
        :class="['pb-2', tab === selectedTab ? 'active-tab' : 'fw-400']"
        class="d-flex align-items-center justify-content-center"
      >
        {{ tab == "PastorInfo" ? "Pastor's info" : tab }}
      </span>
    </div>
  </div>
</template>

<style scoped>
.active-tab {
  position: relative;
  padding-bottom: 10px;
  color: #0745af;
  font-weight: 600;
  font-size: 20px;
}

.active-tab::after {
  content: "";
  position: absolute;
  bottom: -10.5px;
  left: 0;
  width: 100%;
  height: 4px;
  background: #0745af;
  border-radius: 8px;
}

.border-bottom {
  border-bottom: 3px solid #e9e9e9 !important;
}

@media screen and (max-width: 452px) {
  .border-bottom {
    border-bottom: 0 !important;
  }
}
</style>
