<template>
  <div>
    <div class="container-fluid">
      <div class="row mb-3">
      <div class="col-md-6 first-timers-text">
        <h2 class="head-text">Branch Transactions</h2>
      </div>

      <div class="col-md-6 d-flex flex-row-reverse">
        <BranchSelect class="w-50" @selectedbranch="setSelectedBranch" />
      </div>
    </div>
    <div class="row">
        <div class="col-12">
          Here you can view and manage the transactions of your branches, select the branch you want to view its transactions from the dropdown at the top-right corner.
        </div>
      </div>

      <loadingComponent :loading="loading" />
      <div class="row table" v-if="branchTransactions.length > 0">
      <div class="col-12 px-0" id="table">
        <div class="top-con">
          <div class="table-top d-flex justify-content-end">
            <!-- <div class="filter col-2">
              <p @click="toggleFilterFormVissibility" class="mt-2">
                <i class="fas fa-filter"></i>
                FILTER
              </p>
            </div> -->
            <div class="col-5 col-sm-3 col-md-2">
              <p @click="toggleSearch" class="search-text w-100 mt-2">
                <i class="pi pi-search"></i> SEARCH
              </p>
            </div>

            <div class="search d-flex ml-2">
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
                <span class="empty-btn">x</span>
                <span class="search-btn">
                  <i class="pi pi-search"></i>
                </span>
              </label>
            </div>
          </div>
        </div>
        <div
          class="filter-options"
          :class="{ 'filter-options-shown': filterFormIsVissible }"
        >
          <div class="container-fluid">
            <div class="row">
              <div class="col-md-9">
                <div class="row">
                  <div
                    class="
                      col-12 col-sm-6 col-md-4
                      offset-sm-3 offset-md-0
                      form-group
                      inp
                      w-100
                    "
                  >
                  
                    <input
                      type="text"
                      class="input w-100"
                      placeholder="Offering"
                    
                    />
                  </div>

                  <div class="col-12 col-md-4 form-group d-none d-md-block">
                    <input
                      type="text"
                      class="input w-100"
                     
                    />
                  </div>
                </div>
              </div>

              <div class="col-md-3 d-flex flex-column align-items-center">
                <button class="apply-btn text-white" @click="applyFilter">
                  Apply
                </button>
                <span class="mt-2">
                  <a class="clear-link mr-2" @click="clearAll">Clear all</a>
                  <span class="mx-2"
                    ><i class="fas fa-circle" style="font-size: 4px"></i></span
                  ><a class="hide-link ml-2" @click="hide">Hide</a>
                </span>
              </div>
            </div>
          </div>
        </div>

    
    <!-- <div > -->
          <div class="container-fluid d-none d-md-block">
            <div class="row t-header">
              <!-- <div class="col-md-1">
                <Checkbox id="binary" v-model="sendToMysef" :binary="true"/>
              </div> -->
              <div class="small-text col-md-2 font-weight-bold">
                DATE
              </div>
              <div class="small-text col-md-3 font-weight-bold">
                DESCRIPTION
              </div>
              <div class="small-text col-md-2 font-weight-bold">
                AMOUNT
              </div>
              <div class="small-text col-md-2 font-weight-bold">
                EVENT
              </div>
              <div class="small-text col-md-2 font-weight-bold">
                DONOR
              </div>
              <div class="small-text col-md-1 font-weight-bold">
                CHANNEL
              </div>
            </div>
          </div>
        <div class="container-fluid">
          <div class="row">
            <div
              class=" col-12 py-2 px-0 c-pointer tr-border-bottom hover"
              v-for="item in searchBranchTransactions"
              :key="item.id"
            >
              <div class="row w-100" style="margin: 0">
                <!-- <div
                  class="col-md-1 d-flex d-md-block px-3 justify-content-end"
                >
                  <input
                    type="checkbox"
                    v-model="item.check"
                    class="form-check"
                  />
                  <Checkbox id="binary" v-model="item.check" :binary="true"/>
                </div> -->

                <div class="desc small-text col-md-2">
                  <p class="mb-0 d-flex justify-content-between">
                    <span
                      class="
                        text-dark
                        font-weight-bold
                        d-flex d-md-none
                        fontIncrease
                      "
                      >Date</span
                    >
                    <span class="text-decoration-none">
                        {{ formatDate(item.date) }}
                      </span>
                  </p>
                </div>

                <div class="desc small-text col-md-3">
                  <p class="mb-0 d-flex justify-content-between">
                    <span
                      class="
                        text-dark
                        font-weight-bold
                        d-flex d-md-none
                        fontIncrease
                      "
                      >Description</span
                    >
                    <span class="text-decoration-none">
                        {{ item.contribution }}
                      </span>
                  </p>
                </div>

                <div class="desc small-text col-md-2">
                  <div class="d-flex justify-content-between">
                    <span
                      class="
                        text-dark
                        font-weight-bold
                        d-flex d-md-none
                        fontIncrease
                      "
                      >Amount</span
                    >
                    <div>
                      <div class="desc small-text text-right text-md-left">
                        {{ item.currencyName }} {{ item.amount }}
                      </div>
                    </div>
                  </div>
                </div>

                <div class="col-md-2 desc-head small-text ">
                  <p class="mb-0 d-flex justify-content-between">
                    <span
                      class="
                        text-dark
                        font-weight-bold
                        d-flex d-md-none
                        fontIncrease
                      "
                      >Event</span
                    >
                    <span
                      >{{ item.eventName }}</span
                    >
                  </p>
                </div>
                
                <div class="desc-head small-text col-md-2">
                  <p class="mb-0 d-flex justify-content-between">
                    <span
                      class="
                        text-dark
                        font-weight-bold
                        d-flex d-md-none
                        fontIncrease
                      "
                      >Donor</span
                    >
                    <span
                      >{{ item.donor }}</span
                    >
                  </p>
                </div>

                <!-- <div class="small-text col-md-2 px-1">
                  <p class="mb-0 d-flex justify-content-between">
                    <span
                      class="
                        text-dark
                        font-weight-bold
                        d-flex d-md-none
                        fontIncrease
                      "
                      >Donor</span
                    >
                    <span
                      ><span class="primary-text c-pointer"
                        ><router-link
                          class="text-decoration-none fontIncrease"
                          :to="{
                            name: 'AddOffering',
                            params: { offId: item.id },
                          }"
                          >{{ item.donor }}</router-link
                        ></span
                      ></span
                    >
                  </p>
                </div> -->
                <div class="desc-head small-text col-md-1">
                  <p class="mb-0 d-flex justify-content-between">
                    <span
                      class="
                        text-dark
                        font-weight-bold
                        d-flex d-md-none
                        fontIncrease
                      "
                      >Channel</span
                    >
                    <span
                      >{{ item.channel }}</span
                    >
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>


        <div class="col-12">
          <div class="table-footer">
            <Pagination
              @getcontent="getPeopleByPage"
              :itemsCount="50"
              :currentPage="currentPage"
              :totalItems="totalItem"
            />
          </div>
        </div>
      </div>
    </div>
    </div>
  </div>
  <ConfirmDialog />
  <Toast />
</template>

<script>
import { ref, computed } from '@vue/runtime-core';
import BranchSelect from "../component/BranchSelect.vue"
import axios from "@/gateway/backendapi";
// import { useConfirm } from "primevue/useConfirm";
import { useToast } from "primevue/usetoast";
import loadingComponent from "@/components/loading/LoadingComponent";
import dateFormatter from '../../../services/dates/dateformatter';
import Pagination from "../../../components/pagination/PaginationButtons.vue";

export default {
  // props: ["list", "peopleCount"],
  components: {
    BranchSelect,
    loadingComponent,
    Pagination
  },

  // directives: {
  //   tooltip: Tooltip,
  // },

  setup() {
    // const confirm = useConfirm()
    const toast = useToast()
    const selectedBranch = ref({})
    const branchTransactions = ref([])
    const filterFormIsVissible = ref(false);
    const searchIsVisible = ref(false);
    const searchText = ref("");
    const loading = ref(false)
    const branchId = ref("")
    const totalItem = ref(0)

    const setSelectedBranch = async(payload) => {
      loading.value = true
      branchId.value = payload.id
      try {
        let { data } = await axios.get(`/api/Branching/${payload.id}/transactions`)
        loading.value = false
        console.log(data)
        branchTransactions.value = data.returnObject.contribution
        totalItem.value = data.returnObject.totalItem
        if (data.returnObject.contribution.length === 0) {
          toast.add({
              severity: "warn",
              summary: "No transaction found",
              detail: "There are no transaction in this branch yet.",
              life: 5000,
            });
        }
      }
      catch (err) {
        loading.value = false
        console.log(err)
      }
    }

    const toggleFilterFormVissibility = () =>
      (filterFormIsVissible.value = !filterFormIsVissible.value);
    const toggleSearch = () => {
      searchIsVisible.value = !searchIsVisible.value;
    };

    const searchBranchTransactions = computed(() => {  
      if (branchTransactions.value.length > 0 && !searchText.value) return branchTransactions.value
      return branchTransactions.value.filter(i => {
        return i.contribution.toLowerCase().includes(searchText.value.toLowerCase())
      })
    })

    const formatDate = (date) => {
      return dateFormatter.monthDayYear(date)
    }

    const currentPage = ref(0);
    const getPeopleByPage = async (page) => {
      if (page < 0) return false;
      try {
        const { data } = await axios.get(
          `/api/Branching/${branchId.value}/transactions?page=${page}`
        );
        console.log(data)
        branchTransactions.value = data.returnObject.contribution;
        currentPage.value = page;
      } catch (error) {
        console.log(error);
      }
    };

    // const deleteMember = (id) => {
    //   axios
    //     .delete(`/api/People/DeleteOnePerson/${id}`)
    //     .then((res) => {
    //       console.log(res);
    //       branchTransactions.value = branchTransactions.value.filter(
    //         (item) => item.id !== id
    //       );
    //       if (res.data.response.includes("@")) {
    //         let disRes = res.data.response.split("@")
    //         toast.add({
    //           severity: "info",
    //           summary: "Info",
    //           detail: disRes[0],
    //           life: 10000,
    //         });
    //       } else {
    //         toast.add({
    //           severity: "success",
    //           summary: "Confirmed",
    //           detail: "Member Deleted",
    //           life: 5000,
    //         });
    //       }
    //     })
    //     .catch((err) => {
    //       toast.add({
    //         severity: "error",
    //         summary: "Delete Error",
    //         detail: "Deleting member failed",
    //         life: 3000,
    //       });
    //       console.log(err);
    //     });
    // };

    // const showConfirmModal = (id) => {
    //   confirm.require({
    //     message: "Are you sure you want to proceed?",
    //     header: "Confirmation",
    //     icon: "pi pi-exclamation-triangle",
    //     acceptClass: "confirm-delete",
    //     rejectClass: "cancel-delete",
    //     accept: () => {
    //       deleteMember(id);
    //       // toast.add({severity:'info', summary:'Confirmed', detail:'Member Deleted', life: 3000});
    //     },
    //     reject: () => {
    //       toast.add({
    //         severity: "info",
    //         summary: "Rejected",
    //         detail: "You have rejected",
    //         life: 3000,
    //       });
    //     },
    //   });
    // };
    

    return {
      setSelectedBranch,
      selectedBranch,
      branchTransactions,
      filterFormIsVissible,
      searchIsVisible,
      toggleFilterFormVissibility,
      toggleSearch,
      searchBranchTransactions,
      searchText,
      // showConfirmModal,
      // deleteMember,
      loading,
      formatDate,
      getPeopleByPage,
      branchId,
      currentPage,
      totalItem
    };
  },
};
</script>

<style scoped>
.page-header {
    font: normal normal 800 29px Nunito sans;
}

.filter-options-shown {
  height: 80px;
  overflow: hidden;
  transition: all 0.5s ease-in-out;
}

.table-top {
  font-weight: 800;
  font-size: 12px;
}

.table-top label:hover,
.table-top p:hover {
  cursor: pointer;
}

.filter-options {
  height: 0;
  overflow: hidden;
  transition: all 0.5s ease-in-out;
}

.img-resize {
  border-radius: 50%;
  height: 26px;
  width: 26px;
  object-fit: cover;
}

.t-header {
  background: #dde2e6 0% 0% no-repeat padding-box;
  font-size: 16px;
  padding: 0.5rem 0;
}

.desc-head {
  font-weight: 700;
}

.hover:hover {
  background: #eee;
}

.itemroute-color {
    color: #136acd;
    cursor: pointer;
}

@media (max-width: 767px) {
  .filter-options-shown {
    height: 150px;
  }
}
</style>