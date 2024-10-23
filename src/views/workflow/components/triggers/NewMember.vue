<template>
  <div class="container px-0 max-height scroll-div">
    <div class="row text-center dotted-border-bottom">
      <div class="col-md-12 my-3">
        <TriggerDescription
          :description="description"
          :header="'Member - New Member'"
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
          @change="groupSelected"
        />
      </div>
    </div>
  </div>
</template>

<script>
import TriggerDescription from "../TriggerDescription.vue";
import { reactive, ref } from "vue";
import { computed, watchEffect } from "@vue/runtime-core";
import workflow_util from "../../utlity/workflow_util";
export default {
  props: ["groups", "selectedTriggerIndex", "condition", "groupMappedTree"],
  components: { TriggerDescription },
  emits: ["updatetrigger", "removetrigger"],

  setup(props, { emit }) {
    const data = ref({});
    const selectedGroups = ref("");
    const groupSelected = () => {
      emit("updatetrigger", JSON.stringify(data.value), props.selectedTriggerIndex);
    };

    const description = computed(() => {
      return {
        selectedGroups: selectedGroups.value
          ? selectedGroups.value.map((i) => i.name)
          : ["_____"],
        id: 4,
      };
    });

    const removeTrigger = () => {
      emit("removetrigger");
    };

    const parsedData = ref({});
    watchEffect(() => {
      if (props.condition.jsonCondition) {
        parsedData.value = JSON.parse(props.condition.jsonCondition);
        selectedGroups.value =
          props.groups.length > 0
            ? workflow_util.getGroups(parsedData.value.groups, props.groups)
            : [];
        data.value.groups = parsedData.value.groups
          ? parsedData.value.groups.split(",")
          : [];
      }
    });

    return {
      groupSelected,
      selectedGroups,
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
