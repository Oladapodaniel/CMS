!<template>
  <div>
    <div class="container">
      <!-- Content Box -->
      <main id="main" class="mt-3">
        <div class="container-fluid px-0">
          <div class="row px-0">
            <div class="col-md-12 px-0">
              <div class="row d-md-flex align-items-center mt-3 mb-4">
                <div class="col-md-8 col-sm-12 pl-0">
                  <div class="search-div">
                    <span><i class="pi pi-search mr-1"></i></span>
                    <input
                      type="text"
                      placeholder="Search here..."
                      v-model="searchDrafts"
                    />
                    <span class="mx-2"> | </span>
                    <span class="mx-2">Sort By</span>
                    <span class="font-weight-bold"> Newest</span>
                  </div>
                </div>
                <div class="col-sm-5 col-md-4 mt-sm-2 units-container">
                  <UnitsArea />
                </div>
              </div>
              <div class="row table-box">
                <div class="col-md-12">
                  <div class="row header-row">
                    <div class="col-md-12">
                      <el-icon class="text-danger" v-if="markedDraft ? markedDraft.length > 0 : ''" @click="showConfirmModal(null)">
                        <Delete />
                      </el-icon>
                      <div class="row light-grey-bg py-2 tr-border-bottom">
                        <div class="col-md-1" v-if="drafts.length > 0">
                          <input
                            type="checkbox"
                            name="all"
                            id="all"
                            @change="markAllDrafts"
                            :checked="markedDraft.length === drafts.length"
                          />
                        </div>
                        <div class="col-md-7">
                          <span class="th">Message</span>
                        </div>
                        <div class="col-md-3">
                          <span class="th">Date & Time</span>
                        </div>
                        <div class="col-md-1">
                          <span class="th"></span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    class="row tr-border-bottom"
                    v-for="(draft, index) in searchDraftMessage"
                    :key="index"
                  >
                    <div class="col-md-12 py-2">
                      <div class="row py-1">
                        <div class="col-md-1">
                          <input
                            type="checkbox"
                            name=""
                            id=""
                            @change="mark1Draft(draft)"
                            :checked="
                              markedDraft.findIndex((i) => i.id === draft.id) >=
                              0
                            "
                          />
                        </div>
                        <div
                          class="col-md-7 col-ms-12 d-flex justify-content-between"
                        >
                          <span class="hidden-header font-weight-bold"
                            >Message:
                          </span>
                          <span
                            ><router-link
                              class="brief-message font-weight-600"
                              :to="{
                                name: 'SendMessage',
                                query: { draftId: draft.id },
                              }"
                              >{{ draft.body.length > 50 ? `${ draft.body.slice(0, 50) }...` : draft.body }}</router-link
                            ></span
                          >
                        </div>
                        <div
                          class="col-md-3 col-ms-12 d-flex justify-content-between"
                        >
                          <span class="hidden-header font-weight-bold"
                            >Date & Time
                          </span>
                          <span class="small-text">{{
                            new Date(draft.dateModified).toLocaleDateString()
                          }}</span>
                        </div>
                        <div
                          class="col-md-1 col-ms-12 d-flex justify-content-between"
                        >
                          <span class="small-text">
                          <el-icon class="text-danger" @click="showConfirmModal(draft)">
                          <Delete />
                        </el-icon>
                        </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div class="row">
                    <div class="col-md-12">
                      <Loading :loading="loading" />
                    </div>
                  </div>

                  <div class="row" v-if="!loading && searchDraftMessage.length === 0">
                    <div class="col-md-12 text-center py-3">
                      <p class="font-weight-700">No Drafts</p>
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
import { ref, computed } from "vue";
import router from "@/router/index";
import UnitsArea from "../../components/units/UnitsArea";
import axios from "@/gateway/backendapi";
import communicationService from "../../services/communication/communicationservice";
import store from "../../store/store";
import stopProgressBar from "../../services/progressbar/progress";
import Loading from "../../components/loading/LoadingComponent"
import { ElMessage, ElMessageBox } from 'element-plus'

export default {
  components: { UnitsArea, Loading },

  setup() {
    const loading = ref(true);
    const searchDrafts = ref("");
    const drafts = ref([]);
    const getDrafts = async () => {
      try {
        const data = await communicationService.getDrafts();
        loading.value = false;
        if (data) {
          drafts.value = data;
        }
      } catch (error) {
        console.log(error);
      }
    };

    drafts.value = store.getters["communication/smsDrafts"];
    if (!drafts.value || drafts.value.length === 0) {
      getDrafts();
    } else {
      loading.value = false;
    }

    const searchDraftMessage = computed(() => {
      if (searchDrafts.value === "" && drafts.value.length > 0) {
        return drafts.value;
      }
      return drafts.value.filter((i) =>
        i.body.toLowerCase().includes(searchDrafts.value.toLowerCase())
      );
    });

// Function to delete messages
    const handler = (f) => {
      return f.map((i) => i.id).join(",");
    };

    const deleteDraft = (draft) => {
      let holder = handler(markedDraft.value);
      let url = "";

      if (!draft || !draft.id) url = `/api/Messaging/DeleteSmsDraft?SMSDraftIdList=${holder}`;
      if (draft && draft.id) url = `/api/Messaging/DeleteSmsDraft?SMSDraftIdList=${draft.id}`;
      axios
        .delete(url)
        .then(() => {
          if (!draft || !draft.id) {
            drafts.value = drafts.value.filter((item) => {
              const t = markedDraft.value.findIndex((i) => i.id === item.id);
              if (t >= 0) return false;
              return true;
            });
            markedDraft.value.forEach((i) => {
              store.dispatch("communication/removeSmsDrafts", i.id);
            });
          } else {
            drafts.value = drafts.value.filter(i => i.id !== draft.id);
            store.dispatch("communication/removeSmsDrafts", draft.id);
          }

          ElMessage({
            type: 'success',
            message: 'Draft deleted successfully',
            duration: 5000
          })
          
          markedDraft.value = [];

        })
        .catch((err) => {
          stopProgressBar();
          ElMessage({
            type: 'error',
            message: 'Draft delete failed',
            duration: 5000
          })
          console.log(err);
        });
    };

    const showConfirmModal = (id) => {
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
          if (!id) {
            deleteDraft()
          } else {
            deleteDraft(id)
          }
        })
        .catch(() => {
          ElMessage({
            type: 'info',
            message: 'Delete canceled',
          })
        })
    };

    // code to mark single item in draft
    const markedDraft = ref([]);
    const mark1Draft = (draftItem) => {
      const draftIndex = markedDraft.value.findIndex(
        (i) => i.id === draftItem.id
      );
      if (draftIndex < 0) {
        markedDraft.value.push(draftItem);
      } else {
        markedDraft.value.splice(draftIndex, 1);
      }
    };

    // code to mark multiple item in draft
    const markAllDrafts = () => {
      if (markedDraft.value.length < drafts.value.length) {
        drafts.value.forEach((i) => {
          const draftInMarked = markedDraft.value.findIndex(
            (d) => d.id === i.id
          );
          if (draftInMarked < 0) {
            markedDraft.value.push(i);
          }
        });
      } else {
        markedDraft.value = [];
      }
    };

    return {
      drafts,
      getDrafts,
      searchDraftMessage,
      searchDrafts,
      markedDraft,
      mark1Draft,
      markAllDrafts,
      handler,
      deleteDraft,
      showConfirmModal,
      loading,
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

.center-flexed {
  display: flex;
  justify-content: center;
}

.table-box {
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