<template>
    <div class="wrapper">
        <div class="d-flex flex-column flex-md-row justify-content-md-between">
            <div class="d-flex flex-column flex-sm-row">
                <div class="icon-bg">
                    <img src="../../assets/doc_check.svg" class="" />
                </div>
                <div class="body-text">
                    <div>Maximum Capacity of your plan has been reached</div>
                    <div>You can add more Members when you upgrade your plan</div>
                </div>
            </div>
            <router-link to="/tenant/subscription">
                <button class="upgrade-button mt-3 mt-md-0">Upgrade Plan</button>
            </router-link>
        </div>
    </div>
</template>

<script>
export default {
    setup () {
        return {}
    }
}
</script>

<style scoped>
.wrapper {
    background-color: #ffea98;
    padding: 20px;
    border: 1px solid #D0D5DD;
    border-radius: 8px;
}

.body-text div:first-child {
    font-weight:800;
    font-size: 20px;
}

.body-text div:nth-child(2) {
    font-weight:200;
    font-size: 18px;
    margin-top: -5px;
}

.upgrade-button {
    background-color: #F94A21;
    color: white;
    font-weight: 700;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    outline-color: black;
}
.icon-bg {
    width: 50px;
    height: 50px;
    background-color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 10px
}

.icon-bg > img {
    width: 30px;
    height: 30px;
}
</style>