<template>
  <div class="container container-top ">
       <div class="col-md-12 d-flex justify-content-center my-3">
      <div class="col-md-3 mt-4 d-flex align-items-center">
        <div class="pl-2">
          <img
            :src="churchLogo"
            v-if="churchLogo"
            class="link-image"
            alt=""
            style="width: 60px"
          />
          <img
            src="../../assets/dashboardlinks/churchcloud.png"
            v-else
            class="link-image"
            alt=""
          />
        
        </div>
        <span
          ><h4 class="font-weight-bold mt-3">
            {{ churchName ? churchName : "Churchplus" }}
          </h4></span
        >
      </div>
    </div>
    <div class="header mt-2">
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
                <div class="cstm-select">
                  <div style="width: 330px">
                    <Dropdown
                      v-model="selectedMembership"
                      :options="memberships"
                      optionLabel="name"
                      placeholder="--Select membership--"
                      style="width: 100%"
                    />
                  </div>
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
              <div
                v-for="item in dynamicCustomFields"
                :key="item.id"
                style="margin: 0 10px 10px 10px"
                class="d-md-flex flex-wrap justify-content-md-end"
              >
                <label for="" class="label">{{ item.label }}</label>
                <input
                  v-if="item.controlType == 4"
                  class="input form-control"
                  type="email"
                  aria-required=""
                  v-model="item.data"
                />
                <input
                  v-if="item.controlType == 6"
                  class="input"
                  type="file"
                  aria-required=""
                />
                <input
                  v-if="item.controlType == 7"
                  class="input"
                  type="number"
                  aria-required=""
                  v-model="item.data"
                />
                <input
                  v-if="item.controlType == 0"
                  class="input form-control"
                  type="text"
                  aria-required=""
                  v-model="item.data"
                />
                <div class="cstm-select" v-else-if="item.controlType == 1">
                  <div style="width: 330px">
                    <Dropdown
                      v-model="item.data"
                      :options="item.parameterValues.split(',')"
                      :placeholder="item.label"
                      style="width: 100%"
                    />
                  </div>
                </div>
                <div class="cstm-select" v-else-if="item.controlType == 2">
                  <div style="width: 330px">
                    <Checkbox
                      v-model="item.data"
                      :binary="true"
                      style="width: 100%"
                    />
                  </div>
                </div>

                <div class="cstm-select">
                  <div style="width: 330px">
                    <Calendar
                      v-if="item.controlType == 3"
                      id="time24"
                      v-model="item.data"
                      :showTime="true"
                      :showSeconds="true"
                      style="width: 100%"
                    />
                  </div>
                </div>
              </div>
              <!-- </div> -->

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
                      style="
                        width: 110px;
                        height: 110px;
                        border-radius: 50%;
                        object-fit: cover;
                      "
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
                      style="
                        width: 110px;
                        height: 110px;
                        border-radius: 50%;
                        object-fit: cover;
                      "
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
            <span class="tab-header padd col-3">Celebrations:</span>
            <span class="h-rule col-7">
              <hr class="hr" />
            </span>
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
                        :options="birthDaysArr"
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
                        :options="months"
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
                        :options="birthYearsArr"
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
                        :options="annDaysArr"
                        style="width: 100%"
                      />
                      <!-- <SelectElem :typ="'membership'" name="annday" :options="['Day', ...annDaysArr]" value="Day" @input="itemSelected"/> -->
                    </div>
                  </div>

                  <div class="cstm-select">
                    <div class="cs-select month">
                      <Dropdown
                        v-model="person.monthOfWedding"
                        :options="months"
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
                        :options="birthYearsArr"
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
          <span class="celeb-tab row">
            <span class="tab-header col-3">Additional information:</span>
            <span class="h-rule col-7">
              <hr class="hr" />
            </span>
            <span class="col-2">
              <!-- <span class="tb-icon-span"
                ><i
                  class="pi pi-angle-down tbb-icon"
                  :class="{ 'tb-icon': !hideAddInfoTab }"
                ></i
              ></span> -->
            </span>
          </span>
          <div class="bio-info">
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
                  <div class="cs-select age-group">
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
            </div>

            <div class="image-div other">
              <!-- white space -->
            </div>
          </div>
        </div>

        <!-- DISABLED -->
        <!-- <div
          v-if="true"
          class="add-info--con"
          :class="{
            'hide-tab': hideAddInfoTab,
            'show-addinfo-tab': !hideAddInfoTab,
          }"
        > -->
        <div v-if="true" class="add-info--con">
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
              <div
                class="font-weight-700"
                v-if="peopleInGroupIDs.length > 0 && areaInView === 'groups'"
              >
                Groups added
              </div>
              <div v-if="areaInView === 'groups'">
                <span v-for="item in peopleInGroupIDs" :key="item.id"
                  >| &nbsp;
                  <span class="text-grey"
                    >{{ item.name }} &nbsp;
                    <i
                      v-if="!routeParams"
                      class="pi pi-times-circle text-danger c-pointer"
                      @click="removeFromGroup(index)"
                    ></i></span
                  >&nbsp; | &nbsp;
                </span>
              </div>
              <div v-if="areaInView === 'notes'">
                <div v-for="(item, index) in personNotes" :key="index">
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
            class="
              primary-bg
              px-md-4
              outline-none
              default-btn
              text-white
              border-0
            "
            :disabled="loading || !person.firstName"
          >
            <i class="fas fa-circle-notch fa-spin mr-2" v-if="loading"></i>
            <span>Save</span>
            <span></span>
          </button>
        </div>
      </form>
      <div class="row">
               <div class="col-12 d-flex justify-content-center">
                    <div
                      class="
                        col-md-6
                        text-center
                        align-item-center
                        px-md-4
                        mb-3
                        mt-5
                      "
                    >
                      <a href="/" class="text-decoration-none">
                        <div class="">Powered by</div>
                        <div
                          class="
                            img-fluid
                            col-6
                            offset-3
                            col-md-4
                            offset-md-4
                            px-0
                          "
                        >
                          <img
                            src="../../assets/logoblue.png"
                            alt="churchplus Logo"
                            class="w-50 mx-2"
                          />
                        </div>
                      </a>
                    </div>
                  </div>    
          </div>
    </div>

    <!-- Modal
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
                <Dropdown
                  v-model="groupToAddTo"
                  :options="allGroups"
                  style="width: 100%"
                  :filter="false"
                  placeholder="Select a group"
                  optionLabel="name"
                />
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
                  <div class="col-6 d-md-flex justify-content-end">
                    <button class="default-btn" data-dismiss="modal">Cancel</button>
                  </div>
                  <div class="col-6">
                    <button
                      class="default-btn primary-bg border-0 contn-btn text-white"
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
    </div> -->
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
                <div class="dropdown show">
                  <button
                    class="
                      btn
                      border
                      w-100
                      d-flex
                      justify-content-between
                      align-items-center
                    "
                    type="button"
                    id="dropdownMenuLink"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                    @click="focusInput"
                  >
                    <div>
                      {{
                        Object.keys(groupToAddTo).length > 0
                          ? groupToAddTo.name
                          : "Select a group"
                      }}
                    </div>
                    <i class="pi pi-chevron-down"></i>
                  </button>
                  <div
                    class="dropdown-menu w-100 scroll-card"
                    aria-labelledby="dropdownMenuLink"
                  >
                    <input
                      type="text"
                      v-model="searchGroupText"
                      class="form-control input-width-adjust"
                      placeholder="Search groups"
                      ref="searchRef"
                    />
                    <a
                      class="dropdown-item"
                      v-for="item in searchAllGroups"
                      :key="item.id"
                    >
                      <div class="c-pointer" @click="selectGroup(item)">
                        {{ item.name }}
                      </div>
                    </a>
                  </div>
                </div>
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
                    <button class="default-btn" data-dismiss="modal">
                      Cancel
                    </button>
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
                <input
                  type="text"
                  class="form-control"
                  v-model="noteDetails.noteTitle"
                  placeholder="Enter title"
                />
              </div>
            </div>

            <div class="row">
              <div class="col-md-4 text-md-right">
                <label for="" class="font-weight-600">Description</label>
              </div>
              <div class="col-md-7">
                <textarea
                  rows="5"
                  class="form-control"
                  v-model="noteDetails.noteDesc"
                  placeholder="Enter note description"
                ></textarea>
              </div>
            </div>

            <div class="row">
              <div class="col-md-4">
                <label for="" class="font-weight-600"></label>
              </div>

              <div class="col-md-7 mt-3">
                <div class="row mt-2">
                  <div class="col-md-6 d-md-flex justify-content-end">
                    <button class="default-btn" data-dismiss="modal">
                      Cancel
                    </button>
                  </div>
                  <div class="col-md-6">
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
</template>

<script>
import moment from "moment";
import { ref, reactive, computed } from "vue";
// import router from "@/router/index";
// import store from "../../store/store"
import axios from "@/gateway/backendapi";
import { useRoute } from "vue-router";
// import { getCurrentInstance } from "vue";
// import InputText from "primevue/inputtext";
import Calendar from "primevue/calendar";
import Dropdown from "primevue/dropdown";
import { useToast } from "primevue/usetoast";
import { useStore } from "vuex";
// import { useConfirm } from "primevue/useconfirm";
import membershipService from "../../services/membership/membershipservice";
import swal from "sweetalert";
// import lookupService from "../../services/lookup/lookupservice";

export default {
  components: { Dropdown, Calendar, 
  
  // InputText
   },
  setup() {
    // const $toast = getCurrentInstance().ctx.$toast;
    const toast = useToast();
    const store = useStore();
    const hideCelebTab = ref(false);
    // const confirm = useConfirm();
    const hideAddInfoTab = ref(true);
    const showCelebTab = () => (hideCelebTab.value = !hideCelebTab.value);
    const showAddInfoTab = () => (hideAddInfoTab.value = !hideAddInfoTab.value);
    const routeParams = ref("");
    const peopleInGroupIDs = ref([]);
    const route = useRoute();
    const searchGroupText = ref("");
    const searchRef = ref(null);
    const personNotes = ref([]);
    const dynamicCustomFields = ref([]);
    const noteDetails = ref({});
    const churchLogo = ref("");
    const churchName = ref("");

    const loading = ref(false);
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const birthMonth = ref(1);
    const birthDay = ref(1);
    const birthYear = ref(1922);

    const startingYear = 1920;
    const numberofYears = 100;

    const birthDate = moment();

    const daysInBirthMonth = ref(birthDate.daysInMonth());

    const getCustomFields = async () => {
      try {
        let { data } = await axios.get(
          `/GetAllCustomFields?entityType=0&&tenantID=${route.params.id}`
        );
        dynamicCustomFields.value = data;
      } catch (err) {
        console.log(err);
      }
    };
    getCustomFields();

    const birthDaysArr = computed(() => {
      console.log(birthDate.month(), "month");
      const arrOfDays = [];
      console.log(daysInBirthMonth.value, "dm");
      for (let i = 1; i <= daysInBirthMonth.value; i++) {
        arrOfDays.push(i);
      }
      return arrOfDays;
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
      const arrOfDays = [];
      for (let i = 1; i <= daysInAnnMonth.value; i++) {
        arrOfDays.push(i);
      }
      return arrOfDays;
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
    const disableClick = ref(false);

    const addPerson = async () => {
      disableClick.value = true;
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
      formData.append("dayOfBirth", +personObj.dayOfBirth);
      formData.append(
        "monthOfBirth",
        months.indexOf(personObj.monthOfBirth) >= 0
          ? months.indexOf(personObj.monthOfBirth) + 1
          : 0
      );
      formData.append("yearOfBirth", +personObj.yearOfBirth);
      formData.append(
        "occupation",
        personObj.occupation ? personObj.occupation : ""
      );
      formData.append("yearOfWedding", +personObj.yearOfWedding);
      formData.append(
        "monthOfWedding",
        months.indexOf(personObj.monthOfWedding) >= 0
          ? months.indexOf(personObj.monthOfWedding) + 1
          : 0
      );
      formData.append("dayOfWedding", +personObj.dayOfWedding);
      formData.append(
        "peopleClassificationID",
        selectedMembership.value ? selectedMembership.value.id : ""
      );
      formData.append(
        "personGroups",
        peopleInGroupIDs.value.length > 0
          ? JSON.stringify(
              peopleInGroupIDs.value.map((i) => {
                delete i.name;
                return i;
              })
            )
          : []
      );
      formData.append(
        "homeAddress",
        personObj.address ? personObj.address : ""
      );
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
        "note",
        personNotes.value ? JSON.stringify(personNotes.value) : []
      );
      formData.append(
        "customAttributeData",
        JSON.stringify(
          dynamicCustomFields.value.map((i) => ({
            customAttributeID: i.id,
            data: i.data,
            entityID: route.params.personId,
          }))
        )
      );
      try {
        loading.value = true;
        let response = await axios.post(
          `/PublicMemberRegister?tenantID=${route.params.id}`,
          formData
        );
        console.log(response);
        disableClick.value = false;

        if (response.status === 200 || response.status === 201) {
          loading.value = false;
          swal(
            "Registration Successful!",
            "Your membership details has been added successfully!",
            "success"
          );
        }
        selectedGender.value = "";
        selectedAgeGroup.value = "";
        selectedMaritalStatus.value = "";
        person.firstName = "";
        person.lastName = "";
        person.mobilePhone = "";
        person.email = "";
        person.address = "";
        person.dayOfBirth = "";
        person.monthOfBirth = "";
        person.yearOfBirth = "";
        person.dayOfWedding = "";
        person.monthOfWedding = "";
        person.yearOfWedding = "";
        person.occupation = "";
      } catch (err) {
        console.log(err);
        loading.value = false;
        if (err.toString().toLowerCase().includes("network error")) {
          toast.add({
            severity: "warn",
            summary: "You 're Offline",
            detail: "Please ensure you have internet access",
            life: 6000,
          });
        } else {
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
    };

    let ageGroups = ref([]);
    let genders = ref(store.getters["lookups/genders"]);
    let maritalStatus = ref(store.getters["lookups/maritalStatus"]);
    let memberships = ref([]);

    const selectedMaritalStatus = ref(null);
    const selectedGender = ref(null);
    const selectedAgeGroup = ref(null);

    const getLookUps = () => {
      axios
        .get("/api/LookUp/GetAllLookUps")
        .then((res) => {
          genders.value = res.data.find(
            (i) => i.type.toLowerCase() === "gender"
          ).lookUps;
          maritalStatus.value = res.data.find(
            (i) => i.type.toLowerCase() === "maritalstatus"
          ).lookUps;
        })
        .catch((err) => console.log(err.response));
    };

    const getPeopleClassifications = async () => {
      try {
        const response = await axios.get(
          `/public/PeopleClassifications?tenantId=${route.params.id}`
        );
        const { data } = response;
        memberships.value = data;
        console.log(memberships.value, "ms");
        // peopleClassifications.value = data.map((i) => i.name);
        // getPersonPeopleClassificationId();
      } catch (err) {
        console.log(err);
      }
    };
    getPeopleClassifications();

    const getAgeGroups = () => {
      axios
        .get(`/public/AgeGroups?tenantId=${route.params.id}`)
        .then((res) => {
          ageGroups.value = res.data;
          // getPersonAgeGroupId();
          console.log(ageGroups.value);
        })
        .catch((err) => console.log(err.response));
    };

    if (!genders.value || genders.value.length === 0) getLookUps();
    if (!ageGroups.value || ageGroups.value.length === 0) getAgeGroups();
    // if (!memberships.value || memberships.value.length === 0)
    //

    const gendersArr = computed(() => {
      return genders.value.map((i) => i.value);
    });
    const maritalStatusArr = computed(() => {
      return maritalStatus.value.map((i) => i.value);
    });

    const memberToEdit = ref({});

    // const getPersonGenderId = () => {
    //   if (memberToEdit.value && memberToEdit.value.personId) {
    //     if (genders.value && genders.value.length > 0) {
    //       selectedGender.value = genders.value.find(
    //         (i) => i.id === memberToEdit.value.genderID
    //       );
    //     } else {
    //       getLookUps();
    //     }
    //   }
    // };

    // const getPersonMaritalStatusId = () => {
    //   if (memberToEdit.value && memberToEdit.value.personId) {
    //     selectedMaritalStatus.value = maritalStatus.value.find(
    //       (i) => i.id === memberToEdit.value.maritalStatusID
    //     );
    //   }
    // };

    // const getPersonPeopleClassificationId = () => {
    //   if (memberToEdit.value && memberToEdit.value.personId) {
    //     if (memberships.value && memberships.value.length > 0) {
    //       selectedMembership.value = memberships.value.find(
    //         (i) => i.id === memberToEdit.value.peopleClassificationID
    //       );
    //     } else {
    //       getPeopleClassifications();
    //     }
    //   }
    // };

    // const getPersonAgeGroupId = () => {
    //   if (memberToEdit.value && memberToEdit.value.personId) {
    //     if (ageGroups.value && ageGroups.value.length > 0) {
    //       selectedAgeGroup.value = ageGroups.value.find(
    //         (i) => i.id === memberToEdit.value.ageGroupID
    //       );
    //     } else {
    //       getAgeGroups();
    //     }
    //   }
    // };

    // const populatePersonDetails = (data) => {
    //   console.log(data, "🛒🛒🛒🛒🛒🛒")
    //   person.firstName = data.firstName;
    //   person.email = data.email;
    //   person.lastName = data.lastName;
    //   person.firstName = data.firstName;
    //   person.mobilePhone = data.mobilePhone;
    //   person.address = data.homeAddress;
    //   person.occupation = data.occupation;
    //   person.dayOfBirth = data.dayOfBirth;
    //   person.monthOfBirth = data.monthOfBirth
    //     ? months[data.monthOfBirth - 1]
    //     : null;
    //   person.dayOfWedding = data.dayOfWedding;
    //   person.yearOfBirth = data.yearOfBirth;
    //   person.monthOfWedding = data.monthOfWedding
    //     ? months[data.monthOfWedding - 1]
    //     : null;
    //   person.yearOfWedding = data.yearOfWedding;
    //   peopleInGroupIDs.value = data.personSpecificGroups.map(i => {
    //     return {
    //       groupId: i.id,
    //       name: i.name
    //     }
    //   })
    // };

    // const getMemberToEdit = () => {
    //   membershipService.getMemberById(route.params.personId).then((res) => {
    //     memberToEdit.value = res;
    //     populatePersonDetails(res);
    //     getPersonGenderId();
    //     getPersonMaritalStatusId();
    //     getPersonPeopleClassificationId();
    //     getPersonAgeGroupId();
    //     console.log(res);
    //     routeParams.value = route.params.personId;
    //   });
    // };

    // if (route.params.personId) {
    //   getMemberToEdit(route.params.personId);
    // }

    const areaInView = ref("groups");
    const position = ref("");
    const groupToAddTo = ref({});
    const allGroups = ref([]);


    const getPublicMember = async () => {
      try {
        const res = await axios.get(`/TenantInfo?tenantID=${route.params.id}`);
        console.log(res.data, "public member😎😎🤦‍♀️");
        churchLogo.value = res.data.logo;
        churchName.value = res.data.name;
        console.log(churchLogo.value, 
        "😎")

      } 
      catch (error) {
        console.log(error);
        
      }
      
    };
    getPublicMember();

    const getGroups = async () => {
      try {
        let groups = await axios.get(
          `/public/groups?tenantId=${route.params.id}`
        );
        console.log(groups);
        allGroups.value = groups.data;
      } catch (error) {
        console.log(error);
      }
    };
    getGroups();


    const addToGroupError = ref(false);
    const dismissAddToGroupModal = ref("");

    const addMemberToGroup = async () => {
      console.log(
        "personId:" + route.params.personId,
        "groupId:" + groupToAddTo.value.id,
        groupToAddTo.value.id
      );
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
              groupId: groupToAddTo.value.id,
              position: position.value,
              personId: route.params.personId,
            },
          ],
        };

        try {
          const response = await membershipService.addMemberToGroup(
            personInfo,
            groupToAddTo.value.id
          );
          console.log("RESPONSE", response);
          toast.add({
            severity: "success",
            summary: "Added Successfully",
            detail: `Member add to ${groupToAddTo.value.name}`,
            life: 3000,
          });

          peopleInGroupIDs.value.push({
            name: groupToAddTo.value.name,
            groupId: groupToAddTo.value.id,
            position: position.value,
          });

          groupToAddTo.value = {};
          position.value = "";
        } catch (error) {
          console.log(error);
        }
      } else {
        console.log(groupToAddTo.value);
        peopleInGroupIDs.value.push({
          name: groupToAddTo.value.name,
          groupId: groupToAddTo.value.id,
          position: position.value,
        });
        groupToAddTo.value = {};
        position.value = "";
      }
    };

    const searchAllGroups = computed(() => {
      if (!searchGroupText.value && allGroups.value.length > 0) {
        return allGroups.value;
      } else {
        return allGroups.value.filter((i) => {
          if (i.name)
            return i.name
              .toLowerCase()
              .includes(searchGroupText.value.toLowerCase());
        });
      }
    });

    const focusInput = () => {
      setTimeout(() => {
        searchRef.value.focus();
      }, 1000);
    };

    const selectGroup = (item) => {
      groupToAddTo.value = item;
    };

    const removeFromGroup = (index) => {
      peopleInGroupIDs.value.splice(index, 1);
    };

    const savePersonNote = () => {
      personNotes.value.push({
        title: noteDetails.value.noteTitle,
        description: noteDetails.value.noteDesc,
      });
      noteDetails.value = {};
      dismissAddToGroupModal.value = "modal";
    };

    return {
      disableClick,
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
      searchGroupText,
      searchAllGroups,
      focusInput,
      searchRef,
      selectGroup,
      removeFromGroup,
      personNotes,
      noteDetails,
      savePersonNote,
      dynamicCustomFields,
      churchLogo,
      churchName,
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

@media screen and (max-width: 241px) {
  .padd {
    padding: 1rem;
  }
}

.contn-btn:disabled {
  opacity: 0.3;
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

.cs-select.age-group {
  width: 330px;
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

@media (max-width: 620px) {
  .cs-select {
    width: 100%;
  }

  .cs-select.age-group {
    width: 100%;
  }

  .cstm-select {
    width: 100%;
    margin-right: 0;
  }

  .input {
    margin: 0;
  }

  .label-text-box {
    padding: 0;
  }
}

@media (min-width: 867px) {
  .showtab {
    height: 100px;
  }
}

.text-grey {
  color: rgb(90, 90, 90);
}

.nav-bar {
  position: sticky;
  top: 0;
  left: 0;
}

.info-box {
  overflow: scroll;
}

.scroll-card {
  max-height: 400px;
  overflow: scroll;
}

.input-width-adjust {
  width: 90%;
  margin: auto;
}
</style>