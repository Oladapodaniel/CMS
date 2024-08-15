<template>
  <div class="container-wide" v-loading="loading">
    <div class="row">
      <div class="col-md-12">
        <div class="text-head font-weight-bold h2 py-0 my-0 text-black">
          Structure and hierarchy setup
        </div>
        <div @click="goBack">
          <span class="s-18 fw-400 cursor-pointer text-black">
            <img src="../../assets/goback.png" alt="" /> Go back</span
          >
        </div>
      </div>
      <!-- <div class="col-md-12 d-flex mt-3 justify-content-center">
        <div class="col-md-6">
          <div class="border-black py-3 text-center px-4 fw-400 s-20">
            Choose a level to add branch
          </div>
        </div>
      </div> -->
      <div class="col-md-12">
        <div class="row">
          <div class="col-md-6">
            <BranchSettings/>
          </div>
          <div class="col-md-6">
            <div
              class="col-md-12 mt-4 domId d-flex justify-content-center bg-gray-500 py-5 align-items-center"
              v-show="mappedBranch.length > 0"
            >
              <OrganizationChart
                :value="data1"
                :collapsible="true"
                class="company"
                selectionMode="single"
                v-model:selectionKeys="selection"
              >
                <template #person="slotProps">
                  <div class="node-content">
                    <img :src="slotProps.node.data.label.logo" width="32" />
                    <div>{{ slotProps.node.data.name }}</div>
                  </div>
                </template>
                <template #default="slotProps">
                  <span>{{
                    slotProps.node && slotProps.node.data ? slotProps.node.data.name : ""
                  }}</span>
                </template>
              </OrganizationChart>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";
import router from "../../router";
import axios from "@/gateway/backendapi";
import OrganizationChart from "primevue/organizationchart";
import BranchSettings from "../settings/BranchLevelSettings.vue";
const selection = ref({});
const data1 = ref({});
const branchChatDetail = ref([]);
const getAverageIncomeChart = ref([]);
const getAverageAttendanceItem = ref([]);
const averageIncomeChartResult = ref([]);
const mappedBranch = ref([]);
const series = ref([]);
const loading = ref(false);
const networkError = ref(false);

const goBack = () => {
  router.go(-1);
};

const getFirtTimerSeris = () => {
  branchChatDetail.value.forEach((i) => {
    let serviceIndex = Object.keys(i).findIndex((i) => i === "name");
    let serviceValue = Object.values(i)[serviceIndex];

    series.value.unshift(serviceValue);
  });
};

const averageIncomeChart = (array, key) => {
  // Accepts the array and key
  // Return the end result
  averageIncomeChartResult.value = [];
  let result = array.reduce((result, currentValue) => {
    // If an array already present for key, push it to the array. Else create an array and push the object
    (result[currentValue[key]] = result[currentValue[key]] || []).push(currentValue);
    return result;
  }, []); // empty object is the initial value for result object
  for (const prop in result) {
    averageIncomeChartResult.value.push({
      name: prop,
      value: result[prop].length,
    });
  }
};
const getBranchChartDetail = async () => {
  loading.value = true;

  try {
    let { data } = await axios.get("/api/Branching");
    console.log(data, "kkkk");
    branchChatDetail.value = data.returnObject;
    getAverageIncomeChart.value = data.returnObject.map((i) => ({
      name: i.name,
      value: i.currentYearAverageIncome,
    }));
    getAverageAttendanceItem.value = data.returnObject.map((i) => ({
      name: i.name,
      value: i.currentYearAverageAttendance,
    }));
    mappedBranch.value = branchChatDetail.value.map((i) => {
      return {
        mainID: i.id,
        data: { name: i.name, avatar: i.logo, label: "CEO" },
        parent: i.parentID,
        styleClass: "p-person",
      };
    });
    let matchedValues = [];

    const allIDs = mappedBranch.value.map((i) => i.mainID);
    let sum = 0;
    allIDs.forEach((i) => {
      mappedBranch.value.forEach((j, ind) => {
        if (i == j.parent) {
          j.id = ind;
          j.parentid = sum;
          matchedValues.push(j);
        }
      });
      sum++;
    });
    const unflatten = function (array, parent, tree) {
      tree = typeof tree !== "undefined" ? tree : [];
      parent = typeof parent !== "undefined" ? parent : { id: 0 };
      var children = _.filter(array, function (child) {
        return child.parentid == parent.id;
      });
      if (!_.isEmpty(children)) {
        if (parent.id == 0) {
          tree = children;
        } else {
          parent["children"] = children;
        }
        _.each(children, function (child) {
          unflatten(array, child);
        });
      }
      return tree;
    };
    let treeConstruted = unflatten(matchedValues);
    const HQ = branchChatDetail.value.find((i) => i.parentID.includes("00000000-000"));
    const belowHQ = branchChatDetail.value[0];
    let treeData = {
      key: "0",
      type: "person",
      styleClass: "p-hq",
      data: {
        label: HQ ? HQ : belowHQ,
        name: HQ && HQ.name ? HQ.name : belowHQ.name,
        avatar: HQ && HQ.logo ? HQ.logo : belowHQ.logo,
      },
      children: treeConstruted,
    };
    data1.value = treeData;
    getFirtTimerSeris();
    averageIncomeChart(data.returnObject, "currentYearAverageIncome");
    loading.value = false;
  } catch (error) {
    console.log(error, "sssddsd");
    loading.value = false;
    networkError.value = true;
    if (error.toString().toLowerCase().includes("network error")) {
      networkError.value = true;
    } else {
      networkError.value = false;
    }
  }
};
getBranchChartDetail();
</script>
