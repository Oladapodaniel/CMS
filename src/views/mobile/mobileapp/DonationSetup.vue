<template>
  <div class="container-wide">
    <Toast />
    <ConfirmDialog />
    <!-- write up part -->
    <div class="row">
      <div class="col-md-12 mt-5" :class="{ 'slide-right': slide }">
        <div class="row">
          <div class="col-md-7">
            <div class="text-head h3 font-weight-bold">Bank Accounts</div>
            <div class="text-font">Enter bank details to set up online donation</div>
          </div>
          <div class="col-md-5 d-flex justify-content-end">
            <el-button @click="openPaymentOnBoardModal" round size="large" class="text-white  primary-bg  c-pointer">
              Add
            </el-button>
          </div>
        </div>
        <div class="container-fluid px-0  remove-styles2 remove-border responsiveness">
          <table class="table remove-styles mt-0 table-header-area table-border ">
            <thead class="thead-light">
              <tr class="small-text text-capitalize text-nowrap">
                <th></th>
                <th class="text-font">Bank name</th>
                <th class="text-font">Account Number</th>
                <th class="text-font">Account Name</th>
                <th class="text-font">Description</th>
                <th class="text-font">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(bankAccount, index) in bankAccounts" :key="index">
                <td><img src="../../../assets/mobileonboarding/home.png" alt=""></td>
                <td class="text-font">{{ bankAccount.bankName }}</td>
                <td class="text-font">{{ bankAccount.accountNumber }}</td>
                <td class="text-font">{{ bankAccount.accountName }}</td>
                <td class="text-font">{{ bankAccount.description }}</td>
                <td>
                  <el-dropdown trigger="click">
                    <el-icon>
                      <MoreFilled />
                    </el-icon>
                    <template #dropdown>
                      <el-dropdown-menu>
                        <el-dropdown-item>
                          <div @click.prevent="showConfirmModalBank(bankAccount.id, index)" class="text-color">
                            Delete
                          </div>
                        </el-dropdown-item>
                        <el-dropdown-item>
                          <div @click.prevent="editBank(bankAccount.id, index)" class="text-color">
                            Edit
                          </div>
                        </el-dropdown-item>
                      </el-dropdown-menu>
                    </template>
                  </el-dropdown>
                  <!-- <div class="col-2 align-self-center cursor-pointer" @click="showConfirmModalBank(bankAccount.id)">
                      <i class="pi pi-trash text-dark"></i>
                    </div> -->
                </td>
              </tr>
            </tbody>
            <!-- <tbody v-if="bankAccounts.length < 0"> You haven't add any bank account yet </tbody> -->
          </table>
        </div>
        <div class="row mt-5">
          <div class="col-md-7">
            <div class="h3 text-head font-weight-bold">Online Donation</div>
          </div>
          <div class="col-md-5 d-flex justify-content-end">
            <el-button size="large" round @click="openPaymentModal" class=" primary-bg  text-white" data-toggle="modal"
              data-target="#paymentModal" style="font-size: 13px">
              Add Donation Form
            </el-button>
          </div>
          <!-- <div class="col-12">
              <Paymentonboarding/>
          </div> -->
          <div class="col-12">
            <p>Enter bank details to set up online donation</p>
          </div>
        </div>
        <div class="container-fluid table-main bg-white  remove-styles2 remove-border responsiveness">
          <table class="table remove-styles mt-0 table-header-area table-border">
            <thead class="thead-light">
              <tr class="small-text text-capitalize text-nowrap">
                <th></th>
                <th class="text-font">Name</th>
                <th class="text-font">Account Name</th>
                <th class="text-font">Account Number</th>
                <th class="text-font">Bank</th>
                <th class="text-font">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(form, index) in formsArr" :key="index">
                <td><img src="../../../assets/mobileonboarding/home.png" alt=""></td>
                <td class="font-weight-600 text-font">{{ form.accountName }}</td>
                <td class="text-font">{{ form.name }}</td>
                <td class="text-font">{{ form.accountNumber }}</td>
                <td class="text-font">{{ selectCodeBank(form.bankCode) }}</td>
                <td>
                  <el-dropdown trigger="click">
                    <el-icon>
                      <MoreFilled />
                    </el-icon>
                    <template #dropdown>
                      <el-dropdown-menu>
                        <el-dropdown-item>
                          <div @click.prevent="showConfirmModal(form.id, index)" class="text-color">
                            Delete
                          </div>
                        </el-dropdown-item>
                        <!-- <el-dropdown-item>
                          <div @click.prevent="editForm(form.id, index)" class="text-color">
                            Edit
                          </div>
                        </el-dropdown-item> -->
                      </el-dropdown-menu>
                    </template>
                  </el-dropdown>
                  <!-- <div class="col-2 align-self-center cursor-pointer" @click="showConfirmModalBank(bankAccount.id)">
                  <i class="pi pi-trash text-dark"></i>
                </div> -->
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Modal -->
        <el-dialog style="border-radius: 20px;" v-model="displayPaymentModal" :width="mdAndUp || lgAndUp || xlAndUp ? `50%` : `90%`" top>
          <div class=" row justify-content-center ">
            <div class="text-head font-weight-600 h2 text-center col-11 col-md-10">
              Online donation Form
            </div>
            <div class="col-11 col-md-10 pt-2">
              <paymentform @formcreated="formCreated" :formID="formID" />
            </div>
          </div>
        </el-dialog>
        <el-dialog style="border-radius: 20px;" v-model="displayPaymentOnBoardModal" :width="mdAndUp || lgAndUp || xlAndUp ? `50%` : `90%`" top>
          <div class="row justify-content-center">
            <div class=" col-11 col-md-10 d-flex justify-content-center pb-0">
              <div class="text-head h2 font-weight-600">
                Add Bank
              </div>
            </div>
            <div class="col-11 col-md-10 pt-1">
              <Paymentonboarding @closemodal="closeModal" :bankID="bankId" />
            </div>
          </div>
        </el-dialog>
        <!-- <div class="modal fade" id="paymentModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog modal-lg" style="max-width: 600px">
            <div class="modal-content">
              <div class=" row ">
                <div class="col-md-11 d-flex mt-2  justify-content-end"><el-icon data-dismiss="modal" :size="25">
                    <Close />
                  </el-icon></div>
                <div class="modal-title text-head font-weight-600 h2 text-center col-md-12" id="exampleModalLabel">
                  Online donation Form
                </div>
              </div>
              <div class="modal-body pt-0">
                <paymentform @formcreated="formCreated" />
              </div>
            </div>
          </div>
        </div> -->
        <!-- Modal -->
        <!-- <div class="modal fade" id="paymentOnBoardingModal" tabindex="-1" aria-labelledby="exampleModalLabel"
          aria-hidden="true">
          <div class="modal-dialog modal-lg" style="max-width: 600px">
            <div class="modal-content row">
              <el-button ref="closeModalButton" class=" border-0 d-flex justify-content-end mt-3"><el-icon
                  data-dismiss="modal" :size="25">
                  <Close />
                </el-icon></el-button>
              <div class=" col-md-12 d-flex justify-content-center pb-0">
                <div class="text-head h2 font-weight-600" id="exampleModalLabel">
                  Add Bank
                </div>
              </div>
              <div class="modal-body pt-0">
                <paymentonboarding @formcreated="formCreated" @closemodal="closeModal" />
              </div>
            </div>
          </div>
        </div> -->

        <div class="row justify-content-center mt-4">
          <div class="
              col-md-11
              
              my-2
            " @click="completeSetUp">
            <el-button round size="large" :loading="setupSpinner" class=" w-100 primary-bg  text-white">Save and
              Continue</el-button>

          </div>
          <div @click="skip" class="
            
              col-md-11 my-3
              text-center
            ">
            Skip for now
          </div>
        </div>
      </div>
    </div>

    <!-- <Toast /> -->
  </div>
</template>
<script>
import axios from "@/gateway/backendapi";
// import Dropdown from "primevue/dropdown";
import { ref } from "vue";
import router from "../../../router";
import finish from "../../../services/progressbar/progress";
// import { useToast } from "primevue/usetoast";
import axio from "axios";
// import store from "../../../store/store";
import paymentform from "../../../components/genericmobile/paymentform";
import deviceBreakpoint from "../../../mixins/deviceBreakpoint";
import store from "../../../store/store";
import Paymentonboarding from "./PaymentOnBoarding";
import { ElMessage, ElMessageBox } from "element-plus";
// import paymentonboarding from './PaymentOnBoarding';
export default {
  components: {
    paymentform,
    Paymentonboarding,
    // DonationSetup,
    // Dropdown,
  },
  setup(props, context) {
    const nigerianBanks = ref([]);
    const bankAccounts = ref([]);
    const selectedBank = ref("");
    const { lgAndUp, xlAndUp, mdAndUp } = deviceBreakpoint();
    const accountNumber = ref("");
    const accountName = ref("");
    const formID = ref("");
    const bankId = ref("");
    const loading = ref(false);
    const displayPaymentModal = ref(false);
    const displayPaymentOnBoardModal = ref(false);
    const accNameRef = ref("");
    const closeModalButtonForm = ref(null);
    // const toast = useToast();

    // const pastors = ref([{}]);
    const slide = ref(false);
    const banks = ref([
      {
        accountName: accountName.value,
        accountNumber: accountNumber.value,
        banks: selectedBank.value,
      },
    ]);
    const setupSpinner = ref(false);


    const openPaymentModal = () => {
      displayPaymentModal.value = true
    }
    const openPaymentOnBoardModal = () => {
      displayPaymentOnBoardModal.value = true
    }

    const editForm = (id) => {
      displayPaymentModal.value = true
      formID.value = id
    }
    const editBank = (id) => {
      displayPaymentOnBoardModal.value = true
      bankId.value = id
    }

    const completeSetUp = () => {
      let changeState = {
        tab: true,
        churchSetup: false,
        socialMedia: false,
        appBranding: false,
        subsciption: false,
        donationForm: false,
        subscription: true

      };
      context.emit("saved-donation", changeState);

      const currentUser = store.getters.currentUser;
      setupSpinner.value = true;
      axios
        .post(
          `/mobile/v1/Feeds/SetupChurchPostCategories?tenantID=${currentUser.tenantId}`
        )
        .then((res) => {
          console.log(res);
          setupSpinner.value = false;

          // setTimeout(() => {
          //   router.push({ name: "OnboardingSuccessful" });
          // }, 1000);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    const getBanks = () => {
      axios
        .get("/api/Financials/GetBanks")
        .then((res) => {
          console.log(res);
          nigerianBanks.value = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getBanks();

    const deleteDonation = (id) => {
      axios
        .delete(`/api/PaymentForm/Delete?paymentFormID=${id}`)
        .then((res) => {
          console.log(res);
          ElMessage({
            type: "success",
            message: "Donation form deleted",
            duration: 5000,
          });
          formsArr.value = formsArr.value.filter(
            (formid) => formid.id !== id
          );
        })
        .catch((err) => {
          finish();
          if (err.response.status === 400) {
            ElMessage({
              type: "error",
              message: "Unable to delete",
              duration: 5000,
            });
          } else {
            ElMessage({
              type: "error",
              message: "Unable to delete, An error occurred, please try again",
              duration: 5000,
            });
          }
        });
    };

    const selectCodeBank = ((code) => {
      return nigerianBanks.value && nigerianBanks.value.find(i => i.code == code) ? nigerianBanks.value.find(i => i.code == code).name : ""
    })

    const resolveCustomerDetail = async () => {
      loading.value = true;
      try {
        let header = {
          headers: {
            Authorization: `Bearer ${process.env.VUE_APP_PAYSTACK_SECRET_KEY}`,
          },
        };
        console.log(header, "header");

        let { data } = await axio.get(
          `https://api.paystack.co/bank/resolve?account_number=${accountNumber.value}&bank_code=${selectedBank.value.code}`,
          header
        );
        console.log(data);
        accountName.value = data.data.account_name;
        accNameRef.value.focus();

        loading.value = false;
      } catch (error) {
        finish();
        console.log(error);
        loading.value = false;
      }
      console.log(selectedBank.value.code, accountNumber.value);
    };

    const closeModalButton = ref(null);
    const formsArr = ref([]);
    const formCreated = (data) => {
      displayPaymentModal.value = false
      displayPaymentOnBoardModal.value = false
      console.log(data, 'dddd');
      formsArr.value.push({
        id: data.id,
        name: data.name,
        accountName: data.accountName,
        accountNumber: data.accountNumber,
        bankCode: data.bankCode,
      });
    };

    const closeModal = (bankDetails) => {
      displayPaymentOnBoardModal.value = false
      if(bankDetails.id){
        getAllChurchBank();
      } else {
        bankAccounts.value.push({
        id: bankDetails.id,
        accountName: bankDetails.accountName,
        bankName: bankDetails.bankName,
        accountNumber: bankDetails.accountNumber,
        description: bankDetails.description
      });
      }
      bankId.value = ''
      
    };

    const getPaymentForm = () => {
      axios
        .get("/api/PaymentForm/GetAll")
        .then((res) => {
          formsArr.value = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getPaymentForm();

    const getAllChurchBank = () => {
      axios
        .get("/getAllChurchBanks")
        .then((res) => {
          console.log(res, "all bank details");
          bankAccounts.value = res.data.returnObject;
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getAllChurchBank();

    const showConfirmModalBank = (id, index) => {
      ElMessageBox.confirm(
        "Are you sure you want to proceed?",
        "Confirm delete",
        {
          confirmButtonText: "OK",
          cancelButtonText: "Cancel",
          type: "error",
        }
      )
        .then(() => {
          deleteBankUser(id, index);
        })
        .catch(() => {
          ElMessage({
            type: "info",
            message: "Delete canceled",
            duration: 5000,
          });
        });
    };
    const showConfirmModal = (id, index) => {
      ElMessageBox.confirm(
        "Are you sure you want to proceed?",
        "Confirm delete",
        {
          confirmButtonText: "OK",
          cancelButtonText: "Cancel",
          type: "error",
        }
      )
        .then(() => {
          deleteDonation(id, index);
        })
        .catch(() => {
          ElMessage({
            type: "info",
            message: "Delete canceled",
            duration: 5000,
          });
        });
    };

    const deleteBankUser = (id) => {
      axios
        .delete(`deleteTenantBank?Id=${id}`)
        .then((res) => {
          // alert('deleted');
          console.log(res, "deleted bank user");
          ElMessage({
            type: "success",
            message: 'Bank Detail Deleted Successfully',
            // message: res.data.response,
            duration: 5000,
          });
          bankAccounts.value = bankAccounts.value.filter(
            (tenant) => tenant.id !== id
          );
        })
        .catch((err) => {
          console.log(err);
          ElMessage({
            type: "error",
            message: "Unable to delete",
            duration: 5000,
          });
        });
    };

    const skip = () => {
      setupSpinner.value = true;
      const currentUser = store.getters.currentUser;
      axios
        .post(
          `/mobile/v1/Feeds/SetupChurchPostCategories?tenantID=${currentUser.tenantId}`
        )
        .then((res) => {
          console.log(res);
          let changeState = {
            tab: true,
            churchSetup: false,
            socialMedia: false,
            appBranding: false,
            subsciption: false,
            donationForm: false,
            subscription: true

          }
          context.emit("saved-donation", changeState);
          // setTimeout(() => {
          //   router.push({ name: "OnboardingSuccessful" });
          // }, 1000);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    return {
      nigerianBanks,
      formID,
      displayPaymentModal,
      displayPaymentOnBoardModal,
      selectedBank,
      accountNumber,
      editForm,
      completeSetUp,
      slide,
      accountName,
      resolveCustomerDetail,
      loading,
      accNameRef,
      lgAndUp, xlAndUp, mdAndUp,
      banks,
      formCreated,
      closeModalButton,
      formsArr,
      skip,
      setupSpinner,
      closeModal,
      bankAccounts,
      bankId,
      editBank,
      selectCodeBank,
      deleteBankUser,
      openPaymentModal,
      showConfirmModal,
      showConfirmModalBank,
      openPaymentOnBoardModal,
      closeModalButtonForm,
      deleteDonation,
      
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
}

.thead-light tr th {
  font-weight: 500 !important;
  color: #000000 !important;
}

.responsiveness {
  max-width: 100%;
  /* overflow-y: scroll; */
}

.table-main {
  width: 100% !important;
  /* box-shadow: 0 0.063rem 0.25rem #02172e45 !important; */
  /* border: 0.063rem solid #dde2e6 !important; */
  /* border-radius: 30px !important; */

  text-align: left !important;
  /* margin-bottom: auto !important; */
  /* padding-bottom: 0.5rem !important; */
}


.table-header1 {
  background: #f1f3f9;
  color: #8898aa;
  font-size: 11px;
  text-align: left;
  box-shadow: 0px 3px 6px #2c28281c;
  width: 25vw;
  padding: 0.5rem 0;
  max-width: 0;
}


.table-border {
  border-radius: 0;
}

.remove-styles2 {
  padding-right: 0;
  padding-left: 0;
  border-top-left-radius: 0 !important;
  border-top-right-radius: 0 !important;
  overflow-x: scroll;
}

.setup {
  color: #031c39;
  font: normal normal 800 30px/40px Nunito Sans;
}

.check-icon {
  height: 30px;
  width: 30px;
  border-radius: 50%;
  background-color: #136acd;
}

.pi {
  color: #fff;
  margin-top: 6px;
  margin-left: 2px;
}

.btn-button {
  border-radius: 25px !important;
  width: 40%;
  height: 25px;
  line-height: 10px;
}

.bg-image {
  background-image: url("../../../assets/mobileonboarding/onlineDonation.svg");
  background-repeat: no-repeat, repeat;
  background-size: cover;
  height: 100vh;
  width: 100%;
}

.image-dis {
  display: flex;
  justify-content: center;
  align-items: center;
}

.next-btn {
  background: #f1faff 0% 0% no-repeat padding-box;
  border: 0.20000000298023224px solid #7894a6;
  border-radius: 23px;
  opacity: 1;
}

.next-text {
  font: normal normal bold 16px/22px Nunito Sans;
  letter-spacing: 0px;
  color: #136acd;
  opacity: 1;
}

.step {
  font: normal normal bold 18px/24px Nunito Sans;
  letter-spacing: 0px;
  color: #ffffff;
  opacity: 1;
}

.form-cover {
  margin-left: 1.5rem !important;
  width: 100%;
}

.form-group {
  margin-top: 0rem !important;
}

.form-group label {
  padding-top: 0;
  font-weight: bold;
}

.form-control {
  width: 98%;
}

.select option {
  width: 150px;
}

.upload-Btn {
  border-radius: 25px;
  height: 30px;
  width: 90px;
  line-height: 15px;
}

.container {
  width: 100%;
  height: 35vh;

  border-radius: 27px !important;
  background: rgb(248, 248, 249);
  margin-top: 0.3rem;
}

.photo-box {
  border-radius: 27px;
  width: 95%;
  height: 55%;
  background-color: rgb(100%, 100%, 100%);
  margin-bottom: 0.75rem;
  margin-top: 0.75rem;
}

.social-input {
  display: block;
  width: 100%;
  height: calc(1.5em + 0.75rem + 2px);
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #495057;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  /* end add pastor detail */
}

.bg-mission {
  background: #dedede61 0% 0% no-repeat padding-box;
  border: 1px solid #d2cfcf5c;
  border-radius: 24px;
  opacity: 0.64;
  height: 30px;
  padding-right: 50px;
}

.mission {
  font: normal normal bold 16px/22px Nunito Sans;
  letter-spacing: 0px;
  color: #002044;
}

.edit {
  font: normal normal bold 16px/22px Nunito Sans;
  letter-spacing: 0px;
  color: #136acd;
  cursor: pointer;
}

.pastors-name {
  font: normal normal 600 16px/22px Nunito Sans;
}

.edit-pastor-details {
  font: normal normal bold 16px/22px Nunito Sans;
  letter-spacing: 0px;
  color: #136acd;
  cursor: pointer;
}

.btnIcons {
  color: #136acd;
  background-color: #dde2e6;
  border-radius: 40px;
  border: none;
  padding: 7px;
  text-align: center;
}

.slide-left {
  transition: all 1s ease-in-out;
  transform: translateX(-100%);
}

.slide-right {
  transition: all 1s ease-in-out;
  transform: translateX(100%);
}

.events {
  font: normal normal 800 28px Nunito sans;
}

.dropdown-menu {
  max-height: 300px;
  overflow: auto;
}

.skip-text {
  background: rgba(0, 0, 0, 0.707);
  position: fixed;
  top: 32em;
  width: 20%;
}
</style>
