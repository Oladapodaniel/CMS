<template>
  <div class="row container-top">
    <div class="col-12 col-md-12">
      <div class="tab-options d-block d-md-none mt-5">
        <div class="s-14 fw-500 col-md-10 px-0 mt-5">
          <div class="d-flex flex-column flex-sm-row justify-content-md-between">
            <!-- <div>
              <el-tooltip
                class="box-item"
                effect="dark"
                v-if="marked.length > 0"
                content="Delete(s)"
                placement="top-start"
              >
                <el-icon
                  :size="28"
                  class="ml-2 c-pointer primary--text"
                  v-if="marked.length > 0"
                  @click="showConfirmModal(false)"
                >
                  <Delete />
                </el-icon>
              </el-tooltip>
            </div> -->
            <div class="d-flex flex-column flex-md-row justify-content-md-between">
              <el-input
              size="small"
              v-model="searchText"
              placeholder="Search..."
              @keyup.enter.prevent="searchPaymentInDB"
              class="input-with-select"
            >
              <template #append>
                <el-button @click.prevent="searchPaymentInDB">
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
      <div class="tab-options d-none d-md-block mt-5">
        <div class="table-top col-12 col-md-8 col-lg-8 col-xl-9 px-0 mt-5">
          <div class="d-flex flex-column flex-md-row justify-content-md-between">
            <div>
              <!-- <el-tooltip
                class="box-item d-flex"
                effect="dark"
                v-if="marked.length > 0"
                content="Delete(s)"
                placement="top-start"
              >
                <el-icon
                  :size="28"
                  class="ml-2 c-pointer primary--text"
                  v-if="marked.length > 0"
                  @click="showConfirmModal(false)"
                >
                  <Delete />
                </el-icon>
              </el-tooltip> -->
            </div>
            <div class="d-flex flex-column flex-md-row justify-content-md-between">
              <el-input
              size="small"
              v-model="searchText"
              placeholder="Search..."
              @keyup.enter.prevent="searchPaymentInDB"
              class="input-with-select"
            >
              <template #append>
                <el-button @click.prevent="searchPaymentInDB">
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
      <Table
        :data="searchPaymentList"
        :headers="paymentHeaders"
        :checkMultipleItem="false"
      >
        <template v-slot:name="{ item }">
          <div class="c-pointer" @click="paymentListClick(item.id)">
            {{ item.name }}
          </div>
        </template>
        <template v-slot:bank="{ item }">
          <div class="c-pointer" @click="paymentListClick(item.id)">
            {{ item.bank }}
          </div>
        </template>
        <template v-slot:date="{ item }">
          <div class="c-pointer" @click="paymentListClick(item.id)">
            {{ date(item.date) }}
          </div>
        </template>
        <template v-slot:isActive="{ item }">
          <div class="c-pointer" @click="paymentListClick(item.id)">
            {{ item.isActive ? "Active" : "Inactive" }}
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
                    class="text-color"
                    :to="{ name: 'PaymentOption', params: { paymentId: item.id } }"
                  >
                    View Details
                  </router-link>
                </el-dropdown-item>
                <el-dropdown-item>
                  <router-link
                    class="text-color"
                    :to="{ name: 'PaymentTransaction', params: { editPayment: item.id } }"
                  >
                    Edit
                  </router-link>
                </el-dropdown-item>
                <el-dropdown-item>
                  <div @click="showConfirmModal(item.id)" class="text-color">Delete</div>
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </template>
      </Table>
    </div>
  </div>
</template>

<script>
import { ref, computed } from "vue";
import moment from "moment";
import store from "../../store/store";
import axios from "@/gateway/backendapi";
import finish from "../../services/progressbar/progress";
import formatDate from "../../services/dates/dateformatter";
import Table from "@/components/table/Table";
import router from "../../router";
import { ElMessage, ElMessageBox } from "element-plus";
export default {
  props: ["paymentList"],
  components: { Table },
  setup(props, { emit }) {
    const filterFormIsVissible = ref(false);
    const searchIsVisible = ref(false);
    const banks = ref([]);
    const loading = ref(false);
    const getPaymentGateway = ref([]);

    let searchText = ref("");
    const searchPaymentList = computed(() => {
      if (searchText.value !== "" && props.paymentList.length > 0) {
        return props.paymentList.filter((i) => {
          return i.name.toLowerCase().includes(searchText.value.toLowerCase());
        });
      } else {
        return props.paymentList;
      }
    });

    const removeSearchText = () => {
      searchText = "";
    };

    const paymentListClick = (item) => {
      router.push(`/tenant/payments/${item}`);
    };

    const paymentHeaders = ref([
      { name: "NAME", value: "name" },
      { name: "BANK", value: "bank" },
      { name: "DATE", value: "date" },
      { name: "STATUS", value: "isActive" },
      { name: "ACTION", value: "action" },
    ]);
    const toggleFilterFormVissibility = () =>
      (filterFormIsVissible.value = !filterFormIsVissible.value);

    const toggleSearch = () => {
      searchIsVisible.value = !searchIsVisible.value;
    };

    const getBanks = () => {
      loading.value = true;
      axios
        .get("/api/Financials/GetBanks")
        .then((res) => {
          loading.value = false;
          banks.value = res.data;
          console.log(res.data);
          props.paymentList.forEach((i) => {
            if (banks.value.findIndex((j) => j.id === i.bankID) > 0) {
              return (i.bankName = banks.value.find((k) => k.id === i.bankID).name);
            }
          });

          //   getPaymentGatewa/tPaymentGateway.value)
        })
        .catch((err) => {
          loading.value = false;
          console.log(err);
        });
    };
    getBanks();
    const searchPaymentInDB = () => {
      if (searchText.value !== "" && props.paymentList.length > 0) {
        return props.paymentList.filter((i) => {
          if (i.name)
            return i.name.toLowerCase().includes(searchText.value.toLowerCase());
        });
      } else {
        return props.paymentList;
      }
    };

    const deleteOffering = (id) => {
      axios
        .delete(`/api/PaymentForm/Delete?paymentFormID=${id}`)
        .then((res) => {
          console.log(res);
          ElMessage({
            type: "success",
            message: "Payment form deleted",
            duration: 5000,
          });
          emit("delete-payment", id);
          // store.dispatch("payment/removePaymentFromStore", id);
        })
        .catch((err) => {
          finish();
          if (err.response.status === 400) {
            ElMessage({
              type: "error",
              message: "Unable to delete, Ensure this member is not in any group",
              duration: 5000,
            });
          } else {
            ElMessage({
              type: "error",
              message: "Unable to delete, An error occurred, please try again",
              duration: 5000,
            });
          }
        });
    };
    const showConfirmModal = (id) => {
      ElMessageBox.confirm("Are you sure you want to proceed?", "Confirm delete", {
        confirmButtonText: "OK",
        cancelButtonText: "Cancel",
        type: "error",
      })
        .then(() => {
          deleteOffering(id);
        })
        .catch(() => {
          ElMessage({
            type: "info",
            message: "Delete canceled",
            duration: 5000,
          });
        });
    };

    const date = (date) => {
      return formatDate.monthDayYear(date);
    };

    return {
      moment,
      searchPaymentList,
      showConfirmModal,
      searchText,
      searchPaymentInDB,
      paymentListClick,
      paymentHeaders,
      removeSearchText,
      deleteOffering,
      filterFormIsVissible,
      toggleFilterFormVissibility,
      toggleSearch,
      searchIsVisible,
      banks,
      loading,
      getPaymentGateway,
      date,
    };
  },
};
</script>

<style scoped>
.table-top {
  position: absolute;
  z-index: 1;
  top: -40px;
  font-weight: 500 !important;
  font-size: 14px;
  background: #fff;
  color: #000000;
}

.tab-options {
  position: relative;
}
.table-top label:hover,
.table-top p:hover {
  cursor: pointer;
}

.filter-options {
  height: 0;
  overflow: hidden;
  transition: all 0.5s ease-in-out;
}
.text-color {
  color: #212529;
  text-decoration: none !important;
}
.text-color:hover {
  color: #007bff;
}

.filter-options-shown {
  height: 120px !important;
  overflow: hidden;
  transition: all 0.5s ease-in-out;
}

@media screen and (max-width: 768px) {
  .filter-options-shown {
    height: 150px !important;
    overflow: hidden;
    transition: all 0.5s ease-in-out;
  }
}

header {
  background: #dde2e6 0% 0% no-repeat padding-box;
  font: normal normal bold 13px/13px Nunito Sans;
  letter-spacing: 0px;
  color: #002044;
}

.header tr {
  color: #8898aa;
  font-size: 11px;
  box-shadow: 0px 3px 6px #2c28281c;
  background: #dde2e6 0% 0% no-repeat padding-box;
}

.select-all input {
  margin: 0 8px 0 -5px !important;
}

.more-btn {
  background: #dde2e6;
}

.table-header {
  padding: 12px;
  color: black;
  box-shadow: none;
  font-size: 16px;
}

.table-body {
  padding: 12px;
  border-bottom: 1.5px solid #6d6d6d19;
}

.itemroute-color {
  color: #136acd;
}

.itemroute-color:hover {
  text-decoration: none;
}
@media screen and (max-width: 660px) {
  .filter {
    width: 50%;
  }
  /* .table-top {
    font-weight: 800;
    font-size: 12px;
    display: flex;
    flex-wrap: wrap;
  } */
}
</style>
