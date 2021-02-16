!<template>
  <div>
    <div class="container">

      <!-- Content Box -->
      <main id="main" class="mt-3">
        <div class="container-fluid px-0">
          <div class="row px-0">
            <div class="col-md-12 px-0">
              <div class="row d-md-flex align-items-center justify-content-between mt-3 mb-4">
                <div class="col-md-12 col-sm-12 pl-0">
                  <div class="search-div">
                    <span><i class="fa fa-search mr-1"></i></span>
                    <input type="text" placeholder="Search here..." />
                    <span class="mx-2"> | </span>
                    <span class="mx-2">Sort By</span>
                    <span class="font-weight-bold"> Newest</span>
                  </div>
                </div>
                <!-- <div class="col-sm-5 col-md-3 mt-sm-2 units-container">
                  <UnitsArea />
                </div> -->
              </div>

              <div class="row table-box mb-4">
                <div class="col-md-12">
                  <div class="row header-row light-grey-bg">
                    <div class="col-md-12">
                      <div class="row light-grey-bg py-1">
                        <div class="col-md-1">
                          <input type="checkbox" class="mark-box" />
                        </div>
                        <div class="col-md-11">
                          <span class="th">Message</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-12 px-0">
                      <hr class="hr mt-0" />
                    </div>
                  </div>
                  <div class="row" v-for="(email, index) in schedules" :key="index">
                    <div class="col-md-12 py-1">
                      <div class="row">
                        <div class="col-md-1">
                          <input type="checkbox" class="mark-box" />
                        </div>
                        <div class="col-md-8 d-md-flex flex-column small-text">
                          <router-link to="" class="text-decoration-none"><span
                            class="msg-n-time"
                          >
                            <span class="font-weight-bold mr-2 text-dark">{{ !email.subject ? '(no subject)' : email.subject }}</span>
                          <span class="brief-message font-weight-600 ml-2">{{ `${email.message.split('').slice(0, 50).join("")}...` }}</span>
                          </span></router-link>
                        </div>

                        <div class="col-md-3 d-md-flex flex-column small-text">
                          <span
                            class="msg-n-time"
                          >
                            <span class="timestamp ml-4 small-text">{{ formattedDate(email.date) }}</span>
                          </span>
                        </div>

                      </div>
                      <div class="row" v-if="index !== schedules.length - 1">
                        <div class="col-md-12 px-0">
                          <hr class="hr" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="row" v-if="schedules.length === 0 && !loading">
                    <div class="col-md-12 d-flex justify-content-center">
                      <span class="my-4 font-weight-bold">No scheduled mesages</span>
                    </div>
                  </div>

                  <div class="row" v-if="schedules.length === 0 && loading">
                    <div class="col-md-12 py-2 d-flex justify-content-center">
                      <i class="fas fa-circle-notch fa-spin"></i>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from 'vue';
// import UnitsArea from "../../components/units/UnitsArea"
import communicationService from "../../services/communication/communicationservice";
import dateFormatter from '../../services/dates/dateformatter'


export default {
//   components: { UnitsArea },
  setup() {
    const schedules = ref([ ]);
    const loading = ref(false);

    const getScheduledSMS = async () => {
      try {
        loading.value = true;
        const res = await communicationService.getSchedules("/api/Messaging/getEmailSchedules");
        loading.value = false;
        schedules.value = res;
      } catch (error) {
        console.log(error);
      }
    }

    const formattedDate = (date) => {
      return dateFormatter.monthDayTime(date);
    }

    onMounted(() => {
      getScheduledSMS()
    })

    return {
      schedules,
      loading,
      formattedDate,
    }
  }
};
</script>

<style scoped>
.search-div {
  width: fit-content;
  padding: 10px;
  background: #f5f8f9;
  border-radius: 200px;
}

.search-div input {
  background: none;
  border: none;
  outline: transparent;
}

.brief-message {
  color: #4762f0;
}

.compose-btn {
  background: #136acd;
  box-shadow: 0px 6px 12px #708eb170;
  border-radius: 22px;
  color: #fff;
  height: 42px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.menu-icon {
  font-size: 20px;
}

.units-div {
  border: 1px solid #dde2e6;
  border-radius: 20px;
  padding: 15px 0;
  background: #f9a9a933 !important;
}

.hidden-header {
  display: none;
}

.th {
  font-size: 16px;
  font-weight: 700;
}

.inbox-count {
  background: rgba(19, 106, 205, 0.3);
  padding: 4px 8px;
  border-radius: 22px;
}

.menu-item-con {
    color: #002044;
    opacity: 0.5;
}

.menu-item-con.active {
    background: rgba(19, 106, 205, 0.05);
    border-left: 2px solid #136ACD;
    opacity: 1;
}

.buy-btn {
    background: rgb(112, 142, 177, .33);
    border-radius: 22px;
}

.btn-text {
    opacity: 1;
    font-size: 11px;
    font-weight: 700;
}

.timestamp {
    font-size: 14px;
    color: #333333;
    opacity: 0.5;
}

.view-btn {
    background: #EBEFF4;
    border-radius: 21px;
    padding: 4px 18px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.center-flexed {
  display: flex;
  justify-content: center;
}

.table-box {
  border: 1px solid #4762F01F;
}

.hr {
  border: 1px solid #4762F01F;
}

@media screen and (max-width: 767px) {
  .hidden-header {
    display: inline-block;
    font-size: 12px;
  }

  .header-row {
    display: none;
  }

  #menu-items {
    flex-direction: row !important;
  }

  .search-div {
    width: 100%;
  }

  .units-div {
    width: 100%;
  }

  .units-container {
    margin-left: 0;
    margin: auto;
  }
}

@media screen and (max-width: 1000px) {
  .msg-n-time {
    flex-direction: column;
    margin-bottom: 8px;
  }
}

@media screen and (min-width: 1000px) {
  #menu-items {
    min-width: 100% !important;
  }
}
</style>