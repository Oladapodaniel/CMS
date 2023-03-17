<template>
  <div>
    <div class="container">
      <div class="row mt-4 border mx-sm-0 rounded sub-con">
        <div class="col-md-12 col-sm-12 col-lg-12 mt-3 mb-5 border-bottom">
          <h5 class="header5">Attendance and Check-in Details</h5>
        </div>
        <div class="row m-auto">
          <div class="col-md-8 offset">
            <div class="row">
              <div class="col-md-2 col-sm-12">
                <h5 class="event mt-3">Event</h5>
              </div>
              <div class="col-md-10 col-sm-12">
                <el-select-v2
                :disabled="true"
                  v-model="selectedEventID"
                  class="w-100 "
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
                <h5 class="event mt-4">Group</h5>
              </div>
              <div class="col-md-10 mt-3 col-sm-12">
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
                <MultiSelect
                  v-model="selectedGroups"
                  :options="groups"
                  style="width: 100%"
                  optionLabel="name"
                  placeholder=""
                  display="chip"
                  disabled
                />
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-12 mt-5 mb-2 border-bottom"></div>
        <div class="col-md-12 mb-1">
          <h5 class="check">Check in options</h5>
        </div>
        <div class="row w-100" v-if="eventRegLink">
          <div
            class="col-md-10 offset-md-1 col-sm-11 offset-1 col-lg-7 offset-lg-2 border rounded"
          >
            <div class="row">
              <div
                class="col-md-2 col-sm-2 d-flex align-self-center image mt-3"
              >
                <img
                  src="../../../assets/link.svg"
                  class="w-100"
                  alt="marked Attendance image"
                  style="width: 60px; height: 60px"
                />
              </div>
              <div class="col-md-10 col-sm-10 mt-3">
                <a class="text-decoration-none"
                  ><h4
                    class="header4 link-color c-pointer"
                    @click="copyRegLink"
                  >
                    Registration Link
                  </h4></a
                >
                <!-- <a class="c-pointer text-decoration-none"><h4 class="header4"><router-link class="text-decoration-none text-dark" :to="{ name: 'WebCheckin', params: { code: route.query.code} }">Registration Link</router-link></h4></a> -->

                <p class="para">
                  <span class="d-flex align-items-center"
                    >
                    <el-input
                      type="text"
                      ref="regLink"
                      @keydown="preventChangingOfCheckinLink"
                      @click="copyRegLink"
                      :value="eventRegLink"
                      class="w-100"
                      style="width: 95%"
                    >
                      <template #append>
                        <el-button @click="copyRegLink">
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
        </div>
        <div class="row w-100 mt-3">
          <div
            class="col-md-10 offset-md-1 col-sm-11 offset-1 col-lg-7 offset-lg-2 border rounded"
          >
            <div class="row">
              <div
                class="col-md-2 col-sm-2 d-flex align-self-center image mt-3"
              >
                <img
                  src="../../../assets/link.svg"
                  alt="marked Attendance image"
                  style="width: 60px; height: 60px"
                />
              </div>
              <div class="col-md-10 col-sm-10 mt-3">
                <a class="text-decoration-none"
                  ><h4 class="header4 link-color c-pointer" @click="copyLink">
                    Checkin Link
                  </h4></a
                >
                <!-- <a class="c-pointer text-decoration-none"><h4 class="header4"><router-link class="text-decoration-none text-dark" :to="{ name: 'WebCheckin', params: { code: route.query.code} }">Registration Link</router-link></h4></a> -->
                <p class="para">
                  <span class="d-flex align-items-center"
                    >
                    <el-input
                      type="text"
                      ref="checkinLink"
                      @keydown="preventChangingOfCheckinLink"
                      @click="copyLink"
                      :value="link"
                      class="w-100"
                      style="width: 95%"
                    >
                      <template #append>
                        <el-button @click="copyLink">
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
        </div>
        <div class="col-md-12 mb-3"></div>
        <div class="row w-100" v-if="!route.query.fromBranch">
          <div
            class="col-md-10 offset-md-1 col-sm-11 offset-1 col-lg-7 offset-lg-2 border rounded"
          >
            <div class="row">
              <div class="col-md-2 col-sm-2 image mt-3">
                <img
                  src="../../../assets/group1.svg"
                  alt="marked Attendance image"
                />
              </div>
              <div class="col-md-10 col-sm-10 mt-3">
                <h4 class="header4">
                  <router-link
                    class="text-decoration-none link-color"
                    :to="{
                      name: 'MarkAttendance',
                      query: { id: route.query.id },
                    }"
                    >Manual Attendance Check-in</router-link
                  >
                </h4>
                <p class="para">Manually check in registered members.</p>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-12 mb-3"></div>

        <div class="row w-100">
          <div
            class="col-md-10 offset-md-1 col-sm-11 offset-1 col-lg-7 offset-lg-2 border rounded"
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
                <h4 class="header4">
                  <a class="text-decoration-none link-color"
                    >Family Registration</a
                  >
                </h4>
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
        </div>

        <div class="row w-100 c-pointer mt-3" @click="routeToChildCheckin">
          <div
            class="col-md-10 offset-md-1 col-sm-11 offset-1 col-lg-7 offset-lg-2 border rounded"
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
                <h4 class="header4">
                  <a class="text-decoration-none link-color">Child Checkin</a>
                </h4>
                <p class="para">Click to checkin your children</p>
              </div>
            </div>
          </div>
        </div>

        <div class="row w-100 mt-3">
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
                <h4 class="header4">
                  <router-link
                    class="text-decoration-none link-color"
                    :to="{
                      name: 'AttendanceQR',
                      query: { id: route.query.id },
                    }"
                    >QR</router-link
                  >
                </h4>
                <p class="para">
                  Printable Check-in Quick Response code for mobile users.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-12 mb-3"></div>
        <div class="row w-100">
          <div
            class="col-md-10 offset-md-1 col-sm-11 offset-1 col-lg-7 offset-lg-2 border rounded"
          >
            <div class="row">
              <div class="col-md-2 col-sm-2 image mt-3">
                <img
                  src="../../../assets/group.svg"
                  alt="marked Attendance image"
                />
              </div>
              <div class="col-md-10 col-sm-10 mt-3">
                <h4 class="header4">
                  <router-link
                    class="text-decoration-none link-color"
                    :to="{ name: 'SMSCheckin', query: { id: route.query.id } }"
                    >SMS</router-link
                  >
                </h4>
                <p class="para">
                  SMS number for marking attendance through mobile phones.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="row w-100">
          <div
            class="col-md-10 offset-md-1 col-sm-11 offset-1 col-lg-7 offset-lg-2 border mt-3 rounded"
          ></div>
        </div>
        <div class="row w-100 mt-3">
          <div
            class="col-md-10 offset-md-1 col-sm-11 offset-1 col-lg-7 offset-lg-2 border rounded"
          >
            <div class="row">
              <div class="col-md-2 col-sm-2 image mt-3">
                <img
                  src="../../../assets/group1.svg"
                  alt="marked Attendance image"
                />
              </div>
              <div class="col-md-10 col-sm-10 mt-3">
                <h4
                  class="header4 mt-3 text-primary cursor-pointer"
                  @click="showAdditionalField"
                >
                  Additional Custom Field
                </h4>
              </div>
            </div>

            <div
              class="row d-flex justify-content-start mb-3"
              :class="{ 'dd-hide-list': !showMoreField }"
            >
              <div
                class="col-md-10 col-sm-10 mt-3 d-flex flex-wrap"
                v-for="(showfieldList, index) in showFormList"
                :key="index"
              >
                <div class="col-md-3">
                  <!-- <input type="checkbox" name="" > -->
                  <Checkbox
                    id="binary"
                    v-model="showfieldList.value"
                    :binary="true"
                    @change="customFieldValue(showfieldList)"
                  />
                </div>
                <div class="col-md-8">
                  <div class="">{{ showfieldList.label }}</div>
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
                <h4 class="header4">
                  <a class="text-decoration-none link-color">USSD</a>
                </h4>
                <p class="para">
                  USSD code for marking attendance through mobile phones
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-12 mb-3"></div>
      </div>
    </div>
  </div>
</template>

<script>
import MultiSelect from "primevue/multiselect";
import { useRoute } from "vue-router";
import { computed, ref } from "vue";
import attendanceservice from "../../../services/attendance/attendanceservice";
import { useStore } from "vuex";
import router from "../../../router";
import { ElMessage } from "element-plus";

export default {
  components: {  MultiSelect },

  setup() {
    const route = useRoute();
    const groups = ref([]);
    const selectedEvent = ref({});
    const events = ref([]);
    const selectedGroups = ref([]);
    const selectedGroupsID = ref();
    const store = useStore();
    const checkinLink = ref(null);
    const familyLink = ref(null);
    const showMoreField = ref(false);
    const regLink = ref(null);
    const paymentFormLink = ref(null);
    const iframeLink = ref(null);
    const eventLinkResponse = ref("");
    const paymentFormIdResponse = ref("");
    const tenantId = ref("");
    const customFieldList = ref([]);
    const joinSelectedFields = ref("");
    const selectedEventID = ref(null)


    if (route.query.activityID) {
      events.value.push({
        name: route.query.activityName,
        id: route.query.activityID,
      });
      selectedEvent.value = {
        name: route.query.activityName,
        id: route.query.activityID,
      };
       selectedEventID.value = selectedEvent.value.name
    }
    const setselectedEvent = () =>{
      selectedEvent.value = events.value.find((i) => i.id == selectedEventID.value) 
    }

    if (route.query.groupId) {
      groups.value.push({
        name: route.query.groupName,
        id: route.query.groupId,
      });
      selectedGroups.value.push({
        name: route.query.groupName,
        id: route.query.groupId,
      });
      // selectedGroupsID.value = selectedGroups.value
    }

    const showAdditionalField = () => {
      showMoreField.value = !showMoreField.value;
    };

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
            customFieldList.value.splice(
              labelIndex,
              1,
              `${item.label}=${item.value}`
            );
          } else {
            customFieldList.value.splice(
              labelIndex,
              1,
              `&&${item.label}=${item.value}`
            );
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

    const attendanceCheckinInStore = ref(
      store.getters["attendance/attendanceItemData"]
    );
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

        eventLinkResponse.value = response;
        paymentFormIdResponse.value = response.paymentFormId;
        tenantId.value = response.tenantID;
        console.log(response.paymentFormId);
        console.log(response, "goooop");
      } catch (error) {
        console.log(error);
      }
    };

    const copyLink = () => {
      checkinLink.value.input.select();
      checkinLink.value.input.setSelectionRange(
        0,
        checkinLink.value.input.value.length
      ); /* For mobile devices */
      /* Copy the text inside the text field */
      document.execCommand("copy");
       ElMessage({
            type: "info",
            message: "Checkin link copied to your clipboard",
            duration: 5000,
          });
      console.log(attendanceCheckinInStore.value);
      console.log(eventRegistration.value);
    };

    const copyRegLink = () => {
      regLink.value.input.select();
      regLink.value.input.setSelectionRange(
        0,
        regLink.value.input.value.length
      ); /* For mobile devices */

      /* Copy the text inside the text field */
      document.execCommand("copy");
      ElMessage({
            type: "info",
            message: "Registration link copied to your clipboard",
            duration: 5000,
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
            type: "info",
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
      familyLink.value.input.select();
      familyLink.value.input.setSelectionRange(
        0,
        familyLink.value.input.value.length
      ); /* For mobile devices */

      /* Copy the text inside the text field */
      document.execCommand("copy");
       ElMessage({
            type: "info",
            message: "Family link copied to your clipboard",
            duration: 5000,
          });
    };

    const link = computed(() => {
      if (
        !attendanceCheckinInStore.value ||
        !attendanceCheckinInStore.value.attendanceRegistrationLink
      )
        return "";
      return attendanceCheckinInStore.value.attendanceRegistrationLink;
    });

    const eventRegLink = computed(() => {
      if (
        !attendanceCheckinInStore.value ||
        !attendanceCheckinInStore.value.eventID
      )
        return `https://my.churchplus.co/event/${eventLinkResponse.value.id}${
          joinSelectedFields.value ? `?${joinSelectedFields.value}` : ""
        }`;

      return `https://my.churchplus.co/event/${
        attendanceCheckinInStore.value.id
      }${joinSelectedFields.value ? `?${joinSelectedFields.value}` : ""}`;
    });

    const childCheckinLink = computed(() => {
      if (!tenantId.value)
        return `https://my.churchplus.co/childcheckin/${attendanceCheckinInStore.value.tenantID}`;
      return `https://my.churchplus.co/childcheckin/${tenantId.value}`;
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
      selectedGroupsID,
      setselectedEvent,
      selectedEventID,
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

.aten {
  text-align: left;
  font: normal 800 30px Nunito Sans !important;
  letter-spacing: 0px;
  color: #02172e;
  opacity: 1;
}
.header5 {
  font: var(--unnamed-font-style-normal) normal 600 24px/32px
    var(--unnamed-font-family-nunito-sans);
  letter-spacing: var(--unnamed-character-spacing-0);
  text-align: left;
  font: normal normal 600 24px/32px Nunito Sans;
  letter-spacing: 0px;
  color: #02172e;
  opacity: 1;
}
.event {
  font: var(--unnamed-font-style-normal) normal normal 16px/22px
    var(--unnamed-font-family-nunito-sans);
  letter-spacing: var(--unnamed-character-spacing-0);
  text-align: left;
  font: normal normal normal 16px/22px Nunito Sans;
  letter-spacing: 0px;
  color: #02172e;
  opacity: 1;
}
.check {
  font: var(--unnamed-font-style-normal) normal 600 16px/22px
    var(--unnamed-font-family-nunito-sans);
  letter-spacing: var(--unnamed-character-spacing-0);
  text-align: left;
  font: normal normal 600 16px/22px Nunito Sans;
  letter-spacing: 0px;
  color: #02172e;
  opacity: 1;
}
.header4 {
  font: var(--unnamed-font-style-normal) normal var(--unnamed-font-weight-bold)
    18px/24px var(--unnamed-font-family-nunito-sans);
  letter-spacing: var(--unnamed-character-spacing-0);
  text-align: left;
  font: normal normal bold 18px/24px Nunito Sans;
  letter-spacing: 0px;
  color: #02172e;
  opacity: 0.8;
}
.para {
  font: var(--unnamed-font-style-normal) normal normal 14px/19px
    var(--unnamed-font-family-nunito-sans);
  letter-spacing: var(--unnamed-character-spacing-0);
  text-align: left;
  font: normal normal normal 14px/19px Nunito Sans;
  letter-spacing: 0px;
  color: #02172e;
  opacity: 0.8;
}

.container {
  margin-bottom: 40px;
}
</style>