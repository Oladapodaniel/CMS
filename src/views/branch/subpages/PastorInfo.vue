<template>
  <div class="container-fluid my-5">
    <div class="row  custom-card justify-content-center">
      <div class="col-md-8 col-11 h-100">
        <div class="py-4 col-md-12 d-flex flex-wrap justify-content-center h-100 ">
          <!-- Image Section -->
          <div class="image-section  h-100  w-100 mr-4" v-loading="loading">
            <img
            v-if="singleBranchInfo && singleBranchInfo.imageUrl"
              :src="singleBranchInfo.imageUrl"
              alt=""
              class=" w-100 h-100 rounded"
            />
            <img
            v-else
              src="../../../assets/pastorImage.png"
              alt=""
              class=" w-100 h-100 rounded"
            />
          </div>
          <!-- Contact Information Section -->
          <div class="info-section mt-4 mt-md-0 w-100 p-4" v-loading="loading">
            <h5 class="info-title">Pastor’s Contact information</h5>
            <h6 class="info-name">{{ singleBranchInfo && singleBranchInfo.pastorName ? singleBranchInfo.pastorName : '' }}</h6>
            <div class="info-text">
              <span>Email: </span><span>{{ singleBranchInfo && singleBranchInfo.pastorEmail ? singleBranchInfo.pastorEmail : '' }}</span> <br />
              <span>Phone Number:</span> <span>{{ singleBranchInfo && singleBranchInfo.pastorPhone ? singleBranchInfo.pastorPhone : '' }}</span> <br />
              <span>Address:</span> <span>{{ singleBranchInfo && singleBranchInfo.Address ? singleBranchInfo.Address : '' }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "@/gateway/backendapi";

const singleBranchInfo = ref({});
const loading = ref(false)

const geSingleBranchInfo = async () => {
      const singleBranchID = localStorage.getItem("branchId");
      loading.value = true;
      try {
        let { data } = await axios.get(
          `/api/Branching/GetBranchInformation?Id=${singleBranchID}`
        );
        singleBranchInfo.value = data.returnObject;
        console.log(singleBranchInfo.value, "weeingle");

        loading.value = false;
      } catch (error) {
        loading.value = false;
        console.log(error);
      }
    };
    geSingleBranchInfo();
</script>

<style scoped>
/* Custom Card Styling */
.custom-card {
  background-color: #EBEDFF; /* Light purple background */
  border-radius: 15px;
  padding: 20px;
  display: flex;
  align-items: center;
}

/* Image Section Styling */
.image-section {
  flex: 0 0 40%;
  /* max-width: 40%; */
  /* padding-right: 20px; */
}

.image-section img {
  border-radius: 10px;
}

/* Information Section Styling */
.info-section {
  background-color: #fff;
  border-radius: 15px;
  flex: 1;
}

.info-title {
  font-weight: 600;
  margin-bottom: 15px;
}

.info-name {
  color: #007bff;
  font-weight: bold;
  margin-bottom: 10px;
}

.info-text {
  line-height: 1.8;
}
</style>
