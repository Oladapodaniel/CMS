<template>
  <div class="container-fluid">
    <div class="row justify-content-between">
      <div class="mb-4">
        <div class="text-head font-weight-bold h2 py-0 my-0 text-black">
          Accounting Activity and Balance Report
        </div>
        <div @click="goBack">
          <span class="s-18 fw-400 cursor-pointer text-black">
            <img src="../../../assets/goback.png" alt="" /> Go back</span
          >
        </div>
      </div>
      <div class="c-pointer my-sm-0 my-2">
        <el-dropdown trigger="click" class="w-100">
          <div
            class="d-flex justify-content-between default-btn text-dark w-100"
            size="large"
          >
            <span class="mt-1 primary--text">Export</span>
            <div class="mt-1">
              <el-icon class="el-icon--right">
                <arrow-down />
              </el-icon>
            </div>
          </div>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item v-for="(bookType, index) in bookTypeList" :key="index">
                <a class="no-decoration text-dark" @click="downloadFile(bookType)">
                  {{ bookType.name }}
                </a>
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
    <div class="row justify-content-center py-5 border-radius-8 grey-backg">
      <div class="col-md-10 col-12">
        <div class="row">
          <div class="col-12 col-md-6 ">
            <div>
              <label for="" class="fw-400 text-dak s-14 w-100">Select Account</label>
            </div>

            <div>
              <el-select-v2
                v-model="selectedAccountID"
                class="w-100 font-weight-normal"
                :options="
                  accountType.map((i) => ({
                    label: i.name,
                    value: i.id,
                  }))
                "
                placeholder="Select Account"
                @change="setSelectedAccount"
                size="large"
              />
            </div>
          </div>
          <div class="col-12 col-md-6">
            <div class="">
              <label for="icon" class="fw-400 text-dak s-14 w-100">Start Date</label>
            </div>
            <div>
              <div>
                <el-date-picker
                  v-model="startDate"
                  type="date"
                  format="DD/MM/YYYY"
                  size="large"
                  class="w-100"
                />
              </div>
            </div>
          </div>
          <div class="col-12 col-md-6 mt-2 ">
            <div><label for="icon" class="fw-400 text-dak s-14 w-100">End Date</label></div>
            <div>
              <el-date-picker
                v-model="endDate"
                type="date"
                format="DD/MM/YYYY"
                size="large"
                class="w-100"
              />
            </div>
          </div>
          <div class="col-12 col-md-6">
            <label for=""></label>
            <div class="mt-2">
              <el-button
                @click="generateReport"
                round
                :color="primarycolor"
                :loading="loading"
                class=" w-100 py-4 "
                >Generate Report</el-button
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div id="element-to-print">
    <div class="container-fluid d-flex justify-content-center my-2" v-if="displayTitle">
      <div class="text-head font-weight-bold h2 ">Accounting Activity and Balance Report</div>
    </div>
    <section
      :class="{ 'show-report': showReport, 'hide-report': !showReport }"
      class="container-fluid"
    >
      <div class="row">
        <div
          class="container-top container-fluid table-main px-0 remove-styles2 remove-border responsiveness"
        >
          <table class="table remove-styles mt-0 table-header-area" id="table">
            <thead class="table-header-area-main">
              <tr
                class="font-weight-bold text-capitalize text-nowrap"
                style="border-bottom: 0"
              >
                <th scope="col">Date</th>
                <th scope="col">Account Name</th>
                <th scope="col">Ref Number</th>
                <th scope="col">Description</th>
                <th scope="col">Debit</th>
                <th scope="col">Credit</th>
                <th scope="col">Balance</th>
              </tr>
            </thead>
            <tbody class="font-weight-bold text-nowrap small-text">
              <tr v-for="(AccountList, index) in accountInChurch" :key="index">
                <td>{{ formatDate(AccountList.date) }}</td>
                <td>{{ AccountList.accountName }}</td>
                <td>{{ AccountList.refNumber }}</td>
                <td>{{ AccountList.description }}</td>
                <td class="text-success">
                  {{
                    AccountList && AccountList.currency ? AccountList.currency.symbol : ""
                  }}
                  {{ Math.abs(AccountList.debit).toLocaleString() }}.00
                </td>
                <td class="text-danger">
                  {{
                    AccountList && AccountList.currency ? AccountList.currency.symbol : ""
                  }}
                  {{ Math.abs(AccountList.credit).toLocaleString() }}.00
                </td>
                <td class="text-dark font-weight-bolder">
                  {{
                    AccountList && AccountList.currency
                      ? AccountList.currency.symbol
                      : ""
                  }}{{
                    typeof AccountList.balance === "number"
                      ? Math.abs(AccountList.balance).toLocaleString()
                      : "0"
                  }}
                </td>
              </tr>
            </tbody>
            <tbody class="font-weight-bolder text-nowrap" style="font-size: small">
              <tr class="answer-row">
                <td class="gross-total">Total Balance</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td class="gross-total">
                  {{
                    accountInChurch.length > 0
                      ? currentUser.currencySymbol +
                        accountInChurch[
                          accountInChurch.length - 1
                        ].balance.toLocaleString()
                      : 0
                  }}
                  <hr class="horizontal-rule" />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <!-- table header -->
      <!--end table header -->
    </section>
  </div>
</template>

<script>
import { computed, ref, inject } from "vue";

import axios from "@/gateway/backendapi";
import dateFormatter from "../../../services/dates/dateformatter";
import printJS from "print-js";
import router from "../../../router";
import exportService from "../../../services/exportFile/exportservice";
import currencyConverter from "../../../services/currency-converter/currencyConverter";

export default {
  setup() {
    const accountType = ref([]);
    const startDate = ref("");
    const endDate = ref("");
    const selectedAccount = ref({});
    const accountInChurch = ref([]);
    const acountID = ref([]);
    const showReport = ref(false);
    const showExport = ref(false);
    const displayTitle = ref(false);
    const primarycolor = inject("primarycolor");
    const loading = ref(false);
    const fileName = ref("Accounting Activity & Balance Report");
    const selectedAccountID = ref(null);
    const bookTypeList = ref([
      { name: "xlsx" },
      { name: "csv" },
      { name: "txt" },
      { name: "pdf" },
    ]);
    const selectedFileType = ref("");
    const fileHeaderToExport = ref([]);
    const fileToExport = ref([]);
    const currentUser = ref({});

    const sumDebit = computed(() => {
      if (accountInChurch.value.length === 0) return 0;

      let sumAllDebit = 0;
      accountInChurch.value.forEach((i) => {
        sumAllDebit += i.debit;
      });
      // console.log(summed)
      return sumAllDebit;
    });
    const sumCredit = computed(() => {
      if (accountInChurch.value.length === 0) return 0;
      let sumAllCredit = 0;
      accountInChurch.value.forEach((i) => {
        sumAllCredit += i.credit;
      });

      return sumAllCredit;
    });

    const sumBalance = computed(() => {
      if (accountInChurch.value.length === 0) return 0;
      let sumAllBalance = 0;
      accountInChurch.value.forEach((i) => {
        sumAllBalance += i.balance;
      });

      return sumAllBalance;
    });
    const goBack = () => {
      router.go(-1);
    };
    const downloadFile = (item) => {
      if (item.name === "pdf") {
        displayTitle.value = true;
      } else {
        displayTitle.value = false;
      }
      exportService.downLoadExcel(
        item.name,
        document.getElementById("element-to-print"),
        fileName.value,
        fileHeaderToExport.value,
        fileToExport.value
      );
    };

    const generateReport = () => {
      loading.value = true;
      axios
        .get(
          `/api/Reports/financials/getAccountActivityReport?startDate=${new Date(
            startDate.value
          ).toLocaleDateString("en-US")}&endDate=${new Date(
            endDate.value
          ).toLocaleDateString("en-US")}&accountID=${selectedAccount.value.id}`
        )
        .then((res) => {
          convertValues(res.data);
          setTimeout(() => {
            fileHeaderToExport.value = exportService.tableHeaderToJson(
              document.getElementsByTagName("th")
            );
            fileToExport.value = exportService.tableToJson(
              document.getElementById("table")
            );
          }, 1000);

          showReport.value = true;
          loading.value = false;
        })
        .catch((err) => {
          console.log(err);
          loading.value = false;
        });
    };
    const setSelectedAccount = () => {
      selectedAccount.value = accountType.value.find(
        (i) => i.id === selectedAccountID.value
      );
    };

    const convertValues = (data) => {
      try {
        accountInChurch.value = data.map((i) => {
          let converted = currencyConverter.currencyConverter(
            +i.balance,
            i.currency ? `usd${i.currency.shortCode.toLowerCase()}` : "",
            `usd${currentUser.value.currency.toLowerCase()}`
          );
          converted.then((res) => (i.balance = res)).catch((err) => console.log(err));
          return i;
        });
      } catch (err) {
        console.log(err);
      }
    };

    const getAllFinancialAccount = async () => {
      try {
        axios
          .get("/api/Reports/financials/getAllFinancialAccounts")
          .then((res) => {
            accountType.value = res.data;
          })
          .catch((err) => console.log(err));
      } catch (err) {
        console.log(err);
      }
    };
    getAllFinancialAccount();

    const amountTotal = computed(() => {
      return accountInChurch.value.reduce((acc, cur) => {
        return acc + cur.amount;
      }, 0);
    });

    const formatDate = (date) => {
      return dateFormatter.monthDayYear(date);
    };

    const getCurrentlySignedInUser = async () => {
      try {
        const res = await axios.get("/api/Membership/GetCurrentSignedInUser");

        currentUser.value = res.data;
      } catch (err) {
        /*eslint no-undef: "warn"*/
        console.log(err);
      }
    };
    getCurrentlySignedInUser();
    return {
      amountTotal,
      goBack,
      formatDate,
      accountType,
      startDate,
      endDate,
      selectedAccount,
      generateReport,
      accountInChurch,
      downloadFile,
      showReport,
      showExport,
      fileHeaderToExport,
      fileToExport,
      selectedFileType,
      selectedAccountID,
      setSelectedAccount,
      primarycolor,
      loading,
      bookTypeList,
      fileName,
      printJS,
      displayTitle,

      acountID,
      sumBalance,
      sumDebit,
      sumCredit,
      currentUser,
      convertValues,
    };
  },
};
</script>

<style scoped>
* {
  box-sizing: border-box;
}

.horizontal-rule {
  border-radius: 5px;
  margin: 0.125rem 0;
  background: white;
  height: 2px;
}

.show-report {
  display: block;
}
.hide-report {
  display: none;
}

.responsiveness {
  max-width: 100%;
  overflow-y: scroll;
}
.heading-text {
  font: normal normal 800 1.5rem Nunito sans;
}
/* 
.default-btn {
    font-weight: 600;
    white-space: initial;
    font-size: 1rem;
    border-radius: 3rem; 
    border: 1px solid #002044; 
    padding: .5rem 1.25rem;
    width: auto;
	border:none; 
     outline: transparent !important; 
     max-height: 40px;
    background: #6c757d47 !important;
    color:#000;
    text-decoration: none;
    min-width: 121px; 
} */

.default-btn:hover {
  text-decoration: none;
}

.generate-report {
  font-size: 1rem;
  color: #fff;
  background-color: #136acd !important ;
  border: none;
  min-width: 7rem;
}
.p-multiselect {
  width: 18rem;
}

.multiselect-custom {
  padding-top: 0.1rem;
  padding-bottom: 0.1rem;
}
.gross-total {
  font-weight: bolder;
  font-size: large;
  color: #fff;
}

.answer {
  font-size: 1.7em;
}

.answer-row {
  background-color: #136acd;
  border-radius: 30px !important;
  border-bottom-left-radius: 50px !important;
  border-bottom-right-radius: 50px !important;
  font-weight: bold;
  color: white;
}

/* .answer-row:hover{
  background-color: #d1d1d1;
} */

.country-item-value {
  padding: 0.25rem 0.5rem;
  border-radius: 3px;
  display: inline-flex;
  margin-right: 0.5rem;
  /* background-color:  */
  /* background-color: var(--primary-color); */
  /* color: var(--primary-color-text); */
}
.border {
  border-color: #b0b2b5 !important;
  border-radius: 15px !important;
}
.borderInner {
  width: 100%;
  height: 200px;
}
.table {
  width: 100% !important;
  box-shadow: none !important;
  border: none !important;
  text-align: left;
  margin-bottom: auto !important;
  padding-bottom: 0.5rem;
}

.table thead th {
  font-weight: 400 !important;
  color: #000000 !important;
  font-weight: 500 !important;
  font-size: 14px !important;
}
.table tbody tr{
  font-weight: 400 !important;
  color: #000000 !important;
  font-weight: 400 !important;
  font-size: 14px !important;
}

.table-header-area-main {
  background-color: #F4F4F4;
}

.table-header-area {
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}


.table-main {
  width: 100% !important;
  box-shadow: 0 0.063rem 0.25rem #02172e45 !important;
  border: 0.063rem solid #dde2e6 !important;
  border-radius: 30px !important;
  text-align: left !important;
  margin-bottom: auto !important;
  padding-bottom: 0.5rem !important;
}

.remove-styles {
  border: none !important;
  box-shadow: none !important;
  border-bottom: 0 !important;
  border-bottom-left-radius: 0 !important;
  border-bottom-right-radius: 0 !important;
}

.remove-styles2 {
  padding-right: 0;
  padding-left: 0;
  border-top-left-radius: 0 !important;
  border-top-right-radius: 0 !important;
}

.remove-border {
  box-shadow: none !important;
}
img.flag {
  width: 17px;
}
.primary-bg {
  background-color: rgb(19, 106, 205) !important;
  border-style: none !important;
}
.p-button.p-button-icon-only {
  background-color: red !important;
}

@media screen and (max-width: 640px) {
  .p-multiselect {
    width: 100%;
  }
}
</style>
