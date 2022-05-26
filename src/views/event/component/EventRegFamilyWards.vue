<template>
    <div class="container ward-table-wrapper">
        <div class="row my-3">
            <div class="col-md-10 mx-auto d-flex justify-content-end">
                <button class="default-btn font-weight-bold border primary-text add-ward-btn c-pointer" ref="showModal"
                    data-toggle="modal" data-target="#addWard"
                >Add ward</button>
            </div>
        </div>
        <div class="row th py-2" v-if="family && family.familyMembers && family.familyMembers.length > 0">
            <div class="offset-1 col-1">
                <!-- <span class="py-2 font-weight-700">Picture</span> -->
            </div>
            <div class="col-5">
                <span class="py-2 font-weight-700">Name</span>
            </div>
            <div class="col-4">
                <span class="py-2 font-weight-700">Relationship</span>
            </div>
            <div class="col-md-1">
                <!-- <span class="py-2 font-weight-700">Role</span> -->
            </div>
        </div>
        <div v-else class="text-center border-top py-4 increase-font">
            When you add wards, they will show up here
        </div>
        
        <div class="row py-2" v-for="(member, index) in family.familyMembers" :key="index">
            <div class="offset-1 col-1">
                <Checkbox v-model="member.checkMember" :binary="true" />
            </div>
            <div class="col-5 align-self-center">
                <span class="py-2">{{ member.person ? member.person.firstName : "" }} {{ member.person && member.person.lastName ? member.person.lastName : "" }}</span>
            </div>
            <div class="col-3 align-self-center">
                {{ memberRoles.find(i => i.id === member.familyRoleID).name }}
            </div>
            <div class="col-1 align-self-center" @click="showConfirmModal(member.id, index)">
            </div>
        </div>
    </div>
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
                        

                                <div class="col-sm-12 align-self-center">Name  <span class="text-danger">*</span></div>
                                <div class="col-sm-12 mt-2">
                                    <input type="text" class="form-control" v-model="memberName" placeholder="Enter your name"/>
                                </div>
                                
                                <div class="col-sm-12 align-self-center mt-3">Phone Number</div>
                                <div class="col-sm-12 mt-2">
                                    <input type="text" class="form-control" v-model="memberPhone" placeholder="Enter phone number"/>
                                    <div class="small-text mt-1"><span class="font-weight-700">Note</span>: <em>Phone number is optional</em></div>
                                </div>

                                <div class="col-sm-12 align-self-center mt-3">Relationship</div>
                                <div class="col-sm-12 dropdown mt-2">
                                    <button class="   btn d-flex justify-content-between  col-12 border   " type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <span class="ofering">
                                            &nbsp;&nbsp;&nbsp; {{ roleId.name ?  roleId.name : 'Select role' }}
                                        </span>
                                        <span>
                                            <i class="pi pi-angle-down offset-sm-2 ofering"></i>
                                        </span>
                                    </button>
                                    <div class="dropdown-menu scroll w-100 " aria-labelledby="dropdownMenuButton">
                                        <a class="dropdown-item" v-for="(item, index) in memberRoles" :key="index">
                                            <div class="cursor-pointer" @click="selectRoleId(item)"> {{item.name}}</div> 
                                        </a>
                                    </div>
                                    <!-- <Dropdown class="p-0 w-100" :options="memberRoles" v-model="roleId" optionLabel="name" :filter="false" placeholder="Select role" :showClear="false">
                                    </Dropdown> -->
                                </div>
                                </div>
                                <div class="row d-flex justify-content-end mr-4">
                                   
                                        <button class="default-btn mr-2" data-dismiss="modal">Cancel</button>
                                        <button
                                        class="default-btn primary-bg border-0 text-white"
                                        data-dismiss="modal"
                                        @click="createPerson"
                                        >
                                        Save
                                        </button>
                                    </div>
                       
                    </div>
                </div>
            </div>
        </div>
    <ConfirmDialog />
    <Toast />
    
</template>

<script>
import { ref } from "vue"
import { watch } from '@vue/runtime-core'
import axios from "@/gateway/backendapi";
// import { useConfirm } from "primevue/useConfirm";
// import { useToast } from "primevue/usetoast";
import Dropdown from "primevue/dropdown";
// import membershipService from "../../../services/membership/membershipservice";

export default {
    props: ['family', 'memberRoles', 'showWardModal', 'fullEventData'],
    emits: ['newmember', 'nofamilynewmember'],
    components: {
        Dropdown
    },
    setup (props, { emit }) {
        
        const showModal = ref("")
        // const confirm = useConfirm()
        // const toast = useToast()
        // const userSearchStringWard = ref("")
        // const searchingForMembers = ref(false)
        // const searchedMembers = ref([])
        const memberName = ref("")
        const memberPhone = ref("")
        const roleId = ref({})

        // const editMember = (member, index) => {
        //     console.log(member)
        //     emit('edit-member', member)
        //     emit('member-index', index)
        // }

    

        watch(() => {
            console.log(props.showWardModal)
            console.log("what happen")
            if(props.showWardModal) {
                showModal.value.click()
            }
        })

        // const deleteMember = async(id, index) => {
        // console.log(id)
        //     if (id) {
        //     try {
        //             const res = await axios.delete(`/api/Family/removeAFamilyMember?id=${id}`)
        //             console.log(res)
        //             toast.add({
        //                 severity: "success",
        //                 summary: "Deleted",
        //                 detail: "Deleted Successfully",
        //                 life: 3000,
        //             });
                
        //             emit("remove-ward", index)
        //             console.log(index)
        //         }
        //         catch (error) {
        //             console.log(error)
        //         }
        //         } else {
              
        //         toast.add({
        //                 severity: "success",
        //                 summary: "Deleted",
        //                 detail: "Deleted Successfully",
        //                 life: 3000,
        //             });
        //         }

        //     }

        // const showConfirmModal = (id, index) => {
        //     confirm.require({
        //         message: "Are you sure you want to proceed?",
        //         header: "Confirmation",
        //         icon: "pi pi-exclamation-triangle",
        //         acceptClass: "confirm-delete",
        //         rejectClass: "cancel-delete",
        //         accept: () => {
        //         deleteMember(id, index);
        //         },
        //         reject: () => {
        //         toast.add({
        //             severity: "info",
        //             summary: "Discarded",
        //             detail: "Delete discarded",
        //             life: 3000,
        //         });
        //         },
        //     });
        //     };
            const selectRoleId = (item) =>{
                roleId.value = item
            }

            const createPerson = () => {
                if (props.family.id) {
                    // let formData = new FormData()
                    // formData.append('firstName', memberName.value)
                    // formData.append('mobilePhone', memberPhone.value)
                    const createPerson = {
                        firstName: memberName.value,
                        mobilePhone: memberPhone.value,
                        tenantId: props.fullEventData.tenantID
                    }
                    try {
                        return new Promise((resolve, reject) => {
                            axios.post("/createPublicPerson", createPerson)
                                .then(res => {
                                    console.log(res)
                                    resolve(res.data); 
                                    let newPerson = {
                                        name: res.data.returnObject.firstName,
                                        id: res.data.returnObject.id,
                                        checkMember: true
                                    }
                                    addMembers(newPerson)
                                })
                                .catch(error => {
                                    console.log(error)
                                    if (error.response) {
                                        reject(error.response);
                                    } else {
                                        reject(error);
                                    }
                                })
                        })
        
                    } catch (error) {
                        console.log(error);
                    }
                }   else {
                    // let formData = new FormData()
                    // formData.append('firstName', memberName.value)
                    // formData.append('mobilePhone', memberPhone.value)
                    const createPerson = {
                        firstName: memberName.value,
                        mobilePhone: memberPhone.value,
                        tenantId: props.fullEventData.tenantID
                    }
                    try {
                        return new Promise((resolve, reject) => {
                            axios.post("/createPublicPerson", createPerson)
                                .then(res => {
                                    console.log(res)
                                    resolve(res.data); 
                                    let newPerson = {
                                        name: res.data.returnObject.firstName,
                                        personId: res.data.returnObject.id,
                                        familyRoleId: roleId.value.id,
                                        checkMember: true
                                    }
                                    emit('nofamilynewmember', newPerson)

                                    memberPhone.value = ""
                                    memberName.value = ""
                                    roleId.value = {}
                                    
                                })
                                .catch(error => {
                                    console.log(error)
                                    if (error.response) {
                                        reject(error.response);
                                    } else {
                                        reject(error);
                                    }
                                })
                        })
        
                    } catch (error) {
                        console.log(error);
                    }
                }
            }

            const addMembers = async(personDetails) => {
                let memberDetails = {
                    familyId: props.family.id,
                    familyRoleId: roleId.value.id,
                    personId: personDetails.id,
                    tenantId: props.fullEventData.tenantID
                }
                try {
                    let { data } = await axios.post('/addFamilyMember', memberDetails)
                    console.log(data)
                    let newMember = {
                        person: {
                            firstName: memberName.value,
                            phone: memberPhone.value
                        },
                        familyRoleID: roleId.value.id,
                        checkMember: true
                    }
                    emit('newmember', newMember)
                }
                catch (error) {
                    console.log(error)
                }
            }

        // const searchForUsersWard = () => {
        //   if (userSearchStringWard.value.length >= 3) {
        //     startSearchWard(userSearchStringWard.value);
        //   }
        // };

        // const startSearchWard = async (str) => {
        //   try {
        //     searchingForMembers.value = true;
        //     const response = await membershipService.searchMembers(str);
        //     searchingForMembers.value = false;
        //     searchedMembers.value = response;
        //   } catch (error) {
        //     searchingForMembers.value = false;
        //     console.log(error);
        //   }
        // };

        return {
            // editMember,
            showModal,
            selectRoleId,
            // deleteMember,
            // showConfirmModal,
            // searchForUsersWard,
            // searchForUsersWard,
            // userSearchStringWard,
            // searchingForMembers,
            // searchedMembers
            memberPhone,
            memberName,
            createPerson,
            addMembers,
            roleId
        }
    }
}
</script>

<style  scoped>
    .th {
        background: #DDE2E6 0% 0% no-repeat padding-box;
    }

    .scroll{
        max-height: 200px;
        overflow-y: scroll;
        overflow-x: hidden;
    }

    .ward-table-wrapper {
        background: #FFFFFF 0% 0% no-repeat padding-box;
        border: 1px solid #DDE2E6;
        border-radius: 30px;
        opacity: 1;
    }

    .add-ward-btn {
        border: 1px solid #2E67CE !important;
    }

    .member-image {
        height: 60px;
        width: 60px;
        border-radius: 50%;
    }

    .increase-font {
        font-size: 1.1em
    }
</style>