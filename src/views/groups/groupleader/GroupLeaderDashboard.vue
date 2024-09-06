<template>
<div class="container-top" :class="{ 'container-wide': lgAndUp || xlAndUp }">
        <div class="row">
          <div class="text-head col-12 font-weight-bold text-black h2">Leader Dashboard</div>
        </div>
        <div class="row mt-1">
            <div class="col-12">Quick Things you can do As a group leader</div>
          </div>
        <div class="row mt-5">
          <div class="d-flex justify-content-around flex-column flex-md-row align-items-center w-100">
            <router-link to="/tenant/peoplegroups">
              <div class="font-weight-700 mt-3 mt-md-0 cards"><i class="pi pi-list text-center pi-icons mr-3"></i>View Groups</div>
            </router-link>
            <router-link to="/tenant/groupleaderattendance">
            <div class="boxes border font-weight-700 mt-3 mt-md-0 bor-radius"><i class="pi pi-check text-center pi-icons mr-3"></i>Report & Attendance</div>
            </router-link>
          </div>
          <div class="d-flex justify-content-around flex-column flex-md-row align-items-center w-100 mt-md-4">
            <router-link to="/tenant/peoplegroups?actionType=sendsms">
            <div class="boxes border font-weight-700 mt-3 mt-md-0 bor-radius"><i class="pi pi-comment text-center pi-icons mr-3"></i>Send SMS</div>
            </router-link>
            <router-link to="/tenant/peoplegroups?actionType=sendemail">
            <div class="boxes border font-weight-700 mt-3 mt-md-0 bor-radius"><i class="pi pi-envelope text-center pi-icons mr-3"></i>Send Email</div>
            </router-link>
          </div>
          <!-- <div class="col-12 col-md-6 boxes">Groups</div>
          <div class="col-12 col-md-6 boxes">Mark Attendance</div>
          <div class="col-12 col-md-6 boxes">Send SMS</div>
          <div class="col-12 col-md-6 boxes">Send Email</div> -->
        </div>
    </div>
</template>

<script setup>
import deviceBreakpoint from '../../../mixins/deviceBreakpoint';


const { lgAndUp, xlAndUp } = deviceBreakpoint();
</script>

<style scoped>
.cards {
    background-color: #F2F4F7;
    border-radius: 8px;
    width: 200px;
    height: 200px
}

.pi-icons {
  background: #f1f5f8;
  width: 25px;
  border-radius: 50%;
  padding: 3px;
}

.bor-radius {
  border-radius: 25px
}
</style>