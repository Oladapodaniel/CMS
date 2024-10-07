<script setup>

</script>

<template>
    <div class="col-md-12 mb-1 verify_email">
        <div>
            <h4 class="font-weight-600">Your email is not verified yet</h4>
            <div class="s-14">Limited feature use, <span class="font-weight-600">Verify to go unlimited!</span></div>
        </div>
        <div class="cursor-pointer" @click="subscribeNow">
            <el-button size="large" class="verify_button" round>Verify now</el-button>
        </div>
    </div>
</template>

<style scoped>
.verify_email {
    border-left: solid #FF4B4B 7px;
    border-top-left-radius: 5px 5px;
    border-bottom-left-radius: 5px 5px;
    background-color: #F8F0E7;
    border-top-right-radius: 20px;
    border-bottom-right-radius: 20px;
    color: #171717;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 30px 20px;
}

.verify_button {
    background-color: #E93535;
    color: #FFFFFF;
    outline: #E93535;
}

.verify_button:active,
.verify_button:focus {
    outline: #E93535;
    border: 1px solid #e97e7e
}

.verify_button:hover {
    background-color: #e97e7e;
}
</style>