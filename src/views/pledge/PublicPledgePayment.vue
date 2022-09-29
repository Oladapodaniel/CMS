<template>
  <div class="container-fluid px-0 mx-0">
    <div class="row">
      <div class="col-md-12 col-lg-6">
        <div class="container container-top">
          <div class="row mt-4 justify-content-center">
            <div class="col-md-12 text-center heading-text">Pledge Payment</div>
            <div class="col-md-10 mt-4">
              <div class="col-md-12">
                <label for="">Pledge Name</label>
              </div>
              <div class="col-md-12">
                <input
                  type="text"
                  v-model="contributionDetail.name"
                  :disabled="checking"
                  class="form-control"
                />
              </div>
            </div>
            <div class="col-md-10 mt-3">
              <div class="col-md-12">
                <label for="">Phone Number</label>
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
            </div>
            <!-- <div class="row justify-content-center mx-0" > -->
                <div class="col-md-10 mt-3" v-if="appltoggle && !showLoading">
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
                                :disabled="disabled"
                            />
                        </span>
                    </div>
                </div>
                <div class="col-md-10 mt-3" v-if="appltoggle && !showLoading">
                    <div class="col-md-12">
                        <label for="">Email</label>
                    </div>
                    <div class="col-md-12">
                        <span class="p-input-icon-left w-100 ">
                            <i class="pi pi-envelope icon" />
                            <InputText
                                class="w-100"
                                type="text"
                                v-model="contactDetail.email"
                                aria-required=""
                                placeholder="Email"
                                :disabled="contactDetail.personId && contactDetail.email && contactDetail.email !== null && contactDetail.email !== ''  "
                            />
                        </span>
                    </div>
                </div>
            <!-- </div> -->
            <div
              class="col-md-10 mt-3"
              v-if="contributionDetail.donorPaymentType == 1 && appltoggle && !showLoading"
            >
              <div class="col-md-12">
                <label for="">Pledge Amount</label>
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
              class="col-md-10 mt-3"
              v-if="contributionDetail.donorPaymentType == 2 && appltoggle && !showLoading"
            >
              <div class="col-md-12">
                <label for=""
                  >Amount Ranging from
                  {{
                    Math.abs(
                      contributionDetail.donorPaymentRangeFromAmount
                    ).toLocaleString()
                  }}
                  -
                  {{
                    Math.abs(
                      contributionDetail.donorPaymentRangeToAmount
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
                    contributionDetail.donorPaymentRangeFromAmount
                  ).toLocaleString()
                }}
                and
                {{
                  Math.abs(
                    contributionDetail.donorPaymentRangeToAmount
                  ).toLocaleString()
                }}.
              </div>
              </div>
            </div>
            <div
              class="col-md-10 mt-3 "
              v-if="contributionDetail.donorPaymentType == 0 && appltoggle && !showLoading"
            >
                  <div class="col-md-12">
                    <label for="">How much do you want to pledge ?</label>
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
            <div class="col-md-10 mt-3" v-if="contributionDetail.donorPaymentType == 0 && appltoggle && !showLoading">
                  <div class="col-md-12">
                    <label for="">How much do you want to pay now ?</label>
                  </div>
                  <div class="col-md-12">
                    <input
                      type="text"
                      v-model="amountPaid"
                      :class="{ 'is-invalid': !withinRange }"
                      @blur="validatePaidAmount"
                      class="form-control"
                      placeholder="Enter Amount"
                    />
                    <div class="invalid-feedback" v-if="amountPaid < 0 || amountPaid == 0">
                       Please make sure the amount is not below this
                        {{
                        Math.abs(
                            pledgeAmount
                        ).toLocaleString()
                        }}
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
            <div class="col-md-12 mt-4 d-flex justify-content-center">
              <div class="mt-4">
                <button
                  class="default-btn border-0 text-white"
                  style="background: #486083"
                  data-dismiss="modal"
                  data-toggle="modal"
                  data-target="#PaymentOptionModal"
                  v-if="appltoggle && !showLoading"
                >
                  <i class="pi pi-spin pi-spinner" v-if="loading"></i> Pay Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        class="col-md-12 col-lg-6 d-none d-lg-flex justify-content-center w-100"
        id="walletpana"
        style="height: 100vh"
      >
        <img src="../../assets/E-Wallet-pana.svg" alt="" />
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
import { ref , computed } from "vue";
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
    const appltoggle = ref(false);
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
    const amountPaid = ref("");
    const pledgeAmount = ref("");
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
      contactDetail.value= obj;
      console.log(contactDetail.value);
    };

    const disabled = computed(() => {
      if (contactDetail.value.personId) return true;
      return false;
    });

    const showLoading = computed(() => {
      return autosearch.value;
    });

    const checkContact = async () =>{
        if (!userSearchString.value) {
            showNoPhoneError.value = true;
            return false;
        }
            loading.value = true;
            autosearch.value = true;
        try {
          const { data } = await axios.get(
            `/SearchContributionByPhoneOrMemberID?searchText=${userSearchString.value}&Id=${route.params.id}`
          );
          contactDetail.value = data[0] ? data[0] : {}
          console.log(contactDetail.value, "contribution number");
          loading.value = false;
          autosearch.value = false;

           populateInputfields(contactDetail.value);
          if (contactDetail.value) appltoggle.value = true;
        } catch (error) {
            console.log(error);
          loading.value = false;
            autosearch.value = false;
        }
    }
    const CheckAfterEleven = (e) => {
      if (e.target.value.length >= 11) {
        checkContact()
      }
    }
    const pledgeDefineID = ref(route.params.id);
    const setContact = (payload) => {
      console.log(payload, "payloadd");
      selectedContact.value = payload;
    };
      const validateRangeAmount = () => {
      if (
        amountPaid.value <
          contributionDetail.value.donorPaymentRangeFromAmount ||
        amountPaid.value >
          contributionDetail.value.donorPaymentRangeToAmount
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
      if(amountPaid.value == 0 || amountPaid.value < 0 ) {
        withinRange.value = false;
        toast.add({
          severity: "warn",
          summary: "info",
          detail: `Amount is less than ${Math.abs(pledgeAmount.value).toLocaleString()}`,
          life: 4000,
        });
      } else{
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
      try {
        checking.value = false;
        const res = await axios.get(
          `/Contribution/Pay?PledgeDefinitionID=${route.params.id}`
        );
        finish();
        contributionDetail.value = res.data;
        console.log(contributionDetail.value, "contribution payment");
        amountPaid.value = res.data.donorPaymentSpecificAmount;
        checking.value = true;
      } catch (error) {
        console.log(error);
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
        key: process.env.VUE_APP_PAYSTACK_PUBLIC_KEY_LIVE,
        // key: process.env.VUE_APP_PAYSTACK_API_KEY,

        email: contactDetail.value.email,
        amount: amountPaid.value * 100,
        ref: uuidv4().substring(0, 8),
        // ref: `${formattedDate.substring(0, 4)}sub`,
        // currency: Plans.value.paymentCurrency,
        onClose: function () {
          // swal("Transaction Canceled!", { icon: "error" });
          toast.add({
            severity: "info",
            summary: "Transaction cancelled",
            detail: "You have cancelled the transaction",
            life: 3000,
          });
        },
        callback: function (response) {
            console.log("payment callback", response)
            txnRef.value = response.tx_ref
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
        // pledgeId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        pledgeAmount: parseInt(pledgeAmount.value),
        amountPaid: parseInt(amountPaid.value),
        currencyId: contributionDetail.value.currency.id,
        personID: contactDetail.value.personId,
        personName: contactDetail.value.name,
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
        // pledgeId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
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
          `/ConfirmInitializeContributionAndPledgePayment?txnref=${txnRef.value}`,payload
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
        public_key: process.env.VUE_APP_FLUTTERWAVE_PUBLIC_KEY_LIVE,
        // public_key: process.env.VUE_APP_FLUTTERWAVE_TEST_KEY_TEST,us
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
          txnRef.value = response.tx_ref

          //   subscriptionPayment(response, 1);
          confirmIntializePayment(1);
        },
        onclose: () => console.log("Payment closed"),
        customizations: {
          title: "Pledge",
          description: "Payment for Pledge ",
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
    };
  },
};
</script>

<style scoped>
.heading-text {
  font: normal normal 800 1.5rem Nunito sans;
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
  background: #486083;
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
</style>