<template>
  <div>
    <div class="container-fluid mb-4">
      <div class="row d-md-flex justify-content-between mt-3 mb-5">
        <div class="col-md-12">
          <h2 class="memCat">Custom Field Setup</h2>
        </div>
      </div>

      <div class="row grey-border pt-1 pb-5">
        <div class="col-md-12">
          <div class="row">
            <div class="col-md-12">
              <div class="row">
                <div class="col-md-12">
                  <h4 class="mt-2 mb-2 ml-5 memCat1">Custom Field</h4>
                </div>
              </div>
              <div class="row">
                <div class="col-md-12 py-5 grey-background">
                  <div class="row d-md-flex justify-content-center">
                    <div class="col-md-7">
                      <div class="col-md-12 col-sm-12">
                        <label for=""> Specify Your Label here..</label>
                        <el-input
                          type="text"
                          class="w-100"
                          placeholder="Specify Your Label here.."
                          v-model="customFieldLabel"
                          size="large"
                        />
                      </div>
                      <div class="col-md-12 col-sm-12 mt-3">
                        <label for=""
                          >Select the type of control you want to use</label
                        >
                        <el-select-v2
                          v-model="selectedControlID"
                          @change="setselectedControl"
                          :options="
                            controlType.map((i) => ({
                              label: i.name,
                              value: i.id,
                            }))
                          "
                          placeholder="Select type"
                          class="w-100"
                          size="large"
                          style="width: 100%; text-align: left"
                        />
                      </div>
                      <div
                        class="col-md-12 col-sm-12 mt-3 w-100"
                        v-if="selectedControl.name == 'DropdownList'"
                      >
                        <label for="">
                          Enter your Dropdown list here seperated by
                          comma..</label
                        >
                        <Chips
                          v-model="dropdownList"
                          style="background: white, width: 100%;"
                          separator=","
                        />
                      </div>
                      <div class="col-md-12 col-sm-12 mt-3">
                        <label for=""
                          >Select the Entity Type you want to Extend
                        </label>
                        <el-select-v2
                          v-model="selectedEntityTypeID"
                          @change="setselectedEntityType"
                          :options="
                            entityType.map((i) => ({
                              label: i.name,
                              value: i.id,
                            }))
                          "
                          placeholder="Select type"
                          class="w-100"
                          size="large"
                          style="width: 100%; text-align: left"
                        />
                      </div>
                    </div>

                    <div
                      class="
                        col-md-12
                        d-flex
                        justify-content-center
                        mt-3
                        col-sm-3
                      "
                      @click="saveCustomFields"
                    >
                      <el-button
                        class="
                          font-weight-bold
                          text-white
                          bold
                          mt-sm-3 mt-lg-0 mt-xl-0 mt-md-0 mt-3
                          px-md-4 px-3
                          py-2
                        "
                        color="#136acd"
                        round
                        size="large"
                        :loading="loading"
                      >
                        Save
                      </el-button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="row table-header-row py-2 mt-5">
            <div class="col-md-2 ">
              <span class="py-2 font-weight-bold">LABEL</span>
            </div>
            <div class="col-md-3 text-center  ">
              <span class="py-2 font-weight-bold">CONTROL TYPE</span>
            </div>
            <div class="col-md-3 text-center ">
              <span class="py-2 font-weight-bold">ENTITY TYPE</span>
            </div>
            <div class="col-md-4 text-center ">
              <span class="py-2 font-weight-bold mr-md-3 mr-0">ACTION</span>
            </div>
          </div>

          <div
            class="row py-2"
            v-for="(customFieldList, index) in allCustomFieldList"
            :key="index"
          >
            <div class="col-md-12">
              <div class="row">
                <div
                  class="
                    col-md-3
                    d-flex
                    px-md-0 px-4
                    justify-content-between
                    align-items-center
                    mb-md-0 mb-5
                    flex-wrap
                  "
                >
                  <span class="py-2 hidden-header">LABEL:</span>
                  <span
                    class="py-2 text-xs-left mr-md-0 ml-md-3 mr-4 font-text"
                    >{{ customFieldList.label }}</span
                  >
                </div>
                <div
                  class="
                    col-md-3
                    d-flex
                    px-md-0 px-4
                    justify-content-between
                    align-items-center
                    mb-md-0 mb-5
                    flex-wrap
                  "
                >
                  <span class="py-2 hidden-header small">CONTROL TYPE:</span>
                  <span class="py-2 text-sm-end font-text">{{
                    getControlName(customFieldList.controlType)
                  }}
                  </span>
                </div>
                <div
                  class="
                    col-md-3
                    d-flex
                    px-md-0 
                    justify-content-between
                    align-items-center
                    mb-md-0 mb-5
                    flex-wrap
                  "
                >
                  <span class="py-2 hidden-header">ENTITY TYPE:</span>
                  <span class="py-2 text-sm-end font-text">{{
                    getEntityName(customFieldList.entityType)
                  }}</span>
                </div>
                <div
                  class="
                    col-md-3
                    mb-md-0 mb-2
                    col-12
                    d-flex
                    justify-content-md-center
                    align-items-end
                  "
                >
                  <span class="py-md-4 hidden-header hidden-header1"
                    >ACTION</span
                  >
                  <div
                    class="
                      d-flex
                      justify-content-md-center justify-content-sm-start
                    "
                  >
                    <el-button
                      class="py-1 px-4 mb-md-3"
                      color="#EBEFF4"
                      round
                      @click="openClassification(index)"
                    >
                      View
                    </el-button>
                    <el-button
                      class="delbtn py-1 primary-btn px-3 mb-md-3"
                      @click="deleteCustomField(customFieldList.id, index)"
                      round
                    >
                      Delete
                    </el-button>
                  </div>
                </div>
              </div>
              <div
                class="row grey-background  "
                v-if="vissibleTab === `tab_${index}`"
              >
                <div class="col-md-12"
                  :class="{
                    'show-view-dropdown': toggleCustomList,
                    'hide-view-dropdown': !toggleCustomList,
                  }"
                >
                  <div class="col-md-9 d-flex flex-wrap mt-3">
                    <div class="col-md-4 text-md-right text-left">
                      <label for="">Label</label>
                    </div>
                    <div class="col-md-8">
                      <el-input
                        type="text"
                        class="w-100"
                        v-model="customLabel"
                        size="large"
                      />
                    </div>
                  </div>
                  <div class="col-md-9 d-flex flex-wrap mt-3">
                    <div class="col-md-4 text-md-right text-left">
                      <label for="">Control type</label>
                    </div>
                    <div class="col-md-8">
                      <el-select-v2
                          v-model="customControlTypeID"
                          @change="setcustomControlType"
                          :options="
                            controlType.map((i) => ({
                              label: i.name,
                              value: i.id,
                            }))
                          "
                          placeholder="Select type"
                          class="w-100"
                          size="large"
                          style="width: 100%; text-align: left"
                        />
                    </div>
                  </div>

                  <div
                    class="col-md-9 d-flex flex-wrap my-3"
                    v-if="customControlType.name == 'DropdownList'"
                  >
                    <div class="col-md-4 text-md-right text-left">
                      <label for="">Label</label>
                    </div>
                    <div class="col-md-8">
                      <el-input
                        type="text"
                        class="w-100"
                        size="large"
                        v-model="customDropdownList"
                      />
                    </div>
                  </div>

                  <div class="col-md-9 d-flex flex-wrap my-3">
                    <div class="col-md-4 text-md-right text-left">
                      <label for="">Entity type</label>
                    </div>
                    <div class="col-md-8">
                      <el-select-v2
                          v-model="customEntityTypeID"
                          @change="setcustomEntityType"
                          :options="
                            entityType.map((i) => ({
                              label: i.name,
                              value: i.id,
                            }))
                          "
                          placeholder="Select type"
                          class="w-100"
                          size="large"
                          style="width: 100%; text-align: left"
                        />
                    </div>
                  </div>
                  <div class="col-md-12">
                    <div class="row mt-0 d-flex justify-content-center">
                      <div class="save-discard-btn">
                        <div class="">
                          <el-button
                            class=" save-btn text-white py-1 px-4"
                            round
                            @click="
                              updateCustomField(customFieldList.id, index)
                            "
                          >
                            Save
                          </el-button>
                        </div>
                        <div class="">
                          <el-button
                            class=" secondary-btn py-1 px-3 m bor"
                            round
                            color="#EBEFF4"
                            @click="discard"
                          >
                            Discard
                          </el-button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="row">
                <div class="col-md-12 px-0">
                  <hr class="hr my-0" />
                </div>
              </div>
            </div>
          </div>
          <div class="col-12 text-center p-5" v-if="loading">
            <i
              class="pi pi-spin pi-spinner text-center text-primary"
              style="fontsize: 3rem"
            ></i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import axios from "@/gateway/backendapi";
import { useToast } from "primevue/usetoast";
import { ElMessage, ElMessageBox } from "element-plus";
import finish from "../../services/progressbar/progress";
import Chips from "primevue/chips";

export default {
  components: {
    Chips,
  },
  setup() {
    const selectedControl = ref({});
    const selectedControlID = ref(null);
    const customControlTypeID = ref(null);
    const customEntityTypeID = ref(null);
    const selectedEntityTypeID = ref(null);
    const dropdownList = ref([]);
    const customDropdownList = ref("");
    const vissibleTab = ref(false);
    const selectedEntityType = ref({});
    const loading = ref(false);
    const customEntityType = ref({});
    const customControlType = ref({});
    const customLabel = ref("");
    const customFieldLabel = ref("");
    const tenantId = ref("");
    const getAllcontrolType = ref([]);
    const getAllEntityType = ref([]);
    const allCustomFieldList = ref([]);
    const toast = useToast();
    const getCustomizableField = ref([]);
    const toggleCustomList = ref(false);
    const controlType = ref([
      { name: "Text", id: "0" },
      { name: "DropdownList", id: "1" },
      { name: "CheckBox", id: "2" },
      { name: "DateTime", id: "3" },
      { name: "Email", id: "4" },
      { name: "Image", id: "5" },
      { name: "Number", id: "6" },
    ]);
    const entityType = ref([
      { name: "Member", id: "0" },
      { name: "FirstTimers", id: "1" },
      { name: "NewConverts", id: "2" },
      { name: "Activity", id: "3" },
      { name: "EventRegistrationForm", id: "4" },
      { name: "CheckInAttendance", id: "5" },
    ]);

    const setcustomEntityType = () => { setcustomControlType
      customEntityType.value = entityType.value.find((i) => {
        return i.id === customEntityTypeID.value;
      });
    };
    const setcustomControlType = () => {
      customControlType = controlType.value.find((i) => {
        return i.id === customControlTypeID.value;
      });
    };
    const setselectedEntityType = () => {
      selectedEntityType.value = entityType.value.find((i) => {
        return i.id === selectedEntityTypeID.value;
      });
    };
    const setselectedControl = () => {
      selectedControl.value = controlType.value.find((i) => {
        return i.id === selectedControlID.value;
      });
    };

    const discard = () => [
      (vissibleTab.value = ""),
      (toggleCustomList.value = !toggleCustomList.value),
    ];

    const getAllControls = async () => {
      try {
        const data = await axios.get("/api/CustomFields/GetAllControls");
        console.log(data, "getAllControls");
      } catch (error) {
        console.log(error);
      }
    };
    getAllControls();

    const deleteCustomField = (id) => {
      axios
        .delete(`/api/CustomFields/EditCustomFields?customAttributeID=${id}`)
        .then((res) => {
          console.log(res);
          ElMessage({
            type: "success",
            message: "Custom field deleted",
          });

          allCustomFieldList.value = allCustomFieldList.value.filter(
            (customFieldList) => customFieldList.id !== id
          );
        })
        .catch((err) => {
          finish();
          if (err.response.status === 400) {
            ElMessage({
              type: "error",
              message: "Ensure this is not in any group",
            });
          } else {
            ElMessage({
              type: "error",
              message: "An error occurred, please try again",
            });
          }
        });
    };

    const showConfirmModal = (id, index) => {
      ElMessageBox.confirm("Are you sure you want to Delete?", "Warning", {
        confirmButtonText: "OK",
        cancelButtonText: "Cancel",
        type: "warning",
      })
        .then(() => {
          deleteCustomField(id, index);
        })
        .catch(() => {
          ElMessage({
            type: "info",
            message: "Delete canceled",
          });
        });
    };

    const getCustomizable = async () => {
      try {
        const data = await axios.get(
          "/api/CustomFields/GetCustomizableObjects"
        );
        getCustomizableField.value = data.data;
      } catch (error) {
        console.log(error);
      }
    };
    getCustomizable();

    const getCurrentlySignedInUser = async () => {
      try {
        const res = await axios.get("/api/Membership/GetCurrentSignedInUser");
        tenantId.value = res.data.tenantId;
      } catch (err) {
        /*eslint no-undef: "warn"*/
        console.log(err);
      }
    };
    getCurrentlySignedInUser();
    const openClassification = (index) => {
      vissibleTab.value = `tab_${index}`;
      customLabel.value = allCustomFieldList.value[index].label;
      customDropdownList.value =
        allCustomFieldList.value[index].parameterValues;
      customEntityType.value = entityType.value.find(
        (i) => i.id == allCustomFieldList.value[index].entityType,
      );


      customControlType.value = controlType.value.find(
        (i) => i.id == allCustomFieldList.value[index].controlType
      );
       customControlTypeID.value =  customControlType.value.id
       customEntityTypeID.value = customEntityType.value.id
      toggleCustomList.value = !toggleCustomList.value;
     
      
    };

    const updateCustomField = async () => {
      const customDetail = {
        id: allCustomFieldList.value.id,
        entityType: customEntityType.value.id,
        tenantID: tenantId.value,
        label: customLabel.value,
        controlType: customControlType.value.id,
        parameterValues: customDropdownList.value,
      };
      try {
        const res = await axios.put(
          "/api/CustomFields/EditCustomFields",
          customDetail
        );
        console.log(res.data, "updatecustomfield");
        ElMessage({
          type: "success",
          message: "Custom Field Updated successfully",
        });
      } catch (err) {
        /*eslint no-undef: "warn"*/
        console.log(err);
      }
      vissibleTab.value = "";
      toggleCustomList.value = !toggleCustomList.value;
    };

    const saveCustomFields = async () => {
      console.log(dropdownList.value);
      const body = {
        entityType: selectedEntityType.value.name,
        tenantID: tenantId.value,
        label: customFieldLabel.value,
        parameterValues: dropdownList.value ? dropdownList.value.join(",") : "",
        controlType: selectedControl.value.name,
      };

      try {
        const { data } = await axios.post(
          "/api/CustomFields/SaveCustomFields",
          body
        );

        console.log(data, "saveCustomizable");
        allCustomFieldList.value.push(data);
        ElMessage({
          type: "success",
          message: "Custom Field created successfully",
        });
        selectedEntityType.value = "";
        customFieldLabel.value = "";
        dropdownList.value = "";
        selectedControl.value = "";
      } catch (error) {
        console.log(error);
      }
    };

    const getAllCustomFields = async () => {
      try {
        const res = await axios.get("/api/CustomFields/GetAllCustomFields");
        console.log(res.data, "allCustomFields");
        allCustomFieldList.value = res.data;
        getAllcontrolType.value = res.data.map((i) => {
          return {
            name: i.controlType,
            id: i.id,
          };
        });
        getAllEntityType.value = res.data.map((i) => {
          return {
            name: i.entityType,
            id: i.id,
          };
        });
        console.log(getAllcontrolType.value, "allcontrol");
        console.log(getAllEntityType.value, "allEntity");
        console.log(allCustomFieldList.value, "allCustomFieldList");
      } catch (err) {
        /*eslint no-undef: "warn"*/
        console.log(err);
      }
    };
    getAllCustomFields();

    const getEntityName = (id) => {
      return entityType.value.find((i) => i.id == id).name;
    };

    const getControlName = (id) => {
      return controlType.value && controlType.value.find((i) => i.id == id)
        ? controlType.value.find((i) => i.id == id).name
        : "";
    };

    return {
      controlType,
      setselectedControl,
      setcustomControlType,
      setcustomEntityType,
      setselectedEntityType,
      selectedControlID,
      customEntityTypeID,
      customControlTypeID,
      selectedEntityTypeID,
      getControlName,
      vissibleTab,
      saveCustomFields,
      showConfirmModal,
      deleteCustomField,
      updateCustomField,
      customEntityType,
      customControlType,
      getAllcontrolType,
      customLabel,
      loading,
      getAllEntityType,
      selectedControl,
      allCustomFieldList,
      getCustomizableField,
      selectedEntityType,
      entityType,
      dropdownList,
      openClassification,
      discard,
      getEntityName,
      customFieldLabel,
      customDropdownList,
      toggleCustomList,
    };
  },
};
</script>

<style scoped>
.table-header-row {
  background: #ebeff4;
  border-top: 1px solid #dde2e6;
  border-radius: 8px 8px 0 0;
}

.save-discard-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 !important;
  gap: 2rem;
}

.show-view-dropdown {
  height: 300px;
  overflow: hidden;
  transition: all 0.5s ease-in-out;
}
.hide-view-dropdown {
  height: 0px;
  overflow: hidden;
  transition: all 0.5s ease-in-out;
}

.hidden-header {
  display: none;
}

.grey-background {
  background: #dde2e6;
}

.save-btn {
  background: #50ab00;
}
.delbtn:hover {
  background-color: red !important;
  color: white !important;
}
.delbtn {
  background-color: #f2bc9e !important;
  color: black !important;
}
.delbtn:focus {
  outline: none !important;
  border: none !important;
}
.memCat {
  font: var(--unnamed-font-style-normal) normal 800 34px/46px
    var(--unnamed-font-family-nunito-sans);
  letter-spacing: var(--unnamed-character-spacing-0);
  text-align: left;
  font: normal normal 800 34px/46px Nunito Sans;
  letter-spacing: 0px;
  color: #02172e;
  opacity: 1;
}
.memCat1 {
  font: var(--unnamed-font-style-normal) normal var(--unnamed-font-weight-bold)
    24px/32px var(--unnamed-font-family-nunito-sans);
  letter-spacing: var(--unnamed-character-spacing-0);
  text-align: left;
  font: normal normal bold 24px/32px Nunito Sans;
  letter-spacing: 0px;
  color: #02172e;
  opacity: 1;
}

@media screen and (max-width: 767px) {
  .hidden-header1 {
    display: none !important;
  }
  .hidden-header {
    display: inline-block;
    font-weight: 700;
    font-size: 13px;
  }

  .table-header-row {
    display: none;
  }
  .bold:hover {
    color: white !important;
  }
  .bold {
    color: rgb(187, 176, 176) !important;
  }
  .bor {
    border: #02172e !important;
  }
}
@media screen and (max-width: 390px) {
  .memCat {
    font: var(--unnamed-font-style-normal) normal 500 20px/25px
      var(--unnamed-font-family-nunito-sans);
    letter-spacing: var(--unnamed-character-spacing-0);
    text-align: left;
    font: normal normal 800 20px/25px Nunito Sans;
    letter-spacing: 0px;
    color: #02172e;
    opacity: 1;
  }
  .memCat1 {
    font: var(--unnamed-font-style-normal) normal
      var(--unnamed-font-weight-bold) 18px/20px
      var(--unnamed-font-family-nunito-sans);
    letter-spacing: var(--unnamed-character-spacing-0);
    text-align: left;
    font: normal normal bold 18px/20px Nunito Sans;
    letter-spacing: 0px;
    color: #02172e;
    opacity: 1;
  }

  .save-discard-btn {
    flex-wrap: wrap;
  }

  .font-text {
    font-size: 13px;
    font-weight: bold;
  }
}
</style>