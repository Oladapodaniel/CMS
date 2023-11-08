<template>
  <div class="container max-height px-0 scroll-div">
    <div class="row text-center dotted-border-bottom">
      <div class="col-md-12 my-3">
        <TriggerDescription
          :header="'Attendance'"
          :description="description"
          @removetrigger="removeTrigger"
        />
      </div>
    </div>

    <div class="row mt-4">
      <div class="col-md-12">
        <label for="" class="font-weight-600">A member of</label>
      </div>
      <div class="col-md-12 mb-2 mt-1">
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

      <div class="col-md-12 mt-3">
        <label for="" class="font-weight-600">Is marked</label>
      </div>
      <div class="col-md-12 mb-2 mt-1">
        <el-dropdown trigger="click" class="w-100">
          <span class="el-dropdown-link w-100">
            <div
              class="d-flex justify-content-between border-eldropdown w-100"
              size="large"
            >
              <span class="text-secondary">{{
                selectedStatus ? selectedStatus : "Select status"
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
                v-for="(item, index) in ['Present', 'Absent']"
                :key="index"
                @click="handleStatus(item)"
                >{{ item }}
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>

      <div class="col-md-12 mt-3">
        <label for="" class="font-weight-600">In</label>
      </div>
      <div class="col-md-12 mb-2 mt-1">
        <el-dropdown trigger="click" class="w-100">
          <span class="el-dropdown-link w-100">
            <div
              class="d-flex justify-content-between border-eldropdown w-100"
              size="large"
            >
              <span class="text-secondary">{{
                selectedEvent && Object.keys(selectedEvent).length > 0
                  ? selectedEvent.name
                  : "Select event"
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
                v-for="(item, index) in eventCategories"
                :key="index"
                @click="handleEvent(item)"
                >{{ item.name }}
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>

      <div class="col-md-12 mt-3">
        <label for="" class="font-weight-600">Time(s)</label>
      </div>
      <div class="col-md-12 mb-2">
        <el-input
          type="text"
          placeholder="Enter time number"
          v-model.number="times"
          @input="handleTimes"
        />
      </div>

      <div class="col-md-12 mt-4">
        <label for="" class="font-weight-600">In the last (how many days?)</label>
      </div>
      <div class="col-md-12 mb-2">
        <el-input
          type="text"
          placeholder="Enter days number"
          v-model.number="days"
          @input="handleDays"
        />
      </div>
    </div>
  </div>
</template>

<script>
import TriggerDescription from "../TriggerDescription.vue";
import { reactive, ref } from "@vue/reactivity";
import { computed, watchEffect } from "@vue/runtime-core";
import workflow_util from "../../utlity/workflow_util";
import eventsService from "../../../../services/events/eventsservice";

export default {
  components: { TriggerDescription },
  emits: ["updatetrigger", "removetrigger"],
  props: [
    "groups",
    "contributionItems",
    "selectedTriggerIndex",
    "condition",
    "groupMappedTree",
  ],
  setup(props, { emit }) {
    const data = ref({});
    const eventCategories = ref([]);

    const selectedStatus = ref("");
    const handleStatus = (item) => {
      data.value.attendanceStatus = item;
      emit("updatetrigger", JSON.stringify(data.value), props.selectedTriggerIndex);
    };

    const days = ref(0);
    const handleDays = () => {
      data.value.days = days.value;
      emit("updatetrigger", JSON.stringify(data.value), props.selectedTriggerIndex);
    };

    const times = ref([]);
    const handleTimes = () => {
      data.value.times = times.value;
      emit("updatetrigger", JSON.stringify(data.value), props.selectedTriggerIndex);
    };

    const selectedGroups = ref([]);
    const groupSelected = () => {
      emit("updatetrigger", JSON.stringify(data.value), props.selectedTriggerIndex);
    };

    const selectedEvent = ref({});
    const handleEvent = (item) => {
      selectedEvent.value = item;
      data.value.eventID = selectedEvent.value.id;
      emit("updatetrigger", JSON.stringify(data.value), props.selectedTriggerIndex);
    };

    const description = computed(() => {
      return {
        id: 10,
        selectedStatus:
          data.attendanceStatus && data.attendanceStatus.length > 0
            ? data.attendanceStatus
            : ["____"],
        numOfTimes: data.times,
        timesInLastWeek: data.days,
        selectedGroups:
          selectedGroups.value.length > 0
            ? selectedGroups.value.map((i) => i.name)
            : ["___"],
      };
    });

    const removeTrigger = () => {
      emit("removetrigger");
    };

    const parsedData = ref({});
    watchEffect(() => {
      if (props.condition.jsonCondition) {
        parsedData.value = JSON.parse(props.condition.jsonCondition);
        selectedStatus.value = parsedData.value.attendanceStatus;
        data.value.attendanceStatus = parsedData.value.attendanceStatus;

        data.value.groups = parsedData.value.groups
          ? parsedData.value.groups.split(",")
          : [];
        selectedGroups.value =
          props.groups.length > 0
            ? workflow_util.getGroups(
                JSON.stringify(parsedData.value.groups),
                props.groups
              )
            : [];

        data.value.eventID = parsedData.value.eventID;
        selectedEvent.value = eventCategories.value.find(
          (i) => i.id === parsedData.value.eventID
        );

        data.value.times = parsedData.value.times;
        times.value = parsedData.value.times;

        data.value.days = parsedData.value.days;
        days.value = parsedData.value.days;
      }
    });

    const getEventCategories = async () => {
      const data = await eventsService.getEventCategories();
      eventCategories.value = data;
    };
    getEventCategories();

    return {
      handleStatus,
      selectedStatus,
      days,
      handleDays,
      times,
      handleTimes,
      selectedGroups,
      groupSelected,
      description,
      removeTrigger,
      eventCategories,
      selectedEvent,
      handleEvent,
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
