<script setup>
import { ref, computed } from "vue";
import router from "@/router/index";

const searchQuery = ref("");

const tutorials = ref([
  {
    id: 1,
    title: "Benefits Of Churchplus",
    videoUrl: "https://www.youtube.com/embed/QwB9XYhayvI?si=iw9lN6qImOorkOw8",
  },
  {
    id: 2,
    title: "Overview Of Churchplus Church Management Solution",
    videoUrl: "https://www.youtube.com/embed/0iZXCehN7gk?si=4YBSv8D10qCpGK7N",
  },
  {
    id: 3,
    title: "How To Sign Up On Churchplus Church Management Solution",
    videoUrl: "https://www.youtube.com/embed/-i2fa07-ThY?si=HjIdcD8zVqu2TPAE" ,
  },
  {
    id: 4,
    title: "How To Add Members To Churchplus Church Management Software",
    videoUrl: "https://www.youtube.com/embed/zcwna-kshGo?si=oLRUfD0n1axmWYOU" ,
  },
  {
    id: 5,
    title: "How to Add First-Timer To Churchplus Administrative Software",
    videoUrl: "https://www.youtube.com/embed/OOsP6uUwnIo?si=JRK9tpgQ2QQfNxuB" ,
  },
  {
    id: 6,
    title: "How to send SMS on ChurchPlus Administration Solution",
    videoUrl: "https://www.youtube.com/embed/woeot9MAId8?si=INtUkPri9timNqYQ",
  },
  {
    id: 7,
    title: "How to send Email using ChurchPlus Administration Solution",
    videoUrl: "https://www.youtube.com/embed/KHBK-eZzUp4?si=NCtovKzbHtsQ6ujU",
  },
  {
    id: 8,
    title: "How to Send Voice Messages",
    videoUrl: "https://www.youtube.com/embed/xQK4X5iJp-4?si=_mQCAC_sEbQ7AKMC",
  },
  {
    id: 9,
    title: "How To Create Form",
    videoUrl: "https://www.youtube.com/embed/r35sel4BhOs?si=Ayw1TDSNAaLRP-77",
  },
  {
    id: 10,
    title: "Import Members Data Using Excel or CSV File",
    videoUrl: "https://www.youtube.com/embed/YtFrG5zf3qw?si=HXh9EPwX7o8eJfI5",
  },
  {
    id: 11,
    title: "Manage Members Effectively Using Enhanced ChurchPlus Features",
    videoUrl: "https://www.youtube.com/embed/9tKTxWAywpg?si=bOqTSUqdfQmv5Bf0",
  },
  {
    id: 12,
    title: "Import First Timer via Excel and CSV File",
    videoUrl: "https://www.youtube.com/embed/8rBD8vTtnxw?si=m-5fvoEqzMID2H4c",
  },
  {
    id: 13,
    title: "A Quick Overview on First Timer Follow-Up",
    videoUrl: "https://www.youtube.com/embed/EHFpXNBhe2c?si=WElrW09o5kOoY_6g",
  },
  {
    id: 14,
    title: "How To Effectively Follow up On First Timers Using ChurchPlus Administrative Solution (Part A)",
    videoUrl: "https://www.youtube.com/embed/QDVyBYKgnBA?si=QYCmAtUfMaYJq4jI",
  },
  {
    id: 15,
    title: "How To Effectively Follow up On First Timers Using ChurchPlus Administration Solution Part B",
    videoUrl: "https://www.youtube.com/embed/_X5Ger8o8Es?si=h7VjiyEq712DWaQT",
  },
  {
    id: 16,
    title: "How to Add Event and Generate Service Report",
    videoUrl: "https://www.youtube.com/embed/JSI7IksFUNQ?si=-wLupfhwGHMfTcdM",
  },
  {
    id: 17,
    title: "How To Edit Service Report",
    videoUrl: "https://www.youtube.com/embed/MWa-r72KiJo?si=0YU65Js25KG3VG7y",
  },
  {
    id: 18,
    title: "How To Create & Modify Groups",
    videoUrl: "https://www.youtube.com/embed/R0wPyiDoUfw?si=awRn8Q6EzkfZbUQH",
  },
  {
    id: 19,
    title: "How To Create Sub-Groups",
    videoUrl: "https://www.youtube.com/embed/wslwCMW34NU?si=Vv0HfMnpwAoyPkXE",
  },
  {
    id: 20,
    title: "How To Add Offering & Keep Proper Offering Records.",
    videoUrl: "https://www.youtube.com/embed/nYU4JRZVyuw?si=IqrQ6m4tomOGhWVh",
  },
  {
    id: 21,
    title: "How To Setup Online Donation On ChurchPlus",
    videoUrl: "https://www.youtube.com/embed/j2QR5rsKvBg?si=6Nce8xvcevF9Z6gw",
  },
  {
    id: 22,
    title: "How To Set Up Membership Mobile App On ChurchPlus",
    videoUrl: "https://www.youtube.com/embed/X4Gtz6T4HLM?si=p2Wa4TsLAEaEjA-7",
  },
  {
    id: 23,
    title: "Churchplus Products",
    videoUrl: "https://www.youtube.com/embed/-bHwPuyo9Lc?si=70Yhkf9tHJYtOWV8",
  },
  {
    id: 24,
    title: "Churchplus Products Pricing",
    videoUrl: "https://www.youtube.com/embed/Opuv58cGmgk?si=OYlJzMmFlSPk53dF",
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
            class="col-md-3 mb-4"
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
