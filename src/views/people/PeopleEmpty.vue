<template>
  <div
    class="container-wide"
    v-if="!loading && (people.length > 0 || errorGettingPeople)"
  >
    <PeopleList :list="people" :peopleCount="people.length" :membershipSummary="membershipSummary" />
  </div>

  <div
    class="no-person mt-5"
    v-else-if="!loading && people.length === 0 && !errorGettingPeople"
  >
    <!-- <div class="empty-img">
      <p><img src="../../assets/people/people-empty.svg" alt="" /></p>
      <p class="tip">You haven't added any member yet</p>
    </div> -->
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <ImportPeople @people-list="getMemberData" />
        </div>
      </div>
    </div>
  </div>

  <div class="row container-wide" v-if="loading && people.length === 0">
    <div class="col-md-12">
      <div class="row my-2 d-md-flex justify-content-between">
        <div class="col-md-4">
          <Skeleton width="100%" height="200px" shape="circle" />
        </div>
        <div class="col-md-4">
          <Skeleton width="100%" height="200px" shape="circle" />
        </div>
        <div class="col-md-4">
          <Skeleton width="100%" height="200px" shape="circle" />
        </div>
      </div>

      <div
        class="row my-2 d-md-flex justify-content-center"
        v-for="i in 10"
        :key="i"
      >
        <div class="col-md-2 my-2">
          <Skeleton width="100%" height="2rem" borderRadius="16px" />
        </div>
        <div class="col-md-2 my-2">
          <Skeleton width="100%" height="2rem" borderRadius="16px" />
        </div>
        <div class="col-md-2 my-2">
          <Skeleton width="100%" height="2rem" borderRadius="16px" />
        </div>
        <div class="col-md-2 my-2">
          <Skeleton width="100%" height="2rem" borderRadius="16px" />
        </div>
        <div class="col-md-2 my-2">
          <Skeleton width="100%" height="2rem" borderRadius="16px" />
        </div>
        <div class="col-md-2 my-2">
          <Skeleton width="100%" height="2rem" borderRadius="16px" />
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import { ref, onMounted } from "vue";
import axios from "@/gateway/backendapi";
import PeopleList from "@/views/people/PeopleList.vue";
import ImportPeople from "@/views/people/ImportPeople.vue";
import { useStore } from 'vuex';

export default {
  components: { PeopleList, ImportPeople },

  setup() {
    const people = ref([]);
    const loading = ref(false);
    const errorGettingPeople = ref(false);
    const dataStore = useStore();
    const membershipSummary = ref({})

    const getMembers = async () => {
      try {
        loading.value = true;
         /*eslint no-undef: "warn"*/
         NProgress.start()
        const { data } = await axios.get("/api/People/GetPeopleBasicInfo");
        people.value = data;
        console.log(people.value, "getpeopleInfo");
        loading.value = false;
      } catch (err) {
        NProgress.done()
        loading.value = false;
        errorGettingPeople.value = true;
        console.log(err);
      }
    }

    const peopleInStore =  ref(dataStore.getters['membership/members'])

    onMounted(() => {
      if (peopleInStore.value.length > 0) {
      // if (store.getters.members && store.getters.members.length > 0) {
        console.log(peopleInStore.value, 'pisyytytu');
        people.value = peopleInStore.value;
        // people.value = store.getters.members;
      } else {
        getMembers()
      }

    });

    const  getMemberData = () => {
      // people.value = payload
      axios
        .get(`/api/People/GetMembershipSummary`)
        .then((res) => {
          console.log(res, "new chart");
          membershipSummary.value = res.data;
        })
        .catch((err) => {
          console.log(err)
        })
    }

    return {
      people,
      peopleInStore,
      loading,
      errorGettingPeople,
      getMemberData,
      membershipSummary
    };
  },
};
</script>

<style scoped>
.main-body {
  height: 100%;
}

.top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
}

.no-person {
  height: 100%;
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

.tip {
  color: #02172e;
  font-size: 20px;
  font-weight: 600;
}

@media screen and (min-width: 990px) {
  .main-body {
    width: 90%;
    /* max-width: 1200px; */
    margin: 0 auto;
  }
}

@media screen and (min-width: 1200px) {
  .main-con {
    width: 80%;
    margin: 0 auto;
  }

  .top {
    height: 90px;
  }

  .no-person {
    height: calc(100% - 90px);
  }
}
</style>