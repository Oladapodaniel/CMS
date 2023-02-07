<template>
  <PeopleList :list="people" :peopleCount="people.length" v-if="!loading && (people.length > 0 || errorGettingPeople)" />
  <div class="no-person mt-5" v-else-if="!loading && people.length === 0 && !errorGettingPeople">
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <ImportPeople @people-list="getMemberData" />
        </div>
      </div>
    </div>
  </div>

  <el-skeleton class="w-100" animated v-if="loading && people.length === 0">
    <template #template>
      <div
          style="
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-top: 20px
          "
        >
          <el-skeleton-item variant="text" style="width: 240px; height: 240px" />
          <el-skeleton-item variant="text" style="width: 240px; height: 240px" />
        </div>
        <!-- <el-skeleton-item variant="text" class="w-100" style="height: 25px" :rows="10"/> -->
        <el-skeleton class="w-100 mt-5" style="height: 25px"  :rows="20" animated />
    </template>
  </el-skeleton>
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
        loading.value = false;
      } catch (err) {
        NProgress.done()
        loading.value = false;
        errorGettingPeople.value = true;
        console.log(err);
      }
    }

    const peopleInStore = ref(dataStore.getters['membership/members'])

    onMounted(() => {
      if (peopleInStore.value.length > 0) {
        people.value = peopleInStore.value;
      } else {
        getMembers()
      }

    });

    const getMemberData = () => {
      // people.value = payload
      axios
        .get(`/api/People/GetMembershipSummary`)
        .then((res) => {
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