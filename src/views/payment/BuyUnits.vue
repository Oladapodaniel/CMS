<template>
  <div class="px-sm-2 slim-container">
    <div class="container">
      <div class="row text-center">
        <div class="col-md-12 mb-4 mt-3" id="successDialog">
          <h2 class="font-weight-bold intro-text">
            Choose a plan that's right for your church
          </h2>
          <Toast />
          <Dialog
            :modal="true"
            v-model:visible="purchaseIsSuccessful"
            :style="{ maxWidth: '900px', }"
            :ariaCloseLabel="X"
            closeOnEscape="true"
          >
            <template #header style="d-none">
              <h3>Header</h3>
            </template>
            <PaymentSuccessModal @close-modal="closeModal" :amount="amount" />
          </Dialog>
        </div>
      </div>

      <div class="row text-center mb-4">
        <div class="col-lg-8 offset-lg-2">
          <p class="font-weight-noraml small-text">
            There is no maximum limit or expiry date for your units which you
            may purchase at any time. With our pricing system you get more SMS
            units the more you buy.
          </p>
          <!-- <p class="font-weight-600">
            Note that we charge 1 unit per SMS to all GSM networks in Nigeria.
          </p> -->
        </div>
      </div>

      <div class="row mb-4">
        <div class="col-lg-8 offset-lg-2 buy-box">
          <div class="row mb-5">
            <div class="col-md-12 calc-con">
              <h2 class="font-weight-700 plan-header text-white">
                Buy SMS Units
              </h2>
            </div>
          </div>

          <div class="row my-3">
            <div class="col-md-12">
              <div class="row">
                <div
                  class="col-md-3 d-flex align-items-center justify-content-md-end"
                >
                  <label for="">Amount:</label>
                </div>
                <div class="col-md-6">
                  <div class="row">
                    <div class="col-5 col-sm-4 pr-0 d-flex align-items-center">
                      <select
                        name=""
                        id=""
                        class="form-control flat-right-border px-sm-0"
                      >
                        <option value="">{{ userCurrencyName ? userCurrencyName : ''}}</option>
                      </select>
                    </div>
                    <div class="col-7 col-sm-8 pl-0 d-flex align-items-center">
                      <input
                        type="text"
                        v-model="amount"
                        class="form-control flat-left-border"
                      />
                    </div>
                  </div>
                </div>
                <div class="col-md-3"></div>
              </div>
            </div>
          </div>

          <div class="row my-3">
            <div class="col-md-12">
              <div class="row">
                <div
                  class="col-md-3 d-flex align-items-center justify-content-md-end"
                >
                  <label for="">SMS Units:</label>
                </div>
                <div class="col-md-6">
                  <input
                    type="text"
                    v-model="totalSMSUnits"
                    disabled
                    class="form-control flat-left-border"
                  />
                </div>
                <div class="col-md-3"></div>
              </div>
            </div>
          </div>

          <div class="row my-3">
            <div class="col-md-12">
              <div class="row">
                <div
                  class="col-md-3 d-flex align-items-center justify-content-md-end"
                >
                  <label for="">Total:</label>
                </div>
                <div class="col-md-6">
                  <input
                    type="text"
                    v-model="totalAmount"
                    disabled
                    class="form-control flat-left-border"
                    @input="userCurrencyConversion()"
                  />
                </div>
                <div class="col-md-3"></div>
              </div>
            </div>
          </div>

          <div class="row">
            <div
              class="col-md-12 py-3 d-flex flex-column align-items-center"
            >
              <p class="text-danger font-weight-700 mb-1" v-if="invalidAmount">
                Please enter amount
              </p>
              <button
                class="primary-btn px-4 outline-none"
                  data-toggle="modal"
                  data-target="#PaymentOptionModal"  
              >
                Buy SMS Unit
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- payment modal for paystack and flutterwave  -->
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
                <!-- <PaymentOptionModal :orderId="formResponse.orderId" :donation="donationObj" :close="close" :name="name" :amount="amount" :converted="convertedAmount" :email="email" @payment-successful="successfulPayment" :gateways="formResponse.paymentGateWays" :currency="dfaultCurrency.shortCode" @selected-gateway="gatewaySelected"/> -->
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
              <!-- <div class="row row-button c-pointer" @click="makePayment">
                <div class="col-4 col-sm-7 offset-2">
                  <img
                    class="w-100"
                    src="../../assets/flutterwave_logo_color@2x.png"
                    alt="flutterwave"
                  />
                </div>

                <div class="col-7 col-sm-4 option-text">Flutterwave</div>
                <div class="row">
                  <div class="col-1 mt-n1 d-none d-sm-block">
                    <i class="fas fa-circle circle"></i>
                  </div>
                  <div class="col-8 pl-0 d-none d-sm-block">Nigeria</div>
                </div>
              </div> -->
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-lg-8 offset-lg-2 py-3 d-sm-flex justify-content-start">
          <h4 class="font-weight-700">Bank Payment</h4>
        </div>
        <div class="col-12 col-lg-8 offset-lg-2 pb-3">
           <img
              src="../../assets/payment-type.jpeg"
              class="px-1 w-100"
              alt="Image"
            />
        </div>
      </div>

      <!-- <div class="row d-md-flex mb-5">
        <div class="col-lg-8 offset-lg-2">
          <div class="row">
            <div class="col-md-6 my-2 bank-details">
              <div class="row">
                <div class="col-md-12 d-flex align-items-center">
                  <div class="image-box" style="height: 80px">
                    <img
                      src="../../assets/payment-type.jpeg"
                      class="px-1 w-100"
                      alt="Image"
                    />
                  </div>
                </div> -->
                <!-- <div class="col-md-8 px-md-1">
                  <p class="font-weight-600 pt-2">Guarantee Trust Bank</p>
                  <p class="mb-0">Account Name:</p>
                  <p class="mb-0">Account Number:</p>
                </div> -->
              <!-- </div>
            </div> -->

            <!-- <div class="col-md-4 my-2">
              <div class="row">
                <div class="col-md-12">
                  <img
                    src="../../assets/payment-type.jpeg"
                    class="master-card"
                    alt="Image"
                  />
                </div>
                <div class="col-md-12">
                  <img
                    src="../../assets/visacard.png"
                    class="px-1 visa-card"
                    alt="Image"
                  />
                </div>
              </div>
            </div> -->
          <!-- </div>
        </div>
      </div> -->
    </div>
  </div>
</template>

<script>
import { computed, onMounted, ref } from "vue";
import axios from "@/gateway/backendapi";
import PaymentSuccessModal from "@/components/payment/PaymentSuccessful.vue"
import store from '../../store/store'
import userService from '../../services/user/userservice'
import { useToast } from "primevue/usetoast";
import stopProgressBar from "../../services/progressbar/progress"
import membershipService from "../../services/membership/membershipservice";
import { v4 as uuidv4 } from 'uuid';
import currencyConverter from "../../services/currency-converter/currencyConverter"


export default {
  components: { PaymentSuccessModal },
  setup() {
    const amount = ref(0);
    const smsUnits = ref(0);
    const invalidAmount = ref(false);
    const purchaseIsSuccessful = ref(false);
    const toast = useToast();
    const isProduction = ref(false);
    const uuid = ref(uuidv4());
    const totalSMSUnits = computed(() => {
      if (amount.value <= 0) return "";
      return Math.ceil(amount.value / currentUser.value.pricePerUnitSMS);
    });

    const totalAmount = computed(() => {
      if (amount.value <= 0) return "";
      return Math.ceil(amount.value);
    });
    
    const userEmail = ref(store.getters.userEmail);
    // console.log(userEmail, "the Lord is Good")
    const currentUser = ref(store.getters.currentUser);
    const tenantId = ref(currentUser.tenantId);
    const userCurrency = ref(currentUser.currency);
    const churchName = ref("");
    const churchLogo = ref('https://images.app.goo.gl/cdhuWQU7a11CRJnRA');
    const close = ref(null);
    const isSuccessful = ref(false);
    const pricePerUnitSMS = ref(0);

    const getUserEmail = async () => {
      userService.getCurrentUser()
        .then(res => {
          console.log(res, 'hereee')
          userEmail.value = res.userEmail;
          churchName.value = res.churchName;
          tenantId.value = res.tenantId;
          userCurrency.value = res.currency;
          pricePerUnitSMS.value = res.pricePerUnitSMS
          currentUser.value = res

        })
        .catch(err => {
          console.log(err);
        })
    }
    console.log(currentUser, 'current user ...');

    // const userEmail = ref("");
      if (!userEmail.value || !tenantId.value|| !pricePerUnitSMS.value ) getUserEmail();

    const getEmail = async () => {
       if (!currentUser.value || !currentUser.value.userEmail){
          membershipService.getSignedInUser()
          .then(res => {
            console.log(res)
              // userEmail.value = res.userEmail;
              // churchName.value = res.churchName;
          })
          .catch(err =>{
            console.log(err)
          })
       }
    }
     getEmail()

    // const userEmail = ref("");
     const userCurrencyName = computed(() => {
        // if (!currentUser.value) return "ngn";
        // console.log(currentUser, 'compute current user');
        if (currentUser.value.flutterwaveEnabled) return currentUser.value.currency;
        return 'USD';
      });

    const payWithPaystack = (e) => {
      initializePayment(0)    
      const currencyConvertedAmount = currencyConverter.convertCurrencyTo(+amount.value, 'ngn', 'usd').then((res) => {
        console.log(res, 'res success');
      })
      console.log(currencyConvertedAmount, 'currencyConvertedAmount successful');
      e.preventDefault();
      invalidAmount.value = false;
      if (amount.value <= 0) {
        invalidAmount.value = true;
        return false;
      }
         const getUserEmail = async () => {
         userService.getCurrentUser()
        .then(res => {
          userEmail.value = res.userEmail;
          churchName.value = res.churchName;
          tenantId.value = res.tenantId;
          userCurrency.value = res.currency;
          currentUser.value = res

        })
        .catch(err => {
          console.log(err);
        })
    }
  

    // const userEmail = ref("");
      if (!userEmail.value || !tenantId.value) getUserEmail();(0);
      console.log(userEmail.value, "UE");
      /*eslint no-undef: "warn"*/
      let handler = PaystackPop.setup({
        key: process.env.VUE_APP_PAYSTACK_PUBLIC_KEY_LIVE,
        // key: process.env.VUE_APP_PAYSTACK_API_KEY,
        email: userEmail.value,
        amount: amount.value * 100,
        firstname: churchName.value,
        lastname: "",
        ref: uuid.value,
        currency: userCurrencyName.value,
        onClose: function () {
          // swal("Transaction Canceled!", { icon: "error" });
          if (!isSuccessful.value) {
                axios
                  .put('/cancelpayment', {paymentTransactionId: initializedOrder.value.id})
                  .then((res) => {
                    console.log('payment cancelled');
                  toast.add({ severity: 'info', summary: 'Transaction cancelled', detail: "You have cancelled the transaction", life: 2500})

                  })
          }
        },
        callback: function (response) {
          //Route to where you confirm payment status
          console.log(response, "response");
          var returnres = {
            smsUnit: totalSMSUnits.value,
            transaction_Reference: response.trxref,
            amount: amount.value * 100 ,
            orderId: response.trxref,
            tenantId: currentUser.value.tenantId,
          };
          
          // const paymentAmount = ref(0)
          // const userCurrencyConversion = async () => {
          //   if (!currentUser.value.flutterwaveEnabled) return 
          //     const currencyConvertedAmount = await currencyConverter.convertCurrencyTo(+amount.value, 'ngn', 'usd')
          //     paymentAmount.value = currencyConvertedAmount

          // }

          //Route to where you confirm payment status

          axios
            .post(`/api/Payment/purchasesmsunits?paymentType=0`, returnres)
            .then((res) => {
             if (res.data) {
                console.log(res, "success data");
                close.value.click();
                purchaseIsSuccessful.value = true;
                store.dispatch("addPurchasedUnits", totalSMSUnits.value);
             } else {
                toast.add({ severity: 'error', summary: 'Confirmation failed', detail: "Confirming your purchase failed, please contact support at info@churchplus.co"})

             }
            })
            .catch((err) => {
              stopProgressBar();
              toast.add({ severity: 'error', summary: 'Confirmation failed', detail: "Confirming your purchase failed, please contact support at info@churchplus.co"})
              console.log(err, "error confirming payment");
            });
        },
      });
      handler.openIframe();
    };

    onMounted(() => {
      console.log();
    })

    const closeModal = () => purchaseIsSuccessful.value = false;
    const initializedOrder = ref({})
    
    const initializePayment = (paymentType) => {
       const payload = {
        smsUnit: totalSMSUnits.value,
        amount: totalAmount.value,
        tenantId: tenantId.value,
        orderId: uuidv4()
      }
     axios
     .post(`/api/Payment/initializesmspayment?paymentType=${paymentType}`,payload)
     .then((res) => {
       close.value.click();
      //  purchaseIsSuccessful.value = true;
        // store.dispatch("addPurchasedUnits", totalSMSUnits.value);
       initializedOrder.value = res.data;
       console.log(res, 'initializepayment');
     })
    }

    // flutterwave setup function
     const getFlutterwaveModules = () => {
       const script = document.createElement("script");
            script.src = !isProduction
              ? "https://ravemodal-dev.herokuapp.com/v3.js"
              : "https://checkout.flutterwave.com/v3.js";
            document.getElementsByTagName("head")[0].appendChild(script);
             console.log(process.env.VUE_APP_FLUTTERWAVE_TEST_KEY, 'test key')
    }
    getFlutterwaveModules()
    
    const payWithFlutterwave = (e) => {
      initializePayment(1);
      // console.log(e.srcElement.alt)
      // Get and send clicked payment gateway to parent
      // selectedGateway.value = e.srcElement.alt
      // emit('selected-gateway', selectedGateway.value)

      // Close payment modal
      // props.close.click()
       console.log(totalAmount.value)
                    // console.log(selectedCurrency.value)
                    // console.log(email)
    // alert('test')
      window.FlutterwaveCheckout({
                public_key: process.env.VUE_APP_FLUTTERWAVE_PUBLIC_KEY_LIVE,
                tx_ref: uuidv4().substring(0,8),
                amount: totalAmount.value,
                currency: userCurrencyName.value,
                payment_options: 'card,ussd',
                customer: {
                  // name: props.name,
                  // email: currentUser.value.userEmail,
                  email: userEmail.value,
                },
                callback: (response) => {
                  console.log("Payment callback", response)
                    // props.donation.usedPaymentGateway = selectedGateway.value
                    const payload = {
                        smsUnit: totalSMSUnits.value,
                        transaction_Reference:response.transaction_id,
                        amount: totalAmount.value,
                        tenantId: tenantId.value,
                        orderId: initializedOrder.value.id
                    }
                    axios
                          .post(`/api/Payment/purchasesmsunits?paymentType=1`, payload)
                          .then((res) => {
                            if (res.data) {
                              purchaseIsSuccessful.value = true;
                              store.dispatch("addPurchasedUnits", totalSMSUnits.value);
                              // finish()
                              console.log(res, "success data");
                              isSuccessful.value = true;
                            } else {
                              toast.add({
                                severity: 'error',
                                summary: 'Confirmation failed',
                                detail: "Confirming your purchase failed, please contact support at info@churchplus.co",
                                life: 4000
                              })
                            }
                            
                          })
                          .catch((err) => {
                            // finish()
                            toast.add({
                              severity: 'error',
                              summary: 'Confirmation failed',
                              detail: "Confirming your purchase failed, please contact support at info@churchplus.co",
                              life: 4000
                              })
                            console.log(err, "error confirming payment");
                          });
                        // emit('payment-successful', true)
                  },
                onclose: () => {
                  if (!isSuccessful.value) {
                      axios
                      .put('/cancelpayment', {paymentTransactionId: initializedOrder.value.id})
                      .then((res) => {
                        console.log('payment cancelled');
                      toast.add({ severity: 'info', summary: 'Transaction cancelled', detail: "You have cancelled the transaction", life: 2500})

                      })
                  } 

                },
                customizations: {
                  title: 'Subscription',
                  description: "Payment for Subcription ",
                  logo: "https://churchplusstorage.blob.core.windows.net/mediacontainer/coreldrawskill_e9749fad-85e8-4130-b553-37acc8acde61_08062021.png",
                },
              });
    }
  

    return {
      amount,
      smsUnits,
      totalAmount,
      totalSMSUnits,
      payWithPaystack,
      invalidAmount,
      purchaseIsSuccessful,
      closeModal,
      currentUser,
      isProduction,
      payWithFlutterwave,
      tenantId,
      initializePayment,
      initializedOrder,
      churchLogo,
      close,
      userCurrency,
      userCurrencyName,
      uuid,
      pricePerUnitSMS
      // userCurrencyConversion,
    };
  },
};
</script>

<style scoped>
* {
  box-sizing: border-box;
}

.plan-header {
  font-size: 20px;
  color: #000;
}

.plan-box {
  box-shadow: 7px 15px 25px #00000012;
  border: 1px solid #136acd33;
  border-radius: 25px;
  border-bottom: 10px solid #136acd;
}

.plan-items p:nth-child(odd) {
  background: #ebeff433;
}

.calc-con {
  background: #136acd;
  border-radius: 15px 15px 0 0;
  height: 66px;
  display: flex;
  align-items: center;
}

.inp-field {
  border: 1px solid #c5d9f2;
  border-radius: 5px;
  background: transparent;
  color: #fff;
  font-weight: 700;
}

.text-field {
  border-left: none;
  border-radius: 0 5px 5px 0;
  padding-left: 10px !important;
}

.bank-details {
  background: #ebeff4 0% 0% no-repeat padding-box;
  border: 1px solid #dde2e6;
  border-radius: 10px;
  height: fit-content;
}

.hidden-label {
  display: none;
}

.buy-box {
  border: 1px solid #dde2e6;
  border-radius: 15px;
}

.visa-card {
  max-height: 45px;
}

.master-card {
  max-height: 45px;
}

.flat-left-border {
  border-radius: 0px 4px 4px 0;
}

.flat-right-border {
  border-radius: 4px 0 0 4px;
}

.ui-dialog .ui-dialog-titlebar {
   display: none !important;
}

.container .p-dialog-header {
  background: olivedrab !important;
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

@media screen and (max-width: 501px) {
  .intro-text {
    font-size: 24px;
    margin-top: 20px;
  }
}

@media screen and (max-width: 767px) {
  .hidden-label {
    display: inline;
  }

  .labels-box {
    display: none;
  }
}
</style>