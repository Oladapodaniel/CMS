<script setup>
import { ref, watchEffect } from 'vue';
import contributionservice from '../../../../services/financials/contributionservice';
import axios from 'axios';
import { ElMessage } from "element-plus";
import finish from '../../../../services/progressbar/progress';
import api from "@/gateway/backendapi";


// const { contributionItems } = defineProps(['contributionItems']);
const emit = defineEmits(['onpayload', 'back'])
const accountNumber = ref("");
const accountName = ref("");
const selectedBank = ref(null);
const banks = ref([]);
const loading = ref(false);
const disabled = ref(false);
const selectedContribution = ref(null);
const paymentGateWaysDb = ref([]);
const gatewayLoading = ref(false);
const gateways = ref([
  // {
  //   name: 'Alat',
  //   icon: require('../../../../assets/alat_logo.png'),
  //   selected: false
  // },
  {
    name: 'Flutterwave',
    icon: require('../../../../assets/flutterwave_logo.png'),
    selected: false
  },
  {
    name: 'Paystack',
    icon: require('../../../../assets/paystack_logo.png'),
    selected: false
  }
])

const props = defineProps({
  contributionItems: {
    type: Array,
    required: false
  },
  updateStoreSetup: {
    type: Object,
    required: false
  }
})

watchEffect(() => {
  if (props.updateStoreSetup) {
    // selectedBank.value = props.updateStoreSetup?.bankName
    // let payload = {
    //   paymentForm: {
    //     accountName: accountName.value,
    //     accountNumber: accountNumber.value,
    //     bankCode: selectedBank.value,
    //     contributionItems: [{ financialContributionID: selectedContribution.value }],
    //     paymentGateWays: paymentGateWaysDb.value.filter(i => i.selected).map(i => ({ paymentGateWayID: i.id }))
    //   }
    // }
    // emit("onpayload", { payload, type: 4 })
  }
})

const selectGateway = (item, index) => {
  paymentGateWaysDb.value[index].selected = !paymentGateWaysDb.value[index].selected
  console.log(item)
}

const getBanks = async () => {
  try {
    let response = await contributionservice.getBanks();
    console.log(response);
    banks.value = response
  }
  catch (error) {
    console.log(error);
  }
}
getBanks()

const resolveCustomerDetail = async () => {
  loading.value = true;
  disabled.value = true;

  try {
    let { data } = await axios.post(
      `https://api.ravepay.co/flwv3-pug/getpaidx/api/resolve_account`,
      {
        recipientaccount: accountNumber.value,
        destbankcode: selectedBank.value,
        PBFPubKey: process.env.VUE_APP_FLUTTERWAVE_PUBLIC_KEY_LIVE,
      }
    );
    console.log(data);
    accountName.value = data.data.data.accountname;
    disabled.value = false;
    loading.value = false;

    if (data.data.data.responsemessage.toLowerCase().includes("sorry")) {
      ElMessage({
        type: "warning",
        message: data.data.data.responsemessage,
        duration: 5000,
      });
    } else {
      ElMessage({
        type: "success",
        message: "Account Check Successful",
        duration: 5000,
      });
    }
  } catch (error) {
    finish();
    disabled.value = false;
    console.log(error);
    loading.value = false;


    if (!accountNumber.value || accountNumber.value === "") {
      ElMessage({
        type: "warning",
        message: "No account number found",
        duration: 5000,
      });
    } else {
      ElMessage({
        type: "error",
        message: "Account Check Error, Please check your banks details again",
        duration: 5000,
      });
    }
    accountName.value = "";
  }
};

watchEffect(() => {
  if (accountNumber.value.length >= 10) {
    resolveCustomerDetail()
  }
})


const getGateWays = () => {
  gatewayLoading.value = true;
  api
    .get("/api/Financials/GetPaymentGateways")
    .then((res) => {
      gatewayLoading.value = false;
      console.log(res);
      const paymentGateWay = res.data.map((i) => {
        return {
          countryCoverageArea: i.countryCoverageArea,
          id: i.id,
          isActive: i.isActive,
          isSubAccountSupported: i.isSubAccountSupported,
          name: i.name,
          selected: false,
        };
      });
      // Remove Stripe and Paypal
      const filteredPaymentGateways = paymentGateWay.filter(i => {
        return !i.name.toLowerCase().includes("stripe") && !i.name.toLowerCase().includes("paypal")
      })

      // Add icon to mapped gateways
      paymentGateWaysDb.value = filteredPaymentGateways.map(j => {
        const index = gateways.value.findIndex(i => i.name.toLowerCase().includes(j.name.toLowerCase()));
        if (index >= 0) {
          j.icon = gateways.value[index].icon;
          return j;
        }
      });
    })
    .catch((err) => {
      finish();
      gatewayLoading.value = false;
      console.log(err);
      ElMessage({
        type: "info",
        message: "Unable to get gateways, please try again",
        duration: 5000,
      });
    });
};
getGateWays();


const completesetup = () => {

  let payload = {
    paymentForm: {
      accountName: accountName.value,
      accountNumber: accountNumber.value,
      bankCode: selectedBank.value,
      contributionItems: [{ financialContributionID: selectedContribution.value }],
      paymentGateWays: paymentGateWaysDb.value.filter(i => i.selected).map(i => ({ paymentGateWayID: i.id }))
    }
  }

  emit("onpayload", { payload, type: 4 })
}


</script>

<template>
  <div>
    <div>
      <p class="text-head font-weight-700">Payment Setup</p>
      <p>Receiving payment for goods and services should be easier, Choose your most means to achieve this.</p>
    </div>
    <div>
      <div class="bank_info">Contribution Items</div>
      <label class="text-head font-weight-700 s-14">Choose contribution item</label>
      <el-select-v2 :options="contributionItems.map((i, index) => ({ label: i.name, value: i.id }))"
        placeholder="Choose contribution type" size="large" v-model="selectedContribution" class="w-100" />
    </div>
    <div class="mt-4">
      <div class="bank_info">Bank Account Info</div>
      <label class="text-head font-weight-700 s-14">Bank Name</label>
      <el-select-v2 :options="banks.map((i, index) => ({ label: i.name, value: i.code }))" placeholder="Choose bank"
        size="large" class="w-100" v-model="selectedBank" filterable />
      <label class="text-head font-weight-700 s-14 mt-4">Account Number</label>
      <el-input type="text" aria-placeholder="Account number" placeholder="Account Number" v-model="accountNumber" />
      <div class="d-flex justify-content-end mt-1">
        <el-icon class="is-loading" v-if="loading">
          <Loading />
        </el-icon>
      </div>
      <p class="s-14 text-right mt-1 font-weight-600 account_name">{{ accountName }}</p>
    </div>
    <div>
      <div class="bank_info mb-2 mt-2">Payment Gateway</div>
      <p>Select from the available Payment gateways. Note that this will require a Verified Merchant account with
        API Keys.</p>
      <div class="d-flex justify-content-center mt-1" v-if="gatewayLoading">
        <el-icon class="is-loading">
          <Loading />
        </el-icon>
      </div>
      <div class="d-flex flex-wrap">
        <div class="gateways mr-2 mt-2" @click="selectGateway(item, index)"
          :class="{ 'selected_gateway': item.selected, 'deselected_gateway': !item.selected }"
          v-for="(item, index) in paymentGateWaysDb" :key="index">
          <img :src="item.icon" :class="{ 'w-75': index == 0, 'w-75': index == 1, 'w-75': index == 2 }" />
        </div>
      </div>
    </div>
    <div class="d-flex justify-content-between flex-wrap mt-5">
      <el-button size="large" round text @click="emit('back')">Go back</el-button>
      <el-button color="#01A439" size="large" @click="completesetup" round>Complete
        Setup</el-button>
    </div>
  </div>
</template>

<style scoped>
.bank_info {
  color: #737373;
}

.account_name {
  color: #0D5EBD
}

.gateways {
  background-color: white;
  width: 100px;
  height: 44px;
  padding: 4px;
  display: flex;
  justify-content: center;
  border-radius: 8px;
  cursor: pointer;
  transition: all .09s ease-in-out;
}

.gateways:hover {
  transform: scale(1.1);
}

.deselected_gateway {
  border: 1px solid #DBDBDB;
}

.selected_gateway {
  border: 1.5px solid #00FBBF;
}

.success_text {
  color: #1E1E1E;
  line-height: 36px;
}
</style>