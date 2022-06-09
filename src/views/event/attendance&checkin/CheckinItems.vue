<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-12">

        <!-- <hr class="hr" /> -->
        <div class="no-person" v-if="items.length === 0 && !errorOccurred">
          <div class="empty-img mt-5">
            <p><img src="../../../assets/people/people-empty.svg" alt="" /></p>
            <p class="tip">You have no attendance yet</p>
          </div>
        </div>

        <div class="row" v-if="items.length > 0 && !loading">
          <div class="col-md-12 px-0">
            <List :list="items" @checkedattendance="removeMultipleCheckin" :errorOcurred="errorOccurred" @attendance-checkin="removeCheckin" :totalItems="totalItems" @pagedattendance="setPagedAttendance" />
          </div>
        </div>
        <div class="row" v-if="cantGetItems">
          <div class="col-md-12">
            <p>Error getting items, please reload</p>
          </div>
        </div>
      </div>

      
    </div>
  </div>
</template>

<script>
import List from "../../../views/event/attendance&checkin/AttendanceAndCheckinList";
import attendanceservice from '../../../services/attendance/attendanceservice';
import { ref } from 'vue';

export default {
  components: { List },
  async setup() {
    const items = ref([ ]);
    const loading = ref(false);
    const errorOccurred = ref(false);
    const cantGetItems = ref(true);
    const totalItems = ref(0);

    // const getAttendanceItems = async () => {
      try {
        cantGetItems.value = false;
        loading.value = true;
        const response = await attendanceservice.getItems();
        console.log(response, "checkins");
        items.value = items.value ? response.items : [ ];
        totalItems.value = response.totalItems
        loading.value = false;
      } catch (error) {
        cantGetItems.value = true;
        console.log(error);
        loading.value = false;
        errorOccurred.value = true;
      }
      console.log(errorOccurred.value);
    // }
    // getAttendanceItems();

    const removeCheckin = (payload) => {
        items.value.splice(payload, 1)
    }

    const removeMultipleCheckin = (payload) => {
      console.log(payload, "oiiipoii")
      items.value = items.value.filter((item) => {
              const y = payload.findIndex(
                (i) => i.id === item.id
              );
               console.log(y , "old are u now");
              if (y >= 0) return false;
              return true;
            });
            console.log(items.value, "the boy is good ")
    }

    const setPagedAttendance = (payload) => {
      items.value = payload.items
    }

    return {
      items,
      removeMultipleCheckin,
      loading,
      errorOccurred,
      cantGetItems,
      removeCheckin,
      totalItems,
      setPagedAttendance
    };
  },
};
</script>

<style scoped>
.events {
  font-family: Nunito Sans !important;
}

.whole-con {
  display: flex;
  height: 100vh;
}

.main-con {
  width: 100%;
  height: 70%;
}

.main-body {
  height: 100%;
}

.top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
}

.buttonn {
  padding: 8px 20px;
  border: none;
  border-radius: 22px;
  font-size: 16px;
  font-weight: 600;
  margin: 0 8px;
  outline: none;
  text-decoration: none;
  box-sizing: border-box;
}

.buttonn:hover {
  cursor: pointer;
}

.no-person {
  height: 100%;
  display: flex;
  text-align: center;
}

.add-person-btn {
  background: #136acd;
  color: #fff;
}

.more-btn {
  background: #dde2e6;
}

.btn-icon {
  padding: 0 8px;
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

@media screen and (min-width: 990px) {
  .main-body {
    width: 95%;
    margin: 0 auto;
  }
}

@media screen and (min-width: 1400px) {
  .main-con {
    width: 90%;
    margin: 0 auto;
  }

  .top {
    height: 90px;
  }

  .no-person {
    height: calc(100% - 90px);
  }
}

@media (max-width: 640px) {
  .top {
    display: flex;
    align-items: center;
    flex-direction: column;
  }
  .actions {
    margin-top: 15px;
  }
}

@media (max-width: 566px) {
  /* .button {
        width: 160px;
    } */
}

@media (max-width: 399px) {
  .actions {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .button {
    margin-top: 10px;
  }
}
</style>