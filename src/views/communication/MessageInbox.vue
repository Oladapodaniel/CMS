!<template>
  <div>
    <div class="container">
      <!-- Content Box -->
      <main id="main" class="mt-3">
        <div class="container-fluid px-0">
          <div class="row px-0">
            <div class="col-md-12 px-0">
              <div
                class="row d-md-flex justify-content-between align-items-center mt-3 mb-4"
              >
                <div class="col-md-8 col-sm-12 pl-0">
                  <div class="search-div">
                    <span><i class="pi pi-search mr-1"></i></span>
                    <input
                      type="text"
                      placeholder="Search here..."
                      v-model="searchSms"
                    />
                    <span class="float-right">
                      <span class="mx-2"> | </span>
                      <span class="mx-2">Sort By</span>
                      <span class="font-weight-bold"> Newest</span>
                    </span>
                  </div>
                </div>
                <div class="col-sm-5 col-md-3 ml-2 mt-sm-2 units-container">
                  <UnitsArea />
                  <!-- <div class="row d-sm-flex align-items-center units-div">
                    <div class="col-sm-12">
                      <h4 class="font-weight-bold mb-0 center-flexed">302</h4>
                      <p class="font-weight-bold mb-0 center-flexed">
                        SMS Units
                      </p>
                    </div>
                    <div class="col-sm-12 d-sm-flex justify-content-center">
                      <button
                        class="btn buy-btn center-flexed mt-2"
                        @click="payWithPaystack"
                      >
                        <span class="btn-text"> BUY UNITS </span>
                      </button>
                    </div>
                  </div> -->
                </div>
              </div>

                               <i
                class="pi pi-trash text-danger ml-n4 mb-2 c-pointer d-flex align-items-center px-4"
                style="font-size: 15px"
                v-if="markedInboxMssg.length > 0"
                @click="showConfirmModal"
              >
              </i>

              <div class="row table-box mb-4">
                <div class="col-md-12">
                  <div class="row header-row light-grey-bg py-2">
                    <div class="col-md-12">
                      <div class="row">
                        <div class="col-md-1"
                        v-if="replies.length > 0">
                          <input
                            type="checkbox"
                            name=""
                            id=""
                            @change="markAllInboxMssg"
                            :checked="markedInboxMssg.length === replies.length"
                          />
                        </div>
                        <div class="col-md-5 d-flex align-items-center">
                          <span class="th">Message</span>
                        </div>
                        <div class="col-md-2">
                          <span class="th">Sent By</span>
                        </div>
                        <div class="col-md-2">
                          <span class="th">Units</span>
                        </div>
                        <div class="col-md-2">
                          <span class="th">reports</span>
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
                    v-for="(reply, index) in searchSMS"
                    :key="index"
                  >
                    <!-- <div
                    class="row"
                    v-for="(reply, index) in replies"
                    :key="index"
                  > -->
                    <div class="col-md-12">
                      <div class="row">
                        <div class="col-md-1">
                          <input
                            type="checkbox"
                            name=""
                            id=""
                            @change="mark1InboxItem(reply)"
                            :checked="
                              markedInboxMssg.findIndex(
                                (i) => i.id === reply.id
                              ) >= 0
                            "
                          />
                        </div>
                        <div class="col-md-5 d-md-flex flex-column">
                          <span
                            class="d-flex justify-content-between msg-n-time"
                          >
                            <span class="font-weight-bold">
                              <router-link
                                class="text-decoration-none text-dark"
                                :to="{
                                  name: 'MessageDetails',
                                  params: { messageId: reply.id },
                                }"
                              >
                                {{ reply.subject }}
                              </router-link></span
                            >
                           <span class="timestamp" style="font-size:13px">{{ reply.dateSent}}</span>
                          </span>
                          <span class="brief-message small-text">
                            <router-link
                              class="text-decoration-none"
                              :to="{
                                name: 'MessageDetails',
                                params: { messageId: reply.id },
                              }"
                            >
                              {{
                                reply.message && reply.message.length > 25
                                  ? `${reply.message
                                      .split("")
                                      .slice(0, 25)
                                      .join("")}...`
                                  : reply.message
                              }}
                            </router-link>
                          </span>
                        </div>
                        <div
                          class="col-md-2 col-ms-12 d-flex justify-content-between"
                        >
                          <span class="hidden-header font-weight-bold"
                            >Sent By:
                          </span>
                          <span class="small-text">{{ reply.sentByUser }}</span>
                        </div>
                        <div
                          class="col-md-2 col-ms-12 d-flex justify-content-between"
                        >
                          <span class="hidden-header font-weight-bold"
                            >Units:
                          </span>
                          <span class="small-text">{{
                            reply.smsUnitsUsed
                          }}</span>
                        </div>
                        <div
                          class="col-md-2 my-2 col-ms-12 d-flex justify-content-between"
                        >
                          <span class="hidden-header font-weight-bold"
                            >Report:
                          </span>
                          <span class="c-pointer small-text primary-text"
                            >
                             <router-link
                            :to="{
                               name: 'MessageDetails',
                                params: { messageId: reply.id },
                            }" > View
                             </router-link>
                            </span
                            
                          >
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-md-12 px-0">
                          <hr class="hr" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="row">
                    <div class="col-md-12">
                      <div class="row" v-if="replies.length === 0 && !loading">
                        <div class="col-md-12 d-flex justify-content-center">
                          <span class="my-4 font-weight-bold small-text"
                            >No received messages</span
                          >
                        </div>
                      </div>

                      <div class="row" v-if="replies.length === 0 && loading">
                        <div
                          class="col-md-12 py-2 d-flex justify-content-center"
                        >
                          <i class="fas fa-circle-notch fa-spin"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                  <ConfirmDialog></ConfirmDialog>
                  <Toast />
                  <div class="conatiner">
                    <div class="row">
                      <div class="col-md-12 mb-3 pagination-container">
                        <PaginationButtons
                          @getcontent="getRepliesByPage"
                          :itemsCount="itemsCount"
                          :currentPage="currentPage"
                        />
                      </div>
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
import UnitsArea from "../../components/units/UnitsArea";
import communicationService from "../../services/communication/communicationservice";
import PaginationButtons from "../../components/pagination/PaginationButtons";
import { useStore } from "vuex";
import Tooltip from "primevue/tooltip";
import axios from "@/gateway/backendapi";
import { useConfirm } from "primevue/useconfirm";
import { useToast } from "primevue/usetoast";
import stopProgressBar from "../../services/progressbar/progress";

export default {
  components: { UnitsArea, PaginationButtons },
  directives: {
    tooltip: Tooltip,
  },
  setup() {
    const store = useStore();
    const replies = ref(store.getters["communication/smsReplies"]);
    const currentPage = ref(0);
    const loading = ref(false);
    const searchSms = ref("");

    const getSMSReplies = async () => {
      try {
        loading.value = true;
        const data = await communicationService.getSMSReplies(
          currentPage.value
        );
        loading.value = false;
        if (data) {
          replies.value = data;
          console.log(replies.value);
          store.dispatch("communication/getSMSReplies");
        }
      } catch (error) {
        console.log(error);
      }
    };

    if (!replies.value || replies.value.length === 0) getSMSReplies();

    const getRepliesByPage = async (page) => {
      try {
        const data = await communicationService.getSMSReplies(page);
        if (data && data.length > 0) {
          replies.value = data;
          currentPage.value = page;
        }
      } catch (error) {
        console.log(error);
      }
    };

    const itemsCount = computed(() => {
      if (!replies.value || replies.value.length === 0) return 0;
      return replies.value.length;
    });

    const searchSMS = computed(() => {
      if (searchSms.value === "" && replies.value.length > 0) {
        console.log(replies.value);
        return replies.value;
      }
      return replies.value.filter((i) =>
        i.message.toLowerCase().includes(searchSms.value.toLowerCase())
      );
    });



    const confirm = useConfirm();
    let toast = useToast();
    const showConfirmModal = () => {
      confirm.require({
        message: "Are you sure you want to proceed?",
        header: "Confirmation",
        icon: "pi pi-exclamation-triangle",
        acceptClass: "confirm-delete",
        rejectClass: "cancel-delete",
        accept: () => {
          deleteRepliesMsg();
        },
        reject: () => {
          //  toast.add({severity:'info', summary:'Rejected',
          //  detail:'You have rejected', life: 3000});
        },
      });
    };


// code to mark single item
    const markedInboxMssg = ref([]);
    const mark1InboxItem = (mssgInbox) => {
      const mssgIndex = markedInboxMssg.value.findIndex(
        (i) => i.id === mssgInbox.id);
      {
        if (mssgIndex < 0) {
          markedInboxMssg.value.push(mssgInbox);
        } else {
          markedInboxMssg.value.splice(mssgIndex, 1);
        }
        console.log(markedInboxMssg.value, "God is AWESOME");
      }
    };

  // code to mark multiple item item in replies
    const markAllInboxMssg = () => {
      if (markedInboxMssg.value.length < replies.value.length) {
        replies.value.forEach((i) => {
          const mssgInReplies = markedInboxMssg.value.findIndex(
            (t) => t.id === i.id
          );
          if (mssgInReplies < 0) {
            markedInboxMssg.value.push(i);
          }
        });
      } else {
        markedInboxMssg.value = [];
      }
      console.log(markedInboxMssg.value, "I am awesome");
    };

// Function to delete replies sms
    const retain = (m) => {
      console.log(m, "tosin");
      return m.map((i) => i.id).join(",");
    };
    const deleteRepliesMsg = () => {
      let repliesArr = retain(markedInboxMssg.value);
      console.log(repliesArr, "bunmi");
      axios
        .delete(`/api/messaging/deletesmsreplies?smsreplyidlist=${repliesArr}`)
        .then((res) => {
          console.log(res);
          replies.value = replies.value.filter((item) => {
            const z = markedInboxMssg.value.findIndex((i) => i.id === item.id);
            if (z >= 0) return false;
            return true;
          });

          toast.add({
            severity: "success",
            summary: "Confirmed",
            detail: "Replies Deleted",
            life: 3000,
          });
          markedInboxMssg.value.forEach((i) => {
            store.dispatch("communication/removeSentReplies", i.id);
          });
          markedInboxMssg.value = [];
        })
        .catch((err) => {
          stopProgressBar();
          toast.add({
            severity: "error",
            summary: "Delete Error",
            detail: "Deleting Replies failed",
            life: 3000,
          });
          console.log(err);
        });
    };


    return {
      replies,
      getRepliesByPage,
      itemsCount,
      currentPage,
      loading,
      searchSms,
      searchSMS,
      markedInboxMssg,
      mark1InboxItem,
      markAllInboxMssg,
      retain,
      deleteRepliesMsg,
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
  height: 32px;
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