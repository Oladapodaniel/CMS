<template>
  <el-row @click="linkClicked">
    <el-col :span="24">
      <div class=" ml-3  mt-4">
        <div class="font-weight-600">MAIN MENU</div>
        <!-- <img :src="churchLogo" v-if="churchLogo" class="link-image" alt="" />
        <img src="../../assets/dashboardlinks/churchcloud.png" v-else class="link-image" alt="" />
        <a class="user-link">{{ tenantDisplayName }}
          <span class="user-link-icon c-pointer"><i class="pi pi-angle-right"></i></span></a> -->
      </div>
      <el-menu default-active="1" :active-text-color="primarycolor"
        class="el-menu-vertical-demo  mt-3" text-color="#02172e" :unique-opened="true">
        <div v-for="(item, index) in menuLink" :key="index">
          <el-sub-menu :index="`${index + 1}`" v-if="item.submenu.length > 0" :disabled="disableNav(item.id)">
            <template #title>
              <el-icon>
                <img :src="item.logo" class="link-icon" alt="" v-if="item.logo" />
                <More color="#76787A" v-else />
              </el-icon>
              <span>{{ item.name }}</span>
            </template>
            <div v-for="(x, indexe) in item.submenu" :key="indexe">
              <el-sub-menu :index="`${index + 1}-${indexe + 1}`" v-if="x.submenu && x.submenu.length > 0">
                <template #title>{{ x.name }}</template>
                <el-menu-item :index="`${index + 1}-${indexe + 1}-${indexee + 1}`" v-for="(y, indexee) in x.submenu"
                  :key="indexee" @click="routeToPage(y)">{{ y.name }}</el-menu-item>
              </el-sub-menu>
              <el-menu-item-group @click="routeToPage(x)" v-else>
                <el-menu-item :index="`${index + 1}-${indexe + 1}`">{{ x.name }}
                  <el-tag type="success" class="ml-3" effect="dark" v-if="index === 2 && indexe === 3" size="" round>
                    <span style="display: flex; font-size: 14px">Beta</span>
                  </el-tag>
                </el-menu-item>
              </el-menu-item-group>
            </div>
          </el-sub-menu>
          <el-menu-item :index="`${index + 1}`" class="w-100" @click="routeToPage(item)" v-else :disabled="disableNav(item.id)">
            <el-icon v-if="item.id === 5">
              <img style="width: 40px" :src="item.logo" class="link-icon" alt="" />
            </el-icon>
            <el-icon v-else>
              <img :src="item.logo" class="link-icon" alt="" />
            </el-icon>
            <span class="s-16">{{ item.name }}</span>
            <!-- <el-tag type="warning" class="ml-3" effect="dark" size="" v-if="item.id == 5" round>
              <span style="display: flex; font-size: 14px">Beta</span>
            </el-tag> -->
            <el-tag type="success" class="ml-3" effect="dark" size="" v-if="item.id == 8" round>
              <span style="display: flex; font-size: 14px">Beta</span>
            </el-tag>
          </el-menu-item>
        </div>
      </el-menu>
    </el-col>
  </el-row>
  <el-row>
    <el-col :span="24">
      <div class="nav">
        <div class="w-100 align-self-end">
          <!-- <hr class="hr" /> -->
          <div class="ml-3 font-weight-600">ACCOUNT</div>
          <div class="d-flex ml-3 mt-3">
            <!-- <el-icon class="mt-1">
              <TopLeft />
            </el-icon> -->
            <img style="width: 40px; height: 40px; padding-right: 14px "
              src="../../assets/dashboardlinks/dashboard-icon/SignOut.svg" alt="">
            <div class="ml-3 mt-2 c-pointer" @click="logout">Logout</div>
          </div>
          <div class="row mt-4">
            <div class="col-md-12 mt-4 d-flex justify-content-center">
              <div class="col-md-11">
                <a class="logo-link col-md-12 d-flex justify-content-center"><img src="../../assets/churchplusblueLogo.png" alt="Churchplus Logo" /></a>
                <div class="text-small text-center col-md-12">
                  NO. 1 Church
                  Management Software
                </div>
              </div>
            </div>
          </div>
        </div>
        <a class="link routelink" v-if="false"> Integration </a>
      </div>
    </el-col>
  </el-row>
  <el-dialog v-model="subscriptionExpired" title="" class="expiredSubDialog "
    :width="mdAndUp || lgAndUp || xlAndUp ? `50%` : `90%`" align-center :show-close="false">
    <template #header="{ close, titleId, titleClass }">
      <div class="my-header dialog-header">
        <div class="d-flex justify-content-center align-items-center">
          <img src="../../assets/expired_timer.svg" width="50" alt="expired" />
          <h4 :id="titleId" class="text-white font-weight-bold s-24 ml-2 mt-2">You subscription has expired</h4>
        </div>
      </div>
    </template>
    <SubExpired @closedialog="(payload) => subscriptionExpired = payload"/>
  </el-dialog>
</template>

<script>
import { computed, ref, watchEffect, inject } from "vue";
import { useRoute } from "vue-router";
import store from "@/store/store";
import axios from "@/gateway/backendapi";
import { useRouter } from 'vue-router'
import setupService from '../../services/setup/setupservice';
import deviceBreakpoint from "@/mixins/deviceBreakpoint";
import SubExpired from "@/components/expiredpages/ExpiredSubDialog.vue";

export default {
  emits: ['tenantname', 'linkclicked'],
  components: {
    SubExpired
  },
  setup(props, { emit }) {
    const { mdAndUp, lgAndUp, xlAndUp } = deviceBreakpoint()
    const primarycolor = inject('primarycolor')
    const route = useRoute();
    const router = useRouter()
    const churchLogo = ref("");
    const subscriptionExpired = ref(false);
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

    const getUser = computed(() => {
      if (!store.getters.currentUser || (store.getters.currentUser && Object.keys(store.getters.currentUser).length == 0)) return ''
      return store.getters.currentUser
    })

    watchEffect(() => {
      if (getUser.value) {
        tenantInfo.value = getUser.value;
        getChurchProfile()
        emit('tenantname', tenantInfo.value)
      }
    })

    const tenantDisplayName = computed(() => {
      if (!tenantInfo.value.churchName) return "";
      const name =
        tenantInfo.value.churchName.length < 15
          ? tenantInfo.value.churchName
          : `${tenantInfo.value.churchName.slice(0, 15)}...`;
      return name;
    });

    const logout = () => {
      localStorage.clear()
      router.push('/')
      store.dispatch('clearCurrentUser', {})
      setupService.clearStore();
    }

    const menuLink = ref([])

    const displayRoleMenu = () => {
      const adminIndex = roleOfCurrentUser.value.findIndex(i => i.toLowerCase() == 'admin')
      if (adminIndex >= 0) {
        roleOfCurrentUser.value.unshift(roleOfCurrentUser.value.splice(adminIndex, 1)[0])
      }

      const basicIndex = roleOfCurrentUser.value.findIndex(i => i.toLowerCase() == 'basicuser')
      if (basicIndex >= 0) {
        roleOfCurrentUser.value.unshift(roleOfCurrentUser.value.splice(basicIndex, 1)[0])
      }

      const dashboard = {
        name: 'Dashboard',
        logo: require('../../assets/dashboardlinks/dashboard-icon/House.svg'),
        route: '/tenant',
        submenu: [],
        id: 1
      }

      const people = {
        id: 2,
        name: 'People',
        logo: require('../../assets/dashboardlinks/dashboard-icon/Users.svg'),
        route: '/',
        submenu: []
      }

      const communication = {
        id: 3,
        name: 'Communication',
        logo: require('../../assets/dashboardlinks/dashboard-icon/ChatCenteredDots.svg'),
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
            route: '/tenant/voice/voicelist',
          },
          {
            name: 'Whatsapp',
            logo: '/',
            route: '/tenant/whatsapp',
          },
        ]
      }

      const event = {
        id: 4,
        name: 'Event Management',
        logo: require('../../assets/dashboardlinks/dashboard-icon/CalendarPlus.svg'),
        route: '/',
        submenu: [
          {
            name: 'Service Report',
            logo: '/',
            route: '/tenant/events',
          },
          {
            name: 'Registration & Checkin',
            logo: '/',
            route: '/tenant/attendancecheckin',
          }
        ]
      }
      const form = {
        id: 5,
        name: 'Forms',
        logo: require('../../assets/dashboardlinks/dashboard-icon/Table.svg'),
        route: '/tenant/forms',
        submenu: []
      }


      const financial = {
        id: 6,
        name: 'Financials',
        logo: require('../../assets/dashboardlinks/dashboard-icon/Wallet.svg'),
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
            name: 'Dues/Pledges/Partnership',
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
      }

      const allContacts = {
        name: 'All Contacts',
        logo: '/',
        route: '/tenant/contacts',
      }

      const members = {
        name: 'Members',
        logo: '/',
        route: '/tenant/people',
      }

      const firsttimers = {
        name: 'First Timers',
        logo: '/',
        route: '/tenant/firsttimerslist',
      }

      const newconverts = {
        name: 'New Converts',
        logo: '/',
        route: '/tenant/newconverts',
      }

      const groups = {
        name: 'Groups & Departments',
        logo: '/',
        route: '/tenant/peoplegroups',
      }

      const families = {
        name: 'Families',
        logo: '/',
        route: '/tenant/family',
      }
      const social = {
        id: 7,
        name: 'Social & Mobile App',
        logo: require('../../assets/dashboardlinks/dashboard-icon/Devices.svg'),
        route: '/tenant/social',
        submenu: []
      }
      const mobile = {
        id: 8,
        name: 'Mobile App Setup',
        logo: require('../../assets/dashboardlinks/dashboard-icon/Devices.svg'),
        // logo: require('../../assets/dashboardlinks/com-icon.svg'),
        route: '/mobileonboarding',
        submenu: []
      }
      // const social = {
      //   name: 'Social & Mobile App',
      //   logo: '/',
      //   route: '/tenant/social',
      //   submenu: []
      // }
      const report = {
        id: 9,
        name: 'Reports',
        logo: require('../../assets/dashboardlinks/dashboard-icon/ChartBar.svg'),
        route: '/tenant/reports',
        submenu: []
      }
      // const report = {
      //   id: 6,
      //   name: 'Reports',
      //   logo: require('../../assets/dashboardlinks/reports-icon.svg'),
      //   route: '/tenant/reports',
      //   submenu: []
      // }

      const media = {
        name: 'Ecommerce/Media Library',
        logo: '/',
        route: '/tenant/media',
        submenu: []
      }

      const branch = {
        name: 'Branches',
        logo: '',
        route: '/',
        submenu: [
          {
            name: 'Dashboard',
            logo: '/',
            route: '/tenant/branch/mainbranchsummary',
            // route: '/tenant/branch/branchsummary',
          },
          // {
          //   name: 'People',
          //   logo: '/',
          //   route: '/tenant/branch/branch_members',
          // },
          // {
          //   name: 'Attendance',
          //   logo: '/',
          //   route: '/tenant/branch/branch_attendance',
          // },
          // {
          //   name: 'Financials',
          //   logo: '/',
          //   route: '/tenant/branch/branch_transactions',
          // },
          // {
          //   name: 'Reports',
          //   logo: '/',
          //   route: '/tenant/branch/branch_report',
          // },
        ]
      }
      // const workflow = {
      //   name: 'Workflow',
      //   logo: '/',
      //   route: '/tenant/workflow/list',
      //   submenu: []
      // }

      const settings = {
        name: 'Settings',
        logo: '/',
        route: '/tenant/settings',
        submenu: []
      }

      // const archivedpeople = {
      //   name: 'Archived People',
      //   logo: '/',
      //   route: '/tenant/archivedpeople',
      //   submenu: []
      // }

      const groupleader = {
        name: 'Leader Dashboard',
        logo: '/',
        route: '/tenant/groupleader'
      }

      const followup = {
        name: 'Follow up',
        logo: '/',
        route: '/tenant/followup'
      }


      // const more = {
      //   id: 8,
      //   name: 'More',
      //   logo: '',
      //   route: '/',
      //   submenu: []
      // }
      const more = {
        id: 10,
        name: 'More',
        logo: '',
        route: '/',
        submenu: []
      }


      roleOfCurrentUser.value.forEach(i => {
        // If people object is not already in the list, push it and its submenu, else just push its sub menu
        if (i.toLowerCase() == 'canaccessfirsttimers' && roleOfCurrentUser.value.indexOf('Admin') < 0) {
          if (menuLink.value.findIndex(i => i.id == people.id) < 0) {
            menuLink.value.push(people)
            menuLink.value.find(i => i.name.toLowerCase() == 'people').submenu.push(firsttimers)
          } else {
            menuLink.value.find(i => i.name.toLowerCase() == 'people').submenu.push(firsttimers)
          }
        }


        if (i.toLowerCase() == 'followup') {
          if (menuLink.value.findIndex(i => i.id == people.id) < 0) {
            menuLink.value.push(people)
            menuLink.value.find(i => i.name.toLowerCase() == 'people').submenu.push(followup)
          } else {
            menuLink.value.find(i => i.name.toLowerCase() == 'people').submenu.push(followup)
          }
        }

        if (i.toLowerCase() == 'financialaccount') {
          if (menuLink.value.findIndex(i => i.id == financial.id) < 0) {
            menuLink.value.push(financial)
          }
        }
        if (i.toLowerCase() == 'reports') {
          if (menuLink.value.findIndex(i => i.id == report.id) < 0) {
            menuLink.value.push(report)
          }
        }
        if (i.toLowerCase() == 'mobileadmin') {
          if (menuLink.value.findIndex(i => i.id == more.id) < 0) {
            menuLink.value.push(more)
            menuLink.value.find(i => i.name.toLowerCase() == 'more').submenu.push(media)
          }
          if (menuLink.value.findIndex(i => i.id == social.id) < 0) {
            menuLink.value.push(social)
            // menuLink.value.find(i => i.name.toLowerCase() == 'more').submenu.push(social, media)
          }
          if (menuLink.value.findIndex(i => i.id == mobile.id) < 0) {
            menuLink.value.push(mobile)
            // menuLink.value.find(i => i.name.toLowerCase() == 'more').submenu.push(social, media)
          }
        }

        if (i.toLowerCase() == 'groupleader') {
          if (menuLink.value.findIndex(i => i.id == people.id) < 0) {
            menuLink.value.push(people)
            menuLink.value.find(i => i.name.toLowerCase() == 'people').submenu.push(groupleader)
          } else {
            menuLink.value.find(i => i.name.toLowerCase() == 'people').submenu.push(groupleader)
          }
        }

        if (i.toLowerCase() == 'basicuser' && roleOfCurrentUser.value.indexOf('Admin') < 0) {
          if (menuLink.value.findIndex(i => i.id == dashboard.id) < 0) {
            menuLink.value.push(dashboard)
          }
          if (menuLink.value.findIndex(i => i.id == people.id) < 0) {
            menuLink.value.push(people)
            menuLink.value.find(i => i.name.toLowerCase() == 'people').submenu.push(allContacts, members, firsttimers, newconverts, groups, families)
          } else {
            menuLink.value.find(i => i.name.toLowerCase() == 'people').submenu.push(allContacts, members, firsttimers, newconverts, groups, families)
          }

          if (menuLink.value.findIndex(i => i.id == communication.id) < 0) {
            menuLink.value.push(communication)
          }
          if (menuLink.value.findIndex(i => i.id == event.id) < 0) {
            menuLink.value.push(event)
          }
          if (menuLink.value.findIndex(i => i.id == report.id) < 0) {
            menuLink.value.push(report)
          }
          if (menuLink.value.findIndex(i => i.id == social.id) < 0) {
            menuLink.value.push(social)
          }
          if (menuLink.value.findIndex(i => i.id == mobile.id) < 0) {
            menuLink.value.push(mobile)
          }
          if (menuLink.value.findIndex(i => i.id == more.id) < 0) {
            menuLink.value.push(more)
            menuLink.value.find(i => i.name.toLowerCase() == 'more').submenu.push(media, branch, settings)
            // menuLink.value.find(i => i.name.toLowerCase() == 'more').submenu.push(social, media, branch, workflow, archivedpeople, settings)
          } else {
            menuLink.value.find(i => i.name.toLowerCase() == 'more').submenu.push(media, branch, settings)
            // menuLink.value.find(i => i.name.toLowerCase() == 'more').submenu.push(social, media, branch, workflow, archivedpeople, settings)
          }
        }

        if (i.toLowerCase() == 'admin') {
          menuLink.value.push(dashboard, people, communication, event, form, financial, social, mobile, report, more,)
          // menuLink.value.push(dashboard, people, communication, event, financial,  report, more)
          menuLink.value.find(i => i.name.toLowerCase() == 'people').submenu.push(allContacts, members, firsttimers, newconverts, groups, families)
          menuLink.value.find(i => i.name.toLowerCase() == 'more').submenu.push(media, branch, settings)
          // menuLink.value.find(i => i.name.toLowerCase() == 'more').submenu.push( workflow, social, media, branch,  archivedpeople, settings)
        }
      })
    }
    displayRoleMenu()

    const routeToPage = (item) => {
      router.push(item.route)
    }

    const linkClicked = (e) => {
      if (e.target.classList.contains('el-menu-item') && e.target.classList.contains('is-active')) {
        emit('linkclicked', true);
      }

      if (e.target.parentElement.classList.contains('el-menu-item') && e.target.parentElement.classList.contains('is-active')) {
        emit('linkclicked', true);
      }
    }
    
    const disableNav = (id) => {
      return getUser?.value?.subStatus?.toLowerCase() === 'expired' ? id !== 3 && id !== 1 ? true : false : false
    }

    watchEffect(() => {
      getUser?.value?.subStatus?.toLowerCase() === 'expired' ? subscriptionExpired.value = true : subscriptionExpired.value = false;
    })


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
      tenantInfo,
      getUser,
      primarycolor,
      mdAndUp,
      lgAndUp,
      xlAndUp,
      disableNav,
      subscriptionExpired
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

.logo-link img {
  width: 8rem;
  height: 5rem;
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
  padding-right: 14px;
  height: 40px;
  width: 40px;
}

.link-icon.branch {
  opacity: .6;
  height: 35px;
  width: 35px;
  padding-right: 14px;
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

}
</style>