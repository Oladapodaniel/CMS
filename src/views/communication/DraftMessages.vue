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
                    <span><i class="fa fa-search mr-1"></i></span>
                    <input type="text" placeholder="Search here..." />
                    <span class="mx-2"> | </span>
                    <span class="mx-2">Sort By</span>
                    <span class="font-weight-bold"> Newest</span>
                  </div>
                </div>
                <div class="col-sm-5 col-md-4 mt-sm-2 units-container">
                  <UnitsArea />
                </div>
              </div>

              <div class="row">
                <div class="col-md-12">
                  <div class="row header-row">
                    <div class="col-md-12">
                      <div class="row light-grey-bg py-2">
                        <div class="col-md-1">
                          <input type="checkbox" />
                        </div>
                        <div class="col-md-5">
                          <span class="th">Message</span>
                        </div>
                        <div class="col-md-2">
                          <span class="th">Sender</span>
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
                  <div class="row">
                    <div class="col-md-12">
                      <hr class="hr mt-0" />
                    </div>
                  </div>
                  <div class="row" v-for="(draft, index) in drafts" :key="index">
                    <div class="col-md-12 py-2">
                      <div class="row py-1">
                        <div class="col-md-1">
                          <input type="checkbox" />
                        </div>
                        <div
                          class="col-md-5 col-ms-12 d-flex justify-content-between"
                        >
                          <span class="hidden-header font-weight-bold"
                            >Message:
                          </span>
                          <span><router-link class="small-text text-decoration-none" :to="{ name: 'SendMessage', query: { draftId: draft.id } }">{{ draft.body }}</router-link></span>
                        </div>
                        <div class="col-md-2 d-md-flex justify-content-between">
                           <span class="hidden-header">Sender: </span>
                          <span><router-link class="small-text text-decoration-none" :to="{ name: 'SendMessage', query: { draftId: draft.id } }">{{ draft.sender }}</router-link></span>
                        </div>
                        <div
                          class="col-md-3 col-ms-12 d-flex justify-content-between"
                        >
                          <span class="hidden-header font-weight-bold"
                            >Date & Time
                          </span>
                          <span class="small-text">{{ new Date(draft.dateModified).toLocaleDateString()}}</span>
                        </div>
                        <div
                          class="col-md-1 col-ms-12 d-flex justify-content-between"
                        >
                          <span class="small-text"><i class="fa fa-trash delete-icon"></i></span>
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
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import router from "@/router/index";
import UnitsArea from "../../components/units/UnitsArea"
import communicationService from "../../services/communication/communicationservice"
import store from "../../store/store"

export default {
  components: { UnitsArea },

  data() {
    return {
      drafts: [ ],
    }
  },

  methods: {
    payWithPaystack() {
      router.push("/tenant/units")
    },

    async getDrafts() {
      try {
        const data = await communicationService.getDrafts();
        console.log(data, "Drafts");
        if (data) {
          this.drafts = data;
        }
      } catch (error) {
        console.log(error);
      }
    }
  },

  created() {
    this.drafts = store.getters["communication/smsDrafts"];
    if (!this.drafts || this.drafts === 0) this.getDrafts();
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

.center-flexed {
  display: flex;
  justify-content: center;
}

.table-box {
  border: 1px solid #4762F01F;
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