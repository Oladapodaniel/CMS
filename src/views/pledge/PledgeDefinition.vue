<template>
    <div class="container container-top container-wide ">
        <div class="container-fluid">
            <div class="row d-flex justify-content-between px-3">
                <div class="heading-text"> Pledge Definition </div>
                <!-- <div><ToggleButton @is-active /></div> -->
            </div>
            <div class="row">
                <div class="col-md-8  ">
                    <div class="row  mt-3">
                         <div class="col-md-10  offset-md-2">
                            <div class="row" v-for="(item, index) in newContribution.payment"  :key="index">
                                <div class="col-12 col-sm-12 col-lg-4 text-sm-left text-lg-right align-self-center">
                                    <label for="" class="">Contribution <sup class="text-danger">*</sup> </label>
                                </div>
                        
                                <div class="col-12 col-sm-12  col-lg-8">

                                    <div class="col-12  col-md-12 col-lg-12 pl-md-0 pr-md-0 mt-2">
                                        <button

                                            class="default-btn w-100 text-left "
                                            type="button"
                                            style="
                                            border-radius: 4px;
                                            border: 1px solid #ced4da;
                                            color: #6c757d;
                                            "
                                            id="dropdownMenuButton"
                                            data-toggle="dropdown"
                                            aria-haspopup="true"
                                            aria-expanded="false"
                                        >
                                                {{ item && item.financialContribution ? item.financialContribution.name : "Select" }}
                                            <i class="pi pi-chevron-down manual-dd-icon float-right pr-1"></i>
                                        </button>
                                        <div
                                            class="dropdown-menu scroll  w-100"
                                            aria-labelledby="dropdownMenuButton"
                                        >
                                            <!-- <div class="row w-100 mx-auto">
                                            <div class="col-md-12">
                                                <input type="text" class="form-control" placeholder="Select contribution item" />
                                            </div>
                                            </div> -->

                                            <a class="dropdown-item font-weight-700 small-text py-2 c-pointer"
                                            v-for="(item, indx) in contributionItems" :key="indx"
                                            @click="selectContribution(item, index)"
                                            >{{ item.name }}</a
                                            >
                                            <a class="font-weight-bold small-text d-flex justify-content-center py-2 text-decoration-none primary-text" style="border-top: 1px solid #002044;color: #136ACD;" href="#"
                                            type="button" data-toggle="modal" data-target="#exampleModalCenter"
                                            >
                                                <i class="pi pi-plus-circle mr-2 d-flex align-items-center" style="color: #136ACD;"></i>
                                            Create new Contribution Item
                                            </a>
                                        </div>
                                    </div>
                                    <!-- <Dropdown v-model="selectedContribution" class="w-100 font-weight-normal" :options="contributionItems"  optionLabel="name" placeholder="Select Contribution" /> -->
                                </div>
                            </div>
                        </div>
                                 <!-- Modal -->
                        <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                            <div class="modal-dialog modal-lg modal-dialog-centered" role="document">
                                <div class="modal-content">
                                <div class="modal-header" style="border: none">
                                    <h5 class="modal-title" id="exampleModalLongTitle">Add Contribution</h5>
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div class="modal-body">
                                    <ContributionItems @item-name="newConItems" />
                                </div>

                                </div>
                            </div>
                        </div>
                    </div> 
                   
                    <div class="row my-1 mt-4">
                         <div class="col-md-10 offset-md-2">
                            <div class="row">
                                <div class="col-12 col-sm-12 col-lg-4 text-sm-left text-lg-right align-self-center">
                                    <label for="" class="">Name <sup class="text-danger">*</sup> </label>
                                </div>
                        
                                <div class="col-12 col-sm-12  col-lg-8">
                                    <input type="text" v-model="PledgeName" class="form-control" :class="{ 'is-invalid' : !isNameValid }" @blur="checkNameValue"/>
                                    <div class="invalid-feedback">
                                        Please enter your pledge name.
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-10 my-1 offset-md-2 mt-3 ">
                            <div class="row">
                                <div class="col-12 col-sm-12 col-lg-4 text-sm-left text-lg-right align-self-center">
                                    <label for="" class="">Target amount <sup class="text-danger">*</sup> </label>
                                </div>
                        
                                <div class="col-12 col-sm-12  col-lg-8 d-flex flex-wrap align-self-center">
                                    <span class="border bg-secondary pt-1 col-2 ">NGN</span>
                                    <!-- <span class="border">NGN</span> -->
                                    <div class="col-10  m-0 p-0"><input type="text" v-model="targetAmount" class="form-control" placeholder=" Enter Amount" /></div>
                                    <!-- <CascadeSelect v-model="value" :options="branches" optionLabel="clabel" optionGroupLabel="label" :optionGroupChildren="['children']" class="w-100"  /> -->
                                </div>
                            </div>
                        </div>
                        <div class="col-md-10  offset-md-2 mt-3 ">
                            <div class="row">
                                <div class="col-12 col-sm-12 col-lg-4 text-sm-left text-lg-right align-self-center">
                                    <label for="" class="">Currency  <sup class="text-danger">*</sup> </label>
                                </div>
                        
                                <div class="col-12 col-sm-12  col-lg-8">
                                     <Dropdown v-model="selectedCurrency" class="w-100  font-weight-normal" :options="currencyList" optionLabel="name" :filter="true" placeholder="Select Currency" >
                                        <template #value="slotProps">
                                            <div class="country-item country-item-value" v-if="slotProps.value">
                                                <div>{{slotProps.value.name}}</div>
                                                <!-- <div>{{slotProps.placeholder}}</div> -->
                                            </div>
                                            <span v-else>
                                                {{slotProps.placeholder}}
                                            </span>
                                        </template>
                                        <template #option="slotProps">
                                            <div class="country-item">
                                                <div>{{slotProps.option.name}} - {{slotProps.option.country}}</div>
                                            </div>
                                        </template>
                                    </Dropdown>
                                </div>
                            </div>
                        </div>
                    </div>
                     <div class="row my-1 mt-4">
                        <div class="col-md-10 mt-1 offset-md-2">
                            <div class="row">
                                <div class="col-12 col-sm-12 col-lg-4 text-sm-left text-lg-right align-self-center">
                                    <label for="" class="">Pledge type </label>
                                </div>
                                <div class="col-12 col-sm-12  col-lg-8 d-flex justify-content-between flex-wrap">
                                    <div class="col-md-4   border py-2 c-pointer free-will " :class="{ 'show-free-will' : pledgeCategory == 'freewill' }" @click="freeWill">
                                        Free Will
                                    </div>
                                    <div class="col-md-4 mt-4 mt-md-0 border py-2 c-pointer" :class="{ 'show-specific' : pledgeCategory == 'specific' }"  @click="specific" >
                                        Specific
                                    </div>
                                    <div class="col-md-4 mt-4 mt-md-0 border py-2 c-pointer" :class="{ 'show-range' : pledgeCategory == 'range' }" @click="range">
                                        Range
                                    </div>
                                </div>
                                <div class="col-md-12  mt-3 " v-if="pledgeCategory == 'specific' " >
                                    <div class="row">
                                        <div class="col-12 col-sm-12 col-lg-4 text-sm-left text-lg-right align-self-center">
                                            <label for="" class=""> Amount </label>
                                        </div>
                                        <div class="col-12 col-sm-12  col-lg-8">
                                            <input type="text" v-model="SpecificAmount" class="form-control" />
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-12  mt-3" v-if="pledgeCategory == 'range' "  >
                                    <div class="row">
                                        <div class="col-12 col-sm-12 col-lg-4 text-sm-left text-lg-right align-self-center">
                                            <label for="" class="d-none d-lg-block"> Amount </label>
                                        </div>
                                        <div class="col-12 col-sm-12  col-lg-4">
                                            <label for="" class="d-block  d-lg-none"> Amount From </label>
                                            <input type="text" v-model="amountFrom" class="form-control" placeholder="From" />
                                        </div>
                                        <div class="col-12 col-sm-12 mt-3 mt-md-0 mt-lg-0 col-lg-4">
                                            <label for="" class="d-block d-lg-none"> Amount To </label>
                                            <input type="text" v-model="amountTo" class="form-control" placeholder="To" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row my-1 mt-4">
                        <div class="col-md-10  offset-md-2">
                            <div class="row">
                                <div class="col-12 col-sm-12 col-lg-4 text-sm-left text-lg-right align-self-center">
                                    <label for="" class=""> Frequency <sup class="text-danger">*</sup> </label>
                                </div>
                        
                                <div class="col-12 col-sm-12  col-lg-8 d-flex flex-wrap">
                                    <div class="col-12 col-sm-12  col-lg-6  border py-2 c-pointer  " :class="{ 'show-one-time' : pledgeFrequency == 'onetime' }" @click="oneTime">
                                        One time
                                    </div>
                                    <div class="col-12 mt-4 mt-lg-0 col-sm-12  col-lg-6 border py-2 c-pointer" :class="{ 'show-reoccuring' : pledgeFrequency == 'reoccuring' }"  @click="reOccuring" >
                                        Reoccuring
                                    </div>
                                </div>
                                <div class="col-md-12  mt-3 " v-if="pledgeFrequency == 'onetime' " >
                                    <div class="row">
                                        <div class="col-12 col-sm-12 col-lg-4 text-sm-left text-lg-right align-self-center">
                                            <label for="" class=""> Start Date </label>
                                        </div>
                                        <div class="col-12 col-sm-12  col-lg-8">
                                            <Calendar dateFormat="dd/mm/yy" class="w-100" id="icon" v-model="startDate" :showIcon="true" />
                                        </div>
                                        <div class="col-12 col-sm-12 col-lg-4 text-sm-left text-lg-right mt-2 align-self-center">
                                            <label for="" class=""> End Date </label>
                                        </div>
                                        <div class="col-12 col-sm-12  col-lg-8 mt-2 ">
                                            <Calendar dateFormat="dd/mm/yy" class="w-100" id="icon" v-model="endDate" :showIcon="true" />
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-12  mt-3 " v-if="pledgeFrequency == 'reoccuring' " >
                                    <div class="row">
                                        <div class="col-12 col-sm-12 col-lg-4 text-sm-left text-lg-right align-self-center">
                                            <label for="" class=""> Range </label>
                                        </div>
                                        <div class="col-12 col-sm-12  col-lg-8">
                                            <Dropdown v-model="selectedRange" class="w-100 font-weight-normal" :options="reOccuringRange"  optionLabel="name" placeholder="Range" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> 
                    <!-- <div class="row my-1 pt-4"> -->
                        <div class="col-md-9   offset-md-5   mt-4">
                                <div class="row d-flex justify-content-center ">
                                    <!-- <div class="col-md-2"></div> -->
                                    <!-- <div class=" col-md-5 ">
                                        <button class="default-btn" data-dismiss="modal">Pay now</button>
                                    </div> -->
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
            <Toast />
        </div>
    </div>
</template>

<script>
import axios from "@/gateway/backendapi";
import { ref } from "vue";
import { useStore } from 'vuex'
import Dropdown from "primevue/dropdown";
import InputText from "primevue/inputtext";
import { useToast } from "primevue/usetoast";
import Calendar from "primevue/calendar";
import finish from '../../services/progressbar/progress';
import { useRoute } from "vue-router"
import ContributionItems from "@/components/firsttimer/contributionItemModal";
import router from '../../router';
// import store from "../../store/store";
import ToggleButton from '../donation/toggleButton.vue'
import CascadeSelect from 'primevue/cascadeselect';
export default {
    components: {
        Dropdown,
        ContributionItems,
        Calendar,
        InputText,
        CascadeSelect,
        ToggleButton
    },
    setup() {
        const toast = useToast()
        const newContribution = ref({ payment: [{}]});
        const route = useRoute();
        const startDate = ref("");
        const endDate = ref("");
        const Address = ref('');
        const loading = ref(false)
        const value = ref()
        const pledgeCategory = ref("freewill")
        const pledgeFrequency = ref("")
        const showRange = ref(false)
        // const showFreeWill = ref(false)
        // const showPledgeType = ref(false)
        const selectedRange = ref({})
        const selectedContribution = ref("")
        const selectedCurrency = ref("")
        const isNameValid = ref(true)
        const PledgeName = ref('')
        const amountFrom = ref()
        const amountTo = ref()
        const SpecificAmount = ref()
        const pledgType = ref('')
        const currencyList = ref([])
        const contributionItems = ref([])
        const singlePledge = ref({})
        const targetAmount = ref('')
        const reOccuringRange = ref([
            {name: 'Daily'},
            {name: 'Weekly'},
            {name: 'Monthly'},
            {name: 'Quarterly' },
            {name: 'Semiannually' },
            {name: 'Annually' }
        ])
        // const ContributionType = ref([
        //     {name: 'Church Service'},
        //     {name: 'Building'},
        //     {name: 'Concert'},
        //     {name: 'Children Program'}
        // ])

    const getSinglePledgeDefinition = async () => {
          try{
            const res = await axios.get(`/api/Pledge/GetSinglePledgeDefinitions?ID=${route.query.id}`)
                    finish()
                    targetAmount.value = res.data.returnObject.totalTargetAmount
                    PledgeName.value = res.data.returnObject.name
                    SpecificAmount.value = res.data.returnObject.donorPaymentSpecificAmount
                    amountFrom.value = res.data.returnObject.donorPaymentRangeFromAmount
                    amountTo.value = res.data.returnObject.donorPaymentRangeToAmount
                    endDate.value = res.data.returnObject.pledgeTypeFrequencyOneTimeEndDate
                    startDate.value = res.data.returnObject.pledgeTypeFrequencyOneTimeStartDate
                    selectedRange.value.name = res.data.returnObject.pledgeTypeFrequencyReOccuring
                    // showPledgeType.value = res.data.returnObject.donorPaymentType
                    if(startDate.value && endDate.value){
                        pledgeFrequency.value = "onetime"
                    }

                    if(selectedRange.value.name){
                        pledgeFrequency.value = "reoccuring"
                    }
                    

                    if(res.data.returnObject.donorPaymentType ===  0 ){
                        pledgeCategory.value = "freewill"
                        pledgType.value =  0
                        console.log(pledgType.value, 'freewill')
                    } else if(res.data.returnObject.donorPaymentType ===  1){
                         pledgeCategory.value = "specific"
                         pledgType.value =  1
                         console.log(pledgType.value, 'specific')
                    } else if(res.data.returnObject.donorPaymentType ===  2){
                         pledgeCategory.value = "range"
                         pledgType.value =  2
                         console.log(pledgType.value, 'range')
                    }else{
                         res.data.returnObject.donorPaymentType
                    }
                    // isActive.value = res.data.returnObject.map( i => {
                    //     return {
                    //         isActive : i.isActive
                    //     }
                    // })
                    console.log(singlePledge.value,'getSinglePledgeList');
          }
          catch (error){
            console.log(error)
          }
        }
        getSinglePledgeDefinition()

       const selectContribution = (item, index) => {
            // if (newContribution.value.payment.findIndex(i => i.id === item.id) < 0) {
                // newContribution.value.payment[newContribution.value.payment.length - 1] = item
                newContribution.value.payment[index].financialContribution = item
            // }   else {
                console.log("Youve selected this, please select another")
            // }
            // newContribution.value.offType = e.target.innerText
                // newContribution.value.payment.push(item)
            console.log(item, index, newContribution.value.payment)
        }

     const getContributionCategory = () => {
            let store = useStore()
            console.log(store.getters['contributions/contributionItems'])
            if (store.getters['contributions/contributionItems'].length > 0) {
                contributionItems.value = store.getters['contributions/contributionItems']
            } else {
                // loading.value = true
                axios
                    .get("/api/financials/contributions/items")
                    .then((res) => {
                        loading.value = false
                    contributionItems.value = res.data.map(i =>{
                        return {
                            name: i.name,
                            id: i.id
                        }
                    });
                    console.log(res.data, '🎁🍾🍾s');
                    })
                    .catch((err) => {
                      finish()
                        loading.value = false
                        if(err.toString().toLowerCase().includes("network error")) {
                          networkError.value = true
                        } else {
                          networkError.value = false
                        }
                        console.log(err)
                    });
            }

    // get from  to store

    // savev to sstore
    // store.dispatch('contributions/contributionList')
    };
    getContributionCategory();

   

        const savePledge = async () => {
            const pledgeDetails = {
                    contributionID: selectedContribution.value.id,
                    totalTargetAmount: targetAmount.value,
                    donorPaymentType: pledgType.value,
                    name: PledgeName.value,
                    donorPaymentSpecificAmount: SpecificAmount.value,
                    donorPaymentRangeFromAmount: amountFrom.value,
                    donorPaymentRangeToAmount: amountTo.value,
                    pledgeTypeFrequencyOneTimeStartDate: startDate.value,
                    pledgeTypeFrequencyOneTimeEndDate: endDate.value,
                    pledgeTypeFrequencyReOccuring: selectedRange.value.name,
                    currencyID: selectedCurrency.value.id,
                    // isActive: true
                    
                }
                console.log(pledgeDetails, 'pledgedetails')

                if(route.query.id){
                    const pledgeDetail = {
                    id: route.query.id,
                    contributionID: selectedContribution.value.id,
                    totalTargetAmount: targetAmount.value,
                    donorPaymentType: pledgType.value,
                    name: PledgeName.value,
                    donorPaymentSpecificAmount: SpecificAmount.value,
                    donorPaymentRangeFromAmount: amountFrom.value,
                    donorPaymentRangeToAmount: amountTo.value,
                    pledgeTypeFrequencyOneTimeStartDate: startDate.value,
                    pledgeTypeFrequencyOneTimeEndDate: endDate.value,
                    pledgeTypeFrequencyReOccuring: selectedRange.value.name,
                    currencyID: selectedCurrency.value.id,
                    // isActive: true
                    
                }
                    try{
                        loading.value = true;
                        const response = await axios.put('/api/Pledge/UpdatePledgeDefinition', pledgeDetail );

                        toast.add({
                        severity: "success",
                        summary: "Successful",
                        detail: "Pledge definition updated successfully",
                        life: 3000,
                         })

                        console.log(response, "response");

                         
                        router.push("/tenant/pledge/pledgedefinitionlist");


                        loading.value = false;
                    }
                    catch(error){
                        console.log(error)
                    }
                }else{
                    try{
                        const res = await axios.post('/api/Pledge/CreatePledgeDefinition', pledgeDetails)
                        finish()
                        console.log(res,'PledgeDefinition')
                        loading.value = false
                        

                        toast.add({
                        severity: "success",
                        summary: "Successful",
                        detail: "Pledge definition created successfully",
                        life: 2000,
                    });

                    router.push("/tenant/pledge/pledgedefinitionlist");

                        targetAmount.value = "";
                        amountTo.value = "";
                        amountFrom.value = "";
                        selectedCurrency.value = "";
                        PledgeName.value = "";
                        selectedContribution.value = "";
                        SpecificAmount.value = "";
                        selectedRange.value = "";
                        startDate.value  = "";
                        endDate.value = "";
                    
                    }
                    catch (error){
                        console.log(error)
                    }
                }
            

        }
        const getAllCurrencies = () => {
          axios.get('/api/lookup/getallcurrencies')
            .then(res => {
              currencyList.value = res.data.map(i => {
                return {
                  name:  i.shortCode,
                  id: i.id,
                  country: i.country
                }
              })
              console.log(currencyList.value, "all currency");
              
            })
            .catch(err => console.log(err))
        }
            getAllCurrencies()

        const specific = () =>{
            pledgeCategory.value = "specific"

            pledgType.value =  1
        }
        const range = () =>{
            pledgeCategory.value = "range"
            pledgType.value =  2
        }
        const freeWill = () =>{
            pledgeCategory.value = "freewill"
            pledgType.value =  0
        }
        const oneTime = () =>{
            pledgeFrequency.value = "onetime"
        }
        const reOccuring = () =>{
            pledgeFrequency.value = "reoccuring"
        }

        const checkNameValue = () => {
            if(PledgeName.value.length == 0) {
                isNameValid.value = false
            }   else {
                isNameValid.value = true
            }
        }


        return {
            currencyList,
            newContribution,
            selectContribution,
            contributionItems,
            targetAmount,
            isNameValid,
            PledgeName,
            amountFrom,
            amountTo,
            SpecificAmount,
            checkNameValue,
            selectedCurrency,
            selectedContribution,
            startDate,
            endDate,
            showRange,
            freeWill,
            oneTime,
            reOccuring,
            range,
            specific,
            pledgeCategory,
            pledgeFrequency,
            pledgType,
            savePledge,
            Address,
            value,
            loading,
            reOccuringRange,
            selectedRange,
            singlePledge
        }
    },
}
</script>

<style scoped>
        .p-dropdown {
    width: 14rem;
}

.country-item {
    
        width: 17px;
        margin-right: 0.5rem;

}
.scroll{
    height: 10rem;
    overflow-y: scroll;
    overflow-y: hidden;
}
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
        .show-one-time{
            background-color: #136acd;
            color: white;
            font-weight: bold;
        }
        .show-reoccuring{
            background-color: #136acd;
            color: white;
            font-weight: bold;
        }
        /* .free-will:hover{
            background-color: #d4dce6;
        } */
</style>