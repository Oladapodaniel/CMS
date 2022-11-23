<template>
  <div class="pb-4">
    <div class="row table">
      <div class="col-12 mt-4 w-100">
        <div class="row">
          <!-- {{donationSummary}} -->
          <div class="col-12 col-md-4">
            <div class="col-12 mb-5">
              <Dropdown
                v-model="selectedPeriod"
                :options="periods"
                optionLabel="name"
                placeholder="Select a period "
                class="w-100"
              />
            </div>
            <div class="col-12 w-100">
              <h2 class="font-weight-bold py-3 mb-3">
                {{ tenantCurrency ? tenantCurrency.currency : "" }}
                {{
                  chartData ? amountWithCommas(Math.round(chartData.income)) : 0
                }}
              </h2>
            </div>
          </div>
          <!-- {{ pieChart }} -->
          <div class="col-12 col-md-4">
            <DonationPieChart
              domId="chart"
              distance="5"
              :titleMargin="10"
              :summary="pieChart"
            />
          </div>
          <div class="col-12 col-md-4">
            <!-- <div v-if="attendanceBoolean"> -->
            <!-- :subtitle="chartData.name"
              :data="chartData && chartData.barChart ? chartData.barChart : {}"
              :series="series" -->
            <!-- :chartClass="chartClass" -->

            <!-- 2{{ chartData }} -->

            <DonationAreaChart
              elemId="chart"
              domId="areaChart3"
              title="So Far"
              lineColor="#002044"
              :subtitle="chartData.name"
              :series="
                chartData && chartData.barChart ? chartData.barChart.data : {}
              "
              :attendanceSeries="attendanceSeries"
              :xAxis="LineGraphXAxis"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="row table">
      <div class="col-12 px-0" id="table">
        <div class="top-con" id="ignore2">
          <div class="table-top">
            <div
              class="filter col-2"
              @click="
                printJS({
                  ignoreElements: ['ignore1', 'ignore2'],
                  maxWidth: 867,
                  header: 'DONATION TRANSACTIONS',
                  printable: printDonation,
                  properties: ['DATE', 'DONATION', 'AMOUNT', 'DONOR'],
                  type: 'json',
                  headerStyle:
                    'font-family: Nunito Sans, Calibri; text-align: center;',
                  gridHeaderStyle:
                    'border: 1.5px solid #6d6d6d19; font-family: Nunito Sans, calibri; padding: 7px; text-align: left;',
                  gridStyle:
                    'border: 1.5px solid #6d6d6d19; font-family: Nunito Sans, calibri; padding: 7px; font-weight: 300',
                })
              "
            >
              <p class="mt-2">
                <i class="pi pi-print"></i>
                PRINT
              </p>
            </div>
            <div class="filter col-2">
              <p @click="toggleFilterFormVissibility" class="mt-2">
                <i class="fas fa-filter"></i>
                FILTER
              </p>
            </div>
            <div class="col-2">
              <p @click="toggleSearch" class="search-text w-100 mt-2">
                <i class="pi pi-search"></i> SEARCH
              </p>
            </div>

            <div class="search d-flex ml-2">
              <label
                class="label-search d-flex"
                :class="{
                  'show-search': searchIsVisible,
                  'hide-search': !searchIsVisible,
                }"
              >
                <input
                  type="text"
                  placeholder="Search..."
                  v-model="searchText"
                  @input="searchDonationInDB"
                />
                <span class="empty-btn">x</span>
                <span class="search-btn">
                  <i class="pi pi-search"></i>
                </span>
              </label>
            </div>
          </div>
        </div>
        <div
          class="filter-options"
          :class="{ 'filter-options-shown': filterFormIsVissible }"
          id="ignore1"
        >
          <div class="container-fluid">
            <div class="row">
              <div class="col-md-9">
                <div class="row">
                  <div
                    class="
                      col-12 col-sm-6 col-md-6
                      offset-sm-3 offset-md-0
                      form-group
                      inp
                      w-100
                    "
                  >
                    <!-- <div class="input-field"> -->

                    <input
                      type="text"
                      class="input w-100"
                      placeholder="Donation"
                      v-model="filter.contribution"
                    />
                  </div>

                  <div class="col-12 col-md-6 form-group d-none d-md-block">
                    <input
                      type="text"
                      class="input w-100"
                      placeholder="donor"
                      v-model="filter.donor"
                    />
                  </div>
                </div>
              </div>

              <div class="col-md-3 d-flex flex-column align-items-center">
                <button class="apply-btn text-white" @click="applyFilter">
                  Apply
                </button>
                <span class="mt-2">
                  <a class="clear-link mr-2" @click="clearAll">Clear all</a>
                  <span class="mx-2"
                    ><i class="fas fa-circle" style="font-size: 4px"></i></span
                  ><a class="hide-link ml-2" @click="hide">Hide</a>
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- contribution -->
        <div v-if="searchDonation.length > 0">
          <div class="container-fluid d-none d-md-block">
            <div class="row t-header">
              <div class="col-md-1 px-3"></div>
              <div class="small-text text-capitalize col-md-2 font-weight-bold">
                Date
              </div>
              <div class="small-text text-capitalize col-md-3 font-weight-bold">
                Donation
              </div>
              <div class="small-text text-capitalize col-md-3 font-weight-bold">
                Amount
              </div>
              <div class="small-text text-capitalize col-md-2 font-weight-bold">
                Donor
              </div>
              <div class="small-text text-capitalize col-md-1 font-weight-bold">
                Action
              </div>
              <!-- </div> -->
            </div>
          </div>
          <loadingComponent :loading="loading" />
          <div v-if="!loading">
            <div class="row" style="margin: 0">
              <div
                class="
                  col-12
                  parent-desc
                  py-2
                  px-0
                  c-pointer
                  tr-border-bottom
                  hover
                "
                v-for="(item, index) in searchDonation"
                :key="item.id"
              >
                <div class="row w-100" style="margin: 0">
                  <div
                    class="col-md-1 d-flex d-md-block px-3 justify-content-end"
                  >
                    <input
                      type="checkbox"
                      v-model="item.check"
                      class="form-check"
                    />
                  </div>

                  <div class="desc small-text col-md-2 px-1">
                    <p class="mb-0 d-flex justify-content-between">
                      <span class="text-dark font-weight-bold d-flex d-md-none"
                        >Date</span
                      >
                      <span>{{ date(item.date) }}</span>
                    </p>
                  </div>

                  <div class="col-md-3 small-text px-1">
                    <div class="d-flex justify-content-between">
                      <span class="text-dark font-weight-bold d-flex d-md-none"
                        >Donation</span
                      >
                      <div>
                        <div class="desc small-text text-right text-md-left">
                          {{ item.contribution }}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="desc-head small-text col-md-3 px-1">
                    <p class="mb-0 d-flex justify-content-between">
                      <span class="text-dark font-weight-bold d-flex d-md-none"
                        >Amount</span
                      >
                      <span>{{ item.currencyName }} {{ item.amount }}</span>
                    </p>
                  </div>

                  <div class="small-text col-md-2 px-1">
                    <p class="mb-0 d-flex justify-content-between">
                      <span class="text-dark font-weight-bold d-flex d-md-none"
                        >Donor</span
                      >
                      <span
                        ><span class="primary-text c-pointer">{{
                          item.donor
                        }}</span></span
                      >
                    </p>
                  </div>

                  <div class="small-text col-md-1 px-1">
                    <div class="data d-flex justify-content-between">
                      <div>
                        <p class="mb-0">
                          <span
                            class="text-dark font-weight-bold d-flex d-md-none"
                            >Action</span
                          >
                        </p>
                      </div>
                      <div class="dropdown">
                        <i
                          class="fas fa-ellipsis-v cursor-pointer"
                          id="dropdownMenuButton"
                          data-toggle="dropdown"
                          aria-haspopup="true"
                          aria-expanded="false"
                        ></i>
                        <div
                          class="dropdown-menu"
                          aria-labelledby="dropdownMenuButton"
                        >
                          <a
                            class="dropdown-item elipsis-items cursor-pointer"
                            @click="showConfirmModal(item.id, index)"
                            >Delete</a
                          >
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- </router-link> -->
              </div>
            </div>
          </div>
        </div>

   <div  class="col-md-12 col py-3"
          v-if="listOfDonationItems.length === 0 && props.donationTransactions.length !== 0 && !loading">
          <p class="text-danger d-flex justify-content-center">
            Record not available in database
          </p>
    </div>

    <!-- <div class="text-danger d-flex justify-content-center" v-else>No records found</div> -->

        <div class="col-12">
          <div class="table-footer">
            <Pagination
              @getcontent="getPeopleByPage"
              :itemsCount="50"
              :currentPage="currentPage"
              :totalItems="totalItem"
            />
          </div>
        </div>

        <ConfirmDialog />
        <Toast />
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from "vue";
import axios from "@/gateway/backendapi";
import Pagination from "../../../../components/pagination/PaginationButtons";
import { useRoute } from "vue-router";
import moment from "moment";
import { useConfirm } from "primevue/useconfirm";
import { useToast } from "primevue/usetoast";
import finish from "../../../../services/progressbar/progress";
import monthDayYear from "../../../../services/dates/dateformatter";
import printJS from "print-js";
import Dropdown from "primevue/dropdown";
import DonationPieChart from "../../../../components/charts/PieChart.vue";
import DonationAreaChart from "../../../../components/charts/AreaChart.vue";
import numbers_formatter from "../../../../services/numbers/numbers_formatter";
import store from "../../../../store/store";
import loadingComponent from "@/components/loading/LoadingComponent"
export default {
  props: ["donationTransactions", "totalItem"],
  components: {
    Pagination,
    DonationAreaChart,
    DonationPieChart,
    Dropdown,
    loadingComponent
  },
  setup(props, { emit }) {
    const filter = ref({});
    const searchIsVisible = ref(false);
    const filterResult = ref([]);
    const noRecords = ref(false);
    const searchText = ref("");
    const tenantCurrency = ref({});
    const Allsummary = ref([
      { name: "Not Sure", y: 20 },
      { name: "Male", y: 16 },
      { name: "Female", y: 3 },
    ]);
    const chartClass = ref(true);
    const periods = ref([
      { name: "One Week" },
      { name: "This Week" },
      { name: "Last Week" },
      { name: "This Month" },
      { name: "Last Month" },
      { name: "Last 30days" },
      { name: "Last 90days" },
      { name: "One Year" },
    ]);
    const selectedPeriod = ref({ name: "This Week" });
    const donationSummary = ref({});
    const series = ref([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    const attendanceSeries = ref("");
    const route = useRoute();
    const filterFormIsVissible = ref(false);
    const toggleFilterFormVissibility = () =>
      (filterFormIsVissible.value = !filterFormIsVissible.value);
    const toggleSearch = () => {
      searchIsVisible.value = !searchIsVisible.value;
    };
    const getRoute = () => {
      console.log(route.fullPath);
      if (route.fullPath === "/tenant/onlinedonate") {
        chartClass.value = true;
      }
    };
    getRoute();

    const printDonation = computed(() => {
      if (props.donationTransactions.length === 0) return [];
      return props.donationTransactions.map((i) => {
        return {
          DATE: monthDayYear.monthDayYear(i.eventDate),
          EVENT: i.eventName,
          DONATION: i.contribution,
          AMOUNT: i.amount,
          DONOR: i.donor ? i.donor : "",
        };
      });
    });
    const deleteOffering = (id, index) => {
      axios
        .delete(`/api/Financials/Contributions/Transactions/Delete?ID=${id}`)
        .then((res) => {
          console.log(res);
          if (res.data.status) {
            toast.add({
              severity: "success",
              summary: "Delete Successful",
              detail: `Donation Transaction Deleted`,
              life: 3000,
            });
            emit("contri-transac", index);
          } else {
            toast.add({
              severity: "warn",
              summary: "Delete Failed",
              detail: `Please Try Again`,
              life: 3000,
            });
          }
        })
        .catch((err) => {
          finish();
          if (err.response) {
            console.log(err.response);
            toast.add({
              severity: "error",
              summary: "Unable to delete",
              detail: `${err.response}`,
              life: 3000,
            });
          }
        });
    };
    const confirm = useConfirm();
    let toast = useToast();
    const showConfirmModal = (id, index) => {
      confirm.require({
        message: "Are you sure you want to proceed?",
        header: "Confirmation",
        icon: "pi pi-exclamation-triangle",
        acceptClass: "confirm-delete",
        rejectClass: "cancel-delete",
        accept: () => {
          deleteOffering(id, index);
        },
        reject: () => {
          toast.add({
            severity: "info",
            summary: "Rejected",
            detail: "You have rejected",
            life: 3000,
          });
        },
      });
    };
    const currentPage = ref(0);
    const getPeopleByPage = async (page) => {
      console.log(page);
      try {
        const { data } = await axios.get(
          `/api/Financials/Donation/Transactions?page=${page}`
        );
        if (data) {
          console.log(data);
          emit("get-pages", data);
          currentPage.value = page;
        }
      } catch (error) {
        console.log(error);
      }
    };

    const getCurrentlySignedInUser = async () => {
      try {
        const res = await axios.get("/api/Membership/GetCurrentSignedInUser");
        axios
          .get(`/api/Lookup/TenantCurrency?tenantID=${res.data.tenantId}`)
          .then((res) => {
            tenantCurrency.value = res.data;
            console.log(res.data);
          })
          .catch((err) => console.log(err));
      } catch (err) {
        console.log(err);
      }
    };

    const getTenantCurrency = () => {
      if (
        store.getters.currentUser &&
        Object.keys(store.getters.currentUser).length > 0
      ) {
        tenantCurrency.value = store.getters.currentUser;
      } else {
        getCurrentlySignedInUser();
      }
    };
    getTenantCurrency();
    const donationCount = computed(() => {
      if (
        !props.donationTransactions ||
        props.donationTransactions.length === 0
      )
        return 0;
      return props.donationTransactions.length;
    });

    const date = (offDate) => {
      return monthDayYear.monthDayYear(offDate);
    };

    const applyFilter = () => {
      filter.value.contribution =
        filter.value.contribution == undefined ? "" : filter.value.contribution;
      filter.value.event =
        filter.value.event == undefined ? "" : filter.value.event;
      filter.value.donor =
        filter.value.donor == undefined ? "" : filter.value.donor;
      let url =
        "/api/Financials/Contributions/FilteredTransactions?contribution=" +
        filter.value.contribution +
        "&eventname=" +
        filter.value.event +
        "&donor=" +
        filter.value.donor;

      axios
        .get(url)
        .then((res) => {
          // noRecords.value = true;
          filterResult.value = res.data;
          console.log(res.data);
          if (res.data.length === 0) {
            noRecords.value = true;
          } else {
            noRecords.value = false;
          }
        })
        .catch((err) => console.log(err));
    };

    // Tosin
    const loading = ref(false);
    const searchDonationsInDB = ref([]);
    const searchDonationInDB = (event) => {
      loading.value = true;
      let url =
        "/api/Financials/Contributions/FilteredTransactions?contribution=" +
        event.target.value;

      axios
        .get(url)
        .then((res) => {
          loading.value = false;
          console.log(res);
          searchDonationsInDB.value = res.data;
          console.log(searchDonationsInDB.value, "🎉🎉");
        })
        .catch((err) => {
          console.log(err);
          loading.value = false;
        });
    };

    const listOfDonationItems = computed(() => {
      if (searchText.value !== "") return searchDonationsInDB.value;
      return props.donationTransactions;
    });

    const clearAll = () => {
      filter.value.contribution = "";
      filter.value.donor = "";
    };

    const hide = () => {
      filterFormIsVissible.value = false;
    };
    // Tosin

    const searchDonation = computed(() => {
      if (searchText.value !== "" && searchDonationsInDB.value.length > 0) {
        return searchDonationsInDB.value;
        // return props.donationTransactions.filter((i) => {
        //   return i.contribution
        //     .toLowerCase()
        //     .includes(searchText.value.toLowerCase());
        // });
      } else if (
        filterResult.value.length > 0 &&
        (filter.value.contribution || filter.value.event || filter.value.donor)
      ) {
        return filterResult.value;
      } else {
        return props.donationTransactions;
      }
    });

    const getdonationSummary = async () => {
      try {
        let { data } = await axios.get(
          "/api/financials/donation/transactions/summary"
        );
        console.log(data);
        donationSummary.value = data;
      } catch (err) {
        console.log(err);
      }
    };
    getdonationSummary();
    const chartData = computed(() => {
      if (
        donationSummary.value &&
        donationSummary.value.oneWeek &&
        selectedPeriod.value.name === "One Week"
      )
        return donationSummary.value.oneWeek;
      if (
        donationSummary.value &&
        donationSummary.value.thisWeek &&
        selectedPeriod.value.name === "This Week"
      )
        return donationSummary.value.thisWeek;
      if (
        donationSummary.value &&
        donationSummary.value.lastThirtyDays &&
        selectedPeriod.value.name === "Last 30days"
      )
        return donationSummary.value.lastThirtyDays;
      if (
        donationSummary.value &&
        donationSummary.value.lastNinetyDays &&
        selectedPeriod.value.name === "Last 90days"
      )
        return donationSummary.value.lastNinetyDays;
      if (
        donationSummary.value &&
        donationSummary.value.thisMonth &&
        selectedPeriod.value.name === "This Month"
      )
        return donationSummary.value.thisMonth;
      if (
        donationSummary.value &&
        donationSummary.value.lastWeek &&
        selectedPeriod.value.name === "Last Week"
      )
        return donationSummary.value.lastWeek;
      if (
        donationSummary.value &&
        donationSummary.value.lastMonth &&
        selectedPeriod.value.name === "Last Month"
      )
        return donationSummary.value.lastMonth;
      if (
        donationSummary.value &&
        donationSummary.value.oneYear &&
        selectedPeriod.value.name === "One Year"
      )
        return donationSummary.value.oneYear;
      return [];
    });
    const pieChart = computed(() => {
      if (
        donationSummary.value &&
        donationSummary.value.oneWeek &&
        donationSummary.value.oneWeek.pieChart.length > 0 &&
        selectedPeriod.value.name === "One Week"
      )
        return donationSummary.value.oneWeek.pieChart;
      if (
        donationSummary.value &&
        donationSummary.value.thisWeek &&
        donationSummary.value.thisWeek.pieChart.length > 0 &&
        selectedPeriod.value.name === "This Week"
      )
        return donationSummary.value.thisWeek.pieChart;
      if (
        donationSummary.value &&
        donationSummary.value.lastThirtyDays &&
        donationSummary.value.lastThirtyDays.pieChart.length > 0 &&
        selectedPeriod.value.name === "Last 30days"
      )
        return donationSummary.value.lastThirtyDays.pieChart;
      if (
        donationSummary.value &&
        donationSummary.value.lastNinetyDays &&
        donationSummary.value.lastNinetyDays.pieChart.length > 0 &&
        selectedPeriod.value.name === "Last 90days"
      )
        return donationSummary.value.lastNinetyDays.pieChart;
      if (
        donationSummary.value &&
        donationSummary.value.thisMonth &&
        donationSummary.value.thisMonth.pieChart.length > 0 &&
        selectedPeriod.value.name === "This Month"
      )
        return donationSummary.value.thisMonth.pieChart;
      if (
        donationSummary.value &&
        donationSummary.value.lastWeek &&
        donationSummary.value.lastWeek.pieChart.length > 0 &&
        selectedPeriod.value.name === "Last Week"
      )
        return donationSummary.value.lastWeek.pieChart;
      if (
        donationSummary.value &&
        donationSummary.value.lastMonth &&
        donationSummary.value.lastMonth.pieChart.length > 0 &&
        selectedPeriod.value.name === "Last Month"
      )
        return donationSummary.value.lastMonth.pieChart;
      if (
        donationSummary.value &&
        donationSummary.value.oneYear &&
        donationSummary.value.oneYear.pieChart.length > 0 &&
        selectedPeriod.value.name === "One Year"
      )
        return donationSummary.value.oneYear.pieChart;
      return [];
    });
    const LineGraphXAxis = computed(() => {
      if (
        selectedPeriod.value.name === "This Week" ||
        selectedPeriod.value.name === "One Week" ||
        selectedPeriod.value.name === "Last Week" ||
        selectedPeriod.value.name === "This Month" ||
        selectedPeriod.value.name === "Last Month" ||
        selectedPeriod.value.name === "Last 30days" ||
        selectedPeriod.value.name === "Last 90days" ||
        selectedPeriod.value.name === "One Year"
      )
        return [1, 2, 3, 4, 5, 6, 7];
        return [];
    });

    const amountWithCommas = (amount) =>
      numbers_formatter.amountWithCommas(amount);

    return {
      deleteOffering,
      filterFormIsVissible,
      toggleFilterFormVissibility,
      moment,
      applyFilter,
      filter,
      toggleSearch,
      searchIsVisible,
      filterResult,
      noRecords,
      searchText,
      searchDonation,
      showConfirmModal,
      donationCount,
      currentPage,
      getPeopleByPage,
      date,
      printJS,
      printDonation,
      Allsummary,
      chartData,
      chartClass,
      periods,
      selectedPeriod,
      donationSummary,
      series,
      attendanceSeries,
      pieChart,
      LineGraphXAxis,
      amountWithCommas,
      tenantCurrency,
      searchDonationsInDB,
      searchDonationInDB,
      loading,
      listOfDonationItems,
      hide,
      clearAll,
    };
  },
};
</script>

<style scoped>
* {
  box-sizing: border-box;
  color: #02172e;
}
.myselectContr {
  height: 2.5rem;
}
.data-value a {
  color: #136acd;
  text-decoration: none;
  width: 241px;
}
.page-header {
  font-weight: 700;
  font-size: 1.7rem;
}
.summary {
  /* width: 20%; */
  border-radius: 30px;
  /* box-shadow: 0px 3px 6px #2c28281c; */
  padding: 24px 10px;
  background: #fff;
  box-shadow: 0px 3px 6px #2c28281c;
  border: 1px solid #00204424;
}
.table {
  width: 100% !important;
  box-shadow: 0px 1px 4px #02172e45;
  border: 1px solid #dde2e6;
  border-radius: 30px;
  text-align: left;
  margin-bottom: auto !important;
}
.boards {
  display: flex;
}
.board-top {
  display: flex;
  justify-content: space-between;
  margin-bottom: 40px;
  align-items: center;
  box-shadow: 0px 3px 6px #2c28281c;
  padding: 4px;
}
.total {
  margin-bottom: 40px;
  font-size: 37px;
}
.total-text {
  font-size: 15px;
  font-weight: 700;
}
.percent {
  color: #136acd;
}
.hr {
  border: 1px solid #0020440a;
  margin: 0 4px 10px 0;
}
.tbl-footer-btn {
  background: transparent;
  padding: 4px;
  margin: 4px 8px;
  border-radius: 50%;
  width: 29px;
  border: none;
  border: 1px solid #8898aa80;
  outline: transparent;
}
.action-icon {
  text-align: center;
}
.list-body {
  padding: 0 21px;
}
.data-value {
  display: flex;
  padding-left: 6px;
}
.theader {
  padding-left: 2px;
  text-align: left;
}
.filter-options {
  height: 0;
  overflow: hidden;
  transition: all 0.5s ease-in-out;
}
.filter-options-shown {
  height: 80px !important;
  overflow: hidden;
  transition: all 0.5s ease-in-out;
}
.clear-link,
.hide-link {
  color: #136acd;
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
@media (max-width: 660px) {
  .select-all {
    display: none;
  }
}
.header {
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
.currency {
  background: #fafafa 0% 0% no-repeat padding-box;
  /* border: 1px solid #C5D9F2; */
  border-radius: 5px;
  letter-spacing: 0px;
  color: #1c252c;
  padding: 4px;
  font-weight: bold;
}
.offering-amount {
  border: 1px solid #00204424;
  padding: 5px;
  border-radius: 5px;
}
.head-button {
  display: flex;
  justify-content: flex-end;
}
.add-btn {
  width: 180px;
  background: #136acd;
  border-radius: 22px;
  color: #ffffff;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 42px;
  text-decoration: none;
}
.more {
  background: #dde2e6;
  border-radius: 22px;
  width: 180px;
  font-weight: bold;
  border: transparent;
  outline: transparent;
  height: 42px;
  margin-right: 1rem;
}
.fa-ellipsis-v:hover {
  cursor: pointer;
}
#chart {
  width: 48%;
  max-height: 310px;
  border-radius: 10px;
}
.board.members-count {
  padding: 24px;
}
.no-record {
  color: rgba(184, 5, 5, 0.726);
  font-size: 1.1em;
}
.chart1,
.chart2 {
  border-radius: 10px;
}
.itemroute-color {
  color: #136acd;
}
@media (max-width: 767px) {
  .first-timers-text {
    text-align: center;
  }
  .head-button {
    display: flex;
    justify-content: center;
  }
}
@media screen and (max-width: 500px) {
  .board {
    width: 100% !important;
  }
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
@media (max-width: 577px) {
  .head-button {
    flex-direction: column;
    align-items: center;
  }
  .more {
    margin-right: 0;
  }
  .add-btn {
    margin-top: 10px;
  }
}
@media (max-width: 575px) {
  .head-button {
    display: flex;
    /* flex-direction: row; */
    /* align-items: center; */
    justify-content: center;
  }
  /* .add-btn,
  .more {
    margin-top: 10px;
  } */
}
@media screen and (min-width: 501px) and (max-width: 768px) {
  /* .boards {
    flex-direction: column;
    align-items: center !important;
    flex-wrap: nowrap !important;
  }
  .chart-con {
    width: 85% !important;
  }
  .chart-con div {
    width: 40%;
  } */
  .board {
    width: 50% !important;
    margin-bottom: 10px;
  }
  .summary-header {
    width: 50%;
    margin-left: 25%;
  }
}
@media screen and (max-width: 768px) {
  .filter-options-shown {
    height: 150px !important;
    overflow: hidden;
    transition: all 0.5s ease-in-out;
  }
  .boards {
    flex-wrap: nowrap;
  }
  .responsive-table {
    max-width: 100%;
    overflow-x: scroll;
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
.row-divider {
  border: 1px solid #0020440a;
  margin: 0;
}
.table-footer {
  display: flex;
  justify-content: flex-end;
  background: #fff;
  padding: 10px 0;
  border-radius: 0px 0px 22px 22px;
}
.board.members-count {
  max-height: 216px;
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
.itemroute-color {
  color: #136acd;
}
.itemroute-color:hover {
  text-decoration: none;
}
.t-header div {
  background: #dde2e6 0% 0% no-repeat padding-box;
  font-size: 16px;
  padding: 0.5rem 0;
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
  /* opacity: 0.7; */
}

.hover:hover {
  background: #eee;
}
</style>