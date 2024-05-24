<template>
  <div>
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
    <div class="table-options" v-loading="voiceLoading" v-if="markedVoice.length > 0">
      <el-tooltip
        class="box-item"
        effect="dark"
        v-if="markedVoice.length > 0"
        content="delete marked"
        placement="top-start"
      >
        <el-icon
          :size="20"
          class="color-deleteicon text-danger c-pointer"
          style="font-size: 15px"
          v-if="markedVoice.length > 0"
          @click="showConfirmModal"
        >
          <Delete />
        </el-icon>
      </el-tooltip>
    </div>

    <Table
      :data="searchVoiceList"
      :headers="voiceHeaders"
      :checkMultipleItem="true"
      @checkedrow="handleSelectionChange"
      v-loading="voiceLoading"
    >
      <template #subject="{ item }">
        <div>
          <router-link
            :to="{
              name: 'composeVoice',
              query: { voiceId: item.id },
            }"
            class="text-decoration-none"
          >
          <div class="font-weight-600">{{ item.subject }}</div>
          </router-link>
        </div>
      </template>
      <template #message="{ item }">
        <div>
          <div class="font-weight-600">
            <el-button type="success" @click="copyToClipBoard(item)" plain round
              >Copy URL</el-button
            >
          </div>
        </div>
      </template>
      <template #dateSent="{ item }">
        <div>
          <router-link
            :to="{
              name: 'composeVoice',
              query: { voiceId: item.id },
            }"
            class="text-decoration-none"
          >
          <div class="font-weight-600">{{ item.dateSent }}</div>
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
            class="text-decoration-none"
          >
          <div class="font-weight-600">{{ item.sentByUser }}</div>
          </router-link>
        </div>
      </template>
      <template #smsUnitsUsed="{ item }">
        <div>
          <div class="font-weight-600">{{ item.smsUnitsUsed }}</div>
        </div>
      </template>
      <template #report="{ item }">
        <div>
          <div
            class="font-weight-600 primary--text c-pointer"
            @click="$router.push(`/tenant/voice/report/${item.id}`)"
          >
            View_report
          </div>
        </div>
      </template>
      <template #delete="{ item }">
        <span class="small-text">
          <el-icon
            :size="20"
            class="ml-2 color-deleteicon pt-2 c-pointer"
            style="font-size: 20px"
            @click="showConfirmModal(item.id)"
          >
            <Delete />
          </el-icon>
        </span>
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
  </div>
</template>

<script>
import { ref, computed, watch } from "vue";
import Table from "@/components/table/Table";
import store from "../../../store/store";
import axios from "@/gateway/backendapi";
import stopProgressBar from "../../../services/progressbar/progress";
import { ElMessage, ElMessageBox } from "element-plus";
export default {
  components: {
    Table,
  },
  setup() {
    // const store  = useStore()
    const sentVoiceList = ref([]);
    const searchVoiceText = ref("");
    const totalSentVoiceList = ref("");
    const paginationPage = ref("");
    const paginatedTableLoading = ref(false);
    const voiceHeaders = ref([
      { name: "Subject", value: "subject" },
      { name: "Audio URL", value: "message" },
      { name: "Date Sent", value: "dateSent" },
      { name: "Sent By", value: "sentByUser" },
      { name: "Unit used", value: "smsUnitsUsed" },
      { name: "Report", value: "report" },
      { name: "", value: "delete" },
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
  border: 1px solid rgb(212, 221, 227);
  border-bottom: none;
  padding: 7px 7px 0 7px;
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
