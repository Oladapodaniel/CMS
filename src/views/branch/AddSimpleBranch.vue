<template>
  <div class="container-wide container-top">
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-8">
          <div class="text-head font-weight-bold h2 py-0 my-0 text-black">
            Add new branch
          </div>
          <div @click="goBack">
            <span class="s-18 fw-400 cursor-pointer text-black">
              <img src="../../assets/goback.png" alt="" /> Go back</span
            >
          </div>
          <div class="row my-2 mt-2">
            <div class="col-md-10 offset-md-2">
              <div class="row">
                <div class="col-md-4 text-md-right align-self-center">
                  <label for="" class="fw-500 text-head s-18 text-dak"
                    >Branch name <sup class="text-danger">*</sup>
                  </label>
                </div>

                <div class="col-md-8">
                  <el-input
                    type="text"
                    v-model="churchName"
                    class="w-100"
                    :class="{ 'is-invalid': !isNameValid }"
                    @blur="checkNameValue"
                  />
                  <div class="invalid-feedback">Please enter branch name.</div>
                </div>
              </div>
            </div>
          </div>
          <div class="row my-1 mt-3">
            <div class="col-md-10 offset-md-2">
              <div class="row">
                <div class="col-md-4 text-md-right align-self-center">
                  <label for="" class="fw-500 text-head s-18 text-dak">Address </label>
                </div>

                <div class="col-md-8">
                  <el-input
                    type="text"
                    v-model="Address"
                    placeholder="Address"
                    class="w-100"
                  />
                </div>
              </div>
            </div>
          </div>
          <!-- <div class="row my-1 mt-3">
            <div class="col-md-10 offset-md-2">
              <div class="row">
                <div class="col-md-4 text-md-right align-self-center">
                  <label for="" class="fw-500 text-head s-18 text-dak"
                    >Parent Branch <sup class="text-danger">*</sup>
                  </label>
                </div>
                <div class="col-md-8">
                  <el-tree-select
                    v-model="value"
                    class="w-100"
                    :data="branches"
                    :check-strictly="false"
                    :render-after-expand="false"
                  />
                </div>
              </div>
            </div>
          </div> -->
          <div class="row my-1 mt-3">
            <div class="col-md-10 offset-md-2">
              <div class="col-12 mb-4 mt-5">
                <div class="text-head font-weight-600 h3 py-0 my-0 text-black">
                  Pastor's information
                </div>
              </div>
              <div class="row">
                <div class="col-md-4 text-md-right align-self-center">
                  <label for="" class="fw-500 text-head s-18 text-dak"
                    >Pastor's name
                  </label>
                </div>

                <div class="col-md-8">
                  <el-input
                    type="text"
                    v-model="pastorName"
                    placeholder="Pastor's name"
                    class="w-100"
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="row my-1 mt-3">
            <div class="col-md-10 offset-md-2">
              <div class="row">
                <div class="col-md-4 text-md-right align-self-center">
                  <label for="" class="fw-500 text-head s-18 text-dak"
                    >Email <sup class="text-danger">*</sup>
                  </label>
                </div>

                <div class="col-md-8">
                  <el-input
                    type="text"
                    v-model="pastorEmail"
                    placeholder="email"
                    class="w-100"
                    :class="{ 'is-invalid': !isEmailValid }"
                    @blur="checkEmailValue"
                  />
                  <div class="invalid-feedback">Please enter your email.</div>
                </div>
              </div>
            </div>
          </div>
          <div class="row my-1 mt-3">
            <div class="col-md-10 offset-md-2">
              <div class="row">
                <div class="col-md-4 text-md-right align-self-center">
                  <label for="" class="fw-500 text-head s-18 text-dak"
                    >Pastor phone
                  </label>
                </div>

                <div class="col-md-8">
                  <el-input
                    type="text"
                    v-model="pastorPhone"
                    placeholder="Phone number"
                    class="w-100"
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="row my-1 mt-3">
            <div class="col-md-10 offset-md-2">
              <div class="col-12 mb-4 mt-5">
                <div class="text-head font-weight-600 h3 py-0 my-0 text-black">
                  Login Credentials
                </div>
              </div>
              <div class="row">
                <div class="col-md-4 text-md-right align-self-center">
                  <label for="" class="fw-500 text-head s-18 text-dak">Email </label>
                </div>

                <div class="col-md-8">
                  <el-input
                    type="text"
                    v-model="emailAddress"
                    placeholder="email"
                    class="w-100"
                    :class="{ 'is-invalid': !isEmailValid }"
                    @blur="checkLoginEmail"
                  />
                  <div class="invalid-feedback">Please enter your email.</div>
                </div>
              </div>
            </div>
          </div>
          <div class="row my-1 mt-3">
            <div class="col-md-10 offset-md-2">
              <div class="row">
                <div class="col-md-4 text-md-right align-self-center">
                  <label for="" class="fw-500 text-head s-18 text-dak"
                    >Password <sup class="text-danger">*</sup>
                  </label>
                </div>

                <div class="col-md-8">
                  <el-input
                    type="password"
                    placeholder="*******"
                    v-model="password"
                    class="w-100"
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="row my-1 mt-3">
            <div class="col-md-10 offset-md-2">
              <div class="row">
                <div class="col-md-4 text-md-right align-self-center">
                  <label for="" class="fw-500 text-head s-18 text-dak"
                    >Confirm Password
                  </label>
                </div>

                <div class="col-md-8">
                  <el-input
                    type="password"
                    placeholder="*******"
                    v-model="confirmPassword"
                    :class="{ 'is-invalid': !errorMessage }"
                    @input="checkPassword"
                    class="w-100"
                  />
                  <div v-if="password !== confirmPassword" class="text-danger small">
                    Passwords do not match. Please try again
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-md-10 offset-md-2">
              <div class="row">
                <div class="col-4"></div>
                <div class="col-8">
                  <div class="row">
                    <div class="col-md-6 mt-2">
                      <el-checkbox v-model="replicateAttendance" />
                      <!-- <Checkbox
                          id="binary"
                          v-model="replicateAttendance"
                          :binary="true"
                        /> -->
                      Replicate attendance
                    </div>
                    <div class="col-md-6 mt-2">
                      <el-checkbox v-model="replicateFinancial" />
                      <!-- <Checkbox
                          id="binary"
                          v-model="replicateFinancial"
                          :binary="true"
                        /> -->
                      Replicate financial
                    </div>
                    <div class="col-md-6 mt-2">
                      <el-checkbox v-model="replicateEvent" />
                      <!-- <Checkbox
                          id="binary"
                          v-model="replicateEvent"
                          :binary="true"
                        /> -->
                      Replicate event
                    </div>
                    <div class="col-md-6 mt-2">
                      <el-checkbox v-model="replicateGroup" />
                      <!-- <Checkbox
                          id="binary"
                          v-model="replicateGroup"
                          :binary="true"
                        /> -->
                      Replicate group
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="image-div other">
            <div class="grey-bg">
              <div>
                <div class="person-img">
                  <img
                    v-if="!url"
                    src="../../assets/people/phone-import.svg"
                    alt="Uploaded Image"
                  />
                  <img
                    v-else
                    :src="url"
                    alt="Uploaded Image"
                    style="
                      width: 110px;
                      height: 110px;
                      border-radius: 50%;
                      object-fit: cover;
                    "
                  />
                </div>
              </div>
              <div>
                <div class="cs-input">
                  <label for="imgUpload" class="choose-file">
                    Choose image
                    <input
                      type="file"
                      class="input rounded file-input"
                      placeholder=""
                      id="imgUpload"
                      @change="imageSelected"
                    />
                  </label>
                </div>
              </div>

              <!-- <div>
                          <button
                              class="upload-btn outline-none"
                              @click.prevent="uploadImage"
                          >
                              Upload
                          </button>
                          </div> -->
            </div>
          </div>
          <!-- <div class="container-fluid hierarchy-bg rounded">
            <div class="header-color mt-2">
              <h4>Hierarchical Flow</h4>
            </div>

            <div class="content">
              <div class="next-item" v-if="hierarchies[0]">
                {{ hierarchies[0].name }}
              </div>
              <div v-for="(item, index) in hierarchies" :key="index">
                <div class="d-flex" v-if="index > 0">
                  <span :class="`ml-${index + 1}`" class="border-style"></span>
                  <span class="mt-4 ml-1 d-flex"
                    ><el-icon class="mt-2 px-0 ml-0 mr-1 primary--text">
                      <ArrowRightBold /> </el-icon
                    >{{ item.name }}</span
                  >
                </div>
              </div>
            </div>
          </div> -->
        </div>
        <!-- <div class="row my-1 pt-4"> -->
        <div class="col-md-6 offset-md-3 mt-4">
          <div class="row d-flex flex-column align-items-center justify-content-center">
            <div class="mt-4 col-md-7">
              <el-button
                :loading="loading"
                :color="primarycolor"
                round
                size="large"
                class="w-100 border-0 py-4 text-white"
                @click="addBranch"
              >
                <span class="fw-400">Save</span>
              </el-button>
            </div>
            <div class="mt-3 col-md-7">
              <el-button
                class="w-100 border-0 py-4"
                @click="generateCodeModal"
                round
                color="#333434"
                size="large"
              >
                <span class="fw-400 text-white">Generate Branch Code</span>
              </el-button>
            </div>
            <div class="mt-2 col-md-7">
              <el-button class="w-100" round size="large border-0" data-dismiss="modal"
                ><span class="fw-400 text-dak">Cancel</span></el-button
              >
            </div>
          </div>
        </div>
        <!-- </div>  -->
      </div>
    </div>
  </div>
  <!-- Generate Join Branch Code Modal -->
  <el-dialog
    v-model="displayModal"
    :width="mdAndUp || lgAndUp || xlAndUp ? `50%` : `90%`"
    align-center
    class="border-radius-20"
  >
    <div class="row">
      <div class="col-md-12 pr-2">
        <div class="row justify-content-center">
          <div class="col-md-10">
            <div class="row">
              <div class="col-md-12 text-center">
                <h4 class=" text-dak fw-500" id="codemodalModalLabel">
                  Generate your branch code
                </h4>
              </div>
              <div class="col-md-12 s-18 fw-300 text-dak text-center mb-3">
                Select the branch level you want your code to be generated with, then copy
                the generated code.
              </div>

              <div class="col-md-12 mt-2">
                <el-tree-select
                  v-model="value"
                  class="w-100"
                  :data="branches"
                  :check-strictly="false"
                  :render-after-expand="false"
                />
              </div>
              <div class="col-md-12 d-flex justify-content-center">
                <div class="col-md-6 mt-3">
                  <el-button
                    round
                    :color="primarycolor"
                    :loading="loadingCode"
                    size="large"
                    class="mt-2 w-100 mb-3 py-4 text-white c-pointer border-0 text-center"
                    @click="generateCode"
                  >
                    <span class="fw-400 s-15">Generate</span>
                  </el-button>
                </div>
              </div>
              <div class="col-md-12 d-flex mb-3" v-if="requestedCode">
                <el-input
                  type="text"
                  class="w-100"
                  placeholder="Heres your code"
                  :value="requestedCode"
                  ref="code"
                  aria-describedby="basic-addon1"
                />
                <div class="input-group-prepend">
                  <span
                    class="input-group-text c-pointer"
                    id="basic-addon1"
                    @click="copyCode"
                  >
                    <el-icon>
                      <CopyDocument />
                    </el-icon>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </el-dialog>
</template>

<script>
import axios from "@/gateway/backendapi";
import { ref, inject } from "vue";
import deviceBreakpoint from "../../mixins/deviceBreakpoint";
import router from "../../router";
import store from "../../store/store";
import { ElMessage } from "element-plus";
export default {
  setup() {
    const primarycolor = inject("primarycolor");
    const churchName = ref("");
    const Address = ref("");
    const selectedLevel = ref("");
    const pastorName = ref("");
    const pastorEmail = ref("");
    const pastorPhone = ref("");
    const emailAddress = ref("");
    const password = ref("");
    const confirmPassword = ref("");
    const hierarchies = ref([]);
    const url = ref("");
    const image = ref("");
    const memberToEdit = ref("");
    const branches = ref([]);
    const replicateAttendance = ref(true);
    const replicateFinancial = ref(true);
    const replicateEvent = ref(true);
    const replicateGroup = ref(true);
    const requestedCode = ref("");
    const code = ref(null);
    const isoCode = ref("");
    const loading = ref(false);
    const loadingCode = ref(false);
    const { mdAndUp, lgAndUp, xlAndUp, xsOnly } = deviceBreakpoint();
    const value = ref(null);
    const branchValue = ref(null);
    const isNameValid = ref(true);
    const displayModal = ref(false);
    const isEmailValid = ref(true);
    const errorMessage = ref(true);

    const goBack = () => {
      router.go(-1);
    };

    const imageSelected = (e) => {
      image.value = e.target.files[0];
      url.value = URL.createObjectURL(image.value);
    };
    const getHierarchies = async () => {
      try {
        let { data } = await axios.get("/branching/hierarchies");
        hierarchies.value = data.returnObject;
      } catch (err) {
        console.log(err);
      }
    };
    getHierarchies();
    const generateCodeModal = () => {
      displayModal.value = true;
    };
    const getAllBranchList = async () => {
      try {
        axios
          .get("/api/Branching/hierarchieswithbranches")
          .then((res) => {
            branches.value = res.data.returnObject.map((i) => {
              return {
                label: i.name,
                value: i.id,
                children: i.teanants
                  ? i.teanants.map((j) => {
                      return {
                        label: j.name,
                        value: j.id,
                      };
                    })
                  : "",
              };
            });
          })
          .catch((err) => console.log(err));
      } catch (err) {
        console.log(err);
      }
    };
    getAllBranchList();

    if (store.getters.currentUser && store.getters.currentUser.isoCode) {
      isoCode.value = store.getters.currentUser.isoCode;
    } else {
      axios
        .get("/api/Membership/GetCurrentSignedInUser")
        .then((res) => {
          isoCode.value = res.data.isoCode;
        })
        .catch((err) => console.log(err));
    }

    const addBranch = async () => {
      // if (password.value !== confirmPassword.value) {
      const formData = new FormData();
      formData.append("churchName", churchName.value ? churchName.value : "");
      formData.append("address", Address.value ? Address.value : "");
      formData.append("parentID", value.value ? value.value : "");
      formData.append("pastorName", pastorName.value ? pastorName.value : "");
      formData.append("email", pastorEmail.value ? pastorEmail.value : "");
      formData.append("emailAddress", emailAddress.value ? emailAddress.value : "");
      formData.append("password", password.value ? password.value : "");
      formData.append("pastorPhone", pastorPhone.value ? pastorPhone.value : "");
      formData.append("image", image.value ? image.value : "");
      formData.append("duplicateAttendances", replicateAttendance.value);
      formData.append("duplicateFinancials", replicateFinancial.value);
      formData.append("duplicateEvents", replicateEvent.value);
      formData.append("duplicateGroups", replicateGroup.value);
      try {
        console.log(formData, "ghhgh");

        loading.value = true;
        let { data } = await axios.post("/api/Branching", formData);
        loading.value = false;
        displayModal.value = false;

        let SMSBody = {
          category: "",
          contacts: [],
          emailAddress: "",
          emailDisplayName: "",
          gateWayToUse: "hybridKonnect",
          groupedContacts: [],
          isPersonalized: true,
          isoCode: isoCode.value,
          message: `YOU HAVE BEEN ADDED AS A BRANCH ON CHURCHPLUS, \n You are on the right place and track, take control of your ministry, know the key information that will help you make better decision and become an effective manager. Use your credentials below to login and get started now \n Email: ${pastorEmail.value} \n Password: Branch@123 please do well to change your password after you login`,
          toOthers: pastorPhone.value,
        };
        if (data.status) {
          axios
            .post("/api/Messaging/sendSms", SMSBody)
            .then((res) => console.log(res))
            .catch((err) => console.log(err));
          ElMessage({
            type: "success",
            message: data.message,
            duration: 5000,
          });
          setTimeout(() => {
            router.push("/tenant/branch/branchdashboard");
            // router.push("/tenant/branch/mainbranchsummary");
            // router.push("/tenant/branch/branchsummary");
          }, 3000);
        }
      } catch (err) {
        let resData = err.response.data.Message;
        ElMessage({
          type: "error",
          message: resData,
        });
        loading.value = false;
      }
      // }
      // else {
      //   ElMessage({
      //     type: "warning",
      //     message:
      //       "Passwords do not match. Please try again.",
      //     duration: 5000,
      //   });
      // }
    };

    const generateCode = async () => {
      let getHierarchyId = branches.value.find((i) => {
        return i.children.some((j) => j.value == value.value);
      });
      let body = {
        parentId: value.value,
        hierarchyID: getHierarchyId.value,
      };
      loadingCode.value = true;
      try {
        let { data } = await axios.post("/api/Branching/requestcode", body);
        loadingCode.value = false;
        requestedCode.value = data.code;
        ElMessage({
          type: "success",
          message: "Code generated successfully, you can copy to share to the branch",
          duration: 5000,
        });
      } catch (err) {
        console.log(err);
        loadingCode.value = false;
      }
    };

    const copyCode = () => {
      code.value.input.select();
      code.value.input.setSelectionRange(
        0,
        code.value.input.value.length
      ); /* For mobile devices */

      /* Copy the text inside the text field */
      document.execCommand("copy");
      ElMessage({
        type: "success",
        message: "Code copied to your clipboard",
        duration: 5000,
      });
    };

    const checkNameValue = () => {
      if (churchName.value.length == 0) {
        isNameValid.value = false;
      } else {
        isNameValid.value = true;
      }
    };

    const checkEmailValue = () => {
      if (pastorEmail.value.length == 0) {
        isEmailValid.value = false;
      } else {
        isEmailValid.value = true;
      }
    };
    const checkLoginEmail = () => {
      if (emailAddress.value.length == 0) {
        isEmailValid.value = false;
      } else {
        isEmailValid.value = true;
      }
    };
    const checkPassword = () => {
      if (password.value !== confirmPassword.value) {
        errorMessage.value = true;
      } else {
        errorMessage.value = false;
      }
    };

    return {
      addBranch,
      churchName,
      Address,
      selectedLevel,
      pastorName,
      pastorEmail,
      pastorPhone,
      emailAddress,
      password,
      confirmPassword,
      imageSelected,
      url,
      image,
      memberToEdit,
      branches,
      replicateAttendance,
      replicateFinancial,
      replicateEvent,
      replicateGroup,
      value,
      branchValue,
      generateCode,
      generateCodeModal,
      checkPassword,
      checkLoginEmail,
      displayModal,
      requestedCode,
      hierarchies,
      primarycolor,
      errorMessage,
      code,
      mdAndUp,
      lgAndUp,
      xlAndUp,
      xsOnly,
      copyCode,
      isoCode,
      loading,
      loadingCode,
      goBack,
      checkNameValue,
      isNameValid,
      isEmailValid,
      checkEmailValue,
    };
  },
};
</script>

<style scoped>
.heading-text {
  font: normal normal 800 1.5rem Nunito sans;
}

.border-style {
  border-left: 1px solid #132acd;
  border-bottom: 1px solid #132acd;
  margin-top: 10px;
  height: 2rem !important;
  width: 2rem !important;
}

.header-color {
  color: #a4a5a7;
}

.hierarchy-bg {
  background: #f9f9f9;
  overflow-x: scroll;
}

.next-item {
  font-weight: bolder;
  /* border: none !important; */
}

.content {
  padding: 1em;
}
</style>
