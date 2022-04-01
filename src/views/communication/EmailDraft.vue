<template>
  <div>
    <div class="container">
      <!-- Content Box -->
      <main id="main" class="mt-3">
        <div class="container-fluid px-0">
          <div class="row px-0">
            <div class="col-md-12 px-0">
              <div class="row d-md-flex align-items-center mt-3 mb-4">
                <div class="col-md-12 col-sm-12">
                  <div class="search-div">
                    <span><i class="pi pi-search mr-1"></i></span>
                    <input
                      type="text"
                      placeholder="Search here..."
                      v-model="searchMails"
                    />
                    <span class="mx-2"> | </span>
                    <span class="mx-2">Sort By</span>
                    <span class="font-weight-bold"> Newest</span>
                  </div>
                </div>
              </div>

              <i
                class="pi pi-trash deleteicon-color ml-n4 mb-2 c-pointer d-flex align-items-center px-4"
                style="font-size: 20px"
                v-if="markEmailDraft.length > 0"
                @click="showConfirmModal(false)"
              >
              </i>

              <div class="row">
                <div class="col-md-12">
                  <div class="row header-row light-grey-bg py-2">
                    <div class="col-md-12 px-0">
                      <div class="row">
                        <div
                          class="col-md-1 text-md-right text-lg-center px-0"
                          v-if="drafts.length > 0"
                        >
                          <input
                            type="checkbox"
                            class="ml-3"
                            name="all"
                            id="all"
                            @change="markAllMailDrafts"
                            :checked="markEmailDraft.length === drafts.length"
                          />
                        </div>
                        <div class="col-md-7">
                          <span class="th">Message</span>
                        </div>
                        <div class="col-md-4">
                          <span class="th"></span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-12">
                      <hr class="hr mt-0" />
                    </div>
                  </div>
                  <div
                    class="row"
                    v-for="(draft, index) in searchEmailDraft"
                    :key="index"
                  >
                    <div class="col-md-12">
                      <div class="row py-1">
                        <div class="col-md-1">
                          <input
                            type="checkbox"
                            name=""
                            id=""
                            @change="mark1Draft(draft)"
                            :checked="
                              markEmailDraft.findIndex(
                                (i) => i.id === draft.id
                              ) >= 0
                            "
                          />
                        </div>
                        <div
                          class="col-md-7 d-md-flex flex-column pl-0 small-text"
                        >
                          <router-link
                            :to="{
                              name: 'ComposeEmail',
                              query: { emaildraft: draft.id },
                            }"
                            class="text-decoration-none text-dark font-weight-700"
                          >
                            <span
                              class="d-flex justify-content-between msg-n-time"
                            >
                              <span
                                class="font-weight-600 small-text text-capitalize"
                                >{{ draft.subject.toLowerCase() }}</span
                              >
                              <span class="timestamp">{{
                                new Date(draft.dateModified).toLocaleString()
                              }}</span>
                            </span>
                          </router-link>
                          <span class="brief-message text-capitalize small-text"
                            ><router-link
                              :to="{
                                name: 'ComposeEmail',
                                query: { emaildraft: draft.id },
                              }"
                              class="text-decoration-none"
                            >
                              {{ formatMessage(draft.body) }}
                            </router-link></span
                          >
                        </div>
                        <div
                          class="col-md-3 col-ms-12 d-flex justify-content-between"
                        >
                          <span class="hidden-header font-weight-bold"> </span>
                          <span></span>
                          <span class="small-text">
                            <i
                              class="c-pointer pr-3 pi pi-trash delete-icon"
                              @click="showConfirmModal(draft.id)"
                              style="font-size: 18px"
                            >
                            </i
                          ></span>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-md-12">
                          <hr class="hr" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <ConfirmDialog />
                  <Toast />
                  <div class="row" v-if="drafts.length === 0 && !loading">
                    <div class="col-md-12 d-flex justify-content-center">
                      <span class="my-4 font-weight-bold"
                        >No draft messages</span
                      >
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
import { useConfirm } from "primevue/useconfirm";
// import { useStore } from "vuex";
import store from '../../store/store';
import { useToast } from "primevue/usetoast";
import stopProgressBar from "../../services/progressbar/progress";
import axios from "@/gateway/backendapi";
import Loading from "../../components/loading/LoadingComponent";

export default {
  components: { Loading },
  setup() {
    // const store = useStoredraftId
    const drafts = ref(store.getters["communication/emailDrafts"]);
    const loading = ref(false);

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
          ? `${createElementFromHTML(message)
              .split("")
              .slice(0, 25)
              .join("")}...`
          : createElementFromHTML(message);

      return `${formatted}`;
    };

    const createElementFromHTML = (htmlString) => {
      var div = document.createElement("div");
      div.innerHTML = htmlString;
      return div.textContent;
    };

    if (!drafts.value || (drafts.value === drafts.value.length) === 0)
      getEmailDrafts();

    // Function to search through item
    const searchMails = ref("");
    const searchEmailDraft = computed(() => {
      if (searchMails.value === "" && drafts.value.length > 0)
        return drafts.value;
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
          const draftMailInMarked = markEmailDraft.value.findIndex(
            (a) => a.id === i.id
          );
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
      let stringOfDraftsIds = id ? id
        : getIdsOfDraftsToDelete(markEmailDraft.value);

      axios
        .delete(
          `/api/Messaging/DeleteEmailDrafts?EmailDraftIdList=${stringOfDraftsIds}`
        )
        .then((res) => {
          if (res) {
            toast.add({
              severity: "success",
              summary: "Delete Successful",
              detail: `${ markEmailDraft.value.length > 1 ? 'Selected Drafts have' : 'Draft has'} been deleted successfully ` ,
              life: 3000,
            });
            drafts.value = !id
              ? removeDeletedDraftedEmailsFromDraftsEmailsList(
                  markEmailDraft.value
                )
              : drafts.value.filter((i) => i.id !== id);
            if (id) {
              store.dispatch("communication/removeEmailDrafts", id);
            } else {
              removeDeletedDraftedEmailsFromStore(markEmailDraft.value);
            }
            markEmailDraft.value = [];
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
              markEmailDraft.value > 1 ? "Selected Drafts" : "Draft"
            } could not be deleted,`,
            life: 3000,
          });
          console.log(err);
        });
    };

    const removeDeletedDraftedEmailsFromDraftsEmailsList = (
      deletedDraftsArr
    ) => {
      return drafts.value.filter((i) => {
        const draftIndexInMarked = deletedDraftsArr.findIndex(
          (j) => j.id === i.id
        );
        if (draftIndexInMarked < 0) return true;
        return false;
      });
    };

    const removeDeletedDraftedEmailsFromStore = (deletedDrafts) => {
      for (let draft of deletedDrafts) {
        store.dispatch("communication/removeEmailDrafts", draft.id);
      }
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
          deleteMailDrafts(id);
        },
        reject: () => {
          //  toast.add({severity:'info', summary:'Rejected',
          //  detail:'You have rejected', life: 3000});
        },
      });
    };

    return {
      drafts,
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