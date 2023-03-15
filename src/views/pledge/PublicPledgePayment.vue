<template>
  <div class="container-fluid  mx-0 tool">
    <div class="row justify-content-center mx-0  ">
      <div class="col-md-12   d-flex justify-content-center my-3  ">
        <div class="mt-4  d-flex align-items-center">
          <div class="pl-2">
            <img :src="churchLogo2" v-if="churchLogo2" class="link-image" alt="" style="width:60px" />
            <img src="../../assets/dashboardlinks/churchcloud.png" v-else class="link-image " alt="" />
          </div>
          <!-- <span><h4 class="font-weight-bold mt-3">{{contributionDetail.tenantName ? contributionDetail.tenantName :  "Churchplus" }}</h4></span> -->
          <span>
            <h4 class="font-weight-bold mt-3">{{ churchName ? churchName : "Churchplus" }}</h4>
          </span>
        </div>
      </div>
    </div>

    <div class="row d-flex justify-content-center">
      <div class="col-11 col-sm-8 col-md-7 col-lg-5 card pb-2" v-loading="cardLoading">
        <div class="container">
          <div class="row mt-4 justify-content-center">
            <div class="col-md-12 text-center  heading-text">
              {{ contributionDetail.name }} {{ !route.query.tenantID && contributionDetail.name ? 'Payment' : "" }}
            </div>

            <div class="col-md-11 mt-3 px-0">
              <div class="col-md-12">
                <label for="">Pledge Name<sup class="text-danger">*</sup></label>
              </div>
              <div class="col-md-12">
                <el-select-v2 v-model="selectPledgeItemID" @change="setSelectPledgeItem"
                  :options="contributionDetail.pledgeItemDTOs ? contributionDetail.pledgeItemDTOs.map(i => ({ label: i.name, value: i.id })) : []"
                  placeholder="Select Pledge" size="large" class="w-100" :disabled="!route.query.tenantID" />
              </div>
            </div>
            <div class="col-md-11 mt-3 px-0">
              <div class="col-md-12">
                <label for="">Phone Number<sup class="text-danger">*</sup></label>
              </div>
              <div class="col-md-12">
                <el-input @keyup.enter="checkContact" @blur="checkContact" v-model="userSearchString" class="w-100"
                  placeholder="Enter phone number" :disabled="route.query.pledgeID && route.query.pledgeID.length > 0">
                  <template #prefix>
                    <el-icon>
                      <Phone />
                    </el-icon>
                  </template>
                  <template #append>
                    <el-button :disabled="route.query.pledgeID && route.query.pledgeID.length > 0">
                      <el-icon style="vertical-align: middle">
                        <Search />
                      </el-icon>
                    </el-button>
                  </template>
                </el-input>
                <div class="col-12">
                  <p class="text-danger" v-if="showNoPhoneError" :class="{ 'my-1': showLoading }">
                    Please enter your phone number
                  </p>
                </div>
                <div class="col-md-12" v-if="showLoading">
                  <div class="loading-div my-3">
                    <el-icon class="is-loading">
                      <Loading />
                    </el-icon>
                    <p>Fetching your details...</p>
                  </div>
                </div>
              </div>
              <div class=" col-md-12 mt-2 small" style="color: #f59b47;"
                v-if="personToggle && Object.keys(contactDetail).length == 0" :class="{ 'mt-3': showLoading }">
                Your detail were not found kindly enter your detail below to continue!
              </div>
              <div class="col-12 d-flex  justify-content-between flex-wrap">

                <div
                  class="col-sm-6 mx-0 px-0 col-12 font-weight-700 d-flex justify-content-center  justify-content-sm-start mt-2">
                  <div> {{ maxName }}</div>
                </div>
                <div
                  class="col-sm-6 mx-0 px-0 col-12 d-flex justify-content-center font-weight-700 justify-content-sm-end mt-2">
                  <div> {{ contactDetail && contactDetail.email && maxEmail ? maxEmail : "" }}</div>
                </div>
              </div>
            </div>
            <div class="col-md-11 " v-if="personToggle && Object.keys(contactDetail).length == 0 && !showLoading">
              <div class="row">
                <div class="col-md-6">
                  <div class="row">
                    <div class="col-md-12">
                      <label for="">First Name</label>
                    </div>
                    <div class="col-md-12">
                      <el-input v-model="newContact.firstName" class="w-100" placeholder="Enter name">
                        <template #prefix>
                          <el-icon>
                            <User />
                          </el-icon>
                        </template>
                      </el-input>
                    </div>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="row">
                    <div class="col-md-12">
                      <label for="">Last Name</label>
                    </div>
                    <div class="col-md-12">
                      <el-input v-model="newContact.lastName" class="w-100" placeholder="Enter name">
                        <template #prefix>
                          <el-icon>
                            <User />
                          </el-icon>
                        </template>
                      </el-input>
                    </div>
                  </div>
                </div>
                <div class="col-md-12 mt-3">
                  <label for="">Email</label>
                </div>
                <div class="col-md-12">
                  <el-input v-model="newContact.email" class="w-100" placeholder="Enter email">
                    <template #prefix>
                      <el-icon>
                        <Message />
                      </el-icon>
                    </template>
                  </el-input>
                </div>
              </div>
            </div>
            <!-- <div class="col-md-11 px-0" v-if="personToggle && Object.keys(contactDetail).length == 0 && !showLoading">

            </div> -->
            <!-- <div class="col-md-11 mt-2 px-0"
              v-if="personToggle && Object.keys(contactDetail).length == 0 && !showLoading">
              
            </div> -->
            <div class="col-md-11 mt-2" v-if="personToggle && !route.query.pledgeID && !memberAlreadyPledgedToPledgeItem">
              <el-radio-group v-model="pledgeActionType">
                <el-radio label="1" size="large">Pledge and pay now</el-radio>
                <el-radio label="2" size="large">Pledge only</el-radio>
              </el-radio-group>
            </div>

            <div v-if="personToggle && !showLoading" class=" mt-1 col-md-11 px-0">
              <hr class="w-100">
            </div>
            <div class="col-md-11 mt-3 px-0" v-if="
              donorDetail.donorPaymentType == 1 && personToggle
            ">
              <div class="col-md-12 text-center">
                <label for="">Pledge amount</label>
              </div>
              <div class="col-md-12">
                <h2 class="font-weight-700 text-center">{{ pledgeAmountWithComma }}</h2>
                <!-- <input type="text" v-model="amountToPledge" :disabled="checking" class="form-control" /> -->
              </div>
            </div>
            <div class="col-md-11 mt-3 px-0" v-if="
              donorDetail.donorPaymentType == 2 && personToggle
            ">
              <div class="col-md-12 text-center">
                <div class="mb-1">Pledge amount range is within</div>
                <label for="">
                  <h2 class="font-weight-700 d-inline">{{
                    Math.abs(
                      donorDetail.donorPaymentRangeFromAmount
                    ).toLocaleString()
                  }}</h2>
                  -
                  <h2 class="font-weight-700 d-inline">{{
                    Math.abs(
                      donorDetail.donorPaymentRangeToAmount
                    ).toLocaleString()
                  }}</h2>
                </label>
              </div>
              <!-- <div class="col-md-12">
               
              </div> -->
            </div>
            <div class="col-md-11 mt-3 px-0" v-if="
              personToggle && !showLoading
            ">
              <div class="col-md-12 ">
                <label for="">{{ memberAlreadyPledgedToPledgeItem ? 'Amount pledged' : 'How much do you want to pledge?' }}</label>
              </div>
              <!-- For range -->
              <div class="col-md-12" v-if="donorDetail.donorPaymentType == 2">
                <el-input v-model="amountToPledge" :class="{ 'is-invalid': !withinRange }" placeholder="Enter amount"
                  @blur="validateRangeAmount" class="input-with-select"
                  :disabled="memberAlreadyPledgedToPledgeItem">
                  <template #prepend>
                    <el-select v-model="selectedCurrencyCode" placeholder="Select" style="width: 115px"
                      @change="setSelectedCurrency" filterable>
                      <el-option v-for="item in FLWupportedCurrencies" :label="item.value" :value="item.value" />
                    </el-select>
                  </template>
                </el-input>
                <!-- <el-input type="text" v-model="amountToPledge" 
                   class="" placeholder="Enter amount"
                   /> -->
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
              <!-- For free will -->
              <div class="col-md-12" v-if="donorDetail.donorPaymentType == 0">
                <el-input v-model="amountToPledge" placeholder="Enter amount" class="input-with-select"
                  :disabled="memberAlreadyPledgedToPledgeItem">
                  <template #prepend>
                    <el-select v-model="selectedCurrencyCode" placeholder="Select" style="width: 115px"
                      @change="setSelectedCurrency" filterable>
                      <el-option v-for="item in FLWupportedCurrencies" :label="item.value" :value="item.value" />
                    </el-select>
                  </template>
                </el-input>
                <!-- <el-input type="text" v-model="amountToPledge" placeholder="Enter amount"
                  :disabled="route.query.pledgeID && route.query.pledgeID.length > 0" /> -->
              </div>
              <div class="col-md-12" v-if="donorDetail.donorPaymentType == 1">
                <el-input v-model="amountToPledge" placeholder="Enter amount" class="input-with-select" disabled>
                  <template #prepend>
                    <el-select v-model="selectedCurrencyCode" placeholder="Select" style="width: 115px"
                      @change="setSelectedCurrency" filterable>
                      <el-option v-for="item in FLWupportedCurrencies" :label="item.value" :value="item.value" />
                    </el-select>
                  </template>
                </el-input>
                <!-- <el-input type="text" v-model="amountToPledge" placeholder="Enter amount" disabled
                  :disabled="route.query.pledgeID && route.query.pledgeID.length > 0" /> -->
              </div>
            </div>
            <div v-if="
              personToggle && !showLoading
            " class="mt-4 col-md-11">
              <hr class="w-100">
            </div>
            <div class="col-md-11 mt-3 px-0" v-if="
              personToggle && !showLoading
            ">
              <Transition name="slide-fade">
                <div class="col-md-12 font-weight-bold" v-if="pledgeActionType == '1'">
                  <label for="">How much do you want to pay now ?</label>
                </div>
              </Transition>
              <!-- Range, Free will and Specific -->
              <Transition name="slide-fade">
                <div class="col-md-12" v-if="pledgeActionType == '1'">
                  <el-input type="text" v-model="amountToPayNow" placeholder="Enter amount to pay" />
                </div>
              </Transition>
            </div>
            <div class="col-md-11 mt-4 px-0 mb-4 d-flex justify-content-center">
              <div class="col-md-12">
                <el-button class="w-100" color="#136acd" :loading="loading" :disabled="!personToggle"
                  @click="triggerPayment" round>{{ pledgeActionType
                    == '1' ? 'Pay' : 'Pledge'
                  }}</el-button>
              </div>

            </div>

            <div class="row justify-content-center">
              <div class="col-md-6  text-center align-item-center mb-4">
                <div class="">Powered by</div>
                <div>
                  <img src="../../assets/logoblue.png" alt="churchplus Logo" class="w-50 mx-2 " />
                </div>
              </div>

            </div>

            <div class=" row mt-3 d-flex justify-content-center">
              <div class="col-10 col-sm-8 col-md-7   pl-0">
                <div class="row">
                  <div class="col-3">
                    <img src="../../assets/VisaDebit.png" class="w-100">
                  </div>
                  <div class="col-3 pr-0">
                    <img src="../../assets/Full-Flutterwave.png" class="w-100">
                  </div>
                  <div class="col-3 pr-0">
                    <img src="../../assets/paystack.png" class="w-100">
                  </div>
                  <div class="col-3 pl-0 text-right">
                    <img src="../../assets/paypal.png" class="w-50">
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <el-dialog v-model="paymentDialog" title="Payment methods"
      :width="mdAndUp || lgAndUp || xlAndUp ? `50%` : xsOnly ? `90%` : `70%`" align-center>
      <div class="row">
        <div class="col-sm-12 p-4 text-center continue-text">
          Continue payment with
        </div>
      </div>
      <div class="row row-button c-pointer" @click="(initiatePayment(1))">
        <div class="d-flex justify-content-center w-100">
          <img style="width: 150px" src="../../assets/4PaystackLogo.png" alt="paystack" />
        </div>
      </div>
      <div class="row row-button c-pointer mt-3 mb-5" @click="(initiatePayment(2))">
        <div class="d-flex justify-content-center w-100">
          <img style="width: 150px" src="../../assets/flutterwave_logo_color@2x.png" alt="flutterwave" />
        </div>
      </div>
    </el-dialog>
    <el-dialog v-model="paymentSuccessfulDialog" title=""
      :width="mdAndUp || lgAndUp || xlAndUp ? `50%` : xsOnly ? `90%` : `70%`" align-center>
      <div class="row">
        <div class="col-12">
          <div class="d-flex justify-content-center">
            <img src="../../assets/successful_payment.png" style="width: 250px; margin: auto" />
          </div>
          <h3 class="text-center mt-5 font-weight-bold success">Thank you</h3>
          <div class="text-center mt-2 font-weight-600 s-18">{{ pledgeActionType == '1' ? 'Payment completed successfully'
            : 'Your pledge has been recorded successfully' }}</div>
          <div class="d-flex justify-content-center mb-5">
            <el-button color="#70c043" class="text-white mt-2" @click="paymentSuccessfulDialog = false" round>Go
              back</el-button>
          </div>
        </div>
      </div>

    </el-dialog>
  </div>
</template>

<script>
import axios from "@/gateway/backendapi";
import { ref, computed, reactive } from "vue";
import { useToast } from "primevue/usetoast";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import finish from "../../services/progressbar/progress";
import { ElMessage } from 'element-plus';
import mask from "../../services/dates/maskText";
import supportedCurrencies from "../../services/user/flutterwaveSupportedCurrency"
import deviceBreakpoint from "../../mixins/deviceBreakpoint";
import { ElLoading } from 'element-plus'
import swal from "sweetalert";
export default {
  setup() {
    const toast = useToast();
    const searchID = ref('')
    const selectPledgeItemID = ref(null)
    const selectedPledgeItem = ref({})
    const appltoggle = ref(false);
    const personToggle = ref(false);
    const associationLogo = ref("")
    const churchLogo2 = ref("")
    let newContact = ref({})
    const store = useStore();
    const withinRange = ref(true);
    const searchRef = ref("");
    const currentUser = ref(store.getters.currentUser);
    const tenantId = ref(currentUser.tenantId);
    const selectedCurrency = ref({});
    const selectedCurrencyCode = ref();
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
    const contributionDetail = ref({});
    const amountFrom = ref("");
    const amountTo = ref("");
    const logoUrl = `https://flutterwave.com/images/logo-colored.svg`;
    const isProduction = true;
    const searchedContact = ref({});
    const selectedContact = ref({});
    const donorDetail = ref({})
    const donorDetails = ref({})
    const amountToPledge = ref("");
    const amountToPayNow = ref("");
    const pledgeAmount = ref("");
    const pledgeActionType = ref("1");
    const maxName = ref("")
    const maxEmail = ref("")
    const txnRef = ref("");
    const pledgeCategory = ref([
      { name: "Free will" },
      { name: "Specific" },
      { name: "Range" },
    ]);
    const memberAlreadyPledgedToPledgeItem = ref(false)
    const pledgedData = ref({})
    const currencyList = ref([])
    const FLWupportedCurrencies = ref(supportedCurrencies);
    const paymentDialog = ref(false)
    const paymentSuccessfulDialog = ref(false)
    const { mdAndUp, lgAndUp, xlAndUp, xsOnly } = deviceBreakpoint();
    const cardLoading = ref(false);



    const pledgeAmountWithComma = computed(() => {
      if (amountToPledge.value) return amountToPledge.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    })
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

      selectedCurrency.value = selectedPledgeItem.value.currency;
      selectedCurrencyCode.value = selectedCurrency.value.shortCode

      if (userSearchString.value) {
        checkContact();
      }
    }

    const setSelectedCurrency = () => {
      selectedCurrency.value = currencyList.value.find(i => i.shortCode == selectedCurrencyCode.value);
    }

    const checkContact = async () => {
      if (!userSearchString.value) {
        showNoPhoneError.value = true;
        return false;
      } else {
        showNoPhoneError.value = false
      }
      if (route.query.tenantID) {
        searchID.value = selectedPledgeItem.value.id
      } else if (route.query.pledgeDefinitionID) {
        searchID.value = route.query.pledgeDefinitionID
      } else if (route.query.pledgeID) {
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
        contactDetail.value = data.person ? data.person : {};
        donorDetail.value = data.pledgeItemDTO ? data.pledgeItemDTO : {};
        amountToPledge.value = donorDetail.value.donorPaymentSpecificAmount
        maxEmail.value = contactDetail.value.email ? mask.maskEmail2(contactDetail.value.email) : ""
        maxName.value = `${contactDetail.value.firstName ? mask.maskText(contactDetail.value.firstName) : ""} ${contactDetail.value.lastName ? mask.maskText(contactDetail.value.lastName) : ""}`
        pledgeActionType.value = "1"


        if (data.pledgeResponseDTO && Object.keys(data.pledgeResponseDTO).length > 0) {
          memberAlreadyPledgedToPledgeItem.value = true
          amountToPledge.value = data.pledgeResponseDTO.amount
          amountToPayNow.value = data.pledgeResponseDTO.balance
          pledgedData.value = data.pledgeResponseDTO
          
        } else {
          memberAlreadyPledgedToPledgeItem.value = false
          pledgedData.value = new Object();
          amountToPayNow.value = ""
        }

        if (!data.person) {
          ElMessage({
            type: 'warning',
            showClose: true,
            message: 'Your details were not found kindly enter them below',
            duration: 10000
          })
        } else {
          ElMessage({
            type: 'success',
            showClose: true,
            message: 'Member details found, kindly proceed to make your pledge',
            duration: 10000
          })
        }
        loading.value = false;
        autosearch.value = false;

        if (contactDetail.value) appltoggle.value = true;
      } catch (error) {
        console.log(error);
        loading.value = false;
        autosearch.value = false;
      }
    };

    const pledgeDefineID = ref(route.params.id);
    const setContact = (payload) => {
      selectedContact.value = payload;
    };
    const validateRangeAmount = () => {
      if (
        amountToPledge.value <
        donorDetail.value.donorPaymentRangeFromAmount ||
        amountToPledge.value > donorDetail.value.donorPaymentRangeToAmount
      ) {
        withinRange.value = false;
        ElMessage({
          type: 'warning',
          showClose: true,
          message: 'The amount is not within the specific range, please enter a value within the range',
          duration: 10000
        })
      } else {
        withinRange.value = true;
      }
    };

    const validatePaidAmount = () => {
      if (amountToPledge.value == 0 || amountToPledge.value < 0) {
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

    const getContribution = async () => {
      cardLoading.value = true
      try {
        checking.value = false;
        let pledgeURL = route.query.tenantID ? `TenantID=${route.query.tenantID}` : route.query.pledgeID ? `PledgeID=${route.query.pledgeID}` : route.query.pledgeDefinitionID ? `pledgeDefinitionID=${route.query.pledgeDefinitionID}` : ""
        const res = await axios.get(
          `/Contribution/Pay?${pledgeURL}`
        );
        cardLoading.value = false
        finish();
        if (route.query.pledgeDefinitionID) {
          // For pledge definition
          contributionDetail.value = res.data.pledgeItemDTO;
          contributionDetail.value.pledgeItemDTOs = [res.data.pledgeItemDTO]
          selectPledgeItemID.value = contributionDetail.value.id
          churchLogo2.value = res.data.pledgeItemDTO.logo
          churchName.value = res.data.pledgeItemDTO.tenantName
          selectedCurrency.value = contributionDetail.value.currency
          selectedCurrencyCode.value = contributionDetail.value.currency.shortCode
        } else if (route.query.pledgeID) {
          // For pledge
          let decomposedPledgeList = [{ ...res.data.pledgeItemDTO }]
          contributionDetail.value = res.data.pledgeItemDTO;
          contributionDetail.value.pledgeItemDTOs = decomposedPledgeList
          selectPledgeItemID.value = contributionDetail.value.id
          churchLogo2.value = res.data.pledgeItemDTO.logo
          churchName.value = res.data.pledgeItemDTO.tenantName
          contactDetail.value = res.data.person
          maxEmail.value = contactDetail.value && contactDetail.value.email ? mask.maskEmail2(contactDetail.value.email) : "";
          maxName.value = `${contactDetail.value.firstName ? mask.maskText(contactDetail.value.firstName) : ""} ${contactDetail.value.lastName ? mask.maskText(contactDetail.value.lastName) : ""}`
          userSearchString.value = contactDetail.value ? contactDetail.value.mobilePhone : ""
          personToggle.value = true
          donorDetail.value = res.data.pledgeItemDTO
          amountToPledge.value = res.data.pledgeResponseDTO.amount
          pledgedData.value = res.data.pledgeResponseDTO
          memberAlreadyPledgedToPledgeItem.value = true
          selectedCurrency.value = contributionDetail.value.currency
          selectedCurrencyCode.value = contributionDetail.value.currency.shortCode
        } else {
          // Generic page
          contributionDetail.value.pledgeItemDTOs = res.data.pledgeItemDTOs;
          churchLogo2.value = res.data.pledgeItemDTOs[0].logo
          churchName.value = res.data.pledgeItemDTOs[0].tenantName
          contributionDetail.value.name = `${churchName.value} Pledge Portal`;
        }
        checking.value = true;
      } catch (error) {
        console.log(error);
        cardLoading.value = false;
      }
    };
    getContribution();

    const getAllCurrencies = (id) => {
      axios
        .get("/api/lookup/getallcurrencies")
        .then((res) => {
          currencyList.value = res.data
          if (id) {
            selectedCurrency.value = currencyList.value.find((i) => i.id == id);
          }
        })
        .catch((err) => console.log(err));
    };
    getAllCurrencies();


    const payWithPaystack = (responseObject) => {
      /*eslint no-undef: "warn"*/
      let handler = PaystackPop.setup({
        // key: process.env.VUE_APP_PAYSTACK_PUBLIC_KEY_LIVE,
        key: process.env.VUE_APP_PAYSTACK_API_KEY,
        email: contactDetail.value.email ? contactDetail.value.email : newContact.value.email,
        amount: amountToPayNow.value * 100,
        currency: selectedCurrencyCode.value,
        channels: ['card', 'bank', 'ussd', 'qr', 'mobile_money', 'bank_transfer'],
        ref: responseObject.transactionReference,
        onClose: function () {
          ElMessage({
            type: 'info',
            showClose: true,
            message: "You have cancelled the transaction",
            duration: 5000
          })
        },
        callback: function (response) {
          console.log(response)
          txnRef.value = response.tx_ref;
          confirmPayment();
        },
      });
      handler.openIframe();
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

    const confirmPayment = async () => {

      try {
        const res = await axios.post(
          `/ConfirmInitializeContributionAndPledgePayment?txnref=${txnRef.value}`
        );
        if (res.data.status) {
          paymentSuccessfulDialog.value = true;
          personToggle.value = false;
          userSearchString.value = "";
          if (route.query.tenantID) {
            selectPledgeItemID.value = null;
          }
          contactDetail.value = new Object();
          newContact.value = new Object();
          maxName.value = "";
          maxEmail.value = ""
        } else {
          swal({
            title: "Oops",
            text: res.data.statusMessage,
            icon: "error",
            dangerMode: true,
          })
        }
      } catch (error) {
        console.log(error);
      }
    };

    const payWithFlutterwave = (responseObject) => {
      let country = "";

      switch (selectedCurrencyCode.value) {
        case "KES":
          country = "KE";
          break;
        case "USD":
          country = "US";
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
        case "NGN":
          country = "NG";
          break;
        default:
          country = "";
          break;
      }

      window.FlutterwaveCheckout({
        // public_key: process.env.VUE_APP_FLUTTERWAVE_PUBLIC_KEY_LIVE,
        public_key: process.env.VUE_APP_FLUTTERWAVE_TEST_KEY_TEST,
        tx_ref: responseObject.transactionReference,
        amount: amountToPayNow.value,
        currency: selectedCurrencyCode.value,
        country: country,
        payment_options: "card,ussd",
        customer: {
          email: contactDetail.value.email ? contactDetail.value.email : newContact.value.email,
        },
        callback: (response) => {
          console.log(response)
          txnRef.value = response.tx_ref;
          confirmPayment();
        },
        onclose: () => console.log("Payment closed"),
        customizations: {
          title: "Contribution",
          description: "Payment for Contribution ",
          logo: logoUrl,
        },
      });
    };

    const triggerPayment = () => {
      if (pledgeActionType.value == '1') {
        if (!amountToPayNow.value) {
          ElMessage({
            type: 'warning',
            showClose: true,
            message: "Please enter amount to pay",
            duration: 5000
          })
        } else {
          paymentDialog.value = true
        }
      } else {
        initiatePayment(3)
      }

    }

    const initiatePayment = async (gatewayType) => {
      paymentDialog.value = false
      const loading = ElLoading.service({
        lock: true,
        text: 'Please wait...',
        background: 'rgba(255, 255, 255, 0.9)',
      })
      let gatewayService = gatewayType === 1 ? 'Paystack' : gatewayType == 2 ? 'Flutterwave' : null
      
      newContact.value = { ...newContact.value, mobilePhone: userSearchString.value }
      let payload = {
        person: contactDetail.value && Object.keys(contactDetail.value).length > 0 && contactDetail.value.id ? { id: contactDetail.value.id } : newContact.value,
        pledgeItemDTO: donorDetail.value,
        pledgeResponseDTO: pledgedData.value && Object.keys(pledgedData.value).length > 0 ? pledgedData.value : { currency: selectedCurrency.value, amount: amountToPledge.value },
        pledgePaymentDTO: pledgeActionType.value == 1 ? { currency: selectedCurrency.value, amount: amountToPayNow.value } : null,
      }
      if (gatewayService) payload.gateway = gatewayService

      try {
        let { data } = await axios.post('/InitializeContributionAndPledgePayment', payload);
        loading.close();
        if (data.status) {
          if (gatewayType == 1) {
            payWithPaystack(data)
          } else if (gatewayType == 2) {
            payWithFlutterwave(data)
          } else {
            // Block for users that pledges only
            ElMessage({
              type: 'success',
              showClose: true,
              message: 'Congrats, Your pledge is saved successfully',
              duration: 10000
            })
            paymentSuccessfulDialog.value = true;
            personToggle.value = false;
            userSearchString.value = "";
            if (route.query.tenantID) {
              selectPledgeItemID.value = null;
            }
            contactDetail.value = new Object();
            newContact.value = new Object();
            maxName.value = "";
            maxEmail.value = ""
          }
        } else {
          ElMessage({
            type: 'warning',
            showClose: true,
            message: data.statusMessage,
            duration: 8000
          })
        }
      }
      catch (error) {
        console.error(error)
        // paymentDialog.value = true
        loading.close();
        ElMessage({
          type: 'error',
          showClose: true,
          message: "Couldn't initialise payment service, please try again",
          duration: 5000
        })
      }
    }


    return {
      selectPledgeItemID,
      setSelectPledgeItem,
      searchID,
      maxEmail,
      associationLogo,
      churchLogo2,
      personToggle,
      donorDetail,
      donorDetails,
      disabled,
      appltoggle,
      //   toggleBase,
      contactDetail,
      showNoPhoneError,
      autosearch,
      //   enteredValue,
      showLoading,
      // CheckAfterEleven,
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
      pledgeCategory,
      payWithPaystack,
      amountTo,
      amountFrom,
      churchName,
      Address,
      value,
      loading,
      checking,
      freewillAmount,
      memberName,
      payWithFlutterwave,
      searchedContact,
      //   setEmptyValue,
      selectedContact,
      pledgeAmount,
      amountToPledge,
      amountToPayNow,
      checkContact,
      selectedPledgeItem,
      route,
      pledgeAmountWithComma,
      pledgeActionType,
      memberAlreadyPledgedToPledgeItem,
      pledgedData,
      initiatePayment,
      maxName,
      newContact,
      selectedCurrency,
      selectedCurrencyCode,
      currencyList,
      FLWupportedCurrencies,
      setSelectedCurrency,
      paymentDialog,
      xsOnly,
      mdAndUp,
      lgAndUp,
      xlAndUp,
      paymentSuccessfulDialog,
      cardLoading,
      triggerPayment
    };
  },
};
</script>

<style scoped>
.heading-text {
  font: normal normal 800 1.5rem Nunito sans;
}


.input-border {
  border: 1px solid #3c7e58 !important;
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
  flex-direction: column
}

.loading-div .is-loading {
  font-size: 2rem
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
  margin: 12px 70px;
  transition: all 0.4s ease-in-out;
  max-height: 45px;
}

.row-button:hover {
  cursor: pointer;
  transform: scale(1.05, 1.05)
}

@media (max-width: 500px) {
  .row-button {
    margin: 12px 10px
  }
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

.success {
  color: rgb(112, 192, 67);
  font-weight: 900;
  font-size: 30px;
}
</style>