<template>
  <div>
    <div class="main ">
      <div class="greeting " :class="{ box1: processing }">
        <div class="welcome-onboard">
          <div class="welcome-intro p-5 rounded ml-4 ">
            <div v-if="!processing">
              <div class="h2 text-head font-weight-600">{{ navigatorLang === "en-US" ? 'Hey' :
        $t('startingPointContent.hey') }} {{ userDetails.firstName ?
        userDetails.firstName : "" }} <span><img class="" style="height: 1.5rem; width: 1.5rem"
                    src="../../assets/verifyIcon.png" alt=""></span></div>
              <h2>{{ navigatorLang === "en-US" ? 'Get started with our amazing features' :
        $t('startingPointContent.what-to-do-in-ch') }}</h2>
            </div>
          </div>
        </div>
      </div>

      <div class="options-div " :class="{ box2: processing }">
        <div class="options-container" v-if="screenWidth > 990 || !processing">
          <div class="step-count font-weight-600 text-head mt-4">
            <div>{{ navigatorLang === "en-US" ? 'Step 2 of 2' : $t('startingPointContent.step') }}</div>
          </div>

          <div class="start-text text-head font-weight-600  hidden-sm-and-down">
            <h2>{{ navigatorLang === "en-US" ? 'Choose a Starting Point' : $t('startingPointContent.starting-point') }}
            </h2>
          </div>

          <div class="more-later  hidden-sm-and-down">
            <span class="h5" style="font-weight: 300;">{{ navigatorLang === "en-US" ? 'You can do more later' :
        $t('startingPointContent.do-more') }}</span>
          </div>

          <div class="start-text hidden-md-and-up">
            <h2>{{ navigatorLang === "en-US" ? 'Hey' : $t('startingPointContent.hey') }} {{ userDetails.firstName ?
        userDetails.firstName : "" }}<span><img class="" style="height: 1.5rem; width: 1.5rem"
                  src="../../assets/verifyIcon.png" alt=""></span></h2>
          </div>

          <div class="more-later hidden-md-and-up">
            <span>{{ navigatorLang === "en-US" ? 'Get started with our amazing features' :
        $t('startingPointContent.what-to-do-in-ch') }} </span>
          </div>

          <div class="all-options">
            <router-link :to="{ name: 'WelcomeOnboarding1', params: { option: '/mobileonboarding' } }"
              class="start-option">
              <div class="icon  d-flex justify-content-center">
                <!-- <img class="" src="../../assets/dashboardlinks/com-icon.svg" alt="Sms Icon" /> -->
                <el-icon :size="25" class="text-white"><Iphone /></el-icon>
              </div>
              <div class="link-n-icon">
                <a class="start-link "> {{ navigatorLang === "en-US" ? 'Church Mobile App Setup' :
        $t('startingPointContent.churchMobile') }} </a>
                <!-- <a class="start-link">{{ navigatorLang === "en-US" ? 'Send Email/SMS' :
        $t('startingPointContent.send-email-sms') }}</a> -->
                <!-- <p class="my-auto"><i class="fas fa-angle-right"></i></p> -->
              </div>
            </router-link>
            <div class="w-100 ">
              <div class="start-option offer-bg" @click="showOfferModal">
                <span class=" offer-image">
                  <img class="link-icon" src="../../assets/offerImage.png" alt="Sms Icon" />
                </span>
                <span class="font-weight-bold">
                  <a class="start-link ">{{ navigatorLang === "en-US" ? 'Claim Free 500 units now!' :
        $t('startingPointContent.claim-unit') }}</a>
                </span>
                <span class="d-flex justify-content-end font-weight-bold adjust-width">
                  <!-- <i class="fas fa-angle-down "></i> -->
                  <!-- <i class="fas fa-angle-right" :class="{ 'tbb-icon-rotate': smsOfferDropped }"></i> -->
                </span>
                <!-- Dropdown List<el-icon class="el-icon--right"><arrow-down /></el-icon> -->
              </div>
            </div>
            <router-link :to="{ name: 'ProcessRequest', params: { option: '/tenant/sms/compose' } }"
              class="start-option">
              <div class="icon">
                <img class="link-icon" src="../../assets/ChatCircleDots.png" alt="Sms Icon" />
              </div>
              <div class="link-n-icon">
                <a class="start-link">{{ navigatorLang === "en-US" ? 'Send Email/SMS' :
        $t('startingPointContent.send-email-sms')
                  }}</a>
              </div>
            </router-link>

            <router-link class="start-option"
              :to="{ name: 'ProcessRequest', params: { option: '/tenant/people/add' } }">
              <div class="icon">
                <img class="link-icon link-icon-no-bg" src="../../assets/Users.png"
                  alt="Add member Icon" />
              </div>
              <div class="link-n-icon">
                <a class="start-link">{{ navigatorLang === "en-US" ? 'Add church members' :
        $t('startingPointContent.add-ch-members') }}</a>
                <!-- <p class="my-auto"><i class="fas fa-angle-right"></i></p> -->
              </div>
            </router-link>

            <router-link class="start-option" :to="{
        name: 'ProcessRequest',
        params: { option: '/tenant/people/addfirsttimer' },
      }">
              <div class="icon">
                <img class="link-icon" src="../../assets/UserPlus.png" alt="First Timers Icon" />
              </div>
              <div class="link-n-icon">
                <a class="start-link">{{ navigatorLang === "en-US" ? 'Add first timers' :
        $t('startingPointContent.add-fst-timers')
                  }}</a>
                <!-- <p class="my-auto"><i class="fas fa-angle-right"></i></p> -->
              </div>
            </router-link>

            <router-link class=" d-flex justify-content-center w-100 mt-5" :to="{ name: 'ProcessRequest', params: { option: '/next' } }">
              
              <div class="link-n-icon">
                <a class="start-link">{{ navigatorLang === "en-US" ? 'Not sure yet?' : $t('startingPointContent.not-yet')
                  }} <span><u>Skip for now</u></span> </a>
              </div>
            </router-link>
          </div>
        </div>
      </div>
    </div>
    <div class="logo">
      <!-- <img src="../../assets/churchplus-logo.png" alt="" /> -->
      <img class="w-100" src="../../assets/churchplusblueLogo.png" alt="Churchplus Logo" />
    </div>
    <el-dialog class="" style="border-radius: 25px;" v-model="displayOfferModal" title=""
      :width="mdAndUp || lgAndUp || xlAndUp ? `50%` : `90%`">
      <div class="row justify-content-center ">
        <div class="col-md-10 col-11  mt-4 h-100 bg-white mb-5">
          <div class="row justify-content-center align-items-center">
            <div class="col-md-10 d-flex justify-content-center">
              <div class="col-md-3 col-5 col-sm-3 ">
                <img class="w-100" src="../../assets/offerImage.png" alt="Sms Icon" />
              </div>
            </div>
            <div class="col-md-12  mt-2 d-flex justify-content-center">
              <div class="col-md-7 col-12 col-sm-8">
                <div class="text-font font-weight-600 col-md-12 col-12 px-0 h4 text-center" style="color: #03063F;">
                  {{ navigatorLang === "en-US" ? "Easy Steps to Claiming Free 500 units now!" :
        $t('startingPointContent.easySteps') }}
                </div>
                <div class="text-font col-md-12 col-12 px-0   " style="color: #111111;">
                  {{ navigatorLang === "en-US" ? "1. Buy NGN 1,000 Worth of SMS" : $t('startingPointContent.stepOne') }}
                </div>
                <div class="text-font  col-md-12 col-12 px-0 " style="color: #111111;">
                  {{ navigatorLang === "en-US" ? '2. Offer is open to both new and existing customers' :
        $t('startingPointContent.existing-customers') }}
                </div>
                <div class="text-font  col-md-12 col-12 px-0  " style="color: #111111;">
                  {{ navigatorLang === "en-US" ? '3. This is a one time offer for the duration of this campaign' :
        $t('startingPointContent.one-time-offer') }}
                </div>
              </div>
            </div>
            <div class="col-md-12 my-3 d-flex justify-content-center align-items-center ">
              <div class="col-md-6  ">
                <router-link :to="{ name: 'BuyUnits', params: { option: '/tenant/units' } }"
                  class="d-flex justify-content-between  text-decoration-none font-weight-bold w-100 align-items-center">
                  <el-button  :color="primarycolor" size="large" class="w-100" round>{{
                    navigatorLang
                    === "en-US" ? 'Buy SMS Units now' : $t('startingPointContent.buy-sms')
                    }}</el-button>
                </router-link>
                <!-- <el-button @click="verifyEmail" :color="primarycolor" size="large" class="w-100" round>{{ navigatorLang
                  ===
                  "en-US" ? "Continue" : $t('onboardingContent.continue') }}</el-button> -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import axios from "@/gateway/backendapi";
import { ref, watch, inject } from "vue";
import { useI18n } from 'vue-i18n';
import deviceBreakpoint from "../../mixins/deviceBreakpoint";
import { SUPPORT_LOCALES as supportLocales, setI18nLanguage } from '../../i18n';

export default {
  beforeRouteEnter(to, from, next) {
    if (localStorage.getItem("userSetup")) return next("/");
    return next(true);
  },

  setup() {

    const navigatorLang = ref(navigator.language);
    const { mdAndUp, lgAndUp, xlAndUp, xsOnly } = deviceBreakpoint()
    const displayOfferModal = ref(false)
    const primarycolor = inject('primarycolor')
    const { locale } = useI18n({ useScope: 'global' });
    watch(locale, (val) => {
      setI18nLanguage(val);

    });

    const showOfferModal = () => {
      displayOfferModal.value = true
    }

    return {
      navigatorLang,
      displayOfferModal,
      mdAndUp, lgAndUp, xlAndUp, xsOnly,
      showOfferModal,
      primarycolor
    }
  },

  data() {
    return {
      smsOfferDropped: false,
      processing: false,
      screenWidth: window.innerWidth,
      userId: "",
      userDetails: {},
    };
  },

  methods: {
    toggleSmsOffer() {
      this.smsOfferDropped = !this.smsOfferDropped;
    },
    onboardUser(url) {
      const userData = this.$store.getters.onboardingData;
      axios
        .post("/api/onboarding", userData)
        .then((res) => {
          console.log(res, "onboarding response");
          localStorage.setItem("token", res.data.token);
          this.$store.dispatch("setStartPoint", url);
          this.$router.push("/processing");
        })
        .catch((err) => {
          console.log(err.response);
        });
    },

    onResize() {
      this.screenWidth = window.innerWidth;
    },
  },

  async created() {
    this.userDetails = this.$store.getters.onboardingData;
  },

  mounted() {
    this.$store.dispatch("setUserUp", true);
    this.$nextTick(() => {
      window.addEventListener("resize", this.onResize);
    });
  },
};
</script>

<style scoped>
.tbb-icon-rotate {
  transition: all 0.5s ease-in-out;
  transform: rotate(90deg);
  color: #190138;
  font-size: 20px;
}

.main {
  position: relative;
  /* height: 100vh; */
  display: flex;
}

a {
  text-decoration: none;
}

.logo {
  position: absolute;
  top: 30px;
  left: 30px;
}

.logo img {
  width: 4rem;
  height: 4rem
}

.greeting {
  width: 55%;
  transition: all 0.7s ease-in-out;
}

.options-div {
  width: 45%;
  background-image: -webkit-linear-gradient(top, #3362c9 0%, #582994 100%);
  transition: all 0.7s ease-in-out;
  height:  100vh;
}

.welcome-onboard {
  min-height: 100%;
  display: flex;
  align-items: center;
}

.welcome-intro {
  max-width: 92%;
  /* margin: auto; */
  background: #F7F9FD;
  border-radius: 10px;
  color: #111111;


}

.welcome-intro h2 {
  color: #111111;
  font-weight: 300;
  /* margin-top: 0; */
  font-size: 24px;
  opacity: 0.6;

}

.start-text,
.step-count {
  text-align: center;
  color: #fff;
}

.step-count {
  margin: 30px 0;
  font-size: 24px;
  opacity: 0.5;
}


.more-later {
  text-align: center;
  color: #fff;
}

.start-text h1 {
  font-size: 33px;
  font-weight: bold;
}

.start-text h2 {
  font-size: 32px;
}

.all-options {
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex-wrap: wrap;
  align-items: center;
  max-width: 407px;
  margin: 34px auto;
}

.options-container {
  padding-top: 40px;
}

.start-option {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  justify-self: center;
  width: 100%;
  /* text-align: center; */
  padding: 10px;
  margin-top: 15px;
  border-radius: 10px;
  border: 1px solid #03E5F3;
  box-sizing: border-box;
  background: #0551D2;
  height: 60px;
  /* opacity: 0.8; */
  cursor: pointer;
}

.offer-bg {
  background: #68E4FF !important;
  color: #03063F !important;


}

.offer-bg a {
  color: #03063F !important;
  padding: 0 !important;
  font-size: 600 !important;
  /* font-size: 24px; */
}

.start-option:hover {
  /* background: #fff; */
  opacity: 1;
}

.icon {
  width: 10%;
  max-width: 30px;
}

.offer-image {
  width: 30%;
  max-width: 55px;
}

/* .offer-image img {
  width: 4rem;
  max-width: 80px;
} */

.link-n-icon {
  display: flex;
  justify-content: space-between;
  width: 80%;
  align-items: center;
}

.link-icon {
  width: 100%;
}

.link-icon-no-bg {
  border-radius: 50%;
}

.start-link {
  /* font-weight: 500; */
  padding: 0 1rem;
  text-decoration: none;
  /* text-transform: capitalize; */
  color: #ffffff;
}

.claim-offer {
  font-weight: 900;
  padding: 0 1rem;
  text-decoration: none;
  text-transform: capitalize;
  color: #f39d34;
}

.loading-div {
  max-width: 400px;
  margin: auto;
  text-align: center;
  height: 100%;
  display: flex;
  align-items: center;
}

.fa-angle-right {
  font-size: 25px;
  color: #707070;
}

@media screen and (max-width: 990px) {
  .main {
    display: block;
    box-sizing: border-box;
    margin-top: -40px;
  }

  .greeting {
    display: none;
  }

  .options-div {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
  }

  .all-options {
    width: 99%;
    margin: auto;
  }

  .step-count {
    padding-top: 30px;
  }

  .logo {
    display: none;
  }

  .options-container {
    display: flex;
    flex-direction: column;
  }

  .step-count {
    order: 1;
    padding: 0;
    margin: 0;
  }

  .main {
    margin-top: 0;
  }

  .adjust-width {
    font-size: 25px;
    width: 25%;
  }
}

@media screen and (min-width: 991px) {
  .box1 {
    transform: translateX(80%);
  }

  .box2 {
    transform: translateX(-127%);
  }

  .all-options {
    max-width: 330px;
  }

  .adjust-width {
    font-size: 25px;
    width: 13%;
  }
}
</style>
