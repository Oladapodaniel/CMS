<template>
  <div>
    <div class="container">
      <!-- Content Box -->
      <main id="main" class="mt-3">
        <div class="container-fluid px-0">
          <div class="row px-0">
            <div class="col-md-12 px-0">
              <div class="row d-md-flex align-items-center justify-content-between mt-3 mb-4">
                <div class="col-md-8 col-sm-12 pl-0">
                  <div class="search-div">
                    <span><i class="pi pi-search mr-1"></i></span>
                    <input type="text" placeholder="Search here..." v-model="searchText" />
                    <span class="mx-2"> | </span>
                    <span class="mx-2">Sort By</span>
                    <span class="font-weight-bold"> Newest</span>
                  </div>
                </div>
                <div class="col-sm-5 col-md-3 mt-sm-2 units-container">
                  <UnitsArea />
                </div>
              </div>
              <div class="row table-box mb-4" v-loading="loading">
                <div class="col-md-12">
                  <div class="row header-row light-grey-bg py-2">
                    <div class="col-md-12">
                      <el-icon class="text-danger" v-if="marked.length > 0" @click="showConfirmModal">
                        <Delete />
                      </el-icon>
                      <div class="row light-grey-bg">
                        <div class="col-md-1" v-if="sentSMS.length > 0">
                          <input type="checkbox" name="all" id="all" @change="markAllItem"
                            :checked="marked.length === sentSMS.length" />
                        </div>
                        <div class="col-md-6 d-flex align-items-center">
                          <span class="th">Message</span>
                        </div>
                        <div class="col-md-2">
                          <span class="th c-pointer" @click="sortByStatus">Status
                            <el-tooltip class="box-item" effect="dark" content="Sent | Processed | Failed"
                              placement="top-start">
                              <i class="pi pi-question-circle c-pointer"></i>
                            </el-tooltip>
                          </span>
                        </div>
                        <div class="col-md-1">
                          <span class="th">Units</span>
                        </div>
                        <div class="col-md-2">
                          <span class="th">Report</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-12">
                      <hr class="hr mt-0" />
                    </div>
                  </div>
                  <div class="row" v-for="(sms, index) in searchedMessages" :key="index">
                    <div class="col-md-12">
                      <div class="row">
                        <div class="col-md-1 mt-2">
                          <input type="checkbox" name="" id="" @change="mark1Item(sms)" :checked="
                            marked.findIndex((i) => i.id === sms.id) >= 0
                          " />
                        </div>
                        <div class="col-md-6 d-md-flex flex-column">
                          <router-link :to="{
                            name: 'SendMessage',
                            query: { messageId: sms.id },
                          }" style="color: #000" class="text-decoration-none">
                            <span class="d-flex justify-content-between msg-n-time">
                            </span>
                          </router-link>
                          <router-link :to="{
                            name: 'SendMessage',
                            query: { messageId: sms.id },
                          }" class="text-decoration-none">
                            <el-tooltip class="box-item" effect="dark" :content="sms.message" placement="top-start">
                              <span class="brief-message font-weight-600">{{
                                sms.message && sms.message.length > 25
                                  ? `${sms.message
                                    .split("")
                                    .slice(0, 25)
                                    .join("")}...`
                                  : sms.message
                                    ? sms.message
                                    : ""
                              }}</span>
                            </el-tooltip>
                            <span class="timestamp ml-1">{{
                              sms.dateSent
                            }}</span>
                          </router-link>
                        </div>
                        <div class="col-md-2 col-ms-12 d-flex justify-content-between">
                          <span class="hidden-header font-weight-bold">Status:
                          </span>
                          <span class="small-text">{{
                            sms.report.filter((i) =>
                              i.status.includes("sent")
                            ).length
                          }}
                            |
                            {{
                              sms.report.filter((i) =>
                                i.status.includes("processed")
                              ).length
                            }}
                            |
                            {{
                              sms.report.filter((i) =>
                                i.status.includes("failed")
                              ).length
                            }}</span>
                        </div>
                        <div class="col-md-1 col-ms-12 d-flex justify-content-between">
                          <span class="hidden-header font-weight-bold">UNITS:
                          </span>
                          <span class="small-text">{{ sms.smsUnitsUsed }}</span>
                        </div>
                        <div class="col-md-2 col-ms-12 my-2 d-flex justify-content-between cursor-pointer">
                          <span class="hidden-header font-weight-bold">DELIVER REPORT:
                          </span>
                          <router-link :to="{
                            name: 'DeliveryReport',
                            params: { messageId: sms.id },
                            query: { units: sms.smsUnitsUsed },
                          }" class="small-text text-decoration-none">View report</router-link>
                        </div>
                      </div>
                      <div class="row" v-if="index !== sentSMS.length - 1">
                        <div class="col-md-12 px-0">
                          <hr class="hr" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="row" v-if="sentSMS.length === 0 && !loading">
                    <div class="col-md-12 d-flex justify-content-center">
                      <span class="my-4 font-weight-bold">No sent mesages</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="conatiner">
          <div class="row">
            <div class="col-md-12 mb-3 pagination-container">
              <PaginationButtons @getcontent="getSMSByPage" :itemsCount="itemsCount" :currentPage="currentPage"
                :totalItems="sentSMS.totalItems" />
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import axios from "@/gateway/backendapi";
import { computed, ref } from "vue";
import communicationService from "../../services/communication/communicationservice";
import { useStore } from "vuex";
import UnitsArea from "../../components/units/UnitsArea";
import PaginationButtons from "../../components/pagination/PaginationButtons";
import stopProgressBar from "../../services/progressbar/progress";
import { ElMessage, ElMessageBox } from 'element-plus'

export default {
  components: {
    UnitsArea,
    PaginationButtons,
  },
  setup() {
    const loading = ref(false);
    const store = useStore();
    const sentSMS = ref(store.getters["communication/allSentSMS"]);

    const currentPage = ref(0);
    const searchText = ref("");
    const getSentSMS = async () => {
      try {
        loading.value = true;
        /*eslint no-undef: "warn"*/
        NProgress.start();
        const data = await communicationService.getAllSentSMS(0);
        loading.value = false;
        if (data) {
          sentSMS.value = data.sentSMS;
        }
      } catch (error) {
        loading.value = false;
        NProgress.done();
        console.log(error);
      }
    };

    const getSMSByPage = async (page) => {
      try {
        const data = await communicationService.getAllSentSMS(page);
        if (data) {
          sentSMS.value = data.sentSMS;
          currentPage.value = page;
          isSortedByStatus.value = true;
        }
      } catch (error) {
        console.log(error);
      }
    };

    if (
      !sentSMS.value ||
      sentSMS.value == undefined ||
      sentSMS.value.length === 0 ||
      !sentSMS.value[0]
    )
      getSentSMS();

    const itemsCount = computed(() => {
      if (!sentSMS.value || sentSMS.value.length === 0) return 0;
      return sentSMS.value.length;
    });

    const messages = computed(() => {
      if (!sentSMS.value || sentSMS.value.length === 0) return [];
      return sentSMS.value.filter((i) => {
        if (i && i.message)
          return !i.message.toLowerCase().startsWith("sms reply");
        return false;
      });
    });

    const searchedMessages = computed(() => {
      if (searchText.value === "" && messages.value.length > 0)
        return messages.value;
      return messages.value.filter((i) =>
        i.message.toLowerCase().includes(searchText.value.toLowerCase())
      );
    });

    const showConfirmModal = () => {
      ElMessageBox.confirm(
        'This delete action cannot be reversed. do you want to continue?',
        'Confirm delete',
        {
          confirmButtonText: 'OK',
          cancelButtonText: 'Cancel',
          type: 'error',
        }
      )
        .then(() => {
          deleteSingleItem();
        })
        .catch(() => {
          ElMessage({
            type: 'info',
            message: 'Delete canceled',
          })
        })
    };

    // code to mark single item in draft
    const marked = ref([]);
    const mark1Item = (messageid) => {
      const msgIndex = marked.value.findIndex((i) => i.id === messageid.id);
      if (msgIndex < 0) {
        marked.value.push(messageid);
      } else {
        marked.value.splice(msgIndex, 1);
      }
    };

    // code to mark multiple item item in draft
    const markAllItem = () => {
      if (marked.value.length < sentSMS.value.length) {
        sentSMS.value.forEach((i) => {
          const smsInMarked = marked.value.findIndex((q) => q.id === i.id);
          if (smsInMarked < 0) {
            marked.value.push(i);
          }
        });
      } else {
        marked.value = [];
      }
    };

    // Function to delete sent sms
    const convert = (x) => {
      return x.map((i) => i.id).join(",");
    };
    const deleteSingleItem = () => {
      let bail = convert(marked.value);
      axios
        .delete(`/api/Messaging/DeleteSentSMS?SentSMSIdList=${bail}`)
        .then(() => {
          sentSMS.value = sentSMS.value.filter((item) => {
            const y = marked.value.findIndex((i) => i.id === item.id);
            if (y >= 0) return false;
            return true;
          });
          ElMessage({
            type: 'success',
            message: 'SMS deleted successfully',
            duration: 5000
          })
          marked.value.forEach((i) => {
            store.dispatch("communication/removeSentSMS", i.id);
          });
          marked.value = [];
        })
        .catch((err) => {
          stopProgressBar();
          ElMessage({
            type: 'error',
            message: 'SMS delete failed, please try again',
            duration: 5000
          })
          console.log(err);
        });
    };

    const isSortedByStatus = ref(true);
    const sortByStatus = () => {
      if (isSortedByStatus.value) {
        sentSMS.value.sort(x => x.deliveryReport.findIndex(i => i.report === "failed") >= 0 ? -1 : 1);
      } else {
        sentSMS.value.sort(x => x.deliveryReport.findIndex(i => i.report === "failed") >= 0 ? 1 : -1);
      }
      isSortedByStatus.value = !isSortedByStatus.value;
    }

    return {
      sentSMS,
      loading,
      itemsCount,
      currentPage,
      getSMSByPage,
      messages,
      searchText,
      searchedMessages,
      marked,
      mark1Item,
      markAllItem,
      deleteSingleItem,
      convert,
      showConfirmModal,
      sortByStatus,
      isSortedByStatus,
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
  font-size: 14px;
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

.deleteicon-color {
  color: rgba(184, 5, 5, 0.726);
}

.th {
  font-size: 12px;
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

/* .view-btn:hover {
  cursor: pointer;
  background-color: #136acd;
  color: #fff;
} */

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