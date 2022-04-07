
<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-12 p-4 text-center continue-text">Continue payment with</div>
    </div>
    <div class="row row-button" @click="payWithPaystack">
      <div class="col-4 col-sm-7 offset-2">
        <img class="img-pay" src="../../assets/4PaystackLogo.png" alt="paystack"/>
      </div>
    </div>


    <!-- <div class="row row-button" @click="makePayment">
      <div class="col-4 col-sm-7 offset-2">
        <img class="w-100" src="../../../assets/flutterwave_logo_color@2x.png" alt="flutterwave"/>
      </div>


    </div>


    <div class="row row-button d-flex justify-content-center">
      <div class="col-8 col-sm-6">
        <img class="w-100 img-height" src="../../../assets/paypal-logo-2@2x.png" alt="paypal"/>
      </div>

     
    </div>

    <div class="row row-button d-flex justify-content-center" v-if="stripe">
      <div class="col-7 col-sm-4">
        <img class="w-100 img-height" src="../../../assets/Stripe_logo.jpg" alt="stripe"/>
      </div>

  
    </div> -->


  </div>
</template>

<script>
// import PaystackPay from "../../../components/payment/PaystackPay"

import { ref } from 'vue'
import axios from "@/gateway/backendapi";
import finish from "../../services/progressbar/progress"
import { useToast } from "primevue/usetoast";
export default {
  components: {
    // PaystackPay
    // paystack
  },
  props: ['close', 'donation', 'donorEmail'],
  emits: ['selected-gateway', 'payment-successful', 'set-props'],
//   'orderId', 'donation', , 'amount', 'converted', 'name', 'email', 'gateways', 'currency'
  setup (props, { emit }) {

    const toast = useToast()
    const email = ref("info@churchplus.com")

    // const isProduction = false
    // const logoUrl = `https://flutterwave.com/images/logo-colored.svg`
    const selectedGateway = ref("")
    

    // const paystackGate = computed(() => {
    //   if(!props.gateways) return false
    //   return props.gateways.find(i => i.paymentGateway.name === "Paystack")
    // })

    // const flutterwaveGate = computed(() => {
    //   if(!props.gateways) return false
    //   return props.gateways.find(i => i.paymentGateway.name === "FlutterWave")
    // })

    // const paypalGate = computed(() => {
    //   if(!props.gateways) return false
    //   return props.gateways.find(i => i.paymentGateway.name === "PayPal")
    // })

    // const stripe = computed(() => {
    //   if(!props.gateways) return false
    //   return props.gateways.find(i => i.paymentGateway.name === "Stripe")
    // })
      

    const payWithPaystack = () => {

      selectedGateway.value = "paystack"
      emit('selected-gateway', selectedGateway.value)
   
     console.log(selectedGateway.value)
     console.log(props.donation)

    let body = {
      transactionReference: props.donation.orderID,
      amount: props.donation.contributionItems[0].amount * 100,
      gateway: "paystack"
    }
     emit('set-props', body)

      props.close.click()
      /*eslint no-undef: "warn"*/
      let handler = PaystackPop.setup({
        key: process.env.VUE_APP_PAYSTACK_PUBLIC_KEY_LIVE,
        // key: process.env.VUE_APP_PAYSTACK_API_KEY,
        email: props.donorEmail,
        amount: props.donation.contributionItems[0].amount * 100,
        // firstname: props.name,
        ref: props.donation.orderID,
        subaccount: props.donation.paymentGateway[0].subAccountID,
        bearer: 'subaccount',
        onClose: function () {
          toast.add({ severity: 'info', summary: 'Transaction cancelled', detail: "You have cancelled the transaction", life: 2500})
          console.log('closed')
        },
        callback: function (response) {
          //Route to where you confirm payment status
          console.log(response, "Payment Received");
          console.log(props.donation);

          

          axios
            .post(`/donated?paymentType=0`, props.donation)
            .then((res) => {
              finish()
              console.log(res, "success data");
              emit("donation-confirmed")

            })
            .catch((err) => {
              finish()
              toast.add({ severity: 'error',
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

    // const getFlutterwaveModules = () => {
    //    const script = document.createElement("script");
    //         script.src = !isProduction
    //           ? "https://ravemodal-dev.herokuapp.com/v3.js"
    //           : "https://checkout.flutterwave.com/v3.js";
    //         document.getElementsByTagName("head")[0].appendChild(script);
    //         console.log(process.env.VUE_APP_FLUTTERWAVE_TEST_KEY)
    // }
    // getFlutterwaveModules()

    // const makePayment = (e) => {
    //   console.log(e.srcElement.alt)
    //   // Get and send clicked payment gateway to parent
    //   selectedGateway.value = e.srcElement.alt
    //   emit('selected-gateway', selectedGateway.value)

    //   // Close payment modal
    //   props.close.click()

    //   window.FlutterwaveCheckout({
    //             public_key: process.env.VUE_APP_FLUTTERWAVE_TEST_KEY,
    //             tx_ref: props.orderId,
    //             amount: props.amount,
    //             currency: props.currency,
    //             payment_options: 'card,ussd',
    //             customer: {
    //               name: props.name,
    //               email: props.email,
    //             },
    //             callback: (response) => {
    //               console.log("Payment callback", response)
    //                 // props.donation.usedPaymentGateway = selectedGateway.value

    //                 console.log(props.donation)

    //                 axios
    //                       .post(`/confirmDonation?txnref=${response.tx_ref}`, props.donation)
    //                       .then((res) => {
    //                         finish()
    //                         console.log(res, "success data");

    //                       })
    //                       .catch((err) => {
    //                         finish()
    //                         toast.add({
    //                           severity: 'error',
    //                           summary: 'Confirmation failed',
    //                           detail: "Confirming your purchase failed, please contact support at info@churchplus.co",
    //                           life: 4000
    //                           })
    //                         console.log(err, "error confirming payment");
    //                       });

    //                     emit('payment-successful', true)
    //               },
    //             onclose: () => console.log('Payment closed'),
    //             customizations: {
    //               title: 'Church Giving',
    //               description: "Payment for contribution items",
    //               logo: logoUrl,
    //             },
    //           });
    // }

    return {
      payWithPaystack, selectedGateway, email
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