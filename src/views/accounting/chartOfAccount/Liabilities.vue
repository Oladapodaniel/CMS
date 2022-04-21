<template>
  <div class="row" v-for="(item, index) in data.accountHeadsDTO" :key="index">
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
          <i class="pi pi-pencil c-pointer" aria-hidden="true" data-toggle="modal" data-target="#liabModal" @click="editAccount(item, itm)"></i>
          <i class="pi pi-trash ml-3 c-pointer" aria-hidden="true"  @click="deleteAccount(itm.id, index, indx)"></i>
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
              data-target="#liabModal"
              ><i class="pi pi-plus-circle"></i>&nbsp; &nbsp; Add a new
              Account</a
            >
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="row">
    <div class="col-md-12">
      <!-- BT MODAL -->
      <div
        class="modal fade"
        id="liabModal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="liabModalLabel"
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
                ref="closeAccountModalBtn"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <CreateAccountModal
                :transactionalAccounts="accounts"
                :accountTypes="accountTypes"
                :currencies="currencies"
                :financialAccountType="1"
                :index="1"
                :accountGroupId="accountGroupId"
                :account="accountToEdit"
                :currency="true"
                @save-account="closeAccountModal"
              />
            </div>

          </div>
        </div>
      </div>
      <ConfirmDialog></ConfirmDialog>
      <!-- END BT -->
    </div>
  </div>
</template>

<script>
import { computed, ref } from "vue";
import CreateAccountModal from "./components/CreateAccountForm";
import transactionals from "./utilities/transactionals";
import ConfirmDialog from 'primevue/confirmdialog';
import { useConfirm } from "primevue/useconfirm";
import { useToast } from 'primevue/usetoast';
import chart_of_accounts from '../../../services/financials/chart_of_accounts';


export default {
    components: { CreateAccountModal, ConfirmDialog },
    props: [ "data" ],
  setup(props, { emit }) {
    const view = ref(true);
    const confirm = useConfirm();
    const toast = useToast();

    const accounts = ref([]);
    const getAccounts = async () => {
      try {
        accounts.value = await transactionals.getTransactionalAccounts();
        console.log(accounts.value);
      } catch (error) {
        console.log(error);
      }
    };
    getAccounts();

    const currencyList = ref([]);
    const getCurrencies = async () => {
      try {
        const response = await transactionals.getCurrencies();
        currencyList.value = response;
      } catch (error) {
        console.log(error);
      }
    };
    getCurrencies();

    const currencies = computed(() => {
        if (!currencyList.value || currencyList.value.length === 0) return [ ];
        return currencyList.value;
    })

    const accountTypes = transactionals.accountTypes;

    const accountGroupId = ref("");
    const setGroupId = (groupId) => {
      accountGroupId.value = groupId;
      accountToEdit.value = { };
    }

    const closeAccountModalBtn = ref(null)
    const closeAccountModal = (data) => {
        closeAccountModalBtn.value.click();
        if (data.success) {
            emit("reload");
        }
    }

    const accountToEdit = ref({ });
    const editAccount = (group, account) => {
      accountToEdit.value = account;
      accountGroupId.value = group.name;
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
                emit("liability-deleted", index, indx);
              } catch (error) {
                toast.add({severity:'error', summary:'Delete Error', detail:'Account not deleted', life: 3000});
                console.log(error);
              }
          },
          reject: () => {
            //callback to execute when user rejects the action
            
          }
      });
    }

    return {
      view,
      accountTypes,
      currencyList,
      accounts,
      currencies,
      setGroupId,
      accountGroupId,
      closeAccountModal,
      closeAccountModalBtn,
      deleteAccount,
      editAccount,
      accountToEdit,
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