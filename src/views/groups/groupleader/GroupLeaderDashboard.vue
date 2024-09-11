<template>
  <div class="container-top" :class="{ 'container-wide': lgAndUp || xlAndUp }">
    <div class="row">
      <div class="text-head col-12 font-weight-bold text-black h2">Leader Dashboard</div>
    </div>
    <div class="row mt-1">
      <div class="col-12">Quick Things you can do As a group leader</div>
    </div>
    <div class="mt-5 centralized">
      <div class="row">
        <div class="col-sm-4">
          <div class="cards w-100" @click="navigateToPage('/tenant/peoplegroups')">
            <div class="d-flex justify-content-between">
              <div class="card_icon_parent bg_one">
                <img src="../../../assets/usergroup_white.svg" class="card_icon" />
              </div>
              <div>
                <div class="s-20 font-weight-600">{{ groupSummary }}</div>
                <div>Total group{{ groupSummary > 1 ? 's' : '' }}</div>
              </div>
            </div>
            <div class="font-weight-600 s-20">View Groups</div>
          </div>
        </div>
        <div class="col-sm-4">
          <div class="cards w-100" @click="navigateToPage('/tenant/peoplegroups?actionType=sendsms')">
            <div class="d-flex justify-content-between">
              <div class="card_icon_parent bg_two">
                <img src="../../../assets/message_icon.svg" class="card_icon" />
              </div>
              <!-- <div>
                <div class="s-20 font-weight-600">16</div>
                <div>Total groups</div>
              </div> -->
            </div>
            <div class="font-weight-600 s-20">Send SMS</div>
          </div>
        </div>
        <div class="col-sm-4">
          <!-- <div class="cards w-100">
            <div class="d-flex justify-content-between">
              <div class="card_icon_parent">
                <img src="../../../assets/message_icon.svg" class="card_icon" />
              </div>
              <div>
                <div class="s-20 font-weight-600">16</div>
                <div>Total groups</div>
              </div>
            </div>
            <div class="font-weight-600 s-20">Send SMS</div>
          </div> -->
        </div>
        <div class="col-sm-4 mt-4">
          <div class="cards w-100" @click="navigateToPage('/tenant/peoplegroups?actionType=sendemail')">
            <div class="d-flex justify-content-between">
              <div class="card_icon_parent bg_three">
                <img src="../../../assets/envelop_icon.svg" class="card_icon" />
              </div>
              <!-- <div>
                <div class="s-20 font-weight-600">16</div>
                <div>Total groups</div>
              </div> -->
            </div>
            <div class="font-weight-600 s-20">Send Email</div>
          </div>
        </div>
        <div class="col-sm-4 mt-4">
          <div class="cards w-100" @click="navigateToPage('/tenant/groupleaderattendance')">
            <div class="d-flex justify-content-between">
              <div class="card_icon_parent bg_four">
                <img src="../../../assets/envelop_icon.svg" class="card_icon" />
              </div>
              <!-- <div>
                <div class="s-20 font-weight-600">16</div>
                <div>Total groups</div>
              </div> -->
            </div>
            <div class="font-weight-600 s-20">Attendance & Report</div>
          </div>
        </div>
     
        <div class="col-sm-4 mt-4">
          <!-- <div class="cards w-100">
            <div class="d-flex justify-content-between">
              <div class="card_icon_parent">
                <img src="../../../assets/envelop_icon.svg" class="card_icon" />
              </div>
              <div>
                <div class="s-20 font-weight-600">16</div>
                <div>Total groups</div>
              </div>
            </div>
            <div class="font-weight-600 s-20">Attendance & Report</div>
          </div> -->
        </div>
     
      </div>

      <!-- <div class="d-flex justify-content-around flex-column flex-md-row align-items-center w-100"> -->


<!-- 
        <router-link to="/tenant/groupleaderattendance">
          <div class="boxes border font-weight-700 mt-3 mt-md-0 bor-radius"><i
              class="pi pi-check text-center pi-icons mr-3"></i>Report & Attendance</div>
        </router-link>
      </div>
      <div class="d-flex justify-content-around flex-column flex-md-row align-items-center w-100 mt-md-4">
        <router-link to="/tenant/peoplegroups?actionType=sendsms">
          <div class="boxes border font-weight-700 mt-3 mt-md-0 bor-radius"><i
              class="pi pi-comment text-center pi-icons mr-3"></i>Send SMS</div>
        </router-link>
        <router-link to="/tenant/peoplegroups?actionType=sendemail">
          <div class="boxes border font-weight-700 mt-3 mt-md-0 bor-radius"><i
              class="pi pi-envelope text-center pi-icons mr-3"></i>Send Email</div>
        </router-link>
      </div> -->
      <!-- <div class="col-12 col-md-6 boxes">Groups</div>
          <div class="col-12 col-md-6 boxes">Mark Attendance</div>
          <div class="col-12 col-md-6 boxes">Send SMS</div>
          <div class="col-12 col-md-6 boxes">Send Email</div> -->
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue';
import deviceBreakpoint from '../../../mixins/deviceBreakpoint';
import router from '../../../router';
import store from '../../../store/store';


const groups = ref(store.getters["groups/groups"]);
const { lgAndUp, xlAndUp } = deviceBreakpoint();
const navigateToPage = (route) => router.push(route);

const groupSummary = computed(() => {
  if (groups.value && Array.isArray(groups.value)) return groups.value.length;
  return 0;
})

const getgroups = async () => {
      try {
        store.dispatch("groups/setGroups").then((response) => {
          groups.value = response.response.groupResonseDTO.map((i) => {
            return {
              dateCreated: i.dateCreated,
              description: i.description,
              name: i.name,
              id: i.id,
              tenantID: i.tenantID,
              peopleInGroupsCount: i.peopleInGroupsCount,
              children: i.children,
            };
          });
        });
      } catch (error) {
          console.log(error.response);
      }
    };
    if (!groups.value || groups.value.length === 0) getgroups();

    
</script>

<style scoped>
.cards {
  background-color: #F2F4F7;
  border-radius: 8px;
  width: 200px;
  height: 200px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  cursor: pointer;
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

.card_icon_parent {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: #FF5906;
  display: flex;
  justify-content: center;
  align-items: center;
}

.card_icon_parent.bg_one {
  background-color: #FF5906;
}

.card_icon_parent.bg_two {
  background-color: #0B55D4;
}
.card_icon_parent.bg_three {
  background-color: #454545;
}
.card_icon_parent.bg_four {
  background-color: #08A53D;
}

.card_icon {
  width: 30px;
  height: 30px;
}

.centralized {
  width: 80%; 
  margin: auto;
}
</style>