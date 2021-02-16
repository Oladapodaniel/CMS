<template>
  <div class="container-slim">
    <div class="container-fluid">
      <div class="row d-md-flex justify-content-between yu mt-5">
        <div class="col-md-4">
          <h2>Groups</h2>
          <Toast />
          <ConfirmDialog />
        </div>
        <div class="col-md-4 mt-2 my-1 link">
          <router-link
            to="/tenant/createpeoplegroup"
            class="grey-border primary-btn default-btn primary-bg border-0"
            >Add New Group</router-link
          >
        </div>
        <div class="col-md-12 px-0">
          <hr class="hr my-3" />
        </div>
      </div>

      <div class="row mt-4 grey-rounded-border">
        <div class="col-md-12">
          <div class="row main-header">
            <div class="col-md-12">
              <div class="row">
                <div class="col-sm-2 d-md-flex align-items-center">
                  <input class="my-2" type="checkbox" />
                </div>
                <div class="col-sm-4 d-md-flex align-items-center">
                  <span class="my-2 font-weight-bold">Group Name</span>
                </div>
                <div class="col-sm-4 d-md-flex align-items-center">
                  <span class="my-2 font-weight-bold">Membership Size</span>
                </div>
                <div class="col-sm-2 d-md-flex align-items-center"></div>
              </div>
              <div class="row">
                <div class="col-md-12 px-0">
                  <hr class="hr my-0" />
                </div>
              </div>
            </div>
          </div>

          <div class="row" v-if="!loading && groups.length === 0">
            <div class="col-md-12">
              <div class="row">
                <div
                  class="col-md-12 d-flex align-items-center justify-content-center"
                >
                <p class="py-2">No groups yet</p>
                </div>
              </div>
              <div class="row">
                <div class="col-md-12 px-0">
                  <hr class="hr my-0" />
                </div>
              </div>
            </div>
          </div>

          <div class="row" v-if="loading">
            <div class="col-md-12">
              <div class="row">
                <div
                  class="col-md-12 d-flex align-items-center justify-content-center"
                >
                  <i
                    class="fas fa-circle-notch fa-spin py-4"
                    v-if="loading"
                  ></i>
                </div>
              </div>
              <div class="row">
                <div class="col-md-12 px-0">
                  <hr class="hr my-0" />
                </div>
              </div>
            </div>
          </div>

          <div class="row  small-text" v-for="(group, index) in groups" :key="index">
            <div class="col-md-12">
              <div class="row">
                <div class="col-sm-2 d-md-flex align-items-center">
                  <input class="my-2" type="checkbox" />
                </div>
                <div class="col-sm-4 d-md-flex align-items-center">
                  <span class="my-2 name-link">
                    <span class="hidden-header font-sm-weight-600">Group Name</span>
                    <span class="f-right">
                      <router-link
                      :to="`/tenant/createpeoplegroup/${group.id}`"
                      >{{ group.name }}</router-link
                    >
                    </span>
                  </span>
                </div>
                <div class="col-sm-4 d-md-flex align-items-center">
                  <span class="hidden-header font-weight-600">Group Size</span>
                  <span class="my-2 f-right">{{ group.peopleInGroupsCount }}</span>
                </div>
                <div class="col-sm-2 d-md-flex align-items-center text-right small-text">
                  <div class="dropdown">
                    <i
                      class="fas fa-ellipsis-v cursor-pointer"
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
                        <router-link
                          :to="`/tenant/sms/compose?group=${group.name}&groupId=${group.id}`"
                          >Send SMS</router-link
                        >
                      </a>
                      <a class="dropdown-item">
                        <router-link to="">Send Email</router-link>
                      </a>
                      <a class="dropdown-item" @click="confirmDelete(group.id, index)">Delete</a>
                    </div>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-12 px-0">
                  <hr class="hr my-0" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import groupsService from "../../services/groups/groupsservice"
import { useStore } from "vuex";
import { useConfirm } from "primevue/useConfirm";
import { useToast } from "primevue/usetoast";


export default {
  setup() {
    //   const $confirm = getCurrentInstance().ctx.$confirm;
    const loading = ref(false);
    const displayConfirmModal = ref(false);
    const store = useStore();
    const groups = ref(store.getters["groups/groups"]);
    const toast = useToast();

    const confirm = useConfirm();

    const confirmDelete = (id, index) => {
      confirm.require({
          message: 'Do you want to delete this group?',
          header: 'Delete Confirmation',
          icon: 'pi pi-info-circle',
          acceptClass: 'confirm-delete',
          rejectClass: 'cancel-delete',
          accept: () => {
            try {
              groupsService.deleteGroup(id)
              .then(res => {
                console.log(res, "Delete Response");
                if (res !== false) {
                  groups.value.splice(index, 1);
                  store.dispatch("groups/getGroups")
                  toast.add({severity:'success', summary:'Deleted', detail:'Group was deleted', life: 3000});
                  groupsService.removeGroupFromStore(id);
                }
              })
            } catch (error) {
              console.log(error);
            }
          },
          reject: () => {
            // toast.add({severity:'info', summary:'Rejected', detail:'You have rejected', life: 3000});
          }
      });
    }


    const getgroups = async () => {
      try {
        console.log("calling");
        loading.value = true;
        const data = await groupsService.getGroups();
        (loading.value = false),
          (groups.value = data.map((i) => {
            return {
              dateCreated: i.dateCreated,
              description: i.description,
              name: i.name,
              id: i.id,
              tenantID: i.tenantID,
              peopleInGroupsCount: i.peopleInGroupsCount,
            };
          }));
        console.log(groups.value);
      } catch (error) {
        (loading.value = false), console.log(error.response);
      }
    };
    
    if (!groups.value || groups.value.length === 0) getgroups();

    return {
      groups,
      loading,
      displayConfirmModal,
      confirmDelete,
    };
  },
};
</script>

<style scoped>
* {
  box-sizing: border-box;
}

.yu {
  margin-top: 5rem !important;
}

.dropdown-menu a {
  color: #02172e;
}

.link a {
  text-decoration: none;
}

.main-header {
  background: #e9ecef;
}

.link a:hover {
  color: #fff;
}

@media screen and (min-width: 580px) {
  .hidden-header {
    display: none;
  }
}

@media screen and (max-width: 581px) {
  .main-header {
    display: none;
  }

  .f-right {
    float: right;
  }
}
</style>