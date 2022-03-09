<template>
    <div class="container-wide" :class="{ 'container-top' : !route.fullPath.includes('createpeoplegroup') }">
        <div class="row">
            <div class="col-12 col-md-12 col-lg-12 header">
                <div>Import members from Excel/CSV </div>
                <div class="border-bottom w-100 my-4 col-12  col-md-12 col-lg-12 "></div>
            </div>
            
            <div class="col-12 col-md-10  col-lg-11 col-xl-11">
                <p>You can easily import members from any spreadsheet with .xlsx/.xlx or .csv file format. </p>
            </div>
            <div class="col-6 col-md-12 col-lg-12 text-secondary font-weight-normal lead"> Members Excel/CSV template file </div>
            <div class="col-12 col-md-12 mb-3">
                <a href="/files/Template.csv" class="text-decoration-none font-weight-bold" download>Download and view our members Excel/CSV template.</a>
                <span>You can use this as a template for creating your Excel/CSV file.</span>
            </div>
            <div class=" col-lg-12 col-md-12 mx-1 border  rounded">
                <div class="col-md-12 col-12 col-lg-12 mt-3 ">
                    <input type="file" @change="imageSelected" class="form-control col-sm-4 c-pointer">
                </div>
                <div class="col-12 offset-md-4 text-center  my-3" @click="uploadFile">
                     <button class="border-0 primary-bg text-white default-btn form-control">Upload and preview members</button>
                </div>
                <div class="border-bottom w-100 my-2 col-md-12 "></div>
                <div class="col-12 col-md-7 col-lg-7 my-3  small "> Maximum 5MB file size.</div>
            </div>
                    <div class="col-lg-12 col-md-12">
                        <div class="mt-4">
                            <span>Need help creating your Excel or CSV file?</span> 
                            <a href="#" @click="toggleInstruction" class=" text-decoration-none  font-weight-bold "> View Instruction <i class="pi pi-angle-down" :class="{ 'rollIcon' : addInstructionClass, 'closeIcon' : !addInstructionClass }"></i></a> 
                        </div>
                        
                    </div>
            <div class="col-12" :class="{ 'show-instruction' : addInstructionClass, 'hide-instruction' : !addInstructionClass }">
                <div class="row">
                    <div class="col-6 col-md-12 col-lg-12 text-secondary font-weight-normal lead my-3 "> File format </div>
                    <div class="col-10 col-md-12">
                        <span>The first line of your members Excel/CSV must include all of the headers listed below, which are included in the member Excel/CSV template</span>  
                    </div>
                    <!-- <div class="col-md-2 col-lg-2 col-2 text-right"> <i class="pi pi-question "></i></div> -->
                    <div class="row ml-1 bg-secondary my-3 mx-1 rounded h-100 w-100">
                        <div class="col-12 my-2 col-md-12 col-lg-12"><i class="pi pi-info-circle"></i><strong> Reminder:</strong> All Excel/CSV file headers are case-sensitive.
                            <div class="col-12 col-md-12 col-lg-12 border-bottom  my-2"></div> 
                        </div>
                        <div class="col-4 col-md-4 col-lg-4 font-weight-bold">
                            <p>FirstName</p>
                        </div>
                        <div class="col-8 col-md-8 col-lg-8">
                            <p>The first name of your member</p>
                        </div>
                        <div class="col-4 col-md-4 col-lg-4 font-weight-bold">
                            <p> LastName</p>
                        </div>
                        <div class="col-8 col-md-8 col-lg-8">
                            <p>The last name of your member.</p>
                        </div>
                        <div class="col-4 col-md-4 col-lg-4 font-weight-bold">
                            <p> Email</p>
                        </div>
                        <div class="col-8 col-md-8 col-lg-8">
                            <p>The email address of your member</p>
                        </div>
                        <div class="col-4 col-md-4 col-lg-4 font-weight-bold">
                            <p>PhoneNumber</p>
                        </div>
                        <div class="col-8 col-md-8 col-lg-8">
                            The phone number of your member.
                        </div>
                        <div class="col-4 col-md-4 col-lg-4 font-weight-bold">
                            <p> Address</p>
                        </div>
                        <div class="col-8 col-md-8 col-lg-8">
                            The address of the member.
                        </div>
                        <div class="col-4 col-md-4 col-lg-4 font-weight-bold">
                            <p>Birthday</p>
                        </div>
                        <div class="col-8 col-md-8 col-lg-8">
                            <p>The birthday of the member</p>
                        </div>
                        <div class="col-4 col-md-4 col-lg-4 font-weight-bold">
                            <p>BirthMonth</p>
                        </div>
                        <div class="col-8 col-md-8 col-lg-8">
                            <p>The birth month of the  member</p>
                        </div>
                        <div class="col-4 col-md-4 col-lg-4 font-weight-bold">
                            <p>BirthYear</p>
                        </div>
                        <div class="col-8 col-md-8 col-lg-8">
                            <p>The birth year of the member</p>
                        </div>
                        <div class="col-4 col-md-4 col-lg-4 font-weight-bold">
                            <p>Gender</p>
                        </div>
                        <div class="col-8 col-md-8 col-lg-8">
                            <p>The gender of the  member</p>
                        </div>
                        <div class="col-4 col-md-4 col-lg-4 font-weight-bold">
                            <p>MaritalStatus</p>
                        </div>
                        <div class="col-8 col-md-8 col-lg-8">
                            <p>The marital status of the member</p>
                        </div>
                        <div class="col-4 col-md-4 col-lg-4 font-weight-bold">
                            <p>CommunicationMeans</p>
                        </div>
                        <div class="col-8 col-md-8 col-lg-8">
                            <p>Preferred communcation means of the member</p>
                        </div>
                        <div class="col-4 col-md-4 col-lg-4 font-weight-bold">
                            <p>InterestedInJoining</p>
                        </div>
                        <div class="col-8 col-md-8 col-lg-8">
                            <p>If member is interested in joining</p>
                        </div>
                        <div class="col-4 col-md-4 col-lg-4 font-weight-bold">
                            <p>WantToBeVisited</p>
                        </div>
                        <div class="col-8 col-md-8 col-lg-8">
                            <p>If member wants to be visited.</p>
                        </div>
                    </div>
                </div>
            </div>
            <!-- <div class="my-3 col-6 col-md-12 col-lg-12 text-secondary font-weight-normal lead "> Exporting your CSV file from Excel or other software </div>
            <div class="col-12 my-2 col-md-12 col-lg-12 pi pi-info-circle "><strong> Reminder:</strong> When importing customer information, your CSV file must be in UTF-8 format.</div>
            <div class="my-1 col-12 col-md-12 col-lg-12 "> 
                <p>
                    You can convert an Excel worsheet (such as the customer CSV template) to a text file by using the Save As command. In the save as type...box, choose the CSV (Comma delimited) text file format for the worsheet.
                </p>
            </div>
            <div class="col-10 col-md-10 col-lg-10">
                <p>Most spreadsheet applications have the ability to save CSV files in UTF-8 format with the save As... or Export command, depending on the program</p>
            </div>
            <div class="col-md-2 col-lg-2 col-2 text-right"> <i class="pi pi-question "></i></div> -->
            <Dialog header="Members to import from file" v-model:visible="displayModal" :style="{width: '80vw'}" :modal="true">
            <div class="container">
              <div class="row">
                <div class="col-3 font-weight-700">Name</div>
                <div class="col-4 font-weight-700">Email</div>
                <div class="col-2 font-weight-700">Gender</div>
                <div class="col-2 font-weight-700">Phone Number</div>
              </div>
              <div class="row" v-for="(item, index) in memberData" :key="index">
                <div class="col-3">{{ item.firstName ? item.firstName : "" }} {{ item.lastName ? item.lastName : "" }}</div>
                <div class="col-4">{{ item.email }}</div>
                <div class="col-2">{{ item.gender }}</div>
                <div class="col-2">{{ item.phoneNumber }}</div>
              </div>
            </div>
            <template #footer>
                <div class="container">
                  <div class="row d-flex justify-content-end text-center">
                    <div class="default-btn mr-3 cursor-pointer" @click="closeModal">Discard</div>
                    <div class="primary-bg default-btn border-0 text-white text-center cursor-pointer" @click="addToMembers"><i class="pi pi-spin pi-spinner text-white" v-if="loading"></i> Save</div>
                  </div>
                </div>
            </template>
        </Dialog>
        <Toast />
        </div>
        
        
    </div>
</template>

<script>
import { ref } from "vue"
import axios from "@/gateway/backendapi";
import Dialog from 'primevue/dialog';
import finish from  "../../services/progressbar/progress"
import { useToast } from "primevue/usetoast";
import { useRoute } from "vue-router"
import { useStore } from "vuex"
import router from "@/router/index";

export default {
    emits: ["uploadtogroup"],
    components: {
        Dialog
    },
    setup (props, { emit }) {
        const route = useRoute()
        const store = useStore();
        const image = ref("");
        const toast = useToast()
        const displayModal = ref(false)
        const memberData = ref([])
        const addInstructionClass = ref(false)
        const loading = ref(false)






        const imageSelected = async(e) => {
        image.value = e.target.files[0];
        };

        const uploadFile = async() => {
                const formData = new FormData();
                formData.append("file", image.value ? image.value : "")
                console.log(formData)
                if (!route.fullPath.includes("createpeoplegroup")) {
                    try {
                    let { data } = await axios.post("/api/People/UploadFirstTimerFile", formData)
                    console.log(data)
                    // if   (!data.response.toString().includes('0')) {
                        toast.add({
                        severity: "success",
                        summary: "Confirmed",
                        detail: data.response,
                        life: 4000,
                    });
                    memberData.value = data.returnObject
                    displayModal.value = true;
                    // } else {
                    // toast.add({
                    // severity: "success",
                    // summary: "No Member found",
                    // detail: "Download our template and add members before you upload",
                    // life: 4000,
                    // });
                    // }        
                }
                catch  (err) {
                    finish()
                    console.log(err)
                    if (err.toString().toLowerCase().includes("network error")) {
                    toast.add({
                        severity: "warn",
                        summary: "Network Error",
                        detail: "Please ensure you have strong internet connection",
                        life: 4000,
                    });
                    } else if (err.toString().toLowerCase().includes("timeout")) {
                    toast.add({
                        severity: "warn",
                        summary: "Request took too long to respond",
                        detail: "Please try again by refreshing the page",
                        life: 3000,
                    });
                    }   else {
                        toast.add({
                            severity: "warn",
                            summary: "Upload not successful",
                            detail: "Please try again",
                        });
                    }
                }
            } else {
                try {
                    let { data } = await axios.post(`/api/Groups/UploadGroupMembersFile?groupId=${route.params.groupId}`, formData)
                    console.log(data)
                        toast.add({
                        severity: "success",
                        summary: "Confirmed",
                        detail: data.response,
                        life: 5000,
                    });  
                    emit("uploadtogroup", data.returnObject)   
                }
                catch  (err) {
                    finish()
                    console.log(err)
                    if (err.toString().toLowerCase().includes("network error")) {
                    toast.add({
                        severity: "warn",
                        summary: "Network Error",
                        detail: "Please ensure you have strong internet connection",
                        life: 4000,
                    });
                    } else if (err.toString().toLowerCase().includes("timeout")) {
                    toast.add({
                        severity: "warn",
                        summary: "Request took too long to respond",
                        detail: "Please try again by refreshing the page",
                        life: 3000,
                    });
                    }   else {
                        toast.add({
                            severity: "warn",
                            summary: "Upload not successful",
                            detail: "Please try again",
                        });
                    }
                }
            }
        }

        const closeModal = () => {
      displayModal.value = false
    }

    const addToMembers = async() =>  {
        loading.value = true
        if (route.query.query === "importpeople") {
            console.log(route.query.query)
            try {
                let { data } = await axios.post("/api/People/CreatePeople", memberData.value)
                console.log(data)
                console.log(memberData.value)
                store.dispatch('membership/showImportedPeople', memberData.value)
                displayModal.value = false
                loading.value = false
                // router.push("")
                window.location.href = 'https://my.churchplus.co/tenant/people';
                
                toast.add({
                severity: "info",
                summary: data.returnObject.createdRecord,
                detail: `There are ${data.returnObject.returnList} ${data.returnObject.returnList === 1 ? "member" : "members"} that have been added already`,
                });
                
            }
            catch  (err) {
                loading.value = false
                finish()
                if (err.toString().toLowerCase().includes("network error")) {
                toast.add({
                    severity: "warn",
                    summary: "Network Error",
                    detail: "Please ensure you have strong internet connection",
                    life: 4000,
                });
                } else if (err.toString().toLowerCase().includes("timeout")) {
                toast.add({
                    severity: "warn",
                    summary: "Request took too long to respond",
                    detail: "Please try again by refreshing the page",
                    life: 3000,
                });
                }
                console.log(err)
            }
        }   else {
            try {
                let { data } = await axios.post("/api/People/CreateMultipleFirstTimer", memberData.value)
                console.log(data)
                displayModal.value = false
                loading.value = false
                if (data.returnObject.returnList.length > 0) {
                toast.add({
                severity: "info",
                summary: data.returnObject.createdRecord,
                detail: `There are ${data.returnObject.returnList} members that have been added already`,
                });
                } else {
                toast.add({
                severity: "success",
                summary: "Created Successfully",
                detail: data.createdRecord,
                life: 4000,
                });
                }
                
            }
            catch  (err) {
                finish()
                loading.value = false
                if (err.toString().toLowerCase().includes("network error")) {
                toast.add({
                    severity: "warn",
                    summary: "Network Error",
                    detail: "Please ensure you have strong internet connection",
                    life: 4000,
                });
                } else if (err.toString().toLowerCase().includes("timeout")) {
                toast.add({
                    severity: "warn",
                    summary: "Request took too long to respond",
                    detail: "Please try again by refreshing the page",
                    life: 3000,
                });
                }
                console.log(err)
            }
        }
    }

    const toggleInstruction = () => {
        addInstructionClass.value = !addInstructionClass.value
    }

    const getImportType = () => {
        console.log(route.query.query)
    }
    getImportType()

        return {
            imageSelected, image, uploadFile, memberData, addToMembers, closeModal, displayModal, addInstructionClass, toggleInstruction, loading, route
        }
    }
}
</script>

<style scoped>

/* .upload-button {
  background: rgba(206, 206, 206, 0.274);
  color: black;
  border-radius: 25px;
  font-weight: 600;
  padding: 8px 10px;
} */

.header {
font: normal normal 800 29px Nunito sans;
}

.show-instruction {
  height: 825px;
  overflow: hidden;
  transition: all 1s ease-in-out
}

.hide-instruction {
  height: 0;
  overflow: hidden;
  transition: all 1s ease-in-out
}

.rollIcon {
    transform: rotateZ(180deg);
    transition: all 1s ease-in-out
}

.closeIcon {
    transform: rotateZ(0deg);
    transition: all 0.5s ease-in-out
}


</style>