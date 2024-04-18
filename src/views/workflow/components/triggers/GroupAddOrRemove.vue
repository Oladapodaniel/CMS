<template>
  <div class="container max-height px-0 scroll-div">
    <div class="row text-center dotted-border-bottom">
      <div class="col-md-12 my-3">
        <TriggerDescription
          :header="'Group — Add/Remove'"
          :description="description"
          @removetrigger="removeTrigger"
        />
      </div>
    </div>

    <div class="row mt-4">
      <div class="col-md-12">
        <label for="" class="font-weight-600">A member is</label>
      </div>

      <div class="col-md-12 mb-2">
        <el-dropdown trigger="click" class="w-100">
          <span class="el-dropdown-link w-100">
            <div
              class="d-flex justify-content-between border-eldropdown w-100"
              size="large"
            >
              <span class="text-secondary">{{
                logicalOperatorAddOrRemove ? logicalOperatorAddOrRemove : "Select type"
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
                v-for="(item, index) in ['Added to', 'Removed from']"
                :key="index"
                @click="handleLogicalOperatorAddOrRemove(item)"
                >{{ item }}
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>

      <div class="col-md-12 mb-2 mt-3">
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
  </div>
</template>

<script>
import TriggerDescription from "../TriggerDescription.vue";
import { computed, reactive, ref, watchEffect } from "@vue/runtime-core";
import workflow_util from "../../utlity/workflow_util";
export default {
  components: { TriggerDescription },
  props: ["groups", "selectedTriggerIndex", "condition", "groupMappedTree"],
  emits: ["updatetrigger", "removetrigger"],

  setup(props, { emit }) {
    const data = ref({});

    const selectedGroups = ref("");
    const handleSelectedGroups = () => {
      emit("updatetrigger", JSON.stringify(data.value), props.selectedTriggerIndex);
    };

    const logicalOperatorAddOrRemove = ref("");
    const handleLogicalOperatorAddOrRemove = (item) => {
      logicalOperatorAddOrRemove.value = data.value.logicalOperatorAddOrRemove = item;
      emit("updatetrigger", JSON.stringify(data.value), props.selectedTriggerIndex);
    };

    const description = computed(() => {
      return {
        selectedGroups: selectedGroups.value
          ? selectedGroups.value.map((i) => i.name)
          : ["____"],
        logicalOperatorAddOrRemove: logicalOperatorAddOrRemove.value
          ? logicalOperatorAddOrRemove.value
          : "____",
        id: 8,
      };
    });

    const removeTrigger = () => {
      emit("removetrigger");
    };

    const parsedData = ref({});

    watchEffect(() => {
      if (props.condition.jsonCondition) {
        parsedData.value = JSON.parse(props.condition.jsonCondition);
        logicalOperatorAddOrRemove.value = parsedData.value.logicalOperatorAddOrRemove;
        data.value.logicalOperatorAddOrRemove =
          parsedData.value.logicalOperatorAddOrRemove;

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
      selectedGroups,
      handleSelectedGroups,
      description,
      logicalOperatorAddOrRemove,
      handleLogicalOperatorAddOrRemove,
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
