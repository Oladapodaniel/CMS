<template>
<div>
    <div class="container-wide container-top">
      <div class="row my-3">
      <div class="col-md-4 first-timers-text">
        <h2 class="page-header">Offerings</h2>
      </div>

      <div class="col-md-8 d-flex head-button">
        <router-link to="/tenant/contributionCategory">
          <button class="default-btn mr-3">View Offering Items</button>
        </router-link>
        <router-link to="/tenant/addoffering" class="add-btn">
          Add Offering
        </router-link>
      </div>
    </div>
    </div>

    <div class="container-wide">
      <div class="row">
      <div class="col-md-12">
        <hr class="hr" />
      </div>
    </div>

    <div v-if="loading">
        <Loader />
    </div>
    

    <div v-if="contributionTransactions.length > 0 && !loading && !networkError">
        <OfferingList :contributionTransactions="contributionTransactions" @marked="removeMultipleOffering" @get-pages="getOfferingPages" @contri-transac="updateTransac" :totalItem="totalItem"/>
    </div> 
    <div class="no-person"  v-else-if="contributionTransactions.length === 0 && !loading && !networkError">
        <div class="empty-img">
            <p><img src="../../../assets/people/people-empty.svg" alt="" /></p>
            <p class="tip">You haven't added any offering transaction yet</p>
        </div>
    </div>
    <div v-else-if="networkError" class="adjust-network">
      <img src="../../../assets/network-disconnected.png" >
      <div>Opps, Your internet connection was disrupted</div>
    </div>
  </div>
</div>
</template>

<script>
import { ref } from 'vue'
import { useStore } from 'vuex'
// import { store } from "../../../store/store"
import axios from "@/gateway/backendapi"
import OfferingList from './OfferingList'
import Loader from './SkeletonLoader'
// import mixin from "@/mixins/expiredSub.mixin.js"
export default {
  // mixins: [mixin],
    components: {
       
        OfferingList, Loader
    },
    setup () {
        const contributionTransactions = ref([])
        const totalItem = ref(0)
        const loading = ref(false)
        const networkError = ref(false)

        const removeMultipleOffering = (payload) => {
          console.log(payload, "oiiipoii")
          contributionTransactions.value = contributionTransactions.value.filter((item) => {
                  const y = payload.findIndex(
                    (i) => i.id === item.id
                  );
                  console.log(y , "old are u now");
                  if (y >= 0) return false;
                  return true;
                });
                console.log(contributionTransactions.value, "the boy is good ")
        }
        const getContributionTransactions = () => {
            let store = useStore()
            console.log(store.getters['contributions/contributionList'])
            if (store.getters['contributions/contributionList'].length > 0) {
                contributionTransactions.value = store.getters['contributions/contributionList']
            } else {
                loading.value = true
                axios
                    .get("/api/Financials/Contributions/Transactions")
                    .then((res) => {
                        loading.value = false
                    contributionTransactions.value = res.data.returnObject.contribution;
                    totalItem.value = res.data.returnObject.totalItem
                    console.log(res.data);
                    })
                    .catch((err) => {
                        loading.value = false
                        console.log(err)
                        if(err.toString().toLowerCase().includes("network error")) {
                          networkError.value = true
                        } else {
                          networkError.value = false
                        }
                    });
            }
    
    // get from  to store
    
    // savev to sstore
    // store.dispatch('contributions/contributionList')
    };
    getContributionTransactions();

    const getOfferingPages = (payload) => {
      contributionTransactions.value = payload.returnObject.contribution
    }

    const updateTransac = (payload) => {
      contributionTransactions.value.splice(payload, 1)
    }
        return {
            contributionTransactions, loading, getOfferingPages, updateTransac, totalItem, networkError, removeMultipleOffering
        }
    }
}
</script>

<style scoped>
.page-header {
    font: normal normal 800 29px Nunito sans;
}

.head-button {
  display: flex;
  justify-content: flex-end;
}

@media (max-width: 577px) {
  .head-button {
    flex-direction: column;
    align-items: center;
  }

  .more {
    margin-right: 0;
  }

  .add-btn {
    margin-top: 10px
  } 
}

@media (max-width: 575px) {
  .head-button {
    display: flex;
    /* flex-direction: row; */
    /* align-items: center; */
    justify-content: center;
  }

  /* .add-btn,
  .more {
    margin-top: 10px;
  } */

  
}

.add-btn {
  width: 180px;
  background: #136acd;
  border-radius: 22px;
  color: #ffffff;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 42px;
  text-decoration: none;
}

.no-person {
  height: 80vh;
  display: flex;
  text-align: center;
}

.empty-img {
  width: 30%;
  min-width: 397px;
  margin: auto;
}

.empty-img img {
  width: 100%;
  max-width: 200px;
}

 @media (max-width: 767px) {
     

   .first-timers-text {
    text-align: center;
  }
  .head-button {
    display: flex;
    justify-content: center
  }
 }

</style>