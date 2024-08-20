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
    if (getDeviceType() === 'Other Device') {
        console.log('Not a mobile devices');
        return;
    }
    const url = window.location.href;
    const parsedUrl = new URL(url);
    const params = new URLSearchParams(parsedUrl.search);
    const scheme = params.get('scheme');
    const type = params.get('type');
    const id = params.get('id');
    window.location.href = `${scheme}://${type}/${id}`
    console.log(`${scheme}://${type}/${id}`)
})


console.log(getDeviceType()); // Outputs the type of device
</script>

<template>
</template>