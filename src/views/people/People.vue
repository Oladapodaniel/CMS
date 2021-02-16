<template>
  <div class="whole-con">
    <div class="main-con">
      <div class="main-body">
        <div class="top mt-3" v-if="!isFormPage">
          <div class="header">
            <h2>{{ header }}</h2>
          </div>
          <div class="actions">
            <button class="more-btn align-items-center default-btn border-0">
              More
              <span><i class="fa fa-angle-down btn-icon"></i></span>
            </button>
            <router-link :to="`/tenant/people/add`" class="">
            <button class="add-person-btn default-btn border-0 ml-3">
              Add Member
            </button>
            </router-link>
          </div>
        </div>
        <hr class="hr" v-if="!isFormPage"/>

        <!-- <transition name="fade" mode="out-in"> -->
          <router-view class="view" />
        <!-- </transition> -->
      </div>
    </div>
  </div>
</template>

<script>
// import store from "@/store/index";
import router from "@/router/index";
import { useRoute } from "vue-router";
import { computed } from 'vue';

export default {
  setup() {
    const route = useRoute();
    const isFormPage = computed(() => {
      if (route.path.includes("add")) return true;
      return false;
    })
    

    const addPersonClicked = () => {
      if (route.name === "ImportPeople") {
        router.push("/tenant/people/add");
      } else {
        router.push("/people/import");
      }
    };

    const header = computed(() => {
      console.log(route.path, "path");
      if (route.path.includes("/people/addfirsttimer")) return "First Timers";
      return "Members";
    })

    //   const afterEnter =  () => {
    //   window.scrollTo(0, 0);
    // }
    // const afterLeave = () => {
    //   Store.commit("setPageTransition", "default");
    // }

    return { addPersonClicked, route, header, isFormPage, };
  },
};
// transition method
// methods: {

// }
// End of transition
</script>

<style scoped>
* {
  box-sizing: border-box;
}

.whole-con {
  display: flex;
  /* background: #f1f5f8; */
  /* height: 100vh; */
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

.hr {
  border: 0.8px solid #0020440a;
  margin: 0 4px;
}

@media (max-width: 545px) {
  .top {
    display: block;
    text-align: center;
    }

  .more-btn.button, .add-person-btn.button {
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
  transition: all .3s cubic-bezier(0.67, 0.01, 0.86, 0.65);
}

.fade-leave-active {
  transition: all 0.3s cubic-bezier(0.67, 0.01, 0.86, 0.65);
}

.fade-enter-from,
.fade-leave-to {
  transition: translateX(20px);
  opacity: 0;
}
</style>

