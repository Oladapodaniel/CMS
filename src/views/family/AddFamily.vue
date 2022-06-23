<template>
    <div class="container-wide container-top">
        <div class="row my-3">
            <div class="col-12 page-header">
                Add Family
            </div>
        </div>

        <div class="row">
            <div class="col-md-12">
                <hr class="hr" />
            </div>
      </div>

        <div class="row my-4 pt-4">
            <div class="col-md-6 offset-md-2">
                <div class="row">
                    <div class="col-md-4 text-md-right align-self-center">
                        <label for="" class="">Family Name</label>
                    </div>
            
                    <div class="col-md-8">
                        <input type="text" v-model="familyName" class="form-control" autocomplete="off" />
                    </div>
                </div>
            </div>

            <div class="col-md-6 offset-md-2 mt-4">
                <div class="row">
                    <div class="col-md-4 text-md-right align-self-center">
                        <label for="" class="">Father</label>
                    </div>
                    <!-- Father Dropdown -->
                    <div class="col-md-8">
                        <div class="dropdown">
                        
                        <input
                            type="text"
                            class="form-control"
                            id="dropdownMenuButton"
                            data-toggle="dropdown"
                            v-model="userSearchString"
                            @input="searchForUsers"
                            :disabled="routeParams !== ''"
                            autocomplete="off"
                        />
                        <div
                            class="dropdown-menu w-100"
                            aria-labelledby="dropdownMenuButton"
                        >
                            <div class="row w-100 mx-auto" v-if="false">
                            <div class="col-md-12">
                                <input
                                type="text"
                                class="form-control"
                                placeholder="Find event"
                                />
                            </div>
                            </div>

                            <a
                            class="dropdown-item font-weight-700 small-text"
                            href="#"
                            v-for="(member, index) in searchedMembers"
                            :key="index"
                            @click="addExistingMember(member)"
                            >{{ member.name }}</a
                            >
                            <a
                            class="dropdown-item font-weight-700 small-text"
                            href="#"
                            v-if="
                                searchingForMembers && searchedMembers.length === 0
                            "
                            ><i class="pi pi-spin pi-spinner"></i
                            ></a>
                            <p
                            class="modal-promt pl-1 bg-secondary m-0"
                            v-if="
                                userSearchString.length < 3 &&
                                searchedMembers.length === 0
                            "
                            >
                            Enter 3 or more characters
                            </p>
                            <a
                            class="font-weight-bold small-text d-flex justify-content-center py-2 text-decoration-none primary-text c-pointer"
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

        <div class="row mt-4">
            <div class="col-md-6 offset-md-2">
                <div class="row">
                    <div class="col-md-4 text-md-right align-self-center">
                        <label for="" class="">Mother</label>
                    </div>
                    <div class="col-md-8">
                        <div class="dropdown">
                            
                            <input
                                type="text"
                                class="form-control"
                                id="dropdownMenuButton"
                                data-toggle="dropdown"
                                v-model="motherSearchString"
                                @input="motherSearchForUsers"
                                :disabled="routeParams !== ''"
                                autocomplete="off"
                            />
                            <div
                                class="dropdown-menu w-100"
                                aria-labelledby="dropdownMenuButton"
                            >
                                <div class="row w-100 mx-auto" v-if="false">
                                <div class="col-md-12">
                                    <input
                                    type="text"
                                    class="form-control"
                                    placeholder="Find event"
                                    />
                                </div>
                                </div>

                                <a
                                class="dropdown-item font-weight-700 small-text"
                                href="#"
                                v-for="(member, index) in motherSearchedMembers"
                                :key="index"
                                @click="addExistingMemberForMother(member)"
                                >{{ member.name }}</a
                                >
                                <a
                                class="dropdown-item font-weight-700 small-text"
                                href="#"
                                v-if="
                                    motherSearchingForMembers && motherSearchedMembers.length === 0
                                "
                                ><i class="pi pi-spin pi-spinner"></i
                                ></a>
                                <p
                                class="modal-promt pl-1 bg-secondary m-0"
                                v-if="
                                    motherSearchString.length < 3 &&
                                    motherSearchedMembers.length === 0
                                "
                                >
                                Enter 3 or more characters
                                </p>
                                <a
                                class="font-weight-bold small-text d-flex justify-content-center py-2 text-decoration-none primary-text c-pointer"
                                style="border-top: 1px solid #002044; color: #136acd"
                                @click="showAddMemberFormForMother"
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
            <div class="col-md-6 offset-md-2 mt-4">
                <div class="row">
                    <div class="col-md-4 text-md-right align-self-center">
                        <label for="" class="">Email</label>
                    </div>
        
                    <div class="col-md-8">
                        <input type="text" v-model="email" class="form-control" autocomplete="off" />
                    </div>
                </div>
            </div>

            <div class="col-md-6 offset-md-2 my-4">
                <div class="row">
                    <div class="col-md-4 text-md-right align-self-center">
                        <label for="">Phone Number</label>
                    </div>
        
                    <div class="col-md-8">
                        <input type="text" v-model="homePhone" class="form-control" autocomplete="off" />
                    </div>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="col-md-12">
                <hr class="hr" />
            </div>
        </div>

        

        <div class="row mt-5">
            <div class="col-md-10 mx-auto">
                <FamilyWards :familyMembers="familyMembers" :memberRoles="memberRoles" @edit-member="editMember" @clear-field="clearField" @member-index="memberOfIndex" :showWardModal="showWardModal" @remove-ward="removeWard"/>
            </div>
        </div>

        <div class="row my-5">
            <div class="col-md-10 mx-auto d-flex justify-content-center my-5">
                <button class="default-btn text-dark font-weight-bold border mx-4">Cancel</button>
                <button  @click="createFamily" class="default-btn font-weight-bold border text-white primary-bg mx-4">Save</button>
            </div>
        </div>

        <!-- Add Ward Modal -->
        <div class="modal fade" id="addWard" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered " role="document">
                <div class="modal-content">
                <div class="modal-header py-4">
                    <h4 class="modal-title font-weight-bold px-4" id="exampleModalLabel">Add New Ward</h4>
                    <button type="button" ref="close" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true"><i class="pi pi-times"></i>
                    </span>
                    </button>
                </div>
                <!-- :familyDetails="familyDetails" -->
                <!-- :memberDetails="memberDetails"  -->
                <!-- @editted-value="edittedValue" -->
                <div class="modal-body">
                    <!-- <MemberForm  @member-roles="getMemberRoles" @remove-modal="dismissModal" @push-to-view="pushToView" /> -->
                    <div class="row px-4 pb-3">
                        <div class="col-sm-10">Search for ward in church</div>
                        <div class="dropdown col-sm-10">
                                
                                <input
                                    type="text"
                                    placeholder="Enter ward name"
                                    class="form-control mt-2"
                                    id="dropdownMenuButton"
                                    data-toggle="dropdown"
                                    v-model="wardSearchString"
                                    @input="wardSearchForUsers"
                                />
                                <div
                                    class="dropdown-menu w-100"
                                    aria-labelledby="dropdownMenuButton"
                                >
                                    <div class="row w-100 mx-auto" v-if="false">
                                    <div class="col-md-12">
                                        <input
                                        type="text"
                                        class="form-control"
                                        placeholder="Find event"
                                        />
                                    </div>
                                    </div>

                                    <a
                                    class="dropdown-item font-weight-700 small-text"
                                    href="#"
                                    v-for="(member, index) in wardSearchedMembers"
                                    :key="index"
                                    @click="addExistingMemberForWard(member)"
                                    >{{ member.name }}</a
                                    >
                                    <a
                                    class="dropdown-item font-weight-700 small-text"
                                    href="#"
                                    v-if="
                                        wardSearchingForMembers && wardSearchedMembers.length === 0
                                    "
                                    ><i class="pi pi-spin pi-spinner"></i
                                    ></a>
                                    <p
                                    class="modal-promt pl-1 bg-secondary m-0"
                                    v-if="
                                        wardSearchString.length < 3 &&
                                        wardSearchedMembers.length === 0
                                    "
                                    >
                                    Enter 3 or more characters
                                    </p>
                                    <a
                                    class="font-weight-bold small-text d-flex justify-content-center py-2 text-decoration-none primary-text c-pointer"
                                    style="border-top: 1px solid #002044; color: #136acd"
                                    @click="showAddMemberFormForWard"
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

                                <div class="col-sm-10 mt-3">Role</div>
                                <div class="col-sm-10">
                                    <!-- <Dropdown class="p-0 w-100" :options="memberRoles" v-model="roleId" optionLabel="name" :filter="false" placeholder="Select role" :showClear="false">
                                    </Dropdown> -->
                                    <div class="dropdown">
                                        <button class="btn w-100 d-flex justify-content-between border " type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                           <span class="ofering">
                                            &nbsp;&nbsp;&nbsp; {{ roleId.name ?  roleId.name : 'Select role' }}
                                        </span>
                                        <span>
                                            <i class="pi pi-angle-down offset-sm-2 ofering"></i>
                                        </span>
                                        </button>
                                        <div   class="dropdown-menu w-100" aria-labelledby="dropdownMenuButton">
                                            <a v-for="(itm, indx) in memberRoles" :key="indx" @click="selectmemberRole(itm)" class="dropdown-item" href="#">{{itm.name}}</a>
                                        </div>
                                    </div>
                                </div>


                                    <div class="col-md-6 mt-4">
                                        <button class="default-btn" data-dismiss="modal">Cancel</button>
                                    </div>
                                    <div class="col-md-6 mt-4">
                                        <button
                                        class="default-btn primary-bg border-0 text-white"
                                        data-dismiss="modal"
                                        @click="addWard"
                                        >
                                        Save
                                        </button>
                                    </div>
                                </div>
                    </div>
                </div>
            </div>
        </div>

        <Dialog
        header="Create New Member"
        v-model:visible="display"
        :style="{ width: '70vw', maxWidth: '600px' }"
        :modal="true"
        position="top"
        >
        <div class="row">
            <div class="col-md-12">
            <NewPerson @cancel="() => display = false" @person-id="getFatherId($event)"/>
            </div>
      </div>
    </Dialog>
        
        <Dialog
        header="Create New Member"
        v-model:visible="motherDisplay"
        :style="{ width: '70vw', maxWidth: '600px' }"
        :modal="true"
        position="top"
        >
        <div class="row">
            <div class="col-md-12">
            <NewPerson @cancel="() => motherDisplay = false" @person-id="getMotherId($event)"/>
            </div>
      </div>
    </Dialog>
        
        <Dialog
        header="Create New Member"
        v-model:visible="wardDisplay"
        :style="{ width: '70vw', maxWidth: '600px'}"
        :modal="true"
        position="top"
        >
        <div class="row">
            <div class="col-md-12">
            <NewPerson @cancel="() => wardDisplay = false" @person-id="getWardId($event)" @show-ward-modal="setWardModal"/>
            </div>
      </div>
    </Dialog>

    <Toast />
    </div>
</template>

<script>
import { ref } from "vue"
import FamilyWards from "./FamilyWards";
// import MemberForm from "../ChildCheckinPortal/FormMember.vue"
import membershipService from "../../services/membership/membershipservice";
import Dialog from "primevue/dialog";
import NewPerson from '../../components/membership/NewDonor.vue';
import axios from "@/gateway/backendapi";
import router from "@/router/index";
import { useRoute } from "vue-router"
import Dropdown from 'primevue/dropdown';
import { useToast } from "primevue/usetoast";

export default {
    components: { 
        FamilyWards,
        // MemberForm,
        Dialog,
        NewPerson,
        Dropdown
     },
    setup () {
        const toast = useToast()
        const route = useRoute()
        const familyMembers = ref([])
        const memberRoles = ref([])
        const close = ref("")
        const father = ref("")
        const mother = ref("")
        const userSearchString = ref("");
        const searchingForMembers = ref(false)
        const searchedMembers = ref([]);
        const display = ref(false)
        const motherSearchString = ref("");
        const motherSearchingForMembers = ref(false)
        const motherSearchedMembers = ref([]);
        const motherDisplay = ref(false)
        const wardSearchString = ref("");
        const wardSearchingForMembers = ref(false)
        const wardSearchedMembers = ref([]);
        const wardDisplay = ref(false)
        const selectedMember = ref({})
        const homePhone = ref("")
        const email = ref("")
        const familyName = ref("")
        const roleId = ref({})
        const familyMain = ref({})
        const editPersonId = ref("")
        const wardState = ref(1)
        const memberIndex = ref(0)
        // const constructSelectedMember = ref({})
        const showWardModal = ref(false)
        const routeParams = ref(route.params.familyId)

        

        const getFamilyRoles = async () => {
            console.log(routeParams.value !== "")
        try {
            let { data } = await axios.get('/getfamilyroles')
            console.log(data)
            memberRoles.value = data.result
            getFamilyDetails()
        }
        catch (err) {
            console.log(err)
        }
    }
    getFamilyRoles()

        const dismissModal = () => {
            close.value.click()
        }

        // const pushToView = (payload) => {
        //     let data = {
        //         person: {
        //             firstName: payload.firstName,
        //             lastName: payload.lastName,
        //             pictureUrl: payload.pictureUrl,
        //             genderID: payload.genderID
        //         },
        //         familyRoleID: payload.roleId
        //     }
        //     familyMembers.value.push(data)
        //     console.log(data)
        // }

        

        // Search member for father
        const searchForUsers = () => {
          if (userSearchString.value.length >= 3) {
            startSearch(userSearchString.value);
          }
        };

        const startSearch = async (str) => {
          try {
            searchingForMembers.value = true;
            const response = await membershipService.searchMembers(str);
            searchingForMembers.value = false;
            searchedMembers.value = response;
          } catch (error) {
            searchingForMembers.value = false;
            console.log(error);
          }
        };

        const showAddMemberForm = () => {
          display.value = true;
        };

        const selectmemberRole = (itm) => {
            roleId.value = itm
            console.log(roleId.value, "nn😂😁😁")
        }
        
        const addExistingMember = (member) => {
          userSearchString.value = member.name;
          email.value = member.email
          homePhone.value = member.phone
          father.value = {
              firstName: member.name.split(" ")[0],
              lastName: member.name.split(" ")[1],
              id: member.id,
              email: member.email,
              phone: member.phone
          }
          console.log(userSearchString.value, member)
          console.log(father.value)
        }

        const getFatherId = (payload) => {
          console.log(payload)
          userSearchString.value = payload.personFirstName
          father.value = {
              firstName: payload.personFirstName,
              id: payload.personId
          }
          console.log(father.value)
        }
        
        
        
        // SearchMember for mother
        const motherSearchForUsers = () => {
          if (motherSearchString.value.length >= 3) {
            motherStartSearch(motherSearchString.value);
          }
        };

        const motherStartSearch = async (str) => {
          try {
            motherSearchingForMembers.value = true;
            const response = await membershipService.searchMembers(str);
            motherSearchingForMembers.value = false;
            motherSearchedMembers.value = response;
          } catch (error) {
            motherSearchingForMembers.value = false;
            console.log(error);
          }
        };

        const showAddMemberFormForMother = () => {
          motherDisplay.value = true;
        };

        const addExistingMemberForMother = (member) => {
          motherSearchString.value = member.name;
          if (!father.value) {
              email.value = member.email;
              homePhone.value = member.phone
          }
          mother.value = {
              firstName: member.name.split(" ")[0],
              lastName: member.name.split(" ")[1],
              id: member.id,
              email: member.email,
              phone: member.phone
          }
          console.log(motherSearchString.value, member)
          console.log(mother.value)
        }

        const getMotherId = (payload) => {
          console.log(payload)
          motherSearchString.value = payload.personFirstName

          mother.value = {
              firstName: payload.personFirstName,
              id: payload.personId
          }
          console.log(mother.value)
        }
       
       
       // SearchMember for ward
        const wardSearchForUsers = () => {
          if (wardSearchString.value.length >= 3) {
            wardStartSearch(wardSearchString.value);
          }
        };

        const wardStartSearch = async (str) => {
          try {
            wardSearchingForMembers.value = true;
            const response = await membershipService.searchMembers(str);
            wardSearchingForMembers.value = false;
            wardSearchedMembers.value = response;
          } catch (error) {
            wardSearchingForMembers.value = false;
            console.log(error);
          }
        };

        const showAddMemberFormForWard = () => {
          wardDisplay.value = true;
        };

        const addExistingMemberForWard = (member) => {
          wardSearchString.value = member.name;
        //   wardIndex.value = index
          selectedMember.value = member
        //   mother.value = {
        //       firstName: member.name.split(" ")[0],
        //       lastName: member.name.split(" ")[1],
        //       id: member.id,
        //       email: member.email,
        //       phone: member.phone
        //   }
          console.log(wardSearchString.value, member)
        //   console.log(mother.value)
        }

        const getWardId = (payload) => {
          console.log(payload)
          wardSearchString.value = payload.personFirstName

        //   const constructSelectedMember = new Object()
          selectedMember.value.name = payload.personFirstName
          selectedMember.value.id = payload.personId
        //   familyMembers.value.push(constructSelectedMember)
          console.log(selectedMember)
        }

        const addWard = async() => {
            console.log(wardState.value)
            if (!selectedMember.value.id) {
                toast.add({
                        severity: "info",
                        summary: "The ward has to be selected from the church",
                        detail: "Kindly choose the ward from the church membership list or create him/her as a member first",
                        life: 10000,
                    });
                    wardSearchString.value = ""
                return false
            }
            if (wardState.value === 1 && !route.params.familyId) {
                const constructSelectedMember = new Object()
                constructSelectedMember.name = selectedMember.value.name
                constructSelectedMember.personId = selectedMember.value.id
                constructSelectedMember.roleId = roleId.value
                familyMembers.value.push(constructSelectedMember)
                console.log(constructSelectedMember)
                console.log(familyMembers.value)
                wardSearchString.value = ""
            }   else if (wardState.value === 1 && route.params.familyId) {
                // Push to view
                const constructSelectedMember = new Object()
                constructSelectedMember.name = selectedMember.value.name
                constructSelectedMember.personId = selectedMember.value.id
                constructSelectedMember.roleId = roleId.value
                familyMembers.value.push(constructSelectedMember)

                //  Save to DB
                const memberDetails = {
                    familyId: familyMain.value.familyId,
                    personId: constructSelectedMember.personId,
                    tenantId: familyMain.value.tenantId,
                    familyRoleId: roleId.value.id
                }

                 try {
                    let { data } = await axios.post('/api/Family/addFamilyMember', memberDetails)
                        console.log(data)
                    }
                    catch (err) {
                        console.log(err)
                    }
            }   else {

                const memberDetails = {
                    // familyId: props.familyDetails.id,
                        id: familyMain.value.id,
                        familyRoleId: roleId.value.id,
                        person: {
                            firstName: wardSearchString.value,
                            // lastName: person.value.lastName,
                            id: editPersonId.value
                        },
                        tenantId: familyMain.value.tenantId
                    }
                    familyMembers.value.splice(memberIndex.value, 1, { name: wardSearchString.value, roleId: roleId.value })
                    console.log(memberDetails)
                    // delete memberDetails.familyId
                try {
                    let { data } = await axios.put("/api/Family/editFamilyMember", memberDetails)
                    console.log(data)
                }
                catch (err) {
                    console.log(err)
                }
            }
                showWardModal.value = false
           }

        const createFamily = async() => {
            const family = {
                familyName: familyName.value,
                fatherId: father.value.id,
                motherId: mother.value.id,
                homePhone: homePhone.value,
                email: email.value,
                familyMembers: familyMembers.value.map(i => {
                    return {
                        personId: i.personId,
                        familyRoleId: i.roleId.id
                    }
                })
            }
            console.log(family)


            const updateProfile = {
              id: familyMain.value.familyId,
              familyName: familyName.value,
              email: email.value,
              homePhone: homePhone.value,
              fatherId: father.value.id,
              motherId: mother.value.id
            }
            // if (userSearchString.value) {
            //    updateProfile.father = {
            //        id: father.value.id
            //     //   firstName: userSearchString.value,
            //     //   lastName: profile.value.lastName,
            //     //   pictureUrl: profile.value.pictureUrl
            //     }
            // } 
            // if (motherSearchString.value) {
            //   updateProfile.mother = {
            //       id: mother.value.id
            //     //   firstName: motherSearchString.value,
            //     //   lastName: profile.value.lastName,
            //     //   pictureUrl: profile.value.pictureUrl
            //     }
            // }

            
            if (!route.params.familyId) {
                if (!father.value.id) {
                    toast.add({
                        severity: "info",
                        summary: "The father has to be selected from the church",
                        detail: "Kindly choose the father from the church membership list or create him as a member first",
                        life: 10000,
                    });
                    userSearchString.value = ""
                    return false
                }
                if (!mother.value.id) {
                    console.log("Select mother")
                    toast.add({
                        severity: "info",
                        summary: "The mother has to be selected from the church",
                        detail: "Kindly choose the mother from the church membership list or create her as a member first",
                        life: 10000,
                    });
                    motherSearchString.value = ""
                    return false
                }
                try {
                    let res = await axios.post("/api/family/createFamily", family)
                    console.log(res)
                    router.push('/tenant/family')
                }
                catch (err) {
                    console.log(err)
                }
            }   else {
                try {
                    let res = await axios.put("/api/family/editProfile", updateProfile)
                    console.log(res)
                    router.push('/tenant/family')
                }
                catch (err) {
                    console.log(err)
                }
            }
        }

        const getFamilyDetails = async() => {
            if(route.params.familyId) {
                try {
                    const res = await axios.get(`/api/Family/family?personId=${route.params.familyId}`)
                    console.log(res)
                    familyName.value = res.data.familyName

                    userSearchString.value = `${res.data.father && res.data.father.firstName ? res.data.father.firstName : ""} ${res.data.father && res.data.father.lastName? res.data.father.lastName : ""}`

                    motherSearchString.value = `${res.data.mother && res.data.mother.firstName ? res.data.mother.firstName : ""} ${res.data.mother && res.data.mother.lastName ? res.data.mother.lastName : ""}`

                    father.value = { id: res.data.fatherID }

                    mother.value = { id: res.data.motherID }

                    email.value = res.data.email

                    homePhone.value = res.data.homePhone

                    familyMembers.value = res.data.familyMembers.map(i => {
                        return {
                            name: i.person.firstName,
                            personId: i.person.id,
                            roleId: memberRoles.value.find(j => j.id === i.familyRoleID),
                            id: i.id
                        }
                    })

                    familyMain.value = {
                        familyId: res.data.id,
                        id: res.data.familyMembers.length > 0 ? res.data.familyMembers[memberIndex.value].id : 0,
                        tenantId: res.data.tenantID
                    }

                console.log(memberRoles.value)
                    console.log(familyMembers.value)


                }
                catch (error) {
                    console.log(error)
                }
            }
        }

        const editMember = (payload) => {
            wardSearchString.value = payload.name
            roleId.value = payload.roleId
            editPersonId.value = payload.personId
            wardState.value = 2
            
        }

        const clearField = (payload) => {
            wardSearchString.value = payload.name
            roleId.value = payload.roleId
            wardState.value = 1
        }

        const memberOfIndex = (payload) => {
            memberIndex.value = payload
        }

        const setWardModal = (payload) => {
            showWardModal.value = payload
        }

        const removeWard = (payload) => {
            familyMembers.value.splice(payload, 1)
        }
         

        return {
            memberRoles,
            selectmemberRole,
            dismissModal,
            close,
            // pushToView,
            familyMembers,
            createFamily,
            mother,
            father,
            userSearchString,
            searchForUsers,
            startSearch,
            searchingForMembers,
            searchedMembers,
            showAddMemberForm,
            getFatherId,
            addExistingMember,
            display,
            motherSearchForUsers,
            showAddMemberFormForMother,
            addExistingMemberForMother,
            motherDisplay,
            getMotherId,
            motherSearchedMembers,
            motherSearchString,
            motherSearchingForMembers,
            wardSearchForUsers,
            showAddMemberFormForWard,
            addExistingMemberForWard,
            wardDisplay,
            getWardId,
            wardSearchedMembers,
            wardSearchString,
            wardSearchingForMembers,
            addWard,
            // wardIndex,
            selectedMember,
            homePhone,
            email,
            familyName,
            roleId,
            editMember,
            clearField,
            familyMain,
            editPersonId,
            wardState,
            memberIndex,
            memberOfIndex,
            showWardModal,
            setWardModal,
            removeWard,
            routeParams
        }
    }
}
</script>

<style scoped>
.page-header {
    font: normal normal 800 29px Nunito sans;
}

.dropdown-menu {
    max-height: 500px;
    overflow: scroll;
}
</style>