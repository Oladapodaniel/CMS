<template>
  <div class="container">
    <div class="row">
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
          <span>
            <h4 class="font-weight-bold text-head text-black h2 mt-3">
              {{ churchName ? churchName : "Churchplus" }}
            </h4>
          </span>
        </div>
      </div>
    </div>
    <div class="text-head font-weight-bold text-black h2 ">Add Member</div>
    <div class="grey-backg py-2 border-radius-8 col-md-4 s-18 text-dak">
      <span class="linear-gradient">Members > Add Member</span>
    </div>

    <div class="row mt-2">
      <div class="col-md-12 d-flex justify-content-center">
        <div class="col-md-8 col-8 fw-500 s-24 mb-4">Biodata</div>
      </div>
    </div>
    <el-container>
      <el-row :gutter="15" class="w-100 m-0">
        <el-col class="d-block d-md-none">
          <div class="grey-bg">
            <div class="bg-photo border-radius-8 py-4">
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
            </div>

            <div>
              <div class="cs-input">
                <label for="imgUpload" class="choose-file">
                  Choose image
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
          </div>
        </el-col>
        <el-col :sm="16" :md="16" :lg="16" :xl="16" class="p-0">
          <el-form :model="person" style="width: 100%">
            <el-form-item v-if="branchItems && branchList.length > 1">
              <div class="d-flex flex-column flex-lg-row justify-content-end w-100">
                <label for="firstName" class="mr-3 s-18 fw-500 text-dak">Choose branch</label>
                <el-select-v2
                  v-model="branchClassificationId"
                  @change="setSelectedBranch"
                  :options="branchList.map((i) => ({ label: i.name, value: i.id }))"
                  placeholder="Select Branch"
                  size="large"
                  class="input-width"
                />
              </div>
              <div v-if="loadingValue" class="col-md-12 d-flex justify-content-center">
                <el-icon :size="20" class="is-loading">
                  <Loading />
                </el-icon>
              </div>
            </el-form-item>
            <el-form-item>
              <div class="d-flex flex-column flex-lg-row justify-content-end w-100">
                <label for="firstName" class="mr-3 s-18 fw-500 text-dak">Membership</label>
                <el-select-v2
                  v-model="memberClassificationId"
                  @change="setSelectedMem"
                  :options="memberships.map((i) => ({ label: i.name, value: i.id }))"
                  placeholder="--Select membership--"
                  size="large"
                  class="input-width"
                />
              </div>
            </el-form-item>
            <el-form-item>
              <div class="d-flex flex-column flex-lg-row justify-content-end w-100">
                <label for="firstName" class="mr-3 s-18 fw-500 text-dak"
                  >Firstname<span style="color: red"> *</span></label
                >
                <el-input
                  type="text"
                  class="input-width"
                  v-model="person.firstName"
                  placeholder="First name"
                />
              </div>
            </el-form-item>
            <el-form-item>
              <div class="d-flex flex-column flex-lg-row justify-content-end w-100">
                <label for="firstName" class="mr-3 s-18 fw-500 text-dak">Surname</label>
                <el-input
                  type="text"
                  class="input-width"
                  v-model="person.lastName"
                  placeholder="Last name"
                />
              </div>
            </el-form-item>
            <el-form-item>
              <div class="d-flex flex-column flex-lg-row justify-content-end w-100">
                <label for="firstName" class="mr-3 s-18 fw-500 text-dak">Phone number</label>
                <vue-tel-input
                  style="height: 40px"
                  class="input-width"
                  v-model="person.mobilePhone"
                  mode="international"
                ></vue-tel-input>
              </div>
            </el-form-item>
            <el-form-item>
              <div class="d-flex flex-column flex-lg-row justify-content-end w-100">
                <label for="firstName" class="mr-3 s-18 fw-500 text-dak">Email</label>
                <el-input
                  type="text"
                  class="input-width"
                  v-model="person.email"
                  placeholder="Email"
                />
              </div>
            </el-form-item>
            <el-form-item>
              <div class="d-flex flex-column flex-lg-row justify-content-end w-100">
                <label for="firstName" class="mr-3 s-18 fw-500 text-dak">Address</label>
                <el-input
                  type="text"
                  class="input-width"
                  v-model="person.address"
                  placeholder="Address"
                />
              </div>
            </el-form-item>
            <el-form-item>
              <div class="d-flex flex-column flex-lg-row justify-content-end w-100">
                <div class="input-width d-flex">
                  <el-select-v2
                    v-model="maritalStatusId"
                    @change="setSelectedMaritalStatus"
                    :options="
                      maritalStatus.map((i) => ({
                        label: i.value,
                        value: i.id,
                      }))
                    "
                    placeholder="Marital status"
                    size="large"
                    class="w-100 mr-1"
                  />
                  <el-select-v2
                    v-model="genderId"
                    @change="setSelectedGender"
                    :options="
                      genders && genders.length > 0
                        ? genders.map((i) => ({ label: i.value, value: i.id }))
                        : []
                    "
                    placeholder="Gender"
                    size="large"
                    class="w-100 ml-1"
                  />
                </div>
              </div>
            </el-form-item>
            <el-form-item v-if="!route.query.groupID">
              <div class="d-flex flex-column flex-lg-row justify-content-end w-100">
                <label for="" class="s-18 fw-500 text-dak related-info"
                  >Which Group[s] Do You Belong To?
                </label>
                <div class="input-width d-flex">
                  <el-tabs type="border-card" class="w-100 border-0">
                    <div class="add-group bg-white">
                      <div
                        v-for="(item, index) in peopleInGroupIDs"
                        :key="index"
                      >
                        <div
                          class="d-flex justify-content-between align-items-center"
                        >
                          <div class="pt-1">
                            <span class="text-secondary">{{ index + 1 }}.</span>
                            <span class="font-weight-700">{{ item.name }}</span>
                          </div>
                          <el-icon
                            class="text-danger"
                            @click="showConfirmModal(index, item)"
                            ><CircleClose
                          /></el-icon>
                        </div>
                      </div>
                      <div v-if="peopleInGroupIDs.length === 0">
                        <div class="s-18 fw-500 text-head text-dak">Group</div>
                        <div class="s-18 text-head text-dak">
                          No group added yet
                        </div>
                      </div>
                      <div
                        class="py-2 mt-2 font-weight-600 text-head border-line primary--text text-center c-pointer"
                        @click="chooseGroup"
                      >
                        Choose group
                      </div>
                    </div>
                  
                  </el-tabs>
                </div>
              </div>
            </el-form-item>
            <div class="d-flex align-items-center">
              <div class="font-weight-600 s-18 text-dak">Celebrations</div>
              <el-divider> </el-divider>
              <div>
                <el-icon class="angle-icon" @click="showCelebration = !showCelebration">
                  <ArrowDownBold />
                </el-icon>
              </div>
            </div>
            <el-collapse-transition>
              <div v-show="showCelebration">
                <el-form-item>
                  <div class="d-flex flex-column flex-lg-row justify-content-end w-100">
                    <div class="mr-3 s-18 fw-500 text-dak">Birthday</div>
                    <div class="input-width d-flex">
                      <el-select-v2
                        v-model="person.dayOfBirth"
                        :options="[
                          { label: 'Day', value: 0 },
                          ...birthDaysArr.map((i) => ({ label: i, value: i })),
                        ]"
                        placeholder="Day"
                        size="large"
                        class="w-100 mr-1"
                      />
                      <el-select-v2
                        v-model="person.monthOfBirth"
                        :options="[
                          { label: 'Month', value: 0 },
                          ...months.map((i) => ({ label: i, value: i })),
                        ]"
                        placeholder="Month"
                        size="large"
                        class="w-100 ml-1"
                      />
                      <el-select-v2
                        v-model="person.yearOfBirth"
                        :options="[
                          { label: 'Year', value: 0 },
                          ...birthYearsArr.map((i) => ({ label: i, value: i })),
                        ]"
                        placeholder="Year"
                        size="large"
                        class="w-100 ml-1"
                      />
                    </div>
                  </div>
                </el-form-item>
                <el-form-item>
                  <div class="d-flex flex-column flex-lg-row justify-content-end w-100">
                    <div class="mr-3 s-18 fw-500 text-dak">Wedding Anniversary</div>
                    <div class="input-width d-flex">
                      <el-select-v2
                        v-model="person.dayOfWedding"
                        :options="[
                          { label: 'Day', value: 0 },
                          ...annDaysArr.map((i) => ({ label: i, value: i })),
                        ]"
                        placeholder="Day"
                        size="large"
                        class="w-100 mr-1"
                      />
                      <el-select-v2
                        v-model="person.monthOfWedding"
                        @change="editAnnDateValue('month', person.monthOfWedding)"
                        :options="[
                          { label: 'Month', value: 0 },
                          ...months.map((i) => ({ label: i, value: i })),
                        ]"
                        placeholder="Month"
                        size="large"
                        class="w-100 ml-1"
                      />
                      <el-select-v2
                        v-model="person.yearOfWedding"
                        :options="[
                          { label: 'Year', value: 0 },
                          ...birthYearsArr.map((i) => ({ label: i, value: i })),
                        ]"
                        placeholder="Year"
                        size="large"
                        class="w-100 ml-1"
                      />
                    </div>
                  </div>
                </el-form-item>
              </div>
            </el-collapse-transition>

            <div class="d-flex align-items-center">
              <div class="font-weight-600 s-18 text-dak">Additional~Information:</div>
              <el-divider> </el-divider>
              <!-- <div>
                <el-icon class="angle-icon" @click="showAddInfo = !showAddInfo">
                  <ArrowDownBold />
                </el-icon>
              </div> -->
            </div>
            <!-- <el-collapse-transition> -->
            <!-- <div v-show="showAddInfo"> -->
            <div>
              <el-form-item>
                <div class="d-flex flex-column flex-lg-row justify-content-end w-100">
                  <label for="occupation" class="mr-3 s-18 fw-500 text-dak">Occupation</label>
                  <el-input
                    type="text"
                    class="input-width"
                    v-model="person.occupation"
                    placeholder="Occupation"
                  />
                </div>
              </el-form-item>
              <el-form-item>
                <div class="d-flex flex-column flex-lg-row justify-content-end w-100">
                  <div class="mr-3 s-18 fw-500 text-dak">Age group</div>
                  <div class="input-width d-flex">
                    <el-select-v2
                      v-model="ageGroupId"
                      @change="setSelectedAgeGroup"
                      :options="ageGroups.map((i) => ({ label: i.name, value: i.id }))"
                      placeholder="Age group"
                      size="large"
                      class="w-100 mr-1"
                    />
                  </div>
                </div>
              </el-form-item>
              <el-form-item v-for="(item, index) in dynamicCustomFields" :key="index">
                <div class="d-flex flex-column flex-lg-row justify-content-end w-100">
                  <label for="occupation" class="mr-3 s-18 fw-500 text-dak">{{
                    item.label
                  }}</label>
                  <div class="input-width d-flex" v-if="item.controlType == 1">
                    <el-select-v2
                      v-model="item.data"
                      :options="
                        item.parameterValues
                          .split(',')
                          .map((i) => ({ label: i, value: i }))
                      "
                      :placeholder="item.label"
                      size="large"
                      class="w-100 mr-1"
                    />
                  </div>
                  <el-input
                    type="text"
                    class="input-width"
                    v-model="item.data"
                    :placeholder="item.label"
                    v-if="item.controlType == 0"
                  />
                  <el-input
                    type="number"
                    class="input-width"
                    v-model="item.data"
                    :placeholder="item.label"
                    v-if="item.controlType == 7"
                  />
                  <el-input
                    type="email"
                    class="input-width"
                    v-model="item.data"
                    :placeholder="item.label"
                    v-if="item.controlType == 4"
                  />
                  <div class="input-width" v-if="item.controlType == 2">
                    <el-checkbox v-model="item.data" size="large" />
                  </div>
                  <el-date-picker
                    v-model="item.data"
                    class="input-width"
                    type="date"
                    :placeholder="item.label"
                    size="default"
                    v-if="item.controlType == 3"
                  />
                  <div class="d-flex align-items-center" v-if="item.controlType == 6">
                    <input
                      type="file"
                      class="form-control input-width"
                      @change="uploadImage($event, index)"
                      :placeholder="item.label"
                    />
                    <el-icon class="is-loading ml-2" v-if="customFileLoading">
                      <Loading />
                    </el-icon>
                  </div>
                </div>
              </el-form-item>
              <div class="d-flex flex-column flex-lg-row justify-content-end w-100">
                <label for="occupation" class="mr-3 s-18 fw-500 text-dak"></label>
                <div class="input-width small-text">
                  By checking the box below, you consent to
                  {{ churchName ? churchName : "Churchplus" }} collecting and processing
                  your personal information for communication and ministry database. You
                  may withdraw this consent at any time. For more information, please
                  review our
                  <a
                    class="text-decoration-none"
                    href="https://churchplus.co/privacy-policy/"
                    target="_blank"
                  >
                    Privacy Policy.</a
                  >
                </div>
              </div>
              <div class="d-flex flex-column flex-lg-row mt-2 justify-content-end w-100">
                <div></div>
                <div class="d-flex input-width">
                  <el-checkbox v-model="checked" size="large" />
                  <div class="mt-2 ml-1 small-text">
                    I consent to the collection and processing of my personal information.
                  </div>
                </div>
              </div>
            </div>
            <!-- </el-collapse-transition> -->

            <div class="d-flex flex-column flex-lg-row justify-content-end mt-3 w-100">
              <div></div>
              <div class="input-width d-flex justify-content-center my-4">
                <el-button
                  :loading="loading"
                  :disabled="loading || !person.firstName || !checked"
                  :color="primarycolor"
                  class="w-100"
                  @click="addPerson"
                  round
                  >Save</el-button
                >
              </div>
            </div>
          </el-form>
        </el-col>
        <el-col :xs="24" :sm="8" :md="8" :lg="8" :xl="8">
          <div class="grey-bg d-none d-md-block">
            <div class="bg-photo border-radius-8 py-4">
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
            </div>
            <div>
              <div class="cs-input">
                <label for="imgUpload" class="choose-file">
                  Choose image
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
          </div>
        </el-col>
      </el-row>
    </el-container>

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
            <h5 class="modal-title font-weight-bold" id="personNote">Add Note</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="row my-4">
              <div class="col-md-4 text-md-right">
                <label for="" class="s-18 fw-500 text-dak">Title</label>
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
                <label for="" class="s-18 fw-500 text-dak">Description</label>
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
                <label for="" class="s-18 fw-500 text-dak"></label>
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
    <el-dialog
      style="border-radius: 20px"
      v-model="showChooseGroup"
      :width="mdAndUp || lgAndUp || xlAndUp ? `50%` : `90%`"
      top
    >
      <div class="row justify-content-center">
        <div class="col-md-12">
          <div class="s-32 fw-500 text-center text-black">Group Membership</div>
        </div>
        <div class="col-md-12 d-flex justify-content-center">
          <div class="col-md-9">
            <div class="row my-4">
              <div class="col-md-12">
                <label for="" class="fw-500 s-18">Group</label>
              </div>
              <div class="col-md-12">
                <el-tree-select
                  v-model="selectedTree"
                  class="w-100"
                  placeholder="Select group"
                  :data="groupMappedTree"
                  :render-after-expand="false"
                  :filter-node-method="filterNodeMethod"
                  @change="setGroupValue"
                  filterable
                  check-strictly
                />
              </div>
            </div>
            <div class="row">
              <div class="col-md-12">
                <label for="" class="fw-500 s-18">Position</label>
              </div>
              <div class="col-md-12">
                <el-input
                  type="text"
                  v-model="position"
                  class="w-100"
                  placeholder="e.g Member"
                />
              </div>
            </div>

            <div class="row">
              <div class="col-md-12">
                <div class="col-md-12 mt-2 text-center">
                  <p class="my-1 text-danger" v-if="addToGroupError">
                    Please select a group
                  </p>
                </div>
                <div class="col-md-12 mt-3">
                  <div>
                    <el-button
                      :color="primarycolor"
                      :loading="addToGroupLoading"
                      @click="addMemberToGroup"
                      size="large"
                      class="w-100"
                      round
                      >Continue</el-button
                    >
                  </div>
                </div>
                <div class="col-md-12 mt-2">
                  <div>
                    <el-button
                      class="w-100 border-0"
                      @click="cancelGroupModal"
                      round
                      >Cancel</el-button
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import moment from "moment";
import { ref, reactive, computed, inject } from "vue";
import axios from "@/gateway/backendapi";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import { ElMessageBox, ElMessage } from "element-plus";
import membershipService from "../../services/membership/membershipservice";
import collector from "../../services/groupArray/mapTree";
import flatten from "../../services/groupArray/flatTree";
import deviceBreakpoint from "../../mixins/deviceBreakpoint";
import swal from "sweetalert";
// import lookupService from "../../services/lookup/lookupservice";

export default {
  setup() {
    const primarycolor = inject("primarycolor");
    const store = useStore();
    const hideCelebTab = ref(false);
    const checked = ref(false);
    const loadingValue = ref(false);
    const hideAddInfoTab = ref(true);
    const showCelebTab = () => (hideCelebTab.value = !hideCelebTab.value);
    const showAddInfoTab = () => (hideAddInfoTab.value = !hideAddInfoTab.value);
    const routeParams = ref("");
    const peopleInGroupIDs = ref([]);
    const showChooseGroup = ref(false);
    const { mdAndUp, lgAndUp, xlAndUp, xsOnly } = deviceBreakpoint();
    const route = useRoute();
    const searchGroupText = ref("");
    const showAddInfo = ref(false);
    const searchRef = ref(null);
    const memberClassificationId = ref(null);
    const branchClassificationId = ref(null);
    const ageGroupId = ref(null);
    const selectedTree = ref();
    const showCelebration = ref(true);
    const personNotes = ref([]);
    const dynamicCustomFields = ref([]);
    const noteDetails = ref({});
    const selectedBranch = ref({});
    const groupMappedTree = ref([]);
    const branchItems = ref({});
    const branchList = ref([]);
    const flattenedTree = ref([]);
    const addToGroupLoading = ref(false);
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

    const getCustomFields = async (id) => {
      try {
        let { data } = await axios.get(
          `/GetAllCustomFields?entityType=0&&tenantID=${id ? id : route.query.tenantId}`
        );
        dynamicCustomFields.value = data.sort((a, b) => a.order - b.order);
      } catch (err) {
        console.log(err);
      }
    };

    const birthDaysArr = computed(() => {
      const arrOfDays = [];
      for (let i = 1; i <= 31; i++) {
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

    const chooseGroup = () => {
      showChooseGroup.value = true;
    };
    const cancelGroupModal  = () => {
      showChooseGroup.value = false;
    };

    const updateBirthDateElements = () => {
      birthMonth.value = birthDate.month();
      birthDay.value = birthDate.date();
      birthYear.value = birthDate.format("YYYY");
    };

    const annMonth = ref(null);
    const annDay = ref(null);
    const annYear = ref(null);
    const maritalStatusId = ref(null);
    const genderId = ref(null);

    const anniversaryDate = moment();
    const daysInAnnMonth = ref(anniversaryDate.daysInMonth());
    const annDaysArr = computed(() => {
      const arrOfDays = [];
      for (let i = 1; i <= 31; i++) {
        arrOfDays.push(i);
      }
      return arrOfDays;
    });

    const removeFromGroup = (index, item) => {
      if (!route.params.personId) {
        peopleInGroupIDs.value.splice(index, 1);
      } else {
        let body = {
          groupId: item.groupId,
          personIds: [item.personInGroupID],
        };

        grousService
          .removeFromGroup(item.groupId, body)
          .then((res) => {
            if (res !== false) {
              peopleInGroupIDs.value.splice(index, 1);
              ElMessage({
                type: "success",
                message: `${person.firstName} is removed from ${item.name} group`,
              });
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    };

    const showConfirmModal = (index, item) => {
      ElMessageBox.confirm("Are you sure you want to proceed?", "Confirm delete", {
        confirmButtonText: "OK",
        cancelButtonText: "Cancel",
        type: "error",
      })
        .then(() => {
          removeFromGroup(index, item);
        })
        .catch(() => {
          ElMessage({
            type: "info",
            message: "Delete canceled",
          });
        });
    };

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

    const setSelectedMem = () => {
      selectedMembership.value = memberships.value.find((i) => {
        return i.id == memberClassificationId.value;
      });
    };

    const setSelectedAgeGroup = () => {
      selectedAgeGroup.value = ageGroups.value.find((i) => {
        return i.id == ageGroupId.value;
      });
    };

    const setSelectedMaritalStatus = () => {
      selectedMaritalStatus.value = maritalStatus.value.find((i) => {
        return i.id == maritalStatusId.value;
      });
    };

    const setSelectedGender = () => {
      selectedGender.value = genders.value.find((i) => {
        return i.id == genderId.value;
      });
    };

    const getBranch = async () => {
      try {
        const { data } = await axios.get(
          `/GetAllBranches/${route.query.tenantId}`
          // `/GetAllBranches/3bdb60d5-b139-4aa7-bea4-11ded16ec17b`
        );
        let branchObj = {
          id: data.id,
          name: data.name,
          logo: data.logo,
        };

        branchItems.value = data;
        branchList.value = data.branches;
        branchList.value.unshift(branchObj);
        if (branchList.value.length === 1) {
          getPeopleClassifications();
          getAgeGroups();
          getCustomFields();
          getGroups();
        }
        // const { data } = await axios.get(`/GetAllBranches/e0c6d90c-67db-4b9e-9863-7f4d37987278`)
      } catch (error) {
        console.log(error);
      }
    };
    getBranch();

    const setSelectedBranch = () => {
      selectedBranch.value = branchList.value.find((i) => {
        return i.id == branchClassificationId.value;
      });
      getPeopleClassifications(selectedBranch.value.id);
      getAgeGroups(selectedBranch.value.id);
      getGroups(selectedBranch.value.id);
      getCustomFields(selectedBranch.value.id);
      console.log(selectedBranch.value, "selectec branch");
    };

    const setGroupValue = () => {
      const response = flattenedTree.value.find((i) => i.value == selectedTree.value);
      groupToAddTo.value = {
        name: response.label,
        id: response.value,
      };
    };

    const filterNodeMethod = (value, data) =>
      data.label.toLowerCase().includes(value.toLowerCase());

    const addPerson = async () => {
      disableClick.value = true;
      const personObj = { ...person };
      errMessage.value = "";

      // if (branchItems.value && !selectedBranch.value.id) {
      //   ElMessage({
      //     type: "warning",
      //     message: "Please ensure you choose a branch",
      //     duration: 6000,
      //   });
      // }

      const formData = new FormData();
      formData.append("firstName", personObj.firstName ? personObj.firstName : "");
      formData.append("lastName", personObj.lastName ? personObj.lastName : "");
      formData.append("picture", image.value ? image.value : "");
      formData.append("mobilePhone", personObj.mobilePhone ? personObj.mobilePhone : "");
      formData.append("email", personObj.email ? personObj.email : "");
      formData.append("occupation", personObj.occupation ? personObj.occupation : "");
      formData.append("dayOfBirth", +personObj.dayOfBirth);
      formData.append(
        "monthOfBirth",
        months.indexOf(personObj.monthOfBirth) >= 0
          ? months.indexOf(personObj.monthOfBirth) + 1
          : 0
      );
      formData.append("yearOfBirth", +personObj.yearOfBirth);
      formData.append("occupation", personObj.occupation ? personObj.occupation : "");
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
      formData.append("homeAddress", personObj.address ? personObj.address : "");
      formData.append(
        "maritalStatusID",
        selectedMaritalStatus.value ? selectedMaritalStatus.value.id : ""
      );
      formData.append("genderID", selectedGender.value ? selectedGender.value.id : "");
      formData.append(
        "ageGroupID",
        selectedAgeGroup.value ? selectedAgeGroup.value.id : ""
      );
      formData.append("note", personNotes.value ? JSON.stringify(personNotes.value) : []);
      formData.append(
        "customAttributeDataString",
        JSON.stringify(
          dynamicCustomFields.value.map((i) => ({
            customAttributeID: i.id,
            data: i.data,
            entityID: route.params.personId,
          }))
        )
      );
      if (route.query.groupID) {
        try {
          loading.value = true;
          let response = await axios.post(
            `/PublicMemberRegister?tenantID=${
              selectedBranch.value && selectedBranch.value.id
                ? selectedBranch.value.id
                : route.query.tenantId
            }&groupId=${route.query.groupID}`,
            formData
          );
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
          loading.value = false;
          if (err.toString().toLowerCase().includes("network error")) {
            ElMessage({
              type: "warning",
              message: "You 're Offline, Please ensure you have internet access",
              duration: 6000,
            });
          } else {
            showError.value = true;
            loading.value = false;
            if (err.response && err.response.status === 400) {
              errMessage.value = err.response.data.message;
              ElMessage({
                type: "warning",
                message: errMessage.value ? errMessage.value : "Save operation failed",
                duration: 6000,
              });
            }
          }
        }
      } else {
        try {
          console.log(selectedBranch.value, "jjjsjsj");
          loading.value = true;
          let response = await axios.post(
            `/PublicMemberRegister?tenantID=${
              selectedBranch.value && selectedBranch.value.id
                ? selectedBranch.value.id
                : route.query.tenantId
            }`,
            formData
          );
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
          loading.value = false;
          if (err.toString().toLowerCase().includes("network error")) {
            ElMessage({
              type: "warning",
              message: "You 're Offline, Please ensure you have internet access",
              duration: 6000,
            });
          } else {
            showError.value = true;
            loading.value = false;
            if (err.response && err.response.status === 400) {
              errMessage.value = err.response.data.message;
              ElMessage({
                type: "warning",
                message: errMessage.value ? errMessage.value : "Save operation failed",
                duration: 6000,
              });
            }
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
          genders.value = res.data.find((i) => i.type.toLowerCase() === "gender").lookUps;
          maritalStatus.value = res.data.find(
            (i) => i.type.toLowerCase() === "maritalstatus"
          ).lookUps;
        })
        .catch((err) => console.log(err.response));
    };

    const getPeopleClassifications = async (id) => {
      loadingValue.value = true;
      try {
        const response = await axios.get(
          `/public/PeopleClassifications?tenantId=${id ? id : route.query.tenantId}`
        );
        const { data } = response;
        memberships.value = data;
        loadingValue.value = false;
      } catch (err) {
        console.log(err);
        loadingValue.value = false;
      }
    };

    const getAgeGroups = (id) => {
      axios
        .get(`/public/AgeGroups?tenantId=${id ? id : route.query.tenantId}`)
        .then((res) => {
          ageGroups.value = res.data.sort((a, b) => a.order - b.order);
        })
        .catch((err) => console.log(err.response));
    };

    if (!genders.value || genders.value.length === 0) getLookUps();
    // if (!ageGroups.value || ageGroups.value.length === 0) getAgeGroups();
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
        const res = await axios.get(`/TenantInfo?tenantID=${route.query.tenantId}`);
        churchLogo.value = res.data.logo;
        churchName.value = res.data.name;
      } catch (error) {
        console.log(error);
      }
    };
    getPublicMember();

    const getGroups = async (id) => {
      try {
        let groups = await axios.get(
          `/public/groups?tenantId=${id ? id : route.query.tenantId}`
        );
        allGroups.value = groups.data;
        let data = { children: allGroups.value };
        const { children } = collector(data);
        groupMappedTree.value = children;
        if (groupMappedTree.value && groupMappedTree.value.length > 0) {
          flattenedTree.value = groupMappedTree.value.flatMap(flatten());
        }
      } catch (error) {
        console.log(error);
      }
    };

    const addToGroupError = ref(false);
    const dismissAddToGroupModal = ref("");

    const addMemberToGroup = async () => {
      showChooseGroup.value = false;
      addToGroupError.value = false;
      if (!groupToAddTo.value || !groupToAddTo.value.id) {
        addToGroupError.value = true;
        addToGroupLoading.value = true;
        return false;
      }

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
          ElMessage({
            type: "success",
            message: `Member add to ${groupToAddTo.value.name}`,
            duration: 6000,
          });
          addToGroupLoading.value = false;
          showChooseGroup.value = false;

          peopleInGroupIDs.value.push({
            name: groupToAddTo.value.name,
            groupId: groupToAddTo.value.id,
            position: position.value,
          });
          

          groupToAddTo.value = {};
          selectedTree.value = "";
          position.value = "";
        } catch (error) {
          console.log(error);
          addToGroupLoading.value = false;
          showChooseGroup.value = false;
        }
      } else {
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
            return i.name.toLowerCase().includes(searchGroupText.value.toLowerCase());
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

    // const removeFromGroup = (index) => {
    //   peopleInGroupIDs.value.splice(index, 1);
    // };

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
      memberClassificationId,
      daysInBirthMonth,
      groupMappedTree,
      daysInAnnMonth,
      editBirthDateValue,
      editAnnDateValue,
      showConfirmModal,
      birthMonth,
      route,
      setGroupValue,
      birthDay,
      birthYear,
      annMonth,
      annDay,
      annYear,
      areaInView,
      setSelectedAgeGroup,
      person,
      addToGroupLoading,
      addPerson,
      peopleClassifications,
      ageGroupId,
      setSelectedGender,
      setSelectedMem,
      flattenedTree,
      genderId,
      url,
      memberToEdit,
      imageSelected,
      uploadImage,
      loading,
      birthDaysArr,
      filterNodeMethod,
      birthYearsArr,
      annDaysArr,
      errMessage,
      hideCelebTab,
      showCelebTab,
      hideAddInfoTab,
      showAddInfoTab,
      loadingValue,
      showAddInfo,
      genders,
      maritalStatus,
      gendersArr,
      maritalStatusArr,
      selectedMaritalStatus,
      selectedGender,
      selectedMembership,
      memberships,
      checked,
      selectedAgeGroup,
      ageGroups,
      getAgeGroups,
      showError,
      groupToAddTo,
      selectedTree,
      position,
      allGroups,
      addMemberToGroup,
      addToGroupError,
      dismissAddToGroupModal,
      routeParams,
      peopleInGroupIDs,
      searchGroupText,
      searchAllGroups,
      setSelectedMaritalStatus,
      maritalStatusId,
      focusInput,
      showCelebration,
      searchRef,
      selectGroup,
      removeFromGroup,
      personNotes,
      noteDetails,
      savePersonNote,
      setSelectedBranch,
      dynamicCustomFields,
      primarycolor,
      churchLogo,
      churchName,
      branchItems,
      branchList,
      selectedBranch,
      branchClassificationId,
      mdAndUp, lgAndUp, xlAndUp, xsOnly,
      showChooseGroup,
      cancelGroupModal,
       chooseGroup
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
.border-line {
  border-radius: 30px;
  border: 1px dashed #0745af;
}

@media screen and (max-width: 241px) {
  .padd {
    padding: 1rem;
  }
}

.contn-btn:disabled {
  opacity: 0.3;
}

.input-width {
  width: 100%;
}

.input-width {
  width: 100%;
}

@media (min-width: 992px) {
  .input-width {
    width: 340px;
  }
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
.linear-gradient {
  background: linear-gradient(90deg, #777777 48%, #111111 62%);
  background-clip: text;
  color: transparent;
}
</style>
