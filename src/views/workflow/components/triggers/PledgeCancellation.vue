<template>
  <div class="container px-0 max-height scroll-div">
    <div class="row text-center dotted-border-bottom">
      <div class="col-md-12 my-3">
        <TriggerDescription
          :header="'Pledge - Cancellation'"
          @removetrigger="removeTrigger"
        />
      </div>
    </div>

    <div class="row mt-4">
      <div class="col-md-12">
        <label for="" class="font-weight-600">Groups</label>
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

    <div class="row mt-1">
      <div class="col-md-12">
        <label for="" class="font-weight-600">With pledges</label>
      </div>
      <div class="col-md-12 mb-2">
        <el-tree-select
          v-model="selectedPledges"
          :data="allPledgeDefinitionList"
          :render-after-expand="false"
          check-strictly
          multiple
          show-checkbox
          check-on-click-node
          class="w-100"
          @change="handleSelectedPledges"
        />
      </div>
    </div>
  </div>
</template>

<script>
import TriggerDescription from "../TriggerDescription.vue";
import { reactive, ref } from "@vue/reactivity";
import { watchEffect } from "@vue/runtime-core";
import workflow_util from "../../utlity/workflow_util";
export default {
  props: [
    "groups",
    "selectedTriggerIndex",
    "condition",
    "groupMappedTree",
    "allPledgeDefinitionList",
  ],
  emits: ["updatetrigger", "removetrigger"],
  components: { TriggerDescription },

  setup(props, { emit }) {
    const data = reactive({});
    const handleSelectedGroups = () => {
      emit("updatetrigger", JSON.stringify(data), props.selectedTriggerIndex);
    };

    const selectedPledges = ref([])
    const handleSelectedPledges = () => {
        data.pledges = selectedPledges.value.join(",");
      emit("updatetrigger", JSON.stringify(data), props.selectedTriggerIndex);
    };

    const removeTrigger = () => {
      emit("removetrigger");
    };

    const parsedData = ref({});
    watchEffect(() => {
      if (props.condition.jsonCondition) {
        parsedData.value = JSON.parse(props.condition.jsonCondition);
        data.groups = parsedData.value.groups ? parsedData.value.groups.split(",") : [];
        selectedPledges.value = data.pledges =
          parsedData.value.pledges && parsedData.value.pledges.length > 0
            ? typeof parsedData.value.pledges !== "string"
              ? parsedData.value.pledges
              : parsedData.value.pledges.split(",")
            : [];
      }
    });

    return {
      handleSelectedGroups,
      selectedPledges,
      removeTrigger,
      data,
      handleSelectedPledges,
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
