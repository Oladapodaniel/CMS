
<template>
  <div
    class="container-wide shadow p-3 mb-5 bg-body rounded mt-5"
    style="max-width: 700px"
  >
    <div class="row mt-5">
      <div class="col-md-6 offset-md-3 mb-3"></div>
    </div>

    <!-- top Address -->
    <div class="row">
      <div
        class="col-md-3 d-md-flex align-items-center justify-content-end text-md-right mt-1 font-weight-700"
      ></div>
      <div class="col-md-5 mb-3">
        <h5 class="font-weight-bold text-center">ATTENDANCE & CHECKIN</h5>
        <p class="text-center font-weight-500">
          {{ eventData.name }} - {{ eventData.date }}
        </p>
      </div>
    </div>

    <!--end top Address -->

    <!-- top area -->
    <div class="row">
      <div class="col-md-3"></div>
      <div class="col-md-7">
        <p
          class="font-weight-600 text-center primary-text"
          v-if="person.personId && loaded && !showLoading"
        >
          Your details were found, please confirm to checkin
        </p>
        <p
          class="font-weight-600 text-center primary-text"
          v-if="!person.personId && !showLoading && loaded && !fetchingFailed"
        >
          Details not found, please fill the form and confirm to checkin
        </p>
        <!-- v-if="autosearch && !person.name" -->
      </div>
    </div>

    <div class="row">
      <div
        class="col-md-3 d-md-flex align-items-center justify-content-end text-md-right mt-1 font-weight-700"
      >
        <label for="">Phone Number</label>
      </div>
      <div class="col-md-7">
        <span class="p-input-icon-left w-100">
          <i class="pi pi-phone icon" />
          <InputText
            @blur="checkCharacter"
            class="w-100"
            type="text"
            v-model="enteredValue"
            aria-required=""
          />
        </span>
        <!-- v-if="autosearch && !person.name" -->
      </div>
    </div>
    <div class="row mb-4">
      <div class="col-md-3"></div>
      <div class="col-md-5">
        <div class="loading-div my-5" v-if="showLoading">
          <i
            class="pi pi-spin pi-spinner loading-indicator"
            style="fontsize: 2rem"
          ></i>
          <p>Fetching your details...</p>
        </div>
        <!-- v-if="autosearch && !person.name" -->
      </div>
    </div>
    <!-- end of top area -->

    <!--start of top area button -->
    <div class="row" :class="{ 'mb-4': showLoading }" v-if="false">
      <div class="col-md-3 text-md-right"></div>
      <div
        class="col-md-5 text-center col-sm-2"
        :class="{ 'mt-4': showLoading }"
      >
        <p
          class="text-danger"
          v-if="showNoPhoneError"
          :class="{ 'my-1': showLoading }"
        >
          Please enter your phone number
        </p>
        <button
          class="default-btn add-btn"
          @click="checkCharacter"
          ref="submitBtn"
          v-if="!appltoggle && !showLoading"
        >
          <!-- <i class="fas fa-circle-notch fa-spin" v-if="loading"></i> -->
          Submit
        </button>
      </div>
    </div>
    <!--end of top area button -->

    <!-- start of bottom area -->
    <div class="row" v-if="appltoggle && !showLoading">
      <div class="col-md-12">
        <div class="row mt-n2 my-2">
          <div
            class="col-md-3 d-md-flex align-items-center justify-content-end text-md-right mt-2 font-weight-700"
          >
            <label for="">Name</label>
          </div>
          <div class="col-md-7">
            <span class="p-input-icon-left w-100">
              <i class="pi pi-users icon" />
              <InputText
                class="w-100"
                type="text"
                aria-required=""
                v-model="person.name"
                :disabled="disabled"
              />
            </span>
          </div>
        </div>

        <div class="row">
          <div
            class="col-md-3 d-md-flex align-items-center justify-content-end text-md-right mt-2 font-weight-700"
          >
            <label for="">Email</label>
          </div>
          <div class="col-md-7">
            <span class="p-input-icon-left w-100 my-md-3">
              <i class="pi pi-envelope icon" />
              <InputText
                class="w-100"
                type="text"
                aria-required=""
                v-model="person.email"
                :disabled="person.personId && person.email"
              />
            </span>
          </div>
        </div>

        <div class="row my-2" v-if="false">
          <div
            class="col-md-3 d-md-flex align-items-center justify-content-end text-md-right mt-2 font-weight-700"
          >
            <label for="">Address</label>
          </div>
          <div class="col-md-7">
            <span class="p-input-icon-left w-100">
              <i class="pi pi-map-marker icon" />
              <InputText
                class="w-100 border"
                type="text"
                aria-required=""
                v-model="person.address"
                :disabled="personHasAddress"
              />
            </span>
            <p
              class="font-weight-7 small-text text-danger mb-0"
              v-if="person.personId && !person.address"
            >
              Address is required
            </p>
          </div>
        </div>
<!-- v-if="!personData.dayOfBirth && personData.monthOfBirth" -->
        <div class="row my-3" >
          <div
            class="col-md-3 d-md-flex align-items-center justify-content-end text-md-right mt-2 font-weight-700"
          >
            <label for="">Birthday</label>
          </div>
          <div class="col-md-7">
            <div class="row">
              <div class="col-6">
                <Dropdown
                  v-model="birthDay"
                  :options="days"
                  style="width: 100%"
                  placeholder="Day"
                />
              </div>
              <div class="col-6">
                <Dropdown
                  v-model="birthMonth"
                  :options="months"
                  style="width: 100%"
                  placeholder="Month"
                  
                />
              </div>
              <!-- <div class="col-12 col-sm-4 mt-3 mt-sm-0">
                <Dropdown
                  v-model="birthYear"
                  :options="year"
                  style="width: 100%"
                  placeholder="Year"
                  
                />
              </div> -->
            </div>
          </div>
        </div>

        <div class="row my-2">
          <div class="col-md-3"></div>
          <div class="col-md-7 py-4 text-center">
            <button class="default-btn mr-3" @click="notme">Not Me</button>
            <button
              class="default-btn add-btn"
              @click="confirmCheck"
              :disabled="
                !person.name || person.name.length < 1"
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
    
    <div class="row">
      <div
        class="col-md-3 d-md-flex align-items-center justify-content-end text-md-right mt-3 font-weight-700"
      ></div>
      <div class="col-md-7 mt-2">
        <p class="text-center fw-normal" style="color: #136acd">
          Powered by CHURCHPLUS
        </p>
      </div>

      <Toast />
    </div>
  </div>
</template>


<script>
import { computed, ref } from "vue";
import axios from "@/gateway/backendapi";
// import router from "../../router/index";
import InputText from "primevue/inputtext";
import { useRoute } from "vue-router";
import dateFormatter from "@/services/dates/dateformatter";
import { useToast } from "primevue/usetoast";
import stopProgressBar from "../../../services/progressbar/progress";
import swal from "sweetalert";
import Dropdown from "primevue/dropdown";

export default {
  components: { Dropdown },
  setup() {
    const connectName = ref("");
    const appltoggle = ref(false);
    const names = ref("");
    const emails = ref("");
    const address = ref("");
    const enteredValue = ref("");
    const loading = ref(false);
    const autosearch = ref(false);
    const noError = ref(true);
    const person = ref({});
    const checkedIn = ref(false);
    const route = useRoute();
    const toast = useToast();
    const submitBtn = ref(null);
    const loaded = ref(false);

    const birthMonth = ref("");
    // const birthYear = ref("");
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const birthDay = ref("");
    const days = ref([ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31 ]);

    // const year = computed(() => {
    //   const arrOfYears = [];
    //   let currentYear = new Date().getFullYear();
    //   while (arrOfYears.length <= 100) {
    //     arrOfYears.push(currentYear);
    //     currentYear = currentYear - 1;
    //   }
    //   return arrOfYears;
    // });

    const toggleBase = () => {
      appltoggle.value = !appltoggle.value;
    };

    const email = computed(() => {
      if (person.value.email) return maskEmail(person.value.email);
      return "";
    });
    const name = computed(() => {
      if (person.value.name) return formatString(person.value.name);
      return "";
    });
    const userAddress = computed(() => {
      if (person.value.email) return formatString(address.value.name);
      return "";
    });

    // searching through the attendance details
    const showNoPhoneError = ref(false);
    const fetchingFailed = ref(false);
    const personHasAddress = ref(false);
    const personData = ref({});
    const checkCharacter = () => {
      // if (e.target.value.length < 11) {
      //   person.value = {};
      //   personHasAddress.value = false;
      //   return false;
      // }
      // loaded.value = false;
      // personHasAddress.value = false;
      // fetchingFailed.value = false;
      // showNoPhoneError.value = false;
      // if (!enteredValue.value) {
      //   showNoPhoneError.value = true;
      //   return false;
      // }
      // if (e.target.value.length > 0) {
      loading.value = true;
      autosearch.value = true;
      axios
        .get(
          `/searchmemberbyphone?searchtext=${enteredValue.value}&&attendanceCode=${route.params.code}`
        )

        .then((res) => {
          const x = { ...res}
          console.log(x, "RESPONSE");
          loading.value = false;
          autosearch.value = false;
          loaded.value = true;
          names.value = res.data;
          personData.value.firstName = res.data[0] ? res.data[0].name : "";
          personData.value.email = res.data[0] ? res.data[0].email : "";
          personData.value.homeAddress = res.data[0] ? res.data[0].address : "";
          personData.value.personId = res.data[0] ? res.data[0].personId : "";
          personData.value.dayOfBirth = res.data[0] ? res.data[0].dayOfBirth : null;
          personData.value.monthOfBirth = res.data[0] ? res.data[0].monthOfBirth : null;
          personData.value.mobilePhone = enteredValue.value;
          person.value = res.data[0] ? res.data[0] : {};
          birthDay.value = res.data[0] && res.data[0].dayOfBirth ? Number(res.data[0].dayOfBirth) : 0;
          birthMonth.value = res.data[0] && res.data[0].monthOfBirth ? months[Number(res.data[0].monthOfBirth)] : 0;
          // birthYear.value = res.data[0] && res.data[0].yearOfBirth ? Number(res.data[0].yearOfBirth) : 0;

          if (
            person.value.personId &&
            person.value.address &&
            person.value.address !== null &&
            person.value.address !== "" &&
            person.value.address.length >= 1
          )
          {
            personHasAddress.value = true;
          }

          if (person.value.name) {
            person.value.name = formatString(person.value.name, 2, 4);
          }
          if (person.value.email) {
            person.value.email = maskEmail(person.value.email, 2, 4);
          }
          if (person.value.address) {
            person.value.address = formatString(person.value.address, 2, 4);
          }
          populateInputfields(person.value);

          if (person.value) appltoggle.value = true;
        })
        .catch((err) => {
          fetchingFailed.value = true;
          person.value = {};
          loaded.value = true;
          loading.value = false;
          autosearch.value = false;

          if (err.toString().toLowerCase().includes("network error")) {
            toast.add({
              severity: "error",
              summary: "Checkin Error",
              detail: "Ensure you have internet access and try again",
              life: 3000,
            });
          } else if (err.message.includes("timeout")) {
            toast.add({
              severity: "error",
              summary: "Checkin Error",
              detail:
                "The request was taking too long, please reload and try again",
              life: 3000,
            });
          } else {
            toast.add({
              severity: "error",
              summary: "Checkin Error",
              detail: "An error occurred, reload and try again",
              life: 3000,
            });
          }
          // appltoggle.value = true;
          console.log(err);
        });
      // }
    };
    //end of searching through the attendance details

    // populate input fields
    const populateInputfields = (obj) => {
      person.value = obj;
      console.log(person);
    };

    const disabled = computed(() => {
      if (person.value.personId) return true;
      return false;
    });

    // function to disable edit
    const disableEdit = (e) => {
      e.preventDefault();
      console.log("hello there");
    };

    // confirm status
    const confirm = () => {
      // person.value.attendanceCode = +route.params.code;
      let newPerson = {};
      if (person.value.personId) {
        newPerson = {
          person: {
            personId: personData.value.personId,
            mobilePhone: enteredValue.value,
            homeAddress: personData.value.homeAddress ? '' : person.value.address,
            email: personData.value.email ? '' : person.value.email,
          },
          attendanceCode: +route.params.code,
        };
      } else {
        newPerson = {
          person: {
            firstName: person.value.name,
            email: person.value.email,
            homeAddress: person.value.address,
            mobilePhone: enteredValue.value,
          },
          attendanceCode: +route.params.code,
        };
      }
      newPerson.person.monthOfBirth = birthMonth.value ? months.indexOf(birthMonth.value) + 1
        : null;
      newPerson.person.dayOfBirth = birthDay.value ? birthDay.value : null;
      // newPerson.person.yearOfBirth = birthYear.value ? birthYear.value : null;

      console.log(personData.value, "p data");
      console.log(newPerson);
      loading.value = true;
      autosearch.value = true;
      noError.value = true;
      axios
        .post("/MarkAttendance", newPerson)
        .then((res) => {
          loading.value = false;
          autosearch.value = false;
          console.log(res, "tosin");

          if (newPerson) checkedIn.value = true;
          swal(
            "Checked-in!",
            "You have been checked-in successfully!",
            "success"
          );
          appltoggle.value = false;
          checkedIn.value = true;
          loaded.value = false;

          // toast.add({
          //   severity: "success",
          //   summary: "Checkin Successful",
          //   detail: "Member Checkin Successful",
          //   life: 3000,
          // });
        })
        .catch((err) => {
          // appltoggle.value = false;
          stopProgressBar();
          loading.value = false;
          autosearch.value = false;
          console.log(err, "ajose");
          noError.value = false;
          toast.add({
            severity: "error",
            summary: "Checkin Error",
            detail: "Member Checkin failed",
            life: 3000,
          });
        });
    };

    // confirm button check

    const confirmCheck = () => {
      confirm();
    };

    // function to clear input
    const clearNames = () => {
      names.value = [];
    };

    const notme = () => {
      person.value = {};
      enteredValue.value = "";
    };

    // getting events and date
    const eventData = ref({});
    const getDateAndEvent = () => {
      axios
        .get(
          `/api/publiccontent/WebCheckInGetEventDetails?attendanceCode=${+route
            .params.code}`
        )
        .then((res) => {
          eventData.value.name = res.data.fullEventName;
          eventData.value.date = dateFormatter.monthDayTime(res.data.eventDate);

          console.log(eventData);
          console.log(res, "response");
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getDateAndEvent();

    /* start masking functions */

    // function mask email
    const maskEmail = (str, numToShowInFront) => {
      if (str.length > 3) {
        const firstX = str.slice(0, numToShowInFront);
        const midPoint = str.split("").indexOf("@");
        let x = str.split("");
        x.forEach((i, j) => {
          if (j < midPoint) {
            x[j] = "*";
          }
        });
        x = x.join("");
        return firstX + x.slice(numToShowInFront);
      } else {
        return str[0] + "*" + str[2];
      }
    };

    const formatString = (str, numToShowInFront, numToHide) => {
      if (str.length > 3) {
        const firstX = str.slice(0, numToShowInFront);
        // const midPoint = str.split('').indexOf('@')
        const midPoint = numToShowInFront + numToHide;
        let x = str.split("");
        x.forEach((i, j) => {
          if (j < midPoint) {
            x[j] = "*";
          }
        });
        x = x.join("");
        return firstX + x.slice(numToShowInFront);
      } else {
        return str[0] + "*" + str[2];
      }
    };

    const showLoading = computed(() => {
      return autosearch.value && !person.value.name;
    });

    /*end of masking functions */

    //not me button
    // const notMe = () => {};

    return {
      toggleBase,
      checkCharacter,
      populateInputfields,
      InputText,
      appltoggle,
      names,
      emails,
      address,
      enteredValue,
      loading,
      person,
      autosearch,
      disableEdit,
      confirm,
      clearNames,
      getDateAndEvent,
      route,
      eventData,
      dateFormatter,
      checkedIn,
      confirmCheck,
      disabled,
      connectName,
      formatString,
      maskEmail,
      name,
      email,
      userAddress,
      showNoPhoneError,
      notme,
      noError,
      submitBtn,
      showLoading,
      loaded,
      fetchingFailed,
      personHasAddress,
      months,
      // year,
      days,
      birthMonth,
      birthDay,
      // birthYear,
      personData,
    };
  },
};
</script>

<style scoped>
.add-btn {
  background: #136acd;
  color: #ffffff;
  font-weight: bold;
  font-size: 1rem;
  border: none;
}

.add-btn2 {
  background: none;
}

.loading-indicator {
  font-size: 76px;
  position: absolute;
  margin-top: 86px;
}

.loading-div {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>