<template>
  <div class="container-fluid mt-5" @click="closeDropdownIfOpen">
    <div class="row mb-4">
      <div class="col-md-12">
        <h4>Add Attendance</h4>
      </div>
      <Dialog
        header="Create Event Category"
        v-model:visible="display"
        :style="{ width: '70vw', maxWidth: '600px' }"
        :modal="true"
        position="top"
      >
        <div class="row">
          <div class="col-md-12">
            <CreateEventModal @new-created="newCategoryCreated" @closeeventmodal="closeModal" />
          </div>
        </div>
      </Dialog>
    </div>

    <div class="row">
      <div class="col-md">
        <div class="modal" tabindex="-1" role="dialog" id="newActModal" :data-toggle="showBtModal">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title">Create Event</h5>
                <button
                  type="button"
                  class="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body" data-toggle="modal">
                <div class="row my-4">
                  <div class="col-md-4 text-md-right">
                    <label for="" class="font-weight-600">Event category</label>
                  </div>
                  <div class="col-md-7">
                    <div class="dropdown">
                      <button
                        class="default-btn w-100 text-left pr-1"
                        type="button"
                        style="
                          border-radius: 4px;
                          border: 1px solid #ced4da;
                          color: #6c757d;
                        "
                        id="dropdownMenuButton"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                      >
                        {{ selectedCategoryName }}
                        <i
                          class="pi pi-chevron-down manual-dd-icon float-right pr-1"
                        ></i>
                      </button>
                      <div
                        class="dropdown-menu w-100"
                        aria-labelledby="dropdownMenuButton"
                        style="max-height: 350px;overflow-y:auto"
                      >
                        <div class="row w-100 mx-auto">
                          <div class="col-md-12">
                            <input
                              type="text"
                              class="form-control"
                              placeholder="Find event"
                              v-model="categorySearchText"
                            />
                          </div>
                        </div>

                        <a
                          class="dropdown-item font-weight-700 small-text py-2 c-pointer"
                          v-for="(category, index) in filteredCategories"
                          :key="index"
                          @click="selectCategory(category)"
                          >{{ category.name }}</a
                        >

                        <!-- Hidden -->
                        <a
                          class="font-weight-bold small-text d-flex justify-content-center py-2 text-decoration-none primary-text c-pointer"
                          style="border-top: 1px solid #002044; color: #136acd"
                          data-dismiss="modal"
                          @click="() => (display = true)"
                        >
                          <i
                            class="pi pi-plus-circle mr-2 d-flex align-items-center c-pointer"
                            style="color: #136acd"
                          ></i>
                          Create new event
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="row">
                  <div class="col-md-4 text-md-right">
                    <label for="">Event date</label>
                  </div>
                  <div class="col-md-7">
                    <input type="date" class="form-control" v-model="newAcctivityDate" />
                  </div>
                </div>

                <div class="row py-2 mt-4">
                  <div class="col-md-4 text-md-right">
                    <label for=""></label>
                  </div>
                  <div class="col-md-7 d-flex justify-content-center">
                    <button
                      class="default-btn mr-2"
                      data-dismiss="modal"
                    >
                      Cancel
                    </button>
                    <button
                      class="default-btn primary-bg border-0 ml-2 text-white"
                      @click="createNewActivity"
                      data-dismiss="modal"
                      :data-toggle="showBtModal"
                      ref="popModal"
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

    <div class="row">
      <div class="col-md-12">
        <div class="row my-4">
          <div class="col-sm-3 col-md-4 col-lg-4 text-sm-right">
            <label for="" class="font-weight-600">Event</label>
          </div>
          <div class="col-sm-7 col-md-6 col-lg-5">
            <div class="dropdown">
              <button
                class="default-btn w-100 text-left pr-1"
                type="button"
                style="
                  border-radius: 4px;
                  border: 1px solid #ced4da;
                  color: #6c757d;
                "
                id="dropdownMenuButton"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                {{
                  !selectedEvent.name
                    ? "Select from events and activities"
                    : selectedEvent.name.length > 27
                    ? `${selectedEvent.name.slice(0, 27)}...`
                    : selectedEvent.name
                }}
                <i
                  class="pi pi-chevron-down manual-dd-icon float-right pr-1"
                ></i>
              </button>
              <div
                class="dropdown-menu w-100"
                aria-labelledby="dropdownMenuButton"
                style="max-height: 350px;overflow-y:auto"
              >
                <div class="row w-100 mx-auto" v-if="events.length > 5">
                  <div class="col-md-12">
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Find event"
                      v-model="eventSearchText"
                    />
                  </div>
                </div>

                <a
                  class="dropdown-item font-weight-700 small-text py-2 c-pointer"
                  v-for="(event, index) in filteredEvents"
                  :key="index"
                  @click="selectEvent(event)"
                  >{{ event.name }}</a
                >
                <!-- Hidden -->
                <a
                  class="font-weight-bold small-text d-flex justify-content-center py-2 text-decoration-none primary-text"
                  style="border-top: 1px solid #002044; color: #136acd"
                  href="#"
                  data-toggle="modal" data-target="#newActModal" ref="openModalBtn"
                >
                  <i
                    class="pi pi-plus-circle mr-2 d-flex align-items-center"
                    style="color: #136acd"
                  ></i>
                  Create new event
                </a>
              </div>
            </div>
          </div>
        </div>
        <div class="row my-3">
          <div class="col-sm-3 col-md-4 col-lg-4 text-sm-right">
            <label for="" class="font-weight-600">Group</label>
          </div>
          <div class="col-sm-7 col-md-6 col-lg-5">
            <button
                class="
                  form-control
                  d-flex
                  justify-content-between
                  align-items-center
                  exempt-hide
                "
                @click="setGroupProp"
              >
                <span class="exempt-hide">
                  <span
                    v-if="selectedGroups.length > 0 && selectedGroups.length <= 2"
                  >
                    <span v-for="item in selectedGroups" :key="item.id"
                      ><span class="eachGroup">{{ item.name }}</span></span
                    >
                  </span>
                  <span
                    v-if="selectedGroups.length > 0 && selectedGroups.length > 2"
                  >
                    <span
                      v-for="item in selectedGroups.slice(0, 2)"
                      :key="item.id"
                      ><span class="eachGroup">{{ item.name }}</span></span
                    >
                    ...
                  </span>
                  <span v-if="selectedGroups.length === 0">Select group</span>
                </span>
                <i class="pi pi-chevron-down exempt-hide"></i>
              </button>
              <div
                class="div-card p-2 exempt-hide"
                :class="{
                  'd-none': hideDiv,
                  'd-block': !hideDiv,
                }"
              >
                <i
                  class="pi pi-spin pi-spinner text-center exempt-hide"
                  v-if="grouploading && groups.length === 0"
                ></i>
                <input
                  type="text"
                  class="form-control exempt-hide"
                  v-model="searchGroupText"
                  ref="searchGroupRef"
                  placeholder="Search for group"
                />
                <GroupTree :items="searchForGroups" :addGroupValue="true"/>
              </div>
            <!-- <MultiSelect v-model="selectedGroups" :options="groups" optionLabel="name" placeholder="Select group" display="chip" class="w-100" /> -->

            <!-- <Dropdown
              v-model="selectedGroup"
              :options="groups"
              optionLabel="name"
              placeholder="Select group"
              :filter="false"
              filterPlaceholder="Search grouped contacts"
              style="width: 100%"
            /> -->
            <div class="row mt-5">
              <!-- <div class="col-md-12 d-flex justify-content-center">
                <button
                  class="default-btn primary-bg text-white border-0 contn-btn"
                  @click="onContinue"
                  :disabled="!selectedEvent.id || !selectedGroup.id"
                >
                  Save and Continue
                </button>
              </div> -->
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-12">
            <div class="d-flex justify-content-between">
              <h5 class="mt-2">More</h5>
                <hr style="width: 80%"/>
                <i class="pi pi-angle-up angle-icon mt-2" :class="{ 'rollIcon' : templateDisplay, 'closeIcon' : !templateDisplay }" @click="toggleTemplate" ></i>
            </div>
          </div>
        </div>

        <div class="row" :class="{ 'show-tem-free': templateDisplay && addFreeClass, 'show-tem' : templateDisplay && addPaidClass,'hide-tem' : !templateDisplay }">
          <div class="container-fluid">
            <div class="row my-3">

            <div class="col-sm-3 col-md-4 col-lg-4 text-sm-right align-self-center">
              <label for="" class="font-weight-600">Event Banner</label>
            </div>
            <div class="col-sm-5 col-md-3 col-lg-3 offset-md-1"  :class="{ 'img-border ' : imageUrl === '' }">
              <img :src="imageUrl" class="w-100">
            </div>
            <div @click="altClick" class="col-5 col-sm-2 offset-sm-1 my-2 my-sm-0 upload-button align-self-center text-center cursor-pointer">Upload <input type="file" @change="chooseFile" ref="binImage" hidden/></div>
            <div class="col-sm-3 col-md-4"></div>
            <div class="col-sm-7 col-md-6 col-lg-5 offset-sm-0 mt-2 px-0">Browse or Drop your banner here.Maximum 5MB in size JPG, PNG, or
                GIF formats.</div>
          </div>
          
          
          <div class="row my-3">
            <div class="col-sm-3 col-md-4 col-lg-4 text-sm-right align-self-center">
              <label for="" class="font-weight-600">Event Details</label>
            </div>
            <div class="col-sm-7 col-md-6 col-lg-5">
              <textarea name="" id="" cols="30" rows="4" class="form-control" v-model="eventDetails"></textarea>         
            </div>
          </div>
          
          <div class="row my-3">
            <div class="col-sm-3 col-md-4 col-lg-4 text-sm-right align-self-center">
              <label for="" class="font-weight-600">Slot</label>
            </div>
            <div class="col-sm-7 col-md-6 col-lg-5">
              <input type="number" class="form-control" v-model="slot" placeholder="slot available"/>         
            </div>
          </div>
          
          <div class="row mt-4">
            <div class="col-sm-3 col-md-4 col-lg-4 text-sm-right">
              
            </div>
            <div class="col-sm-7 col-md-6 col-lg-5">
              <div class="row">
                <div class="col-sm-4 align-self-center">
                  <span class="font-weight-700 cursor-pointer" @click="showFreeTab" :class="{ 'active-tab' : addFreeClass }">Free</span>&nbsp;&nbsp;/&nbsp;&nbsp;<span class="font-weight-700 cursor-pointer" @click="showPaidTab" :class="{ 'active-tab' : addPaidClass }">Paid</span>
                </div>
                <div class="col-sm-8" :class="{ 'show-amount' : addPaidClass, 'hide-amount' : !addPaidClass }">
                  <input type="text" class="form-control" placeholder="Enter amount" v-model="amount">
                </div>
              </div>     
            </div>
            <div class="col-sm-2 col-lg-3"></div>

            <div class="col-12" :class="{ 'show-paid' : addPaidClass, 'hide-paid' : !addPaidClass }">
              <div class="row">
                  <div class="col-sm-3 col-md-4 col-lg-4 text-sm-right mt-4 font-weight-600">Select Bank</div>
              <div class="col-sm-7 col-md-6 col-lg-5">
                <div class="dropdown w-100 mt-4">
                  <button
                class="default-btn w-100 text-left pr-1"
                type="button"
                style="
                  border-radius: 4px;
                  border: 1px solid #ced4da;
                  color: #6c757d;
                "
                id="dropdownMenuButton"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                {{
                  !selectedBank
                    ? "Select"
                    : selectedBank.name.length > 27
                    ? `${selectedBank.name.slice(0, 27)}...`
                    : selectedBank.name
                }}
                <i
                  class="pi pi-chevron-down manual-dd-icon float-right pr-1"
                ></i>
              </button>
                  <div class="dropdown-menu p-2" aria-labelledby="dropdownMenuButton" style="max-height: 350px;overflow-y:auto">
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Find event"
                      v-model="bankSearchText"
                    />
                    <a class="dropdown-item elipsis-items cursor-pointer" v-for="item in filteredBanks" :key="item.id">
                      <div @click="setBank(item)">{{ item ? item.name : "" }}</div>
                    </a>
                    
                  </div>
                </div>
               
                <!-- <Dropdown v-model="selectedBank" class="w-100 mt-4" :options="nigerianBanks" optionLabel="name" :filter="true" :placeholder="selectedBank ? selectedBank.name : 'Select'" :showClear="false">
                </Dropdown> -->
              </div>
              <div class="col-sm-2 col-lg-3"></div>

              <div class="col-sm-3 col-md-4 col-lg-4 text-sm-right mt-4 font-weight-600">Account Number</div>
              <div class="col-sm-7 col-md-6 col-lg-5">
                <input type="text" class="form-control mt-4 input-height" placeholder="Enter account number" v-model="accountNumber" @blur="resolveCustomerDetail">
              </div>
              <div class="col-sm-2 col-lg-3"></div>
              
              <div class="col-sm-3 col-md-4 col-lg-4 text-sm-right mt-4 font-weight-600">Account Name</div>
              <div class="col-sm-7 col-md-6 col-lg-5">
                <input type="text" class="form-control mt-4 input-height" placeholder="account name" v-model="accountName" ref="accNameRef">
              </div>
              <div class="col-sm-2 col-lg-3  align-self-center mt-4" v-if="loading">
                <div class="spinner-border text-primary" style="width: 3rem; height: 3rem;" role="status">
                  <span class="sr-only">Loading...</span>
                </div>
              </div>
              
              <div class="col-sm-3 col-md-4 col-lg-4 text-sm-right mt-4 font-weight-600">Income Account</div>
              <div class="col-sm-7 col-md-6 col-lg-5">
                <Dropdown v-model="selectedIncomeAccount" class="w-100 p-0 mt-4" :options="incomeAccount" optionLabel="text" :filter="false" placeholder="Select" :showClear="false">
                </Dropdown>
              </div>
              <div class="col-sm-2 col-lg-3"></div>
              
              <div class="col-sm-3 col-md-4 col-lg-4 text-sm-right mt-4 font-weight-600">Cash Account</div>
              <div class="col-sm-7 col-md-6 col-lg-5">
                <Dropdown v-model="selectedCashAccount" :options="cashBankAccount" optionLabel="text" :filter="false" placeholder="Select" class="w-100 p-0 mt-4" :showClear="false">
                </Dropdown>
              </div>
            <div class="col-sm-2 col-lg-3"></div>
              </div>
            </div>
          </div>
          
          
          <div class="row mt-3">
            <div class="col-sm-3 col-md-4 col-lg-4 text-sm-right mt-5 align-self-center">
              <label for="" class="font-weight-600">SMS</label>
            </div>
            <div class="col-sm-7 col-md-6 col-lg-5 mt-2">
                <ul class="nav nav-tabs" id="myTab" role="tablist">
                  <li class="nav-item">
                    <a class="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">Checkin</a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">Registration</a>
                  </li>
                </ul>
                <div class="tab-content" id="myTabContent">
                  <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                     <textarea name="" id="" cols="30" rows="3" class="form-control mt-2" v-model="checkinSMS"></textarea>
                  </div>
                  <div class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                     <textarea name="" id="" cols="30" rows="3" class="form-control mt-2" v-model="registrationSMS"></textarea>
                  </div>
                </div>
            </div>

            <div class="col-sm-2 col-lg-3"></div>

          <div class="col-sm-3 col-md-4 col-lg-4 text-sm-right mt-3 align-self-center">
              <label for="" class="font-weight-600">Email</label>
            </div>
            <div class="col-sm-7 col-md-6 col-lg-5 mt-3">
                <ul class="nav nav-tabs" id="myTab" role="tablist">
                  <li class="nav-item">
                    <a class="nav-link active" id="home-tab" data-toggle="tab" href="#first" role="tab" aria-controls="home" aria-selected="true">Checkin</a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" id="profile-tab" data-toggle="tab" href="#second" role="tab" aria-controls="profile" aria-selected="false">Registration</a>
                  </li>
                </ul>
                <div class="tab-content" id="myTabContent">
                  <div class="tab-pane fade show active" id="first" role="tabpanel" aria-labelledby="home-tab">
                     <textarea name="" id="" cols="30" rows="3" class="form-control mt-2" v-model="checkinEmail"></textarea>
                  </div>
                  <div class="tab-pane fade" id="second" role="tabpanel" aria-labelledby="profile-tab">
                     <textarea name="" id="" cols="30" rows="3" class="form-control mt-2" v-model="registrationEmail"></textarea>
                  </div>
                </div>   
            </div>
            
            <div class="col-sm-2 col-lg-3"></div>

           <!-- <div class="col-sm-3 col-md-4 col-lg-4 text-sm-right mt-3">
              <label for="" class="font-weight-600">Registration SMS</label>
            </div>
            <div class="col-sm-7 col-md-6 col-lg-5 mt-3">
                <textarea name="" id="" cols="30" rows="4" class="form-control"></textarea>     
            </div>

            <div class="col-sm-2 col-lg-3"></div>

            <div class="col-sm-3 col-md-4 col-lg-4 text-sm-right mt-3">
              <label for="" class="font-weight-600">Check-in Email</label>
            </div>
            <div class="col-sm-7 col-md-6 col-lg-5 mt-3">
                <textarea name="" id="" cols="30" rows="4" class="form-control"></textarea>     
            </div>
            
            <div class="col-sm-2 col-lg-3"></div>

            <div class="col-sm-3 col-md-4 col-lg-4 text-sm-right mt-3">
              <label for="" class="font-weight-600">Check-in SMS</label>
            </div>
            <div class="col-sm-7 col-md-6 col-lg-5 mt-3">
                <textarea name="" id="" cols="30" rows="4" class="form-control"></textarea>     
            </div> -->
          </div>
          </div>
        </div>

        <div class="row my-3">
          <div class="col-sm-3 col-md-4 col-lg-4 text-sm-right">
            <!-- <label for="" class="font-weight-600">Group</label> -->
          </div>
          <div class="col-sm-7 col-md-6 col-lg-5">
            <!-- <Dropdown
              v-model="selectedGroup"
              :options="groups"
              optionLabel="name"
              placeholder="Select group"
              :filter="false"
              filterPlaceholder="Search grouped contacts"
              style="width: 100%"
            /> -->
            <div class="row mt-5">
              <div class="col-md-12 d-flex justify-content-center">
                <button
                  class="default-btn primary-bg text-white border-0 contn-btn"
                  @click="onContinue"
                  :disabled="!selectedEvent.id || selectedGroups.length === 0"
                >
                  Save and Continue
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <Toast />
        </div>
      </div>

      <div class="col-lg-3 col-md-1"></div>
    </div>
  </div>
</template>

<script>
import Dropdown from "primevue/dropdown";
import MultiSelect from 'primevue/multiselect';
import { computed, nextTick, ref, watchEffect } from "vue";
import router from "@/router/index";
import groupService from "../../../services/groups/groupsservice";
import eventsService from "../../../services/events/eventsservice";
import CreateEventModal from "../../../components/attendance/AttendanceEventModal";
// import attendanceservice from "../../../services/attendance/attendanceservice";
import { useStore } from "vuex";
import { useToast } from 'primevue/usetoast';
import axios from "@/gateway/backendapi";
import finish from '../../../services/progressbar/progress'
import axio from  'axios'
import moment from "moment";
import GroupTree from "../../groups/component/GroupTreeCheckboxParent.vue";



export default {
  components: { Dropdown, MultiSelect,CreateEventModal, GroupTree },

  setup() {
    const store = useStore();
    const groups = ref([]);
    const display = ref(false);
    const newActModal = ref(false);
    const showBtModal = ref("");
    const popModal = ref(null);
    const toast = useToast();
    const openModalBtn = ref(null);
    const addPaidClass = ref(false)
    const addFreeClass = ref(true)
    const templateDisplay = ref(false)
    const nigerianBanks = ref([])
    const selectedBank = ref("")
    const accountNumber = ref("")
    const accountName = ref("")
    const accNameRef = ref("")
    const loading = ref(false)
    const eventDetails = ref("")
    const cashBankAccount = ref([])
    const incomeAccount = ref([])
    const selectedIncomeAccount = ref(null)
    const selectedCashAccount = ref(null)
    const registrationSMS = ref("")
    const registrationEmail = ref("")
    const checkinSMS = ref("")
    const checkinEmail = ref("")
    const amount = ref("")
    const binImage = ref("")
    const image = ref ("")
    const imageUrl = ref("")
    const slot = ref("")
    const hideDiv = ref(true)
    const searchGroupRef = ref(true)
    const searchGroupText = ref("")
    const grouploading = ref(false)


    // const selectedGroup = ref({});
    const selectedGroups = ref([]);
    const getGroups = async () => {
      grouploading.value = true
      try {
        const response = await groupService.getGroups();
        grouploading.value = false
        if (response && response.length > 0) {
          groups.value = response
        }
      } catch (error) {
        console.log(error);
        grouploading.value = false
      }
    };

    const events = ref([]);
    const getEvents = async () => {
      try {
        const response = await eventsService.getEvents();
        if (response && response.length > 0) {
          events.value = response.map((i) => {
            return { id: i.activityID, name: i.name };
          });
        }
      } catch (error) {
        console.log(error);
      }
    };

    const selectedEvent = ref({});
    const selectEvent = (selected) => {
      selectedEvent.value = selected;
    };

    const closeModal = () => {
      display.value = false;
    };

    const eventCategories = ref([]);
    const getEventCategories = async () => {
      try {
        const response = await eventsService.getEventCategories();
        console.log(response, "categories");
        eventCategories.value = response;
      } catch (error) {
        console.log(error);
      }
    };
    getEventCategories();

    const selectedCategory = ref({});
    const selectCategory = (category) => {
      selectedCategory.value = category;
      newActModal.value = false;
    };

    const newAcctivityDate = ref("");
    const createNewActivity = async () => {
      if (!newAcctivityDate.value && !selectedCategory.value) return false;
      try {
        const response = await eventsService.createNewActivity({ activity: { date: newAcctivityDate.value, eventCategoryId: selectedCategory.value.id } });
        const newActivity = { id: response.currentEvent.id, name: `${response.currentEvent.name} (${ new Date(response.currentEvent.activityDate).toDateString() })` };
        selectedEvent.value = newActivity;
        events.value.push(newActivity);
        toast.add({severity:'success', summary:'Operation Successful', detail:'Event created successfully', life: 3000});
      } catch (error) {
        toast.add({severity:'error', summary:'Operation Failed', detail:'Could not create event', life: 3000});
        console.log(error);
      }
    }

    const selectedCategoryName = computed(() => {
      if (!selectedCategory.value || !selectedCategory.value.name) return "";
      return selectedCategory.value.name.length > 17 ? `${selectedCategory.value.name.slice(0, 16)}...` : selectedCategory.value.name;
    })

    const newCategoryCreated = (categories, eventName) => {
      eventCategories.value = categories;
      selectedCategory.value = categories.find(i => i.name.toLowerCase() === eventName.toLowerCase());
      openModalBtn.value.click();
      display.value = false;
    }

    const categorySearchText = ref("");
    const filteredCategories = computed(() => {
      if (!categorySearchText.value) return eventCategories.value;
      return eventCategories.value.filter(i => i.name.toLowerCase().includes(categorySearchText.value.toLowerCase()));
    })
    
    const bankSearchText = ref("");
    const filteredBanks = computed(() => {
      if (!bankSearchText.value) return nigerianBanks.value;
      return nigerianBanks.value.filter(i => i.name.toLowerCase().includes(bankSearchText.value.toLowerCase()));
    })

    const eventSearchText = ref("");
    const filteredEvents= computed(() => {
      if (!eventSearchText.value) return events.value;
      return events.value.filter(i => i.name.toLowerCase().includes(eventSearchText.value.toLowerCase()));
    })

    getEvents();
    getGroups();

    const onContinue = async () => {
      console.log(addPaidClass.value)
     

      // const baseFormData = new FormData()
      // selectedEvent.value ? baseFormData.append("eventId", selectedEvent.value.id) : ""
      // selectedGroup.value ? baseFormData.append("groupId", selectedGroup.value.id) : ""
      // baseFormData.append("eventDate", moment(new Date(selectedEvent.value.name.split("(")[1].split(")")[0]).toISOString()).format().split("T")[0])
      // slot.value ? baseFormData.append("registrationSlot", slot.value) : ""
      // eventDetails.value ? baseFormData.append("details", eventDetails.value) : ""
      // registrationSMS.value ? baseFormData.append("registrationSMS", registrationSMS.value) : ""
      // registrationEmail.value ? baseFormData.append("registrationEmail", registrationEmail.value) : ""
      // checkinSMS.value ? baseFormData.append("checkinSMS", checkinSMS.value) : ""
      // checkinEmail.value ? baseFormData.append("checkinEmail", checkinEmail.value) : ""
      // image.value ? baseFormData.append("bannerPhoto", image.value) : ""
      //  disabled.value = false

      let checkinEvent = {
          eventId: selectedEvent.value.id,
          groupIDs: selectedGroups.value.map(i => i.id),
          eventDate: moment(new Date(selectedEvent.value.name.split("(")[1].split(")")[0]).toISOString()).format().split("T")[0],
        }
        slot.value ? checkinEvent.registrationSlot = slot.value : ""
        checkinSMS.value ? checkinEvent.checkinSMS = checkinSMS.value : ""
        checkinEmail.value ? checkinEvent.checkinEmail = checkinEmail.value : ""
        registrationSMS.value ? checkinEvent.registrationSMS = registrationSMS.value : ""
        registrationEmail.value ? checkinEvent.registrationEmail = registrationEmail.value : ""
      //   console.log(checkinEvent)
      const formData = new FormData();
        // disabled.value = false

      image.value ? formData.append("bannerPhoto", image.value) : ""
      formData.append("details", eventDetails.value)
      selectedBank.value ? formData.append("bankCode", selectedBank.value ? selectedBank.value.code : "") : ""
      accountName.value ? formData.append("accountName", accountName.value) : ""
      accountNumber.value ? formData.append("accountNumber", accountNumber.value) : ""
      formData.append("contributionItemName", selectedEvent.value.name)
      selectedCashAccount.value ? formData.append("cashAccountId", selectedCashAccount.value ? selectedCashAccount.value.id : "") : ""
      selectedIncomeAccount.value ? formData.append("incomeAccountId", selectedIncomeAccount.value ? selectedIncomeAccount.value.id : "") : ""
      registrationSMS.value ? formData.append("registrationSMS", registrationSMS.value) : ""
      registrationEmail.value ? formData.append("registrationEmail", registrationEmail.value) : ""
      checkinSMS.value ? formData.append("checkinSMS", checkinSMS.value) : ""
      checkinEmail.value ? formData.append("checkinEmail", checkinEmail.value) : ""
      selectedEvent.value ? formData.append("activityDate", moment(new Date(selectedEvent.value.name.split("(")[1].split(")")[0]).toISOString()).format().split("T")[0]) : ""
      formData.append("isPaidFor", addPaidClass.value)
      amount.value ? formData.append("amount", amount.value) : ""
      selectedEvent.value ? formData.append("activityId", selectedEvent.value.id) : ""
      selectedGroups.value ? formData.append("groupIDs", selectedGroups.value.map(i => i.id)) : ""
      formData.append("enableRegistration", true)
      slot.value ? formData.append("registrationSlot", slot.value) : ""

      if (!amount.value && !selectedBank.value && !accountNumber.value && !selectedCashAccount.value && !selectedIncomeAccount.value &&  !image.value) {
        console.log('free and no image')
        
      try {
          // const response = await attendanceservice.saveCheckAttendanceItem(checkinEvent);
          const response = await axios.post('/api/CheckinAttendance/MultipleCheckinAttendanceItem', checkinEvent)
          console.log(response)
          for (let i = 0; i < response.data.length; i++) {
            const element = response.data[i];
            store.dispatch("attendance/setItemData", element);
          }
          store.dispatch("groups/setCheckedTreeGroup", [])
          router.push({
            name: "CheckinType",
            query: {
              activityID: selectedEvent.value.id,
              activityName: selectedEvent.value.name,
              groupId: selectedGroups.value[0].id,
              groupName: selectedGroups.value[0].name,
              id: response.data[0].id,
              code: response.data[0].attendanceCode,
            },
          });
          
        } catch (error) {
          console.log(error);
        }
      console.log("Only Top")
      } else if (!amount.value && !selectedBank.value && !accountNumber.value && !selectedCashAccount.value && !selectedIncomeAccount.value &&  image.value) {
        console.log("Free and image")
        try {
            let { data } = await axios.post('/api/CheckInAttendance/create/multiple', formData)
            // let { data } = await axios.post('/api/CheckInAttendance/EventRegister', formData)
            let firstGroup = data.returnObject.checkInAttendanceResult.find(i => i.groupID == selectedGroups.value[0].id)
            

            for (let i = 0; i < data.returnObject.checkInAttendanceResult.length; i++) {
              const element = data.returnObject.checkInAttendanceResult[i];
              store.dispatch("attendance/setEventReg", element);
            }
            router.push({
              name: "CheckinType",
              query: {
                activityID: selectedEvent.value.id,
                activityName: selectedEvent.value.name,
                groupId: firstGroup.id,
                groupName: selectedGroups.value[0].name,
                id: firstGroup.id,
                code: firstGroup.attendanceCode
              },
            });
        }
        catch (err) {
          console.log(err)
        }
      } else if (amount.value && selectedBank.value && accountNumber.value && selectedCashAccount.value && selectedIncomeAccount.value) {
        console.log('image and paid')
        try {
            let { data } = await axios.post('/api/CheckInAttendance/create/multiple', formData)
            let firstGroup = data.returnObject.checkInAttendanceResult.find(i => i.groupID == selectedGroups.value[0].id)
            
            for (let i = 0; i < data.returnObject.checkInAttendanceResult.length; i++) {
              const element = data.returnObject.checkInAttendanceResult[i];
              store.dispatch("attendance/setEventReg", element);
            }
            router.push({
              name: "CheckinType",
              query: {
                activityID: selectedEvent.value.id,
                activityName: selectedEvent.value.name,
                groupId: firstGroup.id,
                groupName: selectedGroups.value[0].name,
                id: firstGroup.id,
                code: firstGroup.attendanceCode
              },
            });
            
        }
        catch (err) {
          console.log(err)
        }
      }
    };

    const showPaidTab = () => {
      addPaidClass.value = true
      addFreeClass.value = false
    }

    const showFreeTab = () => {
      addFreeClass.value = true
      addPaidClass.value = false
    }

    const toggleTemplate = () => {
        templateDisplay.value = !templateDisplay.value
    }

    const getBanks = () => {
        axios.get('/api/Financials/GetBanks')
            .then(res => {

                console.log(res)
            nigerianBanks.value = res.data
            })
            .catch(err => {

                console.log(err)
            })

    }
    getBanks()

    const resolveCustomerDetail = async() => {
            loading.value = true
            try {
                let header = { headers: { Authorization: `Bearer ${process.env.VUE_APP_PAYSTACK_SECRET_KEY}` }}
                console.log(header, "header");

                let { data } = await axio.get(`https://api.paystack.co/bank/resolve?account_number=${accountNumber.value}&bank_code=${selectedBank.value.code}`, header)
                console.log(data)
                accountName.value = data.data.account_name
                accNameRef.value.focus()
                // disabled.value = false

                loading.value = false

                toast.add({severity:'success', summary: 'Account Check Successful', detail:'The account check was successful', life: 3000});

            }
            catch (error) {
                finish()
                console.log(error)

                loading.value = false

                toast.add({severity:'error', summary: 'Account Check Error', detail:'Please check your banks details again', life: 3000});
            }
            console.log(selectedBank.value.code, accountNumber.value)
        }

        const getCashBankAccount = () => {
            axios.get('/api/financials/accounts/getcashbankaccounts')
              .then(res => {
                console.log(res.data)
                cashBankAccount.value = res.data
              })
              .catch (err => {
                console.log(err)
              })
        }
        getCashBankAccount()

        const getIncomeAccount = ()=> {
          axios.get('/api/Financials/Accounts/GetIncomeAccounts')
            .then(res => {
              incomeAccount.value = res.data
              // if (res.data.length < 1) {
              //   displayResponsive.value = true
              // }
            })
            .catch(err => {
                console.log(err)
            })
        }
        getIncomeAccount()

        const altClick = () => {
          binImage.value.click()
        }

        const chooseFile = (e) => {
          console.log(e.target.files[0])
          image.value = e.target.files[0]
          imageUrl.value = URL.createObjectURL(image.value);
          console.log(imageUrl.value)
          // imageUrl.value = URL.createObjectURL(image.value);
        }

        const setBank = (item) => {
          selectedBank.value = item
          console.log(selectedBank.value)
        }

        watchEffect(() => {
          if (store.getters["groups/checkedTreeGroup"]) {
            selectedGroups.value = store.getters["groups/checkedTreeGroup"];
          }
        });

        const setGroupProp = () => {
          hideDiv.value = !hideDiv.value;
          nextTick(() => {
            searchGroupRef.value.focus();
          });
        };

        const searchForGroups = computed(() => {
          if (!searchGroupText.value && groups.value.length > 0)
            return groups.value;
          return groups.value.filter((i) =>
            i.name.toLowerCase().includes(searchGroupText.value.toLowerCase())
          );
        });

        const closeDropdownIfOpen = (e) => {
          if (!e.target.classList.contains("exempt-hide") && !e.target.classList.contains("p-hidden-accessible") && !e.target.classList.contains("p-checkbox-box") && !e.target.classList.contains("p-checkbox-icon")) {
            hideDiv.value = true
          }
        };

    return {
      selectedEvent,
      onContinue,
      groups,
      events,
      selectEvent,
      display,
      // selectedGroup,
      closeModal,
      newActModal,
      eventCategories,
      selectCategory,
      selectedCategory,
      createNewActivity,
      selectedCategoryName,
      newAcctivityDate,
      newCategoryCreated,
      showBtModal,
      popModal,
      filteredCategories,
      categorySearchText,
      eventSearchText,
      filteredEvents,
      openModalBtn,
      addPaidClass,
      addFreeClass,
      showPaidTab,
      showFreeTab,
      toggleTemplate,
      templateDisplay,
      nigerianBanks,
      selectedBank,
      accountNumber,
      accountName,
      resolveCustomerDetail,
      accNameRef,
      loading,
      eventDetails,
      cashBankAccount,
      incomeAccount,
      selectedIncomeAccount,
      selectedCashAccount,
      moment,
      registrationSMS,
      registrationEmail,
      checkinSMS,
      checkinEmail,
      amount,
      binImage,
      altClick,
      chooseFile,
      image,
      imageUrl,
      setBank,
      bankSearchText,
      filteredBanks,
      slot,
      selectedGroups,
      setGroupProp,
      hideDiv,
      searchGroupRef,
      searchForGroups,
      searchGroupText,
      grouploading,
      closeDropdownIfOpen
    };
  },
};
</script>

<style scoped>
* {
  color: #02172e;
  /* font-family: Nunito Sans !important; */
}

.contn-btn:disabled {
  opacity: 0.3;
}

.upload-button {
  background: rgba(206, 206, 206, 0.274);
  color: black;
  border-radius: 25px;
  font-weight: 600;
  padding: 8px 10px;
}

.active-tab {
  border-bottom: 2px solid rgb(31, 87, 241);
}

.header-contri {
     font-size: 20px;
     font-weight: 700;
}

.angle-icon {
    width: 25px;
    height: 25px;
    border-radius: 50%;
    border: 1px solid  rgb(73, 73, 73);
    padding: 3px
}

.hide-tem {
    height: 0;
    overflow: hidden;
    transition: all 1s ease-in-out
}

.show-tem-free {
    /* height: 798px; */
    overflow: hidden;
    transition: all 1s ease-in-out
}



.show-tem {
    /* height: 1050px; */
    overflow: hidden;
    transition: all 1s ease-in-out
}

.rollIcon {
    transform: rotateZ(180deg);
    transition: all 1s ease-in-out
}

.closeIcon {
    transform: rotateZ(0deg);
    transition: all 0.5s ease-in-out
}

.input-height {
  height: 70%
}

.img-border {
  border: 1px dotted rgb(206, 212, 218);
  height: 150px;
}

.show-paid {
  height: 327px;
  /* overflow: hidden; */
  transition: all 0.6s ease-in-out
}


.hide-paid {
  height: 0;
  overflow: hidden;
  transition: all 0.6s ease-in-out
}

@media (max-width: 576px) {
  .show-tem-free {
    height: 1080px;
  }

  .show-tem {
    height: 1550px;
    /* overflow: hidden; */
    transition: all 1s ease-in-out
}

  .show-paid {
    height: 508px;
    /* overflow: hidden; */
    transition: all 0.6s ease-in-out
  }
}

.show-amount {
  /* width: 100%;
  overflow: hidden; */
  transform: translateX(0px);
  opacity: 1;
  transition: all 0.6s ease-in-out
}

.hide-amount {
  /* width: 0;
  overflow: hidden; */
  transform: translateX(-20px);
  opacity: 0;
  transition: all 0.6s ease-in-out;
}

#second {
  width: 100%
}

.div-card {
  position: absolute;
  background: white;
  z-index: 1;
  width: 100%;
  top: 40px;
  box-shadow: 0 0 11px rgba(33, 33, 33, 0.2);
  max-height: 400px;
  overflow: scroll;
}

.eachGroup {
  padding: 5px 10px;
  background: #eee;
  border-radius: 25px;
  margin: 0 3px;
}
</style>