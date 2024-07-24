<script setup>
import { ref } from "vue";
import router from "@/router/index";
    const videoURL = ref("https://www.youtube.com/embed/0iZXCehN7gk?si=4YBSv8D10qCpGK7N");
    const moreTutorial = () =>{
      router.push('/tenant/tutorials')
    }
</script>

<template>
  <div class="container-wide my-5">
    <h2 class="mb-4">Support</h2>
    <div class="row">
      <!-- Tutorials Section -->
      <div class="col-md-6   mb-4">
        <div class="col-md-12 border-radius-border-8 bg-gray-500 ">
          <div class="card-body">
            <h4 class="card-title">Tutorials</h4>
            <p>Learn the easy steps to use Churchplus</p>
            <div class="embed-responsive embed-responsive-16by9 mb-3">
              <iframe
                width="100%"
                height="315"
                :src="videoURL"
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerpolicy="strict-origin-when-cross-origin"
                allowfullscreen
              ></iframe>
            </div>
          </div>
          <div class="col-md-12 mb-4">
            <div class="row justify-content-center">
              <div class="col-md-9 col-11">
                <el-button round color="#EF0000" @click="moreTutorial" class="w-100 py-4">
                  Watch more Tutorials
                <img src="../../assets/Video.svg" alt="">
                </el-button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Contact Us Section -->
      <div class="col-md-6  mb-4">
        <div class="col-md-12 border-radius-border-8 bg-gray-500 h-100 ">
            <div class="card-body">
            <h4 class="card-title">How to Contact Us</h4>
            <p>We are committed to assisting you navigate smoothly</p>
            <ul class="list-unstyled">
              <li class="mb-3 p-3 bg-white border-radius-8">
                <span><img src="../../assets/message.svg" alt="" style="height: 1.5rem " /></span>
                <a  href="mailto:support@churchplus.co" class="ml-2 text-dak"
                  >support@churchplus.co</a
                >
              </li>
              <li class="mb-3 p-2 bg-white border-radius-8">
                <span><img src="../../assets/phone-icon.png" style="height: 2.5rem " alt=""></span>
                <span class="ml-2">+234 802 373 9961</span>
              </li>
              <li class="bg-white border-radius-8 p-2">
                <span><img src="../../assets/whatsapp-icon.png" style="height: 2.5rem " alt=""></span>
                <span class="ml-2">++234 802 373 9961</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>


.card-title {
  font-weight: 500;
}


.embed-responsive-item {
  border-radius: 10px;
}

</style>
