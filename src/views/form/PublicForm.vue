<template>
    <div class="container-top" :class="{ 'container-slim': lgAndUp || xlAndUp }" v-loading="loadingPage">
        <div class="continer-fluid mt-3">
            <div class="row  justify-content-center ">

                <div class="col-md-7  text-center d-flex justify-content-center">
                    <div class="col-md-10 h2 font-weight-600">
                        {{ singleFormData.name }}
                    </div>
                </div>
                <div class="col-md-7 text-center d-flex justify-content-center">
                    <div class="col-md-10">
                        {{ singleFormData.description }}
                    </div>
                </div>
            </div>
            <div class="row justify-content-center mt-4" v-if=" singleFormData && singleFormData.customAttributes && singleFormData.customAttributes.length > 0 && !networkError && !loadingPage">
                <div class="col-md-7  ">
                    <div class="row">
                        <div class="col-md-12" v-for="(item, index) in singleFormData.customAttributes " :key="index">
                            <div class="row mt-3 justify-content-center ">

                                <div class="col-md-9  " style="font-weight: 500">
                                    <label for="">{{ item.label }} <span v-if="item.isRequired" style="color: red">
                                            *</span></label>
                                    <el-input type="text" class="w-100" v-if="item.controlType === 0"
                                        :placeholder="item.label" v-model="item.data" />
                                    <el-select-v2 v-model="item.data" v-if="item.controlType === 1" :options="item.parameterValues.split(',').map((i) => ({
                                        label: i,
                                        value: i,
                                    }))
                                        " :placeholder="item.label" class="w-100" size="large" />
                                    <el-checkbox v-if="item.controlType === 2" v-model="item.data" size="large" />
                                    <el-date-picker v-if="item.controlType === 3" v-model="item.data" class="w-100"
                                        type="date" :placeholder="item.label" size="default" />
                                    <el-input type="email" v-if="item.controlType === 4" class="w-100" v-model="item.data"
                                        :placeholder="item.label" />
                                    <el-input type="number" v-if="item.controlType === 5" class="w-100" v-model="item.data"
                                        :placeholder="item.label" />
                                    <!-- <span class="w-100" v-if=" item.isRequired && !item.data   ">please fill field </span> -->
                                </div>
                            </div>
                            <!-- <div class="row mt-3  ">
                                <div class="col-md-3 font-weight-bold text-md-right text-left "><label for="">
                                    </label></div>
                                <div class="col-md-9  ">
                                    <el-select-v2 v-model="item.controlType" :options="responseType.map((i) => ({
                                        label: i.name,
                                        value: i.id,
                                    }))
                                        " placeholder="Select Control type" class="w-100" size="large" />
                                </div>
                            </div> -->
                            <!-- <div class="row mt-2 ">
                                <div class="col-md-3"></div>
                                <div class="col-md-9" v-if="item.controlType === '1'">
                                    <div>Input your options and press enter</div>
                                    <div class="chip-container col-md-12 p-0 m-0 ">
                                        <div class="chip px-2  d-flex justify-content-between my-2 mx-1"
                                            v-for="(chip, i) of item.parameterValues" :key="chip.label">
                                            <span>{{ chip }}</span>
                                            <i class=" pt-1 text-dark align-items-center"
                                                @click="deleteChip(i, index)"><el-icon>
                                                    <CircleClose />
                                                </el-icon></i>
                                        </div>
                                        <input class="inputt  py-2 " v-model="item.currentInput"
                                            @keypress.enter="saveChip(index)" @input="checkComma"
                                            @keydown.delete="backspaceDelete(index)">
                                    </div>
                                </div>
                            </div> -->
                            <!-- <div class="row">
                                <div class="col-md-3"></div>
                                <div class="col-md-9 px-0 d-flex  justify-content-end "
                                    :class="{ 'justify-content-between': index === cutomFieldData.length - 1 }">
                                    <div @click="addNewField" v-if="index === cutomFieldData.length - 1">
                                        <el-button text class="d-flex">
                                            <el-icon :size="16" class=" ">
                                                <Plus />
                                            </el-icon>
                                            <span class="mt-1">Add New Field</span>
                                        </el-button>
                                    </div>
                                    <div @click="deleteItem" class="">
                                        <el-button text class="d-flex justify-content-end ">
                                            <el-icon class=" " :size="23">
                                                <Delete />
                                            </el-icon><span class="ml-1 ">Delete</span>
                                        </el-button>
                                    </div>
                                </div>
                            </div> -->
                        </div>
                    </div>
                    <div class="row justify-content-center mt-4">
                        <!-- <div class="col-md-3"></div> -->
                        <div class="col-md-9" @click="saveForm">
                            <el-button class="w-100" :loading="loading" round :color="primarycolor"> Submit</el-button>
                        </div>
                        <!-- <div class="col-md-9" @click="saveForm2">
                            <el-button class="w-100" :loading="loading" round :color="primarycolor"> Submit2</el-button>
                        </div> -->
                    </div>
                </div>
            </div>
            <div v-if="networkError && !loading" class="adjust-network">
                <img src="../../assets/network-disconnected.png">
                <div>Opps, Your internet connection was disrupted</div>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, inject } from 'vue'
import axios from "@/gateway/backendapi";
import { ElMessage, ElMessageBox } from "element-plus";
import deviceBreakpoint from "../../mixins/deviceBreakpoint";
import finish from '../../services/progressbar/progress'
import { useRoute } from "vue-router";
import router from "../../router";
export default {
    setup() {
        const formName = ref("")
        const description = ref("")
        const cutomFieldData = ref([{ parameterValues: [] }])
        const route = useRoute();
        const loading = ref(false)
        const loadingPage = ref(false)
        const networkError = ref(false)
        const singleFormData = ref([]);
        const required = ref(false)
        const centerDialogVisible = ref(false)
        const currentInput = ref("")
        const dropdownList = ref([])
        const { xsOnly, mdAndUp, lgAndUp, xlAndUp } = deviceBreakpoint()
        const primarycolor = inject("primarycolor");


        const responseType = ref([
            { name: "Text", id: "0" },
            { name: "DropdownList", id: "1" },
            { name: "CheckBox", id: "2" },
            { name: "DateTime", id: "3" },
            { name: "Email", id: "4" },
            { name: "Image", id: "5" },
            { name: "Number", id: "6" },
        ]);

        const saveChip = (index) => {
            cutomFieldData.value[index].currentInput ? cutomFieldData.value[index].parameterValues.push(cutomFieldData.value[index].currentInput) : null

            // ((dropdownList.value.indexOf(currentInput.value) === -1)) && dropdownList.value.push(currentInput.value);
            cutomFieldData.value[index].currentInput = '';
        }
        const backspaceDelete = ({ which }, index) => {
            which == 8 && cutomFieldData.value[index].currentInput === '' && cutomFieldData.value[index].parameterValues.splice(cutomFieldData.value[index].parameterValues.length - 1);
        }
        const checkComma = (e) => {
            if (e.data == ',') {
                saveChip();
            }
        }
        // const saveForm2 = () => {
        //     let myArray = singleFormData.value.customAttributes.forEach((i) =>{
        //         i.data
        //     })
        //     console.log(myArray, 'jjj');
        // }

        const addNewField = () => {
            // centerDialogVisible.value = true
            cutomFieldData.value.push({ parameterValues: [] });
        }
        const saveCustomField = () => {
            centerDialogVisible.value = false
        }
        const getSingleForm = async () => {
            loadingPage.value = true
            try {
                const { data } = await axios.get(`/api/Forms/getsingleform?Id=${route.query.id}`)
                singleFormData.value = data
                console.log(data, 'ffjjfj');
                loadingPage.value = false

            } catch (error) {
                // finish()
                if (error.toString().toLowerCase().includes("network error")) {
                    networkError.value = true
                } else {
                    networkError.value = false
                }
                loadingPage.value = false
                console.log(error)

            }

        }
        getSingleForm()

        const saveForm = async () => {

            loading.value = true
            try {
                const { data } = await axios.post('/api/Forms/saveformdata', singleFormData.value.customAttributes.map((i) => ({
                    customAttributeID: i.id,
                    data: i.data,
                    isRequired: i.isRequired
                })))
                ElMessage({
                    type: 'success',
                    message: 'From created successfully',
                    duration: 5000
                })
                console.log(data);
                loading.value = false
            }
            catch (error) {
                console.log(error);
                loading.value = false
            }
        }

        return {
            formName,
            primarycolor,
            cutomFieldData,
            dropdownList,
            required,
            description,
            responseType,
            centerDialogVisible,
            currentInput,
            route,
            singleFormData,
            xsOnly, mdAndUp, lgAndUp, xlAndUp,
            loading,
            loadingPage,
            networkError,
            // saveForm2,
            addNewField,
            saveForm,
            checkComma,
            saveChip,
            backspaceDelete,
            saveCustomField,
        }

    },
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&family=Roboto:wght@100&display=swap');

* {
    font-family: Poppins;
}

.chip-container {
    /* width: 425px; */
    border: 1px solid #ccc;
    background: #ffffff;
    min-height: 34px;
    display: flex;
    flex-wrap: wrap;
    align-content: space-between;
}

.inputt {
    /* flex: 1 1 auto;
    width: 30px; */
    border: none;
    outline: none;
    padding: 4px;
}

.chip {
    padding: 0.3rem 0.3rem;
    border: 1px solid #02172e0d;
    border-radius: 25px;
    background: #02172e14;
    /* margin:4px;
    background: #e0e0e0;
    padding:0px 4px;
    border: 1px solid #ccc;
    border-radius: 3px;
    display:flex;
    align-items: center; */
}
</style>