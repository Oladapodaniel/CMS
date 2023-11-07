<template>
  <div class="container max-height px-0 scroll-div">
    <div class="row text-center dotted-border-bottom">
      <div class="col-md-12 my-3">
        <TriggerDescription
          :header="'Giving - No longer giving'"
          :description="description"
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
          @change="handleSelectedGroups"
        />
      </div>
    </div>

    <div class="row mt-4">
      <div class="col-md-12">
        <label for="" class="font-weight-600">And who gave at least</label>
      </div>
      <div class="col-md-12 mb-2">
        <div class="row">
          <div class="col-3 pr-0">
            <el-input
              type="text"
              v-model.number="givenAtLeastTimes"
              @input="handleGivenAtLeastTimes"
              placeholder="#"
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
              v-model.number="givenForTheLastMonth"
              @input="handleGivenForTheLastMonth"
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
                financialContribution && Object.keys(financialContribution).length > 0
                  ? financialContribution.name
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
                @click="handleFinancialContribution(item)"
                >{{ item.name }}
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>

    <div class="row mt-4 mb-3">
      <div class="col-md-12">
        <label for="" class="font-weight-600">And who has not given for the last</label>
      </div>
      <div class="col-md-12 mb-2">
        <div class="row">
          <div class="col-3 pr-0">
            <el-input
              type="text"
              placeholder="#"
              v-model.number="notGivenForTheLastMonth"
              @input="handleNotGivenForTheLastMonth"
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
  components: { TriggerDescription },
  props: [
    "groups",
    "contributionItems",
    "selectedTriggerIndex",
    "condition",
    "groupMappedTree",
  ],
  emits: ["updatetrigger", "removetrigger"],
  setup(props, { emit }) {
    const data = ref({});

    const selectedGroups = ref([]);
    const handleSelectedGroups = () => {
      emit("updatetrigger", JSON.stringify(data.value), props.selectedTriggerIndex);
    };

    const givenAtLeastTimes = ref([]);
    const handleGivenAtLeastTimes = () => {
      data.value.givenAtLeastTimes = givenAtLeastTimes.value;
      emit("updatetrigger", JSON.stringify(data.value), props.selectedTriggerIndex);
    };

    const givenForTheLastMonth = ref([]);
    const handleGivenForTheLastMonth = () => {
      data.value.givenForTheLastMonth = givenForTheLastMonth.value;
      emit("updatetrigger", JSON.stringify(data.value), props.selectedTriggerIndex);
    };

    const financialContribution = ref({});
    const handleFinancialContribution = (item) => {
      financialContribution.value = item;
      data.value.financialContributionID = item.id;
      emit("updatetrigger", JSON.stringify(data.value), props.selectedTriggerIndex);
    };

    const notGivenForTheLastMonth = ref();
    const handleNotGivenForTheLastMonth = () => {
      data.value.notGivenForTheLastMonth = notGivenForTheLastMonth.value;
      emit("updatetrigger", JSON.stringify(data.value), props.selectedTriggerIndex);
    };

    const description = computed(() => {
      return {
        id: 2,
        groups:
          selectedGroups.value && selectedGroups.value.length > 0
            ? selectedGroups.value.map((i) => i.name)
            : ["_____"],
        givenAtLeastTimes: givenAtLeastTimes.value ? givenAtLeastTimes.value : "____",
        givenForTheLastMonth: givenForTheLastMonth.value
          ? givenForTheLastMonth.value
          : "____",
        category: financialContribution.value ? financialContribution.value.name : "____",
        notGivenForTheLastMonth: notGivenForTheLastMonth.value
          ? notGivenForTheLastMonth.value
          : "____",
      };
    });

    const removeTrigger = () => {
      emit("removetrigger");
    };

    const parsedData = ref({});
    watchEffect(() => {
      if (props.condition.jsonCondition) {
        parsedData.value = JSON.parse(props.condition.jsonCondition);
        givenAtLeastTimes.value = parsedData.value.givenAtLeastTimes;
        data.value.givenAtLeastTimes = parsedData.value.givenAtLeastTimes;

        givenForTheLastMonth.value = parsedData.value.givenForTheLastMonth;
        data.value.givenForTheLastMonth = parsedData.value.givenForTheLastMonth;

        selectedGroups.value =
          props.groups.length > 0
            ? workflow_util.getGroups(parsedData.value.groups, props.groups)
            : [];
        data.value.groups = parsedData.value.groups
          ? parsedData.value.groups.split(",")
          : [];

        financialContribution.value = workflow_util.getGroup(
          parsedData.value.financialContributionID,
          props.contributionItems
        );
        data.value.financialContributionID = parsedData.value.financialContributionID;

        notGivenForTheLastMonth.value = parsedData.value.notGivenForTheLastMonth;
        data.value.notGivenForTheLastMonth = parsedData.value.notGivenForTheLastMonth;
      }
    });

    return {
      handleSelectedGroups,
      selectedGroups,
      givenAtLeastTimes,
      handleGivenAtLeastTimes,
      handleGivenForTheLastMonth,
      givenForTheLastMonth,
      financialContribution,
      handleFinancialContribution,
      notGivenForTheLastMonth,
      handleNotGivenForTheLastMonth,
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
