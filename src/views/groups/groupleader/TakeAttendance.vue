<template>
   <div class="container container-top">
        <div class="row d-flex justify-content-center justify-content-sm-between">
          <div class="col-12 col-sm-6 page-header">Mark attendance</div>
          <div class="default-btn mt-3 mt-sm-0 c-pointer" data-toggle="modal" data-target="#addMemberModal" ref="modalBtn">Add member</div>
        </div>
        <div class="row mt-5 boxes">
            <div class="col-12 border-bottom"> 
                <div class="row p-3">
                    <div class="input-group mb-3">
                        <input type="text" class="form-control w-25"  placeholder="Search for group member by name">
                        <div class="input-group-append">
                            <span class="input-group-text"><i class="pi pi-search"></i></span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-12">
                <div class="row border-bottom p-3">
                    <div class="col-8">Name</div>
                    <div class="col-4">Mark</div>
                </div>
                <div class="row p-3">
                    <div class="col-8 mt-2">Oaknfjknbjfmn msdvf</div>
                    <div class="col-4 mt-2">
                        <Checkbox id="binary" v-model="sendToMysef" :binary="true"/>
                    </div>
                    <div class="col-8 mt-2">Oaknfjknbjfmn msdvf</div>
                    <div class="col-4 mt-2">
                        <Checkbox id="binary" v-model="sendToMysef" :binary="true"/>
                    </div>
                    <div class="col-8 mt-2">Oaknfjknbjfmn msdvf</div>
                    <div class="col-4 mt-2">
                        <Checkbox id="binary" v-model="sendToMysef" :binary="true"/>
                    </div>
                    <div class="col-8 mt-2">Oaknfjknbjfmn msdvf</div>
                    <div class="col-4 mt-2">
                        <Checkbox id="binary" v-model="sendToMysef" :binary="true"/>
                    </div>
                </div>
            </div>
        </div>
        <div class="row boxes mt-4 p-3" v-for="item in contributionItems" :key="item.id">
            <div class="col-8 align-self-center font-weight-700">{{ item.name }}</div>
            <div class="col-4">
                <input type="text" class="form-control" placeholder="amount"/>
            </div>
        </div>
        <div class="row mt-5">
            <textarea class="form-control" rows="5" placeholder="Enter your note here"></textarea>
        </div>
        <div class="row d-flex justify-content-end my-4">
            <div class="default-btn primary-bg border-0 text-white text-center">Save</div>
        </div>
   </div>

   <div
    class="modal fade"
    id="addMemberModal"
    tabindex="-1"
    role="dialog"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
    >
    <div class="modal-dialog" role="document" ref="modal">
        <div class="modal-content pr-2">
        <div class="modal-header py-3">
            <h5
            class="modal-title font-weight-700"
            id="exampleModalLabel"
            >
            Group membership
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
        <div class="modal-body">
            <AddToGroup @displayForm="setDisplayForm" :newPerson="newPerson"/>
        </div>
        <!-- <div class="modal-footer mb-2">
            
        </div> -->
        </div>
    </div>
    </div>
    <Dialog 
        header="Create New Member"
        v-model:visible="display"
        :style="{ width: '70vw', maxWidth: '600px' }"
        :modal="true"
        position="top"
        >
        <div class="row">
            <div class="col-md-12">
            <NewPerson @cancel="() => display = false" @person-id="setNewPerson($event)"  @show-group-modal="setGroupModal" />
            </div>
        </div>
    </Dialog>
</template>

<script>
import { ref } from '@vue/reactivity'
import axios from "@/gateway/backendapi";
import AddToGroup from "../component/AddMemberToGroup.vue"
import Dialog from "primevue/dialog";
import NewPerson from '../../../components/membership/NewDonor.vue';
export default {
    components: {
        AddToGroup,
        Dialog,
        NewPerson
    },
    setup () {
        const sendToMysef = ref("")
        const contributionItems = ref([])
        const display = ref(false)
        const modalBtn = ref(null);
        const newPerson = ref({})

        const getContributionsItem = async() => {
            try {
                let { data } = await axios.get("/api/Financials/Contributions/Items")
                contributionItems.value = data
                console.log(data)
            }
            catch (err) {
                console.log(err)
            }
        }
        getContributionsItem() 

        const setGroupModal = () => {
            modalBtn.value.click()
        }

        const setDisplayForm = (payload) => {
            display.value = payload
        }

        const setNewPerson = (payload) => {
            newPerson.value = payload
        }

        return {
            sendToMysef,
            contributionItems,
            display,
            modalBtn,
            setGroupModal,
            setDisplayForm,
            setNewPerson,
            newPerson
        }
    }
}
</script>

<style scoped>
.page-header {
    font: normal normal 800 29px Nunito sans;
}

.boxes {
    /* box-shadow: 0px 3px 6px #2c28281c; */
    /* border: 1px solid #00204424; */
    /* box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset; */
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
}
</style>