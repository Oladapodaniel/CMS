<template>
    <div class="container-fluid container-top">
        <div class="d-flex flex-wrap flex-column flex-sm-row mb-3 justify-content-between">
            <div class="">
                <div class="head-text">Programming Survey</div>
            </div>
            <div class="d-flex flex-column flex-sm-row   link">
                <router-link class="" to="/tenant/pledge/makepledge">
                    <el-button :color="primarycolor" class="header-btn w-100 mt-3 mt-sm-0" round>
                        Manage Form
                    </el-button></router-link>
            </div>
        </div>
        <div class="d-flex flex-wrap flex-column flex-sm-row row" v-if="route.fullPath == `/tenant/singleformlist?id=${route.query.id}`">
            <div class="col-12 py-md-4 mt-3">
                <div class="font-weight-bold">Copy and Share the link</div>
                <div class="p-inputgroup form-group mt-2">
                    <el-input v-model="formlink" placeholder="Click the copy button when the link appears"
                        ref="selectedLink" class="input-with-select">
                        <template #append>
                            <el-button @click="copylink">
                                <el-icon>
                                    <CopyDocument />
                                </el-icon>
                            </el-button>
                        </template>
                    </el-input>
                </div>
            </div>
        </div>
        <Table :data="formItems" :headers="formHeaders" :checkMultipleItem="false" v-loading="loading">
            <template v-slot:name="{ item }">
                <div class="c-pointer" @click="formListClick(item.id)">
                    {{ item.name }}
                </div>
            </template>
            <template v-slot:age="{ item }">
                <div class="c-pointer" @click="formListClick(item.id)">
                    {{ item.age }}
                </div>
            </template>
            <template v-slot:incomerange="{ item }">
                <div class="c-pointer" @click="formListClick(item.id)">
                    {{ item.incomerange }}
                </div>
            </template>
            <template v-slot:action="{ item }">
                <el-dropdown trigger="click">
                    <el-icon>
                        <MoreFilled />
                    </el-icon>
                    <template #dropdown>
                        <el-dropdown-menu>
                            <!-- <el-dropdown-item>
                                <router-link :to="`/tenant/pledge/pledgemaking?pledgeTypeID=${item.id}`"
                                    class="text-color">
                                    Form</router-link>
                            </el-dropdown-item> -->
                            <el-dropdown-item>
                                <router-link :to="`/tenant/pledge/makepledge?id=${item.id}`"
                                    class="text-color">Edit</router-link>
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
import Table from "@/components/table/Table";
import { ElMessage, ElMessageBox } from "element-plus";
// import router from "../../router";
import { useRoute } from "vue-router";
export default {
    components: {
        Table,
    },
    setup() {
        const loading = ref(false)
        const selectedLink = ref(null)
        const formlink = ref('')
        const primarycolor = inject("primarycolor");
        const route = useRoute();

        const formHeaders = ref([
            { name: "NAME", value: "name" },
            { name: "Age", value: "age" },
            { name: "INCOME RANGE", value: "incomerange" },
            { name: "ACTION", value: "action" },
        ]);
        const formItems = ref([
            { name: "Sam loko", age: "29", incomerange: "200k", id: 1 },
            { name: "James Ibori", age: "30", incomerange: "200k", id: 2 },
            { name: "Adams Lawmon", age: "89", incomerange: "200k", id: 3 },
            { name: "Samson lawnrence", age: "76", incomerange: "200k", id: 4 },
            { name: "Stephen Brown", age: "40", incomerange: "200k", id: 5 },
        ]);


        const copylink = () => {
            selectedLink.value.input.setSelectionRange(
                0,
                selectedLink.value.input.value.length
            ); /* For mobile devices */
            selectedLink.value.input.select();

            /* Copy the text inside the text field */
            document.execCommand("copy");
            ElMessage({
                showClose: true,
                message: "Copied to clipboard",
                type: "success",
            });
        };


        return {
            formHeaders,
            formlink,
            formItems,
            loading,
            primarycolor,
            route,
            selectedLink,
            copylink
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