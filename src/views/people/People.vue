<template>
  <main :class="{ 'container-slim': lgAndUp || xlAndUp }">
    <div class="container-top">
      <div class="d-flex flex-column flex-sm-row justify-content-sm-between" v-if="!isFormPage">
        <div class="head-text">
          <div>{{ header }}</div>
        </div>
        <div class="d-flex mt-3 mt-sm-0">
          <el-button color="#136acd" @click="importMembers" plain round>Import</el-button>
          <router-link :to="`/tenant/people/add`" class="no-decoration">
            <el-button color="#136acd" class="ml-2" round>Add Member</el-button>
          </router-link>
        </div>
      </div>
    </div>
    <div class="p-col-12 py-md-4 mt-3" v-if="route.fullPath == '/tenant/people'">
      <div class="font-weight-bold">Share the link to your members to enable them to add their details to your
        church .</div>
      <div class="p-inputgroup form-group mt-2">
        <el-input v-model="memberlink" placeholder="Please input" ref="selectedLink" class="input-with-select" >
          <template #append>
            <el-button @click="copylink">
              <el-icon>
                <CopyDocument />
              </el-icon>
            </el-button>
          </template>
        </el-input>
      </div>
    </div>
    <router-view />
  </main>
</template>

<script>
import { computed, ref } from "vue";
import axios from "@/gateway/backendapi";
// import store from "@/store/index";
import router from "@/router/index";
import { useRoute } from "vue-router";
// import {  computed } from 'vue';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import { ElMessage } from 'element-plus'
import deviceBreakpoint from "../../mixins/deviceBreakpoint";


export default {
  components: {
    InputText,
    Button
  },

  setup() {
    const selectedLink = ref(null)
    const tenantID = ref('')
    const route = useRoute();
    const { lgAndUp, xlAndUp } = deviceBreakpoint()

    const isFormPage = computed(() => {
      if (route.path.includes("add")) return true;
      return false;
    });
    const getCurrentlySignedInUser = async () => {
      try {
        const res = await axios.get("/api/Membership/GetCurrentSignedInUser");
        tenantID.value = res.data.tenantId
      } catch (err) {
        console.log(err);
      }
    };

    getCurrentlySignedInUser();

    const memberlink = computed(() => {
      if (!tenantID.value) return ""
      return `${window.location.origin}/createmember/${tenantID.value}`
    })

    const copylink = () => {
      selectedLink.value.input.setSelectionRange(0, selectedLink.value.input.value.length); /* For mobile devices */
      selectedLink.value.input.select();

      /* Copy the text inside the text field */
      document.execCommand("copy");
      ElMessage({
        showClose: true,
        message: 'Copied to clipboard',
        type: 'success',
      })
    }


    const addPersonClicked = () => {
      if (route.name === "ImportPeople") {
        router.push("/tenant/people/add");
      } else {
        router.push("/people/import");
      }
    };

    const header = computed(() => {
      if (route.path.includes("/people/addfirsttimer")) return "First Timers";
      return "Members";
    })

    const importMembers = () => {
      router.push({ name: 'ImportInstruction', query: { query: 'importpeople' } })
    }

    return { addPersonClicked, tenantID, route, header, isFormPage, importMembers, memberlink, copylink, selectedLink, lgAndUp, xlAndUp };
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

.events {
  font: normal normal 800 29px Nunito sans;
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

/* .top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
} */

/* 
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
} */

/* .button:hover {
  cursor: pointer;
} */

/* .more-btn {
  background: #dde2e6;
} */

/* .add-person-btn {
  background: #136acd;
  color: #fff;
} */

.btn-icon {
  padding: 0 8px;
}

@media (max-width: 545px) {
  /* .top {
    display: block;
    text-align: center;
  } */
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

  /* .top {
    height: 90px;
  } */

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

/* 
.buttonDiv {
  display: flex;
} */
</style>

