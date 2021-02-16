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
                    <span><i class="fa fa-search mr-1"></i></span>
                    <input type="text" placeholder="Search here..." />
                    <span class="mx-2"> | </span>
                    <span class="mx-2">Sort By</span>
                    <span class="font-weight-bold"> Newest</span>
                  </div>
                </div>
              </div>

              <div class="row">
                <div class="col-md-12">
                  <div class="row header-row light-grey-bg py-2">
                    <div class="col-md-12 px-0">
                      <div class="row">
                        <div class="col-md-1 text-md-right text-lg-center px-0">
                          <input type="checkbox" />
                        </div>
                        <div class="col-md-7">
                          <span class="th">Message</span>
                        </div>
                        <div class="col-md-4">
                          <span class="th">Sent By</span>
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
                      <div class="row" v-for="(email, index) in emails" :key="index">
                    <div class="col-md-12">
                      <div class="row">
                        <div class="col-md-1">
                          <input type="checkbox" />
                        </div>
                        <div class="col-md-7 d-md-flex flex-column">
                          <span
                            class="msg-n-time"
                          >
                            <router-link :to="{ name: 'EmailDetails', params: { messageId: email.id } }" class="text-decoration-none d-flex justify-content-between small-text">
                              <span class="font-weight-bold text-dark text-capitalize">{{ email.subject ? email.subject.toLowerCase() :  ''}}</span>
                              <span class="timestamp small-text">{{ email.dateSent }}</span>
                            </router-link>
                          </span>
                          <span class="brief-message"
                            >
                              <router-link :to="{ name: 'EmailDetails', params: { messageId: email.id } }" class="text-decoration-none small-text"><article>
                                {{
                                  formatMessage(email.message)
                                }}
                              </article></router-link>
                            </span
                          >
                        </div>
                        <div
                          class="col-md-4 col-ms-12 d-flex justify-content-between"
                        >
                          <span class="hidden-header font-weight-bold"
                            >Sent By:
                          </span>
                          <span class="small-text">{{ email.sentByUser }}</span>
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
                      <i class="fas fa-circle-notch fa-spin"></i>
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
import { computed, ref } from 'vue';
import communicationService from "../../services/communication/communicationservice"
import PaginationButtons from "../../components/pagination/PaginationButtons";
import { useStore } from "vuex";


export default {
  components: { PaginationButtons },
  setup() {
    const store = useStore();
    const emails = ref([]);
    const emailsInStore = ref(store.getters["communication/sentEmails"]);
    emails.value = emailsInStore.value && emailsInStore.value.length > 0 ? emailsInStore.value[0] : [ ];
    // console.log(emails.value[0], "from store");
    const currentPage = ref(0);
    const loading = ref(false)

    const getSentEmails = async () => {
      loading.value = true;
      const data = await communicationService.getSentEmails(0);
      loading.value = false;
      if (data && data.length > 0) {
        console.log(data, "compo");
        emails.value = data;
      }
    }

    if (!emails.value || emails.value.length === 0) getSentEmails();

    const formatMessage = (message) => {
      const formatted = message && message.length > 25 ? `${message.split("").slice(0, 25).join("")}...` : message;

      return `${formatted}`;
    }

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

    return {
      emails,
      formatMessage,
      getEmailsByPage,
      itemsCount,
      currentPage,
      loading,
    }
  }
};
</script>

<style scoped>
* {
  box-sizing: border-box;
  /* color: #02172e; */
}

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
    border-left: 2px solid #136ACD;
    opacity: 1;
}

.buy-btn {
    background: rgb(112, 142, 177, .33);
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
    background: #EBEFF4;
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