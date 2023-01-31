<template>
  <div class="container-wide container-top">
    <div class="row mt-5">
      <div class="col-12 pl-md-0 header">
        Subscription
      </div>
      <div class="col-12 normal-text mt-3 pl-md-0 ">
        Select the subscription that suit your church and the additional tolls
        you need for your church growth.
      </div>

      <div class="col-md-4 col-lg-4 col-12 offset-md-1 sub mt-5 d-block d-md-none  card-bg">
        <div class="row rounded pb-2">
          <div class="col-12 col-sm-6">
            <div class="small-header">Current plan</div>
            <div class="normal-text mt-1">{{ currentPlan }}</div>
          </div>
          <div class="col-12 col-sm-6 mt-3 mt-sm-0">
            <div class="small-header">Expiry Date</div>
            <div class="normal-text mt-1">{{ expiryDate }}</div>
          </div>
        </div>
      </div>

      <div class="col-md-6 mt-5">
        <div class="row bg-white pb-4 sub">
          <div class="col-md-6 col-lg-6  col-12">
            <div class="py-2 small-header">Select Subscription Plan <span class="text-danger">*</span></div>
            <el-select-v2 :options="UserSubscriptionPlans.map(i => ({ label: i.description, value: i.id }))"
              v-model="selectedPlanId" placeholder="Select plan" @change="setSelectedPlan" size="large" class="w-100" />
            <div class="mt-3 normal-text text-right text-md-left italic pl-md-0">
              Membership: {{ selectedPlan && selectedPlan.membershipSize ? selectedPlan.membershipSize.toLocaleString()
              : ""}}
            </div>
          </div>
          <div class="col-md-6 col-lg-6 col-12">
            <div class="py-2 small-header">
              Select Duration (month)
            </div>
            <el-select-v2 :options="selectMonths.map(i => ({ label: i.name, value: i.name }))" v-model="selectMonthId"
              placeholder="Select duration" @change="setSelectedDuration" size="large" class="w-100" />
            <div class=" ml-1 mt-3 normal-text pl-md-0">
              {{ subselectedDuratn > 1 && currentUser ? currentUser.currencySymbol : "" }} {{ subselectedDuratn > 1 ?
              subselectedDuratn.toLocaleString() : ""}}
            </div>
          </div>

        </div>
      </div>

      <div class="col-md-4 col-lg-4 col-12 offset-md-1 sub mt-5 d-none d-md-block  card-bg">
        <div class="row rounded pb-2">
          <div class="col-12">
            <div class="small-header">Current plan</div>
            <div class="normal-text mt-1">{{ currentPlan }}</div>
          </div>
          <div class="col-12 mt-2">
            <div class="small-header">Expiry Date</div>
            <div class="normal-text mt-1">{{ expiryDate }}</div>
          </div>
        </div>
      </div>


      <!-- Add ons -->
      <div class="col-md-12 col-lg-12 pt-3 mt-3">ADD-ONS</div>

      <div v-if="false" class="col-md-6 col-lg-6 p-4 sub mt-3 bg-white">
        <div class="">
          <div class="small-header">Communication</div>
          <div class="row mt-3 normal-text">
            <div class="col-md-2 col-lg-2 col-4">SMS</div>
            <div class="col-md-6 offset-md-1 col-4 mb-2">
              <input type="number" v-model.number="smsValue" class="form-control w-50" placeholder="SMS Unit" />
            </div>
            <div class="col-md-2 col-4">
              {{ smsAmount }}
            </div>
          </div>
          <div class="row mt-2 normal-text">
            <div class="col-md-2 col-lg-2 col-4">Email</div>
            <div class="col-md-6 offset-md-1 col-4 ">
              <el-select-v2 :options="selectEmailUnit.map(i => ({ label: i.name, value: i.name }))"
                v-model="selectEmail" placeholder="Email unit" size="large" class="w-100" />
            </div>
            <div class="col-md-2 col-4">
              {{ selectEmail.constValue ? emailAmount : 0 }}
            </div>
          </div>
          <div class="my-3 small-header">Accounting <br><small>Product price is multiplied by subscrption
              duration</small></div>
          <div class="row normal-text" v-for="(item) in productsList" :key="item.id">
            <div class="col-12" v-if="
              item.type === 0
            
            ">
              <div class="row">
                <div class="col-md-6 col-4">{{ item.name }}</div>
                <div class="col-md-2 col-4">
                  <input type="checkbox" @change="selectCheckbox(item)" />
                </div>
                <div class="col-md-4 text-center col-4">{{ item.price }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- payment summary -->
      <div class="col-md-6 bg-white col-12 sub mt-3">
        <div class="h-100  rounded">
          <div class="text-center small-header">
            Payment Summary({{ currentUser? currentUser.currencySymbol : "" }})
          </div>
          <!-- Selected Products -->
          <div class="row mt-3 normal-text" v-for="item in checkedBoxArr" :key="item.id">
            <div class="col-md-6 col-6">{{ item.name }}</div>
            <div class="col-md-6 col-6 text-right font-weight-bold">
              {{ daysToEndOfSubscription > 0 ? ((item.price * subscriptionDuration) + ((item.price / 30) *
              daysToEndOfSubscription)).toFixed(2) : (item.price * subscriptionDuration).toFixed(2) }}
            </div>
          </div>
          <hr />
          <div class="row mt-3 normal-text">
            <div class="col-md-6 col-6">Total</div>
            <div class="col-md-6 col-6 text-right font-weight-bold">
              {{ TotalAmount.toLocaleString() }}
            </div>
          </div>
          <div class="row mt-5">
            <div class="col-12" data-toggle="modal" data-target="#PaymentOptionModal">
              <el-button color="#136acd" class="w-100" round :disabled="!selectedPlanId">
                Pay Now
              </el-button>
              <!-- <button class="btn pay-now text-white w-100 normal-text">
                Pay Now
              </button> -->
            </div>
          </div>
        </div>
      </div>

      <el-dialog title="Payment status" v-model="display"
        :width="mdAndUp || lgAndUp || xlAndUp ? `50%` : xsOnly ? `90%` : `70%`" align-center :modal="true">
        <div class="row">
          <div class="col-md-12" v-if="!paymentFailed">
            <h4 class="text-success">
              Congrats,
            </h4>
            <p>Your payment was successful</p>
          </div>
          <div class="col-md-12" v-else>
            <h4 class="text-danger">
              Oops,
            </h4>
            <p>
              Your payment was not successful, contact support at
              <span class="font-weight-bold">info@churchplus.co</span>
            </p>
          </div>
        </div>
      </el-dialog>
      <!-- payment summary end -->
      <!-- Modal -->
      <div class="modal fade" id="PaymentOptionModal" tabindex="-1" role="dialog"
        aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header bg-modal">
              <h5 class="modal-title" id="exampleModalLongTitle">
                Payment methods
              </h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true" ref="close">&times;</span>
              </button>
            </div>
            <div class="modal-body p-0 bg-modal pb-5">
              <div class="row">
                <div class="col-sm-12 p-4 text-center continue-text">
                  Continue payment with
                </div>
              </div>
              <div class="row row-button c-pointer d-flex justify-content-center" @click="payWithPaystack"
                v-if="currentUser.currency == 'NGN' || currentUser.currency == 'GHS'">
                <div>
                  <img style="width: 150px" src="../../assets/4PaystackLogo.png" alt="paystack" />
                </div>
              </div>
              <div class="row row-button c-pointer d-flex justify-content-center" @click="payWithFlutterwave">
                <div>
                  <img style="width: 150px" src="../../assets/flutterwave_logo_color@2x.png" alt="flutterwave" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "@/gateway/backendapi";
import { useStore } from "vuex";
import formatDate from "../../services/dates/dateformatter";
import { computed, ref } from "vue";
import userService from "../../services/user/userservice";
import { v4 as uuidv4 } from "uuid";
import productPricing from "../../services/user/productPricing";
import { ElMessage, ElMessageBox } from 'element-plus'
import deviceBreakpoint from "../../mixins/deviceBreakpoint";

export default {
  setup() {
    const store = useStore();
    const subscriptionPlans = ref([]);
    const productsList = ref([]);
    const selectMonth = ref({});
    const selectedPlan = ref({});
    const currentAmount = ref("");
    const currentPlan = ref("");
    const smsValue = ref();
    const selectAmount = ref("");
    const constValue = ref(0);
    const selectEmail = ref({});
    const emailPrice = ref("");
    const smsPrice = ref("");
    const expenseApp = ref("");
    const fixedAsset = ref("");
    const selectedCurrency = ref("");
    const currentUser = ref(store.getters.currentUser);
    const tenantId = ref(currentUser.tenantId);
    const userEmail = ref("")
    const churchName = ref("")
    const userCurrency = ref("")
    const { mdAndUp, lgAndUp, xlAndUp, xsOnly } = deviceBreakpoint()

    const getUserEmail = async () => {
      userService.getCurrentUser()
        .then(res => {
          currentUser.value = res
          userEmail.value = res.userEmail;
          churchName.value = res.churchName;
          tenantId.value = res.tenantId;
          userCurrency.value = res.currency;
          getChurchProfile();
        })
        .catch(err => {
          console.log(err);
        })
    }

    if (!tenantId.value) getUserEmail();
    const acctReceived = ref("");
    const paymentSummary = ref([]);
    const paymentSummObj = ref({});
    const isChecked = ref(false);
    const checkedBoxArr = ref([]);
    const selectCurrencyArr = ref([]);
    const Plans = ref({});
    const close = ref(null);

    const display = ref(false);
    const currencies = ref({});
    const emailSelectedValue = ref("");
    const subSelectedAmount = ref("");
    const isProduction = true
    const initializedOrder = ref("");
    const churchLogo = ref('')

    const expiryDate = ref("");
    const selectMonths = ref([
      { name: "1", code: "NY" },
      { name: "2", code: "RM" },
      { name: "3", code: "LDN" },
      { name: "4", code: "IST" },
      { name: "5", code: "PRS" },
      { name: "6", code: "NY" },
      { name: "7", code: "RM" },
      { name: "8", code: "LDN" },
      { name: "9", code: "IST" },
      { name: "10", code: "PRS" },
      { name: "11", code: "IST" },
      { name: "12", code: "PRS" },
    ]);

    const selectEmailUnit = ref([
      { name: "1000-2000", constValue: 2 },
      { name: "2000-3000", constValue: 4 },
      { name: "3000-4000", constValue: 6 },
      { name: "4000-5000", constValue: 8 },
    ]);
    selectCurrencyArr.value = ["NGN", "USD", "GHS", "ZAR"];
    const existingPlan = ref({});
    const daysToEndOfSubscription = ref(0);
    const countries = ref([]);
    const UserSubscriptionPricing = ref([])
    const UserSubscriptionPlans = ref([])
    const selectedPlanId = ref(null)
    const selectMonthId = ref(null)

    const getAllCountries = () => {
      axios.get("/api/GetAllCountries").then((res) => {
        countries.value = res.data;
        const userCountryID = countries.value.find(i => i.currency == currentUser.value.currency)
        getProductPricing(userCountryID.id)
      })
        .catch(err => console.error(err))
    }
    getAllCountries();

    const getProductPricing = async (id) => {
      let { data } = await productPricing.getProductPricing(id)
      data.forEach(i => {
        if (i.product.name.toLowerCase() === 'subscription') {
          UserSubscriptionPricing.value.push(i)
        }
      })
      selectSubscription();
      UserSubscriptionPlans.value = UserSubscriptionPricing.value.sort((a, b) => a.order - b.order).map(i => {
        i.subscriptionPlan.amount = i.price
        return i.subscriptionPlan
      })

      
    }


    const selectSubscription = () => {
      axios.get("/api/Subscription/subscriptions").then((res) => {
        Plans.value = res.data;
        existingPlan.value.id = Plans.value.id;
        existingPlan.value.amount = Plans.value.amount;
        existingPlan.value.description = Plans.value.description;
        existingPlan.value.amountInDollar = Plans.value.amountInDollar;
        existingPlan.value.membershipSize = Plans.value.membershipSize;

        





        res.data.subscriptionPlans.forEach(i => {
          if (i.membershipSize >= Plans.value.membershipSize) {
            subscriptionPlans.value.push(i)
          }
        })

        // Get current plan

        selectedPlan.value = subscriptionPlans.value.find(
          (i) => i.id == Plans.value.id
        );

        selectedPlanId.value = UserSubscriptionPlans.value.find(i => {
          return i.id == Plans.value.id
        }) ? UserSubscriptionPlans.value.find(i => {
          return i.id == Plans.value.id
        }).id : null;

        // Remove preceeding plans from list

      const joined = UserSubscriptionPlans.value.map(i => i.id).join("")
      const splitted = joined.split(selectedPlan.value.id)
      UserSubscriptionPlans.value = UserSubscriptionPlans.value.splice(splitted[0].length)



        if (selectedPlanId.value == null) {
          ElMessageBox.confirm(
            'Subscription pricing is currently not available in your country, we will make it available as soon as possible, you can reach out to us by sending an email to info@churchplus.co for us to address your specific needs. Thank you for choosing Churchplus',
            'Notice',
            {
              confirmButtonText: 'Alright',
              cancelButtonText: 'Cancel',
              type: 'warning',
            }
          )
            .then(() => {
              ElMessage({
                type: 'warning',
                message: 'We await your feedback. Thank you',
              })
            })
            .catch(() => {
              ElMessage({
                type: 'warning',
                message: 'We await your feedback. Thank you',
              })
            })
        }

        currentAmount.value = res.data.amountInNaira;
        currentPlan.value = existingPlan.value.description;
        productsList.value = res.data.productsList;
        expiryDate.value = formatDate.monthDayYear(
          Plans.value.subscriptionExpiration
        );
        emailPrice.value = productsList.value && productsList.value.length > 0 ? productsList.value.find(
          (i) => i.name === "Email"
        ).price : [];
        smsPrice.value = productsList.value && productsList.value.length > 0 ? productsList.value.find((i) => i.name === "SMS").price : [];


        daysToEndOfSubscription.value = calculateRemomainingMonthsOfSubscription(res.data.subscriptionExpiration)
      });
    };

    const setSelectedDuration = () => {
      selectMonth.value = selectMonths.value.find(i => i.name == selectMonthId.value)
    }

    const setSelectedPlan = () => {
      selectedPlan.value = UserSubscriptionPlans.value.find(i => i.id == selectedPlanId.value)
    }

    const getChurchProfile = async () => {
      try {
        let res = await axios.get(`/GetChurchProfileById?tenantId=${currentUser.value.tenantId}`)
        churchLogo.value = res.data.returnObject.logo
      }
      catch (err) {
        console.log(err)
      }
    }


    const paymentFailed = ref(false);

    const subscriptionPayment = (response, gateway) => {
      close.value.click();
      paymentFailed.value = false;

      const products = checkedBoxArr.value.map((i) => {
        return {
          productName: i.name,
          productID: i.id,
          productPrice: i.price,
        };
      });
      if (selectEmail.value.name) {
        const emailObj = productsList.value.find((i) => i.name === "Email");
        if (emailObj.name) {
          products.push({
            productName: emailObj.name,
            productID: emailObj.id,
            productPrice: emailAmount.value,
          });
        }
      }
      if (smsValue.value) {
        const smsObj = productsList.value.find((i) => i.name === "SMS");
        if (smsObj.name) {
          products.push({
            productName: smsObj.name,
            productID: smsObj.id,
            productPrice: smsAmount.value,
          });
        }
      }
      const body = {
        durationInMonths: selectMonth.value.name
          ? +selectMonth.value.name
          : 0,
        smsUnits: smsValue.value ? smsValue.value : 0,
        emailUnits: selectEmail.value.name
          ? +selectEmail.value.name.split("-")[1]
          : 0,
        totalAmount: TotalAmount.value,
        paymentGateway: gateway == 0 ? 'paystack' : 'flutterwave',
        txnRefID: gateway == 0 ? response.trxref : response.transaction_id,
        productItems: products,
        currency: selectedCurrency.value,
      };

      if (selectMonth.value) {
        body.subscriptionPlanID = selectedPlan.value.id;
      }

      if (gateway == 0) {
        try {
          axios
            .post("/api/Subscription/SubscriptionPayment", body)
            .then((res) => {
              display.value = true;
              selectSubscription();
              if (!res.data.returnObject.status) {
                paymentFailed.value = true;
              }
            })
            .catch((err) => {
              console.log(err);
              display.value = true;
              paymentFailed.value = true;
            });
        } catch (error) {
          console.log(error);
        }
      } else {
        try {
          axios
            .post("/api/Subscription/subscribe?paymentType=1", body)
            .then((res) => {
              display.value = true;
              selectSubscription();
              if (!res.data.status) {
                paymentFailed.value = true;
              }
            })
            .catch((err) => {
              console.log(err);
              display.value = true;
              paymentFailed.value = true;
            });
        } catch (error) {
          console.log(error);
        }
      }
    };


    const emailAmount = computed(() => {
      if (!selectEmail.value.name) return 0;
      return +selectEmail.value.name.split("-")[1] * emailPrice.value;
    });

    const smsAmount = computed(() => {
      if (!smsValue.value) return 0;
      return smsValue.value * smsPrice.value;
    });

    const subselectedDuratn = computed(() => {
      let multiValue = 1;
      if (selectedPlan.value && selectedPlan.value.amount)
        multiValue *= selectedPlan.value.amount;
      if (selectMonth.value.name) multiValue *= +selectMonth.value.name;
      return multiValue;
    });

    const TotalAmount = computed(() => {
      let sum = 0;
      if (subselectedDuratn.value && selectMonth.value.name > 0) sum += subselectedDuratn.value;
      if (smsValue.value) sum += smsValue.value * 2;
      sum += emailAmount.value;
      return sum + (+sumCheckboxItem.value.toFixed(2));
    });
    const sumCheckboxItem = computed(() => {
      if (checkedBoxArr.value.length === 0) return 0;
      return checkedBoxArr.value.map((i) => calculatedProductPrice(i.price)).reduce((a, b) => a + b);
    });

    const selectCheckbox = (item) => {
      const index = checkedBoxArr.value.findIndex((i) => i.name === item.name);
      if (index < 0) {
        checkedBoxArr.value.push(item);
      } else {
        checkedBoxArr.value.splice(index, 1);
      }
    };

    const setSelectedPaymentCurrency = () => {
      if (currentUser.value) {
        selectedCurrency.value = currentUser.value.currency;
      }
    }

    const getCurrencySymbol = async () => {
      userService
        .getCurrentUser()
        .then((res) => {
          currentUser.value = res;
          setSelectedPaymentCurrency()
        })
        .catch((err) => {
          console.log(err);
        });
    };



    if (!currentUser.value || !currentUser.value.currency) {
      getCurrencySymbol();
    } else {
      setSelectedPaymentCurrency()
    }
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
 ${appendLeadingZeroes(currentDate.getSeconds())}${appendLeadingZeroes(
      currentDate.getMilliseconds()
    )}`;


    const initializePayment = (paymentGateway) => {
      const payload = {
        gateway: paymentGateway === 0 ? 'paystack' : 'flutterwave',
        totalAmount: TotalAmount.value,
        tenantId: currentUser.value.tenantId,
        orderId: uuidv4()
      }
      axios
        .post('/api/payment/initializesubscription', payload)
        .then((res) => {
          close.value.click();
          initializedOrder.value = res.data;
        })
    }
    const payWithPaystack = () => {
      initializePayment(0);
      /*eslint no-undef: "warn"*/
      let handler = PaystackPop.setup({
        // key: process.env.VUE_APP_PAYSTACK_PUBLIC_KEY_LIVE,
        // process
        key: process.env.VUE_APP_PAYSTACK_API_KEY,

        email: "info@churchplus.co",
        amount: TotalAmount.value * 100,
        ref: `${formattedDate.substring(0, 4)}${uuidv4().substring(0, 4)}sub`,
        currency: Plans.value.paymentCurrency,
        channels: ['card', 'bank', 'ussd', 'qr', 'mobile_money', 'bank_transfer'],
        onClose: function () {
          ElMessage({
                type: 'warning',
                message: 'Transaction cancelled',
                duration: 5000
              })
        },
        callback: function (response) {
          subscriptionPayment(response, 0);
          //Route to where you confirm payment status
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
    }
    getFlutterwaveModules()

    const payWithFlutterwave = () => {
      initializePayment(1)

      let country = "";

      switch (selectedCurrency.value) {
        case 'KES':
          country = 'KE';
          break;
        case 'GHS':
          country = 'GH';
          break;
        case 'ZAR':
          country = 'ZA';
          break;
        case 'TZS':
          country = 'TZ';
          break;

        default:
          country = 'NG';
          break;
      }

      window.FlutterwaveCheckout({
        public_key: process.env.VUE_APP_FLUTTERWAVE_TEST_KEY,
        // public_key: process.env.VUE_APP_FLUTTERWAVE_PUBLIC_KEY_LIVE,
        tx_ref: uuidv4().substring(0, 8),
        amount: TotalAmount.value,
        currency: selectedCurrency.value,
        country: country,
        payment_options: 'card,ussd',
        customer: {
          // name: props.name,
          email: currentUser.value.userEmail
        },
        callback: (response) => {
          subscriptionPayment(response, 1)
        },
        onclose: () => console.log('Payment closed'),
        customizations: {
          title: 'Subscription',
          description: "Payment for Subcription ",
          logo: churchLogo.value,
        },
      });
    }
    const calculateRemomainingMonthsOfSubscription = expiryDate => {
      const endDate = new Date(expiryDate);
      const startDate = new Date(Date.now());

      const differenceInTime = Math.abs(endDate - startDate);
      const differenceInDays = Math.ceil(differenceInTime / (1000 * 60 * 60 * 24));

      return differenceInDays;
    }

    const subscriptionDuration = computed(() => {
      // if (selectMonth.value.name && daysToEndOfSubscription.value) return +selectMonth.value.name + daysToEndOfSubscription.value;
      // if (!daysToEndOfSubscription.value && selectMonth.value.name) return +selectMonth.value.name;
      // return daysToEndOfSubscription.value;
      if (selectMonth.value.name) return +selectMonth.value.name
      return 0
    })

    const calculatedProductPrice = price => {
      if (daysToEndOfSubscription.value < 1) return selectMonth.value.name ? price * +selectMonth.value.name : 0;
      return (selectMonth.value.name ? price * +selectMonth.value.name : 0) + ((price / 30) * daysToEndOfSubscription.value);
    }

    return {
      selectedPlan,
      selectSubscription,
      subscriptionPlans,
      currentAmount,
      currentPlan,
      constValue,
      smsValue,
      selectMonth,
      selectMonths,
      selectAmount,
      selectEmailUnit,
      selectEmail,
      emailPrice,
      productsList,
      emailAmount,
      emailSelectedValue,
      subSelectedAmount,
      TotalAmount,
      expiryDate,
      subselectedDuratn,
      expenseApp,
      fixedAsset,
      acctReceived,
      payWithPaystack,
      paymentSummary,
      paymentSummObj,
      isChecked,
      selectCheckbox,
      checkedBoxArr,
      sumCheckboxItem,
      smsPrice,
      smsAmount,
      getCurrencySymbol,
      currentUser,
      existingPlan,
      Plans,
      selectCurrencyArr,
      selectedCurrency,
      currencies,
      display,
      close,
      paymentFailed,
      payWithFlutterwave,
      daysToEndOfSubscription,
      subscriptionDuration,
      initializePayment,
      tenantId,
      initializedOrder,
      userEmail,
      userCurrency,
      countries,
      UserSubscriptionPricing,
      UserSubscriptionPlans,
      selectedPlanId,
      selectMonthId,
      setSelectedDuration,
      setSelectedPlan,
      churchLogo,
      mdAndUp, 
      lgAndUp, 
      xlAndUp, 
      xsOnly
    };
  },
};
</script>

<style scoped>
.header {
  font: normal normal 800 34px/46px Nunito Sans;
}

.normal-text {
  font: normal normal normal 18px/24px Nunito Sans;
}

.small-header {
  font: normal normal bold 16px/22px Nunito Sans;
}

.sub {
  background: #ffffff 0% 0% no-repeat padding-box;
  /* box-shadow: 4px 10px 35px #0000000d; */
  box-shadow: 0px 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  /* border: 1px solid #0f022021; */

  border-radius: 15px;
  opacity: 1;
  padding: 20px;
}

.plandropdown {
  text-align: left;
  font: normal normal normal 18px/24px Nunito Sans;
  letter-spacing: 0px;
  color: #02172e;
  opacity: 1;
}

.communication {
  background: #ffffff 0% 0% no-repeat padding-box;
  box-shadow: 4px 10px 35px #0000000d;
  border: 1px solid #0f022021;
  border-radius: 15px;
  opacity: 1;
}

.payment {
  box-shadow: 4px 10px 35px #0000000d;
  border: 1px solid #0f022021;
  border-radius: 15px;
  opacity: 1;
}

.pay-now {
  background: #136acd 0% 0% no-repeat padding-box;
  border-radius: 22px;
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

.continue-text {
  font-family: Nunito Sans !important;
  font-size: 24px;
  font-weight: 700;
  text-align: center;
}

.emailWidth {
  width: 60%;
}

.form-control {
  width: 60% !important;
}

.italic {
  font-style: italic
}

.card-bg {
  background: #cae2ee49;
}
</style>
