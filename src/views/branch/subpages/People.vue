<template>
  <div>
    <div class="container-wide container-top">
      <div class="row my-3">
      <div class="col-md-6 first-timers-text">
        <h2 class="page-header">Branch Members</h2>
      </div>

      <div class="col-md-6 d-flex flex-row-reverse">
        <BranchSelect class="w-50" @selectedbranch="setSelectedBranch" />
      </div>
    </div>
    <div class="row">
        <div class="col-12">
          Here you can view and manage all member of your branch, select the branch you want to view its members from the dropdown at the top-right corner.
        </div>
      </div>

      <loadingComponent :loading="loading" />
      <div class="row table" v-if="branchMembers.length > 0">
      <div class="col-12 px-0" id="table">
        <div class="top-con">
          <div class="table-top  d-flex justify-content-end">
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
          id="ignore1"
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
              <div class="col-md-1">
                <!-- <Checkbox id="binary" v-model="sendToMysef" :binary="true"/> -->
              </div>
              <div class="small-text col-md-2 font-weight-bold">
                PICTURE
              </div>
              <div class="small-text col-md-3 font-weight-bold">
                FIRST NAME
              </div>
              <div class="small-text col-md-3 font-weight-bold">
                LAST NAME
              </div>
              <div class="small-text col-md-2 font-weight-bold">
                PHONE
              </div>
              <div class="small-text col-md-1 font-weight-bold">
                ACTION
              </div>
            </div>
          </div>
        <div class="container-fluid">
          <div class="row">
            <div
              class=" col-12 py-2 px-0 c-pointer tr-border-bottom hover"
              v-for="(item) in searchBranchMember"
              :key="item.id"
            >
              <div class="row w-100" style="margin: 0">
                <div
                  class="col-md-1 d-flex d-md-block px-3 justify-content-end"
                >
                  <!-- <input
                    type="checkbox"
                    v-model="item.check"
                    class="form-check"
                  /> -->
                  <!-- <Checkbox id="binary" v-model="item.check" :binary="true"/> -->
                </div>

                <div class="desc small-text col-md-2">
                  <p class="mb-0 d-flex justify-content-between">
                    <span
                      class="
                        text-dark
                        font-weight-bold
                        d-flex d-md-none
                        fontIncrease
                      "
                      >Picture</span
                    >
                    <span class="text-decoration-none">
                        <img :src="item.pictureUrl" class="img-resize" v-if="item.pictureUrl"/>
                        <img src="../../../assets/people/avatar-male.png" class="img-resize" v-else/>
                      </span>
                  </p>
                </div>

                <div class="desc-head col-md-3">
                  <div class="d-flex justify-content-between">
                    <span
                      class="
                        text-dark
                        font-weight-bold
                        d-flex d-md-none
                        fontIncrease
                      "
                      >First Name</span
                    >
                    <div>
                      <div class="desc small-text text-right text-md-left">
                        <router-link :to="{ name: 'AddPerson', params: { personId: item.id } }" class="itemroute-color">
                        {{ item.firstName }}
                        </router-link>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="desc-head small-text col-md-3">
                  <p class="mb-0 d-flex justify-content-between">
                    <span
                      class="
                        text-dark
                        font-weight-bold
                        d-flex d-md-none
                        fontIncrease
                      "
                      >Last Name</span
                    >
                    <router-link :to="{ name: 'AddPerson', params: { personId: item.id } }" class="itemroute-color">
                    <span
                      >{{ item.lastName }}</span
                    >
                    </router-link>
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
                      >Phone</span
                    >
                    <router-link :to="{ name: 'AddPerson', params: { personId: item.id } }" class="itemroute-color">
                    <span
                      >{{ item.mobilePhone }}</span
                    >
                    </router-link>
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
                            <router-link
                              :to="{
                                name: 'AddPerson',
                                params: { personId: item.id },
                              }"
                            >
                              <a class="dropdown-item elipsis-items"> Edit </a>
                            </router-link>
                            <a
                              class="dropdown-item elipsis-items cursor-pointer"
                              @click="showConfirmModal(item.id)"
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
        </div>

<!-- </div> -->


         <!-- <div
          class="col-md-12 col py-3"
          v-if="
            listOfOfferingItems.length === 0 &&
            props.contributionTransactions.length !== 0 &&
            !loading
          "
        >
          <p class="text-danger d-flex justify-content-center">
            Record not available in database
          </p>
        </div> -->
        <!-- <div class="text-danger d-flex justify-content-center" v-else>No records found</div> -->

        <div class="col-12">
          <div class="table-footer">
            <Pagination
              @getcontent="getPeopleByPage"
              :itemsCount="50"
              :currentPage="currentPage"
     
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
import { useConfirm } from "primevue/useconfirm";
import { useToast } from "primevue/usetoast";
import loadingComponent from "@/components/loading/LoadingComponent";
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
    const confirm = useConfirm()
    const toast = useToast()
    const selectedBranch = ref({})
    const branchMembers = ref([])
    const filterFormIsVissible = ref(false);
    const searchIsVisible = ref(false);
    const searchText = ref("");
    const loading = ref(false);
    const branchId = ref("");

    const setSelectedBranch = async(payload) => {
      loading.value = true
      branchId.value = payload.id
      try {
        let { data } = await axios.get(`/api/BranchNetwork/People?branchID=${payload.id}`)
        loading.value = false
        console.log(data)
        branchMembers.value = data
        if (data.length === 0) {
          toast.add({
              severity: "warn",
              summary: "No members found",
              detail: "There are no members in this branch yet.",
              life: 7000,
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

    const searchBranchMember = computed(() => {
      if (branchMembers.value.length > 0 && !searchText.value) return branchMembers.value
      return branchMembers.value.filter(i => {
        return i.firstName.toLowerCase().includes(searchText.value.toLowerCase())
      })
    })

    const deleteMember = (id) => {
      axios
        .delete(`/api/People/DeleteOnePerson/${id}`)
        .then((res) => {
          console.log(res);
          branchMembers.value = branchMembers.value.filter(
            (item) => item.id !== id
          );
          if (res.data.response.includes("@")) {
            let disRes = res.data.response.split("@")
            toast.add({
              severity: "info",
              summary: "Info",
              detail: disRes[0],
              life: 10000,
            });
          } else {
            toast.add({
              severity: "success",
              summary: "Confirmed",
              detail: "Member Deleted",
              life: 5000,
            });
          }
        })
        .catch((err) => {
          toast.add({
            severity: "error",
            summary: "Delete Error",
            detail: "Deleting member failed",
            life: 3000,
          });
          console.log(err);
        });
    };

    const showConfirmModal = (id) => {
      confirm.require({
        message: "Are you sure you want to proceed?",
        header: "Confirmation",
        icon: "pi pi-exclamation-triangle",
        acceptClass: "confirm-delete",
        rejectClass: "cancel-delete",
        accept: () => {
          deleteMember(id);
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

    const currentPage = ref(0);
    const getPeopleByPage = async (page) => {
      if (page < 0) return false;
      try {
        const { data } = await axios.get(
          `/api/BranchNetwork/People?branchID=${branchId.value}&page=${page}`
        );
        console.log(data)
        branchMembers.value = data;
        currentPage.value = page;
      } catch (error) {
        console.log(error);
      }
    };
    

    return {
      setSelectedBranch,
      selectedBranch,
      branchMembers,
      filterFormIsVissible,
      searchIsVisible,
      toggleFilterFormVissibility,
      toggleSearch,
      searchBranchMember,
      searchText,
      showConfirmModal,
      deleteMember,
      loading,
      getPeopleByPage,
      branchId,
      currentPage
    };
  },
};
</script>

<style scoped>/*
* {
  box-sizing: border-box;

}

.itemroute-color {
  color: #136acd;
}

a {
  text-decoration: none;
}

.picture,
.firstname,
.lastname,
.phone,
.action {
  width: 100%;

}

.my-con {

  justify-content: space-between;
  margin: 24px 0;
}

.summary {

  border-radius: 30px;

  padding: 24px 10px;
  background: #fff;
  box-shadow: 0px 3px 6px #2c28281c;
  border: 1px solid #00204424;
}

.table {
  box-shadow: 0px 3px 6px #2c28281c;
 
  border-radius: 30px;
  width: 100% !important;
}

.summary-header {
  margin: -0.8rem 10px 0.5rem 10px;
  color: #136acd;
  opacity: 0.8;
  font-size: 22px;
  font-weight: 600;
}

.boards {
  display: flex;
}

.board {
  width: 28%;
  border-radius: 10px;
 
  padding: 0 8px;
 
}

.chart-con {
  width: 70%;
  display: flex;
  justify-content: space-between;
}

.board-top {
  display: flex;
  justify-content: space-between;
  margin-bottom: 40px;
  align-items: center;
  box-shadow: 0px 3px 6px #2c28281c;
  padding: 4px;
}

.total {
  margin-bottom: 40px;
  font-size: 37px;
}

.total-text {
  font-size: 15px;
  font-weight: 700;
}

.percent {
  color: #136acd;
}

.tbl-footer-btn {
  background: transparent;
  padding: 4px;
  margin: 4px 8px;
  border-radius: 50%;
  width: 29px;
  border: none;
  border: 1px solid #8898aa80;
  outline: transparent;
}

.action-icon {
  text-align: center;
}

.chart1,
.chart2 {
  border-radius: 10px;
}

.picture .data-value {
 
  width: 50%;
}





.elipsis-items a {
  display: flex;
  justify-content: stretch;
}

.text-color:hover {
  color: #007bff;
}

.groupicon-color {
  background-color: #136acd;
  color: #fff;
}

.no-record {
  color: rgba(184, 5, 5, 0.726);
  font-size: 1.1em;
}

.color-groupicon {
  color: #136acd;
}
.color-deleteicon {
  color: rgba(184, 5, 5, 0.726);
}

.fade-text {
  color: #a8a8a8;
  cursor: not-allowed;
}

.text-color {
  color: #212529;
}

@media screen and (max-width: 500px) {
  .chart1,
  .chart2,
  .board,
  .chart-con {
    width: 100% !important;
  }

  .picture,
  .firstname,
  .lastname,
  .phone,
  .action {
    width: 100%;
  
  }

  .table {
    padding: 0 10px;
  }

  .table-body .check {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    margin: 10px 0;
  }

  .data-text {
    display: inline-block;
  }

  .data-row {
    flex-direction: column;
  }

  .data-con {
    display: flex;
    justify-content: space-between;
  }

  .action-icon {
    width: 100%;
    text-align: right;
  }

  .table-header {
    display: none;
    padding: 0 0 0 2rem;
  }
}

@media screen and (min-width: 500px) {
  .picture > p {
    margin-left: 43px;
  }

  .table-body .check {
    width: 4%;
  }

  .action {
    width: 20%;
  }
}



@media screen and (max-width: 768px) {
  .board-top {
    margin-bottom: 10px;
  }

  .total {
    margin-bottom: 0;
  }
}

@media screen and (min-width: 501px) and (max-width: 768px) {
  .board {
    width: 50% !important;
    margin-bottom: 10px;
  }

  .summary-header {
    width: 50%;
    margin-left: 26.5%;
  }
}

@media screen and (max-width: 1024px) {
  .my-con {
    flex-direction: column;
  }

  .table {
    width: 100%;
    margin: 24px auto;
  }

  .summary {
    width: 98%;
    margin: auto;
  }
}

.row-divider {
  border: 1px solid #0020440a;
  margin: 0;
}

.table-footer {
  display: flex;
  justify-content: flex-end;
  background: #fff;
  padding: 10px 0;
  border-radius: 0px 0px 22px 22px;
}

.hide  {
  display: none;
}
.show {
  display: block;
}*/
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