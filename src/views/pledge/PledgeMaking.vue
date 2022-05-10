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
                    <router-link :to="{ name: 'MakePledge', path: '/tenant/pledge/makepledge' }">
                        <a class="def-btn px-sm-2 px-lg-4 my-sm-1"
                        >Create new pledge</a
                        >
                    </router-link>
                    </div>
                    <Toast />
                </div>
                <hr class="mb-4" />
                </div>
                <div class="container" style="width: 80%" v-if="!isPending && !errorGettingReport">
                <!-- <div class="row mx-1 mb-4 mt-3">
                    <div class="col-md-2 pl-0">
                    <span class="theader mb-1">Status</span>
                    <div class="my-3">
                        <span class="draft font-weight-bold ">{{ stats.isSent ? 'Sent' : 'Unsent' }}</span>
                    </div>
                    </div>

                    <div class="col-md-7">
                    <span class="theader">Event</span>
                    <div class="my-3">
                        <span class="evt-name">
                        {{ stats.activityToday ? stats.activityToday.name : "" }}
                        <i class="pi pi-info-circle"></i>
                        </span>
                    </div>
                    </div>

                    <div class="col-md-3">
                    <span class="theader">Date</span>
                    <div class="my-3">
                        <span class="date">{{
                        stats.activityToday
                            ? new Date(
                                stats.activityToday.activityDate
                            ).toLocaleDateString()
                            : ""
                        }}</span>
                    </div>
                    </div>
                </div> -->

                <!-- <div class="row mx-1 mb-5">
                    <div class="col-md-12">
                    <div class="row unapproved">
                        <div class="col-md-12">
                        <div class="row" v-if="!reportApproved">
                            <div class="col-md-12 py-3 info-div">
                            <span class="px-2"
                                ><i class="pi pi-info-circle"></i
                            ></span>
                            <span class="font-weight-bold"
                                >This is a DRAFT event. You can take further actions
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
                                :to="{ name: 'Event', params: { event: activityId } }"
                            >
                                <a class="def-btn edit-btn">Edit report</a>
                            </router-link>
                            </div>
                        </div>
                        </div>
                    </div>
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
                                                :eventName="
                                                    stats.activityToday ? stats.activityToday.name : ''
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
                                    <a class="def-btn edit-btn" @click="copyLink"
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
                                :value="location"
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
                        <span>
                        <span class="mb-n3">Total Pledge: </span> <br />
                        <span class="recieve">60</span>
                        </span>
                        <span>
                        <span>Total Amount: </span> <br />
                        <span class="recieve">NGN 600,000 &nbsp;</span
                        >
                        </span>
                    </div>
                    </div>

                    <div class="row py-5 px-5" ref="middle">
                    <div class="col-md-7">
                        <span class="evt-label grey-text"></span>
                        <h2 class="font-weight-bold mb-3" style="font-size: 25px">
                            Pledge detail
                        </h2>
                        <span class="evt-date text-danger"> Fri May 06 2022 </span>
                    </div>
                    <div class="col-md-5 pl-0">
                        <div class="row">
                        <div class="col-md-6 d-md-flex justify-content-end">
                            <span class="bold-700">Pledge Type: </span>
                        </div>
                        <div class="col-md-6 pl-md-0">
                            <span>Worship</span>
                        </div>
                        </div>
                        <div class="row">
                        <div class="col-md-6 d-md-flex justify-content-end">
                            <span class="bold-700"> Person: </span>
                        </div>
                        <div class="col-md-6 pl-md-0">
                            <span>Dapo D</span>
                        </div>
                        </div>
                    </div>
                    </div>

                    <!-- <div class="row mb-5" ref="bottom">
                    <div class="col-md-12">
                        <div class="row mb-4">
                        <div class="col-md-12">
                            <span class="attendance-header">Attendance</span>
                        </div>
                        </div>
                        <div class="row px-5">
                        <div class="col-md-12">
                            <div class="row">
                            <div class="col-sm-10">
                                <span class="bold-700">Attendance Item</span>
                            </div>
                            <div class="col-sm-2">
                                <span class="bold-700">Count</span>
                            </div>
                            </div>
                        </div>
                        </div>
                        <div class="row">
                        <div class="col-sm-12">
                            <hr class="hr-dark" />
                        </div>
                        </div>
                        <div class="row">
                        <div
                            class="col-sm-12 py-2"
                            v-for="(attendance, index) in activityAttendances"
                            :key="index"
                        >
                            <div class="row px-5">
                            <div class="col-sm-12">
                                <div class="row">
                                <div class="col-sm-10">
                                    <span class="bold-400">{{
                                    attendance.attendanceTypeName
                                    }}</span>
                                </div>
                                <div class="col-sm-2">
                                    <span class="bold-400">{{
                                    attendance.number
                                    }}</span>
                                </div>
                                </div>
                            </div>
                            </div>
                            <div class="row">
                            <div class="col-sm-12 pt-2">
                                <hr class="hr" />
                            </div>
                            </div>
                        </div>
                        </div>
                        <div class="row px-5">
                        <div class="col-sm-12">
                            <div class="row">
                            <div class="col-sm-8"></div>
                            <div class="col-sm-2">
                                <span class="bold-700">Total</span>
                            </div>
                            <div class="col-sm-1">
                                <span class="bold-700">{{
                                stats.todayAttendance
                                }}</span>
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div> -->

                    <div class="row mb-5">
                    <!-- <div class="col-md-12">
                        <div class="row mb-4">
                        <div class="col-md-12">
                            <span class="attendance-header">Offering</span>
                        </div>
                        </div>
                        <div class="row px-5">
                        <div class="col-md-12">
                            <div class="row">
                            <div class="col-sm-5">
                                <span class="bold-700">Offering Item</span>
                            </div>
                            <div class="col-sm-5">
                                <span class="bold-700">Channel</span>
                            </div>
                            <div class="col-sm-2">
                                <span class="bold-700">Amount</span>
                            </div>
                            </div>
                        </div>
                        </div>
                        <div class="row">
                        <div class="col-sm-12">
                            <hr class="hr-dark" />
                        </div>
                        </div>
                        <div
                        class="row"
                        v-for="(offering, index) in activityOfferings"
                        :key="index"
                        >
                        <div class="col-md-12 py-2">
                            <div class="row px-5">
                            <div class="col-sm-12">
                                <div class="row">
                                <div class="col-sm-5">
                                    <span class="bold-400">{{
                                    offering.contribution
                                    }}</span>
                                </div>
                                <div class="col-sm-5">
                                    <span class="bold-400">{{ offering.channel }}</span>
                                </div>
                                <div class="col-sm-2">
                                    <span class="bold-400"
                                    ><span class="bold-700">{{
                                        offering.currencyName
                                    }}</span
                                    >&nbsp; {{ offering.amount }}</span
                                    >
                                </div>
                                </div>
                            </div>
                            </div>
                            <div class="row" v-if="index !== stats.todayOffering - 1">
                            <div class="col-sm-12 pt-2">
                                <hr class="hr" />
                            </div>
                            </div>
                        </div>
                        </div>
                        <div class="row">
                        <div class="col-sm-12">
                            <hr class="hr-dark" v-if="stats.todayOffering > 0" />
                        </div>
                        </div>
                        <div class="row px-5" v-if="stats.todayOffering > 0">
                        <div class="col-sm-12">
                            <div class="row">
                            <div class="col-sm-8"></div>
                            <div class="col-sm-2">
                                <span class="bold-700">Total</span>
                            </div>
                            <div class="col-sm-2">
                                <span class="bold-700"
                                >{{ stats.tenantCurrencyName }}&nbsp;{{
                                    stats.todayOffering
                                }}</span
                                >
                            </div>
                            </div>
                        </div>
                        </div>
                    </div> -->
                    </div>
                    <div class="row">
                    <div class="col-md-12">
                        <div class="pg-content">
                        <h4 class="analytics">Payment Link</h4>

                            <div class="analytics-container first-con">
                                    <div class="ana-group d-flex justify-content-center">
                                
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
                                                        <span class="font-weight-bold small ml-1 text-primary c-pointer" style="width: 30%">Send Email</span>
                                                        <span class="font-weight-bold small text-primary c-pointer" style="width: 30%">Send Sms</span>
                                                    </span>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                <hr class="hr" />
                            </div>
                            <div class="analytics-container first-con">
                                    <div class="ana-group d-flex justify-content-center">
                                
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
                                                            <span class="font-weight-bold small text-primary ml-1 c-pointer" style="width: 30%" >Send Email</span>
                                                            <span class="font-weight-bold small text-primary c-pointer" style="width: 30%" >Send Sms</span>
                                                        </span>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                <hr class="hr" />
                            </div>
                        <!-- <div class="analytics-container">
                            <div class="ana-group">
                            <div class="ana-header">
                                <h5>
                                <span class="today-text">Today </span>
                                <span class="versus"> vs Same time last month</span>
                                </h5>
                                <hr class="hr" />
                            </div>
                            <div class="ana-items">
                                <div class="ana-item">
                                <div class="ana-item-text">
                                    <p class="ana-item-header">Attendance</p>
                                    <p class="ana-item-percentage">
                                    {{
                                        stats.todayVsLastMonthAttendancePercentage
                                        ? stats.todayVsLastMonthAttendancePercentage.toFixed(
                                            2
                                            )
                                        : 0
                                    }}%
                                    </p>
                                    <p>
                                    <span class="ana-item-value">{{
                                        stats.todayAttendance
                                    }}</span>
                                    vs
                                    <span class="ana-item-value">{{
                                        stats.lastMonthAttendance
                                    }}</span>
                                    </p>
                                </div>
                                <div class="ana-item-icon">
                                    <div class="item-image">
                                    <div
                                        v-if="
                                        stats.todayVsLastMonthAttendancePercentage < 0
                                        "
                                    >
                                        <img
                                        src="../../assets/dashboardlinks/negative-icon.svg"
                                        alt=""
                                        />
                                    </div>
                                    <div v-else>
                                        <img
                                        src="../../assets/dashboardlinks/trend-icon.svg"
                                        alt=""
                                        />
                                    </div>
                                    </div>
                                </div>
                                </div>
                                <div class="ana-item">
                                <div class="ana-item-text">
                                    <p class="ana-item-header">Offering</p>
                                    <p class="ana-item-percentage">
                                    {{
                                        stats.todayVsLastMonthOfferingPercentage
                                        ? stats.todayVsLastMonthOfferingPercentage.toFixed(
                                            2
                                            )
                                        : 0
                                    }}%
                                    </p>
                                    <p>
                                    <span class="ana-item-value">{{
                                        stats.todayOffering
                                    }}</span>
                                    vs
                                    <span class="ana-item-value">{{
                                        stats.lastMonthOffering
                                    }}</span>
                                    </p>
                                </div>
                                <div class="ana-item-icon">
                                    <div class="item-image">
                                    <div
                                        v-if="
                                        stats.todayVsLastMonthOfferingPercentage < 0
                                        "
                                    >
                                        <img
                                        src="../../assets/dashboardlinks/negative-icon.svg"
                                        alt=""
                                        />
                                    </div>
                                    <div v-else>
                                        <img
                                        src="../../assets/dashboardlinks/trend-icon.svg"
                                        alt=""
                                        />
                                    </div>
                                    </div>
                                </div>
                                </div>
                                <div class="ana-item">
                                <div class="ana-item-text">
                                    <p class="ana-item-header">First timers</p>
                                    <p class="ana-item-percentage">
                                    {{
                                        todayVsLastMonthFirstTimerPercentage
                                        ? todayVsLastMonthFirstTimerPercentage.toFixed(
                                            2
                                            )
                                        : 0
                                    }}%
                                    </p>
                                    <p>
                                    <span class="ana-item-value">{{
                                        stats.todayFirstTimer
                                    }}</span>
                                    vs
                                    <span class="ana-item-value">{{
                                        stats.lastMonthFirstTimer
                                    }}</span>
                                    </p>
                                </div>
                                <div class="ana-item-icon">
                                    <div class="item-image">
                                    <div
                                        v-if="
                                        stats.todayVsLastMonthFirstTimerPercentage < 0
                                        "
                                    >
                                        <img
                                        src="../../assets/dashboardlinks/negative-icon.svg"
                                        alt=""
                                        />
                                    </div>
                                    <div v-else>
                                        <img
                                        src="../../assets/dashboardlinks/trend-icon.svg"
                                        alt=""
                                        />
                                    </div>
                                    </div>
                                </div>
                                </div>
                            </div>
                            <hr class="hr" />
                            </div>
                        </div> -->
                        <!-- <div class="analytics-container">
                            <div class="ana-group">
                            <div class="ana-header">
                                <h5>
                                <span class="today-text">Today </span>
                                <span class="versus"> vs Same time last year</span>
                                </h5>
                                <hr class="hr" />
                            </div>
                            <div class="ana-items">
                                <div class="ana-item">
                                <div class="ana-item-text">
                                    <p class="ana-item-header">Attendance</p>
                                    <p class="ana-item-percentage">
                                    {{
                                        stats.todayVsLastYearAttendancePercentage
                                        ? stats.todayVsLastYearAttendancePercentage.toFixed(
                                            2
                                            )
                                        : 0
                                    }}%
                                    </p>
                                    <p>
                                    <span class="ana-item-value">{{
                                        stats.todayAttendance
                                    }}</span>
                                    vs
                                    <span class="ana-item-value">{{
                                        stats.lastYearAttendance
                                    }}</span>
                                    </p>
                                </div>
                                <div class="ana-item-icon">
                                    <div class="item-image">
                                    <div
                                        v-if="
                                        stats.todayVsLastYearAttendancePercentage < 0
                                        "
                                    >
                                        <img
                                        src="../../assets/dashboardlinks/negative-icon.svg"
                                        alt=""
                                        />
                                    </div>
                                    <div v-else>
                                        <img
                                        src="../../assets/dashboardlinks/trend-icon.svg"
                                        alt=""
                                        />
                                    </div>
                                    </div>
                                </div>
                                </div>
                                <div class="ana-item">
                                <div class="ana-item-text">
                                    <p class="ana-item-header">Offering</p>
                                    <p class="ana-item-percentage">
                                    {{
                                        stats.todayVsLastYearOfferingPercentage
                                        ? stats.todayVsLastYearOfferingPercentage.toFixed(
                                            2
                                            )
                                        : 0
                                    }}%
                                    </p>
                                    <p>
                                    <span class="ana-item-value">{{
                                        stats.todayOffering
                                    }}</span>
                                    vs
                                    <span class="ana-item-value">{{
                                        stats.lastYearOffering
                                    }}</span>
                                    </p>
                                </div>
                                <div class="ana-item-icon">
                                    <div class="item-image">
                                    <div
                                        v-if="
                                        stats.todayVsLastYearOfferingPercentage < 0
                                        "
                                    >
                                        <img
                                        src="../../assets/dashboardlinks/negative-icon.svg"
                                        alt=""
                                        />
                                    </div>
                                    <div v-else>
                                        <img
                                        src="../../assets/dashboardlinks/trend-icon.svg"
                                        alt=""
                                        />
                                    </div>
                                    </div>
                                </div>
                                </div>
                                <div class="ana-item">
                                <div class="ana-item-text">
                                    <p class="ana-item-header">First timers</p>
                                    <p class="ana-item-percentage">
                                    {{
                                        todayVsLastYearFirstTimerPercentage
                                        ? todayVsLastYearFirstTimerPercentage.toFixed(
                                            2
                                            )
                                        : 0
                                    }}%
                                    </p>
                                    <p>
                                    <span class="ana-item-value">{{
                                        stats.todayFirstTimer
                                    }}</span>
                                    vs
                                    <span class="ana-item-value">{{
                                        stats.lastYearFirstTimer
                                    }}</span>
                                    </p>
                                </div>
                                <div class="ana-item-icon">
                                    <div class="item-image">
                                    <div
                                        v-if="
                                        stats.todayVsLastYearFirstTimerPercentage < 0
                                        "
                                    >
                                        <img
                                        src="../../assets/dashboardlinks/negative-icon.svg"
                                        alt=""
                                        />
                                    </div>
                                    <div v-else>
                                        <img
                                        src="../../assets/dashboardlinks/trend-icon.svg"
                                        alt=""
                                        />
                                    </div>
                                    </div>
                                </div>
                                </div>
                            </div>
                            <hr class="hr" />
                            </div>
                        </div> -->

                        <!-- <div class="area-charts analytics-container mb-5">
                            <div
                            class="area-chart mt-5"
                            v-if="
                                stats.attendanceSoFar &&
                                stats.attendanceSoFar.length > 0
                            "
                            >
                            <ReportAreaChart
                                elemId="chart"
                                domId="areaChart1"
                                title="ATTENDANCE"
                                subtitle="So far"
                                lineColor="#50AB00"
                                :series="stats.attendanceSoFar"
                            />
                            </div>
                        
                            <div
                            class="area-chart mt-5"
                            v-if="
                                stats.offeringSoFar && stats.offeringSoFar.length > 0
                            "
                            >
                            <ReportAreaChart
                                elemId="chart"
                                domId="areaChart2"
                                title="OFFERING"
                                subtitle="So Far"
                                lineColor="#1F78B4"
                                :series="stats.offeringSoFar"
                            />
                            </div>
                            <div
                            class="area-chart mt-5"
                            v-if="
                                stats.firstTimerSoFar &&
                                stats.firstTimerSoFar.length > 0
                            "
                            >
                            <ReportAreaChart
                                elemId="chart"
                                domId="areaChart3"
                                title="FIRST TIMERS"
                                subtitle="So Far"
                                lineColor="#E14A1B"
                                :series="stats.firstTimerSoFar"
                            />
                            </div>
                        </div> -->
                        </div>
                    </div>
                    </div>
                </div>

                

                <!-- <div class="row email-data" ref="emaildata">
                    <table
                    align="center"
                    style="
                        border-collapse: collapse;
                        max-width: 800px;
                        padding: 0pt 0pt 0pt 0pt;
                        box-shadow: 0px 3px 15px #00000029;
                        border: 1px solid #dde2e6;
                        border-radius: 5px;
                    "
                    >
                    <tbody>
                        <tr>
                        <td
                            colspan="3"
                            style="
                            width: 337.5pt;
                            padding: 0pt 5.4pt;
                            background: rgb(255, 27, 27);
                            vertical-align: top;
                            "
                        >
                            <p style="margin-bottom: 0pt; margin-top: 0pt">
                            <span style="font-weight: bold; font-size: 16px"
                                >&nbsp;</span
                            >
                            </p>
                            <p style="margin-bottom: 0pt; margin-top: 0pt">
                            <span
                                style="
                                color: rgb(255, 255, 255);
                                font-weight: bold;
                                font-size: 16px;
                                "
                                >&nbsp;</span
                            >
                            </p>
                            <p style="margin-bottom: 0pt; margin-top: 0pt">
                            <span style="font-weight: bold; font-size: 16px"
                                >&nbsp; &nbsp; &nbsp; &nbsp;</span
                            ><span style="font-weight: bold; font-size: 29px"
                                >&nbsp;</span
                            ><span
                                style="
                                color: rgb(255, 255, 255);
                                font-weight: bold;
                                font-size: 29px;
                                "
                                >Event&nbsp;and&nbsp;Report</span
                            >
                            </p>
                        </td>
                        <td
                            colspan="3"
                            style="
                            width: 203.3pt;
                            padding: 0pt 5.4pt;
                            background: rgb(175, 31, 31);
                            vertical-align: top;
                            "
                        >
                            <p style="margin-bottom: 0pt; margin-top: 0pt">
                            <span style="font-weight: bold; font-size: 16px"
                                >&nbsp;</span
                            >
                            </p>
                            <p style="margin-bottom: 0pt; margin-top: 0pt">
                            <span style="font-weight: bold; font-size: 16px"
                                >&nbsp;</span
                            >
                            </p>
                            <p style="margin-bottom: 0pt; margin-top: 0pt">
                            <span
                                style="
                                color: rgb(255, 255, 255);
                                font-weight: bold;
                                font-size: 16px;
                                "
                                >Total&nbsp;Attendance:
                                {{ stats.todayAttendance }}</span
                            >
                            </p>
                            <p style="margin-bottom: 0pt; margin-top: 0pt">
                            <span
                                style="
                                color: rgb(255, 255, 255);
                                font-weight: bold;
                                font-size: 16px;
                                "
                                >&nbsp;</span
                            >
                            </p>
                            <p style="margin-bottom: 0pt; margin-top: 0pt">
                            <span
                                style="
                                color: rgb(255, 255, 255);
                                font-weight: bold;
                                font-size: 16px;
                                "
                                >Total&nbsp;Offering: {{ stats.todayOffering }}</span
                            >
                            </p>
                        </td>
                        </tr>
                        <tr>
                        <td
                            colspan="3"
                            style="
                            width: 337.5pt;
                            padding: 0pt 5.4pt;
                            vertical-align: top;
                            "
                        >
                            <p style="margin-bottom: 0pt; margin-top: 0pt">
                            <span style="font-weight: bold; font-size: 16px"
                                >&nbsp;</span
                            >
                            </p>
                            <p
                            style="
                                text-indent: 20pt;
                                margin-bottom: 0pt;
                                margin-top: 0pt;
                            "
                            >
                            <span
                                style="
                                color: rgb(192, 192, 192);
                                font-weight: bold;
                                font-size: 13px;
                                "
                                >Event&nbsp;Name</span
                            >
                            </p>
                            <p style="margin-bottom: 0pt; margin-top: 0pt">
                            <span style="font-weight: bold; font-size: 24px"
                                >&nbsp;
                                {{
                                stats.activityToday ? stats.activityToday.name : ""
                                }}
                                <br />
                                <span
                                style="
                                    font-size: 14px;
                                    color: red;
                                    padding-left: 20px;
                                "
                                >{{ eventDateString }}.</span
                                ></span
                            >
                            </p>
                        </td>
                        <td
                            colspan="3"
                            style="
                            width: 203.3pt;
                            padding: 0pt 5.4pt;
                            vertical-align: top;
                            "
                        >
                            <p style="margin-bottom: 0pt; margin-top: 0pt">
                            <span style="font-weight: bold; font-size: 16px"
                                >&nbsp;</span
                            >
                            </p>
                            <p style="margin-bottom: 0pt; margin-top: 0pt">
                            <span style="font-weight: bold; font-size: 16px"
                                >Preacher:
                                {{
                                stats.activityToday
                                    ? stats.activityToday.preacher
                                    : ""
                                }}</span
                            >
                            </p>
                            <p style="margin-bottom: 0pt; margin-top: 0pt">
                            <span style="font-weight: bold; font-size: 16px"
                                >Topic:
                                {{
                                stats.activityToday ? stats.activityToday.topic : ""
                                }}</span
                            >
                            </p>
                            <p style="margin-bottom: 0pt; margin-top: 0pt">
                            <span style="font-weight: bold; font-size: 16px"
                                >First&nbsp;timers: {{ stats.todayFirstTimer }}</span
                            >
                            </p>
                            <p style="margin-bottom: 0pt; margin-top: 0pt">
                            <span style="font-weight: bold; font-size: 16px"
                                >New&nbsp;Converts: {{ stats.todayNewConvert }}</span
                            >
                            </p>
                        </td>
                        </tr>
                        <tr>
                        <td
                            style="
                            width: 152.3pt;
                            padding: 0pt 5.4pt;
                            background: rgb(0, 0, 0);
                            vertical-align: top;
                            "
                        >
                            <p
                            style="
                                margin-bottom: 0pt;
                                margin-top: 0pt;
                                text-align: center;
                            "
                            >
                            <span
                                style="
                                font-weight: normal;
                                font-size: 21px;
                                color: rgb(255, 255, 255);
                                "
                                >Attendance</span
                            >
                            </p>
                        </td>
                        <td
                            colspan="5"
                            style="
                            width: 388.5pt;
                            padding: 0pt 5.4pt;
                            vertical-align: top;
                            "
                        >
                            <p style="margin-bottom: 0pt; margin-top: 0pt">
                            <span style="font-weight: bold; font-size: 16px"
                                >&nbsp;</span
                            >
                            </p>
                        </td>
                        </tr>
                        <tr>
                        <td
                            style="
                            width: 152.3pt;
                            padding: 0pt 5.4pt;
                            vertical-align: top;
                            "
                        >
                            <p
                            style="
                                margin-bottom: 0pt;
                                margin-top: 0pt;
                                text-align: center;
                            "
                            >
                            <span style="font-weight: normal; font-size: 21px"
                                >&nbsp;</span
                            >
                            </p>
                        </td>
                        <td
                            colspan="5"
                            style="
                            width: 388.5pt;
                            padding: 0pt 5.4pt;
                            vertical-align: top;
                            "
                        >
                            <p style="margin-bottom: 0pt; margin-top: 0pt">
                            <span style="font-weight: bold; font-size: 16px"
                                >&nbsp;</span
                            >
                            </p>
                        </td>
                        </tr>
                        <tr>
                        <td
                            style="
                            width: 152.3pt;
                            padding: 0pt 5.4pt;
                            border-bottom: 2.25pt solid rgb(0, 0, 0);
                            vertical-align: top;
                            "
                        >
                            <p
                            style="
                                text-indent: 21pt;
                                margin-bottom: 0pt;
                                margin-top: 0pt;
                                text-align: center;
                            "
                            >
                            <span
                                style="font-weight: bold; font-size: 18px; color: #000"
                                >Attendance&nbsp;item</span
                            >
                            </p>
                        </td>
                        <td
                            colspan="3"
                            style="
                            width: 188.2pt;
                            padding: 0pt 5.4pt;
                            border-bottom: 2.25pt solid rgb(0, 0, 0);
                            vertical-align: top;
                            "
                        >
                            <p
                            style="
                                margin-bottom: 0pt;
                                margin-top: 0pt;
                                text-align: center;
                            "
                            >
                            <span
                                style="
                                font-weight: bolder;
                                font-size: 18px;
                                color: #000;
                                "
                                >Count</span
                            >
                            </p>
                        </td>
                        <td
                            colspan="2"
                            style="
                            width: 200.3pt;
                            padding: 0pt 5.4pt;
                            border-bottom: 2.25pt solid rgb(0, 0, 0);
                            vertical-align: top;
                            "
                        >
                            <p
                            style="
                                margin-bottom: 0pt;
                                margin-top: 0pt;
                                text-align: center;
                            "
                            >
                            <span
                                style="font-weight: bold; font-size: 18px; color: #000"
                                >Total</span
                            >
                            </p>
                        </td>
                        </tr>
                        <tr
                        style="font-weight: normal"
                        v-for="(attendance, index) in activityAttendances"
                        :key="index"
                        >
                        <td
                            style="
                            width: 152.3pt;
                            padding: 0pt 5.4pt;
                            border-top: none;
                            border-bottom: 31.875pt none rgb(255, 255, 255);
                            vertical-align: top;
                            "
                        >
                            <p
                            style="
                                text-indent: 21pt;
                                margin-bottom: 0pt;
                                margin-top: 0pt;
                                text-align: center;
                            "
                            >
                            <span style="font-weight: normal; font-size: 13px">{{
                                attendance.attendanceTypeName
                            }}</span>
                            </p>
                        </td>
                        <td
                            colspan="3"
                            style="
                            width: 188.2pt;
                            padding: 0pt 5.4pt;
                            border-top: none;
                            border-bottom: 31.875pt none rgb(255, 255, 255);
                            vertical-align: top;
                            "
                        >
                            <p
                            style="
                                margin-bottom: 0pt;
                                margin-top: 0pt;
                                text-align: center;
                            "
                            >
                            <span style="font-weight: normal; font-size: 13px">{{
                                attendance.number
                            }}</span>
                            </p>
                        </td>
                        <td
                            colspan="2"
                            style="
                            width: 200.3pt;
                            padding: 0pt 5.4pt;
                            border-top: none;
                            border-bottom: 31.875pt none rgb(255, 255, 255);
                            vertical-align: top;
                            "
                        >
                            <p
                            style="
                                margin-bottom: 0pt;
                                margin-top: 0pt;
                                text-align: center;
                            "
                            >
                            <span style="font-weight: normal; font-size: 13px">{{
                                attendance.number
                            }}</span>
                            </p>
                        </td>
                        </tr>
                        <tr style="border-top: 3px solid">
                        <td
                            style="
                            width: 152.3pt;
                            padding: 0pt 5.4pt;
                            border-top: none;
                            vertical-align: top;
                            "
                        >
                            <p
                            style="
                                text-indent: 21pt;
                                margin-bottom: 0pt;
                                margin-top: 0pt;
                                text-align: center;
                            "
                            >
                            <span style="font-weight: bold; font-size: 16px"
                                >&nbsp;</span
                            >
                            </p>
                        </td>
                        <td
                            colspan="3"
                            style="
                            width: 188.2pt;
                            padding: 0pt 5.4pt;
                            border-top: none;
                            vertical-align: top;
                            "
                        >
                            <p
                            style="
                                margin-bottom: 0pt;
                                margin-top: 0pt;
                                text-align: center;
                            "
                            >
                            <span style="font-weight: bold; font-size: 16px"
                                >Total</span
                            >
                            </p>
                        </td>
                        <td
                            colspan="2"
                            style="
                            width: 200.3pt;
                            padding: 0pt 5.4pt;
                            border-top: none;
                            vertical-align: top;
                            "
                        >
                            <p
                            style="
                                margin-bottom: 0pt;
                                margin-top: 0pt;
                                text-align: center;
                            "
                            >
                            <span style="font-weight: bold; font-size: 16px">{{
                                stats.todayAttendance
                            }}</span>
                            </p>
                        </td>
                        </tr>

                        <tr>
                        <td
                            style="
                            width: 152.3pt;
                            padding: 0pt 5.4pt;
                            border-top: none;
                            vertical-align: top;
                            "
                        >
                            <p
                            style="
                                text-indent: 21pt;
                                margin-bottom: 0pt;
                                margin-top: 0pt;
                                text-align: center;
                            "
                            >
                            <span style="font-weight: bold; font-size: 16px"
                                >&nbsp;</span
                            >
                            </p>
                        </td>
                        <td
                            colspan="3"
                            style="
                            width: 188.2pt;
                            padding: 0pt 5.4pt;
                            border-top: none;
                            vertical-align: top;
                            "
                        >
                            <p
                            style="
                                margin-bottom: 0pt;
                                margin-top: 0pt;
                                text-align: center;
                            "
                            >
                            <span style="font-weight: bold; font-size: 16px"
                                >&nbsp;</span
                            >
                            </p>
                        </td>
                        <td
                            colspan="2"
                            style="
                            width: 200.3pt;
                            padding: 0pt 5.4pt;
                            border-top: none;
                            vertical-align: top;
                            "
                        >
                            <p
                            style="
                                margin-bottom: 0pt;
                                margin-top: 0pt;
                                text-align: center;
                            "
                            >
                            <span style="font-weight: bold; font-size: 16px"
                                >&nbsp;</span
                            >
                            </p>
                        </td>
                        </tr>
                        <tr>
                        <td
                            style="
                            width: 152.3pt;
                            padding: 0pt 5.4pt;
                            background: rgb(0, 0, 0);
                            vertical-align: top;
                            "
                        >
                            <p
                            style="
                                margin-bottom: 0pt;
                                margin-top: 0pt;
                                text-align: center;
                            "
                            >
                            <span style="font-size: 21px; color: rgb(255, 255, 255)"
                                >Offering</span
                            >
                            </p>
                        </td>
                        <td
                            colspan="3"
                            style="
                            width: 188.2pt;
                            padding: 0pt 5.4pt;
                            vertical-align: top;
                            "
                        >
                            <p
                            style="
                                margin-bottom: 0pt;
                                margin-top: 0pt;
                                text-align: center;
                            "
                            >
                            <span style="font-weight: bold; font-size: 16px"
                                >&nbsp;</span
                            >
                            </p>
                        </td>
                        <td
                            colspan="2"
                            style="
                            width: 200.3pt;
                            padding: 0pt 5.4pt;
                            vertical-align: top;
                            "
                        >
                            <p
                            style="
                                margin-bottom: 0pt;
                                margin-top: 0pt;
                                text-align: center;
                            "
                            >
                            <span style="font-weight: bold; font-size: 16px"
                                >&nbsp;</span
                            >
                            </p>
                        </td>
                        </tr>
                        <tr>
                        <td
                            style="
                            width: 152.3pt;
                            padding: 0pt 5.4pt;
                            vertical-align: top;
                            "
                        >
                            <p
                            style="
                                margin-bottom: 0pt;
                                margin-top: 0pt;
                                text-align: center;
                            "
                            >
                            <span style="font-size: 21px">&nbsp;</span>
                            </p>
                        </td>
                        <td
                            colspan="3"
                            style="
                            width: 188.2pt;
                            padding: 0pt 5.4pt;
                            vertical-align: top;
                            "
                        >
                            <p
                            style="
                                margin-bottom: 0pt;
                                margin-top: 0pt;
                                text-align: center;
                            "
                            >
                            <span style="font-weight: bold; font-size: 16px"
                                >&nbsp;</span
                            >
                            </p>
                        </td>
                        <td
                            colspan="2"
                            style="
                            width: 200.3pt;
                            padding: 0pt 5.4pt;
                            vertical-align: top;
                            "
                        >
                            <p
                            style="
                                margin-bottom: 0pt;
                                margin-top: 0pt;
                                text-align: center;
                            "
                            >
                            <span style="font-weight: bold; font-size: 16px"
                                >&nbsp;</span
                            >
                            </p>
                        </td>
                        </tr>
                        <tr style="border-bottom: 3px solid">
                        <td
                            style="
                            width: 152.3pt;
                            padding: 0pt 5.4pt;
                            border-right: 31.875pt none rgb(255, 255, 255);
                            border-bottom: 31.875pt none rgb(255, 255, 255);
                            vertical-align: top;
                            "
                        >
                            <p
                            style="
                                margin-bottom: 0pt;
                                margin-top: 0pt;
                                text-align: center;
                            "
                            >
                            <span
                                style="font-weight: bold; font-size: 18px; color: #000"
                                >Offering&nbsp;Item</span
                            >
                            </p>
                        </td>
                        <td
                            style="
                            width: 126.75pt;
                            padding: 0pt 5.4pt;
                            border-left: none;
                            border-right: 31.875pt none rgb(255, 255, 255);
                            border-bottom: 31.875pt none rgb(255, 255, 255);
                            vertical-align: top;
                            "
                        >
                            <p
                            style="
                                margin-bottom: 0pt;
                                margin-top: 0pt;
                                text-align: center;
                            "
                            >
                            <span
                                style="font-weight: bold; font-size: 18px; color: #000"
                                >Channel</span
                            >
                            </p>
                        </td>
                        <td
                            colspan="3"
                            style="
                            width: 155.25pt;
                            padding: 0pt 5.4pt;
                            border-left: none;
                            border-right: 31.875pt none rgb(255, 255, 255);
                            border-bottom: 31.875pt none rgb(255, 255, 255);
                            vertical-align: top;
                            "
                        >
                            <p
                            style="
                                margin-bottom: 0pt;
                                margin-top: 0pt;
                                text-align: center;
                            "
                            >
                            <span
                                style="font-weight: bold; font-size: 18px; color: #000"
                                >Amount</span
                            >
                            </p>
                        </td>
                        <td
                            style="
                            width: 106.5pt;
                            padding: 0pt 5.4pt;
                            border-left: none;
                            border-bottom: 31.875pt none rgb(255, 255, 255);
                            vertical-align: top;
                            "
                        >
                            <p
                            style="
                                margin-bottom: 0pt;
                                margin-top: 0pt;
                                text-align: center;
                            "
                            >
                            <span
                                style="font-weight: bold; font-size: 18px; color: #000"
                                >Total</span
                            >
                            </p>
                        </td>
                        </tr>
                        <tr
                        style="font-weight: normal; font-size: 13px"
                        v-for="(offering, index) in activityOfferings"
                        :key="index"
                        >
                        <td
                            style="
                            width: 152.3pt;
                            padding: 0pt 5.4pt;
                            border-right: 31.875pt none rgb(255, 255, 255);
                            border-top: none;
                            border-bottom: 31.875pt none rgb(255, 255, 255);
                            vertical-align: top;
                            "
                        >
                            <p
                            style="
                                margin-bottom: 0pt;
                                margin-top: 0pt;
                                text-align: center;
                            "
                            >
                            <span style="font-weight: normal; font-size: 13px">{{
                                offering.name
                            }}</span>
                            </p>
                        </td>
                        <td
                            style="
                            width: 126.75pt;
                            padding: 0pt 5.4pt;
                            border-left: none;
                            border-right: 31.875pt none rgb(255, 255, 255);
                            border-top: none;
                            border-bottom: 31.875pt none rgb(255, 255, 255);
                            vertical-align: top;
                            "
                        >
                            <p
                            style="
                                margin-bottom: 0pt;
                                margin-top: 0pt;
                                text-align: center;
                            "
                            >
                            <span style="font-weight: normal; font-size: 13px">{{
                                offering.channel
                            }}</span>
                            </p>
                        </td>
                        <td
                            colspan="3"
                            style="
                            width: 155.25pt;
                            padding: 0pt 5.4pt;
                            border-left: none;
                            border-right: 31.875pt none rgb(255, 255, 255);
                            border-top: none;
                            border-bottom: 31.875pt none rgb(255, 255, 255);
                            vertical-align: top;
                            "
                        >
                            <p
                            style="
                                margin-bottom: 0pt;
                                margin-top: 0pt;
                                text-align: center;
                            "
                            >
                            <span style="font-weight: normal; font-size: 13px">{{
                                offering.amount
                            }}</span>
                            </p>
                        </td>
                        <td
                            style="
                            width: 106.5pt;
                            padding: 0pt 5.4pt;
                            border-left: none;
                            border-top: none;
                            border-bottom: 31.875pt none rgb(255, 255, 255);
                            vertical-align: top;
                            "
                        >
                            <p
                            style="
                                margin-bottom: 0pt;
                                margin-top: 0pt;
                                text-align: center;
                            "
                            >
                            <span style="font-weight: normal; font-size: 13px">{{
                                offering.amount
                            }}</span>
                            </p>
                        </td>
                        </tr>
                        <tr style="border-top: 3px solid">
                        <td
                            style="
                            width: 152.3pt;
                            padding: 0pt 5.4pt;
                            border-right: 31.875pt none rgb(255, 255, 255);
                            border-top: none;
                            border-bottom: 31.875pt none rgb(255, 255, 255);
                            vertical-align: top;
                            "
                        >
                            <p
                            style="
                                margin-bottom: 0pt;
                                margin-top: 0pt;
                                text-align: center;
                            "
                            >
                            <span style="font-weight: bold; font-size: 16px"
                                >&nbsp;</span
                            >
                            </p>
                        </td>
                        <td
                            style="
                            width: 126.75pt;
                            padding: 0pt 5.4pt;
                            border-left: none;
                            border-right: 31.875pt none rgb(255, 255, 255);
                            border-top: none;
                            border-bottom: 31.875pt none rgb(255, 255, 255);
                            vertical-align: top;
                            "
                        >
                            <p
                            style="
                                margin-bottom: 0pt;
                                margin-top: 0pt;
                                text-align: center;
                            "
                            >
                            <span style="font-weight: bold; font-size: 16px"
                                >&nbsp;</span
                            >
                            </p>
                        </td>
                        <td
                            colspan="3"
                            style="
                            width: 155.25pt;
                            padding: 0pt 5.4pt;
                            border-left: none;
                            border-right: 31.875pt none rgb(255, 255, 255);
                            border-top: none;
                            border-bottom: 31.875pt none rgb(255, 255, 255);
                            vertical-align: top;
                            "
                        >
                            <p
                            style="
                                margin-bottom: 0pt;
                                margin-top: 0pt;
                                text-align: center;
                            "
                            >
                            <span style="font-weight: bold; font-size: 16px"
                                >Total</span
                            >
                            </p>
                        </td>
                        <td
                            style="
                            width: 106.5pt;
                            padding: 0pt 5.4pt;
                            border-left: none;
                            border-top: none;
                            border-bottom: 31.875pt none rgb(255, 255, 255);
                            vertical-align: top;
                            "
                        >
                            <p
                            style="
                                margin-bottom: 0pt;
                                margin-top: 0pt;
                                text-align: center;
                            "
                            >
                            <span style="font-weight: bold; font-size: 16px">{{
                                tottalOfferings
                            }}</span>
                            </p>
                        </td>
                        </tr>
                        <tr>
                        <td
                            style="
                            width: 152.3pt;
                            padding: 0pt 5.4pt;
                            border-right: 31.875pt none rgb(255, 255, 255);
                            border-top: none;
                            border-bottom: 31.875pt none rgb(255, 255, 255);
                            vertical-align: top;
                            "
                        >
                            <p
                            style="
                                margin-bottom: 0pt;
                                margin-top: 0pt;
                                text-align: center;
                            "
                            >
                            <span style="font-weight: bold; font-size: 16px"
                                >&nbsp;</span
                            >
                            </p>
                        </td>
                        <td
                            style="
                            width: 126.75pt;
                            padding: 0pt 5.4pt;
                            border-left: none;
                            border-right: 31.875pt none rgb(255, 255, 255);
                            border-top: none;
                            border-bottom: 31.875pt none rgb(255, 255, 255);
                            vertical-align: top;
                            "
                        >
                            <p
                            style="
                                margin-bottom: 0pt;
                                margin-top: 0pt;
                                text-align: center;
                            "
                            >
                            <span style="font-weight: bold; font-size: 16px"
                                >&nbsp;</span
                            >
                            </p>
                        </td>
                        <td
                            colspan="3"
                            style="
                            width: 155.25pt;
                            padding: 0pt 5.4pt;
                            border-left: none;
                            border-right: 31.875pt none rgb(255, 255, 255);
                            border-top: none;
                            border-bottom: 31.875pt none rgb(255, 255, 255);
                            vertical-align: top;
                            "
                        >
                            <p
                            style="
                                margin-bottom: 0pt;
                                margin-top: 0pt;
                                text-align: center;
                            "
                            >
                            <span style="font-weight: bold; font-size: 16px"
                                >&nbsp;</span
                            >
                            </p>
                        </td>
                        <td
                            style="
                            width: 106.5pt;
                            padding: 0pt 5.4pt;
                            border-left: none;
                            border-top: none;
                            border-bottom: 31.875pt none rgb(255, 255, 255);
                            vertical-align: top;
                            "
                        >
                            <p
                            style="
                                margin-bottom: 0pt;
                                margin-top: 0pt;
                                text-align: center;
                            "
                            >
                            <span style="font-weight: bold; font-size: 16px"
                                >&nbsp;</span
                            >
                            </p>
                        </td>
                        </tr>
                        <tr>
                        <td
                            style="
                            width: 152.3pt;
                            padding: 0pt 5.4pt;
                            border-right: 31.875pt none rgb(255, 255, 255);
                            border-top: none;
                            border-bottom: 31.875pt none rgb(255, 255, 255);
                            vertical-align: top;
                            "
                        >
                            <p
                            style="
                                margin-bottom: 0pt;
                                margin-top: 0pt;
                                text-align: center;
                            "
                            >
                            <span style="font-weight: bold; font-size: 16px"></span>
                            </p>
                        </td>
                        <td
                            style="
                            width: 126.75pt;
                            padding: 0pt 5.4pt;
                            border-left: none;
                            border-right: 31.875pt none rgb(255, 255, 255);
                            border-top: none;
                            border-bottom: 31.875pt none rgb(255, 255, 255);
                            vertical-align: top;
                            "
                        >
                            <p
                            style="
                                margin-bottom: 0pt;
                                margin-top: 0pt;
                                text-align: center;
                            "
                            >
                            <span style="font-weight: bold; font-size: 16px"></span>
                            </p>
                        </td>
                        <td
                            colspan="3"
                            style="
                            width: 155.25pt;
                            padding: 0pt 5.4pt;
                            border-left: none;
                            border-right: 31.875pt none rgb(255, 255, 255);
                            border-top: none;
                            border-bottom: 31.875pt none rgb(255, 255, 255);
                            vertical-align: top;
                            "
                        >
                            <p
                            style="
                                margin-bottom: 0pt;
                                margin-top: 0pt;
                                text-align: center;
                            "
                            >
                            <span style="font-weight: bold; font-size: 16px"></span>
                            </p>
                        </td>
                        <td
                            style="
                            width: 106.5pt;
                            padding: 0pt 5.4pt;
                            border-left: none;
                            border-top: none;
                            border-bottom: 31.875pt none rgb(255, 255, 255);
                            vertical-align: top;
                            "
                        >
                            <p
                            style="
                                margin-bottom: 0pt;
                                margin-top: 0pt;
                                text-align: center;
                            "
                            >
                            <span style="font-weight: bold; font-size: 16px"
                                ><a :href="url" style="color: blue; font-weight: bold"
                                >View full report</a
                                ></span
                            >
                            </p>
                        </td>
                        </tr>
                        <tr style="height: 40px; background: #eee">
                        <td
                            style="
                            width: 152.3pt;
                            padding: 0pt 5.4pt;
                            border-right: 31.875pt none rgb(255, 255, 255);
                            border-top: none;
                            border-bottom: 31.875pt none rgb(255, 255, 255);
                            vertical-align: top;
                            "
                        >
                            <p
                            style="
                                margin-bottom: 0pt;
                                margin-top: 0pt;
                                text-align: center;
                            "
                            >
                            <span style="font-weight: bold; font-size: 16px"></span>
                            </p>
                        </td>
                        <td
                            colspan="3"
                            style="
                            width: 126.75pt;
                            padding: 0pt 5.4pt;
                            border-left: none;
                            border-right: 31.875pt none rgb(255, 255, 255);
                            border-top: none;
                            border-bottom: 31.875pt none rgb(255, 255, 255);
                            vertical-align: top;
                            "
                        >
                            <p
                            style="
                                margin-bottom: 0pt;
                                margin-top: 0pt;
                                text-align: center;
                            "
                            >
                            <span
                                style="
                                font-weight: bold;
                                font-size: 14px;
                                margin-top: 20px;
                                "
                                >Powered By ChurchPlus</span
                            >
                            </p>
                        </td>
                        <td
                            style="
                            width: 155.25pt;
                            padding: 0pt 5.4pt;
                            border-left: none;
                            border-right: 31.875pt none rgb(255, 255, 255);
                            border-top: none;
                            border-bottom: 31.875pt none rgb(255, 255, 255);
                            vertical-align: top;
                            "
                        >
                            <p
                            style="
                                margin-bottom: 0pt;
                                margin-top: 0pt;
                                text-align: center;
                            "
                            >
                            <span style="font-weight: bold; font-size: 16px"></span>
                            </p>
                        </td>
                        <td
                            style="
                            width: 106.5pt;
                            padding: 0pt 5.4pt;
                            border-left: none;
                            border-top: none;
                            border-bottom: 31.875pt none rgb(255, 255, 255);
                            vertical-align: top;
                            "
                        >
                            <p
                            style="
                                margin-bottom: 0pt;
                                margin-top: 0pt;
                                text-align: center;
                            "
                            >
                            <span style="font-weight: bold; font-size: 16px"
                                ><a
                                :href="url"
                                style="color: blue; font-weight: bold"
                                ></a
                            ></span>
                            </p>
                        </td>
                        </tr>
                    </tbody>
                    </table>
                </div> -->
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
import { ref, computed } from "vue";
import Dropdown from "primevue/dropdown";
import InputText from "primevue/inputtext";
import { useToast } from "primevue/usetoast";
import MembersSearch from "../../components/membership/MembersSearch.vue"
import router from '../../router';
import { useRoute } from "vue-router"
import finish from '../../services/progressbar/progress';
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
        const selectedLink = ref(null)
        const tenantID = ref('')
        const route = useRoute();
        const churchName = ref('');
        const Address = ref('');
        const loading = ref(false)
        const freewillAmount = ref('');
        const checking = ref(false);
        const value = ref()
        const isNameValid = ref(true)
        const isEmailValid = ref(true)
        const selectedPledge = ref('')
        const memberName = ref('')
        const allPledgeList = ref([]);
        const amountFrom = ref('')
        const selectedContact = ref({})
        const isActive = ref(null)
        const amountTo = ref('')
        const pledgeCategory = ref(
            [
                {name: 'Free will'},
                {name: 'Specific'},
                {name: 'Range'}
            ]
        )

        
        // const savePledge = async () => {

        // }

        const makePayment = () =>{
            // router.push('/pledge/pledgepayment')
            router.push(`/pledge/pledgepayment?pledgeTypeID=${route.query.pledgeTypeID}&id=${route.query.id}&name=${route.query.name}`)
        }

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

        const getCurrentlySignedInUser = async () => {
            try {
                const res = await axios.get("/api/Membership/GetCurrentSignedInUser");
                tenantID.value = res.data.tenantId
            } catch (err) {
                console.log(err);
            }
            };

        getCurrentlySignedInUser();
        

        const active = (payload) => {
            isActive.value = payload
        }
        const getAllPledgeDefinition = async () =>{
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
                    checking.value = true;
                    
                }
                catch (error){
                    console.log(error)
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
            allPledgeList,
            memberName,
            tenantID,
            checking,
            makePledge,
            chooseContact,
            selectedPledge,
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
            value,
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
.analytics-container {
  /* padding: 0 24px 24px 24px; */
  width: 90%;
  margin: auto;
}

.first-con {
  margin-top: 50px;
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

</style>