<template>
  <div>
    <!-- <Treee :items="groups"/> -->
    <div class="container-slim">
      <div class="container-fluid">
        <div class="row d-md-flex yu mt-5">
          <!-- <smsComponent :groupData ="groupListDetails"/> -->
          <div class="col-md-6 col-4">
            <div class="events">Groups</div>
            <Toast />
            <ConfirmDialog />
            
          </div>
          <div class="col-md-6 col-8 d-flex justify-content-end mt-2 my-1 link" v-if="!groupLeader">
            <router-link
              to="/tenant/createpeoplegroup"
              class="
                grey-border
                primary-btn
                default-btn
                primary-bg
                border-0
                small-screen
              "
              >Add New Group</router-link
            >
          </div>
          <div class="col-md-12 px-0">
            <hr class="hr my-3" />
          </div>
        </div>

        <div class="font-weight-700" v-if="route.query.actionType == 'attendance'">Choose the group you want to the mark attendance of your members.</div>
        <div class="font-weight-700" v-if="route.query.actionType == 'sendsms'">Choose the group you want to send SMS to.</div>
        <div class="font-weight-700" v-if="route.query.actionType == 'sendemail'">Choose the group you want to send email to.</div>

        <!-- tosin working on tables -->
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

            <!-- search groups -->
            <div>
              <div class="container-fluid d-none d-md-block">
                <div class="row t-header">
                  <!-- <div class="col-md-1"></div>
                  <div
                    class="small-text text-capitalize col-md-2 font-weight-bold"
                  >
                    <input class="my-2" type="checkbox" />
                  </div> -->
                  <div
                    class="small-text text-capitalize col-md-6 font-weight-bold"
                  >
                    Group Name
                  </div>
                  <div
                    class="small-text text-capitalize col-md-5 font-weight-bold"
                  >
                    Membership Size
                  </div>
                  <!-- <div
                    class="small-text text-capitalize col-md-2 font-weight-bold"
                  >
                    <span></span>
                  </div> -->
                  <div
                    class="small-text text-capitalize col-md-1 font-weight-bold"
                  >
                    Action
                  </div>
                  <!-- </div> -->
                </div>
              </div>

              <div class="row" style="margin: 0">

                <div
                  class=" col-12 parent-desc pb-2 px-0">
                  <!-- removed v-for above -->     <!-- loading group -->
                  <div class="row" v-if="!loading && groups.length === 0">
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
                  </div>
                  <!-- loading group -->

                  <!-- loadding -->
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
                  <!-- loadding -->

              
                <div
    class=" row w-100  text-dark "
    style="margin: 0"
    
  >
    <!-- class="d-block -->

    <div class="col-md-12 desc">
      <p class="">
        <span
          class="text-dark font-weight-bold d-flex d-md-none fontIncrease"
          style="font-size: 15px"
          >Group Name</span
          
        >
        <ul class="w-100">
        <!-- :class="{ 'd-block' : itemDisplay, 'd-none' : !itemDisplay }"  -->
         <!-- @click="toggleItems(i, $event)" -->
        <li v-for="(group, index) in searchGroup" :key="index" class="pt-2  c-pointer parent-li border-top">
          <div class="row">
    
            <div class="col-6 text-primary" >
              <span><i class="pi pi-chevron-down roll-icon" v-if="group.children"  @click="toggleItems(group, $event)"></i></span>
              <span class="p-3" @click="groupClick(group.id)">{{ group.name }}</span>
            </div>
            <div class="col-4 text-primary" @click="groupClick(group.id)">
              <div @click="groupClick(group.id)">
                <div class="d-flex small justify-content-between text-primary">
                  <span class="text-dark font-weight-bold d-flex d-md-none fontIncrease" style="font-size:15px">Membership Size</span>
                    <div class="small-text text-right text-md-center">
                      {{ group.peopleInGroupsCount }}
                    </div>
                </div>
              </div>
            </div>
            <div class="col-2">
              <!-- <div class="col-md-1"> -->
                      <div>
                        <div class="dropdown">
                          <span class="d-flex justify-content-between">
                            <span class="d-md-none d-sm-flex"></span>
                            <span class="d-sm-flex small">
                              <i class=" fas fa-ellipsis-v cursor-pointer ml-2 fontIncrease"
                                id="dropdownMenuButton"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                              ></i>

                              <div
                                class="dropdown-menu"
                                aria-labelledby="dropdownMenuButton"
                              >
                                <a class="dropdown-item">
                                  <a
                                    @click="sendGroupSms(group)"
                                    >Send SMS</a>
                                </a>
                                <a class="dropdown-item" @click="sendGroupEmail(group)">
                                    Send Email
                                </a>
                                <a
                                  class="dropdown-item"
                                  @click="confirmDelete(group.id, index)"
                                  >Delete</a
                                >
                              </div>
                            </span>
                          </span>
                        </div>
                      </div>
                    <!-- </div> -->
            </div>
          </div>
            
            
            <GroupTree
                :items="group.children"
                v-if="group.children"
               class="node-height"
               @click="groupClickk(group, $event)"
                />         
        </li>
        </ul>
        <!-- <i class="pi pi-chevron-down"></i>{{ group.name }} -->
        
      </p>
    </div>

    
  </div>

                 <!-- <GroupTree :items="searchGroup" /> -->
                </div>
                
              </div>
            </div>
            <!-- <div class="text-danger" v-else>No records found</div> -->
          </div>
        </div>
        <!-- tosin working on tables -->
      </div>
        <SideBar :show="showSMS" :title="'Compose SMS'" @closesidemodal="() => showSMS = false">
        <div class="m-wrapper" :class="{ 'm-wrapper': showSMS, 'no-show': !showSMS }">
          <smsComponent :groupData ="groupListDetails" @closesidemodal="() => showSMS = false" />
        </div>
      </SideBar>
      <SideBar :show="showEmail" :title="'Compose Email'" @closesidemodal="() => showEmail = false">
        <div class="m-wrapper2">
          <emailComponent :groupData ="groupListDetails"  @closesidemodal="() => showEmail = false" />
        </div>
      </SideBar>
      
      
      
    </div>
  </div>
</template>

<script>
import { ref, computed } from "vue";
import { useRoute, useRouter } from 'vue-router';
import groupsService from "../../services/groups/groupsservice";
import { useStore } from "vuex";
import { useConfirm } from "primevue/useconfirm";
import { useToast } from "primevue/usetoast";
import smsComponent from "./component/smsComponent.vue";
import emailComponent from "./component/emailComponent.vue";
import SideBar from "./sidemodal/SideModal.vue";
import GroupTree from "./component/GroupTree.vue"
// import Treee from "../../components/whatsapp/Treee.vue"

export default {
  // name: 'Tree',
  components : {
    SideBar,
    smsComponent,
    emailComponent,
    GroupTree
    // Treee
  },

  setup() {
    //   const $confirm = getCurrentInstance().ctx.$confirm;
    const loading = ref(false);
    const displayConfirmModal = ref(false);
    const store = useStore();
    const groups = ref(store.getters["groups/groups"]);
    const groupListDetails = ref([]);
    const toast = useToast();
    const confirm = useConfirm();
    const showSMS = ref(false)
    const showEmail = ref(false)
    const router = useRouter()
    const route = useRoute();

    // const showSide = ref(false);

    // const sendSms = () =>{
    //   showSide.value = !showSide.value
    // }
    const confirmDelete = (id, index) => {
      confirm.require({
        message: "Do you want to delete this group?",
        header: "Delete Confirmation",
        icon: "pi pi-info-circle",
        acceptClass: "confirm-delete",
        rejectClass: "cancel-delete",
        accept: () => {
          try {
            groupsService.deleteGroup(id).then((res) => {
              console.log(res, "Delete Response");
              if (res !== false) {
                groups.value.splice(index, 1);
                store.dispatch("groups/getGroups");
                toast.add({
                  severity: "success",
                  summary: "Deleted",
                  detail: "Group was deleted",
                  life: 3000,
                });
                groupsService.removeGroupFromStore(id);
              }
            });
          } catch (error) {
            console.log(error);
          }
        },
        reject: () => {
          // toast.add({severity:'info', summary:'Rejected', detail:'You have rejected', life: 3000});
        },
      });
    };
    const getgroups = async () => {
      try {
        console.log("calling");
        loading.value = true;
        const data = await groupsService.getGroups();
        (loading.value = false),
          (groups.value = data.map((i) => {
            return {
              dateCreated: i.dateCreated,
              description: i.description,
              name: i.name,
              id: i.id,
              tenantID: i.tenantID,
              peopleInGroupsCount: i.peopleInGroupsCount,
              children: i.children
            };
          }));
        console.log(groups.value);
      } catch (error) {
        (loading.value = false), console.log(error.response);
      }
    };
    if (!groups.value || groups.value.length === 0) getgroups();

    const searchIsVisible = ref(false);
      const toggleSearch = () => {
      searchIsVisible.value = !searchIsVisible.value;
    };

    let searchText = ref("");
    const searchGroup = computed(() => {
     if (searchText.value !== "" && groups.value.length > 0)  {
       return groups.value.filter((i) => {
            return i.name.toLowerCase().includes(searchText.value.toLowerCase())
      })
     }  else {
       return groups.value;
     }

    });
    const removeSearchText = () => {
        searchText = "";
    }
    const sendGroupSms = (group) => {
      showSMS.value = true
      if (group.id) {
        groupListDetails.value = [{data:`group_${group.id}`}]
      }
    }
    const sendGroupEmail = (group) => {
      showEmail.value = true
      if (group.id) {
        groupListDetails.value = [{data:`group_${group.id}`}]
      }
    }
    const groupClick = (id) => {
        if (route && route.query && route.query.actionType == "sendsms") {
          let group = {
            id: id
          }
          sendGroupSms(group)
        } else if (route && route.query && route.query.actionType == "sendemail") {
          let group = {
            id: id
          }
          sendGroupEmail(group)
        } else {
                router.push(`/tenant/createpeoplegroup/${id}`)
          } 
    }

    const groupLeader = computed(() => {
      return JSON.parse(localStorage.getItem('roles')).every(i => i.toLowerCase() == 'groupleader')
    })

    const toggleItems = (i, e) => {
       console.log(i)
      //  if (e.target.parentElement.parentElement.parentElement.nextElementSibling.classList.contains('node-height')) {
         e.target.parentElement.parentElement.parentElement.nextElementSibling.classList.toggle('node-height-open')
         e.target.classList.toggle('roll-icon')
      //  }  else {
      //    e.target.parentElement.parentElement.parentElement.nextElementSibling.classList.replace("node-height-open", "node-height")
      //  }
     }

     const groupClickk = (i, e) => {
      //  console.log(i)
      console.log()
      router.push(`/tenant/createpeoplegroup/${i.children.find(i => i.name == e.target.textContent).id}`)
     }

    return {
      // showSide,
      // sendSms,
      groupClick,
      showSMS,
      showEmail,
      groups,
      sendGroupSms,
      sendGroupEmail,
      groupListDetails,
      loading,
      displayConfirmModal,
      confirmDelete,
      searchIsVisible,
      searchText,
      toggleSearch,
      searchGroup,
      removeSearchText,
      groupLeader,
      route,
      toggleItems,
      groupClickk
    };
  },
};
</script>

<style scoped>
* {
  box-sizing: border-box;
}

.row-bg-color {
  background-color: #f1f3f9;
  border-radius: 30px 30px 0 0;
}
.grey-rounded-border2 {
  border: 1px solid #dde2e6 !important;
  box-shadow: 0 3px 6px rgba(44, 40, 40, 0.10980392156862745);
  border-radius: 30px;
  text-align: center;
  width: 100%;
}
.events {
  font: normal normal 800 29px Nunito sans;
}
.yu {
  margin-top: 5rem !important;
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
@media screen and (min-width: 580px) {
  .hidden-header {
    display: none;
  }
}
@media screen and (max-width: 581px) {
  .main-header {
    display: none;
  }
  .yu {
     margin-top: 3rem !important;
  }
  .f-right {
    float: right;
  }
}

/* tosin working */
.myselectContr {
  height: 2.5rem;
}
.data-value a {
  color: #136acd;
  text-decoration: none;
  width: 241px;
}
.page-header {
  font-weight: 700;
  font-size: 1.7rem;
}
.summary {
  border-radius: 30px;
  /* box-shadow: 0px 3px 6px #2c28281c; */
  padding: 24px 10px;
  background: #fff;
  box-shadow: 0px 3px 6px #2c28281c;
  border: 1px solid #00204424;
}
.table {
  width: 100% !important;
  box-shadow: 0px 1px 4px #02172e45;
  border: 1px solid #dde2e6;
  border-radius: 30px;
  text-align: left;
  margin-bottom: auto !important;
}
.boards {
  display: flex;
}
.board-top {
  display: flex;
  justify-content: space-between;
  margin-bottom: 40px;
  align-items: center;
  box-shadow: 0px 3px 6px #2c28281c;
  padding: 4px;
}
.total {
  margin-bottom: 40px;
  font-size: 37px;
}
.total-text {
  font-size: 15px;
  font-weight: 700;
}
.percent {
  color: #136acd;
}
.hr {
  border: 1px solid #0020440a;
  margin: 0 4px 10px 0;
}
.tbl-footer-btn {
  background: transparent;
  padding: 4px;
  margin: 4px 8px;
  border-radius: 50%;
  width: 29px;
  border: none;
  border: 1px solid #8898aa80;
  outline: transparent;
}
.action-icon {
  text-align: center;
}
.list-body {
  padding: 0 21px;
}
.data-value {
  display: flex;
  padding-left: 6px;
}
.theader {
  padding-left: 2px;
  text-align: left;
}
.filter-options {
  height: 0;
  overflow: hidden;
  transition: all 0.5s ease-in-out;
}
.filter-options-shown {
  height: 80px !important;
  overflow: hidden;
  transition: all 0.5s ease-in-out;
}
.clear-link,
.hide-link {
  color: #136acd;
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
@media (max-width: 660px) {
  .select-all {
    display: none;
  }
}
.header {
  background: #dde2e6 0% 0% no-repeat padding-box;
  font: normal normal bold 13px/13px Nunito Sans;
  letter-spacing: 0px;
  color: #002044;
}
.header tr {
  color: #8898aa;
  font-size: 11px;
  box-shadow: 0px 3px 6px #2c28281c;
  background: #dde2e6 0% 0% no-repeat padding-box;
}
.select-all input {
  margin: 0 8px 0 -5px !important;
}
.currency {
  background: #fafafa 0% 0% no-repeat padding-box;
  /* border: 1px solid #C5D9F2; */
  border-radius: 5px;
  letter-spacing: 0px;
  color: #1c252c;
  padding: 4px;
  font-weight: bold;
}
.offering-amount {
  border: 1px solid #00204424;
  padding: 5px;
  border-radius: 5px;
}
.head-button {
  display: flex;
  justify-content: flex-end;
}
.add-btn {
  width: 180px;
  background: #136acd;
  border-radius: 22px;
  color: #ffffff;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 42px;
  text-decoration: none;
}
.more {
  background: #dde2e6;
  border-radius: 22px;
  width: 180px;
  font-weight: bold;
  border: transparent;
  outline: transparent;
  height: 42px;
  margin-right: 1rem;
}
.fa-ellipsis-v:hover {
  cursor: pointer;
}

.fa-ellipsis-v {
  padding: 10px;
}
.board.members-count {
  padding: 24px;
}
.no-record {
  color: rgba(184, 5, 5, 0.726);
  font-size: 1.1em;
}

.itemroute-color {
  color: #136acd;
}
@media (max-width: 767px) {
  .first-timers-text {
    text-align: center;
  }
  .head-button {
    display: flex;
    justify-content: center;
  }
}
@media screen and (max-width: 500px) {
  .board {
    width: 100% !important;
  }
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
@media (max-width: 577px) {
  .head-button {
    flex-direction: column;
    align-items: center;
  }
  .more {
    margin-right: 0;
  }
  .add-btn {
    margin-top: 10px;
  }
}
@media (max-width: 575px) {
  .head-button {
    display: flex;
    justify-content: center;
  }
}
@media screen and (min-width: 501px) and (max-width: 768px) {
  .board {
    width: 50% !important;
    margin-bottom: 10px;
  }
  .summary-header {
    width: 50%;
    margin-left: 25%;
  }
}
@media screen and (max-width: 768px) {
  .filter-options-shown {
    height: 150px !important;
    overflow: hidden;
    transition: all 0.5s ease-in-out;
  }
  .boards {
    flex-wrap: nowrap;
  }
  .responsive-table {
    max-width: 100%;
    overflow-x: scroll;
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
.row-divider {
  border: 1px solid #0020440a;
  margin: 0;
}
.table-footer {
  display: flex;
  justify-content: flex-end;
  background: #fff;
  padding: 10px 0;
  border-radius: 0px 0px 22px 22px;
}
.board.members-count {
  max-height: 216px;
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
.itemroute-color {
  color: #136acd;
}
.itemroute-color:hover {
  text-decoration: none;
}
.t-header {
  background: #dde2e6 0% 0% no-repeat padding-box;
  font-size: 16px;
  padding: 0.5rem 0;
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



.m-wrapper {
    background-color: white!important;
    width: 875px;
    position: absolute;
    right: 0px;
    top: 0;
    height: 100%;
    padding: 70px;
    transition: all 3s ease-out;
}

.m-wrapper2 {
      background-color: white!important;
    width: 875px;
    position: absolute;
    right: 0px;
    top: 0;
    /* height: 100%; */
    padding: 70px;
}
.no-show {
  width: -875px;
  transition: all 3s ease-out;
  /* transition: all  8s cubic-bezier(0.645, 0.045, 0.355, 1); */
}

.hover:hover {
  background: #eee;
}

li {
  list-style-type: none;
}

li  li:hover {
  /* border: 2px solid red; */
  background: rgba(224, 223, 223, 0.46)
}

.node-height {
  height: 0px;
  overflow: hidden;
  /* transition: all .5s ease-in-out; */
}

.node-height-open {
  height: 100%;
  overflow: hidden;
  /* transition: all .5s ease-in-out; */
}

.roll-icon {
  transform: rotate(-90deg);
  /* transition: all .5s ease-in-out; */
}

/* @media Queries */
@media (max-width: 771px) {
  .fontIncrease {
    font-size: 20px;
  }
}

@media screen and (max-width: 947px ){
    .m-wrapper, .m-wrapper2 {
      width: 700px;
      padding: 50px;
  }
}

@media screen and (max-width: 767px ){
    /* .baseline {
        width: 40%;
    }
    .hide-base {
        width: 40%;
    } */
      .m-wrapper, .m-wrapper2 {
        width: 400px;
        padding: 40px;
    }
}
@media screen and (max-width: 575px ){
    /* .baseline {
        width: 20%;
    }
    .hide-base {
        width: 20%;
    } */
    .m-wrapper, .m-wrapper2 {
        width: 350px;
        padding: 20px;
    }
}
</style>