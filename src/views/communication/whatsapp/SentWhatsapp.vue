<template>
  <div>
    <div class="container-fluid">
      <!-- Content Box -->
      <main id="main" class="mt-3">
        <div class="d-flex flex-column flex-sm-row justify-content-sm-between">
          <div>
            <div class="text-head font-weight-bold h2 py-0 my-0 text-black">Whatsapp</div>
            <div class="s-18">Showing all SMS Data</div>
          </div>
          <!-- <div class="d-flex flex-wrap flex-sm-nowrap mt-3 mt-sm-0">
            <div class="d-flex mt-1 w-100" @click="watchVideo">
              <span class="s-18 primary--text">Watch Video </span>
              <span class="mt-0 ml-1"
                ><el-icon :size="27" class="primary--text"><VideoPlay /></el-icon
              ></span>
            </div>
            <el-dropdown
              trigger="click"
              class="align-items-center justify-content-center d-flex ml-md-3 ml-0 default-btn py-0 m-0 border"
              style="height: 2.2rem"
            >
              <span
                class="el-dropdown-link w-100 primary--text text-center font-weight-600"
              >
                Menu
                <el-icon class="el-icon--right">
                  <arrow-down />
                </el-icon>
              </span>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item>
                    <router-link
                      :to="`/tenant/sms/sent`"
                      class="no-decoration fw-400 text-black"
                    >
                      <img src="../../../assets/sent.png" alt="" />
                      Sent
                    </router-link>
                  </el-dropdown-item>
                  <el-dropdown-item>
                    <router-link
                      :to="`/tenant/sms/scheduled`"
                      class="no-decoration fw-400 text-black"
                    >
                      <img src="../../../assets/CalendarCheck.png" alt="" />
                      Scheduled
                    </router-link>
                  </el-dropdown-item>
                  <el-dropdown-item class="text-black">
                    <router-link
                      :to="`/tenant/sms/contacts`"
                      class="no-decoration text-black"
                    >
                      <img src="../../../assets/contactlist.png" alt="" />
                      Contact list
                    </router-link>
                  </el-dropdown-item>
                  <el-dropdown-item class="text-black">
                    <router-link
                      :to="`/tenant/sms/draft`"
                      class="no-decoration text-black"
                    >
                      <img src="../../../assets/FileDashed.png" alt="" />
                      Draft
                    </router-link>
                  </el-dropdown-item>
                  <el-dropdown-item class="text-black">
                    <router-link :to="`/tenant/sms`" class="no-decoration../ text-black">
                      <img src="../../../assets/ArrowBendUpLeft.png" alt="" />
                      <span> Replies</span>
                    </router-link>
                  </el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
            <router-link :to="`/tenant/sms/compose`" class="no-decoration w-100">
              <el-button
                :color="primarycolor"
                class="ml-0 ml-sm-2 mt-sm-0 mt-3 w-100 header-btn"
                round
                >Send SMS</el-button
              >
            </router-link>
          </div> -->
        </div>
        <div class="container-fluid mt-5">
          <div class="row px-0">
            <div class="col-md-12 border-radius-border-8">
              <div class="col-sm-5 col-md-3 px-0 mt-sm-2 units-contain">
                <UnitsArea />
              </div>
            </div>
            <div class="col-md-12 px-0">
              <div class="tab-options d-block d-md-none mt-5">
                <div class="s-14 fw-500 col-md-10 px-0 mt-5">
                  <div class="d-flex flex-column flex-sm-row justify-content-md-between">
                    <div>
                      <el-tooltip
                        class="box-item"
                        effect="dark"
                        v-if="marked.length > 0"
                        content="Delete member(s)"
                        placement="top-start"
                      >
                        <el-icon
                          :size="28"
                          class="ml-2 c-pointer primary--text"
                          v-if="marked.length > 0"
                          @click="showConfirmModal"
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
                        v-model="searchText"
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
                        v-if="marked.length > 0"
                        content="Delete member(s)"
                        placement="top-start"
                      >
                        <el-icon
                          :size="28"
                          class="ml-2 c-pointer primary--text"
                          v-if="marked.length > 0"
                          @click="showConfirmModal"
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
                        v-model="searchText"
                        :suffix-icon="Search"
                        placeholder="Search"
                        class="search-input col-md-12 col-9"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <Table
                :data="searchedMessages"
                :headers="SMSHeaders"
                :checkMultipleItem="true"
                @checkedrow="handleSelectionChange"
                v-loading="loading"
              >
                <template #message="{ item }">
                  <div>
                    <router-link
                      :to="{
                        name: 'SendMessage',
                        query: { messageId: item.id },
                      }"
                      class="text-decoration-none text-dak"
                    >
                      <!-- <el-tooltip class="box-item" effect="dark" :content="item.message" placement="top-start"> -->
                      <span class="fw-400">{{
                        item.message && item.message.length > 25
                          ? `${item.message.split("").slice(0, 25).join("")}...`
                          : item.message
                          ? item.message
                          : ""
                      }}</span>
                      <!-- </el-tooltip> -->
                    </router-link>
                  </div>
                </template>
                <template #dateSent="{ item }">
                  <div>
                    <router-link
                      :to="{
                        name: 'SendMessage',
                        query: { messageId: item.id },
                      }"
                      class="text-decoration-none"
                    >
                      <span class="timestamp text-dak ml-1">{{ item.dateSent }}</span>
                    </router-link>
                  </div>
                </template>
                <template v-slot:status="{ item }">
                  <div>
                    <span class="small-text text-dak"
                      >{{ item.report.filter((i) => i.status.includes("sent")).length }}
                      |
                      {{
                        item.report.filter((i) => i.status.includes("processed")).length
                      }}
                      |
                      {{
                        item.report.filter((i) => i.status.includes("failed")).length
                      }}</span
                    >
                  </div>
                </template>
                <template v-slot:smsUnitsUsed="{ item }">
                  <div>
                    <span class="small-text">{{ item.smsUnitsUsed }}</span>
                  </div>
                </template>
                <template v-slot:report="{ item }">
                  <div>
                    <router-link
                      :to="{
                        name: 'DeliveryReport',
                        params: { messageId: item.id },
                        query: { units: item.smsUnitsUsed },
                      }"
                      class="small-text no-decoration primary--text"
                      >View report</router-link
                    >
                  </div>
                </template>
                <template v-slot:action="{ item }">
                  <div>
                    <el-dropdown trigger="click">
                      <el-icon>
                        <MoreFilled />
                      </el-icon>
                      <template #dropdown>
                        <el-dropdown-menu>
                          <el-dropdown-item>
                            <router-link
                              :to="
                                item.phone
                                  ? `/tenant/sms/compose?phone=${item.phone}`
                                  : ''
                              "
                              :class="{
                                'fade-text': !item.phone,
                                'text-color': item.phone,
                              }"
                              >Send SMS</router-link
                            >
                          </el-dropdown-item>
                          <el-dropdown-item>
                            <router-link
                              :to="
                                item.email
                                  ? `/tenant/email/compose?phone=${item.email}`
                                  : ''
                              "
                              :class="{
                                'fade-text': !item.email,
                                'text-color': item.email,
                              }"
                              >Send Email</router-link
                            >
                          </el-dropdown-item>
                        </el-dropdown-menu>
                      </template>
                    </el-dropdown>
                  </div>
                </template>
              </Table>
            </div>
          </div>
        </div>

        <div class="conatiner-fluid">
          <div class="row">
            <div class="col-md-12 mb-3 pagination-container">
              <!-- <PaginationButtons @getcontent="getSMSByPage" :itemsCount="itemsCount" :currentPage="currentPage"
                  :totalItems="sentSMS.totalItems" /> -->
              <el-pagination
                v-model:current-page="serverOptions.page"
                v-model:page-size="serverOptions.rowsPerPage"
                background
                layout="total, prev, pager, next, jumper"
                :total="totalItems"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
              />
            </div>
          </div>
        </div>
      </main>
    </div>
    <el-dialog
      style="border-radius: 20px"
      v-model="showAddMemberVideo"
      :width="mdAndUp || lgAndUp || xlAndUp ? `50%` : `90%`"
      top
    >
      <div class="row justify-content-center" v-loading>
        <div class="col-md-12">
          <iframe
            width="100%"
            height="315"
            :src="videoURL"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerpolicy="strict-origin-when-cross-origin"
            allowfullscreen
          ></iframe>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import axios from "@/gateway/backendapi";
import { computed, ref, onMounted, watch, inject } from "vue";
import { useStore } from "vuex";
// import store from "../../store/store";
import UnitsArea from "../../../components/units/UnitsArea";
import stopProgressBar from "../../../services/progressbar/progress";
import { ElMessage, ElMessageBox } from "element-plus";
import Table from "@/components/table/Table";
import { Search } from "@element-plus/icons-vue";
import deviceBreakpoint from "../../../mixins/deviceBreakpoint";

export default {
  components: {
    UnitsArea,
    Table,
  },
  setup() {
    const loading = ref(false);
    const store = useStore();
    const sentSMS = ref(store.getters["communication/getSentSMS"].data);
    const searchText = ref("");
    const totalItems = ref(store.getters["communication/getSentSMS"].totalItems);
    const showAddMemberVideo = ref(false);
    const primarycolor = inject("primarycolor");
    const videoURL = ref("https://www.youtube.com/embed/woeot9MAId8?si=SVsS8hJcYIzyPohR");
    const { xsOnly, smAndUp, mdAndUp, lgAndUp, xlAndUp } = deviceBreakpoint();
    const SMSHeaders = ref([
      { name: " MESSAGE", value: "message" },
      { name: " DATE", value: "dateSent" },
      { name: " STATUS", value: "status" },
      { name: " UNIT", value: "smsUnitsUsed" },
      { name: " REPORT", value: "report" },
    ]);
    const serverOptions = ref({
      page: 1,
      rowsPerPage: 50,
    });

    watch(
      serverOptions.value,
      () => {
        getSMSByPage();
      },
      { deep: true }
    );

    const getSentSMS = async () => {
      loading.value = true;
      try {
        await store.dispatch("communication/getAllSMS").then((res) => {
          loading.value = false;
          sentSMS.value = res.data;
          totalItems.value = res.totalItems;
        });
      } catch (error) {
        loading.value = false;
        console.log(error);
      }
    };

    const getSMSByPage = async () => {
      loading.value = true;
      try {
        const data = await axios.get(
          `/api/Messaging/getAllSentWhatsApp?page=${serverOptions.value.page}`
        );
        loading.value = false;
        if (data) {
          sentSMS.value = data.data.data;
          totalItems.value = data.data.totalItems;
          isSortedByStatus.value = true;
        }
      } catch (error) {
        console.log(error);
        loading.value = false;
        ElMessage({
          type: "error",
          message: `Could not generate page ${serverOptions.value.page}, please try again`,
          duration: 5000,
        });
      }
    };

    // const itemsCount = computed(() => {
    //   if (!sentSMS.value || sentSMS.value.length === 0) return 0;
    //   return sentSMS.value.length;
    // });

    const messages = computed(() => {
      if (!sentSMS.value || sentSMS.value.length === 0) return [];
      return sentSMS.value.filter((i) => {
        if (i && i.message) return !i.message.toLowerCase().startsWith("sms reply");
        return false;
      });
    });

    const searchedMessages = computed(() => {
      if (searchText.value === "" && messages.value.length > 0) return messages.value;
      return messages.value.filter((i) =>
        i.message.toLowerCase().includes(searchText.value.toLowerCase())
      );
    });

    const showConfirmModal = () => {
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
          deleteSingleItem();
        })
        .catch(() => {
          ElMessage({
            type: "info",
            message: "Delete canceled",
          });
        });
    };

    // code to mark single item in draft
    const marked = ref([]);
    // const mark1Item = (messageid) => {
    //   const msgIndex = marked.value.findIndex((i) => i.id === messageid.id);
    //   if (msgIndex < 0) {
    //     marked.value.push(messageid);
    //   } else {
    //     marked.value.splice(msgIndex, 1);
    //   }
    // };

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
        .delete(`/api/Messaging/DeleteSentSMS?IdList=${bail}`)
        .then(() => {
          sentSMS.value = sentSMS.value.filter((item) => {
            const y = marked.value.findIndex((i) => i.id === item.id);
            if (y >= 0) return false;
            return true;
          });
          ElMessage({
            type: "success",
            message: "SMS deleted successfully",
            duration: 5000,
          });
          marked.value.forEach((i) => {
            store.dispatch("communication/removeSentSMS", i.id);
          });
          marked.value = [];
        })
        .catch((err) => {
          stopProgressBar();
          ElMessage({
            type: "error",
            message: "SMS delete failed, please try again",
            duration: 5000,
          });
          console.log(err);
        });
    };

    const isSortedByStatus = ref(true);
    const sortByStatus = () => {
      if (isSortedByStatus.value) {
        sentSMS.value.sort((x) =>
          x.deliveryReport.findIndex((i) => i.report === "failed") >= 0 ? -1 : 1
        );
      } else {
        sentSMS.value.sort((x) =>
          x.deliveryReport.findIndex((i) => i.report === "failed") >= 0 ? 1 : -1
        );
      }
      isSortedByStatus.value = !isSortedByStatus.value;
    };

    const handleSelectionChange = (val) => {
      marked.value = val;
    };

    const handleSizeChange = (val) => {
      console.log(`${val} items per page`);
    };
    const handleCurrentChange = (val) => {
      console.log(`current page: ${val}`);
    };
    const watchVideo = () => {
      showAddMemberVideo.value = true;
    };

    onMounted(() => {
      if (!sentSMS.value || (sentSMS.value && sentSMS.value.length == 0)) {
        getSentSMS();
      }
    });

    return {
      sentSMS,
      loading,
      searchText,
      searchedMessages,
      marked,
      store,
      // mark1Item,
      markAllItem,
      deleteSingleItem,
      convert,
      showConfirmModal,
      sortByStatus,
      isSortedByStatus,
      SMSHeaders,
      handleSelectionChange,
      serverOptions,
      handleCurrentChange,
      handleSizeChange,
      totalItems,
      showAddMemberVideo,
      videoURL,
      xsOnly,
      smAndUp,
      mdAndUp,
      lgAndUp,
      xlAndUp,
      primarycolor,
      Search,
      watchVideo,
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

.search-sms {
  position: absolute;
  top: 14px;
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
  /* color: #333333; */
  /* opacity: 0.5; */
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

.table-options {
  /* border: 1px solid rgb(212, 221, 227); */
  border-bottom: none;
  padding: 7px 7px 0 7px;
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
