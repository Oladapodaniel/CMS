<template>
  <div class="container-fluid  mx-0 tool">
   <div class="row justify-content-center mx-0  ">
      <div class="col-md-12   d-flex justify-content-center my-3  ">
        <div class="col-md-3 mt-4  d-flex align-items-center">
            <div class="pl-2">
              <img
                      :src="churchLogo2"
                      v-if="churchLogo2"
                      class="link-image"
                      alt=""
                      style="width:60px"
                    />
                    <img
                      src="../../assets/dashboardlinks/churchcloud.png"
                      v-else
                      class="link-image "
                      alt=""
                    />
            </div>
            <!-- <span><h4 class="font-weight-bold mt-3">{{contributionDetail.tenantName ? contributionDetail.tenantName :  "Churchplus" }}</h4></span> -->
            <span><h4 class="font-weight-bold mt-3">{{churchName ? churchName:  "Churchplus" }}</h4></span>
        </div>
      </div>
      <!-- <div class="d-flex justify-content-center col-md-12  text-dark mt-3 mb-2">
        <div class="col-md-6 text-center">
          Your contribution is much appreciated
        </div>
      </div> -->
    </div>

    <div class="row d-flex justify-content-center">
      <div class="col-11 col-sm-8 col-md-7 col-lg-5 card pb-2">
        <div class="container ">
          <div class="row mt-4 justify-content-center">
            <div class="col-md-12 text-center  heading-text">
              {{contributionDetail.name}} Payment
            </div>
            <div class="col-md-11 mt-4">
              <!-- <div class="col-md-12">
                <label for="">Contribution Name</label>
              </div>
              <div class="col-md-12">
                <input
                  type="text"
                  v-model="contributionDetail.name"
                  :disabled="checking"
                  class="form-control"
                />
              </div> -->
              <!-- <div class="col-12 d-flex  justify-content-between flex-wrap" >

                  <div class="col-sm-6 mx-0 px-0 col-12 small d-flex justify-content-center  justify-content-sm-start  small font-weight-bold">
                    <div v-if="contactDetail.name"><i class="pi pi-users icon" /> {{contactDetail.name}}</div>
                  </div>
                  <div class="col-sm-6 mx-0 px-0 col-12 d-flex justify-content-center small justify-content-sm-end font-weight-bold" >
                    <div v-if="contactDetail.email "><i class="pi pi-envelope icon" /> {{contactDetail.email}}</div>
                  </div>
               
              </div> -->
            </div>
            <div class="col-md-11 mt-3">
              <div class="col-md-12">
                <label for="">Pledge Name<sup class="text-danger">*</sup></label>
              </div>
              <div class="col-md-12">
                <el-select-v2 v-model="selectPledgeItemID" @change="setSelectPledgeItem" 
                  :options="contributionDetail.pledgeItemDTOs.map(i => ({ label: i.name, value: i.id }))" placeholder="Select Pledge"
                  size="large" class="input-width" />
              </div>
            </div>
            <div class="col-md-11 mt-3">
              <div class="col-md-12">
                <label for="">Phone Number<sup class="text-danger">*</sup></label>
              </div>
              <div class="col-md-12">
                <span class="p-input-icon-left w-100">
                  <i class="pi pi-phone icon" />
                  <InputText
                    @blur="checkContact"
                    @input="CheckAfterEleven"
                    class="w-100"
                    type="text"
                    v-model="userSearchString"
                    aria-required=""
                    placeholder="Enter your phone number"
                  />
                </span>
                <div class="col-12">
                  <p
                    class="text-danger"
                    v-if="showNoPhoneError"
                    :class="{ 'my-1': showLoading }"
                  >
                    Please enter your phone number
                  </p>
                </div>
                <div class="col-md-12">
                  <div class="loading-div my-5" v-if="showLoading">
                    <i
                      class="pi pi-spin pi-spinner loading-indicator"
                      style="fontsize: 2rem"
                    ></i>
                    <p>Fetching your details...</p>
                  </div>
                </div>
              </div>
              <div
                 class=" col-md-12 mt-4 small"
                 style="color: #f59b47;"
                    v-if="personToggle "
                    :class="{ 'mt-3': showLoading }"
                  
                >
                  Your detail were not found kindly enter your detail below to continue!
                </div>
              <div class="col-12 d-flex  justify-content-between flex-wrap" >

                  <div class="col-sm-6 mx-0 px-0 col-12 small d-flex justify-content-center  justify-content-sm-start  small">
                    <div v-if="contactDetail.name"> {{contactDetail ? contactDetail.name : "" }}</div>
                  </div>
                  <div class="col-sm-6 mx-0 px-0 col-12 d-flex justify-content-center small justify-content-sm-end " >
                    <div v-if="contactDetail.email "> {{maxEmail ? maxEmail :  ""}}</div>
                  </div>
               
              </div>
            </div>
            <!-- <div class="row justify-content-center mx-0" > -->
            <!-- <div class="col-md-11 mt-3" v-if="appltoggle && !showLoading">
              <div class="col-md-12">
                <label for="">Name</label>
              </div>
              <div class="col-md-12">
                <span class="p-input-icon-left w-100">
                  <i class="pi pi-users icon" />
                  <InputText
                    class="w-100"
                    type="text"
                    v-model="contactDetailName"
                    aria-required=""
                    placeholder="Name"
                    :disabled="disabled"
                  />
                </span>
              </div>
            </div> -->
            <div class="col-md-11 mt-3" v-if=" personToggle">
              <div class="col-md-12">
                <label for="">Name</label>
              </div>
              <div class="col-md-12">
                <span class="p-input-icon-left w-100">
                  <i class="pi pi-users icon" />
                  <InputText
                    class="w-100"
                    type="text"
                    v-model="contactDetail.name"
                    aria-required=""
                    placeholder="Name"
                  />
                </span>
              </div>
            </div>
            <div class="col-md-11 mt-3" v-if=" personToggle">
              <div class="col-md-12">
                <label for="">Email</label>
              </div>
              <div class="col-md-12">
                <span class="p-input-icon-left w-100">
                  <i class="pi pi-envelope icon" />
                  <InputText
                    class="w-100"
                    type="text"
                    v-model="contactDetail.email"
                    aria-required=""
                    placeholder="Email"
                  />
                </span>
              </div>
            </div>

            <div v-if="personToggle" class=" mt-4 col-md-11"> <hr class="w-100"> </div>
            <!-- <div class="col-md-11 mt-3" v-if="appltoggle && !showLoading">
              <div class="col-md-12">
                <label for="">Email</label>
              </div>
              <div class="col-md-12">
                <span class="p-input-icon-left w-100">
                  <i class="pi pi-envelope icon" />
                  <InputText
                    class="w-100"
                    type="text"
                    v-model="contactDetailEmail"
                    aria-required=""
                    placeholder="Email"
                    :disabled="
                      contactDetail.personId &&
                      contactDetail.email &&
                      contactDetail.email !== null &&
                      contactDetail.email !== ''
                    "
                  />
                </span>
              </div>
            </div> -->
            <!-- </div> -->
            <div
              class="col-md-11 mt-3"
              v-if="
                donorDetail.donorPaymentType == 1 &&
                appltoggle &&
                !showLoading
              "
            >
              <div class="col-md-12">
                <label for="">Contribution Amount</label>
              </div>
              <div class="col-md-12">
                <input
                  type="text"
                  v-model="amountPaid"
                  :disabled="checking"
                  class="form-control"
                />
              </div>
            </div>
            <div
              class="col-md-11 mt-3"
              v-if="
                donorDetail.donorPaymentType == 2 &&
                appltoggle &&
                !showLoading
              "
            >
              <div class="col-md-12">
                <label for=""
                  >Amount Ranging from
                  {{
                    Math.abs(
                      donorDetail.donorPaymentRangeFromAmount
                    ).toLocaleString()
                  }}
                  -
                  {{
                    Math.abs(
                      donorDetail.donorPaymentRangeToAmount
                    ).toLocaleString()
                  }}</label
                >
              </div>
              <div class="col-md-12">
                <input
                  type="text"
                  v-model="amountPaid"
                  :class="{ 'is-invalid': !withinRange }"
                  @blur="validateRangeAmount"
                  class="form-control"
                  placeholder="Enter amount"
                />
                <div class="invalid-feedback">
                  Please make sure the amount is within the range of
                  {{
                    Math.abs(
                      donorDetail.donorPaymentRangeFromAmount
                    ).toLocaleString()
                  }}
                  and
                  {{
                    Math.abs(
                      donorDetail.donorPaymentRangeToAmount
                    ).toLocaleString()
                  }}.
                </div>
              </div>
            </div>
            <div
              class="col-md-11 mt-3"
              v-if="
                donorDetail.donorPaymentType == 0 &&
                appltoggle &&
                !showLoading
              "
            >
              <div class="col-md-12">
                <input
                  type="text"
                  v-model="amountPaid"
                  class="form-control"
                  placeholder="Enter amount"
                />
              </div>
            </div>
            <div
              class="col-md-11 mt-3"
              v-if="
                 contactDetail && contactDetail.pledges && contactDetail.pledges.length ===  0  &&
                appltoggle &&
                !showLoading
              "
            >
              <div class="col-md-12 ">
                <label for="">How much do you want to contribute ?</label>
              </div>
              <div class="col-md-12">
                <input
                  type="text"
                  v-model="pledgeAmount"
                  class="form-control"
                  placeholder="Enter Amount"
                />
              </div>
            </div>
            <div v-if="
                contactDetail && contactDetail.pledges && contactDetail.pledges.length ===  0  &&
                appltoggle &&
                !showLoading
              "
               class="mt-4 col-md-11"> <hr class="w-100"> </div>
            <div
              class="col-md-11 mt-3"
              v-if="
                contactDetail && contactDetail.pledges && contactDetail.pledges.length ===  0  &&
                appltoggle &&
                !showLoading
              "
            >
              <div class="col-md-12 font-weight-bold">
                <label for="">How much do you want to pay now ?</label>
              </div>
              <div class="col-md-12">
                <input
                  type="text"
                  v-model="amountPaid"
                  :class="{ 'is-invalid': !withinRange }"
                  @blur="validatePaidAmount"
                  class="form-control input-border"
                  placeholder="Enter Amount"
                />
                <div
                  class="invalid-feedback"
                  v-if="amountPaid < 0 || amountPaid == 0"
                >
                  Please make sure the amount is not below this
                  {{ Math.abs(pledgeAmount).toLocaleString() }}
                </div>
                <!-- <div class="invalid-feedback" v-else-if="amountPaid > pledgeAmount ">
                       Please make sure the amount is not above this
                        {{
                        Math.abs(
                            pledgeAmount
                        ).toLocaleString()
                        }}
                    </div> -->
              </div>
            </div>
             <div
              class="col-md-11 mt-3"
              v-if="
                 personToggle
              "
            >
              <div class="col-md-12 ">
                <label for="">How much do you want to contribute ?</label>
              </div>
              <div class="col-md-12">
                <input
                  type="text"
                  v-model="pledgeAmount"
                  class="form-control"
                  placeholder="Enter Amount"
                />
              </div>
            </div>
            <div v-if="
                !contactDetail.pledges &&
                appltoggle &&
                !showLoading
              "
               class="mt-4 col-md-11"> <hr class="w-100"> </div>
            <div
              class="col-md-11 mt-3"
              v-if="
              personToggle
              "
            >
              
              <div class="col-md-12 font-weight-bold ">
                <label for="">How much do you want to pay now ?</label>
              </div>
              <div class="col-md-12">
                <input
                  type="text"
                  v-model="amountPaid"
                  :class="{ 'is-invalid': !withinRange }"
                  @blur="validatePaidAmount"
                  class="form-control input-border"
                  placeholder="Enter Amount"
                />
                <div
                  class="invalid-feedback"
                  v-if="amountPaid < 0 || amountPaid == 0"
                >
                  Please make sure the amount is not below this
                  {{ Math.abs(pledgeAmount).toLocaleString() }}
                </div>
              </div>
            </div>

             <!-- <div class="row">
              <div class="col-12 mt-3 text-center mb-5">
                <button
                  class="w-100 text-white border-0 pay"
                  style="background: #3c7e58"
                >
                  PAY
                </button>
              </div>
            </div> -->
            <div class="col-md-11 mt-4 mb-4 d-flex justify-content-center">
              <div class="col-md-12">
                  <button
                  class="w-100 border-0 default-btn primary-bg text-white font-weight-bold  pay"
                  data-dismiss="modal"
                  data-toggle="modal"
                  data-target="#PaymentOptionModal"

                  >
                    <i class="pi pi-spin pi-spinner" v-if="loading"></i> PAY
                  </button>
              </div>
              
            </div>

             <div class="row justify-content-center">
              <div
                class="col-md-6  text-center align-item-center mb-4"
              >
                <div class="">Powered by</div>
                <div>
                   <img
                  src="../../assets/logoblue.png"
                  alt="churchplus Logo"
                  class="w-50 mx-2 "
                />
              </div>
              </div>
                 
            </div>

            <div
              class="
                row
                mt-3
                d-flex
                justify-content-center
              "
            >
              <div
                class="
                  col-10 col-sm-8 col-md-7   pl-0 
                "
              >
                  <div class="row">
                        <div class="col-3">
                            <img src="../../assets/VisaDebit.png" class="w-100">
                            <!-- <img src="../../assets/paystack.png" class="w-100"> -->
                        </div>
                        <div class="col-3 pr-0">
                            <img src="../../assets/Full-Flutterwave.png" class="w-100">
                            <!-- <img src="../../assets/flutterwave.png" class="w-100"> -->
                        </div>
                        <div class="col-3 pr-0">
                            <!-- <img src="../../assets/Full-Flutterwave.png" class="w-100"> -->
                            <img src="../../assets/paystack.png" class="w-100">
                        </div>
                        <div class="col-3 pl-0 text-right">
                            <img src="../../assets/paypal.png" class="w-50">
                            <!-- <img src="../../assets/paypal.png" class="w-50"> -->
                        </div>
                  </div>
                <!-- <div class="col-2 p-0 m-0">
                  <img class="w-100" src="../../assets/VisaDebit.png" alt="" />
                </div>

                <div class="col-2 p-0 m-0">
                  <img
                    class="w-100"
                    src="../../assets/MastercardDebit.png"
                    alt=""
                  />
                </div>

                <div class="col-2 p-0 m-0">
                  <img class="w-100" src="../../assets/PayPal2.png" alt="" />
                </div>

                <div class="col-md-3 p-0 m-0">
                  <img
                    class="w-100"
                    src="../../assets/Full-Flutterwave.png"
                    alt=""
                  />
                </div> -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      class="modal fade"
      id="PaymentOptionModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalCenterTitle"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header bg-modal">
            <h5 class="modal-title" id="exampleModalLongTitle">
              Payment methods
            </h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true" ref="close">&times;</span>
            </button>
          </div>
          <div class="modal-body p-0 bg-modal pb-5">
            <div class="row">
              <div class="col-sm-12 p-4 text-center continue-text">
                Continue payment with
              </div>
            </div>
            <div class="row row-button c-pointer" @click="payWithPaystack">
              <div class="col-12 col-md-4 col-sm-7 offset-1">
                <img
                  style="width: 150px"
                  src="../../assets/4PaystackLogo.png"
                  alt="paystack"
                />
              </div>
            </div>
            <div class="row row-button c-pointer" @click="payWithFlutterwave">
              <div class="col-12 col-md-4 col-sm-7 offset-1">
                <img
                  style="width: 150px"
                  src="../../assets/flutterwave_logo_color@2x.png"
                  alt="flutterwave"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Toast />
  </div>
</template>

<script>
import axios from "@/gateway/backendapi";
import { ref, computed } from "vue";
import Dropdown from "primevue/dropdown";
import InputText from "primevue/inputtext";
import { useToast } from "primevue/usetoast";
import userService from "../../services/user/userservice";
import SearchContribution from "../../components/Contribution/SearchContribution.vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import router from "../../router";
import { v4 as uuidv4 } from "uuid";
import CascadeSelect from "primevue/cascadeselect";
import finish from "../../services/progressbar/progress";
import ToggleButton from "../donation/toggleButton.vue";
export default {
  components: {
    SearchContribution,
    Dropdown,
    InputText,
    CascadeSelect,
    ToggleButton,
  },
  setup() {
    const toast = useToast();
    const searchID = ref('')
    const selectPledgeItemID = ref(null)
    const selectedPledgeItem = ref({})
    const appltoggle = ref(false);
    const personToggle = ref(false);
    const associationLogo = ref("")
    const churchLogo2 = ref("")
    const contactDetailName = ref("")
    const contactDetailEmail = ref("")
    const store = useStore();
    const withinRange = ref(true);
    const searchRef = ref("");
    const currentUser = ref(store.getters.currentUser);
    const tenantId = ref(currentUser.tenantId);
    const selectedCurrency = ref("");
    const userSearchString = ref("");
    const route = useRoute();
    const members = ref([]);
    const churchName = ref("");
    const memberName = ref("");
    const contactDetail = ref({});
    const autosearch = ref(false);
    const showNoPhoneError = ref(false);
    const Address = ref("");
    const loading = ref(false);
    const freewillAmount = ref("");
    const checking = ref(false);
    const value = ref();
    const isNameValid = ref(true);
    const isEmailValid = ref(true);
    const selectedPledge = ref({});
    const allPledgeList = ref([]);
    const contributionDetail = ref({});
    const amountFrom = ref("");
    const amountTo = ref("");
    const logoUrl = `https://flutterwave.com/images/logo-colored.svg`;
    const isProduction = true;
    const selectedChannel = ref("");
    const searchedContact = ref({});
    const selectedContact = ref({});
    const donorDetail = ref({})
    const donorDetails = ref({})
    const amountPaid = ref("");
    const pledgeAmount = ref("");
    const maxEmail = ref("")
    const txnRef = ref("");
    const pledgeCategory = ref([
      { name: "Free will" },
      { name: "Specific" },
      { name: "Range" },
    ]);
    const channel = ref([
      { name: "Bank Transfer" },
      { name: "Cash" },
      { name: "Online" },
      { name: "POS" },
      { name: "USSD" },
      { name: "Cheque" },
    ]);

    const populateInputfields = (obj) => {
      contactDetail.value = obj;
      console.log(contactDetail.value, "sdsdasdassafwf");
    };

    

    const disabled = computed(() => {
      if (contactDetail.value.personId) return true;
      return false;
    });

    const showLoading = computed(() => {
      return autosearch.value;
    });
    const setSelectPledgeItem = () => {
      selectedPledgeItem.value = contributionDetail.value.pledgeItemDTOs.find(i => {
        return i.id == selectPledgeItemID.value
      })
    }

    const checkContact = async () => {
     if (!userSearchString.value) {
            showNoPhoneError.value = true;
            return false;
        }
        if(route.query.tenantID){
          searchID.value = route.query.tenantID
        } else if(route.query.pledgeDefinitionID){
          searchID.value = route.query.pledgeDefinitionID
        }else if(route.query.pledgeID){
          searchID.value = route.query.pledgeID
        }
      loading.value = true;
      autosearch.value = true;
      // personToggle.value = true
      try {
        const { data } = await axios.get(
          `/SearchContributionByPhoneOrMemberID?searchText=${userSearchString.value}&Id=${searchID.value}`
        );
        personToggle.value = true
        contactDetail.value = data[0] ? data[0] : {};
        pledgeDefinitionDetail.value = 
        console.log(contactDetail.value, "the contactDetail");
        amountPaid.value = donorDetail.value.donorPaymentSpecificAmount
        donorDetail.value = data[0] && data[0].pledges[0] ? data[0].pledges[0].pledgeType : {};
        maxEmail.value = contactDetail.value.email.replace(/(\w{3})[\w.-]+@([\w.]+\w)/, "$1***@$2")
        console.log(donorDetail.value, "donor")


        console.log(contactDetail.value, "contribution number");
        loading.value = false;
        autosearch.value = false;

        populateInputfields(contactDetail.value);
        if (contactDetail.value ) appltoggle.value = true;
        if (!contactDetail.value.email || !contactDetail.value.name ){
           personToggle.value = true
        }else{
          return  personToggle.value = false
        }
      } catch (error) {
        console.log(error);
        loading.value = false;
        autosearch.value = false;
      }
    };
    const CheckAfterEleven = (e) => {
      if (e.target.value.length >= 11) {
        checkContact();
      }
    };
    const pledgeDefineID = ref(route.params.id);
    const setContact = (payload) => {
      console.log(payload, "payloadd");
      selectedContact.value = payload;
    };
    const validateRangeAmount = () => {
      if (
        amountPaid.value <
          contributionDetail.value.donorPaymentRangeFromAmount ||
        amountPaid.value > contributionDetail.value.donorPaymentRangeToAmount
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

    const validatePaidAmount = () => {
      if (amountPaid.value == 0 || amountPaid.value < 0) {
        withinRange.value = false;
        toast.add({
          severity: "warn",
          summary: "info",
          detail: `Amount is less than ${Math.abs(
            pledgeAmount.value
          ).toLocaleString()}`,
          life: 4000,
        });
      } else {
        withinRange.value = true;
      }
    };
    const getAllPledgeDefinition = async () => {
      try {
        checking.value = false;
        const res = await axios.get("/api/Pledge/GetAllPledgeDefinitions");
        finish();
        allPledgeList.value = res.data.returnObject;

        getDetails();

        console.log(allPledgeList.value, "getPledgeList");
        checking.value = true;
      } catch (error) {
        console.log(error);
      }
    };
    getAllPledgeDefinition();

    const getContribution = async () => {
      if (route.query.tenantID) {
        try {
        checking.value = false;
        const res = await axios.get(
          `/Contribution/Pay?TenantID=${route.query.tenantID}`
        );
        finish();
        contributionDetail.value = res.data;
        churchLogo2.value = res.data.logo
        churchName.value = res.data.tenantName
        console.log(contributionDetail.value, "contribution payment");
        // amountPaid.value = res.data.donorPaymentSpecificAmount;
        checking.value = true;
      } catch (error) {
        console.log(error);
      }
      } else if(route.query.pledgeID) {
         try {
        checking.value = false;
        const res = await axios.get(
          `/Contribution/Pay?PledgeID=${route.query.pledgeID}`
        );
        finish();
        contributionDetail.value = res.data;
        churchLogo2.value = res.data.logo
        churchName.value = res.data.tenantName
        console.log(contributionDetail.value, "contribution payment");
        // amountPaid.value = res.data.donorPaymentSpecificAmount;
        checking.value = true;
      } catch (error) {
        console.log(error);
      }
      } else if(route.query.pledgeDefinitionID) {
         try {
        checking.value = false;
        const res = await axios.get(
          `/Contribution/Pay?PledgeDefinitionID=${route.query.pledgeDefinitionID}`
        );
        finish();
        contributionDetail.value = res.data;
        churchLogo2.value = res.data.logo
        churchName.value = res.data.tenantName
        console.log(contributionDetail.value, "contribution payment");
        // amountPaid.value = res.data.donorPaymentSpecificAmount;
        checking.value = true;
      } catch (error) {
        console.log(error);
      }
      }else{
        return ""
      }
    };
    getContribution();

      

    const getDetails = () => {
      selectedPledge.value = allPledgeList.value.find(
        (i) => i.id === route.query.id
      );
      memberName.value = route.query.name;
    };

    const appendLeadingZeroes = (n) => {
      if (n <= 9) {
        return "0" + n;
      }
      return n;
    };

    let currentDate = new Date();
    let formattedDate = `${currentDate.getFullYear()}${appendLeadingZeroes(
      currentDate.getMonth() + 1
    )}${appendLeadingZeroes(currentDate.getDate())}${appendLeadingZeroes(
      currentDate.getHours()
    )}${appendLeadingZeroes(currentDate.getMinutes())}
            ${appendLeadingZeroes(
              currentDate.getSeconds()
            )}${appendLeadingZeroes(currentDate.getMilliseconds())}`;
    console.log(formattedDate, "add new date");
    const payWithPaystack = () => {
      initializePayment(0);
      /*eslint no-undef: "warn"*/
      let handler = PaystackPop.setup({
        // key: process.env.VUE_APP_PAYSTACK_PUBLIC_KEY_LIVE,
        key: process.env.VUE_APP_PAYSTACK_API_KEY,

        email: contactDetail.value.email,
        amount: amountPaid.value * 100,
        ref: uuidv4().substring(0, 8),
        onClose: function () {
          toast.add({
            severity: "info",
            summary: "Transaction cancelled",
            detail: "You have cancelled the transaction",
            life: 3000,
          });
        },
        callback: function (response) {
          console.log("payment callback", response);
          txnRef.value = response.tx_ref;
          //   subscriptionPayment(response, 0);
          confirmIntializePayment(0);
          //Route to where you confirm payment status
        },
      });
      handler.openIframe();
    };

    const initializePayment = (paymentGateway) => {
      const payload = {
        gateway: paymentGateway === 0 ? "paystack" : "flutterwave",
        tenantID: currentUser.value.tenantId,
        orderID: uuidv4(),
        pledgeItemId: contributionDetail.value.id,
        pledgeId: contactDetail.value.pledges[0] ? contactDetail.value.pledges[0].id  : "",
        pledgeAmount: parseInt(pledgeAmount.value),
        amountPaid: parseInt(amountPaid.value),
        currencyId: contributionDetail.value.currency.id,
        personID: contactDetail.value.personId,
        personName:  contactDetail.value.name, 
        personEmail: contactDetail.value.email,
        personPhone: userSearchString.value,
        // userID: "string",
      };
      console.log(payload);

      axios
        .post("/InitializeContributionAndPledgePayment", payload)
        .then((res) => {
          console.log(res, "initialpayment");
        });
    };
    const setSelectedPaymentCurrency = () => {
      if (currentUser.value) {
        selectedCurrency.value = currentUser.value.currency;
      }
    };
    const getFlutterwaveModules = () => {
      const script = document.createElement("script");
      script.src = !isProduction
        ? "https://ravemodal-dev.herokuapp.com/v3.js"
        : "https://checkout.flutterwave.com/v3.js";
      document.getElementsByTagName("head")[0].appendChild(script);
      // console.log(process.env.VUE_APP_FLUTTERWAVE_TEST_KEY)
    };
    getFlutterwaveModules();

    const getCurrencySymbol = async () => {
      userService
        .getCurrentUser()
        .then((res) => {
          currentUser.value = res;
          setSelectedPaymentCurrency();
        })
        .catch((err) => {
          console.log(err);
        });
    };

    if (!currentUser.value || !currentUser.value.currency) {
      getCurrencySymbol();
    } else {
      setSelectedPaymentCurrency();
    }

    const confirmIntializePayment = async (paymentGateway) => {
      const payload = {
        gateway: paymentGateway === 0 ? "paystack" : "flutterwave",
        tenantID: currentUser.value.tenantId,
        orderID: uuidv4(),
        pledgeItemId: contributionDetail.value.id,
        pledgeId: contactDetail.value.pledges[0] ? contactDetail.value.pledges[0].id  : "",
        pledgeAmount: parseInt(pledgeAmount.value),
        amountPaid: parseInt(amountPaid.value),
        currencyId: contributionDetail.value.currency.id,
        personID: contactDetail.value.personId,
        personName: contactDetail.value.name,
        personEmail: contactDetail.value.email,
        personPhone: contactDetail.value.phoneNumber,
        // userID: "string",
      };
      try {
        const res = await axios.post(
          `/ConfirmInitializeContributionAndPledgePayment?txnref=${txnRef.value}`,
          payload
        );
        console.log(res, "ththhktjh");
      } catch (error) {
        console.log(error);
      }
    };

    const payWithFlutterwave = () => {
      //   console.log(TotalAmount.value, 'total amount calculated')
      initializePayment(1);

      let country = "";

      switch (selectedCurrency.value) {
        case "KES":
          country = "KE";
          break;
        case "GHS":
          country = "GH";
          break;
        case "ZAR":
          country = "ZA";
          break;
        case "TZS":
          country = "TZ";
          break;

        default:
          country = "NG";
          break;
      }

      window.FlutterwaveCheckout({
        // public_key: process.env.VUE_APP_FLUTTERWAVE_PUBLIC_KEY_LIVE,
        public_key: process.env.VUE_APP_FLUTTERWAVE_TEST_KEY_TEST,
        tx_ref: uuidv4().substring(0, 8),
        amount: amountPaid.value,
        currency: selectedCurrency.value,
        country: country,
        payment_options: "card,ussd",
        customer: {
          email: contactDetail.value.email,
        },
        callback: (response) => {
          console.log("Payment callback", response);
          txnRef.value = response.tx_ref;

          //   subscriptionPayment(response, 1);
          confirmIntializePayment(1);
        },
        onclose: () => console.log("Payment closed"),
        customizations: {
          title: "Contribution",
          description: "Payment for Contribution ",
          logo: logoUrl,
        },
      });
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

    // const setEmptyValue = (payload) => {
    //   searchedContact.value = payload;
    //   console.log(searchedContact.value, "searchedContact");
    // };

    return {
      channel,
      selectPledgeItemID,
      setSelectPledgeItem,
      searchID,
      maxEmail,
      associationLogo,
      churchLogo2,
      personToggle,
      contactDetailEmail,
      contactDetailName,
      donorDetail,
      donorDetails,
      disabled,
      populateInputfields,
      appltoggle,
      //   toggleBase,
      contactDetail,
      showNoPhoneError,
      autosearch,
      //   enteredValue,
      showLoading,
      CheckAfterEleven,
      txnRef,
      validateRangeAmount,
      validatePaidAmount,
      withinRange,
      setContact,
      pledgeDefineID,
      searchRef,
      members,
      userSearchString,
      contributionDetail,
      currentUser,
      tenantId,
      selectedPledge,
      allPledgeList,
      selectedChannel,
      pledgeCategory,
      payWithPaystack,
      amountTo,
      amountFrom,
      checkEmailValue,
      initializePayment,
      churchName,
      Address,
      value,
      loading,
      checking,
      freewillAmount,
      checkNameValue,
      isNameValid,
      isEmailValid,
      memberName,
      payWithFlutterwave,
      searchedContact,
      //   setEmptyValue,
      selectedContact,
      pledgeAmount,
      amountPaid,
      checkContact,
    };
  },
};
</script>

<style scoped>
.heading-text {
  font: normal normal 800 1.5rem Nunito sans;
}


.input-border{
  border: 1px solid  #3c7e58 !important;
}
.pay {
  border-radius: 5px;
  padding: 10px 17px;
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
.phone-input {
  background: transparent;
  border: 0;
  border-bottom: 1px solid #cbd6e2;
  border-radius: 0;
}
#walletpana {
  background: #3c7e58;
  background: #f59b47;
}

#walletpana img {
  width: 70%;
  height: 100%;
}

.continue-text {
  font-family: Nunito Sans !important;
  font-size: 24px;
  font-weight: 700;
  text-align: center;
}

.row-button {
  padding: 10px;
  border-radius: 25px;
  box-shadow: 0 4px 12px rgb(0 0 0 / 10%);
  background: #fff;
  margin: 12px 70px 15px 70px;
  transition: all 0.4s ease-in-out;
  max-height: 45px;
}
.tool {
  background-image: url("../../assets/coloured-patterns.svg");
  height: 56rem;
  object-fit: cover;
  background-repeat: no-repeat;
  background-size: cover;
}
.input-width {
  width: 100%
}

@media (min-width: 992px) {
  .input-width {
    width: 350px
  }
}
/* .user image {
  width: 30px;
  padding-right: 0;
  object-fit: cover;
  
} */
</style>