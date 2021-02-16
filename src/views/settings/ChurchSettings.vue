<template>
  <div>
    <div class="container">
      <div class="row">
        <!-- Sidebar -->
        <div class="col-md-3 pt-3 sidebar">
          <div class="row">
            <div class="col-md-12">
              <h2 class="mb-5 font-weight-700">Settings</h2>
            </div>
          </div>

          <div class="row mb-3">
            <div class="col-md-12 my-2">
              <span class="small-text">User Management</span>
            </div>
            <div class="col-md-12 py-2 my-2 link-con" :class="{'active-link': route.path.endsWith('/settings')}">
              <router-link class="font-weight-bold link" to="/tenant/settings"
                >Users</router-link
              >
            </div>
          </div>

          <div class="row mb-3">
            <div class="col-md-12 my-2">
              <span class="small-text">Organisation profile</span>
            </div>
            <div class="col-md-12 py-2 my-2" :class="{'active-link': route.path.endsWith('/settings/profile')}">
              <router-link class="font-weight-bold link" to="/tenant/settings/profile"
                >Profile</router-link
              >
            </div>
          </div>

          <div class="row mb-3">
            <div class="col-md-12 my-2">
              <span class="small-text">System setting</span>
            </div>
            <div class="col-md-12 py-2 my-2" :class="{'active-link': route.path.endsWith('/settings/defaultmessage')}">
              <router-link class="font-weight-bold link" to="/tenant/settings/defaultmessage"
                >Default message</router-link
              >
            </div>
            <div class="col-md-12 py-2 my-2" :class="{'active-link': route.path.endsWith('/tenant/settings/membership')}">
              <router-link class="font-weight-bold link" to="/tenant/settings/membership"
                >Membership Category</router-link
              >
            </div>
            <div class="col-md-12 my-2">
              <router-link class="font-weight-bold link" to="/tenant/settings/ageGroup"
                >Age Group Category</router-link
              >
            </div>
            <div class="col-md-12 my-2">
              <router-link class="font-weight-bold link" to="/tenant/settings/attendance"
                >Attendance Category</router-link
              >
            </div>
            <div class="col-md-12 my-2">
              <router-link class="font-weight-bold link" to="/tenant/settings/followupstatus"
                >Follow Up Status</router-link
              >
            </div>
            <div class="col-md-12 my-2">
              <router-link class="font-weight-bold link" to="/tenant/settings/firsttimersettings"
                >First Timer Settings</router-link
              >
            </div>
            <div class="col-md-12 my-2">
              <router-link class="font-weight-bold link" to="/tenant/settings/giving"
                >Online Giving Setup</router-link
              >
            </div>
          </div>

          <div class="row mb-3">
            <div class="col-md-12 my-2">
              <span class="small-text">Accounting</span>
            </div>
            <div class="col-md-12 my-2">
              <router-link class="font-weight-bold link" to=""
                >Sales and Currency</router-link
              >
            </div>
          </div>
        </div>

        <!-- main content -->
        <div class="col-md-9">
          <router-view> </router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useRoute } from 'vue-router';
export default {
    setup() {
        const route = useRoute()

        return {
            route,
        }
    }

};
</script>

<style scoped>
* {
  box-sizing: border-box;
  color: #02172e;
}

.link {
  color: #136acd;
  width: 100% !important;
}

.small-text {
  font-size: 14px;
}

.active-link {
    background: #EBEFF4;
    border-radius: 5px;
    width: 100%;
}

@media screen and (min-width: 767px) {
    .sidebar {
      min-height: 100vh;
      border-right: 1px solid #4762f01f;
    }
}

@media screen and (max-width: 1280px) {
    .small-text {
        font-size: 13px;
    }

    .link {
        font-size: 14px;
    }
}
</style>