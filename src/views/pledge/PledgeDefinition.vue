<template>
  <div class="container-top container-wide">
    <div class="container-fluid">
      <div class="row d-flex justify-content-between px-3">
        <div class="heading-text">Create Pledge Item</div>
      </div>
      <div class="row">
        <div class="col-md-8">
          <div class="row mt-5">
            <div class="col-md-10 offset-md-2">
              <div class="row">
                <div
                  class="
                    col-12 col-sm-12 col-lg-4
                    text-sm-left text-lg-right
                    align-self-center
                  "
                >
                  <label for="" class=""
                    >Contribution <sup class="text-danger">*</sup>
                  </label>
                </div>

                <div class="col-12 col-sm-12 col-lg-8">
                  <div class="col-12 col-md-12 col-lg-12 pl-md-0 pr-md-0 mt-2">
                    <button
                      class="btn w-100 text-left"
                      type="button"
                      style="
                        border-radius: 4px;
                        border: 1px solid #ced4da;
                        color: #6c757d;
                      "
                      id="dropdownMenuButton"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      {{
                        selectedContribution &&
                        Object.keys(selectedContribution).length > 0
                          ? selectedContribution.name
                          : "Select contribution"
                      }}
                      <i
                        class="
                          pi pi-chevron-down
                          manual-dd-icon
                          float-right
                          pt-1
                        "
                      ></i>
                    </button>
                    <div
                      class="dropdown-menu scroll w-100"
                      aria-labelledby="dropdownMenuButton"
                    >
                      <a
                        class="
                          dropdown-item
                          font-weight-700
                          small-text
                          py-2
                          c-pointer
                        "
                        v-for="(itm, indx) in contributionItems"
                        :key="indx"
                        @click="selectContribution(itm)"
                        >{{ itm.name }}</a
                      >
                      <a
                        class="
                          font-weight-bold
                          small-text
                          d-flex
                          justify-content-center
                          py-2
                          text-decoration-none
                          primary-text
                        "
                        style="border-top: 1px solid #002044; color: #136acd"
                        href="#"
                        type="button"
                        data-toggle="modal"
                        data-target="#exampleModalCenter"
                      >
                        <i
                          class="
                            pi pi-plus-circle
                            mr-2
                            d-flex
                            align-items-center
                          "
                          style="color: #136acd"
                        ></i>
                        Create new Contribution Item
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- Modal -->
            <div
              class="modal fade"
              id="exampleModalCenter"
              tabindex="-1"
              role="dialog"
              aria-labelledby="exampleModalCenterTitle"
              aria-hidden="true"
            >
              <div
                class="modal-dialog modal-lg modal-dialog-centered"
                role="document"
              >
                <div class="modal-content">
                  <div class="modal-header" style="border: none">
                    <h5 class="modal-title" id="exampleModalLongTitle">
                      Add Contribution
                    </h5>
                    <button
                      type="button"
                      class="close"
                      data-dismiss="modal"
                      aria-label="Close"
                    >
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div class="modal-body">
                    <ContributionItems @item-name="newConItems" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="row my-1 mt-4">
            <div class="col-md-10 offset-md-2">
              <div class="row">
                <div
                  class="
                    col-12 col-sm-12 col-lg-4
                    text-sm-left text-lg-right
                    align-self-center
                  "
                >
                  <label for="" class=""
                    >Name <sup class="text-danger">*</sup>
                  </label>
                </div>

                <div class="col-12 col-sm-12 col-lg-8">
                  <input
                    type="text"
                    v-model="pledgeName"
                    class="form-control"
                    :class="{ 'is-invalid': !isNameValid }"
                    @blur="checkNameValue"
                    placeholder="Enter pledge name"
                  />
                  <div class="invalid-feedback">
                    Please enter your pledge name.
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md-10 offset-md-2 mt-3">
              <div class="row">
                <div
                  class="
                    col-12 col-sm-12 col-lg-4
                    text-sm-left text-lg-right
                    align-self-center
                  "
                >
                  <label for="" class=""
                    >Currency <sup class="text-danger">*</sup>
                  </label>
                </div>

                <div class="col-12 col-sm-12 col-lg-8">
                  <Dropdown
                    v-model="selectedCurrency"
                    class="w-100 font-weight-normal"
                    :options="currencyList"
                    optionLabel="name"
                    placeholder="Select Currency"
                  >
                    <template #value="slotProps">
                      <div
                        class="country-item country-item-value"
                        v-if="slotProps.value"
                      >
                        <div>{{ slotProps.value.name }}</div>
                        <!-- <div>{{slotProps.placeholder}}</div> -->
                      </div>
                      <span v-else>
                        {{ slotProps.placeholder }}
                      </span>
                    </template>
                    <template #option="slotProps">
                      <div class="country-item">
                        <div>
                          {{ slotProps.option.name }} -
                          {{ slotProps.option.country }}
                        </div>
                      </div>
                    </template>
                  </Dropdown>
                </div>
              </div>
            </div>
            <div class="col-md-10 my-1 offset-md-2 mt-3">
              <div class="row">
                <div
                  class="
                    col-12 col-sm-12 col-lg-4
                    text-sm-left text-lg-right
                    align-self-center
                  "
                >
                  <label for="" class=""
                    >Target amount <sup class="text-danger">*</sup>
                  </label>
                </div>

                <div
                  class="
                    col-12 col-sm-12 col-lg-8
                    d-flex
                    flex-wrap
                    align-self-center
                  "
                >
                  <div class="col-12 m-0 p-0">
                    <input
                      type="text"
                      v-model="targetAmount"
                      class="form-control w-100"
                      placeholder=" Enter Amount"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="row my-1 mt-4">
            <div class="col-md-10 mt-1 offset-md-2">
              <div class="row">
                <div
                  class="
                    col-12 col-sm-12 col-lg-4
                    text-sm-left text-lg-right
                    align-self-center
                  "
                >
                  <label for="" class="">Pledge type </label>
                </div>
                <div
                  class="
                    col-12 col-sm-12 col-lg-8
                    d-flex
                    justify-content-between
                    flex-wrap
                  "
                >
                  <div
                    class="col-md-4 border py-2 c-pointer free-will"
                    :class="{ 'show-free-will': pledgeCategory == 'freewill' }"
                    @click="freeWill"
                  >
                    Free Will
                  </div>
                  <div
                    class="col-md-4 mt-4 mt-md-0 border py-2 c-pointer"
                    :class="{ 'show-specific': pledgeCategory == 'specific' }"
                    @click="specific"
                  >
                    Specific
                  </div>
                  <div
                    class="col-md-4 mt-4 mt-md-0 border py-2 c-pointer"
                    :class="{ 'show-range': pledgeCategory == 'range' }"
                    @click="range"
                  >
                    Range
                  </div>
                </div>
                <div class="col-md-12 mt-3" v-if="pledgeCategory == 'specific'">
                  <div class="row">
                    <div
                      class="
                        col-12 col-sm-12 col-lg-4
                        text-sm-left text-lg-right
                        align-self-center
                      "
                    >
                      <label for="" class=""> Amount </label>
                    </div>
                    <div class="col-12 col-sm-12 col-lg-8">
                      <input
                        type="text"
                        v-model="specificAmount"
                        class="form-control"
                        placeholder="Enter specific amount"
                      />
                    </div>
                  </div>
                </div>
                <div class="col-md-12 mt-3" v-if="pledgeCategory == 'range'">
                  <div class="row">
                    <div
                      class="
                        col-12 col-sm-12 col-lg-4
                        text-sm-left text-lg-right
                        align-self-center
                      "
                    >
                      <label for="" class="d-none d-lg-block"> Amount </label>
                    </div>
                    <div class="col-12 col-sm-12 col-lg-4">
                      <label for="" class="d-block d-lg-none">
                        Amount From
                      </label>
                      <input
                        type="text"
                        v-model="amountFrom"
                        class="form-control"
                        placeholder="From"
                      />
                    </div>
                    <div class="col-12 col-sm-12 mt-3 mt-md-0 mt-lg-0 col-lg-4">
                      <label for="" class="d-block d-lg-none">
                        Amount To
                      </label>
                      <input
                        type="text"
                        v-model="amountTo"
                        class="form-control"
                        placeholder="To"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="row my-1 mt-4">
            <div class="col-md-10 offset-md-2">
              <div class="row">
                <div
                  class="
                    col-12 col-sm-12 col-lg-4
                    text-sm-left text-lg-right
                    align-self-center
                  "
                >
                  <label for="" class="">
                    Frequency <sup class="text-danger">*</sup>
                  </label>
                </div>

                <div class="col-12 col-sm-12 col-lg-8 d-flex flex-wrap">
                  <div
                    class="col-12 col-sm-12 col-lg-6 border py-2 c-pointer"
                    :class="{ 'show-one-time': pledgeFrequency == 'onetime' }"
                    @click="oneTime"
                  >
                    One time
                  </div>
                  <div
                    class="
                      col-12
                      mt-4 mt-lg-0
                      col-sm-12 col-lg-6
                      border
                      py-2
                      c-pointer
                    "
                    :class="{
                      'show-reoccuring': pledgeFrequency == 'reoccuring',
                    }"
                    @click="reOccuring"
                  >
                    Reoccuring
                  </div>
                </div>
                <div class="col-md-12 mt-3" v-if="pledgeFrequency == 'onetime'">
                  <div class="row">
                    <div
                      class="
                        col-12 col-sm-12 col-lg-4
                        text-sm-left text-lg-right
                        align-self-center
                      "
                    >
                      <label for="" class=""> Start Date </label>
                    </div>
                    <div class="col-12 col-sm-12 col-lg-8">
                      <Calendar
                        dateFormat="dd/mm/yy"
                        class="w-100"
                        id="icon"
                        v-model="startDate"
                        :showIcon="true"
                      />
                    </div>
                    <div
                      class="
                        col-12 col-sm-12 col-lg-4
                        text-sm-left text-lg-right
                        mt-2
                        align-self-center
                      "
                    >
                      <label for="" class=""> End Date </label>
                    </div>
                    <div class="col-12 col-sm-12 col-lg-8 mt-2">
                      <Calendar
                        dateFormat="dd/mm/yy"
                        class="w-100"
                        id="icon"
                        v-model="endDate"
                        :showIcon="true"
                      />
                    </div>
                  </div>
                </div>
                <div
                  class="col-md-12 mt-3"
                  v-if="pledgeFrequency == 'reoccuring'"
                >
                  <div class="row">
                    <div
                      class="
                        col-12 col-sm-12 col-lg-4
                        text-sm-left text-lg-right
                        align-self-center
                      "
                    >
                      <label for="" class=""> Range </label>
                    </div>
                    <div class="col-12 col-sm-12 col-lg-8">
                      <Dropdown
                        v-model="selectedRange"
                        class="w-100 font-weight-normal"
                        :options="reOccuringRange"
                        optionLabel="name"
                        placeholder="Range"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-9 offset-md-5 mt-4">
            <div class="row d-flex justify-content-center">
              <div class="col-md-5 mt-2 mt-md-0">
                <button
                  class="default-btn primary-bg border-0 text-white"
                  data-dismiss="modal"
                  @click="savePledge"
                >
                  <i class="pi pi-spin pi-spinner" v-if="loading"></i> Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Toast />
    </div>
  </div>
</template>

<script>
import axios from "@/gateway/backendapi";
import { ref } from "vue";
import { useStore } from "vuex";
import Dropdown from "primevue/dropdown";
import InputText from "primevue/inputtext";
import { useToast } from "primevue/usetoast";
import Calendar from "primevue/calendar";
import finish from "../../services/progressbar/progress";
import monthDayYear from "../../services/dates/dateformatter";
import { useRoute } from "vue-router";
import ContributionItems from "@/components/firsttimer/contributionItemModal";
import router from "../../router";
// import store from "../../store/store";
import ToggleButton from "../donation/toggleButton.vue";
import CascadeSelect from "primevue/cascadeselect";
export default {
  components: {
    Dropdown,
    ContributionItems,
    Calendar,
    InputText,
    CascadeSelect,
    ToggleButton,
  },
  setup() {
    const toast = useToast();
    const route = useRoute();
    const startDate = ref("");
    const endDate = ref("");
    const Address = ref("");
    const loading = ref(false);
    const value = ref();
    const pledgeCategory = ref("freewill");
    const pledgeFrequency = ref("");
    const showRange = ref(false);
    // const showFreeWill = ref(false)
    // const showPledgeType = ref(false)
    const selectedRange = ref({});
    const selectedContribution = ref({});
    const selectedCurrency = ref({ name: 'Select currency'});
    const isNameValid = ref(true);
    const pledgeName = ref("");
    const amountFrom = ref();
    const amountTo = ref();
    const specificAmount = ref("");
    const pledgeType = ref(0);
    const currencyList = ref([]);
    const contributionItems = ref([]);
    const singlePledge = ref({});
    const targetAmount = ref("");
    const reOccuringRange = ref([
      { name: "Daily" },
      { name: "Weekly" },
      { name: "Monthly" },
      { name: "Quarterly" },
      { name: "SemiAnnually" },
      { name: "Yearly" },
    ]);
    const date = (offDate) => {
      return monthDayYear.normalDate(offDate);
    };

    const getSinglePledgeDefinition = async () => {
      try {
        const res = await axios.get(
          `/api/Pledge/GetSinglePledgeDefinitions?ID=${route.query.id}`
        );
        finish();
        getAllCurrencies(res.data.returnObject.currencyID);
        getContributionCategory(res.data.returnObject.financialContributionID)


        console.log(res.data.returnObject.currencyID, selectedCurrency.value);
        console.log(currencyList);
        targetAmount.value = res.data.returnObject.totalTargetAmount;
        pledgeName.value = res.data.returnObject.name;
        specificAmount.value = res.data.returnObject.donorPaymentSpecificAmount;
        amountFrom.value = res.data.returnObject.donorPaymentRangeFromAmount;
        amountTo.value = res.data.returnObject.donorPaymentRangeToAmount;
        endDate.value = res.data.returnObject.pledgeTypeFrequencyOneTimeEndDate;
        startDate.value =
          res.data.returnObject.pledgeTypeFrequencyOneTimeStartDate;
        selectedRange.value =
          reOccuringRange.value[res.data.returnObject.pledgeTypeFrequencyReOccuring];
        // showPledgeType.value = res.data.returnObject.donorPaymentType
        if (startDate.value && endDate.value) {
          pledgeFrequency.value = "onetime";
        }

        if (selectedRange.value) {
          pledgeFrequency.value = "reoccuring";
        }

        if (res.data.returnObject.donorPaymentType === 0) {
          pledgeCategory.value = "freewill";
          pledgeType.value = 0;
        } else if (res.data.returnObject.donorPaymentType === 1) {
          pledgeCategory.value = "specific";
          pledgeType.value = 1;
        } else if (res.data.returnObject.donorPaymentType === 2) {
          pledgeCategory.value = "range";
          pledgeType.value = 2;
        } else {
          res.data.returnObject.donorPaymentType;
        }
      } catch (error) {
        console.log(error);
      }
    };
    if (route.query.id) getSinglePledgeDefinition();

    const newConItems = (payload) => {
      console.log(payload);
      contributionItems.value.push(payload);
      selectedContribution.value = item;
    };

    const selectContribution = (item) => {
      selectedContribution.value = item;
    };

    const getContributionCategory = (id) => {
        axios
          .get("/api/financials/contributions/items")
          .then((res) => {
            contributionItems.value = res.data;

            if (id) {
                selectedContribution.value = contributionItems.value.find(i => i.id == id)
            }
          })
          .catch((err) => {
            finish();
            if (err.toString().toLowerCase().includes("network error")) {
              networkError.value = true;
            } else {
              networkError.value = false;
            }
            console.log(err);
          });
    };
    getContributionCategory();

    const savePledge = async () => {
      const pledgeDetails = {
        contributionID: selectedContribution.value.id,
        totalTargetAmount: targetAmount.value,
        donorPaymentType: pledgeType.value,
        name: pledgeName.value,
        donorPaymentSpecificAmount: specificAmount.value,
        donorPaymentRangeFromAmount: amountFrom.value,
        donorPaymentRangeToAmount: amountTo.value,
        pledgeTypeFrequencyOneTimeStartDate: startDate.value,
        pledgeTypeFrequencyOneTimeEndDate: endDate.value,
        pledgeTypeFrequencyReOccuring: selectedRange.value.name,
        currencyID: selectedCurrency.value.id,
        // isActive: true
      };
      console.log(pledgeDetails, "pledgedetails");
      loading.value = true;
      if (route.query.id) {
        const pledgeDetail = {
          id: route.query.id,
          contributionID: selectedContribution.value.id,
          totalTargetAmount: targetAmount.value,
          donorPaymentType: pledgeType.value,
          name: pledgeName.value,
          donorPaymentSpecificAmount: specificAmount.value,
          donorPaymentRangeFromAmount: amountFrom.value,
          donorPaymentRangeToAmount: amountTo.value,
          pledgeTypeFrequencyOneTimeStartDate: startDate.value,
          pledgeTypeFrequencyOneTimeEndDate: endDate.value,
          pledgeTypeFrequencyReOccuring: selectedRange.value.name,
          currencyID: selectedCurrency.value.id,
          // isActive: true
        };
        try {
          const response = await axios.put(
            "/api/Pledge/UpdatePledgeDefinition",
            pledgeDetail
          );

          toast.add({
            severity: "success",
            summary: "Successful",
            detail: "Pledge definition updated successfully",
            life: 3000,
          });

          console.log(response, "response");

          router.push("/tenant/pledge/pledgedefinitionlist");

          loading.value = false;
        } catch (error) {
          console.log(error);
          loading.value = false
        }
      } else {
        try {
          const res = await axios.post(
            "/api/Pledge/CreatePledgeDefinition",
            pledgeDetails
          );
          finish();
          loading.value = false;

          toast.add({
            severity: "success",
            summary: "Successful",
            detail: "Pledge definition created successfully",
            life: 2000,
          });

          router.push("/tenant/pledge/pledgedefinitionlist");

          targetAmount.value = "";
          amountTo.value = "";
          amountFrom.value = "";
          selectedCurrency.value = {};
          pledgeName.value = "";
          selectedContribution.value = {};
          specificAmount.value = "";
          selectedRange.value = {};
          startDate.value = "";
          endDate.value = "";
        } catch (error) {
          console.log(error);
          loading.value = false
        }
      }
    };
    const getAllCurrencies = (id) => {
      axios
        .get("/api/lookup/getallcurrencies")
        .then((res) => {
          currencyList.value = res.data.map((i) => {
            return {
              name: i.shortCode,
              id: i.id,
              country: i.country,
            };
          });
          if (id) {
              selectedCurrency.value = currencyList.value.find(
                (i) => i.id == id
            );
          }
        })
        .catch((err) => console.log(err));
    };
     getAllCurrencies();

    const specific = () => {
      pledgeCategory.value = "specific";

      pledgeType.value = 1;
    };
    const range = () => {
      pledgeCategory.value = "range";
      pledgeType.value = 2;
    };
    const freeWill = () => {
      pledgeCategory.value = "freewill";
      pledgeType.value = 0;
    };
    const oneTime = () => {
      pledgeFrequency.value = "onetime";
    };
    const reOccuring = () => {
      pledgeFrequency.value = "reoccuring";
    };

    const checkNameValue = () => {
      if (pledgeName.value.length == 0) {
        isNameValid.value = false;
      } else {
        isNameValid.value = true;
      }
    };

    return {
      newConItems,
      date,
      currencyList,
      selectContribution,
      contributionItems,
      targetAmount,
      isNameValid,
      pledgeName,
      amountFrom,
      amountTo,
      specificAmount,
      checkNameValue,
      selectedCurrency,
      selectedContribution,
      startDate,
      endDate,
      showRange,
      freeWill,
      oneTime,
      reOccuring,
      range,
      specific,
      pledgeCategory,
      pledgeFrequency,
      pledgeType,
      savePledge,
      Address,
      value,
      loading,
      reOccuringRange,
      selectedRange,
      singlePledge,
    };
  },
};
</script>

<style scoped>
.p-dropdown {
  width: 14rem;
}

.country-item {
  width: 17px;
  margin-right: 0.5rem;
}
.scroll {
  max-height: 200px;
  overflow-y: scroll;
  overflow-x: hidden;
}
.heading-text {
  font: normal normal 800 1.5rem Nunito sans;
}
.show-specific {
  background-image: linear-gradient(to top, #accbee 0%, #e7f0fd 100%);
  font-weight: bold;
}
.show-range {
  background-image: linear-gradient(to top, #accbee 0%, #e7f0fd 100%);
  font-weight: bold;
}
.show-free-will {
  background-image: linear-gradient(to top, #accbee 0%, #e7f0fd 100%);
  font-weight: bold;
}
.show-one-time {
  background-image: linear-gradient(to top, #accbee 0%, #e7f0fd 100%);
  font-weight: bold;
}
.show-reoccuring {
  background-image: linear-gradient(to top, #accbee 0%, #e7f0fd 100%);
  font-weight: bold;
}
/* .free-will:hover{
            background-color: #d4dce6;
        } */
</style>