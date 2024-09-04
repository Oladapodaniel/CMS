<template>
  <div class="top-most">
    <div>
      <div id="onboarding">
        <div id="onboarding-form" :class="{ 'swap-box1': toggle }">
          <div class="onboarding-form-container">
            <div class="title-div">
              <div class="logo-con mt-2">
                <a class="logo-link"
                  ><img src="../../assets/churchplusblueLogo.png" alt="Churchplus Logo"
                /></a>
              </div>
              <div class="main-title mt-3">
                <h1>
                  {{
                    navigatorLang === "en-US"
                      ? "Welcome to Churchplus!"
                      : $t("onboardingContent.welcome-chplus")
                  }}
                </h1>
              </div>
              <div class="sub-title">
                <p>
                  {{
                    navigatorLang === "en-US"
                      ? "Let us know more about you"
                      : $t("onboardingContent.about-ch")
                  }}
                </p>
              </div>
            </div>
            <el-form
              ref="ruleFormRef"
              :rules="rules"
              :model="userDetails"
              style="width: 100%"
            >
              <div class="input-div">
                <label class="mb-0"
                  >{{
                    navigatorLang === "en-US"
                      ? "What's your name?"
                      : $t("onboardingContent.labels.ur-name")
                  }}<span style="color: red"> *</span></label
                >
                <el-row :gutter="15">
                  <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
                    <el-form-item prop="firstName">
                      <el-input
                        type="text"
                        v-model="userDetails.firstName"
                        placeholder="First name"
                      />
                    </el-form-item>
                  </el-col>
                  <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
                    <el-form-item prop="lastName">
                      <el-input
                        type="text"
                        v-model="userDetails.lastName"
                        placeholder="Last name"
                      />
                    </el-form-item>
                  </el-col>
                </el-row>
              </div>

              <div class="input-div">
                <el-row :gutter="15">
                  <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                    <label class="mb-0">{{
                      navigatorLang === "en-US"
                        ? "What's the name of your ministry?"
                        : $t("onboardingContent.labels.ur-ministry")
                    }}</label>
                    <div class="w-100">
                      <el-input
                        type="text"
                        v-model="userDetails.churchName"
                        placeholder="Name of church"
                      />
                    </div>
                  </el-col>
                  <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                    <label class="mb-0 mt-md-4 mt-lg-4 mt-xl-0">{{
                      navigatorLang === "en-US"
                        ? "Church Type"
                        : $t("onboardingContent.labels.church-type")
                    }}</label>
                    <el-form-item prop="churchtype">
                      <el-select-v2
                        v-model="userDetails.categorization"
                        :options="categorization"
                        placeholder="Select church type"
                        size="large"
                        class="w-100 churchtype"
                      />
                    </el-form-item>
                  </el-col>
                </el-row>
              </div>

              <div class="input-div">
                <el-row :gutter="15">
                  <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                    <label class="mb-0"
                      >{{
                        navigatorLang === "en-US"
                          ? "Email Address"
                          : $t("onboardingContent.labels.ur-email")
                      }}<span style="color: red"> *</span></label
                    >
                    <el-form-item prop="email">
                      <el-input
                        type="email"
                        disabled
                        v-model="userDetails.email"
                        placeholder="Email"
                      />
                    </el-form-item>
                  </el-col>
                  <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                    <label class="mb-0 mt-2 mt-lg-0"
                      >{{
                        navigatorLang === "en-US"
                          ? "What's your phone number?"
                          : $t("onboardingContent.labels.ur-phone")
                      }}<span style="color: red"> *</span></label
                    >
                    <el-form-item prop="phoneNumber">
                      <vue-tel-input
                        style="height: 40px"
                        @blur="invalidResponse"
                        v-model="userDetails.phoneNumber"
                        @input="onInput"
                        mode="international"
                      ></vue-tel-input>
                    </el-form-item>
                  </el-col>
                </el-row>
              </div>

              <div class="input-div">
                <el-row :gutter="15">
                  <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                    <label class="mb-0 mt-2 mt-lg-0"
                      >{{
                        navigatorLang === "en-US"
                          ? "Select Country"
                          : $t("onboardingContent.labels.ur-country")
                      }}<span style="color: red"> *</span></label
                    >
                    <div class="w-100">
                      <el-select-v2
                        v-model="selectedCountryId"
                        :options="countries.map((i) => ({ label: i.name, value: i.id }))"
                        @change="setSelectedCountry"
                        @click="handleClick"
                        filterable
                        placeholder="Select country"
                        size="large"
                        class="w-100"
                      />
                      <!-- <el-select-v2
                        v-model="selectedCountryId"
                        :options="countries.map((i) => ({ label: i.name, value: i.id }))"
                        @change="setSelectedCountry"
                        filterable
                        placeholder="Select country"
                        size="large"
                        class="w-100"
                      /> -->
                    </div>
                  </el-col>
                  <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                    <label class="mb-0 mt-3 mt-lg-0">{{
                      navigatorLang === "en-US"
                        ? "What is your Membership size?"
                        : $t("onboardingContent.labels.membership-size")
                    }}</label>
                    <el-form-item prop="churchSize">
                      <el-select-v2
                        v-model="userDetails.churchSize"
                        :options="membershipSizeList"
                        placeholder="Select size range"
                        size="large"
                        class="w-100"
                      />
                    </el-form-item>
                  </el-col>
                </el-row>
              </div>
              <div class="input-div">
                <label class="mb-0">{{
                  navigatorLang === "en-US"
                    ? "Do you have a Church Website?"
                    : $t("onboardingContent.labels.churchWebsite")
                }}</label>

                <div class="row">
                  <div class="col-md-12 d-flex">
                    <div
                      class="border cursor-pointer choice d-flex align-items-center mr-2 mt-2 px-3 py-2 rounded"
                      v-for="(item, index) in websiteOpt"
                      :key="index"
                      @click="setChoice(item)"
                    >
                      {{ item }}
                    </div>
                  </div>
                </div>
              </div>
              <div class="input-div" v-if="showWebsite">
                <label class="mb-0">{{
                  navigatorLang === "en-US"
                    ? "If Yes, Please input the Website Address or URL"
                    : $t("onboardingContent.labels.websiteUrl")
                }}</label>
                <el-form-item>
                  <el-input
                    type="text"
                    v-model="userDetails.websiteUrl"
                    placeholder="Website Address/URL"
                  />
                </el-form-item>
              </div>
              <el-button
                class="w-100 mt-4"
                :color="primarycolor"
                size="large"
                :disabled="!disableNext || !selectedCountryId"
                :loading="loading"
                @click="nextStep(ruleFormRef)"
                round
                >{{
                  navigatorLang === "en-US"
                    ? "Next step"
                    : $t("onboardingContent.next-btntext")
                }}</el-button
              >
              <!-- <el-button class="w-100" :color="primarycolor" size="large" :disabled="!disableNext" :loading="loading"
                @click="submitForm(ruleFormRef)" round>{{ navigatorLang === "en-US" ? "Next step" :
          $t('onboardingContent.next-btntext') }}</el-button> -->
            </el-form>
          </div>
        </div>
        <div
          class="col-xs-12 col-md-6"
          id="onboarding-visuals"
          :class="{ 'swap-box2': toggle }"
          ref="box2"
        >
          <div class="step text-head">
            <h4>
              {{
                navigatorLang === "en-US"
                  ? "Step 1 of 2"
                  : $t("onboardingContent.labels.step")
              }}
            </h4>
          </div>

          <div>
            <div>
              <div class="onboarding-image-con">
                <img src="../../assets/onboarding.png" alt="Image" />
                <span class="reactive-text">{{ churchName }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <el-dialog
      class=""
      style="border-radius: 25px"
      v-model="displayVerifyModal"
      title=""
      :width="mdAndUp || lgAndUp || xlAndUp ? `50%` : `90%`"
    >
      <div class="row justify-content-center">
        <div class="col-md-10 col-11 mt-4 h-100 bg-white mb-5">
          <div class="row justify-content-center align-items-center">
            <div class="col-md-10 d-flex justify-content-center">
              <div class="col-md-3 col-5 col-sm-3">
                <img class="w-100" src="../../assets/verifyIcon.png" alt="" />
              </div>
            </div>
            <div class="col-md-12 mt-2 d-flex justify-content-center">
              <div class="col-md-7 col-12 col-sm-8">
                <div
                  class="text-font font-weight-600 col-md-12 col-12 px-0 h4 text-center"
                  style="color: #111111"
                >
                  {{
                    navigatorLang === "en-US"
                      ? "We will Verify your Email & Phone Number"
                      : $t("onboardingContent.emailVerification")
                  }}
                </div>
              </div>
            </div>
            <div
              class="col-md-12 my-3 d-flex flex-column justify-content-center align-items-center"
            >
              <div class="col-md-6">
                <el-button
                  @click="verifyEmail"
                  :loading="loading"
                  :disabled="clickOnce"
                  :color="primarycolor"
                  size="large"
                  class="w-100"
                  round
                  >{{
                    navigatorLang === "en-US"
                      ? "Continue"
                      : $t("onboardingContent.continue")
                  }}</el-button
                >
              </div>
              <div class="col-md-6">
                <el-button size="large" class="w-100 mt-3" round>{{
                  navigatorLang === "en-US" ? "Cancel" : $t("onboardingContent.cancel")
                }}</el-button>
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
import router from "../../router/index";
// import { VueTelInput } from "vue3-tel-input";
// import "vue3-tel-input/dist/vue3-tel-input.css";
import { ref, reactive, watch, inject } from "vue";
import { ElNotification, ElMessage } from "element-plus";
import deviceBreakpoint from "../../mixins/deviceBreakpoint";
import { useI18n } from "vue-i18n";
import { SUPPORT_LOCALES as supportLocales, setI18nLanguage } from "../../i18n";
export default {
  components: {
    // VueTelInput,
  },
  beforeRouteLeave() {
    const userEmail = localStorage.getItem("email");
    if (userEmail) localStorage.removeItem("email");
  },

  beforeRouteEnter() {
    if (localStorage.getItem("token")) router.push("/next");
  },

  setup() {
    const primarycolor = inject("primarycolor");
    const ruleFormRef = ref();
    const displayVerifyModal = ref(false);
    const { mdAndUp, lgAndUp, xlAndUp, xsOnly } = deviceBreakpoint();
    const checkboxGroup = ref([]);
    const checkboxGroup1 = ref([]);
    const websiteOpt = ref(["No", "Yes"]);
    const navigatorLang = ref(navigator.language);
    const rules = reactive({
      firstName: [
        { required: true, message: "Please input your first name", trigger: "blur" },
      ],
      lastName: [
        { required: true, message: "Please input your last name", trigger: "blur" },
      ],
      churchName: [
        { required: true, message: "Please input your church name", trigger: "blur" },
      ],
      phoneNumber: [
        { required: true, message: "Please input your phone number", trigger: "blur" },
      ],
      email: [{ required: true, message: "Please input your email", trigger: "blur" }],
      churchSize: [
        { required: true, message: "Please input your church size", trigger: "change" },
      ],
      categorization: [
        { required: true, message: "Please input your church Type", trigger: "change" },
      ],
    });
    const { locale } = useI18n({ useScope: "global" });
    watch(locale, (val) => {
      setI18nLanguage(val);
    });

    const handleClick = (event) => {
      event.stopPropagation(); // Ensure this stops the event on iOS
    };

    const nextStep = async (formEl) => {
      if (!formEl) return;
      await formEl.validate((valid, fields) => {
        if (valid) {
          displayVerifyModal.value = true;
        } else {
          console.log("error submit!", fields);
          ElNotification({
            title: "Some fields empty",
            message: "Fill all fields and submit again",
            type: "warning",
          });
        }
      });
    };

    return {
      ruleFormRef,
      rules,
      primarycolor,
      navigatorLang,
      websiteOpt,
      checkboxGroup,
      checkboxGroup1,
      displayVerifyModal,
      mdAndUp,
      lgAndUp,
      xlAndUp,
      xsOnly,
      handleClick,
      nextStep,
      // verifyEmail
      // showWebsite,
      // setChoice,
    };
  },

  data() {
    return {
      toggle: false,
      zipCode: "",
      step1Completed: true,
      clickOnce: false,
      userDetails: {
        subscriptionPlanID: 1,
        countryId: 89,
        password: "password",
        phoneNumber: "",
      },

      selectedCountry: {},
      countries: [],
      loading: false,
      showWebsite: false,
      codeUrl: {},
      disableNext: false,
      membershipSizeList: [
        "1 - 100",
        "101 - 200",
        "201 - 500",
        "501 - 2000",
        "2001 - 10,000",
      ].map((i) => ({ value: i, label: i })),
      categorization: [
        { name: "Pentecostal", value: 0 },
        { name: "Orthodox", value: 1 },
        { name: "Catholic", value: 2 },
        { name: "Others", value: 3 },
      ].map((i) => ({ value: i.value, label: i.name })),
      usersPhoneCode: "",
      selectedCountryId: null,
    };
  },
  methods: {
    onInput(phone, phoneObject, input) {
      this.usersPhoneCode = phoneObject ? phoneObject.country.dialCode : "";
      if (phoneObject?.formatted) {
        this.userDetails.phoneNumber = phoneObject.formatted;
        this.selectedCountry = this.countries.find(
          (i) => i.phoneCode == phoneObject.countryCallingCode
        );
      }
    },

    async verifyEmail() {
      this.loading = true;
      this.clickOnce = true;
      try {
        const res = await axios.get(
          `/mobile/v1/Account/SendOTP?phoneNumber=${this.userDetails.phoneNumber}&email=${this.userDetails.email}&tenantId=176bb861-d22e-4598-b2fe-f877888d819c `
        );
        console.log(res, "hh");
        this.clickOnce = false;
        if (res.data.status) {
          this.$store.dispatch("setVerifyEmailData", res.data);
          this.next();
          this.$router.push("/onetimepassword");
          this.loading = false;
        } else {
          ElMessage({
            type: "error",
            message: "Request Failed",
            duration: 5000,
          });
        }
      } catch (error) {
        console.log(error);
        this.loading = false;
      }

      // this.$router.push('/onetimepassword');
      // this.checkboxGroup = []
    },
    setChoice(item) {
      if (item === "Yes") {
        this.showWebsite = true;
        // this.checkboxGroup
      } else {
        this.showWebsite = false;
        // this.checkboxGroup
        this.userDetails.websiteUrl = "";
      }
      // this.checkboxGroup = []
    },

    // async submitForm(formEl) {
    //   if (!formEl) return
    //   await formEl.validate((valid, fields) => {
    //     if (valid) {
    //       this.next();
    //     } else {
    //       console.log('error submit!', fields)
    //       ElNotification({
    //         title: 'Some fields empty',
    //         message: 'Fill all fields and submit again',
    //         type: 'warning',
    //       })
    //     }
    //   })
    // },

    next() {
      if (!this.userDetails.email) return false;
      this.userDetails.countryId =
        this.selectedCountry && this.selectedCountry.id ? this.selectedCountry.id : "";
      this.loading = true;
      // axios
      //   .post("/api/onboarding", this.userDetails)
      //   .then((res) => {
      // if (res.data.isOnboarded) {
      //   ElNotification({
      //     title: 'Well done',
      //     message: 'Onboarding successful',
      //     type: 'success',
      //   })
      // }
      // if (!res.data.token) {
      //   const preToken = localStorage.getItem("pretoken");
      //   localStorage.setItem("token", preToken);
      //   localStorage.removeItem("pretoken");
      // } else {
      //   localStorage.setItem("token", res.data.token);
      //   localStorage.setItem("roles", JSON.stringify(["Admin"]));
      // }
      this.loading = false;
      this.$store.dispatch("setOnboardingData", this.userDetails);
      // this.$router.push("/onboarding/step2");
      // })
      // .catch((err) => {
      //   finish()
      //   this.loading = false;
      //   console.log(err.response);
      // });
    },

    invalidResponse() {
      if (!this.userDetails.phoneNumber) {
        this.disableNext = false;
      } else {
        this.disableNext = true;
      }
    },
    setSelectedCountry() {
      this.selectedCountry = this.countries.find((i) => i.id === this.selectedCountryId);
    },
  },

  computed: {
    churchName() {
      if (!this.userDetails.churchName) return "";
      return this.userDetails.churchName.length < 21
        ? this.userDetails.churchName
        : this.userDetails.churchName.slice(0, 20) + "...";
    },
    valid() {
      let regex = /[0-9]{11}/;
      return regex.test(this.userDetails.phoneNumber);
    },
  },

  beforeCreate() {
    if (!localStorage.getItem("email")) router.push("/");
  },

  created() {
    this.userDetails.email = localStorage.getItem("email");
    setTimeout(() => {
      axios.get("/api/GetAllCountries").then((res) => {
        this.countries = res.data;
        this.selectedCountry = this.countries.find(
          (i) => i.phoneCode && i.phoneCode.toString() === this.usersPhoneCode.toString()
        );
        this.selectedCountryId = this.selectedCountry
          ? this.selectedCountry.id
          : this.selectedCountry;
      });
    }, 2000);
  },
};
</script>

<style scoped>
.top-most {
  height: 100vh;
}

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

.choice {
  background: #ffffff;
}

.choice:hover {
  background: #d1fdff;
}

/* .choicehover{
  background: #7af2f8;
} */

#onboarding {
  display: flex;
  height: 100vh;
}

#onboarding-visuals {
  width: 45%;
  height: 100;
  background-image: -webkit-linear-gradient(top, #3362c9 0%, #582994 100%);
  transition: all 0.7s ease-in-out;
}

#onboarding-form {
  width: 55%;
  display: flex;
  padding: 10px;
  transition: all 0.7s ease-in-out;
}
.w-100 {
  pointer-events: auto; /* or 'none' based on the need */
}

.swap-box1 {
  transform: translateX(80%);
}

.swap-box2 {
  transform: translateX(-127%);
}

.sub-title {
  font-size: 20px;
  font-weight: lighter;
  color: #718fa2;
}

.onboarding-form-container {
  max-width: 560px;
  width: 90%;
  margin: auto;
}

.input-div {
  margin-top: 8px;
}

.input {
  font-family: Averta, sans-serif;
  color: #1c252c;
  font-weight: normal;
  width: 100%;
  box-sizing: border-box;
  border-radius: 4px;
  padding: 8px 10px 6px;
  min-height: 40px;
  /* -webkit-appearance: button; */
  /* appearance: none; */
  outline: none;
  vertical-align: middle;
  transition: border 0.1s linear;
  border: 1px solid #b2c2cd;
  margin: 4px 0;
}

.step {
  text-align: center;
  color: #ffffff;
  margin: 30px 0;
  opacity: 0.5;
}

.onboarding-image-con {
  width: 80%;
  /* margin-left: auto; */
  float: right;
  position: relative;
}
.el-select-v2 > div.el-select-v2__wrapper {
  height: 45px !important;
}

.onboarding-image-con img {
  width: 100%;
  height: 100%;
}

.reactive-text {
  position: absolute;
  top: 8%;
  left: 24%;
  width: 70%;
  font-size: 23px;
  font-weight: 600;
  color: #4d6575;
  overflow: hidden;
  text-overflow: ellipsis;
}

span .select2-selection--single {
  padding: 0px 10px !important;
  height: 40px !important;
  margin-top: 4px !important;
  display: flex !important;
  align-items: center !important;
  border: 1px solid #b2c2cd;
}

@media screen and (max-width: 990px) {
  #onboarding {
    display: block !important;
  }

  #onboarding-form {
    width: 100% !important;
  }

  .main-title {
    margin-top: 20px;
  }

  #onboarding-visuals {
    display: none !important;
  }
}

@media screen and (min-width: 480) {
  .main-title {
    font-size: 33px;
  }
}
</style>
