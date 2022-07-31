<template>
  <!-- <div class="container-wide container-top"> -->
        <div class="top container-wide mt-3">
          <div class="row">
              <div class="col-sm-12">
                <div class="page-header">Offering Category</div>
                <hr class="hr"/>
              </div>
            </div>
        </div>
        <Dialog v-model:visible="displayResponsive" :breakpoints="{'960px': '75vw', '640px': '100vw'}" :style="{width: '80vw'}">
            <p>You have no income account to create a offering item, go to Chart of Account and click 'Update Account' to update your accounts.</p>
            <template #footer>
                <!-- <Button label="No" icon="pi pi-times" @click="closeResponsive" class="p-button-text"/> -->
                <Button label="Go to Chart Of Accounts" icon="pi pi-check" @click="closeResponsive" autofocus />
            </template>
        </Dialog>

    <!-- input area -->
    <div class="container-wide">
      <div class="row my-5 mx-auto">
        <div class="col-sm-4 mt-3 mt-sm-3 text-sm-right">
           <label for="" class="label">Name</label>
        </div>
      <div class="col-sm-5 mt-sm-3">


          <input
            type="text"
            class="form-control textbox-height"
            placeholder=""
            v-model="name"
            required
          />

      </div>
      <div class="col-sm-4 mt-3 mt-sm-3 text-sm-right">
           <label for="" class="label">Income Account</label>
      </div>
      <div class="col-sm-5 mt-sm-3">
          <Dropdown v-model="selectedIncomeAccount" class="w-100 p-0" :options="incomeAccount" optionLabel="text" :filter="false" placeholder="Select" :showClear="false">
          </Dropdown>
      </div>
      <div class="col-sm-4 mt-3 mt-sm-3 text-sm-right">
           <label for="" class="label">Cash Account</label>
        </div>
      <div class="col-sm-5 mt-sm-3">
          <Dropdown v-model="selectedCashAccount" :options="cashBankAccount" optionLabel="text" :filter="false" placeholder="Select" class="w-100 p-0" :showClear="false">
          </Dropdown>
        </div>

        <div class="col-sm-12 mt-4" @click="toggleRem">
          <div class="row">
              <div class="col-sm-12 d-flex">
                  <i class="check-it mr-2">
                  <span class="child" v-if="applyRem"></span>
                </i>
                <h6>Apply Split/Remitance</h6>
              </div>
          </div>
        </div>
      <div class="col-sm-12 mt-3" v-if="applyRem">
        <hr class="hr"/>
      </div>
      <div class="col-12 pl-0" v-if="applyRem">

      </div>

        <div class="col-lg-6 offset-lg-4" v-if="applyRem">
        <div v-for="(item, index) in remitance" :key="index">
        <div class="row mt-3 mb-4">
          <div class="col-5 col-sm-6">
            <div class="">Account</div>
            <!-- <h5>Responsive</h5> -->
            <!-- <Button label="Show" icon="pi pi-external-link" @click="openResponsive" /> -->
          <!-- <Dropdown v-model="item.account" class="w-100  mt-2" :options="remittanceResult" optionLabel="name" optionGroupLabel="text" optionGroupChildren="value" :filter="false" placeholder="Select" :showClear="false">
          </Dropdown> -->
         
      <div class="dropdown">
          <div class="d-flex justify-content-between align-items-center c-pointer border p-2 w-100  mt-2" id="dropdownMenuButton" data-toggle="dropdown" style="border-radius: 4px">
            <div>{{ item.account ? item.account.text : "Select account" }}</div>
            <i class="pi pi-chevron-down"></i>
          </div>
          <div
          class="dropdown-menu w-100 dropdown-height"
          aria-labelledby="dropdownMenuButton"
          >
          <div
              
              v-for="(remitance, indexRemit) in remittanceResult"
              :key="indexRemit"
              >
              <div class="pl-2 py-2 font-weight-700 border-bottom">{{ remitance.name }}</div>
              <div v-for="(value, indexValue) in remitance.value" :key="indexValue" class="dropdown-item c-pointer py-2" @click="setRemittance(value, index)">{{ value.text }}</div>
              </div>
              
          </div>
      </div>
          </div>

          <div class="col-5 col-sm-4 pl-sm-0">
            <div class="">Percentage %</div>

            <div class="mt-2">
              <input type="number" v-model="item.percentage" class="form-control textbox-height" placeholder="" />
            </div>
          </div>
          <div class="col-1 mt-4 align-self-center" @click="deleteItem(index)">
            <i class="pi pi-trash"></i>
          </div>
        </div>
        </div>
        <div class="row">
          <div class="col-10 mt-3 text-right">Percentage Remaining: <span class="font-weight-700">{{ sumPercentage ? sumPercentage.percentage ? 100 - +sumPercentage.percentage : 0 : 0 }}%</span></div>
          <div class="col-10 mt-3 text-right" v-if="selectedCashAccount">The percentage remaining goes to <span class="font-weight-700">{{ selectedCashAccount ? selectedCashAccount.text : "" }}</span></div>
        </div>
      </div>

      <!--end of diisplay bottom area -->

    </div>
    <div class="row">
          <div class="col-2 mt-3 mb-3 offset-sm-4" v-if="applyRem">
          <button
              v-on:click="addRemittance"
              class="btn btnIcons btn-secondary"
            >
              <i class="pi pi-plus-circle icons" aria-hidden="true"></i>
              Add
            </button>
          </div>
          <div class="col-5 mt-3 mb-3 offset-4" :class="{ 'col-sm-2 offset-sm-1' : applyRem }">
          <button class="add-person-btn button default-btn border-0 w-100" @click="save">
            Save
          </button>
        </div>
        </div>
    </div>

    <!-- End input area -->

    <!-- elipse Area -->

    <!-- End of elipse Area -->

    <!-- diisplay bottom area -->



    <Toast />
  <!-- </div> -->
</template>









<script>
import { computed, ref } from "vue";
import axios from "@/gateway/backendapi";
import Dropdown from 'primevue/dropdown';
import Dialog from 'primevue/dialog';
import Toast from 'primevue/toast';
import { useToast } from "primevue/usetoast";
import { useRouter } from "vue-router"
import { useRoute } from "vue-router"
import groupData from "../../../services/groupArray/groupResponse"
export default {
  components: {
    Dropdown, Toast, Dialog
  },
  setup() {
    const router = useRouter()
    const route = useRoute()
    const applyRem = ref(false);
    const cashBankAccount = ref([]);
    const remitance = ref([{}])
    const incomeAccount = ref([])
    const selectedIncomeAccount = ref(null)
    const selectedCashAccount = ref(null)
    const name = ref("")
    const toast = useToast();
    const displayResponsive = ref(false);
    const remittanceAccounts = ref([])
    const remittanceResult = ref([])


    const toggleRem = () => {
      applyRem.value = !applyRem.value;
    };

    const getCashBankAccount = () => {
        axios.get('/api/financials/accounts/getcashbankaccounts')
          .then(res => {
            console.log(res.data)
            cashBankAccount.value = res.data
            x(route.params.offId)
            console.log(cashBankAccount.value, "🎁🎁🎁");
          })
          .catch (err => {
            console.log(err)
          })
    }
    getCashBankAccount()

    const deleteItem = (index) => {
      if (remitance.value.length > 1) {
        remitance.value.splice(index, 1)
      } else {
         toast.add({
          severity: "error",
          summary: "Cannot delete",
          detail: `You must have at least one field to apply for remittance`,
          life: 5000,
        });
      }
    }

    const addRemittance = () => {
      console.log(sumPercentage.value)
      if (100 - +sumPercentage.value.percentage <= 0) {
        toast.add({
          severity: "error",
          summary: "Limit Reached",
          detail: ` You have ${sumPercentage.value.percentage}% remittance percentage, The sum of the percentages should not exceed the 100%`,
          life: 5000,
        });
      }  else {
        remitance.value.push({
          percentage: 0
        })
      }
    }

    const getIncomeAccount = ()=> {
      axios.get('/api/Financials/Accounts/GetIncomeAccounts')
        .then(res => {
            /*eslint no-undef: "warn"*/
            NProgress.done();
            console.log(res.data.length)
          incomeAccount.value = res.data
          if (res.data.length < 1) {
            displayResponsive.value = true
          }
        })
        .catch(err => {
            NProgress.done();
            console.log(err)
        })
    }
    getIncomeAccount()
   
   const getRemittanceAccount = ()=> {
      axios.get('/api/Financials/Accounts/GetRemittanceAccounts')
        .then(res => {
            /*eslint no-undef: "warn"*/
            NProgress.done();
            console.log(res)
            // remittanceAccounts.value = res.data
            let groupedRemittance = groupData.groupData(res.data, 'accountType')
            // console.log(groupedRemittance)


            for (const prop in groupedRemittance) {
              remittanceResult.value.push({
                name: prop,
                value: groupedRemittance[prop]
              })
              console.log(remittanceResult.value)
            }

        })
        .catch(err => {
            NProgress.done();
            console.log(err)
        })
    }
    getRemittanceAccount()

    const createOfferingItems = (contributionCategory) => {
      axios.post('/api/financials/contributions/items/save', contributionCategory)
            .then(res => {
              toast.add({severity:'success', summary: 'Saved', detail:'Contribution Saved', life: 3000});
              console.log(res)
              router.push({ name: "ContributionCategory" })
            })
            .catch(err => {
              toast.add({severity:'error', summary: 'Error', detail:'Not Sucessful', life: 3000});
              console.log(err)
            })
    }

    const editOfferingItems = (contributionCategory) => {
      contributionCategory.id = route.params.offId
       axios.put(`/api/Financials/Contributions/Items/edit`, contributionCategory)
            .then(res => {
              toast.add({severity:'success', summary: 'edited', detail:'Edit Succefully', life: 3000});
              console.log(res)
              router.push({ name: "ContributionCategory" })
            })
            .catch(err => {
              toast.add({severity:'error', summary: 'Error', detail:'Not Sucessful', life: 3000});
              console.log(err)
            })
    }

    const save = () => {
      let contributionCategory = {
        name: name.value,
        incomeAccountId: selectedIncomeAccount.value ? selectedIncomeAccount.value.id : "",
        cashAccountId: selectedCashAccount.value ? selectedCashAccount.value.id : "",
        incomeRemittance: remitance.value
      }
        if (remitance.value[0].account || remitance.value[0].percentage) {
                contributionCategory.incomeRemittance = remitance.value.map(i => {
                  if (!i.account.financialFundID) delete i.account.financialFundID
                  return {
                    financialFundID: i.account.financialFundID,
                    distinationIncomeAccount: i.account.id,
                    percentage: i.percentage
                  }
                })
              } else {
                contributionCategory.incomeRemittance = null
              }
              console.log(contributionCategory)
       if (selectedIncomeAccount.value && selectedCashAccount.value) {
         if (route.params.offId) {
               editOfferingItems(contributionCategory)
         } else { 
           createOfferingItems(contributionCategory)
           console.log(remitance.value)
           }
       }  else {
          toast.add({
            severity: "error",
            summary: "No account selected",
            detail: `Please select an income and cash account`,
            life: 5000,
          });
       }
    }
    const sumPercentage = computed(() => {
      if (remitance.value.length === 0) return 0
      return remitance.value.reduce((a, b) => {
          return { percentage: +a.percentage + +b.percentage }
      })
    })

    const openResponsive = () => {
            displayResponsive.value = true;
        }
    const closeResponsive = () => {
            displayResponsive.value = false;
            router.push({ name: "ChartOfAccount" })
        }

        const x = id => {
          selectedCashAccount.value = cashBankAccount.value.find(i => {
            return i.id  === id
          })
        }

    const getOffItems = async() => {
      if(route.params.offId) {
        try {
          let  res = await axios.get(`/api/Financials/Contributions/Items/One?ID=${route.params.offId}`)
          name.value = res.data.name
          selectedIncomeAccount.value = incomeAccount.value.find(i => {
            return i.id  === res.data.incomeAccountID
          })
          // selectedCashAccount.value = cashBankAccount.value.find(i => {
          //   return i.id  === res.data.cashAccountID
          // })
          x(res.data.cashAccountID)
          // isPublic.
          console.log(res.data)
         console.log( name.value, "💐💐💐");
         console.log(selectedIncomeAccount.value, "💐💐💐");
        }
        catch (err) {
          console.log(err)
        }
      }
    }
    getOffItems()

    const setRemittance = (data, index) => {
      remitance.value[index].account = data
    }

    return {
      applyRem, toggleRem, cashBankAccount, remitance, addRemittance, incomeAccount, save, selectedIncomeAccount, name, selectedCashAccount, toast, deleteItem, sumPercentage, openResponsive, closeResponsive, displayResponsive, createOfferingItems, editOfferingItems, remittanceAccounts, remittanceResult, setRemittance
    };
  },
};
</script>

<style scoped>
.btnIcons {
  width: 110px;
  /* height: 35px; */
  color: #136acd;
  background-color: #dde2e6;
  border-radius: 40px;
  border: none;
  padding: .5rem 1.25rem;
}

.check-it {
  border: 2px solid #136acd;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  margin-top: -1px;
}

.icons {
  color: #136acd;
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

* {
  box-sizing: border-box;
  color: #02172e;
}
.page-header {
  font: normal normal 800 29px Nunito sans;
}

.hr {
  border: 0.8px solid #0020440a;
  /* margin: 0 45px; */
}

.add-person-btn {
  background: #136acd;
  color: #fff;
}

@media screen and (min-width: 1400px) {
  .main-con {
    width: 90%;
    margin: 0 auto;
  }
}

.textbox-height {
  height: 41px
}
@media screen and (max-width: 360px) {
  .page-header {
    padding-top:31px;
  }
}

.error-div {
  background: #fff8f8;
  border-color: #ffe9e9;
  padding: 25px 10px;
  margin-bottom: 24px;
  border-radius: 8px;
  border: 1px solid transparent;
  border-left: 5px solid #b52626;
}

.error-message {
  margin-bottom: 0;
  font-size: 0.9em;
}

.dropdown-height {
  max-height: 300px;
  overflow: scroll;
}


</style>


