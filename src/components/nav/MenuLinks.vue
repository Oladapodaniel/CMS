<template>
  <div>
    <div class="nav-con">
      <div>
        <div class="nav" @click="linkClicked">
          <div class="user">
            <img
              src="../../assets/dashboardlinks/churchcloud.png"
              class="link-image"
              alt=""
            />
            <!-- <a  class="user-link">Grace... <span class="user-link-icon"> ></span></a> -->
            <a class="user-link"
              >{{ tenantDisplayName }}
              <span class="user-link-icon"
                ><i class="fa fa-angle-right"></i></span
            ></a>
          </div>
          <router-link to="/tenant" class="link routelink dashboard-link">
            <img
              src="../../assets/dashboardlinks/dashboard-icon.svg"
              class="link-icon"
              alt=""
            />
            Dashboard
          </router-link>

          <a
            class="link dd"
            :class="{
              'router-link-exact-active':
                route.path.includes('people') ||
                route.path.includes('first-time'),
            }"
          >
            <span @click="togglePeopleDropDown">
              <img
                src="../../assets/dashboardlinks/people.svg"
                class="link-icon"
                alt=""
              />
              <span class="drop-link"
                >People
                <span class="user-link-icon">
                  <i
                    class="fa fa-angle-up more-icon"
                    :class="{ 'tbb-icon-rotate': peopleLinkDropped }"
                  ></i></span
              ></span>
            </span>
          </a>
          <ul class="dd-list" :class="{ 'dd-hide-list': !peopleLinkDropped }">
            <li class="dd-list-item">
              <router-link class="dd-link-item routelink" :to="`/tenant/people`"
                >Members</router-link
              >
            </li>
            <li class="dd-list-item">
              <router-link class="dd-link-item routelink" :to="`/tenant/firsttimerslist`"
                >First Timers</router-link
              >
            </li>
            <li class="dd-list-item">
              <router-link class="dd-link-item routelink" to="/tenant/peoplegroups"
                >Groups</router-link
              >
            </li>
            <!-- Hidden -->
            <li class="dd-list-item" v-if="false">
              <router-link class="dd-link-item routelink" to="">Families</router-link>
            </li>
          </ul>
          <!-- </a> -->

          <a
            class="link dd"
            :class="{
              'router-link-exact-active': route.path.includes('communication'),
            }"
          >
            <span @click="toggleCommDropDown">
              <img
                src="../../assets/dashboardlinks/com-icon.svg"
                class="link-icon comm-link-icon"
                alt=""
              />
              <span class="drop-link"
                >Communication
                <span class="user-link-icon">
                  <i
                    class="fa fa-angle-up more-icon"
                    :class="{ 'tbb-icon-rotate': commLinkDropped }"
                  ></i></span
              ></span>
            </span>
          </a>
          <ul class="dd-list" :class="{ 'dd-hide-list': !commLinkDropped }">
            <li class="dd-list-item">
              <router-link class="dd-link-item routelink" to="/tenant/sms/sent"
                >SMS</router-link
              >
            </li>
            <!-- Hidden -->
            <li class="dd-list-item">
              <router-link
                class="dd-link-item routelink"
                to="/tenant/email"
                >Email</router-link
              >
            </li>
            <li class="dd-list-item" v-if="false">
              <router-link class="dd-link-item routelink" to="">Whatsapp</router-link>
            </li>
            <li class="dd-list-item" v-if="false">
              <router-link class="dd-link-item routelink" to="">Voice</router-link>
            </li>
          </ul>
          <!-- </a> -->

          <a
            class="link dd"
            :class="{
              'router-link-exact-active': route.path.includes('/tenant/event'),
            }"
          >
            <span @click="toggleEventsDropDown">
              <img
                src="../../assets/dashboardlinks/events-icon.svg"
                class="link-icon"
                alt=""
              />
              <span class="drop-link"
                >Events
                <span class="user-link-icon">
                  <i
                    class="fa fa-angle-up more-icon"
                    :class="{ 'tbb-icon-rotate': eventsLinkDropped }"
                  ></i></span
              ></span>
            </span>
          </a>
          <ul
            class="dd-list events-list"
            :class="{ 'dd-hide-list': !eventsLinkDropped }"
          >
            <li class="dd-list-item">
              <router-link class="dd-link-item routelink" :to="`/tenant/emptyevent`"
                >Events</router-link
              >
            </li>
            <!-- Hidden -->
            <li class="dd-list-item d-none">
              <router-link class="dd-link-item routelink" to=""
                >Attendance & Checkin</router-link
              >
            </li>
          </ul>
          <!-- </a> -->

          <!-- Hidden -->
          <a
            class="link dd"
            :class="{
              'router-link-exact-active': route.path.includes(
                'tenant/accounting'
              ),
            }"
            v-if="false"
          >
            <span @click="toggleAccDropDown">
              <img
                src="../../assets/dashboardlinks/acc-icon.svg"
                class="link-icon"
                alt=""
              />
              <span class="drop-link"
                >Accounting
                <span class="user-link-icon">
                  <i
                    class="fa fa-angle-up more-icon"
                    :class="{ 'tbb-icon-rotate': accLinkDropped }"
                  ></i></span
              ></span>
            </span>
          </a>
          <ul
            class="dd-list acc-list"
            :class="{ 'dd-hide-list': !accLinkDropped }"
            v-if="false"
          >
            <li class="dd-list-item">
              <router-link class="dd-link-item routelink" to="">Dashboard</router-link>
            </li>
            <li class="dd-list-item">
              <router-link class="dd-link-item routelink" to="">Offerings</router-link>
            </li>
            <li class="dd-list-item">
              <router-link class="dd-link-item routelink" to="">Pledges</router-link>
            </li>
            <li class="dd-list-item">
              <router-link class="dd-link-item routelink" to=""
                >Transactions</router-link
              >
            </li>
            <li class="dd-list-item">
              <router-link class="dd-link-item routelink" to="">Expense workflow</router-link>
            </li>
            <li class="dd-list-item">
              <router-link class="dd-link-item routelink" to=""
                >Charts of Account</router-link
              >
            </li>
          </ul>

          <!-- Hidden -->
          <a class="link routelink" v-if="false">
            <img
              src="../../assets/dashboardlinks/reports-icon.svg"
              class="link-icon"
              alt=""
              
            />
            Reports
          </a>

          <div v-if="false">
            <div>
              <p @click="showMore" class="more-tab">
                <span>{{ dropDownText }}...</span>
                <span
                  ><i
                    class="fa fa-angle-up more-icon"
                    :class="{ 'tbb-icon-rotate': moreShown }"
                  ></i
                ></span>
              </p>
            </div>
            <div class="more-links" :class="{ 'hide-more-links': moreShown }">
              <a  class="link follow-up routelink">
                <img
                  src="../../assets/dashboardlinks/follow-up-icon.svg"
                  class="link-icon"
                  alt=""
                />
                Follow up
              </a>

              <a  class="link routelink">
                <img
                  src="../../assets/dashboardlinks/social-icon.svg"
                  class="link-icon"
                  alt=""
                />
                Social & Mobile App
              </a>

              <a  class="link routelink">
                <img
                  src="../../assets/dashboardlinks/media.svg"
                  class="link-icon"
                  alt=""
                />
                Media & Monetization
              </a>

              <a  class="link routelink">
                <img
                  src="../../assets/dashboardlinks/branches.svg"
                  class="link-icon"
                  alt=""
                />
                Branches
              </a>
            </div>
          </div>
          <hr class="hr" />

          <router-link class="link routelink" to="/tenant/settings"> Settings </router-link>

          <!-- Hidden -->
          <a class="link routelink" v-if="false"> Integration </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref } from "vue";
import { useRoute } from "vue-router";
import store from "@/store/store";
import axios from "@/gateway/backendapi";
export default {
  setup(props, { emit }) {
    const route = useRoute();

    const moreShown = ref(false);
    const showMore = () => {
      moreShown.value = !moreShown.value;
    };

    const peopleLinkDropped = ref(false);
    const togglePeopleDropDown = () => {
      peopleLinkDropped.value = !peopleLinkDropped.value;
      commLinkDropped.value = false;
      accLinkDropped.value = false;
      eventsLinkDropped.value = false;
    };

    const commLinkDropped = ref(false);
    const toggleCommDropDown = () => {
      commLinkDropped.value = !commLinkDropped.value;
      peopleLinkDropped.value = false;
      eventsLinkDropped.value = false;
      accLinkDropped.value = false;
    };

    const eventsLinkDropped = ref(false);
    const toggleEventsDropDown = () => {
      eventsLinkDropped.value = !eventsLinkDropped.value;
      commLinkDropped.value = false;
      accLinkDropped.value = false;
      peopleLinkDropped.value = false;
    };

    const accLinkDropped = ref(false);
    const toggleAccDropDown = () => {
      accLinkDropped.value = !accLinkDropped.value;
      commLinkDropped.value = false;
      eventsLinkDropped.value = false;
      peopleLinkDropped.value = false;
    };

    const dropDownText = computed(() => {
      return moreShown.value ? "Less" : "More";
    });

    const tenantInfo = ref({});

    if (!store.getters.currentUser.churchName) {
      axios
        .get("/dashboard")
        .then((res) => {
          tenantInfo.value = res.data;
        })
        .catch((err) => console.log(err.respone));
    } else {
      tenantInfo.value.churchName = store.getters.currentUser.churchName;
    }

    const tenantDisplayName = computed(() => {
      if (!tenantInfo.value.churchName) return "";
      const name =
        tenantInfo.value.churchName.length < 15
          ? tenantInfo.value.churchName
          : `${tenantInfo.value.churchName.slice(0, 15)}...`;
      return name;
    });

    const linkClicked = (e) => {
      if (e.target.classList.contains("routelink")) {
        emit('linkclicked', true);
      }
    }

    return {
      route,
      moreShown,
      showMore,
      dropDownText,
      peopleLinkDropped,
      togglePeopleDropDown,
      commLinkDropped,
      toggleCommDropDown,
      accLinkDropped,
      toggleAccDropDown,
      eventsLinkDropped,
      toggleEventsDropDown,
      tenantDisplayName,
      linkClicked,
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

.nav {
  display: flex;
  flex-direction: column;
  padding: 8px 20px 24px 4px;
  background: #ebeff4;
  z-index: 100;
  min-height: 100vh;
  /* border: 2px solid red; */
}

.nav .link {
  display: flex;
  justify-content: start;
  color: #02172e;
  text-decoration: none;
  opacity: 0.8;
  margin: 22px 0 0 0;
  padding-left: 25px;
}

.user-link,
.drop-link {
  width: 100%;
}

.user-link-icon {
  float: right;
  opacity: 0.5;
}

.nav .link:hover {
  filter: grayscale(29%) brightness(3%) hue-rotate(338deg) saturate(940%)
    opacity(95%) contrast(989%);
}

.nav router-link:hover {
  color: #00204412;
}

.link:hover {
  cursor: pointer;
}
.nav .user {
  opacity: 1;
  display: flex;
}

.nav .user a {
  text-decoration: none;
  color: #1d262d;
  font-size: 17px;
  font-weight: bold;
}

.link-icon {
  padding-right: 10px;
}

.link-image {
  width: 40px;
  height: 23px;
  padding-right: 0;
}

.hr {
  border: 1px solid #00204412;
  margin: 10px 0;
  opacity: 0.5;
}

.more-icon {
  float: right;
  transition: all 0.5s ease-in-out;
  transform: rotate(180deg);
  opacity: 0.5;
}

.tbb-icon-rotate {
  transition: all 0.5s ease-in-out;
  transform: rotate(0deg);
  color: #190138;
  font-size: 20px;
}

.more-icon:hover {
  cursor: pointer;
  filter: grayscale(29%) brightness(3%) hue-rotate(338deg) saturate(940%)
    opacity(95%) contrast(989%);
}

.comm {
  margin-left: -10px;
}

.link.router-link-exact-active {
  filter: invert(29%) sepia(74%) saturate(1909%) hue-rotate(197deg)
    brightness(91%) contrast(189%);
  opacity: 1 !important;
  border-left: 4px solid #136acd;
  border-radius: 2px 2px;
}

.more-links {
  height: 0;
  overflow: hidden;
  transition: all 0.5s ease-in-out;
}

.hide-more-links {
  transition: all 0.5s ease-in-out;
  height: 164px;
}

.follow-up {
  margin-top: 0 !important;
}

.more-tab {
  font-size: 18px;
  padding-left: 25px;
  margin: 30px 0 10px 0;
  color: #02172e;
  opacity: 0.5;
}

.more-tab:hover {
  cursor: pointer;
}

.dashboard-link {
  margin-top: 22px !important;
}

.dd {
  display: flex;
  flex-direction: column;
}

.dd:hover {
  cursor: pointer;
}

.dd-list {
  margin-bottom: 0;
  margin-left: 20px !important;
  overflow: hidden;
  /* Change to 180px */
  height: 125px;
  transition: all 0.3s ease-in-out;
}

.events-list {
  height: 90px;
}

.acc-list {
  height: 257px;
}

.dd-hide-list {
  height: 0;
  overflow: hidden;
  transition: all 0.5s ease-in-out;
}

.dd-list-item {
  list-style: none;
  padding-top: 19px;
}

.dd-link-item {
  color: #02172e;
  text-decoration: none;
  opacity: 0.5;
}

.comm-link-icon {
  margin-left: -10px;
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