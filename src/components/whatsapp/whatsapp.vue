<template>
  <div>
    <div class="container p-0">
      <div class="row mt-4">
        <div class="col-md-12">
          <h2 class="font-weight-bold text-white position-absolute mt-3 ml-4">
            Whatsapp
          </h2>
          <img src="../../assets/whatsappbg.svg" class="w-100" />
        </div>
      </div>

      <!-- Content Box -->
      <main id="main" class="mt-3" v-loading="logoutLoading" element-loading-text="Hang on while we log you out.">
        <div class="container-fluid">
          <div class="row" style="min-height: 75vh">
            <!-- Side mennu -->
            <div class="col-md-3" id="side-menu">
              <div class="row">
                <div class="col-md-12 d-flex justify-content-center mt-4 mb-5">
                  <div class="ml-3 mt-2 toggle">
                    <i class="pi pi-bars" @click="toggleMenu"></i>
                  </div>
                  <router-link to="/tenant/whatsapp" v-if="whatsappClientState"
                    class="btn compose-btn border-0 font-weight-bold default-btn border-none">Compose
                    Whatsapp</router-link>
                  <router-link to="" v-else
                    class="btn compose-btn border-0 font-weight-bold default-btn border-none">Connect
                    Whatsapp</router-link>
                </div>
              </div>
              <div class="row mb-3" :class="{ show: menuShouldShow, 'links-menu': !menuShouldShow }">
                <div class="col-md-12">
                  <!-- <div
                    class="row menu-item-con py-2"
                    :class="{
                      'active-link': route.path.includes('/tenant/sms/sent'),
                    }"
                    v-if="whatsappClientState"
                  >
                    <div class="col-md-12 menu-item-div m-auto">
                      <a class="btn btn-default font-weight-bold">
                        <span class="menu-item">
                          <router-link
                            class="r-link text-decoration-none"
                            to="/tenant/sms/sent"
                          >
                            <i class="pi pi-arrow-circle-up mr-3 menu-icon"></i>
                            <span class="active">Sent</span>
                          </router-link>
                        </span>
                      </a>
                    </div>
                  </div> -->

                  <!-- <div
                    class="row menu-item-con py-2"
                    :class="{
                      'active-link': route.path === '/tenant/sms/scheduled',
                    }"
                    v-if="whatsappClientState"
                  >
                    <div class="col-md-12 menu-item-div m-auto">
                      <a class="btn btn-default font-weight-bold">
                        <span class="menu-item">
                          <router-link
                            class="r-link text-decoration-none"
                            to="/tenant/whatsapp/scheduledmessages"
                          >
                            
                            <i class="pi pi-clock mr-3 menu-icon" aria-hidden="true"></i>
                            <span class="active">Scheduled</span>
                          </router-link>
                        </span>
                      </a>
                    </div>
                  </div> -->
                  <div class="row menu-item-con py-2" v-if="!whatsappClientState">
                    <div class="col-md-12 menu-item-div m-auto">
                      <a class="btn btn-default font-weight-bold">
                        <span class="menu-item">
                          <img src="../../assets/greyoutlinewhatsapp.svg" class="mr-3" width="22" />
                          <span class="active">Not connected</span>
                        </span>
                      </a>
                    </div>
                  </div>
                  <div class="row menu-item-con py-2" v-else>
                    <div class="col-md-12 menu-item-div m-auto">
                      <a class="btn btn-default font-weight-bold">
                        <span class="menu-item">
                          <img src="../../assets/utlinewhatsapp.svg" class="mr-3" width="22" />
                          <span style="color: #078e2d">Connected</span>
                          <span>
                            <img src="../../assets/checkvector.svg" class="ml-3" width="20" />
                          </span>
                        </span>
                      </a>
                    </div>
                  </div>
                  <div class="row menu-item-con py-2" v-if="whatsappClientState">
                    <div class="col-md-12 menu-item-div m-auto">
                      <a class="btn btn-default font-weight-bold" @click="confirmLogout">
                        <span class="menu-item">
                          <img src="../../assets/logouticon.png" class="mr-3" width="22" />
                          <span class="active">Logout</span>
                        </span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Bigger row -->
            <div class="col-md-9 col-xl-8" style="margin: auto">
              <router-view> </router-view>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import { ref, computed } from "@vue/reactivity";
import { useRoute } from "vue-router";
import store from "../../store/store";
import swal from 'sweetalert';
import { whatsappServerBaseURL } from "../../gateway/backendapi";
import api from "axios";
import router from "../../router";

export default {
  setup() {
    const route = useRoute();
    const menuShouldShow = ref(false);
    const sessionId = ref("");
    const logoutLoading = ref(false)
    const toggleMenu = () => {
      menuShouldShow.value = !menuShouldShow.value;
    };

    const clientSessionId = computed(() => {
      if (!store.getters["communication/whatsappSessionId"]) return ""
      return store.getters["communication/whatsappSessionId"]
    })

    const whatsappClientState = computed(() => {
      return store.getters["communication/isWhatsappClientReady"];
    });

    const confirmLogout = () => {
      swal({
        title: "Are you sure?",
        text: "You are about to log out your whatsapp session. Continue?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
        .then((willDelete) => {
          if (willDelete) {
            logoutWhatsappSession()
          }
        });
    }

    const logoutWhatsappSession = async () => {
      logoutLoading.value = true;
      try {
        let { data } = await api.delete(`${whatsappServerBaseURL}instance/logout?key=${clientSessionId.value}`);
        console.log(data)
        logoutLoading.value = false;
        if (!data.error) {
          store.dispatch("communication/isWhatsappClientReady", false);
          router.push("/tenant/whatsapp/auth");
        }
      } catch (error) {
        logoutLoading.value = false;
        console.error(error);
      }
    }

    return {
      route,
      toggleMenu,
      menuShouldShow,
      whatsappClientState,
      logoutWhatsappSession,
      sessionId,
      confirmLogout,
      clientSessionId,
      logoutLoading
    };
  },
};
</script>

<style scoped>
.toggle {
  display: none;
  width: 20px;
  text-align: center;
  position: absolute;
  top: -40px;
  left: 4px;
  font-size: 30px;
}

.toggle:hover {
  cursor: pointer;
}

#main {
  border: 1px solid #02172e30;
  border-radius: 30px;
}

#side-menu {
  border-right: 1px solid #02172e30;
}

.search-div {
  width: fit-content;
  padding: 10px;
  background: #f5f8f9;
  border-radius: 200px;
}

.search-div input {
  background: none;
  border: none;
  outline: transparent;
}

.brief-message {
  color: #4762f0;
}

.compose-btn {
  background: #136acd;
  box-shadow: 0px 6px 12px #708eb170;
  border-radius: 22px;
  color: #fff;
  height: 42px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.menu-icon {
  font-size: 20px;
}

.units-div {
  border: 1px solid #dde2e6;
  border-radius: 20px;
  padding: 15px 0;
}

.hidden-header {
  display: none;
}

.th {
  font-size: 12px;
  font-weight: 700;
}

.inbox-count {
  background: rgba(19, 106, 205, 0.3);
  padding: 4px 8px;
  border-radius: 22px;
}

.menu-item-con {
  color: #002044;
}

.active {
  opacity: 0.5;
}

.active-link {
  background: rgba(19, 106, 205, 0.05);
  border-left: 2px solid #136acd;
}

.router-link-exact-active .active {
  opacity: 1 !important;
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

.timestamp {
  font-size: 14px;
  color: #333333;
  opacity: 0.5;
}

.view-btn {
  background: #ebeff4;
  border-radius: 21px;
  padding: 4px 18px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
}

.r-link {
  color: #002044;
}

.router-link-exact-active i {
  color: #136acd;
  opacity: 1;
}

@media screen and (max-width: 765px) {
  .toggle {
    display: block;
  }

  .show {
    overflow: hidden;
    height: 270px;
    transition: all 0.5s cubic-bezier(0.645, 0.045, 0.355, 1);
  }

  .links-menu {
    height: 0;
    overflow: hidden;
    transition: all 0.5s cubic-bezier(0.645, 0.045, 0.355, 1);
  }
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
}

@media (min-width: 768px) and (max-width: 991px) {
  .compose-btn {
    font-size: 0.8em;
  }
}

@media screen and (max-width: 1000px) {
  .msg-n-time {
    flex-direction: column;
    margin-bottom: 8px;
  }
}

@media screen and (min-width: 1000px) {
  #menu-items {
    min-width: 100% !important;
  }
}

@media screen and (min-width: 1300px) {
  .menu-item-div {
    padding-left: 40px;
  }
}
</style>
