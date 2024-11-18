<template>
    <el-skeleton animated>
        <template #template>
            <div class="d-flex flex-column flex-md-row align-items-center justify-content-between mt-4">
                <el-skeleton-item variant="square" class="mt-3 mt-md-0"
                    style="width: 200px; height: 200px; border-radius: 10px" />
                <el-skeleton-item variant="square" class="mt-3 mt-md-0"
                    style="width: 200px; height: 200px; border-radius: 10px" />
                <el-skeleton-item variant="square" class="mt-3 mt-md-0"
                    style="width: 200px; height: 200px; border-radius: 10px" />
                <el-skeleton-item variant="square" class="mt-3 mt-md-0"
                    style="width: 200px; height: 200px; border-radius: 10px" />
            </div>
        </template>
    </el-skeleton>
    <el-skeleton animated>
        <template #template>
            <div class="row mt-4">
                <div class="col-md-8">
                    <el-skeleton-item variant="square" style="border-radius: 10px; height: 300px" />
                </div>
                <div class="col-md-4">
                    <el-skeleton-item variant="square" style="border-radius: 10px; height: 300px" />
                </div>
            </div>
            <div class="row mt-4">
                <div class="col-md-12">
                    <el-skeleton-item variant="square" style="border-radius: 10px; height: 200px" />
                </div>
            </div>
        </template>
    </el-skeleton>
</template>