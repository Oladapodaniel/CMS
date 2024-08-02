<template>
  <div class="container-fluid">
    <div class="d-flex flex-wrap flex-column flex-sm-row mb-3 justify-content-between">
      <div class="">
        <div class="h2 font-weight-600">
          {{ formDetails.form && formDetails.form.name ? formDetails.form.name : "" }}
        </div>
      </div>
      <div
        class="d-flex flex-wrap px-0 mt-3 button-text justify-content-center align-items-center mt-2"
      >
        <el-button class="d-flex" color="#BDF3FF" @click="copylink" size="large" round>
          <span class="mr-2">Copy link</span>
          <img src="../../assets/form/copyIcon.png" style="width: 25px" alt="" />
        </el-button>
        <router-link
          class="text-decoration-none"
          target="_blank"
          :to="`/forms/${formPreID}`"
        >
          <el-button class="d-flex mt-sm-0 mt-3" size="large" round>
            <el-icon>
              <View />
            </el-icon>
            <span>Preview Form</span>
          </el-button>
        </router-link>
      </div>

      <!-- <div class="d-flex flex-column flex-sm-row   link">
                <router-link class="" to="/tenant/pledge/makepledge">
                    <el-button :color="primarycolor" class="header-btn w-100 mt-3 mt-sm-0" round>
                        Manage Form
                    </el-button></router-link>
            </div> -->
    </div>
    <div class="row">
      <div class="col-md-12">
        <div class="border d-flex justify-content-center col-md-1 col-sm-2 col-4 rounded">
          <img
            @click="getQrCode"
            class="cursor-pointer my-2"
            style="width: 40px; height: 2.7rem"
            src="../../assets/form/QrCodeImage.png"
            alt=""
          />
        </div>
      </div>
    </div>
    <!-- <div class="row">
            <div class="col-md-12 mt-1 px-0">
                <div class="text-primary c-pointer col-md-2" @click="previousPage">
                    <el-icon>
                        <DArrowLeft />
                    </el-icon> Back
                </div>
            </div>
        </div> -->
    <!-- <div class="d-flex flex-wrap flex-column flex-sm-row row"
            v-if="route.fullPath == `/tenant/singleformlist?id=${route.query.id}&formName=${route.query.formName}`">
        </div> -->
    <div class="row mt-4">
      <div class="col-md-12">
        {{
          sortedData.length > 1
            ? sortedData.length + " " + "responses"
            : sortedData.length + " " + "response"
        }}
      </div>
      <div class="col-md-12 d-flex flex-column flex-sm-row mt-1">
        <div
          class="col-md-2 rounded cursor-pointer border py-2 tab-color text-center"
          :class="{ showedColor: showIndividual }"
          @click="individual"
        >
          Grid
        </div>
        <div
          class="col-md-2 rounded cursor-pointer border py-2 tab-color text-center"
          :class="{ showedColor: showList }"
          @click="formList"
        >
          list
        </div>
        <div
          class="col-md-2 cursor-pointer rounded border py-2 tab-color text-center"
          :class="{ showedColor: showSummary }"
          @click="summary"
        >
          Analytics
        </div>
      </div>
    </div>
    <div class="row" v-if="showIndividual">
      <div class="col-md-6 mt-4">
        <div class="d-flex col-md-6 px-0 mt-4">
          <el-input
            size="small"
            v-model="searchText"
            :suffix-icon="Search"
            placeholder="Search"
            class="search-input w-100"
          />
        </div>
      </div>
      <div class="col-md-6 mt-4">
        <el-dropdown
          trigger="click"
          class="el-dropdown border-0 w-100 py-2 mt-4 d-flex justify-content-end"
        >
          <span class="el-dropdown-link">
            <el-tooltip
              class="box-item"
              effect="dark"
              content="Export data on table to excel"
              placement="top-start"
            >
              <el-button
                type=""
                style="background: #eeeeee"
                class="mr-3 py-3 text-dak fw-excel"
              >
                Export to excel<el-icon class="el-icon--right">
                  <Download />
                </el-icon>
              </el-button>
            </el-tooltip>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item v-for="(bookType, index) in bookTypeList" :key="index">
                <div @click="downloadFile(bookType)">
                  {{ bookType.name }}
                </div>
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
    <div
      class="col-md-12 p-0 scroll-table"
      v-if="showIndividual && searchForm.length > 0"
    >
      <table class="table table-hover table" id="table">
        <thead>
          <tr class="table-row-bg">
            <th>Date</th>
            <th v-if="searchForm[0].isPaymentForm">Amount</th>
            <th v-for="(label, index) in labels" :key="index">
              {{ label }}
            </th>
            <th>Proceed</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in searchForm" :key="index">
            <td>{{ date(item.date) }}</td>
            <td v-if="item.isPaymentForm">{{ item.amount }}</td>
            <td v-for="(value, label) in item.data" :key="label">
              <span>{{ value.data ? value.data : '' }} </span>
            </td>
            <td>
              <div class="c-pointer">
                <div
                  class="spinner-border text-primary"
                  style="font-size: 10px; width: 26px; height: 26px"
                  role="status"
                  v-show="item.approvingServiceReport"
                >
                  <span class="sr-only">Loading...</span>
                </div>
                <div
                  v-if="!item.isProceed && !item.approvingServiceReport"
                  @click="formProcceed(item, 1)"
                >
                  <el-icon size="27">
                    <CircleCheck />
                  </el-icon>
                </div>
                <video
                  height="30"
                  autoplay
                  @click="formProcceed(item, 2)"
                  class="approveservicereport"
                  v-if="item.isProceed && !item.approvingServiceReport"
                >
                  <source src="../../assets/check_animated.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
              <!-- <div class="c-pointer">
                <div v-if="!item.isProceed">
                  <el-icon size="27">
                    <CircleCheck />
                  </el-icon>
                </div>
                <video
                  height="30"
                  autoplay
                  class="approveservicereport"
                  v-if="item.isProceed"
                >
                  <source src="../../assets/check_animated.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div> -->
            </td>

            <!-- <td v-for="(value, label) in item" :key="label">
              {{ value }}
            </td> -->

            <td class="text-danger">
              <el-dropdown trigger="click">
                <el-icon>
                  <MoreFilled />
                </el-icon>
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item>
                      <div
                        class="text-decoration-none text-color"
                        @click="showConfirmModal(item.id, index)"
                      >
                        Delete
                      </div>
                    </el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="col-md-12 mt-5 p-0" v-if="showSummary">
      <div class="row">
        <div
          class="col-md-6"
          v-for="(item, index) in formDetails.piechartSeries"
          :key="index"
        >
          <div class="font-weight-600">{{ item.name }}</div>
          <pieChart :domId="item.name" :summary="item.pieChartData" />
        </div>
      </div>
    </div>
    <!-- <div class="col-md-12 p-0 scroll-table" v-if="showList">
            <table class="table table-hover table w-100" id="table" v-for="(item, index) in formItems" :key="index">
                <thead>
                    <tr class=" table-row-bg ">
                        <th v-for="(label, index) in item.data" :key="index">
                            {{ label.customAttribute.label }}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td v-for="(item, index) in item.data" :key="index">
                            {{ item.data }}
                        </td>
                    </tr>
                </tbody>

            </table>

        </div> -->
    <!-- <div class="row mt-4" v-if="showList">
            <div class="col-md-12  scroll-table" v-for="(item, index) in formItems" :key="index">
                <div class="row mt-4">
                    <hr class="col-md-12  ">
                </div>
                <table class="table mt-4 table-hover table w-100" id="table" v-for="(itm, index) in item.data" :key="index">
                    <thead>
                        <tr class=" table-row-bg ">
                            <th>
                                {{ itm.customAttribute.label }}
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                {{ itm.data }}
                            </td>
                        </tr>
                    </tbody>

                </table>


            </div>
        </div> -->

    <div class="row justify-content-center mt-4 pb-5" v-if="showList">
      <div class="col-md-12">
        <div
          class="rounded col-md-11 border mt-4 shadow-sm py-3"
          v-for="(item, index) in formItems"
          :key="index"
        >
          <div
            v-for="(itm, indx) in item.data"
            :key="indx"
            class="row justify-content-center border-remove"
            id="table"
          >
            <div class="col-md-11 py-3">
              <div class="row text-capitalize ju">
                <div class="col-md-5 primary-text">{{ itm.customAttribute.label }}</div>
                <div class="col-md-5 font-weight">{{ itm.data }}</div>
                <!-- <div class="col-md-3 font-weight  ">{{ date(itm.dataCreated) }}</div> -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div
      class="row justify-content-center mt-5"
      v-if="!loading && formItems && formItems.length === 0"
    >
      <div
        class="col-md-6 text-center d-flex flex-column justify-content-center align-items-center empty-img"
      >
        <p><img src="../../assets/people/people-empty.svg" alt="" /></p>
        <p class="tip">
          No entries have been submitted for the form yet. Please click 'Copy Link' button
          and share it to make an entry.
        </p>
        <el-button class="d-flex" color="#BDF3FF" @click="copylink" size="large" round>
          <span class="mr-2">Copy link</span>
          <img src="../../assets/form/copyIcon.png" style="width: 25px" alt="" />
        </el-button>
      </div>
      <!-- <div class="col-md-6 text-center  mt-5" style="font-size: 23px ">
                No entries have been submitted for the form yet. Please click on the 'Copy Link' button above and share it
                to make an entry.
            </div> -->
    </div>
  </div>
  <div class="container-fluid">
    <el-dialog
      v-model="QRCodeDialog"
      title=""
      :width="mdAndUp || lgAndUp || xlAndUp ? `30%` : xsOnly ? `90%` : `70%`"
      class="QRCodeDialog"
      align-center
    >
      <div class="d-flex align-items-center flex-column">
        <h4 class="text-capitalize font-weight">Form QR Code For Registration</h4>
      </div>
      <div class="d-flex justify-content-center">
        <div class="img-wrapper">
          <img v-if="qrCode" :src="qrCode" class="image-wrapper w-100" />
        </div>
      </div>
    </el-dialog>
    <el-skeleton
      class="w-100"
      animated
      v-if="loading && formItems && formItems.length === 0"
    >
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
  </div>
</template>

<script>
import { ref, computed, onMounted, watch, inject, watchEffect } from "vue";
import pieChart from "@/components/charts/FormPieChart.vue";
import monthDayTime from "../../services/dates/dateformatter";
import monthDayYear from "../../services/dates/dateformatter";
import finish from "../../services/progressbar/progress";
import axios from "@/gateway/backendapi";
import { ElMessage, ElMessageBox } from "element-plus";
import exportService from "../../services/exportFile/exportservice";
import router from "../../router";
import deviceBreakpoint from "../../mixins/deviceBreakpoint";
import { useRoute } from "vue-router";
import formsService from "../../services/forms/formservice";
import { Search } from "@element-plus/icons-vue";
export default {
  components: {
    pieChart,
  },
  setup() {
    const loading = ref(false);
    const showIndividual = ref(true);
    const showSummary = ref(false);
    const showList = ref(false);
    const QRCodeDialog = ref(false);
    const searchingForm = ref(true);
    const fileHeaderToExport = ref([]);
    const fileToExport = ref([]);
    const searchText = ref("");
    const qrCode = ref("");
    const primarycolor = inject("primarycolor");
    const route = useRoute();
    const formlink = ref(`${window.location.origin}/forms/${route.params.id}`);
    const formPreID = ref(route.params.id);
    const { mdAndUp, lgAndUp, xlAndUp, xsOnly } = deviceBreakpoint();

    const formHeaders = ref([
      { name: "NAME", value: "name" },
      { name: "Age", value: "age" },
      { name: "INCOME RANGE", value: "incomerange" },
      { name: "ACTION", value: "action" },
    ]);
    const bookTypeList = ref([
      { name: "Excel (.xlsx)", value: "xlsx" },
      { name: "Comma Seperated Value (.csv)", value: "csv" },
      { name: "Text (.txt)", value: "txt" },
      // { name: "pdf" },
    ]);
    const formItems = ref([]);
    const sortedData = ref([]);
    const formDetails = ref({});
    const labels = ref([]);

    const getFormData = async () => {
      loading.value = true;
      try {
        const { data } = await axios.get(`/api/Forms/getformdata?Id=${route.params.id}`);
        formItems.value = data.form.submittedData;
        formDetails.value = data;

        labels.value =
          formItems.value && formItems.value[formItems.value.length - 1]
            ? formItems.value[formItems.value.length - 1].data.map(
                (dataItem) => dataItem.customAttribute.label
              )
            : "";
        loading.value = false;
        console.log(formDetails.value, "form");
      } catch (error) {
        console.log(error);
        loading.value = false;
      }
    };
    getFormData();

    watchEffect(() => {
      if (formItems.value && formItems.value.length > 0) {
        // foo_data.value = props.data;
        // dataInView.value = getData(foo_data.value, 10).filter((i) => i !== null);

        setTimeout(() => {
          fileHeaderToExport.value = labels.value.map((i) => i);
          fileToExport.value = formItems.value.map((obj) => {
            // if it has date property, formate the date value
            obj.date ? monthDayYear.monthDayTime(obj.date) : null;
            let newObj = {};
            obj.data.forEach((prop, index) => {
              newObj[index] = prop.data;
            });
            return newObj;
          });
        }, 1000);
      }
    });

    const downloadFile = (item) => {
      exportService.downLoadExcel(
        item.value,
        null,
        "Table_Data",
        fileHeaderToExport.value,
        fileToExport.value
      );
    };

    // const lastLabel = computed(() => {
    //   return labels.value.length > 0 ? labels.value[labels.value.length - 1] : "";
    // });

    const showConfirmModal = (id, index) => {
      ElMessageBox.confirm(
        "Are you sure you want to proceed? This operation can't be reversed ",
        "Confirm delete",
        {
          confirmButtonText: "OK",
          cancelButtonText: "Cancel",
          type: "error",
        }
      )
        .then(() => {
          deleteFormData(id, index);
        })
        .catch(() => {
          ElMessage({
            type: "info",
            message: "Delete discarded",
          });
        });
    };

    const deleteFormData = (id) => {
      axios
        .delete(`/api/Forms/deleteformData?id=${id}`)
        .then((res) => {
          console.log(res);

          ElMessage({
            type: "success",
            message: "Form Data Deleted Successfully",
            duration: 3000,
          });
          formItems.value = formItems.value.filter((i) => i.id !== id);
          sortedData.value = sortedData.value.filter((i) => i.id !== id);
        })
        .catch((err) => {
          console.log(err);
          finish();
        });
    };

    const sortData = () => {
      sortedData.value = formItems.value.map((item) => {
        const sortedItem = {
          date: item.date,
        };
        item.data.forEach((dataItem) => {
          const { label } = dataItem.customAttribute;
          sortedItem[label] = dataItem && dataItem.data ? dataItem : "";
        });

        return sortedItem;
      });
    };

    onMounted(() => {
      sortData();
      if (
        formDetails.value &&
        formDetails.value.piechartSeries &&
        formDetails.value.piechartSeries.length === 0
      )
        return [];
      getFormData();
    });

    watch(formItems, () => {
      sortData();
    });

    const previousPage = () => {
      router.push("/tenant/formlist");
    };

    const summary = () => {
      showSummary.value = true;
      showIndividual.value = false;
      showList.value = false;
      getFormData();
    };
    const individual = () => {
      showSummary.value = false;
      showIndividual.value = true;
      showList.value = false;
    };
    const formList = () => {
      showSummary.value = false;
      showIndividual.value = false;
      showList.value = true;
    };

    const previewForm = () => {
      router.push(`/forms/${route.params.id}`);
    };

    const getQrCode = async () => {
      try {
        const res = await axios.get(
          `/api/Settings/GetQRCode?link=${window.location.origin}/forms/${route.params.id}`
        );
        QRCodeDialog.value = true;
        qrCode.value = res.data;
        console.log(qrCode.value, "hhhh");
      } catch (error) {
        console.log(error);
      }
    };
    // const searchForm = computed(() => {
    //   if (searchText.value !== "" && formItems.value.length > 0) {
    //     return formItems.value.filter((i) => {
    //       // Assuming i is an object with properties that you want to search through
    //       for (let key in i) {
    //         if (
    //           typeof i[key] === "string" &&
    //           i[key].toLowerCase().includes(searchText.value.toLowerCase())
    //         ) {
    //           return true;
    //         }
    //       }
    //       return false;
    //     });
    //   } else {
    //     return formItems.value;
    //   }
    // });
    const searchForm = computed(() => {
      if (searchText.value !== "" && formItems.value.length > 0) {
        return formItems.value.filter((item) => {
          return item.data.some((dataItem) => {
            return (
              typeof dataItem.data === "string" &&
              dataItem.data.toLowerCase().includes(searchText.value.toLowerCase())
            );
          });
        });
      } else {
        return formItems.value;
      }
    });

    const searchFormsInDB = () => {
      if (searchText.value !== "" && sortedData.value.length > 0) {
        return formItems.value.filter((i) => {
          if (i) return i.toLowerCase().includes(searchText.value.toLowerCase());
        });
      } else {
        return sortedData.value;
      }
    };
    const date = (offDate) => {
      return monthDayTime.monthDayTime(offDate);
    };

    const copylink = () => {
      const textarea = document.createElement("textarea");
      textarea.value = formlink.value;

      document.body.appendChild(textarea);

      textarea.select();
      textarea.setSelectionRange(0, 99999);

      document.execCommand("copy");
      document.body.removeChild(textarea);

      ElMessage({
        showClose: true,
        message: "Copied to clipboard",
        type: "success",
      });
    };

    const formProcceed = async (item, type) => {
      const index = searchForm.value.findIndex((i) => i.id == item.id);
      searchForm.value[index].approvingServiceReport = true;
      let payload = {
          id: item.id,
          isprocessed: type == 1 ? true : false,
      };
      try {
        // const data = await axios.get(`/api/Forms/IsFormProcessedToggle?id=${item.id}&isprocessed=${type == 1 ? true : false}`)
        await formsService.formdataProcessed(payload);
        if (index >= 0) {
          searchForm.value[index].isProceed = type == 1 ? true : false;
        }
        searchForm.value[index].approvingServiceReport = false;
        ElMessage({
          type: "success",
          message: `form data ${type == 1 ? "processed " : "unprocess"}`,
          duration: 5000,
        });
      } catch (err) {
        searchForm.value[index].approvingServiceReport = false;
        console.error(err);
        ElMessage({
          type: "error",
          message: `unprocess , please try again`,
          duration: 5000,
        });
      }
    };

    return {
      formHeaders,
      formProcceed,
      sortedData,
      labels,
      QRCodeDialog,
      formPreID,
      qrCode,
      mdAndUp,
      lgAndUp,
      xlAndUp,
      xsOnly,
      formlink,
      formItems,
      formDetails,
      loading,
      primarycolor,
      route,
      showIndividual,
      showSummary,
      showList,
      searchingForm,
      searchText,
      searchForm,
      bookTypeList,
      Search,
      //   filteredSortedData,
      date,
      searchFormsInDB,
      individual,
      getQrCode,
      previousPage,
      copylink,
      formList,
      summary,
      previewForm,
      showConfirmModal,
      deleteFormData,
      downloadFile,
      fileToExport,
      fileHeaderToExport,
      //   lastLabel,
    };
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&family=Roboto:wght@100&display=swap");

* {
  font-family: Poppins;
}

.table-top {
  font-weight: 800;
  font-size: 12px;
  background: #fff;
  border: 1px solid #e0e0e0;
  border-bottom: none;
}

.table-top label:hover,
.table-top p:hover {
  cursor: pointer;
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

.table-row-bg {
  background: #ebeff4;
}

.table-row-bg th {
  font-weight: 600 !important;
}

.font-weight {
  font-weight: 500;
}

.scroll-table {
  overflow-x: auto;
}

.image img {
  height: 2.5rem;
}

.text-color {
  color: #212529;
  text-decoration: none;
}

.border-remove {
  border-bottom: 1px solid rgb(189, 189, 189) !important;
}

.border-remove:last-child {
  border: none !important;
}

.showedColor {
  background-color: #0b55d4 !important;
  /* background-color: #CAF5FF !important; */
  font-weight: bold;
  color: white;
}

.tab-color {
  background-color: #f4f4f4;
}

.text-color:hover {
  color: #007bff;
}

.remove-border {
  box-shadow: none !important;
}

.responsiveness {
  max-width: 100%;
  /* overflow-y: scroll; */
}

.table {
  width: 100% !important;
  box-shadow: none !important;
  border: none !important;
  text-align: left;
  margin-bottom: auto !important;
  padding-bottom: 0.5rem;
}

.table thead th {
  font-weight: 550;
  /* opacity: 50% !important; */
}

/* .table thead {
    border:  1px solid black;
} */

.table-header-area-main {
  color: #334d6e !important;
  font-weight: 500 !important;
  font-size: 13px !important;
}

.table-main {
  width: 100% !important;
  text-align: left !important;
  margin-bottom: auto !important;
  padding-bottom: 0.5rem !important;
}

.responsiveness {
  max-width: 100%;
  /* overflow-y: scroll; */
}

.table-main {
  width: 100% !important;
  text-align: left !important;
  margin-bottom: auto !important;
  padding-bottom: 0.5rem !important;
}

.remove-styles2 {
  padding-right: 0;
  padding-left: 0;
  border-top-left-radius: 0 !important;
  border-top-right-radius: 0 !important;
  overflow-x: scroll;
}

.remove-styles {
  border: none !important;
  border-top: none !important;
  box-shadow: none !important;
  border-bottom: 0 !important;
  border-bottom-left-radius: 0 !important;
  border-bottom-right-radius: 0 !important;
}
</style>
