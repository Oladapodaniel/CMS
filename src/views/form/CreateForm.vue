<template>
    <div class="conatiner-fluid mt-3">
        <div class="row">
            <div class="col-md-12 h2 font-weight-600 head-text">Create Form </div>
        </div>
        <div class="row justify-content-center mt-4">
            <div class="col-md-8 ">
                <div class="row mt-3">
                    <div class="col-md-3 "></div>
                    <div class="col-md-9">
                        <div class="col-md-12  border d-flex justify-content-center py-3 rounded "
                            style="background-color: #EBEBEB">
                            <div>
                                <div v-if="route.params.id">
                                    <div v-if="url" class="w-100 mb-3  d-flex justify-content-center image-upload">
                                        <img :src="url" alt="">
                                    </div>
                                </div>
                                <div v-else>
                                    <div v-if="url" class="w-100 mb-3  d-flex justify-content-center image-upload">
                                        <img :src="url" alt="">
                                    </div>
                                </div>
                                <el-upload class="upload-demo" multiple :show-file-list="false" :on-change="chooseFile"
                                    :on-remove="handleRemove" :auto-upload="false">
                                    <el-button round class="d-flex ">
                                        <el-icon :size="18">
                                            <Picture />
                                        </el-icon>
                                        <span>upload header image</span>
                                    </el-button>
                                </el-upload>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row mt-3">
                    <div class="col-md-3 font-weight text-md-right text-left">
                        <label for=""> Form Name </label>
                    </div>
                    <div class="col-md-9">
                        <el-input type="text" v-model="formName" />
                    </div>
                </div>
                <div class="row mt-4">
                    <div class="col-md-3 font-weight text-md-right text-left">
                        <label for="">Description</label>
                    </div>
                    <div class="col-md-9">
                        <el-input type="textarea" :rows="3" v-model="description" />
                    </div>
                </div>
                <!-- <div class="row mt-4  ">
                        <div class="col-md-3"></div>
                        <div class="col-md-9  ">
                            <el-input class="" type="text" placeholder="Sample Question" v-model="description"  required />
                            <el-checkbox class="" v-model="required" label="Required" />
                        </div>
                    </div> -->
                <div class="row">
                    <hr class="w-100">
                </div>
                <div class="row">
                    <div class="col-md-12" v-for="(item, index) in cutomFieldData " :key="index">
                        <div class="row mt-3  ">
                            <div class="col-md-3 font-weight text-md-right text-left "><label for="">Label name
                                </label></div>
                            <div class="col-md-9  ">
                                <el-input type="text" class="w-100" placeholder="input Label name" v-model="item.label"
                                    required />
                            </div>
                        </div>
                        <div class="row mt-3  ">
                            <div class="col-md-3 font-weight text-md-right text-left "><label for=""> Select
                                    Response
                                    type
                                </label></div>
                            <div class="col-md-9  ">
                                <el-select-v2 v-model="item.controlType" :options="responseType.map((i) => ({
                                    label: i.name,
                                    value: i.id,
                                }))
                                    " placeholder="Select Control type" class="w-100" size="large" />
                            </div>
                        </div>
                        <div class="row mt-2 ">
                            <div class="col-md-3"></div>
                            <div class="col-md-9" v-if="item.controlType === 1">
                                <!-- <div>Input your options and press enter</div> -->
                                <div class="chip-container col-md-12 p-0 m-0 ">
                                    <div class="chip px-2  d-flex justify-content-between my-2 mx-1"
                                        v-for="(chip, i) of item.parameterValues" :key="i">
                                        <span>{{ chip }}</span>
                                        <!-- <span>{{ item.parameterValues }}</span> -->
                                        <i class=" pt-1 text-dark align-items-center"
                                            @click="deleteChip(i, index)"><el-icon>
                                                <CircleClose />
                                            </el-icon></i>
                                    </div>
                                    <input placeholder="input option" class="inputt   py-2 " v-model="item.currentInput"
                                        @keypress.enter="saveChip(index)" @input="checkComma"
                                        @keydown.delete="backspaceDelete(index)">
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-3"></div>
                            <div class="col-md-9 px-0 d-flex  justify-content-between  "
                                :class="{ 'justify-content-between': item.controlType === 1 }">
                                <div @click="saveChip(index)" v-if="item.controlType === 1">
                                    <!-- <div @click="saveChip(index)" v-if="index === cutomFieldData.length - 1"> -->
                                    <div class="d-flex mt-1 ml-2 " style="font-weight: 500; ">
                                        <el-icon :size="14" class="mt-1 mr-0 font-weight-bold ">
                                            <Plus />
                                        </el-icon><span>New Option</span>
                                    </div>
                                    <!-- <el-button text class="d-flex ">
                                            <el-icon :size="16" class=" ">
                                                <Plus />
                                            </el-icon>
                                            <span class="mt-1">New Option</span>
                                        </el-button> -->
                                </div>
                                <div class="mt-0  pl-3"><el-checkbox class="" v-model="item.isRequired" label="Required" />
                                </div>
                                <div @click="deleteItem(item.id, index)" class="">
                                    <el-button text class="d-flex justify-content-end ">
                                        <el-icon class=" " :size="23">
                                            <Delete />
                                        </el-icon><span class="ml-1 ">Delete</span>
                                    </el-button>
                                </div>
                            </div>
                        </div>
                        <div class="row" v-if="index !== cutomFieldData.length - 1">
                            <hr class="w-100">
                        </div>
                    </div>
                </div>

                <div class="row mt-4">
                    <div class="col-md-3"></div>
                    <div class="col-md-9">
                        <div class="row">
                            <div class="col-md-12 " @click="addNewField">
                                <div class="col-md-12  d-flex " style="font-weight: 500; ">
                                    <el-icon :size="14" class="mt-1 mr-0 font-weight-bold ">
                                        <Plus />
                                    </el-icon><span class="font-weight-600">Add New
                                        Field</span>
                                </div>

                            </div>
                            <div class="col-md-12 mt-4" @click="saveForm">
                                <el-button class="w-100 d-flex" :loading="loading" size="large" round :color="primarycolor">
                                    <img class="mr-2" src="../../assets/form/Vector.png" alt="">
                                    <span>Save</span></el-button>
                            </div>
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
        const required = ref(false)
        const loading = ref(false)
        const selectedImage = ref("");
        const centerDialogVisible = ref(false)
        const currentInput = ref("")
        const tenantId = ref("")
        const fileImage = ref(false);
        const dropdownList = ref([])
        const { xsOnly, mdAndUp, lgAndUp, xlAndUp } = deviceBreakpoint()
        const primarycolor = inject("primarycolor");


        const responseType = ref([
            { name: "Text", id: 0 },
            { name: "DropdownList", id: 1 },
            { name: "CheckBox", id: 2 },
            { name: "DateTime", id: 3 },
            { name: "Email", id: 4 },
            { name: "Number", id: 5 },
            // { name: "Image", id: "6" },
        ]);

        const deleteItem = (id, index) => {
            console.log(index, 'ssss')
            console.log(id, 'id')
            if (id && cutomFieldData.value &&  cutomFieldData.value.length > 1) {
            //    if () {
            //     ElMessage({
            //             type: 'error',
            //             showClose: true,
            //             message: 'Cannot Delete, You must have at least one field',
            //             duration: 5000
            //         })
            //    }
                axios
                    .delete(`/api/Forms/deleteCustomField?Id=${id}`)
                    .then((res) => {
                        console.log(res);
                        ElMessage({
                            type: "success",
                            message: "Custom Field deleted successfully",
                            duration: 5000,
                        });
                        cutomFieldData.value = cutomFieldData.value.filter(
                            (Items) => Items.id !== id
                        );
                    })
                    .catch((err) => {
                        if (err.response.status === 400) {
                            ElMessage({
                                type: "error",
                                message: "Unable to delete",
                                duration: 5000,
                            });
                        } else {
                            ElMessage({
                                type: "error",
                                message: "Unable to delete",
                                duration: 5000,
                            });
                        }
                    });
            } else {
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
            }
        };
        let url = ref("");
        const chooseFile = (e) => {
            selectedImage.value = ""
            console.log(e)
            if (e.raw.type.includes("image")) {
                selectedImage.value = e.raw
                url.value = URL.createObjectURL(selectedImage.value);
                fileImage.value = true;
                console.log(selectedImage.value, 'hhhhh');
            } else {
                fileImage.value = false;
            }

        }
        // let url = ref("");
        // const chooseFile = (e) => {
        //     selectedImage.value = ""
        //     selectedImage.value = e;
        //     console.log(selectedImage.value,'lkkk');
        // };

        const handleRemove = () => {
            selectedImage.value = "";
        }
        const dateUpdated = ref('')
        const getSingleForm = async () => {
            const { data } = await axios.get(`/api/Forms/getsingleform?Id=${route.params.id}`)
            formName.value = data.name
            description.value = data.description
            dateUpdated.value = data.date
            url.value = data.pictureUrl
            cutomFieldData.value = data.customAttributes.map(i => {
                return {
                    id: i.id,
                    controlType: i.controlType,
                    entityID: i.entityID,
                    entityType: i.entityType,
                    isRequired: i.isRequired,
                    label: i.label,
                    order: i.order,
                    parameterValues: i.parameterValues.split(','),
                    tenantID: i.tenantID
                }
            })
            // description.value = data.description

            console.log(cutomFieldData.value, 'ffjjfj');
        }
        getSingleForm()

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
            console.log(cutomFieldData.value, 'kkkkk');
        }
        const saveCustomField = () => {
            centerDialogVisible.value = false
        }


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
            const formData = new FormData();
            const formData2 = new FormData();
            formData.append("name", formName.value);
            formData.append("description", description.value);
            formData.append("picture", selectedImage.value ? selectedImage.value : '');
            formData.append("tenantID", tenantId.value);
            formData.append("customAttributesString", JSON.stringify(cutomFieldData.value.map(i => {
                return {
                    parameterValues: i.parameterValues.toString(),
                    controlType: i.controlType,
                    label: i.label,
                    isRequired: i.isRequired
                };
            })));

            loading.value = true
            formData2.append("id", route.params.id);
            formData2.append("name", formName.value);
            formData2.append("description", description.value);
            formData2.append("date", dateUpdated.value);
            formData2.append("pictureUrl", url.value ? url.value : selectedImage.value);
            formData2.append("tenantID", tenantId.value);
            formData2.append("customAttributes", JSON.stringify(cutomFieldData.value.map(i => {
                return {
                    id: i.id,
                    parameterValues: i.parameterValues.toString(),
                    controlType: i.controlType,
                    label: i.label,
                    isRequired: i.isRequired
                };
            })));
            if (route.params.id) {
                try {
                    const { data } = await axios.put('/api/Forms/updateform', formData2)
                    console.log(data);
                    loading.value = false
                    ElMessage({
                        type: 'success',
                        message: 'Your Forms has been Updated successfully',
                        duration: 5000
                    })
                    // router.push(`/tenant/forms`)
                    router.push(`/tenant/forms/view/${data.id}`)
                }
                catch (error) {
                    loading.value = false
                    console.log(error);
                }
            } else {
                try {
                    const { data } = await axios.post('/api/Forms/saveform', formData)
                    console.log(data);
                    loading.value = false
                    ElMessage({
                        type: 'success',
                        message: 'Your Forms has been created successfully',
                        duration: 5000
                    })
                    router.push(`/tenant/forms/view/${data.id}`)
                }
                catch (error) {
                    loading.value = false
                    console.log(error);
                }
            }
        }

        return {
            formName,
            primarycolor,
            cutomFieldData,
            dropdownList,
            required,
            loading,
            description,
            responseType,
            centerDialogVisible,
            currentInput,
            tenantId,
            route,
            xsOnly, mdAndUp, lgAndUp, xlAndUp,
            selectedImage,
            fileImage,
            url,
            dateUpdated,
            chooseFile,
            handleRemove,
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

.image-upload img {
    height: 8rem;
}

.font-weight {
    font-weight: 500;
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