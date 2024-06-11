<template>
    <div class="row pb-4">
      <div class="col-md-6 offset-md-3">
        <div class="dialog-body-text">Get back on track with your
          church Management, Don’t miss out!</div>
      </div>
      <div class="col-md-6 offset-md-3  mt-3">
        <el-button :color="primarycolor" :loading="loading" size="large" class="w-100" @click="subscriptionPage(1)"
          round>Subscribe Now</el-button>
          <div class="text-center my-2 s-18 text-dark">or</div>
          <el-button class="secondary-button w-100" size="large" @click="subscriptionPage(2)" round>Use communication module</el-button>
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
.dialog-body-text {
  color: #171717;
  text-align: center;
  font-weight: 700;
  font-size: 20px;
}
</style>
