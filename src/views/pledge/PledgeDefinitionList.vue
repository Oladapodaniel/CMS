<template>
  <div class="container-fluid">
    <div class="container-wide">
      <div class="row d-md-flex justify-content-md-between mt-5">
        <div class="events">Partnership and Pledge Item</div>
        <router-link
          to="/tenant/pledge/pledgedefinition"
          class="
            grey-border
            primary-btn
            default-btn
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
      <!-- <div class="row table">
              <div class="col-12 mt-4 w-100">
                <div class="row">
                  <div class="col-12 col-md-4 ">
                    <div class="font-weight-bold col-12 ">Total Pledge</div>
                  </div>

                  <div class="col-12 col-md-4">
                    <div class="font-weight-bold col-12 ">How They Pledge </div>
                  </div>
                  <div class="col-12 col-md-4">
                    <div class="font-weight-bold col-12 ">How They Redeem</div>
                  </div>
                </div>
              </div>
          </div> -->
      <!-- <div class="row">
              <div class="col-12 mt-4 w-100">
                <div class="row">
                  <div class="col-12 col-md-3 ">
                  
                       <MembersSearch @memberdetail="chooseContact" />
                        <Dropdown v-model="selectedPerson" class="w-100 font-weight-normal" :options="reOccuringRange"  optionLabel="name" placeholder="Select Person" />
                  </div>
                  <div class="col-12 col-md-3 ">
                    <Dropdown v-model="selectedPledge" class="w-100 font-weight-normal" :options="allPledgeType"  optionLabel="name" placeholder="Pledge Type" />
                  </div>
                  <div class="col-12 col-md-2 ">
                    <input type="text" v-model="amountFrom" class="form-control" placeholder="From" />
                  </div>

                  <div class="col-12 col-md-2">
                     <input type="text" v-model="amountTo" class="form-control" placeholder="To" />
                  </div>
                  <div class="col-12 col-md-2">
                    <button class=" default-bt "> Search...</button>
                  </div>
                </div>
              </div>
          </div> -->
      <div class="row">
        <div class="col-12 px-0" id="table">
          <div class="top-con" id="ignore2">
            <div class="table-top">
              <div class="col-4">
                <p
                  @click="toggleSearch"
                  class="search-text w-100 mt-2 d-flex justify-content-center"
                >
                  <i class="pi pi-search mr-2"></i>SEARCH
                </p>
              </div>

              <div class="search d-flex ml-2 mr-3">
                <label
                  class="label-search d-flex"
                  :class="{
                    'show-search': searchIsVisible,
                    'hide-search': !searchIsVisible,
                  }"
                >
                  <input
                    type="text"
                    placeholder="Search..."
                    v-model="searchText"
                  />
                  <span class="empty-btn" @click="clearInput">
                    <i class="pi pi-times"></i
                  ></span>
                  <span class="search-btn" @click="removeSearchText">
                    <i class="pi pi-search"></i>
                  </span>
                </label>
              </div>
            </div>
          </div>
          <div>
            <div class="container-fluid d-none d-md-block">
              <div class="row t-header mt-4 border-bottom pb-2">
                <div
                  class="small-text text-capitalize col-md-2 font-weight-bold"
                >
                  Name
                </div>
                <div
                  class="small-text text-capitalize col-md-2 font-weight-bold"
                >
                  Fund
                </div>
                <div
                  class="small-text text-capitalize col-md-2 font-weight-bold"
                >
                  Pledge made
                </div>
                <div
                  class="small-text text-capitalize col-md-2 font-weight-bold"
                >
                  Redemeed
                </div>
                <div
                  class="small-text text-capitalize col-md-2 font-weight-bold"
                >
                  Date
                </div>

                <div
                  class="small-text text-capitalize col-md-1 font-weight-bold"
                >
                  Pledges
                </div>
                <div
                  class="small-text text-capitalize col-md-1 font-weight-bold"
                >
                  Action
                </div>
              </div>
            </div>

            <div class="row" style="margin: 0">
              <div class="col-12 parent-desc pb-2 px-0">
                <div class="row" v-if="loading">
                  <div class="col-md-12">
                    <div class="row">
                      <div
                        class="
                          col-md-12
                          d-flex
                          align-items-center
                          justify-content-center
                        "
                      >
                        <i
                          class="pi pi-spin pi-spinner py-4"
                          style="font-size: 3rem"
                        ></i>
                      </div>
                    </div>
                  </div>
                </div>

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
                  v-for="(pledgelist, index) in searchGroup"
                  :key="index"
                >
                  <div
                    class="col-md-2 desc"
                    @click="pledgeClick(pledgelist.id)"
                  >
                    <div class="mb-0 d-flex small justify-content-between">
                      <span
                        class="
                          text-dark
                          font-weight-bold
                          d-flex d-md-none
                          fontIncrease
                        "
                        style="font-size: 15px"
                        >Name</span
                      >
                      <div class="small-text">{{ pledgelist.name }}</div>
                    </div>
                  </div>
                  <div
                    class="col-md-2 desc"
                    @click="pledgeClick(pledgelist.id)"
                  >
                    <div class="mb-0 small d-flex justify-content-between">
                      <span
                        class="
                          text-dark
                          font-weight-bold
                          d-flex d-md-none
                          fontIncrease
                        "
                        style="font-size: 15px"
                        >Fund</span
                      >
                      <div class="small-text">{{ pledgelist.fund }}</div>
                    </div>
                  </div>
                  <div
                    class="col-md-2 desc"
                    @click="pledgeClick(pledgelist.id)"
                  >
                    <div class="mb-0 small d-flex justify-content-between">
                      <span
                        class="
                          text-dark
                          font-weight-bold
                          d-flex d-md-none
                          fontIncrease
                        "
                        style="font-size: 15px"
                        >Pledge made
                      </span>
                      <div class="small-text">
                        <!-- {{ pledgelist.totalPledgeAmount }} -->
                        {{
                          pledgelist && pledgelist.currency
                            ? pledgelist.currency.symbol
                            : ""
                        }}
                        {{
                          Math.abs(
                            pledgelist.totalPledgeAmount
                          ).toLocaleString()
                        }}.00
                      </div>
                    </div>
                  </div>
                  <div class="col-md-2" @click="groupClick(group.id)">
                    <div class="d-flex small justify-content-between">
                      <span
                        class="
                          text-dark
                          font-weight-bold
                          d-flex d-md-none
                          fontIncrease
                        "
                        style="font-size: 15px"
                        >Redeemed</span
                      >
                      <div class="small-text text-right text-md-center">
                        {{
                          pledgelist && pledgelist.currency
                            ? pledgelist.currency.symbol
                            : ""
                        }}
                        {{
                          Math.abs(
                            pledgelist.totalPaymentsAmount
                          ).toLocaleString()
                        }}.00
                      </div>
                    </div>
                  </div>
                  <div class="col-md-2" @click="groupClick(group.id)">
                    <div class="d-flex small justify-content-between">
                      <span
                        class="
                          text-dark
                          font-weight-bold
                          d-flex d-md-none
                          fontIncrease
                        "
                        style="font-size: 15px"
                        >Date</span
                      >
                      <div class="small-text text-right text-md-center">
                        {{ date(pledgelist.date) }}
                      </div>
                    </div>
                  </div>
                  <div class="col-md-1" @click="groupClick(group.id)">
                    <div class="d-flex small justify-content-between">
                      <span
                        class="
                          text-dark
                          font-weight-bold
                          d-flex d-md-none
                          fontIncrease
                        "
                        style="font-size: 15px"
                        >Pledges</span
                      >
                      <div class="small-text text-right text-md-center">
                        {{ pledgelist.pledgeCount }}
                      </div>
                    </div>
                  </div>

                  <div class="col-md-1">
                    <div>
                      <div class="dropdown">
                        <span class="d-flex justify-content-between">
                          <span class="d-md-none d-sm-flex"></span>
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
                              <!-- <a class="dropdown-item">
                                    <a
                                      @click="sendGroupSms(group)"
                                      >Send SMS</a>
                                  </a>
                                  <a class="dropdown-item" @click="sendGroupEmail(group)">
                                      Send Email
                                  </a> -->
                              <a
                                class="dropdown-item"
                                @click="showConfirmModal(pledgelist.id, index)"
                                ><a class="text-decoration-none">Delete </a></a
                              >

                              <router-link
                                :to="`/tenant/pledge/pledgedefinition?id=${pledgelist.id}`"
                                class="text-color dropdown-item"
                              >
                                <a class="text-decoration-none">Edit </a>
                              </router-link>
                            </div>
                          </span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Toast />
    <ConfirmDialog />
  </div>
</template>

<script>
import { ref, computed } from "vue";
import finish from "../../services/progressbar/progress";
// import MembersSearch from "../../components/membership/MembersSearch.vue";
import axios from "@/gateway/backendapi";
import Dropdown from "primevue/dropdown";
import { useToast } from "primevue/usetoast";
import InputText from "primevue/inputtext";
import { useConfirm } from "primevue/useconfirm";
import monthDayYear from "../../services/dates/dateformatter";
import router from "../../router";

export default {
  components: {
    Dropdown,
    // MembersSearch,
    InputText,
  },
  setup() {
    const toast = useToast();
    const loading = ref(false);
    const searchText = ref("");
    const selectedPledge = ref("");
    const allPledgeType = ref([]);
    const selectedPerson = ref("");
    const allPledgeList = ref([]);
    // const singlePledge = ref([]);
    const confirm = useConfirm();

    const date = (offDate) => {
      return monthDayYear.monthDayYear(offDate);
    };
    const chooseContact = (payload) => {
      // contactRef.value.hide();
      selectedContact.value = payload;

      // console.log(payload, 'my allll')
    };

    const getAllPledgeDefinition = async () => {
      loading.value = true;
      try {
        const res = await axios.get("/api/Pledge/GetAllPledgeDefinitions");
        finish();
        allPledgeList.value = res.data.returnObject;
        // allPledgeType.value = res.data.returnObject.map(i => ({
        //   name : i.pledgeType.name,
        //   id : i.pledgeType.id,
        // }))
        loading.value = false;
        console.log(allPledgeList.value, "getPledgeDefinition");
      } catch (error) {
        console.log(error);
        loading.value = false;
      }
    };
    getAllPledgeDefinition();

    const searchIsVisible = ref(false);

    const toggleSearch = () => {
      searchIsVisible.value = !searchIsVisible.value;
    };
    const searchGroup = computed(() => {
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

    const removeSearchText = () => {
      searchText.value = "";
    };
    const clearInput = () => {
      searchIsVisible.value = !searchIsVisible.value;
    };

    const deletePledge = (id) => {
      axios
        // .delete(`/api/Pledge/DeletePledge?ID=${id}`)
        .delete(`/api/Pledge/DeletePledgeDefinition?ID=${id}`)
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
          finish();
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

    const pledgeClick = (id) => {
      router.push(`/tenant/pledge/pledgedefinition?id=${id}`);
    };

    return {
      allPledgeList,
      searchGroup,
      clearInput,
      toggleSearch,
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
      date,
      pledgeClick,
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