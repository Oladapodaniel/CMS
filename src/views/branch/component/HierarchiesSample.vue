<template>
  <div class="container ">
    <div class=" custom-card p-4">
      <h3 class="card-title text-dak s-24 font-weight-600">How hierarchical branching works</h3>
      <p class="card-text fw-400 text-dak s-16">
        Hierarchy Branching is a structured way to organize and manage different branches
        of your Church and Ministry, see examples below.
      </p>

      <h5 class="examples-title text-dak">Examples</h5>

      <div class="row">
        <!-- Hierarchy 1 -->
        <div class="col-md-6">
          <div class="hierarchy-card">
            <p class="hierarchy-title text-dak s-16">Hierarchy 1</p>
            <ul class="hierarchy-list">
              <li>HQ</li>
              <li><span class="primary-text s-20 ">↳</span> District</li>
              <li>&emsp;<span class="primary-text s-20 ">↳</span>Zone</li>
              <li>&emsp;&emsp;<span class="primary-text s-20 ">↳</span>Branch</li>
            </ul>
          </div>
        </div>

        <!-- Hierarchy 2 -->
        <div class="col-md-6">
          <div class="hierarchy-card">
            <p class="hierarchy-title text-dak s-16">Hierarchy 2</p>
            <ul class="hierarchy-list">
              <li>HQ</li>
              <li><span class="primary-text s-20 ">↳</span> Region</li>
              <li>&emsp;<span class="primary-text s-20 ">↳</span> Area</li>
              <li>&emsp;&emsp;<span class="primary-text s-20 ">↳</span> Branch</li>
            </ul>
          </div>
        </div>
      </div>

      <!-- <div class="text-center mt-4">
        <button class="btn btn-primary proceed-btn">Proceed</button>
      </div> -->
    </div>
  </div>
</template>

<script setup>
// import { ref } from "vue";



// Add any necessary logic here
</script>

<style scoped>

.card-title {
  margin-bottom: 15px;
}

.card-text {
  margin-bottom: 20px;
}

.examples-title {
  font-weight: 600;
  margin-bottom: 15px;
}

/* .hierarchy-card { */
  /* background-color: #f0f0f0; */
  /* border-radius: 10px; */
  /* padding: 15px; */
/* } */

.hierarchy-title {
  font-weight: 600;
  background: #D9D9D9;
  padding: 10px;
  /* border-radius: 5px; */
  margin-bottom: 10px;
}

.hierarchy-list {
  list-style-type: none;
  padding-left: 16px;
  margin-bottom: 0;
  color: #000000;
}

.hierarchy-list li {
  margin-bottom: 5px;
  font-size: 20px;
  color: #000000;

}

.proceed-btn {
  background-color: #007bff;
  padding: 10px 20px;
  font-weight: bold;
  border-radius: 25px;
}
</style>
