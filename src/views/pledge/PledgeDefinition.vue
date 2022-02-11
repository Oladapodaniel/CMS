<template>
    <div class="container container-top  ">
        <div class="container-fluid">
            <div class="row">
                <div class="col-md-8  ">
                    <div class="heading-text"> Pledge Definition </div>
                     <div class="row my-2 mt-3">
                        <div class="col-md-10 offset-md-2">
                            <div class="row">
                                <div class="col-md-4 text-md-right align-self-center">
                                    <label for="" class="">Name <sup class="text-danger">*</sup> </label>
                                </div>
                        
                                <div class="col-md-8">
                                    <input type="text" v-model="Name" class="form-control" :class="{ 'is-invalid' : !isNameValid }" @blur="checkNameValue"/>
                                    <div class="invalid-feedback">
                                        Please enter your name.
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> 
                     <div class="row my-1 mt-3">
                        <div class="col-md-10  offset-md-2">
                            <div class="row">
                                <div class="col-md-4 text-md-right align-self-center">
                                    <label for="" class="">Contribution <sup class="text-danger">*</sup> </label>
                                </div>
                        
                                <div class="col-md-8">
                                    <CascadeSelect v-model="value" :options="branches" optionLabel="clabel" optionGroupLabel="label" :optionGroupChildren="['children']" class="w-100" placeholder="Select Contribution" />
                                </div>
                            </div>
                        </div>
                        <div class="col-md-10  offset-md-2 mt-3 ">
                            <div class="row">
                                <div class="col-md-4 text-md-right align-self-center">
                                    <label for="" class="">Currency  <sup class="text-danger">*</sup> </label>
                                </div>
                        
                                <div class="col-md-8">
                                    <CascadeSelect v-model="value" :options="branches" optionLabel="clabel" optionGroupLabel="label" :optionGroupChildren="['children']" class="w-100" placeholder="Select Currency" />
                                </div>
                            </div>
                        </div>
                    </div>
                     <div class="row my-1 mt-3">
                        <div class="col-md-10  offset-md-2">
                            <div class="row">
                                <div class="col-md-4 text-md-right align-self-center">
                                    <label for="" class="">Pledge </label>
                                </div>
                                <div class="col-md-8 d-flex justify-content-between flex-wrap">
                                    <div class="col-md-4 border py-2 c-pointer" :class="{ 'show-specific' : pledgeCategory == 'specific' }"  @click="specific" >
                                        Specific
                                    </div>
                                    <div class="col-md-3 mt-2 mt-md-0 border py-2 c-pointer" :class="{ 'show-range' : pledgeCategory == 'range' }" @click="range">
                                        Range
                                    </div>
                                    <div class="col-md-4 mt-2 mt-md-0  border py-2 c-pointer free-will " :class="{ 'show-free-will' : pledgeCategory == 'freewill' }" @click="freeWill">
                                        Free Will
                                    </div>
                                </div>
                                <div class="col-md-12  mt-3 " v-if="pledgeCategory == 'specific' " >
                                    <div class="row">
                                        <div class="col-md-4 text-md-right align-self-center">
                                            <label for="" class=""> Amount </label>
                                        </div>
                                        <div class="col-md-8">
                                            <input type="text" v-model="amount" class="form-control" />
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-12  mt-3" v-if="pledgeCategory == 'range' "  >
                                    <div class="row">
                                        <div class="col-md-4 text-md-right align-self-center">
                                            <label for="" class=""> Amount </label>
                                        </div>
                                        <div class="col-md-4">
                                            <input type="text" v-model="phoneNumber" class="form-control" placeholder="From" />
                                        </div>
                                        <div class="col-md-4">
                                            <input type="text" v-model="phoneNumber" class="form-control" placeholder="To" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                     <div class="row my-1 mt-3">
                        <div class="col-md-10  offset-md-2">
                            <div class="row">
                                <div class="col-md-4 text-md-right align-self-center">
                                    <label for="" class="">Phone number </label>
                                </div>
                        
                                <div class="col-md-8">
                                    <input type="text" v-model="phoneNumber" class="form-control" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row my-1 mt-3">
                        <div class="col-md-10  offset-md-2">
                            <div class="row">
                                <div class="col-md-4 text-md-right align-self-center">
                                    <label for="" class="">Email <sup class="text-danger">*</sup> </label>
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
                    <!-- <div class="row my-1 pt-4"> -->
                        <div class="col-md-9   offset-md-5   mt-4">
                                <div class="row d-flex justify-content-center ">
                                    <!-- <div class="col-md-2"></div> -->
                                    <div class=" col-md-5 ">
                                        <button class="default-btn" data-dismiss="modal">Pay now</button>
                                    </div>
                                    <div class=" col-md-5 mt-2 mt-md-0 ">
                                        <button class="default-btn primary-bg border-0 text-white" data-dismiss="modal" @click="savePledge">
                                            <i class="pi pi-spin pi-spinner" v-if="loading"></i> Save
                                        </button>
                                    </div>
                                </div>
                        </div>
                    <!-- </div>  -->
                </div>
                
                        
                   
            </div>
        </div>
    </div>
    <Toast />
</template>

<script>
// import axios from "@/gateway/backendapi";
import { ref } from "vue";
import Dropdown from "primevue/dropdown";
import InputText from "primevue/inputtext";
import { useToast } from "primevue/usetoast";
// import router from '../../router';
// import store from "../../store/store";
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
        const loading = ref(false)
        const loadingCode = ref(false)
        const value = ref()
        const isNameValid = ref(true)
        const isEmailValid = ref(true)
        const pledgeCategory = ref("specific")
        const showRange = ref(false)
        const showFreeWill = ref(false)



        const savePledge = async () => {

        }
        const specific = () =>{
            pledgeCategory.value = "specific"
        }
        const range = () =>{
            pledgeCategory.value = "range"
        }
        const freeWill = () =>{
            pledgeCategory.value = "freewill"
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
            showRange,
            showFreeWill,
            freeWill,
            range,
            specific,
            pledgeCategory,
            savePledge,
            checkEmailValue,
            churchName,
            Address,
            value,
            loading,
            loadingCode,
            checkNameValue,
            isNameValid,
            isEmailValid
        }
    },
}
</script>

<style scoped>
       .heading-text {
        font: normal normal 800 1.5rem Nunito sans;
}
        .show-specific{  
            background-color: #136acd;
            color: white;
            font-weight: bold;
        }
        .show-range{
            background-color: #136acd;
            color: white;
            font-weight: bold;
        }
        .show-free-will{
            background-color: #136acd;
            color: white;
            font-weight: bold;
        }
        /* .free-will:hover{
            background-color: #d4dce6;
        } */
</style>