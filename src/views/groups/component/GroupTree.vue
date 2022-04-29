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
        <li v-for="(group, index) in items" :key="index" class="p-2  c-pointer parent-li border-top">
          <div class="row">
            <div class="text-primary">
              <span><i class="pi pi-chevron-down roll-icon" v-if="group.children"  @click="toggleItems(group, $event)"></i></span>
            </div>
            <div class="text-primary" @click="groupClick(group)">
              <span class="p-3">{{ group.name }}</span>
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
            <!-- <div class="col-2">
        
                      <div>
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
                      </div>
                 
            </div> -->
          </div>
            
            
            <GroupTree
                :items="group.children"
                v-if="group.children"
               class="node-height"
               @click="checkForGroup(group, $event)"
                />

                

            

                    
        </li>
        </ul>
        <!-- <i class="pi pi-chevron-down"></i>{{ group.name }} -->
        
      </p>
    </div>

    
  </div>
</template>

<script>
export default {
  name: "GroupTree",
  props: ["items"],
  emits: ["group"],
  setup(props, { emit }) {
     const toggleItems = (i, e) => {
       console.log(i)
      //  if (e.target.parentElement.parentElement.parentElement.nextElementSibling.classList.contains('node-height')) {
         e.target.parentElement.parentElement.parentElement.nextElementSibling.classList.toggle('node-height-open')
         e.target.classList.toggle('roll-icon')
      //  }  else {
      //    e.target.parentElement.parentElement.parentElement.nextElementSibling.classList.replace("node-height-open", "node-height")
      //  }
     }

     const groupClick = (group) => {
      //  let grouped = group
    
      //  let child = group.children.find(i => i.name == e.target.textContent)
       console.log(group)
       emit('group', group)
        // if (route && route.query && route.query.actionType == "sendsms") {
        //   let group = {
        //     id: id
        //   }
        //   sendGroupSms(group)
        // } else if (route && route.query && route.query.actionType == "sendemail") {
        //   let group = {
        //     id: id
        //   }
        //   sendGroupEmail(group)
        // } else {
                // router.push(`/tenant/createpeoplegroup/${id}`)
          // } 
    }

    const checkForGroup = (group, e) => {
      console.log(e)
      let grouped = group.children.find(i => i.name == e.target.textContent)
      emit('group', grouped)
    }
    return {
      toggleItems,
      groupClick,
      checkForGroup
    };
  },
};
</script>

<style scoped>
li {
  list-style-type: none;
}

li  li:hover {
  /* border: 2px solid red; */
  background: rgba(224, 223, 223, 0.46)
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