<script setup>
import router from '../../../../router';
</script>

<template>
    <el-dropdown trigger="click"
        class="align-items-center justify-content-center d-flex ml-md-3 ml-0 default-btn py-0 m-0 border"
        style="height: 2.2rem">
        <span class="el-dropdown-link w-100 primary--text text-center font-weight-600">
            More
            <el-icon class="el-icon--right">
                <arrow-down />
            </el-icon>
        </span>
        <template #dropdown>
            <el-dropdown-menu>
                <el-dropdown-item class="text-black" @click="router.push('/tenant/branchremittance/remittancesetup')">
                    Remittance setup
                </el-dropdown-item>
                <!-- <el-dropdown-item class="text-black" @click="router.push('/tenant/branchremittance/bankinfosetup')">
                    Bank info setup
                </el-dropdown-item> -->
            </el-dropdown-menu>
        </template>
    </el-dropdown>
</template>