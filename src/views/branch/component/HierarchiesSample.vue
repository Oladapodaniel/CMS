<template>
  <div class="container my-5">
    <div class="card custom-card p-4">
      <h3 class="card-title">How hierarchical branching works</h3>
      <p class="card-text">
        Hierarchy Branching is a structured way to organize and manage different branches
        of your Church and Ministry, see examples below.
      </p>

      <h5 class="examples-title">Examples</h5>

      <div class="row">
        <!-- Hierarchy 1 -->
        <div class="col-md-6">
          <div class="hierarchy-card">
            <p class="hierarchy-title">Hierarchy 1</p>
            <ul class="hierarchy-list">
              <li>HQ</li>
              <li>↳ District</li>
              <li>&emsp;↳ Zone</li>
              <li>&emsp;&emsp;↳ Branch</li>
            </ul>
          </div>
        </div>

        <!-- Hierarchy 2 -->
        <div class="col-md-6">
          <div class="hierarchy-card">
            <p class="hierarchy-title">Hierarchy 2</p>
            <ul class="hierarchy-list">
              <li>HQ</li>
              <li>↳ Region</li>
              <li>&emsp;↳ Area</li>
              <li>&emsp;&emsp;↳ Branch</li>
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
.custom-card {
  background-color: #ffffff;
  border: 2px solid #007bff;
  border-radius: 15px;
}

.card-title {
  font-weight: bold;
  margin-bottom: 15px;
}

.card-text {
  margin-bottom: 20px;
}

.examples-title {
  font-weight: bold;
  margin-bottom: 15px;
}

.hierarchy-card {
  background-color: #f0f0f0;
  border-radius: 10px;
  padding: 15px;
}

.hierarchy-title {
  font-weight: bold;
  background-color: #d3d3d3;
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 10px;
}

.hierarchy-list {
  list-style-type: none;
  padding-left: 0;
  margin-bottom: 0;
}

.hierarchy-list li {
  margin-bottom: 5px;
  font-size: 16px;
}

.proceed-btn {
  background-color: #007bff;
  padding: 10px 20px;
  font-weight: bold;
  border-radius: 25px;
}
</style>
