<template>
    <div class="container-fluid  container-top  ">
        <div class="container-fluid">
            <div class="row">
                <div class="col-md-8  ">
                    <div class="heading-text"> Add branch</div>
                    <div class="row my-2 mt-2">
                        <!-- <div class="col-5 offset-md-6 mb-4">
                            <div class="p-field-radiobutton mb-3">
                                <RadioButton id="city1" name="city" value="Initiate network" v-model="chooseBranchCategory" @change="getValue"/>
                                <span for="city1">&nbsp; &nbsp; &nbsp;Initiate a branch network</span>
                            </div>
                            <div class="p-field-radiobutton">
                                <RadioButton id="city2" name="city" value="Join network" v-model="chooseBranchCategory" @change="getValue" />
                                <span for="city2">&nbsp; &nbsp; &nbsp;Join a branch network</span>
                            </div>

                        </div> -->
                        <div class="col-md-10 offset-md-2">
                            <div class="row">
                                <div class="col-md-4 text-md-right align-self-center">
                                    <label for="" class="">Branch name <sup class="text-danger">*</sup> </label>
                                </div>
                        
                                <div class="col-md-8">
                                    <input type="text" v-model="churchName" class="form-control" :class="{ 'is-invalid' : !isNameValid }" @blur="checkNameValue"/>
                                    <div class="invalid-feedback">
                                        Please enter branch name.
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> 
                    <div class="row my-1 mt-2">
                        <div class="col-md-10  offset-md-2">
                            <div class="row">
                                <div class="col-md-4 text-md-right align-self-center">
                                    <label for="" class="">Address </label>
                                </div>
                        
                                <div class="col-md-8">
                                    <input type="text" v-model="Address" class="form-control" />
                                </div>
                            </div>
                        </div>
                    </div> 
                    <div class="row my-1 mt-2">
                        <div class="col-md-10  offset-md-2">
                            <div class="row">
                                <div class="col-md-4 text-md-right align-self-center">
                                    <label for="" class="">Level <sup class="text-danger">*</sup> </label>
                                </div>
                        
                                <div class="col-md-8">
                                    <CascadeSelect v-model="value" :options="branches" optionLabel="clabel" optionGroupLabel="label" :optionGroupChildren="['children']" class="w-100" placeholder="Select a level" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="heading-text"> Pastor</div> 
                    <div class="row my-1 mt-2">
                        <div class="col-md-10  offset-md-2">
                            <div class="row">
                                <div class="col-md-4 text-md-right align-self-center">
                                    <label for="" class="">Pastor name </label>
                                </div>
                        
                                <div class="col-md-8">
                                    <input type="text" v-model="pastorName" class="form-control" />
                                </div>
                            </div>
                        </div>
                    </div> 
                    <div class="row my-1 mt-2">
                        <div class="col-md-10  offset-md-2">
                            <div class="row">
                                <div class="col-md-4 text-md-right align-self-center">
                                    <label for="" class="">Pastor email <sup class="text-danger">*</sup> </label>
                                </div>
                        
                                <div class="col-md-8">
                                    <input type="text" v-model="pastorEmail" class="form-control" :class="{ 'is-invalid' : !isEmailValid }" @blur="checkEmailValue" />
                                    <div class="invalid-feedback">
                                        Please enter your email.
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> 
                    <div class="row my-1 mt-2">
                        <div class="col-md-10  offset-md-2">
                            <div class="row">
                                <div class="col-md-4 text-md-right align-self-center">
                                    <label for="" class="">Pastor phone </label>
                                </div>
                        
                                <div class="col-md-8">
                                    <input type="text" v-model="pastorPhone" class="form-control" />
                                </div>
                            </div>
                        </div>
                    </div> 
                    <div class="row">
                        <div class="col-md-10 offset-md-2">
                            <div class="row">
                                <div class="col-4"></div>
                                <div class="col-8">
                                    <div class="row">
                                        <div class="col-12 mt-2">
                                            <Checkbox id="binary" v-model="replicateAttendance" :binary="true" /> 
                                            Replicate attendance
                                        </div>
                                        <div class="col-12 mt-2">
                                            <Checkbox id="binary" v-model="replicateFinancial" :binary="true" /> 
                                            Replicate financial
                                        </div>
                                        <div class="col-12 mt-2">
                                            <Checkbox id="binary" v-model="replicateEvent" :binary="true" /> 
                                            Replicate event
                                        </div>
                                        <div class="col-12 mt-2">
                                            <Checkbox id="binary" v-model="replicateGroup" :binary="true" /> 
                                            Replicate group
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                </div>
                <div class="col-md-4">
                        <div class="image-div other">
                            <div class="grey-bg">
                        <div>
                        <div class="person-img">
                            <img
                            v-if="!url"
                            src="../../assets/people/phone-import.svg"
                            alt="Uploaded Image"
                            />
                            <img
                            v-else
                            :src="url"
                            alt="Uploaded Image"
                            style="width: 110px; height: 110px; border-radius: 50%; object-fit: cover"
                            />
                        </div>
                        </div>
                        <div>
                        <div class="cs-input">
                            <label for="imgUpload" class="choose-file">
                            Choose file
                            <input
                                type="file"
                                class="input file-input"
                                placeholder=""
                                id="imgUpload"
                                @change="imageSelected"
                            />
                            </label>
                        </div>
                        </div>
                        <!-- <div>
                        <button
                            class="upload-btn outline-none"
                            @click.prevent="uploadImage"
                        >
                            Upload
                        </button>
                        </div> -->
                        </div>
                    </div>
                </div>
                <!-- <div class="row my-1 pt-4"> -->
                        <div class="col-md-6 offset-md-3 mt-4">
                            <div class="row d-flex justify-content-between">
                                <div class="mt-4">
                                    <button class="default-btn" data-dismiss="modal">Cancel</button>
                                </div>
                                <div class="mt-4">
                                    <button class="default-btn" data-toggle="modal" data-target="#codemodal">Generate branch join code</button>
                                </div>
                                <div class="mt-4">
                                    <button class="default-btn primary-bg border-0 text-white" data-dismiss="modal" @click="addBranch">
                                        <i class="pi pi-spin pi-spinner" v-if="loading"></i> Save
                                    </button>
                                </div>
                            </div>
                        </div>
                    <!-- </div>  -->
            </div>
        </div>
    </div>
      <!-- Generate Join Branch Code Modal -->

    <div class="modal fade" id="codemodal" tabindex="-1" role="dialog" aria-labelledby="codemodalModalLabel" aria-hidden="true" >
    <div class="modal-dialog modal-dialog-centered" role="document" ref="modal">
        <div class="modal-content pr-2">
        <div class="modal-header py-3">
            <h5 class="modal-title font-weight-700" id="codemodalModalLabel" >
            Generate your branch code.
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close" ref="closeGroupModal" >
            <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <div class="modal-body">
            <div class="row">
                <div class="col-12 mb-2">
                    Select the branch level you want your code to be generated with, then copy the generated code.
                </div>
            <div class="col-9 mt-2">
                <CascadeSelect v-model="value" :options="branches" optionLabel="clabel" optionGroupLabel="label" :optionGroupChildren="['children']" class="w-100" placeholder="Select a level" />
            </div>
            <button class="mt-2 mb-3 col-2 default-btn primary-bg text-white font-weight-bold c-pointer border-0 text-center" @click="generateCode">
                <i class="pi pi-spin pi-spinner" v-if="loadingCode"></i> Generate
            </button>
            <div class="input-group mb-3 ml-3" v-if="requestedCode">
                <input type="text" class="form-control" placeholder="Heres your code" :value="requestedCode" ref="code" aria-describedby="basic-addon1">
                <div class="input-group-prepend">
                    <span class="input-group-text c-pointer" id="basic-addon1" @click="copyCode"><i class="pi pi-copy"></i></span>
                </div>
                </div>
            </div>
        </div>
        </div>
    </div>
    <Toast />
    </div>
    <Toast />
</template>

<script>
import axios from "@/gateway/backendapi";
import { ref } from "vue";
import Dropdown from "primevue/dropdown";
import InputText from "primevue/inputtext";
import { useToast } from "primevue/usetoast";
import router from '../../router';
import store from "../../store/store";
import CascadeSelect from 'primevue/cascadeselect';
export default {
    components: {
        Dropdown,
        InputText,
        CascadeSelect
    },
    setup() {
        const toast = useToast()
        const churchName = ref('');
        const Address = ref('');
        const selectedLevel = ref('');
        const pastorName = ref('');
        const pastorEmail = ref('');
        const pastorPhone = ref('');
        const url = ref("");
        const image = ref("");
        const memberToEdit = ref("");
        const branches = ref([])
        const replicateAttendance = ref(true)
        const replicateFinancial = ref(true)
        const replicateEvent = ref(true)
        const replicateGroup = ref(true)
        const requestedCode = ref("")
        const code = ref(null)
        const isoCode = ref("")
        const loading = ref(false)
        const loadingCode = ref(false)
        const value = ref()
        const isNameValid = ref(true)
        const isEmailValid = ref(true)


        const imageSelected = (e) => {
            image.value = e.target.files[0];
            url.value = URL.createObjectURL(image.value);
        };
        const getAllBranchList = async () => {
                    try {
                        axios
                        .get("/api/Branching/hierarchieswithbranches")
                        .then((res) => {
                            // branches.value = res.data.returnObject;
                            console.log(res.data);
                            branches.value = res.data.returnObject.map(i => {
                                return {
                                    label: i.name,
                                    id: i.id,
                                    children: i.teanants ? i.teanants.map(j => {
                                        return {
                                            clabel: j.name,
                                            id: j.id
                                        }
                                    }) : ''
                                }
                            })

                            console.log(branches.value)
                        })
                        .catch((err) => console.log(err));
                        // donationSummary.value = data;
                    } catch (err) {
                        console.log(err);
                    }
                    };
        getAllBranchList();

        if (store.getters.currentUser && store.getters.currentUser.isoCode) {
            isoCode.value = store.getters.currentUser.isoCode;
            // userCountry.value = store.getters.currentUser.country;
            // tenantId.value = store.getters.tenantId
            console.log(store.getters.currentUser)
            } else {
            axios
                .get("/api/Membership/GetCurrentSignedInUser")
                .then((res) => {
                isoCode.value = res.data.isoCode;
                console.log(store.getters.currentUser)
                })
                .catch((err) => console.log(err));
            }



        const addBranch = async () => {
            if (value.value) {
                let getHierarchyId = branches.value.find(i => {
                    return i.children.some(j => j.id == value.value.id)
                })
                console.log(getHierarchyId)
                const formData = new FormData();
                formData.append( "churchName", churchName.value ? churchName.value : "");  
                formData.append( "address", Address.value ? Address.value : "");
                formData.append( "parentID", value.value ? value.value.id : "");
                formData.append( "pastorName", pastorName.value ? pastorName.value : "");
                formData.append( "email", pastorEmail.value ? pastorEmail.value : ""); 
                formData.append( "pastorPhone", pastorPhone.value ? pastorPhone.value : "");
                formData.append( "image", image.value ? image.value : "");
                //  formData.append( "countryID", 1275);
                formData.append( "duplicateAttendances", replicateAttendance.value);
                formData.append( "duplicateFinancials", replicateFinancial.value);
                formData.append( "duplicateEvents", replicateEvent.value);
                formData.append( "duplicateGroups", replicateGroup.value);
                console.log(encodeURIComponent(formData))
            try {
            loading.value = true;
            let { data } = await axios.post('/api/Branching', formData);
            loading.value = false
            // SEND SMS
            let SMSBody = {
                category: "",
                contacts: [],
                emailAddress: "",
                emailDisplayName: "",
                gateWayToUse: "hybridKonnect",
                groupedContacts: [],
                isPersonalized: true,
                isoCode: isoCode.value,
                message: `YOU HAVE BEEN ADDED AS A BRANCH ON CHURCHPLUS, \n You are on the right place and track, take control of your ministry, know the key information that will help you make better decision and become an effective manager. Use your credentials below to login and get started now \n Email: ${pastorEmail.value} \n Password: Branch@123 please do well to change your password after you login`,
                // subject: "Churchplus",
                toOthers: pastorPhone.value
            }
            console.log(data)
            if (data.status) {
                axios.post('/api/Messaging/sendSms', SMSBody)
                    .then(res => console.log(res))
                    .catch(err => console.log(err))
                toast.add({
                    severity: "success",
                    summary: "Branch created",
                    detail: data.message,
                    life: 3000,
                });
                setTimeout(() => {
                    router.push("/tenant/branch/branchsummary")
                }, 3000);
            }
            } catch (err) {
                console.log(err)
                loading.value = false
                }
            }   else {
                toast.add({
                    severity: "warn",
                    summary: "No level selected",
                    detail: "Choose the level you want to create this branch under, then click Save.",
                    life: 8000,
                });
            }
            
        }

        const generateCode = async() => {
            let getHierarchyId = branches.value.find(i => {
                return i.children.some(j => j.id == value.value.id)
            })
            let body = {
                parentId: value.value.id,
                hierarchyID: getHierarchyId.id
            }
            loadingCode.value = true
            try {
            let { data } = await axios.post('/api/Branching/requestcode', body);
            loadingCode.value = false
            console.log(data)
            requestedCode.value = data.code
            toast.add({
                severity: "success",
                summary: "Successful",
                detail: "Code generated successfully, you can copy to share to the branch",
                life: 5000,
            });
            } catch (err) {
                console.log(err)
                loadingCode.value = false
            }
        }

        const copyCode = () => {       
            code.value.select();
            code.value.setSelectionRange(0, code.value.value.length); /* For mobile devices */

            /* Copy the text inside the text field */
            document.execCommand("copy");
            toast.add({
                severity: "success",
                summary: "Code Copied",
                detail: "Code copied to your clipboard",
                life: 5000,
            });
        }

        const checkNameValue = () => {
            if(churchName.value.length == 0) {
                isNameValid.value = false
            }   else {
                isNameValid.value = true
            }
        }
        
        const checkEmailValue = () => {
            if(pastorEmail.value.length == 0) {
                isEmailValid.value = false
            }   else {
                isEmailValid.value = true
            }
        }

        return {
          addBranch,
          churchName,
          Address,
          selectedLevel, 
          pastorName,
          pastorEmail,
          pastorPhone,
          imageSelected,
          url,
          image,
          memberToEdit,
          branches,
          replicateAttendance,
          replicateFinancial,
          replicateEvent,
          replicateGroup,
          value,
          generateCode,
          requestedCode,
          code,
          copyCode,
          isoCode,
          loading,
          loadingCode,
          checkNameValue,
          isNameValid,
          isEmailValid,
          checkEmailValue
        }
    },
}
</script>

<style scoped>
       .heading-text {
        font: normal normal 800 1.5rem Nunito sans;
}
</style>