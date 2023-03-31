<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-12 px-0">
        <Suspense>
          <template #default>
            <CheckinList />
          </template>
          
          <template #fallback>
            <div class="row">
                     <el-skeleton class="w-100" animated v-if="loading">
            <template #template>
              <div
                style="
                  display: flex;
                  align-items: center;
                  justify-content: space-between;
                  margin-top: 20px;
                "
              >
                <el-skeleton-item
                  variant="text"
                  style="width: 240px; height: 240px"
                />
                <el-skeleton-item
                  variant="text"
                  style="width: 240px; height: 240px"
                />
              </div>
              <!-- <el-skeleton-item variant="text" class="w-100" style="height: 25px" :rows="10"/> -->
              <el-skeleton
                class="w-100 mt-5"
                style="height: 25px"
                :rows="20"
                animated
              />
            </template>
          </el-skeleton>
            </div>
          </template>
        </Suspense>

      </div>
    </div>
  </div>
</template>

<script>
import CheckinList from "./CheckinItems";

export default {
  components: { CheckinList },

  setup() {},
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