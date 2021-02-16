!<template>
  <div>
    <div class="container">
      <!-- Content Box -->
      <main id="main" class="mt-3">
        <div class="container-fluid px-0">
          <div class="row px-0">
            <div class="col-md-12 px-0">
              <div class="row d-md-flex align-items-center mt-2 mb-4">
                <div class="col-md-12">
                  <router-link
                    to="/tenant/sms/addgroup"
                    class="create-btn font-weigth-bold border-0"
                  >
                    <span class="mr-2 font-weight-700" style="font-size: 22px">+</span> Create
                    new group
                  </router-link>
                </div>
              </div>

              <div class="row">
                <div class="col-md-12">
                  <div class="row header-row">
                    <div class="col-md-12">
                      <div class="row light-grey-bg py-2 font-weight-600 small-text">
                        <div class="col-md-1">
                          <input type="checkbox" />
                        </div>
                        <div class="col-md-3">
                          <span class="th small-text">Name</span>
                        </div>
                        <div class="col-md-4">
                          <span class="th small-text">Total Numbers</span>
                        </div>
                        <div class="col-md-3">
                          <span class="th small-text">Date Created</span>
                        </div>
                        <div class="col-md-1">
                          <span class="th small-text"></span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-12 gName px-0">
                      <!-- <h3 class="ml-md-n3 mb-n2">Group Name</h3> -->
                      <hr class="hr">
                    </div>
                  </div>

                  <!-- <div
                    class="row"
                  >
                    <div class="col-md-12">
                      <div class="row">
                        <div class="col-md-1 py-2">
                          <input type="checkbox" />
                        </div>

                        <div class="col-md-3 d-flex justify-content-between align-items-center">
                          <span class="hidden-header font-weight-bold">NAME: </span>
                          <span>
                            <router-link
                              class="link"
                              to=""
                              >test</router-link
                            >
                          </span>
                        </div>

                        <div
                          class="col-md-4 col-ms-12 d-flex justify-content-between align-items-center"
                        >
                          <span class="hidden-header font-weight-bold"
                            >TOTAL PHONE NUMBER:
                          </span>
                          <span>09073576353</span>
                        </div>

                        <div
                          class="col-md-3 col-ms-12 d-flex justify-content-between align-items-center"
                        >
                          <span class="hidden-header font-weight-bold"
                            >DATE CREATED
                          </span>
                          <span>11/23/63563</span>
                        </div>

                        <div class="col-md-1 col-ms-12 d-flex justify-content-center align-items-center">
                          <span><i class="fa fa-trash delete-icon"></i></span>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-md-12 px-0">
                          <hr class="hr" />
                        </div>
                      </div>
                    </div>
                  </div> -->
                  <div
                    class="row"
                    v-for="(group, index) in groups"
                    :key="index"
                  >
                    <div class="col-md-12">
                      <div class="row">
                        <div class="col-md-1 py-2">
                          <input type="checkbox" />
                        </div>

                        <div class="col-md-3 d-flex justify-content-between align-items-center">
                          <span class="hidden-header">NAME: </span>
                          <span>
                            <router-link
                              class="link small-text"
                              :to="{
                                name: 'EditContactList',
                                params: { groupId: group.id },
                              }"
                              >{{ group.name }}</router-link
                            >
                          </span>
                        </div>

                        <div
                          class="col-md-4 col-ms-12 d-flex justify-content-between align-items-center"
                        >
                          <span class="hidden-header font-weight-bold"
                            >Total Numbers:
                          </span>
                          <span class="small-text">{{ group.numbers }}</span>
                        </div>

                        <div
                          class="col-md-3 col-ms-12 d-flex justify-content-between align-items-center"
                        >
                          <span class="hidden-header font-weight-bold"
                            >Date Created
                          </span>
                          <span class="small-text">{{
                            new Date(group.dateEntered).toLocaleDateString()
                          }}</span>
                        </div>

                        <div class="col-md-1 col-ms-12 d-flex justify-content-center align-items-center">
                          <span><i class="fa fa-trash delete-icon"></i></span>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-md-12">
                          <hr class="hr" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="row" v-if="groups.length === 0 && !loading">
                    <div class="col-md-12 d-flex justify-content-center align-items-center">
                      <span class="my-4 font-weight-bold">No groups</span>
                    </div>
                  </div>

                  <div class="row" v-if="groups.length === 0 && loading">
                    <div class="col-md-12 py-2 d-flex justify-content-center align-items-center">
                      <i class="fas fa-circle-notch fa-spin my-2"></i>
                    </div>
                  </div>

                  <!-- <div class="row">
                    <div class="col-md-12">
                      <div class="row">
                        <div class="col-md-1">
                          <input type="checkbox" />
                        </div>
                        <div class="col-md-2 d-md-flex justify-content-between">
                          <span class="hidden-header">SENDER: </span>
                          <span>message</span>
                        </div>
                        <div
                          class="col-md-5 col-ms-12 d-flex justify-content-between"
                        >
                          <span class="hidden-header">message: </span>
                          <span>message</span>
                        </div>
                        <div
                          class="col-md-3 col-ms-12 d-flex justify-content-between"
                        >
                          <span class="hidden-header">message: </span>
                          <span>message</span>
                        </div>
                        <div class="col-md-1 col-ms-12">
                          <span><i class="fa fa-trash delete-icon"></i></span>
                        </div>
                        <div class="col-md-6 basebtns">
                          <button
                            v-on:click="saveDetails"
                            class="btn btnBase btn-primary"
                          >
                            save
                          </button>
                        </div>
                      </div>
                    </div>
                  </div> -->
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
import { onMounted, ref } from "vue";
import axios from "@/gateway/backendapi";

export default {
  setup() {
    const groups = ref([]);
    const loading = ref(false);

    const getGroups = async () => {
      try {
        loading.value = true;
        const res = await axios.get("/api/Messaging/getPhoneGroups");
        loading.value = false;
        console.log(res, "groups");
        groups.value = res.data;
      } catch (error) {
        console.log(error);
      }
    };

    onMounted(() => {
      getGroups();
    });

    return {
      groups,
      loading,
    };
  },
};
</script>

<style scoped>
* {
  color: #02172e;
}

.search-div {
  width: fit-content;
  padding: 10px;
  background: #f5f8f9;
  border-radius: 200px;
}

#groupName:focus {
  border: none;
}

.inputWithDisable {
  /* background-color: rgba(252, 252, 252, 0.932); */
  border: none;
  outline: transparent;
}

.inputWithDisable:disabled {
  background: transparent;
}

h1,
h3,
h4 {
  font-family: "Nunito Sans";
  color: var(--font-color);
}

h1 {
  font-size: 24px;
  font-weight: bold;
}

h3 {
  font-size: 16px;
  font-weight: bold;
}

h4 {
  font-size: 16px;
}

.hr {
  color: #708eb15c;
}

.addContent {
  border: 1px solid #02172e30;
  border-radius: 5px;
  height: 40px;
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

.create-btn {
  background: #ebeff4;
  border-radius: 21px;
  padding: 4px 18px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: fit-content;
  text-decoration: none;
}

.link {
  text-decoration: none;
  color: #136acd !important;
}

.amazingG {
  width: 50%;
  margin-top: 0.5rem;
}

.amazingE {
  padding: 0;
  width: 50%;
  margin-left: 1rem;
  /* display: flex; */
  justify-content: flex-end;
}

.spanArea1 {
  position: relative;
  margin-top: 1rem;
  display: flex;
}

.spanArea2 {
  position: absolute;
  top: 0;
  right: -13.5rem;
}

.spanArea {
  width: 40%;
  position: absolute;
}

.addIconarea {
  padding: 0;
}

.basebtns {
  margin: 2.5rem auto;
  width: 40%;
}

#groupName {
  margin-left: 1rem;
}

.hidden-header {
    display: none;
  }

@media screen and (max-width: 767px) {
  .hidden-header {
    display: inline-block;
    font-size: 12px;
  }

  .header-row {
    display: none;
  }

  /* #menu-items {
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
  } */
}
/* } */
</style>