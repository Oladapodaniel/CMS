<template>
  <div class="container">
    <div class="row bordered-bottom pb-2 mb-3">
      <div class="col-md-12">
        <h5 class="mb-0 py-2 d-flex justify-content-between"><span>General Ledger</span> <span @click="closeLedgerForm"><i class="pi pi-times c-pointer"></i></span></h5>
      </div>
    </div>
    <div class="row mt-3" v-if="gettingSelectedTrsn">
      <div class="col-md-12 text-center">
        <el-icon class="is-loading " >
            <Loading />
          </el-icon>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12">
        <!-- <div class="container"> -->
          <div class="row">
            <div class="col-md-12">
              <label for="" class="form-label" style="font-size: 14px"
                >Description</label
              >
              <el-input  v-model="memo" type="textarea" placeholder="Write a description" :rows="2" class="w-100" />
              <!-- <textarea
                name=""
                id=""
                class="w-100 border-0 textarea"
                rows="1"
                placeholder="Write a description"
                v-model="memo"
              ></textarea> -->
            </div>
          </div>
        <!-- </div> -->
      </div>
    </div>

    <div class="row bordered-bottom pb-2 mb-3">
      <div class="col-md-10 d-flex mt-3 ">
        <el-date-picker
            v-model="transactionDate"
            type="date"
            class="w-100"
            size="large"
            format="MM/DD/YYYY"
          />
        <!-- <input
          type="date"
          name=""
          id=""
          class="form-control"
          v-model="transactionDate"
        /> -->
      </div>
      <div class="col-md-2 mt-2 d-md-flex flex-column ">
        <span class="small-text mb-n2">Total</span>
        <span class="font=weight-700" style="font-size: 25px">{{
          totalAmount
        }}</span>
      </div>
    </div>

    <div class="row bordered-bottom pb-3 mb-3">
      <div class="col-md-12">
        <div class="row">
          <div class="col-md-8"></div>
          <div class="col-md-4 pl-0">
            <h6 class="font-weight-700 text-center mb-n1">Debits</h6>
          </div>
        </div>
      </div>
      <div class="col-md-12">
        <div
          class="row my-1 d-flex"
          v-for="(transaction, indexe) in journalTransactions"
          :key="indexe"
        >
          <div class="col-md-12" v-if="transaction.category === 'inflow'">
            <div class="row">
              <div class="col-md-8">
                <el-dropdown trigger="click" class="w-100">
                    <span class="el-dropdown-link w-100">
                      <div
                        class="d-flex justify-content-between border-contribution  w-100"
                        size="large"
                      >
                        {{
                        !transaction.account
                          ? "Select account type"
                          : transaction.account
                      }}
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
                        :key="index" >
                        <div class="col-md-12 px-2">
                          <h6
                            class="mb-0 text-capitalize font-weight-bold"
                            v-if="accounts.length > 0"
                          >
                            {{ accountTypes[index] }}
                            
                          </h6>
                          <div class="py-1" v-for="(account, indx) in accounts"
                            :key="indx"
                            @click="selectAccount(1, indexe, account)"  >{{ account.text }}</div>
                        </div>
                        </el-dropdown-item>
                      </el-dropdown-menu>
                    </template>
                </el-dropdown>
              </div>
              <div class="col-md-4 mb-2 pl-0">
                <el-input
                  type="text"
                  class="w-100"
                  v-model="transaction.amount"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-md-12 d-flex justify-content-between">
        <div class="col-8 px-0">
          <a
            class="text-decoration-none font-weight-700 link-color c-pointer"
            @click="addRecord('inflow')"
            ><span style="font-size:18px">Add Debit</span> <el-icon class="mt-2s"><CirclePlus /></el-icon> 
          </a>
        </div>
        <div class="col-4 px-0 text-center">
          <span class="font-weight-bold">{{ sumOfRecords(debitRecords) }}</span>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-md-12">
        <div class="row">
          <div class="col-md-8"></div>
          <div class="col-md-4 pl-0">
            <h6 class="font-weight-700 text-center mb-n1">Credits</h6>
          </div>
        </div>
      </div>
      <div class="col-md-12">
        <div
          class="row my-1 d-flex"
          v-for="(transaction, indexe) in journalTransactions"
          :key="indexe"
        >
          <div class="col-md-12" v-if="transaction.category === 'outflow'">
            <div class="row">
              <div class="col-md-8">
                <el-dropdown trigger="click" class="w-100">
                    <span class="el-dropdown-link w-100">
                      <div
                        class="d-flex justify-content-between border-contribution  w-100"
                        size="large"
                      >
                        {{
                        !transaction.account
                          ? "Select account type"
                          : transaction.account
                      }}
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
                        :key="index" >
                        <div class="col-md-12 px-2">
                          <h6
                            class="mb-0 text-capitalize font-weight-bold"
                            v-if="accounts.length > 0"
                          >
                            {{ accountTypes[index] }}
                            
                          </h6>
                          <div class="py-1" v-for="(account, indx) in accounts"
                            :key="indx"
                            @click="selectAccount(0, indexe, account)"  >{{ account.text }}</div>
                        </div>
                        </el-dropdown-item>
                      </el-dropdown-menu>
                    </template>
                </el-dropdown>
                <!-- <div class="dropdown">
                  <button
                    class="btn btn-white w-100 bordered text-left bg-light d-flex justify-content-between"
                    type="button"
                    id="dropdownMenuButton"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <span>
                      {{
                        !transaction.account
                          ? "Select account type"
                          : transaction.account
                      }}
                    </span>
                    <span><i class="pi pi-angle-down"></i></span>
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
                            @click="selectAccount(0, indexe, account)"
                            >{{ account.text }}</a
                          >
                        </div>
                      </div>
                    </div>
                  </div>
                </div> -->
              </div>
              <div class="col-md-4 mb-2 pl-0">
                <el-input
                  type="text"
                  class=" w-100"
                  v-model="transaction.amount"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-12 d-flex justify-content-between px-0">
          <div class="col-8 px-0">
            <a
              class="text-decoration-none font-weight-bold link-color c-pointer"
              @click="addRecord('outflow')"
              ><span style="font-size:18px">Add Credit</span> 
             <el-icon class="mt-2"><CirclePlus /></el-icon> 
            </a>
          </div>
          <div class="col-4 text-center px-0">
            <span class="font-weight-bold">{{
              sumOfRecords(creditRecords)
            }}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-md-12 text-center" v-if="unbalanced">
        <span class="text-center text-danger font-weight-700">Unbalanced</span>
      </div>
      <div class="col-md-12 d-flex justify-content-center my-3">
        <el-button
          class=" text-white font-weight-700 border-0"
          round
          color="#136acd"
          @click="saveTransaction"
          :disabled="unbalanced || journalEntry.date"
        >
          Save
        </el-button>
        <Toast />
      </div>
    </div>
  </div>
</template>

<script>
import { ref} from "@vue/reactivity";
import transactionals from "../../chartOfAccount/utilities/transactionals";
import { computed, watch } from '@vue/runtime-core';
import transaction_service from '../../../../services/financials/transaction_service';
import { ElMessage } from 'element-plus'

export default {
  props: ['journalEntry', 'gettingSelectedTrsn'],

  setup(props, { emit }) {

    const selectedAccountType = ref({});
    // const primarycolor = inject('primarycolor')
    const transactionalAccounts = ref([]);
    const accountTypes = ["assets", "liability", "equity", "income", "expense"];

    const getTransactionalAccounts = async () => {
      try {
        const response = await transactionals.getGroupedAccounts();
        transactionalAccounts.value = response;
      } catch (error) {
        console.log(error);
      }
    };
    getTransactionalAccounts();

    const selectAccount = (type, index, account) => {
      if (type === 0) {
          journalTransactions.value[index].creditAccountID = account.id;
          journalTransactions.value[index].account = account.text;
      } else {
          journalTransactions.value[index].debitAccountID = account.id;
          journalTransactions.value[index].account = account.text;
      }
    };

    const journalTransactions = ref([ ]);
    const initializeJournalTransactions = () => {
      journalTransactions.value = [
        {
          category: "inflow",
          amount: 0.0,
        },
        {
          category: "outflow",
          amount: 0.0,
        },
      ]
    }

    initializeJournalTransactions();

    const sumOfRecords = (records) => {
        let sum = 0;
        for (let record of records) {
            sum += +record.amount;
        }
        return sum;
    }

    const addRecord = (category) => {
        journalTransactions.value.push({ category: category, amount: 0.00 })
    }

    const debitRecords = computed(() => {
        if (!journalTransactions.value) return [ ];
        return journalTransactions.value.filter(i => i.category === "inflow");
    })

    const creditRecords = computed(() => {
        if (!journalTransactions.value) return [ ];
        return journalTransactions.value.filter(i => i.category === "outflow");
    })

    const totalAmount = computed(() => {
        if (!journalTransactions.value) return 0;
        const debits = journalTransactions.value.filter(i => i.category === "inflow");
        
        return sumOfRecords(debits);
    })

    const unbalanced = computed(() => {
        const debitSum = sumOfRecords(debitRecords.value);
        const creditSum = sumOfRecords(creditRecords.value);
        return debitSum !== creditSum;
    })

    const memo = ref("");
    const transactionDate = ref("");

    const saveTransaction = async () => {
        if ((sumOfRecords(creditRecords.value) !== sumOfRecords(debitRecords.value)) || sumOfRecords(debitRecords.value) === 0) return false;
        const body = journalTransactions.value.map(i => {
            return {
                memo: memo.value,
                date: transactionDate.value,
                debitAccountID: i.debitAccountID,
                creditAccountID: i.creditAccountID,
                amount: i.amount,
            }
            
        })

        try {
                const response = await transaction_service.saveJournalTransaction(body);
                if (response.status >= 200 && response.status <= 300) {
                  ElMessage({
                  type: "success",
                  message: "The transaction was succesful",
                  duration: 3000,
                });
                    emit('entrysaved');
                } else {
                  ElMessage({
                  type: "error",
                  message: "Transaction failed, please try again",
                  duration: 3000,
                });
                }
            } catch (error) {
              ElMessage({
                  type: "error",
                  message: "Transaction failed, please try again",
                  duration: 3000,
                });
                console.log(error);
            }
    }

    const closeLedgerForm = () => {
        emit("close-ledger")
    }

    watch(() => props.journalEntry, () => {
      if (props.journalEntry && props.journalEntry.date) {
        memo.value = props.journalEntry.memo;
        transactionDate.value = props.journalEntry.date.toLocaleString().includes('T') ? props.journalEntry.date.toLocaleString().split('T')[0] : props.journalEntry.date.toLocaleString();
        journalTransactions.value = [
          ...props.journalEntry.debitSplitAccounts.map(i => {
            i = {
              ...i,
              category: 'inflow',
              account: i.account.name
            }

            return i;
          }),
          ...props.journalEntry.creditSplitAccounts.map(i => {
            i = {
              ...i,
              category: 'outflow',
              account: i.account.name
            }

            return i;
          })

        ]
      } else {
        initializeJournalTransactions();
      }
    })

    return {
      // primarycolor,
      accountTypes,
      selectedAccountType,
      selectAccount,
      transactionalAccounts,
      journalTransactions,
      addRecord,
      creditRecords,
      debitRecords,
      totalAmount,
      sumOfRecords,
      saveTransaction,
      unbalanced,
      memo,
      transactionDate,
      closeLedgerForm,
    };
  },
};
</script>

<style scoped>
.bordered-bottom {
  border-bottom: 1px solid#00204412 !important;
}
.border-contribution {
  border: 1.6px solid rgb(255, 255, 255);
  border-radius: 4px;
  padding: 11px 7px;
  background-color: white;
}

.bordered-top {
  border-top: 1px solid#00204412 !important;
}

.bordered {
  border: 1px solid#00204412 !important;
}

.greyish-color {
  color: #47525d;
}

.desc-area {
  border: 1px solid #00204412;
  background: white;
  margin-bottom: 10px;
}

.textarea {
  outline: transparent;
}

.textarea::placeholder {
  font-size: 18px;
}

.link-color {
  color: #343a40;
}
</style>