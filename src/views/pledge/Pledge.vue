<template>
    <div class="container-top" :class="{ 'container-wide': lgAndUp || xlAndUp }" >
        <router-view></router-view>
    </div>
</template>

<script>
import deviceBreakpoint from "../../mixins/deviceBreakpoint";
export default {
    setup() {
        const { lgAndUp, xlAndUp } = deviceBreakpoint()
        
        return{
            lgAndUp,
            xlAndUp,
        }
    },
}
</script>

<style scoped>

</style>