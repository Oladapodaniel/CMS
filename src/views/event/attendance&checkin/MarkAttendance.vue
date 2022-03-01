<template>
  <div class="container-fluid">
    <Dialog
      header="Create New Member"
      v-model:visible="display"
      :style="{ width: '70vw', maxWidth: '600px' }"
      :modal="true"
      position="top"
    >
      <div class="row">
        <div class="col-md-8">
          <NewMember @cancel="() => display = false" @refresh="refresh"/>
        </div>
      </div>
    </Dialog>
    <div class="row my-5" :class="{ 'd-none': isKioskMode }">
      <div class="col-md-12">
        <h4 class="font-weight-bold">Manual Check-in and Checkout</h4>
        <p class="small-text">
          Checkin members by clicking on the check-in box and check-out box to checkout, search for members in group and use kiosk mode on mobile phones and tablets
        </p>
      </div>
    </div>

    <div class="row">
      <div class="col-md-">
        <Toast />
      </div>
    </div>
    <div class="row over-con">
      <div class="col-md-12 py-4">
        <div class="row">
          <div class="col-md-8">
            <p class="search-span px-2">
              <i class="pi pi-search p-2" style="height: 30px; width: 30px"></i>
              <input
                type="text"
                class="search-control"
                placeholder="Search"
                v-model="searchText"
              />
            </p>
          </div>
          <div class="col-md-4 d-md-flex justify-content-end d-none">
            <button
              class="default-btn kiosk-mode font-weight-700"
              @click="enterKioskMode"
            >
              {{ kioskButtonText }} kiosk mode
            </button>
          </div>
        </div>

        <div
          class="row mt-4 main-th font-weight-700 py-2 grey-rounded-bg"
          :class="{ 'kiosk-th-size': isKioskMode }"
        >
        
          <div class="col-md-3" :class="{ 'order-3': isKioskMode }">Name</div>
          <div class="col-md-3" :class="{ 'order-4': isKioskMode }">Phone</div>
          <div class="col-md-2" :class="{ 'order-5': isKioskMode }">Registered</div>
           
            
          <div
            class="col-md-2 d-none"
            :class="{ 'd-flex order-2': isKioskMode }"
          >
            Picture
          </div>
          <!--  :class="{ 'd-flex order-2': isKioskMode }" -->
          <div class="col-md-2" :class="{ 'order-1': isKioskMode }">
            Check in
          </div>
          <div class="col-md-2" :class="{ 'd-none': isKioskMode }">
            Check out
          </div>
       
          
        </div>

        <div class="row pt-2" :class="{ 'kiosk-tb-size': isKioskMode }">
              <Suspense>
                <template #default>
                    <TableData :isKiosk="isKioskMode" @refreshed="refreshed" :fetchUsers="fetchUsers" :attendanceId="attendanceID" :searchText="searchText" />
                </template>
                <template #fallback>
                    <div class="row">
                      <div class="col-md-12 pl-4">Loading...</div>
                    </div>
                </template>
            </Suspense>
        </div>

        <!-- Modal -->
        <div
          class="modal fade"
          id="exampleModal"
          tabindex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title font-weight-bold" id="exampleModalLabel">
                  Add Member
                </h5>
                <button
                  type="button"
                  class="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <div class="row my-4">
                  <div class="col-md-4 text-md-right">
                    <label for="" class="font-weight-600">Name</label>
                  </div>
                  <div class="col-md-7">
                    <div class="dropdown">
                      
                      <input
                        type="text"
                        class="form-control"
                        id="dropdownMenuButton"
                        data-toggle="dropdown"
                        v-model="userSearchString"
                        @input="searchForUsers"
                      />
                      <div
                        class="dropdown-menu w-100"
                        aria-labelledby="dropdownMenuButton"
                      >
                        <div class="row w-100 mx-auto" v-if="false">
                          <div class="col-md-12">
                            <input
                              type="text"
                              class="form-control"
                              placeholder="Find event"
                            />
                          </div>
                        </div>

                        <a
                          class="dropdown-item font-weight-700 small-text"
                          href="#"
                          v-for="(member, index) in searchedMembers"
                          :key="index"
                          @click="addExistingMember(member)"
                          >{{ member.name }}</a
                        >
                        <a
                          class="dropdown-item font-weight-700 small-text"
                          href="#"
                          v-if="
                            searchingForMembers && searchedMembers.length === 0
                          "
                          ><i class="pi pi-spin pi-spinner"></i
                        ></a>
                        <p
                          class="modal-promt pl-1 bg-secondary m-0"
                          v-if="
                            userSearchString.length < 3 &&
                            searchedMembers.length === 0
                          "
                        >
                          Enter 3 or moore characters
                        </p>
                        <a
                          class="font-weight-bold small-text d-flex justify-content-center py-2 text-decoration-none primary-text c-pointer"
                          style="border-top: 1px solid #002044; color: #136acd"
                          @click="showAddMemberForm"
                          data-dismiss="modal"
                        >
                          <i
                            class="pi pi-plus-circle mr-2 primary-text d-flex align-items-center"
                            style="color: #136acd"
                          ></i>
                          Add new member
                        </a>
                      </div>
                    </div>

                    <div class="row mt-4">
                      <div class="col-md-6 d-md-flex justify-content-end">
                        <button class="default-btn" data-dismiss="modal">Cancel</button>
                      </div>
                      <div class="col-md-6">
                        <button
                          class="default-btn primary-bg border-0 text-white"
                          data-dismiss="modal"
                          @click="sendExistingUser"
                        >
                          Save
                        </button>
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
import { computed, ref } from "vue";
import { useRoute } from "vue-router";
import NewMember from "../../../views/event/attendance&checkin/NewMember";
import TableData from "../../../components/attendance/EventAttendanceList";
import membershipService from "../../../services/membership/membershipservice";
import attendanceservice from '../../../services/attendance/attendanceservice';
import { useToast } from 'primevue/usetoast';

export default {
    props: [ "attendanceID" ],
  components: { NewMember, TableData },
  setup() {
    const toast = useToast();
    const isKioskMode = ref(false);
    const route = useRoute();
    const display = ref(false);
    const searchingForMembers = ref(false);
    const searchText = ref("");
    const fetchUsers = ref(false);

    const enterKioskMode = () => {
      isKioskMode.value = !isKioskMode.value;
      route.query.mode = "kiosk";
    };

    const kioskButtonText = computed(() => {
      return isKioskMode.value ? "Exit" : "Launch";
    });

    const showAddMemberForm = () => {
      display.value = true;
    };

    const searchedMembers = ref([]);

    const userSearchString = ref("");
    const searchForUsers = () => {
      if (userSearchString.value.length >= 3) {
        startSearch(userSearchString.value);
      }
    };

    const startSearch = async (str) => {
      try {
        searchingForMembers.value = true;
        const response = await membershipService.searchMembers(str);
        searchingForMembers.value = false;
        searchedMembers.value = response;
      } catch (error) {
        searchingForMembers.value = false;
        console.log(error);
      }
    };
    
    const personData = ref({ });
    const addExistingMember = (member) => {
      userSearchString.value = member.name;
      personData.value = {
        person: {
          personId: member.id
        },
        checkInChannel: 0,
        checkInAttendanceID: route.query.id
      }
      console.log(personData);
    }

    const sendExistingUser = async () => {
      console.log(personData.value)
      const response = await attendanceservice.checkin(personData.value);
      if (response) {
        searchText.value = "";
        toast.add({severity:'success', summary:'Checked-in', detail:'Checkin was successful', life: 3000});
        refresh();
      } else {
        toast.add({severity:'error', summary:'Checkin Error', detail:'Checkin was not successful', life: 3000});
      }
    }

    // const getRegisteredPeople = async (id) => {
    //   try {
    //     const response = await attendanceservice.getReport(id);
    //     console.log(response, "REPORT");
    //     people.value = response.peopoleAttendancesDTOs;
    //   } catch (error) {
    //     console.log(error);
    //   }
    // };

    // getRegisteredPeople(route.query.id);
    const refresh = () => {
      searchText.value = "";
      fetchUsers.value = true;
    }

    const refreshed = () => {
      fetchUsers.value = false;
    }

    return {
      isKioskMode,
      enterKioskMode,
      kioskButtonText,
      display,
      showAddMemberForm,
      searchForUsers,
      userSearchString,
      searchedMembers,
      searchingForMembers,
      searchText,
      addExistingMember,
      sendExistingUser,
      refresh,
      fetchUsers,
      refreshed,
    };
  },
};
</script>

<style scoped>
* {
  color: #02172e;
  /* font-family: Nunito Sans !important; */
}

.hide {
  display: none !important;
}

@media screen and (max-width: 767px) {
  .main-th {
    display: none;
  }

  .hide {
    display: flex !important;
  }
}

.search-control {
  width: calc(100% - 30px);
  padding: 0.38rem;
  border: none;
  background: transparent;
  outline: transparent;
}

.search-span {
  background: #f5f8f9;
  border-radius: 200px;
  width: 100%;
}

.kiosk-mode {
  background: #dde2e6;
  border-radius: 20px;
  border: transparent;
}

.main-th {
  background: #f5f8f9;
  border: 1px solid #4762f01f;
}

.tb-row {
  border-bottom: 1px solid #4762f01f;
}

.over-con {
  border: 1px solid #4762f01f;
}

.kiosk-th-size {
  font-size: 20px;
}

.kiosk-tb-size {
  font-size: 18px;
}

.modal-lg {
  max-width: 600px;
}
</style>