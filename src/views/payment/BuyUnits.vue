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
            ariaCloseLabel="X"
          >
            <template #header style="d-none">
              <h3>Header</h3>
            </template>
            <PaymentSuccessModal :amount="amount" />
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
          <p class="font-weight-600">
            Note that we charge 1 unit per SMS to all GSM networks in Nigeria.
          </p>
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
                    <div class="col-sm-4 pr-sm-0 d-flex align-items-center">
                      <select
                        name=""
                        id=""
                        class="form-control flat-right-border px-sm-0"
                      >
                        <option value="">Naira(N)</option>
                      </select>
                    </div>
                    <div class="col-sm-8 pl-sm-0 d-flex align-items-center">
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
                  />
                </div>
                <div class="col-md-3"></div>
              </div>
            </div>
          </div>

          <div class="row">
            <div
              class="col-md-12 py-3 d-sm-flex flex-column align-items-center"
            >
              <p class="text-danger font-weight-700 mb-1" v-if="invalidAmount">
                Please enter amount
              </p>
              <button
                class="primary-btn px-4 outline-none"
                @click="payWithPaystack"
                v-if="false"
              >
                Buy SMS Unit
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-lg-8 offset-lg-2 py-3 d-sm-flex justify-content-start">
          <h4 class="font-weight-700">Bank Payment</h4>
        </div>
      </div>

      <div class="row d-md-flex mb-5">
        <div class="col-lg-8 offset-lg-2">
          <div class="row">
            <div class="col-md-6 my-2 bank-details">
              <div class="row">
                <div class="col-md-4 d-flex align-items-center">
                  <div class="image-box" style="height: 80px">
                    <img
                      src="../../assets/gtbank.png"
                      class="px-1"
                      alt="Image"
                    />
                  </div>
                </div>
                <div class="col-md-8 px-md-1">
                  <p class="font-weight-600 pt-2">Guarantee Trust Bank</p>
                  <p class="mb-0">Account Name:</p>
                  <p class="mb-0">Account Number:</p>
                </div>
              </div>
            </div>

            <div class="col-md-4 my-2">
              <div class="row">
                <div class="col-md-12">
                  <img
                    src="../../assets/mastercard.png"
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
            </div>
          </div>
        </div>
      </div>
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

export default {
  components: { PaymentSuccessModal },

  setup() {
    const amount = ref(0);
    const smsUnits = ref(0);
    const invalidAmount = ref(false);
    const purchaseIsSuccessful = ref(false);
    const toast = useToast();

    // setTimeout(() => NProgress.start(), 3000)
    // setTimeout(() => NProgress.done(), 6000)

    const totalSMSUnits = computed(() => {
      if (amount.value <= 0) return "";
      return Math.ceil(amount.value / 2);
    });

    const totalAmount = computed(() => {
      if (amount.value <= 0) return "";
      return Math.ceil(amount.value);
    });

    const userEmail = ref(store.getters.email);
    const churchName = ref("");

    const getUserEmail = async () => {
      userService.getCurrentUser()
        .then(res => {
          userEmail.value = res.userEmail;
          churchName.value = res.churchName;
        })
        .catch(err => {
          console.log(err);
        })
    }


    
    
    // const userEmail = ref("");
    if (!userEmail.value) getUserEmail();

    const payWithPaystack = (e) => {
      e.preventDefault();
      invalidAmount.value = false;
      if (amount.value <= 0) {
        invalidAmount.value = true;
        return false;
      }

      console.log(userEmail.value, "UE");
      /*eslint no-undef: "warn"*/
      let handler = PaystackPop.setup({
        key: process.env.VUE_APP_PAYSTACK_API_KEY,
        email: userEmail.value,
        amount: amount.value * 100,
        firstname: churchName.value,
        lastname: "",
        onClose: function () {
          // swal("Transaction Canceled!", { icon: "error" });
          toast.add({ severity: 'info', summary: 'Transaction cancelled', detail: "You have cancelled the transaction", life: 2500})
        },
        callback: function (response) {
          //Route to where you confirm payment status
          console.log(response, "response");
          var returnres = {
            smsUnit: totalSMSUnits.value,
            transaction_Reference: response.reference,
            amount: amount.value * 100,
          };
          //Route to where you confirm payment status

          axios
            .post("/api/Payment/buySms", returnres)
            .then((res) => {
              console.log(res, "success data");
              purchaseIsSuccessful.value = true;
              store.dispatch("addPurchasedUnits", totalSMSUnits.value);
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

    return {
      amount,
      smsUnits,
      totalAmount,
      totalSMSUnits,
      payWithPaystack,
      invalidAmount,
      purchaseIsSuccessful,
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