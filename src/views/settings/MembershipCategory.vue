<template>
  <div>
    <div class="container">
      <div class="row d-md-flex justify-content-between mt-3 mb-4">
        <div class="col-md-12">
          <h2>Membership Category</h2>
        </div>
      </div>

      <div class="row grey-rounded-border pt-1 pb-5">
        <div class="col-md-12">
          <div class="row">
            <div class="col-md-12">
              <div class="row">
                <div class="col-md-12">
                  <h4>Membership Categories</h4>
                </div>
              </div>

              <div class="row">
                <div class="col-md-12 py-5 grey-background">
                  <div class="row d-md-flex justify-content-around">
                    <div class="col-md-7">
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Membership categorry name"
                      />
                    </div>
                    <div class="col-md-3">
                      <button class="btn primary-btn px-5">Save</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="row table-header-row py-2 mt-5">
            <div class="col-md-7">
              <span class="py-2 font-weight-bold">NAME</span>
            </div>
            <div class="col-md-5">
              <span class="py-2 font-weight-bold">ACTION</span>
            </div>
          </div>

          <div class="row py-2" v-for="(classification, index) in classifications" :key="index">
            <div class="col-md-12">
              <div class="row">
                <div
                  class="col-md-7 d-flex justify-content-between align-items-center"
                >
                  <span class="py-2 hidden-header">NAME</span>
                  <span class="py-2 text-xs-left">{{ classification.name }}</span>
                </div>
                <div
                  class="col-md-5 d-flex justify-content-between align-items-center"
                >
                  <span class="py-4 hidden-header">ACTION</span>
                  <div class="row">
                    <div class="col-md-6">
                      <button class="btn secondary-btn py-1 px-4" @click="openClassification(index)">View</button>
                    </div>
                    <div class="col-md-6">
                      <button class="btn btn-danger py-1 primary-btn">Delete</button>
                    </div>
                  </div>
                </div>
              </div>

              <div class="row grey-background py-2" v-if="vissibleTab === `tab_${index}`">
                <div
                  class="col-md-7 d-flex justify-content-between align-items-center"
                >
                  <label for="" class="d-flex">
                    <span class="mr-2">Name</span>
                    <input type="text" class="form-control" v-model="classificationName">
                  </label>
                </div>
                <div
                  class="col-md-5 d-flex justify-content-between align-items-center"
                >
                  <div class="row">
                    <div class="col-md-6">
                      <button class="btn primary-btn save-btn py-1 px-4">Save</button>
                    </div>
                    <div class="col-md-6">
                      <button class="btn secondary-btn py-1 px-4" @click="discard">Discard</button>
                    </div>
                  </div>
                </div>
              </div>

              <div class="row">
                <div class="col-md-12 px-0">
                  <hr class="hr my-0" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "@/gateway/backendapi";

export default {
  data() {
    return {
      classifications: [ ],
      vissibleTab: "",
      classificationName: "",
    }
  },

  methods: {
    async getClassifications() {
      try {
        const { data } = await axios.get("/api/Settings/GetTenantPeopleClassification");
        this.classifications = data;
      } catch (error) {
        console.log(error);
      }
    },

    openClassification(index) {
      this.vissibleTab = `tab_${index}`;
      this.classificationName = this.classifications[index].name;
    },

    discard() {
      this.vissibleTab = "";
    }
  },

  created() {
    this.getClassifications();
  }
};
</script>

<style scoped>
input::placeholder {
  text-align: center;
}

.table-header-row {
  background: #ebeff4;
  border-top: 1px solid #dde2e6;
  border-radius: 8px 8px 0 0;
}

.hidden-header {
  display: none;
}

.grey-background {
    background: #DDE2E6;
}

.save-btn {
  background: #50AB00;
}

@media screen and (max-width: 767px) {
  .hidden-header {
    display: inline-block;
    font-weight: bold;
  }

  .table-header-row {
    display: none;
  }
}
</style>