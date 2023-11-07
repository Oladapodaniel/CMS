<template>
  <div class="container px-0 max-height scroll-div">
    <div class="row text-center dotted-border-bottom">
      <div class="col-md-12 my-3">
        <TriggerDescription
          :description="description"
          :currency="currency"
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
        <!-- <MultiSelect @change="groupSelected" v-model="selectedGroup" :options="groups" optionLabel="name" placeholder="Select groups" class="w-100"  display="chip" /> -->
      </div>
    </div>

    <div class="row mt-4">
      <div class="col-md-12">
        <label for="" class="font-weight-600">And who gives</label>
      </div>
      <div class="col-md-12 mb-2">
        <el-dropdown trigger="click" class="w-100">
          <span class="el-dropdown-link w-100">
            <div
              class="d-flex justify-content-between border-eldropdown w-100"
              size="large"
            >
              <span class="text-secondary">{{
                selectedLogicalOperator && Object.keys(selectedLogicalOperator).length > 0
                  ? selectedLogicalOperator.name
                  : "Select amount range"
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
                v-for="(item, index) in logicalOperatorList"
                :key="index"
                @click="rangeSelected(item)"
                >{{ item.name }}
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
        <!-- <Dropdown @change="rangeSelected" v-model="selectedRange" :options="[ 'Greater than', 'Less than' ]" class="w-100" /> -->
      </div>
    </div>

    <div class="row mt-4">
      <div class="col-md-12">
        <label for="" class="font-weight-600">{{ currency }}</label>
      </div>
      <div class="col-md-12 mb-2">
        <el-input
          type="text"
          @input="handleAmount"
          placeholder="Enter amount"
          v-model="amount"
        />
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
        <!-- <Dropdown :options="contributionItems" optionLabel="name" class="w-100" @change="categorySelected" v-model="category" /> -->
      </div>
    </div>

    <div class="row mt-4">
      <div class="col-md-12">
        <label for="" class="font-weight-600">In</label>
      </div>
      <div class="col-md-12 mb-2">
        <el-dropdown trigger="click" class="w-100">
          <span class="el-dropdown-link w-100">
            <div
              class="d-flex justify-content-between border-eldropdown w-100"
              size="large"
            >
              <span class="text-secondary">{{
                givingTime
                  ? givingTime
                  : "Select"
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
                v-for="(item, index) in ['A single gift', 'The last']"
                :key="index"
                @click="givingTimeSelected(item)"
                >{{ item }}
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
        <!-- <Dropdown
          @change="givingTimeSelected"
          v-model="givingTime"
          :options="['A single gift', 'The last']"
          class="w-100"
        /> -->
      </div>
    </div>
  </div>
</template>

<script>
import Dropdown from "primevue/dropdown";
import MultiSelect from "primevue/multiselect";
import TriggerDescription from "../TriggerDescription.vue";
import { reactive, ref } from "@vue/reactivity";
import { computed, watchEffect } from "@vue/runtime-core";
import { useStore } from "vuex";
import workflow_util from "../../utlity/workflow_util";

export default {
  props: [
    "groups",
    "selectedTriggerIndex",
    "contributionItems",
    "condition",
    "groupMappedTree",
  ],
  components: { Dropdown, TriggerDescription, MultiSelect },

  setup(props, { emit }) {
    const store = useStore();

    const currentUser = ref(store.getters.currentUser);

    const data = ref({});
    const selectedGroup = ref([]);
    const logicalOperatorList = ref([
      { name: "Greater than", id: 1 },
      { name: "Less than", id: 2 },
      { name: "Any amount", id: 3 },
    ]);

    const groupSelected = (e) => {
      // const allGroupsIndex = selectedGroup.value.findIndex(i => i === "00000000-0000-0000-0000-000000000000");
      emit("updatetrigger", JSON.stringify(data.value), props.selectedTriggerIndex);
    };

    // const selectedRange = ref('')
    const selectedLogicalOperator = ref({});
    const rangeSelected = (item) => {
      // data.logicalOperator = e.value === 'Greater than' ? '>' : '<';
      // data.logicalOperator = e.value;
      selectedLogicalOperator.value = item;
      data.value.logicalOperator = logicalOperatorList.value.find(
        (i) => i.id == item.id
      ).name;
      emit("updatetrigger", JSON.stringify(data.value), props.selectedTriggerIndex);
    };

    const amount = ref(0);
    const handleAmount = (e) => {
      data.value.amount = amount.value;
      emit("updatetrigger", JSON.stringify(data.value), props.selectedTriggerIndex);
    };

    const parsedData = ref({});

    const category = ref({});
    const categorySelected = (item) => {
      console.log(item);
      category.value = item;
      data.value.financialContributionID = item.id;
      // data.financialContributionID = e.value.id;
      emit("updatetrigger", JSON.stringify(data.value), props.selectedTriggerIndex);
    };

    const givingTime = ref("");
    const givingTimeSelected = (item) => {
      givingTime.value = item;
      data.value.singleOrLast = item;
      emit("updatetrigger", JSON.stringify(data.value), props.selectedTriggerIndex);
    };

    const description = computed(() => {
      return {
        groups: selectedGroup.value ? selectedGroup.value.map((i) => i.name) : ["_____"],
        range:
          selectedLogicalOperator.value &&
          Object.keys(selectedLogicalOperator.value).length > 0
            ? selectedLogicalOperator.value.name === "Greater than"
              ? ">"
              : "<"
            : "__",
        category: category.value && category.value.name ? category.value.name : "____",
        amount: amount.value ? amount.value : "",
        time: givingTime.value ? givingTime.value : "____",
        id: 1,
      };
    });

    const currency = computed(() => {
      if (!currentUser.value || !currentUser.value.currencySymbol) return "Amount";
      return currentUser.value.currencySymbol;
    });

    const removeTrigger = () => {
      emit("removetrigger");
    };

    watchEffect(() => {
      if (props.condition.jsonCondition) {
        parsedData.value = JSON.parse(props.condition.jsonCondition);
        selectedLogicalOperator.value = logicalOperatorList.value.find(
          (i) => i.name == parsedData.value.logicalOperator
        );
        data.logicalOperator = parsedData.value.logicalOperator;

        amount.value = parsedData.value.amount;
        data.amount = parsedData.value.amount;

        selectedGroup.value =
          props.groups.length > 0
            ? workflow_util.getGroups(parsedData.value.groups, props.groups)
            : [];
        data.groups = parsedData.value.groups;

        category.value = workflow_util.getGroup(
          parsedData.value.financialContributionID,
          props.contributionItems
        );
        data.financialContributionID = parsedData.value.financialContributionID;

        givingTime.value = parsedData.value.singleOrLast;
        data.singleOrLast = parsedData.value.singleOrLast;
      }
    });

    return {
      data,
      groupSelected,
      selectedGroup,
      selectedLogicalOperator,
      rangeSelected,
      handleAmount,
      amount,
      categorySelected,
      category,
      givingTimeSelected,
      givingTime,
      description,
      currency,
      removeTrigger,
      logicalOperatorList,
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
