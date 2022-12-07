import router from "../router/index"
import store from "@/store/store.js"
import membershipService from "../services/membership/membershipservice";

const currentUser = {
    methods: {
        getCurrentUser() {
            console.log('from mix')
            //  Route users if membership capacity is reached
            // const currentUser = store.getters.currentUser;
            // if (!currentUser || !currentUser.subStatus) {
                membershipService.getSignedInUser()
                    .then(res => {
                        console.log(res)
                        store.dispatch("setCurrentUser", res);
                        console.log('fron endpoint')
                        // If subscription plan is below the churchsize
                        if (res.churchSize >= res.subscribedChurchSize) {
                            return router.push("/errorpage/member-capacity-reached")
                        }

                        // If subscrition is expired
                        if (res.subStatus.toLowerCase() === 'expired') {
                            return router.push('/errorpage/expiredSubscription')
                        }
                    }).catch((err) => {
                        // If the user is unauthorized
                        if (err.response && err.response.status === 401) {
                            localStorage.setItem("token", "");
                            router.push("/");
                        }
                    })
            // } 
            // else {
            //     if (currentUser.churchSize >= currentUser.subscribedChurchSize) {
            //         console.log('from store')
            //         return router.push("/errorpage/member-capacity-reached")
            //     }
            // }
        }

    },
}

export default currentUser;