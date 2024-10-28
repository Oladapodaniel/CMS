<script setup>
import { ref, computed, inject } from "vue";
import router from "../../../router";
import axios from "@/gateway/backendapi";
import dateFormatter from "../../../services/dates/dateformatter";
import deviceBreakpoint from "../../../mixins/deviceBreakpoint";
import { useStore } from "vuex";
import { ElLoading } from "element-plus";
import { ElMessage } from "element-plus";

import { useRoute } from "vue-router";

const route = useRoute();
const { mdAndUp, lgAndUp, xlAndUp, xsOnly } = deviceBreakpoint();
const singleRemittanceData = ref({});
const showBankDetail = ref(false);
const paymentFailed = ref(false);
const paymentDone = ref(false);
const paymentDialog = ref(false);
const primarycolor = inject("primarycolor");
const store = useStore();
const goBack = () => {
  router.go(-1);
};
const tryAgain = () => {
  paymentFailed.value = false;
};

const formatDate = (date) => {
  return dateFormatter.monthDayYear(date);
};
const manualPayment = () => {
  showBankDetail.value = true;
};
const payOnline = () => {
  paymentDialog.value = true;
};

const paymentStatus = ["NotPaid", "FullyPaid", "PartialPayment"];
const recordStatus = ["Pending", "Editable", "Locked"];

const currentUser = computed(() => {
  if (
    !store.getters.currentUser ||
    (store.getters.currentUser && Object.keys(store.getters.currentUser).length == 0)
  )
    return "";
  return store.getters.currentUser;
});

const payLater = () => {
  router.push('/tenant/remittance/home')
}

const getRemittancebyId = async () => {
  try {
    const { data } = await axios.get(`/api/Remittance/remittance/${route.query.id}`);
    singleRemittanceData.value = data;
    // localStorage.setItem(
    //   JSON.stringify(singleRemittanceData.value),
    //   "singleRemittanceData"
    // );
    console.log(data, "datahj");
  } catch (error) {
    console.log(error);
  }
};
getRemittancebyId();
const initializePayment = (paymentGateway) => {
  const loading = ElLoading.service({
    lock: true,
    text: "Please wait...",
    background: "rgba(255, 255, 255, 0.9)",
  });

  // const payload = {
  //   subscriptionPlanID: selectedSubscriptionPlan.value.id,
  //   paymentGateway: paymentGateway === 0 ? "Paystack" : "Flutterwave",
  //   totalAmount: orderData.value.totalAmount.value,
  //   orderId: orderData.value.id,
  //   tenantId: orderData.value.tenantID,
  //   currencyId: selectedCurrency.value.id,
  //   orderItems: orderData.value.orderItems.map((i) => ({
  //         id: i.id,
  //         ecommerceOrderID: i.ecommerceOrderID,
  //         ecommerceProductID: i.ecommerceProductID,
  //         priceAtPurchase: i.priceAtPurchase,
  //         quantity: i.quantity,
  //       })),
  // };
  axios
    .get(
      `/api/Remittance/InitializeRemittancePayment?remittanceId=${
        singleRemittanceData.value.id
      }&tenantId=${singleRemittanceData.value.tenantID}&paymentGateway=${
        paymentGateway === 0 ? "Paystack" : "Flutterwave"
      }`
    )
    .then(({ data }) => {
      console.log(data, "sgshhsh");
      // close.value.click();
      // initializedOrder.value = res.data;
      loading.close();
      if (data.status) {
        if (paymentGateway == 0) {
          payWithPaystack(data);
        } else {
          payWithFlutterwave(data);
        }
      }
    });
};
const loadFlutterwaveScript = () => {
  return new Promise((resolve, reject) => {
    if (typeof window.FlutterwaveCheckout !== "undefined") {
      resolve(true);
    } else {
      const script = document.createElement("script");
      script.src = "https://checkout.flutterwave.com/v3.js";
      script.onload = () => resolve(true);
      script.onerror = () => reject(new Error("Flutterwave script failed to load"));
      document.head.appendChild(script);
    }
  });
};

const payWithFlutterwave = async (responseObject) => {
  console.log(responseObject, "flutterwave");

  // let country = "";

  // switch (selectedCurrency.value.shortCode) {
  //   case "KES":
  //     country = "KE";
  //     break;
  //   case "GHS":
  //     country = "GH";
  //     break;
  //   case "ZAR":
  //     country = "ZA";
  //     break;
  //   case "TZS":
  //     country = "TZ";
  //     break;

  //   default:
  //     country = "NG";
  //     break;
  // }
  try {
    await loadFlutterwaveScript(); // Ensure the script is loaded before using FlutterwaveCheckout

    window.FlutterwaveCheckout({
      // public_key: process.env.VUE_APP_FLUTTERWAVE_TEST_KEY,
      public_key: process.env.VUE_APP_FLUTTERWAVE_PUBLIC_KEY_LIVE,
      tx_ref: responseObject.transactionReference,
      amount: responseObject.amount,
      currency: responseObject.tenant.country.currency,
      country: responseObject.tenant.country.name,
      payment_options: "card,ussd",
      customer: {
        name:
          responseObject && responseObject.tenant
            ? responseObject.tenant.name
            : currentUser.value.churchName,
        email:
          responseObject && responseObject.tenant
            ? responseObject.tenant.email
            : currentUser.value.userEmail,
      },
      callback: (response) => {
        let trans_id = response.transaction_id;
        let tx_ref = response.tx_ref;
        subscriptionPayment(trans_id, tx_ref);
      },
      onclose: () => console.log("Payment closed"),
      customizations: {
        title: "Subscription",
        description: "Payment for Subscription",
      },
    });
  } catch (error) {
    console.error("Flutterwave script error:", error);
  }
};

const payWithPaystack = (responseObject) => {
  /*eslint no-undef: "warn"*/
  let handler = PaystackPop.setup({
    key: process.env.VUE_APP_PAYSTACK_PUBLIC_KEY_LIVE,
    // key: process.env.VUE_APP_PAYSTACK_API_KEY,
    email: "info@churchplus.co",
    amount: responseObject.amount * 100,
    // amount: TotalAmount.value * 100,
    // currency: selectedCurrency.value.shortCode,
    currency: responseObject.tenant.country.currency,
    // country: responseObject.tenant.country.name,
    channels: ["card", "bank", "ussd", "qr", "mobile_money", "bank_transfer"],
    ref: responseObject.transactionReference,
    onClose: function () {
      ElMessage({
        type: "info",
        showClose: true,
        message: "You have cancelled the transaction",
        duration: 5000,
      });
    },
    callback: function (response) {
      let trans_id = response.trxref;
      let tx_ref = response.trxref;
      subscriptionPayment(tx_ref, trans_id);
    },
  });
  handler.openIframe();
};
const subscriptionPayment = async (trans_id, tx_ref) => {
  try {
    await axios
      .post(`/api/Remittance/ConfirmRemittancePayment?id=${trans_id}&txnref=${tx_ref}`)
      .then((res) => {
        console.log(res);
        // display.value = true;
        if (res.data) {
          paymentFailed.value = false;
          paymentDone.value = true;
        } else {
          paymentFailed.value = true;
        }
      })
      .catch((err) => {
        console.log(err);
        // display.value = true;
        paymentFailed.value = true;
        paymentDone.value = false;
      });
  } catch (error) {
    console.log(error);
    paymentDone.value = false;
    paymentFailed.value = true;
    ElMessage({
      type: "error",
      showClose: true,
      message: "Transaction Failed",
      duration: 5000,
    });
  }
};
</script>

<template>
  <div class="container-fluid">
    <div class="row flex-column flex-sm-row justify-content-sm-between">
      <div>
        <h2 class="text-head font-weight-bold py-0 my-0 text-black">
          Remittance Payment
        </h2>
        <div @click="goBack">
          <span class="s-18 fw-400 cursor-pointer text-black">
            <img src="../../../assets/goback.png" alt="" /> Go back</span
          >
        </div>
      </div>
    </div>
    <div class="row mt-4">
      <div class="col-md-12 d-flex justify-content-center">
        <div class="col-md-7 col-11 border-radius-10 bg-gray-600 mt-4 p">
          <!-- Header with month and remittance summary -->
          <div
            class="header primary-bg text-white d-flex align-items-center justify-content-between p-3 my-4"
          >
            <span class="mb-0 s-24 font-weight-600"
              >{{  singleRemittanceData ? singleRemittanceData.periodMonth : ""
              }} {{ singleRemittanceData ? singleRemittanceData.periodYear : "" }}</span
            >
            <span class="fw-400">Remittance summary</span>
          </div>

          <!-- Remittance details -->
          <div class="remittance-details p-4 rounded">
            <div class="mb-4 d-flex text-center">
              <span class="h5"
                >Remittance ID: {{ singleRemittanceData.remittanceCode }}</span
              >
              <span class="ml-2">
                <img src="../../../assets/form/copyIcon.png" alt="" />
              </span>
            </div>

            <ul class="list-group">
              <li
                class="list-group-item border-botom d-flex justify-content-between align-items-center"
              >
                Total Collection
                <span>NGN {{ singleRemittanceData.totalCollection }}</span>
              </li>
              <li
                class="list-group-item border-botom d-flex justify-content-between align-items-center"
              >
                Remittable
                <span>NGN {{ singleRemittanceData.totalRemittableAmount }}</span>
              </li>
              <li
                class="list-group-item border-botom d-flex justify-content-between align-items-center"
              >
                Amount Paid
                <span>NGN {{ singleRemittanceData.amountPaid }}</span>
              </li>
              <li
                class="list-group-item border-botom d-flex justify-content-between align-items-center"
              >
                Payment date
                <span>{{ formatDate(singleRemittanceData.lastPaymentDate) }}</span>
              </li>
              <li
                class="list-group-item border-botom d-flex justify-content-between align-items-center"
              >
                Status
                <span>{{ paymentStatus[singleRemittanceData.paymentStatus] }}</span>
              </li>
              <li
                class="list-group-item border-botom d-flex justify-content-between align-items-center"
              >
                Record status
                <span>{{ recordStatus[singleRemittanceData.recordStatus] }}</span>
              </li>
            </ul>

            <!-- Payment buttons -->
            <div class="row">
              <div class="col-md-12">
                <div class="row justify-content-center">
                  <div class="col-md-10 col-11 text-center mt-4">
                    <div
                      class="col-md-12 d-flex flex-column flex-sm-row align-items-center justify-content-center"
                    >
                      <el-button
                        round
                        color="#111111"
                        @click="manualPayment"
                        size="large"
                        class="text-white col-md-6 mr-0 mr-md-2"
                        >Manual Payment</el-button
                      >
                      <el-button
                        color="#FF5906"
                        round
                        @click="payOnline"
                        size="large"
                        class="mt-3 col-md-6 text-white mt-sm-0"
                        >Pay Online</el-button
                      >
                    </div>

                    <!-- Pay Later link -->
                    <div class="mt-2 col-md-12" @click="payLater">
                      or <a href="#" class="fw-400">Pay Later</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <el-dialog
      v-model="showBankDetail"
      title=""
      :width="mdAndUp || lgAndUp || xlAndUp ? `50%` : xsOnly ? `90%` : `70%`"
      align-center
      class="border-radius-20"
    >
      <div class="row">
        <div class="col-md-12 my-3 text-center text-black font-weight-bold s-24">
          Manual Payment info
        </div>
        <div class="col-md-12 my-3 justify-content-center d-flex">
          <div class="col-md-10 border-radius-10 bg-gray-600 py-3">
            <div class="col-md-12 font-weight-bold text-dak">Manual Payment info</div>
            <div class="col-md-12 mt-3 text-dak d-flex justify-content-between">
              <span class="fw-400">Account Name:</span>
              <span class="fw-500">Complustech Limited</span>
            </div>
            <div class="col-md-12 mt-3 text-dak d-flex justify-content-between">
              <span class="fw-400">Account Number:</span>
              <span class="fw-500">0017934252</span>
            </div>
            <div class="col-md-12 mt-3 text-dak d-flex justify-content-between">
              <span class="fw-400">Bank:</span>
              <span class="fw-500">Access</span>
            </div>
            <div class="col-md-12 mt-3 text-dak d-flex justify-content-between">
              <span class="fw-400">Send Prove of Payment to:</span>
              <span class="fw-500">08023739961</span>
            </div>
          </div>
        </div>
      </div>
    </el-dialog>
    <el-dialog
      class=""
      style="border-radius: 25px"
      v-model="paymentDialog"
      title=""
      :width="mdAndUp || lgAndUp || xlAndUp ? `50%` : `90%`"
    >
      <div class="row justify-content-center">
        <div class="col-md-10 col-11 mt-4 h-100 bg-white mb-5">
          <div class="row justify-content-center align-items-center">
            <div class="col-md-10 d-flex justify-content-center">
              <div class="text-head font-weight-bold h3 pl-2">Payment methods</div>
            </div>
            <div class="col-md-12 mt-2 d-flex justify-content-center">
              <div class="col-md-7 col-12 col-sm-8">
                <div class="col-sm-12 p-4 text-center continue-text">
                  Continue payment with
                </div>
              </div>
            </div>
            <div class="col-md-12 mt-2">
              <div
                class="row justify-content-center c-pointer"
                @click="initializePayment(0)"
              >
                <!-- <div
                class="row justify-content-center c-pointer"
                @click="initializePayment(0)"
                v-if="currentUser.currency == 'NGN' || currentUser.currency == 'GHS'"
              > -->
                <div class="col-md-8 border py-3 row-button">
                  <div class="row c-pointer justify-content-center">
                    <div class="col-md-6">
                      <img
                        class="w-100"
                        src="../../../assets/mobileonboarding/paystack.png"
                        alt="paystack"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div
                class="row c-pointer mt-3 justify-content-center"
                @click="initializePayment(1)"
              >
                <div class="col-md-8 border py-2 row-button">
                  <div class="row c-pointer justify-content-center">
                    <div class="col-md-7">
                      <img
                        class="w-100"
                        src="../../../assets/mobileonboarding/flutterwave.png"
                        alt="flutterwave"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </el-dialog>
    <el-dialog
      v-model="paymentDone"
      style="border-radius: 20px"
      title=""
      :width="mdAndUp || lgAndUp || xlAndUp ? `50%` : xsOnly ? `90%` : `70%`"
      align-center
    >
      <div class="row">
        <div class="col-12">
          <div class="d-flex justify-content-center">
            <img
              src="../../../assets/mobileonboarding/sub-successful.gif"
              style="width: 250px; margin: auto"
            />
          </div>
          <h3 class="text-center mt-5 font-weight-bold success">Thank you</h3>
          <div class="text-center mt-2 font-weight-600 s-18">
            Payment completed successfully
          </div>
          <div class="d-flex justify-content-center mb-5">
            <el-button
              color="#70c043"
              class="text-white mt-2"
              @click="paymentDone = false"
              round
              >Go back</el-button
            >
          </div>
        </div>
      </div>
    </el-dialog>
    <el-dialog
      class=""
      style="border-radius: 25px"
      v-model="paymentFailed"
      title=""
      :width="mdAndUp || lgAndUp || xlAndUp ? `50%` : `90%`"
    >
      <div class="row justify-content-center">
        <div class="col-md-10 mt-4 h-100 bg-white mb-5">
          <div class="row justify-content-center align-items-center">
            <div class="col-md-10 d-flex justify-content-center">
              <div class="col-md-6">
                <img
                  class="w-100"
                  src="../../../assets/mobileonboarding/sub-failed.png"
                  alt=""
                />
              </div>
            </div>
            <div class="col-md-12 d-flex justify-content-center">
              <div class="col-md-7 col-8">
                <div
                  class="text-head font-weight-bold col-md-12 px-0 h2 text-center"
                  style="color: #d21615"
                >
                  Payment failed!
                </div>
              </div>
            </div>
            <div class="col-md-10 d-flex my-5 justify-content-center">
              <div class="col-md-8">
                <el-button
                  @click="tryAgain"
                  :color="primarycolor"
                  size="large"
                  class="w-100"
                  round
                  >Try again</el-button
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<style scoped>
/* Header styles */
.header {
  border-radius: 8px;
}

/* Remittance details styles */
/* .remittance-details h5 {
  color: #333;
} */

.list-group-item {
  border: none;
  padding: 0.75rem 1.25rem;
  background: none !important;
}

.list-group-item span {
  font-weight: 600;
}

.btn-lg {
  padding: 0.6rem 1.5rem;
}

a {
  color: #000;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}
.row-button {
  border-radius: 50px;
  box-shadow: 0 4px 12px rgb(0 0 0 / 10%);
  background: #f3f3f3;
  transition: all 0.4s ease-in-out;
  border: 1px solid #0000002b;
}
</style>
