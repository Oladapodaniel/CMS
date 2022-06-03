<template>
    <div class="container  container-top container-wide ">
        <div class="row d-flex justify-content-between px-3">
                <div class="heading-text"> Make a Pledge </div>
                <Toast />
                <button
                  class="default-btn primary-bg border-0 ml-3"
                  @click="makePledge"
                >
                  <i
                    class="fas fa-circle-notch fa-spin mr-2 text-white"
                    v-if="loading"
                  ></i>
                  <span class="text-white">Save and Continue</span>
                  <span></span>
                </button>
        </div>
        <!-- <div class="container-fluid">
            <div class="row">
                <div class="col-md-8  " >
                     <div class="row my-1 mt-3">
                        <div class="col-md-10  offset-md-2">
                            <div class="row">
                                <div class="col-md-4 text-md-right align-self-center">
                                    <label for="" class="">Select Person <sup class="text-danger">*</sup> </label>
                                </div>
                                <div class="col-md-8">
                                    <MembersSearch @memberdetail="chooseContact" />
                                </div>
                            </div>
                        </div>
                    </div>
                     <div class="row my-1 mt-3">
                        <div class="col-md-10  offset-md-2">
                            <div class="row">
                                <div class="col-md-4 text-md-right align-self-center">
                                    <label for="" class="">Select Pledge <sup class="text-danger">*</sup> </label>
                                </div>
                                <div class="col-md-8">
                                    <Dropdown v-model="selectedPledge" class="w-100 font-weight-normal" :options="allPledgeList"  optionLabel="name" placeholder="Select Pledge" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row my-1 mt-3">
                        <div class="col-md-10  offset-md-2 " v-if="selectedPledge.donorPaymentType == 0 " >
                            <div class="row">
                                <div class="col-md-4 text-md-right align-self-center">
                                    <label for="" class=""> Pledge Amount </label>
                                </div>
                        
                                <div class="col-md-8">
                                    <input type="text" v-model="freewillAmount" class="form-control" />
                                </div>
                            </div>
                        </div>
                    </div>  
                    <div class="row my-1 mt-3">
                        <div class="col-md-10  offset-md-2 " v-if="selectedPledge.donorPaymentType == 1 ">
                            <div class="row">
                                <div class="col-md-4 text-md-right align-self-center">
                                    <label for="" class=""> Pledge Amount </label>
                                </div>
                        
                                <div class="col-md-8">
                                    <input type="text" v-model="selectedPledge.donorPaymentSpecificAmount" :disabled="checking" class="form-control" />
                                </div>
                            </div>
                        </div>
                    </div>  
                    <div class="row my-1 mt-2  ">
                         <div class="col-md-10 offset-md-2 " v-if="selectedPledge.donorPaymentType == 2 "  >
                            <div class="row">
                                <div class="col-12 col-md-4 col-lg-4 text-sm-left text-lg-right align-self-center">
                                    <label for="" class="">Pledge Amount </label>
                                </div>
                                <div class="d-flex flex-wrap col-12  col-md-8 ">
                                    <div class=" col-sm-6 ">
                                        <div class="font-weight-bold" > <span>From:</span>  {{Math.abs(selectedPledge.donorPaymentRangeFromAmount).toLocaleString()}}.00 </div>
                                    </div>
                                    <div class="col-12  col-sm-6   ">
                                        <div class="font-weight-bold  " ><span>To:</span> {{Math.abs(selectedPledge.donorPaymentRangeToAmount).toLocaleString()}}.00 </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>  

                     <div class="col-md-9 offset-md-5 mt-4">
                            <div class="row  ">
                                <div class=" col-md-12 d-flex justify-content-center">
                                    <button class="default-btn primary-bg border-0 text-white" type="button" data-toggle="modal" data-target="#exampleModalCente" data-dismiss="modal" @click="makePledge">
                                        <i class="pi pi-spin pi-spinner"  v-if="loading"></i> Save and Continue
                                    </button>
                                </div>
                            </div>
                        </div>
                </div>

                <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                    <div class="modal-dialog modal-lg modal-dialog-centered" role="document">
                        <div class="modal-content">
                        <div class="modal-header" style="border: none">
                            <h5 class="modal-title" id="exampleModalLongTitle">Pledge Payment Link</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <div class="container">
                                <div class="row">
                                    <div class="col-sm-10  pr-0 align-self-center">
                                    <a href="">Online Payment Link </a>
                                    </div>
                                    <div class="col-sm-10 mt-3  pr-0 align-self-center">
                                            <a href="">Virtual Account Link</a>
                                    </div>
                                </div>
                        </div>
                        </div>
                        <div class="modal-footer d-flex justify-content-center mt-4  ml-5" style="border: none">
                                <button class="default-btn primary-bg border-0 text-white" @click="makePayment" type="button" data-dismiss="modal">Make payment</button>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </div> -->
        <div class="container">
            <div class="form">
                <div class=" row second-form first-row mt-3 ">
                    <div class="col-md-8  ">
                            <div class=" row  dropdown-container">
                                <div class="col-md-4 col-12 text-md-right text-left ">
                                    <label for="">Select Pledge</label>
                                </div>
                                
                                <div class="dropdown  ofering col-md-8 col-12 "  >
                                    <button class="  btn d-flex justify-content-between col-12  border " type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <span class="ofering    ">
                                            &nbsp;&nbsp;&nbsp; {{ selectedPledge.name ?  selectedPledge.name : 'Select Pledge' }}
                                        </span>
                                        <span>
                                            <i 
                                            class="pi pi-angle-down offset-sm-2 ofering" 
                                            :class="{ roll3: showForm3 }"
                                            aria-hidden="true"
                                            ></i>
                                        </span>
                                    </button>
                                    <div class="dropdown-menu scroll w-100 " aria-labelledby="dropdownMenuButton">
                                        <a class="dropdown-item cursor-pointer" v-for="(item, index) in allPledgeList" :key="index">
                                        <div @click="PledgesType(item)"> {{item.name}}</div> 
                                        </a>
                                        <div class="dropdown-divider"></div>
                                        <a class="dropdown-item">
                                            <router-link
                                            to="/tenant/pledge/pledgedefinition"
                                            class="
                                            border-0
                                            font-weight-bold
                                            "
                                            >Create New Pledge
                                            </router-link>
                                        </a>
                                    </div>
                                </div>
                            
                                <!-- </div> -->
                                <!-- <div class="col-md-12" v-if="!selectedPledge.name">
                                    <div class="ofering col-md-12 " :class="{ 'style-pledge': showPledge }" v-if="showPledge"  >
                                        <Dropdown v-model="selectedPledge" class="w-100 font-weight-normal" :options="allPledgeList"  optionLabel="name" placeholder="Select Pledge" />
                                        <div class=" cursor-pointer small mt-1 col-md-12 cat ofering" >
                                            <router-link
                                                to="/tenant/pledge/pledgedefinition"
                                                class="
                                                border-0
                                                font-weight-bold
                                                "
                                                >Create New Pledge
                                            </router-link>
                                        </div>
                                    </div>
                                </div> -->
                        
                        </div>
                        <div class="row mt-3">
                            <!-- <div
                                class=" border pointer col-12  ofering"
                                id="eventCategorySelectElem"
                                @click="selectPerson"
                                
                                >
                                <span class="ofering font-weight-bold   ">
                                    &nbsp;&nbsp;&nbsp;{{ selectedContact.firstName && selectedContact.lastName || selectedContact.name ?  `${selectedContact.firstName ? selectedContact.firstName : ""} ${selectedContact.lastName ? selectedContact.lastName : "" } `   : 'Select Person' }}
                                </span>
                                <span>
                                    <i 
                                    class="pi pi-angle-down offset-sm-2 ofering" 
                                    :class="{ roll3: showForm3 }"
                                    aria-hidden="true"
                                    ></i>
                                </span>
                            </div> -->
                            <div class="col-sm-12 col-md-4 text-md-right text-left   ">
                                <label for="">Select Person</label>
                            </div>
                            <!-- <div class="col-sm-12 col-md-8"   > -->
                            <div  class="ofering col-md-8 col-12 "   >
                                <MembersSearch @memberdetail="chooseContact"  />
                            </div>
                            <!-- </div> -->
                            
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="col-12 text-sm-right col-sm-10 col-md-12 mt-sm-2 mt-md-0">
                        <div class="row nested-row">
                            <div class=" col-12 col-sm-5">
                                <label for="date">Date</label>
                            </div>
                            <div class=" col-12 col-sm-7">
                                <input
                                placeholder=""
                                v-model="pledgeDate"
                                type="date"
                                class="form-control"
                                required
                                />
                            </div>
                            <div class=" col-12 col-sm-5 mt-0 mt-sm-3 mt-md-3 ">
                                <label for="topic">Number</label>
                            </div>
                            <div class=" col-12 col-sm-7 mt-0 mt-sm-3 mt-md-3 ">
                                <input type="text"  class="form-control" />
                            </div>
                        
                            <!-- <div class=" col-12 col-sm-5 ">
                                <label for="preacher">Name</label>
                            </div>
                            <div class="col-12 col-sm-7 mt-2 ">
                                <input type="text" class="form-control" />
                            </div> -->
                        </div>
                    </div>
                    </div>

                                  
                    
                </div>
                <!-- <div class="col-sm-12 offset-sm-1 add">Pledge Amount</div> -->
                <div class="attendance-header d-none d-md-block">
                    <div class="row">
                        <div class="col-sm-3">Pledge</div>
                        <!-- <div class="col-sm-3 offset-sm-2"></div> -->
                        <!-- <div class="col-sm-2" style="margin-left: 74px;">Total</div> -->
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-12 mt-2 ">
                        <div  v-if="selectedPledge.donorPaymentType == 0 " class="font-weight-bold col-md-4 ml-4 mt-2  ">Free will</div>
                        <div  v-if="selectedPledge.donorPaymentType == 1 " class="font-weight-bold col-md-4 ml-4 mt-2  ">Specific</div>
                        <div  v-if="selectedPledge.donorPaymentType == 2 " class="font-weight-bold col-md-4 ml-4 mt-2  ">Range</div>
                    </div>
                </div>
                <!-- <div
                    class="attendance-body"
                    id="attendanceBody"
                    > -->
                    
                    <div class="row mt-4 second-form first-row  pt-0 ">
                        <!-- <div class="col-md-8 mb-2 " v-if="selectedContact.name"  >
                            <div class="row">
                                <div class="  col-md-4 col-12  text-sm-left text-lg-right align-self-center ">
                                    <label for="" class="">Person </label>
                                </div>
                                <div class="  col-md-8 col-12 ">
                                        <input type="text" v-model="selectedContact.name" :disabled="checking" class="form-control" />
                                </div>
                            </div>
                        </div> -->
                        <div class="col-md-8 mb-3  " v-if="selectedPledge.donorPaymentType == 2 "  >
                            <div class="row">
                                <div class="col-12 col-md-4  text-sm-left text-lg-right align-self-center ">
                                    <label for="" class="">Pledge Amount </label>
                                </div>
                                <div class="d-flex flex-wrap col-12  col-md-8 ">
                                    <div class=" col-10 col-sm-6 ">
                                        <div class="font-weight-bold" > <span>From:</span>  {{Math.abs(selectedPledge.donorPaymentRangeFromAmount).toLocaleString()}}.00 </div>
                                    </div>
                                    <div class="col-10  col-sm-6   ">
                                        <div class="font-weight-bold  " ><span>To:</span> {{Math.abs(selectedPledge.donorPaymentRangeToAmount).toLocaleString()}}.00 </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                        <div class="col-md-8 mb-3 " v-if="selectedPledge.donorPaymentType == 1 ">
                            <div class="row">
                                <div class="col-md-4 text-md-right align-self-center  ">
                                    <label for="" class=""> Pledge Amount </label>
                                </div>
                        
                                <div class="col-12  col-md-8 ">
                                    <input type="text" v-model="selectedPledge.donorPaymentSpecificAmount" :disabled="checking" class="form-control" />
                                </div>
                            </div>
                        </div>
                        <div class="col-md-8 mb-3  " v-if="selectedPledge.donorPaymentType == 0 " >
                            <div class="row">
                                <div class="col-12 col-md-4 text-md-right align-self-center ">
                                    <label for="" class=""> Pledge Amount </label>
                                </div>
                        
                                <div class="col-md-8 col-12">
                                    <input type="text" v-model="freewillAmount" class="form-control" />
                                </div>
                            </div>
                        </div>
                        <!-- <div class="col-1" @click="deleteAttendance(item.attendanceId, indx)">
                        <i class="pi pi-trash" aria-hidden="true"></i>
                        </div> -->
                    </div>
                <!-- </div> -->
            </div>
            <div class="row mt-3 ">
                <div class="col-md-12 d-lg-flex justify-content-end text-center text-sm-right">
                    <button class="default-btn" v-if="false">Preview</button>
                    <button class="default-btn primary-bg border-0 ml-3" @click="makePledge">
                    <i
                        class="fas fa-circle-notch fa-spin mr-2 text-white"
                        v-if="loading"
                    ></i>
                    <span class="text-white">Save and Continue</span>
                    <span></span>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "@/gateway/backendapi";
import { ref } from "vue";
import Dropdown from "primevue/dropdown";
import InputText from "primevue/inputtext";
import { useToast } from "primevue/usetoast";
import MembersSearch from "../../components/membership/MembersSearch.vue"
import router from '../../router';
import { useRoute } from "vue-router"
import finish from '../../services/progressbar/progress';
// import monthDayYear from "../../services/dates/dateformatter";
// import store from "../../store/store";
import CascadeSelect from 'primevue/cascadeselect';
import ToggleButton from '../donation/toggleButton.vue'
export default {
    components: {
        MembersSearch,
        Dropdown,
        InputText,
        CascadeSelect,
        ToggleButton
    },
    setup() {
        const toast = useToast()
        const route = useRoute();
        const showPerson = ref(false)
        const showPledge = ref(false)
        const churchName = ref('');
        const Address = ref('');
        const loading = ref(false)
        const loadingCode = ref(false)
        const freewillAmount = ref('');
        const checking = ref(false);
        const value = ref()
        const isNameValid = ref(true)
        const isEmailValid = ref(true)
        const selectedPledge = ref({})
        const allPledgeList = ref([]);
        const amountFrom = ref('')
        const makePledgeData = ref('')
        const pledgeDate = ref('')
        const selectedContact = ref({})
        // const selectedDetail = ref({})
        const isActive = ref(null)
        const amountTo = ref('')
        const pledgeCategory = ref(
            [
                {name: 'Free will'},
                {name: 'Specific'},
                {name: 'Range'}
            ]
        )

        const PledgesType = (item) => {
            selectedPledge.value = item;
            // showPledge.value = !showPledge.value
        }
        const selectPerson = () => {
            selectedContact.value = {};
            showPerson.value = !showPerson.value
        }
       

        // const getAllAmount = () =>{
        //     console.log(pledgeAmountCal.value.reduce((acc, item) => acc + item.value, 0), 'alllTotalAmount');
        // }
        // getAllAmount()

        const makePayment = () =>{
            router.push('/pledge/pledgepayment')
        }
     
       
        const currentDate = () => {
            pledgeDate.value = new Date().toISOString().substr(0, 10)
          };
          currentDate()

         const chooseContact = (payload) => {
             payload.firstName = payload.name
            selectedContact.value = payload
            console.log(selectedContact.vaue, 'allContact');
         }
        

        const active = (payload) => {
            isActive.value = payload
        }

        const getSinglePledge = async () =>{
            try{
                const res = await axios.get(`/api/Pledge/GetOnePledge?ID=${route.query.id}`)
                selectedPledge.value = res.data.returnObject.pledgeType
                console.log(selectedPledge.value,'selected');
                selectedContact.value = res.data.returnObject.person
                console.log(selectedContact.value, 'getSinglePledge');
            }
            catch(error){
                console.log(error)
            }
        }
        getSinglePledge()

        const getAllPledgeDefinition = async () =>{
                try{
                    checking.value = false;
                    const res = await axios.get('/api/Pledge/GetAllPledgeDefinitions')
                    finish()
                    allPledgeList.value = res.data.returnObject
                    isActive.value = res.data.returnObject.map( i => {
                        return {
                            isActive : i.isActive
                        }
                    })
                    console.log(allPledgeList.value,'getPledgeList');
                    checking.value = true;
                }
                catch (error){
                    console.log(error)
                }
            }
            getAllPledgeDefinition()

            const makePledge = async () =>{
                let donorAmountBase = '';
                 if(selectedPledge.value.donorPaymentType == 0 ){
                     donorAmountBase = freewillAmount.value 
                 } else if(selectedPledge.value.donorPaymentType == 1){
                     donorAmountBase = selectedPledge.value.donorPaymentSpecificAmount
                 }else if(selectedPledge.value.donorPaymentType == 2){
                     donorAmountBase = selectedPledge.value.donorPaymentRangeFromAmount
                 }else{
                     return donorAmountbase;
                 }

                 const makePledgeDetails = {
                    personID: selectedContact.value.id,
                    pledgeTypeID: selectedPledge.value.id,
                    amountBase: donorAmountBase,
                    amountTop: selectedPledge.value.donorPaymentRangeToAmount             
                }
                if(route.query.id){
                        const makePledgeDetail = {
                            id: route.query.id,
                            personID: selectedContact.value.id,
                            pledgeTypeID: selectedPledge.value.id,
                            amountBase: donorAmountBase,
                            amountTop: selectedPledge.value.donorPaymentRangeToAmount             
                }
                try{
                        loading.value = true;
                        const response = await axios.put('/api/Pledge/UpdatePledge', makePledgeDetail );

                        toast.add({
                        severity: "success",
                        summary: "Successful",
                        detail: "Pledge updated successfully",
                        life: 3000,
                         })

                        console.log(response, "response");

                         
                        router.push("/tenant/pledge/pledgeslist");


                        loading.value = false;
                    }
                    catch(error){
                        console.log(error)
                    }

                } else{
                    
                    try{
                    const res = await axios.post('api/Pledge/SavePledge', makePledgeDetails)
                    finish()
                    console.log(res.data,'PledgeSave');
                    makePledgeData.value = res.data.returnObject

                     toast.add({
                        severity: "success",
                        summary: "Successful",
                        detail: "You are successfully make a Pledge",
                        life: 2000,
                    });
                    
                    router.push({  
                        name: 'PledgeMaking',
                        query: {
                            id: makePledgeData.value.pledgeTypeID,
                            pledgeTypeID: makePledgeData.value.id,
                            pledgeType: selectedPledge.value.name,
                            name: selectedContact.value.name,
                            date: selectedPledge.value.dateEntered
                        }
                    })
                    
                }
                    catch (error){
                        if (error.response) {
                            toast.add({
                            severity: "warn",
                            summary: 'Not successful',
                            detail: `${error.response.data}`,
                            life: 8000,
                            });
                        } else {
                            toast.add({
                            severity: "error",
                            summary: "Network Error",
                            detail: `Please ensure you have a strong internet  connection`,
                            life: 4000,
                            });
                        }
                        console.log(error)
                    }
                }
                
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
            allPledgeList,
            PledgesType,
            checking,
            makePledge,
            chooseContact,
            selectedPledge,
            makePayment,
            pledgeCategory,
            selectPerson,
            amountTo,
            amountFrom,
            freewillAmount,
            // savePledge,
            checkEmailValue,
            churchName,
            selectedContact,
            Address,
            pledgeDate,
            value,
            loading,
            loadingCode,
            makePledgeData,
            checkNameValue,
            isNameValid,
            isEmailValid,
            isActive,
            active,
            showPerson,
            showPledge,
            // selectedDetail
        }
    },
}
</script>

<style scoped>
       .heading-text {
        font: normal normal 800 1.5rem Nunito sans;
}

.scroll{
    max-height: 400px;
    overflow-y: scroll;
    overflow-x: hidden;
}

.roll3 {
  transition: all 0.5s ease-in-out;
  transform: rotate(180deg);
}

.attendance-body.stretch{
  height: 85px;
}
.attendance-type,
.count {
  background-color: rgb(255, 255, 255);
  width: 80%;
  border-radius: 5px;
  padding: 5px;
}
.attendance-header div,
.attendance-body div {
  padding: 5px;
}

.form {
  margin-top: 50px;
  background: #ffffff 0% 0% no-repeat padding-box;
  box-shadow: 0px 3px 15px #797e8159;
  border: 1px solid #dde2e6;
  border-radius: 7px;
}
.form .second-form.row.first-row {
  padding: 30px;
}

.attendance-header {
  background-color: #ecf0f3;
  padding: 0 50px;
  border: none;
  border-bottom: 1px solid rgb(204, 204, 204);
}

.attendance-header div,
.attendance-body div {
  padding: 5px;
}
.attendance-header div {
  color: #002044;
  font-weight: 700;
}

.style-pledge{
  padding: 10px;
  box-shadow: 0px 3px 15px #797e8159;
  position: absolute;
  /* top: 10px; */
  background: white;
  z-index: 1;
  width: 90%;
  max-height: 20em;
  overflow-y: scroll;
}
.add {
  font: normal normal bold 16px Nunito Sans;
  letter-spacing: 0px;
  color: #136acd;
  display: inline;
  padding: 10px 15px;
  background: #ecf0f3;
  border-radius: 10px 10px 0px 0px;
  position: relative;
  top: -8px;
}
.style-pledge div:hover {
  /* background-color: #ecf0f3; */
  cursor: pointer;
}
.style-person {
  padding: 10px;
  box-shadow: 0px 3px 15px #797e8159;
  position: absolute;
  /* top: 10px; */
  background: white;
  z-index: 1;
  width: 90%;
  height: 10em;
  max-height: 20em;
  overflow-y: scroll;
}
.style-person div:hover {
  background-color: #ecf0f3;
  cursor: pointer;
}

.dropdown-container select {
  /* for Firefox */
  -moz-appearance: none;
  /* for Safari, Chrome, Opera */
  -webkit-appearance: none;
}
/* for IE10 */
.dropdown-container select::-ms-expand {
  display: none;
}

.select-elem-con {
  padding: 47px 0;
  height: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #ebeff4;
  border-radius: 8px;
  font-size: 1.2em;
  font-weight: 600;
  
}
.event-buttons a:hover,
.pointer {
  cursor: pointer;
}

.select-elem-con:hover {
  background: rgba(166, 200, 232, 0.302);
  transition: all 0.4s ease-in-out
}
</style>