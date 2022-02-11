<template>
<div class="row" v-if="loader">
    <div class="col-12">
       <div class="col-12 card-bg p-3 py-4">
            <div class="row">
                <div class="col-12">
                    <Skeleton width="100%" height="1rem" borderRadius="16px" />
                </div>
            </div>
            <div class="row mt-3">
                <div class="col-12">
                    <Skeleton width="100%" height="1rem" borderRadius="16px" />
                </div>
            </div>
       </div>
    </div>
</div>
    <div class="row" v-for="(item, index) in activities" :key="index">
        <div class="col-12">
            <div class="row mt-4">
                <div class="col-12 date-style">{{ item.name }}</div>
            </div>
            <div class="row" v-for="(item, indx) in item.value" :key="indx">
 
                <div class="col-12 mt-4" v-if="item.type === 96">
                <!-- Card for Notes -->
                    <div class="col-12 card-bg p-4">
                        <div class="row d-flex justify-content-between">
                            <div>
                                <div class="col align-self-center font-weight-700">Note</div>
                            </div>
                            <div>
                                <div class="col text-right"><span class="small-text">{{ formatDate(item.date) }} {{ item.time }}</span></div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col mt-4 enlargen-font">{{ item.description }}</div>
                        </div>
                        <div class="text-right c-pointer"><i class="pi pi-trash" @click="showConfirmModal(item, index, indx)"></i></div>
                        <transition name="fade">
                            <div class="row mt-4" v-if="item.noteIcon">
                                <div class="col font-weight-700 uniform-primary-color">Add Comment</div>
                                <div class="col text-right font-weight-700 uniform-primary-color">1 Association</div>
                            </div>
                        </transition>
                    </div>
                </div>


            <!-- Card for tasks (visit/sms) -->
            <div class="col-12 mt-4 " v-if="(item.type === 87 || item.type === 88 || item.type === 90 || item.type === 91 || item.type === 92) && item.loggedTask">
                <div class="col-12 card-bg p-4 shadow-overlay">
                <div class="row d-flex justify-content-between">
                    <div>
                        <div class="col align-self-center"><span class="font-weight-700 c-pointer"><i class="pi pi-angle-up uniform-primary-color" :class="{'roll-note-icon' : item.taskIcon, 'unroll-note-icon' : !item.taskIcon}" @click="toggleTaskIcon(index, indx)"></i>&nbsp;&nbsp;{{ item.selectedActivity && Object.keys(item.selectedActivity).length > 0 ? item.selectedActivity.value : item.loggedTask && item.loggedTask.type && activityType.find(i => i.id === item.loggedTask.type) ? activityType.find(i => i.id === item.loggedTask.type).value : item.typeText }} {{ item.person ? 'task' : 'logged' }}</span> {{ item.person ? `assigned to ` : '' }} <span class="font-weight-700">{{ item.person ? item.person : "" }}</span></div>
                        
                    </div>
                    <div>
                        <div class="col text-right"><span class="small-text">{{ formatDate(item.date) }} {{ item.time }}</span></div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-12 mt-4 enlargen-font d-flex" v-if="!item.taskIcon">
                        <div class="checked-first" v-if="item.loggedTask.status == 2"><i class="pi pi-check text-white adjust-icon"></i></div>
                        <div class="checked-inprogress" v-if="item.loggedTask.status == 1"></div>
                        <div class="checked-pending" v-if="item.loggedTask.status == 0"></div>
                        <div class="checked-cancel" v-if="item.loggedTask.status == 3"></div>
                         <div>{{ item.loggedTask ? item.loggedTask.instructions : "Create your task" }} </div>
                    </div>
                    <div class="col-12">
                        <transition name="fade">
                            <div class="row mt-4" v-if="item.taskIcon">
                                <div class="col-1 align-self-center">
                                    <div class="checked" v-if="item.loggedTask.status == 2"><i class="pi pi-check text-white"></i></div>
                                </div>
                            <div class="col-11 p-2 d-flex task-border justify-content-between" :class="{ 'hover-border' : item.hoverTask }" @mouseover="onHoverBorderTask(index, indx)" @mouseleave="outHoverBorderTask(index, indx)" v-if="!item.editTask" @click="toggleEditTask(index, indx)">
                                <div v-if="!item.loggedTask.instructions">Create a task here</div>
                                <div v-else>{{ item.loggedTask.instructions }}</div>
                                <div><i class="pi pi-pencil" :class="{ 'uniform-primary-color' : item.hoverTask, 'text-white' : !item.hoverTask }"></i></div>
                            </div>
                            <input type="text" class="form-control col-10" v-model="item.loggedTask.instructions" v-if="item.editTask" @blur="saveTask(index, indx)"/>
                            <div class="col-12">
                                <hr />
                            </div>
                            <div class="col-4 col-md-8 label-text mt-3">Due date</div>

                            <div class="col-4 col-md-4 label-text mt-3 d-none d-md-block">Set status</div>

                            <div class="col-8 col-md-12 d-block d-md-none mt-3">
                                <div @click="toggleDueDate" aria:haspopup="true" aria-controls="overlay_panel" class="uniform-primary-color font-weight-700 c-pointer">
                                     {{ item.selectedDueDate && Object.keys(item.selectedDueDate).length > 0 ? item.selectedDueDate.name : getDueDate(item.loggedTask.dueDate) }}&nbsp; <i class="pi pi-sort-down"></i>
                                </div>
                                <OverlayPanel ref="dueDateOp" appendTo="body" :showCloseIcon="false" id="overlay_panel" :breakpoints="{'960px': '75vw'}">
                                    <div class="container-fluid p-0">
                                        <div class="row hover-log" v-for="(item, dueDateIndex) in dueDate" :key="dueDateIndex">
                                            <div class="py-2 px-3" @click="setDueDate(index, indx, item)">{{ item.name }}</div>
                                        </div>
                                    </div>
                                </OverlayPanel>
                            </div>

                            <div class="col-md-8 mt-2 d-none d-md-block mb-4">
                                <div @click="toggleDueDate" aria:haspopup="true" aria-controls="overlay_panel" class="uniform-primary-color font-weight-700 c-pointer">
                                     {{ item.selectedDueDate && Object.keys(item.selectedDueDate).length > 0 ? item.selectedDueDate.name : getDueDate(item.loggedTask.dueDate) }}&nbsp; <i class="pi pi-sort-down"></i>
                                </div>
                                <OverlayPanel ref="dueDateOp" appendTo="body" :showCloseIcon="false" id="overlay_panel" :breakpoints="{'960px': '75vw'}">
                                    <div class="container-fluid p-0">
                                        <div class="row hover-log" v-for="(item, dueDateIndex) in dueDate" :key="dueDateIndex">
                                            <div class="py-2 px-3" @click="setDueDate(index, indx, item)">{{ item.name }}</div>
                                        </div>
                                    </div>
                                </OverlayPanel>
                            </div>

                            

                            <div class="col-md-4 mt-2 d-none d-md-block mb-4">
                                <div @click="toggleTaskStatus" aria:haspopup="true" aria-controls="overlay_panel" class="uniform-primary-color font-weight-700 c-pointer">
                                     {{ selectedTask && selectedTask.name ? selectedTask.name : statuses.find(j => j.value == item.loggedTask.status).name }}&nbsp; <i class="pi pi-sort-down"></i>
                                </div>
                                <OverlayPanel ref="taskStatusOp" appendTo="body" :showCloseIcon="false" id="overlay_panel" :breakpoints="{'960px': '75vw'}">
                                    <div class="container-fluid p-0">
                                        <div class="row hover-log" v-for="(taskItem, taskStatusIndex) in statuses" :key="taskStatusIndex">
                                            <div class="py-2 px-3" @click="setTaskStatus(taskItem, item.loggedTask)">{{ taskItem.name }}</div>
                                        </div>
                                    </div>
                                </OverlayPanel>
                            </div>
                   
                            <div class="col-4 label-text mt-3 mt-md-0">Type</div>

                            <div class="col-8 d-block d-md-none mt-3 mt-md-0">
                                <div @click="toggleTodo" aria:haspopup="true" aria-controls="overlay_panel" class="uniform-primary-color font-weight-700 c-pointer">
                                    {{ item.selectedActivity && Object.keys(item.selectedActivity).length > 0 ? item.selectedActivity.value : item.loggedTask && item.loggedTask.type ? activityType.find(i => i.id === item.loggedTask.type).value : "" }}&nbsp; <i class="pi pi-sort-down"></i>
                                </div>
                                <OverlayPanel ref="todoOp" appendTo="body" :showCloseIcon="false" id="overlay_panel" :breakpoints="{'960px': '75vw'}">
                                    <div class="container-fluid p-0">
                                        <div class="row hover-log" v-for="(item, todoIndex) in activityType" :key="todoIndex">
                                            <div class="py-2 px-3" @click="resetActivityType(todoIndex, index, indx)">{{ item.value }}</div>
                                        </div>
                                    </div>
                                </OverlayPanel>
                            </div>

                            <div class="col-4 label-text mt-3 mt-md-0">Priority</div>

                            <div class="col-8 d-block d-md-none mt-3 mt-md-0">
                                <div @click="togglePriority" aria:haspopup="true" aria-controls="overlay_panel" class="uniform-primary-color font-weight-700 c-pointer">
                                    {{ item.selectedPriority ? item.selectedPriority.name : taskPriority.find(i => i.id === item.loggedTask.priority).name }}&nbsp; <i class="pi pi-sort-down"></i>
                                </div>
                                <OverlayPanel ref="priorityOp" appendTo="body" :showCloseIcon="false" id="overlay_panel" :breakpoints="{'960px': '75vw'}">
                                    <div class="container-fluid p-0">
                                        <div class="row hover-log" v-for="(item, priorityIndex) in taskPriority" :key="priorityIndex">
                                            <div class="py-2 px-3" @click="resetPriority(priorityIndex, index, indx)">{{ item.name }}</div>
                                        </div>
                                    </div>
                                </OverlayPanel>
                            </div>

                            <div class="col-4 label-text mt-3 mt-md-0">Assigned to</div>

                            <div class="col-8 d-block d-md-none mt-3 mt-md-0">
                                <div @click="toggleContact" aria:haspopup="true" aria-controls="overlay_panel" class="uniform-primary-color font-weight-700 c-pointer">
                                    {{ item.selectedContact ? `${item.selectedContact.name}` : item.person }}&nbsp; <i class="pi pi-sort-down"></i>
                                </div>
                                <OverlayPanel ref="contactOp" appendTo="body" :showCloseIcon="false" id="overlay_panel" :breakpoints="{'960px': '75vw'}" class="p-0">
                                    <div class="container-fluid p-0">
                                        <div class="py-2 px-3">Search whom you want to assign this task</div>
                                        <div class="py-2 px-3">
                                            <SearchMember @memberdetail="chooseContact($event, index, indx)"/>
                                        </div>
                                    </div>
                                </OverlayPanel>
                            </div>
                            
                            <div class="col-4 label-text mt-3 mt-md-0 d-block d-md-none">Set status</div>

                            <div class="col-8 d-block d-md-none mt-3 mt-md-0">
                                <div @click="toggleTaskStatus" aria:haspopup="true" aria-controls="overlay_panel" class="uniform-primary-color font-weight-700 c-pointer">
                                     {{ selectedTask && selectedTask.name ? selectedTask.name : statuses.find(j => j.value == item.loggedTask.status).name }}&nbsp; <i class="pi pi-sort-down"></i>
                                </div>
                                <OverlayPanel ref="taskStatusOp" appendTo="body" :showCloseIcon="false" id="overlay_panel" :breakpoints="{'960px': '75vw'}">
                                    <div class="container-fluid p-0">
                                        <div class="row hover-log" v-for="(taskItem, taskStatusIndex) in statuses" :key="taskStatusIndex">
                                            <div class="py-2 px-3" @click="setTaskStatus(taskItem, item.loggedTask)">{{ taskItem.name }}</div>
                                        </div>
                                    </div>
                                </OverlayPanel>
                            </div>

                            <div class="col-4 mt-2 d-none d-md-block">
                                <div @click="toggleTodo" aria:haspopup="true" aria-controls="overlay_panel" class="uniform-primary-color font-weight-700 c-pointer">
                                    {{ item.selectedActivity && Object.keys(item.selectedActivity).length > 0 ? item.selectedActivity.value : item.loggedTask && item.loggedTask.type ? activityType.find(i => i.id === item.loggedTask.type).value : "" }}&nbsp; <i class="pi pi-sort-down"></i>
                                </div>
                                <OverlayPanel ref="todoOp" appendTo="body" :showCloseIcon="false" id="overlay_panel" :breakpoints="{'960px': '75vw'}">
                                    <div class="container-fluid p-0">
                                        <div class="row hover-log" v-for="(item, todoIndex) in activityType" :key="todoIndex">
                                            <div class="py-2 px-3" @click="resetActivityType(todoIndex, index, indx)">{{ item.value }}</div>
                                        </div>
                                    </div>
                                </OverlayPanel>
                            </div>
                            <div class="col-4 mt-2 d-none d-md-block">
                                <div @click="togglePriority" aria:haspopup="true" aria-controls="overlay_panel" class="uniform-primary-color font-weight-700 c-pointer">
                                    {{ item.selectedPriority ? item.selectedPriority.name : taskPriority.find(i => i.id === item.loggedTask.priority).name }}&nbsp; <i class="pi pi-sort-down"></i>
                                </div>
                                <OverlayPanel ref="priorityOp" appendTo="body" :showCloseIcon="false" id="overlay_panel" :breakpoints="{'960px': '75vw'}">
                                    <div class="container-fluid p-0">
                                        <div class="row hover-log" v-for="(item, priorityIndex) in taskPriority" :key="priorityIndex">
                                            <div class="py-2 px-3" @click="resetPriority(priorityIndex, index, indx)">{{ item.name }}</div>
                                        </div>
                                    </div>
                                </OverlayPanel>
                            </div>
                            <div class="col-4 mt-2 d-none d-md-block">
                                <div @click="toggleContact" aria:haspopup="true" aria-controls="overlay_panel" class="uniform-primary-color font-weight-700 c-pointer">
                                    {{ item.selectedContact ? `${item.selectedContact.name}` : item.person }}&nbsp; <i class="pi pi-sort-down"></i>
                                </div>
                                <OverlayPanel ref="contactOp" appendTo="body" :showCloseIcon="false" id="overlay_panel" :breakpoints="{'960px': '75vw'}" class="p-0">
                                    <div class="container-fluid p-0">
                                        <div class="py-2 px-3">Search whom you want to assign this task</div>
                                        <div class="py-2 px-3">
                                            <SearchMember @memberdetail="chooseContact($event, index, indx)"/>
                                        </div>
                                    </div>
                                </OverlayPanel>
                            </div>

                            <div class="col-12">
                                    <!-- <div class="col-12 p-2 d-flex task-border justify-content-between mt-4" :class="{ 'hover-border' : item.hoverTask2 }" @mouseover="onHoverBorderTask2(index)" @mouseleave="outHoverBorderTask2(index)" v-if="!item.editTask2" @click="toggleEditTask2(index)">
                              
                                <div><i class="pi pi-pencil" :class="{ 'uniform-primary-color' : hoverTask2, 'text-white' : !hoverTask2 }"></i></div>
                            </div> -->
                            <textarea class="form-control col-12 mt-3" rows="4" v-model="item.loggedTask.note"></textarea>
                            <div class="d-flex justify-content-start">
                                <div class="p-2 col-2 mt-3 save-btn btn-btn c-pointer" @click="editTask(index, indx)" >Save</div>
                            <div class="cancel-btn btn-btn col-2 ml-3 p-2 mt-3 c-pointer" @click="cancelTaskEdit2">Cancel</div>
                            </div>
                            </div>
                        </div>
                        </transition>
                    </div>
                </div>
                <div class="text-right"><i class="pi pi-trash c-pointer" @click="showConfirmModal(item, index, indx)"></i></div>
            <transition name="fade">
                <div class="container" v-if="item.taskIcon">
                    <div class="row mt-4" v-show="!displayComment">
                        <div class="col font-weight-700 c-pointer" @click="toggleDisplayComment">Add Comment</div>
                        <!-- <div class="col text-right font-weight-700 c-pointer">1 Association</div> -->
                    </div>
                    <div class="row" v-if="displayComment">
                        <div class="col-12 mt-4">
                            <div class="row comment-bg border py-3 mt-2" v-for="(comment, indexx) in item.loggedTask.comments" :key="indexx">
                                <div class="col-2">
                                    <img src="../../../../assets/checkin-assets/Icon-ionic-ios-person.svg"  class="user-img"/>
                                </div>
                                <div class="col-10">
                                    <div class="row">
                                        <div class="col-8"><strong>{{ comment.personName }}</strong> left a comment</div>
                                        <div class="col-3 small-text">{{ formatDate(comment.date) }}</div>
                                        <div class="dropdown col-1">
                                            <i
                                            class="fas fa-ellipsis-v cursor-pointer alignLeft"
                                            id="dropdownMenuButton"
                                            data-toggle="dropdown"
                                            aria-haspopup="true"
                                            aria-expanded="false"
                                            ></i>
                                            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                <a class="dropdown-item elipsis-items c-pointer" @click="setToEditComment(comment, index, indx, indexx)">
                                                   Edit 
                                                </a>
                                                <a class="dropdown-item elipsis-items c-pointer" @click="deleteComment(comment.id, index, indx, indexx)">
                                                   Delete 
                                                </a>
                                            </div>
                                        </div>
                                        <div class="col-12 mt-2">{{ comment.message }}</div>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                
                            </div>
                        </div>
                        <div class="col-12 px-0 mt-3">
                            <textarea class="form-control comment-bg" rows="7" placeholder="Write a comment..." v-model="taskComment" ref="taskCommentRef"></textarea>
                        </div>
                        <div class="p-2 col-2 mt-3 save-btn btn-btn c-pointer" @click="postComment(item, index, indx)">Post</div>
                        <div class="cancel-btn btn-btn col-2 ml-3 p-2 mt-3 c-pointer" @click="() => displayComment = false">Cancel</div>
                    </div>
                </div>
            </transition>
            </div>
            </div>


            <!-- Card for Call and Email Logs -->

            <div class="col-12 mt-4" v-if="(item.type === 87 || item.type === 88 || item.type === 90 || item.type === 91 || item.type === 92) && !item.loggedTask">
                <div class="col-12 card-bg p-4">
                    <div class="row d-flex justify-content-between">
                        <div>
                            <div class="col align-self-center"><span class="font-weight-700 c-pointer"><i class="pi pi-angle-up uniform-primary-color" :class="{'roll-note-icon' : item.logIcon, 'unroll-note-icon' : !item.logIcon}" @click="toggleLogIcon(index, indx)"></i>&nbsp;&nbsp;{{ item.person ? `${item.typeText} task assigned to` : `${item.typeText} logged` }}</span> {{ item.person }} </div>
                        </div>
                        <div>
                            <div class="col text-right"><span class="ml-2 small-text">{{ formatDate(item.date) }} {{ item.time }}</span></div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-12 mt-4 enlargen-font"  :class="{ 'hover-border' : item.hoverLog, 'log-border' : !item.hoverLog }" v-if="!item.editLog">
                            <div>{{ condenseEmailText(item.description) }}</div>
                        </div>

                        <!-- <textarea v-model="item.description" class="form-control col-12 mt-4" v-if="item.editLog" rows="5"></textarea>
                        <div class="p-2 col-2 mt-3 save-btn btn-btn pointer-cursor" @click="saveLogDesc" v-if="item.editLog">Save</div>
                        <div class="cancel-btn btn-btn col-2 ml-3 p-2 mt-3" v-if="item.editLog" @click="cancelTaskEdit">Cancel</div> -->
                    </div>
                    <div class="text-right c-pointer"><i class="pi pi-trash" @click="showConfirmModal(item, index, indx)"></i></div>
                    <transition name="fade">
                        <div class="row" v-if="item.logIcon">
                            <div class="col-12">
                                <hr />
                            </div>
                                <div class="col-6">
                                    <div class="label-text">Contacted</div>
                                    <div class="uniform-primary-color font-weight-700 mt-1 c-pointer">{{ `${personDetails.firstName} ${personDetails.lastName}` }}</div>
                                </div>
                                <div class="col-6">
                                    <div class="label-text">{{ item.typeText }} Outcome</div>
                                    <div class="mt-1 uniform-primary-color font-weight-700 c-pointer">{{ item.outcomeText }}</div>
                                </div>
                        </div>
                    </transition>
                </div>
            </div>
            
            <!-- Log for contactowner, lifecycle, leadstatus -->
            <transition name="fade">
                <div class="col-12 mt-4" v-if="item.type === 93 || item.type === 94 || item.type === 95">
                    <div class="col-12 card-bg lifecycle-bg p-4 " :style="`background: ${item.type === 94 ? item.color : 'white'}`">
                        <div class="row d-flex justify-content-between">
                            
                                <div class="col-12 col-md-6 align-self-center"><span class="font-weight-700">{{ item.type === 94 ? "Lifecycle changed" : item.type === 95 ? "Lead status changed" : "Contact's owner changed" }}</span><span class="font-weight-700 uniform-primary-color"></span></div>
                                <div class="col-12 col-md-6 text-md-right"><span class="small-text">{{ formatDate(item.date) }} {{ item.time }}</span>
                            </div>
                        </div>
                        <div class="row mt-2">
                            <div class="col-12 enlargen-font">
                                {{ item.description }}
                            </div>
                        </div>
                    
                    </div>
                </div>
            </transition>

        </div>
        </div>
    </div>
    <div class="row" v-if="activities.length === 0 && !loader" >
        <div class="col-12 mt-3 no-activity">
            You have not performed any activities yet
        </div>
    </div>
    <ConfirmDialog />
</template>


<script>
import { ref } from "vue"
import Dropdown from "primevue/dropdown";
import dateFormatter from '../../../../services/dates/dateformatter';
import frmservice from "@/services/FRM/firsttimermanagement";
import { useRoute } from "vue-router"
import SearchMember from "../../../../components/membership/MembersSearch.vue"
import { useToast } from "primevue/usetoast";
import axios from "@/gateway/backendapi";
import { useConfirm } from "primevue/useConfirm";
export default {
    components: {
        Dropdown,
        SearchMember
    },
    props: ['personDetails', 'addNotes', 'addTask', 'dueDate', 'activities', 'loader', 'getReminder', 'activityType', 'taskPriority'],
    emits: ['individualtoggle', 'individualtoggletask', 'individualcallicon', 'edittask', 'edittask2', 'savetask', 'hovertask', 'outhovertask', "commentindex", "removecommetfromview", "editcommentinview", "setduedate", "removelog"],
    setup(props, { emit }) {
        const route = useRoute()
        const toast = useToast()
        const noteIcon = ref(false)
        const taskIcon = ref(false)
        // const meetIcon = ref(false)
        const selectedTaskTime = ref("")
        // const theTask = ref("")
        // const hoverTask = ref(false)
        const dueDateOp = ref()
        const reminderOp = ref()
        const todoOp = ref()
        const priorityOp = ref()
        const contactOp = ref()
        const taskStatusOp = ref()
        const displayComment = ref(false)
        const taskComment = ref("")
        const editCommentVar = ref(false)
        const commentId = ref("")
        const commentIndexToEdit = ref({})
        const taskCommentRef = ref()
        const selectedTask = ref({})
        const statuses = ref([ { name: 'Pending', value: 0 }, { name: 'InProgress', value: 1 }, { name: 'Completed', value: 2 }, { name: 'Cancelled', value: 3 }, { name: 'Rescheduled', value: 4 }, { name: 'Stalled', value: 5 } ])

        const toggleNoteIcon = (index) => {
            emit('individualtoggle', index)
        }
        
        const toggleTaskIcon = (index, indx) => {
            let indexes = {
                parentIndex: index,
                mainIndex: indx
            }
            emit("individualtoggletask", indexes)
        }
        
        const toggleEditTask = (index, indx) => {
            // editTask.value = true
            let indexes = {
                parentIndex: index,
                mainIndex: indx
            }
            emit('edittask', indexes)
        }
        
        const toggleEditTask2 = (index) => {

            emit('edittask2', index)
        }

        const onHoverBorderTask = (index, indx) => {
            let indexes = {
                parentIndex: index,
                mainIndex: indx
            }
            emit('hovertask', indexes)
        }
        
        const outHoverBorderTask = (index, indx) => {
            let indexes = {
                parentIndex: index,
                mainIndex: indx
            }
            emit('outhovertask', indexes)
        }
        

        const saveTask = (index, indx) => {
            // editTask.value = false
            // hoverTask.value = false
            let indexes = {
                parentIndex: index,
                mainIndex: indx
            }
            emit('savetask', indexes)
            editTask(index, indx)
        }
        
        const cancelTaskEdit = () => {
            // editTask.value = false
        }
        
        const cancelTaskEdit2 = () => {
            editTask2.value = false
        }
         
        const toggleDueDate = (event) => {
            dueDateOp.value.toggle(event);
        };
        
        const toggleReminder = (event) => {
            reminderOp.value.toggle(event);
        };
        
        const toggleTodo = (event) => {
            todoOp.value.toggle(event);
        };
        
        const togglePriority = (event) => {
            priorityOp.value.toggle(event);
        };
        
        const toggleContact = (event) => {
            contactOp.value.toggle(event);
        };
        
        const toggleTaskStatus = (event) => {
            taskStatusOp.value.toggle(event);
        };

        const toggleLogIcon = (index, indx) => {
            let indexes = {
                parentIndex: index,
                mainIndex: indx
            }
            emit('individualcallicon', indexes)
            console.log(indexes)
        }

        const formatDate = (date) => {
            return dateFormatter.monthDayYear(date)
        }

        const condenseEmailText = (text) => {
            if (text !== null) {
                if (text.toLowerCase().includes('<!doctype')) {
                    return 'Email sent successfully.'
                }   else {
                    return text
                }
            }
        }

        const toggleDisplayComment = () => {
            displayComment.value = true
        }

        const postComment = async(task, index, indx) => {  
            console.log(editCommentVar.value)
            if (editCommentVar.value) {
                editComment()
                editCommentVar.value = false
            }   else {
                let body = {
                    comment: taskComment.value,
                    taskID:task.id
                    // userEmail: 435
                }
                try {
                    let res = await frmservice.comment(task.loggedTask.id, body)
                    console.log(res)
                    let indexes = {
                        parentIndex: index,
                        mainIndex: indx,
                        body: res.returnObject
                    }
                    emit("commentindex", indexes)
                    taskComment.value = ""
                }
                catch (err) {
                    console.log(err)
                }
            }
        }

        const deleteComment = async(id, index, indx, indexx) => {
            try {
                let res = await frmservice.deleteComment(id)
                let body = {
                    parentIndex: index,
                    mainIndex: indx,
                    index: indexx
                }
                emit("removecommetfromview", body)
                console.log(res)
            }
            catch (err) {
                console.log(err)
            }
        }
       
       const setToEditComment = (comment, index, indx, indexx) => {
           console.log(comment)
           editCommentVar.value = true
           commentId.value = comment.id
           taskComment.value = comment.message
           let body = {
                parentIndex: index,
                mainIndex: indx,
                index: indexx
            }
            commentIndexToEdit.value = body
            taskCommentRef.value.focus()
        }

        const editComment = async() => {
            console.log(commentId.value)
            let payload = {
               comment: taskComment.value
           }
            try {
                let res = await frmservice.editComment(commentId.value, payload)
                commentIndexToEdit.value.body = res.returnObject
                console.log(commentIndexToEdit.value)
                emit("editcommentinview", commentIndexToEdit.value)
                taskComment.value = ""
                console.log(res)
            }
            catch (err) {
                console.log(err)
            }
        }

        const getDueDate = (date) => {
             return frmservice.dueDate().find(i => new Date(i.value).toDateString() == new Date(date).toDateString()) ? frmservice.dueDate().find(i => new Date(i.value).toDateString() == new Date(date).toDateString()).name : "Select due date"
        }
        
        const reminders = () => {
             console.log(props.getReminder)
        }

        const resetActivityType = (todoIndex, index, indx) => {
            console.log(todoIndex, index)
            props.activities[index].value[indx].selectedActivity = props.activityType[todoIndex]
            todoOp.value.hide();
        }

        const resetPriority = (priorityIndex, index, indx) => {
            props.activities[index].value[indx].selectedPriority = props.taskPriority[priorityIndex]
            priorityOp.value.hide();
        }

        const chooseContact = (payload, index, indx) => {
            props.activities[index].value[indx].selectedContact = payload
            contactOp.value.hide()
        }

        const editTask = async(index, indx) => {
            console.log(props.activities[index].value[indx])

            let body = {
                id: props.activities[index].value[indx].loggedTask.id,
                instructions: props.activities[index].value[indx].loggedTask.instructions,
                reminder: props.activities[index].value[indx].loggedTask.reminder, // Still hard coded
                dueDate: props.activities[index].value[indx].selectedDueDate ? props.activities[index].value[indx].selectedDueDate.value : props.activities[index].value[indx].loggedTask.dueDate,
                note: props.activities[index].value[indx].loggedTask.note,
                type: props.activities[index].value[indx].selectedActivity ? props.activities[index].value[indx].selectedActivity.id : props.activities[index].value[indx].type,
                priority: props.activities[index].value[indx].selectedPriority ? props.activities[index].value[indx].selectedPriority.id : props.activities[index].value[indx].loggedTask.priority,
                personID: props.activities[index].value[indx].selectedContact ? props.activities[index].value[indx].selectedContact.id : props.activities[index].value[indx].loggedTask.personID,
                contacts: route.params.personId
                }
                console.log(body)

                try {
                    const res = await frmservice.editTask(props.activities[index].value[indx].loggedTask.id, body)
                    console.log(res)
                    toast.add({
                        severity: "success",
                        summary: "Success",
                        detail: "Task updated successfully",
                        life: 5000,
                    });
                }
                catch (err) {
                    console.log(err)
                }
        }

        const setDueDate = (index, indx, item) => {
            let body = {
                parentIndex: index,
                mainIndex: indx,
                body: item
            }
            console.log(body)
            emit("setduedate", body)
            dueDateOp.value.hide();
        }

        const setTaskStatus = async(item, task) => {
            selectedTask.value = item
            taskStatusOp.value.hide()
       
            const body = {
                id: task.id,
                instructions: task.instructions,
                dateCreated: task.dateCreated,
                dateUpdated: task.dateCreated,
                reminder: task.reminder,
                dueDate: task.dueDate,
                note: task.note,
                type: task.type,
                priority: task.priority,
                personID: task.personID,
                contacts: task.contacts,
                status: item.value
                }

            try {
                const res = await frmservice.editTask(task.id, body)
                console.log(res)
                toast.add({
                    severity: "success",
                    summary: "Status updated",
                    detail: "Status updated successfully",
                    life: 5000,
                });
            }
            catch (err) {
                console.log(err)
            }
        }

        const deleteLog = async(item, index, indx) => {
            try {
                const res = await axios.delete(`/api/FirsttimerManager/activity/log/${item.id}`)
                console.log(res)
                let body = {
                    parentIndex: index,
                    childIndex: indx
                }
                emit("removelog", body)
                toast.add({
                    severity: "success",
                    summary: "Success",
                    detail: "Deleted successfully",
                    life: 5000,
                });
            }
            catch (err) {
                console.log(err)
            }
        }

        const confirm = useConfirm();
         const showConfirmModal = (item, index, indx) => {
            confirm.require({
            message: "Are you sure you want to proceed?",
            header: "Confirmation",
            icon: "pi pi-exclamation-triangle",
            acceptClass: "confirm-delete",
            rejectClass: "cancel-delete",
            accept: () => {
                deleteLog(item, index, indx);
            },
            reject: () => {
                toast.add({
                severity: "info",
                summary: "Rejected",
                detail: "You have rejected",
                life: 3000,
                });
            },
            });
        };
        

    
        return {
            noteIcon,
            toggleNoteIcon,
            taskIcon,
            toggleTaskIcon,
            selectedTaskTime,
            toggleEditTask,
            toggleEditTask2,
            // theTask,
            saveTask,
            onHoverBorderTask,
            // hoverTask,
            outHoverBorderTask,
            cancelTaskEdit,
            cancelTaskEdit2,
            toggleLogIcon,
            formatDate,
            condenseEmailText,
            dueDateOp,
            reminderOp,
            todoOp,
            priorityOp,
            contactOp,
            toggleDueDate,
            toggleReminder,
            toggleTodo,
            togglePriority,
            toggleContact,
            displayComment,
            toggleDisplayComment,
            postComment,
            taskComment,
            deleteComment,
            editComment,
            editCommentVar,
            setToEditComment,
            commentId,
            commentIndexToEdit,
            taskCommentRef,
            getDueDate,
            resetActivityType,
            resetPriority,
            chooseContact,
            editTask,
            reminders,
            setDueDate,
            selectedTask,
            statuses,
            taskStatusOp,
            toggleTaskStatus,
            setTaskStatus,
            deleteLog,
            showConfirmModal
        }
    }
}
</script>

<style scoped>
.activity-date {
    font-size: 23px;
}

.card-bg {
    background-color: rgb(255, 255, 255);
    box-shadow: rgb(45 62 80 / 12%) 0px 1px 5px 0px;
    border-radius: 8px;
}

.roll-note-icon {
    transition: all 0.5s ease-in-out;
    transform: rotateZ(180deg);
}
.unroll-note-icon {
    transition: all 0.5s ease-in-out;
    transform: rotateZ(90deg);
}

.fade {
    transition: all 0.5s ease-in-out;
    opacity: 0;
}
.fade-enter-active {
  animation: fade-in .3s;
}
.fade-leave-active {
  animation: fade-in .3s reverse;
}
@keyframes fade-in {
  0% {
    transform: translateY(-30px);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }

}

.checked {
    width: 25px;
    height: 25px;
    background-color: rgb(0, 189, 165);
    border: 2px solid rgb(0, 189, 165);
    border-radius: 50%;
    text-align: center
}

.checked-first {
    width: 25px;
    height: 25px;
    background-color: rgb(0, 189, 165);
    border-radius: 50%;
    margin-right: 20px;
}

.checked-inprogress {
    width: 25px;
    height: 25px;
    background-color: rgb(213, 206, 3);
    border-radius: 50%;
    margin-right: 20px;
}

.checked-pending {
    width: 25px;
    height: 25px;
    background-color: rgb(211, 145, 3);
    border-radius: 50%;
    margin-right: 20px;
}

.checked-cancel {
    width: 25px;
    height: 25px;
    background-color: rgb(189, 19, 0);
    border-radius: 50%;
    margin-right: 20px;
}

.adjust-icon {
    position: relative;
    top: -3px;
    left: 4px;
}

.task-border {
    border: 2px solid white;
    border-radius: 3px;
}
.hover-border {
    border: 2px solid #1269cea6;
    border-radius: 3px;
}

.uniform-primary-color {
    color: #136acd
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

.label-text {
    color: #506e91;
    font-size: 0.9em;
}

.enlargen-font {
    font-size: 1.2em
}

.no-activity {
    font-size: 1.1em;
    font-weight: 500;
    color: rgb(156, 156, 156);
}

.date-style {
    color: rgb(51, 71, 91);
    font-size: 19px
}

.lifecycle-card {
    /* border-right: 4px solid #0a75cc;
    border-left: 4px solid #0a75cc; */
    background: #88ff001e
}

.comment-bg {
    background: #fef8f0;
}

.hover-log:hover {
    background: rgba(202, 202, 202, 0.356);
    cursor: pointer
}

.make-scrollable {
    height: 800px;
    overflow: scroll;
    margin-top: 100px
}

.user-img {
    border-radius: 50%;
    width: 35px;
    height: 35px;
    background: #eee;
}
/* 
.shadow-overlay {
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
} */

/* .shadow-overlay {
    overflow: hidden;
    position: relative;
    transition: all 3s ease-in-out
}

.shadow-overlay > div {
    position: relative;
    z-index: 0;
    inset: 0;
    width: 130;
    height: 130px;
    object-fit: cover;
    transition: all 3s ease-in-out
}

.shadow-overlay::before,
.shadow-overlay::after {
    content: '';
    position: absolute;
    inset: 0;
    transition: all 3s ease-in-out
}

.shadow-overlay:before {
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
    
}

.shadow-overlay:hover:before {
    opacity: .6;
} */

</style>