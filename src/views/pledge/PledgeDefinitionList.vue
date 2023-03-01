<template>
    <div class="container-fluid">
      <div class="row d-flex flex-column flex-sm-row justify-content-sm-between ">
        <div class="head-text">Partnership and Pledge Item</div>
        <router-link
          to="/tenant/pledge/pledgedefinition"
          class="
            grey-border
            primary-btn
            default-btn
            text-white
            text-decoration-none
            primary-bg
            border-0
            mt-3
            mt-md-0
          "
          >Create New
        </router-link>
        <div class="col-md-12 px-0">
          <hr class="hr my-3" />
        </div>
      </div>
      <div class="row">
        <div class="col-12 px-0" id="table">
          <div class="top-con" id="ignore2">
            <div class="table-top">
              <div class="col-4 my-3">
                <el-input size="small" v-model="searchText" placeholder="Search..."
                  @keyup.enter.prevent="searchPledgeInDB" class="input-with-select">
                  <template #append>
                    <el-button @click.prevent="searchPledgeInDB">
                      <el-icon :size="13">
                        <Search />
                      </el-icon>
                    </el-button>
                  </template>
                </el-input>
              </div>
            </div>{{balance}}
          </div>
          <Table  :data="searchPledge" :headers="pledgeHeaders" :checkMultipleItem="false" 
            v-loading="loading">
            <template v-slot:name="{ item }">
              <div class="c-pointer" @click="pledgeClick(item.id)">{{ item.name }}</div>
            </template>
            <template v-slot:pledgeAmount="{ item }">
              <div class="c-pointer" @click="pledgeClick(item.id)">{{
                          item && item.currency
                            ? item.currency.symbol
                            : ""
                        }}
                        {{
                          Math.abs(
                            item.donorPaymentSpecificAmount ? item.donorPaymentSpecificAmount : item.totalPledgeAmount
                          ).toLocaleString()
                        }}.00</div>
            </template>
            <template v-slot:redeemed="{ item }">
              <div class="c-pointer" @click="pledgeClick(item.id)">{{item.currencySymbol}}{{ Math.abs(item.totalPaymentsAmount).toLocaleString() }}..00</div>
            </template>
            <template v-slot:balance="{ item }">
              <div class="c-pointer text-danger" @click="pledgeClick(item.id)">{{item.currencySymbol}}{{ item.totalPaymentsAmount - item.totalPledgeAmount }}..00</div>
            </template>
            <template v-slot:date="{ item }">
              <div class="c-pointer"  @click="pledgeClick(item.id)">{{ date(item.date) }}</div>
            </template>
            <template v-slot:pledgeCount="{ item }">
              <div class="c-pointer"  @click="pledgeClick(item.id)">{{ item.pledgeCount }}</div>
            </template>
            <!-- <template v-slot:paymentLink="{ item }">
                <router-link
                    target="_blank"
                    :to="`/partnership/pay/${item.id}`"
                    class="text-color text-primary text-decoration-none"
                  >
                  PaymentLink
                </router-link>
            </template> -->
            <template v-slot:action="{ item }">
              <el-dropdown trigger="click">
                <el-icon>
                  <MoreFilled />
                </el-icon>
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item>
                      <router-link
                          target="_blank"
                          :to="`/partnership/pay/${item.id}`"
                          class="text-color"
                        >
                          Payment link 
                      </router-link>
                    </el-dropdown-item>
                    <el-dropdown-item>
                      <router-link
                          :to="`/tenant/pledge/pledgedefinition?id=${item.id}`"
                          class="text-color"
                        >
                          Edit 
                      </router-link>
                    </el-dropdown-item>
                    <el-dropdown-item>
                      <div @click.prevent="showConfirmModal(item.id, index)" class="text-color">Delete</div>
                    </el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
            </template>
          </Table>
        </div>
      </div>
    </div>
</template>

<script>
import { ref, computed } from "vue";
import finish from "../../services/progressbar/progress"
import axios from "@/gateway/backendapi";
import InputText from "primevue/inputtext";
import monthDayYear from "../../services/dates/dateformatter";
import router from "../../router";
import Table from "@/components/table/Table";
import { ElMessage, ElMessageBox } from 'element-plus'

export default {
  components: {
    Table,
    InputText,
  },
  setup() {
    const loading = ref(false);
    const searchText = ref("");
    const selectedPledge = ref("");
    const allPledgeType = ref([]);
    const selectedPerson = ref("");
    const allPledgeList = ref([]);
    const pledgeHeaders = ref([
      { name: 'NAME', value: 'name' },
      { name: 'PLEDGE AMOUNT', value: 'pledgeAmount' },
      { name: 'REDEEMED', value: 'redeemed' },
      { name: 'BALANCE', value: 'balance' },
      { name: 'DATE', value: 'date' },
      { name: 'NO. OF PLEDGES', value: 'pledgeCount' },
      // { name: 'LINK', value: 'paymentLink' },
      { name: 'ACTION', value: 'action' },
    ])

    const date = (offDate) => {
      return monthDayYear.monthDayYear(offDate);
    };
    const chooseContact = (payload) => {
      selectedContact.value = payload;
    };


    const getAllPledgeDefinition = async () => {
      loading.value = true;
      try {
        const res = await axios.get("/api/Pledge/GetAllPledgeDefinitions");
        finish();
        allPledgeList.value = res.data.returnObject;
        loading.value = false;
        console.log(allPledgeList.value, "getPledgeDefinition");
      } catch (error) {
        console.log(error);
        loading.value = false;
      }
    };
    getAllPledgeDefinition();

    const balance = computed(() =>{
      // return allPledgeList.value.totalPaymentsAmount - allPledgeList.value.totalPledgeAmount
      console.log(allPledgeList.value.totalPaymentsAmount - allPledgeList.value.totalPledgeAmount);
    })

    
    const searchPledge = computed(() => {
      if (searchText.value !== "" && allPledgeList.value.length > 0) {
        return allPledgeList.value.filter((i) => {
          if (i.name)
            return i.name
              .toLowerCase()
              .includes(searchText.value.toLowerCase());
        });
      } else {
        return allPledgeList.value;
      }
    });
    const searchPledgeInDB = () => {
      if (searchText.value !== "" && allPledgeList.value.length > 0) {
        return allPledgeList.value.filter((i) => {
          if (i.name)
            return i.name
              .toLowerCase()
              .includes(searchText.value.toLowerCase());
        });
      } else {
       return allPledgeList.value;
      }
    };

    const deletePledge = (id) => {
      axios
        .delete(`/api/Pledge/DeletePledgeDefinition?ID=${id}`)
        .then((res) => {
          console.log(res);
          ElMessage({
            type: 'success',
            message: 'Pledge form deleted',
            duration: 5000
          })
          allPledgeList.value = allPledgeList.value.filter(
            (pledgelist) => pledgelist.id !== id
          );
        })
        .catch((err) => {
          finish();
          if (err.response.status === 400) {
            ElMessage({
            type: 'error',
            message: 'Unable to delete',
            duration: 5000
          })
          } else {
            ElMessage({
            type: 'error',
            message: 'Unable to delete, An error occurred, please try again',
            duration: 5000
          })
          }
        });
    };

    const showConfirmModal = (id, index) => {
        ElMessageBox.confirm(
        "Are you sure you want to proceed?",
        'Confirm delete',
        {
          confirmButtonText: 'OK',
          cancelButtonText: 'Cancel',
          type: 'error',
        }
      )
        .then(() => {
           deletePledge(id, index);
        })
        .catch(() => {
          ElMessage({
            type: 'info',
            message: 'Delete canceled',
            duration: 5000
          })
        })
    };

    const pledgeClick = (id) => {
      router.push(`/tenant/pledge/pledgedefinition?id=${id}`);
    };

    return {
      allPledgeList,
      balance,
      searchPledgeInDB,
      searchPledge,
      chooseContact,
      showConfirmModal,
      deletePledge,
      loading,
      searchText,
      selectedPledge,
      selectedPerson,
      allPledgeType,
      date,
      pledgeClick,
      pledgeHeaders
    };
  },
};
</script>

<style scoped>
.events {
  font: normal normal 800 29px Nunito sans;
}
.dropdown-menu a {
  color: #02172e;
}
.link a {
  text-decoration: none;
}

.link a:hover {
  color: #fff;
}
.text-color {
  color: #212529;
  text-decoration: none;
}
.text-color:hover {
  color: #007bff;
}

.table {
  width: 100% !important;
  box-shadow: 0px 1px 3px #02172e45;
  border: 1px solid #dde2e6;
  border-radius: 15px;
  text-align: left;
  margin-bottom: auto !important;
}
.table-top {
  font-weight: 800;
  font-size: 12px;
  background: #fff;
  border: 1px solid #e0e0e0;
  border-bottom: none;
  display: flex;
  justify-content: flex-end;
}
.table-top label:hover,
.table-top p:hover {
  cursor: pointer;
}

@media screen and (min-width: 500px) {
  .theader {
    width: 23%;
  }
  .table-body .check {
    width: 3%;
  }
  .action {
    width: 5%;
  }
}

@media screen and (max-width: 1024px) {
  .my-con {
    flex-direction: column;
  }
  .table {
    width: 98%;
    margin: 24px auto;
  }
  .summary {
    width: 98%;
    margin: auto;
  }
}

.table-footer {
  display: flex;
  justify-content: flex-end;
  background: #fff;
  padding: 10px 0;
  border-radius: 0px 0px 22px 22px;
}

.table-header {
  padding: 12px;
  color: black;
  box-shadow: none;
  font-size: 11px;
  font-weight: 700;
}
.table-body {
  padding: 12px;
  border-bottom: 1.5px solid #6d6d6d19;
}

/* .t-header {
  background: #dde2e6 0% 0% no-repeat padding-box;
  font-size: 16px;
  padding: 0.5rem 0;
} */
.hover:hover {
  background: #eee;
}

/* .parent-desc.first {
  color: #8898aa;
  font-size: 14px;
  font-weight: 600;
  box-shadow: 0px 3px 6px #2c28281c;
  background: #dde2e6 0% 0% no-repeat padding-box;
} */
.desc-head {
  font-weight: 700;
}
/* .desc {
  color: #9b9a9c;
} */
.default-bt {
  font-weight: 600;
  white-space: initial;
  font-size: 1rem;
  border-radius: 0.5rem;
  border: 1px solid #999fa5;
  padding: 0.5rem 1.25rem;
  width: auto;
  /* border: none; */
  /* outline: transparent !important; */
  max-height: 40px;
  background: #ffffff47 !important;
  min-width: 121px;
}
.pi-spinner {
  color: #136acd;
}

.fa-ellipsis-v {
  padding: 10px;
}
</style>