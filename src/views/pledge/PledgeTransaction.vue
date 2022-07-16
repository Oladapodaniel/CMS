<template>
    <div class="container-fluid">
        <div class="container-fluid">
          <div class="row   mt-5">
            <div class="col-md-6 ">
              <div class="font-weight-bold fontfamily">Invoices</div>
              <Toast />
              <ConfirmDialog />
              
            </div>
            <div class=" col-md-6 d-flex head-button mt-2 my-1 link">
              <div class="font-weight-bold pt-2 pr-1 ">What's new</div>
              <div class=" cursor-pointer grey-border primary-btn default-btn primary-bg border-0 small-screen "> Create an invoice </div>
            </div>
            <div class="col-md-12 ">
              <hr class="hr my-3" />
            </div>
            
          </div>
          <div class="container-fluid">
            <!-- <div class="row table px-3 py-4 ">
                <div class="col-md-1">
                    <div>Logo</div>
                </div>
                <div class="col-md-10">
                    <div class="col-md-12 font-weight-bold ">Boost your cash flow with customer payment plans</div>
                    <div class="col-md-12 " style="font-size: 14px;">Customers pay recurring invoices faster. Now it's easy to break payments into equal installments! <span class="text-primary">Show me more</span> </div>
                </div>
                <div class="col-md-1    pt-2">
                    <div class="cursor-pointer  font-weight-bold d-flex text-primary border border-primary default-bt justify-content-center  ">Dismiss</div>
                </div>
            </div> -->
            <div class="row border py-3 px-2 mt-3 rounded">
                <div class="col-md-5">
                    <div class="text-secondary font-weight-bold small">Overdue</div>
                    <div>N 1,439,700 <span class="text-secondary small ">NGN</span> </div>
                    <div class="small text-secondary"> Last updated on July 9, 2022 at 1:07PM GMT+1</div>
                </div>
                <div class="col-md-4">
                    <div class="text-secondary font-weight-bold small">Due within next 30days </div>
                    <div> N 0.00 <span class="text-secondary small ">NGN</span></div>
                </div>
                <div class="col-md-3 ">
                    <div class="font-weight-bold small text-secondary">Average time to get paid</div>
                    <div> 21<span class="text-secondary small">days</span></div>
                </div>
            </div>
          </div>
          <!-- <div class="container-fluid"> -->
            <div class="row mt-4">
                <div class="col-md-12 mt-3 d-flex">
                    <div><span class="font-weight-bold bg-secondary rounded-circle py-1 px-2 border">0</span></div>
                    <div class="col-md-5">active filters</div>
                </div>
            </div>
            <div class="row mt-4">
                <div class="col-md-3">
                     <Dropdown v-model="selectedPledge" class="w-100 font-weight-normal" :options="allPledgeType"  optionLabel="name" placeholder="All customers" />
                </div>
                <div class="col-md-2">
                     <Dropdown v-model="selectedPledge" class="w-100 font-weight-normal" :options="allPledgeType"  optionLabel="name" placeholder="All statuses" />
                </div>
                <div class="col-md-2">
                      <Calendar dateFormat="dd/mm/yy" placeholder="From"  class="w-100" id="icon" v-model="startDate" :showIcon="true" />
                </div>
                <div class="col-md-2">
                      <Calendar dateFormat="dd/mm/yy" placeholder="To"  class="w-100" id="icon" v-model="endDate" :showIcon="true" />
                </div>
                <div class="col-md-3">
                    <div class="col-md-12 d-flex">
                        <input type="text" class="form-control " placeholder="Enter invoice #">
                        <span class="border cursor-pointer bg-secondary pt-2 px-3"><i class="pi pi-search"></i></span>
                    </div>
                </div>
            </div>
            <div class="container-fluid  mt-4">
              <div class="row mt-4">
                <div class="col-md-12 mt-3 d-flex ">
                    <div class="" style="width: 10%;">
                        <div>Upload <span class="font-weight-bold bg-secondary rounded-circle py-1 px-2 border">0</span></div>
                    </div>
                    <div class=" " style="width: 10%;">
                        <div>Draft <span class="font-weight-bold bg-secondary rounded-circle py-1 px-2 border">0</span></div>
                    </div>
                    <div class="" style="width: 10%;"> All invoice</div>
                </div>
              </div>
            </div>
            
            <div class="container-fluid d-none mt-4  d-md-block">
              <div class="row t-header mt-4 border-bottom pb-2">
                <div
                  class="small-text text-capitalize col-md-1 font-weight-bold"
                >
                  Status
                </div>
                <div
                  class="small-text text-capitalize col-md-2 font-weight-bold"
                >
                  Due
                </div>
                <div
                  class="small-text text-capitalize col-md-2 font-weight-bold"
                >
                  Date
                </div>
                <div
                  class="small-text text-capitalize col-md-1 font-weight-bold"
                >
                  Number
                </div>
                <div
                  class="small-text text-capitalize col-md-2 font-weight-bold"
                >
                  Customer
                    </div>
                <div
                  class="small-text text-capitalize Text-center col-md-2 font-weight-bold"
                >
                  Amount due
                </div>

                <div
                  class="small-text text-capitalize col-md-2  text-right font-weight-bold"
                >
                  Action
                </div>
              </div>
            </div>
            <div class="row" style="margin: 0">
              <div class="col-12 parent-desc pb-2 px-0">
                <div
                  class="
                    row
                    w-100
                    c-pointer
                    text-dark
                    border-top
                    py-2
                    hover
                    d-flex
                    align-items-center
                  "
                  style="margin: 0"
                >
                  <div
                    class="col-md-1 desc"
                    @click="pledgeClick(pledgelist.id)"
                  >
                    <p class="mb-0 d-flex text-danger font-weight-bold justify-content-between text-primary">
                      <span
                        class="
                          text-dark
                          font-weight-bold
                          d-flex d-md-none
                          fontIncrease
                        "
                        style="font-size: 15px"
                        >Status</span
                      >
                      Overdue
                    </p>
                  </div>
                  <!-- <div class="col-md-2 desc" @click="pledgeClick(pledgelist.id)">
                        <p class="mb-0 d-flex justify-content-between text-primary">
                          <span
                            class=" text-dark font-weight-bold d-flex d-md-none fontIncrease"
                          style="font-size:15px">Number</span>
                            {{ pledgelist.person.mobilePhone }}
                        </p>
                      </div> -->
                  <div
                    class="col-md-2 desc"
                    
                  >
                    <p class="mb-0 d-flex text-danger justify-content-between text-primary">
                      <span
                        class="
                          text-dark
                          font-weight-bold
                          d-flex d-md-none
                          fontIncrease
                        "
                        style="font-size: 15px"
                        >Due</span
                      >
                     1098 days ago
                    </p>
                  </div>
                  <div
                    class="col-md-2 desc"
                    @click="pledgeClick(pledgelist.id)"
                  >
                    <p class="mb-0 d-flex justify-content-between text-primary">
                      <span
                        class="
                          text-dark
                          font-weight-bold
                          d-flex d-md-none
                          fontIncrease
                        "
                        style="font-size: 15px"
                        >Date
                      </span>
                      2020-07-16
                    </p>
                  </div>
                  <div class="col-md-1">
                    <div
                      class="d-flex small justify-content-between text-primary"
                    >
                      <span
                        class="
                          text-dark
                          font-weight-bold
                          d-flex d-md-none
                          fontIncrease
                        "
                        style="font-size: 15px"
                        >Number</span
                      >
                      <div class="small-text text-right text-md-center">
                        25
                      </div>
                    </div>
                  </div>
                  <div class="col-md-2">
                    <div
                      class="d-flex small justify-content-between text-primary"
                    >
                      <span
                        class="
                          text-dark
                          font-weight-bold
                          d-flex d-md-none
                          fontIncrease
                        "
                        style="font-size: 15px"
                        >Customer</span
                      >
                      <div class="small-text text-right text-md-center">
                        Anderson Udokoro
                      </div>
                    </div>
                  </div>
                  <div class="col-md-2">
                    <div
                      class="d-flex small justify-content-between text-primary"
                    >
                      <span
                        class="
                          text-dark
                          font-weight-bold
                          d-flex d-md-none
                          fontIncrease
                        "
                        style="font-size: 15px"
                        >Amount due</span
                      >
                      <div class="small-text text-right text-md-center">
                        NGN 111,000.00
                      </div>
                    </div>
                  </div>

                  <div class="col-md-2">
                    <div class="d-flex">
                      <span
                        class="
                          text-dark
                          font-weight-bold
                          
                          fontIncrease
                        "
                        style="font-size: 15px"
                        >Send reminder</span
                      >
                      <div class="dropdown pt-1">
                        <span class="d-flex justify-content-between">
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
                            </div>
                          </span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          <!-- </div> -->
        </div>
    </div>
</template>

<script>
import { ref, computed } from 'vue'
import Dropdown from "primevue/dropdown";
import Calendar from "primevue/calendar";
export default {
    components:{
        Dropdown,
        Calendar
    },

    setup() {
        const startDate = ref("");
        const endDate = ref("");
        

        return {
            startDate,
            endDate
        }
    },
}
</script>

<style scoped>
.fontfamily {
  font: normal normal 800 29px Nunito sans;
}

.head-button {
  display: flex;
  justify-content: flex-end;
}
.table {
  width: 100% !important;
  box-shadow: 0px 1px 3px #02172e45;
  border: 1px solid #dde2e6;
  border-radius: 15px;
  text-align: left;
  margin-bottom: auto !important;
}

.default-bt {
  font-weight: 600;
  white-space: initial;
  font-size: 0.8rem;
  border-radius: 1.25rem;
  border: 1px solid #999fa5;
  padding: 0.3rem 0.1rem;
  width: auto;
  /* border: none; */
  /* outline: transparent !important; */
  max-height: 40px;
  background: #ffffff47 !important;
  min-width: 65px;
}

@media (max-width: 577px) {
  .head-button {
    flex-direction: column;
    align-items: center;
  }
}
@media (max-width: 767px) {

  .head-button {
    display: flex;
    justify-content: center
  }
 }

 @media (max-width: 575px) {
  .head-button {
    display: flex;
    justify-content: center;
  }
}
</style>