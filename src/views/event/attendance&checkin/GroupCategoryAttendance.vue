<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-12 col-sm-12 col-lg-12 px-0 mt-3 mb-4">
        <div class="text-head font-weight-bold h2 py-0 my-0 text-black">
          Attendance and Check-in Details
        </div>
        <div @click="goBack">
          <span class="s-18 fw-400 cursor-pointer text-black">
            <img src="../../../assets/goback.png" alt="" /> Go back</span
          >
        </div>
      </div>
    </div>
    <div
      class="row mt-4 justify-content-center section-border rounded-lg"
    >
      <div class="col-md-12 px-0 mt-3 mb-4">
        <div class="fw-400 h5 p-4 my-0 text-dak">Attendance and Check-in Details</div>
      </div>
      <div class="col-md-12">
        <div class="row d-flex justify-content-center">
          <div class="col-md-9">
            <div class="row">
              <div class="col-md-2 col-sm-12">
                <h5 class="fw-400 text-dak mt-3">Event</h5>
              </div>
              <div class="col-md-10 col-sm-12">
                <el-select-v2
                  :disabled="true"
                  v-model="selectedEventID"
                  class="w-100"
                  :options="
                    events.map((i) => ({
                      label: i.name,
                      value: i.id,
                    }))
                  "
                  @change="setselectedEvent"
                  size="large"
                />
              </div>
              <div class="col-md-2 col-sm-12">
                <h5 class="fw-400 text-dak mt-4">Group</h5>
              </div>
              <div class="col-md-10 mt-3 col-sm-12">
                <div class="col-md-12 px-0">
                  <div class="chip-container col-md-12 p-0 m-0">
                    <div
                      class="chip px-2 d-flex justify-content-between align-items-center my-2 mx-2"
                      v-for="(chip, i) of groups"
                      :key="chip.label"
                    >
                      <span>{{ chip.name }}</span>
                      <i
                        class="d-flex text-dark align-items-center"
                        @click="deleteChip(i)"
                      >
                        <el-icon><CircleClose /></el-icon>
                      </i>
                    </div>
                    <input
                      class="inputt py-2"
                      disabled
                      v-model="selectedGroups.name"
                      @keypress.enter="saveChip"
                      @keydown.delete="backspaceDelete"
                    />
                  </div>
                </div>

                <!-- {{selectedGroups}} -->
                <!-- <el-tree-select
                    v-model="selectedGroupsID"
                    :data="groups"
                    multiple
                    :render-after-expand="false"
                    show-checkbox
                    check-strictly
                    check-on-click-node
                    class="w-100"
                  /> -->
                <!-- <MultiSelect
                  v-model="selectedGroups"
                  :options="groups"
                  style="width: 100%"
                  optionLabel="name"
                  placeholder=""
                  display="chip"
                  disabled
                /> -->
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        class="col-md-12 mt-5 mb-2"
        style="border-bottom: 1px solid #575353; opacity: 0.33"
      ></div>
      <div class="col-md-12 mb-1 ml-2 py-3">
        <h5 class="fw-400 text-dak">Registration Options</h5>
      </div>
      <div class="col-md-12">
        <div class="row justify-content-center" v-if="eventRegLink">
          <div
            class="col-md-9 col-sm-11 col-11 px-0 rounded"
            style="background: #f8f8f8; border: 1px solid #c6eeff"
          >
            <div class="row">
              <div class="col-md-12 mt-3 d-flex flex-sm-nowrap flex-wrap">
                <div class="px-3 d-flex align-self-center image">
                  <img
                    src="../../../assets/link.svg"
                    alt="marked Attendance image"
                    style="width: 50px; height: 50px"
                  />
                </div>
                <!-- <a class="c-pointer text-decoration-none"><h5 class="header4"><router-link class="text-decoration-none text-dark" :to="{ name: 'WebCheckin', params: { code: route.query.code} }">Registration Link</router-link></h5></a> -->
                <div class="para w-100 pb-4">
                  <div
                    class="ml-3 ml-sm-0 s-20 fw-500 text-dak link-color c-pointer"
                    @click="copyRegLink"
                  >
                    Registration Link
                  </div>

                  <div class="col-md-12 px-0 d-flex flex-wrap justify-content-between">
                    <div class="bg-white reg-link pl-3 pr-2">
                      <span class="s-12">{{ eventRegLink }}</span>
                    </div>
                    <!-- <el-input
                    type="text"
                    ref="regLink"
                    @keydown="preventChangingOfCheckinLink"
                    @click="copyRegLink"
                    :value="eventRegLink"
                    class="w-100"
                  >
                    <template #append>
                      <el-button @click="copyRegLink">
                        <el-icon>
                          <CopyDocument />
                        </el-icon>
                      </el-button>
                    </template>
                  </el-input> -->
                    <div class="d-flex justify-content-end mt-2 mt-lg-0 pr-2">
                      <el-button
                        class="d-flex px-0"
                        style="border: 1px solid #7ddfdf; min-width: 90px !important"
                        @click="copyRegLink"
                        round
                      >
                        <img
                          src="../../../assets/form/copyIcon.png"
                          style="width: 18px"
                          alt=""
                        />
                        <span class="s-12 fw-500 ml-1" style="color: #191b1d">Copy</span>
                      </el-button>
                      <el-button
                        @click="regQRCode"
                        style="border: 1px solid #7ddfdf; min-width: 90px !important"
                        round
                        class="d-flex px-0"
                      >
                        <img
                          class="c-pointer"
                          style="width: 18px"
                          src="../../../assets/group2.svg"
                          alt=""
                        />
                        <span class="s-12 fw-500 ml-1" style="color: #191b1d"
                          >QR code</span
                        >
                      </el-button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-12">
        <div class="row justify-content-center mt-3" v-if="familyRegLink">
          <div
            class="col-md-9 col-sm-11 col-11 px-0 rounded"
            style="background: #f8f8f8; border: 1px solid #c6c6c6"
          >
            <div class="row">
              <div class="col-md-12 mt-3 d-flex flex-sm-nowrap flex-wrap">
                <div class="px-3 d-flex align-self-center image">
                  <img
                    src="../../../assets/childcheckin.svg"
                    style="width: 45px; height: 45px"
                    alt="marked Attendance image"
                  />
                </div>
                <!-- <a class="c-pointer text-decoration-none"><h5 class="header4"><router-link class="text-decoration-none text-dark" :to="{ name: 'WebCheckin', params: { code: route.query.code} }">Registration Link</router-link></h5></a> -->
                <div class="para w-100 pb-4">
                  <div
                    class="ml-3 ml-sm-0 text-dak s-20 fw-500 c-pointer"
                    @click="copyFamilyLink"
                  >
                    Family Registration
                  </div>

                  <div class="ml-3 ml-sm-0 s-14" style="color: #6c6666">
                    Register your family members for this event
                  </div>
                  <div
                    class="col-md-12 mt-2 px-0 d-flex flex-wrap justify-content-between"
                  >
                    <div class="bg-white reg-link pl-3 pr-2">
                      <span class="s-12">{{ familyRegLink }}</span>
                    </div>
                    <!-- <el-input
                    type="text"
                    ref="regLink"
                    @keydown="preventChangingOfCheckinLink"
                    @click="copyRegLink"
                    :value="eventRegLink"
                    class="w-100"
                  >
                    <template #append>
                      <el-button @click="copyRegLink">
                        <el-icon>
                          <CopyDocument />
                        </el-icon>
                      </el-button>
                    </template>
                  </el-input> -->
                    <div class="d-flex justify-content-end mt-2 mt-lg-0 pr-2">
                      <el-button
                        class="d-flex px-0"
                        style="border: 1px solid #7ddfdf; min-width: 90px !important"
                        @click="copyFamilyLink"
                        round
                      >
                        <img
                          src="../../../assets/form/copyIcon.png"
                          style="width: 18px"
                          alt=""
                        />
                        <span class="s-12 fw-500 ml-1" style="color: #191b1d">Copy</span>
                      </el-button>
                      <!-- <el-button
                      @click="regQRCode"
                      style="border: 1px solid #7ddfdf; min-width: 90px !important"
                      round
                      class="d-flex px-0"
                    >
                      <img
                        class="c-pointer"
                        style="width: 18px"
                        src="../../../assets/group2.svg"
                        alt=""
                      />
                      <span class="s-12 fw-500 ml-1" style="color: #191b1d">QR code</span>
                    </el-button> -->
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- <div class="row mt-3">
        <div
          class="col-md-10 col-sm-11 offset-1 col-lg-7 border rounded"
          style="background: #f8f8f8"
        >
          <div class="row">
            <div class="col-md-2 col-sm-2 image mt-3">
              <img
                src="../../../assets/childcheckin.svg"
                style="width: 54px; height: 54px"
                alt="marked Attendance image"
              />
            </div>
            <div class="col-md-10 col-sm-10 mt-3">
              <h5 class="fw-400 text-dak">
                <a class="text-decoration-none text-dak link-color"
                  >Family Registration</a
                >
              </h5>
              <p class="para">Register your family members for this event</p>
              <p class="para">
                <span class="d-flex align-items-center">
                  <el-input
                    type="text"
                    ref="familyLink"
                    @keydown="preventChangingOfCheckinLink"
                    @click="copyFamilyLink"
                    :value="`https://child-checkin-seven.vercel.app/${tenantId}`"
                    class="w-100"
                    style="width: 95%"
                  >
                    <template #append>
                      <el-button @click="copyFamilyLink">
                        <el-icon>
                          <CopyDocument />
                        </el-icon>
                      </el-button>
                    </template>
                  </el-input>
                </span>
              </p>
            </div>
          </div>
        </div>
      </div> -->
      <div
        class="col-md-12 mt-5 mb-2"
        style="border-bottom: 1px solid #575353; opacity: 0.33"
      ></div>
      <div class="col-md-12 mb-1 ml-2 py-3">
        <h5 class="fw-400 text-dak">Check-in Options</h5>
      </div>
      <div class="col-md-12">
        <div class="row justify-content-center" v-if="!route.query.fromBranch">
          <router-link
            class="text-decoration-none col-md-9 col-sm-11 col-11 px-0 text-dak link-color"
            :to="{
              name: 'MarkAttendance',
              query: { id: route.query.id },
            }"
          >
            <div
              class="col-md-12 px-0 rounded py-4"
              style="background: #f8f8f8; border: 1px solid #c6eeff"
            >
              <div class="row">
                <div class="col-md-12 d-flex flex-wrap">
                  <div class="px-3 image">
                    <img
                      src="../../../assets/group1.svg"
                      style="width: 45px; height: 45px"
                      alt="marked Attendance image"
                    />
                  </div>
                  <div>
                    <h5 class="fw-500 s-20 text-dak">Manual Attendance Check-in ></h5>
                    <div class="ml-3 ml-sm-0 s-14" style="color: #6c6666">
                      Manually check in registered members.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </router-link>
        </div>
      </div>
      <div class="col-md-12">
        <div class="row justify-content-center mt-3">
          <div
            class="col-md-9 col-sm-11 col-11 px-0 py-4 rounded"
            style="background: #f8f8f8; border: 1px solid #c6c6c6"
          >
            <div class="row">
              <div class="col-md-12 d-flex flex-sm-nowrap flex-wrap">
                <div class="px-3 d-flex align-self-center image">
                  <img
                    src="../../../assets/link.svg"
                    alt="marked Attendance image"
                    style="width: 50px; height: 50px"
                  />
                </div>
                <div class="para w-100">
                  <div
                    class="ml-3 ml-sm-0 s-20 fw-500 text-dak c-pointer"
                    @click="copyLink"
                  >
                    Checkin Link
                  </div>
                  <div class="col-md-12 px-0 d-flex flex-wrap justify-content-between">
                    <div class="bg-white reg-link pl-3 pr-2">
                      <span class="s-12">{{ link }}</span>
                    </div>
                    <div class="d-flex justify-content-end mt-2 mt-lg-0 pr-2">
                      <el-button
                        class="d-flex px-0"
                        style="border: 1px solid #7ddfdf; min-width: 90px !important"
                        @click="copyLink"
                        round
                      >
                        <img
                          src="../../../assets/form/copyIcon.png"
                          style="width: 18px"
                          alt=""
                        />
                        <span class="s-12 fw-500 ml-1" style="color: #191b1d">Copy</span>
                      </el-button>
                      <el-button
                        @click="checkInQRCode"
                        style="border: 1px solid #7ddfdf; min-width: 90px !important"
                        round
                        class="d-flex px-0"
                      >
                        <img
                          class="c-pointer"
                          style="width: 18px"
                          src="../../../assets/group2.svg"
                          alt=""
                        />
                        <span class="s-12 fw-500 ml-1" style="color: #191b1d"
                          >QR code</span
                        >
                      </el-button>
                    </div>
                  </div>
                </div>
              </div>

              <!-- <a class="text-decoration-none"
                  ><h5 class="fw-400 text-dak link-color c-pointer" @click="copyLink">
                    Checkin Link
                  </h5></a
                > -->
              <!-- <a class="c-pointer text-decoration-none"><h5 class="fw-400 text-dak"><router-link class="text-decoration-none text-dark" :to="{ name: 'WebCheckin', params: { code: route.query.code} }">Registration Link</router-link></h5></a> -->
              <!-- <p class="para">
                  <span class="d-flex align-items-center">
                    <el-input
                      type="text"
                      ref="checkinLink"
                      @keydown="preventChangingOfCheckinLink"
                      @click="copyLink"
                      :value="link"
                      class="w-100"
                    >
                      <template #append>
                        <el-button @click="copyLink">
                          <el-icon>
                            <CopyDocument />
                          </el-icon>
                        </el-button>
                      </template>
                    </el-input>
                    <span @click="checkInQRCode">
                      <img
                        class="ml-2 c-pointer"
                        style="width: 45px"
                        src="../../../assets/group2.svg"
                        alt="marked Attendance image"
                    /></span>
                  </span>
                </p> -->
            </div>
          </div>
        </div>
      </div>

      <div class="col-md-12">
        <div
          class="row justify-content-center c-pointer mt-3"
          @click="routeToChildCheckin"
        >
          <div
            class="col-md-9 col-sm-11 col-11 px-0 py-4 rounded"
            style="background: #f8f8f8; border: 1px solid #c6eeff"
          >
            <div class="row">
              <div class="col-md-12 d-flex flex-wrap">
                <div class="image px-3">
                  <img
                    src="../../../assets/childcheckin.svg"
                    style="width: 45px; height: 45px"
                    alt="marked Attendance image"
                  />
                </div>
                <div>
                  <h5 class="fw-400 text-dak">
                    <a class="text-decoration-none fw-500 s-20 text-dak">Child Checkin</a>
                  </h5>
                  <div class="ml-3 ml-sm-0 s-14" style="color: #6c6666">
                    Click to checkin your children
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- <div class="row w-100 mt-3">
      <div
        class="col-md-10 offset-md-1 col-sm-11 offset-1 col-lg-7 offset-lg-2 border rounded"
      >
        <div class="row">
          <div class="col-md-2 col-sm-2 image mt-3">
            <img
              src="../../../assets/group2.svg"
              alt="marked Attendance image"
            />
          </div>
          <div class="col-md-10 col-sm-10 mt-3">
            <h5 class="fw-400 text-dak">
              <router-link
                class="text-decoration-none link-color"
                :to="{
                  name: 'AttendanceQR',
                  query: { id: route.query.id },
                }"
                >QR</router-link
              >
            </h5>
            <p class="para">
              Printable Check-in Quick Response code for mobile users.
            </p>
          </div>
        </div>
      </div>
    </div> -->
      <!-- <div class="row w-100">
        <router-link
          class="text-decoration-none col-md-12 px-0 text-dak link-color"
          :to="{ name: 'SMSCheckin', query: { id: route.query.id } }"
        >
          <div
            class="col-md-10 offset-md-1 col-sm-11 offset-1 col-lg-7 offset-lg-2 border rounded"
            style="background: #f8f8f8"
          >
            <div class="row">
              <div class="col-md-2 col-sm-2 image mt-3">
                <img src="../../../assets/group.svg" alt="marked Attendance image" />
              </div>
              <div class="col-md-10 col-sm-10 mt-3">
                <h5 class="fw-400 text-dak">SMS</h5>
                <p class="para">
                  SMS number for marking attendance through mobile phones.
                </p>
              </div>
            </div>
          </div>
        </router-link>
      </div> -->
      <div
        class="col-md-12 mt-5 mb-2"
        style="border-bottom: 1px solid #575353; opacity: 0.33"
      ></div>
      <div class="col-md-12">
        <div class="row justify-content-center mt-4">
          <div
            class="col-md-9 col-sm-11 col-11 px-0 py-4 cursor-pointer rounded"
            @click="showAdditionalField"
            style="background: #f8f8f8; border: 1px solid #c6eeff"
          >
            <div class="row">
              <div class="col-md-12 d-flex flex-wrap">
                <div class="px-3 image">
                  <img
                    src="../../../assets/group1.svg"
                    style="width: 45px; height: 45px"
                    alt="marked Attendance image"
                  />
                </div>
                <div>
                  <h5 class="fw-500 s-20 text-dak text-primary cursor-pointer">
                    Additional Custom Field
                  </h5>
                  <div class="ml-3 ml-sm-0 s-14" style="color: #6c6666">
                    Add a custom field
                  </div>
                </div>
              </div>
            </div>

            <div
              class="row d-flex justify-content-start"
              :class="{ 'dd-hide-list': !showMoreField }"
            >
              <div
                class="col-md-10 col-sm-10 mt-3 d-flex flex-wrap"
                v-for="(showfieldList, index) in showFormList"
                :key="index"
              >
                <div class="col-md-3">
                  <el-checkbox
                    v-model="showfieldList.value"
                    @change="customFieldValue(showfieldList)"
                    :binary="true"
                    size="large"
                  />
                  <!-- <input type="checkbox" name="" > -->
                  <!-- <Checkbox
                    id="binary"
                    v-model="showfieldList.value"
                    :binary="true"
                    @change="customFieldValue(showfieldList)"
                  /> -->
                </div>
                <div class="col-md-8">
                  <div class="">{{ showfieldList.label }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-md-12 mb-3"></div>

      <div class="col-md-12 px-0 tr-border-bottom mt-3">
        <!-- <hr class="tr-border-bottom"> -->
      </div>

      <div class="col-md-12 py-2" style="opacity: 0.4">
        <h5 class="check">Not Currently Available</h5>
      </div>

      <div class="col-md-12 mb-3"></div>

      <div class="row w-100" style="opacity: 0.3">
        <div
          class="col-md-10 offset-md-1 col-sm-11 offset-1 col-lg-7 offset-lg-2 border rounded"
          style="background: #f4fdff"
        >
          <div class="row">
            <div class="col-md-2 col-sm-2 image mt-3">
              <img
                src="../../../assets/USSD.svg"
                style="width: 58px; height: 58px"
                alt="marked Attendance image"
              />
            </div>
            <div class="col-md-10 col-sm-10 mt-3">
              <h5 class="header4">
                <a class="text-decoration-none text-dak link-color">USSD</a>
              </h5>
              <p class="para">USSD code for marking attendance through mobile phones</p>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-12 mb-3"></div>
      <el-dialog
        v-model="showCheckQRCode"
        title=""
        :width="mdAndUp || lgAndUp || xlAndUp ? `30%` : xsOnly ? `90%` : `70%`"
        class="QRCodeDialog"
        align-center
      >
        <div class="d-flex align-items-center flex-column">
          <h5 class="text-capitalize font-weight">Checkin QR Code</h5>
        </div>
        <div class="d-flex justify-content-center">
          <div class="img-wrapper">
            <img v-if="qrCodeCheckin" :src="qrCodeCheckin" class="image-wrapper w-100" />
          </div>
        </div>
      </el-dialog>
      <el-dialog
        v-model="showRegQRCode"
        title=""
        :width="mdAndUp || lgAndUp || xlAndUp ? `30%` : xsOnly ? `90%` : `70%`"
        class="QRCodeDialog"
        align-center
      >
        <div class="d-flex align-items-center flex-column">
          <h5 class="text-capitalize font-weight">Registration QR Code</h5>
        </div>
        <div class="d-flex justify-content-center">
          <div class="img-wrapper">
            <img
              v-if="qrCodeRegistration"
              :src="qrCodeRegistration"
              class="image-wrapper w-100"
            />
          </div>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
// import MultiSelect from "primevue/multiselect";
import { useRoute } from "vue-router";
import { computed, ref } from "vue";
import attendanceservice from "../../../services/attendance/attendanceservice";
import deviceBreakpoint from "../../../mixins/deviceBreakpoint";
import { useStore } from "vuex";
import router from "../../../router";
import { ElMessage } from "element-plus";

export default {
  setup() {
    const route = useRoute();
    const groups = ref([]);
    const selectedEvent = ref({});
    const events = ref([]);
    const selectedGroups = ref([]);
    const selectedGroupsID = ref(null);
    const { mdAndUp, lgAndUp, xlAndUp, xsOnly } = deviceBreakpoint();
    const store = useStore();
    const checkinLink = ref(null);
    const familyLink = ref(null);
    const showMoreField = ref(false);
    const showCheckQRCode = ref(false);
    const showRegQRCode = ref(false);
    const qrCodeRegistration = ref(
      store.getters["attendance/attendanceItemData"].qrCodeRegistration
    );
    const qrCodeCheckin = ref(
      store.getters["attendance/attendanceItemData"].qrCodeCheckin
    );
    const regLink = ref(null);
    const paymentFormLink = ref(null);
    const iframeLink = ref(null);
    const eventLinkResponse = ref("");
    const paymentFormIdResponse = ref("");
    const tenantId = ref("");
    const customFieldList = ref([]);
    const joinSelectedFields = ref("");
    const selectedEventID = ref(null);

    const goBack = () => {
      router.go(-1);
    };

    if (route.query.activityID) {
      events.value.push({
        name: route.query.activityName,
        id: route.query.activityID,
      });
      selectedEvent.value = {
        name: route.query.activityName,
        id: route.query.activityID,
      };
      selectedEventID.value = selectedEvent.value.name;
    }
    const setselectedEvent = () => {
      selectedEvent.value = events.value.find((i) => i.id == selectedEventID.value);
    };

    if (route.query.groupId) {
      groups.value.push({
        name: route.query.groupName,
        id: route.query.groupId,
      });
      selectedGroups.value.push({
        name: route.query.groupName,
        id: route.query.groupId,
      });
      selectedGroupsID.value = selectedGroups.value.name;
    }

    const showAdditionalField = () => {
      showMoreField.value = !showMoreField.value;
    };
    const saveChip = () => {
      groups.value.indexOf(selectedGroups.value) === -1 &&
        groups.value.push(selectedGroups.value);
      selectedGroups.value = "";
    };
    // const deleteChip = (index) =>{
    //   groups.value.splice(index, 1);
    // }
    // const backspaceDelete = ({which}) =>{
    //    which == 8 && selectedGroups.value === '' && groups.value.splice(groups.value.length - 1);
    // }

    const customFieldValue = (item) => {
      if (customFieldList.value.length <= 0) {
        customFieldList.value.push(`${item.label}=${item.value}`);
      } else {
        // Check ifthe label is there, if its there dont push it, if it's there, just change the value

        const labelIndex = customFieldList.value.findIndex((i) =>
          i.toLowerCase().includes(item.label.toLowerCase())
        );
        if (labelIndex >= 0) {
          if (labelIndex == 0) {
            customFieldList.value.splice(labelIndex, 1, `${item.label}=${item.value}`);
          } else {
            customFieldList.value.splice(labelIndex, 1, `&&${item.label}=${item.value}`);
          }
        } else {
          customFieldList.value.push(`&&${item.label}=${item.value}`);
        }
      }
      let joinSelectedField = customFieldList.value.join("");
      joinSelectedFields.value = joinSelectedField;

      if (item.value) {
        ElMessage({
          type: "success",
          message: `${item.label} field added to public event registration form`,
          duration: 5000,
        });
      } else {
        ElMessage({
          type: "info",
          message: `${item.label} field removed from public event registration form`,
          duration: 5000,
        });
      }
    };

    const attendanceCheckinInStore = ref(store.getters["attendance/attendanceItemData"]);
    const showFormList = ref([
      { label: "Card/Checkin Number", value: false },
      { label: "Address", value: false },
      { label: "Gender", value: false },
      { label: "Marital Status", value: false },
      { label: "Birthday", value: false },
      { label: "Wedding", value: false },
    ]);

    const eventRegistration = ref(store.getters["attendance/eventRegItemData"]);

    const initCheckinAttendanceInStore = async () => {
      try {
        const response = await attendanceservice.getItemByCode(route.query.id);
        store.dispatch("attendance/setItemData", {});

        store.dispatch("attendance/setItemData", response);
        attendanceCheckinInStore.value = response;
        qrCodeRegistration.value = attendanceCheckinInStore.value.qrCodeRegistration;
        qrCodeCheckin.value = attendanceCheckinInStore.value.qrCodeCheckin;
        eventLinkResponse.value = response;
        paymentFormIdResponse.value = response.paymentFormId;
        tenantId.value = response.tenantID;
        console.log(response.paymentFormId);
      } catch (error) {
        console.log(error);
      }
    };

    const checkInQRCode = () => {
      showCheckQRCode.value = true;
    };

    const regQRCode = () => {
      showRegQRCode.value = true;
    };

    const copyLink = () => {
      const textarea = document.createElement("textarea");
      textarea.value = link.value;

      document.body.appendChild(textarea);

      textarea.select();
      textarea.setSelectionRange(0, 99999);

      document.execCommand("copy");
      document.body.removeChild(textarea);

      ElMessage({
        showClose: true,
        message: "Checkin link copied to your clipboard",
        type: "success",
      });
    };
    // const copyLink = () => {
    //   checkinLink.value.input.select();
    //   checkinLink.value.input.setSelectionRange(
    //     0,
    //     checkinLink.value.input.value.length
    //   ); /* For mobile devices */
    //   /* Copy the text inside the text field */
    //   document.execCommand("copy");
    //   ElMessage({
    //     type: "success",
    //     message: "Checkin link copied to your clipboard",
    //     duration: 5000,
    //   });
    //   console.log(attendanceCheckinInStore.value);
    //   console.log(eventRegistration.value);
    // };

    // const copyRegLink = () => {
    //   regLink.value.input.select();
    //   regLink.value.input.setSelectionRange(
    //     0,
    //     regLink.value.input.value.length
    //   ); /* For mobile devices */

    //   /* Copy the text inside the text field */
    //   document.execCommand("copy");
    //   ElMessage({
    //     type: "success",
    //     message: "Registration link copied to your clipboard",
    //     duration: 5000,
    //   });
    // };
    const copyRegLink = () => {
      const textarea = document.createElement("textarea");
      textarea.value = eventRegLink.value;

      document.body.appendChild(textarea);

      textarea.select();
      textarea.setSelectionRange(0, 99999);

      document.execCommand("copy");
      document.body.removeChild(textarea);

      ElMessage({
        showClose: true,
        message: "Registration link copied to your clipboard",
        type: "success",
      });
    };

    const copyPaymentFormLink = () => {
      paymentFormLink.value.select();
      paymentFormLink.value.setSelectionRange(
        0,
        paymentFormLink.value.value.length
      ); /* For mobile devices */

      /* Copy the text inside the text field */
      document.execCommand("copy");
      ElMessage({
        type: "success",
        message: "Payment form link copied to your clipboard",
        duration: 5000,
      });
    };

    const copyIframeLink = () => {
      iframeLink.value.select();
      iframeLink.value.setSelectionRange(
        0,
        iframeLink.value.value.length
      ); /* For mobile devices */

      /* Copy the text inside the text field */
      document.execCommand("copy");
      ElMessage({
        type: "info",
        message: "iFrame copied to your clipboard",
        duration: 5000,
      });
    };

    const copyFamilyLink = () => {
      const textarea = document.createElement("textarea");
      textarea.value = familyRegLink.value;

      document.body.appendChild(textarea);

      textarea.select();
      textarea.setSelectionRange(0, 99999);

      document.execCommand("copy");
      document.body.removeChild(textarea);

      ElMessage({
        showClose: true,
        message: "Family link copied to your clipboard",
        type: "success",
      });
    };
    // const copyFamilyLink = () => {
    //   familyLink.value.input.select();
    //   familyLink.value.input.setSelectionRange(
    //     0,
    //     familyLink.value.input.value.length
    //   ); /* For mobile devices */

    //   /* Copy the text inside the text field */
    //   document.execCommand("copy");
    //   ElMessage({
    //     type: "info",
    //     message: "Family link copied to your clipboard",
    //     duration: 5000,
    //   });
    // };

    const link = computed(() => {
      if (
        !attendanceCheckinInStore.value ||
        !attendanceCheckinInStore.value.attendanceRegistrationLink
      )
        return "";
      return attendanceCheckinInStore.value.attendanceCheckinLink;
      // return attendanceCheckinInStore.value.attendanceRegistrationLink;
    });

    const eventRegLink = computed(() => {
      if (!attendanceCheckinInStore.value || !attendanceCheckinInStore.value.eventID)
        return `${window.location.origin}/event/${eventLinkResponse.value.id}${
          joinSelectedFields.value ? `?${joinSelectedFields.value}` : ""
        }`;

      return `${window.location.origin}/event/${attendanceCheckinInStore.value.id}${
        joinSelectedFields.value ? `?${joinSelectedFields.value}` : ""
      }`;
    });

    const childCheckinLink = computed(() => {
      if (!tenantId.value)
        return `https://my.churchplus.co/childcheckin/${attendanceCheckinInStore.value.tenantID}`;
      return `https://my.churchplus.co/childcheckin/${tenantId.value}`;
    });
    const familyRegLink = computed(() => {
      if (tenantId.value) {
        return `https://child-checkin-seven.vercel.app/${tenantId.value}`;
      } else {
        return "";
      }
    });

    const preventChangingOfCheckinLink = (e) => {
      e.preventDefault();
    };

    if (
      !attendanceCheckinInStore.value ||
      attendanceCheckinInStore.value.id !== route.query.id
    )
      initCheckinAttendanceInStore();

    const routeToChildCheckin = () => {
      router.push("/tenant/childcheckin");
    };

    return {
      groups,
      saveChip,
      // backspaceDelete,
      // deleteChip,
      selectedGroupsID,
      mdAndUp,
      lgAndUp,
      xlAndUp,
      xsOnly,
      qrCodeRegistration,
      qrCodeCheckin,
      setselectedEvent,
      selectedEventID,
      showCheckQRCode,
      showRegQRCode,
      showAdditionalField,
      customFieldValue,
      selectedEvent,
      showFormList,
      events,
      selectedGroups,
      route,
      checkinLink,
      familyLink,
      regLink,
      copyLink,
      copyFamilyLink,
      showMoreField,
      preventChangingOfCheckinLink,
      link,
      eventRegistration,
      eventRegLink,
      copyRegLink,
      familyRegLink,
      paymentFormLink,
      copyPaymentFormLink,
      iframeLink,
      copyIframeLink,
      eventLinkResponse,
      paymentFormIdResponse,
      // paymentFormID,
      // iFrameLink,
      tenantId,
      childCheckinLink,
      routeToChildCheckin,
      customFieldList,
      joinSelectedFields,
      checkInQRCode,
      regQRCode,
      goBack,
    };
  },
};
</script>

<style scoped>
.dd-hide-list {
  height: 0;
  overflow: hidden;
  transition: all 0.5s ease-in-out;
}
.section-border {
  border: 1px solid #575353;
  /* opacity: 0.33; */
}
.reg-link {
  width: 25rem;
  max-width: 25rem; /* Limits the width to allow scrolling */
  overflow-x: auto; /* Enables horizontal scrolling */
  white-space: nowrap; /* Prevents text from wrapping to the next line */
}

.reg-link span {
  display: inline-block; /* Necessary for the span to respect width */
  min-width: 25rem; /* Ensures content is wider than the container */
}

.chip-container {
  /* width: 425px; */
  /* border: 1px solid #ccc; */
  border: 1px solid #787878;
  border-radius: 5px;
  background: #ffffff;
  min-height: 34px;
  display: flex;
  flex-wrap: wrap;
  align-content: space-between;
}

.chip {
  padding: 0.2rem 0.2rem;
  border: 1px solid #02172e0d;
  border-radius: 10px;
  background: #b4f6ff;
  /* margin:4px;
    background: #e0e0e0;
    padding:0px 4px;
    border: 1px solid #ccc;
    border-radius: 3px;
    display:flex;
    align-items: center; */
}
i {
  cursor: pointer;
  opacity: 0.56;
  margin-left: 8px;
}

.inputt {
  /* flex: 1 1 auto;
    width: 30px; */
  background: #ffffff;
  border: none;
  outline: none;
  padding: 4px;
}

.aten {
  text-align: left;
  letter-spacing: 0px;
  color: #02172e;
  opacity: 1;
}
.header5 {
  font: var(--unnamed-font-style-normal) normal 600 24px/32px
    var(--unnamed-font-family-nunito-sans);
  letter-spacing: var(--unnamed-character-spacing-0);
  text-align: left;
  letter-spacing: 0px;
  color: #02172e;
  opacity: 1;
}
.event {
  font: var(--unnamed-font-style-normal) normal normal 16px/22px
    var(--unnamed-font-family-nunito-sans);
  letter-spacing: var(--unnamed-character-spacing-0);
  text-align: left;
  letter-spacing: 0px;
  color: #02172e;
  opacity: 1;
}
.check {
  font: var(--unnamed-font-style-normal) normal 600 16px/22px
    var(--unnamed-font-family-nunito-sans);
  letter-spacing: var(--unnamed-character-spacing-0);
  text-align: left;
  letter-spacing: 0px;
  color: #02172e;
  opacity: 1;
}
.header4 {
  font: var(--unnamed-font-style-normal) normal var(--unnamed-font-weight-bold) 18px/24px
    var(--unnamed-font-family-nunito-sans);
  letter-spacing: var(--unnamed-character-spacing-0);
  text-align: left;
  letter-spacing: 0px;
  color: #02172e;
  opacity: 0.8;
}
.para {
  font: var(--unnamed-font-style-normal) normal normal 14px/19px
    var(--unnamed-font-family-nunito-sans);
  letter-spacing: var(--unnamed-character-spacing-0);
  text-align: left;
  letter-spacing: 0px;
  color: #02172e;
  opacity: 0.8;
}

.container {
  margin-bottom: 40px;
}
</style>
