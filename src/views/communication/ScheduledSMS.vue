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
                <div class="col-md-8 col-sm-12 pl-0">
                  <div class="search-div">
                    <span><i class="pi pi-search mr-1"></i></span>
                    <input
                      type="text"
                      placeholder="Search here..."
                      v-model="scheduledMssg"
                    />
                    <span class="mx-2"> | </span>
                    <span class="mx-2">Sort By</span>
                    <span class="font-weight-bold"> Newest</span>
                  </div>
                </div>
                <div class="col-sm-5 col-md-3 mt-sm-2 units-container">
                  <UnitsArea />
                </div>
              </div>

              <i
                class="pi pi-trash text-danger ml-n4 mb-2 c-pointer d-flex align-items-center px-4"
                style="font-size: 15px"
                v-if="markedSchedules ? markedSchedules.length > 0 :''"
                @click="showConfirmModal(false)">
              </i>
              <div class="row table-box mb-4">
                <div class="col-md-12">
                  <div class="row header-row light-grey-bg">
                    <div class="col-md-12">
                      <div class="row light-grey-bg py-1">
                        <div class="col-md-1"
                        v-if="schedules.length > 0">
                          <input
                            type="checkbox"
                            name="all"
                            id="all"
                            @change="markAllSchedules"
                            :checked="
                              markedSchedules.length === schedules.length
                            "
                            class="mark-box"
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
                    v-for="(sms, index) in searchScheduleMssg"
                    :key="index"
                  >
                    <div class="col-md-12">
                      <div class="row">
                        <div class="col-md-1">
                          <input
                            type="checkbox"
                            name=""
                            id=""
                            @change="mark1Schedule(sms)"
                            :checked="
                              markedSchedules.findIndex(
                                (i) => i.id === sms.id
                              ) >= 0
                            "
                            class="mark-box"
                          />
                        </div>
                        <div class="col-md-8 d-md-flex flex-column small-text py-1">
                          <router-link to="" class="text-decoration-none"
                            ><span class="msg-n-time">
                              <span class="font-weight-bold mr-2 text-dark">{{
                                !sms.subject ? "(no subject)" : sms.subject
                              }}</span>
                              <span
                                class="brief-message font-weight-600 ml-2"
                                >{{
                                  `${sms.message
                                    .split("")
                                    .slice(0, 50)
                                    .join("")}...`
                                }}</span
                              >
                            </span></router-link
                          >
                        </div>

                        <div class="col-md-3 d-md-flex flex-column small-text">
                          <span class="msg-n-time">
                            <span class="timestamp ml-4 small-text">{{
                              formattedDate(sms.date)
                            }}</span>
                          </span>
                          <span class="small-text ml-5 mr-n4">
                              <i
                                class="c-pointer pr-3 pi pi-trash delete-icon"
                                @click="showConfirmModal(sms.id)"
                                style="font-size: 18px"
                              >
                              </i
                            ></span>
                        </div>
                        

                        <!-- <div
                          class="col-md-3 col-ms-12 d-flex justify-content-between"
                        >
                          <span class="hidden-header font-weight-bold"
                            >Date
                          </span>
                          <span>{{ sms.dateSent }}</span>
                        </div> -->
                        <!--
                        <div
                          class="col-md-2 col-ms-12 d-flex justify-content-between"
                        >
                          <span class="hidden-header font-weight-bold"
                            >UNITS:
                          </span>
                          <span>{{ sms.units }}</span>
                        </div>
                        <div
                          class="col-md-2 col-ms-12 d-flex justify-content-between"
                        >
                          <span class="hidden-header font-weight-bold"
                            >DELIVER REPORT:
                          </span>
                          <span class="view-btn">View</span>
                        </div> -->
                      </div>
                      <div class="row" v-if="index !== schedules.length - 1">
                        <div class="col-md-12 px-0">
                          <hr class="hr" />
                        </div>
                      </div>
                    </div>
                  </div>

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
            <ConfirmDialog />
            <Toast />
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import { onMounted, ref, computed } from "vue";
import UnitsArea from "../../components/units/UnitsArea";
import communicationService from "../../services/communication/communicationservice";
import dateFormatter from "../../services/dates/dateformatter";
import axios from "@/gateway/backendapi";
import { useToast } from "primevue/usetoast";
import stopProgressBar from "../../services/progressbar/progress";
import { useConfirm } from "primevue/useconfirm";

export default {
  components: { UnitsArea },
  setup() {
    const schedules = ref([]);
    const loading = ref(false);
    const scheduledMssg = ref("");
    const getScheduledSMS = async () => {
      try {
        loading.value = true;
        const res = await communicationService.getSchedules(
          `/api/Messaging/getSmsSchedules`
        );
        loading.value = false;
        schedules.value = res;
        console.log(schedules.value, "Tosin");
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

    const searchScheduleMssg = computed(() => {
      if (scheduledMssg.value === "" && schedules.value.length > 0) {
        return schedules.value;
      }
      return schedules.value.filter((i) =>
        i.message.toLowerCase().includes(scheduledMssg.value.toLowerCase())
      );
    });

    // code to mark single item in schedules
    const markedSchedules = ref([]);
    const mark1Schedule = (msch) => {
      const scheduleIndex = markedSchedules.value.findIndex(
        (i) => i.id === msch.id
      );
      if (scheduleIndex < 0) {
        markedSchedules.value.push(msch);
      } else {
        markedSchedules.value.splice(msch, 1);
      }
      console.log(markedSchedules.value, " Am here");
    };

    // code to mark multiple item in schedules
    const markAllSchedules = () => {
      if (markedSchedules.value.length < schedules.value.length) {
        schedules.value.forEach((i) => {
          const schedulesInMarked = markedSchedules.value.findIndex(
            (s) => s.id === i.id
          );
          if (schedulesInMarked < 0) {
            markedSchedules.value.push(i);
          }
        });
      } else {
        markedSchedules.value = [];
      }
      console.log(markedSchedules.value, "God is awesome");
    };

    // function to delete schedules
    const mainone = (k) => {
      console.log(k, "wait a moment");
      return k.map((i) => i.id).join(",");
    };
    const deleteSchedules = () => {
      let sub = mainone(markedSchedules.value);
      console.log(sub, "Am here save and sound");
      axios
        .delete(
          `/api/Messaging/DeleteSMSScheduledMessages?ScheduledMessageIdList=${sub}`
        )
        .then((res) => {
          console.log(res, "we good");
          schedules.value = schedules.value.filter((item) => {
            const p = markedSchedules.value.findIndex((i) => i.id === item.id);
            if (p >= 0) return false;
            return true;
          });

          markedSchedules.value = [];

          toast.add({
            severity: "success",
            summary: "Confirmed",
            detail: "Draft Deleted",
            life: 3000,
          });
        })
        .catch((err) => {
          stopProgressBar();
          toast.add({
            severity: "error",
            summary: "Delete Error",
            detail: "Deleting Draft failed",
            life: 3000,
          });
          console.log(err);
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
      scheduledMssg,
      searchScheduleMssg,
      markedSchedules,
      mark1Schedule,
      markAllSchedules,
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