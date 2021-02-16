<template>
  <div class="top-most" @click="hideModal">
    <div>
      <div id="onboarding">
        <div
          id="onboarding-form"
          :class="{ 'swap-box1': toggle }"
        >
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
                    required
                  />
                </div>
              </div>

              <div class="input-div">
                <label class="mb-0">What's your phone number?</label>
                <div class="phone-input">
                  
                  <div style="width: 200px; margin-top:4px;" class="codeModal">
                    <div class="country-code form-control codeModal" @click="toggleCode"><div style="margin-top: -14px;" class="codeModal"><span class="codeModal"><img :src="selectedCountry.flagUrl" class="codeModal" style="width: 30px;height: 30px; margin: 10px; border-radius: 5px;"></span><span style="display: inline-block" class="codeModal">{{ selectedCountry.phoneCode }}</span></div></div>
                    <!-- <div ><img :src="country.flagUrl" width="20px"></div> -->
                    <!-- <Dropdown
                      v-model="selectedCountry"
                      :options="countryCodes"
                      optionLabel="phoneCode"
                      placeholder="Zip code"
                      style="width: 100%;max-height:40px"
                      :filter="true"
                    /> -->
                  
                    
                    <!-- <img src=> -->
                    <!-- <Dropdown :options="countryCodes" optionLabel="phoneCode" placeholder="Zip code" v-model="zipCode" style="width:100%;max-height:40px" /> -->
                    <!-- <SelectElem :typ="'code'" name="code" :options="countryCodes" value="-Select size range" @input="itemSelected"/> -->
                  </div>

                  <input
                    v-model.trim="userDetails.phoneNumber"
                    type="text"
                    class="input phone-num"
                    placeholder="Phone number"
                    required
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

              <div class="input-div cstm-select w-100" id="myInput">
                <label class="mb-0"
                  >What's the membership size of your ministry?</label
                >
                  <!-- <SelectElem :typ="'churchsize'" name="churchSize" :options="['--Select size range--', 'Between 1 - 100', 'Between 100 - 1000', 'Between 1000 - 100000']" value="--Select size range--" @input="itemSelected"/> -->
                <Dropdown
                  v-model="userDetails.churchSize"
                  :options="['Between 1 - 100', 'Between 101 - 200', 'Between 201 - 500', 'Between 501 - 2000']"
                  style="width: 100%"
                  placeholder="Select size range"
                />
              </div>

              
              <button
                type="submit"
                class="submit-btn sign-in-btn get-started default-btn font-weight-700 codeModal"
                :class="{ disabled: !isValid, 'btn-loading': loading }"
                :disabled="!isValid"
              >
                <i class="fas fa-circle-notch fa-spin codeModal" v-if="loading"></i>
                <span class="codeModal">Next</span>
                <span class="codeModal"></span>
              </button>
            </form>
            <div :class=" { 'flagCode' : showCode, 'hide-code' : !showCode } " class="codeModal">
                <input class="codeInput input codeModal" v-model="searchText">
              <div v-for="country in countryCodes" :key="country.id" class="codeModal" >
                <div class="col-sm-3 codeModal" @click="selectCode(country)"><span style="display: inline-block"><img :src="country.flagUrl"  style="width: 30px;height: 30px; margin: 10px; border-radius: 5px;"></span><span style="display: inline-block">{{ country.phoneCode }}</span></div>
              </div>
            </div>
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
export default {
  components: { Dropdown },
  beforeRouteLeave() {
    const userEmail = localStorage.getItem("email");
    if (userEmail) localStorage.removeItem("email");
  },

  beforeRouteEnter() {
    if (localStorage.getItem("token")) this.$router.push("/next")
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
      },

      myValue: '',
      myOptions: ['op1', 'op2', 'op3'],

      selectedCountry: {
      
      },
      countries: [{country: "Zambia", phoneCode: "234"}, {country: "Nigeria", phoneCode: "234"}, {country: "Congo", phoneCode: "235"}],
      loading: false,
      showCode: false,
      codeUrl: {},
      searchText: ""
    };
  },
  methods: {
    myChangeEvent(val){
      console.log(val);
    },
    mySelectEvent({id, text}){
      console.log({id, text})
    },

    next() {
      if (!this.userDetails.email) return false;
      this.userDetails.phoneNumber = this.userDetails.phoneNumber.includes("+")
        ? this.userDetails.phoneNumber
        : `${this.selectedCountry.phoneCode}${this.userDetails.phoneNumber}`;
        console.log(this.selectedCountry, "country");
        this.userDetails.countryId = this.selectedCountry.id;
      console.log(this.userDetails, "userDetails");
      this.loading = true;
      axios
        .post("/api/onboarding", this.userDetails)
        .then((res) => {
          console.log(res, "onboarding response");
          localStorage.setItem("token", res.data.token);
          console.log(typeof res.data.token, "token type")
          // this.$store.dispatch("setStartPoint", url)
          this.loading = false;
          this.$router.push("/onboarding/step2");
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
    toggleCode () {
      this.showCode = !this.showCode
      console.log(this.showCode)
    },
    selectCode (country) {
      console.log(country)
      this.selectedCountry = country
      this.showCode = false
    },
    hideModal (e) {
    console.log(this.showCode)
    if (!e.target.classList.contains("codeModal")){
      this.showCode = false
    }
  }
  },

  computed: {
    churchName() {
      if (!this.userDetails.churchName) return "";
      return this.userDetails.churchName.length < 21
        ? this.userDetails.churchName
        : this.userDetails.churchName.slice(0, 20) + "...";
    },

    isValid() {
      return (
        this.userDetails.firstName &&
        this.userDetails.lastName &&
        this.userDetails.phoneNumber &&
        this.userDetails.churchName &&
        this.userDetails.churchSize &&
        this.selectedCountry.id
      );
    },

    countryCodes() {
      let codeFlag = []
      // if (this.searchText ===  "") {
      codeFlag = this.countries.map(i => {
        return {
          phoneCode: i.phoneCode,
          flagUrl: i.flagUrl,
          id: i.id,
          name: i.name,
          currency: i.currency
        }        
      })

      if (this.searchText)  return codeFlag.filter(i => i.phoneCode && i.phoneCode.includes(this.searchText.toLowerCase()) || i.phoneCode && i.name.toLowerCase().includes(this.searchText.toLowerCase()))
      // codeFlag.filter(i => console.log(i.name.toLowerCase()))
      
      // } else {
      //   cook = this.countries.filter(i => {
      //     if (i.phone){
      //       return i.phoneCode.includes(this.searchText)
      //     }
      //   })
      // }
      // console.log(cook)
      return codeFlag
        
    },
    // searchCode () {
    //  
    //   } 
    
  },

  beforeCreate() {
    if (!localStorage.getItem("email")) this.$router.push("/");
  },
 
  created() {
    this.userDetails.email = localStorage.getItem("email");
    axios.get("/api/GetAllCountries").then((res) => {
      this.countries = res.data;
      console.log(res)
      this.selectedCountry = res.data.find(i => i.phoneCode &&  i.phoneCode.includes("234"))
        console.log(this.selectedCountry)
        console.log(this.countries)
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

option {
  color: red;
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

.flagCode {
    width: 140px;
    max-height: 15em;
    overflow-y: scroll;
    overflow-x: hidden;
    box-shadow: -3px 3px 15px #797e8159;
    position: absolute;
    top: 49.5%;
    /* left: 48px; */
    background: white;
    
    /* display: block; */

}
.flagCode div{
  /* border: 2px solid green; */
  width: 35em;      
}
.flagCode div:hover {
  background: rgb(238, 238, 238)
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

  .flagCode {
    position: absolute;
    top: 34.4%;
  }
}

@media screen and (min-width: 480) {
  .main-title {
    font-size: 33px;
  }
}

@media (max-width: 504px) {
  .flagCode {
    margin-top: 11%;
  }
}
@media (max-width: 341px) {
  .flagCode {
    margin-top: 23%;
  }
}

button.country-code {
  /* border: 2px solid red; */
}

 input.codeInput {
  width: 80%;
  margin-left: 12px;
  margin-top: 5px;
}

.hide-code {
  /* display: none */
  height: 0;
  overflow: hidden;
  /* transition: all 0.4s ease-in-out */
}
</style>