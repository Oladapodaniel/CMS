<template>
  <div :class="{ 'container-wide': lgAndUp || xlAndUp }"
    class="container-top h-100">
    <div>
      <div class="d-flex flex-column flex-md-row justify-content-md-between">
        <div>
          <div class="text-head font-weight-600 h2 py-0 my-0 text-black">New Converts</div>
          <div class="s-18">Showing all Families</div>
        </div>
        <div class="mt-3 mt-md-0 d-flex flex-sm-nowrap flex-wrap">
          <el-button
            class="header-btn secondary-button w-100"
            @click="importNewConvert"
            round
            >Import</el-button
          >
          <router-link
            :to="{ name: 'AddNewConvert' }"
            class="text-decoration-none w-100"
          >
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
            Share the link to your new converts to enable them to add their
            details to your church.
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
      <div class="top-con">
        <div class="">
          <div class="table-to p-3 mt-5">
            <div
              class="d-flex flex-column flex-sm-row justify-content-sm-between"
            >
              <div>
                <el-tooltip
                  class="box-item"
                  effect="dark"
                  v-if="marked.length > 0"
                  content="Send SMS"
                  placement="top-start"
                >
                  <img
                    src="../../assets/sms.png"
                    style="width: 20px; margin-top: -13px"
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
                    :size="20"
                    class="ml-2 c-pointer"
                    v-if="marked.length > 0"
                    @click="sendMarkedMemberEmail"
                  >
                    <Message />
                  </el-icon>
                </el-tooltip>
              </div>
              <div
                class="d-flex flex-column flex-sm-row justify-content-sm-end"
              >
                <el-input
                  size="small"
                  v-model="searchText"
                  placeholder="Search..."
                  class="input-with-select"
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
                    <el-button>
                      <el-icon :size="13">
                        <Search />
                      </el-icon>
                    </el-button>
                  </template>
                </el-input>
              </div>
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
    <div
      v-if="allNewConvert.length === 0 && !loading && !networkError"
      class="no-person"
    >
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
          <el-skeleton-item
            variant="text"
            style="width: 240px; height: 240px"
          />
          <el-skeleton-item
            variant="text"
            style="width: 240px; height: 240px"
          />
        </div>
        <el-skeleton
          class="w-100 mt-5"
          style="height: 25px"
          :rows="20"
          animated
        />
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
        <h4 class="text-capitalize font-weight-600 ">
          New Converts QR Code For Registration
        </h4>
      </div>
      <div class="d-flex justify-content-center">
        <div class="img-wrapper">
          <img v-if="qrCode" :src="qrCode" class="image-wrapper w-100" />
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

export default {
  components: {
    Table,
    smsComponent,
    emailComponent,
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
        (store.getters.currentUser &&
          Object.keys(store.getters.currentUser).length == 0)
      )
        return "";
      return store.getters.currentUser;
    });

    watchEffect(() => {
      if (getUser.value) {
        tenantID.value = getUser.value.tenantId;
      }
    });

    const showConfirmModal = (id) => {
      ElMessageBox.confirm(
        "Are you sure you want to proceed?",
        "Confirm delete",
        {
          confirmButtonText: "OK",
          cancelButtonText: "Cancel",
          type: "error",
        }
      )
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
      if (allNewConvert.value && allNewConvert.value.length == 0)
        getAllNewConvert();
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
      selectedLink
    };
  },
};
</script>

<style scoped>
.table-top {
  font-weight: 800;
  font-size: 12px;
  background: #fff;
  border: 1px solid #e0e0e0;
  border-bottom: none;
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