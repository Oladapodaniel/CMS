<template>
    <div class="container-fluid px-0">
        <div class="d-flex flex-column flex-sm-row justify-content-sm-between mb-3">
            <div class="head-text">Manage Branches</div>
            <div class="mb-3">
                <div class=" c-pointer ">
                    <el-button round class="header-btn" :color="primarycolor">
                         Add Branch
                    </el-button>
                </div>
                <!-- <div class=" c-pointer header-btn " data-toggle="modal" data-target="#statusmodal" ref="statusmodalBtn">
                    Add Branch
                </div> -->
            </div>
        </div>
        <div class="container-fluid ">
            <div class="row py-5 branch-corner ">
                
            </div>
        </div>
    </div>
</template>

<script>
import { inject } from "vue";
export default {
    setup() {
        const primarycolor = inject("primarycolor");

        return {
            primarycolor
        }
    },
}
</script>

<style scoped>
.branch-corner{
    border-radius: 0.5rem;
    background: #ebeff4;
}
</style>