<template>
  <div class="row" v-for="(item, index) in data.accountHeadsDTO" :key="index">
    <div class="col-md-12">
      <div class="row">
        <div class="col-12 py-2 mt-4 account-head">
          {{ item.name }} <small class="font-weight-normal">{{ item.groupSubHead }}</small
          ><i class="pi pi-question-circle help" aria-hidden="true"></i>
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
          <i class="pi pi-pencil c-pointer" aria-hidden="true" data-toggle="modal" data-target="#fundModal" @click="editAccount(item, itm)"></i>
          <i class="pi pi-trash c-pointer ml-3" aria-hidden="true" @click="deleteAccount(itm.id, index, indx)"></i>
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
              @click="selectAccountType(item)"
              class="c-pointer text-decoration-none primary-text"
              data-toggle="modal"
              data-target="#fundModal"
              ><i class="pi pi-plus-circle"></i>&nbsp; &nbsp; Add a new
              Account</a
            >
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="row">
    <div
      class="modal fade"
      id="fundModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="fundModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title font-weight-bold" id="exampleModalLabel">
              Add Fund
            </h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="row" v-if="!savingFund">
              <div class="col-md-12">
                <div class="row my-3">
                  <div class="col-md-3 text-md-right">
                    <label for="">Fund type</label>
                  </div>
                  <div class="col-md-8">
                    <Dropdown
                      v-model="selectedFundType"
                      :options="fundTypes"
                      style="width: 100%"
                    />
                  </div>
                </div>
                <div class="row my-3">
                  <div class="col-md-3 text-md-right">
                    <label for="">Fund name</label>
                  </div>
                  <div class="col-md-8">
                    <input
                      type="text"
                      v-model="newFund.name"
                      class="form-control"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div class="row my-5" v-if="savingFund">
                <div class="col-md-12 text-center">
                    <i class="pi pi-spin pi-spinner" style="fontSize: 3rem"></i>
                </div>
            </div>
          </div>

          <div class="modal-footer">
            <div class="container">
              <div class="row">
                <div class="col-md-12 d-flex justify-content-end">
                  <button class="default-btn mr-3" data-dismiss="modal" ref="closeModalBtn">
                    Cancel
                  </button>
                  <button
                    @click="onSave"
                    class="default-btn primary-bg border-0 text-white"
                    :disabled="!selectedFundType || !newFund.name"
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- <Toast /> -->
        </div>
      </div>
    </div>
          <ConfirmDialog></ConfirmDialog>
  </div>
</template>

<script>
import { ref } from "vue";
import transactionUtil from "./utilities/transactionals";
import Dropdown from "primevue/dropdown";
import chart_of_accounts from "../../../services/financials/chart_of_accounts";
import { useToast } from 'primevue/usetoast';
import transactionals from './utilities/transactionals';
import { useConfirm } from "primevue/useconfirm";


export default {
    props: [ "data" ],
  components: { Dropdown },

  setup(props, { emit }) {
    const toast = useToast();
    const confirm = useConfirm();
    const accounts = ref([]);
    const fundTypes = [
      "Unrestricted Funds",
      "Donor Restricted Funds",
    ];
    const selectedFundType = ref("");

    const getAccounts = async () => {
      try {
        accounts.value = await transactionUtil.getTransactionalAccounts();
        console.log(accounts.value);
      } catch (error) {
        console.log(error);
      }
    };
    getAccounts();

    const currencyList = ref([]);
    const getCurrencies = async () => {
      try {
        currencyList.value = await transactionUtil.getCurrencies();
        console.log(currencyList.value);
      } catch (error) {
        console.log(error);
      }
    };
    getCurrencies();
    
    const  closeModalBtn = ref(null);
    const savingFund = ref(false);
    const saveFund = async (fund) => {
      try {
          savingFund.value = true;
        let response = { };
        if (accountToEdit.value.id) {
            accountToEdit.value.name = fund.name;
            response = await chart_of_accounts.editAccount(fund);
        } else {
            response = await chart_of_accounts.saveFund(fund);
        }
        savingFund.value = false;
        closeModalBtn.value.click();
        if (!response.status) {
            emit("save-fund", { success: false, message: "An error ocuurred, please try again" });
            toast.add({severity:'error', summary:'Fund Creation Failed', detail:`An error occurred, please try again`, life: 3000});
        } else {
            toast.add({severity:'success', summary:'Fund Created', detail:`The fund ${newFund.value.name} was created successfully`, life: 2500});
            // refresh funds
            emit("save-fund", { success: true, message: "An error ocuurred, please try again" });
            transactionals.getFunds(true);
        }
        console.log(response, "save fund response");
      } catch (error) {
        savingFund.value = false;
        toast.add({severity:'error', summary:'Fund Creation Failed', detail:`An error occurred, please try again`, life: 3000});
        console.log(error);
      }
    };

    
    const newFund = ref({});
    const onSave = () => {
      if (!selectedFundType.value || !newFund.value.name) {
        return false;
      }
        newFund.value.fundType = fundTypes.indexOf(selectedFundType.value);
        newFund.value.financialAccountGroupID = selectedGroupId.value;
      saveFund(newFund.value);
    };

    const accountTypes = transactionUtil.accountTypes;

    const selectedGroupId = ref("");
    const selectAccountType = (group) => {
        selectedGroupId.value = group.id;
        selectedFundType.value = group.name;
    }

    const accountToEdit = ref({ });
    const editAccount = (group, account) => {
        console.log(group, "group");
        console.log(account, "accccc");
      accountToEdit.value = account;
      newFund.value.name = accountToEdit.value.name;
      newFund.value.code = accountToEdit.value.code;
      newFund.value.id = accountToEdit.value.id;
      newFund.value.fundType = fundTypes.indexOf(group.name);
      newFund.value.financialAccountGroupID = account.financialAccountGroupID;
      selectedFundType.value = group.name
    //   accountGroupId.value = group.name;
    }

    const deleteAccount = (id, index, indx) => {
      confirm.require({
          message: 'Are you sure you want to delete this account?',
          header: 'Confirmation',
          icon: 'pi pi-exclamation-triangle',
          acceptClass: 'confirm-delete',
          rejectClass: 'cancel-delete',
          accept: async () => {
            try {
                const response = await chart_of_accounts.deleteAccount(id);
                toast.add({severity:'success', summary:'Account Deleted', detail: `${response.response}`, life: 3000});
                emit("equity-deleted", index, indx);
            } catch (error) {
                toast.add({severity:'error', summary:'Delete Error', detail:'Account not deleted', life: 3000});
                console.log(error);
            }
          },
          reject: () => {
            //callback to execute when user rejects the action
            //   toast.add({severity:'error', summary:'Delete Error', detail:'Account not deleted', life: 3000});
          }
      });
    }

    return {
      accountTypes,
      currencyList,
      accounts,
      onSave,
      fundTypes,
      newFund,
      selectedFundType,
      savingFund,
      closeModalBtn,
      selectAccountType,
      editAccount,
      accountToEdit,
      deleteAccount,
    };
  },
};
</script>

<style scoped>
.row-border {
  border-bottom: 1px solid rgb(225, 225, 225);
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

.modal-lg {
  max-width: 670px;
}
</style>