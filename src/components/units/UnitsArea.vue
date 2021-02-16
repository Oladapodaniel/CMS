<template>
    <div class="container-fluid">
        <div class="row d-sm-flex align-items-center units-div">
            <div class="col-sm-12">
                <h4 class="font-weight-bold mb-0 center-flexed">{{ balance }}</h4>
                <p class="font-weight-bold mb-0 center-flexed">
                SMS Units
                </p>
            </div>
            <div class="col-sm-12 d-sm-flex justify-content-center">
                <button
                class="btn buy-btn center-flexed"
                @click="payWithPaystack"
                >
                <span class="btn-text"> BUY UNITS </span>
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import { computed } from 'vue'
import userService from "../../services/user/userservice"
import router from "@/router/index";
import { useStore } from "vuex"

    export default {
        setup() {
            const store = useStore();
            
            const currentUser = computed(() => store.getters.smsBalance ? store.getters.smsBalance : 0)

            const getCurrentUserBalance = async () => {
                try {
                    
                    const data = await userService.getCurrentUser();
                    currentUser.value = data.smsBalance;
                    // currentUser.value = data;
                } catch (error) {
                    console.log(error);
                }
            }

            if (!currentUser.value || currentUser.value === 0) getCurrentUserBalance();
            
            const balance = computed(() => {
                if (!currentUser.value) return 0;
                return currentUser.value;
            })

            const  payWithPaystack = () => {
                router.push("/tenant/units")
            };

            return {
                balance,
                payWithPaystack,
            }
        }
    }
</script>

<style scoped>
.units-div {
  border: 1px solid #dde2e6;
  border-radius: 20px;
  padding: 15px 0;
  background: #f9a9a933 !important;
}

.buy-btn {
  background: rgb(112, 142, 177, 0.33);
  border-radius: 22px;
}

.btn-text {
  opacity: 1;
  font-size: 11px;
  font-weight: 700;
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