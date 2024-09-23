<template>
  <el-form>
    <div class="container my-content">
      <div class="row page-header">
        <div class="col-12">
          <h3
            class="header-text font-weight-bold text-md-left text-lg-left text-xl-left text-sm-center text-center"
          >
            Church Profile
          </h3>
        </div>
      </div>

      <div class="row form-container">
        <div
          class="col-10 offset-1 offset-sm-0 col-sm-12 text-md-left text-lg-left text-xl-left text-sm-center text-center"
        >
          <span class="sub-header">Church Details </span>{{ currentUser }}
          <div class="row first-row">
            <div class="col-12 col-md-3 text-md-right pr-0">
              <label for="firstname" class="small-text lb lb font-weight-600">Name</label>
            </div>
            <div class="col-12 col-md-5 form-group">
              <el-input
                type="text"
                placeholder="name()"
                class="w-100 ml-0"
                id="firstname"
                size="large"
                v-model="churchData.churchName"
                required
              />
            </div>
            <div class="col-md-4">
              <div class="grey-bg light-grey-bg mt-0 py-2">
                <div class="person-img">
                  <img v-if="url" :src="url" alt="Uploaded Image" />
                  <img
                    v-else-if="!churchData.logoUrl"
                    src="../../assets/people/phone-import.svg"
                    alt="Uploaded Image"
                  />
                  <img v-else :src="churchData.logoUrl" alt="Uploaded Image" />
                </div>
                <div>
                  <div class="cs-input">
                    <label for="imgUpload" class="choose-file">
                      Choose file
                      <input
                        type="file"
                        class="input file-input"
                        placeholder=""
                        id="imgUpload"
                        @change="imageSelected"
                      />
                    </label>
                  </div>
                </div>
                <div></div>
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-12 col-md-3 text-md-right pr-0">
              <label class="small-text lb font-weight-600" for="">Aka/Parish</label>
            </div>
            <div class="col-12 col-md-5 form-group">
              <el-input
                type="text"
                placeholder="Aka/Parish"
                v-model="churchData.aka"
                class="w-100 ml-0"
                size="large"
              />
            </div>
            <div class="col-md-4"></div>
          </div>

          <div class="row">
            <div class="col-12 col-md-3 text-md-right pr-0">
              <label class="small-text lb font-weight-600">Address</label>
            </div>
            <div class="col-12 col-md-5 form-group">
              <el-input
                type="text"
                placeholder="Address"
                v-model="churchData.address"
                class="w-100 ml-0"
                size="large"
              />
            </div>
            <div class="col-md-4"></div>
          </div>

          <div class="row">
            <div class="col-12 col-md-3 text-md-right pr-0">
              <label class="small-text lb font-weight-600" for="">Phone number</label>
            </div>
            <div class="col-12 col-md-5 form-group">
              <el-input
                type="text"
                placeholder="Phone Number"
                v-model="churchData.phoneNumber"
                class="w-100 ml-0"
                size="large"
              />
            </div>
            <div class="col-md-4"></div>
          </div>

          <div class="row">
            <div class="col-12 col-md-3 text-md-right pr-0">
              <label class="small-text lb font-weight-600" for="">Email</label>
            </div>
            <div class="col-12 col-md-5 form-group">
              <el-input
                type="text"
                placeholder="Email"
                class="w-100 ml-0"
                v-model="churchData.email"
                size="large"
              />
            </div>
            <div class="col-md-4"></div>
          </div>

          <div class="row select-elem">
            <div class="col-12 col-md-3 text-md-right pr-0">
              <label class="small-text lb font-weight-600">Country</label>
            </div>
            <div class="col-12 col-md-5 form-group">
              <el-select-v2
                v-model="selectCountryID"
                @change="setSelectedCountry"
                :options="countries.map((i) => ({ label: i.name, value: i.id }))"
                placeholder="Select Country"
                class="w-100"
                size="large"
                style="width: 100%"
              />
            </div>
            <div class="col-md-4"></div>
          </div>
          <div class="row select-elem">
            <div class="col-12 col-md-3 text-md-right pr-0">
              <label class="small-text lb font-weight-600">Time zone</label>
            </div>
            <div class="col-12 col-md-5 form-group">
              <el-select-v2
                v-model="selectTimeID"
                @change="setSelectTimeZone"
                :options="timeZone.map((i) => ({ label: i.name, value: i.value }))"
                placeholder="Select time zone"
                class="w-100"
                size="large"
                style="width: 100%"
              />
            </div>
            <div class="col-md-4"></div>
          </div>

          <div class="row">
            <div class="col-12 col-md-3 text-md-right pr-0">
              <label class="small-text lb font-weight-600" for="">Website URL</label>
            </div>
            <div class="col-12 col-md-5 form-group">
              <el-input
                type="text"
                placeholder="Website URL"
                class="ml-0"
                v-model="churchData.websiteUrl"
                size="large"
              />
            </div>
            <div class="col-md-4"></div>
          </div>
          <div class="row">
            <div class="col-md-12 px-">
              <hr class="hr" />
            </div>
          </div>

          <!-- Event attended -->
          <div class="row">
            <div class="col-sm-12 mt-2">
              <span class="sub-header">Pastor's Detail</span>
            </div>
          </div>

          <div class="row">
            <div class="col-12 col-md-3 text-md-right pr-0">
              <label class="small-text lb font-weight-600" for="">Name</label>
            </div>
            <div class="col-12 col-md-5 form-group">
              <el-input
                type="text"
                placeholder="Name"
                v-model="churchData.headPastorName"
                class="w-100 ml-0"
                size="large"
              />
            </div>
            <div class="col-md-4"></div>
          </div>

          <div class="row">
            <div class="col-12 col-md-3 text-md-right pr-0">
              <label class="small-text lb font-weight-600" for="">Email</label>
            </div>
            <div class="col-12 col-md-5 form-group">
              <el-input
                type="text"
                placeholder="Email"
                class="w-100 ml-0"
                v-model="churchData.headPastorEmail"
                size="large"
              />
            </div>
            <div class="col-md-4"></div>
          </div>

          <div class="row">
            <div class="col-12 col-md-3 text-md-right pr-0">
              <label class="small-text" for=""></label>
            </div>
            <div class="col-12 col-md-5">
              <el-button
                class="primary-btn font-weight-bold text-white px-4"
                @click.prevent="churchProfile"
                :color="primarycolor"
                size="large"
                :loading="loading"
                round
                >Save</el-button
              >
              <el-button
                class="primary-btn font-weight-bold text-white px-4"
                @click.prevent="churchData1"
                :color="primarycolor"
                size="large"
                :loading="loading"
                round
                >Save Data</el-button
              >
            </div>
            <div class="col-md-4"></div>
          </div>
        </div>
      </div>
    </div>
  </el-form>
  <div>
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
                  class="w-100 text-white"
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
    <el-dialog
      class=""
      style="border-radius: 25px"
      v-model="showOTP"
      title=""
      :width="mdAndUp || lgAndUp || xlAndUp ? `50%` : `90%`"
    >
    <OTPinput />
      
    </el-dialog>
  </div>
</template>

<script>
import axios from "@/gateway/backendapi";
import OTPinput from "../../components/otp/BaseOTP.vue"
import { ElMessage } from "element-plus";
import { useI18n } from "vue-i18n";
import { SUPPORT_LOCALES as setI18nLanguage } from "../../i18n";
import deviceBreakpoint from "../../mixins/deviceBreakpoint";
import store from "@/store/store";
import { ref, inject, watch } from "vue";
import router from "../../router";
import TimeZone from "@/services/user/timeZone";
export default {
  components: {OTPinput},
  setup() {
    const primarycolor = inject("primarycolor");
    const { mdAndUp, lgAndUp, xlAndUp, xsOnly } = deviceBreakpoint();
    const showOTP = ref(false)
    const churchData = ref({});
    let filterFields = ref([]);
    const loading = ref(false);
    const clickOnce = ref(false);
    const displayVerifyModal = ref(false);
    const timeZone = ref(TimeZone.timeZones);
    const selectCountryID = ref(null);
    const selectTimeID = ref(null);
    let url = ref("");
    let a = ref("");
    let b = ref("b");
    let selectCountry = ref({});
    let selectTime = ref({});
    let image;

    const { locale } = useI18n({ useScope: "global" });
    watch(locale, (val) => {
      setI18nLanguage(val);
    });

    const churchData1 = () => {
      displayVerifyModal.value = true;
    };

    const setSelectedCountry = () => {
      selectCountry.value = countries.value.find((i) => {
        return i.id === selectCountryID.value;
      });
    };
    const setSelectTimeZone = () => {
      selectTime.value = timeZone.value.find((i) => {
        return i.value === selectTimeID.value;
      });
    };
    const imageSelected = (e) => {
      image = e.target.files[0];
      url.value = URL.createObjectURL(image);
    };

    const verifyEmail = async () => {
      if (currentUser.value && currentUser.value.tenantId) {
        try {
        const res = await axios.get(
          `/mobile/v1/Account/SendOTP?phoneNumber=${churchData.value.phoneNumber.trim()}&email=${
            churchData.value.email
          }&tenantId=${currentUser.value.tenantId}`
        );
        if (res.data.status) {
          ElMessage({
            type: "success",
            message: "Request sent",
            duration: 5000,
          });
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
      showOTP.value = true;
      displayVerifyModal.value = false;
      } else {
        try {
        const res = await axios.get(
          `/mobile/v1/Account/SendOTP?phoneNumber=${churchData.value.phoneNumber.trim()}&email=${
            churchData.value.email
          }&tenantId=176bb861-d22e-4598-b2fe-f877888d819c`
        );
        if (res.data.status) {
          ElMessage({
            type: "success",
            message: "Request sent",
            duration: 5000,
          });
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
      showOTP.value = true;
      displayVerifyModal.value = false;
      }
    };

    const uploadImage = () => {};
    let countries = ref([]);
    const currentUser = ref({});
    //Get AllCountry
    const getCountries = async () => {
      try {
        const { data } = await axios.get("/api/GetAllCountries");
        data.sort((a, b) => a.data - b.data);
        console.log(data);
        countries.value = data;
        getChurchProfile();
      } catch (error) {
        getChurchProfile;
        console.log(error);
      }
    };
    getCountries();
    //Get AllChurchProfile
    const getChurchProfile = async () => {
      try {
        const { data } = await axios.get("/mobile/v1/Profile/GetChurchProfile");
        churchData.value = data.returnObject;

        selectCountry.value = countries.value.find((i) => {
          return i.id === churchData.value.countryID;
        });
        selectCountryID.value = selectCountry.value
          ? selectCountry.value.id
          : selectCountry.value;

        selectTime.value = TimeZone.timeZones.find(
          (i) => i.value == churchData.value.timeZone
        );
        selectTimeID.value = selectTime.value ? selectTime.value.value : selectTime.value;

        console.log(churchData.value);
      } catch (error) {
        console.log(error);
      }
    };

    const uploadData = ref({});
    const display = ref(false);
    const churchProfile = () => {
      loading.value = true;
      let formData = new FormData();
      formData.append("ChurchName", churchData.value.churchName);
      formData.append("AKA", churchData.value.aka);
      formData.append("Address", churchData.value.address);
      formData.append("PhoneNumber", churchData.value.phoneNumber);
      formData.append("email", churchData.value.email);
      formData.append("CountryID", selectCountry.value ? selectCountry.value.id : "");
      formData.append("TimeZone", selectTime.value ? selectTime.value.value : "");
      formData.append("WebsiteUrl", churchData.value.websiteUrl);
      formData.append("HeadPastorName", churchData.value.headPastorName);
      formData.append("HeadPastorEmail", churchData.value.headPastorEmail);
      formData.append("HeadPastorPhone", churchData.value.headPastorPhone);
      formData.append("ChurchLogo", image);
      console.log(formData, "klll");

      axios
        .put("/api/Settings/ChurchProfileSettings", formData)
        .then((res) => {
          ElMessage({
            type: "success",
            message: res.data.response,
            duration: 5000,
          });
          router.push("/tenant/settings/defaultmessage");
          loading.value = false;
        })
        .catch((error) => {
          console.log(error);
          loading.value = false;
        });
    };

    const getCurrentUser = () => {
      if (!store.getters.currentUser) {
        axios
          .get(`/api/Membership/GetCurrentSignedInUser`)
          .then((response) => {
            currentUser.value = response.data;
            console.log(response.data, 'kjjkk');
          })
          .catch((error) => console.log(error));
      } else {
        currentUser.value = store.getters.currentUser;
      }
    };
    getCurrentUser();

    return {
      churchData,
      loading,
      selectCountryID,
      selectTimeID,
      setSelectTimeZone,
      setSelectedCountry,
      url,
      imageSelected,
      timeZone,
      uploadImage,
      currentUser,
      countries,
      getCountries,
      getChurchProfile,
      verifyEmail,
      selectCountry,
      selectTime,
      uploadData,
      display,
      mdAndUp,
      lgAndUp,
      xlAndUp,
      xsOnly,
      churchProfile,
      churchData1,
      displayVerifyModal,
      clickOnce,
      showOTP,
      a,
      b,
      filterFields,
      primarycolor,
    };
  },
};
</script>

<style scoped>
* {
  box-sizing: border-box;
  color: #02172e;
}

.page-header {
  margin-bottom: 21px;
  margin-top: 15px;
}

.page-header h2 {
  color: #02172e;
  font-weight: 800;
  font-size: 30px;
}

.sub-header {
  color: #002044;
  font-size: 20px;
  font-weight: 700;
}

.form-container {
  margin-bottom: 44px;
}

.input {
  width: 100%;
  height: 40px;
  border: 1px solid #b9c5cf;
}

.first-row {
  margin-top: 10px;
}

.day-inp {
  border-radius: 8px 0 0 8px;
}

.month-inp {
  border-radius: 0;
}

.year-inp {
  border-radius: 0 8px 8px 0;
}

#welcomeSms,
#welcomeEmail {
  margin-top: 6px;
  margin-left: 10px;
}

.check-box {
  width: 1.2em;
  height: 1em;
  background-color: white;
  border-radius: 50%;
  vertical-align: middle;
  border: 1px solid #b9c5cf;
  /* -webkit-appearance: none; */
  outline: none;
  cursor: pointer;
}

.action-btn {
  background: #fff;
  border: 1px solid #002044;
  border-radius: 111px;
  width: 121px;
  height: 49px;
  outline: transparent;
}

.save-btn {
  color: #fff;
  background: #136acd;
  border-radius: 111px;
  width: 121px;
  height: 49px;
  outline: transparent;
  /* margin-left: 40px; */
}

.required {
  color: #ef0535;
}

.light-grey-bg {
  border-radius: 10px;
}

@media screen and (max-width: 767px) {
  .select-elem {
    height: auto !important;
  }

  .select-div {
    padding: 0.8rem !important;
  }

  .lb {
    display: none !important;
  }

  .first-row {
    flex-flow: column-reverse;
  }
}

.check-box:checked {
  background-color: #0f529f;
}

@media screen and (min-width: 768px) {
  .light-grey-bg {
    position: absolute;
    width: 100%;
    z-index: 900;
  }

  .input::placeholder {
    color: white !important;
  }
}

.check-box:checked {
  background-color: #0f529f;
}

@media screen and (max-width: 770px) {
  .follow-up-header {
    flex-direction: column;
    justify-content: flex-start;
  }

  .followup-hr-span,
  .hr-span {
    width: 100% !important;
  }

  .sub-header {
    width: 100%;
  }
}

@media screen and (min-width: 770px) and (max-width: 1190px) {
  .followup-hr-span {
    width: 60% !important;
  }
}
</style>
