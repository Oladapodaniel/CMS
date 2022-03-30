<template>
  <div>
    <div class="container-wide container-top">
      <div class="row my-3">
      <div class="col-md-6 first-timers-text">
        <h2 class="page-header">Branch Attendance</h2>
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
      <div class="row table" v-if="branchAttendance.length > 0">
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
              <div class="small-text col-md-4 font-weight-bold">
                EVENT
              </div>
              <div class="small-text col-md-4 font-weight-bold">
                DATE
              </div>
              <div class="small-text col-md-4 font-weight-bold">
                GROUP
              </div>
            </div>
          </div>
        <div class="container-fluid">
          <div class="row">
            <div
              class=" col-12 py-2 px-0 c-pointer tr-border-bottom hover"
              v-for="(item, index) in searchBranchAttendance"
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
                <div class="desc-head small-text col-md-4">
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
                    <router-link :to="{ name: 'CheckinType', 
                                        query: { 
                                            activityID: item.eventID,
                                            activityName: item.fullEventName,
                                            groupId: item.groupID,
                                            groupName: item.fullGroupName,
                                            id: item.id,
                                            code: item.attendanceCode,
                                            fromBranch: true
                                        } 
                                    }" class="itemroute-color">
                        <span class="text-decoration-none">
                            {{ item.fullEventName }}
                        </span>
                    </router-link>
                  </p>
                </div>

                <div class="desc-head small-text col-md-4">
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
                    <router-link :to="{ name: 'CheckinType', 
                                        query: { 
                                            activityID: item.eventID,
                                            activityName: item.fullEventName,
                                            groupId: item.groupID,
                                            groupName: item.fullGroupName,
                                            id: item.id,
                                            code: item.attendanceCode,
                                            fromBranch: true
                                        } 
                                    }" class="itemroute-color">
                        <span class="text-decoration-none">
                            {{ formatDate(item.eventDate) }}
                        </span>
                    </router-link>
                  </p>
                </div>

                <div class="desc-head small-text col-md-3">
                  <div class="d-flex justify-content-between">
                    <span
                      class="
                        text-dark
                        font-weight-bold
                        d-flex d-md-none
                        fontIncrease
                      "
                      >Group</span
                    >
                    <div>
                      <div class="desc small-text text-right text-md-left">
                          <router-link :to="{ name: 'CheckinType', 
                                        query: { 
                                            activityID: item.eventID,
                                            activityName: item.fullEventName,
                                            groupId: item.groupID,
                                            groupName: item.fullGroupName,
                                            id: item.id,
                                            code: item.attendanceCode,
                                            fromBranch: true
                                        } 
                                    }" class="itemroute-color">
                        {{ item.fullGroupName }}
                          </router-link>
                      </div>
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
                            <router-link
                              :to="{
                                name: 'AttendanceReport',
                                params: { id: item.id },
                              }"
                            >
                              <a class="dropdown-item elipsis-items"> View details </a>
                            </router-link>
                            <router-link :to="{ name: 'CheckinType', 
                                        query: { 
                                            activityID: item.eventID,
                                            activityName: item.fullEventName,
                                            groupId: item.groupID,
                                            groupName: item.fullGroupName,
                                            id: item.id,
                                            code: item.attendanceCode,
                                            fromBranch: true
                                        } 
                                    }">
                              <a class="dropdown-item elipsis-items"> Checkin </a>
                            </router-link>
                            <a
                              class="dropdown-item elipsis-items cursor-pointer"
                              @click="showConfirmModal(item.id, index)"
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
import { useConfirm } from "primevue/useconfirm";
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
    const confirm = useConfirm()
    const toast = useToast()
    const selectedBranch = ref({})
    const branchAttendance = ref([])
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
        let { data } = await axios.get(`/api/checkinattendance/allcheckinattendances?branchId=${payload.id}`)
        loading.value = false
        console.log(data)
        branchAttendance.value = data
        if (data.length === 0) {
          toast.add({
              severity: "warn",
              summary: "No checkin attendance found",
              detail: "There are no checkin attendance in this branch yet.",
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

    const searchBranchAttendance = computed(() => {  
      if (branchAttendance.value.length > 0 && !searchText.value) return branchAttendance.value
      return branchAttendance.value.filter(i => {
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
        branchAttendance.value = data.returnObject.contribution;
        currentPage.value = page;
      } catch (error) {
        console.log(error);
      }
    };

    const deleteAttendance = (id, index) => {
      axios
        .delete(`/api/CheckInAttendance/checkout?attendanceId=${id}`)
        .then((res) => {
          console.log(res.status);
          if (res.status === 200) {
            toast.add({
              severity: "success",
              summary: "Delete Successful",
              detail: `${res.data}`,
              life: 3000,
            });
            branchAttendance.value.splice(index, 1)
          } else {
            toast.add({
              severity: "warn",
              summary: "Delete Failed",
              detail: `Please Try Again`,
              life: 3000,
            });
          }
        })
        .catch((err) => {
          //     finish()
          if (err.response) {
            console.log(err.response);
            toast.add({
              severity: "error",
              summary: "Unable to delete",
              detail: `${err.response}`,
              life: 3000,
            });
          } else if (
            err && err.response && err.response.toString().toLowerCase().includes("network error")
          ) {
            toast.add({
              severity: "warn",
              summary: "Unable to delete",
              detail: `Please ensure you have a strong internet connection`,
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
          deleteAttendance(id, index);
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
      setSelectedBranch,
      selectedBranch,
      branchAttendance,
      filterFormIsVissible,
      searchIsVisible,
      toggleFilterFormVissibility,
      toggleSearch,
      searchBranchAttendance,
      searchText,
      showConfirmModal,
      deleteAttendance,
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