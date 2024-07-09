<template>
  <div
    class="container-top"
    :class="{ 'container-wide': lgAndUp || xlAndUp }"
    @click="hideModals"
  >
    <div class="main-co">
      <div class="top container-fluid px-0">
        <div class="header">
          <div class="text-head h2 font-weight-bold py-0 my-0 text-black">
            Transaction
          </div>
        </div>
        <div class="row mt-2 header-btns justify-content-center">
          <!-- <div class="actions"> -->
          <div
            class="col-12 col-sm-4 mt-2 mt-sm-0 mt-md-0 mt-lg-0 mx-auto mx-sm-0 mx-md-0"
          >
            <el-button
              class="income-btn header-btn align-items-center justify-content-center d-flex w-100 border-0"
              round
              size="large"
              @click="toggleTransac(1)"
            >
              Add Income
            </el-button>
          </div>

          <div
            class="col-12 col-sm-4 mt-2 mt-sm-0 mt-md-0 mt-lg-0 mx-auto mx-sm-0 mx-md-0"
          >
            <el-button
              class="expense-btn header-btn align-items-center justify-content-center d-flex w-100 border-0"
              size="large"
              round
              @click="toggleTransac(2)"
            >
              Add Expense
            </el-button>
          </div>
          <div
            class="col-12 col-sm-4 mt-2 mt-sm-0 mt-md-0 mt-lg-0 mx-auto mx-sm-0 mx-md-0"
          >
            <el-dropdown
              size="large"
              class="show more-btn align-items-center justify-content-center w-100 d-flex default-btn"
            >
              <span class="el-dropdown-link w-100 text-center h font-weight-bold my-1">
                More
                <el-icon class="el-icon--right">
                  <arrow-down />
                </el-icon>
              </span>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item @click="toggleTransac(4)"
                    >Money Transfer</el-dropdown-item
                  >
                  <el-dropdown-item @click="toggleTransac(3)"
                    >General ledger</el-dropdown-item
                  >
                </el-dropdown-menu>
              </template>
            </el-dropdown>
            <!-- <a
              class="dropdown show more-btn align-items-center justify-content-center w-100 d-flex default-btn border-0 text-decoration-none">
              <a class="dropdown-toggle text-decoration-none text-dark" href="#" role="button" id="dropdownMenuLink"
                data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                More
              </a>

              <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                <a class="dropdown-item c-pointer">Money Transfer</a>

              </div>
              <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">

                <a class="dropdown-item c-pointer" @click="toggleTransac(3)">General Ledger</a>
              </div>
            </a> -->
          </div>
        </div>
      </div>

      <div class="container-fluid px-0">
        <div class="col-12 col-sm-8 col-lg-6 px-0 mt-5">
          <el-dropdown trigger="click" class="w-100 font-weight-600">
            <span class="el-dropdown-link w-100">
              <div
                class="d-flex justify-content-between px-3 font-weight-600 border-contribution w-100"
                size="large"
              >
                <div class="w-100 d-flex justify-content-between">
                  <span class="">{{ selectedTransaction.type }}</span>
                  <span class="">{{ selectedTransaction.amount }}</span>
                </div>
                <div class="">
                  <el-icon class="el-icon--right">
                    <arrow-down />
                  </el-icon>
                </div>
              </div>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item
                  v-for="(cash, index) in accountsAndBalancesList"
                  :key="index"
                  @click="selectAnAccount(cash, index)"
                  class="d-flex justify-content-between font-weight-600"
                >
                  <div class="close-modal w-100">{{ cash.text }}</div>
                  <div>&nbsp;&nbsp;</div>
                  <div class="close-modal">
                    {{
                      cash.currency && cash.currency.symbol
                        ? cash.currency.symbol
                        : currentUser.currencySymbol
                    }}{{ cash.balance }}
                  </div>
                </el-dropdown-item>
                <el-dropdown-item class="text-center" divided>
                  <!-- <a
                            class="font-weight-bold small-text d-flex justify-content-center p-3 text-decoration-none primary-text"
                          >
                            <el-icon size="large"><Files /></el-icon>
                            Upload Bank Statement
                          </a> -->
                  <a
                    class="font-weight-600 small-text d-flex justify-content-center p-3 text-decoration-none primary-text"
                    @click="openModal"
                  >
                    <el-icon size="large">
                      <CirclePlus />
                    </el-icon>
                    Add a new account
                  </a>
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>

        <!-- <h5>Modal</h5> -->
        <el-dialog
          v-model="displayModal"
          :width="mdAndUp || lgAndUp || xlAndUp ? `50%` : `90%`"
        >
          <div class="row mt-2">
            <div class="col-sm-3 align-self-center text-right p-0">
              Account Type <span class="text-danger">*</span>
            </div>
            <div class="col-md-7">
              <el-dropdown trigger="click" class="w-100 mt-2">
                <span class="el-dropdown-link w-100">
                  <div
                    class="d-flex justify-content-between border-contribution w-100"
                    size="large"
                  >
                    <div>
                      {{
                        !selectedAccountType || !selectedAccountType.name
                          ? "Select account type"
                          : selectedAccountType.name
                      }}
                    </div>
                    <div>
                      <el-icon class="el-icon--right">
                        <arrow-down />
                      </el-icon>
                    </div>
                  </div>
                </span>
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item
                      v-for="(accounts, index) in transactionalAccounts"
                      :key="index"
                    >
                      <div class="col-md-12 px-2">
                        <div
                          v-if="accounts.length > 0"
                          class="py-2 font-weight-700 border-bottom"
                        >
                          {{ accountTypes[index] }}
                        </div>
                        <div
                          v-for="(account, indx) in accounts"
                          :key="indx"
                          @click="selectAccountType(account)"
                          class="c-pointer py-2"
                        >
                          {{ account.name }}
                        </div>
                      </div>
                    </el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
            </div>
          </div>
          <div class="row mt-2">
            <div class="col-sm-3 align-self-center text-right p-0">
              Account Name <span class="text-danger">*</span>
            </div>
            <div class="col-sm-7">
              <el-input type="text" v-model="newAccount.name" class="w-100" />
            </div>
          </div>
          <div class="row mt-2">
            <div class="col-sm-3 align-self-center text-right p-0">Account Currency</div>
            <div class="col-md-7" id="currencySelect">
              <el-select
                v-model="selectedCurrencyID"
                placeholder="Select"
                class="w-100"
                @change="setSelectedCurrency"
                filterable
              >
                <el-option
                  v-for="item in filterCurrency"
                  :label="`${item.name} - ${item.country}`"
                  :value="item.currencyId"
                  :key="item.currencyId"
                />
              </el-select>
            </div>
          </div>
          <!-- <div class="row mt-2">
            <div class="col-sm-3 align-self-center text-right p-0">
              Account ID
            </div>
            <div class="col-sm-7">
              <el-input type="text" class="w-100" />
            </div>
          </div> -->
          <div class="row mt-2">
            <div class="col-sm-3 align-self-center text-right p-0">Description</div>
            <div class="col-sm-7">
              <el-input v-model="newAccount.description" :rows="4" type="textarea" />
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
          <template #footer>
            <el-button
              color="#EBEFF4"
              round
              size="large"
              class="secondary-btn px-4"
              @click="closeModal"
            >
              Close
            </el-button>
            <el-button
              round
              size="large"
              :color="primarycolor"
              :loading="loading"
              class="px-4 mr-0 text-white"
              @click="saveNewAccount"
            >
              Save
            </el-button>
          </template>
        </el-dialog>
        <el-skeleton class="w-100" animated v-if="tableLoading">
          <template #template>
            <div
              style="
                display: flex;
                align-items: center;
                justify-content: space-between;
                margin-top: 20px;
              "
            >
              <el-skeleton-item variant="text" style="width: 240px; height: 240px" />
              <el-skeleton-item variant="text" style="width: 240px; height: 240px" />
            </div>
            <!-- <el-skeleton-item variant="text" class="w-100" style="height: 25px" :rows="10"/> -->
            <el-skeleton class="w-100 mt-5" style="height: 25px" :rows="20" animated />
          </template>
        </el-skeleton>
        <TransactionTable
          v-else
          :showEditTransaction="showEditTransaction"
          :transactionDetails="transacPropsValue"
          :selectedTransactionType="selectedTransactionType"
          :journalEntry="journalEntry"
          @toggle-edit-form="closeIt"
          @select-row="selectRow"
          @tableloading="setTableLoading"
          @select-journal="selectJournalEntry"
          @reload-accounts="reloadAccounts"
        />
        <!-- <LedgerForm /> -->
      </div>
    </div>
  </div>
</template>
<script>
import { ref, computed, watchEffect, inject } from "vue";
import axios from "@/gateway/backendapi";
import transactionService from "../../../services/financials/transaction_service";
import TransactionTable from "../../../components/transactions/TransactionsTable";
import transaction_service from "../../../services/financials/transaction_service";
import chart_of_accounts from "../../../services/financials/chart_of_accounts";
import numbers_formatter from "../../../services/numbers/numbers_formatter";
import deviceBreakpoint from "../../../mixins/deviceBreakpoint";
import { ElMessage } from "element-plus";
// import LedgerForm from "../transaction/components/LedgerForm";
import { useStore } from "vuex";
import userService from "../../../services/user/userservice";
import currencyConverter from "../../../services/currency-converter/currencyConverter";

export default {
  components: {
    TransactionTable,
    // LedgerForm,
  },
  setup() {
    const transactions = ref([]);
    const selectedAccountType = ref({});
    const selectedCurrency = ref({});
    const selectedCurrencyID = ref(null);
    // const childElement = ref('')
    const loading = ref(false);
    const { mdAndUp, lgAndUp, xlAndUp, xsOnly } = deviceBreakpoint();
    const cashAndBank = ref([
      {
        name: {
          type: "akin",
          amount: "N2.00",
        },
      },
      {
        name: {
          type: "dapo",
          amount: "N5.00",
        },
      },
      {
        name: {
          type: "emma",
          amount: "N3.00",
        },
      },
    ]);

    const store = useStore();
    const currentUser = ref(store.getters.currentUser);

    const tableLoading = ref(false);

    const setTableLoading = (payload) => {
      tableLoading.value = payload;
    };

    const selectAccountType = (account) => {
      selectedAccountType.value = account;
    };

    const setSelectedCurrency = () => {
      selectedCurrency.value = currencyList.value.find(
        (i) => i.currencyId == selectedCurrencyID.value
      );
      console.log(selectedCurrency.value, "kkkk");
    };

    const getCurrentUser = async () => {
      try {
        const response = await userService.getCurrentUser();
        currentUser.value = response;
      } catch (error) {
        console.log(error);
      }
    };
    if (!currentUser.value || !currentUser.value.tenantId) getCurrentUser();

    const rates = ref({});
    const getConversionRates = async () => {
      try {
        const response = await currencyConverter.getConversionData();
        rates.value = response;
      } catch (error) {
        console.log(error);
      }
    };
    getConversionRates();

    const creditCard = ref([
      { name: { type: "tobi", amount: "N2.10" } },
      { name: { type: "afe", amount: "N5.21" } },
      { name: { type: "tosin", amount: "3.42" } },
    ]);
    const accountType = ref(["Cash and Bank", "Money in Transit"]);
    const liabilities = ref(["Credit Card", "Loan and Line of Credit"]);

    const filterFormIsVissible = ref(false);
    const searchIsVisible = ref(false);
    const accountDisplay = ref(false);
    const selectedTransaction = ref({
      type: "All accounts",
      amount: "N0.00",
    });
    const displayModal = ref(false);
    const showAccount = ref(false);
    const newAccount = ref({});
    const invalidAccountDetails = ref(false);
    const currencyList = ref([]);
    const showCurrency = ref(false);
    const selectAccount = ref("");
    const currencyText = ref("");
    const accountText = ref("");
    const showEditTransaction = ref(false);
    const transacPropsValue = ref({});
    const primarycolor = inject("primarycolor");

    const toggleFilterFormVissibility = () =>
      (filterFormIsVissible.value = !filterFormIsVissible.value);

    const toggleSearch = () => {
      searchIsVisible.value = !searchIsVisible.value;
    };

    const toggleAccount = () => {
      accountDisplay.value = !accountDisplay.value;
    };

    const hideModals = (e) => {
      if (!e.target.classList.contains("close-modal")) {
        accountDisplay.value = false;
        showAccount.value = false;
        showCurrency.value = false;
        // selectAccount.value.classList.remove("style-account")
      }
    };

    const transactionItem = (item) => {
      selectedTransaction.value = {
        type: item.text,
        amount: item.fund,
      };
      // selectedTransaction.value = {
      //   type: e.target.children[0].innerHTML,
      //   amount: e.target.children[0].nextElementSibling.innerHTML,
      // };
      accountDisplay.value = false;
    };

    const openModal = () => {
      displayModal.value = true;
    };

    const closeModal = () => {
      displayModal.value = false;
    };

    const getCurrenciesFromCountries = () => {
      let url = "/api/getallcountries";
      axios
        .get(url)
        .then((res) => {
          currencyList.value = res.data.map((i) => {
            //   return `${i.currency} ${i.name}`
            return {
              name: i.currency,
              id: i.id,
              country: i.name,
              currencyId: i.currencyId,
            };
          });
        })
        .catch((err) => console.log(err));
    };
    getCurrenciesFromCountries();

    const filterCurrency = computed(() => {
      if (currencyText.value !== "" && currencyList.value.length > 0) {
        return currencyList.value.filter((i) => {
          if (i.name)
            return (
              i.name.toLowerCase().includes(currencyText.value.toLowerCase()) ||
              i.country.toLowerCase().includes(currencyText.value.toLowerCase())
            );
        });
      } else {
        return currencyList.value;
      }
    });

    const filterAccount = computed(() => {
      if (accountText.value !== "" && accountType.value.length > 0) {
        return accountType.value.filter((i) => {
          if (i) return i.toLowerCase().includes(accountText.value.toLowerCase());
        });
      } else {
        return accountType.value;
      }
    });

    const filterLiabilities = computed(() => {
      if (accountText.value !== "" && liabilities.value.length > 0) {
        return liabilities.value.filter((i) => {
          if (i) return i.toLowerCase().includes(accountText.value.toLowerCase());
        });
      } else {
        return liabilities.value;
      }
    });

    const toggleTransac = (e) => {
      if (e === 1) {
        transacPropsValue.value = {
          type: "Add Donor",
          account: "Income Account",
        };
      } else if (e === 2) {
        transacPropsValue.value = {
          type: "",
          // type: "Add Vendor",
          account: "Expense Account",
        };
      } else if (e === 4) {
        transacPropsValue.value = {
          type: "",
          type: "Transfer",
          account: "Destination Account",
        };
        journalEntry.value = {};
      } else {
        transacPropsValue.value = {
          type: "ledger",
          account: "Journal",
        };
        journalEntry.value = {};
      }
      showEditTransaction.value = true;
    };

    const closeIt = (payload) => {
      showEditTransaction.value = payload;
    };

    const transacObj = (payload) => {
      transactions.value.push(payload);
    };

    const transactionalAccounts = ref([]);
    const accountTypes = ["assets", "liability", "income", "expense", "equity"];

    const getTransactionalAccounts = async () => {
      loading.value = true;
      try {
        const res = await transaction_service.getAccountHeads();
        let data = [];
        for (let group of res) {
          data.push(group.accountHeadsDTO);
        }
        transactionalAccounts.value = data;

        // const response = await transactionService.getTransactionalAccounts();
        // console.log(response, 'iiuiu');
        // for (let group of accountTypes) {
        //   const groupItems = response.filter(
        //     (i) => i.accountType.toLowerCase() === group
        //   );
        //   transactionalAccounts.value.push(groupItems);
        // }
        // console.log(transactionalAccounts.value, 'jjj');
        loading.value = false;
      } catch (error) {
        console.log(error);
        loading.value = false;
      }
    };

    getTransactionalAccounts();

    const cashAndBankItems = ref([]);
    const getCashAndBanks = async () => {
      loading.value = true;
      try {
        const response = await transactionService.getCashAndBank();
        cashAndBankItems.value = response;
        loading.value = false;
      } catch (error) {
        console.log(error);
      }
    };
    getCashAndBanks();

    const selectedTransactionType = ref(-1);
    const selectAnAccount = (account, index) => {
      selectedTransaction.value = {
        type: account.text,
        amount: account.currency
          ? `${account.currency.symbol}${amountWithCommas(account.balance)}`
          : `${amountWithCommas(account.balance)}`,
      };
      accountDisplay.value = false;
      console.log(index, account);
      selectedTransactionType.value = account.id ? account.id : "";
    };

    const saveNewAccount = async () => {
      loading.value = true;
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
      newAccount.value.financialFundID = "";
      if (selectedCurrency.value && selectedCurrency.value.currencyId) {
        newAccount.value.currencyID = selectedCurrency.value.currencyId;
      }

      // if (selectedFund.value && selectedFund.value.id) {
      // newAccount.value.financialFundID =
      //   selectedFund.value && selectedFund.value.id
      //     ? selectedFund.value.id
      //     : "";
      // }
      try {
        const data = await chart_of_accounts.saveAccount(newAccount.value);
        if (data && data.status) {
          ElMessage({
            type: "success",
            message: `${data.response}`,
            duration: 3000,
          });
          getTransactionalAccounts();
        } else {
          ElMessage({
            type: "error",
            message: "Account Creation Failed",
            duration: 3000,
          });
        }

        loading.value = false;
        displayModal.value = false;
      } catch (error) {
        loading.value = false;
        console.log(error);
      }
    };

    const selectRow = (rowData) => {
      showEditTransaction.value = true;
      transacPropsValue.value = rowData;
    };

    const journalEntry = ref({});
    const selectJournalEntry = (rowData) => {
      console.log(rowData, "jeetretr");
      journalEntry.value = rowData;
      showEditTransaction.value = true;
      transacPropsValue.value = {
        type: "ledger",
        account: "Journal",
      };
    };

    const accountsAndBalances = ref([]);
    const getAccountBalances = async () => {
      // loading.value = true;
      try {
        const response = await transaction_service.getCashAndBankAccountBalances();
        accountsAndBalances.value = response;
        accountsAndBalances.value.unshift({
          text: "All Accounts",
          balance: totalAccountBalances.value,
        });
        let index = response.findIndex((i) => i.text === "All Accounts");

        if (index >= 0) {
          selectedTransaction.value.amount = `${
            currentUser.value && currentUser.value.currencySymbol
              ? currentUser.value.currencySymbol
              : ""
          }${
            accountsAndBalances.value[index] && accountsAndBalances.value[index].balance
              ? amountWithCommas(accountsAndBalances.value[index].balance)
              : 0
          }`;
          accountsAndBalances.value[index].currency = {
            symbol: currentUser.value ? currentUser.value.currencySymbol : "",
          };
        }
        loading.value = false;
        // if (!currentUser.value || !currentUser.value.tenantId) await getCurrentUser();
      } catch (error) {
        console.log(error);
        loading.value = false;
      }
    };
    getAccountBalances();

    const accountsAndBalancesList = computed(() => {
      if (!accountsAndBalances.value || accountsAndBalances.value.length === 0) return [];
      return accountsAndBalances.value.map((i) => {
        i.balance = amountWithCommas(i.balance);
        return i;
      });
    });

    const totalAccountBalances = computed(() => {
      if (!accountsAndBalances.value || accountsAndBalances.value.length === 0) return 0;
      let sum = 0;
      for (let account of accountsAndBalances.value) {
        sum += convertAmountToTenantCurrency(account);
      }
      return Number.parseFloat(sum).toFixed(2);
    });

    const convertAmountToTenantCurrency = (account) => {
      if (!account.currency.shortCode) return 0;
      if (
        currentUser.value &&
        currentUser.value.currency &&
        currentUser.value.currency.toLowerCase() ===
          account.currency.shortCode.toLowerCase()
      )
        return account.balance;

      const amountInDollars =
        account.currency.shortCode !== "USD"
          ? rates.value[`usd${account.currency.shortCode.toLowerCase()}`] *
            account.balance
          : account.balance;
      const tenantAmount =
        rates.value[
          `usd${
            currentUser.value && currentUser.value.currency
              ? currentUser.value.currency.toLowerCase()
              : ""
          }`
        ] * amountInDollars;
      return tenantAmount;
    };

    const amountWithCommas = (amount) => numbers_formatter.amountWithCommas(amount);
    const reloadAccounts = () => {
      getAccountBalances();
    };

    // watchEffect(() => {
    //   let childElementValue = childElement.value
    //   transaction_service.widenDropDownMenu(childElementValue)
    // })

    return {
      transactions,
      invalidAccountDetails,
      setSelectedCurrency,
      selectedCurrencyID,
      selectedCurrency,
      selectAccountType,
      selectedAccountType,
      loading,
      setTableLoading,
      tableLoading,
      filterFormIsVissible,
      toggleFilterFormVissibility,
      toggleSearch,
      searchIsVisible,
      cashAndBank,
      creditCard,
      accountDisplay,
      toggleAccount,
      hideModals,
      selectedTransaction,
      transactionItem,
      displayModal,
      openModal,
      closeModal,
      showAccount,
      accountType,
      liabilities,
      getCurrenciesFromCountries,
      currencyList,
      showCurrency,
      selectAccount,
      filterCurrency,
      currencyText,
      accountText,
      primarycolor,
      filterAccount,
      filterLiabilities,
      showEditTransaction,
      toggleTransac,
      closeIt,
      transacObj,
      transacPropsValue,
      mdAndUp,
      xlAndUp,
      xsOnly,
      lgAndUp,
      transactionalAccounts,
      accountTypes,
      cashAndBankItems,
      selectAnAccount,
      selectedTransactionType,
      newAccount,
      saveNewAccount,
      selectRow,
      accountsAndBalances,
      totalAccountBalances,
      amountWithCommas,
      currentUser,
      accountsAndBalancesList,
      reloadAccounts,
      selectJournalEntry,
      journalEntry,
    };
  },
};
</script>

<style scoped>
* {
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

.whole-con {
  display: flex;
}

.main-con {
  width: 100%;
}

.main-body {
  height: 100%;
}

.top {
  display: flex;
  justify-content: space-between;
}

.button {
  padding: 8px 10px;
  border: none;
  border-radius: 22px;
  width: 180px;
  font-size: 16px;
  font-weight: 600;
  margin: 0 8px;
  outline: none;
  text-decoration: none;
  box-sizing: border-box;
}

.button:hover {
  cursor: pointer;
}

.more-btn {
  /* background: #dde2e6; */
  border: 1px solid #c3d4e9 !important;
  /* overflow: hidden; */
  color: #136acd;
}
.expense-btn {
  background: #00b6cf;
  color: white;
  /* overflow: hidden; */
}
.income-btn {
  background: #136acd;
  color: white;
  /* overflow: hidden; */
}

.more-btn:first-child,
.more-btn:nth-child(2) {
  margin-right: 20px;
}
.expense-btn:first-child,
.expense-btn:nth-child(2) {
  margin-right: 20px;
}
.income-btn:first-child,
.income-btn:nth-child(2) {
  margin-right: 20px;
}

.btn-icon {
  padding: 0 8px;
}

.hr {
  border: 0.8px solid #0020440a;
  margin: 0 4px;
}

.table {
  width: 100% !important;
  margin: 0;
}

.table-top {
  position: absolute;
  z-index: 1;
  top: -40px;
  font-weight: 500 !important;
  font-size: 14px;
  background: #fff;
  color: #000000;
}

.tab-options {
  position: relative;
}

.table-top label:hover,
.table-top p:hover {
  cursor: pointer;
}

.select-all input {
  margin: 0 8px 0 -5px !important;
}

.label-search {
  width: 0;
  background: transparent;
  padding: 4px;
  overflow: hidden;
  transition: all 0.5 ease-in-out;
}

.label-search input {
  border: transparent;
  background: transparent;
  width: 70%;
  outline: none;
}

.label-search .search-btn {
  display: flex;
  align-items: center;
  background: #7894a6;
  padding: 4px;
  border-radius: 5px;
}

.label-search .empty-btn {
  display: flex;
  align-items: center;
  padding: 0 5px;
}

.show-search {
  width: 174px;
  overflow: hidden;
  transition: all 0.5 ease-in-out;
  border: 1px solid #dde2e6;
  border-radius: 5px 0px 0px 5px;
  background: #ebeff4;
  transition: all 0.5s ease-in-out;
}

.filter-options {
  height: 0;
  overflow: hidden;
  transition: all 0.5s ease-in-out;
}

.filter-options-shown {
  height: 120px !important;
  overflow: hidden;
  transition: all 0.5s ease-in-out;
}

@media screen and (max-width: 768px) {
  .filter-options-shown {
    height: 150px !important;
    overflow: hidden;
    transition: all 0.5s ease-in-out;
  }
}

.parent-desc {
  display: grid;
  grid-template-columns: 0.5fr 2fr 3fr 1fr 2fr 1fr;
  align-items: center;
}

.desc-head {
  font-weight: 700;
}

.desc {
  color: #9b9a9c;
  /* opacity: 0.7; */
}

.parent-desc.first {
  color: #8898aa;
  font-size: 14px;
  font-weight: 600;
  box-shadow: 0px 3px 6px #2c28281c;
  background: #dde2e6 0% 0% no-repeat padding-box;
}

.manual-dd-item {
  color: #495057;
}

.manual-dd-item:hover {
  background: #ecf0f3;
  cursor: pointer;
}

.style-category {
  box-shadow: 0px 3px 15px #797e8159;
  position: absolute;
  background: white;
  z-index: 1;
  width: 95%;
  max-height: 20em;
  overflow-y: scroll;
  overflow-x: hidden;
}

.create-event a {
  color: #136acd !important;
  text-decoration: none;
}

.create-new-event {
  text-align: center;
  letter-spacing: 0px;
  color: #136acd;
  padding: 15px;
}

.create-event a:hover {
  cursor: pointer;
}

.header-border {
  border-bottom: 1px solid #ebebeb;
}

.create-event {
  /* border: 2px solid red; */
  border-top: 1px solid #d4d4d4;
}

.create-event a:first-child {
  border-right: 1px solid #d4d4d4;
}

.transaction-button {
  font-size: 1.3em;
  display: flex;
  justify-content: space-around;
}

.arrow-icon {
  position: relative;
  right: 25px;
  top: 10px;
  /* margin-top: -31px; */
  font-size: 21px;
}

.select-elem-con {
  padding: 5px 10px;
  border: 1px solid #ced4da;
  border-radius: 4px;
  justify-content: space-between;
}

.style-account {
  box-shadow: 0px 3px 15px #797e8159;
  position: absolute;
  background: white;
  z-index: 1;
  width: 92%;
  max-height: 14em;
  overflow-y: scroll;
}

.style-account div div:hover {
  /* background-color: #ecf0f3; */
  cursor: pointer;
}

.table.edit-transac {
  background: #dde2e6bb;
  margin-left: 15px;
  width: 50%;
}

.slide-form {
  width: 50%;
  transition: all 0.6s cubic-bezier(0.445, 0.05, 0.55, 0.95);
  overflow: auto;
  transform: translateX(0);
  opacity: 1;
}

.hide-form {
  width: 50%;
  position: absolute;
  transform: translateX(-100%);
  opacity: 0;
}

.parent-table {
  display: flex;
}

@media (max-width: 1100px) {
  .parent-table {
    flex-direction: column;
  }
}

@media (max-width: 840px) {
  .top {
    flex-direction: column;
  }

  .actions {
    margin-top: 10px;
  }
}

@media (max-width: 600px) {
  .actions {
    display: flex;
  }
}

.row {
  margin-right: 0 !important;
  margin-left: 0 !important;
}

@media (min-width: 768px) and (max-width: 840px) {
  .header-btns {
    margin-top: 10px;
  }
}
</style>
