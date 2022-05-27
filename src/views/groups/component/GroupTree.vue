<template>
  <div
    class=" row w-100  text-dark "
    style="margin: 0"
    
  >
    <!-- class="d-block -->

    <div class="col-md-12 desc">
      <p class="">
        <span
          class="text-dark font-weight-bold d-flex d-md-none fontIncrease"
          style="font-size: 15px"
          >Group Name</span
          
        >
        <ul class="p-0 w-100">
        <!-- :class="{ 'd-block' : itemDisplay, 'd-none' : !itemDisplay }"  -->
         <!-- @click="toggleItems(i, $event)" -->
        <li v-for="(group, index) in items" :key="index" class="p-2  c-pointer parent-li border-top exempt-hide">
          <div class="row exempt-hide justify-content-between">
            <div class="text-primary exempt-hide" >
              <span>
                <i class="pi pi-chevron-down roll-icon exempt-hide ml-4"  v-if="group.children && group.children.length > 0" @click="toggleItems(group, $event)"></i>
              </span>
              <span class="text-primary exempt-hide" @click="groupClick(group, $event)">
                <span class="p-3 exempt-hide">{{ group.name }}</span>
              </span>
            </div>
            
            <!-- <div class="col-3 text-primary" @click="groupClick(group.id)">
              <div @click="groupClick(group.id)">
                <div class="d-flex small justify-content-between text-primary">
                  <span class="text-dark font-weight-bold d-flex d-md-none fontIncrease" style="font-size:15px">Membership Size</span>
                    <div class="small-text text-right text-md-center">
                      {{ group.peopleInGroupsCount }}
                    </div>
                </div>
              </div>
            </div> -->
            <div class=" d-flex justify-content-end">
              <!-- <i class="pi pi-trash text-danger" @click="removeSubGroup(group, $event)"></i> -->
        
                      <!-- <div>
                        <div class="dropdown">
                          <span class="d-flex justify-content-between">
                            <span class="d-md-none d-sm-flex"></span>
                            <span class="d-sm-flex small">
                              <i
                                class="
                                  fas
                                  fa-ellipsis-v
                                  cursor-pointer
                                  ml-2
                                  fontIncrease
                                "
                                id="dropdownMenuButton"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                              ></i>

                              <div
                                class="dropdown-menu"
                                aria-labelledby="dropdownMenuButton"
                              >
                                <a class="dropdown-item">
                                  <a
                                    @click="sendGroupSms(group)"
                                    >Send SMS</a>
                                </a>
                                <a class="dropdown-item" @click="sendGroupEmail(group)">
                                    Send Email
                                </a>
                                <a
                                  class="dropdown-item"
                                  @click="confirmDelete(group.id, index)"
                                  >Delete</a
                                >
                              </div>
                            </span>
                          </span>
                        </div>
                      </div> -->
                 
            </div>
          </div>
            <div class="d-none"  @click="checkForGroup(group, $event)">
            <GroupTree
                :items="group.children"
                v-if="group.children"
                :class="{ 'd-none' : !showCheckBox }"
                
              /> 
            </div>                   
        </li>
        <li class="shadow-sm text-center border p-2 font-weight-700 c-pointer" @click="openCreateGroupModal" v-if="onDropDown">
          <i class="pi pi-plus-circle"></i>&nbsp;Add new group
        </li>
        </ul>
      </p>
    </div>
  </div>

  <Dialog header="Create group" v-model:visible="displayCreateGroup"  style="width: 450px" :breakpoints="{'960px': '75vw'}" :modal="true">
      <div class="row">
        <div class="col-12">
          <div class="mb-1">Group name<sup class="text-danger">*</sup></div>
          <input class="form-control" v-model="newGroup.name" required/>
        </div>
        <div class="col-12 mt-4">
          <div class="mb-1">Description</div>
          <textarea class="form-control" rows="4" v-model="newGroup.description"></textarea>
        </div>
      </div>
      <template #footer>
          <div class="d-flex justify-content-end">
            <div class="default-btn text-center c-pointer" @click="displayCreateGroup = false">Cancel</div>
            <div class="ml-3 default-btn border-0 text-white primary-bg text-center c-pointer" @click="createGroup"><i class="pi pi-spin pi-spinner" v-if="createGroupLoading"></i>&nbsp;Create group</div>
          </div>
      </template>
  </Dialog>
  <Toast />
</template>

<script>
import Dialog from 'primevue/dialog';
import { ref } from '@vue/reactivity';
import { useToast } from "primevue/usetoast";
import axios from "@/gateway/backendapi";
import { watchEffect } from '@vue/runtime-core';
// import store from '../../../store/store';
import { useStore } from "vuex"
import { onBeforeRouteLeave } from 'vue-router';
export default {
  name: "GroupTree",
  props: ["items", "addGroupValue", "showCheckBox"],
  emits: ["group", "groupp", "closemodal"],
  inheritAttrs: false,
  components: {
    Dialog
  },
  setup(props, { emit }) {
    const store = useStore()
    const displayCreateGroup = ref(false)
    const newGroup = ref({})
    const toast = useToast();
    const onDropDown = ref(false)
    const createGroupLoading = ref(false)

    const toggleItems = (i, e) => {
        e.target.classList.toggle("roll-icon");
      if (e.target.parentElement.parentElement.parentElement.nextElementSibling.classList.contains('d-none')) {
         e.target.parentElement.parentElement.parentElement.nextElementSibling.classList.replace('d-none', 'd-block')
       }  else {
         e.target.parentElement.parentElement.parentElement.nextElementSibling.classList.replace("d-block", "d-none")
       }
    };

    const groupClick = (group, e) => {
      store.dispatch("groups/setSelectedTreeGroupList", group)
      store.dispatch("groups/setSelectedTreeGroup", group)
      emit("group", { selectedGroup: group, iconElement: e.target });
    };

    watchEffect(() => {
      if (props.addGroupValue) {
        onDropDown.value = true
      }
    })

    const checkForGroup = (group, e) => {
      console.log(group)
      let grouped = group.children.find((i) => i.name == e.target.textContent);
      // emit("group", grouped);
      emit("group", { selectedGroup: grouped, iconElement: e.target });
    };

    const openCreateGroupModal = () => {
      displayCreateGroup.value = true
      emit("closemodal")
    }

    const createGroup = async() => {
      createGroupLoading.value = true
      try {
        let { data } = await axios.post("/api/CreateGroup", newGroup.value)
        createGroupLoading.value = false
          toast.add({
            severity: "success",
            summary: "Success",
            detail: "Group created successfully",
            life: 4000,
          });
          displayCreateGroup.value = false
          console.log(data)
      }
      catch (err) {
        createGroupLoading.value = false
        console.log(err)
      }
    }

    onBeforeRouteLeave(() => {
      store.dispatch("groups/setSelectedTreeGroupList", {})
      store.dispatch("groups/setSelectedTreeGroup", {})
    })

    
    return {
      toggleItems,
      groupClick,
      checkForGroup,
      openCreateGroupModal,
      displayCreateGroup,
      newGroup,
      createGroup,
      onDropDown,
      createGroupLoading
    };
  },
};
</script>

<style scoped>
li {
  list-style-type: none;
}

li li:hover {
  /* border: 2px solid red; */
  background: rgba(224, 223, 223, 0.46);
}

.node-height {
  height: 0px;
  overflow: hidden;
  /* transition: all .5s ease-in-out; */
}

.node-height-open {
  height: 100%;
  overflow: hidden;
  /* transition: all .5s ease-in-out; */
}

.roll-icon {
  transform: rotate(-90deg);
  /* transition: all .5s ease-in-out; */
}

</style>