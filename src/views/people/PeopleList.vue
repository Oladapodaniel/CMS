<template>
  <div class="my-con">
    <div class="summary px-3">
      <p class="summary-header">Summary</p>
      <ConfirmDialog />
        <Toast />
      <!-- <hr class="hr" /> -->

      <div class="boards">
        <div class="board">
          <div class="board-top">
            <p class="total-text mb-0">TOTAL MEMBERS</p>
            <img
              class="trend-icon"
              src="../../assets/dashboardlinks/trend-icon.svg"
              alt=""
            />
          </div>
          <h4 class="total">{{ membershipSummary.totalMember }}</h4>
          <p>
            <span class="percent"
              >+{{ membershipSummary.percentageGrowth }}%
            </span>
            <span class="percent-text"> Since last month</span>
          </p>
        </div>

        <div class="chart-con">
          <div style="width: 45%" class="ml-md-4 chart1">
            <ByGenderChart
              domId="chart"
              title="By Gender"
              distance="5"
              :titleMargin="10"
              :summary="membershipSummary.genders"
            />
          </div>
          <div style="width: 45%" class="chart2">
            <ByMaritalStatusChart
              domId="second"
              title="By Marital Status"
              :titleMargin="5"
              :summary="membershipSummary.maritalStatus"
            />
          </div>
        </div>
      </div>
    </div>

    <div class="table mx-0">
      <div class="table-top my-3">
        <div class="select-all">
          <input type="checkbox" name="all" id="all" @click="toggleSelect" v-model="selectAll"/>
          <label>SELECT ALL</label>
        </div>
        <div class="filter">
          <p @click="toggleFilterFormVissibility">
            <i class="fas fa-filter"></i>
            FILTER
          </p>
        </div>
        <p @click="toggleSearch" class="search-text">
            <i class="fa fa-search"></i> SEARCH
          </p>
        <div class="search d-flex" >
          <label 
            class="label-search d-flex"
            :class="{ 'show-search': searchIsVisible }"
          >
            <input type="text" placeholder="Search..." v-model="searchText" />
            <span class="empty-btn">x</span>
            <span class="search-btn">
              <i class="fa fa-search"></i>
            </span>
          </label>
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
                <div class="col-12 col-sm-6 offset-sm-3 offset-md-0 form-group inp w-100">
                  <!-- <div class="input-field"> -->

                  <input
                    type="text"
                    class="input w-100"
                    placeholder="First Name"
                    v-model="filter.filterFirstName"
                  />
                  <!-- </div> -->
                </div>

                <div class="col-12 col-sm-6 form-group d-none d-md-block">
                  <input
                    type="date"
                    class="form-control input inp w-100"
                    v-model="filter.filterDate"
                  />
                </div>
              </div>

              <div class="row">
                <div class="col-12 col-sm-6 form-group d-none d-md-block">
                  <input
                    type="text"
                    class="input w-100"
                    placeholder="Last Name"
                    v-model="filter.filterLastName"
                  />
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
            </div>

            <div class="col-md-3 d-flex flex-column align-items-center">
              <button class="apply-btn text-white" @click="applyFilter" :disabled="disableBtn">
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
<div v-if="loading"><i class="fas fa-circle-notch fa-spin"></i></div>
      <div class="table-header font-weight-700">
        <div class="check"></div>
        <div class="picture">
          <p>PICTURE</p>
        </div>
        <div class="firstname">
          <p>FIRSTNAME</p>
        </div>
        <div class="lastname">
          <p>LASTNAME</p>
        </div>
        <div class="phone">
          <p>PHONE</p>
        </div>
        <div class="action"></div>
      </div>

      <div v-if="filterResult.length > 0 && (filter.filterFirstName || filter.filterLastName || filter.phoneNumber)">
        <div class="table-body" v-for="(person, index) in filterResult" :key="person.id">
        <div class="data-row">
          <div class="check data">
            <input type="checkbox" name="" id="" v-model="selectAll"/>
          </div>
          <div class="picture data">
            <div class="data-con">
              <div class="data-text">
                <p>Picture</p>
              </div>
              <div class="data-value">
                <div class="image-con">
                  <div v-if="person.gender == 'Male'">
                    <img
                      src="../../assets/people/avatar-male.png"
                      alt=""
                      style="border-radius: 50%"
                    />
                  </div>
                  <div v-else-if="person.gender == 'Female'">
                    <img src="../../assets/people/avatar-female.png" alt="" />
                  </div>
                  <div v-else>
                    <img
                      src="../../assets/people/no-gender-avatar.png"
                      alt=""
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="firstname data">
            <div class="data-con">
              <div class="data-text">
                <p>Firstname</p>
              </div>
              <router-link
                :to="`/tenant/people/add/${person.id}`"
                class="data-value itemroute-color"
                >{{ person.firstName }}</router-link
              >
            </div>
          </div>
          <div class="lastname data">
            <div class="data-con">
              <div class="data-text">
                <p>Lastname</p>
              </div>
              <router-link
                :to="`/tenant/people/add/${person.id}`"
                class="data-value itemroute-color"
                >{{ person.lastName }}</router-link
              >
            </div>
          </div>
          <div class="phone data">
            <div class="data-con">
              <div class="data-text">
                <p>Phone</p>
              </div>
              <router-link
                :to="`/tenant/people/add/${person.id}`"
                class="data-value itemroute-color"
                >{{ person.mobilePhone }}</router-link
              >
            </div>
          </div>
          <div class="action data action-icon">
            <div class="dropdown">
              <i
                class="fas fa-ellipsis-v cursor-pointer"
                id="dropdownMenuButton"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              ></i>
              <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <a class="dropdown-item elipsis-items" v-if="person.mobilePhone">
                  <router-link
                    :to="`/tenant/sms/compose?phone=${person.mobilePhone}`"
                    >Send SMS</router-link
                  >
                </a>
                <a class="dropdown-item elipsis-items" v-if="person.email">
                  <router-link
                    :to="`/tenant/email/compose?phone=${person.email}`"
                    >Send Email</router-link
                  >
                </a>
                <a class="dropdown-item elipsis-items">
                  <router-link :to="`/tenant/people/add/${person.id}`"
                    >Edit</router-link
                  >
                </a>
                <a
                  class="dropdown-item elipsis-items"
                  @click.prevent="showConfirmModal(person.id, index)"
                  >Delete</a
                >
              </div>
            </div>
          </div>
        </div>
        
        <hr class="row-divider" />
        <!-- <div>{{ membershipSummary.maritalStatus }}</div> -->
      </div>
      </div>
      
      <div v-else-if="filterResult.length == 0 && noRecords">
        <div class="no-record text-center my-4">No member found</div>
      </div>
      <!-- <div v-else-if="loading">searching for memer</div> -->
      <div v-else>
        <div v-if="searchMember.length > 0">
          <div class="table-body" v-for="(person, index) in searchMember" :key="person.id">
        <div class="data-row">
          <div class="check data">
            <input type="checkbox" name="" id="" v-model="selecteAll"/>
          </div>
          <div class="picture data">
            <div class="data-con">
              <div class="data-text">
                <p>Picture</p>
              </div>
              <div class="data-value">
                <div class="image-con">
                  <div v-if="person.gender == 'Male'">
                    <img
                      src="../../assets/people/avatar-male.png"
                      alt=""
                      style="border-radius: 50%"
                    />
                  </div>
                  <div v-else-if="person.gender == 'Female'">
                    <img src="../../assets/people/avatar-female.png" alt="" />
                  </div>
                  <div v-else>
                    <img
                      src="../../assets/people/no-gender-avatar.png"
                      alt=""
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="firstname data">
            <div class="data-con">
              <div class="data-text">
                <p>Firstname</p>
              </div>
              <router-link
                :to="`/tenant/people/add/${person.id}`"
                class="data-value itemroute-color"
                >{{ person.firstName }}</router-link
              >
            </div>
          </div>
          <div class="lastname data">
            <div class="data-con">
              <div class="data-text">
                <p>Lastname</p>
              </div>
              <router-link
                :to="`/tenant/people/add/${person.id}`"
                class="data-value itemroute-color"
                >{{ person.lastName }}</router-link
              >
            </div>
          </div>
          <div class="phone data">
            <div class="data-con">
              <div class="data-text">
                <p>Phone</p>
              </div>
              <router-link
                :to="`/tenant/people/add/${person.id}`"
                class="data-value itemroute-color"
                >{{ person.mobilePhone }}</router-link
              >
            </div>
          </div>
          <div class="action data action-icon">
            <div class="dropdown">
              <i
                class="fas fa-ellipsis-v cursor-pointer"
                id="dropdownMenuButton"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              ></i>
              <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <a class="dropdown-item elipsis-items" v-if="person.mobilePhone">
                  <router-link
                    :to="`/tenant/sms/compose?phone=${person.mobilePhone}`"
                    >Send SMS</router-link
                  >
                </a>
                <a class="dropdown-item elipsis-items" v-if="person.email">
                  <router-link
                    :to="`/tenant/email/compose?phone=${person.email}`"
                    >Send Email</router-link
                  >
                </a>
                <a class="dropdown-item elipsis-items">
                  <router-link :to="`/tenant/people/add/${person.id}`"
                    >Edit</router-link
                  >
                </a>
                <a
                  class="dropdown-item elipsis-items"
                  href="#"
                  @click.prevent="showConfirmModal(person.id, index)"
                  >Delete</a
                >
              </div>
            </div>
          </div>
        </div>
        <hr class="row-divider" />
        <!-- <div>{{ membershipSummary.maritalStatus }}</div> -->
      </div>
        </div>
        <div v-else>
          <div class="no-record text-center my-4">No member found</div>
        </div>
      </div>

      <div class="table-footer">
        <PaginationButtons @getcontent="getPeopleByPage" :itemsCount="membersCount" :currentPage="currentPage" />
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, computed } from "vue";
import ByGenderChart from "@/components/charts/PieChart.vue";
import ByMaritalStatusChart from "@/components/charts/PieChart.vue";
import PaginationButtons from "../../components/pagination/PaginationButtons.vue";
import axios from "@/gateway/backendapi";
import { useConfirm } from "primevue/useConfirm";
import { useToast } from 'primevue/usetoast';
import { useStore } from 'vuex';
import stopProgressBar from "../../services/progressbar/progress";

export default {
  props: ["list", "peopleCount"],
  components: {
    ByGenderChart,
    ByMaritalStatusChart,
    PaginationButtons,
  },

  setup(props) {
   
    const churchMembers = ref([]);
    const filterFormIsVissible = ref(false);
    const filter = ref({});
    const searchIsVisible = ref(false)
    const filterResult = ref([])
    const selectAll = ref(false)
    const noRecords = ref(false)
    const searchText = ref("")
    const store = useStore();
    // const selected = ref([])
    // const count = ref(churchMembers.length)

    // const selectAll = computed(() => {
      // selectedAll: {
      // set(val) {
      //   selected.value = []
        // if (val) {
          // for(let i = 1; i <= churchMembers.value; i++) {
          //   selected.value.push(i)
          // }
    //     }
    //   }
    //   get() {
    //     return selected.value.length === churchMembers.value
    //   // }
    // }
    // })
    

    const toggleFilterFormVissibility = () =>
      (filterFormIsVissible.value = !filterFormIsVissible.value);
    const membershipSummary = ref([]);

    const deleteMember = (id) => {
      
      axios
        .delete(`/api/People/DeleteOnePerson/${id}`)
        .then((res) => {
          console.log(res);
          churchMembers.value = churchMembers.value.filter(item => item.id !== id )
          toast.add({severity:'success', summary:'Confirmed', detail:'Member Deleted', life: 3000});
          store.dispatch("membership/removeMember", id)
          axios
            .get(`/api/People/GetMembershipSummary`)
            .then((res) => {
              console.log(res, "new chart");
              membershipSummary.value = res.data;
            })
            .catch((err) => {
              console.log(err)
              
            });
        })
        .catch((err) => {
          stopProgressBar();
          toast.add({severity:'error', summary:'Delete Error', detail:'Deleting member failed', life: 3000});
          console.log(err)
        });
    };

    const applyFilter = () => {
        // filterBoolean.value = false
        

        filter.value.filterFirstName = filter.value.filterFirstName == undefined ? "" : filter.value.filterFirstName
        filter.value.filterLastName = filter.value.filterLastName == undefined ? "" : filter.value.filterLastName
        filter.value.phoneNumber = filter.value.phoneNumber == undefined ? "" : filter.value.phoneNumber
    
         let url = "/api/People/FilterMembers?firstname="+filter.value.filterFirstName +"&lastname="+filter.value.filterLastName +"&phone_number="+ filter.value.phoneNumber +"&page=1"
      axios.get(url).then((res) => {
        noRecords.value = true
        filterResult.value = res.data
        console.log(res.data);
      }) .catch(err => console.log(err))
      
    };

    
    const clearAll = () => {
       filter.value.filterFirstName = ""
       filter.value.filterLastName = ""
       filter.value.filterDate = ""
       filter.value.phoneNumber = ""
      }

   const hide = () => {
      filterFormIsVissible.value = false
   }

   const disableBtn = computed(() => {
      if (!filter.value.filterFirstName && !filter.value.filterLastName && !filter.value.phoneNumber) return true;
      return false;
   })

   const toggleSearch = () => {
      searchIsVisible.value = !searchIsVisible.value
   }

   // onMounted(() => {
   //    console.log('working')
   //    confirm.require({
   //       message: "Are you sure?"
   //    })
   // })

    const confirm = useConfirm();
    let toast = useToast();
        const showConfirmModal = (id, index) => {
           
           confirm.require({
               message: 'Are you sure you want to proceed?',
                header: 'Confirmation',
                icon: 'pi pi-exclamation-triangle',
                acceptClass: 'confirm-delete',
                rejectClass: 'cancel-delete',
                accept: () => {
                    deleteMember(id, index)
                    
                },
                reject: () => {
                    // toast.add({severity:'info', summary:'Rejected', detail:'You have rejected', life: 3000});
                }

        });
        }
        
    const currentPage = ref(0);
    const getPeopleByPage = async (page) => {
      if (page < 0) return false;
      try {
        const { data } = await axios.get(
          `/api/People/GetPeopleBasicInfo?page=${page}`
        );
        filterResult.value = [ ];
        searchMember.value = [ ];
        noRecords.value = false;
        churchMembers.value = data;
        currentPage.value = page;
      } catch (error) {
        console.log(error);
      }
    };
    // const getMemberSummary = () => {

    // }

    // onBeforeUnmount(() => {
    axios
      .get(`/api/People/GetMembershipSummary`)
      .then((res) => {
        membershipSummary.value = res.data;
      })
      .catch((err) => console.log(err));
    // })

    onMounted(() => {
      console.log(props.list, "props");
      churchMembers.value = props.list;
      // store.dispatch('churchMembers', props.list)
    });

    const toggleSelect = () => {
      selectAll.value = !selectAll.value
    }

    const searchMember = computed(() => {
        if (searchText.value !== "") {
          return churchMembers.value.filter(i => {
            return i.firstName.toLowerCase().includes(searchText.value.toLowerCase())
          })
        } else {
          return churchMembers.value
        }
      })

    const membersCount = computed(() => {
      if (membershipSummary.value.totalMember > 100) return Math.ceil(membershipSummary.value.totalMember / 100);
      return 1;
    })

    return {
      churchMembers,
      getPeopleByPage,
      currentPage,
      filterFormIsVissible,
      toggleFilterFormVissibility,
      membershipSummary,
      deleteMember,
      filter,
      applyFilter,
      clearAll,
      hide,
      disableBtn,
      toggleSearch,
      searchIsVisible,
      showConfirmModal,
      // filterChurchMembers,
      filterResult,
      selectAll,
      toggleSelect,
      noRecords,
      searchText,
      searchMember,
      membersCount,

    };
  },
};
</script>

<style scoped>
* {
  box-sizing: border-box;
  color: #02172e;
}

.itemroute-color {
  color: #136acd;
}

a {
  text-decoration: none;
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
  box-shadow: 0px 3px 6px #2c28281c;
  /* border: 1px solid #00204424; */
  border-radius: 30px;
  width: 100% !important;
}

.summary-header {
  margin: -0.8rem 10px 0.5rem 10px;
  color: #136acd;
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
  /* border: 0.4000000059604645px solid #dde2e6; */
  padding: 0 8px;
  /* box-shadow: 0px 1px 4px #02172e45;
  box-shadow: 0px 1px 4px #02172e45;
  border: 1px solid #dde2e6; */
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
  font-weight: 700
}

.percent {
  color: #136acd;
}

/* .hr {
  border: 1px solid #0020440a;
  margin: 0 4px 10px 0;
} */

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

.chart1,
.chart2 {
  border-radius: 10px;
}

.picture .data-value {
  /* margin-left: 22px; */
  width: 50%;
}

.firstname .data-value {
  /* margin-left: -32px;
  margin-right: 3px; */
}

.lastname .data-value {
  /* margin-left: -41px;
  margin-right: 2px; */
}

.phone .data-value {
  /* margin-left: 38px; */
}

.label-search {
  width: 0;
  background: transparent;
  padding: 4px;
  overflow: hidden;
  transition: all 0.5 ease-in-out;
}
.label-search input {
  border: transparent;
  background: transparent;
  width: 70%;
  outline: none;
}

.label-search .search-btn {
  display: flex;
  align-items: center;
  background: #7894a6;
  padding: 4px;
  border-radius: 5px;
}

.label-search .empty-btn {
  display: flex;
  align-items: center;
  padding: 0 5px;
}

.table-top {
  font-weight: 800;
  font-size: 12px;
}

.table-top label:hover,
.table-top p:hover {
  cursor: pointer;
}

.show-search {
  width: 174px;
  overflow: hidden;
  transition: all 0.5 ease-in-out;
  border: 1px solid #dde2e6;
  border-radius: 5px 0px 0px 5px;
  background: #ebeff4;
  transition: all 0.5s ease-in-out;
}

.filter-options {
  height: 0;
  overflow: hidden;
  transition: all 0.5s ease-in-out;
}

.filter-options-shown {
  height: 130px;
  overflow: hidden;
  transition: all 0.5s ease-in-out;
}

.elipsis-items a {
  display: flex;
  justify-content: stretch;
}

.no-record {
  color: rgba(184, 5, 5, 0.726);
  font-size: 1.1em;
}

@media screen and (max-width: 500px) {
  .chart1,
  .chart2,
  .board,
  .chart-con {
    width: 100% !important;
  }

  .picture,
  .firstname,
  .lastname,
  .phone {
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
    /* Tosin */
    padding: 0 0 0 2rem;
  }
}

@media screen and (min-width: 500px) {
  .picture,
  .firstname,
  .lastname,
  .phone {
    /* width: 19%; */
  }

  .picture > p{
    margin-left: 43px;
  }

  .table-body .check {
    width: 4%;
  }

  .action {
    width: 20%;
  }
}

@media (max-width: 767px) {
   .filter-options-shown {
      height: 150px;
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
  /* .boards {
    flex-direction: column;
    align-items: center !important;
    flex-wrap: nowrap !important;
  }

  .chart-con {
    width: 85% !important;
  }

  .chart-con div {
    width: 40%;
  } */

  .board {
    width: 50% !important;
    margin-bottom: 10px;
  }

  .summary-header {
    width: 50%;
    margin-left: 26.5%
  }
}

@media screen and (max-width: 1024px) {
  .my-con {
    flex-direction: column;
  }

  .table {
    width: 100%;
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
</style>



