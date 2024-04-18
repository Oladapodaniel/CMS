<template>
  <Toast></Toast>
  <div class="row">
    <div class="col-md-12">
      <div class="font-weight-bold">Bank name</div>
      <div class="col-md-12 px-0">
        <el-input class="w-100"  v-model="form.bankName" />

        <!-- <div class="dropdown w-100">
          <el-dropdown trigger="click" class="w-100">
            <span class="el-dropdown-link w-100">
              <el-input type="text" placeholder='Select Bank' v-model="bankSearchText" />
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item v-for="item in filteredBanks" :key="item.id" @click="setBank(item)">
                  {{ item ? item.name : "" }}
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div> -->

        <!-- <div class="dropdown">
          <button class="
              btn
              border
              w-100
              phone-input
              d-flex
              justify-content-between
              align-items-center
            " type="button" id="dropdownBankList" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <div>
              {{
                selectedBank && Object.keys(selectedBank).length > 0
                ? selectedBank.name
                : "Select bank"
              }}
            </div>
            <i class="pi pi-chevron-down"></i>
          </button>
          <div class="dropdown-menu w-100" aria-labelledby="dropdownBankList">
            <a class="dropdown-item c-pointer" v-for="item in nigerianBanks" :key="item.id">
              <div @click="setSelectedBank(item)">{{ item.name }}</div>
            </a>
          </div>
        </div> -->
      </div>
    </div>

    <div class="col-md-12">
      <div class="mt-3">
        <div class="font-weight-bold">Account name</div>
      </div>
      <div class="">
        <el-input class="w-100"  v-model="form.accountName"/>
        <!-- <el-input class="w-100"  v-model="form.accountNumber" @blur="resolveCustomerDetail" /> -->
      </div>
    </div>
    <div class="col-md-12">
      <div class="mt-3">
        <div class="font-weight-bold">Account number</div>
      </div>
      <div class="">
        <el-input class="w-100"  v-model="form.accountNumber"/>
        <!-- <el-input class="w-100"  v-model="form.accountNumber" @blur="resolveCustomerDetail" /> -->
      </div>
    </div>
    <div class="col-sm-2 col-lg-3 align-self-center mt-4" v-if="loading">
      <div style="width: 3rem; height: 3rem" role="status">
        <el-icon class="is-loading">
          <Loading />
        </el-icon>
      </div>
    </div>

    <!-- <div class="col-md-12 mt-3">
      <div class="font-weight-bold">Account Name</div>
    </div> -->
    <!-- <div class="col-md-12">
   
      <el-input type="text" v-model="form.accountName" placeholder="Account name" class="w-100" disabled />
      <div class="mt-1">
        <em class="mt-1">This will automatically come up, kindly confirm before clicking on
          save.</em>
      </div>
    </div> -->
    <div class="col-md-12 mt-3">
      <div class="font-weight-bold" >Description</div>
      <el-input class="w-100" v-model="form.description" />
    </div>

    <!-- <div class="col-10 col-md-12 mt-5 d-flex align-items-center c-pointer" >
            <p class="mb-0" style="width:100px">Payment</p><hr class="mt-4" style="width: calc(100% - 80px)"/><span><i class="pi pi-angle-down"></i></span>
        </div> -->
    <!-- <div class="mt-3 col-10 offset-sm-1 offset-md-0 col-md-3 col-lg-4  align-self-center">
            <div>Payment Gateway</div>
        </div> -->
    <!-- <div class="d-flex justify-content-center   col-12 col-sm-10 offset-sm-1 offset-md-0 col-md-6 col-lg-5 pl-md-0 mt-3">
            <input type="checkbox" class="px-2" checked  >
     
        </div> -->
    <div class=" col-md-12  mt-5">
      <el-button @click="submitForm" class="
          primary-bg
          text-white
          w-100
        " round size="large">
        Save
      </el-button>
    </div>
    <!-- <div @click="closeModal" class=" col-md-12 text-center mb-3  mt-4">
      Close
    </div> -->
  </div>
</template>

<script>
import { ref, computed } from "vue";
import Dropdown from "primevue/dropdown";
import axios from "@/gateway/backendapi";
import axio from "axios";
import finish from "../../../services/progressbar/progress";
import { ElMessage, ElMessageBox } from "element-plus";
// import description from '../../workflow/helper/description';

export default {
  components: {
    Dropdown,
  },
  setup(props, context ) {
    const selectedBank = ref({});
    const description = ref('');
    const nigerianBanks = ref([]);
    const bankSearchText = ref("");
    const form = ref({});
    const loading = ref(false);


    const getBanks = () => {
      axios
        .get("/api/Financials/GetBanks")
        .then((res) => {
          console.log(res, "bank lists");
          nigerianBanks.value = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getBanks();
    const filteredBanks = computed(() => {
      if (!bankSearchText.value) return nigerianBanks.value;
      return nigerianBanks.value.filter((i) =>
        i.name.toLowerCase().includes(bankSearchText.value.toLowerCase())
      );
    });

    const closeModal = () =>{
      emit('closemodal')
    }

    const submitForm = () => {
      loading.value = true
      // form.value.bank = {
      //   code: '100',
      // };
      // form.value.bank = {
      //   code: selectedBank.value.code,
      // };
      console.log(form.value, 'hhhhjj');
      axios
        .post("/saveTenantBankWithOutCode", form.value)
        .then((res) => {
          console.log(res, "posted successfully");
          if (res.data.status) {
            context.emit("closemodal", {
              id: res.data.returnObject.id,
              bankName: res.data.returnObject.bankName,
              accountNumber: res.data.returnObject.accountNumber,
              accountName: res.data.returnObject.accountName,
              description: res.data.returnObject.description,
            });
            loading.value = false
          } else {
            ElMessage({
            type: "warning",
            message: res.data.response,
            duration: 5000,
          });
          loading.value = false
          }
        })
        .catch((error) => {
          console.log(error);
          ElMessage({
            type: "error",
            message: "Account Check Error, Please check your banks details again",
            duration: 5000,
          });
          loading.value = false
        });
    };

    const resolveCustomerDetail = async () => {
      loading.value = true;
      try {
        let header = {
          headers: {
            Authorization: `Bearer ${process.env.VUE_APP_PAYSTACK_SECRET_KEY}`,
          },
        };

        let { data } = await axio.get(
          `https://api.paystack.co/bank/resolve?account_number=${form.value.accountNumber}&bank_code=${selectedBank.value.code}`,
          header
        );
        form.value.accountName = data.data.account_name;

        loading.value = false;
        ElMessage({
            type: "success",
            message: "Account Check Successful",
            duration: 5000,
          });
      } catch (error) {
        finish();
        console.log(error);

        loading.value = false;

        if (!form.value.accountNumber || form.value.accountNumber === "") {
          ElMessage({
            type: "warning",
            message: "No account number found",
            duration: 5000,
          });
        } else if (!selectedBank.value.code) {
          ElMessage({
            type: "warning",
            message: "No bank selected, Please select your bank",
            duration: 5000,
          });
        } else {
          ElMessage({
            type: "error",
            message: "Account Check Error, Please check your banks details again",
            duration: 5000,
          });
        }
      }
      console.log(
        selectedBank.value.code,
        form.value.accountNumber,
        "Acount Name"
      );
    };


    const setBank = (item) => {
      bankSearchText.value = item.name;
      selectedBank.value = item;
    };

    return {
      selectedBank,
      nigerianBanks,
      filteredBanks,
      bankSearchText,
      description,
      resolveCustomerDetail,
      loading,
      form,
      submitForm,
      setBank,
      closeModal
    };
  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&family=Raleway:wght@100..900&family=Roboto:wght@100&display=swap');

/* * {
    font-family: Poppins;
} */

.text-head {
  font-family: Raleway !important;
}

.text-font {
  font-family: Poppins !important;
  ;
}

.dropdown-menu {
  max-height: 300px;
  overflow: scroll;
  box-shadow: 0 2px 4px -1px rgb(0 0 0 / 20%), 0 4px 5px 0 rgb(0 0 0 / 14%), 0 1px 10px 0 rgb(0 0 0 / 12%);
}
</style>

   