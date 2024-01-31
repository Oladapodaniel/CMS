<template>
    <div class="container-top container-slim">
        <div class="continer-fluid mt-3">
            <div class="row">
                <div class="col-md-12 text-center head-text">{{ singleFormData.name }}</div>
            </div>
            <div class="row justify-content-center mt-4">
                <div class="col-md-10 ">
                    <!-- <div class="row mt-3">
                        <div class="col-md-3 font-weight-bold text-md-right text-left">
                            <label for=""> Form Name </label>
                        </div>
                        <div class="col-md-9">
                            <el-input type="text" v-model="formName" />
                        </div>
                    </div> -->
                    <!-- <div class="row mt-4">
                        <div class="col-md-3 font-weight-bold text-md-right text-left">
                            <label for="">Description</label>
                        </div>
                        <div class="col-md-9">
                            <el-input type="textarea" :rows="3" v-model="description" />
                        </div>
                    </div> -->
                    <!-- <div class="row mt-4  ">
                        <div class="col-md-3"></div>
                        <div class="col-md-9  ">
                            <el-input class="" type="text" placeholder="Sample Question" v-model="description" />
                            <el-checkbox class="" v-model="required" label="Required" />
                        </div>
                    </div>
                    <div class="row">
                        <hr class="w-100">
                    </div> -->
                    <div class="row">
                        <div class="col-md-12" v-for="(item, index) in singleFormData.customAttributes " :key="index">
                            <div class="row mt-3  ">
                                <div class="col-md-3 font-weight-bold text-md-right text-left "><label for="">{{ item.label
                                }}
                                    </label></div>
                                <div class="col-md-9  " v-if="item.controlType === 0">
                                    <el-input type="text" class="w-100" :placeholder="item.label" v-model="item.data" />
                                </div>
                                <div class="col-md-9  " v-if="item.controlType === 1">
                                    <el-select-v2 v-model="item.data" :options="item.parameterValues.split(',').map((i) => ({
                                        label: i,
                                        value: i,
                                    }))
                                        " :placeholder="item.label" class="w-100" size="large" />
                                </div>
                                <div class="col-md-9  " v-if="item.controlType === 2">
                                    <el-checkbox v-model="item.data" size="large" />
                                </div>
                                <div class="col-md-9  " v-if="item.controlType === 3">
                                    <el-date-picker v-model="item.data" class="w-100" type="date"
                                        :placeholder="item.label" size="default" />
                                </div>
                                <div class="col-md-9  " v-if="item.controlType === 4">
                                    <el-input type="email" class="w-100" v-model="item.data"
                                        :placeholder="item.label" />
                                </div>
                                <div class="col-md-9  " v-if="item.controlType === 5">
                                    <el-input type="number" class="w-100" v-model="item.data"
                                        :placeholder="item.label" />
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
                    <div class="row mt-4">
                        <div class="col-md-3"></div>
                        <div class="col-md-9" @click="saveForm">
                            <el-button class="w-100" round :color="primarycolor"> Submit</el-button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, inject } from 'vue'
import axios from "@/gateway/backendapi";
import { ElMessage, ElMessageBox } from "element-plus";
import deviceBreakpoint from "../../mixins/deviceBreakpoint";
import { useRoute } from "vue-router";
import router from "../../router";
export default {
    setup() {
        const formName = ref("")
        const description = ref("")
        const cutomFieldData = ref([{ parameterValues: [] }])
        const route = useRoute();
        const singleFormData = ref([])
        const required = ref(false)
        const centerDialogVisible = ref(false)
        const currentInput = ref("")
        const tenantId = ref("")
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

        const deleteItem = (index) => {
            if (cutomFieldData.value.length > 1) {
                cutomFieldData.value.splice(index, 1);
            } else {
                ElMessage({
                    type: 'error',
                    showClose: true,
                    message: 'Cannot Delete, You must have at least one field',
                    duration: 5000
                })
            }
        };

        const saveChip = (index) => {
            cutomFieldData.value[index].currentInput ? cutomFieldData.value[index].parameterValues.push(cutomFieldData.value[index].currentInput) : null

            // ((dropdownList.value.indexOf(currentInput.value) === -1)) && dropdownList.value.push(currentInput.value);
            cutomFieldData.value[index].currentInput = '';
        }
        const deleteChip = (i, index) => {
            cutomFieldData.value[index].parameterValues.splice(i, 1);
        }
        const backspaceDelete = ({ which }, index) => {
            which == 8 && cutomFieldData.value[index].currentInput === '' && cutomFieldData.value[index].parameterValues.splice(cutomFieldData.value[index].parameterValues.length - 1);
        }
        const checkComma = (e) => {
            if (e.data == ',') {
                saveChip();
            }
        }

        const addNewField = () => {
            // centerDialogVisible.value = true
            cutomFieldData.value.push({ parameterValues: [] });
        }
        const saveCustomField = () => {
            centerDialogVisible.value = false
        }
        const getSingleForm = async () => {
            const { data } = await axios.get(`/api/Forms/getsingleform?Id=${route.query.id}`)
            singleFormData.value = data


            console.log(data, 'ffjjfj');
        }
        getSingleForm()

        const getFormData = async () => {
            const { data } = await axios.get(`/api/Forms/getformdata?Id=${route.query.id}`)
            // singleFormData.value = data


            console.log(data, 'f0000000000000j');
        }
        getFormData()

        const getCurrentlySignedInUser = async () => {
            try {
                const res = await axios.get("/api/Membership/GetCurrentSignedInUser");
                tenantId.value = res.data.tenantId;
            } catch (err) {
                /*eslint no-undef: "warn"*/
                console.log(err);
            }
        };
        getCurrentlySignedInUser();

        const saveForm = async () => {

            // tenantID: tenantId.value,

            try {
                const { data } = await axios.post('/api/Forms/saveformdata', singleFormData.value.customAttributes.map((i) => ({
                    customAttributeID: i.id,
                    data: i.data
                })))
                console.log(data);
            }
            catch (error) {
                console.log(error);
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
            tenantId,
            route,
            singleFormData,
            xsOnly, mdAndUp, lgAndUp, xlAndUp,
            addNewField,
            deleteItem,
            saveForm,
            checkComma,
            saveChip,
            backspaceDelete,
            deleteChip,
            saveCustomField,
        }

    },
}
</script>

<style scoped>
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