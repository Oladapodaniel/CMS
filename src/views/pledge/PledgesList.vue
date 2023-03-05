<template>
  <div>
    <div
      class="d-flex flex-wrap flex-column flex-sm-row justify-content-between"
    >
      <div class="">
        <div class="head-text">Partnership and Pledges</div>
      </div>
      <div class="d-flex flex-column flex-sm-row mt-2 my-1 link">
        <router-link class="" to="/tenant/pledge/pledgedefinitionlist">
          <el-button class="header-btn mr-3" round>
            Partnership/Pledge items
          </el-button>
        </router-link>
        <router-link class="" to="/tenant/pledge/makepledge">
          <el-button color="#136acd" class="header-btn mt-3 mt-sm-0" round>
            New Partnership/Pledge
          </el-button></router-link
        >
      </div>
    </div>
    <!-- <div class="container "> -->
    <div class="d-flex flex-wrap flex-column flex-sm-row">
      <div class="w-100">
        <hr class="hr my-3" />
      </div>
    </div>
    <!-- </div> -->
    <div
      class="container-fluid"
      v-if="allPledgeList.length > 0 && !loading && !networkError"
    >
      <div class="row border py-3 mt-3 rounded">
        <div class="col-md-4 col-lg-4">
          <div class="text-secondary font-weight-bold small">Total pledge</div>
          <h3 class="font-weight-700 mt-3">
            {{ Math.abs(pledgesSummary.totalPledges).toLocaleString() }}.00
            <span class="text-secondary small">{{
              pledgesSummary.symbol
            }}</span>
          </h3>
        </div>
        <div class="col-md-4 col-lg-4 mt-3 mt-md-0">
          <div class="font-weight-bold small text-secondary">
            Total Payments
          </div>
          <h3 class="font-weight-700 mt-3 text-success">
            {{ Math.abs(pledgesSummary.totalPayments).toLocaleString() }}.00
            <span class="small">{{ pledgesSummary.symbol }}</span>
          </h3>
        </div>
        <div class="col-md-4 col-lg-4 mt-3 mt-md-0">
          <div class="text-secondary font-weight-bold small">
            <!-- Payment within the last 30 days -->
            Total Balance
          </div>
          <h3 class="font-weight-700 mt-3 text-danger">
            {{ pledgeBalance.toLocaleString() }}.00
            <span class="small">
              {{ pledgesSummary.symbol }}
            </span>
          </h3>
        </div>
      </div>
    </div>
    <div
      class="row mt-4"
      v-if="allPledgeList.length > 0 && !loading && !networkError"
    >
      <div class="col-md-12 mt-3 d-flex">
        <div>
          <span
            class="font-weight-bold bg-secondary rounded-circle py-1 px-2 border"
            >0</span
          >
        </div>
        <div class="col-md-5">active filters</div>
      </div>
    </div>
    <div
      class="row mt-4 mb-4"
      v-if="allPledgeList.length > 0 && !loading && !networkError"
    >
      <div class="col-12 col-md-6 col-lg-2 pr-lg-1">
        <MembersSearch
          @memberdetail="chooseContact"
          :currentMember="selectedContact"
        />
      </div>
      <div class="col-12 col-md-6 col-lg-2 mt-3 mt-md-0 mt-lg-0 px-lg-1">
        <el-select-v2
          v-model="selectedCategoryID"
          @change="setSelectedCategory"
          :options="
            allPledgeDefinitionList.map((i) => ({ label: i.name, value: i.id }))
          "
          placeholder="Select category"
          size="large"
          class="w-100"
        />
      </div>
      <div class="col-12 col-md-6 col-lg-2 mt-3 mt-lg-0 px-lg-1">
        <el-select-v2
          v-model="selectedStatusID"
          @change="setSelectedStatus"
          :options="
            allPledgeStatus.map((i) => ({ label: i.status, value: i.status }))
          "
          placeholder=" Select Status"
          size="large"
          class="w-100"
        />
      </div>
      <div class="col-12 col-md-6 col-lg-2 mt-3 mt-lg-0 px-lg-1">
        <el-date-picker
          v-model="startDate"
          type="date"
          placeholder="From"
          format="DD/MM/YYYY"
          size="large"
          class="w-100"
        />
      </div>
      <div class="col-12 col-md-6 col-lg-2 mt-3 mt-lg-0 px-lg-1">
        <el-date-picker
          v-model="endDate"
          type="date"
          placeholder="To"
          format="DD/MM/YYYY"
          size="large"
          class="w-100"
        />
      </div>
      <div
        class="col-12 col-md-6 col-lg-2 mt-3 text-lg-right text-md-center text-sm-center mt-lg-0"
      >
        <el-button
          :loading="filterLoading"
          class=""
          @click="filterPledge"
          round
          color="#136acd"
          size="large"
        >
          Apply
        </el-button>
      </div>
    </div>
    <div v-if="searchPledges && searchPledges.length > 0 && !loading && !networkError">
      <Table
        :data="searchPledges"
        :headers="pledgeHeaders"
        :checkMultipleItem="false"
        v-loading="loading"
      >
        <template v-slot:status="{ item }">
          <div class="c-pointer" @click="pledgeListClick(item.id)">
            {{ item.status }}
          </div>
        </template>
        <template v-slot:pledgeNumber="{ item }">
          <div class="c-pointer" @click="pledgeListClick(item.id)">
            {{ item.pledgeNumber }}
          </div>
        </template>
        <template v-slot:contact="{ item }">
          <div class="c-pointer" @click="pledgeListClick(item.id)">
            {{ item.contact }}
          </div>
        </template>
        <template v-slot:amount="{ item }">
          <div class="c-pointer" @click="pledgeListClick(item.id)">
            {{ item && item.currency ? item.currency.symbol : "" }}
            {{ Math.abs(item.amount).toLocaleString() }}.00
          </div>
        </template>
        <template v-slot:redeemed="{ item }">
          <div class="c-pointer" @click="pledgeListClick(item.id)">
            {{ item.currencySymbol
            }}{{ Math.abs(item.totalPaymentSum).toLocaleString() }}..00
          </div>
        </template>
        <template v-slot:date="{ item }">
          <div class="c-pointer" @click="pledgeListClick(item.id)">
            {{ date(item.date) }}
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
                    :to="`/tenant/pledge/pledgemaking?pledgeTypeID=${item.id}`"
                    class="text-color"
                    >Make Payment</router-link
                  >
                </el-dropdown-item>
                <el-dropdown-item>
                  <router-link
                    :to="`/tenant/pledge/makepledge?id=${item.id}`"
                    class="text-color"
                    >Edit</router-link
                  >
                </el-dropdown-item>
                <el-dropdown-item>
                  <div
                    @click.prevent="showConfirmModal(item.id, index)"
                    class="text-color"
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
      class="no-person"
      v-if="searchPledges.length == 0 && !loading && !networkError "
    >
      <div class="empty-img">
        <p><img src="../../assets/people/people-empty.svg" alt="" /></p>
        <p class="tip">You haven't added any pledge yet</p>
        <div
          class="c-pointer primary-bg col-sm-6 col-md-4 offset-sm-3 offset-md-4 default-btn border-0 text-white"
          @click="navigateToMakePledge"
        >
          Add Pledge
        </div>
      </div>
    </div>

    <div class="adjust-network" v-else-if="networkError">
      <img src="../../assets/network-disconnected.png" />
      <div>Opps, Your internet connection was disrupted</div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from "vue";
// import finish from "../../services/progressbar/progress";
import MembersSearch from "../../components/membership/MembersSearch.vue";
import axios from "@/gateway/backendapi";
import Dropdown from "primevue/dropdown";
import monthDayYear from "../../services/dates/dateformatter";
import { ElMessage, ElMessageBox } from "element-plus";
import Table from "@/components/table/Table";
import router from "../../router";
import store from "../../store/store"

export default {
  components: {
    Dropdown,
    MembersSearch,
    Table,
  },
  setup() {
    const networkError = ref(false);
    // const allPerson = ref([]);
    const selectedStatusID = ref(null);
    const selectedCategoryID = ref(null);
    const filterLoading = ref(false);
    const allPledgeStatus = ref([
      { status: "Paid" },
      { status: "Over Due" },
      { status: "No Payment" },
      { status: "---" },
    ]);
    const allPledgeDefinitionList = ref([]);
    const selectedCategory = ref({});
    const filterResult = ref([]);
    const selectedStatus = ref("");
    const loading = ref(false);
    const searchText = ref("");
    const selectedPledge = ref("");
    const tenantID = ref("");
    const allPledgeType = ref([]);
    const selectedPerson = ref("");
    const allPledgeList = ref(store.getters['pledge/getpledges']);
    const pledgesSummary = ref(store.getters['pledge/getpledgesummary']);
    // const pledgesSummary = ref({});
    const startDate = ref("");
    const endDate = ref("");
    const showUpload = ref(true);
    const showDraft = ref(false);
    const showInvoice = ref(false);
    const selectedContact = ref({});
    const selectedContact2 = ref("");
    const pledgeHeaders = ref([
      { name: "STATUS", value: "status" },
      { name: "PLEDGE NO.", value: "pledgeNumber" },
      { name: "CONTACT", value: "contact" },
      { name: "AMOUNT", value: "amount" },
      { name: "REDEEMED", value: "redeemed" },
      { name: "DATE", value: "date" },
      { name: "ACTION", value: "action" },
    ]);

    const upload = () => {
      showUpload.value = true;
      showDraft.value = false;
      showInvoice.value = false;
    };

    const draft = () => {
      showDraft.value = true;
      showUpload.value = false;
      showInvoice.value = false;
    };

    const invoice = () => {
      showInvoice.value = true;
      showDraft.value = false;
      showUpload.value = false;
    };

    const setSelectedCategory = () => {
      selectedCategory.value = allPledgeDefinitionList.value.find((i) => {
        return i.id == selectedCategoryID.value;
      });
    };

    const setSelectedStatus = () => {
      selectedStatus.value = allPledgeStatus.value.find((i) => {
        return i.status == selectedStatusID.value;
      });
    };

    const navigateToMakePledge = () => {
      router.push("/tenant/pledge/makepledge");
    };

    const pledgeListClick = (id) => {
      router.push(`/tenant/pledge/pledgemaking?pledgeTypeID=${id}`);
    };
    const pledgeBalance = computed(() => {
      return (
        pledgesSummary.value.totalPledges - pledgesSummary.value.totalPayments
      );
    });

    const getAllPledgeDefinition = async () => {
      try {
        const res = await axios.get("/api/Pledge/GetAllPledgeDefinitions");
        allPledgeDefinitionList.value = res.data.returnObject;
      } catch (error) {
        console.log(error);
      }
    };
    getAllPledgeDefinition();

    const filterPledge = async () => {
      filterLoading.value = true;
      selectedContact.value.name =
        selectedContact.value.name == undefined
          ? ""
          : selectedContact.value.name;
      selectedCategory.value.name =
        selectedCategory.value.name == undefined
          ? ""
          : selectedCategory.value.name;
      selectedStatus.value.status =
        selectedStatus.value.status == undefined
          ? ""
          : selectedStatus.value.status;
      try {
        const res = await axios.get(
          `/api/Pledge/GetAllPledgesSearch?personId=${
            selectedContact.value.id
          }&status${selectedStatus.value.status}&pledgeItemName${
            selectedCategory.value.name
          }&startDate${new Date(startDate.value).toLocaleDateString(
            "en-US"
          )}&endDate${new Date(endDate.value).toLocaleDateString("en-US")}`
        );
        filterResult.value = res.data.returnObject;
        filterLoading.value = false;
      } catch (error) {
        filterLoading.value = false;
        console.log(error);
      }
    };
    const getCurrentlySignedInUser = async () => {
      try {
        const res = await axios.get("/api/Membership/GetCurrentSignedInUser");
        tenantID.value = res.data.tenantId;
      } catch (err) {
        console.log(err);
      }
    };

    getCurrentlySignedInUser();

    const memberlink = computed(() => {
      if (!tenantID.value) return "";
      return `${window.location.origin}/pledge/publicmakepledge/${tenantID.value}`;
    });

    const searchPledges = computed(() => {
      if (searchText.value !== "" && allPledgeList.value.length > 0) {
        return allPledgeList.value.filter((i) => {
          if (i.pledgeType.name)
            return i.pledgeType.name
              .toLowerCase()
              .includes(searchText.value.toLowerCase());
        });
      } else if (
        filterResult.value.length > 0 &&
        (selectedContact.value.name ||
          selectedStatus.value.status ||
          selectedCategory.value.name)
      ) {
        return filterResult.value;
      } else {
        return allPledgeList.value;
      }
    });

    const date = (offDate) => {
      return monthDayYear.monthDayYear(offDate);
    };
    const chooseContact = (payload) => {
      // contactRef.value.hide();
      selectedContact.value = payload;
    };

    const searchIsVisible = ref(false);

    const toggleSearch = () => {
      searchIsVisible.value = !searchIsVisible.value;
    };

    const getAllPledgesSummary = async () => {
      try {
        // const res = await axios.get("/api/Pledge/GetAllPledgesSummary");
        await store.dispatch("pledge/getPledgeSummary").then((res) =>{
          pledgesSummary.value = res;
        })
      } catch (error) {}
    };

    const getAllPledges = async () => {
      loading.value = true;
      try {
        // const res = await axios.get("/api/Pledge/GetAllPledges");
        await store.dispatch("pledge/getPledges").then((res) => {
          allPledgeList.value = res;
          // allPerson.value = res.data.returnObject.map((i) => ({
          //   name: i.contact,
          //   personId: i.personID,
          // }));
          loading.value = false;
        });
        // finish();
      } catch (error) {
        // finish();
        console.log(error);
        loading.value = false;
        networkError.value = true;

        if (error.toString().toLowerCase().includes("network error")) {
          networkError.value = true;
        } else {
          networkError.value = false;
        }
      }
    };

    const pledgeClick = (id) => {
      router.push(`/tenant/pledge/makepledge?id=${id}`);
    };

    const deletePledge = (id) => {
      axios
        .delete(`/api/Pledge/DeletePledge?ID=${id}`)
        .then((res) => {
          console.log(res);
          ElMessage({
            type: "success",
            message: "Pledge form deleted",
            duration: 5000,
          });
          allPledgeList.value = allPledgeList.value.filter(
            (pledgelist) => pledgelist.id !== id
          );
        })
        .catch((err) => {
          // finish();
          if (err.response.status === 400) {
            ElMessage({
              type: "error",
              message: "Unable to delete",
              duration: 5000,
            });
          } else {
            ElMessage({
              type: "error",
              message: "Unable to delete",
              duration: 5000,
            });
          }
        });
    };
    const removeSearchText = () => {
      searchText.value = "";
    };
    const clearInput = () => {
      searchIsVisible.value = !searchIsVisible.value;
    };

    const showConfirmModal = (id, index) => {
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
          deletePledge(id, index);
        })
        .catch(() => {
          ElMessage({
            type: "info",
            message: "Delete canceled",
            duration: 5000,
          });
        });
    };

    onMounted(() =>{
      if (allPledgeList.value && allPledgeList.value.length == 0) getAllPledges() ;
      if (pledgesSummary.value && Object.keys(pledgesSummary.value).length == 0) getAllPledgesSummary() ;
    })

    return {
      upload,
      setSelectedStatus,
      filterLoading,
      setSelectedCategory,
      selectedCategoryID,
      pledgeHeaders,
      selectedStatusID,
      allPledgeDefinitionList,
      filterResult,
      pledgeBalance,
      // allPerson,
      filterPledge,
      pledgeListClick,
      selectedContact2,
      selectedCategory,
      selectedContact,
      draft,
      invoice,
      startDate,
      endDate,
      showUpload,
      showDraft,
      showInvoice,
      allPledgeList,
      navigateToMakePledge,
      networkError,
      tenantID,
      memberlink,
      pledgeClick,
      clearInput,
      searchPledges,
      pledgesSummary,
      toggleSearch,
      startDate,
      endDate,
      chooseContact,
      showConfirmModal,
      deletePledge,
      loading,
      searchText,
      searchIsVisible,
      selectedPledge,
      selectedPerson,
      removeSearchText,
      allPledgeType,
      allPledgeStatus,
      selectedStatus,
      date,
      // singlePledge
    };
  },
};
</script>

<style scoped>
.no-person {
  height: 80vh;
  display: flex;
  text-align: center;
}
.more-btn {
  background: #dde2e6;
}
.text-color {
  color: #212529;
  text-decoration: none;
}
.text-color:hover {
  color: #007bff;
}

.empty-img {
  width: 85%;
  /* min-width: 397px; */
  margin: auto;
}

.empty-img img {
  width: 100%;
  max-width: 200px;
}
.events {
  font: normal normal 800 29px Nunito sans;
}
.dropdown-menu a {
  color: #02172e;
}
.link a {
  text-decoration: none;
}

.link a:hover {
  color: #fff;
}

.table {
  width: 100% !important;
  box-shadow: 0px 1px 3px #02172e45;
  border: 1px solid #dde2e6;
  border-radius: 15px;
  text-align: left;
  margin-bottom: auto !important;
}
.table-top {
  font-weight: 800;
  font-size: 12px;
  display: flex;
  justify-content: flex-end;
}
.table-top label:hover,
.table-top p:hover {
  cursor: pointer;
}

@media screen and (min-width: 500px) {
  .theader {
    width: 23%;
  }
  .table-body .check {
    width: 3%;
  }
  .action {
    width: 5%;
  }
}

@media screen and (max-width: 1024px) {
  .my-con {
    flex-direction: column;
  }
  .table {
    width: 98%;
    margin: 24px auto;
  }
  .summary {
    width: 98%;
    margin: auto;
  }
}
.input-width {
  width: 100%;
}

@media (min-width: 992px) {
  .input-width {
    width: 350px;
  }
}

.table-footer {
  display: flex;
  justify-content: flex-end;
  background: #fff;
  padding: 10px 0;
  border-radius: 0px 0px 22px 22px;
}

.table-header {
  padding: 12px;
  color: black;
  box-shadow: none;
  font-size: 11px;
  font-weight: 700;
}
.table-body {
  padding: 12px;
  border-bottom: 1.5px solid #6d6d6d19;
}

.hover:hover {
  background: #eee;
}

.parent-desc.first {
  color: #8898aa;
  font-size: 14px;
  font-weight: 600;
  box-shadow: 0px 3px 6px #2c28281c;
  background: #dde2e6 0% 0% no-repeat padding-box;
}
.desc-head {
  font-weight: 700;
}
.desc {
  color: #9b9a9c;
}

.pi-spinner {
  color: #136acd;
}

.fa-ellipsis-v {
  padding: 10px;
}
</style>