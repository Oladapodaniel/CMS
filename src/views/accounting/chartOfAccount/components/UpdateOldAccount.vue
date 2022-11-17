<template>
  <div>
    <!-- BT MODAL -->
    <div class="container-fluid">
      <div class="row">
        <div class="modal-body">
          <div class="container-fluid">
            <div class="row" v-if="!savingAccount">
              <div class="col-md-12">
                <div class="row my-3">
                  <div class="col-md-4 text-md-right">
                    Account Type <span class="text-danger">*</span>
                  </div>
                  <div class="col-md-7">
                      <button class="  btn d-flex justify-content-between  col-12 border  " type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                          <span class="ofering">
                              &nbsp;&nbsp;&nbsp; {{ selectedAccountType.name ?  selectedAccountType.name : 'Select account type' }}
                              <!-- {{ item.account ? item.account : 'Select' }} -->
                          </span>
                          <span>
                              <i class="pi pi-angle-down offset-sm-2 ofering"></i>
                          </span>
                      </button>
                      <div class="dropdown-menu scroll w-100 " aria-labelledby="dropdownMenuButton">
                          <a class="dropdown-item" v-for="(itm, indx) in transactionalAccounts" :key="indx">
                              <div class="cursor-pointer" @click="selectAccountType(itm)"> {{itm.name}}</div> 
                          </a>
                      </div>
                    <!-- <Dropdown
                      v-model="selectedAccountType"
                      :options="transactionalAccounts"
                      optionLabel="name"
                      style="width: 100%"
                      placeholder="Select account type"
                    >
                    </Dropdown> -->
                  </div>
                </div>

                <div class="row my-3">
                  <div class="col-md-4 text-md-right">
                    Account Name <span class="text-danger">*</span>
                  </div>
                  <div class="col-md-7">
                    <input
                      type="text"
                      v-model="newAccount.name"
                      class="form-control"
                    />
                  </div>
                </div>

                <div
                  class="row my-3"
                  v-if="account.accountType == 0 || account.accountType == 1"
                >
                  <div class="col-md-4 text-md-right">Account Currency</div>
                  <div class="col-md-7" id="currencySelect">

                      <button class="  btn d-flex justify-content-between  col-12 border  " type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                          <span class="ofering">
                              &nbsp;&nbsp;&nbsp; {{ selectedCurrency.name ?  selectedCurrency.name : 'Select account currency' }}
                              <!-- {{ item.account ? item.account : 'Select' }} -->
                          </span>
                          <span>
                              <i class="pi pi-angle-down offset-sm-2 ofering"></i>
                          </span>
                      </button>
                      <div class="dropdown-menu scroll w-100 " aria-labelledby="dropdownMenuButton">
                          <a class="dropdown-item" v-for="(itm, indx) in accountCurrencies" :key="indx">
                              <div class="cursor-pointer" @click="selectCurrency(itm)"> {{itm.name}}</div> 
                          </a>
                      </div>
                    <!-- <Dropdown
                      v-model="selectedCurrency"
                      :options="accountCurrencies"
                      optionLabel="displayName"
                      placeholder="Select account currency"
                      style="width: 100%"
                      :filter="true"
                    /> -->
                  </div>
                </div>

                <!-- <div class="row my-3" v-if="account.accountType !== 4">
                  <div class="col-md-4 text-md-right">Account ID</div>
                  <div class="col-md-7">
                    <input
                      type="text"
                      v-model="newAccount.accountID"
                      class="form-control"
                    />
                  </div>
                </div> -->

                <div
                  class="row my-3"
                  v-if="account.accountType === 2 || account.accountType === 3"
                >
                  <div class="col-md-4 text-md-right">Fund</div>
                  <div class="col-md-7">
                    <button
                      class="btn d-flex justify-content-between col-12 border"
                      type="button"
                      id="dropdownMenuButton"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      <span class="ofering">
                        &nbsp;&nbsp;&nbsp;
                        {{
                          selectedFund.name
                            ? selectedFund.name
                            : "Select fund"
                        }}
                        <!-- {{ item.account ? item.account : 'Select' }} -->
                      </span>
                      <span>
                        <i class="pi pi-angle-down offset-sm-2 ofering"></i>
                      </span>
                    </button>
                    <div
                      class="dropdown-menu scroll w-100"
                      aria-labelledby="dropdownMenuButton"
                    >
                      <a
                        class="dropdown-item"
                        v-for="(itm, indx) in funds"
                        :key="indx"
                      >
                        <div class="cursor-pointer" @click="selectFunds(itm)">
                          {{ itm.name }}
                        </div>
                      </a>
                    </div>
                    <!-- <Dropdown
                      v-model="selectedFund"
                      :options="funds"
                      optionLabel="name"
                      style="width: 100%"
                    /> -->
                  </div>
                </div>

                <div class="row my-3" v-if="account.accountType !== 4">
                  <div class="col-md-4 text-md-right">Description</div>
                  <div class="col-md-7">
                    <textarea
                      v-model="newAccount.description"
                      name=""
                      id=""
                      cols="30"
                      rows="5"
                      class="form-control"
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>

            <div class="row my-4" v-if="savingAccount">
              <div class="col-md-12 text-center">
                <i class="pi pi-spin pi-spinner" style="fontsize: 3rem"></i>
              </div>
            </div>

            <div class="row my-3">
              <div class="col-md-4 text-md-right"></div>
              <div class="col-md-7">
                <p class="text-danger" v-if="invalidAccountDetails">
                  Please select account type and provide account name
                </p>
              </div>
            </div>
            <div class="row" style="border-top: 1px solid #dee2e6">
              <div class="col-md-12 d-flex justify-content-end mt-3">
                <button class="default-btn mr-3" data-dismiss="modal">
                  Cancel
                </button>
                <button
                  @click="onSave"
                  class="default-btn primary-bg border-0 text-white"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- END BT -->
  </div>
</template>

<script>
import Dropdown from "primevue/dropdown";
import { ref, watch } from "vue";
import transactionals from "../utilities/transactionals";
import chart_of_accounts from "../../../../services/financials/chart_of_accounts";
import { useToast } from "primevue/usetoast";
import { useStore } from "vuex";
import membershipService from "../../../../services/membership/membershipservice";

export default {
  props: [
    "transactionalAccounts",
    "accountTypes",
    "currencies",
    "showFundsField",
    "financialAccountType",
    "accountGroupId",
    "index",
    "account",
    "currency",
  ],
  components: { Dropdown },
  setup(props, { emit }) {
    const toast = useToast();
    const store = useStore();

    const selectedAccountType = ref({});
    const selectedCurrency = ref({});
    const selectedFund = ref({});
    const newAccount = ref({});
    const userCurrency = ref(store.getters.currentUser.currency);

    const selectFunds = (item) => {
      selectedFund.value = item;
    };
    const selectCurrency = (item) => {
      selectedCurrency.value = item;
    };

    const selectAccountType = (account) => {
      selectedAccountType.value = account;
    };

    const funds = ref([]);
    const getFunds = async () => {
      try {
        const response = await transactionals.getFunds();
        funds.value = response;
      } catch (error) {
        console.log(error);
      }
    };
    getFunds();

    const edit = async (body) => {
      try {
        savingAccount.value = true;
        const response = await chart_of_accounts.editAccount(body);
        savingAccount.value = false;
        toast.add({
          severity: "success",
          summary: "Account Updated",
          detail: `${response.response}`,
          life: 2500,
        });
        newAccount.value = {};
        emit("save-account", {
          success: true,
          type: props.financialAccountType,
        });
      } catch (error) {
        savingAccount.value = false;
        toast.add({
          severity: "error",
          summary: "Account Update Failed",
          detail: `An error occurred, please try again`,
          life: 3000,
        });
        newAccount.value = {};
        emit("save-account", {
          success: true,
          type: props.financialAccountType,
        });
        transactionals.getTransactionalAccounts(true);
        console.log(error);
      }
    };

    const savingAccount = ref(false);
    const saveAccount = async (body) => {
      try {
        let response = {};
        if (props.account && props.account.name) {
          const x = {
            name: body.name,
            code: props.account.code,
            accountType: props.account.accountType,
            description: body.description,
            id: props.account.id,
            financialAccountGroupID: selectedAccountType.value.id,
            currencyID: selectedCurrency.value.id,
          };
          response = edit(x);
        } else {
          savingAccount.value = true;
          response = await chart_of_accounts.saveAccount(body);
          savingAccount.value = false;
          if (!response.status) {
            emit("save-account", {
              success: false,
              type: props.financialAccountType,
            });
            toast.add({
              severity: "error",
              summary: "Account Creation Failed",
              detail: `An error occurred, please try again`,
              life: 3000,
            });
          } else {
            toast.add({
              severity: "success",
              summary: "Account Created",
              detail: `The account ${newAccount.value.name} was created successfully`,
              life: 2500,
            });
            newAccount.value = {};
            emit("save-account", {
              success: true,
              type: props.financialAccountType,
            });
            transactionals.getTransactionalAccounts(true);
          }
        }
      } catch (error) {
        savingAccount.value = false;
        console.log(error);
      }
    };

    const invalidAccountDetails = ref(false);
    const onSave = () => {
      invalidAccountDetails.value = false;
      if (
        !selectedAccountType.value ||
        !selectedAccountType.value.name ||
        !newAccount.value.name
      ) {
        invalidAccountDetails.value = true;
        return false;
      }

      newAccount.value.financialAccountGroupID = selectedAccountType.value.id;

      if (selectedFund.value && selectedFund.value.id) {
        newAccount.value.financialFundID = selectedFund.value.id;
      }
      saveAccount(newAccount.value);
    };

    watch(() => {
      if (props.accountGroupId) {
        selectedAccountType.value = props.transactionalAccounts[
          props.index
        ].find((i) => i.name === props.accountGroupId);
      }
      if (props.account) {
        newAccount.value.name = props.account ? props.account.name : "";
        newAccount.value.description = props.account
          ? props.account.description
          : "";
      }
    });

    const accountCurrencies = ref([]);
    const getCurrencies = async () => {
      try {
        const response = await transactionals.getCurrencies();
        accountCurrencies.value = response;
        if (!userCurrency.value) {
          membershipService
            .getSignedInUser()
            .then((res) => {
              selectedCurrency.value = accountCurrencies.value.find(
                (i) => i.name === res.currency
              );
            })
            .catch((err) => console.log(err));
        } else {
          selectedCurrency.value = accountCurrencies.value.find((i) => {
            return i.name.includes(userCurrency.value);
          });
        }
      } catch (error) {
        console.log(error);
      }
    };
    getCurrencies();

    return {
      selectFunds,
      selectCurrency,
      selectAccountType,
      selectedAccountType,
      funds,
      newAccount,
      selectedCurrency,
      selectedFund,
      onSave,
      invalidAccountDetails,
      savingAccount,
      accountCurrencies,
    };
  },
};
</script>

<style scoped>
.p-dropdown-items {
  width: 100px !important;
}

.scroll {
  max-height: 200px;
  overflow-y: scroll;
  overflow-x: hidden;
}
</style>