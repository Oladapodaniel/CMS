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
        churchMembers: { },
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
        }
    },

    actions: {
        setCurrentUser({ commit }, payload) {
          commit("setCurrentUser", payload)
        },

        async getUser({ commit }) {
          try {
            const res = await axios.get(`/api/People/GetPeopleBasicInfo?page=`);
            commit("setCurrentUser", res.data)
              router.push(`/tenant/${res.data.tenantId}`)
          } catch(err) {
            console.log(err, "in store");
          }
          
        },

        // async getMembers({ commit }) {
        //   try {
        //     const res = await axios.get("/api/People/FirstTimer");
        //     commit("setCurrentUser", res.data)
        //   } catch(err) {
        //     console.log(err, "error getting church members");
        //   }
          
        // },

      },

    //   getters: {
    //     currentUser: state => state.currentUser,
    //     userEmail: state => state.userEmail,
    //     onboardingData: state => state.onboardingData,
    //     userRole: state => state.userRole,
    //     userData: state => state.userData,
    //     initialSignUpDetails: state => state.initialSignUpDetails,
    //     userStartPoint: state => state.userStartPoint,
    //     settingUserUp: state => state.settingUserUp,
    //   },
}