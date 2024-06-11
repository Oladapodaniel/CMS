<template>
  <div>
    <div class="container">
      <!-- Content Box -->
      <main id="main" class="mt-3">
        <div class="container-fluid px-0">
          <div class="row px-0">
            <div class="col-md-12">
              <div class="text-head font-weight-bold text-black h2">Scheduled Email</div>
              <div class="grey-backg py-2 border-radius-8 col-md-3">
                <router-link
                  to="/tenant/email/sent"
                  class="text-decoration-none s-18 text-dak"
                >
                  <span class="linear-gradient">Email> Scheduled</span>
                </router-link>
              </div>
            </div>
            <div class="col-md-12 mt-5 mb-3">
              <div class="tab-options d-block d-md-none mt-5">
                <div class="s-14 fw-500 col-md-10 px-0 mt-5">
                  <div class="d-flex flex-column flex-sm-row justify-content-md-between">
                    <div>
                      <el-tooltip
                        class="box-item"
                        effect="dark"
                        v-if="markedMails.length > 0"
                        content="Delete member(s)"
                        placement="top-start"
                      >
                        <el-icon
                          :size="28"
                          class="ml-2 c-pointer primary--text"
                          v-if="markedMails.length > 0"
                          @click="showConfirmModal(false)"
                        >
                          <Delete />
                        </el-icon>
                      </el-tooltip>
                    </div>
                    <div
                      class="d-flex flex-column flex-md-row justify-content-md-between"
                    >
                      <el-input
                        size="small"
                        v-model="searchScheduled"
                        :suffix-icon="Search"
                        placeholder="Search"
                        class="search-input col-md-12 col-9"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div class="tab-options d-none d-md-block mt-5">
                <div class="table-top col-12 col-md-8 col-lg-8 col-xl-9 px-0 mt-5">
                  <div class="d-flex flex-column flex-md-row justify-content-md-between">
                    <div>
                      <el-tooltip
                        class="box-item d-flex"
                        effect="dark"
                        v-if="markedMails.length > 0"
                        content="Delete member(s)"
                        placement="top-start"
                      >
                        <el-icon
                          :size="28"
                          class="ml-2 c-pointer primary--text"
                          v-if="markedMails.length > 0"
                          @click="showConfirmModal(false)"
                        >
                          <Delete />
                        </el-icon>
                      </el-tooltip>
                    </div>
                    <div
                      class="d-flex flex-column flex-md-row justify-content-md-between"
                    >
                      <el-input
                        size="small"
                        v-model="searchScheduled"
                        :suffix-icon="Search"
                        placeholder="Search"
                        class="search-input col-md-12 col-9"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <Table
                :data="scheduledMails"
                :headers="ScheduledHeaders"
                :checkMultipleItem="true"
                @checkedrow="handleSelectionChange"
                v-loading="loading"
              >
                <template #subject="{ item }">
                  <div>
                    <router-link to="" class="text-decoration-none">
                      <span class="timestamp text-dark ml-1">{{
                        !item.subject ? "(no subject)" : item.subject
                      }}</span>
                    </router-link>
                  </div>
                </template>
                <template #message="{ item }">
                  <div>
                    <router-link to="" class="no-decoration text-dak">
                      <span>
                        {{ `${item.message.split("").slice(0, 30).join("")}...` }}
                      </span>
                    </router-link>
                  </div>
                </template>
                <template #isExecuted="{ item }">
                  <div>
                    <router-link to="" class="text-decoration-none text-dak">
                      <span class="small-text ml-1">{{
                        item.isExecuted === false ? "No" : "Yes"
                      }}</span>
                    </router-link>
                  </div>
                </template>
                <template #executionDate="{ item }">
                  <div>
                    <router-link to="" class="text-decoration-none">
                      <span class="timestam ml-1 text-dak small-text">{{
                        formattedDate(item.executionDate)
                      }}</span>
                    </router-link>
                  </div>
                </template>
                <template #action="{ item }">
                  <el-dropdown trigger="click">
                    <el-icon>
                      <MoreFilled />
                    </el-icon>
                    <template #dropdown>
                      <el-dropdown-menu>
                        <el-dropdown-item>
                          <div
                            class="text-decoration-none text-color"
                            @click="showConfirmModal(item.id)"
                          >
                            Delete
                          </div>
                        </el-dropdown-item>
                      </el-dropdown-menu>
                    </template>
                  </el-dropdown>
                </template>
              </Table>
              <div class="row" v-if="schedules.length === 0 && !loading">
                <div class="col-md-12 d-flex justify-content-center">
                  <span class="my-4 font-weight-bold">No scheduled mesages</span>
                </div>
              </div>

              <div class="row" v-if="schedules.length === 0 && loading">
                <div class="col-md-12 py-2 d-flex justify-content-center">
                  <i class="fas fa-circle-notch fa-spin"></i>
                </div>
              </div>
              <!--end delete icon area -->
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, ref } from "vue";
import communicationService from "../../services/communication/communicationservice";
import dateFormatter from "../../services/dates/dateformatter";
import axios from "@/gateway/backendapi";
import stopProgressBar from "../../services/progressbar/progress";
import { ElMessage, ElMessageBox } from "element-plus";
import { Search } from "@element-plus/icons-vue";
import Table from "@/components/table/Table";

export default {
  components: {
    Table,
  },
  setup() {
    const schedules = ref([]);
    const loading = ref(false);
    const ScheduledHeaders = ref([
      { name: " SUBJECT", value: "subject" },
      { name: " MESSAGE", value: "message" },
      { name: "IS EXECUTED", value: "isExecuted" },
      { name: "EXECUTION DATE", value: "executionDate" },
      { name: "Action", value: "action" },
    ]);

    const getScheduledEmails = async () => {
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
    const handleSelectionChange = (val) => {
      markedMails.value = val;
      console.log(val, "hhhh");
    };

    onMounted(() => {
      getScheduledEmails();
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
      let stringOfSchedulesIds = id ? id : getIdsOfSchedulesToDelete(markedMails.value);

      axios
        .delete(
          `/api/Messaging/DeleteEmailScheduledMessages?ScheduledMessageIdList=${
            stringOfSchedulesIds ? stringOfSchedulesIds : id
          }`
        )
        .then((res) => {
          if (res) {
            ElMessage({
              type: "success",
              message: `${
                markedMails.value.length > 1 ? "Selected Schedules have" : "Schedule has"
              } been deleted successfully `,
              duration: 5000,
            });
            schedules.value = !id
              ? removeDeletedScheduleFromSchedulesEmailsList(markedMails.value)
              : schedules.value.filter((i) => i.id !== id);

            markedMails.value = [];
          } else {
            ElMessage({
              type: "success",
              message: res,
              duration: 5000,
            });
          }
        })
        .catch((err) => {
          stopProgressBar();
          ElMessage({
            type: "error",
            message: `${
              markedMails.value > 1 ? "Selected Schedules" : "Schedule"
            } could not be deleted,`,
            duration: 5000,
          });
          console.log(err);
        });
    };

    const removeDeletedScheduleFromSchedulesEmailsList = (deletedSchedulesArr) => {
      return schedules.value.filter((i) => {
        const schedulesInMarked = deletedSchedulesArr.findIndex((j) => j.id === i.id);
        if (schedulesInMarked < 0) return true;
        return false;
      });
    };
    const showConfirmModal = (id) => {
      ElMessageBox.confirm(
        "Are you sure you want to proceed? This operation can't be reversed ",
        "Confirm delete",
        {
          confirmButtonText: "OK",
          cancelButtonText: "Cancel",
          type: "error",
        }
      )
        .then(() => {
          deleteSchedules(id);
        })
        .catch(() => {
          ElMessage({
            type: "info",
            message: "Delete discarded",
            duration: 5000,
          });
        });
    };

    return {
      schedules,
      ScheduledHeaders,
      handleSelectionChange,
      loading,
      formattedDate,
      scheduledMails,
      searchScheduled,
      markedMails,
      Search,
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
  /* width: fit-content; */
  padding: 10px;
  background: #f5f8f9;
  border-radius: 200px;
}

.table-options {
  /* border: 1px solid rgb(212, 221, 227); */
  border-bottom: none;
  padding: 7px 7px 0 7px;
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
.table-top {
  position: absolute;
  z-index: 1;
  top: -40px;
  /* width: 100%; */
  font-weight: 500 !important;
  font-size: 14px;
  background: #fff;
  color: #000000;
  /* border: 1px solid #d4dde3; */
  /* max-width: 83.333333% !important; */
}
.tab-options {
  position: relative;
}

.timestamp {
  font-size: 14px;
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
