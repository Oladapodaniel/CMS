import axios from "@/gateway/backendapi";
import router from "@/router/index"


export default {
  state: {
    userEmail: "",
    onboardingData: {},
    userRole: "",
    userData: {},
    currentUser: {},
    userStartPoint: "",
    settingUserUp: false,
    churchMembers: {},
    smsBalance: 0,
  },

  mutations: {
    setCurrentUser(state, payload) {
      state.currentUser = payload;
    },

    setUserEmail(state, payload) {
      state.userEmail = payload;
    },

    set(state, payload) {
      state.userData = payload;
    },

    setOnboardingData(state, payload) {
      state.onboardingData = payload;
    },

    setStartPoint(state, payload) {
      state.userStartPoint = payload;
    },

    setUserUp(state, payload) {
      state.settingUserUp = payload;
    },

    getMembers(state, payload) {
      state.churchMembers = payload;
    },

    removeSMSUnitCharge(state, payload) {
      state.currentUser.smsBalance = state.currentUser.smsBalance - payload;
    },

    addPurchasedUnits(state, payload) {
      state.currentUser.smsBalance = state.currentUser.smsBalance + payload;
    }
  },

  actions: {
    setCurrentUser({ commit }, payload) {
      commit("setCurrentUser", payload)
    },

    async getUser({ commit }) {
      try {
        const res = await axios.get("/api/Membership/GetCurrentSignedInUser");
        commit("setCurrentUser", res.data)
        router.push(`/tenant/${res.data.tenantId}`)
      } catch (err) {
        /*eslint no-undef: "warn"*/
        NProgress.done();
        console.log(err, "in store");
      }

    },

    async getMembers({ commit }) {
      try {
        const res = await axios.get("/api/People/FirstTimer");
        commit("setCurrentUser", res.data)
      } catch (err) {
        console.log(err);
      }

    },

    setUserEmail({ commit }, payload) {
      commit("setUserEmail", payload)
    },

    setUserData({ commit }, payload) {
      commit("setUserData", payload)
    },

    setOnboardingData({ commit }, payload) {
      commit("setOnboardingData", payload)
    },

    setStartPoint({ commit }, payload) {
      commit("setStartPoint", payload)
    },

    setUserUp({ commit }, payload) {
      commit("setUserUp", payload)
    },

    removeSMSUnitCharge({ commit }, payload) {
      commit("removeSMSUnitCharge", payload)
    },

    addPurchasedUnits({ commit }, payload) {
      commit("addPurchasedUnits", payload)
    },
  },

  getters: {
    currentUser: state => state.currentUser,
    userEmail: state => state.userEmail,
    email: state => state.currentUser.email,
    onboardingData: state => state.onboardingData,
    userRole: state => state.userRole,
    userData: state => state.userData,
    initialSignUpDetails: state => state.initialSignUpDetails,
    userStartPoint: state => state.userStartPoint,
    settingUserUp: state => state.settingUserUp,
    smsBalance: state => state.currentUser.smsBalance,
    currency: state => state.currentUser.currency,
  },
}