<script setup>
import UserCircleIcon from '../../../../components/icons/UserCircleIcon.vue';

const createAccount = () => {
  // Handle create account action
  console.log("Create account button clicked");
};
</script>

<template>
  <div>
    <!-- Navbar -->
    <nav class="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
      <div class="container-fluid justify-content-center ">
        <div class="row w-100 justify-content-between align-items-center">
          <div class="col-md-3">
            <a class="navbar-brand " href="#">
            <img
              src="../../../../assets/churchplusblueLogo.png"
              alt="Churchplus Logo"
              class="logo"
            />
          </a>
          </div>
          <!-- <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button> -->
          <div class="col-md-5 col-6">
            <div class="collaps navbar-collaps row " id="navbarNav">
            <ul class="navbar-nav col-md-12 justify-content-between ">
              <li class="nav-item">
                <a class="nav-link active" href="#">Home</a>
              </li>
              <li class="nav-item dropdown">
                <a
                  class="nav-link dropdown-toggle"
                  href="#"
                  id="navbarDropdown"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Category
                </a>
                <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                  <a class="dropdown-item" href="#">Category 1</a>
                  <a class="dropdown-item" href="#">Category 2</a>
                  <div class="dropdown-divider"></div>
                  <a class="dropdown-item" href="#">Category 3</a>
                </div>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">Track order</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">24/7 Support</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">
                  <i class="fa fa-shopping-cart"></i>
                  <span class="badge badge-pill badge-danger">0</span>
                </a>
              </li>
            </ul>
          </div>
          </div>
          <div class="d-flex col-md-3 justify-content-end align-items-center">
            <div class="nav-item">
              <el-button round size="large" class=" bg-black text-white mr-3" @click="createAccount">
                Create account
              </el-button>
            </div>
            <div class="nav-item">
              <a class="nav-link text-decoration-none text-dak d-flex align-items-center" href="#">
                <span>Login</span>
                <span><UserCircleIcon /></span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>

    <!-- Login Form -->
  </div>
</template>

<style scoped>
.logo {
  width: 8rem;
  height: auto;
}

.navbar {
  padding: 1rem 0;
}

.btn-custom {
  background-color: #000;
  color: #fff;
  margin-right: 1rem; /* Add margin to the right */
}

.navbar-nav .nav-link {
  font-size: 1rem;
  font-weight: 500;
}

.navbar-nav .nav-link.active {
  font-weight: 700;
}

.navbar-nav .dropdown-menu {
  border-radius: 0.25rem;
}
</style>
