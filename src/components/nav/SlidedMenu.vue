<script setup>
import { ref } from 'vue';

defineProps({
    links: {
        type: Array,
        required: true
    }
})

const emit = defineEmits({
    event: "index"
})
const activeMenu = ref(0)


</script>
<template>
    <div class="steps_card">
        <div v-for="(item, index) in links" :key="index" :class="{
            'active': index == activeMenu,
            'menuItem1': index - activeMenu <= 0,
            'menuItem2': index - activeMenu > 0
        }" class="menuItem" @click="(activeMenu = index),(emit('index', index))">{{ item }}</div>
    </div>
</template>

<style scoped>
.steps_card {
    background: #D4FBFB;
    padding: 15px 0;
    border-radius: 8px
}

.menuItem {
    padding: 8px 15px;
    cursor: pointer;
}

.menuItem1::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    transform: translateY(100%);
    transition: transform 0.3s ease;
    z-index: -1;
}

.menuItem2::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    transform: translateY(-100%);
    transition: transform 0.3s ease;
    z-index: -1;
}

.active {
    transform: translateY(0);
    color: #FFF;
    font-weight: 600;
}

.active::before {
    color: white;
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #0745AF;
    transform: translateY(0);
    transition: transform 0.3s ease;
    z-index: -1;
}
</style>