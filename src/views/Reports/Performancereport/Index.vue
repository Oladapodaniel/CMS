<template>
  <div class="container-fluid px-0">
    <div class="row mt-4">
      <div class="col-md-12 col-12 px-0 text-center">
        <div
          class="row border-0 tabl report d-flex justify-content-between p-2 p-md-4"
        >
          <div class="col-md-6 col-12 pr-md-4 p-0">
            <h4 class="ju header4">Attendance Report</h4>
            <p class="ju paragraph1">
              Accurate information and keeping proper records make your ministry
              effective
            </p>
          </div>
          <div class="col-md-5 col-12  border-bottom mb-3">
            <div
              class="row d-md-flex justify-content-md-between d-flex justify-content-between"
            >
              <router-link to="/tenant/reports/attendancereport" class="linked">
                <h4
                  class="ju header4 d-md-flex s-20 justify-content-md-start"
                  style="color: #0B55D4"
                >
                  Attendance report
                </h4></router-link
              >
              <router-link to="/tenant/reports/attendancereport">
                <span
                  ><el-icon :color="primarycolor" :size="24"
                    ><ArrowRightBold /></el-icon></span
              ></router-link>
            </div>
            <div class="row border-bottom mb-3">
              <p class="ju mb-3 fw-400 paragraph1">
                This reports provides a detailed Attendance report of your
                ministry
              </p>
            </div>

            <div
              class="row d-md-flex justify-content-md-between d-flex justify-content-between"
            >
              <router-link
                to="/tenant/reports/groupattendancereport"
                class="linked"
              >
              <h4
                  class="ju header4 d-md-flex s-20 justify-content-md-start"
                  style="color: #0B55D4"
                >
                  Group Attendance Report
                </h4></router-link
              >
              <router-link to="/tenant/reports/groupattendancereport">
                <span
                  ><el-icon :color="primarycolor" :size="24"
                    ><ArrowRightBold /></el-icon></span
              ></router-link>
            </div>
            <div class="row">
              <p class="ju mb-3 paragraph1 fw-400">
                This reports provides a detailed Attendance report of the groups
                in your ministry.
              </p>
            </div>
          </div>

          <div class="col-md-6 col-12 pr-md-4 p-0"></div>
          <div class="col-md-5 col-12">
            <div
              class="row d-md-flex justify-content-md-between d-flex justify-content-between"
            >
              <router-link
                to="/tenant/reports/attendanceperformancereport"
                class="linked"
              >
              <h4
                  class="ju header4 d-md-flex s-20 justify-content-md-start"
                  style="color: #0B55D4"
                >
                  Church Activity Attendance
                </h4>
              </router-link>
              <router-link to="/tenant/reports/attendancereport" class="linked">
                <span
                  ><el-icon :color="primarycolor" :size="24"
                    ><ArrowRightBold /></el-icon
                ></span>
              </router-link>
            </div>
            <div class="row">
              <p class="ju mb-3 fw-400 paragraph1">
                This reports provides a detailed Attendance perfomance report of
                your church
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row mt-5">
      <div class="col-md-12 col-12 px-0 text-center">
        <div
          class="row border-0 tabl report d-flex justify-content-between p-2 p-md-4"
        >
          <div class="col-md-6 col-12 pr-md-4 p-0">
            <h4 class="ju header4">Performance Report</h4>
            <p class="ju paragraph1">
              Accurate information and keeping proper records make your ministry
              effective
            </p>
          </div>
          <div class="col-md-5 col-12 border-bottom">
            <div
              class="row d-md-flex justify-content-md-between d-flex justify-content-between"
            >
              <router-link
                to="/tenant/reports/firsttimerperformancereport"
                class="linked"
              >
              <h4
                  class="ju header4 d-md-flex s-20 justify-content-md-start"
                  style="color: #0B55D4"
                >
                  First Timer Performance
                </h4></router-link
              >
              <router-link to="/tenant/reports/firsttimerperformancereport">
                <span
                  ><el-icon :color="primarycolor" :size="24"
                    ><ArrowRightBold /></el-icon></span
              ></router-link>
            </div>
            <div class="row">
              <p class="ju mb-3 fw-400 paragraph1">
                This reports provides a detailed Group Category Attendance of
                your ministry
              </p>
            </div>
          </div>
          <div class="col-md-6 col-12 pr-md-4 p-0"></div>
          <div class="col-md-5 col-12 mt-4">
            <div
              class="row d-md-flex justify-content-md-between d-flex justify-content-between"
            >
              <router-link
                to="/tenant/reports/newconvertperformancereport"
                class="linked"
              >
              <h4
                  class="ju header4 d-md-flex s-20 justify-content-md-start"
                  style="color: #0B55D4"
                >
                  New Convert Performance
                </h4></router-link
              >
              <router-link to="/tenant/reports/newconvertperformancereport">
                <span
                  ><el-icon :color="primarycolor" :size="24"
                    ><ArrowRightBold /></el-icon></span
              ></router-link>
            </div>
            <div class="row">
              <p class="ju mb-3 fw-400 paragraph1">
                This reports provides a detailed New Convert Attendance of your
                ministry
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!--border 2-->
    <div class="row mt-5 mb-5">
      <div class="col-md-12 col-12 px-0 text-center">
        <div
          class="row border-0 tabl report d-flex justify-content-between p-2 p-md-4"
        >
          <div class="col-md-6 col-12 pr-md-4 p-0">
            <h4 class="ju header4">Summary Report</h4>
            <p class="ju paragraph1">
              This reports provides a detailed Summary Attendance of your
              ministry
            </p>
          </div>
          <div class="col-md-5 col-12">
            <div
              class="row d-md-flex justify-content-md-between d-flex justify-content-between"
            >
              <router-link
                to="/tenant/reports/summarygroupattendancereport"
                class="linked"
              >
              <h4
                  class="ju header4 d-md-flex s-20 justify-content-md-start"
                  style="color: #0B55D4"
                >
                  Group Summary Attendance
                </h4></router-link
              >
              <router-link to="/tenant/reports/summarygroupattendancereport">
                <span
                  ><el-icon :color="primarycolor" :size="24"
                    ><ArrowRightBold /></el-icon></span
              ></router-link>
            </div>
            <div class="row border-bottom mb-3">
              <p class="ju mb-3 fw-400 paragraph1">
                This reports provides a detailed overall summary report of your
                group attendance report.
              </p>
            </div>

            <div
              class="row d-md-flex justify-content-md-between d-flex justify-content-between"
            >
              <router-link to="/tenant/reports/summaryreport" class="linked"
                ><h4
                  class="ju header4 d-md-flex s-20 justify-content-md-start"
                  style="color: #0B55D4"
                >
                  Summary Report
                </h4></router-link
              >
              <router-link to="/tenant/reports/summaryreport">
                <span
                  ><el-icon :color="primarycolor" :size="24"
                    ><ArrowRightBold /></el-icon></span
              ></router-link>
            </div>
            <div class="row">
              <p class="ju mb-3 fw-400 paragraph1">
                This reports provides a detailed Summary Attendance of your
                ministry
              </p>
            </div>
          </div>
          <div class="col-md-6 col-12 pr-md-4 p-0"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { inject } from "vue";
export default {
  setup() {
    const primarycolor = inject("primarycolor");

    return {
      primarycolor,
    };
  },
};
</script>

<style scoped>
.report {
  width: 100%;
  margin: auto;
}
.ju {
  text-align: start;
}
.header4 {
  font-size: 24px;
  font-weight: 500;
}
.paragraph1 {
  font-size: 18px;
  font-weight: 300;
  line-height: 27px;
  color: #111111;
  background-color: #fff;
}
.rounded {
  border-color: #b0b2b5 !important;
  border-radius: 15px !important;
}
.linked {
  text-decoration: none !important;
}
</style>