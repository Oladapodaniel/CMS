<script setup>
import Navbar from "./component/Navbar.vue";
</script>
<template>
  <div class="contaniner-fluid  px-0">
    <div class="row">
      <div class="col-md-12"><Navbar /></div>
    </div>
    <div class="row">
      <div class="col-md-12">
        <router-view />
      </div>
    </div>
  </div>
</template>
<style scoped>
.header {
  background-color: #000000; /* Adjust the background color as needed */
}

.header h1 {
  font-size: 2.5rem; /* Adjust the font size as needed */
}

.header p {
  font-size: 1.25rem; /* Adjust the font size as needed */
}
</style>
