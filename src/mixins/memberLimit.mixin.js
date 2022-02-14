import router from "../router/index"
import store from "@/store/store.js"
import membershipService from "../services/membership/membershipservice";

const memberLimit = {
    created() {
        //  Route users if membership capacity is reached
        const currentUser = store.getters.currentUser;
        if (!currentUser || !currentUser.subStatus) {
            membershipService.getSignedInUser()
                .then(res => {
                    if (res.churchSize >= res.subscribedChurchSize){
                        return router.push("/errorpage/member-capacity-reached")
                    }
                })
        } else {
            if (currentUser.churchSize >= currentUser.subscribedChurchSize){
                return router.push("/errorpage/member-capacity-reached")
            }
        }
        
    },
}

export default memberLimit;