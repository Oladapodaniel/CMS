<template>
  <div class="whole-co container-wid container-top" @click="hideModals">
    <div class="main-co">
      <div class="main-bod" v-if="!loading">
        <div class="top container-wide mt-3">
           <div class="header ">
                <div class="events">Transaction</div>
              </div>
          <div class="row mt-2 header-btns justify-content-center">
            <!-- <div class="actions"> -->
              <div class="col-8 col-sm-4  mt-2 mt-sm-0 mt-md-0 mt-lg-0  mx-auto mx-sm-0 mx-md-0">
                 <button
                    class="more-btn align-items-center justify-content-center d-flex w-100 default-btn border-0"
                    @click="toggleTransac(1)"
                  >
                    Add Income
                  </button>
              </div>

              <div class="col-8 col-sm-4  mt-2 mt-sm-0 mt-md-0 mt-lg-0 mx-auto mx-sm-0 mx-md-0">
                <button
                  class="more-btn align-items-center justify-content-center d-flex w-100 default-btn border-0"
                  @click="toggleTransac(2)">
                   Add Expense
                </button>
              </div>
              <div class="col-8 col-sm-4  mt-2 mt-sm-0 mt-md-0 mt-lg-0 mx-auto mx-sm-0 mx-md-0">
                <a class="dropdown show more-btn align-items-center justify-content-center w-100 d-flex default-btn border-0 text-decoration-none">
                  <a class="dropdown-toggle text-decoration-none text-dark" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    More
                  </a>

                  <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                    <a class="dropdown-item c-pointer" @click="toggleTransac(3)">General Ledger</a>
                  </div>
                </a>
              </div>

          </div>
        </div>

        <div class="container-wide">
          <div class="col-12 col-sm-8 col-lg-6 px-0 mt-5">
            <div class="d-flex">
              <button
                class="form-control  align-items-center d-flex transaction-button close-modal"
                @click="toggleAccount"
              >
                <div class="close-modal">{{ selectedTransaction.type }}</div>
                <div class="close-modal  mr-2"> {{ selectedTransaction.amount }}</div>
              </button>
              <i
                class="pi pi-angle-down arrow-icon close-modal"
                @click="toggleAccount"
              ></i>
            </div>
            <div class="style-category close-modal" v-if="accountDisplay">

              <div class="header-border close-modal">
                <div
                  class="manual-dd-item close-modal"
                  v-for="(cash, index) in accountsAndBalancesList"
                  :key="index"
                  @click="selectAnAccount(cash, index)"
                >
                  <div
                    class="d-flex justify-content-between py-1 px-3 close-modal"
                  >
                    <div class="close-modal">{{ cash.text }}</div>
                    <div class="close-modal">{{ cash.currency && cash.currency.shortCode ? cash.currency.shortCode : currentUser.currency }}{{ cash.balance }}</div>
                  </div>
                </div>
              </div>

              <!-- <div class="row"> -->
              <div
                class="col-md-12 create-event px-2 d-flex justify-content-between close-modal small-text"
              >
                <a
                  href="#"
                  class="craete-event-btn font-weight-bold p-3 close-modal"
                  ><i
                    class="pi pi-file-text-o close-modal"
                    aria-hidden="true"
                  ></i>
                  Upload Bank Statement</a
                >
                <a
                  class="craete-event-btn font-weight-bold px-2 py-3 close-modal"
                  @click="openModal"
                  ><i class="pi pi-plus-circle" aria-hidden="true"></i> Add a
                  new account</a
                >
              </div>
              <!-- </div> -->
            </div>
          </div>

          <!-- <h5>Modal</h5> -->
          <Dialog
            header="Add an Account"
            :visible="displayModal"
            :style="{ width: '50vw' }"
            :modal="true"
          >
            <div class="row mt-2">
              <div class="col-sm-3 align-self-center text-right p-0">
                Account Type <span class="text-danger">*</span>
              </div>
              <div class="col-sm-7">
                <div
                  class="select-elem-con pointer d-flex justify-content-space-between close-modal"
                  @click="showAccount = !showAccount"
                >
                  <span class="ofering close-modal">Select one</span
                  ><span>
                    <i
                      class="pi pi-angle-down close-modal"
                      aria-hidden="true"
                    ></i
                  ></span>
                </div>
                <div
                  class="ofering close-modal"
                  :class="{ 'style-account': showAccount }"
                  v-if="showAccount"
                  ref="selectAccount"
                >
                  <div class="px-3 pt-3 close-modal">
                    <input
                      type="text"
                      placeholder="Search..."
                      class="form-control ofering mb-1 close-modal"
                      v-model="accountText"
                    />
                  </div>
                  <div class="container-fluid px-0"
                    v-for="(accounts, index) in transactionalAccounts"
                    :key="index"
                  >
                    <div class="desc-head py-1 px-3 close-modal text-capitalize">{{ accountTypes[index] }}</div>
                    <div class="header-border close-modal">
                      <div>
                        <div
                          @click="transactionItem"
                          class="manual-dd-item close-modal"
                          v-for="(account, indx) in accounts"
                          :key="indx"
                        >
                          <div
                            class="d-flex justify-content-between py-2 px-3 close-modal"
                          >
                            <div class="close-modal offset-sm-1">
                              {{ account.text }}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="row mt-2">
              <div class="col-sm-3 align-self-center text-right p-0">
                Account Name <span class="text-danger">*</span>
              </div>
              <div class="col-sm-7">
                <input type="text" v-model="newAccount.name" class="form-control" />
              </div>
            </div>
            <div class="row mt-2">
              <div class="col-sm-3 align-self-center text-right p-0">
                Account Currency
              </div>
              <div class="col-sm-7">
                <div
                  class="select-elem-con pointer d-flex justify-content-space-between close-modal"
                  @click="showCurrency = !showCurrency"
                >
                  <span class="ofering close-modal">NGN - Nigeria</span
                  ><span>
                    <i
                      class="pi pi-angle-down close-modal"
                      aria-hidden="true"
                    ></i
                  ></span>
                </div>
                <div
                  class="ofering close-modal"
                  :class="{ 'style-account': showCurrency }"
                  v-if="showCurrency"
                >
                  <div class="px-3 pt-3">
                    <input
                      type="text"
                      placeholder="Search..."
                      class="form-control close-modal ofering mb-1"
                      v-model="currencyText"
                    />
                  </div>
                  <div
                    class="header-border close-modal"
                    v-if="filterCurrency.length > 0"
                  >
                    <div
                      class="manual-dd-item close-modal"
                      v-for="item in filterCurrency"
                      :key="item.id"
                    >
                      <div
                        class="d-flex justify-content-between py-2 px-3 close-modal"
                      >
                        <div class="close-modal offset-sm-1">
                          {{ item.name }} - {{ item.country }}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="header-border close-modal" v-else>
                    <div class="p-3 text-center text-danger">
                      No Match Found
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="row mt-2">
              <div class="col-sm-3 align-self-center text-right p-0">
                Account ID
              </div>
              <div class="col-sm-5">
                <input type="text" class="form-control" />
              </div>
            </div>
            <div class="row mt-2">
              <div class="col-sm-3 align-self-center text-right p-0">
                Description
              </div>
              <div class="col-sm-7">
                <textarea class="form-control" v-model="newAccount.description" rows="4"></textarea>
              </div>
            </div>
            <template #footer>

              <button
                type="button"
                class="btn secondary-btn px-4"
                @click="closeModal"
              >
                Close
              </button>
              <button
                type="button"
                class="btn primary-btn px-4 mr-0 text-white"
                @click="saveAccount"
              >
                Save
              </button>
            </template>
          </Dialog>

          <TransactionTable
            :showEditTransaction="showEditTransaction"
            :transactionDetails="transacPropsValue"
            :selectedTransactionType="selectedTransactionType"
            :journalEntry="journalEntry"
            @toggle-edit-form="closeIt"
            @select-row="selectRow"
            @select-journal="selectJournalEntry"
            @reload-accounts="reloadAccounts"
          />
          <!-- <LedgerForm /> -->
        </div>
      </div>
       <el-skeleton class="w-100" animated v-if="loading">
      <template #template>
        <div style="display: flex;
                align-items: center;
                justify-content: space-between;
                margin-top: 20px
              ">
          <el-skeleton-item variant="text" style="width: 240px; height: 240px" />
          <el-skeleton-item variant="text" style="width: 240px; height: 240px" />
        </div>
        <!-- <el-skeleton-item variant="text" class="w-100" style="height: 25px" :rows="10"/> -->
        <el-skeleton class="w-100 mt-5" style="height: 25px" :rows="20" animated />
      </template>
    </el-skeleton>
    </div>
  </div>
</template>
<script>
import { ref, computed } from "vue";
import Dialog from "primevue/dialog";
import axios from "@/gateway/backendapi";
import transactionService from "../../../services/financials/transaction_service";
import TransactionTable from "../../../components/transactions/TransactionsTable"
import transaction_service from '../../../services/financials/transaction_service';
import numbers_formatter from '../../../services/numbers/numbers_formatter';
// import LedgerForm from "../transaction/components/LedgerForm";
import { useStore } from "vuex";
import userService from '../../../services/user/userservice';
import currencyConverter from "../../../services/currency-converter/currencyConverter"

export default {
  components: {
    Dialog,
    TransactionTable,
    // LedgerForm,
  },
  setup() {
    const transactions = ref([ ]);
    const loading = ref(false)
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

    const getCurrentUser = async () => {
      try {
        const response = await userService.getCurrentUser();
        currentUser.value = response;
      } catch (error) {
        console.log(error);
      }
    }
    if (!currentUser.value || !currentUser.value.tenantId) getCurrentUser();

    const rates = ref({ });
      const getConversionRates = async () => {
        try {
          const response = await currencyConverter.getConversionData();
          rates.value = response;
        } catch (error) {
          console.log(error);
        }
      }
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
    const currencyList = ref([]);
    const showCurrency = ref(false);
    const selectAccount = ref("");
    const currencyText = ref("");
    const accountText = ref("");
    const showEditTransaction = ref(false);
    const transacPropsValue = ref({});

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

    const transactionItem = (e) => {
      selectedTransaction.value = {
        type: e.target.children[0].innerHTML,
        amount: e.target.children[0].nextElementSibling.innerHTML,
      };
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
          if (i)
            return i.toLowerCase().includes(accountText.value.toLowerCase());
        });
      } else {
        return accountType.value;
      }
    });

    const filterLiabilities = computed(() => {
      if (accountText.value !== "" && liabilities.value.length > 0) {
        return liabilities.value.filter((i) => {
          if (i)
            return i.toLowerCase().includes(accountText.value.toLowerCase());
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
      } else {
        transacPropsValue.value = {
          type: "ledger",
          account: "Journal",
        };
        journalEntry.value = { };
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
        const response = await transactionService.getTransactionalAccounts();
        for (let group of accountTypes) {
          const groupItems = response.filter(
            (i) => i.accountType.toLowerCase() === group
          );
          transactionalAccounts.value.push(groupItems);
        }
        loading.value = false;
      } catch (error) {
        console.log(error);
        loading.value = false;
      }
    };

    getTransactionalAccounts();

    const cashAndBankItems = ref([ ]);
    const getCashAndBanks = async () => {
      loading.value = true;
      try {
        const response = await transactionService.getCashAndBank();
        cashAndBankItems.value = response;
        loading.value = false;
      } catch (error) {
        console.log(error);
      }
    }
    getCashAndBanks();

    const selectedTransactionType = ref(-1)
    const selectAnAccount = (account, index) => {
      selectedTransaction.value = {
        type: account.text,
        amount: account.currency ? `${account.currency.shortCode}${amountWithCommas(account.balance)}` : `${amountWithCommas(account.balance)}`
      }
      accountDisplay.value = false;
      console.log(index);
      selectedTransactionType.value = account.id ? account.id : "";
    }

    const newAccount = ref({ });
    const saveAccount = async () => {
      try {
        newAccount.value.accountType = 0;
        await transactionService.saveAccount(newAccount.value)
      } catch (error) {
        console.log(error);
      }
    }

    const selectRow = (rowData) => {
      showEditTransaction.value = true;
      transacPropsValue.value = rowData;
    }

    const journalEntry = ref({ })
    const selectJournalEntry = (rowData) => {
      journalEntry.value = rowData;
      showEditTransaction.value = true;
      transacPropsValue.value = {
        type: "ledger",
        account: "Journal"
      };
    }
    // saveAccount()

    const accountsAndBalances = ref([ ])
    const getAccountBalances = async () => {
      loading.value = true;
      try {
        const response = await transaction_service.getCashAndBankAccountBalances();
        accountsAndBalances.value = response;
        accountsAndBalances.value.unshift({ text: "All Accounts", balance: totalAccountBalances.value })
        let index = response.findIndex(i => i.text === "All Accounts")

        if (index >= 0) {
          selectedTransaction.value.amount = `${currentUser.value && currentUser.value.currency ? currentUser.value.currency: ''}${accountsAndBalances.value[index] && accountsAndBalances.value[index].balance ? amountWithCommas(accountsAndBalances.value[index].balance) : 0}`;
          accountsAndBalances.value[index].currency = { shortCode: currentUser.value ? currentUser.value.currency : '' };
        }
        loading.value = false;
        // if (!currentUser.value || !currentUser.value.tenantId) await getCurrentUser();
      } catch (error) {
        console.log(error);
        loading.value = false;
      }
    }
    getAccountBalances()

    const accountsAndBalancesList = computed(() => {
      if (!accountsAndBalances.value || accountsAndBalances.value.length === 0) return [ ];
      return accountsAndBalances.value.map(i => {
        i.balance = amountWithCommas(i.balance);
        return i;
      })
    })

    const totalAccountBalances = computed(() => {
      if (!accountsAndBalances.value || accountsAndBalances.value.length === 0) return 0;
      let sum = 0;
      for (let account of accountsAndBalances.value) {
        sum += convertAmountToTenantCurrency(account);
      }
      return Number.parseFloat(sum).toFixed(2);
    })

    const convertAmountToTenantCurrency = (account) => {
      if (!account.currency.shortCode) return 0;
      if (currentUser.value && currentUser.value.currency && currentUser.value.currency.toLowerCase() === account.currency.shortCode.toLowerCase()) return account.balance;

      const amountInDollars = account.currency.shortCode !== "USD" ? rates.value[`usd${account.currency.shortCode.toLowerCase()}`] * account.balance : account.balance;

      const tenantAmount = rates.value[`usd${currentUser.value && currentUser.value.currency ? currentUser.value.currency.toLowerCase() : ''}`] * amountInDollars;
      return tenantAmount;
    }

    const amountWithCommas = amount => numbers_formatter.amountWithCommas(amount);
    const reloadAccounts = () => {
      getAccountBalances()
    }

    return {
      transactions,
      loading,
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
      filterAccount,
      filterLiabilities,
      showEditTransaction,
      toggleTransac,
      closeIt,
      transacObj,
      transacPropsValue,

      transactionalAccounts,
      accountTypes,
      cashAndBankItems,
      selectAnAccount,
      selectedTransactionType,
      newAccount,
      saveAccount,
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

.events {
  font: normal normal 800 29px Nunito sans;
}
.whole-con {
  display: flex;
  /* background: #f1f5f8; */
  /* height: 100vh; */
}

.main-con {
  width: 100%;
  height: 70%;
}

.main-body {
  height: 100%;
}

.top {
  display: flex;
  justify-content: space-between;
  align-items: center;
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
  background: #dde2e6;
  /* overflow: hidden; */
}

.more-btn:first-child,
.more-btn:nth-child(2) {
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
  width: 100% !important; margin: 0;
}

.table-top {
  font-weight: 800;
  font-size: 12px;
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

/* .create-event {
    border: 1px solid #ced4da;
    padding: 10px
} */

.create-event a {
  color: #136acd !important;
  text-decoration: none;
}

.create-new-event {
  text-align: center;
  font: normal normal bold 16px/22px Nunito Sans;
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
  /* max-height: 518px;
        overflow-y: auto */
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
  /*overflow: hidden;  */
  position: absolute;
  /* transition: all 0.6s cubic-bezier(0.445, 0.05, 0.55, 0.95); */
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
    /* flex-direction: column */
  }
}

/* @media (max-width: 750px) {
    .table {
      max-width: 617px;
      overflow-y: auto
    }
  } */

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