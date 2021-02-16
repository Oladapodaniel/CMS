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
                  <div class="row" v-for="(draft, index) in drafts" :key="index">
                    <div class="col-md-12">
                      <div class="row py-1">
                        <div class="col-md-1">
                          <input type="checkbox" />
                        </div>
                        <div class="col-md-7 d-md-flex flex-column pl-0 small-text">
                          <router-link :to="{ name: 'ComposeEmail', query: { emaildraft: draft.id } }"  class="text-decoration-none text-dark font-weight-700">
                            <span
                            class="d-flex justify-content-between msg-n-time"
                          >
                            <span class="font-weight-600 small-text text-capitalize">{{ draft.subject.toLowerCase() }}</span>
                            <span class="timestamp">{{ new Date(draft.dateModified).toLocaleString()}}</span>
                          </span>
                          </router-link>
                          <span class="brief-message text-capitalize small-text"
                            ><router-link :to="{ name: 'ComposeEmail', query: { emaildraft: draft.id } }" class="text-decoration-none">
                                {{ draft.body && draft.body.length > 25 ? `${draft.body.toLowerCase().slice(0, 25)}...` : draft.sentBy }}
                              </router-link></span
                          >
                        </div>
                        <div
                          class="col-md-4 col-ms-12 d-flex justify-content-between"
                        >
                          <span class="hidden-header font-weight-bold"
                            >
                          </span>
                          <span></span>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-md-12">
                          <hr class="hr" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="row" v-if="drafts.length === 0 && !loading">
                    <div class="col-md-12 d-flex justify-content-center">
                      <span class="my-4 font-weight-bold">No sent mesages</span>
                    </div>
                  </div>

                  <div class="row" v-if="drafts.length === 0 && loading">
                    <div class="col-md-12 py-2 d-flex justify-content-center">
                      <i class="fas fa-circle-notch fa-spin"></i>
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
import { ref } from 'vue';
import communicationService from "../../services/communication/communicationservice";
import { useStore } from "vuex";

export default {
  setup() {
    const store = useStore();
    const drafts = ref(store.getters["communication/emailDrafts"]);
    const loading = ref(false);

    const getEmailDrafts = async () => {
      loading.value = true;
      const data = await communicationService.getEmailDrafts();
      loading.value = false;

      if (data) {
        drafts.value = data;
      }
    }

    if (!drafts.value || drafts.value === drafts.value.length === 0) getEmailDrafts();

    return {
      drafts,
      loading,
    }
  }
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