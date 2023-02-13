<template>
  <div class="container-fluid">
    <div class="container-fluid">
      <div class="row yu mt-5">
        <div class="col-md-6">
          <div class="events">Partnership and Pledges</div>
          <Toast />
          <ConfirmDialog />
        </div>
        <div class="col-md-6 d-flex flex-column flex-sm-row mt-2 my-1 link">
          <router-link to="/tenant/pledge/pledgedefinitionlist">
            <button class="default-btn more-btn border-0 mr-3">
              Partnership/Pledge items
            </button>
          </router-link>
          <router-link
            to="/tenant/pledge/makepledge"
           >
            <button  class=" grey-border primary-btn default-btn primary-bg border-0 mt-3 mt-sm-0">
              New Partnership/Pledge
            </button></router-link
          >
        </div>
        <div class="col-md-12 px-0">
          <hr class="hr my-3" />
        </div>
      </div>
    </div>

    <!-- <PledgeTransaction /> -->

    <div class="container-fluid">
      <div class="container-fluid">
        <div
          class="row border py-3 px-2 mt-3 rounded"
          v-if="allPledgeList.length > 0 && !loading && !networkError"
        >
          <div class="col-md-5">
            <div class="text-secondary font-weight-bold small">
              Total pledge
            </div>
            <h3 class="font-weight-700 mt-3">
              {{ Math.abs(pledgesSummary.totalPledges).toLocaleString() }}.00 <span class="text-secondary small">NGN</span>
            </h3>
            <!-- <div class="small text-secondary">
              Last updated on July 9, 2022 at 1:07PM GMT+1
            </div> -->
          </div>
          <div class="col-md-3 mt-3 mt-md-0">
            <div class="font-weight-bold small text-secondary">
              Total Payments
            </div>
            <h3 class="font-weight-700 mt-3">
                {{ Math.abs(pledgesSummary.totalPayments).toLocaleString() }}.00<span class="text-secondary small">NGN</span>
            </h3>
          </div>
          <div class="col-md-4 mt-3 mt-md-0">
            <div class="text-secondary font-weight-bold small">
              Payment within the last 30 days
            </div>
            <h3 class="font-weight-700 mt-3">
             {{ Math.abs(pledgesSummary.paymentsInLast30Days).toLocaleString() }}.00 <span class="text-secondary small">NGN</span>
            </h3>
          </div>
          <!-- <div class="col-md-3 mt-3 mt-md-0">
            <div class="font-weight-bold small text-secondary">
              Average time to redemption
            </div>
            <h3 class="font-weight-700 mt-3">
              21<span class="text-secondary small">days</span>
            </h3>
          </div> -->
        </div>
      </div>
      <div
        class="row mt-4"
        v-if="allPledgeList.length > 0 && !loading && !networkError"
      >
        <div class="col-md-12 mt-3 d-flex">
          <div>
            <span
              class="
                font-weight-bold
                bg-secondary
                rounded-circle
                py-1
                px-2
                border
              "
              >0</span
            >
          </div>
          <div class="col-md-5">active filters</div>
        </div>
      </div>
      <div
        class="row mt-4"
        v-if="allPledgeList.length > 0 && !loading && !networkError"
      >
        <div class="col-md-2">
              <MembersSearch
                @memberdetail="chooseContact"
                :currentMember="selectedContact"
              />
          <!-- <Dropdown
            v-model="selectedContact2"
            class="w-100 font-weight-normal"
            :options="allPerson"
            optionLabel="name"
            placeholder="Select contact"
          /> -->
           <!-- <input
                type="text"
                v-model="selectedContact2"
                class="form-control"
                placeholder="Contact"
              /> -->
        </div>
        <div class="col-md-2">
          <Dropdown
            v-model="selectedCategory"
            class="w-100 font-weight-normal"
            :options="allPledgeDefinitionList"
            optionLabel="name"
            placeholder="Select category"
          />
          <!-- <input
                type="text"
                v-model="selectedCategory"
                class="form-control"
                placeholder="Category"
              /> -->
        </div>
        <div class="col-md-2 mt-3 mt-md-0">
          <Dropdown
            v-model="selectedStatus"
            class="w-100 font-weight-normal"
            :options="allPledgeStatus"
            optionLabel="status"
            placeholder="All statuses"
          />
        </div>
        <div class="col-md-2 mt-3 mt-md-0">
          <Calendar
            dateFormat="dd/mm/yy"
            placeholder="From"
            class="w-100"
            id="icon"
            v-model="startDate"
            :showIcon="true"
          />
        </div>
        <div class="col-md-2 mt-3 mt-md-0">
          <Calendar
            dateFormat="dd/mm/yy"
            placeholder="To"
            class="w-100"
            id="icon"
            v-model="endDate"
            :showIcon="true"
          />
        </div>
        <div class="col-md-2 mt-3  mt-md-0">
            <button
              class="default-btn more-btn primary-bg border-0 "
                @click="filterPledge"
              >
                <i
                  class="fas fa-circle-notch fa-spin mr-2 text-white"
                  v-if="loading"
                ></i>
                <span class="text-white">Apply</span>
                <span></span>
            </button>
        </div>
      </div>
      <div
        class="container-fluid d-none mt-5 d-md-block"
        v-if="allPledgeList.length > 0 && !loading && !networkError"
      >
        <div class="row t-header mt-4 border-bottom pb-2">
          <div class="small-text text-capitalize col-md-1 font-weight-bold">
            Status
          </div>
          <div class="small-text text-capitalize col-md-1 font-weight-bold">
            Due
          </div>
          <div class="small-text text-capitalize col-md-1 font-weight-bold">
            Number
          </div>
          <div class="small-text text-capitalize col-md-2 font-weight-bold">
            Contact
          </div>
          <div class="small-text text-capitalize col-md-2 font-weight-bold">
            Category
          </div>
          <div
            class="
              small-text
              text-capitalize
              
              col-md-2
              font-weight-bold
            "
          >
            Amount
          </div>
          <div
            class="
              small-text
              text-capitalize
              
              col-md-1
              font-weight-bold
            "
          >
            Redemeed
          </div>
          <div class="small-text text-capitalize col-md-1 font-weight-bold">
            Date
          </div>
          <div
            class="
              small-text
              text-capitalize
              col-md-1
            
              font-weight-bold
            "
          >
            Action
          </div>
        </div>
      </div>
      <div
        class="row"
        style="margin: 0"
        v-if="allPledgeList.length > 0 && !loading && !networkError"
      >
        <div class="col-12 pb-2 px-0">
          <div
            class="
              row
              w-100
              c-pointer
              text-dark
              border-top
              py-2
              hover
              d-flex
              align-items-center
            "
            style="margin: 0"
            v-for="(pledgelist, index) in searchPledges"
            :key="index"
          >
            <div class="col-md-1 py-2" @click="pledgeListClick(pledgelist.id)">
              <p
                class="
                  mb-0
                  d-flex
                  text-danger
                  font-weight-bold
                  justify-content-between
                "
              >
                <span
                  class="
                    text-dark
                    font-weight-bold
                    d-flex d-md-none
                    fontIncrease
                  "
                  style="font-size: 15px"
                  >Status</span
                >
                <span class="rounded small font-weight-bold statusbg py-1"
                  >{{pledgelist.status}}</span
                >
              </p>
            </div>

            <div class="col-md-1 py-2" @click="pledgeListClick(pledgelist.id)">
              <div class="mb-0 d-flex text-danger justify-content-between">
                <span
                  class="
                    text-dark
                    font-weight-bold
                    d-flex d-md-none
                    fontIncrease
                  "
                  style="font-size: 15px"
                  >Due</span
                >
                <div class="small">{{pledgelist.overDueDays }}</div>
              </div>
            </div>
            <div class="col-md-1 py-2" @click="pledgeListClick(pledgelist.id)">
              <div class="d-flex small justify-content-between">
                <span
                  class="
                    text-dark
                    font-weight-bold
                    d-flex d-md-none
                    fontIncrease
                  "
                  style="font-size: 15px"
                  >Number</span
                >
                <div class="small-text">{{pledgelist.pledgeNumber}}</div>
              </div>
            </div>
            <div class="col-md-2 py-2" @click="pledgeListClick(pledgelist.id)">
              <div class="d-flex small justify-content-between">
                <span
                  class="
                    text-dark
                    font-weight-bold
                    d-flex d-md-none
                    fontIncrease
                  "
                  style="font-size: 15px"
                  >Contact</span
                >
                <div class="small-text">
                  {{ pledgelist.contact }}
                </div>
              </div>
            </div>
            <div class="col-md-2 py-2" @click="pledgeListClick(pledgelist.id)">
              <div class="d-flex small justify-content-between">
                <span
                  class="
                    text-dark
                    font-weight-bold
                    d-flex d-md-none
                    fontIncrease
                  "
                  style="font-size: 15px"
                  >Category</span
                >
                <div class="small-text">
                  {{ pledgelist.pledgeItemName }}
                </div>
              </div>
            </div>
            <div class="col-md-2 py-2" @click="pledgeListClick(pledgelist.id)">
              <div class="d-flex small justify-content-between">
                <span
                  class="
                    text-dark
                    font-weight-bold
                    d-flex d-md-none
                    fontIncrease
                  "
                  style="font-size: 15px"
                  >Amount</span
                >
                <div class="small-text">
                  {{
                    pledgelist  &&
                    pledgelist.currency
                      ? pledgelist.currency.symbol
                      : ""
                  }}
                  {{ Math.abs(pledgelist.amount).toLocaleString() }}.00
                </div>
              </div>
            </div>
            <div class="col-md-1 py-2" @click="pledgeListClick(pledgelist.id)"> 
              <div class="d-flex small justify-content-between">
                <span
                  class="
                    text-dark
                    font-weight-bold
                    d-flex d-md-none
                    fontIncrease
                  "
                  style="font-size: 15px"
                  >Redemeed</span
                >
                <div class="small-text">{{pledgelist.totalPaymentSum}}</div>
              </div>
            </div>
             <div class="col-md-1 py-2" @click="pledgeListClick(pledgelist.id)">
              <p class="mb-0 d-flex justify-content-between">
                <span
                  class="
                    text-dark
                    font-weight-bold
                    d-flex d-md-none
                    fontIncrease
                  "
                  style="font-size: 15px"
                  >Date
                </span>
                {{ date(pledgelist.date) }}
              </p>
            </div>

            <div class="col-md-1 py-2">
              <div>
                <div class="dropdown">
                  <span class="d-flex justify-content-between">
                    <span
                      class="
                        d-md-none d-sm-flex
                        text-dark
                        font-weight-bold
                        d-flex d-md-none
                        fontIncrease
                      "
                      style="font-size: 15px"
                      >Action</span
                    >
                    <span class="d-sm-flex small">
                      <i
                        class="
                          fas
                          fa-ellipsis-v
                          cursor-pointer
                          ml-2
                          fontIncrease
                        "
                        id="dropdownMenuButton"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                      ></i>

                      <div
                        class="dropdown-menu"
                        aria-labelledby="dropdownMenuButton"
                      >
                        <a class="dropdown-item"
                          ><router-link
                            :to="`/tenant/pledge/pledgemaking?pledgeTypeID=${
                              pledgelist.id
                            }`"
                            class="text-color"
                            >Make Payment</router-link
                          ></a
                        >
                        <a class="dropdown-item"
                          ><router-link
                            :to="`/tenant/pledge/makepledge?id=${pledgelist.id}`"
                            class="text-color"
                            >Edit</router-link
                          ></a
                        >
                        <a
                          class="dropdown-item"
                          @click="showConfirmModal(pledgelist.id, index)"
                          >Delete</a
                        >
                      </div>
                    </span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="row" v-if="loading">
        <div class="col-md-12">
          <div class="row">
            <div
              class="col-md-12 d-flex align-items-center justify-content-center"
            >
              <i class="pi pi-spin pi-spinner py-4" style="font-size: 3rem"></i>
            </div>
          </div>
        </div>
      </div>

      <div
        class="no-person"
        v-else-if="allPledgeList.length === 0 && !loading && !networkError"
      >
        <div class="empty-img">
          <p><img src="../../assets/people/people-empty.svg" alt="" /></p>
          <p class="tip">You haven't added any pledge yet</p>
          <div
            class="
              c-pointer
              primary-bg
              col-sm-6 col-md-4
              offset-sm-3 offset-md-4
              default-btn
              border-0
              text-white
            "
            @click="navigateToMakePledge"
          >
            Add Pledge
          </div>
        </div>
      </div>

      <div class="adjust-network" v-else-if="networkError">
        <img src="../../assets/network-disconnected.png" />
        <div>Opps, Your internet connection was disrupted</div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from "vue";
// import finish from "../../services/progressbar/progress";
import MembersSearch from "../../components/membership/MembersSearch.vue";
import axios from "@/gateway/backendapi";
import Calendar from "primevue/calendar";
import Dropdown from "primevue/dropdown";
import { useToast } from "primevue/usetoast";
import InputText from "primevue/inputtext";
import { useConfirm } from "primevue/useconfirm";
import monthDayYear from "../../services/dates/dateformatter";
// import PledgeTransaction from "./PledgeTransaction.vue";
import router from "../../router";

export default {
  components: {
    Dropdown,
    Calendar,
    MembersSearch,
    InputText,
  },
  setup() {
    const networkError = ref(false);
    const allPerson = ref([]);
    const allPledgeStatus = ref([
      {status: 'Paid'},
      {status: 'Over Due'},
      {status: 'No Payment'},
      {status: '---'}
    ]);
    const allPledgeDefinitionList = ref([]);
    const selectedCategory = ref({});
    const filterResult = ref([]);
    const selectedStatus = ref("")
    const toast = useToast();
    const loading = ref(false);
    const searchText = ref("");
    const selectedPledge = ref("");
    const tenantID = ref("");
    const allPledgeType = ref([]);
    const selectedPerson = ref("");
    const allPledgeList = ref([]);
    const pledgesSummary = ref({});
    const startDate = ref("");
    const endDate = ref("");
    const showUpload = ref(true);
    const showDraft = ref(false);
    const showInvoice = ref(false);
    const selectedContact = ref({});
    const selectedContact2 = ref("");

    const confirm = useConfirm();

    const upload = () => {
      showUpload.value = true;
      showDraft.value = false;
      showInvoice.value = false;
    };

    const draft = () => {
      showDraft.value = true;
      showUpload.value = false;
      showInvoice.value = false;
    };

    const invoice = () => {
      showInvoice.value = true;
      showDraft.value = false;
      showUpload.value = false;
    };

    const navigateToMakePledge = () => {
      router.push("/tenant/pledge/makepledge");
    };
    
    const pledgeListClick = (id) =>{
        router.push(`/tenant/pledge/pledgemaking?pledgeTypeID=${id}`);
    }

    const getAllPledgeDefinition = async () => {
      try{
        const res  = await axios.get('/api/Pledge/GetAllPledgeDefinitions')
          allPledgeDefinitionList.value = res.data.returnObject;

      }
      catch(error){
        console.log(error);
        
      }
    }
    getAllPledgeDefinition()

    const filterPledge = async () =>{
      selectedContact.value.name = selectedContact.value.name == undefined ? "" : selectedContact.value.name;
      selectedCategory.value.name = selectedCategory.value.name == undefined ? "" : selectedCategory.value.name;
      selectedStatus.value.status = selectedStatus.value.status == undefined ? "" : selectedStatus.value.status;
      try{
        const res = await axios.get(`/api/Pledge/GetAllPledgesSearch?personId=${selectedContact.value.id}&status${selectedStatus.value.status}&pledgeItemName${selectedCategory.value.name}&startDate${new Date(startDate.value).toLocaleDateString("en-US")}&endDate${new Date(endDate.value).toLocaleDateString("en-US")}`)
        filterResult.value = res.data.returnObject;
        console.log(filterResult.value, "filterPledge");
      }
      catch(error){
        console.log(error)
      }
    }
    const getCurrentlySignedInUser = async () => {
      try {
        const res = await axios.get("/api/Membership/GetCurrentSignedInUser");
        tenantID.value = res.data.tenantId;
      } catch (err) {
        console.log(err);
      }
    };

    getCurrentlySignedInUser();

    const memberlink = computed(() => {
      if (!tenantID.value) return "";
      return `${window.location.origin}/pledge/publicmakepledge/${tenantID.value}`;
    });

    const searchPledges = computed(() => {
      if (searchText.value !== "" && allPledgeList.value.length > 0) {
        return allPledgeList.value.filter((i) => {
          if (i.pledgeType.name)
            return i.pledgeType.name
              .toLowerCase()
              .includes(searchText.value.toLowerCase());
        });
      } else if(filterResult.value.length > 0 && (selectedContact.value.name || selectedStatus.value.status || selectedCategory.value.name  ))
      {
        return filterResult.value
      }else{
         return allPledgeList.value;
      }
    });

    const date = (offDate) => {
      return monthDayYear.monthDayYear(offDate);
    };
    const chooseContact = (payload) => {
      // contactRef.value.hide();
      selectedContact.value = payload;

      console.log(selectedContact.value, 'my allll')
    };

    const searchIsVisible = ref(false);

    const toggleSearch = () => {
      searchIsVisible.value = !searchIsVisible.value;
    };

    const getAllPledgesSummary =  async () =>{
      try{
        const res = await axios.get("/api/Pledge/GetAllPledgesSummary");
        
        pledgesSummary.value =  res.data.returnObject
        console.log(pledgesSummary.value, "pledgesSummary");
      }
      catch(error){

      }
    }
    getAllPledgesSummary()

    const getAllPledges = async () => {
      loading.value = true;
      try {
        const res = await axios.get("/api/Pledge/GetAllPledges");
        // finish();
        allPledgeList.value = res.data.returnObject;
        // allPledgeStatus.value = res.data.returnObject.map((i)  => ({
        //   status: i.status
        // }))
        allPerson.value = res.data.returnObject.map((i)  => ({
          name: i.contact,
          personId: i.personID
        }))
        // allPledgeType.value = res.data.returnObject.map((i) => ({
        //   status: i.status,
        //   id: i.pledgeType.id,
        // }));
        console.log(allPledgeList.value, "getPledgeList");
        console.log(allPerson.value , "allPledgeStatus");
        loading.value = false;
      } catch (error) {
        // finish();
        console.log(error);
        loading.value = false;
        networkError.value = true;

        if (error.toString().toLowerCase().includes("network error")) {
          networkError.value = true;
        } else {
          networkError.value = false;
        }
      }
    };
    getAllPledges();

    const pledgeClick = (id) => {
      router.push(`/tenant/pledge/makepledge?id=${id}`);
    };

    const deletePledge = (id) => {
      axios
        .delete(`/api/Pledge/DeletePledge?ID=${id}`)
        // .delete(`/api/Pledge/DeletePledgeDefinition?ID=${id}`)
        .then((res) => {
          console.log(res);
          toast.add({
            severity: "success",
            summary: "Confirmed",
            detail: "Pledge form deleted",
            life: 3000,
          });

          allPledgeList.value = allPledgeList.value.filter(
            (pledgelist) => pledgelist.id !== id
          );
        })
        .catch((err) => {
          // finish();
          if (err.response.status === 400) {
            toast.add({
              severity: "error",
              summary: "Unable to delete",
              detail: "Ensure this member is not in any group",
              life: 3000,
            });
          } else {
            toast.add({
              severity: "error",
              summary: "Unable to delete",
              detail: "An error occurred, please try again",
              life: 3000,
            });
          }
        });
    };
    const removeSearchText = () => {
      searchText.value = "";
    };
    const clearInput = () => {
      searchIsVisible.value = !searchIsVisible.value;
    };

    const showConfirmModal = (id, index) => {
      confirm.require({
        message: "Are you sure you want to proceed?",
        header: "Confirmation",
        icon: "pi pi-exclamation-triangle",
        acceptClass: "confirm-delete",
        rejectClass: "cancel-delete",
        accept: () => {
          deletePledge(id, index);
          // toast.add({severity:'info', summary:'Confirmed', detail:'Member Deleted', life: 3000});
        },
        reject: () => {
          toast.add({
            severity: "info",
            summary: "Rejected",
            detail: "You have rejected",
            life: 3000,
          });
        },
      });
    };

    return {
      upload,
      allPledgeDefinitionList,
      filterResult,
      allPerson,
      filterPledge,
      pledgeListClick,
      selectedContact2,
      selectedCategory,
      selectedContact,
      draft,
      invoice,
      startDate,
      endDate,
      showUpload,
      showDraft,
      showInvoice,
      allPledgeList,
      navigateToMakePledge,
      networkError,
      tenantID,
      memberlink,
      pledgeClick,
      clearInput,
      searchPledges,
      pledgesSummary,
      toggleSearch,
      startDate,
      endDate,
      chooseContact,
      showConfirmModal,
      deletePledge,
      loading,
      searchText,
      searchIsVisible,
      selectedPledge,
      selectedPerson,
      removeSearchText,
      allPledgeType,
      allPledgeStatus,
      selectedStatus,
      date,
      // singlePledge
    };
  },
};
</script>

<style scoped>
.no-person {
  height: 80vh;
  display: flex;
  text-align: center;
}
.more-btn {
  background: #dde2e6;
}

.empty-img {
  width: 85%;
  /* min-width: 397px; */
  margin: auto;
}

.empty-img img {
  width: 100%;
  max-width: 200px;
}
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

.hover:hover {
  background: #eee;
}

.parent-desc.first {
  color: #8898aa;
  font-size: 14px;
  font-weight: 600;
  box-shadow: 0px 3px 6px #2c28281c;
  background: #dde2e6 0% 0% no-repeat padding-box;
}
.desc-head {
  font-weight: 700;
}
.desc {
  color: #9b9a9c;
}

.pi-spinner {
  color: #136acd;
}

.fa-ellipsis-v {
  padding: 10px;
}
</style>