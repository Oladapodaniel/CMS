<template>
    <!-- <div class="container  container-top container-wide ">
        <div class="row d-flex justify-content-between px-3">
                <div class="heading-text"> Pledge Making </div>
        </div>
        <div class="container border rounder  sub-con ">
            <div class="row">
                <div class="col-md-12 border-bottom mt-4 " >
                     <div class="row my-1 mt-3 d-flex justify-content-center ">
                        <div class="col-md-7  ">
                            <div class="row ">
                                <div class="col-md-4 text-md-right align-self-center">
                                    <label for="" class=""> Person <sup class="text-danger">*</sup> </label>
                                </div>
                                <div class="col-md-8">
                                    <input type="text" v-model="memberName" :disabled="checking" class="form-control w-100" />
                                </div>
                            </div>
                        </div>
                    </div>
                     <div class="row my-1 mt-3 d-flex justify-content-center">
                        <div class="col-md-7  ">
                            <div class="row">
                                <div class="col-md-4 text-md-right align-self-center">
                                    <label for="" class="">Pledge Type <sup class="text-danger">*</sup> </label>
                                </div>
                                <div class="col-md-8">
                                    <Dropdown v-model="selectedPledge" class="w-100 font-weight-normal" :disabled="checking" :options="allPledgeList"  optionLabel="name" placeholder="Select Pledge" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row my-1 mt-3 d-flex justify-content-center">
                        <div class="col-md-7  " v-if="selectedPledge.donorPaymentType == 0 " >
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
                    <div class="row my-1 mt-2 d-flex justify-content-center">
                        <div class="col-md-7  " v-if="selectedPledge.donorPaymentType == 1 ">
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
                    <div class="row my-1 mt-2 d-flex justify-content-center  ">
                         <div class="col-md-7 " v-if="selectedPledge.donorPaymentType == 2 "  >
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
                </div>

                    <div class="container mt-4">
                         <div class="row d-flex justify-content-center" >
                            <div
                                class="col-md-10 col-sm-11  col-lg-8  border rounded"
                            >
                                <div class="row">
                                <div class="col-md-2 col-sm-2 d-flex align-self-center image mt-3">
                                    <img
                                    src="../../assets/link.svg" class="w-100"
                                    alt="marked Attendance image"
                                    style="width: 60px; height: 60px"
                                    />
                                </div>
                                <div class="col-md-10 col-sm-10 mt-3">
                                    <a class="text-decoration-none"
                                    ><h4 class="header4 link-color c-pointer" @click="copyRegLink">Online Payment Link</h4></a
                                    >
                                    <p class="para">
                                    <span class="d-flex align-items-center"
                                        ><input
                                        type="text"
                                        ref="selectedLink"
                                        v-model="pledgePaymentLink"
                                        class="form-control"
                                        placeholder="Link"
                                        style="width: 95%" />
                                        <i
                                        class="pi pi-copy ml-2 c-pointer"
                                        @click="copyLink"
                                        style="font-size: 22px"
                                        ></i>
                                        <span class="font-weight-bold small ml-1 c-pointer" style="width: 20%">Send Email</span>
                                        <span class="font-weight-bold small c-pointer" style="width: 20%">Send Sms</span>
                                    </span>
                                    </p>
                                </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="container ">
                        <div class="row  mt-3 d-flex justify-content-center">
                            <div
                                class="col-md-10  col-sm-11  col-lg-8  border rounded"
                            >
                                <div class="row">
                                <div class="col-md-2 col-sm-2 d-flex justify-content-center image mt-3">
                                    <img
                                    src="../../assets/link.svg" 
                                    alt="marked Attendance image"
                                    style="width: 60px; height: 60px"
                                    />
                                </div>
                                <div class="col-md-10 col-sm-10 mt-3">
                                    <a class="text-decoration-none"
                                    ><h4 class="header4 link-color c-pointer" @click="copyLink">Virtual payment Link</h4></a
                                    >
                                    <p class="para">
                                    <span class="d-flex align-items-center"
                                        ><input
                                        type="text"
                                        ref="checkinLink"
                                        @click="copyLink"
                                        class="form-control"
                                        style="width: 95%" />
                                        <i
                                        class="pi pi-copy ml-2 c-pointer"
                                        @click="copyLink"
                                        style="font-size: 22px"
                                        ></i>
                                        <span class="font-weight-bold small ml-1 c-pointer" style="width: 20%" >Send Email</span>
                                        <span class="font-weight-bold small c-pointer" style="width: 20%" >Send Sms</span>
                                    </span>
                                    </p>
                                </div>
                                </div>
                            </div>
                        </div>   
                    </div>      

                     <div class="col-md-12  mt-4">
                            <div class="row  ">
                                <div class=" col-md-12 d-flex justify-content-center mb-2  ">
                                    <button class="default-btn primary-bg border-0 text-white" type="button" data-toggle="modal" data-target="#exampleModalCente" data-dismiss="modal" @click="makePayment">
                                        <i class="pi pi-spin pi-spinner"  v-if="loading"></i> Make Payment
                                    </button>
                                </div>
                            </div>
                        </div>
                
            </div>
        </div>
    </div> -->
    <div class="container-fluid">
        <div class="row">
            <div class="col-md-12 px-0">
                <div class="container">
                <div class="row mt-4">
                    <div class="col-md-5">
                    <h2 class="font-weight-bold page-hder">Pledge view</h2>
                    </div>
                    <div class="col-md-7 d-sm-flex justify-content-md-end">
                    <a class="def-btn mr-3 px-md-4 my-sm-1" v-if="false"
                        >More Actions <i class="fad fa-caret-circle-down"></i
                    ></a>
                    <!-- <router-link :to="`/tenant/pledge/pledgepaymentlist?id=${pledgeID}`"> -->
                    <router-link to="/tenant/pledge/pledgepaymentlist">
                        <button class="default-btn mr-3 my-sm-1 ">View Payment form </button> 
                    </router-link>
                    <router-link :to="{ name: 'MakePledge', path: '/tenant/pledge/makepledge' }">
                        <a class="def-btn primary-bg text-white  border-0 px-sm-2 px-lg-4 my-sm-1"
                        >Create new pledge</a
                        >
                    </router-link>
                    </div>
                    <Toast />
                </div>
                <hr class="mb-4" />
                </div>
                <div class="container" style="width: 80%" v-if="!isPending && !errorGettingReport">
                <div class="row mx-1 mb-4 mt-3">
                    <!-- <div class="col-md-2 pl-0">
                    <span class="theader mb-1">Status</span>
                    <div class="my-3">
                        <span class="draft font-weight-bold ">Unsent</span>
                    </div>
                    </div> -->

                    <div class="col-md-7">
                    <span class="theader"> Pledge Name </span>
                    <div class="my-3">
                        <span class="evt-name">
                        {{ pledgeName ? pledgeName : "" }}
                        <i class="pi pi-info-circle"></i>
                        </span>
                    </div>
                    </div>

                    <div class="col-md-5">
                    <span class="theader">Date</span>
                    <div class="my-3">
                        <span class="date">{{ pledgeDate ? new Date(pledgeDate).toLocaleDateString() : ""}}</span>
                    </div>
                    </div>
                </div>

                <!-- <div class="row mx-1 mb-5">
                    <div class="col-md-12">
                        Unapproved
                    <div class="row unapproved">
                        <div class="col-md-12">
                        <div class="row" v-if="!reportApproved">
                            <div class="col-md-12 py-3 info-div">
                            <span class="px-2"
                                ><i class="pi pi-info-circle"></i
                            ></span>
                            <span class="font-weight-bold"
                                >This is a DRAFT pledge. You can take further actions
                                once you approve it.</span
                            >
                            <span class="px-2"
                                ><span style="color: #136acd">Learn more</span>
                                <i class="pi pi-external-link ml-2"></i
                            ></span>
                            </div>
                        </div>
                        <div class="row my-3">
                            <div class="col-md-1 d-flex align-items-center">
                            <span class="file-icon"
                                ><i class="pi pi-book" style="color: #136acd"></i
                            ></span>
                            </div>
                            <div class="col-md-5">
                            <span class="grey-text">Create </span>
                            <p>
                                <span class="dark-text">Created: </span>
                                <span class="grey-text">
                                just a moment ago
                                </span>
                            </p>
                            </div>
                            <div
                            class="col-md-6 d-sm-flex justify-content-end"
                            v-if="!reportApproved"
                            >
                            
                            <a
                                class="def-btn approve-btn mr-4"
                                @click="toggleReportState"
                                >Approve report</a
                            >
                            <router-link
                                :to="`/tenant/pledge/makepledge?id=${pledgeID}`"
                            >
                                <a class="def-btn ">Edit report</a>
                            </router-link>
                            </div>
                        </div>
                        </div>
                    </div>
                     Approved
                    <div class="row unapproved mt-4">
                        <div class="col-md-12">
                        <div class="row my-3">
                            <div class="col-md-1 d-flex align-items-center">
                            <span class="file-icon"
                                ><i
                                class="pi pi-arrow-down"
                                style="color: #136acd"
                                ></i
                            ></span>
                            </div>
                            <div class="col-md-5 grey-text">
                            <span class="grey-text">Send </span>
                            <p>
                                <span class="grey-text">Last sent: </span>
                                <span class="grey-text"> {{ lastSent }}</span>
                            </p>
                            </div>
                            <div class="col-md-6" v-if="reportApproved">
                            <div class="row">
                                <div class="col-md-12">
                                <div class="row">
                                    <div class="col-6">
                                    <a
                                        class="def-btn approve-btn"
                                        data-toggle="modal"
                                        data-target="#sendReport"
                                        :class="{ 'resend-btn': markedAsSent }"
                                    >
                                        {{ sendBtnText }}
                                    </a>
                                    </div>
                                    <div class="row">
                                    <div class="col-md-12">
                                        <div
                                        class="modal fade"
                                        id="sendReport"
                                        tabindex="-1"
                                        aria-labelledby="exampleModalLabel"
                                        aria-hidden="true"
                                        :show="true"
                                        >
                                        <div class="modal-dialog modal-lg"  >
                                            <div class="modal-content">
                                            <div class="modal-header">
                                                <h5 class="modal-title font-weight-bold" id="sendReport">
                                                Send this report
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
                                            <div class="modal-body pt-0 px-0"  :data-dismiss="btnState">
                                                <ReportModal
                                                :eventName="pledgeName ? pledgeName : ''
                                                "
                                                @sendreport="sendReport"
                                                :stats="stats"
                                                />
                                            </div>
                                            </div>
                                        </div>
                                        </div>
                                    </div>
                                    </div>
                                    <div class="col-6">
                                    <a class="def-btn edit-btn" @click="copyLink2"
                                        >Get share link</a
                                    >
                                    </div>
                                </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-6 offset-md-1" style="">
                                <span class="mr-2">or</span>
                                <a
                                    style="color: #136acd; cursor: pointer"
                                    @click="markAsSent"
                                    >mark as sent</a
                                >
                                </div>
                            </div>
                            </div>
                            <div class="col-md-12 pt-2" v-if="willCopyLink">
                            <span class="d-flex" @click="copyLink">
                                <input
                                type="text"
                                name=""
                                @keydown="(e) => e.preventDefault()"
                                class="form-control mr-2"
                                :value="locationTwo"
                                ref="shareableLinkField"
                                style="width:90%"
                                />
                                <span><i class="pi pi-copy c-pointer" style="font-size: 1.5rem"></i></span>
                            </span>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                </div> -->

                <div class="container-fluid bottom-section px-0">
                    <div class="row mx-0" ref="topmost">
                    <div class="col-md-8 dark-red-section pl-5">
                        <h2 class="evt-report">Pledge</h2>
                    </div>
                    <div
                        class="col-md-4 d-flex flex-column light-red-section pr-5 text-center"
                    >
                        <!-- <span>
                        <span class="mb-n3">Total Pledge: </span> <br />
                        <span class="recieve">60</span>
                        </span>
                        <span>
                        <span>Total Amount: </span> <br />
                        <span class="recieve">NGN 600,000 &nbsp;</span
                        >
                        </span> -->
                    </div>
                    </div>

                    <div class="row py-5 px-5" ref="middle">
                    <div class="col-md-7">
                        <span class="evt-label grey-text"> Pledge Name </span>
                        <h2 class="font-weight-bold mb-3" style="font-size: 25px">
                            {{pledgeName}}
                        </h2>
                        <span class="evt-date text-danger"> 
                            {{ pledgeDate ? new Date(pledgeDate).toString().split(" ").slice(0, 4).join(" ") : ""}}
                        </span>
                    </div>
                    <div class="col-md-5 pl-0">
                        <div class="row">
                        <div class="col-md-6 d-md-flex justify-content-end">
                            <span class="bold-700">Pledge Type: </span>
                        </div>
                        <div class="col-md-6 pl-md-0">
                            <span>{{pledgeName}}</span>
                        </div>
                        </div>
                        <div class="row">
                        <div class="col-md-6 d-md-flex justify-content-end">
                            <span class="bold-700"> Person: </span>
                        </div>
                        <div class="col-md-6 pl-md-0">
                            <span>{{personName}}</span>
                        </div>
                        </div>
                    </div>
                    </div>

                    <div class="row mb-5" ref="bottom">
                    <div class="col-md-12">
                        <div class="row mb-4">
                        <div class="col-md-12">
                            <span class="attendance-header">Payment link</span>
                        </div>
                        </div>
                        <div class="row">
                        <div class="col-sm-12">
                            <hr class="hr-dark" />
                        </div>
                        </div>
                        <div class="pg-content">
                            <div class="analytics-container first-con">
                                    <div class="ana-group row d-flex justify-content-center">
                                
                                        <div
                                            class="col-md-11 col-sm-12  col-lg-10  mb-5 border rounded"
                                        >
                                            <div class="row">
                                                <div class="col-md-2 col-sm-2 d-flex align-self-center image mt-3">
                                                    <img
                                                    src="../../assets/link.svg" class="w-100"
                                                    alt="marked Attendance image"
                                                    style="width: 60px; height: 60px"
                                                    />
                                                </div>
                                                <div class="col-md-10 col-sm-10 mt-3">
                                                    <a class="text-decoration-none"
                                                    ><h4 class="header4 link-color c-pointer" @click="copyRegLink">Online Payment Link</h4></a
                                                    >
                                                    <p class="para">
                                                    <span class="d-flex align-items-center"
                                                        ><input
                                                        type="text"
                                                        ref="selectedLink"
                                                        v-model="pledgePaymentLink"
                                                        class="form-control"
                                                        placeholder="Link"
                                                        style="width: 95%" />
                                                        <i
                                                        class="pi pi-copy ml-2 c-pointer"
                                                        @click="copyLink"
                                                        style="font-size: 22px"
                                                        ></i>
                                                        <!-- <span class="font-weight-bold small ml-1 text-primary c-pointer" style="width: 30%">Send Email</span>
                                                        <span class="font-weight-bold small text-primary c-pointer" style="width: 30%">Send Sms</span> -->
                                                    </span>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                <hr class="hr" />
                            </div>
                            <div class="analytics-container first-con">
                                    <div class="ana-group row d-flex justify-content-center mb-4">
                                
                                        <div
                                            class="col-md-11 col-sm-12  col-lg-10 mb-3  border rounded"
                                        >
                                            <div class="row">
                                                <div class="col-md-2 col-sm-2 d-flex align-self-center image mt-3">
                                                    <img
                                                    src="../../assets/link.svg" class="w-100"
                                                    alt="marked Attendance image"
                                                    style="width: 60px; height: 60px"
                                                    />
                                                </div>
                                                <div class="col-md-10 col-sm-10 mt-3">
                                                    <a class="text-decoration-none"
                                                    ><h4 class="header4 link-color c-pointer" @click="copyLink">Virtual payment Link</h4></a
                                                    >
                                                   <p class="para">
                                                        <span class="d-flex align-items-center"
                                                            ><input
                                                            type="text"
                                                            ref="checkinLink"
                                                            @click="copyLink"
                                                            class="form-control"
                                                            style="width: 95%" />
                                                            <i
                                                            class="pi pi-copy ml-2 c-pointer"
                                                            @click="copyLink"
                                                            style="font-size: 22px"
                                                            ></i>
                                                            <!-- <span class="font-weight-bold small text-primary ml-1 c-pointer" style="width: 30%" >Send Email</span>
                                                            <span class="font-weight-bold small text-primary c-pointer" style="width: 30%" >Send Sms</span> -->
                                                        </span>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                <hr class="hr" />
                            </div>
                            <div class="analytics-container first-con">
                                     <div class="ana-group row d-flex justify-content-center">
                                
                                        <div
                                            class="col-md-11 col-sm-12  col-lg-10  mb-5 border rounded"
                                        >
                                            <div class="row">
                                                <div class="col-md-2 col-sm-2 d-flex align-self-center image mt-3">
                                                    <img
                                                    src="../../assets/link.svg" class="w-100"
                                                    alt="marked Attendance image"
                                                    style="width: 60px; height: 60px"
                                                    />
                                                </div>
                                                <div class="col-md-10 col-sm-10 mt-4">
                                                    <a class="text-decoration-none"
                                                    ><h4 class="header4 link-color c-pointer" @click="copyRegLink">Account detail</h4></a
                                                    >
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                        <div class="row">
                                            <div class=" col-md-12 mt-2 mt-md-0 mb-3 d-flex justify-content-center ">
                                                <button class="default-btn primary-bg border-0 text-white" data-dismiss="modal" @click="makePayment">
                                                    <i class="pi pi-spin pi-spinner" v-if="loading"></i> Make Payment now
                                                </button>
                                            </div>
                                        </div>
                                <hr class="hr" />
                            </div>
                        </div>
                    </div>
                    </div>

                    <div class="row mb-5">
                    </div>
                    <div class="row">
                    <div class="col-md-12">
                        
                    </div>
                    </div>
                </div>

                </div>

                <div class="row genarationg-report" v-if="isPending">
                <div class="col-md-12 text-center mb-n4">
                    <span class="primary-text font-weight-bold"
                    >Generating Your Report ...</span
                    >
                </div>
                <div class="col-md-12">
                    <Loading :loading="isPending" />
                </div>
                </div>

                <div class="row" v-if="errorGettingReport">
                <div class="col-md-12 text-center text-danger font-weight-bold">
                    <p class="text-danger">Error generating report, please try reloading the page. </p>
                    <p class="mb-0">If this link was copied ensure you copied the whole link</p>
                    <p>Else if this continues, please contact us at <a href="mailto:info@churchplus.co" class="text-primary">info@churchplus.co</a></p>
                </div>
                </div>
            </div>
        </div>
    </div>
    <Toast />
</template>

<script>
import axios from "@/gateway/backendapi";
import ReportModal from "@/components/firsttimer/ReportModal.vue";
import { ref, computed } from "vue";
import Dropdown from "primevue/dropdown";
import InputText from "primevue/inputtext";
import { useToast } from "primevue/usetoast";
import MembersSearch from "../../components/membership/MembersSearch.vue"
import Loading from "../../components/loading/LoadingComponent";
import router from '../../router';
import { useRoute } from "vue-router"
import finish from '../../services/progressbar/progress';
import CascadeSelect from 'primevue/cascadeselect';
import ToggleButton from '../donation/toggleButton.vue'
export default {
    components: {
        MembersSearch,
        ReportModal,
        Loading,
        Dropdown,
        InputText,
        CascadeSelect,
        ToggleButton
    },
    setup() {
        const toast = useToast()
        const selectedLink = ref(null)
        const isPending = ref(true);
        const errorGettingReport = ref(false);
        const emaildata = ref(null);
        const reportApproved = ref(false);
        const status = ref("Draft");
        const lastSent = ref("just a moment ago");
        const sendBtnText = ref("Send report");
        const tenantID = ref('')
        const route = useRoute();
        const churchName = ref('');
        const Address = ref('');
        const loading = ref(false)
        const freewillAmount = ref('');
        const checking = ref(false);
        // const value = ref()
        const isNameValid = ref(true)
        const isEmailValid = ref(true)
        const selectedPledge = ref('')
        const memberName = ref('')
        const allPledgeList = ref([]);
        const amountFrom = ref('')
        const selectedContact = ref({})
        const isActive = ref(null)
        const url = ref("");
        const amountTo = ref('')
        const pledgeCategory = ref(
            [
                {name: 'Free will'},
                {name: 'Specific'},
                {name: 'Range'}
            ]
        )

        const personName = ref(route.query.name)
        const pledgeName = ref(route.query.pledgeType)
        const pledgeID = ref(route.query.pledgeTypeID)
        const pledgeDate = ref(route.query.date)

        
        const shareableLinkField = ref(null);
        const locationTwo = ref(window.location);
        const willCopyLink = ref(false);
        
        const copyLink2 = () => {
            try {
                willCopyLink.value = true;
                const a = shareableLinkField.value;
                a.select();
                a.setSelectionRange(0, 200); /* For mobile devices */

                /* Copy the text inside the text field */
                document.execCommand("copy");
                toast.add({
                severity: "info",
                summary: "Link Copied",
                detail: "Shareable link copied to your clipboard",
                life: 3000,
                });
            } catch (error) {
                console.log(error);
            }
            };
            url.value = `my.churchplus.co/tenant/pledge/pledgemaking/pledgeTypeID=${route.query.pledgeTypeID}&pledgeType=${pledgeName.value}&id=${route.query.id}&name=${route.query.name}`;

       
        // const savePledge = async () => {

        // }

        const makePayment = () =>{
            // router.push('/tenant/pledge/pledgepayment')
            router.push(`/tenant/pledge/pledgepayment?pledgeTypeID=${route.query.pledgeTypeID}&id=${route.query.id}&name=${route.query.name}`)
        }

        const toggleReportState = () => {
             reportApproved.value = !reportApproved.value;
                status.value = "Unsent";
            };


         const chooseContact = (payload) => {
            // contactRef.value.hide();
            selectedContact.value = payload

            // console.log(payload, 'my allll')
         }

         const pledgePaymentLink = computed(() => {
                if (!route.query.id) return ""
                return `${window.location.origin}/pledge/pledgepayment?pledgeTypeID=${route.query.pledgeTypeID}&id=${route.query.id}&name=${route.query.name}`
        })

        const copyLink = () => {
            console.log(selectedLink.value.value, "jkjjhkj");
                selectedLink.value.setSelectionRange(0, selectedLink.value.value.length); /* For mobile devices */
                selectedLink.value.select();

                /* Copy the text inside the text field */
                document.execCommand("copy");
            toast.add({
                    severity: "info",
                    summary: "Link Copied",
                    detail: "copied to your clipboard",
                    life: 3000,
                });
            }
        const sendReport = (messageObj) => {
      const emailData = ref(emaildata.value.innerHTML);
      const message = `
                <!DOCTYPE HTML PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
                <html xmlns="http://www.w3.org/1999/xhtml" style="box-sizing: border-box; font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; font-size: 14px; margin: 0; padding: 0;">
                  <head>
                    <meta name="viewport" content="width=device-width"/>
                    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
                    <title>#title#</title>
                    <style>
                      .topmost {
                        display: flex;
                      }

                      .topmost-box1 {
                        width: 70%;
                        height:133px;
                        display:flex;
                        align-items:center;
                        padding:10px
                      }

                      .topmost-box2{
                        width: 30%;display:flex; flex-direction:column; height:133px; align-items:center; justify-content:center
                      }
                    </style>
                  </head>
                  <body style="-webkit-font-smoothing: antialiased; -webkit-text-size-adjust: none; background: #f6f6f6; box-sizing: border-box; font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; font-size: 14px; height: 100%; line-height: 1.6; margin: 0; padding: 0; width: 100% !important;">
                  
                  ${`${messageObj.data.message}`} <br>

                  ${emailData.value}
                  </body>
                  `;
      const body = {
        // message: topmost.value.innerHTMl.toString(),

        ispersonalized: false,
        contacts: messageObj.data.contacts,
        subject: messageObj.data.subject,
        // user: "+2349086767765",
      };
      if (messageObj.medium === "sms") {
        body.gateWayToUse = "hostedsms";
        body.category = "";
        body.emailAddress = "";
        body.emailDisplayName = "";
        body.isoCode = messageObj.data.isoCode;
        body.toOthers = messageObj.data.toOthers;
      }

      body.message =
        messageObj.medium === "sms" ? messageObj.data.message : message;

      const url =
        messageObj.medium === "sms"
          ? "/api/Messaging/sendSms"
          : "/api/Messaging/sendEmail";

      composerObj
        .sendMessage(url, body)
        .then((res) => {
          btnState.value = "";
          console.log(res, "report response");
          if (res.status === false) {
            toast.add({
              severity: "error",
              summary: "Sending Failed",
              detail: res.message,
              life: 3000,
            });
          } else {
            toast.add({
              severity: "success",
              summary: "Send Success",
              detail: "Your report has been sent",
              life: 3000,
            });
            markAsSent()
          }
        })
        .catch((err) => {
          btnState.value = "";
          console.log(err);
          stopProgressBar();
          toast.add({
            severity: "error",
            summary: "Sending Failed",
            detail: "Report was not sent, please try again",
            life: 3000,
          });
        });
      btnState.value = "modal";
    };

        const getCurrentlySignedInUser = async () => {
            try {
                const res = await axios.get("/api/Membership/GetCurrentSignedInUser");
                tenantID.value = res.data.tenantId
            } catch (err) {
                // errorGettingReport.value = true;
                console.log(err);
            }
            };

        getCurrentlySignedInUser();
        

        const active = (payload) => {
            isActive.value = payload
        }
        const getAllPledgeDefinition = async () =>{
            // errorGettingReport.value = false;
                try{

                    checking.value = false;
                    const res = await axios.get('/api/Pledge/GetAllPledgeDefinitions')
                    finish()
                    allPledgeList.value = res.data.returnObject

                    getDetails()
                    
                    isActive.value = res.data.returnObject.map( i => {
                        return {
                            isActive : i.isActive
                        }
                    })
                    console.log(allPledgeList.value,'getPledgeList');
                    errorGettingReport.value = false;
                    isPending.value = false;
                    checking.value = true;
                    
                }
                catch (error){
                    console.log(error)
                     isPending.value = false;
                    errorGettingReport.value = true;
                }
            }
            getAllPledgeDefinition()

            const getDetails = () =>{
            selectedPledge.value = allPledgeList.value.find(i => i.id === route.query.id)
            memberName.value = route.query.name
                }
            

            const makePledge = async () =>{

                 const makePledgeDetails = {
                    personID: selectedContact.value.id,
                    pledgeTypeID: selectedPledge.value.id,
                    amountBase: selectedPledge.value.donorPaymentRangeFromAmount,
                    amountTop: selectedPledge.value.donorPaymentRangeToAmount,
                    amountBase: selectedPledge.donorPaymentSpecificAmount,
                    amountBase:  freewillAmount.value                  
                }

                try{
                    const res = await axios.post('api/Pledge/SavePledge', makePledgeDetails)
                    finish()
                    console.log(res,'getSinglePledge');
                    router.push(`/pledge/pledgepayment?ID=${route.query.id}&name=${route.query.name}`)
                    
                }
                catch (error){
                    console.log(error)
                }
            }

        // const getSinglePledgeDefinition = async () =>{
        //         try{
        //             const res = await axios.get(`/api/Pledge/GetSinglePledgeDefinitions?ID${allPledgeList.value.id}`)
        //             finish()
        //             console.log(res,'getSinglePledge');
        //         }
        //         catch (error){
        //             console.log(error)
        //         }
        //     }
        //     getSinglePledgeDefinition()


        

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
            url,
            allPledgeList,
            locationTwo,
            shareableLinkField,
            copyLink2,
            willCopyLink,
            emaildata,
            sendReport,
            pledgeID,
            lastSent,
            status,
            sendBtnText,
            toggleReportState,
            reportApproved,
            isPending,
            errorGettingReport,
            personName,
            pledgeName,
            memberName,
            tenantID,
            checking,
            makePledge,
            chooseContact,
            selectedPledge,
            pledgeDate,
            makePayment,
            pledgeCategory,
            amountTo,
            amountFrom,
            freewillAmount,
            pledgePaymentLink,
            // savePledge,
            checkEmailValue,
            churchName,
            selectedContact,
            Address,
            // value,
            loading,
            checkNameValue,
            isNameValid,
            isEmailValid,
            selectedLink,
            isActive,
            active,
            copyLink
        }
    },
}
</script>

<style scoped>
       .heading-text {
        font: normal normal 800 1.5rem Nunito sans;
}

.email-data {
  height: 0 !important;
  overflow: hidden !important;
}

.info-div {
  background: #f9f8db;
  border: 1px solid #dde2e6;
  border-radius: 5px 5px 0px 0px;
  text-align: center;
}
.file-icon {
  color: #136acd;
  border: 1px solid #136acd;
  padding: 10px;
  border-radius: 50%;
  height: 40px;
  width: 40px;
  text-align: center;
  font-size: 20px;
  display: flex;
  align-items: center;
}
* {
  color: #1c252c;
  box-sizing: border-box;
}

a {
  text-decoration: none;
  font-weight: 700;
}

.def-btn {
  height: 40px;
  border-radius: 22px;
  /* padding: 0 24px; */
  padding: 8px 10px;
  width: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #dde2e6;
}

.def-btn:hover {
  cursor: pointer;
}

.resend-btn {
  background: transparent !important;
  color: #4d6676 !important;
  border: 1px solid #dde2e6 !important;
}

.approve-btn {
  background: #136acd;
  color: white;
}

.edit-btn {
  border: 1px solid #dde2e6;
}

.unapproved {
  background: #ffffff 0% 0% no-repeat padding-box;
  box-shadow: 0px 3px 15px #00000029;
  border: 1px solid #dde2e6;
  border-radius: 5px;
}

.analytics-container {
  /* padding: 0 24px 24px 24px; */
  width: 90%;
  margin: auto;
}

.first-con {
  margin-top: 50px;
}

.theader {
  font-size: 14px;
  font-weight: 800;
  color: #0f0220;
}
.evt-name {
  color: #136acd;
  font-weight: 800;
  font-size: 22px;
}

.evt-report {
  font-size: 25px;
}
.grey-text {
  color: #8296ae;
}

.date {
  font-size: 20px;
  font-weight: 600;
  color: #1d262d;
}

.draft {
  border: 0.5px solid #252a2f;
  padding: 10px;
  border-radius: 22px 0 0 22px;
  background: grey;
}

.genarationg-report {
  min-height: calc(100vh - 200px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-weight: bold;
  font-size: 20px;
}

.analytics,
.attendance-header {
  background: #1c252c;
  color: #fff;
  width: 155px;
  height: 37px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 24px;
}

.hr-dark {
  border: 1px solid #000;
}

.header4 {
  font: var(--unnamed-font-style-normal) normal var(--unnamed-font-weight-bold)
    18px/24px var(--unnamed-font-family-nunito-sans);
  letter-spacing: var(--unnamed-character-spacing-0);
  text-align: left;
  font: normal normal bold 18px/24px Nunito Sans;
  letter-spacing: 0px;
  color: #02172e;
  opacity: 0.8;
}

.recieve {
  font-size: 20px;
}
.bold-700 {
  font-weight: 700;
}

.dark-red-section {
  /* background: #980404; */
  background: #ff0000b5;
  color: #fff;
  height: 133px;
  display: flex;
  align-items: center;
  border-radius: 5px 0px 0px 0px;
  height: 133px;
  display: flex;
  align-items: center;
  border-radius: 5px 0px 0px 0px;
}
.bottom-section {
  box-shadow: 0px 3px 10px #00000029;
  border: 1px solid #dde2e6;
  border-radius: 5px;
}

.light-red-section {
  /* background: #ff0000b5; */
  background: #980404;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0px 5px 0px 0px;
}

.dark-red-section h2,
.light-red-section span {
  color: #fff;
  font-weight: 800;
}

@media screen and (max-width: 1000px) {
  .container {
    width: 100% !important;
  }

  .def-btn {
    max-width: 280px;
  }
}

</style>