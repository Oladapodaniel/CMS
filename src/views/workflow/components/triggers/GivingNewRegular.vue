<template>
  <div class="container max-height px-0 scroll-div">
    <div class="row text-center dotted-border-bottom">
      <div class="col-md-12 my-3">
        <TriggerDescription
          :description="description"
          :header="'Giving - New regular giver'"
          @removetrigger="removeTrigger"
        />
      </div>
    </div>

    <div class="row mt-4">
      <div class="col-md-12">
        <label for="" class="font-weight-600"
          >Match an individual who is a member of</label
        >
      </div>
      <div class="col-md-12 mb-2">
        <el-tree-select
          v-model="data.groups"
          :data="groupMappedTree"
          :render-after-expand="false"
          check-strictly
          multiple
          show-checkbox
          check-on-click-node
          class="w-100"
          @change="groupSelected"
        />
        <!-- <MultiSelect @change="groupSelected" v-model="selectedGroups" :options="groups" optionLabel="name"  placeholder="Select groups" class="w-100"  display="chip" /> -->
      </div>
    </div>

    <div class="row mt-4">
      <div class="col-md-12">
        <label for="" class="font-weight-600">And who gave less than</label>
      </div>
      <div class="col-md-12 mb-2">
        <div class="row">
          <div class="col-3 pr-0">
            <el-input
              type="text"
              placeholder="#"
              v-model="prevNumOfTimes"
              @input="handlePrevNumOfTimes"
            />
          </div>
          <div
            class="col-8 border pl-0 text-center d-flex align-items-center justify-content-center bg-secondary"
          >
            <span>Times per month</span>
          </div>
        </div>
      </div>
    </div>

    <div class="row mt-4">
      <div class="col-md-12">
        <label for="" class="font-weight-600">For</label>
      </div>
      <div class="col-md-12 mb-2">
        <div class="row">
          <div class="col-3 pr-0">
            <el-input
              type="text"
              placeholder="#"
              v-model="prevNumOfMonths"
              @input="handlePrevNumOfMonths"
            />
          </div>
          <div
            class="col-8 border pl-0 text-center d-flex align-items-center justify-content-center bg-secondary"
          >
            <span>Months</span>
          </div>
        </div>
      </div>
    </div>

    <div class="row mt-4">
      <div class="col-md-12">
        <label for="" class="font-weight-600">To</label>
      </div>
      <div class="col-md-12 mb-2">
        <el-dropdown trigger="click" class="w-100">
          <span class="el-dropdown-link w-100">
            <div
              class="d-flex justify-content-between border-eldropdown w-100"
              size="large"
            >
              <span class="text-secondary">{{
                category && Object.keys(category).length > 0
                  ? category.name
                  : "Select category"
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
                v-for="(item, index) in contributionItems"
                :key="index"
                @click="categorySelected(item)"
                >{{ item.name }}
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>

    <div class="row mt-4">
      <div class="col-md-12">
        <label for="" class="font-weight-600">And who has given at least</label>
      </div>
      <div class="col-md-12 mb-2">
        <div class="row">
          <div class="col-3 pr-0">
            <el-input
              type="text"
              placeholder="#"
              v-model="currentNumOfTimes"
              @input="handleCurrentNumOfTimes"
            />
          </div>
          <div
            class="col-8 border pl-0 text-center d-flex align-items-center justify-content-center bg-secondary"
          >
            <span>Times per month</span>
          </div>
        </div>
      </div>
    </div>

    <div class="row mt-4">
      <div class="col-md-12">
        <label for="" class="font-weight-600">For the last</label>
      </div>
      <div class="col-md-12 mb-2">
        <div class="row">
          <div class="col-3 pr-0">
            <el-input
              type="text"
              v-model="currentNumOfMonths"
              @input="handleCurrentNumOfMonths"
              placeholder="#"
            />
          </div>
          <div
            class="col-8 border pl-0 text-center d-flex align-items-center justify-content-center bg-secondary"
          >
            <span>Months</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TriggerDescription from "../TriggerDescription.vue";
import { reactive, ref } from "@vue/reactivity";
import { computed, watchEffect } from "@vue/runtime-core";
import workflow_util from "../../utlity/workflow_util";
export default {
  props: [
    "selectedTriggerIndex",
    "contributionItems",
    "groups",
    "condition",
    "groupMappedTree",
  ],
  components: { TriggerDescription },
  emits: ["updatetrigger", "removetrigger"],
  setup(props, { emit }) {
    const data = ref({});

    const selectedGroups = ref([]);
    const groupSelected = (e) => {
      // const allGroupsIndex = selectedGroups.value.findIndex(i => i.id === "00000000-0000-0000-0000-000000000000");
      // data.groups = allGroupsIndex < 0 ? e.value.map(i => i.id).join(',') : "00000000-0000-0000-0000-000000000000";
      emit("updatetrigger", JSON.stringify(data.value), props.selectedTriggerIndex);
    };

    const prevNumOfTimes = ref("");
    const handlePrevNumOfTimes = () => {
      data.value.gaveTimes = prevNumOfTimes.value;
      emit("updatetrigger", JSON.stringify(data.value), props.selectedTriggerIndex);
    };

    const prevNumOfMonths = ref("");
    const handlePrevNumOfMonths = (e) => {
      data.value.gaveMonth = prevNumOfMonths.value;
      emit("updatetrigger", JSON.stringify(data.value), props.selectedTriggerIndex);
    };

    const category = ref({});
    const categorySelected = (item) => {
      category.value = item;
      data.value.financialContributionID = item.id;
      emit("updatetrigger", JSON.stringify(data.value), props.selectedTriggerIndex);
    };

    const currentNumOfTimes = ref("");
    const handleCurrentNumOfTimes = () => {
      data.value.givenAtLeastTimes = currentNumOfTimes.value;
      emit("updatetrigger", JSON.stringify(data.value), props.selectedTriggerIndex);
    };

    const currentNumOfMonths = ref("");
    const handleCurrentNumOfMonths = () => {
      data.value.givenForTheLastMonth = currentNumOfMonths.value;
      emit("updatetrigger", JSON.stringify(data.value), props.selectedTriggerIndex);
    };

    const description = computed(() => {
      return {
        groups: selectedGroups.value
          ? selectedGroups.value.map((i) => i.name)
          : ["_____"],
        prevTimes: prevNumOfTimes.value ? prevNumOfTimes.value + " times" : "__ times",
        prevMonths: prevNumOfMonths.value
          ? prevNumOfMonths.value + " months"
          : "__ months",
        category: category.value && category.value.name ? category.value.name : "____",
        currentTimes: currentNumOfTimes.value
          ? currentNumOfTimes.value + " times"
          : "__ times",
        currentMonths: currentNumOfMonths.value
          ? currentNumOfMonths.value + " months"
          : "__ months",
        id: 11,
      };
    });

    const removeTrigger = () => {
      emit("removetrigger");
    };

    const parsedData = ref({});
    watchEffect(() => {
      if (props.condition.jsonCondition) {
        parsedData.value = JSON.parse(props.condition.jsonCondition);
        prevNumOfTimes.value = parsedData.value.gaveTimes;
        data.value.gaveTimes = parsedData.value.gaveTimes;

        prevNumOfMonths.value = parsedData.value.gaveMonth;
        data.value.gaveMonth = parsedData.value.gaveMonth;

        selectedGroups.value =
          props.groups.length > 0
            ? workflow_util.getGroups(parsedData.value.groups, props.groups)
            : [];

        data.value.groups = parsedData.value.groups
          ? parsedData.value.groups.split(",")
          : [];

        category.value = workflow_util.getGroup(
          parsedData.value.financialContributionID,
          props.contributionItems
        );
        data.value.financialContributionID = parsedData.value.financialContributionID;

        currentNumOfTimes.value = parsedData.value.givenAtLeastTimes;
        data.value.givenAtLeastTimes = parsedData.value.givenAtLeastTimes;

        currentNumOfMonths.value = parsedData.value.givenForTheLastMonth;
        data.value.givenForTheLastMonth = parsedData.value.givenForTheLastMonth;
      }
    });

    return {
      selectedGroups,
      groupSelected,
      handlePrevNumOfTimes,
      prevNumOfTimes,
      handlePrevNumOfMonths,
      prevNumOfMonths,
      categorySelected,
      category,
      handleCurrentNumOfTimes,
      currentNumOfTimes,
      currentNumOfMonths,
      handleCurrentNumOfMonths,
      description,
      removeTrigger,
      data,
    };
  },
};
</script>

<style scoped>
.dotted-border-bottom {
  border-bottom: dotted 2px #ddd;
}

.max-height {
  max-height: calc(100vh - 300px);
}
</style>
