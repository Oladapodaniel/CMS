<template>
    <div class="col-12">
        <div class="row table">
      <div class="col-12 px-0" id="table">
        <div class="top-con">
          <div class="table-top">
       
            <div class="filter col-2">
              <!-- <p @click="toggleFilterFormVissibility" class="mt-2">
                <i class="fas fa-filter"></i>
                FILTER
              </p> -->
            </div>
            <div class="col-2">
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
                />
                <span class="empty-btn">x</span>
                <span class="search-btn">
                  <i class="pi pi-search"></i>
                </span>
              </label>
            </div>
          </div>
        </div>
        <div
          class="filter-options"
          :class="{ 'filter-options-shown': filterFormIsVissible }"
          id="ignore1"
        >
          <div class="container-fluid">
            <div class="row">
              <div class="col-md-9">
                <div class="row">
                  <div
                    class="col-12 col-sm-6 col-md-4 offset-sm-3 offset-md-0 form-group inp w-100"
                  >
                    <!-- <div class="input-field"> -->

                    <input
                      type="text"
                      class="input w-100"
                      placeholder="Offering"
         
                    />
                  </div>

                  <!-- <div class="col-12 col-md-4 form-group d-none d-md-block">
                    <input
                      type="text"
                      class="input w-100"
                      placeholder="event"
                      v-model="filter.event"  
                    />
                  </div> -->

                  <div class="col-12 col-md-4 form-group d-none d-md-block">
                    <input
                      type="text"
                      class="input w-100"
                      placeholder="donor"
             
                    />
                  </div>
                </div>
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

       <!-- v-if="searchContribution.length > 0" -->
        <div >
          <div class="container-fluid d-none d-md-block">
            <div class="row t-header">
       
                <!-- <div class="col-md-1 px-3"></div> -->
                <div class="small-text text-capitalize col-md-3 font-weight-bold">Date</div>
                <div class="small-text text-capitalize col-md-3 font-weight-bold">Family Name</div>
                <div class="small-text text-capitalize col-md-3 font-weight-bold">Email</div>
                <div class="small-text text-capitalize col-md-2 font-weight-bold">Phone</div>
                <div class="small-text text-capitalize col-md-1 font-weight-bold">Action</div>
   
            </div>
          </div>
          <!-- v-for="(item, index) in searchContribution"
              :key="item.id" -->
        <div class="row" style="margin:0;">
            <div
              class="col-12 parent-desc py-2 px-0 c-pointer hover"
              
            >
            
              <div class="row w-100 tr-border-bottom " style="margin:0" v-for="item in searchFamily" :key="item.id">
                <!-- <div class="col-md-1 d-flex d-md-block px-3 justify-content-end py-2">
                  <input
                    type="checkbox"
               
                    class="form-check"
                  />
                </div> -->
                <div class="desc small-text col-md-3 py-2">
                  <p class="mb-0 d-flex justify-content-between">
                    <span class="text-dark font-weight-bold d-flex d-md-none">Date</span>
                    <span class="text-decoration-none c-pointer" @click="moveToEdit(item.fatherID ? item.fatherID : item.motherID)">{{ formatDate(item.dateCreated) }}</span>
                  </p>
                </div>

                <div class="col-md-3 py-2">
                  <div class="d-flex justify-content-between">
                    <span class="text-dark font-weight-bold d-flex d-md-none">Family Name</span>
                  <div>
                    
                    <div class="desc small-text text-right text-md-left c-pointer" @click="moveToEdit(item.fatherID ? item.fatherID : item.motherID)">{{ item.familyName }}</div>
                  </div>
                  </div>
                </div>

                <div class="desc-head small-text col-md-3 py-2">
                  <p class="mb-0 d-flex justify-content-between">
                    <span class="text-dark font-weight-bold d-flex d-md-none">Email</span>
                    <!-- <span>{{ amountWithCommas(Math.abs(item.amount)) }}</span> -->
                    <span @click="moveToEdit(item.fatherID ? item.fatherID : item.motherID)" class=" c-pointer">{{ item.email }}</span>
                  </p>
                </div>

                <div class="small-text col-md-2 py-2">
                  <p class="mb-0 d-flex justify-content-between">
                    <span class="text-dark font-weight-bold d-flex d-md-none">Phone Number</span>
                    <span @click="moveToEdit(item.fatherID ? item.fatherID : item.motherID)"><span class=" c-pointer"
                    >{{ item.homePhone }}</span
                  ></span>
                  </p>
                </div>

                <div class="small-text col-md-1 py-2">
                  <!-- <p class="mb-0 d-flex justify-content-between">
                    <span class="text-dark font-weight-bold d-flex d-md-none">Mark</span>
                    <span>Marked</span>
                  </p> -->
                  <div class="action data action-icon">
                    <div class="dropdown">
                      <i
                        class="fas fa-ellipsis-v cursor-pointer"
                        id="dropdownMenuButton"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                        style="font-size: 1.6em;"
                      ></i>
                      <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        <!-- <router-link to="">
                          <a class="dropdown-item elipsis-items">
                            View Report
                          </a>
                      </router-link> -->
                      
                      <router-link :to="{ name: 'AddFamily', params: { familyId: item.fatherID ? item.fatherID : item.motherID } }">
                        <a class="dropdown-item elipsis-items">
                      Edit
                      </a>
                      </router-link>
                      <a
                        class="dropdown-item elipsis-items cursor-pointer"
                        @click="showConfirmModal(item.id)"
                        >Delete</a
                      >
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- <div class="text-danger">No records found</div> -->

        

        <div class="col-12">
          <div class="table-footer">
            <!-- <Pagination
              @getcontent="getPeopleByPage"
              :itemsCount="50"
              :currentPage="currentPage"
              :totalItems="totalItem"
            /> -->
          </div>
  
        </div>

        <ConfirmDialog />
        <Toast />
      </div>
    </div>
    </div>
</template>

<script>
import { ref, computed } from 'vue'
import dateFormatter from '../../services/dates/dateformatter'
import { useConfirm } from "primevue/useconfirm";
import { useToast } from "primevue/usetoast";
import axios from "@/gateway/backendapi"
import finish from "../../services/progressbar/progress";
import router from '../../router';
// import Pagination from "../../components/pagination/PaginationButtons";
export default {
    
    props: ['familyList'],
    components: {
        // Pagination
    },
    setup (props, { emit }) {
        const searchText = ref("")
        const searchIsVisible = ref(false);

        const toggleSearch = () => {
        searchIsVisible.value = !searchIsVisible.value;
        };

        const formatDate = (date) => {
            return dateFormatter.monthDayYear(date)
        }

        const searchFamily = computed(() => {
            if(props.familyList.length === 0 && searchText.value === "") return props.familyList
            return props.familyList.filter(i => i.familyName.toLowerCase().includes(searchText.value.toLowerCase()))
        })

        const deleteFamily = (id) => {
        axios
            .delete(`/api/Family/deleteFamily?id=${id}`)
            .then((res) => {
            console.log(res); 
                toast.add({
                    severity:'success', 
                    summary:'Confirmed', 
                    detail:'Family Deleted', 
                    life: 3000
                });
                let listFiltered = props.familyList.filter(i => i.id !== id)
                emit("list-filtered", listFiltered)
            })
            .catch((err) => {
                console.log(err)
            finish();
            });
        };

        const confirm = useConfirm();
        let toast = useToast();
        const showConfirmModal = (id) => {
        confirm.require({
            message: "Are you sure you want to proceed?",
            header: "Confirmation",
            icon: "pi pi-exclamation-triangle",
            acceptClass: "confirm-delete",
            rejectClass: "cancel-delete",
            accept: () => {
            deleteFamily(id);
            
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

        const moveToEdit = (id) => {
          router.push({ name: 'AddFamily', params: { familyId: id } })
        }

        return {
            formatDate,
            searchFamily,
            searchText,
            searchIsVisible,
            toggleSearch,
            showConfirmModal,
            deleteFamily,
            moveToEdit
        }
    }
}
</script>

<style scoped>
.t-header {
  background: #dde2e6 0% 0% no-repeat padding-box;
  font-size: 16px;
  padding: .5rem 0;
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

.parent-desc.first {
  color: #8898aa;
  font-size: 14px;
  font-weight: 600;
  box-shadow: 0px 3px 6px #2c28281c;
  background: #dde2e6 0% 0% no-repeat padding-box;
}

.tr-border-bottom {
    border-bottom: 1px solid #4762f01f;
}

</style>