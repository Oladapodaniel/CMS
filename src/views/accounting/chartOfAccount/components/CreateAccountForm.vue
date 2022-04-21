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
                    <div class="dropdown">
                      <button
                        class="btn btn-white w-100 border text-left"
                        type="button"
                        id="dropdownMenuButton"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                      >
                        <!-- :disabled="accountGroupId" -->
                        {{
                          !selectedAccountType || !selectedAccountType.name
                            ? "Select account type"
                            : selectedAccountType.name
                        }}
                      </button>
                      <div
                        class="dropdown-menu w-100"
                        style="max-height: 300px; overflow: auto"
                        aria-labelledby="dropdownMenuButton"
                      >
                        <div class="container">
                          <div
                            class="row"
                            v-for="(accounts, index) in transactionalAccounts"
                            :key="index"
                          >
                            <div class="col-md-12 px-2">
                              <h6
                                class="mb-0 text-capitalize font-weight-bold"
                                v-if="accounts.length > 0"
                              >
                                {{ accountTypes[index] }}
                              </h6>
                            </div>
                            <div class="col-md-12">
                              <a
                                class="dropdown-item px-1 px-14"
                                href="#"
                                v-for="(account, indx) in accounts"
                                :key="indx"
                                @click="selectAccountType(account)"
                                >{{ account.name }}</a
                              >
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <!-- <Dropdown :options="cities" optionLabel="label" optionGroupLabel="label" optionGroupChildren="items">
                  <template #optiongroup="slotProps">
                      <div class="p-d-flex p-ai-center country-item">
                          <div>{{slotProps.option.label}}</div>
                      </div>
                  </template>
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

                <div class="row my-3" v-if="currency">
                  <div class="col-md-4 text-md-right">Account Currency</div>
                  <div class="col-md-7" id="currencySelect">
                    <!-- <Dropdown
                      v-model="selectedCurrency"
                      :options="accountCurrencies"
                      optionLabel="displayName"
                      placeholder="Select account currency"
                      style="width: 100%"
                      :filter="true"
                    /> -->
                    <div class="dropdown show">
                      <a class="btn border w-100 d-flex justify-content-between align-items-center" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style="min-height: 37px;">
                        <span>{{ selectedCurrency && Object.keys(selectedCurrency).length > 0 ? selectedCurrency.displayName : 'Select account currency' }}</span>
                        <i class="pi pi-chevron-down"></i>
                      </a>
                      <div class="dropdown-menu w-100" aria-labelledby="dropdownMenuLink">
                        <a class="dropdown-item c-pointer" v-for="(item, index) in accountCurrencies" :key="index">
                          <div @click="setCurrencyValue(item)">{{ item.displayName }}</div>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- <div class="row my-3">
                  <div class="col-md-4 text-md-right">Account ID</div>
                  <div class="col-md-7">
                    <input
                      type="text"
                      v-model="newAccount.accountID"
                      class="form-control"
                    />
                  </div>
                </div> -->
                

                <div class="row my-3" v-if="showFundsField">
                  <div class="col-md-4 text-md-right">Fund</div>
                  <div class="col-md-7">
                    <!-- <Dropdown
                      v-model="selectedFund"
                      :options="funds"
                      optionLabel="name"
                      style="width: 100%"
                    /> -->
                    <div class="dropdown show">
                      <a class="btn border w-100 d-flex justify-content-between align-items-center" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style="min-height: 37px;">
                        <span>{{ selectedFund && Object.keys(selectedFund).length > 0 ? selectedFund.name : '' }}</span>
                        <i class="pi pi-chevron-down"></i>
                      </a>
                      <div class="dropdown-menu w-100" aria-labelledby="dropdownMenuLink">
                        <a class="dropdown-item c-pointer" v-for="(item, index) in funds" :key="index">
                          <div @click="setFundValue(item)">{{ item.name }}</div>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="row my-3">
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
                <i class="pi pi-spin pi-spinner" style="fontSize: 3rem"></i>
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
import { computed, ref, watch } from "vue";
import transactionals from "../utilities/transactionals";
import chart_of_accounts from "../../../../services/financials/chart_of_accounts";
import { useToast } from "primevue/usetoast";
import membershipService from '../../../../services/membership/membershipservice';
import { useStore } from "vuex"

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
    const userCurrency = ref(store.getters.currentUser ? store.getters.currentUser.currency : '');

    const selectAccountType = (account) => {
      selectedAccountType.value = account;
      console.log(selectedAccountType.value, "selected");
    };

    const filteredCurrencies = computed(() => {
      if (!props.currencies) return [];
      return props.currencies.map((i) => {
        return { name: `${i.name} - ${i.country}`, id: i.id };
      });
    });

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
        const response = await chart_of_accounts.editAccount(body)
        savingAccount.value = false;
        toast.add({severity:'success', summary:'Account Updated', detail:`${response.response}`, life: 2500});
        newAccount.value = { };
        emit("save-account", { success: true, type: props.financialAccountType });
      } catch (error) {
        savingAccount.value = false;
        toast.add({severity:'error', summary:'Account Update Failed', detail:`An error occurred, please try again`, life: 3000});
        newAccount.value = { };
        emit("save-account", { success: true, type: props.financialAccountType });
        transactionals.getTransactionalAccounts(true);
        console.log(error);
      }
    }

    const savingAccount = ref(false);
    const saveAccount = async (body) => {
      try {
        savingAccount.value = true;
        let response = { };
        if (props.account && props.account.name) {
          const x = {
            name: body.name,
            code: props.account.code,
            accountType: props.account.accountType,
            description: body.description,
            id: props.account.id,
            financialAccountGroupID: selectedAccountType.value.id
            // financialFundID: body.financialFundID
           }
          response = edit(x);
        } else {
          response = await chart_of_accounts.saveAccount(body);
          savingAccount.value = false;
          if (!response.status) {
              emit("save-account", { success: false, type: props.financialAccountType });
              toast.add({severity:'error', summary:'Account Creation Failed', detail:`An error occurred, please try again`, life: 3000});
          } else {
              toast.add({severity:'success', summary:'Account Created', detail:`The account ${newAccount.value.name} was created successfully`, life: 2500});
              newAccount.value = { };
              savingAccount.value = false;
              emit("save-account", { success: true, type: props.financialAccountType });
              transactionals.getTransactionalAccounts(true);
              selectedFund.value = { }
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
      if (selectedCurrency.value && selectedCurrency.value.id) {
        newAccount.value.currencyID =  selectedCurrency.value.id;
      }

      // if (selectedFund.value && selectedFund.value.id) {
        newAccount.value.financialFundID = selectedFund.value && selectedFund.value.id ? selectedFund.value.id : "";
      // }
      saveAccount(newAccount.value);
    };

    const initializeCurrency = () => {
      if (!userCurrency.value) {
        membershipService.getSignedInUser()
          .then(res => {
            selectedCurrency.value = accountCurrencies.value.find(i => i.name === res.currency);
          })
          .catch(err => console.log(err));
      } else {
        selectedCurrency.value = accountCurrencies.value.find(i => {
          return i.name.includes(userCurrency.value);
        })
      }
    }

    const updateSelectedCurrency = () => {
      selectedCurrency.value = accountCurrencies.value.find(i => i.id === props.account.id);
      
    }

    const accountCurrencies = ref([]);
    const getCurrencies = async () => {
      try {
        const response = await transactionals.getCurrencies();
        accountCurrencies.value = response;
        if (!props.account || !props.account.name ) {
          initializeCurrency()
        } else {
          updateSelectedCurrency();
        }
      } catch (error) {
        console.log(error);
      }
    }
    getCurrencies();

    watch(() => {
      if (props.accountGroupId && props.transactionalAccounts && props.index) {
        selectedAccountType.value = props.transactionalAccounts[props.index].find(i => i.name === props.accountGroupId)
      }
      if (props.account) {
        newAccount.value.name = props.account ? props.account.name : "";
        newAccount.value.description = props.account ? props.account.description : "";
        selectedFund.value = funds.value.find(i => i.id === props.account.financialFundID);
      }
    })

    const setFundValue = (item) => {
      selectedFund.value = item
    }
    
    const setCurrencyValue = (item) => {
      selectedCurrency.value = item
    }

    

    return {
      selectAccountType,
      selectedAccountType,
      filteredCurrencies,
      funds,
      newAccount,
      selectedCurrency,
      selectedFund,
      onSave,
      invalidAccountDetails,
      savingAccount,
      accountCurrencies,
      setFundValue,
      setCurrencyValue
    };
  },
};
</script>

<style scoped>
.p-dropdown-items {
  width: 100px !important;
}

.dropdown-menu {
    max-height: 400px;
    overflow: scroll;
}
</style>