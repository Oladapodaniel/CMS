<template>
  <div
    :class="{
      'container-slim': (lgAndUp || xlAndUp) && !isModal,
      'container-top': !isModal,
    }"
  >
    <div class="row">
      <div class="col-12 col-md-12 col-lg-12" v-if="!isModal">
        <div class="s-32 text-head text-black font-weight-bold">
          Import
          {{
            route.query.query == "importfirsttimer"
              ? firstTimerText
              : route.query.query == "importpeople"
              ? memberText
              : newConvert
          }}s
        </div>
        <!-- <div class="border-bottom w-100 my-4 col-12 col-md-12 col-lg-12"></div> -->
      </div>

      <div class="col-12 col-md-10 col-lg-11 col-xl-11">
        <div class="fw-500 s-18 mt-4">
          You can easily import
          {{
            route.query.query == "importfirsttimer"
              ? firstTimerText
              : route.query.query == "importpeople"
              ? memberText
              : newConvert
          }}s from any spreadsheet with .xlsx or .csv file format.
        </div>
      </div>
      <div class="col-12 text-secondary font-weight-normal lead d-none d-md-block mb-3">
        {{
          route.query.query == "importfirsttimer"
            ? firstTimerText
            : route.query.query == "importpeople"
            ? memberText
            : newConvert
        }}s Excel/CSV template file
      </div>
      <div
        class="col-12 col-md-12 d-flex justify-content-center p-3 mb-3"
        style="background: #d1f7ff"
      >
        <div class="col-md-8 d-flex">
          <div class="col-md-2 col-2 d-flex align-items-center px-0">
            <img
              class="primary-bg p-2 col-md-8"
              src="../../assets/DownloadSimple.png"
              style="width: 3rem"
              alt=""
            />
          </div>
          <div class="col-md-10 px-0">
            <a href="/files/Template.csv" class="no-decoration text-dak s-24" download>
              <u
                >Click here to download and view our
                {{
                  route.query.query == "importfirsttimer"
                    ? firstTimerText
                    : route.query.query == "importpeople"
                    ? memberText
                    : newConvert
                }}s Excel/CSV template.</u
              >
            </a>
          </div>
        </div>
      </div>
      <div class="s-18 col-12 col-md-12 d-flex justify-content-center">
        <div class="col md-10 text-center  my-0 linear-gradient p-3">
          You can use this as a template for creating your Excel/CSV file.
        </div>
      </div>
      <div class="col-12 col-md-6 mb-3" v-if="route.query.query == 'importfirsttimer'">
        <span class="font-weight-700">Select event attended</span>
        <div class="mt-2">
          <el-dropdown class="w-100" trigger="click">
            <span class="el-dropdown-link w-100">
              <div
                class="d-flex justify-content-between border-contribution w-100"
                size="large"
              >
                <span class="text-secondary">{{
                  selectedEventAttended.name
                    ? selectedEventAttended.name
                    : "Select event or service attended"
                }}</span>
                <div>
                  <el-icon class="el-icon--right">
                    <arrow-down />
                  </el-icon>
                </div>
              </div>
            </span>
            <template #dropdown>
              <div class="p-2">
                <el-input
                  class="w-100"
                  placeholder="Search for events"
                  v-model="eventsSearchString"
                />
              </div>
              <el-dropdown-menu class="menu-height">
                <el-dropdown-item
                  v-for="(event, index) in filteredEvents"
                  :key="index"
                  @click="eventAttendedSelected(event)"
                  >{{ event.name }}</el-dropdown-item
                >
                <el-dropdown-item
                  class="d-flex justify-content-center text-primary font-weight-700"
                  data-toggle="modal"
                  data-target="#eventModal"
                  divided
                  ><el-icon>
                    <CirclePlus />
                  </el-icon>
                  Create new event</el-dropdown-item
                >
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </div>
      <div class="col-12 col-md-10">
        <div class="py-2 rounded bg-white">
          <div class="mt-3">
            <el-upload
              class="upload-demo"
              :limit="1"
              :on-change="imageSelected"
              :on-remove="handleRemove"
              :auto-upload="false"
              accept="text/csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
              drag
            >
              <el-icon class="el-icon--upload"><upload-filled /></el-icon>
              <div class="el-upload__text">
                Drop file here or <em>click to upload</em>
              </div>
              <template #tip>
                <div class="el-upload__tip">csv/xlsx files with a size less than 3mb</div>
              </template>
            </el-upload>
            <!-- <input
              type="file"
              @change="imageSelected"
              class="form-control w-100 c-pointer"
            /> -->
          </div>
          <div class="col-12 d-flex justify-content-center text-center my-4">
            <el-button
              :color="primarycolor"
              :disabled="image == ''"
              @click="uploadFile"
              :loading="uploadLoading"
              round
              >Upload and preview
              {{
                route.query.query == "importfirsttimer"
                  ? firstTimerText
                  : route.query.query == "importpeople"
                  ? memberText
                  : newConvert
              }}s</el-button
            >
          </div>
          <div class="border-bottom w-100 my-2 col-md-12"></div>
          <!-- <div class="col-12 col-md-7 col-lg-7 my-3 small">Maximum 5MB file size.</div> -->
        </div>
      </div>
      <div class="col-lg-12 col-md-12">
        <div class="mt-4">
          <span>Need help creating your Excel or CSV file?</span>
          <a
            href="#"
            @click="toggleInstruction"
            class="no-decoration primary--text font-weight-bold"
          >
            View Instruction
            <i
              class="pi pi-angle-down"
              :class="{ rollIcon: addInstructionClass, closeIcon: !addInstructionClass }"
            ></i
          ></a>
        </div>
      </div>
      <div
        class="col-12"
        :class="{
          'show-instruction': addInstructionClass,
          'hide-instruction': !addInstructionClass,
        }"
      >
        <div class="row">
          <div
            class="col-6 col-md-12 col-lg-12 text-secondary font-weight-normal lead my-3"
          >
            File format
          </div>
          <div class="col-10 col-md-12">
            <span
              >The first line of your
              {{
                route.query.query == "importfirsttimer"
                  ? firstTimerText
                  : route.query.query == "importpeople"
                  ? memberText
                  : newConvert
              }}s Excel/CSV must include all of the headers listed below, which are
              included in the
              {{
                route.query.query == "importfirsttimer"
                  ? firstTimerText
                  : route.query.query == "importpeople"
                  ? memberText
                  : newConvert
              }}
              Excel/CSV template</span
            >
          </div>
          <div class="row ml-1 bg-color my-3 mx-1 rounded h-100 w-100">
            <div class="col-12 my-2 col-md-12 col-lg-12">
              <i class="pi pi-info-circle"></i><strong> Reminder:</strong> All Excel/CSV
              file headers are case-sensitive.
              <div class="col-12 col-md-12 col-lg-12 border-bottom my-2"></div>
            </div>
            <div class="col-4 col-md-4 col-lg-4 font-weight-600">
              <p>FirstName</p>
            </div>
            <div class="col-8 col-md-8 col-lg-8">
              <p>
                The first name of your
                {{
                  route.query.query == "importfirsttimer"
                    ? firstTimerText
                    : route.query.query == "importpeople"
                    ? memberText
                    : newConvert
                }}
              </p>
            </div>
            <div class="col-4 col-md-4 col-lg-4 font-weight-600">
              <p>LastName</p>
            </div>
            <div class="col-8 col-md-8 col-lg-8">
              <p>
                The last name of your
                {{
                  route.query.query == "importfirsttimer"
                    ? firstTimerText
                    : route.query.query == "importpeople"
                    ? memberText
                    : newConvert
                }}.
              </p>
            </div>
            <div class="col-4 col-md-4 col-lg-4 font-weight-600">
              <p>Email</p>
            </div>
            <div class="col-8 col-md-8 col-lg-8">
              <p>
                The email address of your
                {{
                  route.query.query == "importfirsttimer"
                    ? firstTimerText
                    : route.query.query == "importpeople"
                    ? memberText
                    : newConvert
                }}
              </p>
            </div>
            <div class="col-4 col-md-4 col-lg-4 font-weight-600">
              <p>PhoneNumber</p>
            </div>
            <div class="col-8 col-md-8 col-lg-8">
              The phone number of your
              {{
                route.query.query == "importfirsttimer"
                  ? firstTimerText
                  : route.query.query == "importpeople"
                  ? memberText
                  : newConvert
              }}.
            </div>
            <div class="col-4 col-md-4 col-lg-4 font-weight-600">
              <p>Address</p>
            </div>
            <div class="col-8 col-md-8 col-lg-8">
              The address of the
              {{
                route.query.query == "importfirsttimer"
                  ? firstTimerText
                  : route.query.query == "importpeople"
                  ? memberText
                  : newConvert
              }}.
            </div>
            <div class="col-4 col-md-4 col-lg-4 font-weight-600">
              <p>Birthday</p>
            </div>
            <div class="col-8 col-md-8 col-lg-8">
              <p>
                The birthday of the
                {{
                  route.query.query == "importfirsttimer"
                    ? firstTimerText
                    : route.query.query == "importpeople"
                    ? memberText
                    : newConvert
                }}
              </p>
            </div>
            <div class="col-4 col-md-4 col-lg-4 font-weight-600">
              <p>BirthMonth</p>
            </div>
            <div class="col-8 col-md-8 col-lg-8">
              <p>
                The birth month of the
                {{
                  route.query.query == "importfirsttimer"
                    ? firstTimerText
                    : route.query.query == "importpeople"
                    ? memberText
                    : newConvert
                }}
              </p>
            </div>
            <div class="col-4 col-md-4 col-lg-4 font-weight-600">
              <p>BirthYear</p>
            </div>
            <div class="col-8 col-md-8 col-lg-8">
              <p>
                The birth year of the
                {{
                  route.query.query == "importfirsttimer"
                    ? firstTimerText
                    : route.query.query == "importpeople"
                    ? memberText
                    : newConvert
                }}
              </p>
            </div>
            <div class="col-4 col-md-4 col-lg-4 font-weight-600">
              <p>Gender</p>
            </div>
            <div class="col-8 col-md-8 col-lg-8">
              <p>
                The gender of the
                {{
                  route.query.query == "importfirsttimer"
                    ? firstTimerText
                    : route.query.query == "importpeople"
                    ? memberText
                    : newConvert
                }}
              </p>
            </div>
            <div class="col-4 col-md-4 col-lg-4 font-weight-600">
              <p>MaritalStatus</p>
            </div>
            <div class="col-8 col-md-8 col-lg-8">
              <p>
                The marital status of the
                {{
                  route.query.query == "importfirsttimer"
                    ? firstTimerText
                    : route.query.query == "importpeople"
                    ? memberText
                    : newConvert
                }}
              </p>
            </div>
            <div class="col-4 col-md-4 col-lg-4 font-weight-600">
              <p>CommunicationMeans</p>
            </div>
            <div class="col-8 col-md-8 col-lg-8">
              <p>
                Preferred communcation means of the
                {{
                  route.query.query == "importfirsttimer"
                    ? firstTimerText
                    : route.query.query == "importpeople"
                    ? memberText
                    : newConvert
                }}
              </p>
            </div>
            <div class="col-4 col-md-4 col-lg-4 font-weight-600">
              <p>InterestedInJoining</p>
            </div>
            <div class="col-8 col-md-8 col-lg-8">
              <p>
                If
                {{
                  route.query.query == "importfirsttimer"
                    ? firstTimerText
                    : route.query.query == "importpeople"
                    ? memberText
                    : newConvert
                }}
                is interested in joining
              </p>
            </div>
            <div class="col-4 col-md-4 col-lg-4 font-weight-600">
              <p>WantToBeVisited</p>
            </div>
            <div class="col-8 col-md-8 col-lg-8">
              <p>
                If
                {{
                  route.query.query == "importfirsttimer"
                    ? firstTimerText
                    : route.query.query == "importpeople"
                    ? memberText
                    : newConvert
                }}
                wants to be visited.
              </p>
            </div>
          </div>
        </div>
      </div>

      <el-dialog
        v-model="displayModal"
        :title="`${
          route.query.query == 'importfirsttimer'
            ? firstTimerText
            : route.query.query == 'importpeople'
            ? memberText
            : newConvert
        }s to import from file`"
        :width="mdAndUp || lgAndUp || xlAndUp ? `50%` : `90%`"
      >
        <div class="row">
          <div class="col-3 font-weight-600">Name</div>
          <div class="col-4 font-weight-600">Email</div>
          <div class="col-2 font-weight-600">Gender</div>
          <div class="col-2 font-weight-600">Phone Number</div>
        </div>
        <div class="row" v-for="(item, index) in memberData" :key="index">
          <div class="col-3">
            {{ item.firstName ? item.firstName : "" }}
            {{ item.lastName ? item.lastName : "" }}
          </div>
          <div class="col-4">{{ item.email }}</div>
          <div class="col-2">{{ item.gender }}</div>
          <div class="col-2">{{ item.phoneNumber }}</div>
        </div>
        <template #footer>
          <span class="dialog-footer d-flex justify-content-end text-center">
            <el-button class="secondary-button" @click="displayModal = false" round
              >Cancel</el-button
            >
            <el-button
              :color="primarycolor"
              :loading="loading"
              @click="addToMembers"
              round
            >
              Save
            </el-button>
          </span>
        </template>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { ref, inject, onMounted, computed } from "vue";
import axios from "@/gateway/backendapi";
import finish from "../../services/progressbar/progress";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import deviceBreakpoint from "../../mixins/deviceBreakpoint";
import { ElMessage } from "element-plus";
import router from "../../router/index";

export default {
  props: {
    isModal: {
      type: Boolean,
      required: false,
    },
  },
  emits: ["uploadtogroup"],
  components: {},
  setup(props, { emit }) {
    const primarycolor = inject("primarycolor");
    const route = useRoute();
    const store = useStore();
    const image = ref("");
    const displayModal = ref(false);
    const memberData = ref([]);
    const firstTimerText = ref("firstTimer");
    const memberText = ref("member");
    const newConvert = ref("newConvert");
    const addInstructionClass = ref(false);
    const loading = ref(false);
    const { mdAndUp, lgAndUp, xlAndUp } = deviceBreakpoint();
    const uploadLoading = ref(false);
    const selectedEventAttended = ref({});
    const eventsSearchString = ref("");

    const imageSelected = async (e) => {
      image.value = e.raw;
    };

    const uploadFile = async () => {
      const formData = new FormData();
      formData.append("file", image.value ? image.value : "");
      uploadLoading.value = true;
      if (!route.fullPath.includes("createpeoplegroup")) {
        try {
          let { data } = await axios.post("/api/People/UploadFirstTimerFile", formData);
          uploadLoading.value = false;
          ElMessage({
            type: "success",
            message: data.response,
            duration: 5000,
          });
          memberData.value = data.returnObject;
          displayModal.value = true;
        } catch (err) {
          uploadLoading.value = false;
          finish();
          console.log(err);
          if (err.toString().toLowerCase().includes("network error")) {
            ElMessage({
              type: "warning",
              message: "Please ensure you have strong internet connection",
              duration: 5000,
            });
          } else if (err.toString().toLowerCase().includes("timeout")) {
            ElMessage({
              type: "warning",
              message: "Request took too long to respond, please refresh and try again",
              duration: 5000,
            });
          } else {
            ElMessage({
              type: "warning",
              message: "Upload not successful, please try again",
              duration: 5000,
            });
          }
        }
      } else {
        try {
          let { data } = await axios.post(
            `/api/Groups/UploadGroupMembersFile?groupId=${route.params.groupId}`,
            formData
          );
          ElMessage({
            type: "success",
            message: data.response,
            duration: 5000,
          });
          emit("uploadtogroup", data.returnObject);
        } catch (err) {
          finish();
          console.log(err);
          if (err.toString().toLowerCase().includes("network error")) {
            ElMessage({
              type: "warning",
              message: "Please ensure you have strong internet connection",
              duration: 5000,
            });
          } else if (err.toString().toLowerCase().includes("timeout")) {
            ElMessage({
              type: "warning",
              message: "Request took too long to respond, please refresh and try again",
              duration: 5000,
            });
          } else {
            ElMessage({
              type: "warning",
              message: "Upload not successful, please try again",
              duration: 5000,
            });
          }
        }
      }
    };

    const closeModal = () => {
      displayModal.value = false;
    };

    const addToMembers = async () => {
      loading.value = true;
      if (route.query.query === "importnewconvert") {
        try {
          let { data } = await axios.post("/api/People/AddNewConverts", memberData.value);
          displayModal.value = false;
          loading.value = false;
          ElMessage({
            type: "success",
            message: `${data.returnObject.createdRecord}`,
            duration: 8000,
          });
          router.push("/tenant/firsttimerslist");
        } catch (err) {
          loading.value = false;
          finish();
          if (err.toString().toLowerCase().includes("network error")) {
            ElMessage({
              type: "warning",
              message: "Please ensure you have strong internet connection",
              duration: 5000,
            });
          } else if (err.toString().toLowerCase().includes("timeout")) {
            ElMessage({
              type: "warning",
              message: "Request took too long to respond, please refresh and try again",
              duration: 5000,
            });
          }
          console.log(err);
        }
      } else if (route.query.query === "importpeople") {
        try {
          let { data } = await axios.post("/api/People/CreatePeople", memberData.value);
          displayModal.value = false;
          loading.value = false;
          store.dispatch("dashboard/getDashboard");
          store.dispatch("membership/setMembers").then(() => {
            router.push("/tenant/people");
          });
          ElMessage({
            type: "success",
            message: `${data.returnObject.createdRecord}`,
            duration: 8000,
          });
        } catch (err) {
          loading.value = false;
          finish();
          if (err.toString().toLowerCase().includes("network error")) {
            ElMessage({
              type: "warning",
              message: "Please ensure you have strong internet connection",
              duration: 5000,
            });
          } else if (err.toString().toLowerCase().includes("timeout")) {
            ElMessage({
              type: "warning",
              message: "Request took too long to respond, please refresh and try again",
              duration: 5000,
            });
          }
          console.log(err);
        }
      } else if (
        route.fullPath.includes("/tenant/event") ||
        (route.query.query === "importfirsttimer" &&
          Object.keys(selectedEventAttended.value).length > 0)
      ) {
        console.log(selectedEventAttended.value);
        let payload = {
          data: memberData.value,
          activityID: route.params.event
            ? route.params.event
            : selectedEventAttended.value.activityID,
          activateFollowUpWorkflow: true,
        };
        try {
          let { data } = await axios.post(
            "/api/People/CreateMultipleFirstTimerWithActivityID",
            payload
          );
          displayModal.value = false;
          loading.value = false;
          store.dispatch("dashboard/getDashboard");
          store.dispatch("membership/setFirstTimerData").then(() => {
            router.push("/tenant/firsttimerslist");
          });
          ElMessage({
            type: "success",
            message: `${data.returnObject.createdRecord}`,
            duration: 8000,
          });
        } catch (err) {
          loading.value = false;
          finish();
          if (err.toString().toLowerCase().includes("network error")) {
            ElMessage({
              type: "warning",
              message: "Please ensure you have strong internet connection",
              duration: 5000,
            });
          } else if (err.toString().toLowerCase().includes("timeout")) {
            ElMessage({
              type: "warning",
              message: "Request took too long to respond, please refresh and try again",
              duration: 5000,
            });
          }
          console.log(err);
        }
      } else {
        try {
          let { data } = await axios.post(
            "/api/People/CreateMultipleFirstTimer",
            memberData.value
          );
          displayModal.value = false;
          loading.value = false;
          store.dispatch("dashboard/getDashboard");
          store.dispatch("membership/setFirstTimerData").then(() => {
            router.push("/tenant/firsttimerslist");
          });
          ElMessage({
            type: "success",
            message: `${data.returnObject.createdRecord}`,
            duration: 8000,
          });
        } catch (err) {
          finish();
          loading.value = false;
          if (err.toString().toLowerCase().includes("network error")) {
            ElMessage({
              type: "warning",
              message: "Please ensure you have strong internet connection",
              duration: 5000,
            });
          } else if (err.toString().toLowerCase().includes("timeout")) {
            ElMessage({
              type: "warning",
              message: "Request took too long to respond, please refresh and try again",
              duration: 5000,
            });
          }
          console.log(err);
        }
      }
    };

    const toggleInstruction = () => {
      addInstructionClass.value = !addInstructionClass.value;
    };

    const eventsAttended = ref([]);
    onMounted(() => {
      axios
        .get("/api/Events/EventActivity")
        .then((res) => {
          eventsAttended.value = res.data;
        })
        .catch((err) => console.error(err));
    });

    const filteredEvents = computed(() => {
      if (!selectedEventAttended.value.name) return eventsAttended.value;
      return eventsAttended.value.filter((i) =>
        i.name.toLowerCase().includes(eventsSearchString.value.toLowerCase())
      );
    });

    const eventAttendedSelected = (eventObj) => {
      selectedEventAttended.value = eventObj;
      //   showEventList.value = false;
      //   eventsSearchString.value = "";
    };

    const handleRemove = () => {
      image.value = null;
    };

    return {
      imageSelected,
      firstTimerText,
      memberText,
      newConvert,
      image,
      uploadFile,
      memberData,
      addToMembers,
      closeModal,
      displayModal,
      addInstructionClass,
      toggleInstruction,
      loading,
      mdAndUp,
      lgAndUp,
      xlAndUp,
      uploadLoading,
      primarycolor,
      filteredEvents,
      selectedEventAttended,
      eventsAttended,
      eventAttendedSelected,
      eventsSearchString,
      handleRemove,
      route,
    };
  },
};
</script>

<style scoped>
.header {
  font: normal normal 800 29px Nunito sans;
}

.show-instruction {
  height: 825px;
  overflow: hidden;
  transition: all 1s ease-in-out;
}

.hide-instruction {
  height: 0;
  overflow: hidden;
  transition: all 1s ease-in-out;
}

.bg-color{
  background: #EBEDFF;
  border-radius: 8px;
}

.border-line {
  border-radius: 20px;
  border: 1px dashed #A0A0A0;
}

.linear-gradient{
  background: linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, #F2F4F7 36%);
  border-radius: 0px 0px 20px 0px;
  /* position: absolute;
  top: -23px;
  z-index: -99; */
}

.rollIcon {
  transform: rotateZ(180deg);
  transition: all 1s ease-in-out;
}

.closeIcon {
  transform: rotateZ(0deg);
  transition: all 0.5s ease-in-out;
}
</style>
