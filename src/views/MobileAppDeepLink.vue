<script setup>
import { onMounted } from 'vue';

const getDeviceType = () => {
    const ua = navigator.userAgent;

    console.log(ua)
    if (/iPad|iPhone|iPod/.test(ua)) {
        return 'iOS Device';
    } else if (/Android/.test(ua)) {
        return 'Android Device';
    } else if (/Windows/.test(ua)) {
        return 'Windows Device';
    } else {
        return 'Other Device';
    }
}

onMounted(() => {
    window.location.href = "faithconnect://feeddetail/123"
})


console.log(getDeviceType()); // Outputs the type of device
</script>

<template>
    <div>Here</div>
    <a href="mail://" >fff</a>
</template>