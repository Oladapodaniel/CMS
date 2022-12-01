<template>
  <div class="whole-con">
    <div class="main-con">
      <div class="main-body">


        <!-- <div class="col-sm-12"> -->
        <div class="top container-wide mt-3 px-0">
          <div class="header">
            <div class="events">First Timers Analytics
            </div>
          </div>
          <div class="actions">
            <button class="more-btn button" @click="importFirstTimer">
              Import
            </button>
            <router-link :to="{ name: 'AddFirstTimer' }">
              <button class="button add-person-btn">
                Add First Timers
              </button>
            </router-link>
          </div>

        </div>
        <Dialog header="First Timers to import from file" v-model:visible="displayModal" :style="{width: '80vw'}" :modal="true">
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
                <div class="container">
                  <div class="row d-flex justify-content-end text-center">
                    <div class="default-btn mr-3 cursor-pointer" @click="closeModal">Discard</div>
                    <div class="primary-bg default-btn border-0 text-white text-center cursor-pointer" @click="addToFirstTimers">Save</div>
                  </div>
                </div>
            </template>
        </Dialog>
      <!-- </div> -->
        <hr class="hr container-wide" />
        <div v-if="firstTimersList.length > 0 && !loading && !networkError" class="event-list">
            <FirstTimersList @firsttimers="setFirsttimer" @loading="setLoading" @loaded="setLoaded" />
        </div>
         <div v-if="firstTimersList.length === 0 && !loading && !networkError" class="no-person" >
        <div class="empty-img">
            <p><img src="../../assets/people/people-empty.svg" alt="" /></p>
            <p class="tip">You haven't added any first timer yet</p>
        </div>
      </div>
      <div v-else-if="networkError && !loading" class="adjust-network">
        <img src="../../assets/network-disconnected.png" >
        <div>Opps, Your internet connection was disrupted</div>
      </div>

        <div class="row container-wide" v-if="loading">
    <div class="col-md-12">
      <div class="row my-2 d-md-flex justify-content-between">
        <div class="col-md-4">
          <Skeleton width="100%" height="200px" shape="circle" />
        </div>
        <div class="col-md-4">
          <Skeleton width="100%" height="200px" shape="circle" />
        </div>
        <div class="col-md-4">
          <Skeleton width="100%" height="200px" shape="circle" />
        </div>
      </div>

      <div
        class="row my-2 d-md-flex justify-content-center"
        v-for="i in 10"
        :key="i"
      >
        <div class="col-md-2 my-2">
          <Skeleton width="100%" height="2rem" borderRadius="16px" />
        </div>
        <div class="col-md-2 my-2">
          <Skeleton width="100%" height="2rem" borderRadius="16px" />
        </div>
        <div class="col-md-2 my-2">
          <Skeleton width="100%" height="2rem" borderRadius="16px" />
        </div>
        <div class="col-md-2 my-2">
          <Skeleton width="100%" height="2rem" borderRadius="16px" />
        </div>
        <div class="col-md-2 my-2">
          <Skeleton width="100%" height="2rem" borderRadius="16px" />
        </div>
        <div class="col-md-2 my-2">
          <Skeleton width="100%" height="2rem" borderRadius="16px"/>
        </div>
      </div>
    </div>
  </div>

          <router-view />
        <!-- </transition> -->

        <Toast />
      </div>
    </div>
  </div>
</template>

<script>
    import axios from '@/gateway/backendapi'
    import FirstTimersList from './FirstTimersList'
    import { ref } from 'vue';
    import finish from '../../services/progressbar/progress'
    import { useToast } from "primevue/usetoast";
    import Dialog from 'primevue/dialog';
// import store from "@/store/index";
import router from "@/router/index";
import membershipService from '../../services/membership/membershipservice';
// import { useRoute } from "vue-router";


export default {
  components: { FirstTimersList, Dialog },
  setup() {
    // const route = useRoute()
      const firstTimersList = ref([])
      const loading = ref(false)
      const toast = useToast()
      const importFile = ref("")
      const image = ref("");
      const displayModal = ref(false)
      const firstTimerData = ref([])
      const networkError = ref(false)

      const getFirstTmersList = async() => {
        loading.value = true
        try {
          let data = await membershipService.getFirstTimers()
          firstTimersList.value = data;
          loading.value = false
          console.log(data)
        }
        catch (err) {
          finish()
            console.log(err)
          if(err.toString().toLowerCase().includes("network error")) {
            networkError.value = true
          } else {
            networkError.value = false
          }
            loading.value = false
        }
        
          // axios.get("/api/People/FirstTimer")
          // .then(res => {
            
          //   console.log(res.data)
          // })
          // .catch(err => {
            
          // })
      }
      getFirstTmersList()

      const fileUpload = () => {
        importFile.value.click()
      }

      const closeModal = () => {
        displayModal.value = false
      }

      const imageSelected = async(e) => {
        image.value = e.target.files[0];
        const formData = new FormData();
        formData.append("file", image.value ? image.value : "")
        console.log(formData)
        try {
          let { data } = await axios.post("/api/People/UploadFirstTimerFile", formData)
          console.log(data)
          if   (!data.response.toString().includes('0')) {
              toast.add({
              severity: "success",
              summary: "Confirmed",
              detail: data.response,
              life: 4000,
            });
              firstTimerData.value = data.returnObject
              displayModal.value = true;
            } else {
              toast.add({
              severity: "info",
              summary: "No First Timer found",
              detail: "Download our template and add first timers before you upload",
              life: 4000,
            });
          }
        }
        catch  (err) {
          finish()
          console.log(err)
          if (err.status === 404 || err.response.status === 404) {
              toast.add({
              severity: "warn",
              summary: "Upload not successful",
              detail: "Ensure that there isn't any empty row or field and try again",
              // life: 4000,
            });
          } else if (err.toString().toLowerCase().includes("network error")) {
            toast.add({
              severity: "warn",
              summary: "Network Error",
              detail: "Please ensure you have strong internet connection",
              life: 4000,
            });
          } else if (err.toString().toLowerCase().includes("timeout")) {
            toast.add({
              severity: "warn",
              summary: "Request took too long to respond",
              detail: "Please try again by refreshing the page",
              life: 3000,
            });
          }
        }
      };

      const addToFirstTimers = async() =>  {
      try {
        let { data } = await axios.post("/api/People/CreateMultipleFirstTimer", firstTimerData.value)
        console.log(data)
        displayModal.value = false
        if (data.returnObject.returnList.length > 0) {
          toast.add({
          severity: "info",
          summary: data.returnObject.createdRecord,
          detail: `There are ${data.returnObject.returnList.length} members that have been added already`,
        });
        } else {
          toast.add({
          severity: "success",
          summary: "Created Successfully",
          detail: data.createdRecord,
          life: 4000,
        });
        }
        firstTimersList.value = firstTimerData.value

      }
      catch  (err) {
        finish()
         if (err.toString().toLowerCase().includes("network error")) {
          toast.add({
            severity: "warn",
            summary: "Network Error",
            detail: "Please ensure you have strong internet connection",
            life: 4000,
          });
        } else if (err.toString().toLowerCase().includes("timeout")) {
          toast.add({
            severity: "warn",
            summary: "Request took too long to respond",
            detail: "Please try again by refreshing the page",
            life: 3000,
          });
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

    const setLoading = (payload) => {
      loading.value = payload
    }
    
    const setLoaded = (payload) => {
      loading.value = payload
    }

    return { firstTimersList, getFirstTmersList, loading, fileUpload, imageSelected, image, displayModal, importFile, firstTimerData, addToFirstTimers, closeModal, importFirstTimer, networkError, setFirsttimer, setLoading, setLoaded };
  },
};

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
  height: 100vh;
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
  margin: 4px 8px;
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
.actions{
  display:flex;
}

@media(max-width: 566px) {
  .button {
    width: 140px;
  }
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
    .button {
        width: 160px;
    }
}

@media (max-width: 399px) {
    
    .button {
        margin-top: 10px;
    }
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

