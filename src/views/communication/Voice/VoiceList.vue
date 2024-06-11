<template>
  <div class="container-fluid">
    <div class="d-flex flex-column flex-sm-row justify-content-sm-between">
      <div>
        <div class="text-head font-weight-bold h2 py-0 my-0 text-black">Voice</div>
        <div class="s-18">Showing all Voice messages</div>
      </div>
      <div class="d-flex flex-wrap flex-sm-nowrap mt-3 mt-sm-0">
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
          <span class="el-dropdown-link w-100 primary--text text-center font-weight-600">
            Menu
            <el-icon class="el-icon--right">
              <arrow-down />
            </el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item>
                <router-link
                  :to="`/tenant/voice/voicelist`"
                  class="no-decoration fw-400 text-black"
                >
                  <img src="../../../assets/sent.png" alt="" />
                  All Sent
                </router-link>
              </el-dropdown-item>

              <el-dropdown-item>
                <router-link
                  :to="`/tenant/voice/schedulelist`"
                  class="no-decoration fw-400 text-black"
                >
                  <img src="../../../assets/CalendarCheck.png" alt="" />
                  Scheduled
                </router-link>
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
        <!-- <el-button @click="importMembers" class="header-btn secondary-button" round>Import</el-button> -->
        <router-link :to="`/tenant/voice/sendvoicemessage`" class="no-decoration w-100">
          <el-button
            :color="primarycolor"
            class="ml-0 ml-sm-2 mt-sm-0 mt-3 w-100 header-btn"
            round
            >Send Voice</el-button
          >
        </router-link>
      </div>
    </div>

    <div class="tab-options d-block d-md-none mt-5">
      <div class="s-14 fw-500 col-md-10 px-0 mt-5">
        <div class="d-flex flex-column flex-sm-row justify-content-md-between">
          <div>
            <el-tooltip
              class="box-item"
              effect="dark"
              v-if="markedVoice.length > 0"
              content="Delete member(s)"
              placement="top-start"
            >
              <el-icon
                :size="28"
                class="ml-2 c-pointer primary--text"
                v-if="markedVoice.length > 0"
                @click="showConfirmModal"
              >
                <Delete />
              </el-icon>
            </el-tooltip>
          </div>
          <div class="d-flex flex-column flex-md-row justify-content-md-between">
            <el-input
              size="small"
              v-model="searchVoiceText"
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
              v-if="markedVoice.length > 0"
              content="Delete member(s)"
              placement="top-start"
            >
              <el-icon
                :size="28"
                class="ml-2 c-pointer primary--text"
                v-if="markedVoice.length > 0"
                @click="showConfirmModal"
              >
                <Delete />
              </el-icon>
            </el-tooltip>
          </div>
          <div class="d-flex flex-column flex-md-row justify-content-md-between">
            <el-input
              size="small"
              v-model="searchVoiceText"
              :suffix-icon="Search"
              placeholder="Search"
              class="search-input col-md-12 col-9"
            />
          </div>
        </div>
      </div>
    </div>

    <Table
      :data="searchVoiceList"
      :headers="voiceHeaders"
      :checkMultipleItem="true"
      @checkedrow="handleSelectionChange"
    >
      <template #subject="{ item }">
        <div>
          <router-link
            :to="{
              name: 'composeVoice',
              query: { voiceId: item.id },
            }"
            class="text-decoration-none text-dak"
          >
            <div>{{ item.subject }}</div>
          </router-link>
        </div>
      </template>
      <template #dateSent="{ item }">
        <div>
          <router-link
            :to="{
              name: 'composeVoice',
              query: { voiceId: item.id },
            }"
            class="text-decoration-none text-dak"
          >
            <div>{{ item.dateSent }}</div>
          </router-link>
        </div>
      </template>
      <template #sentByUser="{ item }">
        <div>
          <router-link
            :to="{
              name: 'composeVoice',
              query: { voiceId: item.id },
            }"
            class="text-decoration-none text-dak"
          >
            <div>{{ item.sentByUser }}</div>
          </router-link>
        </div>
      </template>
      <template #smsUnitsUsed="{ item }">
        <div>
          <div>{{ item.smsUnitsUsed }}</div>
        </div>
      </template>
      <template #report="{ item }">
        <div>
          <div class="c-pointer" @click="$router.push(`/tenant/voice/report/${item.id}`)">
           <u> View report</u>
          </div>
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
    <div class="d-flex justify-content-end my-3">
      <el-pagination
        v-model:current-page="serverOptions.page"
        v-model:page-size="serverOptions.rowsPerPage"
        background
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalSentVoiceList"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
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
import { ref, computed, watch, inject } from "vue";
import Table from "@/components/table/Table";
import store from "../../../store/store";
import axios from "@/gateway/backendapi";
import stopProgressBar from "../../../services/progressbar/progress";
import { ElMessage, ElMessageBox } from "element-plus";
import { Search } from "@element-plus/icons-vue";
import deviceBreakpoint from "../../../mixins/deviceBreakpoint";
export default {
  components: {
    Table,
  },
  setup() {
    // const store  = useStore()
    const sentVoiceList = ref([]);
    const searchVoiceText = ref("");
    const totalSentVoiceList = ref();
    const paginationPage = ref("");
    const paginatedTableLoading = ref(false);
    const showAddMemberVideo = ref(false);
    const primarycolor = inject("primarycolor");
    const videoURL = ref("https://www.youtube.com/embed/xQK4X5iJp-4?si=-_l0o9wvrx2_pnER");
    const { xsOnly, smAndUp, mdAndUp, lgAndUp, xlAndUp } = deviceBreakpoint();
    const voiceHeaders = ref([
      { name: "Subject", value: "subject" },
      { name: "Date Sent", value: "dateSent" },
      { name: "Sent By", value: "sentByUser" },
      { name: "Unit used", value: "smsUnitsUsed" },
      { name: "Report", value: "report" },
      { name: "ACTION", value: "action" },
    ]);
    const voiceLoading = ref(false);
    const getAllSentVoice = async () => {
      voiceLoading.value = true;
      await store.dispatch("communication/getAllSentVoice").then((res) => {
        voiceLoading.value = false;
        sentVoiceList.value = res.data;
        totalSentVoiceList.value = res.totalItems;
        paginationPage.value = res.page;
        // console.log(sentVoiceList.value, "jhgjhgjkkgkjj")
      });
    };
    getAllSentVoice();

    const serverOptions = ref({
      page: 1,
      rowsPerPage: 50,
    });

    const watchVideo = () => {
      showAddMemberVideo.value = true;
    };

    const markedVoice = ref([]);

    // const removeDeletedVoicesFromVoiceList = (deletedVoicesArr) => {
    //   return markedVoice.value.filter((i) => {
    //     const voiceIndexInMarked = deletedVoicesArr.findIndex(
    //       (j) => j.id === i.id
    //     );
    //     if (voiceIndexInMarked < 0) return true;
    //     return false;
    //   });
    // };
    const mainone = (k) => {
      return k.map((i) => i.id).join(",");
    };

    const deleteVoice = async (id) => {
      try {
        let sub = mainone(markedVoice.value);
        const { data } = await axios.delete(
          `/api/Messaging/DeleteSentVoice?IdList=${sub ? sub : id}`
        );
        if (sub) {
          ElMessage({
            type: "success",
            message: `${
              markedVoice.value.length > 1 ? "" : "Voice has"
            } been deleted successfully`,
            duration: 5000,
          });
          sentVoiceList.value = sentVoiceList.value.filter((item) => {
            const p = markedVoice.value.findIndex((i) => i.id === item.id);
            if (p >= 0) return false;
            return true;
          });
          markedVoice.value = [];

          //   sentVoiceList.value = !id
          //     ? removeDeletedVoicesFromVoiceList(markedVoice.value)
          //     : sentVoiceList.value.filter((i) => i.id !== id);
          //   if (id) {
          //     store.dispatch("communication/removeSentEmails", id);
          //   } else {
          //     removeDeletedEmailsFromStore(markedVoice.value);
          //   }
          markedVoice.value = [];
        } else {
          sentVoiceList.value = sentVoiceList.value.filter((del) => {
            return del.id != id;
          });
          ElMessage({
            type: "success",
            message: data.message,
          });
        }
      } catch (error) {
        console.log(error);
        ElMessage({
          type: "error",
          message: `${
            markedVoice.value.length > 1 ? "Selected Voices" : "Voice"
          } could not be deleted, Please try reloading`,
          duration: 5000,
        });
        stopProgressBar();
      }
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
          deleteVoice(id);
        })
        .catch(() => {
          ElMessage({
            type: "info",
            message: "Delete discarded",
          });
        });
    };

    watch(
      serverOptions,
      () => {
        getTransactionByPage();
      },
      { deep: true }
    );

    const handleSizeChange = (val) => {
      console.log(`${val} items per page`);
    };
    const handleCurrentChange = (val) => {
      console.log(`current page: ${val}`);
    };

    const getTransactionByPage = async () => {
      paginatedTableLoading.value = true;
      try {
        voiceLoading.value = true;
        const { data } = await axios.get(
          `api/Messaging/getAllSentVoice?Page=${serverOptions.value.page}`
        );
        voiceLoading.value = false;
        sentVoiceList.value = data.data;
        totalSentVoiceList.value = data.totalItems;
        paginationPage.value = data.page;
        paginatedTableLoading.value = false;
        getAllSentVoice();
      } catch (error) {
        paginatedTableLoading.value = false;
        console.log(error);
      }
    };

    const copyToClipBoard = async (item) => {
      await navigator.clipboard.writeText(item.message).then(() => {
        ElMessage({
          type: "success",
          message: "Copied to clipboard",
          duration: 5000,
        });
      });
    };

    const searchVoiceList = computed(() => {
      if (searchVoiceText.value !== "" && sentVoiceList.value.length > 0) {
        return sentVoiceList.value.filter((i) => {
          if (i.subject)
            return i.subject.toLowerCase().includes(searchVoiceText.value.toLowerCase());
        });
      } else {
        return sentVoiceList.value;
      }
    });
    const handleSelectionChange = (val) => {
      markedVoice.value = val;
    };
    return {
      sentVoiceList,
      serverOptions,
      markedVoice,
      paginatedTableLoading,
      xsOnly,
      smAndUp,
      mdAndUp,
      lgAndUp,
      xlAndUp,
      paginationPage,
      handleSizeChange,
      totalSentVoiceList,
      handleCurrentChange,
      getTransactionByPage,
      voiceLoading,
      voiceHeaders,
      copyToClipBoard,
      handleSelectionChange,
      deleteVoice,
      searchVoiceList,
      searchVoiceText,
      showConfirmModal,
      showAddMemberVideo,
      primarycolor,
      videoURL,
      watchVideo,
      Search,
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

.search-div input {
  background: none;
  border: none;
  outline: transparent;
}

@media (max-width: 767px) {
  .search-div {
    width: 100%;
  }
}
</style>
