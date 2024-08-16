<template>
  <div class="container-wide my-5">
    <div class="row mt-4">
      <div class="col-md-12">
        <div class="text-head font-weight-bold h2 py-0 my-0 text-black">
          Structure and hierarchy setup
        </div>
        <div @click="goBack">
          <span class="s-18 fw-400 cursor-pointer text-black">
            <img src="../../../assets/goback.png" alt="" /> Go back
          </span>
        </div>
      </div>

      <!-- Left Section: Add Branch Level -->
      <div class="col-md-6 px-0 mt-4">
        <div class="car p-4">
          <h5 class="mb-3">Add Branch Level</h5>
          <el-input
            type="text"
            v-model="newBranch"
            class="w-100 mb-3 branch-input"
            placeholder="Enter branch level"
            @input="handleInput"
          />
          <el-button round color="#000000" class="w-100 mb-4 py-4" @click="addBranch">
            Add level
          </el-button>
          <p class="mt-4 text-dak text-center s-16 fw-400">
            After you have successfully added branch level(s), click on <br />
            the button below to <span class="font-weight-bold">add new branch</span>.
          </p>
        </div>
      </div>

      <!-- Right Section: Branch Level Preview -->
      <div class="col-md-6 mt-4">
        <div class="card p-4 h-100 branch-preview-card">
          <h5 class="mb-3 w-100 text-center">Branch Level preview</h5>
          <ul class="branch-list row">
            <li
              class="col-md-12 justify-content-center d-flex"
              v-for="(branch, index) in branches"
              :key="index"
            >
              <div class="col-md-4 d-flex align-items-center">
                <div class="w-100">
                  <div class="hierarchy text-center w-100 px-4 py-3">
                    <span>{{ branch }}</span>
                  </div>
                  <div class="w-100 d-flex justify-content-center">
                    <el-icon :size="25"><Bottom /></el-icon>
                  </div>
                </div>
                <div class="d-flex ml-3" v-if="index !== 0" @click="removeBranch(index)">
                  <el-icon :size="25"><Delete /></el-icon>
                </div>
                <div class="d-flex ml-3 mr-4" v-if="index == 0"></div>
              </div>
            </li>
            <li v-if="tempBranch" class="col-md-12 justify-content-center d-flex">
              <div class="col-md-4 d-flex align-items-center">
                <div class="w-100 d-flex">
                  <div class="hierarchy text-center w-100 px-4 py-3">
                    <span>{{ tempBranch }}</span>
                  </div>
                  <div class="d-flex ml-3" @click="removeTempData">
                    <el-icon :size="25"><Delete /></el-icon>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <div class="col-md-12 d-flex justify-content-center mt-4">
        <div class="col-md-5 mt-4">
          <el-button
            @click="saveBranch"
            round
            size="large"
            class="text-white w-100 py-4 primary-bg"
          >
            <span class="s-14">Save & Add new Branch</span>
          </el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import router from "../../../router";
import axios from "@/gateway/backendapi";
import { ElMessage } from "element-plus";
import finish from "../../../services/progressbar/progress";

const goBack = () => {
  router.go(-1);
};

// State for new branch level
const newBranch = ref("");
const tempBranch = ref("");
const loading = ref(false);
const branchList = ref([]);

// State to hold branch levels
const branches = ref(["HQ"]);

// Function to add a branch level
const addBranch = () => {
  if (tempBranch.value.trim() !== "") {
    branches.value.push(tempBranch.value);
    tempBranch.value = ""; // Clear temporary branch
  }
};

const removeTempData = () => {
    tempBranch.value = ""
}
const getBranchCycles = async () => {
      try {
        loading.value = true;
        const { data } = await axios.get("/branching/hierarchies");
        branchList.value = data.returnObject
          .map((item, index) => {
            item.index = index;
            return item;
          })
          .sort((a, b) => a.level - b.level);
        loading.value = false;
        console.log(branchList.value, 'hhh');
        
      } catch (error) {
        console.log(error);
      }
    }
    getBranchCycles()
const saveBranch = async () => {
    let mappedLevel = branchList.value.map((i) => i.level);
      const maxLevel =
        mappedLevel.length > 0 ? Math.max.apply(null, mappedLevel) + 1 : 0;
      try {
        let createBranchLevel = {
          name: newBranch.value,
          level: maxLevel,
        };
        let branching = await axios.post(
          "/branching/newhierarchy",
          createBranchLevel
        );
        console.log(branching);
        getBranchCycles();
        newBranch.value = "";
        ElMessage({
          type: "success",
          message: "Branch Save Successfully",
          duration: 5000,
        });
        router.push('/tenant/branch/addbranch')
      } catch (error) {
        finish();
        console.log(error);
      }
}

// Function to handle input and create a temporary branch
const handleInput = () => {
  tempBranch.value = newBranch.value;
};

// Function to remove a branch level
const removeBranch = (index) => {
  branches.value.splice(index, 1);
};
</script>

<style scoped>
.go-back {
  color: black;
  text-decoration: none;
}

.add-branch-card,
.branch-preview-card {
  background-color: #f3f3f3;
  border-radius: 10px;
}

.branch-list {
  list-style-type: none;
  padding-left: 0;
}

.branch-list li {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 10px;
}

.hierarchy {
  background: #bdbdbd;
}
</style>
