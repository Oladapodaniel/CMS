<template>
  <div>
    <!-- <div>{{ transacObj }}</div> -->
    <!-- <div>{{ splitCategories }}</div> -->
    <!-- <div>{{ showEditTransaction }}</div> -->
    <div class="col-12 parent-desc d-flex justify-content-between first p-3">
      <div>Money Transfer</div>
      <el-icon @click="closeTransac" class="mt-0">
        <Close />
      </el-icon>
    </div>
    <div class="container">
      <div class="row mt-3" v-if="gettingSelectedTrsn">
        <div class="col-md-12 text-center">
          <el-icon class="is-loading ">
            <Loading />
          </el-icon>
        </div>
      </div>
      <div class="row mt-4">
        <div class="col-12">
        </div>
        <div class="col-12">
          <div class="label-text">Description <span class="text-danger">*</span></div>
          <el-input class="w-100" id="description"  v-model="memo" placeholder="Description"/>
          <!-- <el-input class="w-100" id="description"  v-model="memo" placeholder="Description"
            :autofocus="showEditTransaction" /> -->
        </div>
        <div class="col-12 mt-1">
          <div class="label-text">Date <span class="text-danger">*</span></div>
          <el-date-picker v-model="transactionDate" type="date" id="date" class="w-100" size="large"
            format="MM/DD/YYYY" />
        </div>
      </div>
      <div class="row mt-3">
        <div class=" col-md-12 label-text">Source Account</div>
        <div class="col-md-12">
          <div class="row my-1 d-flex" v-for="(transaction, indexe) in journalTransactions" :key="indexe">
            <div class="col-md-12" v-if="transaction.category === 'inflow'">
              <div class="row">
                <div class="col-md-8">
                  <el-dropdown trigger="click" class="w-100">
                    <span class="el-dropdown-link w-100">
                      <div class="d-flex justify-content-between border-contribution  w-100" size="large">
                        {{
                          !transaction.account
                          ? "Select"
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
                        <el-dropdown-item v-for="(accounts, index) in remittanceResult" :key="index">
                          <div class="col-md-12 px-2">
                            <!-- <h6 class="mb-0 text-capitalize font-weight-bold" v-if="accounts.length > 0">
                              {{ accountTypes[index] }}

                            </h6> -->
                            <div class="py-1" v-for="(account, indx) in accounts.value" :key="indx"
                              @click="selectAccount(1, indexe, account)">{{ account.text }}</div>
                          </div>
                        </el-dropdown-item>
                      </el-dropdown-menu>
                    </template>
                  </el-dropdown>
                </div>
                <div class="col-md-4 mb-2 adjust-screen mt-3 mt-sm-0 ">
                  <el-input type="text" class="w-100" v-model="transaction.amount" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div class="row mt-3" v-for="(transaction, indexe) in journalTransactions" :key="indexe">
          <div class=" col-md-12 label-text " v-if="transaction.category === 'outflow'">Destination Account</div>
          <div class="col-md-12" v-if="transaction.category === 'outflow'">
            <div class="row">
              <div class="col-md-8">
                <el-dropdown trigger="click" class="w-100">
                  <span class="el-dropdown-link w-100">
                    <div class="d-flex justify-content-between border-contribution  w-100" size="large">
                      {{
                        !transaction.account
                        ? "Select"
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
                      <el-dropdown-item v-for="(accounts, index) in remittanceResult" :key="index">
                        <div class="col-md-12 px-2">
                          <!-- <h6 class="mb-0 text-capitalize font-weight-bold" v-if="accounts.length > 0">
                            {{ accountTypes[index] }}

                          </h6> -->
                          <div class="py-1" v-for="(account, indx) in accounts.value" :key="indx"
                            @click="selectAccount(0, indexe, account)">{{ account.text }}</div>
                        </div>
                      </el-dropdown-item>
                    </el-dropdown-menu>
                  </template>
                </el-dropdown>
              </div>
              <div class="col-md-4 mb-2 adjust-screen mt-3 mt-sm-0 ">
                <el-input type="text" class="w-100" v-model="transaction.amount" />
              </div>
            </div>
          </div>
          <div class="col-md-12">
            <span v-if="journalTransactions.length > 2 && transaction.category === 'outflow' && indexe > 1 " class="col-1 px-1" @click="removeSplit(indexe)"><el-icon>
                <Delete />
              </el-icon></span>
          </div>
        </div>

      </div>


      <div>{{ totalAmount.amount }}</div>
      <div class="row mt-2">
        <div class="col-3 line pr-0">
          <hr />
        </div>
        <div class="col-md-6 mt-2 text-center split" @click="addRecord('outflow')">
          <!-- <el-tooltip class="box-item" effect="dark"
            content='Create multiple categories to associate(split) this trasaction between different accounts.'
            placement="top"> -->
          <!-- <el-tooltip class="box-item" effect="dark"
            content=''
            placement="top"> -->
            <div class="w-100">Split this {{ transactionDetails.account === 'Destination Account' ? ' Destination ' : ''
            }} <el-icon>
                <InfoFilled />
              </el-icon></div>
          <!-- </el-tooltip> -->

        </div>
        <div class="col-3 line pl-0">
          <hr />
        </div>
        <!-- <div class="error-div col-10 offset-1 mt-3" v-if="parseInt(totalAmount.amount) > transacObj.amount">
          <div class="row">
            <div class="col-1"><el-icon>
                <Warning />
              </el-icon></div>
            <p class="error-message col-10 pl-0">
              The sum of the above lines should not exceed the total deposit
              amount of {{ transacObj.amount }}
            </p>
          </div>
        </div> -->
        <div class="col-12 mt-4">
          <el-input v-model="note" type="textarea" :rows="3" class="w-100" />
        </div>
        <div class="col-12 mt-1 modified">
          Transaction last modified on {{ new Date(Date.now()).toLocaleDateString() }}
        </div>
        <!-- <div class="font-weight-bold col-md-12 mt-2">Receipt</div> -->
        <!-- <div class="col-md-12 ">
            <div class="row justify-content-center">
              <div class=" border rounded col-md-11 py-3 bg-white">
                <el-upload class="upload-demo col-md-12 mt-3 d-flex flex-column justify-content-center" action="" multiple
                  :on-remove="handleRemove" :show-file-list="true" :on-change="chooseFile" :limit="3">
                  <el-button class="primary--text " >Select a file to upload</el-button>
                  <template #tip>
                    <div class="el-upload__tip text-center">
                      files with a size less than 6MB.
                    </div>
                  </template>
                </el-upload>
              </div>
            </div>
          </div> -->
        <div class="col-6 offset-sm-3 mb-2 mt-3">
          <div class=" text-center cpon">
            <el-button class=" text-white border-0 d-flex justify-content-center" :loading="savingAccount"
              :color="primarycolor" round size="large" :disabled="unbalanced || savingAccount" @click="saveTransaction">
              <span>
                {{ transactionDetails.id ? 'Update' : 'Save' }}
              </span>
            </el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
  
<script>
import { ref, computed, nextTick, inject, watch, watchEffect, proxyRefs } from "vue";
import axios from "@/gateway/backendapi";
import transaction_service from "../../../services/financials/transaction_service";
// import chart_of_accounts from '../../../services/financials/chart_of_accounts';
import SearchMember from "../../../components/search/SearchMember"
import dateFormatter from "../../../services/dates/dateformatter";
import groupData from "../../../services/groupArray/groupResponse";
import store from "../../../store/store";
import { ElMessage } from 'element-plus'
export default {
  components: { SearchMember },
  props: ["transactionDetails", "journalEntry", "gettingSelectedTrsn"],
  setup(props, { emit }) {
    const fileImage = ref(false);
    const accountText = ref("");
    const selectedFileUrl = ref("");
    const accountType = ref([]);
    const remittanceResult = ref([]);
    const ungroupedRemittanceResult = ref([]);
    const primarycolor = inject('primarycolor')
    const liabilities = ref(["Credit Card", "Loan and Line of Credit"]);
    const uncategorizedText = ref("");
    const savingAccount = ref(false);
    const transactionDate = ref("");
    const memo = ref("");
    const note = ref("");
    const journalTransactions = ref([]);
    const iSoStringFormat = ref('')
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

    const selectAccount = (type, index, account) => {
      if (type === 0) {
        journalTransactions.value[index].debitAccountID = account.id;
        journalTransactions.value[index].account = account.text;
      } else {
        journalTransactions.value[index].creditAccountID = account.id;
        journalTransactions.value[index].account = account.text;
      }
    };
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
    const saveTransaction = async () => {
      savingAccount.value = true;
      if ((sumOfRecords(creditRecords.value) !== sumOfRecords(debitRecords.value)) || sumOfRecords(debitRecords.value) === 0) return false;
      const body = journalTransactions.value.map(i => {
        return {
          memo: memo.value,
          note: note.value,
          date: iSoStringFormat.value,
          debitAccountID: i.debitAccountID,
          creditAccountID: i.creditAccountID,
          amount: i.amount,
        }

      })

      try {
        const response = await transaction_service.saveJournalTransaction(body);
        if (response.data.status === true && response.status >= 200 && response.status <= 300) {
          ElMessage({
            type: "success",
            message: `The transaction was ${response.data.response}`,
            duration: 3000,
          });
          emit('entrysaved');
          savingAccount.value = false;
        } else if (response.data.status == false && response.data.response.toLowerCase().includes("must equal")) {
          ElMessage({
            type: "error",
            message: response.data.response,
            duration: 3000,
          });
          savingAccount.value = false;
        } else {
          ElMessage({
            type: "error",
            message: "Transaction failed, please try again",
            duration: 3000,
          });
          savingAccount.value = false;
        }
      } catch (error) {
        ElMessage({
          type: "error",
          message: "Transaction failed, please try again",
          duration: 3000,
        });
        console.log(error);
        savingAccount.value = false;
      }
    }

    const closeTransac = () => {
      emit("close-ledger")
    }

    const addRecord = (category) => {
      journalTransactions.value.push({ category: category, amount: 0.00 })
    }
    const unbalanced = computed(() => {
      const debitSum = sumOfRecords(debitRecords.value);
      const creditSum = sumOfRecords(creditRecords.value);
      return debitSum !== creditSum;
    })

    const debitRecords = computed(() => {
      if (!journalTransactions.value) return [];
      return journalTransactions.value.filter(i => i.category === "inflow");
    })

    const creditRecords = computed(() => {
      if (!journalTransactions.value) return [];
      return journalTransactions.value.filter(i => i.category === "outflow");
    })



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

    const handleRemove = () => {
      selectedFileUrl.value = "";
    }
    const chooseFile = (e) => {
      selectedFileUrl.value = ""
      console.log(e)
      if (e.raw.type.includes("image")) {
        selectedFileUrl.value = URL.createObjectURL(e.raw);
        fileImage.value = true;
        console.log(selectedFileUrl.value, 'hhhhh');
      } else {
        fileImage.value = false;
      }

    }

    const filterUncategorizedAsset = computed(() => {
      if (uncategorizedText.value !== "" && accountType.value.length > 0) {
        return accountType.value.filter((i) => {
          if (i)
            return i
              .toLowerCase()
              .includes(uncategorizedText.value.toLowerCase());
        });
      } else {
        return accountType.value;
      }
    });

    const filterUncategorizedLiabilities = computed(() => {
      if (uncategorizedText.value !== "" && liabilities.value.length > 0) {
        return liabilities.value.filter((i) => {
          if (i)
            return i
              .toLowerCase()
              .includes(uncategorizedText.value.toLowerCase());
        });
      } else {
        return liabilities.value;
      }
    });

    const sumOfRecords = (records) => {
      let sum = 0;
      for (let record of records) {
        sum += +record.amount;
      }
      return sum;
    }

    const totalAmount = computed(() => {
      if (!journalTransactions.value) return 0;
      const debits = journalTransactions.value.filter(i => i.category === "inflow");

      return sumOfRecords(debits);
    })

    


    const accountTypes = ["assets", "liability", "income", "expense", "equity"];
    const accTypes = ["assets", "liability", "equity", "income", "expense"];


    const getRemittanceAccount = () => {
      axios
        .get("/api/Financials/Accounts/GetRemittanceAccounts")
        .then((res) => {
          ungroupedRemittanceResult.value = res.data
          let groupedRemittance = groupData.groupData(res.data, "accountType");
          for (const prop in groupedRemittance) {
            remittanceResult.value.push({
              name: prop,
              value: groupedRemittance[prop],
            });
          }
        })
        .catch((err) => {
          NProgress.done();
          console.log(err);
        });
    };
    getRemittanceAccount();


    
    // const filteredCashandBank = computed(() => {
    //   if (!remittanceResult.value ||  remittanceResult.value.length === 0) return [];
    //   return remittanceResult.value.value.filter(i => i.text.toLowerCase().includes(accountText.value));
    // })

    const removeSplit = (index) => {
      if (journalTransactions.value.length > 2) {
        journalTransactions.value.splice(index, 2);

                } else {
                    ElMessage({
                        type: 'error',
                        showClose: true,
                        message: 'Cannot Delete, You must have at least one field',
                        duration: 5000
                    })
                }
      // journalTransactions.value.splice(index, 1);
     
    }
    watch(() => props.journalEntry, () => {
      if (props.journalEntry && props.journalEntry.date) {
        // console.log(props.journalEntry.date.toLocaleString().includes('T') ? props.journalEntry.date.toLocaleString().split('T')[0] : props.journalEntry.date.toLocaleString(), "jjjjjjj");
        memo.value = props.journalEntry.memo;
        note.value = props.journalEntry.note;
        transactionDate.value = props.journalEntry.date
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

    watchEffect(() => {
      if (transactionDate.value) {
        iSoStringFormat.value = dateFormatter.getISOStringGMT(transactionDate.value)
      }
    })

    return {
      selectAccount,
      saveTransaction,
      unbalanced,
      creditRecords,
      debitRecords,
      journalTransactions,
      memo,
      note,
      remittanceResult,
      ungroupedRemittanceResult,
      iSoStringFormat,
      accountText,
      filterAccount,
      accountType,
      filterLiabilities,
      liabilities,
      selectedFileUrl,
      uncategorizedText,
      filterUncategorizedAsset,
      filterUncategorizedLiabilities,
      closeTransac,
      addRecord,
      sumOfRecords,
      handleRemove,
      fileImage,
      totalAmount,
      transactionDate,
      chooseFile,
      primarycolor,
      accountTypes,
      accTypes,
      removeSplit,
      savingAccount
    };
  },
};
</script>
  
<style scoped>
.border-contribution {
  border: 1.6px solid rgb(255, 255, 255);
  border-radius: 4px;
  padding: 11px 7px;
  background-color: white;
}

#noTransfrom {
  transform: none !important;
  max-height: 300px;
  overflow: auto;
  top: inherit !important;
}

.hover-text {
  background-color: white;
}

.hover-text:hover {
  background-color: rgb(248, 247, 247);
}

.parent-desc.first {
  color: #8898aa;
  font-size: 15px;
  font-weight: 600;
  box-shadow: 0px 3px 6px #2c28281c;
  background: #dde2e6 0% 0% no-repeat padding-box;
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
}

.select-elem-con {
  padding: 5px 10px;
  border: 1px solid #ced4da;
  border-radius: 4px;
  justify-content: space-between;
  background: rgb(253, 253, 253);
}

.style-account {
  box-shadow: 0px 3px 15px #797e8159;
  position: absolute;
  background: white;
  z-index: 1;
  width: 130%;
  max-height: 14em;
  overflow-y: scroll;
}

.style-account div div div:hover {
  /* background-color: #ecf0f3; */
  cursor: pointer;
}

/* .input-width {
    width: 100%
  }
  
  .input-width {
    width: 100%
  }
  
  @media (min-width: 992px) {
    .input-width {
      width: 350px
    }
  
  } */

.style-uncategorized {
  box-shadow: 0px 3px 15px #797e8159;
  position: absolute;
  background: white;
  z-index: 1;
  width: 90%;
  max-height: 14em;
  overflow-y: scroll;
}

.style-uncategorized div div div:hover {
  /* background-color: #ecf0f3; */
  cursor: pointer;
}

.menu-height {
  max-height: 400px;
  overflow: scroll;
}

.desc-head {
  font-weight: 700;
}

.desc {
  color: #9b9a9c;
  /* opacity: 0.7; */
}

.vendor {
  color: #136acd;
  font-weight: 700;
  font-size: 0.8em;
}

.dot {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  align-self: center;
  background: #686868;
  margin-top: 5px;
}

.split {
  /* border: 2px solid #bebebe; */
  border-radius: 30px;
  font-size: 0.8em;
  font-weight: 700;
  padding: 4px;
  box-shadow: 0px 2px 6px 2px #2c28281c;
  cursor: pointer;
}

.line {
  position: relative;
  top: 5px;
  color: #686868;
}

.modified {
  font-size: 0.9em;
}

.label-text {
  font-size: 0.8em;
  font-weight: 700;
  margin-bottom: 5px;
}

.error-div {
  background: #fff8f8;
  border-color: #ffe9e9;
  padding: 10px 5px;
  margin-bottom: 24px;
  border-radius: 8px;
  border: 1px solid transparent;
  border-left: 5px solid #b52626;
}

.error-message {
  margin-bottom: 0;
  font-size: 0.9em;
}

.adjust-left {
  margin-left: 78px;
}
</style>