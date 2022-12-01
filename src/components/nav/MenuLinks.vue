

<template>
  <el-row @click="linkClicked">
    <el-col :span="24">
      <div class="user mr-3 mt-4">
        <img :src="churchLogo" v-if="churchLogo" class="link-image" alt="" />
        <img src="../../assets/dashboardlinks/churchcloud.png" v-else class="link-image" alt="" />
        <a class="user-link">{{ tenantDisplayName }}
          <span class="user-link-icon c-pointer"><i class="pi pi-angle-right"></i></span></a>
      </div>
      <el-menu default-active="1" active-text-color="#136acd" background-color="#ebeff4" class="el-menu-vertical-demo"
        text-color="#02172e" :unique-opened="true">
        <div v-for="(item, index) in menuLink" :key="index">
          <el-sub-menu :index="`${index + 1}`" v-if="item.submenu.length > 0">
            <template #title>
              <el-icon>
                <img :src="item.logo" class="link-icon" alt="" v-if="item.logo" />
                <More color="#76787A" v-else />
              </el-icon>
              <span>{{ item.name }}</span>
            </template>
            <div v-for="(x, indexe) in item.submenu" :key="index">
              <el-sub-menu :index="`${index + 1}-${indexe + 1}`" v-if="x.submenu && x.submenu.length > 0">
                <template #title>{{ x.name }}</template>
                <el-menu-item :index="`${index + 1}-${indexe + 1}-${indexee + 1}`" v-for="(y, indexee) in x.submenu"
                  :key="indexee" @click="routeToPage(y)">{{ y.name }}</el-menu-item>
              </el-sub-menu>
              <el-menu-item-group @click="routeToPage(x)" v-else>
                <el-menu-item :index="`${index + 1}-${indexe + 1}`">{{ x.name }}</el-menu-item>
              </el-menu-item-group>
            </div>
          </el-sub-menu>
          <el-menu-item :index="`${index + 1}`" class="w-100" @click="routeToPage(item)" v-else>
            <el-icon>
              <img :src="item.logo" class="link-icon" alt="" />
            </el-icon>
            <span>{{ item.name }}</span>
          </el-menu-item>
        </div>
      </el-menu>
    </el-col>
  </el-row>
  <el-row>
    <el-col :span="24">
      <div class="nav">
        <div class="w-100 align-self-end">
          <hr class="hr" />
          <div class="d-flex ml-3">
            <el-icon class="mt-1">
              <TopLeft />
            </el-icon>
            <div class="link" @click="logout">Logout</div>
          </div>
        </div>
        <a class="link routelink" v-if="false"> Integration </a>
      </div>
    </el-col>
  </el-row>

</template>

<script>
import { computed, ref } from "vue";
import { useRoute } from "vue-router";
import store from "@/store/store";
import axios from "@/gateway/backendapi";
import { useRouter } from 'vue-router'
import setupService from '../../services/setup/setupservice';
export default {
  components: {
  },
  emits: ['tenantname', 'linkclicked'],
  setup(props, { emit }) {
    const route = useRoute();
    const router = useRouter()
    const churchLogo = ref("");
    const roleOfCurrentUser = computed(() => {
      if (!localStorage.getItem('roles')) return []
      return JSON.parse(localStorage.getItem('roles'))
    })

    const admin = ref(roleOfCurrentUser.value.some(i => i.toLowerCase() === 'admin'))
    const followup = ref(roleOfCurrentUser.value.some(i => i.toLowerCase() === 'followup'))
    const basicUser = ref(!admin.value && roleOfCurrentUser.value.some(i => i.toLowerCase() === 'basicuser'))
    const financialAccount = ref(!admin.value && roleOfCurrentUser.value.some(i => i.toLowerCase() === 'financialaccount'))
    const mobileAdmin = ref(!admin.value && roleOfCurrentUser.value.some(i => i.toLowerCase() === 'mobileadmin'))
    const report = ref(!admin.value && roleOfCurrentUser.value.some(i => i.toLowerCase() === 'reports'))
    const groupLeader = ref(!admin.value && roleOfCurrentUser.value.some(i => i.toLowerCase() === 'groupleader'))
    const canAccessFirstTimers = ref(!admin.value && roleOfCurrentUser.value.some(i => i.toLowerCase() === 'canaccessfirsttimers'))


    const tenantInfo = ref({});

    const getChurchProfile = async () => {
      try {
        let res = await axios.get(`/GetChurchProfileById?tenantId=${tenantInfo.value.tenantId}`)
        churchLogo.value = res.data.returnObject.logo
      }
      catch (err) {
        console.log(err)
      }
    }

    const currentUser = () => {
      if (!store.getters.currentUser || !store.getters.currentUser.churchName) {
        axios
          .get("/api/Membership/GetCurrentSignedInUser")
          .then((res) => {
            tenantInfo.value = res.data;
            getChurchProfile()
            emit('tenantname', tenantInfo.value)
          })
          .catch((err) => console.log(err.response));
        } else {
          tenantInfo.value.churchName = store.getters.currentUser.churchName;
          tenantInfo.value.tenantId = store.getters.currentUser.tenantId;
          getChurchProfile()
          emit('tenantname', tenantInfo.value)
        }
    }
    currentUser()

    const tenantDisplayName = computed(() => {
      if (!tenantInfo.value.churchName) return "";
      const name =
        tenantInfo.value.churchName.length < 18
          ? tenantInfo.value.churchName
          : `${tenantInfo.value.churchName.slice(0, 18)}...`;
      return name;
    });

    const logout = () => {
      localStorage.clear()
      router.push('/')
      store.dispatch('clearCurrentUser', {})
      store.dispatch('groups/clearGroup')
      store.dispatch('membership/clearMember')
      setupService.clearStore();
    }

    const menuLink = ref([
      {
        name: 'Dashboard',
        logo: require('../../assets/dashboardlinks/dashboard-icon.svg'),
        route: '/tenant',
        submenu: []
      },
      {
        name: 'People',
        logo: require('../../assets/dashboardlinks/people.svg'),
        route: '/',
        submenu: [
          {
            name: 'Members',
            logo: '/',
            route: '/tenant/people',
          },
          {
            name: 'First Timers',
            logo: '/',
            route: '/tenant/firsttimerslist',
          },
          {
            name: 'Groups / Departments',
            logo: '/',
            route: '/tenant/peoplegroups',
          },
          {
            name: 'Families',
            logo: '/',
            route: '/tenant/family',
          },
        ]
      },
      {
        name: 'Communication',
        logo: require('../../assets/dashboardlinks/com-icon.svg'),
        route: '/',
        submenu: [
          {
            name: 'SMS',
            logo: '/',
            route: '/tenant/sms/sent',
          },
          {
            name: 'Email',
            logo: '/',
            route: '/tenant/email',
          },
          {
            name: 'Voice',
            logo: '/',
            route: '/tenant/Voice',
          },
        ]
      },
      {
        name: 'Events',
        logo: require('../../assets/dashboardlinks/events-icon.svg'),
        route: '/',
        submenu: [
          {
            name: 'Services',
            logo: '/',
            route: '/tenant/events',
          },
          {
            name: 'Attendance & Checkin',
            logo: '/',
            route: '/tenant/attendancecheckin',
          }
        ]
      },
      {
        name: 'Financials',
        logo: require('../../assets/dashboardlinks/acc-icon.svg'),
        route: '/',
        submenu: [
          {
            name: 'Offerings',
            logo: '/',
            route: '/tenant/offering',
          },
          {
            name: 'Online Donation',
            logo: '/',
            route: '/tenant/onlinedonation',
          },
          {
            name: 'Partnership / Pledges',
            logo: '/',
            route: '/tenant/pledge/pledgeslist',
          },
          {
            name: 'Transactions',
            logo: '/',
            route: '/tenant/transactionlist',
          },
          {
            name: 'Charts of Account',
            logo: '/',
            route: '/tenant/chartofaccount',
          },
        ]
      },
      {
        name: 'More',
        logo: '',
        route: '/',
        submenu: [
          {
            name: 'Branches',
            logo: '',
            route: '/',
            submenu: [
              {
                name: 'Dashboard',
                logo: '/',
                route: '/tenant/branch/branchsummary',
              },
              {
                name: 'People',
                logo: '/',
                route: '/tenant/branch/branch_members',
              },
              {
                name: 'Attendance',
                logo: '/',
                route: '/tenant/branch/branch_attendance',
              },
              {
                name: 'Financials',
                logo: '/',
                route: '/tenant/branch/branch_transactions',
              },
              {
                name: 'Reports',
                logo: '/',
                route: '/tenant/branch/branch_report',
              },
            ]
          },
          {
            name: 'Workflow',
            logo: '/',
            route: '/tenant/workflow/list',
            submenu: []
          },
          {
            name: 'Reports',
            logo: '/',
            route: '/tenant/reports',
            submenu: []
          },
          {
            name: 'Social & Mobile App',
            logo: '/',
            route: '/tenant/social',
            submenu: []
          },
          {
            name: 'Media Library',
            logo: '/',
            route: '/tenant/media',
            submenu: []
          },
          {
            name: 'Archived People',
            logo: '/',
            route: '/tenant/archivedpeople',
            submenu: []
          },
          {
            name: 'Settings',
            logo: '/',
            route: '/tenant/settings',
            submenu: []
          },

        ]
      },
    ])

    const displayRoleMenu = () => {
      if (basicUser.value) {
        menuLink.value = menuLink.value.filter(i => {
          return i.name.toLowerCase() !== 'financials'
        })
      }

      if (financialAccount.value && !admin.value) {
        menuLink.value = menuLink.value.filter(i => {
          return i.name.toLowerCase() == 'financials'
        })
      }

      if (report.value && !admin.value) {
        menuLink.value = menuLink.value.filter(i => {
          return i.name.toLowerCase() == 'more'
        })
        menuLink.value[0].submenu = [menuLink.value[0].submenu[2]]
      }

      if (canAccessFirstTimers.value && !admin.value) {
        menuLink.value = menuLink.value.filter(i => {
          return i.name.toLowerCase() == 'people'
        })
        menuLink.value[0].submenu = [menuLink.value[0].submenu[1]]
      }

      if (groupLeader.value && !admin.value) {
        menuLink.value = menuLink.value.filter(i => {
          return i.name.toLowerCase() == 'people'
        })
        menuLink.value[0].submenu = menuLink.value[0].submenu.filter(i => {
          return i.name.toLowerCase().includes('department')
        })
        menuLink.value[0].submenu.splice(0, 0, {
          name: 'Dashboard',
          logo: '/',
          route: '/tenant/groupleader'
        })
      } else if (followup.value && !admin.value) {
        menuLink.value = menuLink.value.filter(i => {
          return i.name.toLowerCase() == 'people'
        })
        menuLink.value[0].submenu = []
        menuLink.value[0].submenu.push({
          name: 'Follow up',
          logo: '/',
          route: '/tenant/followup'
        })
      }

      if (groupLeader.value && followup.value && !admin.value) {
        menuLink.value = menuLink.value.filter(i => {
          return i.name.toLowerCase() == 'people'
        })
        menuLink.value[0].submenu.push({
          name: 'Follow up',
          logo: '/',
          route: '/tenant/followup'
        })
      }

      if (mobileAdmin.value && !admin.value) {
        menuLink.value = menuLink.value.filter(i => {
          return i.name.toLowerCase() == 'more'
        })
        menuLink.value[0].submenu = [
          {
            name: 'Social & Mobile App',
            logo: '/',
            route: '/tenant/social',
            submenu: []
          },
          {
            name: 'Media Library',
            logo: '/',
            route: '/tenant/media',
            submenu: []
          },
        ]
      }

    }
    displayRoleMenu()

    const routeToPage = (item) => {
      router.push(item.route)
    }

    const linkClicked = (e) => {
      if (e.target.classList.contains("routelink")) {
        emit('linkclicked', true);
      }
    }


    return {
      route,
      tenantDisplayName,
      churchLogo,
      logout,
      roleOfCurrentUser,
      followup,
      admin,
      basicUser,
      financialAccount,
      mobileAdmin,
      report,
      groupLeader,
      canAccessFirstTimers,
      menuLink,
      routeToPage,
      linkClicked,
      tenantInfo
    };
  },
};
</script>

<style scoped>
* {
  box-sizing: border-box;
}

.user {
  background: #d7e0ea;
  padding: 0.5rem;
  border-radius: 29px;
  margin-left: 16px;
}


.nav .link {
  justify-content: start;
  color: #02172e;
  text-decoration: none;
  opacity: 0.8;
  margin: 0 0 0 10px;
  font-size: 0.9em;
  cursor: pointer
}



.nav .user {
  opacity: 1;
  display: flex;
}

.user a {
  text-decoration: none;
  color: #1d262d;
  font-size: 17px;
  font-weight: bold;
}

.link-icon {
  padding-right: 10px;
}

.link-icon.branch {
  opacity: .6;
}

.link-image {
  width: 25px;
  height: 24px;
  padding-right: 0;
  object-fit: cover;
}

.hr {
  border: 1px solid #00204412;
  margin: 10px 0;
  opacity: 0.5;
}



@media screen and (max-width: 1100px) {
  .nav {
    width: 266px;
    position: absolute;
    z-index: 10;
  }

  /* .nav .link {
    opacity: 1;
  } */
}
</style>