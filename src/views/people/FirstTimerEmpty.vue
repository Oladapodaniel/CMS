<template>
  <div :class="{ 'container-slim': lgAndUp || xlAndUp }" class="container-top">
    <div class="d-flex flex-column flex-sm-row justify-content-sm-between">
      <div class="head-text">
        <div>First Timers Analytics
        </div>
      </div>
      <div class="actions mt-3 mt-sm-0">
        <el-button color="#136acd" @click="importFirstTimer" plain round>Import</el-button>
        <router-link :to="{ name: 'AddFirstTimer' }" class="no-decoration">
          <el-button color="#136acd" class="ml-2" round>Add First Timers</el-button>
        </router-link>
      </div>
    </div>

    <el-dialog v-model="displayModal" title="First Timers to import from file"
      :width="mdAndUp || lgAndUp || xlAndUp ? `50%` : `90%`" align-center>
      <div class="container">
        <div class="row">
          <div class="col-3 font-weight-700">Name</div>
          <div class="col-4 font-weight-700">Email</div>
          <div class="col-2 font-weight-700">Gender</div>
          <div class="col-2 font-weight-700">Phone Number</div>
        </div>
        <div class="row" v-for="(item, index) in firstTimerData" :key="index">
          <div class="col-3">{{ item.firstName ? item.firstName : "" }} {{ item.lastName ? item.lastName : "" }}</div>
          <div class="col-4">{{ item.email }}</div>
          <div class="col-2">{{ item.gender }}</div>
          <div class="col-2">{{ item.phoneNumber }}</div>
        </div>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="displayModal = false" color="#136acd" round plain>Cancel</el-button>
          <el-button type="primary" color="#136acd" :loading="allGroupLoading" @click="addToFirstTimers" round>
            Save
          </el-button>
        </span>
      </template>
    </el-dialog>

    <div v-if="firstTimersList.length > 0 && !loading && !networkError" class="event-list">
      <FirstTimersList :firstTimersList="firstTimersList" />
    </div>
    <div v-if="firstTimersList.length === 0 && !loading && !networkError" class="no-person">
      <div class="empty-img">
        <p><img src="../../assets/people/people-empty.svg" alt="" /></p>
        <p class="tip">You haven't added any first timer yet</p>
      </div>
    </div>
    <div v-else-if="networkError && !loading" class="adjust-network">
      <img src="../../assets/network-disconnected.png">
      <div>Opps, Your internet connection was disrupted</div>
    </div>

    <el-skeleton class="w-100" animated v-if="loading">
      <template #template>
        <div style="
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-top: 20px
          ">
          <el-skeleton-item variant="text" style="width: 240px; height: 240px" />
          <el-skeleton-item variant="text" style="width: 240px; height: 240px" />
        </div>
        <!-- <el-skeleton-item variant="text" class="w-100" style="height: 25px" :rows="10"/> -->
        <el-skeleton class="w-100 mt-5" style="height: 25px" :rows="20" animated />
      </template>
    </el-skeleton>
  </div>
</template>

<script>
import axios from '@/gateway/backendapi'
import FirstTimersList from './FirstTimersList'
import { ref } from 'vue';
import finish from '../../services/progressbar/progress'
import router from "@/router/index";
import membershipService from '../../services/membership/membershipservice';
import deviceBreakpoint from "../../mixins/deviceBreakpoint";


export default {
  components: { FirstTimersList },
  setup() {
    const firstTimersList = ref([])
    const loading = ref(false)
    const importFile = ref("")
    const image = ref("");
    const displayModal = ref(false)
    const firstTimerData = ref([])
    const networkError = ref(false)
    const { mdAndUp, lgAndUp, xlAndUp } = deviceBreakpoint()

    const getFirstTmersList = async () => {
      loading.value = true
      try {
        let data = await membershipService.getFirstTimers()
        firstTimersList.value = data;
        loading.value = false
      }
      catch (err) {
        finish()
        console.log(err)
        if (err.toString().toLowerCase().includes("network error")) {
          networkError.value = true
        } else {
          networkError.value = false
        }
        loading.value = false
      }
    }
    getFirstTmersList()

    const fileUpload = () => {
      importFile.value.click()
    }

    const closeModal = () => {
      displayModal.value = false
    }

    const imageSelected = async (e) => {
      image.value = e.target.files[0];
      const formData = new FormData();
      formData.append("file", image.value ? image.value : "")
      try {
        let { data } = await axios.post("/api/People/UploadFirstTimerFile", formData)
        if (!data.response.toString().includes('0')) {
          ElMessage({
            type: 'success',
            message: data.response,
            duration: 5000
          })
          firstTimerData.value = data.returnObject
          displayModal.value = true;
        } else {
          ElMessage({
            type: 'info',
            message: "No first timer found, download our template and add first timers before you upload",
            duration: 8000
          })
        }
      }
      catch (err) {
        finish()
        console.log(err)
        if (err.status === 404 || err.response.status === 404) {
          ElMessage({
            type: 'warning',
            message: "Upload not successful, ensure that there isn't any empty row or field and try again ",
            duration: 8000
          })
        } else if (err.toString().toLowerCase().includes("network error")) {
          ElMessage({
            type: 'warning',
            message: "Network error, please ensure that you have a network connection",
            duration: 5000
          })
        } else if (err.toString().toLowerCase().includes("timeout")) {
          ElMessage({
            type: 'warning',
            message: "Request took too long to respond, Please try again by refreshing the page",
            duration: 8000
          })
        }
      }
    };

    const addToFirstTimers = async () => {
      try {
        let { data } = await axios.post("/api/People/CreateMultipleFirstTimer", firstTimerData.value)
        displayModal.value = false
        if (data.returnObject.returnList.length > 0) {
          ElMessage({
            type: 'info',
            message: data.returnObject.createdRecord + ` There are ${data.returnObject.returnList.length} members that have been added already`,
            duration: 8000
          })
        } else {
          ElMessage({
            type: 'success',
            message: "Created successfully, " + data.createdRecord,
            duration: 5000
          })
        }
        firstTimersList.value = firstTimerData.value

      }
      catch (err) {
        finish()
        if (err.toString().toLowerCase().includes("network error")) {
          ElMessage({
            type: 'warning',
            message: "Network error, please ensure that you have a network connection",
            duration: 8000
          })
        } else if (err.toString().toLowerCase().includes("timeout")) {
          ElMessage({
            type: 'warning',
            message: "Request took too long to respond, Please try again by refreshing the page",
            duration: 8000
          })
        }
        console.log(err)
      }
    }

    const importFirstTimer = () => {
      router.push({ name: 'ImportInstruction', query: { query: 'importfirsttimer' } })
    }

    const setFirsttimer = (payload) => {
      firstTimersList.value = payload
    }

    // const setLoading = (payload) => {
    //   loading.value = payload
    // }

    // const setLoaded = (payload) => {
    //   loading.value = payload
    // }

    return { firstTimersList, getFirstTmersList, loading, fileUpload, imageSelected, image, displayModal, importFile, firstTimerData, addToFirstTimers, closeModal, importFirstTimer, networkError, setFirsttimer, mdAndUp, lgAndUp, xlAndUp };
  },
};

</script>

<style scoped>
* {
  box-sizing: border-box;
}

/* .top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
} */

/* .button {
  padding: 8px 10px;
  border: none;
  border-radius: 22px;
  width: 180px;
  font-size: 16px;
  font-weight: 600;
  margin: 4px 8px;
  outline: none;
  text-decoration: none;
  box-sizing: border-box;
}

.button:hover {
  cursor: pointer;
} */

/* .more-btn {
  background: #dde2e6;
}

.add-person-btn {
  background: #136acd;
  color: #fff;
} */

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
}

.hr {
  border: 0.8px solid #0020440a;
  margin: 0 45px;
}

.actions {
  display: flex;
}

@media(max-width: 566px) {
  /* .button {
    width: 140px;
  } */
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
    /* border: 2px solid red; */
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
    display: flex;
    align-items: center;
    flex-direction: column;
  }

  .actions {
    flex-wrap: wrap;
  }

  .events {
    font: normal normal 800 29px Nunito sans;
    padding-top: 20px;
  }
}

@media (max-width: 566px) {
  /* .button {
        width: 160px;
    } */
}

@media (max-width: 399px) {

  /* .button {
        margin-top: 10px;
    } */
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

