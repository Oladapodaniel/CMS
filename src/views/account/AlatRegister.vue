<template>
  <div class="top-most">
    <div>
      <div id="onboarding">
        <div id="onboarding-form" :class="{ 'swap-box1': toggle }">
          <div class="onboarding-form-container">
            <div class="title-div">
              <div class="main-title">
                <h1>Welcome to ALAT FAITH!</h1>
              </div>
              <div class="sub-title">
                <p>Tell us about you and your church</p>
              </div>
            </div>
            <el-form
              ref="ruleFormRef"
              :rules="rules"
              :model="userDetails"
              style="width: 100%"
            >
              <div class="input-div">
                <el-row :gutter="15">
                  <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
                    <label class="mb-0">WEMA Account number</label>
                    <el-icon class="is-loading ml-2" v-show="accountLoading">
                      <Loading />
                    </el-icon>
                    <el-form-item prop="accountNumber">
                      <el-input
                        type="number"
                        v-model="userDetails.accountNumber"
                        @blur="resolveCustomerDetail"
                        autocomplete="new-password"
                        placeholder="Account number"
                      />
                    </el-form-item>
                  </el-col>
                  <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
                    <label class="mb-0">Church name</label>
                    <el-form-item prop="maskChurchName">
                      <el-input
                        type="text"
                        v-model="userDetails.maskChurchName"
                        placeholder="Church name"
                        disabled
                      />
                    </el-form-item>
                  </el-col>
                </el-row>
              </div>

              <div class="input-div">
                <el-row :gutter="15">
                  <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
                    <label class="mb-0">Email</label>
                    <el-form-item prop="maxEmail">
                      <el-input
                        type="text"
                        v-model="userDetails.maxEmail"
                        placeholder="Email"
                        disabled
                      />
                    </el-form-item>
                  </el-col>
                  <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
                    <label class="mb-0">Phone number</label>
                    <el-form-item prop="maskPhoneNumber">
                      <el-input
                        type="text"
                        v-model="userDetails.maskPhoneNumber"
                        placeholder="Phone number"
                        disabled
                      />
                    </el-form-item>
                  </el-col>
                </el-row>
              </div>

              <div class="input-div">
                <label class="mb-0">Password</label>
                <el-form-item prop="password">
                  <el-input
                    type="password"
                    v-model="userDetails.password"
                    placeholder="Password"
                    autocomplete="new-password"
                    show-password
                  />
                </el-form-item>
              </div>
              <div class="input-div cstm-select w-100">
                <label class="mb-0">What's the membership size of your ministry?</label>
                <el-form-item>
                  <el-select-v2
                    v-model="selectedMemberId"
                    :options="
                      membershipSizeList.map((i) => ({ value: i.id, label: i.name }))
                    "
                    placeholder="Select size range"
                    size="large"
                    class="w-100"
                    @change="setSelectedMembershipSize"
                  />
                </el-form-item>
              </div>

              <div class="input-div">
                <div class="col-md-12 input-color2 py-2 d-flex justify-content-between">
                  <div class="font-weight-bold">Total Monthly Payment</div>
                  <div class="text-right font-weight-bold horizontal-rule">
                    NGN
                    {{
                      Math.round(
                        mobilePerMonth + smsPerMonth + memberPerMonth
                      ).toLocaleString()
                    }}.00
                  </div>
                </div>
              </div>

              <el-button
                class="w-100"
                :color="primarycolor"
                size="large"
                :disabled="!disableSubmit"
                :loading="loadingSave"
                @click="submitForm(ruleFormRef)"
                round
                >Submit</el-button
              >
            </el-form>
          </div>
        </div>
        <div
          class="col-sm-12 col-md-6"
          id="onboarding-visuals"
          :class="{ 'swap-box2': toggle }"
          ref="box2"
        >
          <div class="mt-4">
            <div>
              <div class="onboarding-image-con">
                <img src="../../assets/alartfaith-icon/logo.png" alt="" />
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-md-12 d-flex flex-wrap justify-content-center">
              <div
                class="col-md-9"
                :class="{ hidePlan: !basicPlan, showPlan: basicPlan }"
              >
                <div
                  class="col-md-12 text-cente font-weight-bold m-0 h5 py-2"
                  style="border: 1px solid #900a39; background: white"
                >
                  Basic Plan
                </div>
                <div
                  class="col-md-12"
                  style="border: 1px solid #900a39; background: white"
                >
                  <ul>
                    <li class="py-2">Church Administration</li>
                    <li>Database Management</li>
                    <li class="py-2">Online giving</li>
                    <li>500 units of SMS</li>
                  </ul>
                </div>
              </div>
              <div
                class="col-md-9 mt-5"
                :class="{ hidePlan: !standardPlan, showPlan: standardPlan }"
              >
                <div
                  class="col-md-12 text-cente font-weight-bold border-bottom-0 m-0 h5 py-2"
                  style="border: 1px solid #900a39; background: white"
                >
                  Standard Plan
                </div>
                <div
                  class="col-md-12"
                  style="border: 1px solid #900a39; background: white"
                >
                  <ul>
                    <li class="py-2">Church Administration</li>
                    <li>Database Management</li>
                    <li class="py-2">Free Android and iOS mobile App</li>
                    <li>Online giving</li>
                    <li class="py-2">500 units of SMS</li>
                  </ul>
                </div>
              </div>
              <div
                class="col-md-9"
                :class="{ hidePlan: !premiumPlan, showPlan: premiumPlan }"
              >
                <div
                  class="col-md-12 text-cente font-weight-bold border-bottom-0 m-0 h5 py-2"
                  style="border: 1px solid #900a39; background: white"
                >
                  Premium Plan
                </div>
                <div
                  class="col-md-12"
                  style="border: 1px solid #900a39; background: white"
                >
                  <ul>
                    <li class="py-2">Church Administration</li>
                    <li>Database Management</li>
                    <li class="py-2">Free Android and iOS mobile App</li>
                    <li>Online giving</li>
                    <li class="py-2">1,000 units of SMS</li>
                  </ul>
                </div>
              </div>
              <div
                class="col-md-9"
                :class="{ hidePlan: !platinumPlan, showPlan: platinumPlan }"
              >
                <div
                  class="col-md-12 text-cente font-weight-bold border-bottom-0 m-0 h5 py-2"
                  style="border: 1px solid #900a39; background: white"
                >
                  Platinum Plan
                </div>
                <div
                  class="col-md-12"
                  style="border: 1px solid #900a39; background: white"
                >
                  <ul>
                    <li class="py-2">Church Administration</li>
                    <li>Database Management</li>
                    <li class="py-2">Free Android and iOS mobile App</li>
                    <li>Online giving</li>
                    <li class="py-2">1,500 units of SMS</li>
                  </ul>
                </div>
              </div>
              <div class="col-md-9 ml-2 mt-2">
                <p>
                  A range of technology and financial solutions for Churches and other
                  faith-based organizations.
                </p>
              </div>
            </div>
            <div class="col-md-12 d-flex justify-content-center mt-3 flex-wrap">
              <div class="font-weight-bold h6 col-md-9 ml-2">
                Join 11,200 using ALAT Faith solution
              </div>
              <!-- <div
                class="col-md-9 d-flex flex-wrap justify-content-center justify-content-md-start ml-2"
                style="gap: 20px"
              >
                <span class="logo"
                  ><img src="../../assets/wema-faith/download-1.png" alt=""
                /></span>
                <span class="logo"
                  ><img src="../../assets/wema-faith/winners-logo.png" alt=""
                /></span>
                <span class="logo"
                  ><img src="../../assets/wema-faith/assemblies-of-god-logo.png" alt=""
                /></span>
                <span class="logo"
                  ><img src="../../assets/wema-faith/cgmi1-min-Mask.png" alt=""
                /></span>
                <span class="logo"
                  ><img
                    src="../../assets/wema-faith/cornerstone-bible-church-logo1-1024x1024-1.png"
                    alt=""
                /></span>
                <span class="logo"
                  ><img
                    src="../../assets/wema-faith/insight_bible-church_Mask-2.png"
                    alt=""
                /></span>
                <span class="logo"
                  ><img src="../../assets/wema-faith/Lbbwk7FK_400x400.png" alt=""
                /></span>
              </div> -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "@/gateway/backendapi";
import router from "../../router/index";
import { ref, reactive, inject } from "vue";
import finish from "../../services/progressbar/progress";
import { ElNotification } from "element-plus";
export default {
//   beforeRouteLeave() {
//     const userEmail = localStorage.getItem("email");
//     if (userEmail) localStorage.removeItem("email");
//   },

//   beforeRouteEnter() {
//     if (localStorage.getItem("token")) router.push("/next");
//   },

  setup() {
    const primarycolor = inject("primarycolor");
    const ruleFormRef = ref();
    const rules = reactive({
      accountNumber: [
        { required: true, message: "Please enter your account number", trigger: "blur" },
      ],
      maskChurchName: [
        { required: true, message: "Please enter your church name", trigger: "blur" },
      ],
      maxEmail: [{ required: true, message: "Please enter your email", trigger: "blur" }],
      password: [
        { required: true, message: "Please enter your password", trigger: "blur" },
      ],
    });
    return {
      ruleFormRef,
      rules,
      primarycolor,
    };
  },

  data() {
    return {
      toggle: false,
      zipCode: "",
      step1Completed: true,
      userDetails: {
        subscriptionPlanID: 1,
        countryId: 89,
        password: "",
        phoneNumber: "",
      },

      selectedCountry: {},
      countries: [],
      loading: false,
      codeUrl: {},
      disableNext: false,
      selectedMemberId: null,
      membershipSizeList: [
        { name: "Basic plan (0-200 members(#3,000))", price: 36000, id: 2 },
        { name: "Standard plan (200-500 members(#7,000))", price: 84000, id: 3 },
        { name: "Premium plan (500-2000 members(#15,000))", price: 180000, id: 5 },
        { name: "Platinum plan  (2000 -10000 members(#21,000))", price: 252000, id: 7 },
      ],
      usersPhoneCode: "",
      selectedCountryId: null,
      basicPlan: false,
      standardPlan: false,
      premiumPlan: false,
      platinumPlan: false,
      selectedMemberPlan: {},
      smsPerMonth: 0,
      memberPerMonth: 0,
      mobilePerMonth: 0,
      churchName: "",
      phoneNumber: "",
      email: "",
      accountLoading: false,
      loadingSave: false,
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

    async submitForm(formEl) {
      if (!formEl) return;
      await formEl.validate((valid, fields) => {
        if (valid) {
          this.saveForm();
        } else {
          console.log("error submit!", fields);
          ElNotification({
            title: "Some fields empty",
            message: "Fill all fields and submit again",
            type: "warning",
          });
        }
      });
    },
    setSelectedMembershipSize() {
      this.selectedMemberPlan = this.membershipSizeList.find(
        (i) => i.id === this.selectedMemberId
      );
      this.memberPerMonth = this.selectedMemberPlan.price / 12;
      if (this.selectedMemberPlan.price === 36000) {
        this.basicPlan = true;
        this.standardPlan = false;
        this.premiumPlan = false;
        this.platinumPlan = false;
      } else if (this.selectedMemberPlan.price === 84000) {
        this.standardPlan = true;
        this.basicPlan = false;
        this.premiumPlan = false;
        this.platinumPlan = false;
      } else if (this.selectedMemberPlan.price === 180000) {
        this.premiumPlan = true;
        this.basicPlan = false;
        this.platinumPlan = false;
        this.standardPlan = false;
      } else if (this.selectedMemberPlan.price === 252000) {
        this.platinumPlan = true;
        this.premiumPlan = false;
        this.basicPlan = false;
        this.standardPlan = false;
      } else {
        return item;
      }
    },
    async resolveCustomerDetail() {
      try {
        if (!this.userDetails.accountNumber) return;
        this.accountLoading = true;
        const respons = await axios.get(
          `/VerifyWemaAccount?accountNumber=${this.userDetails.accountNumber}`
        );
        this.churchName = respons.data.response ? respons.data.response.name : "";
        this.email = respons.data.response ? respons.data.response.emailAddress : "";
        this.phoneNumber = respons.data.response ? respons.data.response.phoneNumber : "";
        this.userDetails.maxEmail = this.email.replace(
          /(\w{3})[\w.-]+@([\w.]+\w)/,
          "$1***@$2"
        );
        this.userDetails.maskPhoneNumber =
          this.phoneNumber.slice(0, 6) +
          this.phoneNumber.slice(2).replace(/.(?=...)/g, "*");
        this.userDetails.maskChurchName =
          this.churchName.slice(0, 10) +
          this.churchName.slice(1).replace(/.(?=...)/g, "*");
        this.checking = true;
        this.disabled = false;

        this.accountLoading = false;
        if (respons.data.message.includes("getting")) {
          ElNotification({
            title: "Unable to verify",
            message: respons.data.message,
            showClose: false,
            type: "warning",
            duration: 8000,
          });
        } else if (respons.data.message.includes("limit")) {
          ElNotification({
            title: "Rate limit is  exceeded",
            message: respons.data.message,
            showClose: false,
            type: "warning",
            duration: 8000,
          });
        } else if (respons.data.message.toLowerCase().includes("found")) {
          ElNotification({
            title: "Unable to verify",
            message: respons.data.message,
            showClose: false,
            type: "warning",
            duration: 8000,
          });
        } else {
          ElNotification({
            title: "Success",
            message: "The account check was successful",
            showClose: false,
            type: "success",
            duration: 8000,
          });
        }
      } catch (error) {
        finish();
        console.log(error);

        this.accountLoading = false;
        ElNotification({
          title: "error",
          message: "Please try again",
          showClose: false,
          type: "error",
          duration: 8000,
        });
      }
    },
    saveForm() {
      this.loadingSave = true;
      let obj = {
        churchName: this.churchName,
        email: this.email,
        phoneNumber: this.phoneNumber,
        bankAccount: this.userDetails.accountNumber,
        password: this.userDetails.password,
        bankCode: "035",
        bankName: "Wema bank",
        countryID: this.selectedCountry.id,
        subscriptionPlanID: this.selectedMemberPlan.id,
        amount: this.memberPerMonth,
        referrer: "WEMA",
      };
      axios
        .post("/InitialSignUpV2", obj)
        .then((res) => {
          this.loadingSave = false;
          this.$store.dispatch("setUserEmail", this.email);
          this.$store.dispatch("setUserPassword", this.userDetails.password);
          this.$store.dispatch("onboardingDataObject", res.data);
          localStorage.setItem("email", this.email);
          this.$router.push("/onetimepassword");
        })
        .catch((err) => {
          /eslint no-undef: "warn"/;
          NProgress.done();
          this.loadingSave = false;
          console.log(err.response);
          localStorage.setItem("email", this.email);
          ElNotification({
            title: "Oops",
            message: err.response.data.message,
            type: "warning",
            duration: 6000,
          });
        });
    },
  },

  computed: {
    valid() {
      let regex = /[0-9]{11}/;
      return regex.test(this.userDetails.phoneNumber);
    },
    disableSubmit() {
      if (!this.userDetails.maskChurchName) {
        return false;
      } else {
        return true;
      }
    },
  },

  created() {
    this.userDetails.email = localStorage.getItem("email");
    setTimeout(() => {
      axios.get("/api/GetAllCountries").then((res) => {
        this.countries = res.data;
        this.selectedCountry = this.countries.find(
          (i) => i.phoneCode && i.phoneCode.toString() === "234"
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

#onboarding {
  display: flex;
  height: 100vh;
}

#onboarding-visuals {
  width: 45%;
  height: 100;
  background-image: -webkit-linear-gradient(top, #afafaf 0%, #fdfffe 100%);
  transition: all 0.7s ease-in-out;
}

#onboarding-form {
  width: 55%;
  display: flex;
  padding: 10px;
  transition: all 0.7s ease-in-out;
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
  margin: 20px 0;
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
  color: #fff;
  margin: 30px 0;
  font-weight: bold;
}

.onboarding-image-con {
  width: 100%;
  display: flex;
  justify-content: center;
  margin-left: auto;
  position: relative;
}

.onboarding-image-con img {
  width: 30%;
  height: 30%;
}

.hidePlan {
  height: 0 !important;
  width: 0% !important;
  overflow: hidden !important;
  transition: all 0.5s ease-in-out;
}

.showPlan {
  height: 15rem !important;
  width: 100% !important;
  overflow: hidden !important;
  transition: all 0.5s ease-in-out;
}

.logo {
  width: 35px;
}

.logo img {
  width: 100%;
}

.input-color2 {
  background: rgba(245, 167, 223, 0.25);
  border-radius: 7px;
  /* opacity: 1; */
}

.horizontal-rule {
  border-bottom: 3px solid #900a39;
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
