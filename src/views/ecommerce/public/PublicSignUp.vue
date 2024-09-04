<script setup>
import axios from "@/gateway/backendapi";
import { ref } from "vue";
import HeaderSection from "./component/HeaderSection.vue";
import { useStore } from "vuex";
import router from "../../../router";
import { ElMessage } from "element-plus";

const email = ref("");
const password = ref("");
const fullName = ref("");
const phoneNumber = ref("");
const store = useStore();

const currentUser = ref(store.getters.currentUser);
const tenantId = ref(currentUser.value.tenantId);
console.log(tenantId.value, "hhsgsg");

const handleLogin = async () => {
  let payload = {
    email: email.value,
    password: password.value,
    phoneNumber: phoneNumber.value,
    name: fullName.value,
    tenantID: tenantId.value,
  };
  console.log(payload, "Payload");

  try {
    const { data } = await axios.post("/mobile/v1/Account/WebSignUp", payload);
    console.log(data, "login");
    if (data.status) {
      ElMessage({
        type: "success",
        showClose: true,
        message: "Account Created Successfully",
        duration: 10000,
      });
      router.push('/store/home')
    } else {
      ElMessage({
        type: "error",
        showClose: true,
        message: "Failed, try again",
        duration: 10000,
      });
    }
  } catch (error) {
    console.log(error);
    ElMessage({
        type: "error",
        showClose: true,
        message: "Failed, try again",
        duration: 10000,
      });
  }
  // Handle login logic here
};
</script>
<template>
  <div class="row">
    <HeaderSection
      title="Create an account"
      subtitle="Order and Track it shipment easily"
    />
  </div>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-7 mb-5">
        <div class="card bg-gray-500 p-4">
          <div class="card-body">
            <div>
              <div class="form-group">
                <label class="fw-500 s-20 text-dak" for="email">Name</label>
                <el-input
                  type="text"
                  class="w-100"
                  v-model="fullName"
                  placeholder="Your name"
                  required
                />
              </div>
              <div class="form-group">
                <label class="fw-500 s-20 text-dak" for="email">Email</label>
                <el-input
                  type="email"
                  class="w-100"
                  v-model="email"
                  placeholder="Email Address"
                  required
                />
              </div>
              <div class="form-group">
                <label class="fw-500 s-20 text-dak" for="number">Phone Number</label>
                <el-input
                  type="number"
                  class="w-100"
                  v-model="phoneNumber"
                  placeholder="Phone"
                  required
                />
              </div>
              <div class="form-group">
                <label class="fw-500 s-20 text-dak" for="password">Password</label>
                <el-input
                  type="password"
                  class="w-100"
                  v-model="password"
                  placeholder="Password"
                  required
                />
              </div>
              <div class="form-group">
                <a href="#" class="fw-500 text-dak">Forgot password?</a>
              </div>
              <div class="row justify-content-center">
                <div class="col-md-7 mt-5 mb-3">
                  <el-button
                    round
                    @click="handleLogin"
                    color="#FF5906"
                    class="text-white w-100 py-4"
                    >Create Account</el-button
                  >
                </div>
              </div>
            </div>
            <div class="text-center mt-3 mb-4">
              <router-link to="/login" class="fw-500 text-dak"
                >Already have an account?
                <span class="font-weight-bold">Login here</span></router-link
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
