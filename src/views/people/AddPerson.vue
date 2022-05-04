<template>
  <div class="my-con container-top">
    <div class="header">
      <h3 class="header-text font-weight-bold">Add Contact</h3>
      <Toast />
    </div>

    <div class="form-div">
      <form @submit.prevent="addPerson">
        <div class="bio-div mt-2">
          <p class="form-section-header">Bio:</p>
          <div class="bio-info">
            <div class="inputs">
               <div class="input-field">
                <label for="" class="label">Membership</label>
                <div class="cstm-select input border-0 p-0">
          
                     <Dropdown
                      v-model="selectedMembership"
                      :options="memberships"
                      optionLabel="name"
                      placeholder="--Select membership--"
                      style="width: 100%"
                    />
              
                </div>
              </div>
              <div class="input-field">
                <label for="" class="label"
                  >Firstname<span style="color: red"> *</span></label
                >
                <input
                  type="text"
                  class="input"
                  placeholder=""
                  v-model="person.firstName"
                  required
                />
              </div>
              <div class="input-field">
                <label for="" class="label">Surname</label>
                <input
                  type="text"
                  class="input"
                  placeholder=""
                  v-model="person.lastName"
                />
              </div>
              <div class="input-field">
                <label for="" class="label">Phone number</label>
                <input
                  type="text"
                  class="input"
                  placeholder=""
                  v-model="person.mobilePhone"
                />
              </div>
              <div class="input-field">
                <label for="" class="label">Email</label>
                <input
                  type="text"
                  class="input"
                  placeholder=""
                  v-model="person.email"
                />
              </div>
              <div class="input-field">
                <label for="" class="label">Address</label>
                <input
                  type="text"
                  class="input"
                  placeholder=""
                  v-model="person.address"
                />
              </div>
               <div class="input-field">
                <label for="" class="label">Choose contact owner</label>
                <div class="input p-0 border-0">
                  <SearchMembers @memberdetail="setContact" :currentMember="currentContact"/>
                </div>
              </div>
              <div class="input-field">
                <label for=""></label>
                <div class="status-n-gender">
                  <div class="status cstm-select">
                    <div class="cs-select">
                      <Dropdown
                        v-model="selectedMaritalStatus"
                        :options="maritalStatus"
                        optionLabel="value"
                        placeholder="Marital status"
                        style="width: 100%"
                      />
                      <!-- <SelectElem :typ="'membership'" name="status" :options="['Marital status', ...maritalStatusArr]" value="Marital status" @input="itemSelected"/> -->
                    </div>
                  </div>
                  <div class="gender cstm-select">
                    <div class="cs-select">
                      <Dropdown
                        v-model="selectedGender"
                        :options="genders"
                        optionLabel="value"
                        placeholder="Gender"
                        style="width: 100%"
                      />
                      <!-- <SelectElem :typ="'membership'" name="gender" :options="['Gender', ...gendersArr]" value="Gender" @input="itemSelected"/> -->
                    </div>
                  </div>
                </div>
              </div>
             
            </div>
            <div class="image-div other">
              <div class="grey-bg">
                <div v-if="routeParams">
                  <div class="person-img">
                    <img
                      v-if="!memberToEdit.pictureUrl"
                      src="../../assets/people/phone-import.svg"
                      alt="Uploaded Image"
                    />
                    <img
                      v-else
                      :src="memberToEdit.pictureUrl"
                      alt="Uploaded Image"
                      style="width: 110px; height: 110px; border-radius: 50%; object-fit: cover"
                    />
                  </div>
                </div>
                <div v-else>
                  <div class="person-img">
                    <img
                      v-if="!url"
                      src="../../assets/people/phone-import.svg"
                      alt="Uploaded Image"
                    />
                    <img
                      v-else
                      :src="url"
                      alt="Uploaded Image"
                      style="width: 110px; height: 110px; border-radius: 50%; object-fit: cover"
                    />
                  </div>
                </div>
                <div>
                  <div class="cs-input">
                    <label for="imgUpload" class="choose-file">
                      Choose file
                      <input
                        type="file"
                        class="input file-input"
                        placeholder=""
                        id="imgUpload"
                        @change="imageSelected"
                      />
                    </label>
                  </div>
                </div>
                <!-- <div>
                  <button
                    class="upload-btn outline-none"
                    @click.prevent="uploadImage"
                  >
                    Upload
                  </button>
                </div> -->
              </div>
            </div>
          </div>
        </div>
        <!-- <hr class="hr"> -->

        <div class="bio-div">
          <span class="celeb-tab row" @click="showCelebTab">
            <span class="tab-header col-3">Celebrations:</span>
            <span class="h-rule col-7"><hr class="hr" /></span>
            <span class="col-2">
              <span class="tb-icon-span"
                ><i
                  class="pi pi-angle-down tbb-icon"
                  :class="{ 'tb-icon': !hideCelebTab }"
                ></i
              ></span>
            </span>
          </span>
          <div
            class="bio-info celeb-info"
            :class="{ 'hide-tab': hideCelebTab, showtab: !hideCelebTab }"
          >
            <div class="inputs">
              <div class="input-field">
                <label for="" class="label">Birthday</label>
                <div class="status-n-gender">
                    <div class="cstm-select">
                      <div class="cs-select day">
                        <Dropdown
                          v-model="person.dayOfBirth"
                          :options="['Day', ...birthDaysArr ]"
                          placeholder="Day"
                          style="width: 100%"
                        />
                        <!-- <SelectElem :typ="'membership'" name="birthday" :options="['Day', ...birthDaysArr ]" value="Day" @input="itemSelected"/> -->
                      </div>
                    </div>

                    <div class="cstm-select">
                      <div class="cs-select month">
                        <Dropdown
                          v-model="person.monthOfBirth"
                          :options="['Month', ...months]"
                          placeholder="Month"
                          @change="
                            editBirthDateValue('month', person.monthOfBirth)
                          "
                          style="width: 100%"
                        />
                        <!-- <SelectElem :typ="'membership'" name="birthmonth" :options="['Month', ...months]" value="Month" @input="itemSelected"/> -->
                      </div>
                    </div>

                    <div class="cstm-select">
                      <div class="cs-select year">
                        <Dropdown
                          v-model="person.yearOfBirth"
                          :options="['Year', ...birthYearsArr]"
                          placeholder="Year"
                          style="width: 100%"
                        />

                        <!-- <SelectElem :typ="'membership'" name="birthyear" :options="['Year', ...birthYearsArr]" value="Year" @input="itemSelected"/> -->
                      </div>
                    </div>
                </div>
              </div>
              <div class="input-field">
                <label for="" class="label">Wedding Anniversary</label>
                <div class="status-n-gender">
                    <div class="cstm-select">
                      <div class="cs-select day">
                        <Dropdown
                          placeholder="Day"
                          v-model="person.dayOfWedding"
                          :options="['Day', ...annDaysArr]"
                          style="width: 100%"
                        />
                        <!-- <SelectElem :typ="'membership'" name="annday" :options="['Day', ...annDaysArr]" value="Day" @input="itemSelected"/> -->
                      </div>
                    </div>

                    <div class="cstm-select">
                      <div class="cs-select month">
                        <Dropdown
                          v-model="person.monthOfWedding"
                          :options="['Month', ...months]"
                          placeholder="Month"
                          @change="
                            editAnnDateValue('month', person.monthOfWedding)
                          "
                          style="width: 100%"
                        />
                        <!-- <SelectElem :typ="'membership'" name="annmonth" :options="['Month', ...months]" value="Month" @input="itemSelected"/> -->
                      </div>
                    </div>

                    <div class="cstm-select">
                      <div class="cs-select year">
                        <Dropdown
                          v-model="person.yearOfWedding"
                          :options="['Year', ...birthYearsArr]"
                          placeholder="Year"
                          style="width: 100%"
                        />
                        <!-- <SelectElem :typ="'membership'" name="annyear" :options="['Year', ...birthYearsArr]" value="Year" @input="itemSelected"/> -->
                      </div>
                    </div>
                </div>
              </div>
            </div>

            <div class="image-div other">
              <!-- Empty space -->
            </div>
          </div>
        </div>
        <div class="bio-div">
          <!-- <span class="celeb-tab row" @click="showAddInfoTab"> -->
          <span class="celeb-tab row">
            <span class="tab-header col-3">Additional information:</span>
            <span class="h-rule col-7"><hr class="hr" /></span>
            <span class="col-2">
              <!-- <span class="tb-icon-span"
                ><i
                  class="pi pi-angle-down tbb-icon"
                  :class="{ 'tb-icon': !hideAddInfoTab }"
                ></i
              ></span> -->
            </span>
          </span>
          <!-- <div
            class="bio-info"
            :class="{
              'hide-tab': hideAddInfoTab,
              'show-occ-tab': !hideAddInfoTab,
            }"
          > -->
          <div
            class="bio-info"
          >
            <div class="inputs">
              <div class="input-field">
                <label for="" class="label">Occupation</label>
                <input
                  type="text"
                  class="input"
                  placeholder=""
                  v-model="person.occupation"
                />
              </div>
              <div class="input-field">
                <label for="" class="label">Age</label>
                <div class="cstm-select search-box">
                  <div class="cs-select" style="width: 330px">
                    <Dropdown
                      v-model="selectedAgeGroup"
                      :options="ageGroups"
                      optionLabel="name"
                      placeholder="--Select age range--"
                      style="width: 100%"
                    />
                    <!-- <SelectElem name="agegroup" :options="['-Select age range', ...groupsByAge]" value="-Select age range" @input="itemSelected"/> -->
                  </div>
                </div>
              </div>
              <!-- <div v-for="(classification, index) in classifications" :key="index">
                <div class="input-field" v-if="classification.controlType == 'Dropdown' " >
                  <label for="" class="mr-2" >{{classification.label}}</label>
                  <div class="cstm-select search-box">
                    <div class="cs-select" style="width: 330px">
                      <Dropdown
                        v-model="selectedAgeGroup"
                        :options="ageGroups"
                        optionLabel="name"
                        placeholder="--Select age range--"
                        style="width: 100%"
                      />
                  </div>
                  </div>
                </div>
                <div class="input-field" v-if="classification.controlType == 'number' " >
                  <label for="" class="label">{{classification.label}}</label>
                  <input
                    type="number"
                    class="input"
                    placeholder=""
                    v-model="person.occupation"
                  />
                </div>
                <div class="input-field" v-if="classification.controlType == 'email' " >
                  <label for="" class="label">{{classification.label}}</label>
                  <input
                    type="email"
                    class="input"
                    placeholder=""
                    v-model="person.occupation"
                  />
                </div>
                <div class="input-field" v-if="classification.controlType == 'text' " >
                  <label for="" class="label">{{classification.label}}</label>
                  <input
                    type="text"
                    class="input"
                    placeholder=""
                    v-model="person.occupation"
                  />
                </div>
                <div class="input-field" v-if="classification.controlType == 'password' " >
                  <label for="" class="label">{{classification.label}}</label>
                  <input
                    type="password"
                    class="input"
                    placeholder=""
                    v-model="person.occupation"
                  />
                </div>
                <div class="input-field" v-if="classification.controlType == 'file' " >
                  <label for="" class="label">{{classification.label}}</label>
                  <input
                    type="file"
                    class="input"
                    placeholder=""
                  />
                </div>
                <div class="input-field" v-if="classification.controlType == 'date' " >
                  <label for="" class="label">{{classification.label}}</label>
                  <input
                    type="date"
                    class="input"
                    placeholder=""
                  />
                </div>
              </div> -->
            </div>

            <div class="image-div other">
              <!-- white space -->
            </div>
          </div>
        </div>

        <!-- DISABLED -->
        <div
          v-if="true"
          class="add-info--con"
        >
        <!-- <div
          v-if="true"
          class="add-info--con"
          :class="{
            'hide-tab': hideAddInfoTab,
            'show-addinfo-tab': !hideAddInfoTab,
          }"
        > -->
          <div class="label-text-box">
            <p>Related information</p>
            <small
              >Including small groups and cell/house fellowship
              membership</small
            >
          </div>
          <div class="info-box">
            <div class="nav-bar">
              <div
                class="groups box"
                @click.prevent="() => (areaInView = 'groups')"
                :class="{ 'white-bg': areaInView === 'groups' }"
              >
                <a class="tab">Groups</a>
              </div>
              <div
                class="notes box"
                @click.prevent="() => (areaInView = 'notes')"
                :class="{ 'white-bg': areaInView === 'notes' }"
              >
                <a class="tab">Notes</a>
              </div>
              <div
                v-if="false"
                class="follow-up box"
                @click.prevent="() => (areaInView = 'followup')"
                :class="{ 'white-bg': areaInView === 'followup' }"
              >
                <a class="tab">Follow-up</a>
              </div>
            </div>
            <div class="info-box-body py-3">
            <div class="font-weight-700 " v-if="peopleInGroupIDs.length > 0 && areaInView === 'groups'">Groups added</div>
              <div v-if="areaInView === 'groups'">
                <span v-for="(item, index) in peopleInGroupIDs" :key="item.id" >| &nbsp;
                <span class="text-grey">{{ item.name }} &nbsp; <i class="pi pi-times-circle text-danger c-pointer"  @click="showConfirmModal(index, item)"></i></span>&nbsp; | &nbsp;
              </span>
              </div>
              <div v-if="areaInView === 'notes'">
                <div v-for="(item, index) in personNotes" :key="index" >
                  <div class="font-weight-700">{{ item.title }}</div>  
                  <div class="mb-2">{{ item.description }}</div>  
              </div>
              </div>
              <button
                @click.prevent="uploadImage"
                class="info-btn"
                v-if="areaInView === 'groups'"
                data-toggle="modal"
                data-target="#addToGroup"
              >
                Add to Group
              </button>
              <button
                @click.prevent="uploadImage"
                class="info-btn"
                v-if="areaInView === 'fellowship'"
              >
                Add to House fellowship
              </button>
              <button
                @click.prevent="uploadImage"
                class="info-btn"
                v-if="areaInView === 'notes'"
                data-toggle="modal"
                data-target="#personNote"
              >
                New Notes
              </button>
            </div>
          </div>
        </div>

        <!-- <div class="error-div">
          <p v-show="!loading && showError">{{ errMessage }}</p>
        </div> -->
        <div class="submit-div">
          <button
            class="primary-bg px-md-4 outline-none default-btn text-white border-0"
            :disabled="loading || !person.firstName"
          >
            <i class="fas fa-circle-notch fa-spin mr-2" v-if="loading"></i>
            <span>Save</span>
            <span></span>
          </button>
          <!-- <button
            class="primary-bg px-md-4 outline-none default-btn text-white border-0"
            :class="{ 'btn-loading': loading }"
            :disabled="loading"
          >
            <i class="fas fa-circle-notch fa-spin mr-2" v-if="loading"></i>
            <span>Save</span>
            <span></span>
          </button> -->
        </div>
      </form>
    </div>

    <!-- Group Modal -->
    <div
      class="modal fade"
      id="addToGroup"
      tabindex="-1"
      role="dialog"
      aria-labelledby="addToGroup"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header" style="background: #ebeff4">
            <h5 class="modal-title font-weight-bold" id="addToGroup">
              Group Membership
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
                <button class="btn border w-100 d-flex justify-content-between align-items-center" type="button" @click="setGroupProp">
                    <div>{{ Object.keys(groupToAddTo).length > 0 ? groupToAddTo.name : 'Select a group' }}</div>
                    <i class="pi pi-chevron-down"></i>
                  </button>
                  <div
                    class="div-card p-2"
                    :class="{
                      'd-none': hideDiv,
                      'd-block': !hideDiv,
                    }"
                  >
                  <i class="pi pi-spin pi-spinner text-center" v-if="grouploading && getAllGroup.length === 0"></i>
                  <input type="text" class="form-control" v-model="searchGroupText" ref="searchRef" placeholder="Search for group"/>
                    <group-tree :items="searchAllGroups"
                      :addGroupValue="true"
                    />
                  </div>
                <!-- <div class="dropdown show">
                  <button class="btn border w-100 d-flex justify-content-between align-items-center" type="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" @click="focusInput">
                    <div>{{ Object.keys(groupToAddTo).length > 0 ? groupToAddTo.name : 'Select a group' }}</div>
                    <i class="pi pi-chevron-down"></i>
                  </button>
                  <div class="dropdown-menu w-100 scroll-card" aria-labelledby="dropdownMenuLink">
                    <input type="text" v-model="searchGroupText" class="form-control input-width-adjust" placeholder="Search groups" ref="searchRef"/>
                 
                    <group-tree :items="searchAllGroups" />
                  </div>
                </div> -->
              </div>
            </div>

            <div class="row">
              <div class="col-md-4 text-md-right">
                <label for="" class="font-weight-600">Position</label>
              </div>
              <div class="col-md-7">
                <input
                  type="text"
                  v-model="position"
                  class="form-control"
                  placeholder="e.g Member"
                />
              </div>
            </div>

            <div class="row">
              <div class="col-md-4">
                <label for="" class="font-weight-600"></label>
              </div>

              <div class="col-md-7">
                <div class="col-md-12 mt-3 text-center">
                  <p class="my-1 text-danger" v-if="addToGroupError">
                    Please select a group
                  </p>
                </div>
                <div class="row mt-2">
                  <div class="col-md-6 d-md-flex justify-content-end">
                    <button class="default-btn" data-dismiss="modal">Cancel</button>
                  </div>
                  <div class="col-md-6">
                    <button
                      class="default-btn primary-bg border-0 text-white"
                      :data-dismiss="dismissAddToGroupModal"
                      @click="addMemberToGroup"
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
    
    <!-- Note Modal -->
    <div
      class="modal fade"
      id="personNote"
      tabindex="-1"
      role="dialog"
      aria-labelledby="personNote"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header" style="background: #ebeff4">
            <h5 class="modal-title font-weight-bold" id="personNote">
              Add Note
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
                <label for="" class="font-weight-600">Title</label>
              </div>
              <div class="col-md-7">
                <input type="text" class="form-control" v-model="noteDetails.noteTitle" placeholder="Enter title"/>
              </div>
            </div>

            <div class="row">
              <div class="col-md-4 text-md-right">
                <label for="" class="font-weight-600">Description</label>
              </div>
              <div class="col-md-7">
                <textarea rows="5" class="form-control" v-model="noteDetails.noteDesc" placeholder="Enter note description"></textarea>
              </div>
            </div>

            <div class="row">
              <div class="col-md-4">
                <label for="" class="font-weight-600"></label>
              </div>

              <div class="col-md-7 mt-3">
                <div class="row mt-2 d-flex justify-content-end">
                  <div class="col-6">
                    <button class="default-btn" data-dismiss="modal">Cancel</button>
                  </div>
                  <div class="col-6">
                    <button
                      class="default-btn primary-bg border-0 text-white"
                      :data-dismiss="dismissAddToGroupModal"
                      @click="savePersonNote"
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
  <ConfirmDialog />
</template>

<script>
import moment from "moment";
import { ref, reactive, computed, watchEffect, nextTick } from "vue";
import router from "@/router/index";
// import store from "../../store/store"
import axios from "@/gateway/backendapi";
import { useRoute } from "vue-router";
// import { getCurrentInstance } from "vue";
import Dropdown from "primevue/dropdown";
import { useToast } from "primevue/usetoast";
import { useStore } from "vuex";
import membershipService from "../../services/membership/membershipservice";
import grousService from "../../services/groups/groupsservice";
// import lookupService from "../../services/lookup/lookupservice";
import SearchMembers from "../../components/membership/MembersSearch.vue"
import { useConfirm } from "primevue/useconfirm";
import GroupTree from "../groups/component/GroupTree.vue"

export default {
  components: {
    Dropdown,
    SearchMembers,
    'group-tree': GroupTree
  },
  setup() {
    // const $toast = getCurrentInstance().ctx.$toast;
    const toast = useToast();
    const store = useStore();
    const confirm = useConfirm();
    const hideCelebTab = ref(false);
    const hideAddInfoTab = ref(true);
    const showCelebTab = () => (hideCelebTab.value = !hideCelebTab.value);
    const showAddInfoTab = () => (hideAddInfoTab.value = !hideAddInfoTab.value);
    const routeParams = ref("");
    const peopleInGroupIDs = ref([])
    const followupPerson = ref({})
    const currentContact = ref({})
    const searchRef = ref(null)
    const personNotes = ref([])
    const noteDetails = ref({})
    const searchGroupText = ref("")
    const hideDiv = ref(true)

    const loading = ref(false);
    // const day = ref([ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31 ]);
    const months = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];

    const birthMonth = ref(1);
    const birthDay = ref(1);
    const birthYear = ref(1922);

    const startingYear = 1920;
    const numberofYears = 100;

    const birthDate = moment();
    const daysInBirthMonth = ref(birthDate.daysInMonth());
    const daysinMonth = ref([ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31 ]);
    const birthDaysArr = computed(() => {
      // console.log(birthDate.month(), "month");
      // const arrOfDays = [];
      // console.log(daysInBirthMonth.value, "dm");
      // for (let i = 1; i <= daysInBirthMonth.value; i++) {
      //   arrOfDays.push(i);
      // }
      // return arrOfDays;
      return daysinMonth.value
    });
    const birthYearsArr = computed(() => {
      const arrOfYears = [];
      let currentYear = new Date().getFullYear();
      while (arrOfYears.length <= 100) {
        arrOfYears.push(currentYear);
        currentYear = currentYear - 1;
      }
      return arrOfYears;
    });

    const editBirthDateValue = (unit, val) => {
      birthDate.set(unit, val);
      daysInBirthMonth.value = birthDate.daysInMonth();
      updateBirthDateElements();
    };

    const updateBirthDateElements = () => {
      birthMonth.value = birthDate.month();
      birthDay.value = birthDate.date();
      birthYear.value = birthDate.format("YYYY");
    };

    const annMonth = ref(null);
    const annDay = ref(null);
    const annYear = ref(null);

    const anniversaryDate = moment();
    const daysInAnnMonth = ref(anniversaryDate.daysInMonth());
    const annDaysArr = computed(() => {
      // const arrOfDays = [];
      // for (let i = 1; i <= daysInAnnMonth.value; i++) {
      //   arrOfDays.push(i);
      // }
      // return arrOfDays;
      return daysinMonth.value
    });

    const editAnnDateValue = (unit, val) => {
      anniversaryDate.set(unit, val);
      daysInAnnMonth.value = anniversaryDate.daysInMonth();
      updateAnnDateElements();
    };

    const updateAnnDateElements = () => {
      annMonth.value = anniversaryDate.month();
      annDay.value = anniversaryDate.date();
      annYear.value = anniversaryDate.format("YYYY");
    };

    let url = ref("");
    let image = ref("");
    const imageSelected = (e) => {
      image.value = e.target.files[0];
      url.value = URL.createObjectURL(image.value);
      memberToEdit.value.pictureUrl = URL.createObjectURL(image.value);
    };

    //Person
    const peopleClassifications = ref([]); //null
    const selectedMembership = ref(null);
    let person = reactive({
      monthOfBirth: null,
      dayOfBirth: null,
      yearOfBirth: null,
      monthOfWedding: null,
      dayOfWedding: null,
      yearOfWedding: null,
    });

    const uploadImage = () => {};

    const errMessage = ref("");
    const showError = ref(false);

    // const peopleInGroups = computed(() => {
    //   if (!route.params.personId) return {

    //   } 
    // })

    const addPerson = async() => {
      const personObj = { ...person };
      errMessage.value = "";

      const formData = new FormData();
      formData.append(
        "firstName",
        personObj.firstName ? personObj.firstName : ""
      );
      formData.append("lastName", personObj.lastName ? personObj.lastName : "");
      formData.append("picture", image.value ? image.value : "");
      formData.append(
        "mobilePhone",
        personObj.mobilePhone ? personObj.mobilePhone : ""
      );
      formData.append("email", personObj.email ? personObj.email : "");
      formData.append(
        "occupation",
        personObj.occupation ? personObj.occupation : ""
      );
      formData.append("dayOfBirth", personObj.dayOfBirth > 0 ? +personObj.dayOfBirth : 0);
      formData.append(
        "monthOfBirth",
        months.indexOf(personObj.monthOfBirth) >= 0
          ? months.indexOf(personObj.monthOfBirth) + 1
          : 0
      );
      formData.append("yearOfBirth", personObj.yearOfBirth > 0 ? +personObj.yearOfBirth : 0);
      formData.append(
        "occupation",
        personObj.occupation ? personObj.occupation : ""
      );
      formData.append("yearOfWedding", personObj.yearOfWedding > 0 ? +personObj.yearOfWedding : 0);
      formData.append(
        "monthOfWedding",
        months.indexOf(personObj.monthOfWedding) >= 0
          ? months.indexOf(personObj.monthOfWedding) + 1
          : 0
      );
      formData.append("dayOfWedding", personObj.dayOfWedding > 0 ? +personObj.dayOfWedding : 0);
      formData.append(
        "peopleClassificationID",
        selectedMembership.value ? selectedMembership.value.id : ""
      );
      formData.append(
        "personGroups",
        peopleInGroupIDs.value.length > 0 ? JSON.stringify(peopleInGroupIDs.value.map(i => {
          delete i.name
          return i
        }) ) : []
      );
      formData.append("homeAddress", personObj.address ? personObj.address : "");
      // formData.append("picture", image.value ? image.value : "");
      formData.append(
        "maritalStatusID",
        selectedMaritalStatus.value ? selectedMaritalStatus.value.id : ""
      );
      formData.append(
        "genderID",
        selectedGender.value ? selectedGender.value.id : ""
      );
      formData.append(
        "ageGroupID",
        selectedAgeGroup.value ? selectedAgeGroup.value.id : ""
      );
      formData.append(
        "followupPersonID",
        followupPerson.value.id ? followupPerson.value.id : "00000000-0000-0000-0000-000000000000"
      );
      formData.append(
        "note",
        personNotes.value ? JSON.stringify(personNotes.value) : []
      );
      console.log(formData);
      /*eslint no-undef: "warn"*/
      NProgress.start();
      if (route.params.personId) {
        try {
          loading.value = true;
          const response =  await axios.put(
            `/api/People/UpdatePerson/${route.params.personId}`,
            formData
          );
          console.log(response, "response");
          if (response.status === 200 || response.status === 201) {
            membershipService.updatePersonInStore(
              response.data.person,
              route.params.personId
            );
            // store.dispatch("membership/getMembers")
            loading.value = false;
            router.push("/tenant/people");
          }
        } catch (err) {
          console.log(err);
          loading.value = false;
          NProgress.done();
          if (err.toString().toLowerCase().includes("network error")) {
            toast.add({
              severity: "warn",
              summary: "You 're Offline",
              detail: "Please ensure you have internet access",
              life: 6000,
            });
          } else if (err.toString().toLowerCase().includes("timeout")) {
            toast.add({
                severity: "warn",
                summary: "Request Delayed",
                detail: "Request took too long to respond",
                life: 6000,
              });
            }else {
              showError.value = true;
              errMessage.value =
                err.response && err.response.data.messsage
                  ? err.response.data.messsage
                  : "Update operation was not succesfull";
              toast.add({
                severity: "warn",
                summary: "Update Failed",
                detail: errMessage.value
                  ? errMessage.value
                  : "Update operation failed",
                life: 6000,
              });
          }
          showError.value = true;
          console.log(err.response);
        }
      } else {

        try {
          loading.value = true;
          let response = await axios.post(
            "/api/people/createperson",
            formData
          );
          console.log(response)


          if (response.status === 200 || response.status === 201) {
            // store.dispatch("membership/getMembers")
            console.log(response, "response");
            membershipService.addPersonToStore(response.data.person);
            loading.value = false;
            router.push("/tenant/people");
          } 
        } catch (err) {
          console.log(err)
          loading.value = false;
          NProgress.done();
          if (err.toString().toLowerCase().includes("network error")) {
            toast.add({
              severity: "warn",
              summary: "You 're Offline",
              detail: "Please ensure you have internet access",
              life: 6000,
            });
          } 
          else {
            showError.value = true;
            loading.value = false;
            if (err.response && err.response.status === 400) {
              errMessage.value = err.response.data.message;          
            toast.add({
              severity: "warn",
              summary: "Attention!",
              detail: errMessage.value
                ? errMessage.value
                : "Save operation failed",
              life: 6000,
            });
            }
          }
        }
      }
    };

    let genders = ref(store.getters["lookups/genders"]);
    let maritalStatus = ref(store.getters["lookups/maritalStatus"]);
    let ageGroups = ref(store.getters["lookups/ageGroups"]);
    let memberships = ref(store.getters["lookups/peopleClassifications"]);

    const selectedMaritalStatus = ref(null);
    const selectedGender = ref(null);
    const selectedAgeGroup = ref(null);

     const classifications = ref([
              {label: 'Your Phone Number', controlType: 'number'},
              {label: 'Age', controlType: 'Dropdown'},
              {label: 'Enter Your role', controlType: 'text'},
              {label: 'Password', controlType: 'password'},
              {label: 'Choose your file', controlType: 'file'},
              {label: 'Enter your Email', controlType: 'email'},
              {label: 'Date', controlType: 'date'}
    ]);

    const getLookUps = () => {
      axios
        .get("/api/LookUp/GetAllLookUps")
        .then((res) => {
          console.log(res, "lksa");
          genders.value = res.data.find(
            (i) => i.type.toLowerCase() === "gender"
          ).lookUps;
          // try {
          //   selectedGender.value = genders.value.find(
          //     (i) => i.id === memberToEdit.value.genderID
          //   );
          // } catch (error) {
          //   console.log(error);
          // }

          maritalStatus.value = res.data.find(
            (i) => i.type.toLowerCase() === "maritalstatus"
          ).lookUps;
          // try {
          //   selectedMaritalStatus.value = maritalStatus.value.find(
          //     (i) => i.id === memberToEdit.value.maritalStatusID
          //   );
          // } catch (error) {
          //   console.log(error);
          // }
          console.log(maritalStatus, "MS");
        })
        .catch((err) => console.log(err.response));
    };

    const getPeopleClassifications = async () => {
      try {
        const response = await axios.get(
          "/api/Settings/GetTenantPeopleClassification"
        );
        const { data } = response;
        memberships.value = data;
        console.log(memberships.value, "ms");
        peopleClassifications.value = data.map((i) => i.name);
        getPersonPeopleClassificationId();
      } catch (err) {
        if (err.response && err.response.status === 401) {
          localStorage.removeItem("token");

          router.push("/");
        }
        console.log(err);
      }
    };

    const getAgeGroups = () => {
      console.log("Calling age");
      axios
        .get("/api/Settings/GetTenantAgeGroups")
        .then((res) => {
          ageGroups.value = res.data;
          getPersonAgeGroupId();
          console.log(ageGroups.value);
        })
        .catch((err) => console.log(err.response));
    };

    if (!genders.value || genders.value.length === 0) getLookUps();
    if (!ageGroups.value || ageGroups.value.length === 0) getAgeGroups();
    // if (!memberships.value || memberships.value.length === 0)
    // getPeopleClassifications();

    const gendersArr = computed(() => {
      return genders.value.map((i) => i.value);
    });
    const maritalStatusArr = computed(() => {
      return maritalStatus.value.map((i) => i.value);
    });

    const route = useRoute();
    const memberToEdit = ref("");

    const getPersonGenderId = () => {
      if (memberToEdit.value && memberToEdit.value.personId) {
        if (genders.value && genders.value.length > 0) {
          selectedGender.value = genders.value.find(
            (i) => i.id === memberToEdit.value.genderID
          );
        } else {
          getLookUps();
        }
      }
    };

    const getPersonMaritalStatusId = () => {
      if (memberToEdit.value && memberToEdit.value.personId) {
        selectedMaritalStatus.value = maritalStatus.value.find(
          (i) => i.id === memberToEdit.value.maritalStatusID
        );
      }
    };

    const getPersonPeopleClassificationId = () => {
      if (memberToEdit.value && memberToEdit.value.personId) {
        if (memberships.value && memberships.value.length > 0) {
          selectedMembership.value = memberships.value.find(
            (i) => i.id === memberToEdit.value.peopleClassificationID
          );
        } else {
          getPeopleClassifications();
        }
      }
    };

    const getPersonAgeGroupId = () => {
      if (memberToEdit.value && memberToEdit.value.personId) {
        if (ageGroups.value && ageGroups.value.length > 0) {
          selectedAgeGroup.value = ageGroups.value.find(
            (i) => i.id === memberToEdit.value.ageGroupID
          );
        } else {
          getAgeGroups();
        }
      }
    };

    const populatePersonDetails = async (data) => {
      person.firstName = data.firstName;
      person.email = data.email;
      person.lastName = data.lastName;
      person.firstName = data.firstName;
      person.mobilePhone = data.mobilePhone;
      person.address = data.homeAddress;
      person.occupation = data.occupation;
      person.dayOfBirth = data.dayOfBirth;
      person.monthOfBirth = data.monthOfBirth
        ? months[data.monthOfBirth - 1]
        : null;
      person.dayOfWedding = data.dayOfWedding;
      person.yearOfBirth = data.yearOfBirth;
      person.monthOfWedding = data.monthOfWedding
        ? months[data.monthOfWedding - 1]
        : null;
      person.yearOfWedding = data.yearOfWedding;
      peopleInGroupIDs.value = data.personSpecificGroups.map(i => {
        return {
          groupId: i.id,
          name: i.name,
          personInGroupID: i.personInGroupID
        }
      })

      currentContact.value = {
          name: `${data.followupPersonName}`,
          id: data.followupPersonID
        }
    };

    const getMemberToEdit = () => {
      membershipService.getMemberById(route.params.personId).then((res) => {
        memberToEdit.value = res;
        populatePersonDetails(res);
        getPersonGenderId();
        getPersonMaritalStatusId();
        getPersonPeopleClassificationId();
        getPersonAgeGroupId();
        console.log(res);
        routeParams.value = route.params.personId;
      });
    };

    if (route.params.personId) {
      getMemberToEdit(route.params.personId);
    }

    const areaInView = ref("groups");
    const position = ref("");
    const groupToAddTo = ref({});
    const allGroups = ref([]);

    const getGroups = async () => {
      try {
        let groups = store.getters["groups/groups"];

        if (groups && groups.length > 0) {
          allGroups.value = groups;
          return true;
        } else {
          let group = await grousService.getGroups();
          if (group) {
            allGroups.value = group;
          }
        }
      } catch (error) {
        console.log(error);
      }
    };
    getGroups();

    const addToGroupError = ref(false);
    const dismissAddToGroupModal = ref("");

    const addMemberToGroup = async () => {
      let groupObj = groupToAddTo.value
      console.log('personId:'+ route.params.personId, "groupId:"+ groupToAddTo.value.id,
          groupToAddTo.value.id)
      addToGroupError.value = false;
      if (!groupToAddTo.value || !groupToAddTo.value.id) {
        addToGroupError.value = true;
        return false;
      }
      dismissAddToGroupModal.value = "modal";
      if (route.params.personId) {
      let personInfo = {
      people: [
          {
            groupId: groupToAddTo.value.id ,
            position: position.value,
            personId: route.params.personId
          }
        ]
      }

        try {
        const response = await membershipService.addMemberToGroup(
          personInfo, groupToAddTo.value.id
        );
        console.log("RESPONSE", response);
        toast.add({
          severity: "success",
          summary: "Added Successfully",
          detail: `Member add to ${groupToAddTo.value.name}`,
          life: 3000,
        });

        peopleInGroupIDs.value.push({
          name: groupObj.name,
          groupId: groupObj.id,
          position: position.value
        })

        groupToAddTo.value = {}
        position.value = ""
        } catch (error) {
          console.log(error);
        }
      } else {
        console.log(groupToAddTo.value)
        peopleInGroupIDs.value.push({
          name: groupObj.name,
          groupId: groupObj.id,
          position: position.value
        })
        groupToAddTo.value = {}
        position.value = ""
      }  
    };

    const setContact = (payload) => {
        if (!payload.email) {
          toast.add({
              severity: "warn",
              summary: "No email associate with the person",
              detail: "This contact does not have any email, communicate with this person to create him as a user",
              life: 15000,
            });
        }
        followupPerson.value = payload
      }

    // const selectGroup = (item) => {
    //   groupToAddTo.value = item
    // }

    const setGroupProp = () => {
      hideDiv.value = !hideDiv.value;
      nextTick(() => {
        searchRef.value.focus()
      })
    };

    const removeFromGroup = (index, item) => {
      if (!route.params.personId) {
        peopleInGroupIDs.value.splice(index, 1)
      } else {
        let body = {
          groupId: item.groupId,
          personIds: [
            item.personInGroupID
          ]
        }

        grousService
            .removeFromGroup(item.groupId, body)
            .then((res) => {
              if (res !== false) {
                peopleInGroupIDs.value.splice(index, 1)
                toast.add({
                  severity: "success",
                  summary: "Removed",
                  detail: `${person.firstName} is removed from ${item.name} group`,
                  life: 5000,
                });
              }
            })
            .catch (err => {
              console.log(err)
            })
      }
    }

    const showConfirmModal = (index, item) => {
      confirm.require({
          message: `Are you sure you want to remove ${person.firstName} from this ${item.name} group?`,
          header: 'Confirm',
          icon: 'pi pi-info-circle',
          accept: () => {
              removeFromGroup(index, item)
          },
          reject: () => {
              toast.add({
                  severity:'error', 
                  summary:'Rejected', 
                  detail:'You have rejected', 
                  life: 3000});
          }
      });
    }

    const savePersonNote = () => {
      personNotes.value.push({
        title: noteDetails.value.noteTitle,
        description: noteDetails.value.noteDesc
      })
      noteDetails.value = {}
      dismissAddToGroupModal.value = "modal";
    }

    const searchAllGroups = computed(() => {
      if (!searchGroupText.value && allGroups.value > 0) return allGroups.value
      return allGroups.value.filter(i => i.name.toLowerCase().includes(searchGroupText.value.toLowerCase()))
    })

    const getCustomFields = async() => {
      try {
        let { data } = await axios.get(`/api/CustomFields/GetAllCustomFields`);
        console.log(data)
        // dynamicCustomFields.value = data
      }
      catch (err) {
        console.log(err)
      }
     }
    getCustomFields();

    watchEffect (() => {
      if (store.getters['groups/selectedTreeGroup']) {
        console.log(store.getters['groups/selectedTreeGroup'])
        const selectedGroup = store.getters['groups/selectedTreeGroup']
        hideDiv.value = true
        groupToAddTo.value = selectedGroup;
      }
    })

    return {
      months,
      numberofYears,
      startingYear,
      daysInBirthMonth,
      daysInAnnMonth,
      editBirthDateValue,
      editAnnDateValue,
      birthMonth,
      birthDay,
      birthYear,
      annMonth,
      annDay,
      annYear,
      areaInView,
      person,
      addPerson,
      peopleClassifications,
      url,
      memberToEdit,
      imageSelected,
      uploadImage,
      loading,
      birthDaysArr,
      birthYearsArr,
      annDaysArr,
      daysinMonth,
      errMessage,
      hideCelebTab,
      showCelebTab,
      hideAddInfoTab,
      showAddInfoTab,
      genders,
      maritalStatus,
      gendersArr,
      maritalStatusArr,
      selectedMaritalStatus,
      selectedGender,
      selectedMembership,
      memberships,
      selectedAgeGroup,
      ageGroups,
      getAgeGroups,
      showError,
      groupToAddTo,
      position,
      allGroups,
      addMemberToGroup,
      addToGroupError,
      dismissAddToGroupModal,
      routeParams,
      peopleInGroupIDs,
      setContact,
      followupPerson,
      currentContact,
      // selectGroup,
      setGroupProp,
      searchRef,
      removeFromGroup,
      personNotes,
      noteDetails,
      savePersonNote,
      searchGroupText,
      searchAllGroups,
      classifications,
      showConfirmModal,
      hideDiv
    };
  },
};
</script>


<style scoped>
* {
  box-sizing: border-box;
}

.cs-select.month {
  width: 111px;
}

.cs-select.day {
  width: 87px;
}

.cs-select.year {
  width: 113px;
}

.modal-lg {
  max-width: 600px;
}

.showtab {
  transition: all 0.5s ease-in-out;
  height: 166px;
  /* overflow: hidden; */
}

.div-card {
  position: absolute;
  background: white;
  z-index: 1;
  width: 100%;
  box-shadow: 0 0 11px rgba(33, 33, 33, 0.2);
  max-height: 400px;
  overflow: scroll;
}

@media (min-width: 769px) {
  .celeb-tab {
    margin-right: 147px;
  }
}

@media (min-width: 676px) and (max-width: 768px) {
  .showtab {
    height: 113px;
  }
}
/* @media (max-width: 676px) and (max-width: 768px) {
  .submit-div {
    float: right;
  }
} */

@media (min-width: 663px) and (max-width: 667px) {
  /* .bio-info.celeb-info {

  } */
}

/* @media (min-width: 377px) and (max-width: 662px) {
  .bio-info.celeb-info {
    margin-top: 70px;
  }
}*/

@media screen and (max-width: 620px) {
  .input {
      width: 100%
    }
}

@media (max-width: 376px) {
  /* .bio-info.celeb-info {
    margin-top: 80px;
  } */

  .cs-select.month {
    width: 85px;
  }

  .cs-select.day {
    width: 85px;
  }

  .cs-select.year {
    width: 90px;
  }
}

@media (min-width: 867px) {
  .showtab {
    height: 100px;
  }
}


.text-grey {
  color: rgb(90, 90, 90)
}

.scroll-card {
    max-height: 400px;
    overflow: scroll;
}

.input-width-adjust {
    width: 90%;
    margin: auto;
}

.nav-bar {
  position: sticky;
  top: 0;
  left: 0;
}

.info-box {
  overflow: scroll;
}
</style>