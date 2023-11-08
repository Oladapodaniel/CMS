<template>
  <div class="container max-height px-0 scroll-div">
    <div class="row text-center dotted-border-bottom">
      <div class="col-md-12 my-3">
        <TriggerDescription
          :header="'Group — Membership Duration'"
          :description="description"
          @removetrigger="removeTrigger"
        />
      </div>
    </div>

    <div class="row mt-4">
      <div class="col-md-12">
        <label for="" class="font-weight-600">Match an individual who has been in</label>
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
        <!-- <MultiSelect v-model="selectedGroups" optionLabel="name" @change="handleSelectedGroups" :options="groups"  placeholder="Select groups" class="w-100"  display="chip" /> -->
      </div>

      <div class="col-md-12 mt-4">
        <label for="" class="font-weight-600">For</label>
      </div>
      <div class="col-md-12 mb-2">
        <el-dropdown trigger="click" class="w-100">
          <span class="el-dropdown-link w-100">
            <div
              class="d-flex justify-content-between border-eldropdown w-100"
              size="large"
            >
              <span class="text-secondary">{{ days ? days : "Select duration" }}</span>
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
                v-for="(item, index) in daysOptions"
                :key="index"
                @click="handleDays(item)"
                >{{ item.name }}
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script>
import TriggerDescription from "../TriggerDescription.vue";
import { computed, reactive, ref, watch } from "@vue/runtime-core";
import workflow_util from "../../utlity/workflow_util";
export default {
  components: { TriggerDescription },
  props: ["groups", "selectedTriggerIndex", "condition", "groupMappedTree"],
  emits: ["updatetrigger", "removetrigger"],
  setup(props, { emit }) {
    const data = ref({});

    const selectedGroups = ref([]);
    const handleSelectedGroups = (e) => {
      emit("updatetrigger", JSON.stringify(data.value), props.selectedTriggerIndex);
    };

    const days = ref("");
    const handleDays = (item) => {
      const selectedDuration = item;
      console.log(days.value);
      data.value.days = selectedDuration.type.includes("day")
        ? selectedDuration.length
        : selectedDuration.type.includes("week")
        ? selectedDuration.length * 7
        : selectedDuration.length * 30;
      emit("updatetrigger", JSON.stringify(data.value), props.selectedTriggerIndex);
    };

    const daysArr = [
      { type: "day", length: 0, name: "Today" },
      { type: "day", length: 1 },
      { type: "days", length: 2 },
      { type: "days", length: 3 },
      { type: "days", length: 5 },
      { type: "week", length: 1 },
      { type: "weeks", length: 2 },
      { type: "weeks", length: 3 },
      { type: "month", length: 1 },
      { type: "months", length: 2 },
      { type: "months", length: 3 },
    ];

    const daysOptions = computed(() => {
      return daysArr.map((i) => {
        i.name = i.name ? i.name : `${i.length} ${i.type}`;
        return i;
      });
    });

    const description = computed(() => {
      return {
        selectedGroups:
          selectedGroups.value && selectedGroups.value.length > 0
            ? selectedGroups.value.map((i) => i.name)
            : ["_____"],
        days: data.value.days ? data.value.days : "____",
        id: 9,
      };
    });

    const removeTrigger = () => {
      emit("removetrigger");
    };

    const parsedData = ref({});
    watch(() => {
      if (props.condition.jsonCondition) {
        parsedData.value = JSON.parse(props.condition.jsonCondition);
        days.value = parsedData.value.days + " days";
        data.value.days = parsedData.value.days;

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
      daysOptions,
      selectedGroups,
      handleSelectedGroups,
      days,
      handleDays,
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
