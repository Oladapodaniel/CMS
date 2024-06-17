<template>
  <div class="">
    <div class="d-sm-flex align-items-center flex-column units-di my-3">
      <div class="col-sm-12">
        <div class="font-weight-600 text-black s-32 text-head mb-0 center-flexed">{{ balance.toFixed(2) }}</div>
        <p class="font-weight-600 text-head d-flex justify-content-center">
          SMS Units
        </p>
      </div>
      <div class="col-sm-12 d-flex justify-content-center ">
        <el-button class="  border border-dark center-flexed" round @click="goToBuyUnit">
          <span class=" text-black fw-500 "> Buy UNITS </span>
        </el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import userService from "../../services/user/userservice"
import router from "@/router/index";
import { useStore } from "vuex"

export default {
  setup() {
    const store = useStore();
    const currentUser = ref(store.getters.currentUser && store.getters.currentUser.smsBalance ? store.getters.currentUser.smsBalance : 0)
    const getCurrentUserBalance = async () => {

      try {
        const data = await userService.getCurrentUser();
        currentUser.value = data.smsBalance;
      } catch (error) {
        console.log(error);
      }
    }
    if (!currentUser.value || currentUser.value === 0) getCurrentUserBalance();

    const balance = computed(() => {
      return currentUser.value;
    })

    const goToBuyUnit = () => {
      router.push("/tenant/units")
    };

    return {
      balance,
      goToBuyUnit,
      currentUser
    }
  }
}
</script>

<style scoped>
.units-div {
  border: 1px solid #dde2e6;
  border-radius: 7px;
  padding: 15px 0;
  background: #f5ebeb1c !important;
}




.center-flexed {
  display: flex;
  justify-content: center;
}

@media screen and (max-width: 767px) {
  .hidden-header {
    display: inline-block;
    font-size: 12px;
  }

  .header-row {
    display: none;
  }

  #menu-items {
    flex-direction: row !important;
  }

  .search-div {
    width: 100%;
  }

  .units-div {
    width: 100%;
  }

  .units-container {
    margin-left: 0;
    margin: auto;
  }

  .center-flexed {
    text-align: center;
  }
}
</style>