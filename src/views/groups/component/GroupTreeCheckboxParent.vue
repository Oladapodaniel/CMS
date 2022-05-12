<template>
  <div>
    <div class="py-3 px-2">
      <div class="row">
        <div class="col-12">
          <Checkbox
            id="binary"
            v-model="allChecked"
            :binary="true"
            class="exempt-hide"
            @change="checkAll"
          />
          <span class="font-weight-700">&nbsp; &nbsp;Select all</span>
        </div>
      </div>
    </div>
    <GroupTreeCheckbox
      :items="items"
      :addGroupValue="addGroupValue"
      :allChecked="allChecked"
      @setcheckval="setCheckValue"
      :checked="checked"
      @resetchecked="(payload) => (checked = payload)"
    />
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
import GroupTreeCheckbox from "./GroupTreeCheckbox.vue";
import { useStore } from "vuex";
import { watchEffect } from "@vue/runtime-core";
export default {
  props: ["items", "addGroupValue"],
  components: {
    GroupTreeCheckbox,
  },
  setup() {
    const allChecked = ref(false);
    const checked = ref(false);
    const multipleGroupsSelected = ref([]);
    const store = useStore();

    const setCheckValue = (payload) => {
      allChecked.value = payload;
    };

    const checkAll = () => {
      checked.value = true;
    };

    watchEffect(() => {
      if (store.getters["groups/checkedGroupChildren"].length > 0) {
        const selectedGroup = store.getters["groups/checkedGroupChildren"];
        selectedGroup.forEach((i) => {
          const getIndex = multipleGroupsSelected.value.findIndex(
            (j) => j.id === i.id
          );
          if (getIndex < 0) {
            multipleGroupsSelected.value.push(i);
          }
        });
        //   Save to store
        store.dispatch(
          "groups/setCheckedTreeGroup",
          multipleGroupsSelected.value.filter((i) => i.displayCheck)
        );
      }
    });


    return {
      allChecked,
      setCheckValue,
      checked,
      checkAll,
      multipleGroupsSelected
    };
  },
};
</script>

<style>
</style>