<template>
    <div class="container-fluid container-top">
        <div class="d-flex flex-wrap flex-column flex-sm-row mb-3 justify-content-between">
            <div class="">
                <div class="head-text">Forms</div>
            </div>
            <div class="d-flex flex-column flex-sm-row   link">
                <router-link class="" to="/tenant/createform">
                    <el-button :color="primarycolor" class="header-btn w-100 mt-3 mt-sm-0" round>
                        Create New Form
                    </el-button></router-link>
            </div>
        </div>
        <Table :data="formItems" :headers="formHeaders" :checkMultipleItem="false" v-loading="loading">
            <template v-slot:name="{ item }">
                <div class="c-pointer" @click="formListClick(item.id)">
                    {{ item.name }}
                </div>
            </template>
            <template v-slot:entries="{ item }">
                <div class="c-pointer" @click="formListClick(item.id)">
                    {{ item.entries }}
                </div>
            </template>
            <template v-slot:date="{ item }">
                <div class="c-pointer" @click="formListClick(item.id)">
                    {{ date(item.date) }}
                </div>
            </template>
            <template v-slot:action="{ item }">
                <el-dropdown trigger="click">
                    <el-icon>
                        <MoreFilled />
                    </el-icon>
                    <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item>
                                <router-link :to="`/tenant/createform?formID=${item.id}`"
                                    class="text-color">Edit
                                    Form</router-link>
                            </el-dropdown-item>
                            <el-dropdown-item>
                                <router-link :to="`/tenant/singleformlist?id=${item.id}`" class="text-color">View
                                    Form</router-link>
                            </el-dropdown-item>
                            <el-dropdown-item>
                                <div @click.prevent="showConfirmModal(item.id, index)" class="text-color">
                                    Delete
                                </div>
                            </el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
            </template>
        </Table>
    </div>
</template>

<script>
import { ref, computed, inject } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import monthDayYear from "../../services/dates/dateformatter";
import axios from "@/gateway/backendapi";
import Table from "@/components/table/Table";
export default {
    components: {
        Table,
    },
    setup() {
        const loading = ref(false)
        const primarycolor = inject("primarycolor");

        const formHeaders = ref([
            { name: "FORM NAME", value: "name" },
            { name: "ENTRIES", value: "entries" },
            { name: "DATE", value: "date" },
            { name: "ACTION", value: "action" },
        ]);
        const formItems = ref([]);

        const showConfirmModal = (id, index) => {
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
                    deleteForm(id, index);
                })
                .catch(() => {
                    ElMessage({
                        type: "info",
                        message: "Delete canceled",
                        duration: 5000,
                    });
                });
        };

        const deleteForm = (id) => {
            axios
                .delete(`/api/Forms/deleteform?Id=${id}`)
                .then((res) => {
                    console.log(res);
                    ElMessage({
                        type: "success",
                        message: "Form deleted successfully",
                        duration: 5000,
                    });
                    formItems.value = formItems.value.filter(
                        (formItems) => formItems.id !== id
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
        };


        const getAllForms = async () => {
            try {
                const { data } = await axios.get('/api/Forms/getallforms')
                console.log(data, 'mmmn');
                formItems.value = data
            }
            catch (error) {
                console.log(error);
            }
        }
        getAllForms()

        const date = (offDate) => {
            return monthDayYear.monthDayYear(offDate);
        };


        return {
            formHeaders,
            formItems,
            loading,
            primarycolor,
            date,
            showConfirmModal,
            deleteForm
        }
    },
}
</script>

<style scoped>
.text-color {
    color: #212529;
    text-decoration: none;
}

.text-color:hover {
    color: #007bff;
}
</style>