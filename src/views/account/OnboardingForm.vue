<template>
  <div class="top-most" @click="hideModal">
    <div>
      <div id="onboarding">
        <div id="onboarding-form" :class="{ 'swap-box1': toggle }">
          <div class="onboarding-form-container">
            <div class="title-div">
              <div class="main-title">
                <h1>Welcome to Churchplus!</h1>
              </div>
              <div class="sub-title">
                <p>Tell us about you and your church</p>
              </div>
            </div>

            <form style="width: 100%" @submit.prevent="next">
              <div class="input-div">
                <label class="mb-0">What's your name?</label>
                <div class="name-input">
                  <input
                    type="text"
                    class="input"
                    v-model="userDetails.firstName"
                    placeholder="First name"
                    required
                  />
                  <input
                    type="text"
                    class="input"
                    v-model="userDetails.lastName"
                    placeholder="Last name"
                  />
                </div>
              </div>

              <div class="input-div">
                <label class="mb-0">What's the name of your ministry?</label>
                <input
                  v-model="userDetails.churchName"
                  type="text"
                  class="input"
                  placeholder="Name of church"
                  required
                />
              </div>

              <div class="input-div">
                <label class="mb-0">What's your phone number?</label>
                <!-- <div class="phone-input">
                  <div
                    style="width: 200px; margin-top: 4px; cursor: pointer"
                    class="codeModal"
                    @click="toggleCode"
                  >
                    <div class="country-code form-control codeModal">
                      <div style="margin-top: -14px" class="codeModal">
                        <span class="codeModal"
                          ><img
                            :src="selectedCountry.flagUrl"
                            class="codeModal"
                            style="
                              width: 30px;
                              height: 30px;
                              margin: 10px;
                              border-radius: 5px;
                              position: relative;
                              top: 2px;
                            "
                          />
                        </span>
                        <span
                          style="
                            display: inline-block;
                            position: relative;
                            top: 3px;
                            width: 30%;
                          "
                          class="codeModal"
                          >{{
                            selectedCountry.phoneCode
                              ? selectedCountry.phoneCode.includes("+")
                                ? selectedCountry.phoneCode
                                : `+${selectedCountry.phoneCode}`
                              : ""
                          }}
                        </span>
                        <i
                          class="pi pi-angle-down"
                          style="
                            position: relative;
                            top: 5px;
                            right: -13px;
                            z-index: -1;
                          "
                        ></i>
                      </div>
                    </div>
                  </div>

                  <div class="w-100">
                    <input
                      v-model.trim="userDetails.phoneNumber"
                      type="text"
                      class="input phone-num form-control"
                      :class="{ 'is-invalid': !isValid, 'is-valid': valid }"
                      placeholder="Phone number"
                      @blur="invalidResponse"
                      required
                    />
                    <div class="invalid-feedback">
                      Please provide a valid phone number.
                    </div>
                  </div>
                </div> -->

                <div class="w-100">
                  <vue-tel-input
                    :value="userDetails.phoneNumber"
                    @input="onInput"
                    mode="international"
                    style="height: 40px"
                    @blur="invalidResponse"
                  ></vue-tel-input>
                </div>
              </div>

              <div class="input-div cstm-select w-100" id="myInput">
                <label class="mb-0"
                  >What's the membership size of your ministry?</label
                >
                <!-- <SelectElem :typ="'churchsize'" name="churchSize" :options="['--Select size range--', 'Between 1 - 100', 'Between 100 - 1000', 'Between 1000 - 100000']" value="--Select size range--" @input="itemSelected"/> -->
                <Dropdown
                  v-model="userDetails.churchSize"
                  :options="[
                    '1 - 100',
                    '101 - 200',
                    '201 - 500',
                    '501 - 2000',
                    '2001 - 10,000',
                  ]"
                  style="width: 100%"
                  placeholder="Select size range"
                />
              </div>

              <button
                type="submit"
                class="
                  submit-btn
                  sign-in-btn
                  get-started
                  default-btn
                  font-weight-700
                  codeModal
                "
                :class="{ disabled: !disableNext, 'btn-loading': loading }"
                :disabled="!disableNext"
              >
                <i
                  class="fas fa-circle-notch fa-spin codeModal"
                  v-if="loading"
                ></i>
                <span class="codeModal">Next</span>
                <span class="codeModal"></span>
              </button>
            </form>
            <!-- <div
              :class="{ flagCode: showCode, 'hide-code': !showCode }"
              class="codeModal"
            >
              <input class="codeInput input codeModal" v-model="searchText" />
              <div
                v-for="country in countryCodes"
                :key="country.id"
                class="codeModal"
              >
                <div class="codeModal c-pointer" @click="selectCode(country)">
                  <span style="display: inline-block"
                    ><img
                      :src="country.flagUrl"
                      style="
                        width: 30px;
                        height: 30px;
                        margin: 10px;
                        border-radius: 5px;
                      "
                  /></span>
                  <span style="font-weight: 700">{{ country.name }}</span>
                  &nbsp;
                  <span style="display: inline-block; color: #6b6b6b">{{
                    country.phoneCode
                      ? country.phoneCode.includes("+")
                        ? `(${country.phoneCode})`
                        : `(+${country.phoneCode})`
                      : ""
                  }}</span>
                </div>
              </div>
            </div> -->
          </div>
          <!-- <SelectElem name="test" :options="[1, 2, 3]" value="2" v-if="false"/> -->
        </div>
        <div
          class="col-xs-12 col-md-6"
          id="onboarding-visuals"
          :class="{ 'swap-box2': toggle }"
          ref="box2"
        >
          <div class="step">
            <h3>STEP 1 OF 2</h3>
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

    <!-- <select>
      <option v-for="country in countryCodes" :key="country.id">{{ countryCodes }}</option>
    </select> -->
  </div>
</template>

<script>
import axios from "@/gateway/backendapi";
import Dropdown from "primevue/dropdown";
import router from "../../router/index";
import { VueTelInput } from "vue3-tel-input";
import "vue3-tel-input/dist/vue3-tel-input.css";
export default {
  components: {
    Dropdown,
    VueTelInput,
  },
  beforeRouteLeave() {
    const userEmail = localStorage.getItem("email");
    if (userEmail) localStorage.removeItem("email");
  },

  beforeRouteEnter() {
    if (localStorage.getItem("token")) router.push("/next");
    // return next(false);
  },

  data() {
    return {
      toggle: false,
      zipCode: "",
      step1Completed: true,
      userDetails: {
        subscriptionPlanID: 1,
        countryId: 89,
        password: "password",
        phoneNumber: "+234",
      },

      myValue: "",
      myOptions: ["op1", "op2", "op3"],

      selectedCountry: {},
      countries: [
        { country: "Zambia", phoneCode: "234" },
        { country: "Nigeria", phoneCode: "234" },
        { country: "Congo", phoneCode: "235" },
      ],
      loading: false,
      // showCode: false,
      codeUrl: {},
      // searchText: "",
      // isValid: true,
      disableNext: false,
    };
  },
  methods: {
    myChangeEvent(val) {
      console.log(val);
    },
    mySelectEvent({ id, text }) {
      console.log({ id, text });
    },
    onInput(phone, phoneObject, input) {
      if (phoneObject?.formatted) {
        this.userDetails.phoneNumber = phoneObject.formatted;

        this.selectedCountry = this.countries.find(
          (i) => i.phoneCode == phoneObject.countryCallingCode
        );
      }
    },

    next() {
      if (!this.userDetails.email) return false;
      // this.userDetails.phoneNumber = this.userDetails.phoneNumber.includes("+")
      //   ? this.userDetails.phoneNumber
      //   : `+${this.selectedCountry.phoneCode}${this.userDetails.phoneNumber}`;
      // console.log(this.selectedCountry, "country");
      this.userDetails.countryId = this.selectedCountry.id;
      console.log(this.userDetails, "userDetails");
      this.loading = true;
      axios
        .post("/api/onboarding", this.userDetails)
        .then((res) => {
          console.log(res, "onboarding response");
          if (!res.data.token) {
            const preToken = localStorage.getItem("pretoken");
            localStorage.setItem("token", preToken);
            localStorage.removeItem("pretoken");
          } else {
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("roles", JSON.stringify(["Admin"]));
          }
          // this.$store.dispatch("setStartPoint", url)
          this.loading = false;
          router.push("/onboarding/step2");
        })
        .catch((err) => {
          /*eslint no-undef: "warn"*/
          NProgress.done();
          this.loading = false;
          console.log(err.response);
        });

      // this.$store.dispatch("setOnboardingData", this.userDetails);
      // this.$router.push("/onboarding/step2");
    },
    toggleCode() {
      this.showCode = !this.showCode;
      console.log(this.showCode);
    },
    tobby() {
      console.log("Its working");
      this.showCode = !this.showCode;
    },
    selectCode(country) {
      console.log(country);
      this.selectedCountry = country;
      this.showCode = false;
    },
    hideModal(e) {
      console.log(this.showCode);
      if (!e.target.classList.contains("codeModal")) {
        this.showCode = false;
      }
    },
    invalidResponse() {
      if (!this.userDetails.phoneNumber) {
        // this.isValid = false;
        this.disableNext = false;
      } else {
        // this.isValid = true;
        this.disableNext = true;
      }
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

    // countryCodes() {
    //   let codeFlag = [];
    //   // if (this.searchText ===  "") {
    //   codeFlag = this.countries.map((i) => {
    //     return {
    //       phoneCode: i.phoneCode,
    //       flagUrl: i.flagUrl,
    //       id: i.id,
    //       name: i.name,
    //       currency: i.currency,
    //     };
    //   });

    //   if (this.searchText)
    //     return codeFlag.filter(
    //       (i) =>
    //         (i.phoneCode &&
    //           i.phoneCode.includes(this.searchText.toLowerCase())) ||
    //         (i.phoneCode &&
    //           i.name.toLowerCase().includes(this.searchText.toLowerCase()))
    //     );

    //   return codeFlag;
    // },
  },

  beforeCreate() {
    if (!localStorage.getItem("email")) router.push("/");
  },

  created() {
    this.userDetails.email = localStorage.getItem("email");
    axios.get("/api/GetAllCountries").then((res) => {
      this.countries = res.data;
      this.selectedCountry = res.data.find(
        (i) => i.phoneCode && i.phoneCode.includes("234")
      );
    });
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
  background-image: -webkit-linear-gradient(top, #3362c9 0%, #582994 100%);
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

.input::placeholder {
  font-style: italic;
  color: #b2c2cd;
  letter-spacing: 1.5px;
}

.submit-btn {
  background: #136acd;
  outline: none;
}

.disabled {
  background: rgb(141, 165, 238);
}

.submit-btn:hover {
  cursor: pointer;
}

.sign-in-btn {
  color: #fff;
  border: 1px solid transparent;
  margin-top: 8px;
  width: 100%;
  padding: 8px 20px;
  box-sizing: border-box;
  text-align: center;
  min-width: 100px;
  border-radius: 500px;
  vertical-align: middle;
  text-decoration: none;
  appearance: none;
  font-weight: 400;
  font-size: 16px;
}

.input:focus {
  box-shadow: 0 0 0 3px rgba(19, 106, 205, 0.2);
}

.name-input {
  display: flex;
  justify-content: space-between;
}

.name-input input {
  width: 48%;
}

.phone-input {
  display: flex;
  justify-content: space-between;
}

.phone-input .zip-code {
  width: 12%;
  min-width: 77px;
  max-width: 78px;
  color: #3e3e42;
}

.step {
  text-align: center;
  color: #fff;
  margin: 30px 0;
  font-weight: bold;
}

.onboarding-image-con {
  width: 80%;
  margin-left: auto;
  position: relative;
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

.phone-input .phone-num {
  margin-left: 2px;
}

/* Codes */
.codes {
  border: 1px solid #b2c2cd;
  padding: 4px;
  margin: 0;
  border-radius: 4px;
  width: 77px;
  position: absolute;
  background: #fff;
  max-height: 300px;
  overflow: scroll;
  display: none;
}

.code:hover {
  cursor: pointer;
  background: #b2c2cd85;
  padding: 4px;
}

.input:after {
  content: "\25bc" !important;
  color: #aaa;
  font-size: 12px;
  position: absolute;
  right: 8px;
  top: 10px;
}

.show {
  display: block;
}

span .select2-selection--single {
  padding: 0px 10px !important;
  height: 40px !important;
  margin-top: 4px !important;
  display: flex !important;
  align-items: center !important;
  border: 1px solid #b2c2cd;
}
.select2-container .select2-choice {
  padding: 5px 10px;
  height: 100px;
  width: 132px;
  font-size: 1.2em;
}

/* #size {
  -moz-appearance: none !important;
  -webkit-appearance: none !important;
  appearance: none !important;
 
} */

/* drop arrow */
/* #size:after  {
  content: "\25bc" !important;
  color: #aaa;
  font-size: 12px;
  position: absolute;
  right: 8px;
  top: 10px;
}

#size {
  appearance: none !important;
} */

#myInput {
  display: flex;
  flex-direction: column;
}

/* .flagCode {
  width: 330px;
  max-height: 19em;
  overflow-y: scroll;
  overflow-x: hidden;
  box-shadow: -3px 3px 15px #797e8159;
  position: absolute;
  top: 54%;

  background: white;

} */
/* .flagCode > div:first-of-type{ */
/* border: 2px solid green; */
/* width: 35em;      
} */
/* .flagCode div:hover {
  background: rgb(238, 238, 238);
} */

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

  /* .flagCode {
    position: absolute;
    top: 30%;
  } */
}

@media screen and (min-width: 480) {
  .main-title {
    font-size: 33px;
  }
}

/* @media (max-width: 504px) {
  .flagCode {
    margin-top: 11%;
  }
}
@media (max-width: 341px) {
  .flagCode {
    margin-top: 23%;
  }
} */

/* div.country-code {
  height: 40.9px;
  background: transparent;
}

input.codeInput {
  width: 93%;
  margin-left: 12px;
  margin-top: 5px;
}

.hide-code {
  
  height: 0;
  overflow: hidden;
  
} */
</style>