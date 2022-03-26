!<template>
  <div>
    <div class="container">
      <!-- Content Box -->
      <main id="main" class="mt-3">
        <div class="container-fluid px-0">
          <div class="row px-0">
            <div class="col-md-12 px-0">
              <div
                class="row d-md-flex align-items-center justify-content-between mt-3 mb-4"
              >
                <div class="col-md-12 col-sm-12 pl-0">
                  <div class="search-div">
                    <span><i class="pi pi-search mr-1"></i></span>
                    <input
                      type="text"
                      placeholder="Search here..."
                      v-model="searchScheduled"
                    />

                    <span class="mx-2"> | </span>
                    <span class="mx-2">Sort By</span>
                    <span class="font-weight-bold"> Newest</span>
                  </div>
                </div>
                <!-- <div class="col-sm-5 col-md-3 mt-sm-2 units-container">
                  <UnitsArea />
                </div> -->
              </div>

              <!-- delete icon area -->
              <i
                class="pi pi-trash color-deleteicon ml-n4 mb-2 c-pointer d-flex align-items-center px-4"
                style="font-size: 20px"
                v-if="markedMails.length > 0"
                @click="showConfirmModal(false)"
              >
              </i>
              <!--end delete icon area -->
              <div class="row table-box mb-4">
                <div class="col-md-12">
                  <div class="row header-row light-grey-bg">
                    <div class="col-md-12">
                      <div class="row light-grey-bg py-1">
                        <div class="col-md-1 " v-if="schedules.length > 0">
                          <input
                            type="checkbox"
                            class="mark-box"
                            name="all"
                            id="all"
                            @change="markAllScheduleMails"
                            :checked="markedMails.length === schedules.length"
                          />
                        </div>
                        <div class="col-md-11">
                          <span class="th">Message</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-12 px-0">
                      <hr class="hr mt-0" />
                    </div>
                  </div>
                  <div
                    class="row"
                    v-for="(email, index) in scheduledMails"
                    :key="index"
                  >
                    <div class="col-md-12 py-1">
                      <div class="row">
                        <div class="col-md-1">
                          <input
                            type="checkbox"
                            class="mark-box"
                            @change="mark1mailItem(email)"
                            :checked="
                              markedMails.findIndex((i) => i.id === email.id) >=
                              0
                            "
                          />
                        </div>
                        <div class="col-md-8 d-md-flex flex-column small-text">
                          <router-link to="" class="text-decoration-none"
                            ><span class="msg-n-time">
                              <span class="font-weight-bold mr-2 text-dark">{{
                                !email.subject ? "(no subject)" : email.subject
                              }}</span>
                              <span
                                class="brief-message font-weight-600 ml-2"
                                >{{
                                  `${email.message
                                    .split("")
                                    .slice(0, 50)
                                    .join("")}...`
                                }}</span
                              >
                            </span></router-link
                          >
                        </div>

                        <div class="col-md-3 d-md-flex flex-column small-text">
                          <div class="row">
                            <span class="msg-n-time">
                              <span class="timestamp ml-4 small-text">{{
                                formattedDate(email.date)
                              }}</span>
                            </span>

                            <span class="small-text ml-5 mr-n4">
                              <i
                                class="c-pointer pr-3 pi pi-trash delete-icon"
                                @click="showConfirmModal(email.id)"
                                style="font-size: 18px"
                              >
                              </i
                            ></span>
                          </div>
                        </div>
                      </div>
                      <div class="row" v-if="index !== schedules.length - 1">
                        <div class="col-md-12 px-0">
                          <hr class="hr" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <ConfirmDialog />
                  <Toast />
                  <div class="row" v-if="schedules.length === 0 && !loading">
                    <div class="col-md-12 d-flex justify-content-center">
                      <span class="my-4 font-weight-bold"
                        >No scheduled mesages</span
                      >
                    </div>
                  </div>

                  <div class="row" v-if="schedules.length === 0 && loading">
                    <div class="col-md-12 py-2 d-flex justify-content-center">
                      <i class="fas fa-circle-notch fa-spin"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, ref } from "vue";
// import UnitsArea from "../../components/units/UnitsArea"
import communicationService from "../../services/communication/communicationservice";
import dateFormatter from "../../services/dates/dateformatter";
import axios from "@/gateway/backendapi";
import { useConfirm } from "primevue/useconfirm";
import { useToast } from "primevue/usetoast";
import stopProgressBar from "../../services/progressbar/progress";

export default {
  //   components: { UnitsArea },
  setup() {
    const schedules = ref([]);
    const loading = ref(false);

    const getScheduledSMS = async () => {
      try {
        loading.value = true;
        const res = await communicationService.getSchedules(
          "/api/Messaging/getEmailSchedules"
        );
        loading.value = false;
        schedules.value = res;
      } catch (error) {
        console.log(error);
      }
    };

    const formattedDate = (date) => {
      return dateFormatter.monthDayTime(date);
    };

    onMounted(() => {
      getScheduledSMS();
    });

    // function to search
    const searchScheduled = ref("");
    const scheduledMails = computed(() => {
      if (searchScheduled.value === "" && schedules.value.length > 0)
        return schedules.value;
      return schedules.value.filter((i) => {
        i.message.toLowerCase().includes(searchScheduled.value.toLowerCase());
      });
    });

    // code to mark single object
    const markedMails = ref([]);
    const mark1mailItem = (mail) => {
      const mailIndex = markedMails.value.findIndex((i) => i.id === mail.id);
      if (mailIndex < 0) {
        markedMails.value.push(mail);
      } else {
        markedMails.value.splice(mailIndex, 1);
      }
    };

    // code to select multiple schedule mails
    const markAllScheduleMails = () => {
      if (markedMails.value.length < schedules.value.length) {
        schedules.value.forEach((i) => {
          const schedulesInmarkedMails = markedMails.value.findIndex(
            (f) => f.id === i.id
          );
          if (schedulesInmarkedMails < 0) {
            markedMails.value.push(i);
          }
        });
      } else {
        markedMails.value = [];
      }
    };

    // Function to delete schedulemails
    const getIdsOfSchedulesToDelete = (markedSchedules) => {
      return markedSchedules.map((i) => i.id).join(",");
    };

    const deleteSchedules = (id) => {
      let stringOfSchedulesIds = id
        ? id
        : getIdsOfSchedulesToDelete(markedMails.value);

      axios
        .delete(
          `/api/Messaging/DeleteEmailScheduledMessages?ScheduledMessageIdList=${stringOfSchedulesIds}`
        )
        .then((res) => {
          if (res) {
            toast.add({
              severity: "success",
              summary: "Delete Successful",
              detail: `${
                markedMails.value.length > 1
                  ? "Selected Schedules have"
                  : "Schedule has"
              } been deleted successfully `,
              life: 3000,
            });
            schedules.value = !id
              ? removeDeletedScheduleFromSchedulesEmailsList(markedMails.value)
              : schedules.value.filter((i) => i.id !== id);

            markedMails.value = [];
          } else {
            toast.add({
              severity: "success",
              summary: "Confirmed",
              detail: `${res}`,
              life: 3000,
            });
          }
        })
        .catch((err) => {
          stopProgressBar();
          toast.add({
            severity: "error",
            summary: "Delete Error",
            detail: `${
              markedMails.value > 1 ? "Selected Schedules" : "Schedule"
            } could not be deleted,`,
            life: 3000,
          });
          console.log(err);
        });
    };

    const removeDeletedScheduleFromSchedulesEmailsList = (
      deletedSchedulesArr
    ) => {
      return schedules.value.filter((i) => {
        const schedulesInMarked = deletedSchedulesArr.findIndex(
          (j) => j.id === i.id
        );
        if (schedulesInMarked < 0) return true;
        return false;
      });
    };

    const confirm = useConfirm();
    let toast = useToast();
    const showConfirmModal = (id) => {
      confirm.require({
        message: "Are you sure you want to proceed?",
        header: "Confirmation",
        icon: "pi pi-exclamation-triangle",
        acceptClass: "confirm-delete",
        rejectClass: "cancel-delete",
        accept: () => {
          deleteSchedules(id);
        },
        reject: () => {
          //  toast.add({severity:'info', summary:'Rejected',
          //  detail:'You have rejected', life: 3000});
        },
      });
    };

    return {
      schedules,
      loading,
      formattedDate,
      scheduledMails,
      searchScheduled,
      markedMails,
      mark1mailItem,
      markAllScheduleMails,
      deleteSchedules,
      showConfirmModal,
    };
  },
};
</script>

<style scoped>
.search-div {
  width: fit-content;
  padding: 10px;
  background: #f5f8f9;
  border-radius: 200px;
}

.search-div input {
  background: none;
  border: none;
  outline: transparent;
}

.brief-message {
  color: #4762f0;
}

.compose-btn {
  background: #136acd;
  box-shadow: 0px 6px 12px #708eb170;
  border-radius: 22px;
  color: #fff;
  height: 42px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.color-deleteicon {
  color: rgba(184, 5, 5, 0.726);
}

.menu-icon {
  font-size: 20px;
}

.units-div {
  border: 1px solid #dde2e6;
  border-radius: 20px;
  padding: 15px 0;
  background: #f9a9a933 !important;
}

.hidden-header {
  display: none;
}

.th {
  font-size: 16px;
  font-weight: 700;
}

.inbox-count {
  background: rgba(19, 106, 205, 0.3);
  padding: 4px 8px;
  border-radius: 22px;
}

.menu-item-con {
  color: #002044;
  opacity: 0.5;
}

.menu-item-con.active {
  background: rgba(19, 106, 205, 0.05);
  border-left: 2px solid #136acd;
  opacity: 1;
}

.buy-btn {
  background: rgb(112, 142, 177, 0.33);
  border-radius: 22px;
}

.btn-text {
  opacity: 1;
  font-size: 11px;
  font-weight: 700;
}

.timestamp {
  font-size: 14px;
  color: #333333;
  opacity: 0.5;
}

.view-btn {
  background: #ebeff4;
  border-radius: 21px;
  padding: 4px 18px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.center-flexed {
  display: flex;
  justify-content: center;
}

.table-box {
  border: 1px solid #4762f01f;
}

.hr {
  border: 1px solid #4762f01f;
}

@media screen and (max-width: 767px) {
  .hidden-header {
    display: inline-block;
    font-size: 12px;
  }

  .header-row {
    display: none;
  }

  #menu-items {
    flex-direction: row !important;
  }

  .search-div {
    width: 100%;
  }

  .units-div {
    width: 100%;
  }

  .units-container {
    margin-left: 0;
    margin: auto;
  }
}

@media screen and (max-width: 1000px) {
  .msg-n-time {
    flex-direction: column;
    margin-bottom: 8px;
  }
}

@media screen and (min-width: 1000px) {
  #menu-items {
    min-width: 100% !important;
  }
}
</style>