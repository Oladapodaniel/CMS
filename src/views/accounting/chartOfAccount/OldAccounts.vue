<template>
  <div class="container" style="max-width: 800px;margin: 0 auto">
    <div class="row tr-border-bottom pt-4 mb-4">
      <div class="col-md-12 pl-0">
        <div class="pb-3">
          <span class="chart-head"> Update Charts of Accounts</span>
          <span class="help"
            ><i class="pi pi-question-circle-o" aria-hidden="true"></i
          ></span>
        </div>
      </div>
    </div>
    <div
        class="row row-border align-items-center py-2"
        v-for="(itm, indx) in oldAccounts"
        :key="indx"
      >
        <div class="col-6 col-md-2">{{ itm.code }}</div>
        <div class="col-6 col-md-3">
          <div class="desc-head">{{ itm.name }}</div>
        </div>
        <div class="col-6 col-md-5 small-text">{{ itm.description }}</div>
        <div class="col-6 col-md-2 text-right">
          <a class="primary-text text-decoration-none font-weight-700 c-pointer" @click="editAccount(itm)" data-toggle="modal" data-target="#assetsModal">
            <!-- <i class="pi pi-pencil c-pointer"  aria-hidden="true"></i> -->
            <span>Update</span>
          </a>
          <!-- <i class="pi pi-trash ml-2 c-pointer" aria-hidden="true" @click="deleteAccount(itm.id, index, indx)"></i> -->
        </div>
      </div>
  </div>

  <div class="row" v-for="(item, index) in chartsOfAccount.accountHeadsDTO" :key="index">
    <div class="col-md-12">
      <div class="row">
        <div class="col-12 py-2 mt-4 account-head">
          {{ item.name }} <small class="font-weight-normal">{{ item.groupSubHead }}</small
          ><i class="pi pi-question-circle-o help" aria-hidden="true"></i>
        </div>
      </div>
      <div
        class="row row-border align-items-center py-2"
        v-for="(itm, indx) in item.accounts"
        :key="indx"
      >
        <div class="col-6 col-md-2">{{ itm.code }}</div>
        <div class="col-6 col-md-3">
          <div class="desc-head">{{ itm.name }}</div>
        </div>
        <div class="col-6 col-md-5">{{ itm.description }}</div>
        <div class="col-6 col-md-2 text-right">
          <i class="pi pi-pencil c-pointer" data-toggle="modal" data-target="#assetsModal" aria-hidden="true" @click="editAccount(item, itm)"></i>
          <i class="pi pi-trash ml-2 c-pointer" aria-hidden="true" @click="deleteAccount(itm.id, index, indx)"></i>
        </div>
      </div>
      <div class="row row-border align-items-center py-3" v-if="item.accounts.length === 0">
        <div class="col-10 offset-md-2 text-center text-md-left">
          You have not added any inventory yet.
        </div>
      </div>
      <div class="row">
        <div class="col-10 offset-md-2 text-center text-md-left">
          <div class="add-account py-2">
            <a
              @click="setGroupId(item.name)"
              class="c-pointer text-decoration-none primary-text"
              data-toggle="modal"
              data-target="#assetsModal"
              ><i class="pi pi-plus-circle"></i>&nbsp; &nbsp; Add a new
              Account</a
            >
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- BT MODAL -->
  <div
    class="modal fade"
    id="assetsModal"
    tabindex="-1"
    role="dialog"
    aria-labelledby="assetsModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-lg" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title font-weight-bold" id="exampleModalLabel">
            Add an account
          </h5>
          <button
            type="button"
            class="close"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true" ref="closeModalBtn">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <UpdateAccountModal
            @save-account="closeAccountModal"
            :transactionalAccounts="typesFOrSelectedAccount"
            :accountTypes="accountTypes"
            :currencies="currencyList"
            :financialAccountType="0"
            :index="0"
            :account="accountToEdit"
            :accountGroupId="accountGroupId"
            :currency="true"
          />
        </div>
      </div>
    </div>
  </div>
  <!-- END BT -->
  <ConfirmDialog></ConfirmDialog>
  <Toast />
</template>

<script>
import { ref, computed, nextTick } from "vue";
import UpdateAccountModal from "./components/UpdateOldAccount";
import transactionals from './utilities/transactionals';
import ConfirmDialog from 'primevue/confirmdialog';
import { useConfirm } from "primevue/useconfirm";
import { useToast } from "primevue/usetoast";
import chart_of_accounts from '../../../services/financials/chart_of_accounts';
import transaction_service from '../../../services/financials/transaction_service';

export default {
  components: { UpdateAccountModal ,ConfirmDialog },
  props: [ "assets", "data" ],
  setup(props, { emit }) {
    const view = ref("view");
    const displayModal = ref(false);
    const showCode = ref(false);
    const accountText = ref("");
    const accountType = ref(["Cash and Bank", "Money in Transit"]);
    const liabilities = ref(["Credit Card", "Loan and Line of Credit"]);
    const showCurrency = ref(false);
    const currencyText = ref("");
    const currencyList = ref([]);
    const inpFocus = ref("");
    const inpFocus2 = ref("");
    const confirm = useConfirm();
    const toast = useToast();

    const toggleCode = () => {
      showCode.value = !showCode.value;
    };
    const showAccount = ref(false);

    const openModal = () => {
      displayModal.value = true;
    };
    const closeModal = () => {
      displayModal.value = false;
    };

    const filterAccount = computed(() => {
      if (accountText.value !== "" && accountType.value.length > 0) {
        return accountType.value.filter((i) => {
          if (i)
            return i.toLowerCase().includes(accountText.value.toLowerCase());
        });
        // console.log(currencyText)
      } else {
        return accountType.value;
      }
    });

    const accountGroupId = ref("");
    const setGroupId = (groupId) => {
      accountGroupId.value = groupId;
      accountToEdit.value = { }
    }

    const getCurrenciesFromCountries = async () => {
      try {
        const response = await transaction_service.getCurrencies();
        currencyList.value = response.map(i => {
          return {
              name: i.shortCode,
              id: i.id,
              country: i.country,
            };
        })
      } catch (error) {
        console.log(error);
      }
    };
    getCurrenciesFromCountries();

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

    const gettingCharts = ref(false);
    const chartsOfAccount = ref([ ]);
    const accountGroups = ref([ ]);
    const getCharts = async () => {
      try {
          gettingCharts.value = true;
        const response = await chart_of_accounts.getChartOfAccounts();
        gettingCharts.value = false;
        chartsOfAccount.value = response.accountwithoutheads;
        accountGroups.value = response.accountwithHeads;
        console.log(response, "CHARTS");
      } catch (error) {
          gettingCharts.value = false;
        console.log(error);
      }
    };
    getCharts();

    const oldAccounts = computed(() => {
      if (!chartsOfAccount.value || chartsOfAccount.value.length === 0) return [ ];
      // let targeted = [ ];
      // for (let accounts of chartsOfAccount.value) {
      //   for (let nestedAccounts of accounts.accounts) {
      //     for (let account of nestedAccounts.accounts) {
      //       targeted.push(account);
      //     }
      //   }
      // }
      // console.log(targeted, "tagettef");
      return chartsOfAccount.value;
    })

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

    const toggleCurrency = () => {
      showCurrency.value = !showCurrency.value;
      // if (showCurrency.value){
      //     console.log(inpFocus.value)
      // }
      nextTick(() => {
        if (showCurrency.value) {
          inpFocus.value.focus();
        }
      });
    };

    const toggleAccountType = () => {
      showAccount.value = !showAccount.value;
      nextTick(() => {
        if (showAccount.value) {
          inpFocus2.value.focus();
        }
      });
    };

    const transactionalAccounts = ref([]);
    const accountTypes = ["assets", "liability", "income", "expense", "equity"];
    const getTransactionalAccounts = async () => {
      try {
        const response = await transactionals.getTransactionalAccounts();
        transactionalAccounts.value = response;
        // const equity = response[2];
        // transactionalAccounts.value.splice(2, 1);
        // transactionalAccounts.value.push(equity);
        console.log(transactionalAccounts.value, "WWWW");
      } catch (error) {
        console.log(error);
      }
    };
    getTransactionalAccounts();

    // const selectedAccountType = ref({ });
    // const selectAccountType = (account) => {
    //   selectedAccountType.value = account;
    // }

    const closeModalBtn = ref(null);
    const closeAccountModal = (data) => {
      closeModalBtn.value.click();
      if (data.success) {
        getCharts()
        emit("reload");
      }
    };

    const typesFOrSelectedAccount = ref([ ]);
    const accountToEdit = ref({ });
    const editAccount = (account) => {
      console.log(account, "to be edited");
      accountToEdit.value = account;
      // accountGroupId.value = group.name;
      typesFOrSelectedAccount.value = accountGroups.value.find(i => i.key.toLowerCase() === accountTypes[account.accountType]).accountHeadsDTO;
    }

    const deleteAccount = (id, index, indx) => {
      confirm.require({
          message: 'Are you sure you want to delete this account?',
          header: 'Confirmation',
          icon: 'pi pi-exclamation-triangle',
          acceptClass: 'confirm-delete',
          rejectClass: 'cancel-delete',
          accept: async () => {
              //callback to execute when user confirms the action
              try {
                const response = await chart_of_accounts.deleteAccount(id);
                toast.add({severity:'success', summary:'Account Deleted', detail: `${response.response}`, life: 3000});
                emit("asset-deleted", index, indx);
              } catch (error) {
                toast.add({severity:'error', summary:'Delete Error', detail:'Account not deleted', life: 3000});
                console.log(error);
              }
          },
          reject: () => {
              //callback to execute when user rejects the action
              // toast.add({severity:'error', summary:'Delete Error', detail:'Account not deleted', life: 3000});
          }
      });
    }

    const cities = ref([
      {
        label: "Germany",
        code: "DE",
        items: [
          { label: "Berlin", value: "Berlin" },
          { label: "Frankfurt", value: "Frankfurt" },
          { label: "Hamburg", value: "Hamburg" },
          { label: "Munich", value: "Munich" },
        ],
      },
      {
        label: "USA",
        code: "US",
        items: [
          { label: "Chicago", value: "Chicago" },
          { label: "Los Angeles", value: "Los Angeles" },
          { label: "New York", value: "New York" },
          { label: "San Francisco", value: "San Francisco" },
        ],
      },
      {
        label: "Japan",
        code: "JP",
        items: [
          { label: "Kyoto", value: "Kyoto" },
          { label: "Osaka", value: "Osaka" },
          { label: "Tokyo", value: "Tokyo" },
          { label: "Yokohama", value: "Yokohama" },
        ],
      },
    ]);

    return {
      view,
      displayModal,
      openModal,
      closeModal,
      showCode,
      toggleCode,
      showAccount,
      accountText,
      filterLiabilities,
      filterAccount,
      accountType,
      liabilities,
      showCurrency,
      currencyText,
      filterCurrency,
      currencyList,
      toggleCurrency,
      inpFocus,
      inpFocus2,
      toggleAccountType,

      cities,
      transactionalAccounts,
      accountTypes,
      closeModalBtn,
      closeAccountModal,
      setGroupId,
      accountGroupId,
      editAccount,
      accountToEdit,
      deleteAccount,
      chartsOfAccount,
      gettingCharts,
      oldAccounts,
      typesFOrSelectedAccount,
      // selectAccountType,
      // selectedAccountType
    };
  },
};
</script>

<style scoped>
.chart-head {
  font: normal normal 800 29px Nunito sans;
}

.row-border {
  border-bottom: 1px solid #4762f01f;
}

.account-head {
  background: #e0e7eb;
  font-weight: 800;
}

.help {
  color: rgb(100, 100, 100);
  margin: 5px;
}

.desc {
  color: #190138;
  opacity: 0.6;
}

.desc-head {
  font-weight: 600;
}

.add-account {
  color: #136acd;
  font-weight: 800;
}

.flagCode {
  width: 140px;
  max-height: 15em;
  overflow-y: scroll;
  overflow-x: hidden;
  box-shadow: -3px 3px 15px #797e8159;
  position: absolute;
  /* top: 49.5%; */
  background: white;
  z-index: 10;
}
.flagCode div {
  width: 35em;
}
.flagCode div:hover {
  background: rgb(238, 238, 238);
}

.hide-code {
  /* display: none */
  height: 0;
  overflow: hidden;
  /* transition: all 0.4s ease-in-out */
}

input.codeInput {
  width: 80%;
  margin-left: 12px;
  margin-top: 5px;
}

.style-account {
  box-shadow: 0px 3px 15px #797e8159;
  position: absolute;
  background: white;
  z-index: 1;
  width: 93%;
  max-height: 14em;
  overflow-y: auto;
}
.style-account div div div:hover {
  background-color: #ecf0f3;
  cursor: pointer;
}

.modal-lg {
  max-width: 670px;
}
</style>