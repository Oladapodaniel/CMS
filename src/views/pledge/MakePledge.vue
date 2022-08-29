<template>
  <div class="container-wide container-top">
    <div class="row d-flex justify-content-between px-3">
      <div class="heading-text">Make a Pledge</div>
    </div>
    <div class="container">
      <div class="row mt-5">
        <div class="col-md-8 offset-md-1">
          <div class="row dropdown-container">
            <div class="col-md-4 col-12 text-md-right text-left">
              <label for="">Select Pledge</label>
            </div>

            <div class="dropdown ofering col-md-8 col-12 mb-3">
              <button
                class="btn d-flex justify-content-between col-12 border"
                type="button"
                id="dropdownMenuButton"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <span class="ofering">
                  &nbsp;&nbsp;&nbsp;
                  {{
                    selectedPledge.name ? selectedPledge.name : "Select Pledge"
                  }}
                </span>
                <span>
                  <i
                    class="pi pi-angle-down offset-sm-2 ofering"
                    aria-hidden="true"
                  ></i>
                </span>
              </button>
              <div
                class="dropdown-menu scroll w-100"
                aria-labelledby="dropdownMenuButton"
              >
                <a
                  class="dropdown-item cursor-pointer"
                  v-for="(item, index) in allPledgeList"
                  :key="index"
                >
                  <div @click="PledgesType(item)">{{ item.name }}</div>
                </a>
                <div class="dropdown-divider"></div>
                <a class="dropdown-item">
                  <router-link
                    to="/tenant/pledge/pledgedefinition"
                    class="border-0 font-weight-bold"
                    >Create New Pledge
                  </router-link>
                </a>
              </div>
            </div>
          </div>
          <div class="row mt-3">
            <div class="col-sm-12 col-md-4 text-md-right text-left">
              <label for="">Select Person</label>
            </div>
            <div class="ofering col-md-8 col-12">
              <MembersSearch
                @memberdetail="chooseContact"
                :currentMember="selectedContact"
              />
            </div>
          </div>
          <div class="row mt-3" v-if="selectedPledge.donorPaymentType == 2">
            <div class="col-sm-12 col-md-4 text-md-right text-left">
              <label for="">Pledge Amount</label>
            </div>
            <div class="ofering col-md-8 col-12">
              <input
                type="number"
                v-model="selectedPledge.donorPaymentRange"
                class="form-control"
                :class="{ 'is-invalid': !withinRange }"
                @blur="validateRangeAmount"
                placeholder="Enter pledge amount"
              />
              <div class="invalid-feedback">
                Please make sure the amount is within the range of
                {{
                  Math.abs(
                    selectedPledge.donorPaymentRangeFromAmount
                  ).toLocaleString()
                }}
                and
                {{
                  Math.abs(
                    selectedPledge.donorPaymentRangeToAmount
                  ).toLocaleString()
                }}.
              </div>
            </div>
          </div>
          <div class="row mt-3" v-if="selectedPledge.donorPaymentType == 1">
            <div class="col-sm-12 col-md-4 text-md-right text-left">
              <label for="">Pledge Amount</label>
            </div>
            <div class="ofering col-md-8 col-12">
              <input
                type="number"
                v-model="selectedPledge.donorPaymentSpecificAmount"
                :disabled="checking"
                class="form-control"
              />
            </div>
          </div>
          <div class="row mt-3" v-if="selectedPledge.donorPaymentType == 0">
            <div class="col-sm-12 col-md-4 text-md-right text-left">
              <label for="">Pledge Amount</label>
            </div>
            <div class="ofering col-md-8 col-12">
              <input
                type="number"
                v-model="freewillAmount"
                class="form-control"
                placeholder="Enter pledge amount"
              />
            </div>
          </div>
        </div>
        <div
          class="col-md-3 pledge-shadow mb-3 mb-md-0 order-first order-md-last"
          v-if="selectedPledge.donorPaymentType == 2"
        >
          <h4 class="text-center font-weight-bold">RANGE</h4>
          <div class="mt-2 text-center font-weight-600">
            You can only pledge within the range of
          </div>
          <h3 class="font-weight-700 text-center mt-3 mb-0">
            NGN
            {{
              Math.abs(
                selectedPledge.donorPaymentRangeFromAmount
              ).toLocaleString()
            }}
          </h3>
          <div class="text-center">&</div>
          <h3 class="font-weight-700 text-center">
            NGN
            {{
              Math.abs(
                selectedPledge.donorPaymentRangeToAmount
              ).toLocaleString()
            }}
          </h3>
          <div class="mt-2 text-center font-weight-600">🙂</div>
          <h5 class="font-weight-600 font-italic text-center mt-3 mb-0">
            HAPPY PLEDGING !
          </h5>
        </div>
        <div
          class="col-md-3 pledge-shadow"
          v-if="selectedPledge.donorPaymentType == 1"
        >
          <h4 class="text-center font-weight-bold">SPECIFIC</h4>
          <div class="mt-2 text-center font-weight-600">
            You can only pledge
          </div>
          <h3 class="font-weight-700 text-center mt-3 mb-0">
            NGN
            {{
              Math.abs(
                selectedPledge.donorPaymentSpecificAmount
              ).toLocaleString()
            }}
          </h3>
          <div class="mt-2 text-center font-weight-600">🙂</div>
          <h5 class="font-weight-600 font-italic text-center mt-3 mb-0">
            HAPPY PLEDGING !
          </h5>
        </div>
        <div
          class="col-md-3 pledge-shadow"
          v-if="selectedPledge.donorPaymentType == 0"
        >
          <h4 class="text-center font-weight-bold">FREE WILL</h4>
          <div class="mt-2 text-center font-weight-600">
            You can make a pledge of any amount you wish.
          </div>
          <div class="mt-2 text-center font-weight-600">🙂</div>
          <h5 class="font-weight-600 font-italic text-center mt-3 mb-0">
            HAPPY PLEDGING !
          </h5>
        </div>
        <div
          class="col-md-3 pledge-shadow"
          v-if="Object.keys(selectedPledge).length == 0"
        >
          <h4 class="text-center font-weight-bold">Givers Never Lack</h4>
          <div class="my-2 text-center font-weight-600">
            God blesses a cheerful giver.
          </div>
          <div class="mt-2 text-center font-weight-600">🙂</div>
          <h5 class="font-weight-600 font-italic text-center mt-3 mb-0">
            HAPPY PLEDGING !
          </h5>
        </div>
      </div>

      <div class="row mt-3">
        <div
          class="
            col-12
            d-flex
            justify-content-center
            text-center text-sm-right
          "
        >
          <button
            class="default-btn primary-bg border-0 ml-3"
            @click="makePledge"
            :disabled="!withinRange"
          >
            <i
              class="fas fa-circle-notch fa-spin mr-2 text-white"
              v-if="loading"
            ></i>
            <span class="text-white">Save and Continue</span>
            <span></span>
          </button>
        </div>
      </div>
    </div>
  </div>
  <Toast />
</template>

<script>
import axios from "@/gateway/backendapi";
import { ref } from "vue";
import Dropdown from "primevue/dropdown";
import InputText from "primevue/inputtext";
import { useToast } from "primevue/usetoast";
import MembersSearch from "../../components/membership/MembersSearch.vue";
import router from "../../router";
import { useRoute } from "vue-router";
import finish from "../../services/progressbar/progress";
// import monthDayYear from "../../services/dates/dateformatter";
// import store from "../../store/store";
import CascadeSelect from "primevue/cascadeselect";
import ToggleButton from "../donation/toggleButton.vue";
export default {
  components: {
    MembersSearch,
    Dropdown,
    InputText,
    CascadeSelect,
    ToggleButton,
  },
  setup() {
    const toast = useToast();
    const route = useRoute();
    const showPerson = ref(false);
    const showPledge = ref(false);
    const churchName = ref("");
    const Address = ref("");
    const loading = ref(false);
    const loadingCode = ref(false);
    const freewillAmount = ref("");
    const checking = ref(false);
    const value = ref();
    const isNameValid = ref(true);
    const isEmailValid = ref(true);
    const selectedPledge = ref({});
    const allPledgeList = ref([]);
    const amountFrom = ref("");
    const makePledgeData = ref("");
    const selectedContact = ref({});
    // const selectedDetail = ref({})
    const isActive = ref(null);
    const amountTo = ref("");
    const withinRange = ref(true);
    const pledgeCategory = ref([
      { name: "Free will" },
      { name: "Specific" },
      { name: "Range" },
    ]);
    const pledgeDate = ref("");

    const PledgesType = (item) => {
      selectedPledge.value = item;
      // showPledge.value = !showPledge.value
    };
    const selectPerson = () => {
      selectedContact.value = {};
      showPerson.value = !showPerson.value;
    };

    const makePayment = () => {
      router.push("/pledge/pledgepayment");
    };

    const chooseContact = (payload) => {
      payload.firstName = payload.name;
      selectedContact.value = payload;
      console.log(selectedContact.vaue, "allContact");
    };

    const active = (payload) => {
      isActive.value = payload;
    };

    const getSinglePledge = async () => {
      try {
        const res = await axios.get(
          `/api/Pledge/GetOnePledge?ID=${route.query.id}`
        );
        console.log(res, 'jjjj');
        // selectedPledge.value = res.data.returnObject.pledgeItemName;
        selectedPledge.value = res.data.returnObject;
        selectedContact.value = res.data.returnObject.contact;
        selectedContact.value = `${
          res.data.returnObject.contact
            ? res.data.returnObject.contact
            : ""
        }`;
      } catch (error) {
        console.log(error);
      }
    };
    if (route.query.id) getSinglePledge();

    const getAllPledgeDefinition = async () => {
      try {
        checking.value = false;
        const res = await axios.get("/api/Pledge/GetAllPledgeDefinitions");
        finish();
        allPledgeList.value = res.data.returnObject;
        isActive.value = res.data.returnObject.map((i) => {
          return {
            isActive: i.isActive,
          };
        });
        console.log(allPledgeList.value, "getPledgeList");
        checking.value = true;
      } catch (error) {
        console.log(error);
      }
    };
    getAllPledgeDefinition();

    const makePledge = async () => {
      let donorAmountBase = "";
      let rangeBase = 0;
      if (selectedPledge.value.donorPaymentType == 0) {
        donorAmountBase = freewillAmount.value;
      } else if (selectedPledge.value.donorPaymentType == 1) {
        donorAmountBase = selectedPledge.value.donorPaymentSpecificAmount;
      } else  {
        donorAmountBase = selectedPledge.value.donorPaymentRange;
        rangeBase = selectedPledge.value.donorPaymentRangeFromAmount
      } 

      const makePledgeDetails = {
        personID: selectedContact.value.id,
        pledgeTypeID: selectedPledge.value.id,
        amount: donorAmountBase,
        amountBase: rangeBase,
        amountTop: selectedPledge.value.donorPaymentRangeToAmount,
      };

      loading.value = true;
      if (route.query.id) {
        const makePledgeDetail = {
          id: route.query.id,
          personID: selectedContact.value.id,
          pledgeTypeID: selectedPledge.value.id,
          amount: donorAmountBase,
          amountBase: rangeBase,
          amountTop: selectedPledge.value.donorPaymentRangeToAmount,
        };
        try {
          const response = await axios.put(
            "/api/Pledge/UpdatePledge",
            makePledgeDetail
          );

          toast.add({
            severity: "success",
            summary: "Successful",
            detail: "Pledge updated successfully",
            life: 3000,
          });

          console.log(response, "response");
          makePledgeData.value = response.data.returnObject;
          router.push({
            name: "PledgeMaking",
            query: {
              // id: makePledgeData.value.pledgeTypeID,
              pledgeTypeID: makePledgeData.value.id,
              // pledgeType: selectedPledge.value.name,
              // name: selectedContact.value.name,
              // date: pledgeDate.value,
              // amount: donorAmountBase
            },
          });

          loading.value = false;
        } catch (error) {
          loading.value = false;
          console.log(error);
        }
      } else {
        try {
          const res = await axios.post(
            "api/Pledge/SavePledge",
            makePledgeDetails
          );
          finish();
          console.log(res.data, "PledgeSave");
          makePledgeData.value = res.data.returnObject;
          loading.value = false;

          toast.add({
            severity: "success",
            summary: "Successful",
            detail: "You are successfully make a Pledge",
            life: 2000,
          });

          router.push({
            name: "PledgeMaking",
            query: {
              // id: makePledgeData.value.pledgeTypeID,
              pledgeTypeID: makePledgeData.value.id,
              // pledgeType: selectedPledge.value.name,
              // name: selectedContact.value.name,
              // date: pledgeDate.value,
              // amount: donorAmountBase
            },
          });
        } catch (error) {
          loading.value = false;
          if (error.response) {
            toast.add({
              severity: "warn",
              summary: "Not successful",
              detail: `Please ensure to fill up the fields`,
              life: 8000,
            });
          } else {
            toast.add({
              severity: "error",
              summary: "Network Error",
              detail: `Please ensure you have a strong internet  connection`,
              life: 4000,
            });
          }
          console.log(error);
        }
      }
    };

    const checkNameValue = () => {
      if (churchName.value.length == 0) {
        isNameValid.value = false;
      } else {
        isNameValid.value = true;
      }
    };

    const checkEmailValue = () => {
      if (pastorEmail.value.length == 0) {
        isEmailValid.value = false;
      } else {
        isEmailValid.value = true;
      }
    };

    const validateRangeAmount = () => {
      if (
        selectedPledge.value.donorPaymentRange <
          selectedPledge.value.donorPaymentRangeFromAmount ||
        selectedPledge.value.donorPaymentRange >
          selectedPledge.value.donorPaymentRangeToAmount
      ) {
        withinRange.value = false;
        toast.add({
          severity: "warn",
          summary: "info",
          detail: "Amount is not within range",
          life: 4000,
        });
      } else {
        withinRange.value = true;
      }
    };

    const currentDate = () => {
      pledgeDate.value = new Date().toISOString().substr(0, 10);
    };
    currentDate();

    return {
      allPledgeList,
      PledgesType,
      checking,
      makePledge,
      chooseContact,
      selectedPledge,
      makePayment,
      pledgeCategory,
      selectPerson,
      amountTo,
      amountFrom,
      freewillAmount,
      // savePledge,
      checkEmailValue,
      churchName,
      selectedContact,
      Address,
      value,
      loading,
      loadingCode,
      makePledgeData,
      checkNameValue,
      isNameValid,
      isEmailValid,
      isActive,
      active,
      showPerson,
      showPledge,
      validateRangeAmount,
      withinRange,
      pledgeDate
      // selectedDetail
    };
  },
};
</script>

<style scoped>
.heading-text {
  font: normal normal 800 1.5rem Nunito sans;
}

.scroll {
  max-height: 400px;
  overflow-y: scroll;
  overflow-x: hidden;
}

.roll3 {
  transition: all 0.5s ease-in-out;
  transform: rotate(180deg);
}

.attendance-body.stretch {
  height: 85px;
}
.attendance-type,
.count {
  background-color: rgb(255, 255, 255);
  width: 80%;
  border-radius: 5px;
  padding: 5px;
}
.attendance-header div,
.attendance-body div {
  padding: 5px;
}

/* .form {
  margin-top: 50px;
  background: #ffffff 0% 0% no-repeat padding-box;
  box-shadow: 0px 3px 15px #797e8159;
  border: 1px solid #dde2e6;
  border-radius: 7px;
}
.form .second-form.row.first-row {
  padding: 30px;
} */

.attendance-header {
  background-color: #ecf0f3;
  padding: 0 50px;
  border: none;
  border-bottom: 1px solid rgb(204, 204, 204);
}

.attendance-header div,
.attendance-body div {
  padding: 5px;
}
.attendance-header div {
  color: #002044;
  font-weight: 700;
}

.style-pledge {
  padding: 10px;
  box-shadow: 0px 3px 15px #797e8159;
  position: absolute;
  /* top: 10px; */
  background: white;
  z-index: 1;
  width: 90%;
  max-height: 20em;
  overflow-y: scroll;
}
.add {
  font: normal normal bold 16px Nunito Sans;
  letter-spacing: 0px;
  color: #136acd;
  display: inline;
  padding: 10px 15px;
  background: #ecf0f3;
  border-radius: 10px 10px 0px 0px;
  position: relative;
  top: -8px;
}
.style-pledge div:hover {
  /* background-color: #ecf0f3; */
  cursor: pointer;
}
.style-person {
  padding: 10px;
  box-shadow: 0px 3px 15px #797e8159;
  position: absolute;
  /* top: 10px; */
  background: white;
  z-index: 1;
  width: 90%;
  height: 10em;
  max-height: 20em;
  overflow-y: scroll;
}
.style-person div:hover {
  background-color: #ecf0f3;
  cursor: pointer;
}

.dropdown-container select {
  /* for Firefox */
  -moz-appearance: none;
  /* for Safari, Chrome, Opera */
  -webkit-appearance: none;
}
/* for IE10 */
.dropdown-container select::-ms-expand {
  display: none;
}

.select-elem-con {
  padding: 47px 0;
  height: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #ebeff4;
  border-radius: 8px;
  font-size: 1.2em;
  font-weight: 600;
}
.event-buttons a:hover,
.pointer {
  cursor: pointer;
}

.select-elem-con:hover {
  background: rgba(166, 200, 232, 0.302);
  transition: all 0.4s ease-in-out;
}

.pledge-shadow {
  box-shadow: rgba(17, 17, 26, 0.1) 0px 0px 16px;
  border-radius: 10px;
  padding: 15px;
}
</style>