<script setup>
import { inject, reactive, ref } from 'vue';
import deviceBreakpoint from '../../../mixins/deviceBreakpoint';
import router from '../../../router';
import Table from "@/components/table/Table";
import { DeleteRemittableItem, GetRemittableItem, SaveRemittableItem, UpdateRemittableItem } from '../../../services/remittance/branchremittance';
import { ElMessage, ElMessageBox } from "element-plus";

const { lgAndUp, xlAndUp, mdAndUp, xsOnly } = deviceBreakpoint();
const primarycolor = inject('primarycolor');
const header = [
    { name: 'Collection Item', value: 'name' },
    { name: 'Remittable', value: 'percentage' },
    { name: 'Description', value: 'description' },
    { name: 'Actions', value: 'action' },
]
const initialState = {
    name: "",
    percentage: 0,
    description: ""
}
const remittanceitem = reactive({});
const itemloading = ref(false);
const getitemloading = ref(false);
const nameInputRef = ref(null)
const deleteLoading = ref(false);

const remittancesetupdata = ref([])

const createRemittanceItem = async () => {
    itemloading.value = true;
    if (remittanceitem.id) {
        try {
            await UpdateRemittableItem(remittanceitem);
            Object.assign(remittanceitem, { ...initialState, id: "" })
            getRemittanceItem();
            ElMessage({
                type: "success",
                message: "Remittance item updated succesfully",
                duration: 4000,
            });
            itemloading.value = false;
        } catch (error) {
            itemloading.value = false;
            console.error(error);
        }
    } else {
        try {
            await SaveRemittableItem(remittanceitem);
            itemloading.value = false;
            Object.assign(remittanceitem, initialState)
            ElMessage({
                type: "success",
                message: "Remittance item created succesfully",
                duration: 4000,
            });
            getRemittanceItem();
        } catch (error) {
            itemloading.value = false;
            console.error(error);
        }
    }
}

const getRemittanceItem = async () => {
    getitemloading.value = true;
    try {
        const response = await GetRemittableItem();
        remittancesetupdata.value = response;
        getitemloading.value = false;
    } catch (error) {
        getitemloading.value = false;
        console.error(error);
    }
}
getRemittanceItem();

const updateRemittableItem = async (payload) => {
    Object.assign(remittanceitem, payload)
    nameInputRef.value.focus();
}

const showConfirmModal = (id) => {
       ElMessageBox.confirm(
        "Are you sure you want to proceed?",
        "Confirm delete",
        {
          confirmButtonText: "OK",
          cancelButtonText: "Cancel",
          type: "error",
        }
      )
        .then(() => {
            deleteRemittableItem(id);
        })
        .catch(() => {
          ElMessage({
            type: "info",
            message: "Rejected",
            duration: 5000,
          });
        });
    };

const deleteRemittableItem = async (id) => {
    deleteLoading.value = true;
    try {
        const response = await DeleteRemittableItem(id);
        console.log(response)
        const findIndex = remittancesetupdata.value.findIndex(i => i.id === id);
        deleteLoading.value = false;
        if (findIndex >= 0) {
            remittancesetupdata.value.splice(findIndex, 1)
            ElMessage({
                type: "success",
                message: "Remittance item deleted",
                duration: 4000,
            });
        }
    } catch (error) {
        deleteLoading.value = false;
        console.error(error)
    }
}
</script>

<template>
    <main :class="{ 'container-wide': lgAndUp || xlAndUp }">
        <div class="container-top">
            <section>
                <div class="text-head h2 font-weight-bold py-0 my-0 text-black">Remittance item setup</div>
                <div class="col-12 mt-1 px-0">
                    <div @click="router.go(-1)">
                        <span class="s-18 fw-400 cursor-pointer text-black">
                            <img src="../../../assets/goback.png" alt="" /> Go back</span>
                    </div>
                </div>
            </section>
            <section class="mt-4">
                <div class="col-12 col-md-6 offset-md-3 card">
                    <div>
                        <div class="text_label">Offering or collection item</div>
                        <el-input type="text" placeholder="Enter collection name" ref="nameInputRef"
                            v-model="remittanceitem.name" />
                    </div>
                    <div class="mt-4">
                        <div class="text_label">Remittance percentage</div>
                        <el-input type="number" placeholder="Enter remittable percentage"
                            v-model="remittanceitem.percentage">
                            <template #suffix>
                                %
                            </template>
                        </el-input>
                        <div class="small-text mt-1">{{ remittanceitem?.percentage ?? 0 }}% of the total collection will
                            be sent to the HQ,
                            while the
                            branch holds remaining {{ 100 - (remittanceitem?.percentage ?? 0) }}%</div>
                    </div>
                    <div class="mt-4">
                        <div class="text_label">Description</div>
                        <el-input type="textarea" rows="4" placeholder="Enter description"
                            v-model="remittanceitem.description" />
                    </div>
                    <!-- <div class="mt-4">
                        <div class="text_label">Receiving Bank Account</div>
                        <el-input type="text" placeholder="Choose bank" />
                    </div>
                    <div class="d-flex align-items-center justify-content-center my-3 gap-5 c-pointer">
                        <el-icon :color="primarycolor">
                            <CirclePlus />
                        </el-icon> &nbsp;
                        <div class="font-weight-600" :style="`color: ${primarycolor}`">Add new bank account</div>
                    </div> -->
                    <div class="d-flex justify-content-center mt-4">
                        <el-button :color="primarycolor" :loading="itemloading" class="px-5"
                            @click="createRemittanceItem" size="large" round>{{ remittanceitem.id ? 'Update' : 'Save'
                            }}</el-button>
                    </div>
                </div>
                <div class="col-12 col-md-6 offset-md-3 border px-0 mt-5" v-loading="getitemloading">
                    <div class="w-100" v-if="remittancesetupdata.length > 0">
                        <Table :data="remittancesetupdata" :headers="header" :checkMultipleItem="false">
                            <template v-slot:name="{ item }">
                                <div class="c-pointer fw-500 s-16">
                                    {{ item.name }}
                                </div>
                            </template>
                            <template v-slot:percentage="{ item }">
                                <div class="c-pointer transform_none fw-500 s-16">
                                    {{ item.percentage }}%
                                </div>
                            </template>
                            <template v-slot:description="{ item }">
                                <div class="c-pointer transform_none fw-500 s-16">
                                    {{ item.description }}
                                </div>
                            </template>
                            <template v-slot:action="{ item }">
                                <div class="c-pointer">
                                    <div>
                                        <el-icon color="#6D6D6D" @click="updateRemittableItem(item)" :size="20">
                                            <Edit />
                                        </el-icon> &nbsp;
                                        <el-icon :size="20" class="is-loading" v-if="deleteLoading">
                                            <Loading />
                                        </el-icon>
                                        <el-icon color="#E44040" :size="20"
                                            @click="showConfirmModal(item.id)" v-else>
                                            <Delete />
                                        </el-icon>
                                    </div>
                                </div>
                            </template>
                        </Table>
                    </div>
                    <div class="p-2" v-else>
                        <h4 class="font-weight-600 text-center">Your collection items will appear here</h4>
                    </div>
                </div>
            </section>
        </div>
    </main>
</template>

<style scoped>
.card {
    background-color: #EBEDFF;
    padding: 40px
}

.text_label {
    color: #1E1E1E;
    font-weight: 500;
    margin-bottom: 5px;
}
</style>