<template>
    <div class="whole-con">
    <div class="main-con">
      <div class="main-body">
        <div class="col-sm-12">
        <div class="top container-wide mt-3">
          <div class="header">
            <h2>Attendance & Checkin
            </h2>
          </div>
          <div class="actions">
            
              <router-link :to="{ name: 'AddFirstTimer' }">
                <button class="buttonn add-person-btn">
                  Add New Attendance
                </button>
              </router-link>
          </div>
        </div>
      </div>

      <hr class="hr" />
         <!-- <div v-if="firstTimersList.length === 0 && !loading" class="no-person" > -->
             <div class="no-person">
        <div class="empty-img">
            <p><img src="../../../assets/people/people-empty.svg" alt="" /></p>
            <p class="tip">You haven't added any first timer yet</p>
        </div>
      </div>
      <!-- <div v-else-if="firstTimersList.length > 0 && !loading" class="event-list">
            <FirstTimersList />
        </div> -->
        
    </div>
  </div>
</div>
</template>

<script>
export default {
    setup () {
        return {}
    }
}
</script>

<style scoped>
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
            /* max-width: 1021px; */
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
  display: flex;;
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