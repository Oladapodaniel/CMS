<template>
  <div
    class="continer-fluid pb-4 h-100"
    style="background: #eaecf0"
    v-loading="loadingPage"
  >
    <div class="container" :class="{ 'container-slim': lgAndUp || xlAndUp }">
      <div class="row justify-content-center">
        <div class="col-md-6 col-sm-11 col-lg-4 pb-3 bg-white mt-0 mt-sm-5">
          <div class="row justify-content-center">
            <div class="col-md-12 px-0 image-upload" v-if="formLogo">
              <img
                v-if="formLogo"
                :src="formLogo"
                class="w-100"
                style="height: 9rem"
                alt=""
              />
            </div>
            <div
              class="col-md-11 col-lg-11 text-center h5 mt-3 font-weight-600"
            >
              {{
                singleFormData && singleFormData.name ? singleFormData.name : ""
              }}
            </div>
            <div class="col-md-11 col-lg-11 text-center">
              {{
                singleFormData && singleFormData.description === "null"
                  ? ""
                  : singleFormData.description
              }}
            </div>
          </div>
        </div>
        <!-- <div class="col-md-7 text-center d-flex justify-content-center">
                    
                </div> -->
      </div>
      <div
        class="row justify-content-center mt-3"
        v-if="
          singleFormData &&
          singleFormData.customAttributes &&
          singleFormData.customAttributes.length > 0 &&
          !networkError &&
          !disabledBtn &&
          !loadingPage
        "
      >
        <div class="col-md-6 col-sm-11 col-lg-4 py-4 rounded bg-white">
          <div class="row">
            <div
              class="col-md-12"
              v-for="(item, index) in singleFormData.customAttributes"
              :key="index"
            >
              <div class="row mt-3 justify-content-center">
                <div
                  class="col-md-10"
                  style="font-weight: 450; font-size: 14px"
                >
                  <div for="">
                    {{ item.label }}
                    <span v-if="item.isRequired" style="color: red"> *</span>
                  </div>
                  <el-input
                    type="text"
                    class="w-100"
                    v-if="item.controlType === 0"
                    :placeholder="item.label"
                    v-model="item.data"
                  />
                  <el-select-v2
                    v-model="item.data"
                    v-if="item.controlType === 1"
                    :options="
                      item.parameterValues
                        .split(',')
                        .map((i) => ({ label: i, value: i }))
                    "
                    :placeholder="item.label"
                    class="w-100"
                    size="large"
                  />
                  <el-checkbox
                    v-if="item.controlType === 2"
                    v-model="item.data"
                    size="large"
                  />
                  <el-date-picker
                    v-if="item.controlType === 3"
                    v-model="item.data"
                    class="w-100"
                    type="date"
                    :placeholder="item.label"
                    size="default"
                  />
                  <el-input
                    type="email"
                    v-if="item.controlType === 4"
                    class="w-100"
                    v-model="item.data"
                    :placeholder="item.label"
                  />
                  <el-input
                    type="number"
                    v-if="item.controlType === 5"
                    class="w-100"
                    v-model="item.data"
                    :placeholder="item.label"
                  />
                  <el-input
                    v-model="item.data"
                    v-if="item.controlType === 6"
                    :rows="2"
                    type="textarea"
                    :placeholder="item.label"
                  />
                  <span
                    class="w-100 small text-danger"
                    v-if="
                      filterIsRequired &&
                      filterIsRequired.isRequired &&
                      item.isRequired &&
                      !item.data
                    "
                    >Please fill in your {{ item.label }}
                  </span>
                  <!-- <span class="w-100 small text-danger" v-if="requiredField"
                    >Please fill in your {{ item.label }}
                  </span> -->
                </div>
              </div>
            </div>
          </div>
          <div class="row justify-content-center mt-4">
            <!-- <div class="col-md-3"></div> -->
            <div class="col-md-9" @click="saveForm">
              <!-- {{filterIsRequired}} -->
              <!-- :disabled="disabledBtn || (filterIsRequired && filterIsRequired.isRequired && !filterIsRequired.data)" -->
              <el-button
                class="w-100"
                size="large"
                :loading="loading"
                round
                :color="primarycolor"
              >
                Submit
              </el-button>
            </div>
          </div>
        </div>

        <div class="col-md-9 d-flex justify-content-center text-center mt-4">
          <a
            href="https://churchplus.co"
            class="text-decoration-none"
            target="_blank"
            >ChurchPlus</a
          >
        </div>
      </div>
      <div class="row justify-content-center mt-4" v-if="disabledBtn">
        <div class="col-md-4 text-center h3">Form Submitted Successfully</div>
      </div>
      <div v-if="networkError && !loading" class="adjust-network">
        <img src="../../assets/network-disconnected.png" />
        <div>Opps, Your internet connection was disrupted</div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, inject, watchEffect } from "vue";
import axios from "@/gateway/backendapi";
import { ElMessage, ElMessageBox } from "element-plus";
import deviceBreakpoint from "../../mixins/deviceBreakpoint";
import { useRoute } from "vue-router";
import swal from "sweetalert";
import router from "../../router";
export default {
  setup() {
    const formName = ref("");
    const description = ref("");
    const cutomFieldData = ref([{ parameterValues: [] }]);
    const route = useRoute();
    const loading = ref(false);
    const loadingPage = ref(false);
    const networkError = ref(false);
    const disabledBtn = ref(false);
    const singleFormData = ref([]);
    const formLogo = ref("");
    const required = ref(false);
    const centerDialogVisible = ref(false);
    const currentInput = ref("");
    const dropdownList = ref([]);
    const { xsOnly, mdAndUp, lgAndUp, xlAndUp } = deviceBreakpoint();
    const primarycolor = inject("primarycolor");

    const responseType = ref([
      { name: "Text", id: "0" },
      { name: "DropdownList", id: "1" },
      { name: "CheckBox", id: "2" },
      { name: "DateTime", id: "3" },
      { name: "Email", id: "4" },
      { name: "Image", id: "5" },
      { name: "Number", id: "6" },
    ]);

    const saveChip = (index) => {
      cutomFieldData.value[index].currentInput
        ? cutomFieldData.value[index].parameterValues.push(
            cutomFieldData.value[index].currentInput
          )
        : null;

      // ((dropdownList.value.indexOf(currentInput.value) === -1)) && dropdownList.value.push(currentInput.value);
      cutomFieldData.value[index].currentInput = "";
    };
    const backspaceDelete = ({ which }, index) => {
      which == 8 &&
        cutomFieldData.value[index].currentInput === "" &&
        cutomFieldData.value[index].parameterValues.splice(
          cutomFieldData.value[index].parameterValues.length - 1
        );
    };
    const checkComma = (e) => {
      if (e.data == ",") {
        saveChip();
      }
    };

    const addNewField = () => {
      // centerDialogVisible.value = true
      cutomFieldData.value.push({ parameterValues: [] });
    };
    const saveCustomField = () => {
      centerDialogVisible.value = false;
    };

    const allTrueRequired = ref([]);
    const getSingleForm = async () => {
      loadingPage.value = true;
      try {
        const { data } = await axios.get(
          `/api/public/getsinglepublicform?Id=${route.params.id}`
        );
        singleFormData.value = data;
        formLogo.value = data.pictureUrl;
        loadingPage.value = false;
      } catch (error) {
        // finish()
        if (error.toString().toLowerCase().includes("network error")) {
          networkError.value = true;
        } else {
          networkError.value = false;
        }
        loadingPage.value = false;
        console.log(error);
      }
    };
    getSingleForm();

    watchEffect(() => {
      if (singleFormData && singleFormData.pictureUrl) {
        formLogo.value = singleFormData.pictureUrl;
      }
    });

    const filterIsRequired = ref({});
    const requiredField = ref(false);

    const saveForm = async () => {
      let isRequiredFalse = singleFormData.value.customAttributes.find(i => i.isRequired === false)
      let isRequiredNull = singleFormData.value.customAttributes.find(i => i.isRequired === null)
      filterIsRequired.value = singleFormData.value.customAttributes.find(i => i.isRequired === true)
      let allRequiredFieldsFilled = true;
      loading.value = false

      // Iterate over the custom attributes
      for (const attribute of singleFormData.value.customAttributes) {
        // Check if the attribute is required and if its data is empty
        if (attribute.isRequired && !attribute.data) {
          // If a required field is not filled, set the flag to false and show an alert
          allRequiredFieldsFilled = false;
          
        //   alert(`${attribute.label} is required.`);
        requiredField.value = true;
          // Break out of the loop since we only need to show one alert
          break;
        }
      }

      if (allRequiredFieldsFilled) {
        loading.value = true
        try {
          const { data } = await axios.post(
            `/api/public/saveformdata?formID=${route.params.id}`,
            singleFormData.value.customAttributes.map((i) => ({
              customAttributeID: i.id,
              data: i.data,
              isRequired: i.isRequired,
            }))
          );
          console.log(data, "1");
          swal({
            title: "Success!",
            text: "Form Successfully Submitted ",
            icon: "success",
            confirmButtonColor: "#8CD4F5",
            dangerMode: true,
          });
          disabledBtn.value = true;
          required.value = false
          loading.value = false;
        } catch (error) {
          console.log(error);
          loading.value = false;
        }
      }
      // console.log(allTrueRequired, 'jjhhdhd');
      // console.log(singleFormData.value.customAttributes, 'jjhhdhd');

      loading.value = true;
      // if (isRequiredFalse && filterIsRequired.value === undefined) {
      //     try {
      //         const { data } = await axios.post(`/api/public/saveformdata?formID=${route.params.id}`, singleFormData.value.customAttributes.map((i) => ({
      //             customAttributeID: i.id,
      //             data: i.data,
      //             isRequired: i.isRequired
      //         })))
      //         console.log(data, '1')
      //         swal({
      //             title: "Success!",
      //             text: 'Form Successfully Submitted ',
      //             icon: "success",
      //             confirmButtonColor: '#8CD4F5',
      //             dangerMode: true,
      //         })
      //         disabledBtn.value = true
      //         loading.value = false
      //     }
      //     catch (error) {
      //         console.log(error);
      //         loading.value = false
      //     }
      // } else if (filterIsRequired.value && filterIsRequired.value.data && filterIsRequired.value.isRequired === true && allTrueRequired.value && allTrueRequired.value.length > 0) {
      //     try {
      //         const { data } = await axios.post(`/api/public/saveformdata?formID=${route.params.id}`, singleFormData.value.customAttributes.map((i) => ({
      //             customAttributeID: i.id,
      //             data: i.data,
      //             isRequired: i.isRequired
      //         })))
      //         console.log(data, '2')
      //         swal({
      //             title: "Success!",
      //             text: 'Form Successfully Submitted ',
      //             icon: "success",
      //             confirmButtonColor: '#8CD4F5',
      //             dangerMode: true,
      //         })
      //         disabledBtn.value = true
      //         loading.value = false
      //     }
      //     catch (error) {
      //         console.log(error);
      //         loading.value = false

      //     }
      // } else if (isRequiredNull && isRequiredNull.data && filterIsRequired.value === undefined) {
      //     try {
      //         const { data } = await axios.post(`/api/public/saveformdata?formID=${route.params.id}`, singleFormData.value.customAttributes.map((i) => ({
      //             customAttributeID: i.id,
      //             data: i.data,
      //             isRequired: i.isRequired
      //         })))
      //         console.log(data, '3')
      //         swal({
      //             title: "Success!",
      //             text: 'Form Successfully Submitted ',
      //             icon: "success",
      //             confirmButtonColor: '#8CD4F5',
      //             dangerMode: true,
      //         })
      //         disabledBtn.value = true
      //         loading.value = false
      //     }
      //     catch (error) {
      //         console.log(error);
      //         loading.value = false

      //     }

      // } else {
      //     loading.value = false
      //     disabledBtn.value = false
      // }
      // }
    };

    return {
      formName,
      primarycolor,
      cutomFieldData,
      dropdownList,
      required,
      description,
      responseType,
      centerDialogVisible,
      currentInput,
      route,
      disabledBtn,
      singleFormData,
      xsOnly,
      mdAndUp,
      lgAndUp,
      xlAndUp,
      loading,
      loadingPage,
      formLogo,
      networkError,
      filterIsRequired,
      requiredField,
      allTrueRequired,
      addNewField,
      saveForm,
      checkComma,
      saveChip,
      backspaceDelete,
      saveCustomField,
    };
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&family=Roboto:wght@100&display=swap");

* {
  font-family: Poppins;
}

.image-upload img {
  object-fit: cover;
  object-position: center;
}

.chip-container {
  /* width: 425px; */
  border: 1px solid #ccc;
  background: #ffffff;
  min-height: 34px;
  display: flex;
  flex-wrap: wrap;
  align-content: space-between;
}

.inputt {
  /* flex: 1 1 auto;
    width: 30px; */
  border: none;
  outline: none;
  padding: 4px;
}

.chip {
  padding: 0.3rem 0.3rem;
  border: 1px solid #02172e0d;
  border-radius: 25px;
  background: #02172e14;
  /* margin:4px;
    background: #e0e0e0;
    padding:0px 4px;
    border: 1px solid #ccc;
    border-radius: 3px;
    display:flex;
    align-items: center; */
}
</style>