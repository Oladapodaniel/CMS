<template>
<div class="row container-top">
          <div class="col-12 table">
            <div class="top-con">
              <div class="table-top w-100 my-3 select-all  px-4">
                <!-- <div class="select-all col-1"></div> -->
                <div class="row w-100">
                      
                <div class="col-12 d-flex justify-content-center">
                  <p @click="toggleSearch" class=" mt-2 ">
                      <i class="pi pi-search"></i>{{!searchIsVisible ? 'SEARCH' : ""}}
                    </p>
                  <label
                    class="label-search d-flex m-auto m-sm-0 m-md-0"
                    :class="{ 'show-search': searchIsVisible, 'hide-search' : !searchIsVisible }"
                  >
                    <input
                      type="text"
                      placeholder="Search..."
                      v-model="searchText"
                    />
                    <span class="empty-btn" @click="removeSearchText">x</span>
                    <span class="search-btn">
                      <i class="pi pi-search"></i>
                    </span>
                  </label>
                </div>
                </div>
              </div>
            </div>
            <!-- <div
              class="filter-options"
              :class="{ 'filter-options-shown': filterFormIsVissible }"
            >
              <div class="container-fluid">
                <div class="row">
                  <div class="col-md-9">
                    <div class="row">
                      <div
                        class="col-12 col-sm-6 offset-sm-3 offset-md-0 form-group inp w-100"
                      >
                        

                        <input
                          type="text"
                          class="input w-100"
                          placeholder="Contribution"
                      
                        />
                      </div>

                      <div class="col-12 col-sm-6 form-group d-none d-md-block">
                        <input
                          type="date"
                          class="form-control input inp w-100"
                     
                        />
                      </div>
                    </div>

                    <div class="row">
                      <div class="col-12 col-sm-6 form-group d-none d-md-block">
                        <input
                          type="text"
                          class="input w-100"
                          placeholder="event"
            
                        />
                      </div>

                      <div class="col-12 col-sm-6 form-group d-none d-md-block">
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
                        ><i
                          class="fas fa-circle"
                          style="font-size: 4px"
                        ></i></span
                      ><a class="hide-link ml-2" @click="hide">Hide</a>
                    </span>
                  </div>
                </div>
              </div>
            </div> -->

           
            <div class="row table-header">
                <div class="col-sm-4 d-none d-sm-block">
                    NAME
                </div>
                    <div class="col-sm-3 d-none d-sm-block">
                    BANK
                </div>
                    <!-- <div class="col-sm-2 d-none d-sm-block">
                    AMOUNT
                </div> -->
                    <div class="col-sm-2 d-none d-sm-block">
                    DATE
                </div>
                    <div class="col-sm-2 d-none d-sm-block" >
                    STATUS
                </div>
            </div>
            <div class="table-body row" v-for="item in searchPaymentList" :key="item.id">
                <div class="col-6 d-block d-sm-none">
                <div class="col-sm-4">
                    NAME
                </div>
                    <div class="col-sm-3">
                    BANK
                </div>
                    <!-- <div class="col-sm-2">
                    AMOUNT
                </div> -->
                    <div class="col-sm-2">
                    DATE
                </div>
                    <div class="col-sm-2" >
                    STATUS
                </div>
            </div>
            <div class="col-6 col-sm-12">
                <div class="row">
                <div class="col-sm-4 text-right text-sm-left text-md-left ">
                    <router-link :to="`/tenant/payments/${item.id}`" class="itemroute-color">{{ item.name }}</router-link>
                </div>
                <div class="col-sm-3 text-right text-sm-left text-md-left">
                     <router-link :to="`/tenant/payments/${item.id}`" class="itemroute-color  ">{{ item.bankName }}</router-link>
                </div>
                <!-- <div class="col-sm-2">
                     <router-link :to="`/tenant/payments/${item.id}`" class="itemroute-color">{{ item.amount }}</router-link>
                </div> -->
                <div class="col-sm-2 text-right text-sm-left text-md-left">
                     <router-link :to="`/tenant/payments/${item.id}`" class="itemroute-color">{{ date(item.date) }}</router-link>
                </div>
                <div class="col-sm-2 text-right text-sm-left text-md-left" >
                     <router-link :to="`/tenant/payments/${item.id}`" class="itemroute-color">{{ item.isActive ? "Active" : "Inactive" }}</router-link>
                </div>
                <div class="col-sm-1 text-right text-sm-left text-md-left">
                    <div class="dropdown">
              <i
                class="fas fa-ellipsis-v cursor-pointer"
                id="dropdownMenuButton"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              ></i>
              <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <router-link :to="{ name: 'PaymentOption', params: { paymentId: item.id } }">
                <a class="dropdown-item elipsis-items">
                 View Details
                </a>
                </router-link>
                <router-link :to="{ name: 'PaymentTransaction', params: { editPayment: item.id } }">
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
            <div class="col-12">
                    <div class="table-footer">
                        <PaginationButtons  @getcontent="getPeopleByPage" :itemsCount="offeringCount" :currentPage="currentPage"/>
                    </div>
                </div>
            
            <ConfirmDialog />
            <Toast />
            
          </div>

    </div>

    
</template>

<script>
import { ref, computed } from 'vue'
import moment from "moment";
import { useConfirm } from "primevue/useconfirm";
import { useToast } from "primevue/usetoast";
import axios from "@/gateway/backendapi";
import finish from '../../services/progressbar/progress'
import PaginationButtons from "../../components/pagination/PaginationButtons.vue";
import formatDate from "../../services/dates/dateformatter"
export default {
    props: ['paymentList'],
    components: { PaginationButtons },
    setup (props, { emit }) {
        const filterFormIsVissible = ref(false);
        const searchIsVisible = ref(false);
        const banks = ref([])
        const loading = ref(false)
        const getPaymentGateway = ref([])

        let searchText = ref("");
          const searchPaymentList = computed(() => {
            if (searchText.value !== "" && props.paymentList.length > 0) {
              return props.paymentList.filter((i) => {
                return i.name.toLowerCase().includes(searchText.value.toLowerCase())
              })
            } else {
              return props.paymentList
            }

          });

           const removeSearchText = () => {
              searchText = "";
             }



        const toggleFilterFormVissibility = () =>
        (filterFormIsVissible.value = !filterFormIsVissible.value);

        const toggleSearch = () => {
        searchIsVisible.value = !searchIsVisible.value;
        };

        const getBanks = () => {
                loading.value = true
                axios
                    .get("/api/Financials/GetBanks")
                    .then((res) => {
                        loading.value = false
                    banks.value = res.data;
                    console.log(res.data);
                    props.paymentList.forEach(i => {
                        if (banks.value.findIndex(j => j.id === i.bankID) > 0) {
                           return i.bankName = banks.value.find(k => k.id === i.bankID).name
                       
                        }
                    })
                    
                //   getPaymentGatewa/tPaymentGateway.value)
                
      
                    })
                    .catch((err) => {
                        loading.value = false
                        console.log(err)
                    });

        };
          getBanks();

        const deleteOffering = (id) => {
            console.log(props.paymentList)

            axios
                .delete(`/api/PaymentForm/Delete?paymentFormID=${id}`)
                .then((res) => {
                console.log(res);
                toast.add({
                    severity: "success",
                    summary: "Confirmed",
                    detail: "Payment form deleted",
                    life: 3000,
                });
                emit('delete-payment', id)
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
          deleteOffering(id);
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

      const date = date => {
        return formatDate.monthDayYear(date)
      }

        return  {
            moment,searchPaymentList, showConfirmModal,searchText, removeSearchText, deleteOffering, filterFormIsVissible, toggleFilterFormVissibility, toggleSearch, searchIsVisible,banks,
            loading, getPaymentGateway, date
        }
    }
}
</script>

<style scoped>
.table-top {
  font-weight: 800;
  font-size: 12px;
}

.table-top label:hover,
.table-top p:hover {
  cursor: pointer;
}

.filter-options {
  height: 0;
  overflow: hidden;
  transition: all 0.5s ease-in-out;
}

.filter-options-shown {
  height: 120px !important;
  overflow: hidden;
  transition: all 0.5s ease-in-out;
}

@media screen and (max-width: 768px) {
  .filter-options-shown {
    height: 150px !important;
    overflow: hidden;
    transition: all 0.5s ease-in-out;
  }
}

header {
  background: #DDE2E6 0% 0% no-repeat padding-box;
  font: normal normal bold 13px/13px Nunito Sans;
  letter-spacing: 0px;
  color: #002044;
}

.header tr {
  color: #8898aa;
  font-size: 11px;
  box-shadow: 0px 3px 6px #2c28281c;
  background: #DDE2E6 0% 0% no-repeat padding-box;
}

.select-all input {
  margin: 0 8px 0 -5px !important;
}

.more-btn {
  background: #dde2e6;
}

.table-header {
    padding: 12px;
    color: black;
    box-shadow: none;
    font-size: 16px;
}

.table-body {
    padding: 12px;
    border-bottom: 1.5px solid #6d6d6d19
    

}

.itemroute-color {
  color: #136acd;
}

.itemroute-color:hover {
  text-decoration: none;
}
@media screen and (max-width: 660px) {

    .filter{
      width: 50%;
    }
    .table-top {
    font-weight: 800;
    font-size: 12px;
    display: flex;
    flex-wrap: wrap;
  }
}




</style>