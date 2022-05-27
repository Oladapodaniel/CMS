<template>
  <div>
    <div class="py-3 px-2">
      <div class="row">
        <div class="col-12">
          <div>
            <div>
              <Checkbox
                id="binary"
                v-model="allChecked"
                :binary="true"
                class="exempt-hide"
                @change="checkAll"
              />
              <span class="font-weight-700">&nbsp; &nbsp;Select all</span>
            </div>
            
            <div v-if="false">
              <Checkbox
                id="binary"
                v-model="autoCheck"
                :binary="true"
                class="exempt-hide"
              />
              <span class="font-weight-700">&nbsp; &nbsp;Auto check</span>
            </div>
          </div>
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
      :autoCheck="autoCheck"
    />
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
import GroupTreeCheckbox from "./GroupTreeCheckbox.vue";
import { useStore } from "vuex";
import { watchEffect } from "@vue/runtime-core";
import { onBeforeRouteLeave } from 'vue-router';
export default {
  props: ["items", "addGroupValue"],
  emits: ["filteredGroup"],
  components: {
    GroupTreeCheckbox,
  },
  setup(props, { emit }) {
    const allChecked = ref(false);
    const checked = ref(false);
    const multipleGroupsSelected = ref([]);
    const store = useStore();
    const streamlineGroup = ref([])
    const autoCheck = ref(false)

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
        multipleGroupsSelected.value = multipleGroupsSelected.value.filter((i) => i.displayCheck)
        console.log(multipleGroupsSelected.value)
        emit('filteredGroup', multipleGroupsSelected.value)
      }
    });

    // const streamlineGroupProp = (item, destArray) => {
      // if (item.length > 0) {
      //   multipleGroupsSelected.value = item.map(i => {
      //     return {
      //       id: i.id,
      //       children: i.children
      //     }
      //   })
      //   item.forEach(i => {
      //     if (i.children && i.children.length > 0) {
      //       streamlineGroupProp(i.children)
      //     }
      //   })
      // }

      // if (item.length > 0) {
      //   item.forEach((i) => {
      //     destArray.push({
      //       id: i.id,
      //       // children: i.children,
      //       parentId: i.groupId
            
      //     })
          // item.map(i => {
          //   return {
          //     id: i.id,
          //     children: i.children
          //   }
          // })
    //       if (i.children && i.children.length > 0) {
    //         console.log(i.children)
    //         console.log('calling it')
    //         streamlineGroupProp(i.children, destArray);
    //       } else {
    //         console.log('not calling it')
    //       }
    //     });
    //   }

    // }

    // const unflattenTree = (item) => {
      // console.log(item)
      // let arr = item.map((i) => {
      //     return {
      //       id: i.id,
      //       // title: 'CEO',
      //       // name: i.name,
      //       // arr: { name: i.name, avatar: i.logo, label: 'CEO' },
      //       // image: i.logo,
      //       parent: i.parentId,
      //     };
      //   });
      // let data = []

      //           const allIDs = arr.map(i => i.id)
      //           let sum = 0
      //           allIDs.forEach(i => {
      //               arr.forEach((j, ind) => {
      //                   if (i == j.parent) {
      //                       j.id = ind
      //                       j.parentId = sum
      //                       data.push(j)
      //                   }
      //               })
      //               sum++
      //           })
      //           console.log(data)
      // const data = [
      //   { id: "56", parentId: "62" },
      //   { id: "81", parentId: "80" },
      //   { id: "74", parentId: "null" },
      //   { id: "76", parentId: "80" },
      //   { id: "63", parentId: "62" },
      //   { id: "80", parentId: "86" },
      //   { id: "87", parentId: "86" },
      //   { id: "62", parentId: "74" },
      //   { id: "86", parentId: "74" },
      // // ];
      //   console.log(data);

      //   const idMapping = data.reduce((acc, el, i) => {
      //     acc[el.id] = i;
      //     return acc;
      //   }, {});

      //   let root;
      //   data.forEach((el) => {
      //     // Handle the root element
      //     if (el.parentId === null) {
      //       root = el;
      //       return;
      //     }
      //     // Use our mapping to locate the parent element in our data array
      //     const parentEl = data[idMapping[el.parentId]];
      //     console.log(parentEl)
      //     // Add our current el to its parent's `children` array
      //     parentEl.children = [...(parentEl.children || []), el];
      //   });
      //   return root

        // console.log(root);
    // }

    onBeforeRouteLeave(() => {
        store.dispatch("groups/setCheckedGroupChildren", []);
        multipleGroupsSelected.value = []
    });


    return {
      allChecked,
      setCheckValue,
      checked,
      checkAll,
      multipleGroupsSelected,
      streamlineGroup,
      autoCheck
    };
  },
};
</script>

<style>
</style>