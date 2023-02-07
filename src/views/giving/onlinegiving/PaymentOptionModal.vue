<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-12 p-4 text-center continue-text">Continue payment with</div>
    </div>
    <div class="row row-button d-flex justify-content-center" @click="payWithPaystack" v-if="paystackGate">
      <img class="img-pay" src="../../../assets/4PaystackLogo.png" alt="paystack" />
    </div>


    <div class="row row-button d-flex justify-content-center" v-if="flutterwaveGate" @click="makePayment">
      <div>
        <img class="img-pay" src="../../../assets/flutterwave_logo_color@2x.png" alt="flutterwave" />
      </div>
    </div>


    <div class="row row-button d-flex justify-content-center" v-if="paypalGate">
      <div class="col-8 col-sm-6">
        <img class="w-100 img-height" src="../../../assets/paypal-logo-2@2x.png" alt="paypal" />
      </div>
    </div>

    <div class="row row-button d-flex justify-content-center" v-if="stripe">
      <div class="col-7 col-sm-4">
        <img class="w-100 img-height" src="../../../assets/Stripe_logo.jpg" alt="stripe" />
      </div>
    </div>
  </div>
</template>

<script>
// import PaystackPay from "../../../components/payment/PaystackPay"

import { ref, computed } from 'vue'
import axios from "@/gateway/backendapi";
import finish from "../../../services/progressbar/progress"
import { useToast } from "primevue/usetoast";
import router from '../../../router';
export default {
  components: {
    // PaystackPay
    // paystack
  },
  props: ['orderId', 'donation', 'close', 'amount', 'converted', 'name', 'email', 'gateways', 'currency', 'churchLogo', 'churchName'],
  setup(props, { emit }) {

    const toast = useToast()

    const isProduction = true
    const selectedGateway = ref("")


    const paystackGate = computed(() => {
      console.log(props)
      if (!props.gateways || props.currency !== 'NGN') return false
      return props.gateways.find(i => i.paymentGateway.name === "Paystack")
    })

    const flutterwaveGate = computed(() => {
      if (!props.gateways) return false
      return props.gateways.find(i => i.paymentGateway.name === "FlutterWave")
    })

    const paypalGate = computed(() => {
      if (!props.gateways) return false
      return props.gateways.find(i => i.paymentGateway.name === "PayPal")
    })

    const stripe = computed(() => {
      if (!props.gateways) return false
      return props.gateways.find(i => i.paymentGateway.name === "Stripe")
    })

    const payWithPaystack = () => {
      selectedGateway.value = 'paystack'
      emit('selected-gateway', selectedGateway.value)

      props.close.click()
      /*eslint no-undef: "warn"*/
      let handler = PaystackPop.setup({
        key: process.env.VUE_APP_PAYSTACK_PUBLIC_KEY_LIVE,
        // key: process.env.VUE_APP_PAYSTACK_API_KEY,
        email: props.email,
        amount: props.converted * 100 ? props.converted * 100 : props.amount * 100,
        firstname: props.name,
        ref: props.orderId,
        subaccount: props.donation.paymentGateway.find(i => {
          return i.paymentGateway.name.toLowerCase() === selectedGateway.value.toLowerCase()
        }).subAccountID,
        // gatewayObject.value.subAccountID,
        bearer: 'subaccount',
        onClose: function () {
          toast.add({ severity: 'info', summary: 'Transaction cancelled', detail: "You have cancelled the transaction", life: 2500 })
        },
        callback: function (response) {
          //Route to where you confirm payment status
          console.log(response, "Payment Received");
          emit('transaction-reference', response.trxref)
          emit('paystack-amount')
          console.log(props.donation)
          // `/confirmDonation?txnref=${response.trxref}`
          axios
            .post(`/donated?paymentType=0`, props.donation)
            .then((res) => {
              finish()
              console.log(res, "success data");

            })
            .catch((err) => {
              finish()
              toast.add({
                severity: 'error',
                summary: 'Confirmation failed',
                detail: "Confirming your purchase failed, please contact support at info@churchplus.co",
                life: 4000
              })
              console.log(err, "error confirming payment");
            });

          emit('payment-successful', true)
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
    }
    getFlutterwaveModules()

    const makePayment = () => {
      // Get and send clicked payment gateway to parent
      selectedGateway.value = 'flutterwave'
      emit('selected-gateway', selectedGateway.value)

      // Close payment modal
      props.close.click()
      // localStorage.setItem('donation', JSON.stringify(props.donation))
      // router.push({ name: 'Pay', query: { email: props.email, gateway: 'flutterwave', currency: props.currency, 'b2bc6285-f61a-4a9b-807f-0117d573c892': 400, churchName: 'Overflow Parish', tenantId: 'e9749fad-85e8-4130-b553-37acc8acde61', currencyId: 'dfce0a14-2741-46c5-b0c7-b327d55923af', subAccountId: 'RS_668182BB786E8204B9F82C173056C6ED', churchLogo: 'https://churchplusstorage.blob.core.windows.net/mediacontainer/logo_b2d434ab-970d-477f-a2aa-4090d499f2e7_01072021.png' } })
      window.FlutterwaveCheckout({
        public_key: process.env.VUE_APP_FLUTTERWAVE_PUBLIC_KEY_LIVE,
        // public_key: process.env.VUE_APP_FLUTTERWAVE_TEST_KEY_TEST,
        tx_ref: props.orderId,
        amount: props.amount,
        currency: props.currency,
        payment_options: 'card,ussd',
        customer: {
          name: props.name,
          email: props.email,
        },
        subaccounts: [
          {
            id: props.donation.paymentGateway.find(i => {
              return i.paymentGateway.name.toLowerCase() === selectedGateway.value.toLowerCase()
            }).subAccountID
          }
        ],
        callback: (response) => {
          console.log("Payment callback", response)
          console.log(props.donation)
          emit('transaction-reference', response.transaction_id)

          axios
            .post(`/donated?paymentType=1`, props.donation)
            .then((res) => {
              finish()
              console.log(res, "success data");

            })
            .catch((err) => {
              finish()
              toast.add({
                severity: 'error',
                summary: 'Confirmation failed',
                detail: "Confirming your purchase failed, please contact support at info@churchplus.co",
                life: 4000
              })
              console.log(err, "error confirming payment");
            });

          emit('payment-successful', true)
        },
        onclose: () => console.log('Payment closed'),
        customizations: {
          title: props.churchName,
          description: "Payment for contribution items",
          logo: props.churchLogo,
        },
      });
    }

    return {
      payWithPaystack, paystackGate, flutterwaveGate, paypalGate, stripe, makePayment, selectedGateway
    }
  }

}

</script>

<style scoped>
.continue-text {
  font-family: Nunito Sans !important;
  font-size: 24px;
  font-weight: bold;
  text-align: center;
}

.option-text {
  font-family: Nunito Sans !important;
  font-weight: 800;
}

.circle {
  color: #136acd;
  font-size: 8px;
}

/* .circle {
    background:  #136acd;
    border-radius: 50%;
    width: 100px;
    height: 100px;
} */

.hover-shadow:hover {
  box-shadow: 0 0 11px rgba(33, 33, 33, 0.2);
  cursor: pointer;
}

.row-button {
  padding: 10px;
  border-radius: 25px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
  background: white;
  margin: 12px 70px 15px 70px;
  transition: all 0.4s ease-in-out;
  max-height: 45px;
}

.img-height {
  max-height: 36px
}

.row-button:hover {
  cursor: pointer;
  transform: scale(1.05, 1.05)
}

.img-pay {
  width: 125px
}
</style>