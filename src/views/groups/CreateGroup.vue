<template>
  <div class="container-slim" @click="closeDropdownIfOpen">
    <div class="container-fluid">
      <div class="row mt-3">
        <div class="col-md-12">
          <h2 v-if="!route.params.groupId">Add Group</h2>
          <h2 v-else>Update Group</h2>
          <Toast />
          <ConfirmDialog />
        </div>
        <div class="col-md-12 my-3 px-0">
          <hr class="hr" />
        </div>
      </div>

      <div class="row py-3">
        <div class="col-md-12">
          <div class="row group-form pt-3 my-4">
            <div class="col-md-12">
              <div class="row">
                <div class="col-md-12">
                  <div class="row">
                    <div class="col-md-8 col-lg-7">
                      <div class="row">
                        <div class="col-md-4 text-lg-right">
                          <label for="groupName" class="font-weight-600"
                            >Group name</label
                          >
                        </div>
                        <div class="col-md-8">
                          <input
                            type="text"
                            v-model="groupData.name"
                            class="form-control"
                            id="formGroup"
                            @input="validateGroupName"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="row mb-5 mt-4">
                <div class="col-md-12">
                  <div class="row">
                    <div class="col-md-8 col-lg-7">
                      <div class="row">
                        <div class="col-md-4 text-lg-right">
                          <label for="description" class="font-weight-600"
                            >Description</label
                          >
                        </div>
                        <div class="col-md-8">
                          <textarea
                            v-model="groupData.description"
                            name="description"
                            id="description"
                            rows="4"
                            class="form-control w-100"
                          ></textarea>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="row pb-4 bottom-box">
            <div class="col-md-12">
              <div class="row mid-header-row py-1">
                <div class="col-md-4 text-lg-center pl-0">
                  <span class="mid-header-text py-1 px-1"
                    >Members in group</span
                  >
                </div>
              </div>

              <div class="row py-5">
                <div class="col-md-12">
                  <div class="row">
                    <div class="col-md-4 d-flex justify-content-md-center">
                      <button
                        class="default-btn outline-none primary-text font-weight-bold border-0"
                        data-toggle="modal"
                        data-target="#exampleModal"
                      >
                        Add member
                      </button>
                    </div>
                  </div>

                  <!-- Modal -->
                  <div
                    class="modal fade"
                    id="exampleModal"
                    tabindex="-1"
                    role="dialog"
                    aria-labelledby="exampleModalLabel"
                    aria-hidden="true"
                  >
                    <div class="modal-dialog" role="document" ref="modal">
                      <div class="modal-content pr-2">
                        <div class="modal-header py-3">
                          <h5
                            class="modal-title font-weight-700"
                            id="exampleModalLabel"
                          >
                            Group membership
                          </h5>
                          <button
                            type="button"
                            class="close"
                            data-dismiss="modal"
                            aria-label="Close"
                          >
                            <span aria-hidden="true">&times;</span>
                          </button>
                        </div>
                        <div class="modal-body">
                          <div class="row">
                            <div class="col-md-12">
                              <div class="row my-3">
                                <div
                                  class="col-md-4 text-right d-flex align-items-center justify-content-md-end"
                                >
                                  <label class="font-weight-600"
                                    >Select Members</label
                                  >
                                </div>
                                <div class="col-md-7">
                                  <div
                                    class="row"
                                  >
                                    <div
                                      class="col-md-12 pl-0 grey-rounded-border"
                                    >
                                      <ul
                                        class="d-flex flex-wrap px-1 mb-0 m-dd-item"
                                        @click="() => memberSelectInput.focus()"
                                      >
                                        <li
                                          style="
                                            list-style: none;
                                            min-width: 100px;
                                          "
                                          v-for="(
                                            member, indx
                                          ) in selectedMembers"
                                          :key="indx"
                                          class="email-destination d-flex justify-content-between m-1"
                                        >
                                          <span>{{ member.name }}</span>
                                          <span
                                            class="ml-2 remove-email"
                                            @click="removeMember(indx)"
                                            >x</span
                                          >
                                        </li>
                                        <li
                                          style="list-style: none"
                                          class="m-dd-item"
                                        >
                                          <input
                                            type="text"
                                            class="border-0 m-dd-item text outline-none"
                                            ref="memberSelectInput"
                                            @input="searchForMembers"
                                            :class="{
                                              'w-100':
                                                selectedMembers.length === 0,
                                              'minimized-input-width':
                                                selectedMembers.length > 0,
                                            }"
                                            @focus="showMemberList"
                                            @click="showMemberList"
                                            v-model="searchText"
                                            style="padding: 0.5rem"
                                            :placeholder="`${
                                              selectedMembers.length > 0
                                                ? ''
                                                : 'Select from members'
                                            }`"
                                            @blur="() => inputBlurred = true"
                                          />
                                        </li>
                                      </ul>
                                      <div
                                        class="col-md-12 px-0 select-groups-dropdown m-dd-item"
                                        v-if="memberListShown"
                                      >
                                        <div
                                          class="dropdownmenu pt-0 w-100 m-dd-item"
                                        >
                                          <a
                                            class="dropdown-item px-1 c-pointer m-dd-item"
                                            v-for="(
                                              member, index
                                            ) in memberSearchResults"
                                            :key="index"
                                            @click="selectMember(member, index)"
                                            >{{ member.nameResult }}</a
                                          >
                                          <p
                                            class="bg-secondary p-1 mb-0 disable m-dd-item"
                                            v-if="invalidSearchText && !inputBlurred"
                                          >
                                            Enter 3 or more characters
                                          </p>
                                          <p
                                            aria-disabled="true"
                                            class="btn btn-default p-1 mb-0 disable m-dd-item"
                                            v-if="
                                              memberSearchResults.length ===
                                                0 &&
                                              searchText.length >= 3 &&
                                              !loading
                                            "
                                          >
                                            No match found
                                          </p>
                                          <p
                                            class="btn btn-default p-1 mb-0 disable m-dd-item"
                                            v-if="
                                              loading && searchText.length >= 3
                                            "
                                          >
                                            <i
                                              class="fas fa-circle-notch fa-spin m-dd-item"
                                            ></i>
                                          </p>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <!-- End -->

                              <div class="row mb-3">
                                <div
                                  class="col-md-4 text-right d-flex align-items-center justify-content-md-end"
                                >
                                  <label class="font-weight-600"
                                    >Position in group</label
                                  >
                                </div>
                                <div class="col-md-7 px-0">
                                  <input
                                    type="text"
                                    class="form-control"
                                    placeholder="e.g Member"
                                    v-model="position"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="modal-footer mb-2">
                          <button
                            type="button"
                            class="default-btn cancel bg-white text-dark"
                            data-dismiss="modal"
                          >
                            Cancel
                          </button>

                          <button
                            class="primary-btn default-btn primary-bg border-0 outline-none"
                            @click="addSelectedMembersToGroup"
                            :data-dismiss="modalStatus"
                          >
                            Add member
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="row table-header-row py-2">
                <div class="col-md-1">
                  <input type="checkbox" class="py-2" />
                </div>
                <div class="col-md-2">
                  <span class="py-2 font-weight-bold">NAME</span>
                </div>
                <div class="col-md-2">
                  <span class="py-2 font-weight-bold">POSITION</span>
                </div>
                <div class="col-md-2">
                  <span class="py-2 font-weight-bold">ADDRESS</span>
                </div>
                <div class="col-md-2">
                  <span class="py-2 font-weight-bold">EMAIL</span>
                </div>
                <div class="col-md-2">
                  <span class="py-2 font-weight-bold">PHONE</span>
                </div>
                <div class="col-md-">
                  <!-- <i class="fa fa-elipsis-v"></i> -->
                </div>
              </div>

              <div class="row" v-if="loadingMembers">
                <div class="col-md-12">
                  <div class="row">
                    <div
                      class="col-md-12 d-flex align-items-center justify-content-center"
                    >
                      <i class="fas fa-circle-notch fa-spin py-2"></i>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-12 px-0">
                      <hr class="hr my-0" />
                    </div>
                  </div>
                </div>
              </div>

              <div
                class="row"
                v-if="loadingMembers == false && groupMembers.length === 0"
              >
                <div class="col-md-12">
                  <div class="row">
                    <div
                      class="col-md-12 d-flex align-items-center justify-content-center"
                    >
                      <p class="text-center font-weight-bold py-2">
                        No members yet
                      </p>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-12 px-0">
                      <hr class="hr my-0" />
                    </div>
                  </div>
                </div>
              </div>

              <div
                class="row py-2"
                v-for="(member, index) in groupMembers"
                :key="index"
              >
                <div class="col-md-12">
                  <div class="row">
                    <div
                      class="col-md-1 d-flex justify-content-between align-items-center"
                    >
                      <input type="checkbox" class="py-2" />
                    </div>
                    <div
                      class="col-md-2 d-flex justify-content-between align-items-center"
                    >
                      <span class="py-2 hidden-header">NAME</span>
                      <span class="py-2">{{ member.name }}</span>
                    </div>
                    <div
                      class="col-md-2 d-flex justify-content-between align-items-center"
                    >
                      <span class="py-2 hidden-header">POSITION</span>
                      <span class="py-2 text-xs-left">{{
                        member.position
                      }}</span>
                    </div>
                    <div
                      class="col-md-2 d-flex justify-content-between align-items-center"
                    >
                      <span class="py-2 hidden-header">ADDRESS</span>
                      <span class="py-2">{{ member.addres }}</span>
                    </div>
                    <div
                      class="col-md-2 d-flex justify-content-between align-items-center"
                    >
                      <span class="py-2 hidden-header">EMAIL</span>
                      <span class="py-2">{{
                        member.email && member.email.length > 10
                          ? `${member.email.split("").slice(0, 11).join("")}...`
                          : member.email
                          ? member.email
                          : ""
                      }}</span>
                    </div>
                    <div
                      class="col-md-2 px-0 d-flex justify-content-between align-items-center"
                    >
                      <span class="py-2 hidden-header">PHONE</span>
                      <span class="py-2">{{ member.phone }}</span>
                    </div>
                    <div
                      class="col-md-1 d-flex justify-content-between align-items-center"
                    >
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
                          <a class="dropdown-item" v-if="member.phone">
                            <router-link
                              :to="`/tenant/sms/compose?phone=${member.phone}`"
                              >Send SMS</router-link
                            >
                          </a>
                          <a class="dropdown-item" v-if="member.email">
                            <router-link
                              :to="`/tenant/email/compose?phone=${member.email}`"
                              >Send Email</router-link
                            >
                          </a>
                          <a class="dropdown-item c-pointer" @click="confirmDelete(member.personID, index)">Remove</a>
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

      <div class="row py-3 my-3">
        <div class="col-md-12">
          <p
            class="text-right text-danger font-weight-bold pr-2"
            v-if="groupNameIsInvalid"
          >
            Please enter group name
          </p>
        </div>
        <div class="col-md-12 d-flex justify-content-end action-btns">
          <router-link
            to="/tenant/peoplegroups"
            class="secondary-btn bg-white text-dark"
            >Discard</router-link
          >
          <button
            class="primary-btn default-btn primary-bg border-0 outline-none"
            @click="saveGroupData"
            :disabled="savingGroup"
          >
            <i class="fas fa-circle-notch fa-spin" v-if="savingGroup"></i>
            {{ buttonText }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref } from "vue";
import composeService from "../../services/communication/composer";
import axios from "@/gateway/backendapi";
import router from "@/router/index";
import { useRoute } from "vue-router";
import { useToast } from "primevue/usetoast";
import { useConfirm } from "primevue/useConfirm";
import groupsService from "../../services/groups/groupsservice";


export default {
  setup() {
    const groupData = ref({});
    const searchText = ref("");
    const loading = ref(false);
    const loadingMembers = ref(false);
    const memberSearchResults = ref([]);
    const position = ref("");
    const memberSelectInput = ref(null);

    const confirm = useConfirm();

    const confirmDelete = (id, index) => {
      confirm.require({
          message: 'Do you want to remove this member?',
          header: 'Remove Confirmation',
          icon: 'pi pi-info-circle',
          acceptClass: 'confirm-delete',
          rejectClass: 'cancel-delete',
          accept: () => {
            groupsService.removeFromGroup(route.params.groupId, { groupId: route.params.id, personIds:  [ `${id}`]})
              .then(res => {
                console.log(res);
                if (res !== false) {
                  groupMembers.value.splice(index, 1);
                  toast.add({severity:'success', summary:'Confirmed', detail:'The member was removed', life: 2500});
                  groupsService.editGroupInStore({name: groupData.value.name, id: route.params.groupId }, groupMembers.value.length);
                }
              })
            
          },
          reject: () => {
            // toast.add({severity:'info', summary:'Rejected', detail:'You have rejected', life: 3000});
          }
      });
    }

    const searchForMembers = (e) => {
      if (e.target.value.length >= 3) {
        memberSearchResults.value = [];
        loading.value = true;
        composeService
          .searchMemberDB("/api/Membership/GetSearchedUSers", e.target.value)
          .then((res) => {
            loading.value = false;
            // memberSearchResults.value = res;
            memberSearchResults.value = res.filter((i) => {
              const memberInExistingMembers = selectedMembers.value.find(
                (j) => j.id === i.id
              );
              if (memberInExistingMembers && memberInExistingMembers.id)
                return false;
              return true;
            });

          });
      } else {
        memberSearchResults.value = [];
      }
    };

    const memberListShown = ref(false);
    const inputBlurred = ref(true);
    const showMemberList = () => {
      memberListShown.value = true;
      inputBlurred.value = false;
    };

    const selectedMembers = ref([]);
    const selectMember = (member, index) => {
      console.log(member, "member");
      selectedMembers.value.push(member);
      memberSearchResults.value.splice(index, 1);
      searchText.value = "";
      memberListShown.value = false;
      memberSearchResults.value = [ ];
    };

    const removeMember = (index) => {
      selectedMembers.value.splice(index, 1);
    };

    const modalStatus = ref("");
    const groupMembers = ref([]);
    const addSelectedMembersToGroup = () => {
      if (selectedMembers.value.length === 0) {
        modalStatus.value = "modal";
        return false;
      }
      selectedMembers.value.forEach((i) => {
        i.position = position.value;
        i.personID = i.id;
        i.id = "";
        groupMembers.value.push(i);
      });
      if (route.params.groupId) {
        groupData.value.peopleInGroups = groupMembers.value;
        updateGroup(groupData.value, false);
      }
      modalStatus.value = "modal";
      position.value = "";
      memberSearchResults.value = [];
      selectedMembers.value = [];
    };

    const invalidSearchText = computed(() => {
      const searchTextIsValid =
        searchText.value.length < 3 &&
        loading.value == false &&
        memberSearchResults.value.length === 0;
      return searchTextIsValid;
    });

    const groupNameIsInvalid = ref(false);
    const savingGroup = ref(false);
    const toast = useToast();

    const saveGroupData = () => {
      if (!groupData.value.name) {
        groupNameIsInvalid.value = true;
        return false;
      }

      groupData.value.peopleInGroups = groupMembers.value;
      if (!route.params.groupId) {
        savingGroup.value = true;
        createGroup(groupData.value);
      } else {
        savingGroup.value = true;
        updateGroup(groupData.value, true);
      }
    };

    /*eslint no-undef: "warn"*/
    const updateGroup = (data, redirect) => {
      NProgress.start();
      axios
        .put(`/api/UpdateGroup/${route.params.groupId}`, data)
        .then((res) => {
          savingGroup.value = false;
          groupsService.editGroupInStore(res.data, groupMembers.value.length);
          console.log(res.data, "saved");
          // store.dispatch("groups/getGroups")
          if (redirect) {
            router.push("/tenant/peoplegroups");
          } else {
            toast.add({
              severity: "success",
              summary: "Group Updated",
              detail: "Group members update successfull",
              life: 2500,
            });
          }
        })
        .catch((err) => {
          NProgress.done();
          savingGroup.value = false;
          console.log(err.response);
          toast.add({
            severity: "error",
            summary: "Update Error",
            detail: "Failed updating group",
            life: 2500,
          });
        });
    };

    const createGroup = (data) => {
      NProgress.start();
      axios
        .post("/api/CreateGroup", data)
        .then((res) => {
          console.log(res, "create res");
          groupsService.addGroupToStore(res.data,  groupMembers.value.length);
          // store.dispatch("groups/getGroups")
          savingGroup.value = false;
          router.push("/tenant/peoplegroups");
        })
        .catch((err) => {
          NProgress.done();
          savingGroup.value = false;
          console.log(err.response);
          toast.add({
            severity: "error",
            summary: "Save Error",
            detail: "Failed saving group",
            life: 2500,
          });
        });
    };

    const validateGroupName = (e) => {
      if (e.target.value) {
        groupNameIsInvalid.value = false;
      }
    };

    const route = useRoute();

    const getGroupById = async () => {
      try {
        loadingMembers.value = true;
        NProgress.start();
        const { data } = await axios.get(
          `/api/GetGroupsFromId/${route.params.groupId}`,
          groupData.value
        );
        console.log(data, "group info");
        loadingMembers.value = false;
        groupData.value.name = data.name;
        groupData.value.description = data.description;

        data.peopleInGroups.forEach((i) => {
          const person = {
            personID: i.person.id,
            address: i.person.address,
            email: i.person.email,
            name: i.person.firstName + i.person.lastName,
            phone: i.person.phoneNumber,
            position: i.position,
          };

          groupMembers.value.push(person);
        });
        console.log(selectedMembers.value, "SM");
      } catch (error) {
        NProgress.done();
        loadingMembers.value = false;
        console.log(error.response);
      }
    };

    const buttonText = computed(() => {
      if (route.params.groupId) return "Update";
      return "Save";
    });

    if (route.params.groupId) getGroupById();

    const closeDropdownIfOpen = (e) => {
      if (!e.target.classList.contains("m-dd-item")) {
        memberListShown.value = false;
        searchText.value = "";
        memberListShown.value = false;
        memberSearchResults.value = [ ];
      }
    };

    return {
      groupData,
      searchForMembers,
      searchText,
      loading,
      memberSearchResults,
      selectMember,
      removeMember,
      selectedMembers,
      groupMembers,
      addSelectedMembersToGroup,
      invalidSearchText,
      position,
      modalStatus,
      groupNameIsInvalid,
      saveGroupData,
      validateGroupName,
      buttonText,
      loadingMembers,
      route,
      savingGroup,
      memberSelectInput,
      showMemberList,
      memberListShown,
      inputBlurred,
      closeDropdownIfOpen,
      confirmDelete,
    };
  },
};
</script>

<style scoped>
* {
  box-sizing: border-box;
}

.mid-header-row {
  border-bottom: 1px solid #dde2e6;
}

.remove-btn {
  background: red !important;
  padding: 10px 20px;
}

.mid-header-text {
  color: #136acd;
  font-weight: bold;
}

.table-header-row {
  background: #ebeff4;
  border-top: 1px solid #dde2e6;
  border-radius: 8px 8px 0 0;
}

.hidden-header {
  display: none;
}

.default-btn {
  background: #ebeff4;
}

.bottom-box {
  border: 1px solid #dde2e6;
  border-radius: 10px;
}

.action-btns a {
  text-decoration: none;
}

.modal-header {
  border-bottom: none !important;
}

.modal-footer {
  border-top: none !important;
}

.select-member {
  padding: 0.1rem 0.4rem;
  border: 1px solid #02172e30;
  border-radius: 30px;
}

.remove-member {
  color: #a9adb1;
  font-weight: bold;
}

.remove-member:hover {
  cursor: pointer;
}

.dropdown-toggle::after {
  margin-left: auto;
  vertical-align: 0.255em;
  content: "";
  border-top: 0.3em solid;
  border-right: 0.3em solid transparent;
  border-bottom: 0;
  border-left: 0.3em solid transparent;
  text-align: right !important;
  right: 10px;
  top: 20px;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.dropdown-toggle:focus {
  outline: none !important;
  border: none;
}

.modal-dialog {
  max-width: 600px;
}

.cancel {
  border: 1px solid #dde2e6;
}

.group-form {
  box-shadow: 0px 5px 15px #00000017;
  border: 1px solid #dde2e6;
  border-radius: 10px;
}

.grey-background {
  background: #ebeff4;
}

.text-grey {
  color: grey;
}

.send-dropdown {
  border: 1px solid #ddd;
  width: 124px;
  position: absolute;
  background: #fff;
}

.send-dropdown a {
  color: #190138;
  font-size: 14px;
  text-decoration: none;
}

.hide {
  display: none;
}

.dd-item:hover {
  cursor: pointer;
}

.hint {
  font-size: 14px;
  font-weight: 600;
}

.amber {
  background: #ffbf00 !important;
}

.email-destination {
  padding: 0.1rem 0.4rem;
  border: 1px solid #02172e0d;
  border-radius: 8px;
  background: #02172e14;
}

.remove-email {
  color: #000;
  font-weight: bold;
}

.remove-email:hover {
  cursor: pointer;
}

@media screen and (max-width: 767px) {
  .hidden-header {
    display: inline-block;
    font-weight: bold;
  }

  .table-header-row {
    display: none;
  }
}
</style>