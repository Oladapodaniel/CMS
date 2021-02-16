<template>
    <div>
        <div class="container-fluid">
            <div class="row mt-4">
                <div class="col-sm-12 py-2">
                    <a class="mx-2 tab-link" :class="{'active': activeTab === 'churchplus'}" @click="changeTab('churchplus')">Churchplus</a>
                    <a class="mx-2 tab-link" :class="{'active': activeTab === 'sms'}" @click="changeTab('sms')" v-if="false">SMS</a>
                    <a class="mx-2 tab-link" :class="{'active': activeTab === 'sharelink'}">Share link</a>
                </div>
            </div>
            <hr style="margin: 0">
            <div class="mt-4 main-row">
                <div class="row">
                    <div class="col-sm-4 d-flex justify-content-end align-items-center text-sm-right label-text">
                        <span>From</span>
                    </div>
                    <div class="col-sm-6 form-group">
                        <select name="" class="form-control inp" v-show="activeTab === 'churchplus'">
                            <option value="">{{ userEmail }}</option>
                        </select>
                        <select name="" class="form-control inp" v-show="activeTab === 'sms'">
                            <option value="">{{ churchName }}</option>
                        </select>
                    </div>
                    <div class="col-sm-2 text-center d-flex justify-content-center align-items-center icon-div">
                        <i class="fa fa-question-circle inp-icon my-1"></i>
                    </div>
                </div>
            </div>
            <div class="main-row">
                <div class="row" v-for="(recipient, index) in recipients" :key="index">
                    <div class="col-sm-4 d-flex justify-content-end align-items-center text-sm-right label-text">
                        <span>To</span>
                    </div>
                    <div class="col-sm-6 form-group" >
                        <input type="email" class="form-control inp"  v-model="recipient.email" name="" id="" v-show="activeTab === 'churchplus'" @input="hideErrorMessage">
                        <input type="text" class="form-control inp" v-model="recipient.phone" name="" id="" v-show="activeTab === 'sms'" @input="hideErrorMessage">
                    </div>
                    <div class="col-sm-2 text-center d-flex justify-content-center align-items-center icon-div">
                        <i class="fa fa-plus-circle inp-icon plus-icon my-1" @click="addRecipient"></i>
                    </div>
                </div>
            </div>
           
            <!-- Subject -->
            <div class="main-row">
                <div class="row">
                    <div class="col-sm-4 d-flex justify-content-end align-items-center text-sm-right">
                        <span class="">Subject</span>
                    </div>
                    <div class="col-sm-5 form-group">
                        <input type="text" class="form-control border-0 inp evt-name" name="" :value="`Report For ${eventName}`"
                            style="margin-top: -5px"
                            ref="subject"
                        >
                    </div>
                    <div class="col-sm-3 d-flex justify-content-start align-items-center">
                        <a class="edit-sub-btn">Edit subject</a>
                    </div>
                </div>
            </div>

            <!-- Message -->
            <div class="main-row">
                <div class="row">
                    <div class="col-sm-4 d-flex justify-content-end align-items-center text-sm-right">
                        <span class="">Message</span>
                    </div>
                    <div class="col-sm-6 form-group">
                        <textarea class="form-control" name="" id="" cols="30" rows="5" placeholder="Enter your message" v-model="message"></textarea>
                    </div>
                    <div class="col-sm-2">
                        
                    </div>
                </div>
            </div>

            <!-- Checkboxes -->
            <div class="main-row">
                <div class="row mb-5">
                    <div class="col-sm-4 d-flex justify-content-end align-items-center text-sm-right">
                        
                    </div>
                    <div class="col-sm-8 form-group" v-show="activeTab === 'churchplus'">
                        <div class="row">
                            <div class="col-sm-1">
                                <!-- <input type="checkbox" v-model="sendToMyself" name="" id="" @change="test"> -->
                                <!-- <input type="checkbox" name="" id="" @click="test"> -->
                                <Checkbox id="binary" v-model="sendToMysef" :binary="true"/>
                            </div>
                            <div class="col-sm-10">
                                <span>Send a copy to myself at {{ userEmail }}</span>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-sm-1" v-if="false">
                                 <Checkbox id="binary" v-model="attachReport" :binary="true"/>
                            </div>
                            <div class="col-sm-10">
                                <span>Attach the report as a PDF</span>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-8 form-group" v-if="activeTab === 'sms'">
                        <div class="row">
                            <div class="col-sm-1">
                                 <Checkbox id="binary" v-model="sendCopy" :binary="true"/>
                            </div>
                            <div class="col-sm-10">
                                <span>Send a copy to myself at {{ churchName }}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-sm-12">
                    <hr class="hr">
                </div>
                <!-- <div class="row"> -->
                    <div class="col-md-12 text-right py-2" v-if="invalidDestination">
                        <p class="text-danger mb-0 pr-md-5">Enter at least a destination for the report</p>
                    </div>
                    <div class="col-sm-12 d-flex justify-content-end">
                        <a class="action-btn mx-2 my-1" data-dismiss="modal">Cancel</a>
                        <a class="action-btn mx-2 my-1">Preview</a>
                        <a class="action-btn mx-2 my-1 save-action-btn mr-sm-5" @click="sendReport">Send</a>
                    </div>
                <!-- </div> -->
            </div>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue'
import axios from "@/gateway/backendapi";

    
    export default {
        props: ['eventName'],
        setup(props, { emit }) {
            const activeTab = ref("churchplus");
            // const count = 0;
            const userEmail = ref("")
            const message = ref("")
            const sendToMysef = ref(false);
            const subject = ref(null);
            const invalidDestination = ref(false);
            const recipients = ref([  ])
            const churchName = ref("")
            const sendCopy = ref("")

            const changeTab = (tab) => activeTab.value = tab;

            const addRecipient = () => {
                recipients.value.push({ email: ""})
                console.log(recipients);
            }
            const removeRecipient = (rep) => {
                const recipient = recipients.value.find(i => i.id === rep.id)
                const index = recipients.value.indexOf(recipient);
                recipients.value.splice(index, 1);
                
            }

            const test = (e) => {
                console.log(e.target.value, "bool");
            }

            const hideErrorMessage = () => {
                if (invalidDestination.value) invalidDestination.value = false;
            }

            const event = ref(props.eventName)

            const sendReport = () => {
                const messageObj = {
                    contacts: recipients.value,
                    message: message.value,
                    subject: subject.value.value,
                }

                const validDestination = messageObj.contacts.find(i => i.phone);
                console.log(validDestination, "validDestination");
                if (activeTab.value === "sms" && !validDestination) {
                    invalidDestination.value = true;
                    return false;
                }

                if (sendToMysef.value) {
                    messageObj.contacts.push({ email: userEmail.value });
                }
                emit("sendreport", { data: messageObj, medium: activeTab.value });
            }

            const getUserEmail = () => {
                axios.get("/api/Membership/GetCurrentSignedInUser")
                    .then(res => {
                        console.log(res.data)
                        userEmail.value = res.data.userEmail
                        churchName.value = res.data.churchName
                        recipients.value.push({ email: res.data.userEmail, phone: "" })
                    })
                    .catch(err => console.log(err))
            }
            getUserEmail()

            return { changeTab, activeTab,  recipients, removeRecipient, addRecipient, event, userEmail, getUserEmail, sendReport,
                message,
                sendToMysef,
                subject,
                test,
                invalidDestination,
                hideErrorMessage,
                churchName,
                sendCopy
            }
        }
    }
</script>

<style scoped>
    * {
        color: #1C252C;
        box-sizing: border-box;
        font-weight: 600;
    }

    .action-btn {
        border: 1px solid #DDE2E6;
        border-radius: 20px;
        /* padding: 6px 19px; */
        width: 98px;
        height: 39px;
        display: flex;
        align-items: center;
        justify-content: center;
        text-decoration: none;
    }

    .action-btn:hover {
        cursor: pointer;
    }

    .save-action-btn {
        background: #136ACD;
        color: #fff;
        font-weight: 700;
    }

    .tab-link {
        color: #002044;
        text-decoration: none;
        padding: .6rem;
        opacity: .5;
    }

    .tab-link:hover {
        cursor: pointer;
    }

    .tab-link.active {

        opacity: 1;
        border-bottom: 2px solid  #0F529F;
    }

    .inp {
        height: 40px;
        outline: none;
    }

    .inp-icon {
        font-size: 15px;
        color: #02172E;
        opacity: 0.81;
    }

    .plus-icon {
        color: #136ACD;
    }

    .inp-icon:hover {
        cursor: pointer;
    }

    .edit-sub-btn {
        color:  #136ACD;
        text-decoration: none;
    }

    .form-group {
        margin: 14px 0 0 0 !important;
    }

    .remove-icon:hover {
        color: red;
    }

    .evt-name {
        outline: none !important;
        box-shadow: none;
    }

    @media screen and (max-width: 577px) {
        .label-text,
        .icon-div {
            justify-content: left !important;
        }

        .main-row {
            margin: 20px 0 !important;
        }
    }
</style>