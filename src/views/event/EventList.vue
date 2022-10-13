<template>
  <div>
    <div class="row">
      <div class="col-sm-12 text-center">
        <div class="avg">Overall Average</div>
      </div>
    </div>

    <div class="row mt-4 mobileResponsive">
      <div
        class="col-6 col-sm-1 text-center default-btn cursor-pointer monthRessponsive"
        :class="{ 'active-btn': monthlyActiveBtn }"
        @click="toggleMonthlyClass"
      >
        <div>Monthly</div>
      </div>
      <div
        class="col-6 col-sm-1 ml-sm-2 text-center default-btn cursor-pointer yearResponsive"
        :class="{ 'active-btn': yearlyActiveBtn }"
        @click="toggleYearlyClass"
      >
        <div>Yearly</div>
      </div>
      <div
        class="
          col-6
          offset-3 offset-sm-0
          col-sm-1
          ml-sm-2
          mt-3 mt-sm-0
          text-center
          default-btn
          cursor-pointer
        "
        :class="{ 'active-btn': allTimeActiveBtn }"
        @click="toggleAllTimeClass"
      >
        <div>All Time</div>
      </div>
    </div>

    <!-- Monthly -->
    <div class="row avg-table mt-4" v-if="monthlyActiveBtn">
      <div
        class="col-6 col-md-3 first-row"
        v-tooltip.left="`${eventSummary.attendanceAverage.monthly}`"
      >
        <div>Attendance</div>
        <div>{{ convert(eventSummary.attendanceAverage.monthly) }}</div>
      </div>
      <div
        class="col-6 col-md-3"
        v-tooltip.left="`${eventSummary && eventSummary.offeringAverage && eventSummary.offeringAverage.monthly ? eventSummary.offeringAverage.monthly : '-- --'}`"
      >
        <div>
          Offering<span style="font-size: 15px" class="font-weight-700"
            >({{ userCurrency }})</span
          >
        </div>
        <div>{{ eventSummary && eventSummary.offeringAverage && eventSummary.offeringAverage.monthly ? convert(eventSummary.offeringAverage.monthly) : "-- --" }}</div>
      </div>
      <div
        class="col-6 col-md-3"
        v-tooltip.left="`${eventSummary.firstTimerAverage.monthly}`"
      >
        <div>First Timers</div>
        <div>{{ convert(eventSummary.firstTimerAverage.monthly) }}</div>
      </div>
      <div
        class="col-6 col-md-3"
        v-tooltip.left="`${eventSummary.newConvertAverage.monthly}`"
      >
        <div>New Converts</div>
        <div>{{ convert(eventSummary.newConvertAverage.monthly) }}</div>
      </div>
      <!-- <div class="col-12">
        <div>Last Updated 2 hours ago</div>
      </div> -->
    </div>

    <!-- yearly -->
    <div class="row avg-table mt-4" v-if="yearlyActiveBtn">
      <div
        class="col-6 col-md-3 first-row"
        v-tooltip.left="`${eventSummary.attendanceAverage.yearly}`"
      >
        <div>Attendance</div>
        <div>{{ convert(eventSummary.attendanceAverage.yearly) }}</div>
      </div>
      <div
        class="col-6 col-md-3"
        v-tooltip.left="`${eventSummary && eventSummary.offeringAverage && eventSummary.offeringAverage.yearly ? eventSummary.offeringAverage.yearly : '-- --'}`"
      >
        <div>
          Offering<span style="font-size: 15px" class="font-weight-700"
            >({{ userCurrency }})</span
          >
        </div>
        <div>{{ eventSummary && eventSummary.offeringAverage && eventSummary.offeringAverage.yearly ? convert(eventSummary.offeringAverage.yearly) : "-- --" }}</div>
      </div>
      <div
        class="col-6 col-md-3"
        v-tooltip.left="`${eventSummary.firstTimerAverage.yearly}`"
      >
        <div>First Timers</div>
        <div>{{ convert(eventSummary.firstTimerAverage.yearly) }}</div>
      </div>
      <div
        class="col-6 col-md-3"
        v-tooltip.left="`${eventSummary.newConvertAverage.yearly}`"
      >
        <div>New Converts</div>
        <div>{{ convert(eventSummary.newConvertAverage.yearly) }}</div>
      </div>
      <!-- <div class="col-12">
        <div>Last Updated 2 hours ago</div>
      </div> -->
    </div>

    <!-- All time -->
    <div class="row avg-table mt-4" v-if="allTimeActiveBtn">
      <div
        class="col-6 col-md-3 first-row"
        v-tooltip.left="`${eventSummary.attendanceAverage.allTime}`"
      >
        <div>Attendance</div>
        <!-- <div>{{ eventSummary.attendance ? eventSummary.attendance.toString().length > 6 ? `${eventSummary.attendance.toString().slice(0, 6)}...` : eventSummary.attendance : 0}}</div> -->
        <div>{{ convert(eventSummary.attendanceAverage.allTime) }}</div>
      </div>
      <div
        class="col-6 col-md-3"
        v-tooltip.left="`${eventSummary && eventSummary.offeringAverage && eventSummary.offeringAverage.allTime ? eventSummary.offeringAverage.allTime : '-- --'}`"
      >
        <div>
          Offering<span style="font-size: 15px" class="font-weight-700"
            >({{ userCurrency }})</span
          >
        </div>
        <div>{{ eventSummary && eventSummary.offeringAverage && eventSummary.offeringAverage.allTime ? convert(eventSummary.offeringAverage.allTime) : "-- --" }}</div>
      </div>
      <div
        class="col-6 col-md-3"
        v-tooltip.left="`${eventSummary.firstTimerAverage.allTime}`"
      >
        <div>First Timers</div>
        <div>{{ convert(eventSummary.firstTimerAverage.allTime) }}</div>
      </div>
      <div
        class="col-6 col-md-3"
        v-tooltip.left="`${eventSummary.newConvertAverage.allTime}`"
      >
        <div>New Converts</div>
        <div>{{ convert(eventSummary.newConvertAverage.allTime) }}</div>
      </div>
      <!-- <div class="col-12">
        <div>Last Updated 2 hours ago</div>
      </div> -->
    </div>
    <!-- </div> -->
    <hr class="hr" />
    <!-- </div> -->
    <!-- <div class="container"> -->
    <div class="row">
      <div class="col-sm-12 p-0">
        <div class="table table-responsive">
          <div class="top-con">
            <div class="table-top my-3">
              <div class="select-all">
                <input type="checkbox" name="all" id="all" />
                <label>SELECT ALL</label>
              </div>
              <div class="filter">
                <p @click="toggleFilterFormVissibility" class="mt-2">
                  <i class="fas fa-filter"></i>
                  FILTER
                </p>
              </div>
              <p @click="toggleSearch" class="search-text mt-2">
                <i class="pi pi-search"></i> SEARCH
              </p>
              <div class="search d-flex">
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
                          col-12 col-sm-6
                          offset-sm-3 offset-md-0
                          form-group
                          inp
                          w-100
                        "
                      >
                        <!-- <div class="input-field"> -->

                        <input
                          type="text"
                          class="input w-100"
                          placeholder="First Name"
                        />
                        <!-- </div> -->
                      </div>

                      <div class="col-12 col-sm-6 form-group d-none d-md-block">
                        <input
                          type="date"
                          class="form-control input inp w-100"
                        />
                      </div>
                    </div>

                    <div class="row">
                      <div class="col-12 col-sm-6 form-group d-none d-md-block">
                        <input
                          type="text"
                          class="input w-100"
                          placeholder="Last Name"
                        />
                      </div>

                      <div class="col-12 col-sm-6 form-group d-none d-md-block">
                        <input
                          type="text"
                          class="input w-100"
                          placeholder="Phone Number"
                        />
                      </div>
                    </div>
                  </div>

                  <div class="col-md-3 d-flex flex-column align-items-center">
                    <button class="apply-btn text-white">
                      <!-- @click="applyFilter"
                      :disabled="disableBtn" -->
                      Apply
                    </button>
                    <span class="mt-2">
                      <a class="clear-link mr-2" @click="clearAll">Clear all</a>
                      <span class="mx-2"
                        ><i
                          class="fas fa-circle"
                          style="font-size: 4px"
                        ></i></span
                      ><a class="hide-link ml-2" @click="hide">Hide</a>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="row table-header">
            <div class="col-1 d-none d-md-block">STATUS</div>
            <div class="col-2 d-none d-md-block">EVENT NAME</div>
            <div class="col-2 d-none d-md-block">TITLE</div>
            <div class="col-2 d-none d-md-block">DATE</div>
            <div class="col-1 d-none d-md-block">ATTENDANCE</div>
            <div class="col-2 d-none d-md-block">FIRST TIMERS</div>
            <div class="col-2 d-none d-md-block">NEW CONVERTS</div>
          </div>

          <div
            class="table-body row"
            v-for="(event, index) in filterEvents"
            :key="index"
          >
            <!-- <div class="col-6 d-block d-md-none">
                <div class="row">
                  <div class="col-1">
                      STATUS
                  </div>
                      <div class="col-2">
                      EVENT NAME
                  </div>
                      <div class="col-2">
                      TITLE
                  </div>
                      <div class="col-2">
                      DATE
                  </div>
                      <div class="col-1" >
                      ATTENDANCE
                  </div>
                      <div class="col-2" >
                      FIRST TIMERS
                  </div>
                      <div class="col-2" >
                      NEW  CONVERTS
                  </div> 
                </div>
                
            </div> -->
            <div class="col-md-12">
              <div class="row">
                <div class="col-md-1 col-sm-12 p-2 align-self-center">
                  <div class="row px-2">
                    <div class="col-8 col-md-0 d-md-none">
                      <span class="d-md-none d-sm-flex small-text font-weight-700 text-dark px-1">Status</span>
                    </div>
                    <div class="col-4 col-md-12 ">
                      
                      <span class="d-flex justify-content-end">
                          <span class=" d-sm-flex small">
                            <div class="td-first px-1">
                              {{ event.isSent ? "Sent" : "Unsent" }}
                            </div>
                          </span>
                        </span>
                    </div>
                  </div>
                </div>
                <div class="col-md-2 col-sm-12 itemroute-color align-self-center">
                  <div>
                    <span class="d-flex justify-content-between">
                      <span class="d-md-none d-sm-flex small-text font-weight-700 text-dark px-1">Event Name</span>
                      <span class=" d-sm-flex small">
                        <router-link
                          :to="`/tenant/event/${event.activityId}`"
                          class="itemroute-color px-1"
                          >{{ event.eventName }}</router-link
                        >
                      </span>
                    </span>
                  </div>
                </div>
                <div class="col-md-2 col-sm-12 itemroute-color align-self-center">
                   <div>
                    <span class="d-flex justify-content-between">
                      <span class="d-md-none d-sm-flex small-text font-weight-700 text-dark px-1">Title</span>
                      <span class=" d-sm-flex small">
                        <div class="px-1">{{ event.title }}</div>
                      </span>
                    </span>
                  </div>
                  
                </div>
                <div class="col-md-2 col-sm-12 itemroute-color align-self-center">
                   <div>
                    <span class="d-flex justify-content-between">
                      <span class="d-md-none d-sm-flex small-text font-weight-700 text-dark px-1">Date</span>
                      <span class=" d-sm-flex small">
                       <div class="px-1">{{ date(event.activityDate) }}</div>
                      </span>
                    </span>
                  </div>
                  
                </div>
                <div class="col-md-1 col-sm-12 itemroute-color align-self-center">
                  <div>
                    <span class="d-flex justify-content-between">
                      <span class="d-md-none d-sm-flex small-text font-weight-700 text-dark px-1">Attendance</span>
                      <span class=" d-sm-flex small">
                      <div class="px-1">{{ event.attendances }}</div>
                      </span>
                    </span>
                  </div>
                </div>
                <div class="col-md-2 col-sm-12 itemroute-color align-self-center">
                  <div>
                    <span class="d-flex justify-content-between">
                      <span class="d-md-none d-sm-flex small-text font-weight-700 text-dark px-1">FirstTimers</span>
                      <span class=" d-sm-flex small">
                      <div class="px-1">{{ event.firstTimers }}</div>
                      </span>
                    </span>
                  </div>
                </div>
                <div class="col-md-1 col-sm-12 itemroute-color align-self-center">
                  <div>
                    <span class="d-flex justify-content-between">
                      <span class="d-md-none d-sm-flex small-text font-weight-700 text-dark px-1">NewConverts</span>
                      <span class=" d-sm-flex small">
                      <div class="px-1">{{ event.newConverts }}</div>
                      </span>
                    </span>
                  </div>
                </div>
                <div class="col-md-1 col-sm-12 align-self-center  ">
                  <div class="dropdown">
                    <span class="d-flex justify-content-between">
                      <span class="d-md-none d-sm-flex"></span>
                      <span class=" d-sm-flex small px-1">
                       <i
                      class="fas fa-ellipsis-v cursor-pointer"
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
                        :to="`/tenant/report/${event.activityId}`"
                        class="text-decoration-none"
                      >
                        <a class="dropdown-item elipsis-items"> View Report </a>
                      </router-link>

                      <router-link
                        :to="`/tenant/event/${event.activityId}`"
                        class="text-decoration-none"
                      >
                        <a class="dropdown-item elipsis-items"> Edit </a>
                      </router-link>
                      <!-- <router-link :to="`/tenant/event/${event.activityId}`"> -->
                      <a
                        class="dropdown-item elipsis-items cursor-pointer"
                        @click="showConfirmModal(event.activityId, index)"
                      >
                        Delete
                      </a>
                      <!-- </router-link> -->
                    </div>
                      </span>
                    </span>
                   
                  </div>
                </div>
              </div>
            </div>
          </div>
          <ConfirmDialog />
          <Toast />
          {{membersCount}} {{currentPage}}

          <div class="table-footer">
            <PaginationButtons
              @getcontent="getPeopleByPage"
              :itemsCount="membersCount"
              :currentPage="currentPage"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "@/gateway/backendapi";
import { ref, computed } from "vue";
import moment from "moment";
import { useConfirm } from "primevue/useconfirm";
import { useToast } from "primevue/usetoast";
import { useStore } from "vuex";
import userService from "../../services/user/userservice";
import Tooltip from "primevue/tooltip";
import monthDayYear from "../../services/dates/dateformatter";
import convertNumber from "../../services/numbershortener/numberfomatter";
import PaginationButtons from "../../components/pagination/PaginationButtons.vue";
import finish from "../../services/progressbar/progress";
export default {
  directives: {
    tooltip: Tooltip,
  },
  components: {
    PaginationButtons,
  },
  props: ["eventList", "eventSummary"],
  setup(props, { emit }) {
    const filterFormIsVissible = ref(false);
    const searchIsVisible = ref(false);
    const store = useStore();
    const userCurrency = ref(store.getters.currency);
    const searchText = ref("");
    const monthlyActiveBtn = ref(true);
    const yearlyActiveBtn = ref(false);
    const allTimeActiveBtn = ref(false);

    // const getEventSummary = async () => {
    //   try {
    //     const { data } = await axios.get("/api/Events/Eventsummary");
    //     console.log(data);
    //     eventSummary.value = data;
    //     kBoolean.value = true
    //   } catch (err) {
    //     console.log(err.response);
    //   }
    // };
    // getEventSummary();
    const deleteEvent = (id, index) => {
      axios
        .delete(`/api/Events/DeleteActivity?activityId=${id}`)
        .then((res) => {
          console.log(res);
            toast.add({
              severity: "success",
              summary: "Delete Successful",
              detail: `Event Deleted`,
              life: 4000,
            });
            emit("delete-event", index)
          // } else {
          //   toast.add({
          //     severity: "warn",
          //     summary: "Delete Failed",
          //     detail: `Please Try Again`,
          //     life: 3000,
          //   });
          // }
        })
        .catch((err) => {
          finish();
          if (err.response.toString().toLowerCase().includes('network error')) {
            toast.add({
              severity: "info",
              summary: "Network Error",
              detail: `Please ensure you have a strong internet connection`,
              life: 4000,
            });
          } else {
            toast.add({
              severity:"Delete Failed",
              detail: `Unable to delete, please try again`,
              life: 4000,
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
          deleteEvent(id, index);
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

    const toggleFilterFormVissibility = () => {
      filterFormIsVissible.value = !filterFormIsVissible.value;
    };

    const toggleSearch = () => {
      searchIsVisible.value = !searchIsVisible.value;
    };

    const getUserCurrency = async () => {
      const user = await userService.getCurrentUser();
      console.log(user, "user");
      userCurrency.value = user.currency;
    };

    if (!userCurrency.value) getUserCurrency();

    const filterEvents = computed(() => {
      if (searchText.value !== "") {
        return props.eventList.filter((i) => {
          return i.eventName
            .toLowerCase()
            .includes(searchText.value.toLowerCase());
        });
      } else {
        return props.eventList;
      }
    });

    const deleteMember = (id) => {
      //  delete firtimer
      axios.delete(`/api/People/DeleteOnePerson/${id}`).then((res) => {
        console.log(res);
        toast.add({
          severity: "success",
          summary: "Confirmed",
          detail: "Member Deleted",
          life: 3000,
        });
        churchMembers.value = churchMembers.value.filter(
          (item) => item.id !== id
        );

        // update first timer summary while deleting
        //   axios.get("/api/People/GetFirsttimerSummary")
        //     .then(res => {
        //       getFirstTimerSummary.value = res.data;
        //       console.log(res.data)
        //     })
        //     .catch(err => console.log(err))
        // })
        // .catch((err) => {
        /*eslint no-undef: "warn"*/
        NProgress.done();
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

    const confirm = useConfirm();
    let toast = useToast();
    // const showConfirmModal = (id) => {

    //    confirm.require({
    //        message: 'Are you sure you want to proceed?',
    //         header: 'Confirmation',
    //         icon: 'pi pi-exclamation-triangle',
    //         acceptClass: 'confirm-delete',
    //         rejectClass: 'cancel-delete',
    //         accept: () => {
    //             deleteMember(id)

    //         },
    //         reject: () => {
    //             // toast.add({severity:'info', summary:'Rejected', detail:'You have rejected', life: 3000});
    //         }

    // });
    // }

    const toggleMonthlyClass = () => {
      monthlyActiveBtn.value = !monthlyActiveBtn.value;
      yearlyActiveBtn.value = false;
      allTimeActiveBtn.value = false;
    };

    const toggleYearlyClass = () => {
      yearlyActiveBtn.value = !yearlyActiveBtn.value;
      allTimeActiveBtn.value = false;
      monthlyActiveBtn.value = false;
    };

    const toggleAllTimeClass = () => {
      allTimeActiveBtn.value = !allTimeActiveBtn.value;
      yearlyActiveBtn.value = false;
      monthlyActiveBtn.value = false;
    };

    const date = (offDate) => {
      return monthDayYear.monthDayYear(offDate);
    };

    const convert = (number) => {
      return convertNumber.convertNumber(number);
    };

    const currentPage = ref(0);
    const getPeopleByPage = async (page) => {
      if (page < 0) return false;
      try {
        const { data } = await axios.get(
          `/api/eventreports/eventReports?page=${page}`
          );
        if (data.activities.length > 0) {
          filterEvents.value = [];
          emit("activity-per-page", data.activities);
          currentPage.value = page;
        }
      } catch (error) {
        console.log(error);
      }
    };

    const membersCount = computed(() => {
      if (props.eventSummary.activities.length > 20)
        return Math.ceil(props.eventSummary.activities.length / 20);
      return 1;
    });

    // const sentEvent = computed(() => {
    //   axios.get(`/api/Events/markAsSent?activityId=${event.activity.id}`)
    // })

    return {
      // sentEvent,
      filterFormIsVissible,
      toggleFilterFormVissibility,
      searchIsVisible,
      toggleSearch,
      moment,
      userCurrency,
      filterEvents,
      searchText,
      showConfirmModal,
      deleteMember,
      monthlyActiveBtn,
      yearlyActiveBtn,
      allTimeActiveBtn,
      toggleMonthlyClass,
      toggleYearlyClass,
      toggleAllTimeClass,
      date,
      convert,
      getPeopleByPage,
      currentPage,
      membersCount,
      deleteEvent,
    };
  },
};
</script>

<style scoped>
* {
  box-sizing: border-box;
}

/* .events {
  font: normal normal 800 28px Nunito sans;
}

.btn-preview {
  border: 1px solid #797e81;
  border-radius: 22px;
}

.btn-save {
  background: #136acd 0% 0% no-repeat padding-box;
  border-radius: 22px;
  color: white;
  /* border: 2px solid red; 
} */
.whole-con {
  display: flex;
  /* background: #f1f5f8; */
  /* height: 100vh; */
}

.main-con {
  width: 100%;
  height: 70%;
}

.main-body {
  height: 100%;
}

.button {
  padding: 8px 10px;
  border: none;
  border-radius: 22px;
  width: 180px;
  font-size: 16px;
  font-weight: 600;
  margin: 0 8px;
  outline: none;
  text-decoration: none;
  box-sizing: border-box;
}

.button:hover {
  cursor: pointer;
}

.add-person-btn {
  background: #136acd;
  color: #fff;
}

.btn-icon {
  padding: 0 8px;
}

.top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
}

.page-header {
  font-weight: 800;
  font-size: 40px;
}
.more-btn {
  background: #dde2e6;
}

.my-con {
  /* display: flex; */
  justify-content: space-between;
  margin: 24px 0;
}

.summary {
  /* width: 20%; */
  border-radius: 30px;
  box-shadow: 0px 3px 6px #2c28281c;
  padding: 0px 20px 0 20px;
  background: #fff;
  margin-bottom: 24px;
}

.table {
  /* box-shadow: 0px 1px 4px #02172e45; */
  border: 1px solid #dde2e6;
  border-radius: 30px;
  text-align: left;
  width: 100%;
}

.summary-header {
  margin: 0 10px;
  color: #02172e;
  opacity: 0.8;
  font-size: 26px;
  font-weight: 600;
}

.boards {
  display: flex;
}

.board {
  width: 30%;
  border-radius: 10px;
  border: 0.4000000059604645px solid #dde2e6;
  /* padding: 0 8px; */
  box-shadow: 0px 1px 4px #02172e45;
  box-shadow: 0px 1px 4px #02172e45;
  border: 1px solid #dde2e6;
}

.chart-con {
  width: 70%;
  display: flex;
  justify-content: space-evenly;
}

.board-top {
  display: flex;
  justify-content: space-between;
  margin-bottom: 40px;
  align-items: center;
  /* box-shadow: 0px 3px 6px #2c28281c; */
  padding: 0 4px;
}

.total {
  margin-bottom: 40px;
  font-size: 37px;
}

.total-text {
  font-size: 12px;
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

.data-value {
  display: flex;
  /* padding-left: 6px; */
}

.theader {
  margin: 0;
}

.filter-options {
  height: 0;
  overflow: hidden;
  transition: all 0.5s ease-in-out;
}

.filter-options-shown {
  height: 130px !important;
  overflow: hidden;
  transition: all 0.5s ease-in-out;
}

.apply-btn {
  background: #136acd;
  color: #fff;
  border-radius: 111px;
  width: 101px;
  height: 41px;
  border: none;
  font-weight: 700;
  outline: transparent;
}

.clear-link,
.hide-link {
  color: #136acd;
}

.clear-link,
.hide-link {
  color: #136acd;
}

.table-top {
  font-weight: 800;
  font-size: 12px;
  padding-top: 20px;
  padding-left: 20px;
}

.table-top label:hover,
.table-top p:hover {
  cursor: pointer;
}

.label-search {
  width: 0;
  background: transparent;
  padding: 4px;
  overflow: hidden;
  transition: all 0.5 ease-in-out;
}
.label-search input {
  border: transparent;
  background: transparent;
  width: 70%;
  outline: none;
}

.label-search .search-btn {
  display: flex;
  align-items: center;
  background: #7894a6;
  padding: 4px;
  border-radius: 5px;
}

.label-search .empty-btn {
  display: flex;
  align-items: center;
  padding: 0 5px;
}

.show-search {
  width: 174px;
  overflow: hidden;
  border: 1px solid #dde2e6;
  border-radius: 5px 0px 0px 5px;
  background: #ebeff4;
  transition: all 0.9s cubic-bezier(0.38, 0.77, 0.2, -0.54);
}

/* .filter,
.search {
    width: 25% !important
} */

.select-all input {
  margin: 0 8px 0 -5px !important;
}

.itemroute-color {
  color: #136acd;
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
}

.more {
  background: #dde2e6;
  border-radius: 22px;
  width: 180px;
  font-weight: bold;
  border: transparent;
  outline: transparent;
  height: 42px;
}

.average {
  box-shadow: 0px 1px 4px #02172e45;
  border: 1px solid #dde2e6;
  border-radius: 30px;
  padding: 10px;
}

/* .average  */
.avg {
  font: normal normal bold 24px/32px Nunito Sans;
  letter-spacing: 0px;
  color: #136acd;
  margin-top: 1em;
}

.avg-table {
  margin-top: 1em;
  border: 1px solid #dde2e6;
  box-shadow: 0px 3px 6px #2c28281c;
  border-radius: 10px;
  padding: 10px;
  border-radius: 30px;
}
.avg-table > div > div:first-child {
  font: normal normal 600 16px/13px Nunito Sans;
  letter-spacing: 0px;
  color: #002044;
  padding: 15px;
}

.avg-table > div > div:nth-child(2) {
  font: normal normal normal 32px/13px Nunito Sans;
  letter-spacing: 0px;
  color: #002044;
  padding: 15px;
}

.avg-table > div:nth-child(5) {
  font: normal normal normal 14px/13px Nunito Sans;
  letter-spacing: 0px;
  color: #002044;
}

.thead {
  background: #f1f3f9;
  padding: 0 25px;
  font-size: 0.7em;
}

.td-first {
  font: normal normal 800 14px/19px Nunito Sans;
  letter-spacing: 0px;
  color: #313131;
  border-top-left-radius: 25px;
  border-bottom-left-radius: 25px;
  background: #cecbcb70;
  padding: 7px;
  margin-left: 10px;
}

.top-con {
  padding: 0px 25px;
}

.default-btn {
  border: none;
  box-shadow: 0px 3px 6px #2c28281c;
  border: 1px solid #dde2e6;
}

.active-btn {
  background: #0e74c721;
}

.table-responsive {
  overflow-x: hidden;
}

@media screen and (max-width: 500px) {
  .picture,
  .firstname,
  .lastname,
  .phone {
    width: 100%;
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
    /* text-align: center; */
    display: flex;
    justify-content: space-between;
  }

  .action-icon {
    width: 100%;
    text-align: right;
  }

  .table-header {
    display: none;
  }
}

@media screen and (min-width: 500px) {
  /* .picture,
  .firstname,
  .lastname,
  .phone {
    width: 19%;
  } */
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

@media screen and (max-width: 768px) {
  .filter-options-shown {
    height: 300px !important;
    overflow: hidden;
    transition: all 0.5s ease-in-out;
  }
  .mobileResponsive {
    display: block !important;
    margin: auto !important;
  }
  .monthRessponsive {
      margin: auto !important;
      transition-timing-function: ease;
  }
  .yearResponsive {
      margin: auto !important;
      margin-top: 15px !important;
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
  padding: 10px 25px;
  border-radius: 0px 0px 22px 22px;
}

@media screen and (max-width: 1399px) {
  .boards {
    /* flex-direction: column; */
    flex-wrap: wrap;
    justify-content: space-around;
  }

  .board {
    width: 45%;
    margin: 8px;
    max-height: 310px;
  }

  .board.fig {
    box-shadow: none !important;
    border: none;
  }

  .board.members-count {
    padding: 24px;
  }

  .chart-con {
    flex-direction: column;
  }

  .summary {
    border-radius: none !important;
    box-shadow: none !important;
  }

  .board.fig {
    box-shadow: none !important;
    border: none;
  }
}

@media screen and (min-width: 1400px) {
  .table {
    margin-top: 2em;
  }

  .total-text {
    font-size: 18px;
  }

  .summary {
    width: 30%;
  }

  .my-con {
    display: flex;
    flex-direction: row-reverse;
  }

  .boards {
    display: flex;
    flex-direction: column;
  }

  .board {
    width: 100%;
    margin-bottom: 22px;
    padding: 0 8px;
  }

  .board.fig {
    padding: 24px 8px 0 8px;
    border: none;
    box-shadow: none;
  }

  .board.members-count {
    width: 95% !important;
    margin: auto;
  }

  .chart-con {
    width: 100%;
    display: flex;
    flex-direction: column;
  }

  .chart-con div {
    width: 100% !important;
    margin-bottom: 10px !important;
    min-height: 390px !important;
  }
}

.table-header {
  padding: 12px;
  color: black;
  box-shadow: none;
  font-size: 11px;
  font-weight: 700;
}

.table-body {
  padding: 0px;
  border-bottom: 1.5px solid #6d6d6d19;
}

.fa-ellipsis-v {
  padding: 10px;
}
</style>