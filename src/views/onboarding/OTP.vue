<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-12 col-md-11">
        <div
          class="col-md-12 d-flex align-items-center justify-content-center"
          style="height: 100vh"
        >
          <div class="col-12 mx-0 px-0 col-md-12 col-lg-11" style="height: 50%">
            <div class="row">
              <div class="col-md-12 d-flex justify-content-center">
                <div class="col-2 col-md-2">
                  <img class="col-md-12" src="../../assets/verifyIcon.png" alt="" />
                </div>
              </div>
            </div>
            <div class="text-center col-md-12 h2 font-weight-600 text-head">
              {{
                navigatorLang === "en-US"
                  ? "ChurchPlus Verification"
                  : $t("onboardingContent.otpContent.chVerification")
              }}
            </div>
            <div class="col-md-12" style="color: #111111">
              <div class="text-center d-flex mb-3 text-font justify-content-center">
                <div>
                  <span class="text-center">
                    {{
                      navigatorLang === "en-US"
                        ? "We sent a 4 Digits Code to your"
                        : $t("onboardingContent.otpContent.digitCodeText")
                    }}

                    <br />
                    <span class="font-weight-600">
                      {{ onboardingDatas ? onboardingDatas.email : "Email" }} and
                      {{
                        onboardingDatas ? onboardingDatas.phoneNumber : "Phone Number"
                      }}</span
                    >
                  </span>
                </div>
              </div>
            </div>
            <div class="col-md-12 d-flex justify-content-center align-items-center">
              <div class="col-12 px-0 mx-0 col-md-12 col-lg-10">
                <div class="row text-center">
                  <div class="col-md-12">
                    <div class="row justify-content-center">
                      <div class="col-md-5 d-flex">
                        <div
                          class="col-md-3 justify-content-center rounded d-flex otp-field px-0 mx-0"
                          v-for="(digit, index) in otp"
                          :key="index"
                        >
                          <input
                            v-model="otp[index]"
                            class="inputtwo form-control m-2 bg-secondary"
                            type="tel"
                            :id="'otp-' + index"
                            maxlength="1"
                            required
                            @input="handleInput($event, index)"
                            @keydown="handleKeydown($event, index)"
                            @paste="handlePaste"
                            @keypress="validateNumberInput"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-md-12 mt-4 d-flex justify-content-center">
                  <div class="col-md-4">
                    <el-button
                      @click="completeVerification"
                      :loading="loading"
                      :color="primarycolor"
                      size="large"
                      class="w-100"
                      round
                      >{{
                        navigatorLang === "en-US"
                          ? "Complete Verification"
                          : $t("onboardingContent.otpContent.completeVerify")
                      }}</el-button
                    >
                  </div>
                </div>
                <div class="col-md-12 d-flex justify-content-center mt-5">
                  <div
                    class="py-2 col-md-5 getcode d-flex flex-wrap justify-content-center"
                  >
                    <span>{{
                      navigatorLang === "en-US"
                        ? "Didn't get code? "
                        : $t("onboardingContent.otpContent.didNotGet")
                    }}</span>
                    <div @click="reSendCode" style="color: #959595" class="ms-3 cursor-pointer">
                      &nbsp;
                      {{
                        navigatorLang === "en-US"
                          ? "Resend code "
                          : $t("onboardingContent.otpContent.resendCode")
                      }}
                      <span>{{ formattedTime }}</span>
                    </div>
                  </div>
                </div>
                <div class="col-md-12 mt-3 d-flex justify-content-center">
                  <div class="col-md-4">
                    <el-button @click="cancel" size="large" class="w-100" round>{{
                      navigatorLang === "en-US"
                        ? "Cancel"
                        : $t("onboardingContent.otpContent.cancel")
                    }}</el-button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <el-dialog
      class=""
      style="border-radius: 25px"
      v-model="displaySuccess"
      title=""
      :width="mdAndUp || lgAndUp || xlAndUp ? `50%` : `90%`"
    >
      <div class="row justify-content-center">
        <div class="col-md-10 col-11 mt-4 h-100 bg-white mb-5">
          <div class="row justify-content-center align-items-center">
            <div class="col-md-10 d-flex justify-content-center">
              <div class="col-md-4 col-5 col-sm-3">
                <img class="w-100" src="../../assets/shieldGif.gif" alt="" />
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
                      ? "Verification was Successful!"
                      : $t("onboardingContent.verifySuccess")
                  }}
                </div>
              </div>
            </div>
            <div
              class="col-md-12 my-3 d-flex flex-column justify-content-center align-items-center"
            >
              <div class="col-md-6">
                <el-button
                  @click="whatNext"
                  :loading="loading"
                  :color="primarycolor"
                  size="large"
                  class="w-100"
                  round
                  >{{
                    navigatorLang === "en-US"
                      ? "See What’s Next"
                      : $t("onboardingContent.whatNext")
                  }}</el-button
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </el-dialog>
    <el-dialog
      class=""
      style="border-radius: 25px"
      v-model="displayFailed"
      title=""
      :width="mdAndUp || lgAndUp || xlAndUp ? `50%` : `90%`"
    >
      <div class="row justify-content-center">
        <div class="col-md-10 col-11 mt-4 h-100 bg-white mb-5">
          <div class="row justify-content-center align-items-center">
            <div class="col-md-10 d-flex justify-content-center">
              <div class="col-md-3 col-5 col-sm-3">
                <img class="w-100" src="../../assets/errorIcon.png" alt="" />
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
                      ? "We couldn’t verify your information"
                      : $t("onboardingContent.verifyFailed")
                  }}
                </div>
              </div>
            </div>
            <div
              class="col-md-12 my-3 d-flex flex-column justify-content-center align-items-center"
            >
              <div class="col-md-6">
                <el-button
                  @click="tryAgain"
                  :color="primarycolor"
                  size="large"
                  class="w-100"
                  round
                  >{{
                    navigatorLang === "en-US"
                      ? "Try again"
                      : $t("onboardingContent.tryAgain")
                  }}</el-button
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { ref, watch, inject, onMounted } from "vue";
import router from "../../router";
import { useStore } from "vuex";
import axios from "@/gateway/backendapi";
import { ElLoading, ElMessage } from "element-plus";
import deviceBreakpoint from "../../mixins/deviceBreakpoint";
import { useI18n } from "vue-i18n";
import { SUPPORT_LOCALES as supportLocales, setI18nLanguage } from "../../i18n";
// import { validateNumberInput } from '../../services/otpvalidation/validation'
import { ElNotification } from "element-plus";
import { trim } from "lodash";
export default {
  setup() {
    const store = useStore();
    const loading = ref(false);
    const navigatorLang = ref(navigator.language);
    const { mdAndUp, lgAndUp, xlAndUp, xsOnly } = deviceBreakpoint();
    const displayFailed = ref(false);
    const displaySuccess = ref(false);
    const primarycolor = inject("primarycolor");
    const onboardingDatas = ref(store.getters.onboardingData);
    const optVerifyData = ref(store.getters.verifyEmailData);
    const userPassword = ref(store.getters.userPassword);
    const countdownTime = ref(12 * 60);
    const timerInterval = ref();
    const partialEmail = ref(
      onboardingDatas.value && onboardingDatas.value.email
        ? onboardingDatas.value.email.replace(/(\w{3})[\w.-]+@([\w.]+\w)/, "$1***@$2")
        : ""
    );
    const partialNumber = ref(
      onboardingDatas.value && onboardingDatas.value.phoneNumber
        ? onboardingDatas.value.phoneNumber.slice(0, 6) +
            onboardingDatas.value.phoneNumber.slice(2).replace(/.(?=...)/g, "*")
        : ""
    );

    const otp = ref(["", "", "", ""]);

    const tryAgain = () => {
      displayFailed.value = false;
    };

    const validateNumberInput = (event) => {
      if (!/\d/.test(event.key)) {
        event.preventDefault();
      }
    };

    const { locale } = useI18n({ useScope: "global" });
    watch(locale, (val) => {
      setI18nLanguage(val);
    });

    const formatTime = (time) => {
      const minutes = Math.floor(time / 60);
      const seconds = time % 60;
      return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
    };
    const formattedTime = ref(formatTime(countdownTime.value));

    const countdownTimer = () => {
      countdownTime.value--;
      formattedTime.value = formatTime(countdownTime.value);
      if (countdownTime.value <= 0) {
        clearInterval(timerInterval.value);
        formattedTime.value = "Time's up!";
      }
    };

    const handlePaste = (event) => {
      const paste = (event.clipboardData || window.clipboardData).getData("text");
      if (paste.length === otp.value.length) {
        otp.value = paste.split("");
        event.preventDefault();
        // remove focus from the active input
        document.activeElement.blur();
      }
    };

    const handleKeydown = (event, index) => {
      if (event.key === "Backspace" && otp.value[index] === "") {
        if (index > 0) {
          otp.value[index - 1] = "";
          document.getElementById(`otp-${index - 1}`).focus();
        }
      }
    };

    const handleInput = (event, index) => {
      if (event.target.value.length === 1 && index < otp.value.length - 1) {
        document.getElementById(`otp-${index + 1}`).focus();
      }
    };

    watch(countdownTime, () => {
      if (countdownTime.value <= 0) {
        clearInterval(timerInterval.value);
        formattedTime.value = "Time's up!";
      }
    });

    // Start the countdown timer when component is mounted
    onMounted(() => {
      timerInterval.value = setInterval(countdownTimer, 1000);
    });

    const reSendCode = async () => {
      try {
        const res = await axios.get(
          `/mobile/v1/Account/SendOTP?phoneNumber=${onboardingDatas.value.phoneNumber.trim()}&email=${
            onboardingDatas.value.email
          }&tenantId=176bb861-d22e-4598-b2fe-f877888d819c `
        );
        if (res.data.status) {
          ElMessage({
            type: "success",
            message: "Request sent",
            duration: 5000,
          });
          countdownTimer();
        } else {
          ElMessage({
            type: "error",
            message: "Request Failed",
            duration: 5000,
          });
        }
      } catch (error) {
        console.log(error);
      }

      // Function to format time in MM:SS

      // Formatted time computed property

      // Countdown timer function

      // Watch for changes in countdownTime
    };

    const completeVerification = async () => {
      loading.value = true;
      const code = otp.value.join("");
      console.log(code, "jjkk");
      try {
        const res = await axios.get(
          `/mobile/v1/Account/ConfirmOTP?token=${optVerifyData.value.returnObject.token}&otp=${code}`
        );
        if (res.data.status) {
          displaySuccess.value = true;
        } else {
          displayFailed.value = true;
        }

        loading.value = false;
      } catch (error) {
        console.log(error);
        loading.value = false;
      }
    };

    const cancel = () => {
      router.push("/onboarding");
    };

    const whatNext = async () => {
      loading.value = true;
      try {
        const res = await axios.post("/api/onboarding", onboardingDatas.value);
        if (res.data.isOnboarded) {
          ElNotification({
            title: "Well done",
            message: "Onboarding successful",
            type: "success",
          });
          loading.value = false;
        }
        if (!res.data.token) {
          const preToken = localStorage.getItem("pretoken");
          localStorage.setItem("token", preToken);
          localStorage.removeItem("pretoken");
        } else {
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("roles", JSON.stringify(["Admin"]));
        }
        loading.value = false;
        router.push("/onboarding/step2");
      } catch (error) {
        console.log(error);
        loading.value = false;
      }
    };

    // const verifyOTP = async () => {

    //     const loading = ElLoading.service({
    //         lock: true,
    //         text: 'Verifying...',
    //         background: 'rgba(255, 255, 255, 0.9)',
    //     })

    //     let allInputValue = `${firstInput.value}${secondInput.value}${thirdInput.value}${fourthInput.value}`;
    //     let obj = {
    //         id: myonboardingData.value.id,
    //         churchName: myonboardingData.value.churchName,
    //         email: myonboardingData.value.email,
    //         phoneNumber: myonboardingData.value.phoneNumber,
    //         password: myonboardingData.value.password,
    //         countryID: myonboardingData.value.countryID,
    //         subscriptionPlanID: myonboardingData.value.subscriptionPlanID,
    //         bankCode: "035",
    //         bankName: "Wema bank",
    //         activationCode: allInputValue,
    //         password: userPassword.value,
    //         referrer: "WEMA",
    //     };

    //     try {
    //         const response = await axios.post("/OTPConfirmation", obj);
    //         loading.close()
    //         if (!response.data.token) {
    //             const preToken = localStorage.getItem("pretoken");
    //             localStorage.setItem("token", preToken);
    //             localStorage.removeItem("pretoken");
    //         } else {
    //             localStorage.setItem("token", response.data.token);
    //             localStorage.setItem("roles", JSON.stringify(["Admin"]));
    //         }
    //         ElNotification({
    //             title: 'Verification successful',
    //             message: `Congrats, your account has successful`,
    //             type: 'success',
    //             duration: 8000
    //         })
    //         router.push("/next");
    //     } catch (error) {
    //         ElNotification({
    //             title: 'Verification failed',
    //             message: error.response.data.title + ' Please try again',
    //             type: 'error',
    //             duration: 5000
    //         })
    //         loading.close()
    //         console.log(error.response);
    //     }

    // };

    return {
      mdAndUp,
      lgAndUp,
      xlAndUp,
      xsOnly,
      displayFailed,
      onboardingDatas,
      formattedTime,
      countdownTime,
      timerInterval,
      tryAgain,
      completeVerification,
      displaySuccess,
      whatNext,
      reSendCode,
      optVerifyData,
      navigatorLang,
      partialEmail,
      partialNumber,
      // myonboardingData,
      loading,
      userPassword,
      primarycolor,
      cancel,
      otp,
      handlePaste,
      handleKeydown,
      handleInput,
      validateNumberInput,
    };
  },
};
</script>
<style scoped>
.otp-field input {
  width: 50px;
  font-size: 32px;
  padding: 10px;
  text-align: center;
  border-radius: 0px;
  margin: 2px;
  border: none;
  /* background: #EBEBEB !important; */
  background: #f8f8f8 !important;
  font-weight: bold;
  color: #fff;
  outline: none;
  transition: all 0.1s;
}

.otp-field input:focus {
  /* border: 1px solid #900a39; */
  box-shadow: 0 0 2px 2px #0048c2;
}

.disabled {
  opacity: 0.5;
}

.space {
  margin-left: 1rem !important;
}

.inputtwo {
  color: #8d8d8d !important;
  /* font: normal normal 800 1.5rem Nunito sans; */
  font-size: 35px;
}

.getcode {
  background-color: #e4faff;
  border-radius: 8px;
}

.digit-box {
  height: 4rem;
  width: 2rem;
  border: 2px solid black;
  display: inline-block;
  border-radius: 5px;
  margin: 5px;
  padding: 15px;
  font-size: 3rem;
}

.digit-box:focus {
  outline: 3px solid black;
}

.digit-group input {
  width: 30px;
  height: 50px;
  background-color: rgb(203, 203, 203);
  border: none;
  border-radius: 9px;
  line-height: 50px;
  text-align: center;
  font-size: 24px;
  font-family: "Raleway", sans-serif;
  font-weight: 200;
  color: white;
  margin: 0 2px;
}

.prompt {
  margin-bottom: 20px;
  font-size: 20px;
  color: white;
}

.heading-text {
  font: normal normal 800 1.5rem Nunito sans;
  font-size: 35px;
}

.bckimage img {
  height: 100vh;
  width: 100%;
}

#onboarding-visuals {
  width: 100%;
  /* background: #4aa858; */
  height: 100;
  background-image: -webkit-linear-gradient(top, #afafaf 0%, #fdfffe 100%);
  transition: all 0.7s ease-in-out;
}

@media screen and (max-width: 800px) {
  #onboarding-visuals {
    display: none !important;
  }

  .otp-field input {
    width: 37px;
    height: 43px !important;
  }

  .heading-text {
    font-size: 22px;
  }
}

@media screen and (max-width: 388px) {
  .otp-field {
    display: flex;
    flex-wrap: wrap;
    width: 100% !important;
  }
}

@media screen and (max-width: 308px) {
  .otp-field {
    display: flex;
    flex-wrap: wrap;
    width: 100% !important;
  }
}
</style>
