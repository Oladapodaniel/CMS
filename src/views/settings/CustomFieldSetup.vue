<template>
  <div>
    <div class="container mb-4">
      <div class="row d-md-flex justify-content-between mt-3 mb-5">
        <div class="col-md-12">
          <h2 class="memCat"> Custom Field Setup</h2>
        </div>
      </div>

      <div class="row grey-border pt-1 pb-5">
        <div class="col-md-12">
          <div class="row">
            <div class="col-md-12">
              <div class="row">
                <div class="col-md-12">
                  <h4 class="mt-2 mb-2 ml-5 memCat1">Custom Field</h4>
                </div>
              </div>
              <!--prime Vue -->
              <Toast />
              <ConfirmDialog></ConfirmDialog>

              <div class="row">
                <div class="col-md-12 py-5 grey-background">
                  <div class="row d-md-flex justify-content-center">
                    <div class="col-md-7">
                      <div class="col-md-12 col-sm-12">
                        <label for=""> Specify Your Label here..</label>
                        <input
                          type="text"
                          class="form-control"
                          placeholder="Specify Your Label here.."
                          v-model="customFieldLabel"
                        />
                      </div>
                      <div class="col-md-12 col-sm-12 mt-3  ">
                          <label for="">Select the type of control you want to use</label>
                          <Dropdown v-model="selectedControl" class="w-100 font-weight-normal" optionLabel="name" :options="controlType"  placeholder="Select type" />
                      </div>
                      <div class="col-md-12 col-sm-12 mt-3 w-100" v-if="selectedControl.name == 'DropdownList' " >
                        <label for=""> Enter your Dropdown list here seperated by comma..</label>
                        <Chips v-model="dropdownList" style="background: white, width: 100%;" separator=","/>
                        <!-- <input
                          type="text"
                          class="form-control"
                          placeholder="Enter the list here.."
                          v-model="dropdownList"
                        /> -->
                      </div>
                      <div class="col-md-12 col-sm-12 mt-3  ">
                          <label for="">Select the Entity Type you want to Extend </label>
                          <Dropdown v-model="selectedEntityType" class="w-100 font-weight-normal" optionLabel="name" :options="entityType"  placeholder="Select type" />
                      </div>
                    </div>
                    
                    <div class="col-md-12 d-flex justify-content-center mt-3 col-sm-3 "  @click="saveCustomFields">
                      <button class="btn primary-btn text-white bold  mt-sm-3 mt-lg-0 mt-xl-0 mt-md-0 mt-3 px-md-5 px-4 py-2">Save</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="row table-header-row py-2 mt-5">
            <div class="col-md-3">
              <span class="py-2 font-weight-bold">LABEL</span>
            </div>
            <div class="col-md-3">
              <span class="py-2 font-weight-bold">CONTROL TYPE</span>
            </div>
            <div class="col-md-3">
              <span class="py-2 font-weight-bold">ENTITY TYPE</span>
            </div>
            <div class="col-md-3 text-center">
              <span class="py-2 font-weight-bold mr-md-3 mr-0">ACTION</span>
            </div>
          </div>

          <div class="row py-2" v-for="(customFieldList, index) in allCustomFieldList" :key="index">
            <div class="col-md-12">
              <div class="row">
                <div
                  class="col-md-3 d-flex px-md-0 px-5 justify-content-between align-items-center  mb-md-0 mb-5"
                >
                  <span class="py-2 hidden-header">LABEL</span>
                  <span class="py-2 text-xs-left mr-md-0 ml-md-3 mr-4">{{ customFieldList.label }}</span>
                </div>
                <div
                  class="col-md-3 d-flex px-md-0 px-5 justify-content-between align-items-center  mb-md-0 mb-5"
                >
                  <span class="py-2 hidden-header">CONTROL TYPE</span>
                  <span class="py-2 text-xs-left mr-md-0 ml-md-3 mr-4">{{ getControlName(customFieldList.controlType) }}</span>
                </div>
                <div
                  class="col-md-3 d-flex px-md-0 px-5 justify-content-between align-items-center  mb-md-0 mb-5"
                >
                  <span class="py-2 hidden-header">ENTITY TYPE</span>
                  <span class="py-2 text-xs-left mr-md-0 ml-md-3 mr-4">{{ getEntityName(customFieldList.entityType) }}</span>
                </div>
                <div
                  class="col-md-3 mb-md-0 mb-2 col-12 d-flex justify-md-content-end justify-content-start align-items-end"
                >
                  <span class="py-md-4 hidden-header hidden-header1">ACTION</span>
                  <div class="row d-flex flex-wrap justify-content-start">
                    <div class="col-md-5 col-5  ">
                      <button class="btn secondary-btn py-1 px-3" @click="openClassification(index)">View</button>
                    </div>
                    <div class="col-md-5 col-5 ">
                      <button class="delbtn py-1 primary-btn px-3" @click="deleteCustomField(customFieldList.id, index)">Delete</button>
                    </div>
                  </div>
                </div>
              </div>
              <div class="row grey-background py-2 mt-2" v-if="vissibleTab === `tab_${index}`">
                <div
                  class="col-md-10 d-flex flex-wrap my-3 "
                >
                      <div class="col-md-4 text-md-right text-left">
                        <label for="">Label</label>
                      </div>
                      <div class="col-md-8">
                         <input type="text" class="form-control" v-model="customLabel">
                      </div>
                  
                </div>
                <div
                  class="col-md-10 d-flex flex-wrap "
                >
                      <div class="col-md-4 text-md-right text-left">
                        <label for="">Control type</label>
                      </div>
                      <div class="col-md-8">
                         <Dropdown v-model="customControlType" class="w-100 font-weight-normal" :options="controlType" optionLabel="name"   placeholder="Select type" />
                      </div>
                </div>

                <div
                  class="col-md-10 d-flex flex-wrap my-3 " v-if="customControlType.name ==  'DropdownList' "
                >
                      <div class="col-md-4 text-md-right text-left">
                        <label for="">Label</label>
                      </div>
                      <div class="col-md-8">
                         <input type="text" class="form-control" v-model="customDropdownList">
                      </div>
                  
                </div>

                <div
                  class="col-md-10 d-flex flex-wrap my-3 "
                >
                      <div class="col-md-4 text-md-right text-left">
                        <label for="">Entity type</label>
                      </div>
                      <div class="col-md-8">
                         <Dropdown v-model="customEntityType" class="w-100 font-weight-normal" :options="entityType" optionLabel="name"   placeholder="Select type" />
                      </div>
                     
                    <!-- <input type="text" class="form-control" v-model="customEntityType"> -->
                </div>
                <div
                  class="col-md-12  "
                >
                  <div class="row mt-0 d-flex justify-content-center ">
                    <div class="col-md-5 d-flex  flex-wrap">
                      <div class="col-md-4 col-4">
                        <button class="btn primary-btn save-btn py-1 px-4 ml-md-0 ml-5" @click="updateCustomField(customFieldList.id, index)">Save</button>
                      </div>
                      <div class="col-md-4 col-4 ">
                        <button class="btn secondary-btn py-1  px-3 bor" @click="discard">Discard</button>
                      </div>
                    </div>
                    
                  </div>
                </div>
              </div>

              <div class="row">
                <div class="col-md-12 px-0">
                  <hr class="hr my-0" />
                </div>
              </div>
            </div>
          </div>
          <div class=" col-12 text-center p-5" v-if="loading">
             <i class="pi pi-spin pi-spinner text-center text-primary" style="fontSize: 3rem"></i>
         </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import axios from "@/gateway/backendapi";
import Toast from 'primevue/toast';
import { useToast } from "primevue/usetoast";
import Dropdown from "primevue/dropdown";
import ConfirmDialog from 'primevue/confirmdialog';
// import axios from 'axios';
import finish from "../../services/progressbar/progress"
import Chips from 'primevue/chips';

export default {
  components:{
     Toast,
    ConfirmDialog,
    Dropdown,
    Chips
  },
  setup() {
    const selectedControl = ref([]);
    const dropdownList = ref([]);
    const customDropdownList = ref('');
    const vissibleTab = ref(false)
    const selectedEntityType = ref([]);
    const loading = ref(false);
    const customEntityType = ref({});
    const customControlType = ref({});
    const customLabel = ref("");
    const customFieldLabel = ref("");
    const tenantId = ref("")
    const getAllcontrolType = ref([]);
    const getAllEntityType = ref([]);
    const allCustomFieldList = ref([]);
    const toast = useToast()
    const getCustomizableField = ref([])
    const controlType = ref(
          [
            { name:'Text', id: '0'},
            { name:'DropdownList', id: '1'}, 
            { name:'CheckBox', id: '2'},
            { name:'DateTime', id: '3'},
            { name:'Email', id: '4'},
            { name:'Image', id: '5'},
            { name:'Number', id: '6'}
            
          ] 
      )
    const entityType = ref(
          [
            { name:'Member', id: '0'},
            { name:'FirstTimers', id: '1'},
            { name:'NewConverts', id: '2'},
            { name:'Activity', id: '3'},
            { name:'EventRegistrationForm', id: '4'},
            { name: 'CheckInAttendance', id: '5' }
          ]
      )

    const discard = () => [
        vissibleTab.value = ""
    ]
    const getAllControls = async () =>{
        try{
          const data = await axios.get('/api/CustomFields/GetAllControls')
          console.log(data, 'getAllControls');
        }
        catch (error) {
           console.log(error)
        }
    }
    getAllControls()

     const deleteCustomField = (id) => {

            axios
                .delete(`/api/CustomFields/EditCustomFields?customAttributeID=${id}`)
                .then((res) => {
                console.log(res);
                toast.add({
                    severity: "success",
                    summary: "Confirmed",
                    detail: "Custom field deleted",
                    life: 3000,
                });

                allCustomFieldList.value = allCustomFieldList.value.filter( (customFieldList) => customFieldList.id !== id
          );

                })
                .catch((err) => {
                finish()
                if (err.response.status === 400) {
                    toast.add({
                    severity: "error",
                    summary: "Unable to delete",
                    detail: "Ensure this is not in any group",
                    life: 3000,
                    });
                } else {
                    toast.add({
                    severity: "error",
                    summary: "Unable to delete",
                    detail: "An error occurred, please try again",
                    life: 3000,
                    });
                }
                });
            };

            const showConfirmModal = (id, index) => {
                confirm.require({
                    message: "Are you sure you want to proceed?",
                    header: "Confirmation",
                    icon: "pi pi-exclamation-triangle",
                    acceptClass: "confirm-delete",
                    rejectClass: "cancel-delete",
                    accept: () => {
                    deleteCustomField(id, index);
                    // toast.add({severity:'info', summary:'Confirmed', detail:'Member Deleted', life: 3000});
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
            
    const getCustomizable = async () =>{
        try{
          const data = await axios.get('/api/CustomFields/GetCustomizableObjects')
          getCustomizableField.value = data.data
          console.log(data, 'getcustomizable');
        }
        catch (error) {
           console.log(error)
        }
    }
    getCustomizable()

    const getCurrentlySignedInUser = async() => {
            try {
                const res = await axios.get("/api/Membership/GetCurrentSignedInUser");
                tenantId.value = res.data.tenantId
                
            } catch (err) {
                /*eslint no-undef: "warn"*/
                console.log(err);
            }
        }
        getCurrentlySignedInUser()

    // const openClassification =  (index) => {
    //   vissibleTab.value = `tab_${index}`;
    //   customLabel.value = allCustomFieldList.value.label;
    // },
    const openClassification = (index) =>{
      vissibleTab.value = `tab_${index}`;
      customLabel.value = allCustomFieldList.value[index].label;
      customDropdownList.value = allCustomFieldList.value[index].parameterValues;
      customEntityType.value = entityType.value.find(i => i.id == allCustomFieldList.value[index].entityType);
      customControlType.value = controlType.value.find(i => i.id == allCustomFieldList.value[index].controlType);
    }

    const updateCustomField = async() => {

       const customDetail = {
            id: allCustomFieldList.value.id,
            entityType: customEntityType.value.id,
            tenantID: tenantId.value,
            label: customLabel.value,
            controlType: customControlType.value.id,
            parameterValues: customDropdownList.value
          }
            try {
                const res = await axios.put('/api/CustomFields/EditCustomFields', customDetail);
                console.log(res.data, 'updatecustomfield');

                toast.add({
                        severity: "success",
                        summary: "Successful",
                        detail: "Custom Field Updated successfully",
                        life: 2000,
                    });
                
            } catch (err) {
                /*eslint no-undef: "warn"*/
                console.log(err);
            }
        }

      const saveCustomFields = async () =>{
        console.log(dropdownList.value)
        const body = {
            entityType: selectedEntityType.value.name,
            tenantID: tenantId.value,
            label: customFieldLabel.value,
            parameterValues: dropdownList.value ? dropdownList.value.join(",") : "",
            controlType: selectedControl.value.name
            // parameterValues: ,
          }
        
        try{
          const { data } = await axios.post('/api/CustomFields/SaveCustomFields', body)
          
          console.log(data, 'saveCustomizable');
          allCustomFieldList.value.push(data)
          
          toast.add({
              severity: "success",
              summary: "Successful",
              detail: "Custom Field created successfully",
              life: 2000,
          });

          selectedEntityType.value = "";
          customFieldLabel.value = "";
          dropdownList.value = "";
          selectedControl.value = ""
                    
          // getAllCustomFields()
        }

        catch (error) {
           console.log(error)
        }
    }

    const getAllCustomFields = async() => {
            try {
                const res = await axios.get("/api/CustomFields/GetAllCustomFields");
                console.log(res.data, 'allCustomFields');
                allCustomFieldList.value = res.data
                getAllcontrolType.value = res.data.map((i) => {
                  return {
                    name: i.controlType,
                    id: i.id
                  }
                })
                getAllEntityType.value = res.data.map((i) => {
                  return {
                    name: i.entityType,
                    id: i.id
                  }
                })
                console.log(getAllcontrolType.value, 'allcontrol');
                console.log(getAllEntityType.value, 'allEntity');
                console.log(allCustomFieldList.value, 'allCustomFieldList');
                
            } catch (err) {
                /*eslint no-undef: "warn"*/
                console.log(err);
            }
        }
        getAllCustomFields()

    const  getEntityName = (id) => {
      return entityType.value.find(i =>  i.id  == id).name
    }

    const  getControlName = (id) => {
      return controlType.value && controlType.value.find(i =>  i.id  == id) ? controlType.value.find(i =>  i.id  == id).name : ""
    }

    return {
      controlType,
      getControlName,
      vissibleTab,
      saveCustomFields,
      showConfirmModal,
      deleteCustomField,
      updateCustomField,
      customEntityType,
      customControlType,
      getAllcontrolType,
      customLabel,
      loading,
      getAllEntityType,
      selectedControl,
      allCustomFieldList,
      getCustomizableField,
      selectedEntityType,
      entityType,
      dropdownList,
      openClassification,
      discard,
      getEntityName,
      customFieldLabel,
      customDropdownList
    }
  }
  };
</script>

<style scoped>
/* input::placeholder {
  text-align: center;
} */

.table-header-row {
  background: #ebeff4;
  border-top: 1px solid #dde2e6;
  border-radius: 8px 8px 0 0;
}

.hidden-header {
  display: none;
}

.grey-background {
    background: #DDE2E6;
}

.save-btn {
  background: #50AB00;
}
.delbtn:hover{
    background-color:red!important;
    color: white!important;
  }
  .delbtn{
  background-color: #F2BC9E!important;
  color: black!important;
}
.delbtn:focus{
  outline: none!important;
  border: none!important;
}
 .memCat{
    font: var(--unnamed-font-style-normal) normal 800 34px/46px var(--unnamed-font-family-nunito-sans);
    letter-spacing: var(--unnamed-character-spacing-0);
    text-align: left;
    font: normal normal 800 34px/46px Nunito Sans;
    letter-spacing: 0px;
    color: #02172E;
    opacity: 1;
  }
  .memCat1{
    font: var(--unnamed-font-style-normal) normal var(--unnamed-font-weight-bold) 24px/32px var(--unnamed-font-family-nunito-sans);
    letter-spacing: var(--unnamed-character-spacing-0);
    text-align: left;
    font: normal normal bold 24px/32px Nunito Sans;
    letter-spacing: 0px;
    color: #02172E;
    opacity: 1;
  }
  

@media screen and (max-width: 767px) {
  .hidden-header1{
    display: none!important;
  }
  .hidden-header {
    display: inline-block;
    font-weight: bold;
  }

  .table-header-row {
    display: none;
  }
  .bold:hover{
    color: white!important;
  }
  .bold{
    color: rgb(187, 176, 176)!important;
  }
  .bor{
    border: #02172E!important;
  }
  
}
@media screen and (max-width: 390px) {
  .memCat{
    font: var(--unnamed-font-style-normal) normal 500 20px/25px var(--unnamed-font-family-nunito-sans);
    letter-spacing: var(--unnamed-character-spacing-0);
    text-align: left;
    font: normal normal 800 20px/25px Nunito Sans;
    letter-spacing: 0px;
    color: #02172E;
    opacity: 1;
  }
   .memCat1{
    font: var(--unnamed-font-style-normal) normal var(--unnamed-font-weight-bold) 18px/20px var(--unnamed-font-family-nunito-sans);
    letter-spacing: var(--unnamed-character-spacing-0);
    text-align: left;
    font: normal normal bold 18px/20px Nunito Sans;
    letter-spacing: 0px;
    color: #02172E;
    opacity: 1;
  }
  
  
}
</style>