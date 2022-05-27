<template>
    <div class="container">
        <!-- <div class="row d-flex justify-content-between mt-3">
            <div class="col font-weight-700 uniform-primary-color">Contacts</div>
            <div class="col font-weight-700 text-right uniform-primary-color">Actions <i class="pi pi-angle-down"></i></div>
        </div> -->
        <div class="row mt-5">
            <div class="col-6 offset-3 d-flex justify-content-center c-pointer profile-overlay" @click="uploadPicture" @mouseover="setHover" @mouseleave="setLeave">
                <img :src="url" class="contact-image " v-if="url"/>
                <!-- :class="{ 'profile-overlay' : hoverImage }"  -->
                <img :src="personDetails.pictureUrl" class="contact-image " v-else-if="personDetails.pictureUrl"/>
                <img src="../../../../assets/people/phone-import.svg" class="contact-image" v-else/>
                <i class="pi pi-upload" :class="{ 'adjust-icon' : !hoverImage, 'fade-icon' : hoverImage }"></i>
                
            </div>
            <input type="file" @change="choosePicture" ref="image" hidden/>
            <div class="col-12 text-center">
                <div class="contact-name">{{ `${personDetails.firstName ? personDetails.firstName : ""} ${personDetails.lastName ? personDetails.lastName : ""}` }}</div>
                <div>{{ personDetails.email }}</div>
                <div><i class="pi pi-pencil uniform-primary-color c-pointer" @click="editContactName"></i></div>
            </div>
        </div>
        <!-- <div class="d-block d-sm-none">
            <div class="row  d-flex justify-content-center mt-5">
                <div @click="toggleNoteModal" class="c-pointer">
                    <div class="icon-bg" v-tooltip.top="'Create a note'"><i class="pi pi-user-edit"></i></div>
                    <div>Note</div>
                </div>
                <div class="ml-4" @click="toggleEmailModal">
                    <div class="icon-bg c-pointer" v-tooltip.top="'Create an email'"><i class="pi pi-envelope"></i></div>
                    <div>Email</div>
                </div>
                <div class="ml-4 c-pointer"  @click="toggleSmsModal">
                    <div class="icon-bg" v-tooltip.top="'Send an sms'"><i class="pi pi-phone"></i></div>
                    <div>SMS</div>
                </div>
                <div class="ml-4 c-pointer" @click="toggleTaskModal">
                    <div class="icon-bg" v-tooltip.top="'Create a task'"><i class="pi pi-calendar-plus"></i></div>
                    <div>Task</div>
                </div>
                <div class="ml-4 c-pointer" v-tooltip.top="'Log a call, email'" @click="toggleLogModal" aria:haspopup="true" aria-controls="overlay_panel">
                    <div class="icon-bg"><i class="pi pi-plus"></i></div>
                    <div>Log</div>
                </div>
            </div>
        </div> -->
            <div class="row  d-flex justify-content-center mt-5">
                <div @click="openNoteEditor" class="c-pointer">
                    <div class="icon-bg" v-tooltip.top="'Create a note'"><i class="pi pi-user-edit"></i></div>
                    <div>Note</div>
                </div>
                <div class="ml-4" @click="openEmailModal">
                    <div class="icon-bg c-pointer" v-tooltip.top="'Create an email'"><i class="pi pi-envelope"></i></div>
                    <div>Email</div>
                </div>
                <!-- @click="call" -->
                <div class="ml-4 c-pointer"  @click="toggleCallSmsPane($event)">
                    <div class="icon-bg" v-tooltip.top="'Send an sms'"><i class="pi pi-phone"></i></div>
                    <div>SMS</div>
                </div>
                <div class="ml-4 c-pointer" @click="openTaskEditor">
                    <div class="icon-bg" v-tooltip.top="'Create a task'"><i class="pi pi-calendar-plus"></i></div>
                    <div>Task</div>
                </div>
                <div class="ml-4 c-pointer" v-tooltip.top="'Log a call, email'" @click="toggleLog" aria:haspopup="true" aria-controls="overlay_panel">
                    <div class="icon-bg"><i class="pi pi-plus"></i></div>
                    <div>Log</div>
                </div>
            </div>
    </div>
    <hr class="mt-4"/>
    <div class="container mt-4">
        <div class="row">
            <div class="col-12">
                <i class="pi pi-angle-up uniform-primary-color c-pointer" :class="{ 'unroll-icon' : !contactIcon, 'roll-icon' : contactIcon }" @click="toggleContactIcon"></i>&nbsp;&nbsp;&nbsp;&nbsp;<span class="font-weight-700">About This Contact</span>
            </div>
        </div>
        <div class="row" :class="{ 'hide-contact' : !contactIcon, 'show-contact' : contactIcon && route.query.memberType == 0, 'reduce-contact-height' : contactIcon && route.query.memberType == 1 }">
            <div class="col-12">
            <div class="row mt-4">
                <div class="col-12 label-text">Email</div>
                <div class="col-12 mt-2 ">
                    <div class="task-border border-transparent d-flex justify-content-between p-2" :class="{ 'hover-border' : hoverTask }" @mouseover="onHoverBorder" @mouseleave="outHoverBorder" @click="editEmail">
                        <div>{{ personDetails.email }}</div>
                    <i class="pi pi-pencil align-self-center" :class="{ 'uniform-primary-color' : hoverTask, 'text-white' : !hoverTask }"></i>
                        </div>
                </div>
            </div>
            <div class="row mt-4">
                <div class="col-12 label-text">Phone Number</div>
                <div class="col-12 mt-2 ">
                    <div class="task-border border-transparent d-flex justify-content-between p-2" :class="{ 'hover-border' : hoverPhone }" @mouseover="toggleHoverPhone" @mouseleave="OutHoverPhone" @click="editPhone">
                        <div>{{ personDetails.phoneNumber }}</div>
                    <i class="pi pi-pencil align-self-center" :class="{ 'uniform-primary-color' : hoverTask, 'text-white' : !hoverPhone }"></i>
                        </div>
                </div>
            </div>
            <div class="row">
                <div class="col-12 mt-4 label-text">Contact owner</div>
                <div class="col-12 mt-2">
                    <SearchMember v-bind:currentMember="selectedContact" @memberdetail="updateOwner($event, 1)" :stylesidebarinput="true" :clearPersonValue="clearPersonValue" @resetclearpersonvalue="resetClearPersonValue"/>
                    <div @click="updateOwner($event, 2)" class="text-danger remove-contact" v-if="Object.keys(selectedContact).length > 0 && selectedContact.id !== null || hasContactOwner">Remove contact owner</div>
                </div>
            </div>

            <div class="row" v-if="route.query.memberType == 0">
                <div class="col-12 mt-4 label-text">Lifecycle stage</div>
                <div class="col-12">
                    <div class="dropdown">
                        <div  class="phone-input form-control d-flex justify-content-between c-pointer"
                                id="dropdownMenuButton"
                                data-toggle="dropdown">
                            <div
                               
                            >{{  selectedLifeCycle && Object.keys(selectedLifeCycle).length > 0 ? selectedLifeCycle.name : "Select lifecycle" }}</div>
                            <i class="pi pi-chevron-down"></i>
                        </div>
                        <div
                        class="dropdown-menu w-100 dropdown-height border-0"
                        aria-labelledby="dropdownMenuButton"
                        >
                        <a
                            class="dropdown-item c-pointer"
                            v-for="(item, index) in lifeCycle"
                            :key="index"
                            @click="updateLifeCycle(item)"
                            >{{ item.name }}</a
                        >
                        <a
                            class="dropdown-item font-weight-bold small-text d-flex justify-content-center py-2 text-decoration-none primary-text c-pointer"
                            style="border-top: 1px solid rgb(0, 32, 68); color: rgb(19, 106, 205);" data-toggle="modal" data-target="#convertToMemberModal" 
                            >Convert to member</a
                        >
                        <!-- @click="openConfirm" -->
                        </div>
                    </div>
                </div>
            </div>
            <div class="row" v-if="route.query.memberType == 0">
                <div class="col-12 label-text mt-4">Lead Status</div>
                <div class="col-12 mt-2">
                    <Dropdown v-model="selectedLeadStatus" :filter="false" :options="leadStatus" class="w-100 phone-input" optionLabel="name" placeholder="Select status" @change="updateLeadStatus" />
                </div>
            </div>
            </div>
        </div>
    </div>
    <div class="container">
        <div class="row">
            <div class="col-12 mt-4 font-weight-700">
                <i class="pi pi-angle-up uniform-primary-color c-pointer" :class="{ 'unroll-icon' : !moreIcon, 'roll-icon' : moreIcon }" @click="toggleMoreIcon"></i>&nbsp;&nbsp;&nbsp;&nbsp;More
            </div>
            <div class="col-12" :class="{ 'hide-contact' : !moreIcon, 'show-contact' : moreIcon }">
                <div class="row">
                    <div class="col-12 mt-4 label-text">Gender</div>
                    <div class="col-12 mt-2">
                        <Dropdown :options="genders" class="w-100 phone-input" optionLabel="value" v-model="selectedGender" placeholder="Select option" />
                    </div>
                    <div class="col-12 mt-4 label-text">Marital Status</div>
                    <div class="col-12 mt-2">
                        <Dropdown v-model="selectedMaritalStatus" :options="maritalStatus" optionLabel="value" class="w-100 phone-input" placeholder="Select option" />
                    </div>
                    <div class="col-12 mt-4 label-text">Date of birth</div>
                    <div class="col-4 mt-2">
                        <Dropdown v-model="selectedBirthday" :options="day" class="w-100 phone-input" placeholder="Day" />
                    </div>
                    <div class="col-4 mt-2">
                        <Dropdown v-model="selectedBirthMonth" :options="month" class="w-100 phone-input" placeholder="Month" />
                    </div>
                    <div class="col-4 mt-2">
                        <Dropdown v-model="selectedBirthYear" :options="year" class="w-100 phone-input" placeholder="Year" />
                    </div>
                    <div class="col-12 mt-4 label-text">Address</div>
                    <div class="col-12 mt-2">
                        <div class="task-border border-transparent d-flex justify-content-between p-2" :class="{ 'hover-border' : hoverPhone }" @mouseover="toggleHoverPhone" @mouseleave="OutHoverPhone" @click="editAddress">
                            <div>{{ personDetails.address }}</div>
                            <i class="pi pi-pencil align-self-center" :class="{ 'uniform-primary-color' : hoverTask, 'text-white' : !hoverPhone }"></i>
                            </div>
                
                    </div>
                    <div class="col-12 mt-4 label-text" v-if="route.query.memberType == 0">Event of service attended</div>
                    <div class="col-12 mt-2" v-if="route.query.memberType == 0">
                        <div class="dropdown">
                            <div class="cursor-pointer phone-input d-flex justify-content-between" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <div>{{ Object.keys(selectedEventAttended).length > 0 ? selectedEventAttended.name : personDetails.activityID && eventsAttended.length > 0 ? eventsAttended.find(i => {
                                    if (i.activityID == personDetails.activityID) return i
                                    return 'no id'
                                }).name : "Select event attended" }}</div>
                                <div><i class="pi pi-chevron-down"></i></div>
                            </div>
                            <div
                                class="dropdown-menu"
                                aria-labelledby="dropdownMenuButton"
                            >
                                    <input
                                    type="text"
                                    class="form-control dd dd-search-field"
                                    v-model="eventsSearchString"
                                    placeholder="search for event"
                                    />
   
                                <a
                                    class="dropdown-item cursor-pointer py-2"
                                    v-for="(event, index) in eventsAttended"
                                    :key="index"
                                    @click="eventAttendedSelected(event)"
                                >
                                    {{ event.name }}
                                </a>
                                <a
                                    class="text-center mb-1 mt-1 py-1"
                                    v-if="
                                    eventsSearchString &&
                                    eventsAttended.length > 0 &&
                                    filteredEvents.length === 0
                                    "
                                >
                                    No match found
                                </a>
                                        
                            </div>
                            </div>
                        <!-- <div class="task-border border-transparent d-flex justify-content-between p-2" :class="{ 'hover-border' : hoverPhone }" @mouseover="toggleHoverPhone" @mouseleave="OutHoverPhone" @click="editAddress">
                            <div>{{ personDetails.address }}</div>
                            <i class="pi pi-pencil align-self-center" :class="{ 'uniform-primary-color' : hoverTask, 'text-white' : !hoverPhone }"></i>
                            </div> -->
                
                    </div>
                </div>
            </div>

            
        </div>
    </div>
    <div class="container">
        <div class="row" v-if="route.query.memberType == 0">
            <div class="col-12 mt-4 font-weight-700">
                <i class="pi pi-angle-up uniform-primary-color c-pointer" :class="{ 'unroll-icon' : !insightIcon, 'roll-icon' : insightIcon }" @click="toggleInsightIcon"></i>&nbsp;&nbsp;&nbsp;&nbsp;Insights
            </div>
            <div class="col-12" :class="{ 'hide-contact' : !insightIcon, 'show-contact' : insightIcon }">
                <div class="row">
                    <div class="col-12 mt-4 label-text">How did you hear about us</div>
                    <div class="col-12 mt-2">
                        <Dropdown :options="aboutUsSource" class="w-100 phone-input" optionLabel="name" v-model="selectedAboutUsSource" placeholder="Select option" />
                    </div>
                    <div class="col-12 mt-4 label-text">Preferred means of communication</div>
                    <div class="col-12 mt-2">
                        <Dropdown v-model="selectedCommunicationMeans" :options="communicationMeans" optionLabel="name" class="w-100 phone-input" placeholder="Select option" />
                    </div>
                    <div class="col-12 mt-4 label-text">Are you interested in joining us?</div>
                    <div class="col-12 mt-2">
                        <Dropdown v-model="selectedJoinInterest" :options="joinInterestArr" optionLabel="name" class="w-100 phone-input" placeholder="Select option" />
                    </div>
                    <div class="col-12 mt-4 label-text">Would you like to be visited?</div>
                    <div class="col-12 mt-2">
                        <Dropdown v-model="selectedVisitOption" :options="wantVisitArr" optionLabel="name" class="w-100 phone-input" placeholder="Select option" />
                    </div>
                </div>
            </div>

            <!-- <div class="cancel-btn btn-btn col-2 offset-3 ml-3 p-2 mt-3" @click="cancelTaskEdit">Cancel</div> -->
        </div>
        <div class="row">
            <div class="p-2 offset-3 col-6 mt-3 save-btn btn-btn c-pointer" @click="editBasicDetails">Update</div>
        </div>
    </div>
    <div class="container">
        <div class="row">
            <div class="col-12 mt-2 pb-5">
                        
                    </div>
        </div>
    </div>
    
    <OverlayPanel ref="editEmailRef" appendTo="body" :showCloseIcon="false" id="overlay_panel" style="width: 450px" :breakpoints="{'960px': '75vw'}">
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <div>Email</div>
                    <input v-model="personDetails.email" class="form-control mt-3"/>
                </div>
            </div>
            <div class="row">
                <div class="offset-1 p-2 col-2 mt-3 ml-3 save-btn btn-btn c-pointer" @click="editBasicDetails">Save</div>
                <div class="cancel-btn btn-btn col-2 ml-3 p-2 mt-3 c-pointer" @click="cancelEmailEdit">Cancel</div>
            </div>
        </div>
        </OverlayPanel>
    
    <OverlayPanel ref="phoneRef" appendTo="body" :showCloseIcon="false" id="overlay_panel" style="width: 450px" :breakpoints="{'960px': '75vw'}">
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <div>Phone Number</div>
                    <input v-model="personDetails.phoneNumber" class="form-control mt-3"/>
                </div>
            </div>
            <div class="row">
                <div class="offset-1 p-2 col-2 mt-3 ml-3 save-btn btn-btn c-pointer" @click="editBasicDetails">Save</div>
                <div class="cancel-btn btn-btn col-2 ml-3 p-2 mt-3 c-pointer" @click="cancelPhoneEdit">Cancel</div>
            </div>
        </div>
        </OverlayPanel>
   
    <OverlayPanel ref="contactNameRef" appendTo="body" :showCloseIcon="false" id="overlay_panel" style="width: 450px" :breakpoints="{'960px': '75vw'}">
        <div class="container">
            <div class="row">
                <div class="col-12 mt-3">
                    <div class="row">
                        <div class="col-6">
                            First Name
                            <div class="mt-2">
                                <input type="text" class="form-control" v-model="personDetails.firstName"/>
                            </div>
                        </div>
                        
                        <div class="col-6">
                            Last Name
                            <div class="mt-2">
                                <input type="text" class="form-control" v-model="personDetails.lastName"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="offset-1 p-2 col-2 mt-3 ml-3 save-btn btn-btn c-pointer" @click="editBasicDetails">Save</div>
                <div class="cancel-btn btn-btn col-2 ml-3 p-2 mt-3 c-pointer" @click="cancelContactName">Cancel</div>
            </div>
        </div>
        </OverlayPanel>

        <OverlayPanel ref="addressRef" appendTo="body" :showCloseIcon="false" id="overlay_panel" style="width: 450px" :breakpoints="{'960px': '75vw'}">
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <div>Address</div>
                    <input v-model="personDetails.address" class="form-control mt-3"/>
                </div>
            </div>
            <div class="row">
                <div class="offset-1 p-2 col-2 mt-3 ml-3 save-btn btn-btn c-pointer" @click="editBasicDetails">Save</div>
                <div class="cancel-btn btn-btn col-2 ml-3 p-2 mt-3 c-pointer" @click="cancelPhoneEdit">Cancel</div>
            </div>
        </div>
        </OverlayPanel>

        <OverlayPanel ref="logDropDown" appendTo="body" :showCloseIcon="false" id="overlay_panel" :breakpoints="{'960px': '75vw'}">
                    <div class="container-fluid p-0">
                        <div class="row hover-log" v-for="(item, index) in activityLogs" :key="index">
                            <div class="py-2 px-3 " @click="toggleLogPane($event, item)">{{ item.value }}</div>
                        </div>
                    </div>
        </OverlayPanel>
        
        <OverlayPanel ref="callDropDown" appendTo="body" :showCloseIcon="false" id="overlay_panel" :breakpoints="{'960px': '75vw'}">
                    <div class="container-fluid p-0">
                        <div class="row">
                            <div class="py-2 px-3 col-12 hover-log" @click="toggleCallSmsPane($event)">Call</div>
                            <div class="py-2 px-3 col-12 hover-log" @click="toggleCallSmsPane($event)">SMS</div>
                        </div>
                    </div>
        </OverlayPanel>

        <!-- Log Pane -->
        <Dialog :header="'Log ' + selectedLog.value" v-model:visible="displayLogPane" :style="{width: window.innerWidth > 767 ? '50vw' : '100vw'}" :position="position" :modal="true">
            <!-- style="height: 480px" -->
           <div class="container-fluid">
               <div class="row">
                   <div class="col-6 pl-0">
                       <div class="label-text">Contacted</div>
                       <div @click="toggleContact" aria:haspopup="true" aria-controls="overlay_panel" class="uniform-primary-color font-weight-700 mt-1 c-pointer">{{ selectedContactLog }} &nbsp; <i class="pi pi-sort-down"></i></div>
                       <OverlayPanel ref="contactRef" appendTo="body" :showCloseIcon="false" id="overlay_panel" :breakpoints="{'960px': '75vw'}">
                            <div class="container p-0">
                                <div class="row">
                                    <div class="col-12 py-2 px-3 hover-cursor-cancel">{{ `${personDetails.firstName} ${personDetails.lastName}(${selectedLog.value === 'email' ? personDetails.email : personDetails.phoneNumber})`}}</div>
                                </div>
                            </div>
                        </OverlayPanel>
                   </div>
                   <div class="col-6 pr-0">
                       <div class="label-text">{{ selectedLog.value }} Outcome</div>
                       <div class="mt-1 uniform-primary-color font-weight-700 c-pointer" @click="toggleOutcome" aria:haspopup="true" aria-controls="overlay_panel">{{ Object.keys(selectedCallOutcome).length > 0 ? selectedCallOutcome.value : "Select an outcome &nbsp;" }} <i class="pi pi-sort-down"></i></div>
                       <OverlayPanel ref="outcomeRef" appendTo="body" :showCloseIcon="false" id="overlay_panel" :breakpoints="{'960px': '75vw'}">
                            <div class="container-fluid p-0">
                                <div class="row" v-for="(item, index) in outcomeList" :key="index">
                                    <div class="col-12 py-2 px-3 hover-log" @click="chooseCallOutcome(item)">{{ item.value }}</div>
                                </div>
                            </div>
                        </OverlayPanel>
                   </div>
               </div>
               <!-- <div class="row mt-2">
                   <div class="col-6">
                       <div class="label-text">Date</div>
                       <div class="mt-1 uniform-primary-color font-weight-700">
                           <input type="date" class="form-control" />
                       </div>
                   </div>
                   <div class="col-6">
                       <div class="label-text">Time</div>
                       <div class="mt-1 uniform-primary-color font-weight-700 c-pointer" @click="toggleTime" aria:haspopup="true" aria-controls="overlay_panel">2:12PM &nbsp; <i class="pi pi-sort-down"></i></div>
                       <OverlayPanel ref="timeRef" appendTo="body" :showCloseIcon="false" id="overlay_panel" :breakpoints="{'960px': '75vw'}">
                            <div class="container">
                                <div class="row">
                                    here here time
                                </div>
                            </div>
                        </OverlayPanel>
                   </div>
               </div> -->
               <!-- <div class="row">
                   <div class="col-12">
                       <hr />
                   </div>
               </div> -->
               <div class="row mt-3">
                   <div class="col-12 p-0">
                       <textarea name="" :placeholder="`Describe the ${selectedLog.value}...`" class="w-100 form-control" rows="6" v-model="callLogDesc"></textarea>
                   </div>
               </div>
               <div class="row d-flex justify-content-start mt-3">
                    <div class="primary-bg default-btn border-0 text-white text-center c-pointer" @click="saveLog">Save</div>
                </div>
           </div>
        </Dialog>
       
        <!-- SMS Pane -->
        <Dialog header="Send SMS" v-model:visible="displaySMSPane" :style="{width: window.innerWidth > 767 ? '50vw' : '100vw'}" :position="position" :modal="true">
           <div class="container-fluid">
               <div class="row mt-3">
                   <div class="p-0 col-md-12">
                        <div class="dropdown">
                            <div class="btn btn-default small-text border w-100 d-flex justify-content-between align-items-center" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" >
                            <!-- @click="closeDropdownIfOpen" -->
                            <div>{{ Object.keys(selectedSender).length > 0 ? selectedSender.mask : "Select Sender Id" }}</div>
                            <i class="pi pi-chevron-down"></i>
                            </div>
                            <div
                            class="dropdown-menu w-100 pb-0 border-0"
                            aria-labelledby="dropdownMenuButton"
                            >
                            <div class="px-2">
 
                            </div>
                            <a v-for="(item, index) in senderIDs" :key="index"
                                class="dropdown-item c-pointer small-text  py-2" @click="setIdToSubject(item)"
                                >{{ item.mask }}
                            </a>
                            <a
                                class="dropdown-item c-pointer text-center create-new-bg border-top py-2" data-toggle="modal" data-target="#senderIdModal"
                                ><i class="pi pi-plus-circle"></i>&nbsp;Request new sender id
                                </a
                            >
                            </div>
                        </div>
                        </div>
                   <div class="col-12 p-0 mt-3">
                       <textarea name="" placeholder="Type your message here ..." class="w-100 form-control" rows="12" v-model="smsMessage"></textarea>
                   </div>
               </div>
               <div class="row d-flex justify-content-start mt-3">
                    <div class="primary-bg default-btn border-0 text-white text-center c-pointer" @click="sendSms">Send</div>
                </div>
           </div>
        </Dialog>
    <Toast />
    <Dialog header="Confirm" v-model:visible="displayConfirm" :breakpoints="{'960px': '75vw'}"  :style="{width: window.innerWidth > 767 ? '50vw' : '100vw'}"  :modal="true">
            <p>You are about to convert this first timer to a member, this action cannot be undone, do you want to continue?</p>
                <div class="dropdown w-100 ">
                    <div id="dropdownMenuButton"  class="w-100  border py-2 pl-3 rounded" data-toggle="dropdown">{{ Object.keys(genderType).length > 0 ? genderType.value : 'Gender'}}</div>
                    <div class="dropdown-menu w-100" aria-labelledby="dropdownMenuButton" >
                        <a
                                    class="dropdown-item  " href="#"
                                    v-for="(gender, index) in genders" :key="index" 
                                    @click="addGenderType(gender)">
                                
                            <div class="hover-text cursor-pointer" >{{gender.value}}</div>
                        </a>
                    
                </div>
            </div>
            <template #footer>
                <div class="d-flex justify-content-end">
                    <div class="default-btn text-center c-pointer" @click="() => displayConfirm = false">No</div>
                    <div class="primary-bg default-btn border-0 text-white text-center ml-3 c-pointer" @click="convertToMember($event)"><i class="pi pi-spin pi-spinner" v-if="loading"></i> Yes</div>
                </div>
            </template>
    </Dialog>

    <!-- Convert to member modal -->
        <div class="modal fade" id="convertToMemberModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
          <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLongTitle">Convert to member</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <div class="container">
                  <div class="row">
                    <div class="col-12"><p>To continue, you have to select the membership category you want to convert this first timer to.</p></div>
                    <div class="col-12">
                        <!-- <Dropdown v-model="selectedMembershipClassification" :filter="false" :options="membershipCategory" class="w-100 phone-input" optionLabel="name" placeholder="Select membership category" /> -->
                        <div class="dropdown">
                            <button class="btn w-100 phone-input d-flex justify-content-between align-items-center" type="button" id="dropdownMemCat" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <div>
                                {{ selectedMembershipClassification && Object.keys(selectedMembershipClassification).length > 0 ? selectedMembershipClassification.name : 'Select membership category' }}</div>
                                <i class="pi pi-chevron-down"></i>
                            </button>
                            <div class="dropdown-menu w-100" aria-labelledby="dropdownMemCat">
                                <a class="dropdown-item c-pointer" v-for="item in membershipCategory" :key="item.id">
                                    <div @click="setMemCat(item)">{{ item.name }}</div>
                                </a>
                            </div>
                        </div>
                    </div>
                    
                  </div>
                </div>
              </div>
              <div class="modal-footer border-0">
                  <div class="d-flex justify-content-end">
                    <div class="default-btn text-center c-pointer" data-dismiss="modal">Close</div>
                    <button class="primary-bg default-btn border-0 text-white text-center ml-3 c-pointer" :disabled="Object.keys(selectedMembershipClassification).length === 0" @click="convertToMember($event)"><i class="pi pi-spin pi-spinner" v-if="loading"></i> Proceed</button>
                </div>
                <!-- <button type="button" class="btn default-btn " data-dismiss="modal">Close</button>
                <button type="button" class="btn default-btn primary-bg border-0 text-white" data-dismiss="modal" @click="saveSenderId" :disabled="requestbtn">Request sender id</button> -->
              </div>
            </div>
          </div>
        </div>

    <!-- Create sender id modal -->
        <div class="modal fade" id="senderIdModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
          <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLongTitle">Create sender id</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <div class="container">
                  <div class="row">
                    <div class="col-12">Enter sender id</div>
                    <div class="col-12 mt-2">
                      <input type="text" class="form-control" placeholder="Enter sender id" v-model="senderIdText" @input="validateSenderId" ref="senderIdRef"/>
                      <div class="invalid-feedback text-danger pl-2">
                        <ul>
                          <li>Should not contain any special characters</li>
                          <li>Should not be less than 3 characters and more than 11 characters</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="modal-footer border-0">
                <button type="button" class="btn default-btn " data-dismiss="modal">Close</button>
                <button type="button" class="btn default-btn primary-bg border-0 text-white" data-dismiss="modal" @click="saveSenderId" :disabled="requestbtn">Request sender id</button>
              </div>
            </div>
          </div>
        </div>
</template>

<script>
import { computed, ref, watchEffect } from "vue"
import Dropdown from "primevue/dropdown";
import Tooltip from 'primevue/tooltip';
import OverlayPanel from 'primevue/overlaypanel';
import axios from "@/gateway/backendapi";
import lookupTable from "../../../../services/lookup/lookupservice"
import { useRoute } from "vue-router"
import frmservice from "@/services/FRM/firsttimermanagement"
import { useStore } from "vuex";
// import MultiSelect from 'primevue/multiselect';
// import SinchClient from 'sinch-rtc/sinch.min.js'
// import { useConfirm } from "primevue/useConfirm";
import { useToast } from "primevue/usetoast";
import SearchMember from "../../../../components/membership/MembersSearch.vue"
import party from "party-js";
import swal from "sweetalert";
export default {
    components: {
        Dropdown,
        OverlayPanel,
        SearchMember
    },
    directives: {
        'tooltip': Tooltip
    },
    emits: ["opennoteeditor", "openemailmodal", "opentaskeditor", "calllogdesc", "resetlog", "allcontact","updatelogtoview", "displayanim", ],
    props: ["personDetails", "smsLog", "activityType"],
    setup (props, { emit }) {
        // const confirm = useConfirm()
        const toast = useToast()
        const route = useRoute()
        const store = useStore()
        const selectedContact = ref({})
        // const contacts = ref([])
        const lifeCycle = ref([])
        const selectedLifeCycle = ref({})
        const leadStatus = ref(frmservice.leadStatus())
        const outcomeList = ref([])
        const selectedLeadStatus = ref("")
        const editEmailRef = ref()
        const phoneRef = ref()
        const contactNameRef = ref()
        const hoverTask = ref(false)
        const hoverPhone = ref(false)
        const phoneNumber = ref(8076543254)
        const email = ref('olad@gamil.com')
        const logDropDown = ref(false)
        const callDropDown = ref(false)
        const position = ref('bottomright')
        const displayLogPane = ref(false)
        const displaySMSPane = ref(false)
        const contactRef = ref(false)
        const outcomeRef = ref(false)
        const selectedCallOutcome = ref({})
        const date = ref("")
        const timeRef = ref(false)
        const addressRef = ref()
        const callLogDesc = ref("")
        const contactIcon = ref(true)
        const insightIcon = ref(false)
        const moreIcon = ref(false)
        const aboutUsSource = ref([])
        const selectedAboutUsSource = ref({})
        const communicationMeans = ref([ { name: "Call", id: 0 }, { name: "Email", id: 1 }, { name: "Visit", id: 2 }, { name: "SMS", id: 3 } ]);
        const selectedCommunicationMeans = ref(null);
        const joinInterestArr = ref([ { name: "Yes", id: 0 }, { name: "No", id:1 }, { name: "Maybe", id: 2 }, { name: "On Transit", id: 3 } ]);
        const selectedJoinInterest = ref(null);
        const wantVisitArr = ref([ { name: "Yes", id: 0 }, { name: "No", id: 1 }, { name: "Maybe", id: 2 }, { name: "On Transit", id: 3 } ]);
        const selectedVisitOption = ref(null);
        const selectedLog = ref({})
        const smsMessage = ref("")
        const isoCode = ref("")
        const eventsSearchString = ref("")
        const eventsAttended = ref([])
        const selectedEventAttended = ref({})
        const genders = ref([])
        const maritalStatus = ref([])
        const selectedGender = ref({})
        const selectedMaritalStatus = ref({})
        const day = ref([ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31 ]);
        const month = ref([ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ]);
        const selectedBirthday = ref("")
        const selectedBirthMonth = ref("")
        const selectedBirthYear = ref("")
        const activityLogs = ref([])
        const selectedSender = ref({})
        const senderIDs = ref([])
        const subject = ref("")
        const image = ref('')
        const pictureUrl = ref("")
        const url = ref("")
        const hoverImage = ref(false)
        const confeti = ref()
        const membershipCategory = ref([])
        const displayConfirm = ref(false)
        const loading = ref(false)
        const senderIdText = ref("")
        const senderIdRef = ref()
        const requestbtn = ref(false)
        const tenantId = ref("")
        const selectedMembershipClassification = ref({})
        const clearPersonValue = ref(false)
        const hasContactOwner = ref(false)


        const selectedContactLog = computed(() => {
            if (!props.personDetails) return "Select a contact"
            return `${props.personDetails.firstName} ${props.personDetails.lastName}`
        })

        const editEmail = (event) => {
            editEmailRef.value.toggle(event);
        };
        
        const editPhone = (event) => {
            phoneRef.value.toggle(event);
        };
        
        const editAddress = (event) => {
            addressRef.value.toggle(event);
        };
        
        const editContactName = (event) => {
            contactNameRef.value.toggle(event);
        };
        
        const cancelContactName = () => {
            contactNameRef.value.hide();
        };

        const cancelEmailEdit = () => {
            editEmailRef.value.hide()
        }
        
        const cancelPhoneEdit = () => {
            phoneRef.value.hide()
        }

        const onHoverBorder = () => {
            hoverTask.value = true
        }
        
        const outHoverBorder = () => {
            hoverTask.value = false
        }

        const toggleHoverPhone = () => {
            hoverPhone.value = true
        }
        
        const OutHoverPhone = () => {
            hoverPhone.value = false
        }
    
        const openNoteEditor = () => {
            emit('opennoteeditor', true)
        }

        const openEmailModal = () => {
            emit('openemailmodal', true)
        }
        
        const openTaskEditor = () => {
            emit('opentaskeditor', true)
        }

        const call = () => {
            // let sinchClient = new SinchClient({
            //     applicationKey: 'b1392f96-6a4b-4e44-bdf1-0e1f4dd2d1a0',
            //     capabilities: { calling: true },
            // })
            // var signUpObj = {};
            //     signUpObj.username = 'oladapo'
             
            //         sinchClient.start(signUpObj, function () {
            //             global_username = signUpObj.username;
            //             // console.log(ticket)
            //             //On success, show the UI
            //         })
                    // let error = function (error) {
                    //     console.log(error)
                    // }
                    // console.log(error)
              
            }

        const toggleCallSms = (event) => {
            callDropDown.value.toggle(event);
        }

        const innerWidth = computed(() => {
            return window.innerWidth;
        })

        const toggleLog = (event) => {
            logDropDown.value.toggle(event);

        }

        const toggleLogPane = (e, item) => {
            logDropDown.value.hide();
            displayLogPane.value = true;
            console.log(e)
            selectedLog.value = item
        }
        
        const toggleCallSmsPane = (e) => {
            callDropDown.value.hide();
            if (e.target.innerText.toLowerCase() === "call") {
                call()
            }   else {
                console.log('sms')
                toggleSMSPane()
            }
        }
        

        const toggleSMSPane = () => {
            callDropDown.value.hide();
            displaySMSPane.value = true;
        }

        const toggleContact = (event) => {
            contactRef.value.toggle(event);
        }
        
        const toggleOutcome = (event) => {
            outcomeRef.value.toggle(event);
        }
        
        const toggleTime = (event) => {
            timeRef.value.toggle(event);
        }

        const saveLog = async() => {
            displayLogPane.value = false;
            // emit('calllogdesc', { desc: callLogDesc.value, type: selectedLog.value.value })

            let body = {
                outcome: selectedCallOutcome.value.id,
                description: callLogDesc.value,
                firsttimerID: route.params.personId,
                type: selectedLog.value.id
            }

            try {
                let data = await frmservice.createLog(body)
                console.log(data)
                emit('updatelogtoview')
                callLogDesc.value = ""
            }
            catch (err) {
                console.log(err)
            }
        }

        const getIsoCode = () => {
            if (store.getters.currentUser && store.getters.currentUser.isoCode) {
            isoCode.value = store.getters.currentUser.isoCode;
            tenantId.value = store.getters.currentUser.tenantId
            } else {
            axios
                .get("/api/Membership/GetCurrentSignedInUser")
                .then((res) => {
                isoCode.value = res.data.isoCode;
                tenantId.value = res.data.tenantId
                console.log(res.data)
                })
                .catch((err) => console.log(err));
            }
        }
        getIsoCode()

        const setIdToSubject = (item) => {
            console.log(item)
            subject.value = item.mask
            selectedSender.value = item
        }

        const sendSms = async() => {
            let body = {
                subject: subject.value,
                message: smsMessage.value,
                toOthers: props.personDetails.phoneNumber,
                isoCode: isoCode.value,
                gateWayToUse: "hybridKonnect",
                ispersonalized: true,
                category: "",
                contacts: [],
                emailAddress: "",
                emailDisplayName: "",
                groupedContacts: [],
            }
            console.log(body)
            try {
                let res = await frmservice.sendSms(route.params.personId, body)
                console.log(res)
                toast.add({
                    severity: "success",
                    summary: "Success",
                    detail: "Message sent successfully",
                    life: 5000,
                });
                displaySMSPane.value = false
                emit("updatelogtoview")
            }
            catch (err) {
                console.log(err)
            }
        }

        watchEffect(() => {
            if (props.smsLog) {
                displaySMSPane.value = true
                emit('resetlog', false)
            }
        })

        const toggleContactIcon = () => {
            // toggle icon state
            contactIcon.value = !contactIcon.value
        }
        
        const toggleInsightIcon = () => {
            insightIcon.value = !insightIcon.value
        }
        
        const toggleMoreIcon = () => {
            moreIcon.value = !moreIcon.value
        }

        const getKnowlegdeSource = async() => {
            try {
                let { data } = await axios.get("/api/membership/howyouheardaboutus")
                console.log(data)
                aboutUsSource.value = data
            } catch (error) {
                console.log(error)
            }
        }
        getKnowlegdeSource()

        const getCallOutcome = async () => {
            try {
                let data = await lookupTable.getLookUps()
                console.log(data)
                outcomeList.value = data.outcome
                genders.value = data.genders
                maritalStatus.value = data.maritalStatus
            }
            catch (err) {
                console.log(err)
            }
        }
        getCallOutcome()

        const chooseCallOutcome = (outcome) => {
            selectedCallOutcome.value = outcome
            outcomeRef.value.hide()
        }

        // const getMembers = async () => {
        //   try {
        //     const { data } = await axios.get('/api/People/GetPeopleBasicInfo');
        //     // contacts.value = data;
        //     // console.log(data)
        //     emit('allcontact', data)
        //   } catch (error) {
        //     console.log(error);
        //   }
        // };
        // getMembers();

        const updateOwner = async(payload, type) => {
            const body = {
                firstTimerID: route.params.personId,
                ownerID: type === 1 ? payload.id : null
            }
            try {
                let res = await frmservice.updateContactOwner(route.params.personId, body)
                if (type === 1) {
                    hasContactOwner.value = true
                }
                console.log(res)
                emit('updatelogtoview')
                if (type === 2) {
                    toast.add({
                        severity: "success",
                        summary: "Removed",
                        detail: "Contact owner removed successfully",
                        life: 5000,
                    });
                    clearPersonValue.value = true
                }
            }
            catch (err) {
                console.log(err)
            }

        }

        const resetClearPersonValue = (payload) => {
            clearPersonValue.value = payload
            selectedContact.value = new Object()
            hasContactOwner.value = false
        }
        
        const getLifeCycle = async() => {
            try {
                let res = await frmservice.getLifeCycle()
                console.log(res)
                lifeCycle.value = res.returnObject.sort((a, b) => a.order - b.order);
            }
            catch (err) {
                console.log(err)
            }

        }
        getLifeCycle()

        const updateLifeCycle = async(item) => {
            selectedLifeCycle.value = item
            const payload = {
                firstTimerID: route.params.personId,
                stageID: selectedLifeCycle.value.id
            }
            try {
                let res = await frmservice.updateLifeCycle(route.params.personId, payload)
                console.log(res)
                emit('updatelogtoview')
            }
            catch (err) {
                console.log(err)
            }

        }

        const year = computed(() => {
            const arrOfYears = [];
            let currentYear = new Date().getFullYear();
            while (arrOfYears.length <= 100) {
                arrOfYears.push(currentYear);
                currentYear = currentYear - 1;
            }
            return arrOfYears;
        });

        watchEffect(() => {
            if (props.personDetails && lifeCycle.value.length > 0) {
                selectedLifeCycle.value = lifeCycle.value.find(i => i.id === props.personDetails.firstTimerCycleStageID)
            }
            
            if (props.personDetails && route.query.memberType == 1) {
                selectedContact.value = {
                    name: props.personDetails.followupPersonName,
                    id: props.personDetails.followupPersonID
                }
            }
            
            if (props.personDetails && route.query.memberType == 0) {
                selectedContact.value = {
                    name: props.personDetails.followUpPersonName,
                    id: props.personDetails.contactOwnerID
                }
            }

            if (props.personDetails && leadStatus.value.length > 0) {
                selectedLeadStatus.value = leadStatus.value.find(i => i.id === props.personDetails.leadStatus)
            }

            if (props.personDetails) {
                selectedCommunicationMeans.value = communicationMeans.value.find(i => i.id === props.personDetails.communicationMeans)
                selectedAboutUsSource.value = aboutUsSource.value.find(i => i.id === props.personDetails.howDidYouAboutUsId)
                selectedJoinInterest.value = joinInterestArr.value.find(i => i.id === props.personDetails.interestedInJoining)
                selectedVisitOption.value = wantVisitArr.value.find(i => i.id === props.personDetails.wantsToBeVisited)
                selectedGender.value = genders.value.find(i => i.id === props.personDetails.genderId)
                selectedMaritalStatus.value = maritalStatus.value.find(i => i.id === props.personDetails.maritalStatusId)
                selectedBirthday.value = day.value.find(i => i == props.personDetails.birthday)
                selectedBirthMonth.value = month.value[Number(props.personDetails.birthMonth) - 1]
                selectedBirthYear.value = year.value.find(i => i == props.personDetails.birthYear)
            }
        })

        const updateLeadStatus = async() => {
            try {
                let res = await frmservice.updateLeadStatus(route.params.personId, selectedLeadStatus.value.id)
                console.log(res)
                emit('updatelogtoview')
            }
            catch (err) {
                console.log(err)
            }
        }

        const getEvents = () => {
            axios.get("/api/Events/EventActivity").then((res) => {
                eventsAttended.value = res.data;
            });
        }
        getEvents()

        const eventAttendedSelected = (event) => {
            selectedEventAttended.value = event
        }

        const editBasicDetails = async() => {
            if (route.query.memberType == 0) {
                let payload = {
                personId: route.params.personId,
                email: props.personDetails.email,
                firstName: props.personDetails.firstName,
                lastName: props.personDetails.lastName,
                phoneNumber: props.personDetails.phoneNumber,
                address: props.personDetails.address,
                activityID: selectedEventAttended.value && Object.keys(selectedEventAttended.value).length > 0 ? selectedEventAttended.value.activityID : props.personDetails.activityID,
                howDidYouAboutUsId: selectedAboutUsSource.value ? selectedAboutUsSource.value.id : "00000000-0000-0000-0000-000000000000",
                communicationMeans: selectedCommunicationMeans.value ? selectedCommunicationMeans.value.id : 0,
                interestedInJoining: selectedJoinInterest.value ? selectedJoinInterest.value.id : 0,
                wantsToBeVisited: selectedVisitOption.value ? selectedVisitOption.value.id : 0,
                genderId: selectedGender.value && Object.keys(selectedGender.value).length > 0 ? selectedGender.value.id : props.personDetails.genderId,
                maritalStatusId: selectedMaritalStatus.value && Object.keys(selectedMaritalStatus.value).length > 0 ? selectedMaritalStatus.value.id : props.personDetails.maritalStatusId,
                birthday: selectedBirthday.value ? selectedBirthday.value : props.personDetails.birthday,
                birthMonth: selectedBirthMonth.value ? month.value.findIndex(i => i == selectedBirthMonth.value) + 1 : props.personDetails.birthMonth,
                birthYear: selectedBirthYear.value ? selectedBirthYear.value : props.personDetails.birthYear,
                firstTimerId: route.params.personId,
                pictureUrl: pictureUrl.value
            }
            console.log(selectedBirthMonth.value)
            console.log(payload)

            try {
                let res = await frmservice.editBasicDetails(payload)
                console.log(res)
                toast.add({
                    severity: "success",
                    summary: "Success",
                    detail: "Updated successfully",
                    life: 5000,
                });
            }
            catch (err) {
                console.log(err)
                if (err.status === 400) {
                    toast.add({
                    severity: "warn",
                    summary: "Empty fields present",
                    detail: "Please fill other fields",
                    life: 5000,
                });
                }
            }
            contactNameRef.value.hide();
            editEmailRef.value.hide();
            phoneRef.value.hide();
            addressRef.value.hide();
            } else {
                const formData = new FormData()
                formData.append("firstName",props.personDetails.firstName)
                formData.append("lastName",props.personDetails.lastName)
                formData.append("mobilePhone",props.personDetails.phoneNumber)
                formData.append("email",props.personDetails.email)
                formData.append("dayOfBirth",selectedBirthday.value ? selectedBirthday.value : props.personDetails.birthday)
                formData.append("monthOfBirth", selectedBirthMonth.value ? month.value.findIndex(i => i == selectedBirthMonth.value) + 1 : props.personDetails.birthMonth)
                formData.append("yearOfBirth", selectedBirthYear.value ? selectedBirthYear.value : props.personDetails.birthYear)
                formData.append("homeAddress", props.personDetails.address)
                formData.append("followupPersonID", props.personDetails.followupPersonID)
                formData.append("genderID", selectedGender.value && Object.keys(selectedGender.value).length > 0 ? selectedGender.value.id : props.personDetails.genderId)
                // lastName: toghgr
                // picture: 
                // mobilePhone: 0890344443
                // email: fkfmkk@de,m,f.com
                // occupation: 
                // dayOfBirth: 27
                // monthOfBirth: 0
                // yearOfBirth: 0
                // occupation: 
                // yearOfWedding: 0
                // monthOfWedding: 0
                // dayOfWedding: 0
                // peopleClassificationID: 
                // personGroups: 
                // homeAddress: 
                // maritalStatusID: 
                // genderID: 1
                // ageGroupID: 
                // followupPersonID: 00000000-0000-0000-0000-000000000000

                try {
                    let { data } = await axios.put(`/api/People/UpdatePerson/${route.params.personId}`, formData)
                    console.log(data)
                } catch (err) {
                    console.log(err)
                }
            }
        }
        
        watchEffect(() => {
            activityLogs.value = props.activityType.filter(i => i.id !== 96)
        })

        const getSenderId = async() => {
        try {
            let { data } = await axios.get(`/api/Messaging/RetrieveTenantSenderIDs`)
            console.log(data)
            senderIDs.value = data.returnObject
            }
            catch (err) {
                console.log(err)
            }
        }
        getSenderId()

        const uploadPicture = () => {
            console.log(image.value)
            image.value.click()
        }

        const choosePicture = (e) => {
            let formData = new FormData()
            formData.append("mediaFileImage", e.target.files[0])
            url.value = URL.createObjectURL(e.target.files[0]);

            axios.post("/api/Media/UploadProfilePicture", formData)
            .then(res => {
                console.log(res)
                pictureUrl.value = res.data.pictureUrl
                emit("pictureurl", pictureUrl.value)
            })
            .catch(err => {
                console.log(err)
            })
        }

        const setHover = () => {
            hoverImage.value = true
        }

        const setLeave = () => {
            hoverImage.value = false
        }
        

        const convertToMember = async(element) => {
            loading.value = true
            try {
                let { data } = await axios.post(
                `/api/People/ConvertFirstTimerToMember?personId=${route.params.personId}&membershipCategoryId=${selectedMembershipClassification.value.id}`
                );
                console.log(data);
                party.confetti(element);
                emit("displayanim", true)
                swal(
                    "Congratulations!",
                    `${props.personDetails.firstName ? props.personDetails.firstName : ""} ${props.personDetails.lastName ? props.personDetails.lastName : ""} is now a member of your church.`,
                    "success"
                );
                displayConfirm.value = false;
                loading.value = false

                if (data.response) {
                toast.add({
                    severity: "success",
                    summary: "Confirmed",
                    detail: data.response,
                    life: 4000,
                });
                } else {
                toast.add({
                    severity: "success",
                    summary: "Confirmed",
                    detail: "Moved successfully",
                    life: 4000,
                });
                }
            } catch (err) {
                console.log(err);
                loading.value = false
                if (err.response) {
                toast.add({
                    severity: "warn",
                    summary: "Moving failed",
                    detail: err.response,
                    life: 4000,
                });
                } else if (err.toString().toLowerCase().includes("timeout")) {
                toast.add({
                    severity: "warn",
                    summary: "Request Delayed",
                    detail: "Request took too long to respond",
                    life: 4000,
                });
                } else if (err.toString().toLowerCase().includes("network error")) {
                toast.add({
                    severity: "warn",
                    summary: "Network Error",
                    detail: "Please ensure that you havve a strong internet",
                    life: 4000,
                });
                } else {
                toast.add({
                    severity: "warn",
                    summary: "Unable to move",
                    detail:
                    "Couldn't move successfully, check your connection and try again",
                    life: 4000,
                });
                }
            }
        }

        const getMembershipCategory = async () => {
            try {
                let { data } = await axios.get(
                "/api/Settings/GetTenantPeopleClassification"
                );
                membershipCategory.value = data;
                console.log(data)
            } catch (err) {
                console.log(err);
            }
        };
        getMembershipCategory();

        const openConfirm = () => {
            displayConfirm.value = true
            // confirm.require({
            //     message: `You are about to convert this first timer to a member, this action cannot be undone, do you want to continue?`,
            //     header: 'Confirm',
            //     icon: 'pi pi-info-circle',
            //     accept: () => {
            //         party.confetti(element);
            //         emit("displayanim", true)
            //             swal(
            //                 "Congratulations!",
            //                 `${props.personDetails.firstName ? props.personDetails.firstName : ""} ${props.personDetails.lastName ? props.personDetails.lastName : ""} is now a member of your church.`,
            //                 "success"
            //             );
            //             // convertToMember()
            //     },
            //     reject: () => {
            //         toast.add({
            //             severity:'error', 
            //             summary:'Rejected', 
            //             detail:'You have rejected', 
            //             life: 3000});
            //     }
            // });
        }

        const validateSenderId = (e) => {
            var regExp = /^[a-zA-Z0-9]{3,11}$/;
            var testString = e.target.value;
                        
            if(regExp.test(testString)){
                /* do something if letters are found in your string */
                senderIdRef.value.classList.add('is-valid')
                senderIdRef.value.classList.remove('is-invalid')
                requestbtn.value = false
            } else {
                /* do something if letters are not found in your string */
                senderIdRef.value.classList.add('is-invalid')
                senderIdRef.value.classList.remove('is-valid')
                requestbtn.value = true
            }
        }

        const saveSenderId = async() => {
            let payload = {
                tenantID: tenantId.value,
                mask: senderIdText.value
            }
            try {
                let { data } = await axios.post(`/api/Messaging/RequestSenderID`, payload)
                console.log(data)
                if(data.status === 0) {
                toast.add({
                    severity: "warn",
                    summary: "Pending",
                    detail: "Sender id is pending for approval, when it is approved, you will see it among the sender id list",
                    life: 5000
                });
                } else if (data.status === 1) {
                toast.add({
                    severity: "warn",
                    summary: "Processing",
                    detail: "Sender id is processing for approval, when it is approved, you will see it among the sender id list",
                    life: 5000
                });
                } else if (data.status === 2) {
                    selectedSender.value = payload
                toast.add({
                    severity: "success",
                    summary: "Approved",
                    detail: "Sender id is approved!",
                    life: 6000
                });
                } else {
                toast.add({
                    severity: "warn",
                    summary: "Not Approved",
                    detail: "Sender id is not approved, create another one.",
                    life: 4000
                })
                }
                senderIdText.value = ""
                senderIdRef.value.classList.remove('is-invalid')
                senderIdRef.value.classList.remove('is-valid')
                getSenderId()
            }
            catch (err) {
                console.log(err)
            }
        }

        const setMemCat = (payload) => {
            selectedMembershipClassification.value = payload
        }

        return {
            selectedContact,
            // contacts,
            lifeCycle,
            selectedLifeCycle,
            selectedLeadStatus,
            leadStatus,
            editEmail,
            editEmailRef,
            editContactName,
            contactNameRef,
            cancelContactName,
            onHoverBorder,
            outHoverBorder,
            hoverTask,
            hoverPhone,
            toggleHoverPhone,
            OutHoverPhone,
            phoneNumber,
            email,
            openNoteEditor,
            openEmailModal,
            openTaskEditor,
            call,
            toggleLog,
            logDropDown,
            toggleLogPane,
            position,
            displayLogPane,
            toggleContact,
            contactRef,
            outcomeRef,
            toggleOutcome,
            date,
            toggleTime,
            timeRef,
            outcomeList,
            selectedCallOutcome,
            chooseCallOutcome,
            selectedContactLog,
            callLogDesc,
            saveLog,
            toggleContactIcon,
            contactIcon,
            insightIcon,
            moreIcon,
            toggleInsightIcon,
            toggleMoreIcon,
            aboutUsSource,
            selectedAboutUsSource,
            communicationMeans,
            selectedCommunicationMeans,
            joinInterestArr,
            selectedJoinInterest,
            wantVisitArr,
            selectedVisitOption,
            updateOwner,
            updateLifeCycle,
            selectedLog,
            updateLeadStatus,
            callDropDown,
            toggleCallSms,
            toggleCallSmsPane,
            displaySMSPane,
            sendSms,
            smsMessage,
            isoCode,
            editBasicDetails,
            phoneRef,
            cancelEmailEdit,
            cancelPhoneEdit,
            editPhone,
            editAddress,
            addressRef,
            eventsAttended,
            eventsSearchString,
            selectedEventAttended,
            eventAttendedSelected,
            genders,
            maritalStatus,
            selectedMaritalStatus,
            selectedGender,
            day,
            month,
            year,
            selectedBirthday,
            selectedBirthMonth,
            selectedBirthYear,
            activityLogs,
            selectedSender,
            senderIDs,
            setIdToSubject,
            subject,
            uploadPicture,
            image,
            choosePicture,
            pictureUrl,
            url,
            hoverImage,
            setLeave,
            setHover,
            convertToMember,
            confeti,
            membershipCategory,
            openConfirm,
            displayConfirm,
            loading,
            validateSenderId,
            senderIdText,
            senderIdRef,
            saveSenderId,
            requestbtn,
            tenantId,
            route,
            window,
            innerWidth,
            selectedMembershipClassification,
            clearPersonValue,
            resetClearPersonValue,
            hasContactOwner,
            setMemCat
        }
            
    }
}
</script>

<style scoped>
.contact-name {
    font-size: 36px;
    font-weight: 200
}

.contact-image {
    width: 130px;
    height: 130px;
    object-fit: cover;
    border-radius: 50%
}

.icon-bg {
    border: 2px solid #cbd6e2;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #506e91;
    background: #eaf0f6;
}

.label-text {
    color: #506e91;
    font-size: 0.9em;
}

.details-btn {
        background-color: #eaf0f6;
        border: 1px solid #cbd6e2;
        color: #506e91;
        border-radius: 3px;
        padding: 5px 12px;
        font-size: 12px;
}

.icon-edit {
    color: #506e91;
}

.uniform-primary-color {
    color: #136acdd5
}

.btn-btn {
    font-size: 12px;
    line-height: 14px;
    padding: 5px 12px;
    border-radius: 3px;
    -webkit-font-smoothing: auto;
    -moz-osx-font-smoothing: auto;
    font-weight: 400;
    text-align: center;
}

.save-btn {
    background-color: #425b76;
    border: 1px solid #425b76;
    color: #fff;    
}

.cancel-btn {
    background-color: #eaf0f6;
    border-color: #cbd6e2;
    color: #506e91; 
}

.task-border {
    border: 2px solid transparent;
    border-radius: 3px;
}

/* .task-border.border-transparent {
    border: transparent
} */
.hover-border {
    border: 2px solid #1269cea6;
    border-radius: 3px;
}

.phone-input {
    background: transparent;
    border: 0;
    border-bottom: 1px solid #cbd6e2;
    border-radius: 0
}

/* .phone-details {
    position: absolute;
    top: 30em;
    right: 2em;
    z-index: 1;
} */

.hover-log:hover {
    background: rgba(202, 202, 202, 0.356);
    cursor: pointer
}

.hover-cursor-cancel:hover {
    cursor: not-allowed;
}

.roll-icon {
    transition: all 0.5s ease-in-out;
    transform: rotateZ(180deg);
}
.unroll-icon {
    transition: all 0.5s ease-in-out;
    transform: rotateZ(0deg);
}

.hide-contact {
    height: 0;
    transition: all 0.5s ease-in-out;
    overflow: hidden;
}

.show-contact {
    height: 520px;
    transition: all 0.5s ease-in-out;
    /* overflow: hidden; */
}

.reduce-contact-height {
    height: 296px;
    transition: all 0.5s ease-in-out;
    /* overflow: hidden; */
}


.dropdown-menu {
    max-height: 300px;
    overflow: scroll;
    box-shadow: 0 2px 4px -1px rgb(0 0 0 / 20%), 0 4px 5px 0 rgb(0 0 0 / 14%), 0 1px 10px 0 rgb(0 0 0 / 12%);
}

.create-new-bg {
    background: #dadada;
    color: rgb(15, 71, 134)
}

.create-new-bg:hover {
  background: #dadadad2;
  color: rgb(15, 71, 134)
}

.profile-overlay {
    overflow: hidden;
    position: relative;
    transition: all 3s ease-in-out
}

.profile-overlay img {
    position: relative;
    z-index: 0;
    inset: 0;
    width: 130;
    height: 130px;
    object-fit: cover;
    transition: all 3s ease-in-out
}

.profile-overlay::before,
.profile-overlay::after {
    content: '';
    position: absolute;
    inset: 0;
    transition: all 3s ease-in-out
}

.profile-overlay:before {
    z-index: 1;
    background: black;
    border-radius: 50%;
    position: absolute;
    margin: 0 auto;
    opacity: .3;
    width: 130px;
    opacity: 0;
    -webkit-transition: opacity 0.3s ease;
    -moz-transition: opacity 0.3s ease;
    -ms-transition: opacity 0.3s ease;
    -o-transition: opacity 0.3s ease;
    transition:  opacity 0.3s ease-in-out;
    /* mix-blend-mode: soft-light */
}

.profile-overlay:hover:before {
    opacity: .6;
}

/* .profile-overlay::after {
    z-index: 1;
    background: blue;
    border-radius: 50%;
    mix-blend-mode: screen;
} */

.adjust-icon {
    position: absolute;
    margin-top: 44px;
    font-size: 34px;
    color: white;
    z-index: 1;
    opacity: 0;
    -webkit-transition: opacity 0.3s ease;
    -moz-transition: opacity 0.3s ease;
    -ms-transition: opacity 0.3s ease;
    -o-transition: opacity 0.3s ease;
    transition:  opacity 0.3s ease-in-out;
}

.fade-icon {
    position: absolute;
    margin-top: 44px;
    font-size: 34px;
    color: white;
    z-index: 1;
    opacity: .6;
    -webkit-transition: opacity 0.3s ease;
    -moz-transition: opacity 0.3s ease;
    -ms-transition: opacity 0.3s ease;
    -o-transition: opacity 0.3s ease;
    transition:  opacity 0.3s ease-in-out;
}

.remove-contact {
    font-size: 0.9em;
    text-decoration: underline;
}
</style>