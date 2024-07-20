<template>
  <div :class="{ 'container-wide': lgAndUp || xlAndUp }" class="container-top h-100">
    <div>
      <div class="d-flex flex-column flex-sm-row justify-content-sm-between">
        <div>
          <div class="text-head font-weight-bold h2 py-0 my-0 text-black">
            New Converts
          </div>
          <div class="s-18">Showing all New Converts</div>
        </div>
        <div class="d-flex flex-wrap flex-sm-nowrap mt-3 mt-sm-0">
          <div class="d-flex mt-1 w-100" @click="watchVideo">
            <span class="s-18 primary--text">Watch Video </span>
            <span class="mt-0 ml-1"
              ><el-icon :size="27" class="primary--text"><VideoPlay /></el-icon
            ></span>
          </div>
          <el-dropdown
            trigger="click"
            class="align-items-center justify-content-center d-flex ml-md-3 ml-0 default-btn py-0 m-0 border"
            style="height: 2.2rem"
          >
            <span
              class="el-dropdown-link w-100 primary--text text-center font-weight-600"
            >
              More
              <el-icon class="el-icon--right">
                <arrow-down />
              </el-icon>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <!-- <el-dropdown-item class="text-black" @click="copylink"
                >Copy Public Link
                <img class="ml-2" src="../../assets/copyurl-icon.png" alt="" />
              </el-dropdown-item> -->
                <!-- <el-dropdown-item @click="getQrCode" class="text-black">
                Show QR Code
              </el-dropdown-item> -->
                <!-- <el-dropdown-item class="text-black" @click="showAnalysis"
                  >Analysis</el-dropdown-item
                > -->
                <el-dropdown-item class="text-black" @click="importNewConvert"
                  >Import</el-dropdown-item
                >
              </el-dropdown-menu>
            </template>
          </el-dropdown>
          <!-- <el-button @click="importMembers" class="header-btn secondary-button" round>Import</el-button> -->
          <router-link :to="{ name: 'AddNewConvert' }" class="text-decoration-none w-100">
            <el-button
              :color="primarycolor"
              class="ml-sm-2 ml-0 mt-2 mt-sm-0 w-100 header-btn"
              round
              >Add New Convert</el-button
            >
          </router-link>
        </div>
      </div>
      <div class="row" v-if="false">
        <div class="col-md-2">
          <div class="font-weight-bold py-md-2 mt-4">QR Code</div>
          <div class="image" @click="getQrCode">
            <img src="../../assets/group2.svg" alt="First Timer image" />
          </div>
        </div>
        <div class="col-md-10 pl-0">
          <div class="font-weight-bold py-md-2 mt-4">
            Share the link to your new converts to enable them to add their details to
            your church.
          </div>
          <div class="p-inputgroup form-group mt-1">
            <el-input
              v-model="newConvertLink"
              placeholder="Click the copy button when the link appears"
              ref="selectedLink"
              class="input-with-select w-100"
            >
              <template #append>
                <el-button @click="copylink2">
                  <el-icon>
                    <CopyDocument />
                  </el-icon>
                </el-button>
              </template>
            </el-input>
          </div>
        </div>
      </div>
      <transition name="el-fade-in-linear">
        <div class="row" v-show="membershipCapacityExceeded">
          <div class="col-md-12 mt-3">
            <MemberCapExceeded />
          </div>
        </div>
      </transition>
      <div v-if="searchNewConvert.length > 0"  class="tab-options d-block d-md-none mt-5">
      <div class="s-14 fw-500 col-md-10 px-0 mt-5">
        <div class="d-flex flex-column flex-sm-row justify-content-md-between">
          <div>
            <!-- <el-tooltip
              class="box-item"
              effect="dark"
              content="Add all members to group"
              placement="top-start"
            >
              <el-icon
                :size="28"
                class="c-pointer primary--text"
                @click="addToGroupDialog = true"
              >
                <CirclePlus />
              </el-icon>
            </el-tooltip> -->
            <!-- <el-tooltip
              class="box-item"
              effect="dark"
              v-if="marked.length > 0"
              content="Add to group"
              placement="top-start"
            >
              <el-icon
                class="ml-2 c-pointer primary--text"
                :size="28"
                @click="addToGroupSingle = true"
              >
                <User />
              </el-icon>
            </el-tooltip> -->
            <!-- <el-tooltip
              class="box-item"
              effect="dark"
              v-if="marked.length > 0"
              content="Archive member(s)"
              placement="top-start"
            >
              <el-icon
                class="ml-2 c-pointer primary--text"
                :size="28"
                @click="displayPositionArchive = true"
                v-if="marked.length > 0"
              >
                <DocumentRemove />
              </el-icon>
            </el-tooltip> -->
            <!-- <el-tooltip
              class="box-item"
              effect="dark"
              v-if="marked.length > 0"
              content="Delete member(s)"
              placement="top-start"
            >
              <el-icon
                :size="28"
                class="ml-2 c-pointer primary--text"
                v-if="marked.length > 0"
                @click="showConfirmModal1"
              >
                <Delete />
              </el-icon>
            </el-tooltip> -->
            <el-tooltip
              class="box-item"
              effect="dark"
              v-if="marked.length > 0"
              content="Send SMS"
              placement="top-start"
            >
              <img
                src="../../assets/ChatCenteredDots.png"
                style="width: 32px; margin-top: -20px"
                class="ml-2 c-pointer"
                @click="sendMarkedMemberSms"
                alt="Send SMS"
              />
            </el-tooltip>
            <el-tooltip
              class="box-item"
              effect="dark"
              v-if="marked.length > 0"
              content="Send Email"
              placement="top-start"
            >
              <el-icon
                :size="28"
                class="ml-2 c-pointer primary--text"
                v-if="marked.length > 0"
                @click="sendMarkedMemberEmail"
              >
                <Message />
              </el-icon>
            </el-tooltip>
            <!-- <el-tooltip
              class="box-item"
              effect="dark"
              v-if="marked.length > 0"
              content="Send Whatsapp message"
              placement="top-start"
            >
              <img
                src="../../assets/WhatsappLogo.png"
                style="width: 32px; margin-top: -20px"
                class="ml-2 c-pointer"
                @click="displayWhatsappDrawer(null)"
                alt="Send Whatsapp message"
              />
            </el-tooltip> -->
          </div>
          <div class="d-flex flex-column flex-sm-row justify-content-md-between">
            <el-input
              size="small"
              v-model="searchText"
              placeholder="Search..."
              class="search-input"
            >
              <template #suffix>
                <el-button
                  style="padding: 5px; height: 22px"
                  @click.prevent="searchText = ''"
                >
                  <el-icon :size="13">
                    <Close />
                  </el-icon>
                </el-button>
              </template>
              <template #append>
                <el-button class="btn-search" >
                  <el-icon :size="13">
                    <Search />
                  </el-icon>
                </el-button>
              </template>
            </el-input>
            <!-- <div
              style="background: #eeeeee"
              class="ml-2 mt-3 mt-sm-0 d-flex w-50 align-items-center justify-content-center border-radius-8"
            >
              <div
                @click="toggleFilterFormVissibility"
                class="mb-0 px-3 d-flex my-3 my-sm-0 c-pointer"
              >
                <span class="mr-1"> Filter</span>
                <el-icon :size="18">
                  <Filter />
                </el-icon>
              </div>
            </div> -->
          </div>
        </div>
      </div>
    </div>
      <div  v-if="searchNewConvert.length > 0" class="tab-options d-none d-md-block mt-5">
        <div class="table-top col-12 col-md-7 col-lg-7 col-xl-8 px-0 mt-5">
          <div class="d-flex flex-column flex-md-row justify-content-md-between">
            <div>
              <!-- <el-tooltip
                class="box-item"
                effect="dark"
                content="Add all members to group"
                placement="top-start"
              >
                <el-icon
                  :size="28"
                  class="c-pointer primary--text"
                  @click="addToGroupDialog = true"
                >
                  <CirclePlus />
                </el-icon>
              </el-tooltip> -->
              <!-- <el-tooltip
                class="box-item"
                effect="dark"
                v-if="marked.length > 0"
                content="Add to group"
                placement="top-start"
              >
                <el-icon
                  class="ml-2 c-pointer primary--text"
                  :size="28"
                  @click="addToGroupSingle = true"
                >
                  <User />
                </el-icon>
              </el-tooltip> -->
              <!-- <el-tooltip
                class="box-item"
                effect="dark"
                v-if="marked.length > 0"
                content="Archive member(s)"
                placement="top-start"
              >
                <el-icon
                  class="ml-2 c-pointer primary--text"
                  :size="28"
                  @click="displayPositionArchive = true"
                  v-if="marked.length > 0"
                >
                  <DocumentRemove />
                </el-icon>
              </el-tooltip> -->
              <!-- <el-tooltip
                class="box-item d-flex"
                effect="dark"
                v-if="marked.length > 0"
                content="Delete member(s)"
                placement="top-start"
              >
                <el-icon
                  :size="28"
                  class="ml-2 c-pointer primary--text"
                  v-if="marked.length > 0"
                  @click="showConfirmModal1"
                >
                  <Delete />
                </el-icon>
              </el-tooltip> -->
              <el-tooltip
                class="box-item"
                effect="dark"
                v-if="marked.length > 0"
                content="Send SMS"
                placement="top-start"
              >
                <img
                  src="../../assets/ChatCenteredDots.png"
                  style="width: 32px; margin-top: -20px"
                  class="ml-2 c-pointer primary--text"
                  @click="sendMarkedMemberSms"
                  alt="Send SMS"
                />
              </el-tooltip>
              <el-tooltip
                class="box-item"
                effect="dark"
                v-if="marked.length > 0"
                content="Send Email"
                placement="top-start"
              >
                <el-icon
                  :size="28"
                  class="ml-2 c-pointer primary--text"
                  v-if="marked.length > 0"
                  @click="sendMarkedMemberEmail"
                >
                  <Message />
                </el-icon>
              </el-tooltip>
              <!-- <el-tooltip
              class="box-item"
              effect="dark"
              v-if="marked.length > 0"
              content="Send Whatsapp message"
              placement="top-start"
            >
              <img
                src="../../assets/WhatsappLogo.png"
                style="width: 32px; margin-top: -20px"
                class="ml-2 c-pointer primary--text"
                @click="displayWhatsappDrawer(null)"
                alt="Send Whatsapp message"
              />
            </el-tooltip> -->
            </div>
            <div class="d-flex flex-column flex-md-row justify-content-md-between">
              <el-input
                size="small"
                v-model="searchText"
                placeholder="Search..."
                class="search-input col-md-12 col-9"
              >
                <template #suffix>
                  <el-button
                    style="padding: 5px; height: 22px"
                    @click.prevent="searchText = ''"
                  >
                    <el-icon :size="13">
                      <Close />
                    </el-icon>
                  </el-button>
                </template>
                <template #append>
                  <el-button class="btn-search">
                    <el-icon :size="13">
                      <Search />
                    </el-icon>
                  </el-button>
                </template>
              </el-input>
              <!-- <div
                style="background: #eeeeee"
                class="ml-2 mt-3 py-2 mt-md-0 d-flex align-items-center justify-content-center border-radius-8"
              >
                <p
                  @click="toggleFilterFormVissibility"
                  class="mb-0 px-3 d-flex my-3 my-sm-0 c-pointer"
                >
                  <span class="mr-1"> Filter</span>
                  <el-icon :size="18">
                    <Filter />
                  </el-icon>
                </p>
              </div> -->
            </div>
          </div>
        </div>
      </div>
      <Table
        :data="searchNewConvert"
        :headers="NewConvertHeaders"
        :checkMultipleItem="true"
        @checkedrow="handleSelectionChange"
        v-if="searchNewConvert.length > 0"
      >
        <template v-slot:fullname="{ item }">
          <div @click="showMemberRow(item)" class="c-pointer">
            {{ item.fullName }}
          </div>
        </template>

        <template v-slot:phoneNumber="{ item }">
          <div @click="showMemberRow(item)" class="c-pointer">
            {{ item.phoneNumber }}
          </div>
        </template>

        <template v-slot:date="{ item }">
          <div @click="showMemberRow(item)" class="c-pointer">
            {{ formatDate(item.date) }}
          </div>
        </template>
        <template v-slot:howDidYouAboutUsName="{ item }">
          <div @click="showMemberRow(item)" class="c-pointer">
            {{ item.howDidYouAboutUsName }}
          </div>
        </template>
        <template v-slot:interactions="{ item }">
          <div @click="showMemberRow(item)" class="c-pointer">
            {{ item.interactions }}
          </div>
        </template>

        <template v-slot:action="{ item }">
          <el-dropdown trigger="click">
            <el-icon>
              <MoreFilled />
            </el-icon>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>
                  <router-link
                    :to="`/tenant/people/addnewconvert?id=${item.id}`"
                    class="text-color"
                    >Edit</router-link
                  >
                </el-dropdown-item>
                <el-dropdown-item>
                  <div
                    class="text-decoration-none text-color"
                    @click="showConfirmModal(item.id)"
                  >
                    Delete
                  </div>
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </template>
      </Table>
    </div>
    <div v-if="allNewConvert.length === 0 && !loading && !networkError" class="no-person">
      <div class="empty-img">
        <p><img src="../../assets/people/people-empty.svg" alt="" /></p>
        <p class="tip">You haven't added any first timer yet</p>
        <el-button
          :color="primarycolor"
          @click="addNewConvert"
          class="ml-2 header-btn"
          round
          >Add First Timers</el-button
        >
      </div>
    </div>
    <div v-else-if="networkError && !loading" class="adjust-network">
      <img src="../../assets/network-disconnected.png" />
      <div>Opps, Your internet connection was disrupted</div>
    </div>
    <el-drawer
      v-model="showSMS"
      :size="mdAndUp || lgAndUp || xlAndUp ? '70%' : '100%'"
      direction="rtl"
    >
      <template #header>
        <h4>Send SMS</h4>
      </template>
      <template #default>
        <div>
          <smsComponent
            :phoneNumbers="contacts"
            @closesidemodal="() => (showSMS = false)"
          />
        </div>
      </template>
    </el-drawer>

    <el-drawer
      v-model="showEmail"
      :size="mdAndUp || lgAndUp || xlAndUp ? '70%' : '100%'"
      direction="rtl"
    >
      <template #header>
        <h4>Send Email</h4>
      </template>
      <template #default>
        <div>
          <emailComponent
            :selectedGroupMembers="markedMembers"
            @closesidemodal="() => (showEmail = false)"
          />
        </div>
      </template>
    </el-drawer>

    <el-skeleton class="w-100" animated v-if="loading">
      <template #template>
        <div
          style="
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-top: 20px;
          "
        >
          <el-skeleton-item variant="text" style="width: 240px; height: 240px" />
          <el-skeleton-item variant="text" style="width: 240px; height: 240px" />
        </div>
        <el-skeleton class="w-100 mt-5" style="height: 25px" :rows="20" animated />
      </template>
    </el-skeleton>
    <el-dialog
      v-model="QRCodeDialog"
      title=""
      :width="mdAndUp || lgAndUp || xlAndUp ? `30%` : xsOnly ? `90%` : `70%`"
      class="QRCodeDialog"
      align-center
    >
      <div class="d-flex align-items-center flex-column">
        <h4 class="text-capitalize font-weight-600">
          New Converts QR Code For Registration
        </h4>
      </div>
      <div class="d-flex justify-content-center">
        <div class="img-wrapper">
          <img v-if="qrCode" :src="qrCode" class="image-wrapper w-100" />
        </div>
      </div>
    </el-dialog>
    <el-dialog
      style="border-radius: 20px"
      v-model="showAddMemberVideo"
      :width="mdAndUp || lgAndUp || xlAndUp ? `50%` : `90%`"
      top
    >
      <div class="row justify-content-center" v-loading>
        <div class="col-md-12">
          <iframe
            width="100%"
            height="315"
            :src="videoURL"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerpolicy="strict-origin-when-cross-origin"
            allowfullscreen
          ></iframe>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { ref, inject, computed, watchEffect, onMounted } from "vue";
import axios from "@/gateway/backendapi";
import router from "@/router/index";
import dateFormatter from "../../services/dates/dateformatter";
import deviceBreakpoint from "../../mixins/deviceBreakpoint";
import Table from "@/components/table/Table";
import finish from "../../services/progressbar/progress";
import { ElMessage, ElMessageBox } from "element-plus";
import store from "../../store/store";
import smsComponent from "../groups/component/smsComponent.vue";
import emailComponent from "../groups/component/emailComponent.vue";
import MemberCapExceeded from "@/components/membership/MembershipCapExceeded.vue";

export default {
  components: {
    Table,
    smsComponent,
    emailComponent,
    MemberCapExceeded,
  },
  setup(props) {
    const { mdAndUp, lgAndUp, xlAndUp } = deviceBreakpoint();
    const primarycolor = inject("primarycolor");
    const loading = ref(false);
    const networkError = ref(false);
    const selectedLink = ref(null);
    const showSMS = ref(false);
    const tenantID = ref("");
    const marked = ref([]);
    const markedMembers = ref([]);
    const showEmail = ref(false);
    const contacts = ref([]);
    const searchText = ref("");
    // const allNewConvert = ref([]);
    const videoURL = ref("https://www.youtube.com/embed/zcwna-kshGo?si=08OmWtjLkAbwLXy8");
    const showAddMemberVideo = ref(false);
    const qrCode = ref("");
    const QRCodeDialog = ref(false);
    const allNewConvert = ref(store.getters["membership/allNewConverts"]);
    const NewConvertHeaders = ref([
      { name: "NAME", value: "fullname" },
      { name: "PHONE", value: "phoneNumber" },
      { name: "DATE", value: "date" },
      { name: "SOURCE", value: "howDidYouAboutUsName" },
      { name: "INTERESTED", value: "interestedInJoining" },
      { name: "INTERACTIONS", value: "interactions" },
      { name: "ACTION", value: "action" },
    ]);
    const membershipCapacityExceeded = ref(false);

    const watchVideo = () => {
      showAddMemberVideo.value = true;
    };

    const formatDate = (date) => {
      return dateFormatter.monthDayYear(date);
    };
    const showMemberRow = (item) => {
      router.push(`/tenant/people/addnewconvert?id=${item.id}`);
    };
    const addNewConvert = () => {
      router.push("/tenant/people/addnewconvert");
    };
    const getAllNewConvert = async () => {
      loading.value = true;

      try {
        store.dispatch("membership/setNewConvertData").then((response) => {
          allNewConvert.value = response;
          loading.value = false;
        });
      } catch (err) {
        finish();
        loading.value = false;
        if (err.toString().toLowerCase().includes("network error")) {
          networkError.value = true;
        } else {
          networkError.value = false;
        }
      }
    };
    const copylink2 = () => {
      selectedLink.value.input.setSelectionRange(
        0,
        selectedLink.value.input.value.length
      ); /* For mobile devices */
      selectedLink.value.input.select();

      /* Copy the text inside the text field */
      document.execCommand("copy");
      ElMessage({
        showClose: true,
        message: "Copied to clipboard",
        type: "success",
      });
    };

    const importNewConvert = () => {
      router.push({
        name: "ImportInstruction",
        query: { query: "importnewconvert" },
      });
    };
    const searchNewConvert = computed(() => {
      if (allNewConvert.value === 0 && searchText.value === "")
        return allNewConvert.value;
      return allNewConvert.value.filter((i) =>
        i.fullName.toLowerCase().includes(searchText.value.toLowerCase())
      );
    });
    const sendMarkedMemberSms = () => {
      contacts.value = marked.value
        .filter((i) => i.phoneNumber)
        .map((i) => i.phoneNumber)
        .join();
      showSMS.value = true;
    };

    const sendMarkedMemberEmail = () => {
      showEmail.value = true;
      markedMembers.value = marked.value.map((i) => {
        i.id = i.id;
        return i;
      });
    };
    const handleSelectionChange = (val) => {
      marked.value = val;
    };
    const newConvertLink = computed(() => {
      if (!tenantID.value) return "";
      return `${window.location.origin}/createnewconvert/${tenantID.value}`;
    });
    const getQrCode2 = async () => {
      try {
        const res = await axios.get(
          `/api/Settings/GetQRCode?link=${window.location.origin}/createnewconvert/${tenantID.value}`
        );
        QRCodeDialog.value = true;
        qrCode.value = res.data;
      } catch (error) {
        console.log(error);
      }
    };
    const getUser = computed(() => {
      if (
        !store.getters.currentUser ||
        (store.getters.currentUser && Object.keys(store.getters.currentUser).length == 0)
      )
        return "";
      return store.getters.currentUser;
    });

    watchEffect(() => {
      if (getUser.value) {
        tenantID.value = getUser.value.tenantId;

        if (getUser.value.churchSize >= getUser.value.subscribedChurchSize) {
          membershipCapacityExceeded.value = true;
        } else {
          membershipCapacityExceeded.value = false;
        }
      }
    });

    const showConfirmModal = (id) => {
      ElMessageBox.confirm("Are you sure you want to proceed?", "Confirm delete", {
        confirmButtonText: "OK",
        cancelButtonText: "Cancel",
        type: "error",
      })
        .then(() => {
          deleteNewConvert(id);
        })
        .catch(() => {
          ElMessage({
            type: "info",
            message: "Delete canceled",
          });
        });
    };
    const deleteNewConvert = (id) => {
      axios
        .delete(`api/People/DeleteNewConvert/${id}`)
        .then((res) => {
          console.log(res);

          ElMessage({
            type: "success",
            message: "New Convert Deleted",
            duration: 3000,
          });
          allNewConvert.value = allNewConvert.value.filter((i) => i.id !== id);
          store.dispatch("membership/removeNewConvertFromStore", id);
        })
        .catch((err) => {
          console.log(err);
          finish();
        });
    };

    onMounted(() => {
      if (allNewConvert.value && allNewConvert.value.length == 0) getAllNewConvert();
    });

    return {
      mdAndUp,
      lgAndUp,
      xlAndUp,
      primarycolor,
      loading,
      NewConvertHeaders,
      copylink2,
      formatDate,
      networkError,
      showConfirmModal,
      showSMS,
      contacts,
      showEmail,
      markedMembers,
      marked,
      tenantID,
      handleSelectionChange,
      deleteNewConvert,
      sendMarkedMemberEmail,
      sendMarkedMemberSms,
      allNewConvert,
      showMemberRow,
      searchNewConvert,
      searchText,
      importNewConvert,
      getAllNewConvert,
      getUser,
      addNewConvert,
      QRCodeDialog,
      qrCode,
      getQrCode2,
      newConvertLink,
      selectedLink,
      membershipCapacityExceeded,
      videoURL,
      showAddMemberVideo,
      watchVideo,
    };
  },
};
</script>

<style scoped>
.table-top {
  position: absolute;
  z-index: 1;
  top: -40px;
  /* width: 100%; */
  font-weight: 500 !important;
  font-size: 14px;
  background: #fff;
  color: #000000;
  /* border: 1px solid #d4dde3; */
  /* max-width: 83.333333% !important; */
}
.tab-options {
  position: relative;
}

.empty-img {
  width: 30%;
  min-width: 397px;
  margin: auto;
}

.empty-img img {
  width: 100%;
  max-width: 200px;
}
.no-person {
  height: 100%;
  display: flex;
  text-align: center;
}
@media screen and (min-width: 1400px) {
  .main-con {
    width: 90%;
    margin: 0 auto;
  }

  .top {
    height: 90px;
  }

  .no-person {
    height: calc(100% - 90px);
  }
}
</style>
