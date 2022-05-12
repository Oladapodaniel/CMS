<template>
  <div>
      <div class="py-3 px-2">
        <div class="row">
            <div class="col-12">
                <Checkbox id="binary" v-model="allChecked" :binary="true" class="exempt-hide" @change="checkAll" /> <span class="font-weight-700">&nbsp; &nbsp;Select all</span>
            </div>
        </div>
      </div>
      <GroupTreeCheckbox :items="items" :addGroupValue="addGroupValue" :allChecked="allChecked" @setcheckval="setCheckValue" :checked="checked" @resetchecked="(payload) => checked = payload" :multipleGroupsSelected="multipleGroupsSelected" @passitemvalue="getCheckedGroup"/>
  </div>
</template>

<script>
import { ref } from '@vue/reactivity'
import GroupTreeCheckbox from "./GroupTreeCheckbox.vue"
export default {
    props: ["items", "addGroupValue"],
    components: {
        GroupTreeCheckbox
    },
    setup () {
        const allChecked = ref(false)
        const checked = ref(false)
        const multipleGroupsSelected = ref([]);


        const setCheckValue = (payload) => {
            allChecked.value = payload
        }

        const checkAll = () => {
            checked.value = true
        }

        const getCheckedGroup = (payload) => {
            console.log(payload)
              const groupData = payload;
              if (groupData.displayCheck) {
                const getIndex = multipleGroupsSelected.value.findIndex(
                  (j) => j.id === payload.id
                );
                if (getIndex < 0) {
                  multipleGroupsSelected.value.push(groupData);
                }
              } else {
                  console.log('Not children')
              }
            //   checkChildren(groupData, multipleGroupsSelected.value);
            //   //   Save to store
            //   store.dispatch(
            //     "groups/setCheckedTreeGroup",
            //     multipleGroupsSelected.value.filter((i) => i.displayCheck)
            //   );
            // //   console.log(multipleGroupsSelected.value, 'Nooooooo')
            // //   console.log(multipleGroupsSelected.value.filter((i) => i.displayCheck), 'hereeee')
        
            //    markedItems.value = props.items.filter(i => i.displayCheck)
        }

        const checkChildren = (item, destArray) => {
            if (item && item.children && item.children.length > 0) {
                item.children.forEach((i) => {
                    i.displayCheck = !i.displayCheck;
                if (item.displayCheck) {
                    i.displayCheck = true;
                    const getIndex = destArray.findIndex((j) => j.id === i.id);
                    if (getIndex < 0) {
                    destArray.push(i);
                    }
                }
                if (!item.displayCheck) {
                    //   console.log(multipleGroupsSelected.value, "678678")
                    //   console.log(removeCheckedGroup.value, "Childrennn")
                    //   removeCheckedGroup.forEach(i => {
                    //       destArray = destArray.filter(j => {
                    //         return i.id !== j.id
                    //       })
                    //   })
                    i.displayCheck = false;
                }
                if (i.children && i.children.length > 0) {
                    checkChildren(i, destArray);
                }
                });
            }
            };
        return {
            allChecked,
            setCheckValue,
            checked,
            checkAll,
            multipleGroupsSelected,
            getCheckedGroup
        }
    }
}
</script>

<style>

</style>