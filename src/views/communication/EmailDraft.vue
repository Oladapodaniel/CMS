<template>
  <div>
    <div class="container-fluid">
      <!-- Content Box -->
      <main id="main" class="mt-3">
        <div class="container-fluid px-0">
          <div class="row px-0">
            <div class="col-md-12">
              <div class="text-head font-weight-bold text-black h2">Draft</div>
              <div class="grey-backg py-2 border-radius-8 col-md-3">
                <router-link
                  to="/tenant/email/sent"
                  class="text-decoration-none s-18 text-dak"
                >
                  <span class="linear-gradient">Email> Draft</span>
                </router-link>
              </div>
            </div>
            <div class="col-md-12 mt-5">
              <div class="tab-options d-block d-md-none mt-5">
                <div class="s-14 fw-500 col-md-10 px-0 mt-5">
                  <div class="d-flex flex-column flex-sm-row justify-content-md-between">
                    <div>
                      <el-tooltip
                        class="box-item"
                        effect="dark"
                        v-if="markEmailDraft.length > 0"
                        content="Delete member(s)"
                        placement="top-start"
                      >
                        <el-icon
                          :size="28"
                          class="ml-2 c-pointer primary--text"
                          v-if="markEmailDraft.length > 0"
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
                        v-model="searchMails"
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
                        v-if="markEmailDraft.length > 0"
                        content="Delete member(s)"
                        placement="top-start"
                      >
                        <el-icon
                          :size="28"
                          class="ml-2 c-pointer primary--text"
                          v-if="markEmailDraft.length > 0"
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
                        v-model="searchMails"
                        :suffix-icon="Search"
                        placeholder="Search"
                        class="search-input col-md-12 col-9"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <Table
                :data="searchEmailDraft"
                :headers="DraftHeaders"
                :checkMultipleItem="true"
                @checkedrow="handleSelectionChange"
                v-loading="loading"
              >
                <template #subject="{ item }">
                  <div>
                    <router-link
                      :to="{
                        name: 'ComposeEmail',
                        query: { emaildraft: item.id },
                      }"
                      class="no-decoration text-dak"
                    >
                      <el-tooltip
                        class="box-item"
                        effect="dark"
                        :content="item.subject"
                        placement="top-start"
                      >
                        <div class="text-dak">
                          {{
                            item.subject && item.subject.length > 25
                              ? `${item.subject.split("").slice(0, 25).join("")}...`
                              : item.subject
                              ? item.subject
                              : ""
                          }}
                        </div>
                      </el-tooltip>
                      <el-tooltip
                        class="box-item"
                        effect="dark"
                        :content="item.body"
                        placement="top-start"
                      >
                        <div class="text-dak">
                          {{
                            item.body && item.body.length > 25
                              ? `${item.body.split("").slice(0, 25).join("")}...`
                              : item.body
                              ? item.body
                              : ""
                          }}
                        </div>
                      </el-tooltip>
                    </router-link>
                  </div>
                </template>
                <template #dateModified="{ item }">
                  <div>
                    <router-link
                      :to="{
                        name: 'ComposeEmail',
                        query: { emaildraft: item.id },
                      }"
                      class="no-decoration"
                    >
                      <span class="timestam ml-1">{{
                        new Date(item.dateModified).toLocaleString()
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

              <div class="row">
                <div class="col-md-12">
                  <div class="row">
                    <div class="col-md-12">
                      <hr class="hr mt-0" />
                    </div>
                  </div>
                  <div class="row" v-if="drafts.length === 0 && !loading">
                    <div class="col-md-12 d-flex justify-content-center">
                      <span class="my-4 font-weight-bold">No draft messages</span>
                    </div>
                  </div>

                  <div class="row" v-if="drafts.length === 0 && loading">
                    <div class="col-md-12 py-2 d-flex justify-content-center">
                      <Loading :loading="loading" />
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
import { computed, ref } from "vue";
import communicationService from "../../services/communication/communicationservice";
import store from "../../store/store";
import stopProgressBar from "../../services/progressbar/progress";
import axios from "@/gateway/backendapi";
import Loading from "../../components/loading/LoadingComponent";
import Table from "@/components/table/Table";
import { Search } from "@element-plus/icons-vue";
import { ElMessage, ElMessageBox } from "element-plus";

export default {
  components: { Loading, Table },
  setup() {
    const drafts = ref(store.getters["communication/emailDrafts"]);
    const loading = ref(false);
    const DraftHeaders = ref([
      { name: " MESSAGE", value: "subject" },
      { name: " DATE", value: "dateModified" },
      { name: "Action", value: "action" },
    ]);

    const handleSelectionChange = (val) => {
      markEmailDraft.value = val;
    };
    const getEmailDrafts = async () => {
      loading.value = true;
      const data = await communicationService.getEmailDrafts();
      loading.value = false;

      if (data) {
        drafts.value = data;
        console.log(drafts.value, "seun");
        console.log(drafts, "kahdijat");
      }
    };

    const formatMessage = (message) => {
      const formatted =
        message && message.length > 25
          ? `${createElementFromHTML(message).split("").slice(0, 25).join("")}...`
          : createElementFromHTML(message);

      return `${formatted}`;
    };

    const createElementFromHTML = (htmlString) => {
      var div = document.createElement("div");
      div.innerHTML = htmlString;
      return div.textContent;
    };

    if (!drafts.value || (drafts.value === drafts.value.length) === 0) getEmailDrafts();

    // Function to search through item
    const searchMails = ref("");
    const searchEmailDraft = computed(() => {
      if (searchMails.value === "" && drafts.value.length > 0) return drafts.value;
      console.log(drafts.value, "🎈🎈");
      return drafts.value.filter((i) => {
        i.body.toLowerCase().includes(searchMails.value.toLowerCase());
      });
    });

    // function to check single item
    const markEmailDraft = ref([]);
    const mark1Draft = (draftId) => {
      const mailIndex = markEmailDraft.value.findIndex((i) => i.id === draftId.id);
      if (mailIndex < 0) {
        markEmailDraft.value.push(draftId);
      } else {
        markEmailDraft.value.splice(mailIndex, 1);
      }
    };

    // function to mark all email drafts
    const markAllMailDrafts = () => {
      if (markEmailDraft.value.length < drafts.value.length) {
        drafts.value.forEach((i) => {
          const draftMailInMarked = markEmailDraft.value.findIndex((a) => a.id === i.id);
          if (draftMailInMarked < 0) {
            markEmailDraft.value.push(i);
          }
        });
      } else {
        markEmailDraft.value = [];
      }
    };

    //Function to delete drafted mails
    const getIdsOfDraftsToDelete = (markedDrafts) => {
      return markedDrafts.map((i) => i.id).join(",");
    };

    const deleteMailDrafts = (id) => {
      let stringOfDraftsIds = id ? id : getIdsOfDraftsToDelete(markEmailDraft.value);

      axios
        .delete(`/api/Messaging/DeleteEmailDrafts?EmailDraftIdList=${stringOfDraftsIds}`)
        .then((res) => {
          if (res) {
            ElMessage({
              type: "success",
              message: `${
                markEmailDraft.value.length > 1 ? "Selected Drafts have" : "Draft has"
              } been deleted successfully `,
              duration: 5000,
            });
            drafts.value = !id
              ? removeDeletedDraftedEmailsFromDraftsEmailsList(markEmailDraft.value)
              : drafts.value.filter((i) => i.id !== id);
            if (id) {
              store.dispatch("communication/removeEmailDrafts", id);
            } else {
              removeDeletedDraftedEmailsFromStore(markEmailDraft.value);
            }
            markEmailDraft.value = [];
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
              markEmailDraft.value > 1 ? "Selected Drafts" : "Draft"
            } could not be deleted,`,
            duration: 5000,
          });
          console.log(err);
        });
    };

    const removeDeletedDraftedEmailsFromDraftsEmailsList = (deletedDraftsArr) => {
      return drafts.value.filter((i) => {
        const draftIndexInMarked = deletedDraftsArr.findIndex((j) => j.id === i.id);
        if (draftIndexInMarked < 0) return true;
        return false;
      });
    };

    const removeDeletedDraftedEmailsFromStore = (deletedDrafts) => {
      for (let draft of deletedDrafts) {
        store.dispatch("communication/removeEmailDrafts", draft.id);
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
          deleteMailDrafts(id);
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
      drafts,
      handleSelectionChange,
      DraftHeaders,
      loading,
      createElementFromHTML,
      formatMessage,
      searchEmailDraft,
      searchMails,
      mark1Draft,
      markAllMailDrafts,
      deleteMailDrafts,
      showConfirmModal,
      markEmailDraft,
      Search,
    };
  },
};
</script>

<style scoped>
.table-options {
  border-bottom: none;
  padding: 7px 7px 0 7px;
}

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

.brief-message {
  color: #4762f0;
}

.deleteicon-color {
  color: rgba(184, 5, 5, 0.726);
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
}

.hidden-header {
  display: none;
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
.tab-options{
  position: relative;
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
