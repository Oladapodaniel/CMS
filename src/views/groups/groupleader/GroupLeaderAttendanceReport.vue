<template>
    <div class="container container-top">
        <div class="row d-flex justify-content-center justify-content-sm-between">
          <div class="col-12 col-sm-6 page-header">Attendance and report</div>
          <div class="default-btn mt-3 mt-sm-0">Add event</div>
        </div>
        <div class="row border mt-5">
            <div class="col-12 my-3">
                <div class="font-weight-700">Upcoming events</div>
                <div class="row mt-3">
                    <div class="col-10 offset-1  boxes py-3 mt-5 bg-white">
                        <div class="d-flex flex-column flex-sm-row justify-content-between w-100 font-adjustment">
                            <div class="text-center">Sunday Service</div>
                            <div class="text-center">Choir</div>
                            <div class="text-center">Date</div>
                        </div>
                        <!-- <div class="text-center col-12 col-sm-6 col-lg-4 mt-3 primary-bg text-white default-btn border-0">Take attendance</div> -->
                        <router-link :to="{ name: 'TakeAttendance' }">
                        <div class="text-center col-12 col-sm-6 col-lg-4 mt-3 primary-bg text-white default-btn border-0">Take attendance</div>
                        </router-link>
                    </div>
                    <div class="col-10 offset-1  boxes py-3 mt-5 bg-white">
                        <div class="d-flex flex-column flex-sm-row justify-content-between w-100 font-adjustment">
                            <div class="text-center">Sunday Service</div>
                            <div class="text-center">Choir</div>
                            <div class="text-center">Date</div>
                        </div>
                        <div class="text-center col-12 col-sm-6 col-lg-4 mt-3 primary-bg text-white default-btn border-0">Take attendance</div>
                    </div>
                    <div class="col-10 offset-1 boxes py-3 mt-5 bg-white">
                        <div class="d-flex flex-column flex-sm-row justify-content-between w-100 font-adjustment">
                            <div class="text-center">Sunday Service</div>
                            <div class="text-center">Choir</div>
                            <div class="text-center">Date</div>
                        </div>
                        <div class="text-center col-12 col-sm-6 col-lg-4 mt-3 primary-bg text-white default-btn border-0">Take attendance</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row border">
            <div class="col-12 mt-3">
                <div class="font-weight-700">Past events</div>
               <div class="row mt-3">
                    <div class="col-10 offset-1  boxes py-3 mt-5 bg-white">
                        <div class="d-flex flex-column flex-sm-row justify-content-between w-100 font-adjustment">
                            <div class="text-center">Sunday Service</div>
                            <div class="text-center">Choir</div>
                            <div class="text-center">Date</div>
                        </div>
                        <!-- <div class="text-center col-12 col-sm-6 col-lg-4 mt-3 primary-bg text-white default-btn border-0">Take attendance</div> -->
                        <div class="text-center col-12 col-sm-6 col-lg-4 mt-3 primary-bg text-white default-btn border-0">Take attendance</div>
                    </div>
                    <div class="col-10 offset-1  boxes py-3 mt-5 bg-white">
                        <div class="d-flex flex-column flex-sm-row justify-content-between w-100 font-adjustment">
                            <div class="text-center">Sunday Service</div>
                            <div class="text-center">Choir</div>
                            <div class="text-center">Date</div>
                        </div>
                        <div class="text-center col-12 col-sm-6 col-lg-4 mt-3 primary-bg text-white default-btn border-0">Take attendance</div>
                    </div>
                    <div class="col-10 offset-1 boxes py-3 mt-5 bg-white">
                        <div class="d-flex flex-column flex-sm-row justify-content-between w-100 font-adjustment">
                            <div class="text-center">Sunday Service</div>
                            <div class="text-center">Choir</div>
                            <div class="text-center">Date</div>
                        </div>
                        <div class="text-center col-12 col-sm-6 col-lg-4 mt-3 primary-bg text-white default-btn border-0">Take attendance</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import attendanceservice from '../../../services/attendance/attendanceservice';
export default {
    setup () {


        const getCheckinAttendances = async() => {
            const response = await attendanceservice.getItems();
            console.log(response, 'egdfsdf')
        }
        getCheckinAttendances()

        return {
            
        }
    }
}
</script>

<style scoped>
.page-header {
    font: normal normal 800 29px Nunito sans;
}

.secondary-bg {
    background: #136acd75
}

.boxes {
    /* box-shadow: 0px 3px 6px #2c28281c; */
    /* border: 1px solid #00204424; */
    /* box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset; */
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
}

.font-adjustment div:first-child {
    font-weight: 700;
    font-size: 1.3em;
}

.font-adjustment div:nth-child(2), .font-adjustment div:last-child {
    font-size: 1.2em;
}

</style>