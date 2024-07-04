<template>
  <div class="container-fluid">
    <div class="row">
      <div class="text-head h2 font-weight-bold py-0 my-0 text-black">Make a Pledge</div>
      <div class="col-12 mt-1 px-0">
        <div @click="previousPage">
          <span class="s-18 fw-400 cursor-pointer text-black">
            <img src="../../assets/goback.png" alt="" /> Go back</span
          >
        </div>
      </div>
    </div>
    <div class="container">
      <div class="row mt-5">
        <div class="col-md-8 offset-md-1">
          <div class="row dropdown-container">
            <div class="col-md-4 col-12 text-md-right text-left">
              <label class="text-head font-weight-600 text-dak s-18 " for="">Select Pledge</label>
            </div>

            <div class="ofering col-md-8 col-12 mb-3">
              <el-dropdown trigger="click" class="w-100">
                <span class="el-dropdown-link w-100">
                  <div
                    class="d-flex justify-content-between border-contribution text-secondary w-100"
                    size="large"
                  >
                    <span>{{
                      selectedPledge && Object.keys(selectedPledge).length > 0
                        ? selectedPledge.name
                        : "Select Pledge"
                    }}</span>
                    <div>
                      <el-icon class="el-icon--right">
                        <arrow-down />
                      </el-icon>
                    </div>
                  </div>
                </span>
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item
                      v-for="(itm, indx) in allPledgeList"
                      :key="indx"
                      @click="PledgesType(itm)"
                      >{{ itm.name }}
                    </el-dropdown-item>
                    <el-dropdown-item class="text-center w-100" divided
                      ><a
                        class="font-weight-bold small-text d-flex justify-content-center py-2 text-decoration-none primary-text"
                        style="color: #136acd"
                      >
                        <router-link
                          to="/tenant/pledge/pledgedefinition"
                          class="border-0 font-weight-bold"
                        >
                          <el-icon size="large">
                            <CirclePlus />
                          </el-icon>
                          Create New Pledge Item
                        </router-link>
                      </a></el-dropdown-item
                    >
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
            </div>
            <div
              class="col-md-4 col-12 text-md-right text-left"
              v-if="selectedPledge.donorPaymentType == 2"
            ></div>
            <div class="col-md-8 col-12 mb-3" v-if="selectedPledge.donorPaymentType == 2">
              <div
                class="col-md-12 mt-3 mt-md-0 pledgeType-bg py-1 mb-3 mb-md-0 order-first order-md-last"
              >
                <h4 class="font-weight-600">RANGE</h4>
                <div class="mt-1 col-md-12 px-0 fw-500">
                  You can only pledge within the range of
                </div>
                <h3
                  class="font-weight-600 s-15 col-md-6 px-0 d-flex justify-content-between mt-2 mb-0"
                >
                  {{
                    selectedPledge && selectedPledge.currencySymbol
                      ? selectedPledge.currencySymbol
                      : selectedPledge.currency.symbol
                  }}
                  {{
                    Math.abs(selectedPledge.donorPaymentRangeFromAmount).toLocaleString()
                  }}
                  <div>&</div>
                  {{
                    selectedPledge && selectedPledge.currencySymbol
                      ? selectedPledge.currencySymbol
                      : selectedPledge.currency.symbol
                  }}
                  {{
                    Math.abs(selectedPledge.donorPaymentRangeToAmount).toLocaleString()
                  }}
                </h3>
                <div class="mt-1 font-weight-600">🙂</div>
                <h5 class="font-weight-600 font-italic mt-1 mb-0">HAPPY PLEDGING !</h5>
              </div>
            </div>
            <div
              class="col-md-4 col-12 text-md-right text-left"
              v-if="selectedPledge.donorPaymentType == 1"
            ></div>
            <div class="col-md-8 col-12 mb-3" v-if="selectedPledge.donorPaymentType == 1">
              <div
                class="col-md-12 mt-3 mt-md-0 pledgeType-bg py-1 mb-3 mb-md-0 order-first order-md-last"
              >
                <h4 class="font-weight-600">SPECIFIC</h4>
                <div class="mt-1 col-md-12 px-0 fw-500">You can only pledge</div>
                <h3 class="font-weight-600 mt-3 mb-0">
                  {{
                    selectedPledge && selectedPledge.currencySymbol
                      ? selectedPledge.currencySymbol
                      : selectedPledge.currency.symbol
                  }}
                  {{
                    Math.abs(selectedPledge.donorPaymentSpecificAmount).toLocaleString()
                  }}
                </h3>
                <div class="mt-1 font-weight-600">🙂</div>
                <h5 class="font-weight-600 font-italic mt-1 mb-0">HAPPY PLEDGING !</h5>
              </div>
            </div>
            <div
              class="col-md-4 col-12 text-md-right text-left"
              v-if="selectedPledge.donorPaymentType == 0"
            ></div>
            <div class="col-md-8 col-12 mb-3" v-if="selectedPledge.donorPaymentType == 0">
              <div
                class="col-md-12 mt-3 mt-md-0 pledgeType-bg py-1 mb-3 mb-md-0 order-first order-md-last"
              >
                <h4 class="font-weight-600">FREE WILL</h4>
                <div class="mt-1 col-md-12 px-0 fw-500">
                  You can make a pledge of any amount you wish.
                </div>
                <div class="mt-1 font-weight-600">🙂</div>
                <h5 class="font-weight-600 font-italic mt-1 mb-0">HAPPY PLEDGING !</h5>
              </div>
            </div>
          </div>
          <div class="row mt-3">
            <div class="col-sm-12 col-md-4 text-md-right text-left">
              <label class="text-head font-weight-600 text-dak s-18" for="">Date</label>
            </div>
            <div class="ofering col-md-8 col-12">
              <el-date-picker
                v-model="pledgeDate"
                type="date"
                placeholder="To"
                format="DD/MM/YYYY"
                size="large"
                class="w-100"
              />
            </div>
          </div>
          <div class="row mt-3">
            <div class="col-sm-12 col-md-4 text-md-right text-left">
              <label class="text-head font-weight-600 text-dak s-18" for="">Select Person</label>
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
              <el-input
                type="text"
                v-model="selectedPledge.donorPaymentRange"
                class="input-width w-100"
                :class="{ 'is-invalid': !withinRange }"
                @blur="validateRangeAmount"
                placeholder="Enter pledge amount"
              />
              <div class="invalid-feedback">
                Please make sure the amount is within the range of
                {{
                  Math.abs(selectedPledge.donorPaymentRangeFromAmount).toLocaleString()
                }}
                and
                {{ Math.abs(selectedPledge.donorPaymentRangeToAmount).toLocaleString() }}.
              </div>
            </div>
          </div>
          <div class="row mt-3" v-if="selectedPledge.donorPaymentType == 1">
            <div class="col-sm-12 col-md-4 text-md-right text-left">
              <label for="">Pledge Amount</label>
            </div>
            <div class="ofering col-md-8 col-12">
              <el-input
                type="text"
                v-model="selectedPledge.donorPaymentSpecificAmount"
                :disabled="checking"
                class="input-width w-100"
              />
            </div>
          </div>
          <div class="row mt-3" v-if="selectedPledge.donorPaymentType == 0">
            <div class="col-sm-12 col-md-4 text-md-right text-left">
              <label for="">Pledge Amount</label>
            </div>
            <div class="ofering col-md-8 col-12">
              <el-input
                type="text"
                v-model="freewillAmount"
                class="input-width w-100"
                placeholder="Enter pledge amount"
              />
            </div>
          </div>
        </div>
        <div
          class="col-md-3 mt-3 mt-md-0 py-2 pledgeType-bg"
          v-if="Object.keys(selectedPledge).length == 0"
        >
          <h4 class="text-center font-weight-600">Givers Never Lack</h4>
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
        <div class="col-md-10 d-flex justify-content-center">
          <div class="col-12 col-md-3 "></div>
          <div class="col-12 col-md-6 px-0 ml-4 ">
            <el-button
              :loading="loading"
              :color="primarycolor"
              class="w-100 py-4 mt-4"
              round
              @click="makePledge"
              :disabled="!withinRange"
            >
              <span class="text-white">Save and Continue</span>
            </el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "@/gateway/backendapi";
import { ref, inject } from "vue";
import MembersSearch from "../../components/membership/MembersSearch.vue";
import router from "../../router";
import { useRoute } from "vue-router";
import pledge from "../../services/pledgemodule/pledgemodule";
import finish from "../../services/progressbar/progress";
import store from "../../store/store";
import { ElMessage } from "element-plus";
import ToggleButton from "../donation/toggleButton.vue";
export default {
  components: {
    MembersSearch,
    ToggleButton,
  },
  setup() {
    const primarycolor = inject("primarycolor");
    const route = useRoute();
    const showPerson = ref(false);
    const churchName = ref("");
    const pledgeDate = ref("");
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
    const amountTo = ref("");
    const withinRange = ref(true);
    const pledgeCategory = ref([
      { name: "Free will" },
      { name: "Specific" },
      { name: "Range" },
    ]);

    const PledgesType = (item) => {
      selectedPledge.value = item;
      console.log(item, "hjj");
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
    };

    const getSinglePledge = async () => {
      try {
        const res = await axios.get(`/api/Pledge/GetOnePledge?ID=${route.query.id}`);
        selectedPledge.value = res.data.returnObject.pledgeType;
        console.log(selectedPledge.value, "dgd");
        selectedContact.value = res.data.returnObject.contact;
        selectedContact.value = `${
          res.data.returnObject.contact ? res.data.returnObject.contact : ""
        }`;
      } catch (error) {
        console.log(error);
      }
    };
    if (route.query.id) getSinglePledge();

    const getAllPledgeDefinition = async () => {
      try {
        checking.value = false;
        const res = await pledge.getPledgeDefinition();
        finish();
        allPledgeList.value = res.returnObject;
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
      } else {
        donorAmountBase = selectedPledge.value.donorPaymentRange;
        rangeBase = selectedPledge.value.donorPaymentRangeFromAmount;
      }

      const makePledgeDetails = {
        personID: selectedContact.value.id,
        pledgeTypeID: selectedPledge.value.id,
        amount: donorAmountBase,
        amountBase: rangeBase,
        amountTop: selectedPledge.value.donorPaymentRangeToAmount,
        date: pledgeDate.value
          ? new Date(pledgeDate.value).toLocaleDateString("en-US")
          : "",
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
          date: pledgeDate.value
            ? new Date(pledgeDate.value).toLocaleDateString("en-US")
            : "",
        };
        try {
          const response = await axios.put("/api/Pledge/UpdatePledge", makePledgeDetail);
          ElMessage({
            type: "success",
            message: "Pledge updated successfully",
            duration: 5000,
          });
          makePledgeData.value = response.data.returnObject;
          store.dispatch("pledge/getPledges").then(() => {
            router.push({
              name: "PledgeMaking",
              query: {
                pledgeTypeID: makePledgeData.value.id,
              },
            });
          });

          loading.value = false;
        } catch (error) {
          loading.value = false;
          console.log(error);
        }
      } else {
        try {
          const res = await axios.post("api/Pledge/SavePledge", makePledgeDetails);
          finish();
          makePledgeData.value = res.data.returnObject;
          loading.value = false;
          ElMessage({
            type: "success",
            message: "You have made a pledge successfully",
            duration: 5000,
          });
          store.dispatch("pledge/getPledges").then(() => {
            router.push({
              name: "PledgeMaking",
              query: {
                pledgeTypeID: makePledgeData.value.id,
              },
            });
          });
        } catch (error) {
          loading.value = false;
          if (error.response) {
            ElMessage({
              type: "warning",
              message: "Please ensure to fill up the fields",
              duration: 5000,
            });
          } else {
            ElMessage({
              type: "warning",
              message: "Please ensure you have a strong internet  connection",
              duration: 5000,
            });
          }
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
        ElMessage({
          type: "warning",
          message: "Amount is not within range",
          duration: 5000,
        });
      } else {
        withinRange.value = true;
      }
    };
    const previousPage = () => {
      router.push("/tenant/pledge/pledgeslist");
    };

    return {
      allPledgeList,
      previousPage,
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
      checkEmailValue,
      churchName,
      selectedContact,
      pledgeDate,
      Address,
      value,
      loading,
      loadingCode,
      makePledgeData,
      checkNameValue,
      isNameValid,
      isEmailValid,
      showPerson,
      validateRangeAmount,
      withinRange,
      primarycolor,
    };
  },
};
</script>

<style scoped>
.border-contribution {
  border: 1px solid #787878;
  border-radius: 5px;
  padding: 11px 7px;
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
.pledgeType-bg {
  border: 1px solid #7befff;
  background: #e9fafd;
  border-radius: 5px;
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

.event-buttons a:hover,
.pointer {
  cursor: pointer;
}

.pledge-shadow {
  box-shadow: rgba(17, 17, 26, 0.1) 0px 0px 16px;
  border-radius: 10px;
  padding: 15px;
}
.input-width {
  width: 100%;
}

@media (min-width: 992px) {
  .input-width {
    width: 350px;
  }
}
</style>
