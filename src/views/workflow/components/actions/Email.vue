<template>
    <div class="container max-height scroll-div" v-for="(item, index) in removeOthers" :key="index">
        <div class="row mt-4">
            <div class="col-md-12 px-0">
                <label for="" class="font-weight-600">Email</label>
            </div>
            <div class="col-md-12">
                <div class="row">
                    <div class="col-md-12">
                        <input type="checkbox" name="" id="" v-model="item.person" @change="handleSendPersonMail"> The person
                    </div>
                    <div class="col-md-12">
                        <input type="checkbox" name="" id="" v-model="item.parent" @change="handleSendPersonsParentMail"> The person's parent
                    </div>
                    <div class="col-md-12">
                        <input type="checkbox" name="" id="" v-model="item.spouse" @change="handleSendPersonsSpouseMail"> The person's spouse
                    </div>
                    <div class="col-md-12">
                        <input type="checkbox" name="" id="" v-model="item.groupLeader" @change="handleSendGroupLeaderMail"> The Group Leaders
                    </div>
                </div>
            </div>
        </div>

        <div class="row mt-4">
            <div class="col-md-12 px-0">
                <label for="" class="font-weight-600">Add BBC</label>
            </div>
            <div class="col-md-12">
                <div class="row">
                    <div class="col-md-12">
                        <input type="checkbox" name="" id="" v-model="item.parentBBC" @change="handleParentBBC"> The person's parent
                    </div>
                    <div class="col-md-12">
                        <input type="checkbox" name="" id="" v-model="item.spouseBBC" @change="handleSpouseBBC"> The person's spouse
                    </div>
                    <div class="col-md-12">
                        <input type="checkbox" name="" id="" v-model="item.BCCGroupLeader" @change="handleBCCGroupLeader"> The Group Leaders
                    </div>
                </div>
            </div>
        </div>

        <div class="row mt-4">
            <div class="col-md-12 px-0">
                <label for="" class="font-weight-600">And the following</label>
            </div>
            <div class="col-md-12">
                <input type="text" class="form-control" v-model="item.otherToContacts" @change="handleOtherAddresses">
                <span class="small-text">Separate the addresses with comma</span>
            </div>
        </div>

        <div class="row mt-4">
            <div class="col-md-12 px-0">
                <label for="" class="font-weight-600">Specify email for "Reply To"</label>
            </div>
            <div class="col-md-12">
                <input type="text" class="form-control" v-model="item.replyToEmailAddress" @change="handleReplyEmail">
            </div>
        </div>

        <div class="row mt-4">
            <div class="col-md-12 px-0">
                <label for="" class="font-weight-600">With the following subject</label>
            </div>
            <div class="col-md-12">
                <input type="text" class="form-control" v-model="item.subject" @change="handleSubject">
            </div>
        </div>

        <div class="row mt-4 mb-5">
            <div class="col-md-12 px-0">
                <label for="" class="font-weight-600">And message</label>
            </div>
            <div class="col-md-12">
                <textarea name="" id="" class="w-100" rows="3" v-model="item.message" @change="handleMessage"></textarea>
            </div>
        </div>
    </div>
</template>

<script>
import { reactive, ref } from '@vue/reactivity';
import { watchEffect } from '@vue/runtime-core';
export default {
    props: [ "selectedActionIndex", "parameters", "selectEmailList" ],
    setup (props, { emit }) {
        const data = reactive({ ActionType: 0, JSONActionParameters: { } })
        const person = ref(false);
        const removeOthers = ref([])
        const handleSendPersonMail = () => {
            data.JSONActionParameters.person = removeOthers.value[0].person;
            // data.JSONActionParameters.person = e.target.checked;
            emit('updateaction', data, props.selectedActionIndex);
        }

        const parent = ref(false);
        const handleSendPersonsParentMail = () => {
            data.JSONActionParameters.parent = removeOthers.value[0].parent;
            // data.JSONActionParameters.parent = e.target.checked;
            emit('updateaction', data, props.selectedActionIndex);
        }

        const spouse = ref(false);
        const handleSendPersonsSpouseMail = () => {
            data.JSONActionParameters.spouse = removeOthers.value[0].spouse;
            // data.JSONActionParameters.spouse = e.target.checked;
            emit('updateaction', data, props.selectedActionIndex);
        }

        const groupLeader = ref(false);
        const handleSendGroupLeaderMail = () => {
            data.JSONActionParameters.groupLeader = removeOthers.value[0].groupLeader;
            // data.JSONActionParameters.groupLeader = e.target.checked;
            emit('updateaction', data, props.selectedActionIndex);
        }

        const otherToContacts = ref('');
        const handleOtherAddresses = () => {
            data.JSONActionParameters.otherToContacts = removeOthers.value[0].otherToContacts;
            // data.JSONActionParameters.otherToContacts = e.target.value;
            emit('updateaction', data, props.selectedActionIndex);
        }

        const BCCParent = ref('');
        const handleParentBBC = () => {
            data.JSONActionParameters.BCCParent = removeOthers.value[0].parentBBC;
            // data.JSONActionParameters.BCCParent = e.target.checked;
            emit('updateaction', data, props.selectedActionIndex);
        }

        const BCCSpouse = ref('');
        const handleSpouseBBC = () => {
            data.JSONActionParameters.BCCSpouse = removeOthers.value[0].spouseBBC;
            // data.JSONActionParameters.BCCSpouse = e.target.checked;
            emit('updateaction', data, props.selectedActionIndex);
        }

        const BCCGroupLeader = ref('');
        const handleBCCGroupLeader = () => {
            data.JSONActionParameters.BCCGroupLeader = removeOthers.value[0].BCCGroupLeader;
            // data.JSONActionParameters.BCCGroupLeader = e.target.checked;
            emit('updateaction', data, props.selectedActionIndex);
        }

        const otherBBC = ref('');
        const handleOtherBBC = () => {
            data.JSONActionParameters.otherBBC = removeOthers.value[0].otherBBC;
            // data.JSONActionParameters.otherBBC = e.target.checked;
            emit('updateaction', data, props.selectedActionIndex);
        }

        const sendIndividualMails = ref(false);
        const handleSendIndividualMails = (e) => {
            data.JSONActionParameters.sendIndividualMails = e.target.checked;
            emit('updateaction', data, props.selectedActionIndex);
        }

        const replyToEmailAddress = ref('');
        const handleReplyEmail = () => {
            data.JSONActionParameters.replyToEmailAddress = removeOthers.value[0].replyToEmailAddress;
            // data.JSONActionParameters.replyToEmailAddress = e.target.value;
            emit('updateaction', data, props.selectedActionIndex);
        }

        const subject = ref('');
        const handleSubject = () => {
            data.JSONActionParameters.subject = removeOthers.value[0].subject;
            // data.JSONActionParameters.subject = e.target.value;
            emit('updateaction', data, props.selectedActionIndex);
        }
        const message = ref('');
        const handleMessage = () => {
            data.JSONActionParameters.message = removeOthers.value[0].message;
            // data.JSONActionParameters.message = e.target.value;
            emit('updateaction', data, props.selectedActionIndex);
        }

        const parsedData = ref({ })
        watchEffect(() => {

            if (props.selectEmailList) {
                removeOthers.value = props.selectEmailList.filter((i,index) => {
                    return index == props.selectedActionIndex
                })
            }

            if (props.parameters.Action) {
                const actn = JSON.parse(props.parameters.Action);
                parsedData.value = JSON.parse(actn.JSONActionParameters);

                person.value = parsedData.value.person;
                data.JSONActionParameters.person = parsedData.value.person;

                parent.value = parsedData.value.parent;
                data.JSONActionParameters.parent = parsedData.value.parent;

                spouse.value = parsedData.value.spouse;
                data.JSONActionParameters.spouse = parsedData.value.spouse;

                groupLeader.value = parsedData.value.groupLeader;
                data.JSONActionParameters.groupLeader = parsedData.value.groupLeader;

                otherToContacts.value = parsedData.value.otherToContacts;
                data.JSONActionParameters.otherToContacts = parsedData.value.otherToContacts;

                BCCParent.value = parsedData.value.BCCParent;
                data.JSONActionParameters.BCCParent = parsedData.value.BCCParent;

                BCCSpouse.value = parsedData.value.BCCSpouse;
                data.JSONActionParameters.BCCSpouse = parsedData.value.BCCSpouse;

                BCCGroupLeader.value = parsedData.value.BCCGroupLeader;
                data.JSONActionParameters.BCCGroupLeader = parsedData.value.BCCGroupLeader;

                otherBBC.value = parsedData.value.otherBBC;
                data.JSONActionParameters.otherBBC = parsedData.value.otherBBC;

                sendIndividualMails.value = parsedData.value.sendIndividualMails;
                data.JSONActionParameters.sendIndividualMails = parsedData.value.sendIndividualMails;

                replyToEmailAddress.value = parsedData.value.replyToEmailAddress;
                data.JSONActionParameters.replyToEmailAddress = parsedData.value.replyToEmailAddress;

                subject.value = parsedData.value.subject;
                data.JSONActionParameters.subject = parsedData.value.subject;

                message.value = parsedData.value.message;
                data.JSONActionParameters.message = parsedData.value.message;
            } else if (removeOthers.value && removeOthers.value[0].action && removeOthers.value[0].action.jsonActionParameters) {
            // } else if (props.parameters.action && props.parameters.action.jsonActionParameters) {
                // parsedData.value = JSON.parse(props.parameters.action.jsonActionParameters);
                parsedData.value = JSON.parse(removeOthers.value[0].action.jsonActionParameters);
                
                removeOthers.value[0].person = parsedData.value.person;
                data.JSONActionParameters.person = parsedData.value.person;

                removeOthers.value[0].parent = parsedData.value.parent;
                data.JSONActionParameters.parent = parsedData.value.parent;

                removeOthers.value[0].spouse = parsedData.value.spouse;
                data.JSONActionParameters.spouse = parsedData.value.spouse;

                removeOthers.value[0].groupLeader = parsedData.value.groupLeader;
                data.JSONActionParameters.groupLeader = parsedData.value.groupLeader;

                removeOthers.value[0].otherToContacts = parsedData.value.otherToContacts;
                data.JSONActionParameters.otherToContacts = parsedData.value.otherToContacts;

                removeOthers.value[0].BCCParent = parsedData.value.BCCParent;
                data.JSONActionParameters.BCCParent = parsedData.value.BCCParent;

                removeOthers.value[0].BCCSpouse = parsedData.value.BCCSpouse;
                data.JSONActionParameters.BCCSpouse = parsedData.value.BCCSpouse;

                removeOthers.value[0].BCCGroupLeader = parsedData.value.BCCGroupLeader;
                data.JSONActionParameters.BCCGroupLeader = parsedData.value.BCCGroupLeader;

                removeOthers.value[0].otherBBC = parsedData.value.otherBBC;
                data.JSONActionParameters.otherBBC = parsedData.value.otherBBC;

                removeOthers.value[0].sendIndividualMails = parsedData.value.sendIndividualMails;
                data.JSONActionParameters.sendIndividualMails = parsedData.value.sendIndividualMails;

                removeOthers.value[0].replyToEmailAddress = parsedData.value.replyToEmailAddress;
                data.JSONActionParameters.replyToEmailAddress = parsedData.value.replyToEmailAddress;

                removeOthers.value[0].subject = parsedData.value.subject;
                data.JSONActionParameters.subject = parsedData.value.subject;

                removeOthers.value[0].message = parsedData.value.message;
                data.JSONActionParameters.message = parsedData.value.message;
            }

            
        })

        return {
            person,
            handleSendPersonMail,
            parent,
            handleSendPersonsParentMail,
            spouse,
            groupLeader,
            handleSendGroupLeaderMail,
            handleSendPersonsSpouseMail,
            otherToContacts,
            handleOtherAddresses,
            BCCParent,
            handleParentBBC,
            BCCSpouse,
            handleSpouseBBC,
            handleBCCGroupLeader,
            otherBBC,
            handleOtherBBC,
            BCCGroupLeader,
            sendIndividualMails,
            handleSendIndividualMails,
            replyToEmailAddress,
            handleReplyEmail,
            subject,
            handleSubject,
            message,
            handleMessage,
            removeOthers
        }
    }
}
</script>

<style scoped>
    .max-height {
        max-height: calc(100vh - 300px);
        overflow-y: scroll;
    }
</style>