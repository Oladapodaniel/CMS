<template>
  <div class="conatiner-fluid mt-3">
    <div class="row">
      <div class="col-md-12 h2 font-weight-bold text-black text-head">Create Form</div>
    </div>
    <div class="row justify-content-center mt-4">
      <div class="col-md-8">
        <div class="row mt-3">
          <div class="col-md-3"></div>
          <div class="col-md-8">
            <div
              class="col-md-12 border d-flex justify-content-center rounded"
              style="background-color: #ebebeb"
            >
              <div class="row">
                <div
                  class="col-md-12 d-flex px-0 justify-content-center"
                  v-if="route.params.id"
                >
                  <div v-if="url" class="col-md-12 px-0 mb-3 image-upload">
                    <img :src="url" alt="" class="w-100" />
                  </div>
                </div>
                <div class="col-md-12 px-0 d-flex justify-content-center" v-else>
                  <div v-if="url" class="col-md-12 px-0 mb-3 image-upload">
                    <img :src="url" alt="" class="w-100" />
                  </div>
                </div>
                <el-upload
                  class="upload-demo col-md-12 d-flex justify-content-center"
                  :class="{ 'py-3': !url }"
                  multiple
                  :show-file-list="false"
                  :on-change="chooseFile"
                  :on-remove="handleRemove"
                  :auto-upload="false"
                >
                  <el-button round class="d-flex">
                    <el-icon :size="18">
                      <Picture />
                    </el-icon>
                    <span>upload header image</span>
                  </el-button>
                </el-upload>
              </div>
            </div>
          </div>
          <div class="col-md-1"></div>
        </div>
        <div class="row mt-3">
          <div class="col-md-3 font-weight text-md-right text-left">
            <label for=""> Form Name </label>
          </div>
          <div class="col-md-8">
            <el-input type="text" v-model="formName" />
          </div>
          <div class="col-md-1"></div>
        </div>
        <div class="row mt-4">
          <div class="col-md-3 font-weight text-md-right text-left">
            <label for="">Description</label>
          </div>
          <div class="col-md-8">
            <el-input type="textarea" :rows="3" v-model="description" />
          </div>
          <div class=""></div>
        </div>
        <!-- <div class="row justify-content-center mt-4">
            <div class="col-md-8 ">
                <div class="row mt-3">
                    <div class="col-md-3 "></div>
                    <div class="col-md-8">
                        <div class="col-md-12  border d-flex justify-content-center  rounded "
                            style="background-color: #EBEBEB">
                            <div class="row">
                                <div class="col-md-12 d-flex px-0 justify-content-center" v-if="route.params.id">
                                    <div v-if="url" class="col-md-12 px-0  mb-3  image-upload">
                                        <img :src="url" alt="" class="w-100" >
                                    </div>
                                </div>
                                <div class="col-md-12 px-0 d-flex justify-content-center " v-else>
                                    <div v-if="url" class="col-md-12 px-0 mb-3   image-upload">
                                        <img :src="url" alt="" class="w-100" >
                                    </div>
                                </div>
                                <el-upload class="upload-demo col-md-12 d-flex justify-content-center " :class="{'py-3' : !url }" multiple :show-file-list="false" :on-change="chooseFile"
                                    :on-remove="handleRemove" :auto-upload="false">
                                    <el-button round class="d-flex  ">
                                        <el-icon :size="18">
                                            <Picture />
                                        </el-icon>
                                        <span>upload header image</span>
                                    </el-button>
                                </el-upload>
                            </div>
                        </div> -->

        <!-- <div class="row mt-4  ">
                        <div class="col-md-3"></div>
                        <div class="col-md-9  ">
                            <el-input class="" type="text" placeholder="Sample Question" v-model="description"  required />
                            <el-checkbox class="" v-model="required" label="Required" />
                        </div>
                    </div> -->
        <div class="row">
          <hr class="w-100" />
        </div>
        <draggable
          item-key="id"
          class="list-group"
          v-model="cutomFieldData"
          ghost-class="ghost"
          @start="dragging = true"
          @end="(dragging = false), reorderCustomField()"
          v-loading="reoderloading"
        >
          <template #item="{ element, index }">
            <div class="row graggable">
              <div class="col-md-12">
                <!-- <div class="col-md-12" v-for="(item, index) in cutomFieldData " :key="index"> -->
                <div class="row mt-3">
                  <div class="col-md-3 font-weight text-md-right text-left">
                    <label for="">Label name </label>
                  </div>
                  <div class="col-md-8">
                    <el-input
                      type="text"
                      class="w-100"
                      placeholder="input Label name"
                      v-model="element.label"
                      required
                    />
                  </div>
                </div>
                <div class="row mt-3">
                  <div class="col-md-3 font-weight text-md-right text-left">
                    <label for=""> Select Response type </label>
                  </div>
                  <div class="col-md-8">
                    <el-select-v2
                      v-model="element.controlType"
                      :options="
                        responseType.map((i) => ({
                          label: i.name,
                          value: i.id,
                        }))
                      "
                      placeholder="Select Control type"
                      class="w-100"
                      size="large"
                    />
                  </div>
                  <div class="mt-">
                    <img src="../../assets/drag-and-drop.png" />
                  </div>
                </div>
                <div class="row mt-2">
                  <div class="col-md-3"></div>
                  <div class="col-md-8" v-if="element.controlType === 1">
                    <!-- <div>Input your options and press enter</div> -->
                    <div class="chip-container col-md-12 p-0 m-0">
                      <div
                        class="chip px-2 d-flex justify-content-between my-2 mx-1"
                        v-for="(chip, i) of element.parameterValues"
                        :key="i"
                      >
                        <span>{{ chip }}</span>
                        <!-- <span>{{ item.parameterValues }}</span> -->
                        <i
                          class="pt-1 text-dark align-items-center"
                          @click="deleteChip(i, index)"
                          ><el-icon> <CircleClose /> </el-icon
                        ></i>
                      </div>
                      <input
                        placeholder="input option"
                        class="inputt py-2"
                        v-model="element.currentInput"
                        @keypress.enter="saveChip(index)"
                        @input="checkComma"
                        @keydown.delete="backspaceDelete(index)"
                      />
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-3"></div>
                  <div
                    class="col-md-8 px-0 d-flex justify-content-between"
                    :class="{ 'justify-content-between': element.controlType === 1 }"
                  >
                    <div @click="saveChip(index)" v-if="element.controlType === 1">
                      <!-- <div @click="saveChip(index)" v-if="index === cutomFieldData.length - 1"> -->
                      <div class="d-flex mt-1 ml-2" style="font-weight: 500">
                        <el-icon :size="14" class="mt-1 mr-0 font-weight-bold">
                          <Plus /> </el-icon
                        ><span>New Option</span>
                      </div>
                      <!-- <el-button text class="d-flex ">
                                            <el-icon :size="16" class=" ">
                                                <Plus />
                                            </el-icon>
                                            <span class="mt-1">New Option</span>
                                        </el-button> -->
                    </div>
                    <div class="mt-0 pl-3">
                      <el-checkbox
                        class=""
                        v-model="element.isRequired"
                        label="Required"
                      />
                    </div>
                    <div @click="deleteItem(element.id, index)" class="">
                      <el-button text class="d-flex justify-content-end">
                        <el-icon class=" " :size="23"> <Delete /> </el-icon
                        ><span class="ml-1">Delete</span>
                      </el-button>
                    </div>
                  </div>
                </div>
                <div class="row" v-if="index !== cutomFieldData.length - 1">
                  <hr class="w-100" />
                </div>
              </div>
            </div>
          </template>
        </draggable>
        <div class="row mt-4">
          <div class="col-md-3"></div>
          <div class="col-md-8">
            <div class="row">
              <div class="col-md-12" @click="addNewField">
                <div class="col-md-12 cursor-pointer d-flex" style="font-weight: 500">
                  <el-icon :size="14" class="mt-1 mr-0 font-weight-bold">
                    <Plus /> </el-icon
                  ><span class="font-weight-600">Add New Field</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <hr class="w-100" />
        </div>
        <div class="row my-1 mt-4">
          <div class="col-md-12">
            <div class="row">
              <div class="col-md-3 font-weight text-left text-md-right">
                <label for="" class="">Accepts Payment ?</label>{{ checkedYes }}
              </div>

              <div class="col-md-8">
                <el-checkbox v-model="checkedYes" label="Yes" />
              </div>
            </div>
          </div>
        </div>
        <!-- Contribution -->
        <div class="row my-1 mt-4" v-if="checkedYes">
          <div class="col-md-12">
            <div class="row">
              <div class="col-md-3 font-weight text-left text-md-right">
                <label for="" class=""
                  >Contribution <sup class="text-danger">*</sup>
                </label>
              </div>

              <div class="col-md-8">
                <el-dropdown trigger="click" class="w-100">
                  <span class="el-dropdown-link w-100">
                    <div
                      class="d-flex justify-content-between border-contribution w-100"
                      size="large"
                    >
                      <span class="text-secondary">{{
                        selectedContribution &&
                        Object.keys(selectedContribution).length > 0
                          ? selectedContribution.name
                          : "Select contribution"
                      }}</span>
                      <div>
                        <el-icon class="el-icon--right">
                          <arrow-down />
                        </el-icon>
                      </div>
                    </div>
                  </span>
                  <template #dropdown>
                    <el-dropdown-menu>
                      <el-dropdown-item
                        v-for="(itm, indx) in contributionItems"
                        :key="indx"
                        @click="selectContribution(itm)"
                        >{{ itm.name }}
                      </el-dropdown-item>
                      <el-dropdown-item
                        data-toggle="modal"
                        data-target="#exampleModalCenter"
                        class="text-center"
                        divided
                        ><a
                          class="font-weight-bold small-text d-flex justify-content-center py-2 text-decoration-none primary-text"
                          style="color: #136acd"
                        >
                          <el-icon size="large">
                            <CirclePlus />
                          </el-icon>
                          Create new contribution item
                        </a></el-dropdown-item
                      >
                    </el-dropdown-menu>
                  </template>
                </el-dropdown>
              </div>
              <div
                class="modal fade"
                id="exampleModalCenter"
                tabindex="-1"
                role="dialog"
                aria-labelledby="exampleModalCenterTitle"
                aria-hidden="true"
              >
                <div class="modal-dialog modal-lg modal-dialog-centered" role="document">
                  <div class="modal-content">
                    <div class="modal-header" style="border: none">
                      <h5 class="modal-title" id="exampleModalLongTitle">
                        Add Contribution
                      </h5>
                      <button
                        type="button"
                        class="close"
                        data-dismiss="modal"
                        aria-label="Close"
                      >
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div class="modal-body">
                      <ContributionItems @item-name="newConItems" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="row mt-4" v-if="checkedYes">
          <div class="col-md-12">
            <div class="row">
              <div class="col-md-3 font-weight text-left text-md-right">
                <label for="" class="">Bank </label>
              </div>

              <div class="col-md-8">
                <div class="dropdown w-100">
                  <el-dropdown trigger="click" class="w-100">
                    <span class="el-dropdown-link w-100">
                      <el-input
                        type="text"
                        placeholder="Select Bank"
                        v-model="bankSearchText"
                      />
                    </span>
                    <template #dropdown>
                      <el-dropdown-menu>
                        <el-dropdown-item
                          v-for="item in filteredBanks"
                          :key="item.id"
                          @click="setBank(item)"
                        >
                          {{ item ? item.name : "" }}
                        </el-dropdown-item>
                      </el-dropdown-menu>
                    </template>
                  </el-dropdown>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Account number -->
        <div class="row my-1 mt-4" v-if="checkedYes">
          <div class="col-md-12">
            <div class="row">
              <div class="col-md-3 font-weight text-left text-md-right">
                <label for="" class="">Account Number </label>
              </div>

              <div class="col-md-8">
                <el-input
                  type="text"
                  placeholder="Enter account number"
                  v-model="accountNumber"
                  @blur="resolveCustomerDetail"
                />
                <div
                  class="col-sm-2 col-lg-3 align-self-center mt-4"
                  v-if="accountResolving"
                >
                  <div style="width: 3rem; height: 3rem" role="status">
                    <el-icon class="is-loading">
                      <Loading />
                    </el-icon>
                  </div>
                </div>
                <span
                  class="col-md-12 small font-weight-600 d-flex justify-content-center px-0"
                  >{{ accountName }}</span
                >
              </div>
            </div>
          </div>
        </div>
        <div class="row my-1 mt-4" v-if="checkedYes">
          <div class="col-md-12">
            <div class="row">
              <div class="col-md-3 font-weight text-left text-md-right">
                <label for="" class="">Payment type </label>
              </div>

              <div class="col-md-8 d-flex justify-content-between flex-wrap">
                <div
                  class="col-md-6 border py-2 c-pointer"
                  :class="{ 'show-specific': pledgeCategory == 'specific' }"
                  @click="specific"
                >
                  Specific
                </div>
                <div
                  class="col-md-6 mt-4 mt-md-0 border py-2 c-pointer free-will"
                  :class="{ 'show-free-will': pledgeCategory == 'freewill' }"
                  @click="freeWill"
                >
                  Free Will
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-12 mt-3" v-if="pledgeCategory == 'specific'">
            <div class="row">
              <div class="col-md-3 font-weight text-left text-md-right">
                <label for="" class=""> Amount </label>
              </div>
              <div class="col-md-8">
                <el-input
                  type="text"
                  v-model="specificAmount"
                  placeholder="Enter specific amount"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <hr class="w-100" />
        </div>

        <!-- Account name
        <div class="row my-1 mt-4">
          <div class="col-md-12">
            <div class="row">
              <div class="col-md-3 text-left text-md-right">
                <label for="" class="">Account Name </label>
              </div>

              <div class="col-md-8">
                <input
                  type="text"
                  v-model="accountName"
                  placeholder="Account name"
                  class="form-control"
                  disabled
                />
              </div>
            </div>
          </div>
        </div> -->
        <div class="row mt-4">
          <div class="col-md-3 font-weight text-md-right text-left">
            <label for="">Recipient Email</label>
          </div>
          <div class="col-md-8">
            <el-input type="email" v-model="emailRecipient" />
          </div>
        </div>
        <div class="row mt-4">
          <div class="col-md-3"></div>
          <div class="col-md-8">
            <div class="row">
              <div class="col-md-12" @click="previewForm">
                <el-button class="w-100 secondary-button d-flex" size="large" round>
                  <img class="mr-2" src="../../assets/form/Vector.png" alt="" />
                  <span>Preview form</span></el-button
                >
              </div>
              <div class="col-md-12 mt-2" @click="saveForm">
                <el-button
                  class="w-100 d-flex"
                  :loading="loading"
                  size="large"
                  round
                  :color="primarycolor"
                >
                  <img class="mr-2" src="../../assets/form/Vector.png" alt="" />
                  <span>Save</span></el-button
                >
              </div>
            </div>
          </div>
        </div>
        <el-dialog
          v-model="dialogVisible"
          :width="mdAndUp || lgAndUp || xlAndUp ? `50%` : `90%`"
        >
          <div class="continer-fluid pb-4 h-100" style="background: #eaecf0">
            <div class="row justify-content-center">
              <div class="col-md-7 col-lg-6 col-11 border bg-white mt-5">
                <div class="row justify-content-center">
                  <div class="col-md-12 px-0 image-upload" v-if="url">
                    <img
                      v-if="url"
                      :src="url"
                      class="w-100"
                      style="height: 9rem"
                      alt=""
                    />
                  </div>
                  <div class="col-md-9 text-center h4 mt-4 font-weight-600">
                    {{ formName }}
                  </div>
                  <div class="col-md-9 mb-2 text-center">
                    {{ description }}
                  </div>
                </div>
              </div>
            </div>

            <div class="row justify-content-center mt-3">
              <div class="col-md-7 col-lg-6 col-11 py-4 rounded bg-white">
                <div class="row">
                  <div
                    class="col-md-12"
                    v-for="(item, index) in cutomFieldData"
                    :key="index"
                  >
                    <div class="row mt-3 justify-content-center">
                      <div class="col-md-9" style="font-weight: 500">
                        <label for=""
                          >{{ item.label }}
                          <span v-if="item.isRequired" style="color: red"> *</span></label
                        >
                        <el-input
                          type="text"
                          class="w-100"
                          v-if="item.controlType === 0"
                          :placeholder="item.label"
                          v-model="item.currentInput"
                        />
                        <el-select-v2
                          v-model="item.currentInput"
                          v-if="item.controlType === 1"
                          :options="
                            item.parameterValues.map((i) => ({
                              label: i,
                              value: i,
                            }))
                          "
                          :placeholder="item.label"
                          class="w-100"
                          size="large"
                        />
                        <el-checkbox
                          v-if="item.controlType === 2"
                          v-model="item.currentInput"
                          size="large"
                        />
                        <el-date-picker
                          v-if="item.controlType === 3"
                          v-model="item.currentInput"
                          class="w-100"
                          type="date"
                          :placeholder="item.label"
                          size="large"
                        />
                        <el-input
                          type="email"
                          v-if="item.controlType === 4"
                          class="w-100"
                          v-model="item.currentInput"
                          :placeholder="item.label"
                        />
                        <el-input
                          type="number"
                          v-if="item.controlType === 5"
                          class="w-100"
                          v-model="item.currentInput"
                          :placeholder="item.label"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-md-9 text-center mt-4">ChurchPlus Forms</div>
            </div>
            <!-- <div class="row justify-content-center mt-4" v-if="disabledBtn">
                                <div class="col-md-4 text-center h3">
                                    Form Submitted Successfully
                                </div>
                            </div> -->
            <!-- <div v-if="networkError && !loading" class="adjust-network">
                                <img src="../../assets/network-disconnected.png">
                                <div>Opps, Your internet connection was disrupted</div>
                            </div> -->
          </div>
          <!-- <span>This is a message</span> -->
          <!-- <template #footer>
                        <div class="dialog-footer">
                            <el-button type="primary" @click="dialogVisible = false">
                                Confirm
                            </el-button>
                        </div>
                    </template> -->
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, inject, computed, watch } from "vue";
import axios from "@/gateway/backendapi";
import axio from "axios";
import { ElMessage, ElMessageBox } from "element-plus";
import finish from "../../services/progressbar/progress";
import deviceBreakpoint from "../../mixins/deviceBreakpoint";
import ContributionItems from "@/components/firsttimer/contributionItemModal";
import { useRoute } from "vue-router";
import router from "../../router";
import draggable from "vuedraggable";
export default {
  components: {
    draggable,
    ContributionItems,
  },
  setup() {
    const formName = ref("");
    const description = ref("");
    const cutomFieldData = ref([{ parameterValues: [] }]);
    const route = useRoute();
    const required = ref(false);
    const dragging = ref(false);
    const reoderloading = ref(false);
    const loading = ref(false);
    const selectedImage = ref("");
    const specificAmount = ref("");
    const accountName = ref("");
    const selectedContribution = ref({});
    const centerDialogVisible = ref(false);
    const nigerianBanks = ref([]);
    const accountResolving = ref(false);
    const dialogVisible = ref(false);
    const checkedYes = ref(false);
    const currentInput = ref("");
    const selectedBank = ref("");
    const emailRecipient = ref("");
    const pledgeType = ref(0);
    const tenantId = ref("");
    const bankSearchText = ref("");
    const bankCode = ref("");
    const accountNumber = ref("");
    const contributionItems = ref([]);
    const fileImage = ref(false);
    const dropdownList = ref([]);
    const { xsOnly, mdAndUp, lgAndUp, xlAndUp } = deviceBreakpoint();
    const primarycolor = inject("primarycolor");
    const pledgeCategory = ref("specific");
    const paymentType = ref();

    const responseType = ref([
      { name: "Text", id: 0 },
      { name: "DropdownList", id: 1 },
      { name: "CheckBox", id: 2 },
      { name: "DateTime", id: 3 },
      { name: "Email", id: 4 },
      { name: "Number", id: 5 },
      { name: "TextArea", id: 6 },
    ]);

    const previewForm = () => {
      dialogVisible.value = true;
    };
    const specific = () => {
      pledgeCategory.value = "specific";
      paymentType.value = true;

      pledgeType.value = 1;
    };
    const freeWill = () => {
      pledgeCategory.value = "freewill";
      pledgeType.value = 0;
      paymentType.value = false;
    };

    const selectContribution = (item) => {
      selectedContribution.value = item;
    };

    const newConItems = (payload) => {
      contributionItems.value.push(payload);
      selectedContribution.value = payload;
    };

    const getContributionCategory = (id) => {
      axios
        .get("/api/financials/contributions/items")
        .then((res) => {
          contributionItems.value = res.data;

          if (id) {
            selectedContribution.value = contributionItems.value.find((i) => i.id == id);
          }
        })
        .catch((err) => {
          finish();
          if (err.toString().toLowerCase().includes("network error")) {
            networkError.value = true;
          } else {
            networkError.value = false;
          }
        });
    };
    getContributionCategory();

    const reorderCustomField = async () => {
      reoderloading.value = true;
      let payload = cutomFieldData.value.map((i, index) => {
        i.order = index;
        return {
          id: i.id ? i.id : "",
          label: i.label,
          controlType: i.controlType,
          entityType: i.controlType,
          entityID: i.entityID,
          tenantID: i.tenantID,
          isRequired: i.isRequired,
          order: i.order,
        };
      });
      try {
        let data = await axios.put("/api/Forms/reOrderform", payload);
        reoderloading.value = false;
        ElMessage({
          type: "success",
          message: "Custom fields reordered successfully",
          duration: 5000,
        });
      } catch (error) {
        console.error(error);
        reoderloading.value = false;
      }
    };

    const deleteItem = (id, index) => {
      if (id && cutomFieldData.value && cutomFieldData.value.length > 1) {
        //    if () {
        //     ElMessage({
        //             type: 'error',
        //             showClose: true,
        //             message: 'Cannot Delete, You must have at least one field',
        //             duration: 5000
        //         })
        //    }
        axios
          .delete(`/api/Forms/deleteCustomField?Id=${id}`)
          .then((res) => {
            console.log(res);
            ElMessage({
              type: "success",
              message: "Custom Field deleted successfully",
              duration: 5000,
            });
            cutomFieldData.value = cutomFieldData.value.filter(
              (Items) => Items.id !== id
            );
          })
          .catch((err) => {
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
      } else {
        if (cutomFieldData.value.length > 1) {
          cutomFieldData.value.splice(index, 1);
        } else {
          ElMessage({
            type: "error",
            showClose: true,
            message: "Cannot Delete, You must have at least one field",
            duration: 5000,
          });
        }
      }
    };
    let url = ref("");
    const chooseFile = (e) => {
      selectedImage.value = "";
      console.log(e);
      if (e.raw.type.includes("image")) {
        selectedImage.value = e.raw;
        url.value = URL.createObjectURL(selectedImage.value);
        fileImage.value = true;
        console.log(selectedImage.value, "hhhhh");
      } else {
        fileImage.value = false;
      }
    };
    // let url = ref("");
    // const chooseFile = (e) => {
    //     selectedImage.value = ""
    //     selectedImage.value = e;
    //     console.log(selectedImage.value,'lkkk');
    // };

    const handleRemove = () => {
      selectedImage.value = "";
    };

    const getBanks = () => {
      axios
        .get("/api/Financials/GetBanks")
        .then((res) => {
          nigerianBanks.value = res.data;
          if (route.params.id)  getSingleForm();
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getBanks();

    const filteredBanks = computed(() => {
      if (!bankSearchText.value) return nigerianBanks.value;
      return nigerianBanks.value.filter((i) =>
        i.name.toLowerCase().includes(bankSearchText.value.toLowerCase())
      );
    });

    const setBank = (item) => {
      bankSearchText.value = item.name;
      selectedBank.value = item;
    };

    const resolveCustomerDetail = async () => {
      accountResolving.value = true;

      try {
        let { data } = await axio.post(
          `https://api.ravepay.co/flwv3-pug/getpaidx/api/resolve_account`,
          {
            recipientaccount: accountNumber.value,
            destbankcode: selectedBank.value.code,
            PBFPubKey: process.env.VUE_APP_FLUTTERWAVE_PUBLIC_KEY_LIVE,
          }
        );
        accountName.value = data.data.data.accountname;

        accountResolving.value = false;

        if (data.data.data.responsemessage.toLowerCase().includes("sorry")) {
          ElMessage({
            type: "warn",
            message: data.data.data.responsemessage,
            duration: 8000,
          });
        } else {
          ElMessage({
            type: "success",
            message: "Account Check Successful",
            duration: 8000,
          });
        }
      } catch (error) {
        finish();
        console.log(error);

        accountResolving.value = false;

        if (!accountNumber.value || accountNumber.value === "") {
          ElMessage({
            type: "warn",
            message: "No account number found",
            duration: 4000,
          });
        } else {
          ElMessage({
            type: "error",
            message: "Please check your banks details again",
            duration: 4000,
          });
        }
      }
    };

    const dateUpdated = ref("");
    const getSingleForm = async () => {
      try {
        const { data } = await axios.get(
          `/api/Forms/getsingleform?Id=${route.params.id}`
        );
        formName.value = data.name;
        description.value = data.description;
        dateUpdated.value = data.date;
        url.value = data.pictureUrl;
        emailRecipient.value = data.emailRecipient;
        specificAmount.value = data.amount;
        bankCode.value = data.paymentForm.bankCode;
        getContributionCategory(data.financialContributionID);
        accountNumber.value =
          data.paymentForm && data.paymentForm.accountNumber ? data.paymentForm.accountNumber : "";
        accountName.value =
          data.paymentForm && data.paymentForm.accountName ? data.paymentForm.accountName : "";
        (bankSearchText.value = data.paymentForm && data.paymentForm.bankCode ? nigerianBanks.value.find(
          (i) => i.code ==  data.paymentForm.bankCode 
        ).name : ''),
          (cutomFieldData.value = data.customAttributes.map((i) => {
            return {
              id: i.id,
              controlType: i.controlType,
              entityID: i.entityID,
              entityType: i.entityType,
              isRequired: i.isRequired,
              label: i.label,
              order: i.order,
              parameterValues: i && i.parameterValues ? i.parameterValues.split(",") : [],
              tenantID: i.tenantID,
            };
          }));
        if (data && data.paymentForm) {
          return (checkedYes.value = true);
        } else {
          return (checkedYes.value = false);
        }
      } catch (error) {
        console.log(error, 'error')
      }
    };
   

    const saveChip = (index) => {
      cutomFieldData.value[index].currentInput
        ? cutomFieldData.value[index].parameterValues.push(
            cutomFieldData.value[index].currentInput
          )
        : null;

      // ((dropdownList.value.indexOf(currentInput.value) === -1)) && dropdownList.value.push(currentInput.value);
      cutomFieldData.value[index].currentInput = "";
    };
    const deleteChip = (i, index) => {
      cutomFieldData.value[index].parameterValues.splice(i, 1);
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

    const getGelocation = async () => {
      try {
        const data = await axios.get(
          "https://ipgeolocation.abstractapi.com/v1/?api_key=bac6ccc8cd56499dbd1385017983a52c"
        );
        console.log(data, "hjjhjhj");
      } catch (error) {
        console.log(error);
      }
    };
    getGelocation();
    const saveCustomField = () => {
      centerDialogVisible.value = false;
    };

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

    const saveForm = async () => {
      let paymentForm = {
        accountName: accountName.value,
        bankCode: selectedBank.value && selectedBank.value.code ? selectedBank.value.code : bankCode.value,
        accountNumber: accountNumber.value,
      };

      console.log(paymentForm, 'kkk')

      const formData = new FormData();
      const formData2 = new FormData();
      formData.append("name", formName.value);
      formData.append("description", description.value);
      // formData.append("bankName", selectedBank.value.name);
      accountName.value && selectedBank.value.code && accountNumber.value
        ? formData.append("paymentFormString", JSON.stringify(paymentForm))
        : null;
      formData.append(
        "isAmountFIxed",
        paymentType.value
          ? paymentType.value
          : paymentType.value === false
          ? paymentType.value
          : ""
      );
      formData.append("amount", specificAmount.value ? specificAmount.value : "");
      formData.append(
        "financialContributionID",
        selectedContribution.value && selectedContribution.value.id
          ? selectedContribution.value.id
          : ""
      );
      formData.append("emailRecipient", emailRecipient.value);
      formData.append("picture", selectedImage.value ? selectedImage.value : "");
      formData.append("tenantID", tenantId.value);
      formData.append(
        "customAttributesString",
        JSON.stringify(
          cutomFieldData.value.map((i) => {
            return {
              parameterValues: i.parameterValues.toString(),
              controlType: i.controlType,
              label: i.label,
              isRequired: i.isRequired,
            };
          })
        )
      );

      loading.value = true;
      formData2.append("id", route.params.id);
      formData2.append("name", formName.value);
      formData2.append("description", description.value);
      formData2.append("date", dateUpdated.value);
      accountName.value  && accountNumber.value
        ? formData2.append("paymentFormString", JSON.stringify(paymentForm))
        : null;
      formData2.append(
        "isAmountFIxed",
        paymentType.value
          ? paymentType.value
          : paymentType.value === false
          ? paymentType.value
          : ""
      );
      formData2.append("amount", specificAmount.value ? specificAmount.value : "");
      formData2.append(
        "financialContributionID",
        selectedContribution.value && selectedContribution.value.id
          ? selectedContribution.value.id
          : ""
      );
      formData2.append("emailRecipient", emailRecipient.value);
      // formData2.append("pictureUrl", url.value ? url.value : selectedImage.value);
      formData2.append("picture", selectedImage.value ? selectedImage.value : "");
      formData2.append("tenantID", tenantId.value);
      formData2.append(
        "customAttributesString",
        JSON.stringify(
          cutomFieldData.value.map((i) => {
            return {
              id: i.id,
              parameterValues: i.parameterValues.toString(),
              controlType: i.controlType,
              label: i.label,
              isRequired: i.isRequired,
            };
          })
        )
      );
      if (route.params.id) {
        try {
          const { data } = await axios.put("/api/Forms/updateform", formData2);
          console.log(data);
          loading.value = false;
          ElMessage({
            type: "success",
            message: "Your Forms has been Updated successfully",
            duration: 5000,
          });
          // router.push(`/tenant/forms`)
          router.push(`/tenant/forms/view/${data.id}`);
        } catch (error) {
          loading.value = false;
          console.log(error);
        }
      } else {
        try {
          const { data } = await axios.post("/api/Forms/saveform", formData);
          console.log(data);
          loading.value = false;
          ElMessage({
            type: "success",
            message: "Your Forms has been created successfully",
            duration: 5000,
          });
          router.push(`/tenant/forms/view/${data.id}`);
        } catch (error) {
          loading.value = false;
          console.log(error);
        }
      }
    };

    return {
      formName,
      dragging,
      primarycolor,
      cutomFieldData,
      dropdownList,
      required,
      loading,
      reoderloading,
      description,
      responseType,
      centerDialogVisible,
      currentInput,
      checkedYes,
      tenantId,
      route,
      xsOnly,
      mdAndUp,
      lgAndUp,
      xlAndUp,
      selectedImage,
      fileImage,
      pledgeCategory,
      url,
      dateUpdated,
      dialogVisible,
      bankSearchText,
      emailRecipient,
      filteredBanks,
      contributionItems,
      selectedBank,
      selectedContribution,
      setBank,
      resolveCustomerDetail,
      selectContribution,
      accountNumber,
      accountResolving,
      accountName,
      nigerianBanks,
      newConItems,
      reorderCustomField,
      previewForm,
      chooseFile,
      handleRemove,
      addNewField,
      deleteItem,
      saveForm,
      checkComma,
      saveChip,
      backspaceDelete,
      deleteChip,
      saveCustomField,
      specificAmount,
      pledgeType,
      freeWill,
      specific,
      paymentType,
      bankCode
    };
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&family=Roboto:wght@100&display=swap");

* {
  font-family: Poppins;
}

.show-specific {
  background-image: linear-gradient(to top, #accbee 0%, #e7f0fd 100%);
  font-weight: bold;
}

.show-free-will {
  background-image: linear-gradient(to top, #accbee 0%, #e7f0fd 100%);
  font-weight: bold;
}

.graggable {
  cursor: move;
  /* fallback if grab cursor is unsupported */
  cursor: grab;
  cursor: -moz-grab;
  cursor: -webkit-grab;
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

.image-upload img {
  max-height: 9rem;
  object-fit: cover;
  object-position: center;
}

.font-weight {
  font-weight: 500;
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
