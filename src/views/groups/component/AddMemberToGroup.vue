<template>
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
                    <div class="row">
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
                            autocomplete="off"

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
                            @blur="() => (inputBlurred = true)"

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

                            <!-- <p
                            class="bg-secondary p-1 mb-0 m-dd-item "
                            v-if="
                                invalidSearchText && !inputBlurred
                            "
                            >
                            Enter 3 or more characters


                            </p>  -->
                            <p

                            class="bg-secondary p-1 mb-0  "

                            >
                            Enter 3 or more characters

                            </p>
                            <!-- v-if="
                                    wardSearchString.length < 3 &&
                                    wardSearchedMembers.length === 0
                                " -->

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
                            <a
                            class="font-weight-bold small-text d-flex justify-content-center py-2  text-decoration-none primary-text c-pointer"
                            style="border-top: 1px solid #002044; color: #136acd"
                            @click="showAddMemberForm"
                            data-dismiss="modal"

                            >
                            <i
                                class="pi pi-plus-circle mr-2 primary-text d-flex align-items-center"
                                style="color: #136acd"
                            ></i>
                                Add new member
                            </a>
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
                            <!-- check box start -->
                <div class="row">
                    <div class="col-6 d-flex mt-2" v-if="true">
                    <!-- <div class="mt-n3"> -->
                        <label for="description" class="font-weight-600">
                        Is Group Leader
                        </label>
                        <Checkbox v-model="isGroupLeader" :binary="true" class="ml-3"/>
                    <!-- </div> -->
                    </div>

                    <div class="col-6 d-flex mt-2">
                    <!-- <div class="mt-n3"> -->
                        <label for="description" class="font-weight-600">
                        Enable Login
                        </label>
                        <Checkbox v-model="enableLogin" :binary="true" class="ml-3"/>
                    <!-- </div> -->
                    </div>
                </div>
                <!-- check box end -->
            </div>
            </div>
            <div class="row mt-4 justify-content-end">
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
            
</template>

<script>
import { ref } from '@vue/reactivity'
import composeService from "../../../services/communication/composer";
import { watchEffect } from '@vue/runtime-core';

export default {
    props: ["newPerson"],
    setup (props, { emit }) {
        const selectedMembers = ref([]);
        const memberSelectInput = ref(null);
        const memberListShown = ref(false);
        const inputBlurred = ref(true);
        const memberSearchResults = ref([]);
        const searchText = ref("");
        const loading = ref(false);
        const position = ref("");
        const isGroupLeader = ref(false)
        const enableLogin = ref(false)
        const groupMembers = ref([])
        const modalStatus = ref("")

        const showMemberList = () => {
            memberListShown.value = true;
            inputBlurred.value = false;
        };

        const searchForMembers = (e) => {
            if (e.target.value.length >= 3) {
                memberSearchResults.value = [];
                loading.value = true;
                composeService
                .searchMemberDB("/api/Membership/GetSearchedUSers", e.target.value)
                .then((res) => {
                    console.log(res, "res");
                    loading.value = false;
                    memberSearchResults.value = res.filter((i) => {
                    const memberInExistingMembers = selectedMembers.value.findIndex(
                        (j) => j.id === i.id
                    );
                    if (
                        memberInExistingMembers >= 0 ||
                        groupMembers.value.findIndex((k) => k.personID === i.id) >= 0
                    )
                        return false;
                    return true;
                    });
                });
            } else {
                memberSearchResults.value = [];
            }
        };

        const selectMember = (member, index) => {
            console.log(member, "member");
            selectedMembers.value.push(member);
            memberSearchResults.value.splice(index, 1);
            searchText.value = "";
            memberListShown.value = false;
            memberSearchResults.value = [];
            };

         const removeMember = (index) => {
          selectedMembers.value.splice(index, 1);
        };

        const showAddMemberForm = () => {
            emit("displayForm", true)
        };

        watchEffect(() => {
            if(Object.keys(props.newPerson).length > 0) {
                let body = {
                    name: props.newPerson.personFirstName,
                    personId: props.newPerson.personId,
                    email: props.newPerson.personEmail,
                    phoneNumber: props.newPerson.personNumber
                }
                selectedMembers.value.push(body)
                console.log(selectedMembers)
            }
        })


        return {
            selectedMembers,
            memberSelectInput,
            showMemberList,
            memberListShown,
            inputBlurred,
            memberSearchResults,
            searchText,
            loading,
            isGroupLeader,
            position,
            enableLogin,
            searchForMembers,
            groupMembers,
            selectMember,
            removeMember,
            showAddMemberForm,
            modalStatus
        }
    }
}
</script>

<style scoped>
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
</style>