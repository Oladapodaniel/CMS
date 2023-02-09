
<template>
  <!-- tosin working on tables -->
  <div class="row table">
    <div class="col-12 px-0" id="table">
      <div class="top-con" id="ignore2">
        <div class="table-top">
          <div class="select-All mr-3">
            <input
              class="d-block d-md-none"
              type="checkbox"
              name="all"
              id="all"
              @change="markAllAttendance"
              :checked="checkedAttendance.length === searchAttendance.length"
            />
            <label class="d-block d-md-none">SELECT ALL</label>
            <i
              class="
                pi pi-trash
                text-danger
                mr-3
                c-pointer
                d-flex-inline
                align-items-center
              "
              style="font-size: 20px; margin-bottom: 12px"
              v-if="checkedAttendance.length > 0"
              @click="modal"
            >
            </i
            >&nbsp; &nbsp;
          </div>
          <div class="col-4">
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
              <input type="text" placeholder="Search..." v-model="searchText" />
              <span class="empty-btn" @click="removeSearchText">x</span>
              <span class="search-btn">
                <i class="pi pi-search"></i>
              </span>
            </label>
          </div>
        </div>
      </div>

      <!-- search groups -->
      <div>
        <div class="container-fluid d-none d-md-block">
          <div class="row t-header">
            <div class="col-md-1">
              <input
                type="checkbox"
                name="all"
                id="all"
                @change="markAllAttendance"
                :checked="checkedAttendance.length === searchAttendance.length"
              />
            </div>
            <div class="small-text text-capitalize col-md-3 font-weight-bold">
              Event Name
            </div>
            <!-- <div class="col-md-2"></div> -->
            <div
              class="
                small-text
                text-capitalize
                col-md-3
                font-weight-bold
                d-flex
                justify-content-center
                ml-md-n4
              "
            >
              Date
            </div>
            <div
              class="
                small-text
                text-capitalize
                col-md-3
                font-weight-bold
                d-flex
                justify-content-center
              "
            >
              Group Name
            </div>
            <div
              class="small-text text-capitalize col-md-1 font-weight-bold"
            ></div>
            <div
              class="
                small-text
                text-capitalize
                col-md-1
                font-weight-bold
                d-flex
                justify-content-end
              "
            >
              Action
            </div>
            <!-- </div> -->
          </div>
        </div>

        <div class="row" style="margin: 0">
          <div class="col-12 parent-desc px-0">
            <!-- removed v-for above -->
            <!-- loading group -->
            <!-- <div class="row" v-if="!loading && groups.length === 0">
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
                        <p class="py-2">No groups yet</p>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-12 px-0">
                        <hr class="hr my-0" />
                      </div>
                    </div>
                  </div>
                </div> -->
            <!-- loading group -->

            <!-- loadding -->
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
                      class="fas fa-circle-notch fa-spin py-4"
                      v-if="loading"
                    ></i>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-12 px-0">
                    <hr class="hr my-0" />
                  </div>
                </div>
              </div>
            </div>
            <!-- loadding -->

            <div
              class="
                row
                w-100
                c-pointer
                text-dark
                tr-border-bottom
                hover
                d-flex
                align-items-center
                py-2
              "
              style="margin: 0"
              v-for="(item, index) in searchAttendance"
              :key="index"
            >
              <div class="col-md-1 d-flex d-md-block px-3 justify-content-end">
                <input
                  type="checkbox"
                  name=""
                  id=""
                  @change="check1item(item)"
                  :checked="
                    checkedAttendance.findIndex((i) => i.id === item.id) >= 0
                  "
                />
              </div>

              <div class="col-md-3 desc">
                <p class="mb-0 d-flex justify-content-between">
                  <span
                    class="
                      text-dark
                      font-weight-bold
                      d-flex d-md-none
                      fontIncrease
                    "
                    style="font-size: 15px"
                    >Event Name</span
                  >
                  <router-link
                    class="text-decoration-none font-weight-500 itemroute-color"
                    :to="{
                      name: 'CheckinType',
                      query: {
                        activityID: item.eventID,
                        activityName: item.fullEventName,
                        groupId: item.groupID,
                        groupName: item.fullGroupName,
                        id: item.id,
                        code: item.attendanceCode,
                      },
                    }"
                  >
                    {{ item.fullEventName }}
                  </router-link>
                </p>
              </div>

              <div class="col-md-3">
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
                  <div class="desc small-text text-right text-md-center">
                    <router-link
                      class="
                        text-decoration-none
                        font-weight-500
                        itemroute-color
                      "
                      style="margin-left: 4.5rem"
                      :to="{
                        name: 'CheckinType',
                        query: {
                          activityID: item.eventID,
                          activityName: item.fullEventName,
                          groupId: item.groupID,
                          groupName: item.fullGroupName,
                          id: item.id,
                          code: item.attendanceCode,
                        },
                      }"
                    >
                      {{ formatDate(item.eventDate) }}
                    </router-link>
                  </div>
                </div>
              </div>

              <div class="col-md-3">
                <div class="d-flex small justify-content-between">
                  <span
                    class="
                      text-dark
                      font-weight-bold
                      d-flex d-md-none
                      fontIncrease
                    "
                    style="font-size: 15px"
                    >Group Name</span
                  >
                  <div class="desc small-text text-right text-md-left ml-md-5">
                    <router-link
                      class="
                        text-decoration-none
                        font-weight-500
                        itemroute-color
                      "
                      :to="{
                        name: 'CheckinType',
                        query: {
                          activityID: item.eventID,
                          activityName: item.fullEventName,
                          groupId: item.groupID,
                          groupName: item.fullGroupName,
                          id: item.id,
                          code: item.attendanceCode,
                        },
                      }"
                    >
                      {{ item.fullGroupName }}
                    </router-link>
                  </div>
                </div>
              </div>

              <div class="col-md-1"></div>

              <div class="col-md-1">
                <div>
                  <div class="dropdown ml-md-n3">
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
                          <a class="dropdown-item">
                            <router-link
                              class="text-decoration-none text-dark"
                              :to="{
                                name: 'AttendanceReport',
                                params: { id: item.id },
                              }"
                              >View Details</router-link
                            >
                          </a>
                          <a class="dropdown-item">
                            <router-link
                              class="text-decoration-none text-dark"
                              :to="{
                                name: 'CheckinType',
                                query: {
                                  activityID: item.eventID,
                                  activityName: item.fullEventName,
                                  groupId: item.groupID,
                                  groupName: item.fullGroupName,
                                  id: item.id,
                                  code: item.attendanceCode,
                                },
                              }"
                              >Checkin</router-link
                            >
                          </a>
                          <!-- <a class="dropdown-item">
                            <router-link
                              class="text-decoration-none text-dark"
                              :to="{
                                name: 'AddAttendance',
                                params: {
                                  id: item.id,
                                },
                              }"
                              >Edit</router-link
                            >
                          </a> -->
                          <a
                            class="dropdown-item elipsis-items"
                            href="#"
                            @click.prevent="showConfirmModal(item.id, index)"
                            >Delete
                          </a>
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
            :totalItems="totalItems"
          />
        </div>
      </div>
    </div>
    <!-- {{totalItems}} -->
    <div class="row" v-if="errorOccurred">
      <div class="col-md-12 text-center">
        <p>Error getting items</p>
      </div>
    </div>
  </div>
  <!-- tosin working on tables -->

  <ConfirmDialog />
  <Toast />
  <!-- end of table area -->
</template>

<script>
import { ref, computed } from "vue";
import dateFormatter from "../../../services/dates/dateformatter";
import { useConfirm } from "primevue/useconfirm";
import { useToast } from "primevue/usetoast";
import ConfirmDialog from "primevue/confirmdialog";
import stopProgressBar from "../../../services/progressbar/progress";
import axios from "@/gateway/backendapi";
import Toast from "primevue/toast";
import Pagination from "../../../components/pagination/PaginationButtons.vue";

export default {
  props: ["list", "errorOccurred", "totalItems"],
  components: { ConfirmDialog, Toast, Pagination },
  emits: ["pagedattendance", "checkedattendance"],
  setup(props, { emit }) {
    let toast = useToast();
    const expose = ref(false);
    const loading = ref(false);
    const attendanceList = ref([]);
    const checkedAttendance = ref([]);
    // const marked = ref([]);
    // const AttendanceCheList = ref(props.list)

    const toggleEllips = () => {
      toggleEllips.value = !toggleEllips.value;
    };

    const getPeopleList = () => {
      // console.log(props.list, "props");
      attendanceList.value = props.list;
      // store.dispatch('churchMembers', props.list)
    };
    getPeopleList();

    const formatDate = (date) => {
      return dateFormatter.monthDayYear(date);
    };

    const convert = (x) => {
      return x.map((i) => i.id);
    };

   

    const checkOutAttendance = () => {
      // let newarray = []
      let dft = convert(checkedAttendance.value);
      console.log(dft, "👌😂😂");
      axios
        .post(`/api/CheckInAttendance/Delete/Multiple`, dft)
        .then((res) => {
          let incomingRes = res.data;
          console.log(incomingRes, "🙌❤🙌❤🙌");
          if (incomingRes.toString().toLowerCase().includes("attendance")) {
            toast.add({
              severity: "success",
              summary: "Confirmed",
              detail: "Attendance(s) deleted successfully.",
              life: 4000,
            });
            // attendanceList.value = attendanceList.value.filter((item) => {
            //       const y = checkedAttendance.value.findIndex(
            //         (i) => i.id === item.id
            //       );
            //        console.log(y , "old are u now");
            //       if (y >= 0) return false;
            //       return true;
            //     });
            emit("checkedattendance", checkedAttendance.value);
          }
          // checkedAttendance.value = [];
        })
        .catch((err) => {
          stopProgressBar();
          if (err.toString().toLowerCase().includes("network error")) {
            toast.add({
              severity: "warn",
              summary: "Network Error",
              detail: "Please ensure you have a strong internet connection",
              life: 4000,
            });
          } else if (err.toString().toLowerCase().includes("timeout")) {
            toast.add({
              severity: "warn",
              summary: "Request Delayed",
              detail: "Request took too long to respond",
              life: 4000,
            });
          } else {
            toast.add({
              severity: "warn",
              summary: "Delete Failed",
              detail: "Unable to delete attendance",
              life: 4000,
            });
          }
          console.log(err);
        });
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
            emit("attendance-checkin", index);
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
            err.response.toString().toLowerCase().includes("network error")
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

    const confirm = useConfirm();

    const check1item = (ft) => {
      // console.log(ft, "chechbyOne");
      const attendanceIdx = checkedAttendance.value.findIndex(
        (i) => i.id === ft.id
      );
      console.log(attendanceIdx, "chechdetail");
      if (attendanceIdx < 0) {
        checkedAttendance.value.push(ft);
      } else {
        checkedAttendance.value.splice(attendanceIdx, 1);
      }
    };
    const modal = () => {
      confirm.require({
        message: "Are you sure you want to proceed?",
        header: "Confirmation",
        icon: "pi pi-exclamation-triangle",
        acceptClass: "confirm-delete",
        rejectClass: "cancel-delete",
        accept: () => {
          checkOutAttendance();
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

    const markAllAttendance = () => {
      if (checkedAttendance.value.length < props.list.length) {
        props.list.forEach((i) => {
          const ftInMarked = checkedAttendance.value.findIndex(
            (f) => f.id === i.id
          );
          if (ftInMarked < 0) {
            checkedAttendance.value.push(i);
          }
        });
      } else {
        checkedAttendance.value = [];
      }
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

    const searchIsVisible = ref(false);
    const toggleSearch = () => {
      searchIsVisible.value = !searchIsVisible.value;
    };
    let searchText = ref("");
    const searchAttendance = computed(() => {
      if (searchText.value !== "" && props.list.length > 0) {
        return props.list.filter((i) => {
          return i.fullEventName
            .toLowerCase()
            .includes(searchText.value.toLowerCase());
        });
      } else {
        return props.list;
      }
    });

    const removeSearchText = () => {
      searchText = "";
    };

    const currentPage = ref(0);
    const getPeopleByPage = async (page) => {
      if (page < 0) return false;
      try {
        const { data } = await axios.get(
          `/api/CheckInAttendance/AllCheckInAttendances?page=${page}`
        );
        console.log(data);
        if (data.items.length > 0) {
          emit("pagedattendance", data);
        }
        // branchTransactions.value = data.returnObject.contribution;
        currentPage.value = page;
      } catch (error) {
        console.log(error);
      }
    };

    return {
      modal,
      attendanceList,
      checkOutAttendance,
      loading,
      check1item,
      markAllAttendance,
      expose,
      checkedAttendance,
      toggleEllips,
      formatDate,
      showConfirmModal,
      deleteAttendance,
      searchText,
      searchAttendance,
      toggleSearch,
      searchIsVisible,
      removeSearchText,
      currentPage,
      getPeopleByPage,
    };
  },
};
</script>

<style scoped>
.table {
  border-radius: 30px;
}

.table-header {
  padding: 10px;
  font-size: 14px;
  border-radius: 30px 30px 0 0;
  text-align: left;
  color: #000;
  font-weight: 700;
}

.t-body {
  padding: 0 10px;
}

.parent-element {
  box-shadow: 0px 1px 4px #02172e45;
}

.page-header {
  font-family: Nunito sans;
  font-size: 22px;
  font-weight: 800;
  color: #212529;
}

.head-button {
  display: flex;
  justify-content: flex-end;
}

.add-btn {
  width: 180px;
  background: #136acd;
  border-radius: 22px;
  color: #ffffff;
  font-weight: bold;
  outline: none;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 42px;
  text-decoration: none;
}

.dcreated,
.tattendance,
.alist {
  font-weight: 700;
  color: #212529;
}

.dropdown-item {
  font-weight: 600;
  color: #212529;
  cursor: pointer;
}

.dcreated2,
.tattendance2,
.alist2 {
  font-weight: 700;
  color: #212529;
  margin: 0.8rem 0.8rem;
}

.elist,
.eattendance,
.edate {
  font-weight: 500;
  color: #212529;
}

.elist2,
.eattendance2,
.edate2 {
  color: #212529;
  margin: 0.8rem 0.8rem;
}

.ion {
  font-weight: 600;
  display: flex;
  justify-content: start;
}

.ion2 {
  font-weight: 600;
  display: flex;
  justify-content: end;
  margin: 0.8rem 0.8rem;
}

.hr {
  margin-top: -2rem;
}

/* background: #0f529f; */

@media (max-width: 414px) {
  .head-button {
    flex-direction: column;
    align-items: center;
  }

  .page-header {
    font-family: Nunito sans;
    font-size: 22px;
    font-weight: 800;
    color: #212529;
    text-align: center;
    margin-top: 1.2rem;
    margin-bottom: -0.8rem;
  }

  .add-btn {
    width: 180px;
    background: #136acd;
    border-radius: 20px;
    color: #ffffff;
    font-weight: bold;
    outline: none;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 40px;
    text-decoration: none;
    margin-top: 1rem;
  }

  .table-header {
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    text-align: left;
    justify-items: left;
  }
}

@media (max-width: 575px) {
  .head-button {
    flex-direction: column;
    align-items: center;
  }

  .page-header {
    font-family: Nunito sans;
    font-size: 22px;
    font-weight: 800;
    color: #212529;
    text-align: center;
    margin-top: 1.2rem;
    margin-bottom: -0.8rem;
  }

  .add-btn {
    width: 180px;
    background: #136acd;
    border-radius: 20px;
    color: #ffffff;
    font-weight: bold;
    font-size: 0.8rem;
    outline: none;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 40px;
    text-decoration: none;
    margin-top: 1rem;
  }

  .head-button {
    display: flex;
    /* flex-direction: row; */
    /* align-items: center; */
    justify-content: center;
  }
}

/* tosin working */
.myselectContr {
  height: 2.5rem;
}
.data-value a {
  color: #136acd;
  text-decoration: none;
  width: 241px;
}
.page-header {
  font-weight: 700;
  font-size: 1.7rem;
}
.summary {
  border-radius: 30px;
  /* box-shadow: 0px 3px 6px #2c28281c; */
  padding: 24px 10px;
  background: #fff;
  box-shadow: 0px 3px 6px #2c28281c;
  border: 1px solid #00204424;
}
.table {
  width: 100% !important;
  box-shadow: 0px 1px 4px #02172e45;
  border: 1px solid #dde2e6;
  border-radius: 30px;
  text-align: left;
  margin-bottom: auto !important;
}
.boards {
  display: flex;
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
.hr {
  border: 1px solid #0020440a;
  margin: 0 4px 10px 0;
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
.list-body {
  padding: 0 21px;
}
.data-value {
  display: flex;
  padding-left: 6px;
}
.theader {
  padding-left: 2px;
  text-align: left;
}
.filter-options {
  height: 0;
  overflow: hidden;
  transition: all 0.5s ease-in-out;
}
.filter-options-shown {
  height: 80px !important;
  overflow: hidden;
  transition: all 0.5s ease-in-out;
}
.clear-link,
.hide-link {
  color: #136acd;
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
@media (max-width: 660px) {
  .select-all {
    display: none;
  }
}
.header {
  background: #dde2e6 0% 0% no-repeat padding-box;
  font: normal normal bold 13px/13px Nunito Sans;
  letter-spacing: 0px;
  color: #002044;
}
.header tr {
  color: #8898aa;
  font-size: 11px;
  box-shadow: 0px 3px 6px #2c28281c;
  background: #dde2e6 0% 0% no-repeat padding-box;
}
.select-all input {
  margin: 0 8px 0 -5px !important;
}
.currency {
  background: #fafafa 0% 0% no-repeat padding-box;
  /* border: 1px solid #C5D9F2; */
  border-radius: 5px;
  letter-spacing: 0px;
  color: #1c252c;
  padding: 4px;
  font-weight: bold;
}
.offering-amount {
  border: 1px solid #00204424;
  padding: 5px;
  border-radius: 5px;
}
.head-button {
  display: flex;
  justify-content: flex-end;
}
.add-btn {
  width: 180px;
  background: #136acd;
  border-radius: 22px;
  color: #ffffff;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 42px;
  text-decoration: none;
}
.more {
  background: #dde2e6;
  border-radius: 22px;
  width: 180px;
  font-weight: bold;
  border: transparent;
  outline: transparent;
  height: 42px;
  margin-right: 1rem;
}
.fa-ellipsis-v:hover {
  cursor: pointer;
}

.fa-ellipsis-v {
  padding: 10px;
}
.board.members-count {
  padding: 24px;
}
.no-record {
  color: rgba(184, 5, 5, 0.726);
  font-size: 1.1em;
}

.itemroute-color {
  color: #136acd;
}
@media (max-width: 767px) {
  .first-timers-text {
    text-align: center;
  }
  .head-button {
    display: flex;
    justify-content: center;
  }
}
@media screen and (max-width: 500px) {
  .board {
    width: 100% !important;
  }
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
@media (max-width: 577px) {
  .head-button {
    flex-direction: column;
    align-items: center;
  }
  .more {
    margin-right: 0;
  }
  .add-btn {
    margin-top: 10px;
  }
}
@media (max-width: 575px) {
  .head-button {
    display: flex;
    justify-content: center;
  }
}
@media screen and (min-width: 501px) and (max-width: 768px) {
  .board {
    width: 50% !important;
    margin-bottom: 10px;
  }
  .summary-header {
    width: 50%;
    margin-left: 25%;
  }
}
@media screen and (max-width: 768px) {
  .filter-options-shown {
    height: 150px !important;
    overflow: hidden;
    transition: all 0.5s ease-in-out;
  }
  .boards {
    flex-wrap: nowrap;
  }
  .responsive-table {
    max-width: 100%;
    overflow-x: scroll;
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
.board.members-count {
  max-height: 216px;
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
.itemroute-color {
  /* color: #136acd; */
  color: #02172e;
}
.itemroute-color:hover {
  text-decoration: none;
}
.t-header {
  background: #dde2e6 0% 0% no-repeat padding-box;
  font-size: 16px;
  padding: 0.5rem 0;
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

.hover:hover {
  background: #eee;
}
/* @media Queries */
@media (max-width: 771px) {
  .fontIncrease {
    font-size: 20px;
  }

  .itemroute-color {
    color: #136acd;
    /* color: #02172e; */
  }
}
/* tosin working */
</style>