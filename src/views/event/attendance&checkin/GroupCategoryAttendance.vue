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
                <Dropdown
                  v-model="selectedEvent"
                  :options="events"
                  style="width: 100%"
                  optionLabel="name"
                  :filter="true"
                  :disabled="true"
                >
                </Dropdown>
              </div>
              <div class="col-md-2 col-sm-12">
                <h5 class="event mt-4">Group</h5>
              </div>
              <div class="col-md-10 mt-3 col-sm-12">
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
            class="
              col-md-10
              offset-md-1
              col-sm-11
              offset-1
              col-lg-7
              offset-lg-2
              border
              rounded
            "
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
                    ><input
                      type="text"
                      ref="regLink"
                      @keydown="preventChangingOfCheckinLink"
                      @click="copyRegLink"
                      :value="eventRegLink"
                      class="form-control"
                      style="width: 95%" />
                    <i
                      class="pi pi-copy ml-2 c-pointer"
                      @click="copyRegLink"
                      style="font-size: 22px"
                    ></i
                  ></span>
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- <div class="row w-100 mt-3" v-if="paymentFormID">
          <div
            class="col-md-10 offset-md-1 col-sm-11 offset-1 col-lg-7 offset-lg-2 border rounded"
          >
            <div class="row">
              <div class="col-md-2 col-sm-2 d-flex align-self-center image mt-3">
                <img
                  src="../../../assets/link.svg" class="w-100"
                  alt="marked Attendance image"
                />
              </div>
              <div class="col-md-10 col-sm-10 mt-3">
                <a class="text-decoration-none"
                  ><h4 class="header4 link-color c-pointer" @click="copyPaymentFormLink">Payment Form Link</h4></a
                >
              
                <p class="para">
                  <span class="d-flex align-items-center"
                    ><input
                      type="text"
                      ref="paymentFormLink"
                      @keydown="preventChangingOfCheckinLink"
                      @click="copyPaymentFormLink"
                      :value="`https://my.churchplus.co/${paymentFormID}`"
                      class="form-control"
                      style="width: 95%" />
                    <i
                      class="pi pi-copy ml-2 c-pointer"
                      @click="copyPaymentFormLink"
                      style="font-size: 22px"
                    ></i
                  ></span>
                </p>
              </div>
            </div>
          </div>
        </div> -->

        <!-- <div class="row w-100 mt-3" v-if="paymentFormID">
          <div
            class="col-md-10 offset-md-1 col-sm-11 offset-1 col-lg-7 offset-lg-2 border rounded"
          >
            <div class="row">
              <div class="col-md-2 col-sm-2 d-flex align-self-center image mt-3">
                <img
                  src="../../../assets/link.svg" class="w-100"
                  alt="marked Attendance image"
                />
              </div>
              <div class="col-md-10 col-sm-10 mt-3">
                <a class="text-decoration-none"
                  ><h4 class="header4 link-color c-pointer" @click="copyIframeLink">iFrame</h4></a
                >
             
                <p class="para">
                  <span class="d-flex align-items-center"
                    ><code class="w-100">
                          <textarea rows="2" ref="iframeLink"  @click="copyIframeLink" :value="`${iFrameLink}`" class="form-control w-100 p-auto">
                          </textarea>
                      </code>
                    <i
                      class="pi pi-copy ml-2 c-pointer"
                      @click="copyIframeLink"
                      style="font-size: 22px"
                    ></i
                  ></span>
                </p>
              </div>
            </div>
          </div>
        </div> -->
        <div class="row w-100 mt-3">
          <div
            class="
              col-md-10
              offset-md-1
              col-sm-11
              offset-1
              col-lg-7
              offset-lg-2
              border
              rounded
            "
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
                    ><input
                      type="text"
                      ref="checkinLink"
                      @keydown="preventChangingOfCheckinLink"
                      @click="copyLink"
                      :value="link"
                      class="form-control"
                      style="width: 95%" />
                    <i
                      class="pi pi-copy ml-2 c-pointer"
                      @click="copyLink"
                      style="font-size: 22px"
                    ></i
                  ></span>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-12 mb-3"></div>
        <div class="row w-100" v-if="!route.query.fromBranch">
          <div
            class="
              col-md-10
              offset-md-1
              col-sm-11
              offset-1
              col-lg-7
              offset-lg-2
              border
              rounded
            "
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
            class="
              col-md-10
              offset-md-1
              col-sm-11
              offset-1
              col-lg-7
              offset-lg-2
              border
              rounded
            "
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
                  <span class="d-flex align-items-center"
                    ><input
                      type="text"
                      ref="familyLink"
                      @keydown="preventChangingOfCheckinLink"
                      @click="copyFamilyLink"
                      :value="`https://child-checkin-seven.vercel.app/${tenantId}`"
                      class="form-control"
                      style="width: 95%" />
                    <!-- :value="childCheckinLink" -->
                    <i
                      class="pi pi-copy ml-2 c-pointer"
                      @click="copyFamilyLink"
                      style="font-size: 22px"
                    ></i
                  ></span>
                </p>
              </div>
            </div>
          </div>
        </div>

        <div class="row w-100 c-pointer mt-3" @click="routeToChildCheckin">
          <div
            class="
              col-md-10
              offset-md-1
              col-sm-11
              offset-1
              col-lg-7
              offset-lg-2
              border
              rounded
            "
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
            class="
              col-md-10
              offset-md-1
              col-sm-11
              offset-1
              col-lg-7
              offset-lg-2
              border
              rounded
            "
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
            class="
              col-md-10
              offset-md-1
              col-sm-11
              offset-1
              col-lg-7
              offset-lg-2
              border
              rounded
            "
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
            class="
              col-md-10
              offset-md-1
              col-sm-11
              offset-1
              col-lg-7
              offset-lg-2
              border
              mt-3
              rounded
            "
          ></div>
        </div>
        <div class="row w-100 mt-3">
          <div
            class="
              col-md-10
              offset-md-1
              col-sm-11
              offset-1
              col-lg-7
              offset-lg-2
              border
              rounded
            "
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
                  <!-- <router-link
                    class="text-decoration-none link-color"
                    :to="{ name: 'SMSCheckin', query: { id: route.query.id } }"
                    >SMS</router-link
                  > -->
                </h4>
                <!-- <p class="para">SMS number for marking attendance through mobile phones.</p> -->
              </div>
            </div>

            <div
              class="row d-flex justify-content-start mb-3"
              :class="{ 'dd-hide-list': !showMoreField }"
            >
              <!-- <div class="col-md-2 col-sm-2 image mt-3">
                <img
                  src="../../../assets/group1.svg"
                  alt="marked Attendance image"
                />
              </div> -->
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

                <!-- <p class="para">SMS number for marking attendance through mobile phones.</p> -->
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
            class="
              col-md-10
              offset-md-1
              col-sm-11
              offset-1
              col-lg-7
              offset-lg-2
              border
              rounded
            "
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
                  <!-- <router-link
                    class="text-decoration-none link-color"
                    :to="{ name: 'USSDCheckin', query: { id: route.query.id } }"
                    >USSD</router-link
                  > -->
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
      <Toast />
    </div>
  </div>
</template>

<script>
// import Button from 'primevue/button';
import Dropdown from "primevue/dropdown";
import MultiSelect from "primevue/multiselect";
import { useRoute } from "vue-router";
import { computed, ref } from "vue";
import attendanceservice from "../../../services/attendance/attendanceservice";
import { useStore } from "vuex";
import { useToast } from "primevue/usetoast";
import router from "../../../router";

export default {
  components: { Dropdown, MultiSelect },

  setup() {
    const route = useRoute();
    const groups = ref([]);
    const selectedEvent = ref({});
    const events = ref([]);
    const selectedGroups = ref([]);
    const store = useStore();
    const checkinLink = ref(null);
    const familyLink = ref(null);
    const showMoreField = ref(false);
    const regLink = ref(null);
    const paymentFormLink = ref(null);
    const iframeLink = ref(null);
    const toast = useToast();
    const eventLinkResponse = ref("");
    const paymentFormIdResponse = ref("");
    const tenantId = ref("");
    const customFieldList = ref([]);
    const joinSelectedFields = ref("");

    if (route.query.activityID) {
      events.value.push({
        name: route.query.activityName,
        id: route.query.activityID,
      });
      selectedEvent.value = {
        name: route.query.activityName,
        id: route.query.activityID,
      };
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
    }

    // const getDetails = async () => {
    //     try {
    //         const response = await attendanceservice.getReport(route.query.id);
    //         console.log(response);
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

    const showAdditionalField = () => {
      showMoreField.value = !showMoreField.value;
    };

    const customFieldValue = (item) => {
      if (customFieldList.value.length <= 0) {
        customFieldList.value.push(`${item.label}=${item.value}`);
      } else {
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
    };

    // Check ifthe label is there, if its there dont push it, if it's there, just change the value

    const attendanceCheckinInStore = ref(
      store.getters["attendance/attendanceItemData"]
    );
    const showFormList = ref([
      { label: "Card/Checkin Number", value: false },
      { label: "Address", value: false },
      // { label: "Gender", value: false },
      // { label: "Marital Status", value: false },
      { label: "Birthday", value: false },
      // { label: "Wedding", value: false },
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
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    };

    const copyLink = () => {
      checkinLink.value.select();
      checkinLink.value.setSelectionRange(
        0,
        checkinLink.value.value.length
      ); /* For mobile devices */

      /* Copy the text inside the text field */
      document.execCommand("copy");
      toast.add({
        severity: "info",
        summary: "Link Copied",
        detail: "Checkin link copied to your clipboard",
        life: 3000,
      });
      console.log(attendanceCheckinInStore.value);
      console.log(eventRegistration.value);
    };

    const copyRegLink = () => {
      regLink.value.select();
      regLink.value.setSelectionRange(
        0,
        regLink.value.value.length
      ); /* For mobile devices */

      /* Copy the text inside the text field */
      document.execCommand("copy");
      toast.add({
        severity: "info",
        summary: "Link Copied",
        detail: "Registration link copied to your clipboard",
        life: 3000,
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
      toast.add({
        severity: "info",
        summary: "Link Copied",
        detail: "Payment form link copied to your clipboard",
        life: 3000,
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
      toast.add({
        severity: "info",
        summary: "Link Copied",
        detail: "iFrame copied to your clipboard",
        life: 3000,
      });
    };

    const copyFamilyLink = () => {
      familyLink.value.select();
      familyLink.value.setSelectionRange(
        0,
        familyLink.value.value.length
      ); /* For mobile devices */

      /* Copy the text inside the text field */
      document.execCommand("copy");
      toast.add({
        severity: "info",
        summary: "Link Copied",
        detail: "Family link copied to your clipboard",
        life: 3000,
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

    // const eventRegLink = computed(() => {
    //   if (
    //     !eventRegistration.value ||
    //     !eventRegistration.value.eventRegistrationLink
    //   )
    //     return eventLinkResponse.value;
    //   return eventRegistration.value.eventRegistrationLink
    // });

    const eventRegLink = computed(() => {
      if (
        !attendanceCheckinInStore.value ||
        !attendanceCheckinInStore.value.eventID
      )
        return `https://my.churchplus.co/event/${eventLinkResponse.value.id}${
          joinSelectedFields.value ? `?${joinSelectedFields.value}` : ""
        }`;
      // return attendanceCheckinInStore.value.eventRegistrationLink)

      return `https://my.churchplus.co/event/${
        attendanceCheckinInStore.value.id
      }${joinSelectedFields.value ? `?${joinSelectedFields.value}` : ""}`;
    });

    // const paymentFormID = computed(() => {
    //   if (
    //     !attendanceCheckinInStore.value ||
    //     !attendanceCheckinInStore.value.paymentFormId
    //   )
    //     return paymentFormIdResponse.value;
    //   return attendanceCheckinInStore.value.paymentFormId
    // });

    // const iFrameLink = computed(() => {
    //   if (!paymentFormID.value) return ""
    //   return `<iframe loading="lazy" src="https://my.churchplus.co/iframe/${paymentFormID.value}" style="border:0px #f4f4f4 dashed;" name="online-giving" scrolling="no" frameborder="1" marginheight="0px" marginwidth="0px" height="1190px" width="720px" allowfullscreen></iframe>`
    // })

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

    // getDetails()

    const routeToChildCheckin = () => {
      router.push("/tenant/childcheckin");
    };

    return {
      groups,
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