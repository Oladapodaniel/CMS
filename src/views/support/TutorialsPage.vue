<script setup>
import { ref, computed } from "vue";
import router from "@/router/index";

const searchQuery = ref("");

const tutorials = ref([
  {
    id: 1,
    title: "Getting Started on Churchplus",
    videoUrl: "https://www.youtube.com/embed/0iZXCehN7gk?si=4YBSv8D10qCpGK7N",
  },
  {
    id: 2,
    title: "How To Sign Up On Churchplus Church Management Solution",
    videoUrl: "https://www.youtube.com/embed/-i2fa07-ThY?si=HjIdcD8zVqu2TPAE" ,
  },
  {
    id: 3,
    title: "How To Add Members To Churchplus Church Management Software",
    videoUrl: "https://www.youtube.com/embed/zcwna-kshGo?si=oLRUfD0n1axmWYOU" ,
  },
  {
    id: 4,
    title: "How to send SMS on ChurchPlus Administration Solution",
    videoUrl: "https://www.youtube.com/embed/woeot9MAId8?si=INtUkPri9timNqYQ",
  },
  {
    id: 5,
    title: "How to Send Voice Messages",
    videoUrl: "https://www.youtube.com/embed/xQK4X5iJp-4?si=_mQCAC_sEbQ7AKMC",
  },
  {
    id: 6,
    title: "How To Create Form",
    videoUrl: "https://www.youtube.com/embed/r35sel4BhOs?si=Ayw1TDSNAaLRP-77",
  },
  // Add more tutorials as needed
]);

const filteredTutorials = computed(() => {
  return tutorials.value.filter((tutorial) =>
    tutorial.title.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

const goBack = () => {
  router.go(-1);
};
</script>
<template>
  <div class="container-wide mt-5">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <div class="mb-2">
        <div class="text-head font-weight-bold h2 py-0 my-0 text-black">Tutorials</div>
        <div @click="goBack">
          <span class="s-18 fw-400 cursor-pointer text-black">
            <img src="../../assets/goback.png" alt="" /> Go back</span
          >
        </div>
      </div>
      <div>
        <el-input
          type="text"
          class="w-100"
          placeholder="Search"
          v-model="searchQuery"
        />
      </div>
    </div>
    <div class="row mt-4">
      <div class="col-md-12 px-3 py-5 bg-gray-500 border-radius-border-8">
        <div class="row">
          <div
            class="col-md-4 mb-4"
            v-for="tutorial in filteredTutorials"
            :key="tutorial.id"
          >
            <div class="col-md-12">
              <div class="embed-responsive embed-responsive-16by9 mb-3">
                <iframe
                  width="100%"
                  height="315"
                  :src="tutorial.videoUrl"
                  title="YouTube video player"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerpolicy="strict-origin-when-cross-origin"
                  allowfullscreen
                ></iframe>
              </div>
            </div>
            <div class="col-md-12">
                <div class="fw-500">{{ tutorial.title }}</div>
              </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

.card-img-top {
  height: 200px;
  object-fit: cover;
}
</style>
