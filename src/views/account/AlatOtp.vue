<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-12 col-md-11 col-lg-6">
        <div
          class="col-md-12 d-flex align-items-center justify-content-center"
          style="height: 100vh"
        >
          <div class="col-12 mx-0 px-0 col-md-12 col-lg-11" style="height: 50%">
            <div class="text-center col-md-12 heading-text">Enter Verification code</div>
            <div class="font-weight-bold col-md-12 text-secondary">
              <div class="text-center d-flex mb-3 justify-content-center">
                <div>
                  <span class="text-center">
                    Enter the 6-digit verification code sent to <br />
                    <span class="text-dark"
                      >{{ partialEmail ? partialEmail : "" }} and
                      {{ partialNumber ? partialNumber : "" }}</span
                    >
                  </span>
                </div>
              </div>
            </div>
            <div class="col-md-12 d-flex justify-content-center align-items-center">
              <div class="col-12 px-0 mx-0 col-md-12 col-lg-10">
                <div class="row text-center">
                  <div
                    class="col-md-12 px-0 mx-0 d-flex justify-content-center otp-field"
                  >
                    <input
                      ref="firstFocus"
                      v-model="firstInput"
                      class="m-1 form-control rounded inputtwo bg-secondary"
                      type="text"
                      maxlength="1"
                      @input="handleOTPInputOne"
                    />
                    <input
                      ref="secondFocus"
                      v-model="secondInput"
                      class="m-1 form-control rounded inputtwo bg-secondary"
                      type="text"
                      maxlength="1"
                      @input="handleOTPInputTwo"
                    />
                    <input
                      ref="thirdFocus"
                      v-model="thirdInput"
                      class="m-1 form-control rounded inputtwo bg-secondary"
                      type="text"
                      maxlength="1"
                      @input="handleOTPInputThree"
                    />
                    <input
                      ref="fourthFocus"
                      v-model="fourthInput"
                      class="m-1 form-control rounded inputtwo bg-secondary"
                      type="text"
                      maxlength="1"
                      @input="handleOTPInputFour"
                    />
                    <input
                      ref="fifthFocus"
                      v-model="fifthInput"
                      class="m-1 form-control rounded inputtwo bg-secondary"
                      type="text"
                      maxlength="1"
                      @input="handleOTPInputFive"
                    />
                    <input
                      ref="sixFocus"
                      v-model="sixthInput"
                      class="m-1 form-control rounded inputtwo bg-secondary"
                      type="text"
                      maxlength="1"
                      @input="handleOTPInputSix"
                    />
                  </div>
                </div>
                <div class="col-md-12">
                  <div class="col-md-12 content d-flex flex-wrap justify-content-center">
                    <span>Didn't get the code?</span>
                    <a href="#" class="text-decoration-none ms-3 primary--text"
                      >&nbsp; Resend(1/3)</a
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-6 bckimage" id="onboarding-visuals">
        <img src="../../assets/enter-otp-animate.svg" alt="" />
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import router from "../../router";
import { useStore } from "vuex";
import axios from "@/gateway/backendapi";
import { ElLoading } from "element-plus";
import { ElNotification } from "element-plus";
export default {
  setup() {
    const store = useStore();
    const loading = ref(false);
    const firstFocus = ref("");
    const secondFocus = ref("");
    const thirdFocus = ref("");
    const fourthFocus = ref("");
    const fifthFocus = ref("");
    const sixFocus = ref("");
    const myonboardingData = ref(store.getters.onboardingObject);
    const userPassword = ref(store.getters.userPassword);
    const firstInput = ref();
    const secondInput = ref();
    const thirdInput = ref();
    const fourthInput = ref();
    const fifthInput = ref();
    const sixthInput = ref();
    const partialEmail = ref(
      myonboardingData.value && myonboardingData.value.email
        ? myonboardingData.value.email.replace(/(\w{3})[\w.-]+@([\w.]+\w)/, "$1***@$2")
        : ""
    );
    const partialNumber = ref(
      myonboardingData.value && myonboardingData.value.phoneNumber
        ? myonboardingData.value.phoneNumber.slice(0, 6) +
            myonboardingData.value.phoneNumber.slice(2).replace(/.(?=...)/g, "*")
        : ""
    );

    const handleOTPInputOne = () => {
      secondFocus.value.focus();
      if (!firstInput.value) {
        firstFocus.value.focus();
      }
    };
    const handleOTPInputTwo = () => {
      thirdFocus.value.focus();
      if (!secondInput.value) {
        firstFocus.value.focus();
      }
    };
    const handleOTPInputThree = () => {
      fourthFocus.value.focus();
      if (!thirdInput.value) {
        secondFocus.value.focus();
      }
    };
    const handleOTPInputFour = () => {
      fifthFocus.value.focus();
      if (!fourthInput.value) {
        thirdFocus.value.focus();
      }
    };
    const handleOTPInputFive = () => {
      sixFocus.value.focus();
      if (!fifthInput.value) {
        fourthFocus.value.focus();
      }
    };
    const handleOTPInputSix = () => {
      if (!sixthInput.value) {
        fifthFocus.value.focus();
      } else {
        verifyOTP();
      }
    };

    const verifyOTP = async () => {
      const loading = ElLoading.service({
        lock: true,
        text: "Verifying...",
        background: "rgba(255, 255, 255, 0.9)",
      });

      let allInputValue = `${firstInput.value}${secondInput.value}${thirdInput.value}${fourthInput.value}${fifthInput.value}${sixthInput.value}`;
      let obj = {
        id: myonboardingData.value.id,
        churchName: myonboardingData.value.churchName,
        email: myonboardingData.value.email,
        phoneNumber: myonboardingData.value.phoneNumber,
        password: myonboardingData.value.password,
        countryID: myonboardingData.value.countryID,
        subscriptionPlanID: myonboardingData.value.subscriptionPlanID,
        bankCode: "035",
        bankName: "Wema bank",
        activationCode: allInputValue,
        password: userPassword.value,
        referrer: "WEMA",
      };
      console.log(obj, "🙌🙌😥😒🤷‍♂️🤷‍♂️🤦‍♂️");

      try {
        const response = await axios.post("/OTPConfirmation", obj);
        loading.close();
        if (!response.data.token) {
          const preToken = localStorage.getItem("pretoken");
          localStorage.setItem("token", preToken);
          localStorage.removeItem("pretoken");
        } else {
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("roles", JSON.stringify(["Admin"]));
        }
        ElNotification({
          title: "Verification successful",
          message: `Congrats, your account has successful`,
          type: "success",
          duration: 8000,
        });
        router.push("/next");
      } catch (error) {
        ElNotification({
          title: "Verification failed",
          message: error.response.data.title + " Please try again",
          type: "error",
          duration: 5000,
        });
        loading.close();
        console.log(error.response);
      }

      firstInput.value = "";
      secondInput.value = "";
      thirdInput.value = "";
      fourthInput.value = "";
      fifthInput.value = "";
      sixthInput.value = "";
      firstFocus.value.focus();
    };

    return {
      handleOTPInputTwo,
      handleOTPInputFour,
      handleOTPInputFive,
      handleOTPInputThree,
      handleOTPInputSix,
      verifyOTP,
      firstFocus,
      secondFocus,
      thirdFocus,
      fourthFocus,
      fifthFocus,
      sixFocus,
      handleOTPInputOne,
      partialEmail,
      partialNumber,
      myonboardingData,
      firstInput,
      secondInput,
      thirdInput,
      fourthInput,
      fifthInput,
      sixthInput,
      loading,
      userPassword,
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
  background: #ebebeb !important;
  font-weight: bold;
  color: #fff;
  outline: none;
  transition: all 0.1s;
}

.otp-field input:focus {
  /* border: 1px solid #900a39; */
  box-shadow: 0 0 2px 2px #900a39c7;
}

.disabled {
  opacity: 0.5;
}

.space {
  margin-left: 1rem !important;
}

.inputtwo {
  color: #8d8d8d !important;
  font: normal normal 800 1.5rem Nunito sans;
  font-size: 35px;
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
