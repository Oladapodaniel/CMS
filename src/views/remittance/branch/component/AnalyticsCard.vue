<script setup>
    defineProps(['item'])
</script>

<template>
    <div class="card_wrapper">
        <div class="d-flex  justify-content-between">
            <div>
                <img class="icon" :src="item.icon" />
            </div>
            <div>
                <div class="texttop">{{ item.texttop }}</div>
                <div class="topvalue">{{ item.topvalue }}</div>
            </div>
        </div>
        <div class="d-flex justify-content-between mt-5">
            <div>
                <div class="texttop">{{ item.textbottom }}</div>
                <div class="bottomvalue">{{ item.bottomvalue }}</div>
            </div>
            <div class="trend" v-html="item.trend"></div>
        </div>
    </div>
</template>

<style scoped>
.card_wrapper {
    border: 1px solid #C1C1C1;
    background-color: #F8F8F8;
    border-radius: 15px;
    padding: 20px;
}
.icon {
    width: 50px;
    height: 50px;
}

.texttop {
    color: "#555555";
    /* font-size: 14px */
}

.topvalue {
    color: "#555555";
    font-weight: 600;
    font-size: 20px
}

.bottomvalue {
    color: #1E1E1E;
    font-weight: 600;
    font-size: 28px
}

.trend {
    color: #05AC34;
    font-size: 18px;
}
</style>