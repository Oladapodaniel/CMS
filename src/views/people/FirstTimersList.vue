<template>
  <div class="container-wide">
           <div class="row mt-4">
               <div class="col-12">
                 <div class="font-weight-bold">Share the link to your first timers to enable them to add their details to your church .</div>
                  <div class="p-inputgroup form-group mt-1">
                      <input placeholder="Link" class="form-control" ref="selectedLink" type="text" v-model="firstTimerLink" style="height: 3rem;"  />
                      <Button icon="pi pi-copy" @click="copylink" class="p-button-secondary"/>
                  </div>
            </div> 
          </div>
     <div class="row mt-3 botom">
            <!-- <div class="col-12"> -->
                <div class="col-12 col-sm-6 c-pointer "  @click="dashboard">
                    <div  class="font-weight-bold h5 col-12  ">Dashboard</div>
                    <div class="" :class="{ 'baseline' : showDashboard, 'hide-base' : !showDashboard }"></div>
                </div>
                <div class="col-12 col-sm-6  c-pointer" @click="firstTimerTable">
                    <div class="font-weight-bold h5 col-12  ">First Timers</div>
                    <div class="" :class="{ 'baselinetwo' : showFirstTimer, 'hide-basetwo' : !showFirstTimer }"></div>
                </div>
                <!-- <div class="hr"><hr /></div> -->
            <!-- </div> -->
            
        </div>
    <div class="my-con">
      <div v-if="showDashboard">
          <FirstTimersChartArea @firsttimers="setFirsttimer" @totalfirstimer="setTotalFirstTimer"/>
      </div>
    
     
      <div v-if="showFirstTimer">
      <div class="row table">
      <div class="col-12 px-0" id="table">
        <div class="top-con">
          <div class="table-top  d-flex justify-content-end mr-2">
            <div class="select-All mr-3">
            <div class="d-flex   w-100 ">
                <input
                class="d-block d-md-none mb-2"
                type="checkbox"
                name="all"
                id="all"
                @change="markAllFirsttimer"
                :checked="checkedFirstTimer.length === churchMembers.length"
              />
              <label class="d-block d-md-none  ml-2">SELECT ALL</label>
            </div>
              <div class="d-none d-md-block d-lg-block">
                 &nbsp; &nbsp;
                  <span class="c-pointer" v-if="checkedFirstTimer.length > 0" @click="sendMarkedMemberSms">Send SMS</span> &nbsp; &nbsp;
                  <span class="c-pointer" v-if="checkedFirstTimer.length > 0" @click="sendMarkedMemberEmail">Send Email</span>
              </div>
             
            </div>
            
            <div class="filter">
              <p @click="toggleFilterFormVissibility" class="mt-2">
                <i class="pi pi-filter"></i>
                FILTER
              </p>
            </div>
            <div class="col-5 col-sm-3 col-md-2">
              <p @click="toggleSearch" class="search-text w-100 mt-2">
                <i class="pi pi-search"></i> SEARCH
              </p>
            </div>
            
            <div class="search d-flex ml-2">
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
                  @input="searchMemberInDB"
                />
                <span class="empty-btn">x</span>
                <span class="search-btn">
                  <i class="pi pi-search"></i>
                </span>
              </label>
            </div>
            <div>
               <i
                class="
                  pi pi-trash
                  text-danger
                  mr-3
                  c-pointer
                  d-flex-inline
                  align-items-center
                "
                style="font-size: 20px; margin-bottom: 12px"
                v-if="checkedFirstTimer.length > 0"
                @click="modal"
              >
              </i>
            </div>

          </div>
          <div class="d-block font-weight-bold small text-center w-100 d-md-none d-lg-none"> 
            &nbsp; &nbsp;
              <span class="c-pointer" v-if="checkedFirstTimer.length > 0" @click="sendMarkedMemberSms">Send SMS</span> &nbsp; &nbsp;
              <span class="c-pointer" v-if="checkedFirstTimer.length > 0" @click="sendMarkedMemberEmail">Send Email</span>
          </div>
        </div>
        <div
            class="filter-options"
            :class="{ 'filter-options-shown': filterFormIsVissible }"
          >
            <div class="container-fluid">
              <div class="row">
                <div class="col-md-9">
                  <div class="row">
                    <div
                      class="
                        col-12 col-sm-6
                        offset-sm-3 offset-md-0
                        form-group
                        inp
                        w-100
                      "
                    >
                      <!-- <div class="input-field"> -->

                      <input
                        type="text"
                        class="input w-100 mb-n3"
                        placeholder="Name"
                        v-model="filter.name"
                      />
                      <!-- </div> -->
                    </div>

                    <div class="col-12 col-sm-6 form-group d-none d-md-block">
                      <input
                        type="text"
                        class="input w-100"
                        placeholder="Phone Number"
                        v-model="filter.phoneNumber"
                      />
                    </div>
                  </div>

                  <div class="row"></div>
                </div>

                <div class="col-md-3 d-flex flex-column align-items-center">
                  <button class="apply-btn text-white" @click="applyFilter">
                    Apply
                  </button>
                  <span class="mt-2">
                    <a class="clear-link mr-2" @click="clearAll">Clear all</a>
                    <span class="mx-2"
                      ><i class="fas fa-circle" style="font-size: 4px"></i></span
                    ><a class="hide-link ml-2" @click="hide">Hide</a>
                  </span>
                </div>
              </div>
            </div>
          </div>

    
    <!-- <div > -->
          <div class="container-fluid d-none d-md-block">
            <div class="row t-header">
              <div class="col-md-1">
                <input
                  type="checkbox"
                  name="all"
                  id="all"
                  @change="markAllFirsttimer"
                  :checked="checkedFirstTimer.length === churchMembers.length"
                />
                <!-- <Checkbox id="binary" v-model="sendToMysef" :binary="true"/> -->
              </div>
              <div class="small-text col-md-2 font-weight-bold">
                NAME
              </div>
              <div class="small-text col-md-2 font-weight-bold">
                PHONE NUMBER
              </div>
              <div class="small-text col-md-2 font-weight-bold">
                SOURCE
              </div>
              <div class="small-text col-md-1 font-weight-bold">
                INTERESTED
              </div>
              <div class="small-text col-md-1 font-weight-bold">
                DATE
              </div>
              <div class="small-text col-md-1 font-weight-bold">
                MOVEMENT
              </div>
              <div class="small-text col-md-1 font-weight-bold">
                INTERACTION
              </div>
              <div class="small-text col-md-1 font-weight-bold">
                ACTION
              </div>
            </div>
          </div>
        <div class="container-fluid">
          <div class="row">
            <loadingComponent :loading="loading" />
            <div
              class=" col-12 py-2 px-0 c-pointer tr-border-bottom hover"
              v-for="person in searchMember"
              :key="person.id"
            >
              <div class="row w-100" style="margin: 0">
                <div
                  class="col-md-1 d-flex d-md-block px-3 justify-content-end"
                >
                  <input
                    type="checkbox"
                    name=""
                    id=""
                    @change="check1item(person)"
                    :checked="
                      checkedFirstTimer.findIndex((i) => i.id === person.id) >= 0
                    "
                  />
                  <!-- <Checkbox id="binary" v-model="item.check" :binary="true"/> -->
                </div>

                <div class="desc-head small-text col-md-2">
                  <div class="mb-0 d-flex justify-content-between">
                    <span
                      class="
                        text-dark
                        font-weight-bold
                        d-flex d-md-none
                        fontIncrease
                      "
                      >Name</span
                    >
                    <div class="desc small-text text-right text-md-left">
                        <router-link :to="`/tenant/firsttimermanagement/${person.id}?memberType=0`"
                          class="itemroute-color">
                        {{ person.fullName
                              ? person.fullName
                              : `${person.firstName} ${person.lastName}` }}
                        </router-link>
                      </div>
                  </div>
                </div>

                <div class="desc-head small-text col-md-2">
                  <div class="d-flex justify-content-between">
                    <span
                      class="
                        text-dark
                        font-weight-bold
                        d-flex d-md-none
                        fontIncrease
                      "
                      >Phone Number</span
                    >
                    <div>
                      <div class="desc small-text text-right text-md-left">
                        <router-link :to="`/tenant/firsttimermanagement/${person.id}?memberType=0`"
                          class="itemroute-color">
                        {{ person.phoneNumber }}
                        </router-link>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="desc-head small-text col-md-2">
                  <div class="d-flex justify-content-between">
                    <span
                      class="
                        text-dark
                        font-weight-bold
                        d-flex d-md-none
                        fontIncrease
                      "
                      >Source</span
                    >
                    <div class="desc small-text text-right text-md-left">
                        <router-link :to="`/tenant/firsttimermanagement/${person.id}?memberType=0`"
                          class="itemroute-color">
                        {{ person.howDidYouAboutUsName }}
                        </router-link>
                      </div>
                  </div>
                </div>
                
                <div class="desc-head small-text col-md-1">
                  <div class="mb-0 d-flex justify-content-between">
                    <span
                      class="
                        text-dark
                        font-weight-bold
                        d-flex d-md-none
                        fontIncrease
                      "
                      >Interested</span
                    >
                    <div class="desc small-text text-right text-md-left">
                        <router-link :to="`/tenant/firsttimermanagement/${person.id}?memberType=0`"
                          class="itemroute-color">
                        {{ person.interestedInJoining === "Not_Specified"
                        ? "Not Sure"
                        : person.interestedInJoining }}
                        </router-link>
                      </div>
                  </div>
                </div>
                
                <div class="desc-head small-text col-md-1">
                  <div class="mb-0 d-flex justify-content-between">
                    <span
                      class="
                        text-dark
                        font-weight-bold
                        d-flex d-md-none
                        fontIncrease
                      "
                      >Date</span
                    >
                    <div class="desc small-text text-right text-md-left">
                        <router-link :to="`/tenant/firsttimermanagement/${person.id}?memberType=0`"
                          class="itemroute-color">
                        {{ moment
                        .parseZone(
                          new Date(person.date).toDateString(),
                          "YYYY MM DD HH ZZ"
                        )
                        ._i.substr(4, 11) }}
                        </router-link>
                      </div>
                  </div>
                </div>
                
                <div class="desc-head small-text col-md-1">
                  <div class="mb-0 d-flex justify-content-between">
                    <span
                      class="
                        text-dark
                        font-weight-bold
                        d-flex d-md-none
                        fontIncrease
                      "
                      >Movement</span
                    >
                    <div class="desc small-text text-right text-md-left">
                        <router-link :to="`/tenant/firsttimermanagement/${person.id}?memberType=0`"
                          class="itemroute-color">
                        {{ person.movement }}
                        </router-link>
                      </div>
                  </div>
                </div>
                
                <div class="desc-head small-text col-md-1">
                  <div class="mb-0 d-flex justify-content-between">
                    <span
                      class="
                        text-dark
                        font-weight-bold
                        d-flex d-md-none
                        fontIncrease
                      "
                      >Interaction</span
                    >
                    <div class="desc small-text text-right text-md-left">
                        <router-link :to="`/tenant/firsttimermanagement/${person.id}?memberType=0`"
                          class="itemroute-color">
                        {{ person.interactions }}
                        </router-link>
                      </div>
                  </div>
                </div>

                <!-- <div class="small-text col-md-2 px-1">
                  <p class="mb-0 d-flex justify-content-between">
                    <span
                      class="
                        text-dark
                        font-weight-bold
                        d-flex d-md-none
                        fontIncrease
                      "
                      >Donor</span
                    >
                    <span
                      ><span class="primary-text c-pointer"
                        ><router-link
                          class="text-decoration-none fontIncrease"
                          :to="{
                            name: 'AddOffering',
                            params: { offId: item.id },
                          }"
                          >{{ item.donor }}</router-link
                        ></span
                      ></span
                    >
                  </p>
                </div> -->

                <div class="col-md-1">
                  <div>
                    <div class="dropdown">
                      <i
                        class="fas fa-ellipsis-v cursor-pointer"
                        id="dropdownMenuButton"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                      ></i>
                      <div
                        class="dropdown-menu"
                        aria-labelledby="dropdownMenuButton"
                      >
                        <a
                          class="dropdown-item elipsis-items"
                          v-if="person.phoneNumber"
                        >
                          <router-link
                            :to="`/tenant/sms/compose?phone=${person.phoneNumber}`"
                            >Send SMS</router-link
                          >
                        </a>

                        <a class="dropdown-item elipsis-items" v-if="person.email">
                          <router-link
                            :to="`/tenant/email/compose?phone=${person.email}`"
                          >
                            Send Email
                          </router-link>
                        </a>
                        <a
                          class="
                            dropdown-item
                            elipsis-items
                            text-color
                            cursor-pointer
                          "
                          href="#"
                          @click.prevent="showConfirmModal(person.id, index)"
                          >Delete</a
                        >
                        <a
                          class="dropdown-item elipsis-items"
                          @mouseover="toggle($event, person.id)"
                          href="#"
                        >
                          Convert to member
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

<!-- </div> -->


         <!-- <div
          class="col-md-12 col py-3"
          v-if="
            listOfOfferingItems.length === 0 &&
            props.contributionTransactions.length !== 0 &&
            !loading
          "
        >
          <p class="text-danger d-flex justify-content-center">
            Record not available in database
          </p>
        </div> -->
        <!-- <div class="text-danger d-flex justify-content-center" v-else>No records found</div> -->

        <div class="col-12">
          <div class="table-footer">
            <Pagination
              @getcontent="getPeopleByPage"
              :itemsCount="membersCount"
              :totalItems="totalFirsttimersCount"
              :currentPage="currentPage"
            />
          </div>
        </div>
      </div>
    </div>
    </div>
    </div>

    <OverlayPanel
      ref="op"
      appendTo="body"
      :showCloseIcon="false"
      id="overlay_panel"
      style="
        width: 134px;
        margin-top: -25px;
        box-shadow: 0px 1px 4px #02172e45;
        border: 1px solid #dde2e6;
      "
      :breakpoints="{ '960px': '75vw', '640px': '100vw' }"
    >
      <div v-for="item in membershipCategory" :key="item.id">
        <div
          class="dropdown-item cursor-pointer p-0"
          @click="chooseCategory($event, item.id)"
        >
          {{ item.name }}
        </div>
      </div>
    </OverlayPanel>
    <ConfirmDialog />
        <Toast />
  </div>

  <SideBar :show="showSMS" :title="'Compose SMS'" @closesidemodal="() => showSMS = false">
    <div class="m-wrapper" :class="{ 'm-wrapper': showSMS, 'no-show': !showSMS }">
      <smsComponent :phoneNumbers="contacts"  @closesidemodal="() => showSMS = false"/>
    </div>
  </SideBar>
  <SideBar :show="showEmail" :title="'Compose Email'" @closesidemodal="() => showEmail = false">
    <div class="m-wrapper2">
      <emailComponent :selectedGroupMembers="markedFirsttimers"  @closesidemodal="() => showEmail = false"/>
    </div>
  </SideBar>
































































































  

</template>

<script>
import { ref, computed } from "vue";
// import ByGenderChart from "@/components/charts/PieChart.vue";
// import ByMaritalStatusChart from "@/components/charts/PieChart.vue";
import SideBar from "../groups/sidemodal/SideModal.vue";
import smsComponent from "../groups/component/smsComponent.vue";
import emailComponent from "../groups/component/emailComponent.vue";
import FirstTimersChartArea from "./FirstTimersChartArea.vue"
import axios from "@/gateway/backendapi";
import Pagination from "../../components/pagination/PaginationButtons";
import { useRoute } from "vue-router";
import moment from "moment";
import { useConfirm } from "primevue/useconfirm";
import { useToast } from "primevue/usetoast";
import stopProgressBar from "../../services/progressbar/progress";
import OverlayPanel from "primevue/overlaypanel";
import loadingComponent from "@/components/loading/LoadingComponent"
import membershipService from '../../services/membership/membershipservice';

export default {
  emits: ["firsttimers"],
  components: {
    // ByGenderChart,
    // ByMaritalStatusChart,
    Pagination,
    OverlayPanel,
    loadingComponent,
    FirstTimersChartArea,
    smsComponent,
    emailComponent,
    SideBar
  },

  setup(props, { emit }) {
    const showDashboard = ref(true)
    const showFirstTimer = ref(false)
    const churchMembers = ref([]);
    const filter = ref({});
    const searchIsVisible = ref(false);
    const filterResult = ref([]);
    const markedFirsttimers = ref([]);
    const noRecords = ref(false);
    const searchText = ref("");
    const membershipCategory = ref([]);
    const contacts = ref([]);
    const selectedPersonId = ref("");
    const tenantID = ref("")
    const selectedLink = ref(null)
    const totalFirstTimer = ref("")
    const showSMS = ref(false)
    const showEmail = ref(false)

    const route = useRoute();
    const filterFormIsVissible = ref(false);
    const toggleFilterFormVissibility = () =>
      (filterFormIsVissible.value = !filterFormIsVissible.value);

    const toggleSearch = () => {
      searchIsVisible.value = !searchIsVisible.value;
    };


    const totalFirsttimersCount = computed(() => {
      if (
        !totalFirstTimer.value
      )
        return 0;
      return totalFirstTimer.value;
    });

    const deleteMember = (id) => {
      //  delete firtimer
      axios
        .delete(`/api/People/DeleteOnePerson/${id}`)
        .then(() => {
          toast.add({
            severity: "success",
            summary: "Confirmed",
            detail: "Member Deleted",
            life: 3000,
          });
          churchMembers.value = churchMembers.value.filter(
            (item) => item.id !== id
          );
        })
        .catch((err) => {
          /eslint no-undef: "warn"/
          NProgress.done();
          if (err.response.status === 400) {
            toast.add({
              severity: "warn",
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

    const confirm = useConfirm();
    const toast = useToast();
    const showConfirmModal = (id, index) => {
      confirm.require({
        message: "Are you sure you want to proceed?",
        header: "Confirmation",
        icon: "pi pi-exclamation-triangle",
        acceptClass: "confirm-delete",
        rejectClass: "cancel-delete",
        accept: () => {
          deleteMember(id, index);
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

    // const getFirstTimers = () => {
    //   axios.get("/api/People/getAllFirstTimers").then((res) => {
    //     churchMembers.value = res.data;
    //   });
    // };
    // getFirstTimers();

    const getFirstTmersList = async() => {
        try {
          let data = await membershipService.getFirstTimers()
          churchMembers.value = data;
          emit("firsttimers", data)
          console.log(data)
        }
        catch (err) {
            console.log(err)
      }
    }
      getFirstTmersList()

    const applyFilter = () => {
      filter.value.name =
        filter.value.name == undefined ? "" : filter.value.name;
      filter.value.phoneNumber =
        filter.value.phoneNumber == undefined ? "" : filter.value.phoneNumber;

      let url =
        "/api/People/FilterFirstTimers?firstname=" +
        filter.value.name +
        "&lastname=" +
        filter.value.name +
        "&phone_number=" +
        filter.value.phoneNumber +
        "&page=1";
      axios
        .get(url)
        .then((res) => {
          noRecords.value = true;
          filterResult.value = res.data;
        })
        .catch((err) => console.log(err));
    };

    // Tosin
    const loading = ref(false);
    const searchNamesInDB = ref([]);
    const searchMemberInDB = (event) => {
      loading.value = true;
      let url =
        "/api/People/FilterFirstTimers?firstname=" +
        event.target.value;
        // event.target.value +
        // "&lastname=" +
        // event.target.value +
        // "&phone_number=" +
        // event.target.value +
        // "&page=1";

      axios
        .get(url)
        .then((res) => {
          loading.value = false;
          searchNamesInDB.value = res.data;
        })
        .catch((err) => {
          console.log(err);
          loading.value = false;
        });
    };

    const listOfFirsttimers = computed(() => {
      if (searchText.value !== "") return searchNamesInDB.value;
      return churchMembers.value;
    });
    // Tosin

    const searchMember = computed(() => {
      if (searchText.value !== "" && searchNamesInDB.value.length > 0) {
        return searchNamesInDB.value;
      } else if (
        filterResult.value.length > 0 &&
        (filter.value.name || filter.value.phoneNumber)
        // filterResult.value.length > 0
      ) {
        return filterResult.value;
      } else {
        return churchMembers.value;
      }
    });

     const hide = () => {
      filterFormIsVissible.value = false;
    };

    const membersCount = computed(() => {
      if (totalFirstTimer.value > 100)
        return Math.ceil(totalFirstTimer.value / 100);
      return 1;
    });

    const currentPage = ref(1);
    const getPeopleByPage = async (page) => {
      if (page < 1) return false;
      try {
        const { data } = await axios.get(
          `/api/people/getPaginatedFirstTimer?page=${page}`
        );
        filterResult.value = [];
        searchMemberInDB.value = [];
        noRecords.value = false;
        churchMembers.value = data;
        currentPage.value = page;
      } catch (error) {
        console.log(error);
      }
    };

    const clearInput = () => {
      searchText.value = "";
    };

 const clearAll = () => {
filter.value.name = "";
filter.value.phoneNumber ="";
    };

    // function to checkmark a single first timer
    const checkedFirstTimer = ref([]);

    const  dashboard = () => {
            showDashboard.value = true;
            showFirstTimer.value = false;
        }

    const  firstTimerTable = () => {
            showFirstTimer.value = true;
            showDashboard.value = false;
        }

    const check1item = (ft) => {
      const firstTimerIdx = checkedFirstTimer.value.findIndex(
        (i) => i.id === ft.id
      );
      if (firstTimerIdx < 0) {
        checkedFirstTimer.value.push(ft);
      } else {
        checkedFirstTimer.value.splice(firstTimerIdx, 1);
      }
    };

    // function to check all first timer
    const markAllFirsttimer = () => {
      if (checkedFirstTimer.value.length < churchMembers.value.length) {
        churchMembers.value.forEach((i) => {
          const ftInMarked = checkedFirstTimer.value.findIndex(
            (f) => f.id === i.id
          );
          if (ftInMarked < 0) {
            checkedFirstTimer.value.push(i);
          }
        });
      } else {
        checkedFirstTimer.value = [];
      }
    };

    // Function to delete first timer
    const convert = (x) => {
      return x.map((i) => i.id);
    };
    const deleteMessage = ref("");
    const display = ref(false);
    const deleteFirstTimer = () => {
      let dft = convert(checkedFirstTimer.value);
      axios
        .post(`/api/People/DeletePeople`, dft)
        .then((res) => {
          let incomingRes = res.data.response;
          console.log(incomingRes, "🙌❤🙌❤🙌")
          if (incomingRes.toString().toLowerCase().includes("all")) {
            toast.add({
              severity: "success",
              summary: "Confirmed",
              detail: "First Timer(s) deleted successfully.",
              life: 4000,
            });
            churchMembers.value = churchMembers.value.filter((item) => {
              const y = checkedFirstTimer.value.findIndex(
                (i) => i.id === item.id
              );
              console.log(y , "old are u now");
              if (y >= 0) return false;
              return true;
            });
            console.log(churchMembers.value, 'the baddest bug')
          } else {
            let resArr = incomingRes.split("@");
            toast.add({
              severity: "info",
              summary: "Confirmed",
              detail: resArr[0],
            });

            if (resArr[1] !== "") {
              if (!resArr[1].includes(",")) {
                churchMembers.value = churchMembers.value.filter((item) => {
                  return !item.id.includes(resArr[1]);
                });
              } else {
                let IdArr = resArr[1].split(",");
                churchMembers.value = churchMembers.value.filter((item) => {
                  const y = IdArr.findIndex((i) => i === item.id);
                  if (y >= 0) return false;
                  return true;
                });
              }
            }
          }
          checkedFirstTimer.value = [];
        })
        .catch((err) => {
          stopProgressBar();
          if (err.toString().toLowerCase().includes("network error")) {
            toast.add({
              severity: "warn",
              summary: "Network Error",
              detail: "Please ensure you have a strong internet connection",
              life: 4000,
            });
          } else if (err.toString().toLowerCase().includes("timeout")) {
            toast.add({
              severity: "warn",
              summary: "Request Delayed",
              detail: "Request took too long to respond",
              life: 4000,
            });
          } else {
            toast.add({
              severity: "warn",
              summary: "Delete Failed",
              detail: "Unable to delte first timer",
              life: 4000,
            });
          }
          console.log(err);
        });
    };

    const sendMarkedMemberSms = () => {
     contacts.value = checkedFirstTimer.value.filter( (i) => i.phoneNumber ).map( (i) => i.phoneNumber ).join()
     showSMS.value = true;
    }

    const sendMarkedMemberEmail = () => {
      showEmail.value = true;
     markedFirsttimers.value = checkedFirstTimer.value.map( (i) => {
       i.id = i.id
       return i
     });
     
    }

    const modal = () => {
      confirm.require({
        message: "Are you sure you want to proceed?",
        header: "Confirmation",
        icon: "pi pi-exclamation-triangle",
        acceptClass: "confirm-delete",
        rejectClass: "cancel-delete",
        accept: () => {
          deleteFirstTimer();
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

    const getMembershipCategory = async () => {
      try {
        let { data } = await axios.get(
          "/api/Settings/GetTenantPeopleClassification"
        );
        membershipCategory.value = data;
      } catch (err) {
        console.log(err);
      }
    };
    getMembershipCategory();

    const op = ref();
    const toggle = (event, id) => {
      op.value.toggle(event);
      selectedPersonId.value = id;
    };

    const chooseCategory = async (event, id) => {
      op.value.toggle(event);
      try {
        let { data } = await axios.post(
          `/api/People/ConvertFirstTimerToMember?personId=${selectedPersonId.value}&membershipCategoryId=${id}`
        );
        churchMembers.value = churchMembers.value.filter((i) => {
          return i.id !== selectedPersonId.value;
        });
        if (data.response) {
          toast.add({
            severity: "success",
            summary: "Confirmed",
            detail: data.response,
            life: 4000,
          });
        } else {
          toast.add({
            severity: "success",
            summary: "Confirmed",
            detail: "Moved successfully",
            life: 4000,
          });
        }
      } catch (err) {
        console.log(err);
        if (err.response) {
          toast.add({
            severity: "warn",
            summary: "Moving failed",
            detail: err.response,
            life: 4000,
          });
        } else if (err.toString().toLowerCase().includes("timeout")) {
          toast.add({
            severity: "warn",
            summary: "Request Delayed",
            detail: "Request took too long to respond",
            life: 4000,
          });
        } else if (err.toString().toLowerCase().includes("network error")) {
          toast.add({
            severity: "warn",
            summary: "Network Error",
            detail: "Please ensure that you havve a strong internet",
            life: 4000,
          });
        } else {
          toast.add({
            severity: "warn",
            summary: "Unable to move",
            detail:
              "Couldn't move successfully, check your connection and try again",
            life: 4000,
          });
        }
      }
    };

  
    const setFirsttimer = (payload) => {
      churchMembers.value = payload
    }

     const getCurrentlySignedInUser = async () => {
      try {
        const res = await axios.get("/api/Membership/GetCurrentSignedInUser");
        tenantID.value = res.data.tenantId
      } catch (err) {
        console.log(err);
      }
    };
    getCurrentlySignedInUser();

    const firstTimerLink = computed(() => {
      if (!tenantID.value) return ""
      return `${window.location.origin}/createfirsttimer/${tenantID.value}`
    })

    const copylink = () => {
      console.log(selectedLink.value.value);
          selectedLink.value.setSelectionRange(0, selectedLink.value.value.length); /* For mobile devices */
        selectedLink.value.select();

          /* Copy the text inside the text field */
          document.execCommand("copy");
       toast.add({
              severity: "info",
              summary: "Link Copied",
              detail: "copied to your clipboard",
              life: 3000,
        });
    }

    const setTotalFirstTimer = (payload) => {
      totalFirstTimer.value = payload
    }

    return {
      dashboard,
      firstTimerTable,
      showDashboard,
      showFirstTimer,
      churchMembers,
      filterFormIsVissible,
      toggleFilterFormVissibility,
      moment,
      applyFilter,
      filter,
      toggleSearch,
      searchIsVisible,
      filterResult,
      noRecords,
      searchText,
      showConfirmModal,
      deleteMember,
      membersCount,
      currentPage,
      getPeopleByPage,
      clearInput,
      checkedFirstTimer,
      check1item,
      markAllFirsttimer,
      deleteFirstTimer,
      modal,
      deleteMessage,
      display,
      sendMarkedMemberSms,
      sendMarkedMemberEmail,
      membershipCategory,
      op,
      toggle,
      chooseCategory,
      selectedPersonId,
      totalFirsttimersCount,
      searchMemberInDB,
      searchNamesInDB,
      listOfFirsttimers,
      loading,
      searchMember,
      clearAll,
      contacts,
      hide,
      setFirsttimer,
      firstTimerLink,
      markedFirsttimers,
      tenantID,
      selectedLink,
      showSMS,
      showEmail,
      copylink,
      setTotalFirstTimer,
      totalFirstTimer
    };
  },
};
</script>

<style scoped>
* {
  box-sizing: border-box;
  color: #02172e;
}


.baseline {
    transition: all 150ms ease-in-out;
    background-color: #136acd;
    position: relative;
    border-radius: 10px;
    height: 4px;
    top: 5px;
    left: 0px;
    /* border-radius:2px solid red; */
    /* width: 35%; */
    opacity: 1;
}

.botom{
  border-bottom: 7px solid rgb(252, 248, 248);
  border-radius: 2px;
  position: relative;
  /* border-bottom-right-radius: 10px;
  border-bottom-left-radius: 10px; */
  
  /* height: 4px; */
}

.hide-basetwo {
    transition: all 150ms ease-in-out;
    background-color: #136acd;
    position: absolute;
    /* background-color: #33475b; */
    /* color: #136acd" */
    border-radius: 10px;
    /* bottom: -2.5px; */
    z-index: 175;
    height: 4px;
    top: 36px;
    left: 0px;
    width: 50%;
    opacity: 0;
}

.hide-base {
     transition: all 150ms ease-in-out;
    background-color: #136acd;
    position: relative;
    border-radius: 10px;
    z-index: 175;
    height: 4px;
    top: 35px;
    left: 0px;
    opacity: 0;
}
.baselinetwo {
    transition: all 150ms ease-in-out;
    background-color: #136acd;
    position: relative;
    border-radius: 10px;
    height: 4px;
    top: 5px;
    left: 0px;
    opacity: 1;
}

.data-value a {
  color: #136acd;
  text-decoration: none;
  width: 241px;
}

.page-header {
  font-weight: 500;
  font-size: 2rem;
}

.my-con {
  /* display: flex; */
  justify-content: space-between;
  margin: 24px 0;
}

.summary {
  /* width: 20%; */
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
  /* padding: 0 21px; */
}

.summary-header {
  color: #136acd !important;
  margin: 0 10px;
  color: #02172e;
  opacity: 0.8;
  font-size: 22px;
  font-weight: 600;
}

.boards {
  display: flex;
}

.board {
  width: 28%;
  border-radius: 10px;
}

.chart-con {
  width: 70%;
  display: flex;
  justify-content: space-between;
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

a {
  text-decoration: none;
}

.clear-link,
.hide-link {
  color: #136acd;
}

.table-top {
  font-weight: 800;
  font-size: 12px;
}

.table-top label:hover,
.table-top p:hover {
  cursor: pointer;
}

.header {
  background: #f1f3f9;
}

.header tr {
  color: #8898aa;
  font-size: 11px;
  box-shadow: 0px 3px 6px #2c28281c;
}

.select-all input {
  margin: 0 8px 0 -5px !important;
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
  padding: 10px
}

#chart {
  width: 48%;
  max-height: 310px;
  border-radius: 10px;
}

.board.members-count {
  padding: 24px;
}

.page-header {
  font-size: 1.7rem;
}

.no-record {
  color: rgba(184, 5, 5, 0.726);
  font-size: 1.1em;
}

.chart1,
.chart2 {
  border-radius: 10px;
}

.itemroute-color {
  color: #136acd;
  cursor: pointer;
}

.itemroute-color:hover {
  text-decoration: underline;
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


@media screen and (max-width: 500px) {
  .picture,
  .firstname,
  .lastname,
  .phone {
    width: 100%;
  }

  .chart1,
  .chart2,
  .board,
  .chart-con {
    width: 100% !important;
  }

  .table-body .check {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    margin: 10px 0;
  }

  .data-text {
    display: inline-block;
  }

  .data-row {
    flex-direction: column;
  }

  .data-con {
    text-align: center;
    display: flex;
    justify-content: space-between;
  }

  .action-icon {
    width: 100%;
    text-align: right;
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

@media screen and (max-width: 500px) {
  .board {
    width: 100% !important;
  }
  .baseline {
    position:relative;
    border-radius:10px;
    z-index:175;
    top: -4px;
    left: 0px;
    /* width: 35%; */
    opacity: 1;
}
}

@media screen and (min-width: 500px) {
  .theader {
    width: 23%;
  }
.baseline{
  top: -4px;
}
  .table-body .check {
    width: 3%;
  }

  .action {
    width: 5%;
  }
}

@media (max-width: 414px) {
  .head-button {
    flex-direction: column;
    align-items: center;
  }

   .botom {
    border-bottom: 7px solid rgb(252, 248, 248);
    border-radius: 2px;
    position: relative;
    display: flex;
  }
  .c-pointer {
    cursor: pointer;
    flex: 1;
  } 
  .more {
    margin-right: 0;
  }
  .baseline {
    position:relative;
    border-radius:10px;
    z-index:175;
    top: -4px;
    left: 0px;
    /* width: 35%; */
    opacity: 1;
}
}

@media (max-width: 575px) {
  .head-button {
    display: flex;
    justify-content: center;
  }

  .add-btn,
  .more {
    margin-top: 10px;
  }

  .first-timers-text {
    text-align: center;
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

.t-header div {
  background: #dde2e6 0% 0% no-repeat padding-box;
  font-size: 13px;
  padding-top: 10px;
  padding-bottom: 10px;
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

/* tosin */

@media screen and (max-width: 700px) {
  .chart1,
  .chart2,
  .board,
  .chart-con {
    width: 100% !important;
  }

  .picture,
  .firstname,
  .lastname,
  .phone,
  .action {
    width: 100%;
  }

  .table {
    padding: 0 10px;
  }

  .table-body .check {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    margin: 10px 0;
  }

  .data-text {
    display: inline-block;
  }

  .data-row {
    flex-direction: column;
  }

  .data-con {
    /* text-align: center; */
    display: flex;
    justify-content: space-between;
  }

  .action-icon {
    width: 100%;
    text-align: right;
  }

  .table-header {
    display: none;
    padding: 0 0 0 2rem;
  }
}

@media screen and (min-width: 500px) {
  .picture > p {
    margin-left: 43px;
  }

  /* .table-body .check {
    width: 4%;
  } */

  .action {
    width: 20%;
  }
}

@media (max-width: 767px) {
  .filter-options-shown {
    height: 150px;
  }
  .dropdown{
    float: right;
  }
}

@media screen and (max-width: 768px) {
  .board-top {
    margin-bottom: 10px;
  }

  .total {
    margin-bottom: 0;
  }
}

@media screen and (min-width: 501px) and (max-width: 768px) {
  .board {
    width: 50% !important;
    margin-bottom: 10px;
  }

  .summary-header {
    width: 50%;
    margin-left: 26.5%;
  }
}
/* tosin */
</style>