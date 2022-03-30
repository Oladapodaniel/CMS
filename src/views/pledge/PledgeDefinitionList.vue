<template>
    <div class="container-slim">
        <div class="container-fluid">
            <div class="row d-md-flex yu mt-5">
          <!-- <smsComponent :groupData ="groupListDetails"/> -->
          <div class="col-md-6 col-4">
            <div class="events">Pledge</div>
            <Toast />
            <ConfirmDialog />
            
          </div>
          <div class="col-md-6 col-8 d-flex justify-content-end mt-2 my-1 link" v-if="!groupLeader">
            <router-link
              to="/tenant/pledge/pledgedefinition"
              class="
                grey-border
                primary-btn
                default-btn
                primary-bg
                border-0
                small-screen
              "
              >Create Pledge</router-link
            >
          </div>
          <div class="col-md-12 px-0">
            <hr class="hr my-3" />
          </div>
        </div>
            <div class="row table">
          <div class="col-12 px-0" id="table">
            <div class="top-con" id="ignore2">
              <div class="table-top">
                <div class="col-4">
                  <p @click="toggleSearch" class="search-text w-100 mt-2 d-flex justify-content-center">
                    <i class="pi pi-search"></i>SEARCH
                  </p>
                </div>

                <div class="search d-flex ml-2 mr-3"
                >
                  <label
                    class="label-search d-flex"
                    :class="{
                      'show-search': searchIsVisible,
                      'hide-search': !searchIsVisible,
                    }"
                  >
                    <input
                      type="text"
                      placeholder="Search..."
                      v-model="searchText"
                    />
                    <span class="empty-btn"
                          @click="clearInput">
                          <i class="pi pi-times"></i
                  ></span>
                    <span class="search-btn"
                    @click="removeSearchText">
                      <i class="pi pi-search"></i>
                    </span>
                  </label>
                </div>
              </div>
            </div>
            <div>
              <div class="container-fluid d-none d-md-block">
                <div class="row t-header">
               
                  <div
                    class="small-text text-capitalize col-md-5 font-weight-bold"
                  >
                    Pledge Name
                  </div>
                  <!-- <div
                    class="small-text text-capitalize col-md-4 font-weight-bold"
                  >
                   Pledge Amount
                  </div> -->
                  <div
                    class="small-text text-capitalize col-md-6 font-weight-bold"
                  >
                   Target Amount
                  </div>
                 
                  <div
                    class="small-text text-capitalize col-md-1 font-weight-bold"
                  >
                    Action
                  </div>
                </div>
              </div>

              <div class="row" style="margin: 0">

                <div
                  class=" col-12 parent-desc pb-2 px-0">
                  <!-- <div class="row" v-if="!loading && groups.length === 0">
                    <div class="col-md-12">
                      <div class="row">
                        <div
                          class="
                            col-md-12
                            d-flex
                            align-items-center
                            justify-content-center
                          "
                        >
                          <p class="py-2">No groups yet</p>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-md-12 px-0">
                          <hr class="hr my-0" />
                        </div>
                      </div>
                    </div>
                  </div> -->
                  <div class="row" v-if="loading">
                    <div class="col-md-12">
                      <div class="row">
                        <div
                          class="
                            col-md-12
                            d-flex
                            align-items-center
                            justify-content-center
                          "
                        >
                          <i
                            class="pi pi-spin pi-spinner py-4"
                            v-if="loading"
                          ></i>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-md-12 px-0">
                          <hr class="hr my-0" />
                        </div>
                      </div>
                    </div>
                  </div>

              


                  <div class="row w-100 c-pointer text-dark border-top p-1 hover d-flex align-items-center" style="margin: 0" v-for="(pledgelist, index) in allPledgeList" :key="index">

                    <div class="col-md-5 desc" @click="pledgeClick(pledgelist.id)">
                      <p class="mb-0 d-flex justify-content-between text-primary">
                        <span
                          class=" text-dark font-weight-bold d-flex d-md-none fontIncrease"
                        style="font-size:15px">Pledge Name</span>
                          {{ pledgelist.name }}
                      </p>
                    </div>

                    <!-- <div class="col-md-4" @click="groupClick(group.id)">
                      <div class="d-flex small justify-content-between text-primary">
                        <span class="text-dark font-weight-bold d-flex d-md-none fontIncrease" style="font-size:15px">Pledge Amount</span>
                          <div class="small-text text-right text-md-center">
                            {{Math.abs(pledgelist.totalTargetAmount).toLocaleString()}}.00
                          </div>
                      </div>
                    </div> -->
                    <div class="col-md-6" @click="groupClick(group.id)">
                      <div class="d-flex small justify-content-between text-primary">
                        <span class="text-dark font-weight-bold d-flex d-md-none fontIncrease" style="font-size:15px">Target Amount</span>
                          <div class="small-text text-right text-md-center">
                            {{Math.abs(pledgelist.totalTargetAmount).toLocaleString()}}.00
                          </div>
                      </div>
                    </div>

                    <div class="col-md-1">
                      <div>
                        <div class="dropdown">
                          <span class="d-flex justify-content-between">
                            <span class="d-md-none d-sm-flex"></span>
                            <span class="d-sm-flex small">
                              <i
                                class="
                                  fas
                                  fa-ellipsis-v
                                  cursor-pointer
                                  ml-2
                                  fontIncrease
                                "
                                id="dropdownMenuButton"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                              ></i>

                              <div
                                class="dropdown-menu"
                                aria-labelledby="dropdownMenuButton"
                              >
                                <!-- <a class="dropdown-item">
                                  <a
                                    @click="sendGroupSms(group)"
                                    >Send SMS</a>
                                </a>
                                <a class="dropdown-item" @click="sendGroupEmail(group)">
                                    Send Email
                                </a> -->
                                <a
                                  class="dropdown-item"
                                  @click="showConfirmModal(pledgelist.id, index)"
                                  >Delete</a
                                >
                                <a
                                  class="dropdown-item"
                                  ><router-link
                                    :to="`/tenant/pledge/pledgedefinition?id=${pledgelist.id}`"
                                    class="text-color"
                                    >Edit</router-link
                                  ></a
                                >
                              </div>
                            </span>
                          </span>
                        </div>
                      </div>
                    </div>
                
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

import { ref } from 'vue'
import finish from '../../services/progressbar/progress';
import axios from "@/gateway/backendapi";
import { useToast } from "primevue/usetoast";
import { useConfirm } from "primevue/useconfirm";

export default {
    setup() {

        const toast = useToast()
        const allPledgeList = ref([]);
        // const singlePledge = ref([]);
        const confirm = useConfirm();

        const getAllPledgeDefinition = async () =>{
                try{
                    const res = await axios.get('/api/Pledge/GetAllPledgeDefinitions')
                    finish()
                    allPledgeList.value = res.data.returnObject
                    // isActive.value = res.data.returnObject.map( i => {
                    //     return {
                    //         isActive : i.isActive
                    //     }
                    // })
                    console.log(allPledgeList.value,'getPledgeList');
                }
                catch (error){
                    console.log(error)
                }
            }
            getAllPledgeDefinition()

            const showConfirmModal = (id, index) => {
                confirm.require({
                    message: "Are you sure you want to proceed?",
                    header: "Confirmation",
                    icon: "pi pi-exclamation-triangle",
                    acceptClass: "confirm-delete",
                    rejectClass: "cancel-delete",
                    accept: () => {
                    deletePledge(id, index);
                    // toast.add({severity:'info', summary:'Confirmed', detail:'Member Deleted', life: 3000});
                    },
                    reject: () => {
                    toast.add({
                        severity: "info",
                        summary: "Rejected",
                        detail: "You have rejected",
                        life: 3000,
                    });
                    },
                });
            };

            const deletePledge = (id) => {

            axios
                .delete(`/api/Pledge/DeletePledgeDefinition?ID=${id}`)
                .then((res) => {
                console.log(res);
                toast.add({
                    severity: "success",
                    summary: "Confirmed",
                    detail: "Pledge form deleted",
                    life: 3000,
                });

                })
                .catch((err) => {
                finish()
                if (err.response.status === 400) {
                    toast.add({
                    severity: "error",
                    summary: "Unable to delete",
                    detail: "Ensure this member is not in any group",
                    life: 3000,
                    });
                } else {
                    toast.add({
                    severity: "error",
                    summary: "Unable to delete",
                    detail: "An error occurred, please try again",
                    life: 3000,
                    });
                }
                });
            };


            return {
                allPledgeList,
                showConfirmModal,
                deletePledge,
                // singlePledge
            }
    },
}
</script>

<style scoped>
.events {
  font: normal normal 800 29px Nunito sans;
}
.dropdown-menu a {
  color: #02172e;
}
.link a {
  text-decoration: none;
}

.link a:hover {
  color: #fff;
}

.table {
  width: 100% !important;
  box-shadow: 0px 1px 4px #02172e45;
  border: 1px solid #dde2e6;
  border-radius: 30px;
  text-align: left;
  margin-bottom: auto !important;
}
.table-top {
  font-weight: 800;
  font-size: 12px;
  display: flex;
  justify-content: flex-end;
}
.table-top label:hover,
.table-top p:hover {
  cursor: pointer;
}

@media screen and (min-width: 500px) {
  .theader {
    width: 23%;
  }
  .table-body .check {
    width: 3%;
  }
  .action {
    width: 5%;
  }
}

@media screen and (max-width: 1024px) {
  .my-con {
    flex-direction: column;
  }
  .table {
    width: 98%;
    margin: 24px auto;
  }
  .summary {
    width: 98%;
    margin: auto;
  }
}

.table-footer {
  display: flex;
  justify-content: flex-end;
  background: #fff;
  padding: 10px 0;
  border-radius: 0px 0px 22px 22px;
}

.table-header {
  padding: 12px;
  color: black;
  box-shadow: none;
  font-size: 11px;
  font-weight: 700;
}
.table-body {
  padding: 12px;
  border-bottom: 1.5px solid #6d6d6d19;
}

.t-header {
  background: #dde2e6 0% 0% no-repeat padding-box;
  font-size: 16px;
  padding: 0.5rem 0;
}
.hover:hover {
  background: #eee;
}

.parent-desc.first {
  color: #8898aa;
  font-size: 14px;
  font-weight: 600;
  box-shadow: 0px 3px 6px #2c28281c;
  background: #dde2e6 0% 0% no-repeat padding-box;
}
.desc-head {
  font-weight: 700;
}
.desc {
  color: #9b9a9c;
}



/* .yu {
  margin-top: 5rem !important;
} */
</style>