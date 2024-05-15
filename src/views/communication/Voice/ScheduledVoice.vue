<template>
  <div class="">
    <div class="row d-md-flex align-items-center mt-3 mb-4">
      <div class="col-md-6 col-sm-12">
        <div class="search-div d-flex align-items-center">
          <span class="mr-2"
            ><el-icon> <Search /> </el-icon
          ></span>
          <input
            type="text"
            class="w-100"
            placeholder="Search here..."
            v-model="searchVoiceText"
          />
        </div>
      </div>
    </div>
    <div class="row">
      <div
        class="col-md-12"
        v-if="searchScheduleVoiceList && searchScheduleVoiceList.length > 0"
      >
        <div class="table-options" v-if="markedSchedules.length > 0">
          <el-icon class="text-danger c-pointer" @click="showConfirmModal">
            <Delete />
          </el-icon>
        </div>

        <Table
          :data="searchScheduleVoiceList"
          :headers="voiceHeaders"
          @checkedrow="handleSelectionChange"
          :checkMultipleItem="true"
          v-loading="voiceLoading"
        >
          <template #subject="{ item }">
            <div>
              <div class="font-weight-600">{{ item.subject }}</div>
            </div>
          </template>
          <template #voiceMessageUrl="{ item }">
            <div>
              <div class="font-weight-600">
                <el-button
                  type="success"
                  @click="copyToClipBoard(item)"
                  plain
                  round
                  >Copy URL</el-button
                >
              </div>
            </div>
          </template>
          <template #user="{ item }">
            <div>
              <div class="font-weight-600">{{ item.user }}</div>
            </div>
          </template>
          <template #isExecuted="{ item }">
            <div>
              <div class="font-weight-600">
                {{ item.isExecuted === false ? "No" : "Yes" }}
              </div>
            </div>
          </template>
          <template #executionDate="{ item }">
            <div>
              <div class="font-weight-600">{{ date(item.executionDate) }}</div>
            </div>
          </template>
          <template v-slot:action="{ item }">
            <span @click="showConfirmModal(item.id)">
              <el-icon class="text-danger c-pointer">
                <Delete />
              </el-icon>
            </span>
          </template>

          <!-- <template #smsUnitsUsed="{ item }">
                        <div>
                            <div class="font-weight-600">{{ item.smsUnitsUsed }}</div>
                        </div>
                    </template> -->
          <!-- <template #report="{ item }">
                        <div>
                            <div class="font-weight-600 primary--text c-pointer"
                                @click="$router.push(`/tenant/voice/report/${item.id}`)">View_report</div>
                        </div>
                    </template> -->
        </Table>
      </div>
      <div class="col-md-12 mt-5 text-center" v-else>No Data</div>
    </div>
  </div>
</template>

<script>
import { ref, computed, watch } from "vue";
import Table from "@/components/table/Table";
// import store from "../../../store/store"
import monthDayYear from "../../../services/dates/dateformatter";
import axios from "@/gateway/backendapi";
import { ElMessage, ElMessageBox } from "element-plus";

export default {
  components: {
    Table,
  },
  setup() {
    const scheduleVocieList = ref([]);
    const searchVoiceText = ref("");
    const voiceLoading = ref(false);

    const voiceHeaders = ref([
      { name: "Subject", value: "subject" },
      { name: "Audio URL", value: "voiceMessageUrl" },
      { name: "is Executed", value: "isExecuted" },
      { name: "Execution Date", value: "executionDate" },
      { name: "Sent By", value: "user" },
      { name: 'ACTION', value: 'action' },
      // { name: 'Unit used', value: 'smsUnitsUsed' },
      // { name: 'Report', value: 'report' }
    ]);

    const getScheduleVoice = async () => {
      voiceLoading.value = true;
      try {
        const { data } = await axios.get("/api/Messaging/getVoiceSchedules");
        scheduleVocieList.value = data;
        voiceLoading.value = false;
      } catch (err) {
        console.log(err);
        voiceLoading.value = false;
      }
    };
    getScheduleVoice();

    const date = (offDate) => {
      return monthDayYear.monthDayTime(offDate);
    };

    const copyToClipBoard = async (item) => {
      await navigator.clipboard.writeText(item.voiceMessageUrl).then(() => {
        ElMessage({
          type: "success",
          message: "Copied to clipboard",
          duration: 5000,
        });
      });
    };

    const searchScheduleVoiceList = computed(() => {
      if (searchVoiceText.value !== "" && scheduleVocieList.value.length > 0) {
        return scheduleVocieList.value.filter((i) => {
          if (i.subject)
            return i.subject
              .toLowerCase()
              .includes(searchVoiceText.value.toLowerCase());
        });
      } else {
        return scheduleVocieList.value;
      }
    });
    const markedSchedules = ref([]);

    // function to delete schedules
    const mainone = (k) => {
      return k.map((i) => i.id).join(",");
    };

    const deleteSchedules = (id) => {
      let sub = mainone(markedSchedules.value);
      axios
        .delete(
          `/api/Messaging/DeleteVoiceScheduledMessages?ScheduledMessageIdList=${
            sub ? sub : id
          }`
        )
        .then(() => {
          if (sub) {
            scheduleVocieList.value = scheduleVocieList.value.filter((item) => {
              const p = markedSchedules.value.findIndex(
                (i) => i.id === item.id
              );
              if (p >= 0) return false;
              return true;
            });
            markedSchedules.value = [];
          } else {
            scheduleVocieList.value = scheduleVocieList.value.filter((del) => {
              return del.id != id;
            });
          }
          ElMessage({
            type: "success",
            message: "ScheduledVoice deleted successfully",
            duration: 5000,
          });
        })
        .catch((err) => {
          stopProgressBar();
          ElMessage({
            type: "error",
            message: "Draft delete failed",
            duration: 5000,
          });
          console.log(err);
        });
    };

    const showConfirmModal = (id) => {
      ElMessageBox.confirm(
        "This delete action cannot be reversed. do you want to continue?",
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
            message: "Delete canceled",
          });
        });
    };

    const handleSelectionChange = (val) => {
      markedSchedules.value = val;
    };

    return {
      scheduleVocieList,
      searchScheduleVoiceList,
      markedSchedules,
      searchVoiceText,
      voiceHeaders,
      copyToClipBoard,
      voiceLoading,
      date,
      showConfirmModal,
      handleSelectionChange,
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

.search-div input {
  background: none;
  border: none;
  outline: transparent;
}

.table-options {
  border: 1px solid rgb(212, 221, 227);
  border-bottom: none;
  padding: 7px 7px 0 7px
}


@media (max-width: 767px) {
  .search-div {
    width: 100%;
  }
}
</style>