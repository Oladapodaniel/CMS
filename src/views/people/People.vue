<template>
  <main :class="{ 'container-wide': lgAndUp || xlAndUp }">
    <div class="container-top">
      <div
        class="d-flex flex-column flex-sm-row justify-content-sm-between"
        v-if="!isFormPage"
      >
        <div >
          <div class="text-head font-weight-bold h2 py-0 my-0 text-black">{{ header }}</div>
          <div class="s-18">Showing all members</div>
        </div>
        <div class="d-flex flex-wrap flex-sm-nowrap mt-3 mt-sm-0">
          <div class="d-flex mt-1 w-100" @click="watchVideo">
            <span class="s-18 primary--text">Watch Video </span>
            <span class="mt-0 ml-1"
              ><el-icon :size="27" class="primary--text"><VideoPlay /></el-icon
            ></span>
          </div>
          <el-dropdown
            trigger="click"
            class="align-items-center justify-content-center d-flex ml-md-3 ml-0 default-btn py-0 m-0 border"
            style="height: 2.2rem"
          >
            <span class="el-dropdown-link w-100 primary--text text-center font-weight-600">
              More
              <el-icon class="el-icon--right">
                <arrow-down />
              </el-icon>
            </span>
            <template #dropdown>
              <el-dropdown-menu >
                <el-dropdown-item class="text-black" @click="copylink"
                  >Copy Public Link
                  <img
                    class="ml-2"
                    src="../../assets/copyurl-icon.png"
                    alt=""
                  />
                </el-dropdown-item>
                <el-dropdown-item
                  v-if="route.fullPath == '/tenant/people'"
                  @click="getQrCode"
                >
                  Show QR Code
                </el-dropdown-item>
                <el-dropdown-item @click="showAnalysis"
                  >Analysis</el-dropdown-item
                >
                <el-dropdown-item @click="importMembers"
                  >Import</el-dropdown-item
                >
              </el-dropdown-menu>
            </template>
          </el-dropdown>
          <!-- <el-button @click="importMembers" class="header-btn secondary-button" round>Import</el-button> -->
          <router-link :to="`/tenant/people/add`" class="no-decoration w-100">
            <el-button
              :color="primarycolor"
              class="ml-0 ml-sm-2 mt-sm-0 mt-3 w-100 header-btn"
              round
              >Add Member</el-button
            >
          </router-link>
        </div>
      </div>
    </div>
    <div class="row" v-if="false">
      <div class="col-md-2 mt-2" v-if="route.fullPath == '/tenant/people'">
        <div class="font-weight-bold py-md-2 mt-4">QR Code</div>
        <div class="image" @click="getQrCode">
          <img src="../../assets/group2.svg" alt="Member image" />
        </div>
      </div>
      <div class="col-md-10 py-md-4 mt-3" v-if="route.fullPath == '/tenant/people'">
        <div class="font-weight-bold">Share the link to your members to enable them to add their details to your
          church .</div>
        <div class="p-inputgroup form-group mt-2">
          <el-input
            v-model="memberlink"
            placeholder="Click the copy button when the link appears"
            ref="selectedLink"
            class="input-with-select"
          >
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
    </div>
    <transition name="el-fade-in-linear">
      <div class="row" v-show="membershipCapacityExceeded">
        <div class="col-md-12 mt-3" v-if="route.fullPath == '/tenant/people'" >
        <MemberCapExceeded />
        </div>
      </div>
    </transition>
    <el-dialog
      v-model="QRCodeDialog"
      title=""
      :width="mdAndUp || lgAndUp || xlAndUp ? `35%` : xsOnly ? `90%` : `70%`"
      class="QRCodeDialog"
      align-center
    >
      <div class="d-flex align-items-center flex-column">
        <div class="text-capitalize font-weight-500 h2 text-black">
          Register Members with QR Code
        </div>
        <div class="s-20">
          Scan the Code below with your smartphone
        </div>
      </div>
      <div class="d-flex justify-content-center">
        <div class="img-wrapper m-3">
          <img v-if="qrCode" :src="qrCode" class="image-wrapper w-100" />
        </div>
      </div>
    </el-dialog>
    <el-dialog
      style="border-radius: 20px"
      v-model="showAddMemberVideo"
      :width="mdAndUp || lgAndUp || xlAndUp ? `50%` : `90%`"
      top
    >
      <div class="row justify-content-center" v-loading>
        <div class="col-md-12">
          <iframe
            width="100%"
            height="315"
            :src="videoURL"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerpolicy="strict-origin-when-cross-origin"
            allowfullscreen
          ></iframe>
        </div>
      </div>
    </el-dialog>
    <router-view />
  </main>
</template>

<script>
import { computed, ref, watchEffect, inject } from "vue";
import router from "@/router/index";
import { useRoute } from "vue-router";
import { ElMessage } from "element-plus";
import deviceBreakpoint from "../../mixins/deviceBreakpoint";
import { useStore } from "vuex";
// import axios from 'axios';
import axios from "@/gateway/backendapi";
import MemberCapExceeded from "@/components/membership/MembershipCapExceeded.vue";

export default {
  components: {
    MemberCapExceeded
  },
  setup() {
    const store = useStore();
    const selectedLink = ref(null);
    const tenantID = ref("");
    const route = useRoute();
    const videoURL = ref(
      "https://www.youtube.com/embed/zcwna-kshGo?si=08OmWtjLkAbwLXy8"
    );
    const QRCodeDialog = ref(false);
    const showAddMemberVideo = ref(false);
    const qrCode = ref("");
    const { lgAndUp, xlAndUp, mdAndUp, xsOnly } = deviceBreakpoint();
    const primarycolor = inject("primarycolor");
    const membershipCapacityExceeded = ref(false)
    const watchVideo = () => {
      showAddMemberVideo.value = true;
    };
    const showAnalysis = () => {
      // showAddMemberVideo.value = true;
    };

    const isFormPage = computed(() => {
      if (route.path.includes("add")) return true;
      return false;
    });

    const getUser = computed(() => {
      if (
        !store.getters.currentUser ||
        (store.getters.currentUser &&
          Object.keys(store.getters.currentUser).length == 0)
      )
        return "";
      return store.getters.currentUser;
    });

    watchEffect(() => {
      if (getUser.value) {
        tenantID.value = getUser.value.tenantId

        if (getUser.value.churchSize >= getUser.value.subscribedChurchSize) {
          membershipCapacityExceeded.value = true;
        } else {
          membershipCapacityExceeded.value = false;
        }
      }
    });

    const memberlink = computed(() => {
      if (!tenantID.value) return "";
      return `${window.location.origin}/createmember?tenantId=${tenantID.value}`;
    });
    const getQrCode = async () => {
      try {
        const res = await axios.get(
          `/api/Settings/GetQRCode?link=${window.location.origin}/createmember?tenantId=${tenantID.value}`
        );
        QRCodeDialog.value = true;
        qrCode.value = res.data;
        // console.log(res, 'hhhh');
      } catch (error) {
        console.log(error);
      }
    };

    // const copylink = () => {
    //   selectedLink.value.input.setSelectionRange(
    //     0,
    //     selectedLink.value.input.value.length
    //   ); /* For mobile devices */
    //   selectedLink.value.input.select();

    //   /* Copy the text inside the text field */
    //   document.execCommand("copy");
    //   ElMessage({
    //     showClose: true,
    //     message: "URL Copied Successfully!",
    //     type: "success",
    //   });
    // };
    const copylink = () => {
            const textarea = document.createElement("textarea");
            textarea.value = memberlink.value;

            document.body.appendChild(textarea);

            textarea.select();
            textarea.setSelectionRange(0, 99999);

            document.execCommand("copy");
            document.body.removeChild(textarea)

            ElMessage({
                showClose: true,
                message: "URL Copied Successfully!",
                type: "success",
            });
        };

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
    });

    const importMembers = () => {
      router.push({
        name: "ImportInstruction",
        query: { query: "importpeople" },
      });
    };

    return {
      addPersonClicked,
      showAddMemberVideo,
      watchVideo,
      showAnalysis,
      tenantID,
      videoURL,
      mdAndUp,
      route,
      xsOnly,
      QRCodeDialog,
      qrCode,
      header,
      getQrCode,
      isFormPage,
      importMembers,
      memberlink,
      copylink,
      selectedLink,
      lgAndUp,
      xlAndUp,
      primarycolor,
      membershipCapacityExceeded
    };
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
.image img {
  height: 2.5rem;
}
/* .img-wrapper img{
  height: 40rem;
  width: 5px;
} */
.img-wrapper{
  width: 80%;
  box-shadow: 0px 4px 15px 0px #0000001A;

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
  transition: all 0.3s cubic-bezier(0.67, 0.01, 0.86, 0.65);
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

