!<template>
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
                    <span><el-icon><Search /></el-icon></span>
                    <input
                      type="text"
                      placeholder="Search here..."
                      v-model="searchMail"
                    />
                    <span class="mx-2"> | </span>
                    <span class="mx-2">Sort By</span>
                    <span class="font-weight-bold"> Newest</span>
                  </div>
                </div>
              </div>

              <div class="row table-box">
                <div class="col-md-12">
                  <el-tooltip class="box-item" effect="dark" v-if="markedMail.length > 0" content="delete marked"
                  placement="top-start">
                  <el-icon :size="20" class="ml-2 color-deleteicon text-danger c-pointer" style="font-size: 15px" v-if="markedMail.length > 0" @click="showConfirmModal(false)">
                    <Delete />
                  </el-icon>
                  </el-tooltip>
                </div>
              </div>
              <div class="row">
                <div class="col-md-12">
                  <div class="row header-row light-grey-bg py-2">
                    <div class="col-md-12">
                      <div class="row">
                        <div
                          class="col-md-1 text-md-right text-lg-center px-0"
                          v-if="emails.length > 0"
                        >
                          <el-checkbox
                            name="all"
                            id="all"
                            @change="markAllMails"
                            :checked="
                              markedMail.length > 0 &&
                              markedMail.length === emails.length
                            "
                          />
                        </div>
                          <div class="col-md-6">
                            <span class="th">Message</span>
                          </div>
                        <div class="col-md-4">
                          <span class="th">Sent By</span>
                        </div>
                        <div class="col-md-1">
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-12">
                      <hr class="hr mt-0" />
                    </div>
                  </div>

                  <div class="row" v-if="emails.length > 0">
                    <div class="col-md-12">
                      <div
                        class="row"
                        v-for="(email, index) in searchEmails"
                        :key="index"
                      >
                        <div class="col-md-12">
                          <div class="row pt-2 pb-1">
                            <div class="col-md-1 mt-2">
                              <el-checkbox
                                name=""
                                id=""
                                @change="mark1Email(email)"
                                :checked="
                                  markedMail.findIndex(
                                    (i) => i.id === email.id
                                  ) >= 0
                                "
                              />
                            </div>
                            <div class="col-md-6 d-md-flex flex-column">
                              <span class="msg-n-time">
                                <router-link
                                  :to="{
                                    name: 'ComposeEmail',
                                    query: { messageId: email.id },
                                  }"
                                  class="text-decoration-none d-flex justify-content-between small-text"
                                >
                                  <span
                                    class="font-weight-bold text-dark text-capitalize"
                                    >{{
                                      email.subject
                                        ? email.subject.toLowerCase()
                                        : ""
                                    }}</span
                                  >
                                  <span class="timestamp small-text">{{
                                    email.dateSent
                                  }}</span>
                                </router-link>
                              </span>
                              <span class="brief-message">
                                <router-link
                                  :to="{
                                    name: 'ComposeEmail',
                                    query: { messageId: email.id },
                                  }"
                                  class="text-decoration-none small-text"
                                  ><article>
                                    {{ formatMessage(email.message) }}
                                  </article></router-link
                                >
                              </span>
                            </div>
                            <div
                              class="col-md-4 col-ms-12 d-flex justify-content-between"
                            >
                              <span class="hidden-header font-weight-bold"
                                >Sent By:
                              </span>
                              <span class="small-text">{{
                                email.sentByUser
                              }}</span>
                            </div>
                            <div
                              class="col-md-1 col-ms-12 d-flex justify-content-between"
                            >
                              <span class="hidden-header font-weight-bold"
                                >
                              </span>
                              <span class="small-text">
                                <el-icon :size="20" class="ml-2 color-deleteicon  pt-2  c-pointer" style="font-size:20px" 
                                     @click="showConfirmModal(email.id)">
                                  <Delete />
                                </el-icon>
                              </span>
                            </div>
                          </div>
                          <div class="row">
                            <div class="col-md-12">
                              <hr class="hr" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="row" v-if="emails.length === 0 && !loading">
                    <div class="col-md-12 d-flex justify-content-center">
                      <span class="my-4 font-weight-bold">No sent mesages</span>
                    </div>
                  </div>

                  <div class="row" v-if="emails.length === 0 && loading">
                    <div class="col-md-12 py-2 d-flex justify-content-center">
                      <Loading :loading="loading" />
                    </div>
                  </div>

                  <div class="conatiner">
                    <div class="row">
                      <div class="col-md-12 mb-3 pagination-container">
                        <PaginationButtons
                          @getcontent="getEmailsByPage"
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
import communicationService from "../../services/communication/communicationservice";
import PaginationButtons from "../../components/pagination/PaginationButtons";
import axios from "@/gateway/backendapi";
import Loading from "../../components/loading/LoadingComponent";
import stopProgressBar from "../../services/progressbar/progress";
import store from '../../store/store';
import { Search } from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus'

export default {
  components: { PaginationButtons, Loading },
  directives: {},
  setup() {
    const emails = ref([]);
    const emailsInStore = ref(store.getters["communication/sentEmails"]);
    emails.value =
      emailsInStore.value && emailsInStore.value.length > 0
        ? emailsInStore.value
        : [];
    const currentPage = ref(0);
    const loading = ref(true);
    const searchMail = ref("");

    const getSentEmails = async () => {
      
      try{
        loading.value = true;
         /*eslint no-undef: "warn"*/
        NProgress.start();
          const data = await communicationService.getSentEmails(0);
          loading.value = false;
        if (data && data.length > 0) {
          emails.value = data;
          console.log(emails.value, "emails.value✔");
        }
      }
      catch(error){
         loading.value = false;
        NProgress.done();
        console.log(error);
      }
    };
    getSentEmails();

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

    const getEmailsByPage = async (page) => {
      try {
        const data = await communicationService.getSentEmails(page);
        if (data) {
          emails.value = data;
          currentPage.value = page;
        }
      } catch (error) {
        console.log(error);
      }
    };

    const itemsCount = computed(() => {
      const allEmails = emails.value;
      if (!allEmails.value || allEmails.value.length === 0) return 0;
      return allEmails.value.length;
    });

    const createElementFromHTML = (htmlString) => {
      var div = document.createElement("div");
      div.innerHTML = htmlString;
      return div.textContent;
    };

    const searchEmails = computed(() => {
      if (searchMail.value === "" && emails.value.length > 0) {
        return emails.value;
      }
      return emails.value.filter((i) =>
        i.subject.toLowerCase().includes(searchMail.value.toLowerCase())
      );
    });

    // Function to check a single item
    const markedMail = ref([]);
    const mark1Email = (mailId) => {
      const mailIdx = markedMail.value.findIndex((i) => i.id === mailId.id);
      if (mailIdx < 0) {
        markedMail.value.push(mailId);
      } else {
        markedMail.value.splice(mailIdx, 1);
      }
    };

    // Function to check a multiple item
    const markAllMails = () => {
      if (markedMail.value.length < emails.value.length) {
        emails.value.forEach((i) => {
          const emailsInMarked = markedMail.value.findIndex(
            (e) => e.id === i.id
          );
          if (emailsInMarked < 0) {
            markedMail.value.push(i);
          }
        });
      } else {
        markedMail.value = [];
      }
    };

    // Function to delete emails
    const getIdsOfEmailsToDelete = (markedEmails) => {
      return markedEmails.map((i) => i.id).join(",");
    };

    const deleteEmails = async (id) => {
      try {
        let stringOfEmailIds = id ? id : getIdsOfEmailsToDelete(markedMail.value);

        const { data } = await axios.delete(
          `/api/Messaging/DeleteSentEmails?SentEmailIdList=${stringOfEmailIds}`
        );
        if (data.deleted) {
          ElMessage({
              type: 'success',
              message: markedMail.value.length > 1 ? 'Selected Emails have been deleted successfully ' : ' Email has been deleted successfully  ',
            })
          // toast.add({
          //   severity: "success",
          //   summary: "Delete successfull",
          //   detail: `${markedMail.value.length > 1 ? '' : 'Email has' } been deleted successfully`,
          //   life: 3000,
          // });
          emails.value = !id ? removeDeletedEmailsFromEmailList(markedMail.value) : emails.value.filter(i => i.id !== id);
          if (id) {
          store.dispatch('communication/removeSentEmails', id)
          } else {
            removeDeletedEmailsFromStore(markedMail.value);
          }
          markedMail.value = [ ];
        } else {
          ElMessage({
              type: 'error',
              message: data.message,
            })
          // toast.add({
          //   severity: "error",
          //   summary: "Delete Failed",
          //   detail: `${data.message}`,
          //   life: 3000,
          // });
        }
      } catch (error) {
        console.log(error);
        ElMessage({
              type: 'error',
              message: markedMail.value.length > 1 ? 'Selected Emails could not be deleted, Please try reloading' : 'Email could not be deleted, Please try reloading'  ,
            })
        // toast.add({
        //   severity: "error",
        //   summary: "Delete Failed",
        //   detail: `${markedMail.value.length > 1 ? 'Selected Emails' : 'Email'} could not be deleted, Please try reloading`,
        //   life: 3000,
        // });
        stopProgressBar();
      }
    };


    const removeDeletedEmailsFromEmailList = deletedEmailsArr => {
      return emails.value.filter(i => {
        const emailIndexInMarked = deletedEmailsArr.findIndex(j => j.id === i.id);
        if (emailIndexInMarked < 0) return true;
        return false;
      })
    }

    const removeDeletedEmailsFromStore = deletedEmails => {
      for (let email of deletedEmails) {
        store.dispatch('communication/removeSentEmails', email.id)
      }
    }

    const showConfirmModal = (id) => {
      ElMessageBox.confirm(
        "Are you sure you want to proceed? This operation can't be reversed " ,
        'Confirm delete',
        {
          confirmButtonText: 'OK',
          cancelButtonText: 'Cancel',
          type: 'error',
        }
      )
        .then(() => {
           deleteEmails(id);
        })
        .catch(() => {
          ElMessage({
            type: 'info',
            message: 'Delete discarded',
          })
        })
    };

    return {
      emails,
      Search,
      formatMessage,
      getEmailsByPage,
      itemsCount,
      currentPage,
      loading,
      createElementFromHTML,
      searchMail,
      searchEmails,
      markedMail,
      mark1Email,
      markAllMails,
      deleteEmails,
      showConfirmModal,
    };
  },
};
</script>

<style scoped>
* {
  box-sizing: border-box;
  /* color: #02172e; */
}
/* .table-box {
  border: 1px solid #4762f01f;
} */
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
.table-top {
  font-weight: 800;
  font-size: 12px;
  background: #fff;
  border: 1px solid #E0E0E0;
  border-bottom: none;
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