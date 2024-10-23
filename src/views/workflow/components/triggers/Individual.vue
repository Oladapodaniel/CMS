<template>
  <div class="container max-height px-0 scroll-div">
    <div>
      <div class="row text-center dotted-border-bottom">
        <div class="col-md-12 my-3">
          <TriggerDescription
            :header="'Individual - Event'"
            :description="description"
            @removetrigger="removeTrigger"
          />
        </div>
      </div>

      <div class="row mt-5">
        <div class="col">
          <label for="" class="font-weight-700">Match a Individual of</label>
        </div>
      </div>
      <div class="row">
        <div class="col">
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

    <div>
      <div class="row mt-4">
        <div class="col">
          <label for="" class="font-weight-700">Who's</label>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <el-dropdown trigger="click" class="w-100">
            <span class="el-dropdown-link w-100">
              <div
                class="d-flex justify-content-between border-eldropdown w-100"
                size="large"
              >
                <span class="text-secondary">{{
                  eventType ? eventType : "Select event type"
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
                  v-for="(item, index) in [
                    'Birthday',
                    'Wedding Date',
                    'Baptism',
                    'Last Attended',
                    'Last Contributed',
                  ]"
                  :key="index"
                  @click="handleEventType(item)"
                  >{{ item }}
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </div>
    </div>

    <div>
      <div class="row mt-4">
        <div class="col">
          <label for="" class="font-weight-700">is</label>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <el-dropdown trigger="click" class="w-100">
            <span class="el-dropdown-link w-100">
              <div
                class="d-flex justify-content-between border-eldropdown w-100"
                size="large"
              >
                <span class="text-secondary">{{
                  days ? days : "Select day duration"
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

    <div>
      <div class="row mt-4">
        <div class="col">
          <label for="" class="font-weight-700">In the</label>
        </div>
      </div>
      <div class="row">
        <div class="col mb-4">
          <el-dropdown trigger="click" class="w-100">
            <span class="el-dropdown-link w-100">
              <div
                class="d-flex justify-content-between border-eldropdown w-100"
                size="large"
              >
                <span class="text-secondary">{{
                  pastOrFuture ? pastOrFuture : "Select season"
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
                  v-for="(item, index) in ['Past', 'Future']"
                  :key="index"
                  @click="handlePastOrFuture(item)"
                  >{{ item }}
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, ref } from "vue";
import { computed, watchEffect } from "@vue/runtime-core";
import TriggerDescription from "../TriggerDescription.vue";
import workflow_util from "../../utlity/workflow_util";

export default {
  props: ["groups", "selectedTriggerIndex", "condition", "groupMappedTree"],
  emits: ["updatetrigger", "removetrigger"],
  components: {
    TriggerDescription,
  },
  setup(props, { emit }) {
    const data = ref({});

    const selectedGroups = ref([]);
    const handleSelectedGroups = () => {
      emit("updatetrigger", JSON.stringify(data.value), props.selectedTriggerIndex);
    };

    const eventType = ref("");
    const handleEventType = (item) => {
      data.value.event = item;
      emit("updatetrigger", JSON.stringify(data.value), props.selectedTriggerIndex);
    };

    const daysArr = [
      { type: "day", length: 0, name: "Today" },
      { type: "day", length: 1 },
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
    const days = ref("");
    const handleDays = (item) => {
      const selectedDuration = item;
      data.value.days = selectedDuration.type.includes("day")
        ? selectedDuration.length
        : selectedDuration.type.includes("week")
        ? selectedDuration.length * 7
        : selectedDuration.length * 30;
      emit("updatetrigger", JSON.stringify(data.value), props.selectedTriggerIndex);
    };

    const pastOrFuture = ref("");
    const handlePastOrFuture = (item) => {
      pastOrFuture.value = item;
      console.log(pastOrFuture.value, "reaching");
      data.value.pastOrFuture = item === "Past" ? 1 : 0;
      emit("updatetrigger", JSON.stringify(data.value), props.selectedTriggerIndex);
    };

    const description = computed(() => {
      return {
        id: 12,
        groups:
          selectedGroups.value && selectedGroups.value.length > 0
            ? selectedGroups.value.map((i) => i.name)
            : ["_____"],
        event: data.value.event ? data.value.event : "____",
        days: data.value.days ? data.value.days : "____",
        pastOrFuture: pastOrFuture.value ? pastOrFuture.value : "____",
      };
    });

    const removeTrigger = () => {
      emit("removetrigger");
    };

    const parsedData = ref({});
    watchEffect(() => {
      if (props.condition.jsonCondition) {
        parsedData.value = JSON.parse(props.condition.jsonCondition);
        eventType.value = parsedData.value.event;
        data.value.event = parsedData.value.event;

        days.value = parsedData.value.days ? parsedData.value.days + " days" : "";
        data.value.days = parsedData.value.days;

        selectedGroups.value =
          props.groups.length > 0
            ? workflow_util.getGroups(parsedData.value.groups, props.groups)
            : [];
        data.value.groups = parsedData.value.groups
          ? parsedData.value.groups.split(",")
          : [];

        pastOrFuture.value = parsedData.value.pastOrFuture === 1 ? "Past" : "Future";
        data.value.pastOrFuture = parsedData.value.pastOrFuture;
      }
    });

    return {
      selectedGroups,
      handleSelectedGroups,
      eventType,
      handleEventType,
      daysOptions,
      days,
      handleDays,
      pastOrFuture,
      handlePastOrFuture,
      description,
      removeTrigger,
      data,
    };
  },
};
</script>
