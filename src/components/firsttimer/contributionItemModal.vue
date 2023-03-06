<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-4 pr-0 text-lg-right align-self-center">
        <label>Name</label>
      </div>
      <div class="col-lg-5 col-sm-12 my-auto">
        <el-input class="textbox-height w-100" v-model="name" required />
      </div>

      <div class="col-sm-4 mt-3 text-lg-right pr-0 align-self-center">
        <label>Income Account</label>
      </div>
      <div class="col-lg-5 dropdown col-sm-12 mt-lg-3">
        <el-select-v2
          v-model="setSelectedAccount"
          class="w-100 font-weight-normal"
          :options="
            incomeAccount.map((i) => ({
              label: i.text,
              value: i.id,
            }))
          "
          placeholder="Select"
          @change="incomeSelectedAccount"
          size="large"
        />
      </div>

      <div class="col-sm-4 mt-3 text-lg-right pr-0">
        <label>Cash Account</label>
      </div>
      <div class="col-lg-5 dropdown col-sm-12 mt-lg-3">
        <el-select-v2
          v-model="setSelectedCashAccount"
          class="w-100 font-weight-normal"
          :options="
            cashBankAccount.map((i) => ({
              label: i.text,
              value: i.id,
            }))
          "
          placeholder="Select Account"
          @change="setCahAccountType"
          size="large"
        />
      </div>

      <div class="col-sm-12 d-flex mt-3" @click="toggleRem">
        <i class="check-it mr-2">
          <span class="child" v-if="applyRem"></span>
        </i>

        <h6>Apply Remitance</h6>
      </div>
      <div class="col-sm-12 mt-3" v-if="applyRem">
        <hr class="hr" />
      </div>
    </div>

    <div v-if="applyRem">
      <div class="row" v-for="(item, index) in remitance" :key="index">
        <div class="col-sm-4 mt-3 text-lg-right pr-0 align-self-center">
          <label>Income Account</label>
        </div>
        <div class="col-lg-5 col-sm-12 mt-lg-3">
          <el-select-v2
            v-model="setSelectedAccount"
            class="w-100 font-weight-normal"
            :options="
              incomeAccount.map((i) => ({
                label: i.text,
                value: i.id,
              }))
            "
            placeholder="Select"
            @change="incomeSelectedAccount"
            size="large"
          />
        </div>

        <div class="col-sm-4 text-lg-right align-self-center mt-3">
          <label>Percentage %</label>
        </div>
        <div class="col-lg-5 col-sm-12 mt-lg-3">
          <input
            type="text"
            class="form-control textbox-height w-100"
            placeholder=""
            v-model="item.percentage"
            required
          />
        </div>

        <div class="col-sm-3 col-12 adjust-down mt-3 d-flex align-items-center">
          <el-button v-on:click.prevent="addRemittance" text round>
            <el-icon><CirclePlus /></el-icon>&nbsp;
            Add
          </el-button>
          <!-- <button
            v-on:click.prevent="addRemittance"
            class="btn btnIcons btn-secondary"
          >
            <i class="pi pi-plus-circle icons" aria-hidden="true"></i>
            Add
          </button> -->
          <div @click="deleteItem(index)" class="ml-3">
            <el-icon><Delete /></el-icon>
        </div>
        </div>
      </div>
    </div>
  </div>
  <div
    class="modal-footer d-flex justify-content-center mt-4 ml-5"
    style="border: none"
  >
    <button type="button" class="btn secondary-btn px-5" data-dismiss="modal">
      Close
    </button>
    <button
      class="add-person-btn button default-btn border-0"
      @click.prevent="createNewCon"
    >
      Save
    </button>
  </div>
</template>

<script>
import { ref } from "vue";
import Dropdown from "primevue/dropdown";
import axios from "@/gateway/backendapi";
import { useToast } from "primevue/usetoast";
import finish from "../../services/progressbar/progress";

export default {
  components: {
    Dropdown,
  },
  setup(props, { emit }) {
    const toast = useToast();
    const name = ref("");
    const selectedIncomeAccount = ref("");
    const incomeAccount = ref([]);
    const selectedCashAccount = ref([]);
    const cashBankAccount = ref([]);
    const applyRem = ref(false);
    const remitance = ref([{}]);
    const setSelectedAccount = ref();
    const setSelectedCashAccount = ref();

    const cashAccountType = (item) => {
      selectedCashAccount.value = item;
    };
    const inComeAccount = (item) => {
      selectedIncomeAccount.value = item;
      // item.account = item
    };
    const selectInComeAccount = (item, index) => {
      remitance.value[index].account = item;
    };
    const getIncomeAccount = () => {
      axios
        .get("/api/Financials/Accounts/GetIncomeAccounts")
        .then((res) => {
          /*eslint no-undef: "warn"*/
          NProgress.done();
          console.log(res);
          incomeAccount.value = res.data;
          if (res.data.length < 1) {
            emit("show-update-modal", true);
          }
        })
        .catch((err) => {
          NProgress.done();
          console.log(err);
        });
    };
    getIncomeAccount();

    const getCashBankAccount = () => {
      axios
        .get("/api/financials/accounts/getcashbankaccounts")
        .then((res) => {
          console.log(res.data);
          cashBankAccount.value = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getCashBankAccount();

    const toggleRem = () => {
      applyRem.value = !applyRem.value;
    };

    const deleteItem = (index) => {
      remitance.value.splice(index, 1);
    };

    const addRemittance = () => {
      remitance.value.push({});
    };

    const incomeSelectedAccount = () => {
      selectedRange.value = incomeAccount.value.find(
        (i) => i.id == setSelectedAccount.value
      );
    };

    const setCahAccountType = () => {
      setSelectedAccount.value = cashBankAccount.value.find(
        () => i.id == setSelectedCashAccount.value
      );
    };

    const createNewCon = (e) => {
      let contributionCategory = {
        name: name.value,
        incomeAccountId: selectedIncomeAccount.value.id,
        cashAccountId: selectedCashAccount.value.id,
      };
      if (remitance.value[0].account || remitance.value[0].percentage) {
        contributionCategory.incomeRemittance = remitance.value.map((i) => {
          return {
            financialFundID: i.account.financialFundID,
            distinationIncomeAccount: i.account.id,
            percentage: i.percentage,
          };
        });
      } else {
        contributionCategory.incomeRemittance = null;
      }
      console.log(contributionCategory);
      axios
        .post("/api/financials/contributions/items/save", contributionCategory)
        .then((res) => {
          finish();
          emit("item-name", { name: res.data.name, id: res.data.id });
          toast.add({
            severity: "success",
            summary: "Saved",
            detail: "Contribution Saved",
            life: 3000,
          });
          console.log(res);
        })
        .catch((err) => {
          finish();
          toast.add({
            severity: "error",
            summary: "Error",
            detail: "Not Successful",
            life: 3000,
          });
          console.log(err);
        });
      e.target.setAttribute("data-dismiss", "modal");
    };

    return {
      cashAccountType,
      inComeAccount,
      selectInComeAccount,
      name,
      selectedIncomeAccount,
      incomeAccount,
      selectedCashAccount,
      cashBankAccount,
      applyRem,
      toggleRem,
      deleteItem,
      remitance,
      addRemittance,
      createNewCon,
      incomeSelectedAccount,
      setCahAccountType,
      setSelectedAccount,
      setSelectedCashAccount,
    };
  },
};
</script>

<style scoped>
.check-it {
  border: 2px solid #136acd;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  margin-top: -1px;
}
.scroll {
  max-height: 300px;
  overflow-y: scroll;
  overflow-x: hidden;
}

.check-it .child {
  /* border: 2px solid red; */
  display: inline-block;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #136acd;
  position: relative;
  left: 3px;
  top: -4px;
}

.btnIcons {
  width: 110px;
  height: 41px;
  color: #136acd;
  background-color: #dde2e6;
  border-radius: 40px;
  border: none;
}

.hr {
  border: 0.8px solid #0020440a;
  /* margin: 0 45px; */
}

.adjust-down {
  align-self: flex-end;
}

.add-person-btn {
  background: #136acd;
  color: #fff;
}
</style>