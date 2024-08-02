<template>
  <div>
    <div class="container-fluid">
      <div class="d-flex flex-column flex-sm-row justify-content-sm-between">
        <div>
          <div class="text-head font-weight-bold h2 py-0 my-0 text-black">
            Social & Mobile App
          </div>
          <div class="s-18">You are in Charge!</div>
        </div>
        <div class="d-flex flex-wrap flex-sm-nowrap mt-3 mt-sm-0">
          <el-dropdown
            trigger="click"
            class="align-items-center justify-content-center w-100 d-flex ml-md-3 ml-0 default-btn py-0 m-0 border"
            style="height: 2.2rem"
          >
            <span
              class="el-dropdown-link w-100 primary--text text-center font-weight-600"
            >
              More
              <el-icon class="el-icon--right">
                <arrow-down />
              </el-icon>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>
                  <router-link
                    :to="`/tenant/social/pending`"
                    class="no-decoration fw-400 text-black"
                  >
                    <img src="../../../assets/social/Spinner.png" alt="" />
                    Pending Post
                  </router-link>
                </el-dropdown-item>
                <!-- <el-dropdown-item>
                  <router-link
                    :to="`/tenant/social/schedule`"
                    class="no-decoration fw-400 text-black"
                  >
                    <img src="../../../assets/social/Alarm.png" alt="" />
                    Schedule Post
                  </router-link>
                </el-dropdown-item> -->
                <el-dropdown-item>
                  <router-link
                    :to="`/tenant/social/category`"
                    class="no-decoration fw-400 text-black"
                  >
                    <img src="../../../assets/social/Vector.png" alt="" />
                    Post Category
                  </router-link>
                </el-dropdown-item>
                <el-dropdown-item>
                  <router-link
                    :to="`/tenant/social/post`"
                    class="no-decoration fw-400 text-black"
                  >
                    <img src="../../../assets/social/Vector.png" alt="" />
                    Create Post
                  </router-link>
                </el-dropdown-item>
                <el-dropdown-item>
                  <router-link
                    :to="`/mobileonboarding`"
                    class="no-decoration fw-400 text-black"
                  >
                    <img src="../../../assets/social/DeviceMobileSpeaker.png" alt="" />
                    Mobile App Setup
                  </router-link>
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
          <router-link :to="`/tenant/social/post`" class="text-decoration-none w-100">
            <el-button
              :color="primarycolor"
              class="ml-sm-2 ml-0 mt-2 mt-sm-0 w-100 header-btn"
              round
              >Create New Post</el-button
            >
          </router-link>
        </div>
      </div>
      <div class="row">
        <div class="col-md-7 border-radius-border-8 p-5 mt-4">
          <div class="d-flex flex-column flex-sm-row justify-content-sm-between">
            <div>
              <div class="text-head font-weight-600 h3 py-0 my-0 text-black">Feeds</div>
            </div>
            <!-- <div class="d-flex flex-wrap flex-sm-nowrap mt-3 mt-sm-0">
              <el-dropdown
                trigger="click"
                class="align-items-center justify-content-center d-flex ml-md-3 ml-0 default-btn py-0 m-0 border"
                style="height: 2.2rem"
              >
                <span
                  class="el-dropdown-link w-100 primary--text text-center font-weight-600"
                >
                  Menu
                  <el-icon class="el-icon--right">
                    <arrow-down />
                  </el-icon>
                </span>
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item>
                      <router-link
                        :to="`/tenant/social/feed`"
                        class="no-decoration fw-400 text-black"
                      >
                        <i
                          class="pi pi-microsoft text-white"
                          style="font-size: 1.5rem"
                        ></i>
                        All Platforms
                      </router-link>
                    </el-dropdown-item>
                    <el-dropdown-item>
                      <router-link
                        :to="`/tenant/social/feed/facebook`"
                        class="no-decoration fw-400 text-black"
                      >
                        <i
                          class="pi pi-facebook text-white"
                          style="font-size: 1.5rem"
                        ></i>
                        Facebook
                      </router-link>
                    </el-dropdown-item>
                    <el-dropdown-item>
                      <router-link
                        :to="`/tenant/social/feed/Twitter`"
                        class="no-decoration fw-400 text-black"
                      >
                        <i class="pi pi-twitter text-white" style="font-size: 1.5rem"></i>
                        Twitter
                      </router-link>
                    </el-dropdown-item>
                    <el-dropdown-item>
                      <router-link
                        :to="`/tenant/social/feed/instagram`"
                        class="no-decoration fw-400 text-black"
                      >
                        <i
                          class="pi pi-instagram text-white"
                          style="font-size: 1.5rem"
                        ></i>
                        Instagram
                      </router-link>
                    </el-dropdown-item>
                    <el-dropdown-item>
                      <router-link
                        :to="`/tenant/social/feed/whatsapp`"
                        class="no-decoration fw-400 text-black"
                      >
                        <i
                          class="pi pi-instagram text-white"
                          style="font-size: 1.5rem"
                        ></i>
                        Whatsapp
                      </router-link>
                    </el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
            </div> -->
          </div>
          <div class="col-md-12">
            <router-view></router-view>
          </div>
          <div class="col-md-12" v-if="route.fullPath == '/tenant/social'">
            <GeneralFeed />
          </div>
        </div>
        <div class="col-md-5">
          <div class="row justify-content-end">
            <div class="col-md-11 mt-4">
              <div class="text-head font-weight-600 h2">Overview</div>
            </div>
            <div class="col-md-11">
              <div class="row">
                <div class="col-md-6 col-12">
                  <div class="col-md-12 box1">
                    <router-link
                      to="/tenant/social/feed/facebook"
                      class="text-decoration-none text-dak"
                    >
                      <div class="row mt-3 mb-5">
                        <div class="col-md-6 text-sm-center text-center">
                          <span>
                            <img src="../../../assets/social/facebook.svg" alt="" />
                          </span>
                        </div>
                        <div class="col-md-6 per text-sm-center text-center">+0%</div>
                      </div>
                      <div class="row mt-5">
                        <div class="col-md-12 text-lg-center text-sm-center text-center">
                          <h2 class=""></h2>
                        </div>
                      </div>
                      <div class="row mb-4">
                        <div class="col-md-6 text-sm-center text-center">
                          <div>Followers</div>
                        </div>
                        <div class="col-md-6"></div>
                      </div>
                    </router-link>
                  </div>
                </div>
                <div class="col-md-6 col-12 mt-md-0 mt-4">
                  <div class="col-md-12 box1">
                    <router-link
                      to="/tenant/social/feed/instagram"
                      class="text-decoration-none text-dak"
                    >
                      <div class="row mt-3 mb-5">
                        <div class="col-md-6 text-sm-center text-center">
                          <span>
                            <img src="../../../assets/social/instagram.svg" alt="" />
                          </span>
                        </div>
                        <div class="col-md-6 per text-sm-center text-center">+0%</div>
                      </div>
                      <div class="row mt-5">
                        <div class="col-md-12 text-lg-center text-sm-center text-center">
                          <h2 class=""></h2>
                        </div>
                      </div>
                      <div class="row mb-4">
                        <div class="col-md-6 text-sm-center text-center">
                          <div>Followers</div>
                        </div>
                        <div class="col-md-6"></div>
                      </div>
                    </router-link>
                  </div>
                </div>
                <div class="col-md-6 col-12 mt-4">
                  <div class="col-md-12 box1">
                    <router-link
                      to="/tenant/social/feed/Twitter"
                      class="text-decoration-none text-dak"
                    >
                      <div class="row mt-3 mb-5">
                        <div class="col-md-6 text-sm-center text-center">
                          <span>
                            <img src="../../../assets/social/twitter.svg" alt="" />
                          </span>
                        </div>
                        <div class="col-md-6 per text-sm-center text-center">+0%</div>
                      </div>
                      <div class="row mt-5">
                        <div class="col-md-12 text-lg-center text-sm-center text-center">
                          <h2 class=""></h2>
                        </div>
                      </div>
                      <div class="row mb-4">
                        <div class="col-md-6 text-sm-center text-center">
                          <div>Followers</div>
                        </div>
                        <div class="col-md-6"></div>
                      </div>
                    </router-link>
                  </div>
                </div>
                <div class="col-md-6 col-12 mt-4">
                  <div class="col-md-12 box1">
                    <router-link
                      to="/tenant/whatsapp/auth"
                      class="text-decoration-none text-dak"
                    >
                      <div class="row mt-3 mb-5">
                        <div class="col-md-6 text-sm-center text-center">
                          <span>
                            <img src="../../../assets/social/whatsapp.svg" alt="" />
                          </span>
                        </div>
                        <div class="col-md-6 per text-sm-center text-center">+0%</div>
                      </div>
                      <div class="row mt-5">
                        <div class="col-md-12 text-lg-center text-sm-center text-center">
                          <h2 class=""></h2>
                        </div>
                      </div>
                      <div class="row mb-4">
                        <div class="col-md-6 text-sm-center text-center">
                          <div>Followers</div>
                        </div>
                        <div class="col-md-6"></div>
                      </div>
                    </router-link>
                  </div>
                </div>
                <div class="col-md-12 mt-4">
                  <div class="more-things box1 side p-3">
                    <img src="../../../assets/mobileapp2.svg" class="w-50" />
                    <div class="mt-4 can-do text-head h5 font-weight-600">Mobile App</div>
                    <div class="more-body mt-2">
                      Get a customized mobile app for your church.
                    </div>
                    <div class="no-decoration">
                      <el-button
                        class="mt-1 bg-warning text-white"
                        @click="routeToWelcomeOnboard"
                        round
                      >
                        Set up and edit Mobile App
                      </el-button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { inject } from "vue";
import GeneralFeed from "../feed/general/Index.vue";
import { useRoute } from "vue-router";
import router from "@/router/index";

const primarycolor = inject("primarycolor");
const route = useRoute();
const routeToWelcomeOnboard = () => {
  router.push({ name: "WelcomeOnboarding1" });
};
</script>

<style scoped>
.header1 {
  text-align: left;
  letter-spacing: 0px;
  color: #02172e;
  opacity: 1;
}
/* .empty-img {
  width: 30%;
  min-width: 397px;
  margin: auto;
} */

.empty-img img {
  width: 100%;
  max-width: 200px;
}
.box1 {
  background: #ffffff;
  box-shadow: 0px 4px 4px 0px #0000000d;
  border: 1px solid #cbcbcb;
  border-radius: 12px;
}
.box1:hover {
  background: #f0f0f0;
  box-shadow: 0px 4px 4px 0px #0000000d;
  border: 1px solid #cbcbcb;
  border-radius: 12px;
}
.per {
  letter-spacing: 0px;
  color: #50ab00;
  opacity: 1;
}
.range {
  letter-spacing: 0px;
  color: #02172e;
  opacity: 1;
}
.post {
  width: 100%;
  height: auto;
  background: #1369cd 0% 0% no-repeat padding-box;
  border-radius: 10px;
  opacity: 1;
}
.like {
  background: #f8f8fa 0% 0% no-repeat padding-box;
  border-radius: 10px;
  opacity: 1;
}
.num {
  letter-spacing: 0px;
  color: #020f1e;
  opacity: 1;
}
.tot {
  letter-spacing: 0px;
  color: #020f1e;
  opacity: 0.6;
}
.las {
  letter-spacing: 0px;
  color: #ffffff;
  opacity: 1;
}
.para1 {
  letter-spacing: 0px;
  color: #fefeff;
  opacity: 1;
}
.header3 {
  text-decoration: underline;
  letter-spacing: 0px;
  color: #fefeff;
  opacity: 1;
}
.num4 {
  letter-spacing: 0px;
  color: #fefeff;
  opacity: 1;
}
.calendar1 {
  background-color: #f7f7f9 !important;
  /* color: white!important; */
}
.time1 {
  background: #f7f7f9 0% 0% no-repeat padding-box;
  border-radius: 29px;
  opacity: 1;
  padding-top: 10px;
  padding-left: 5px;
  padding-right: 0px;
  padding-bottom: 5px;
}

.more-things {
  text-align: center;
  letter-spacing: 0px;
  color: #111111;
}

.more-body {
  text-align: center;
  letter-spacing: 0px;
  color: #111111;
}

.more-things.side {
  border-radius: 15px;
  opacity: 1;
}
</style>
