<template>
  <div>
    <div class="container">
      <div class="row d-md-flex justify-content-between mt-3 mb-4">
        <div class="col-md-8">
          <h2>Default Message</h2>
        </div>
        <div class="col-md-4 mt-2 link">
          <router-link
            to="/tenant/createpeoplegroup"
            class="grey-border primary-btn"
            >Add Default Message</router-link
          >
        </div>
      </div>

      <div class="row table-header-row py-2 mt-5">
        <div class="col-md-4">
          <span class="py-2 font-weight-bold">SELECT</span>
        </div>
        <div class="col-md-2">
          <span class="py-2 font-weight-bold">TYPE</span>
        </div>
        <div class="col-md-4">
          <span class="py-2 font-weight-bold">CATEGORY</span>
        </div>
        <div class="col-md-2">
          <span class="py-2 font-weight-bold"></span>
        </div>
      </div>

      <div class="row py-2">
        <div class="col-md-12">
          <div class="row">
            <div
              class="col-md-4 d-flex justify-content-between align-items-center"
            >
              <span class="py-2 hidden-header">SELEECT</span>
              <span class="py-2">name</span>
            </div>
            <div
              class="col-md-2 d-flex justify-content-between align-items-center"
            >
              <span class="py-2 hidden-header">TYPE</span>
              <span class="py-2 text-xs-left">position</span>
            </div>
            <div
              class="col-md-2 d-flex justify-content-between align-items-center"
            >
              <span class="py-4 hidden-header">CATEGORY</span>
              <span class="py-2">address</span>
            </div>
            <div
              class="col-md-1 d-flex justify-content-between align-items-center"
            >
              <div class="dropdown">
                <i
                  class="fas fa-ellipsis-v cursor-pointer"
                  id="dropdownMenuButton"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                ></i>
                <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                  <a class="dropdown-item">
                    <router-link to="">Send SMS</router-link>
                  </a>
                  <a class="dropdown-item">
                    <router-link to="">Send Email</router-link>
                  </a>
                  <a class="dropdown-item" href="#">Delete</a>
                </div>
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-md-12 px-0">
              <hr class="hr my-0" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.table-header-row {
  background: #ebeff4;
  border-top: 1px solid #dde2e6;
  border-radius: 8px 8px 0 0;
}

.hidden-header {
  display: none;
}

@media screen and (max-width: 767px) {
  .hidden-header {
    display: inline-block;
    font-weight: bold;
  }

  .table-header-row {
    display: none;
  }
}
</style>