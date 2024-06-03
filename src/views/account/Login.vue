<template>
  <div
    :style="{ backgroundColor: theme.bg_900, color: theme.text_900 }"
    style=" min-height: 100vh"
  >
    <div class="container-top"  :class="{ 'container-slim': lgAndUp || xlAndUp }">
      <div class="row justify-content-center" >
        <!-- <button class="col-md-12" @click="toggleTheme">Toggle Theme</button> -->
        <div class="col-md-11 px-0 col-sm-12 mt-4">
          <div class="row justify-content-between">
            <div class="col-md-5  px-0 mt-4 d-flex align-items-center">
              <div class="col-md-12 col-lg-11 px-0 d-none d-md-block">
                <div class="row">
                  <div class="col-md-12 d-flex justify-content-center">
                    <img class="col-md-6" src="../../assets/home-image.png" alt="" />
                  </div>
                  <div class="col-md-12 d-flex mt-4 justify-content-center h4">
                    <div
                      class="col-md-11 col-sm-12 text-center text-head font-weight-bold"
                    >
                      {{
                        navigatorLang === "en-US"
                          ? "Elevating Your Ministry, Empowering Your Leadership!"
                          : $t("home-content.elevating")
                      }}
                    </div>
                  </div>
                  <div class="col-md-12 mt-2 d-flex justify-content-center h5">
                    <div class="col-md-11 col-sm-12 text-center">
                      {{
                        navigatorLang === "en-US"
                          ? "Welcome to the Future of Church Management!"
                          : $t("home-content.future")
                      }}
                    </div>
                  </div>
                  <div class="col-md-12 mt-4 d-flex justify-content-center">
                    <div class="col-md-11 d-flex justify-content-center col-sm-12">
                      <span
                        ><img src="../../assets/check-icon.png" alt=""
                      /></span>
                      <span class="mt-2 ml-2">{{
                        navigatorLang === "en-US"
                          ? "Revolutionize Your Ministry"
                          : $t("home-content.revolutionize")
                      }}</span>
                    </div>
                  </div>
                  <div class="col-md-12 mt-4 d-flex justify-content-center">
                    <div class="col-md-11 d-flex justify-content-center col-sm-12">
                      <span class="ml-md-4 ml-lg-5 ml-sm-2"
                        ><img src="../../assets/check-icon.png" alt=""
                      /></span>
                      <span class="mt-2 ml-2">{{
                        navigatorLang === "en-US"
                          ? "Financial Stewardship Made Simple"
                          : $t("home-content.stewarship")
                      }}</span>
                    </div>
                  </div>
                  <div class="col-md-12 mt-4 d-flex justify-content-center">
                    <div class="col-md-11 d-flex justify-content-center">
                      <span><img src="../../assets/check-icon.png" alt="" /></span>
                      <span class="mt-2 ml-2 text-right">{{
                        navigatorLang === "en-US"
                          ? "Inspire Generosity with Ease"
                          : $t("home-content.generosity")
                      }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              class="col-md-5 col-12 px-0 mt-4 d-flex justify-content-center align-items-center"
            >
              <div
                class="col-md-12 col-sm-10 col-11 p-md-4 p-lg-5"
                :style="{ backgroundColor: theme.light_primary, borderRadius: '10px' }"
              >
                <div class="logo-con mt-2">
                  <a class="logo-link"
                    ><img src="../../assets/churchplusblueLogo.png" alt="Churchplus Logo"
                  /></a>
                </div>
                <div class="header text-head mt-2">
                  {{ navigatorLang === "en-US" ? "Sign in" : $t("home-header.login") }}
                  <!-- <h1>Sign in</h1> -->
                </div>

                <div class="form-container">
                  <div class="error-div" v-if="state.showError && !state.notAUser">
                    <p class="error-message">{{ state.errorMessage }}</p>
                  </div>

                  <div class="error-div" v-if="state.notAUser">
                    <p class="error-message">
                      Not a registered user,
                      <a
                        href="/register"
                        class="primary-text font-weight-bold text-decoration-none"
                        >Register now</a
                      >
                    </p>
                  </div>
                  <el-form :model="state" class="mt-3" @keyup.enter="login">
                    <el-form-item>
                      <div>
                        {{
                          navigatorLang === "en-US"
                            ? "Email"
                            : $t("loginContent.labels.email")
                        }}
                      </div>
                      <el-input
                        type="email"
                        placeholder="Email"
                        v-model="state.credentials.userName"
                        :prefix-icon="Message"
                      />
                    </el-form-item>
                    <el-form-item>
                      <div>
                        {{
                          navigatorLang === "en-US"
                            ? "Password"
                            : $t("loginContent.labels.password")
                        }}
                      </div>
                      <el-input
                        type="password"
                        placeholder="Password"
                        v-model="state.credentials.password"
                        :prefix-icon="Lock"
                        show-password
                      />
                    </el-form-item>
                    <div class="f-password-div">
                      <router-link
                        to="/forgotpassword"
                        class="forgot-password primary--text"
                        >{{
                          navigatorLang === "en-US"
                            ? "Forgot password?"
                            : $t("loginContent.forgot-it")
                        }}</router-link
                      >
                    </div>
                    <el-form-item>
                      <el-button
                        size="large"
                        :color="primarycolor"
                        @click="login"
                        class="w-100"
                        :loading="signInLoading"
                        round
                      >
                        {{
                          navigatorLang === "en-US" ? "Sign in" : $t("home-header.login")
                        }}
                      </el-button>

                      <!-- <div
                        class="google-btn btn-logo mt-4 sign-in-btn"
                        @click="facebookLogin"
                      >
                        <img
                          src="../../assets/small-google.png"
                          class="ggle-icon"
                          alt="Facebook Icon"
                        />
                        <span>Sign in with Google</span>
                        <span></span>
                      </div> -->
                      <!-- <div class="facebook-btn btn-logo sign-in-btn" @click="facebookLogin">
                      <img src="../../assets/facebook-small.png" class="fb-icon" alt="Facebook Icon" />
                      <span>Sign in with Facebook</span>
                      <span></span>
                    </div> -->
                    </el-form-item>
                    <!-- <el-form-item class="row"> -->

                    <!-- <div class="col-sm-6 col-12 mt-2 mt-sm-0 d-flex justify-content-center   justify-content-sm-end  ">
                    <a class="text-decoration-none apple-store" target="_blank" href="https://www.apple.com/safari/">
                      <img src="../../assets/mobileonboarding/app-store-logo.png" alt="">
                    </a>
                  </div> -->
                    <!-- </el-form-item> -->
                  </el-form>

                  <div
                    class="bottom-container row justify-content-center"
                    :style="{ color: theme.type == 'light' ? '#4d6575' : '#FFFFFF' }"
                  >
                    <div class="col-md-11 justify-content-center d-flex">
                      <div class="sign-up-prompt">
                        {{
                          navigatorLang === "en-US"
                            ? "New to Churchplus?"
                            : $t("loginContent.no-account-yet")
                        }}
                        &nbsp;
                      </div>
                      <router-link
                        to="/register"
                        class="sign-up"
                        :style="{ color: theme.type == 'light' ? '#343a40' : '#FFFFFF' }"
                        ><strong>{{
                          navigatorLang === "en-US"
                            ? "Create an account"
                            : $t("loginContent.signup-btntext")
                        }}</strong>
                      </router-link>
                    </div>

                    <!-- <div class="mt-2">
                    <router-link to="/register" class="sign-up primary--text text-decoration-none"><el-button
                        color="#17c5cf" class="w-50" round><strong>{{ navigatorLang === "en-US" ? "Sign up now" :
                      $t('loginContent.signup-btntext') }}</strong>
                      </el-button></router-link>
                  </div> -->
                  </div>
                  <!-- <div class="row">
              <el-divider>
                Download the App
              </el-divider>
              <div class="col-md-12 col-12 d-flex justify-content-center   ">
                <a class="text-decoration-none googleplay  " target="_blank"
                  href="https://play.google.com/store/apps/details?id=com.complustech.co">
                  <img src="../../assets/mobileonboarding/Google-play-logo.png" alt="">
                </a>
              </div>
            </div> -->
                </div>

                <el-dialog
                  v-model="displayModal"
                  title="Please enter your email"
                  width="80%"
                  align-center
                >
                  <div class="container">
                    <div class="row mt-2">
                      <div class="col-12"></div>
                      <div class="col-sm-2 align-self-center">
                        Email <span class="text-danger">*</span>
                      </div>
                      <div class="col-sm-10">
                        <el-input
                          type="text"
                          label="Email"
                          v-model="invalidEmailObj.email"
                        />
                      </div>
                    </div>
                  </div>
                  <template #footer>
                    <span class="dialog-footer">
                      <el-button
                        @click="displayModal = false"
                        class="secondary-button"
                        round
                        >Cancel</el-button
                      >
                      <el-button
                        type="primary"
                        @click="saveEmail"
                        :loading="emailLoading"
                        :color="primarycolor"
                        round
                      >
                        Confirm
                      </el-button>
                    </span>
                  </template>
                </el-dialog>
              </div>
            </div>
          </div>
        </div>

        <!-- <el-button @click="sendError">Clicked</el-button> -->
      </div>
    </div>
  </div>
</template>

<script>
import axios from "@/gateway/backendapi";
import deviceBreakpoint from "../../mixins/deviceBreakpoint";
import axio from "axios";
import { ElNotification } from "element-plus";
import { reactive, ref, inject, watch } from "vue";
import router from "../../router/index";
import setupService from "../../services/setup/setupservice";
import { useGtag } from "vue-gtag-next";
import FBlogin from "@/mixins/facebookLogin";
import { Message, Lock } from "@element-plus/icons-vue";
import { useI18n } from "vue-i18n";
import { SUPPORT_LOCALES as supportLocales, setI18nLanguage } from "../../i18n";
import { useTheme } from "../../theme/ThemeProvider";
// import * as Sentry from '@sentry/vue'

export default {
  setup() {
    const { event } = useGtag();
    const { mdAndUp, lgAndUp, xlAndUp, xsOnly } = deviceBreakpoint();
    const { theme, toggleTheme } = useTheme();
    const track = () => {
      event("aaa", {
        event_category: "login",
        event_label: "ccc",
      });
    };
    track();
    const signInLoading = ref(false);
    const navigatorLang = ref(navigator.language);
    const primarycolor = inject("primarycolor");

    const state = reactive({
      passwordType: "password",
      credentials: {},
      showError: false,
      errorMessage: "",
      notAUser: false,
    });
    const loading = ref(false);
    const {
      facebookLogin,
      displayModal,
      saveEmail,
      emailLoading,
      invalidEmailObj,
    } = FBlogin();

    const sendError = () => {
      // Dialogg.seen
      // Sentry.captureMessage('Button clicked')
      // Sentry.captureMessage('Button clicked');
    };
    const { locale } = useI18n({ useScope: "global" });
    watch(locale, (val) => {
      setI18nLanguage(val);
    });

    const login = async () => {
      signInLoading.value = true;
      localStorage.setItem("email", state.credentials.userName);
      state.showError = false;
      state.notUser = false;
      // Sentry.captureMessage('Login Button Clicked')
      try {
        loading.value = true;
        const res = await axios.post("/login", state.credentials);
        const { data } = res;
        // Sentry.captureMessage(JSON.stringify(data), 'Login Response')
        signInLoading.value = false;
        if (!data || !data.token) {
          router.push({
            name: "EmailSent",
            params: { email: state.credentials.userName },
          });
          return false;
        }
        localStorage.setItem("token", data.token);
        localStorage.setItem("expiryDate", data.expiryTime);
        localStorage.setItem("roles", JSON.stringify(data.roles));
        if (data.roles.length > 0) {
          let roleIndex = data.roles.findIndex((i) => {
            return i.toLowerCase() == "family" || i.toLowerCase() == "mobileuser";
          });

          let adminIndex = data.roles.findIndex((i) => {
            return i.toLowerCase() == "admin";
          });

          let basicUserIndex = data.roles.findIndex((i) => {
            return i.toLowerCase() == "basicuser";
          });

          if (adminIndex !== -1) {
            setTimeout(() => {
              setupService.setup();
            }, 5000);
            {
              if (data.churchSize > 0) {
                router.push("/tenant");
              } else {
                router.push("/next");
              }
            }
          } else if (
            adminIndex === -1 &&
            roleIndex !== -1 &&
            basicUserIndex === -1 &&
            roleIndex !== -1
          ) {
            localStorage.clear();
            ElNotification({
              title: "Unauthorized",
              message: "You do not have access to this page, contact your church admin",
              type: "error",
            });
          } else {
              if (data.roles.indexOf("GroupLeader") !== -1) {
                router.push({
                  name: "GroupLeaderDashboard",
                });
              } else if (data.roles.length === 1 && data.roles[0] === "FollowUp") {
                router.push("/tenant/followup");
              } else if (data.roles.indexOf("FinancialAccount") !== -1) {
                router.push("/tenant/offering");
              } else if (data.roles.indexOf("MobileAdmin") !== -1) {
                router.push("/tenant/social");
              } else if (data.roles.indexOf("Reports") !== -1) {
                router.push("/tenant/reports");
              } else {
                if (data.churchSize > 0) {
                  router.push("/tenant");
                } else {
                  router.push("/next");
                }
              }
            setTimeout(() => {
              setupService.setup();
            }, 5000);
          }
        }
        loading.value = false;
      } catch (err) {
        // Sentry.captureMessage(err, 'Login Error Response')
        /*eslint no-undef: "warn"*/
        signInLoading.value = false;
        console.log(err, "login error");
        NProgress.done();
        loading.value = false;
        const { status } = err.response;
        const { onboarded } = err.response.data;

        if (status && status == 400 && onboarded === false) {
          router.push("/onboarding");
        } else {
          if (status === 404) {
            state.notAUser = true;
          } else {
            state.errorMessage = err.response.data.message;
          }
          state.showError = true;
        }
      }
    };

    return {
      signInLoading,
      navigatorLang,
      state,
      login,
      mdAndUp,
      lgAndUp,
      xlAndUp,
      xsOnly,
      loading,
      Message,
      Lock,
      displayModal,
      invalidEmailObj,
      emailLoading,
      facebookLogin,
      saveEmail,
      primarycolor,
      sendError,
      theme,
      toggleTheme,
    };
  },
};
</script>

<style scoped>
.logo-con {
  display: flex;
  /* margin-top: 24px; */
}

.logo-link {
  width: 100%;
  /* text-align: center; */
}

.logo-link img {
  width: 8rem;
  height: 5rem;
}

.header {
  font-size: 32px;
  font-weight: 500;
  /* color: #1d2939; */
}

.main-section {
  /* max-width: 400px; */
  /* margin: auto; */
  padding: 10px;
}

.apple-store img {
  width: 170px;
  cursor: pointer;
  height: 3.4rem;
}

.googleplay img {
  width: 170px;
  cursor: pointer;
}

.input {
  /* font-family: Averta,sans-serif; */
  color: #1c252c;
  font-weight: normal;
  width: 100%;
  box-sizing: border-box;
  border-radius: 4px;
  padding: 8px 10px 6px;
  min-height: 40px;
  appearance: none;
  outline: none;
  vertical-align: middle;
  transition: border 0.1s linear;
  border: 1px solid #b2c2cd;
  margin: 4px 0;
}

.forgot-password {
  /* font-family: Averta,sans-serif; */
  font-size: 14px;
  line-height: 1.4;
  text-decoration: none;
  font-weight: bold;
  cursor: pointer;
}

.input::placeholder {
  font-style: italic;
  font-weight: 600;
  color: #b2c2cd;
  letter-spacing: 1.5px;
}

.f-password-div {
  margin-bottom: 8px;
}

.submit-btn {
  background: #136acd;
  outline: none;
}

.submit-btn:hover {
  cursor: pointer;
}

.sign-in-btn {
  color: #fff;
  border: 1px solid transparent;
  margin-top: 8px;
  width: 100%;
  padding: 8px 8px;
  box-sizing: border-box;
  text-align: center;
  min-width: 100px;
  border-radius: 500px;
  vertical-align: middle;
  text-decoration: none;
  appearance: none;
  font-weight: 500;
  font-size: 16px;
  outline: none;
}

.input:focus {
  box-shadow: 0 0 0 3px rgba(19, 106, 205, 0.2);
}

/* .input:not(:focus) {
  font-style: italic;
   color: #b2c2cd;
   letter-spacing: 1.5px;
} */

.or {
  display: flex;
  flex-direction: row;
  color: #8b9ba5;
}

.or:before,
.or:after {
  content: "";
  flex: 1 1;
  border-bottom: 1px solid #8b9ba5;
  margin: auto;
}

.or:before {
  margin-right: 10px;
}

.or:after {
  margin-left: 10px;
}

.google-btn {
  background: #4285f4;
}

.facebook-btn {
  background: #3b5998;
  cursor: pointer;
}
.google-btn {
  background: #475467;
  cursor: pointer;
}

.fb-icon {
  background: #fff;
  padding: 0.23rem 0.6rem;
  border-radius: 50%;
  margin: 0.25rem;
}
.ggle-icon {
  background: #fff;
  padding: 0.2rem 0.23rem;
  border-radius: 50%;
  margin: 0.25rem;
}

.btn-logo {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1px;
}

.bottom-container {
  text-align: center;
  font-size: 14px;
  line-height: 1.4;
  margin-top: 10px;
}

.sign-up {
  text-decoration: underline;
}

.error-div {
  background: #fff8f8;
  border-color: #ffe9e9;
  padding: 10px 5px;
  margin-bottom: 24px;
  border-radius: 8px;
  border: 1px solid transparent;
  border-left: 5px solid #b52626;
}

.error-message {
  color: #b52626;
  margin-bottom: 0;
}

/* ._5h0i._88va {
    background-color: #3B5998 !important;
    border: 2px solid red !important;
} */

._5h0i._88va {
  border: 2px solid red !important;
}

.fb_iframe_widget iframe {
  opacity: 0;
}

.fb_iframe_widget {
  /* background-image: url(../../assets/facebook-small.png);
      background-repeat: no-repeat;  */
  /* background: #3B5998; */
  /* border: 2px solid #3b5998; */
  border-radius: 500px;
  position: relative;
  top: -155px;
  left: 1px;
  padding: 8px;
  width: 100%;
}

@media (max-width: 273px) {
  .fb_iframe_widget {
    top: -173px;
  }
}
</style>
