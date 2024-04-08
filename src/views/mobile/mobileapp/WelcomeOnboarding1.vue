<template>
    <div class="container-top" :class="{ 'container-slim': lgAndUp || xlAndUp }">
        <div class="row" v-if="welcome">
            <div class="col-md-12 col-12" style="background: #F1F1F1; border-radius: 15px;">
                <div class="row justify-content-center py-5">
                    <div class="col-md-11 col-11 bg-white" style="border-radius: 15px;">
                        <div class="row">
                            <!-- <div class="col-md-12   mt-3 d-flex justify-content-end">
                                <img class="d-none d-md-block" src="../../../assets/mobileonboarding/progressicon.png"
                                    alt="">
                            </div> -->
                            <div class="col-md-6 mt-3  d-flex align-items-center justify-content-center  col-12 ">
                                <div class="row  align-items-center justify-content-end ">
                                    <div class="col-md-9 mb-5  ">
                                        <div class="h2 font-weight-bold the-game text-head mt-4 ">The Game changer for
                                            your
                                            Ministry</div>
                                        <div class="text-font mt-2">Faith connect helps you stay connected with your
                                            members
                                            with its amazing features.</div>
                                        <div class="font-weight-bold mt-4">How to download the App</div>
                                        <div class="col-md-10 px-0 mt-2 d-flex">
                                            <div class="col-md-6 col-6 px-0">
                                                <img class="w-100"
                                                    src="../../../assets/mobileonboarding/Google-play-logo.png" alt="">
                                            </div>
                                            <div class="col-md-6 col-6 px-0">
                                                <img class="w-100"
                                                    src="../../../assets/mobileonboarding/app-store-logo.png" alt="">
                                            </div>
                                        </div>
                                        <div class="col-md-9 col-6 px-0 mt-4">
                                            <img class="w-50" src="../../../assets/mobileonboarding/playVideo.png"
                                                alt="">
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div class="col-md-6 pb-2 col-12"
                                :class="{ 'welcomebox': welcome, 'welcomebox2': !welcome }">
                                <div class="row ">
                                    <div class="col-md-12  mt-5">
                                        <div class=" col-md-12 col-12  "><img class="w-100 h-100 d-none d-md-block"
                                                src="../../../assets/mobileonboarding/handimage.png" alt="">
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-12">
                                <div class="row justify-content-end">
                                    <div class=" col-md-3 mt-2 mb-3 d-flex  align-items-end">
                                        <el-button color="#120DFA" @click="next1" size="large" class="ml-2 pr-2 "
                                            round>Next
                                            <el-icon :size="30" class="d-flex ">
                                                <Right />
                                            </el-icon> </el-button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row  mt-3" v-if="feature">
            <div class="col-md-12  col-12 mb-4 gradient" style="border-radius: 15px;">
                <div class="row justify-content-center">
                    <div class="col-md-9 col-11  pt-5">
                        <div class="row mt-3">
                            <div class="col-md-12 text-center font-weight-600 the-game h3 text-head "> Some amazing
                                Features </div>
                        </div>
                        <div class="row  justify-content-center mt-4 ">
                            <div class="col-md-11">
                                <div class="row">
                                    <div class="col-md-2 d-none d-md-block">
                                        <div style="height: 20rem; width:16rem; "
                                            class="feature-gradient text-head h1 font-weight-600">
                                            Features</div>
                                    </div>
                                    <div class="col-md-10 col-12 ">
                                        <div class="row justify-content-center justify-content-md-between justify-content-md-start ">
                                            <div class="col-md-4 col-8 mt-4 ">
                                                <div class="row flex-nowrap ">
                                                    <div class="col-md-6 px-0 small  mt-1 font-weight-bold text-head">
                                                        Daily
                                                        Devotion</div>
                                                    <div class="col-md-6 d-flex justify-content-end   px-0">
                                                        <div class="col-md-9 col-sm-6  col-10 mt-2 mt-sm-0 ">
                                                            <img class="w-100"
                                                                src="../../../assets/mobileonboarding/praise-hand.png"
                                                                alt="">
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="row flex-nowrap mt-5">
                                                    <div class="col-md-6 px-0 small mt-2  font-weight-bold text-head">
                                                        Live
                                                        Streams</div>
                                                    <div class="col-md-6 d-flex justify-content-end px-0">
                                                        <div class="col-md-9 col-sm-6  col-10 mt-2 mt-sm-0">
                                                            <img class="w-100"
                                                                src="../../../assets/mobileonboarding/radio.png" alt="">
                                                        </div>
                                                    </div>
                                                </div>

                                                <div class="row flex-nowrap mt-5">
                                                    <div class="col-md-6 px-0 small mt-2 font-weight-bold text-head">
                                                        Finance
                                                        & Giving</div>
                                                    <div class="col-md-6 d-flex justify-content-end px-0">
                                                        <div class="col-md-9 col-sm-6  col-10 mt-2 mt-sm-0">
                                                            <img class="w-100"
                                                                src="../../../assets/mobileonboarding/giving.png"
                                                                alt="">
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-md-4 col-6 mt-4 mt-md-0">
                                                <img class="w-100"
                                                    src="../../../assets/mobileonboarding/phone-store.png" alt="">
                                            </div>
                                            <div class="col-md-4 mt-3">
                                                <div class="row flex-nowrap">
                                                    <div class="col-md-6 d-flex justify-content-md-start justify-content-center px-0">
                                                        <div class="col-md-9 col-sm-4  col-7 mt-2 mt-sm-0">
                                                            <img class="w-100"
                                                                src="../../../assets/mobileonboarding/social-media.png"
                                                                alt="">
                                                        </div>
                                                    </div>
                                                    <div
                                                        class="col-md-6 px-0 small mt-3 mt-md-2 d-flex justify-content-md-start justify-content-center  font-weight-bold text-head">
                                                        Social
                                                        Media</div>
                                                </div>
                                                <div class="row flex-nowrap mt-5">
                                                    <div class="col-md-6 d-flex justify-content-md-start justify-content-center px-0">
                                                        <div class="col-md-9 col-sm-4 col-7 mt-2 mt-sm-0">
                                                            <img class="w-100"
                                                                src="../../../assets/mobileonboarding/notification.png"
                                                                alt="">
                                                        </div>
                                                    </div>
                                                    <div
                                                        class="col-md-6 px-0 small mt-2  d-flex justify-content-md-start justify-content-center  font-weight-bold text-head">
                                                        Job Notifications</div>
                                                </div>
                                                <div class="row flex-nowrap mt-5">
                                                    <div class="col-md-6 d-flex justify-content-md-start justify-content-center px-0">
                                                        <div class="col-md-9 col-sm-4  col-7 mt-2 mt-sm-0">
                                                            <img class="w-100"
                                                                src="../../../assets/mobileonboarding/social-media.png"
                                                                alt="">
                                                        </div>
                                                    </div>
                                                    <div
                                                        class="col-md-6 px-0 small mt-2 d-flex justify-content-md-start justify-content-center    font-weight-bold text-head shop-cart">
                                                        Ecommerce & Media</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-12 d-flex justify-content-end mb-3">
                        <el-button round color="#120DFA" size="large"  @click="next2" class=" c-pointer ">Next<el-icon
                                :size="20">
                                <Right />
                            </el-icon></el-button>
                    </div>
                </div>
            </div>
        </div>
        <div class="row mt-3" :class="{ 'box3': gateway, 'box4': !gateway }">
            <div class="col-md-12" style="background: #F1F1F1; border-radius: 15px;">
                <div class="row justify-content-center">
                    <div class="col-md-11 col-11  py-5">
                        <div class="row my-3">
                            <div class="col-md-12 text-center font-weight-600 the-game h3 text-head "> Why your Members
                                will Love this App </div>
                        </div>
                        <div class="row">
                            <div class="col-md-4  h-100 ">
                                <div class="col-md-12  " style="border-radius: 12px; overflow: hidden;">
                                    <div class="row">
                                        <div class="col-md-12 px-0 devotion">
                                            <img src="../../../assets/mobileonboarding/devotion.png" class="w-100"
                                                alt="">
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-12 pt-2 pb-3 text-white text-center"
                                            style="background: #A9C307;">
                                            <div class="font-weight-600">Daily Devotions</div>
                                            <div class="small">
                                                Find out why Faith Connect is the Next Game Changer for your Ministry
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-4 mt-4 mt-md-0 ">
                                <div class="col-md-12  " style="border-radius: 12px; overflow: hidden;">
                                    <div class="row">
                                        <div class="col-md-12 px-0">
                                            <img src="../../../assets/mobileonboarding/live-streams.png" class="w-100"
                                                alt="">
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-12 pt-2 pb-3 text-white text-center"
                                            style="background: #FF7D04;">
                                            <div class="font-weight-600">Live Streams</div>
                                            <div class="small">
                                                Stream events, & services conveniently from the comfort of your home or
                                                wherever you are.
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-4 mt-4 mt-md-0 ">
                                <div class="col-md-12  " style="border-radius: 12px; overflow: hidden;">
                                    <div class="row">
                                        <div class="col-md-12 px-0">
                                            <img src="../../../assets/mobileonboarding/finance.png" class="w-100"
                                                alt="">
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-12 pt-2 pb-3 text-white text-center"
                                            style="background: #6B34DF;">
                                            <div class="font-weight-600">Finance & Giving</div>
                                            <div class="small">
                                                Contribute your tithe, offerings, & special seeds effortlessly from
                                                anywhere at any time.
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row mt-3">
                            <div class="col-md-4  ">
                                <div class="col-md-12  " style="border-radius: 12px; overflow: hidden;">
                                    <div class="row">
                                        <div class="col-md-12 px-0">
                                            <img src="../../../assets/mobileonboarding/social.png" class="w-100" alt="">
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-12 pt-2 pb-3 text-white text-center"
                                            style="background: #0971D2;">
                                            <div class="font-weight-600">Social Media</div>
                                            <div class="small">
                                                Engage with fellow members and cultivate a lively, thriving church
                                                community.
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-4 mt-4 mt-md-0 ">
                                <div class="col-md-12  " style="border-radius: 12px; overflow: hidden;">
                                    <div class="row">
                                        <div class="col-md-12 px-0">
                                            <img src="../../../assets/mobileonboarding/job-search.png" class="w-100"
                                                alt="">
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-12 pt-2 pb-3 text-white text-center"
                                            style="background: #921173;">
                                            <div class="font-weight-600">Get Job Notifications</div>
                                            <div class="small">
                                                Receive immediate notifications When there is a job opening in your
                                                area.
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-4 mt-4 mt-md-0 ">
                                <div class="col-md-12  " style="border-radius: 12px; overflow: hidden;">
                                    <div class="row">
                                        <div class="col-md-12 px-0">
                                            <img src="../../../assets/mobileonboarding/ecommerce.png" class="w-100"
                                                alt="">
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-12 pt-2 pb-3 text-white text-center"
                                            style="background: #FF0000;">
                                            <div class="font-weight-600">Ecommerce & Media</div>
                                            <div class="small">
                                                Conveniently purchase church merchandise, books, audio sermons, music,
                                                and videos to empower your spiritual journey.
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-12 d-flex justify-content-end">
                        <div class="">
                            <el-button color="#120DFA" @click="next3" size="large" class="ml-2 pr-2 " round>Next
                                <el-icon :size="20">
                                    <Right />
                                </el-icon> </el-button>
                        </div>
                    </div>
                </div>
            </div>
            <!-- <div class="col-md-12  " style="background: #F9FAFBE3;">
                <div class="row justify-content-center">
                    <div class="col-md-12   mt-3 d-flex justify-content-end">
                        <img class="d-none d-md-block" src="../../../assets/mobileonboarding/progressicon2.png" alt="">
                    </div>
                    <div class="col-md-7 d-flex     col-12" :class="{ 'box1': gateway, 'box2': !gateway }">
                        <img class="w-100 d-none d-md-block" src="../../../assets/mobileonboarding/phone-two.png"
                            alt="">
                        <div class="col-md-2  align-items-end  d-flex justify-content-end" style="height: 60vh;">
                            <el-button color="#120DFA" @click="next2" size="large" class="ml-2 p-0  d-none d-md-block "
                                round>Next
                                <el-icon :size="20">
                                    <Right />
                                </el-icon> </el-button>
                        </div>
                    </div>
                    <div class="col-md-5 d-flex  align-items-center col-8 "
                        :class="{ 'GatewayText': gateway, 'GatewayText2': !gateway }">
                        <div class="row d-flex justify-content-end align-items-center">
                            <div class="col-md-9  text-center ">
                                <div class="h2 font-weight-600">Gateway to Faithful Living Starts Here.</div>
                                <div class="text-font">Explore Inspirational Media, Engage in Worship, and Give Back
                                    Online.
                                </div>
                                <div class=" d-block d-md-none my-4">
                                    <el-button color="#120DFA" @click="next2" size="large" class="ml-2 pr-2 " round>Next
                                        <el-icon :size="20">
                                            <Right />
                                        </el-icon> </el-button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div> -->
        </div>
        
       
        <div class="row  mt-3" :class="{ 'yourFaith3': yourFaith, 'yourFaith4': !yourFaith }">
            <div class="col-md-12  col-12" style="background: #F1F1F1; border-radius: 15px;">
                <div class="row justify-content-center">
                    <div class="col-md-9 col-11  py-5">
                        <div class="row mt-3">
                            <div class="col-md-12 text-center font-weight-600 the-game h3 text-head "> How to get the
                                App </div>
                        </div>
                        <div class="row  justify-content-end mt-3 ">
                            <div class="col-md-10">
                                <div class="row">
                                    <div class="col-6 col-md-4 px-0">
                                        <div class="mt-2  px-0 d-flex align-items-center cursor-pointer">
                                            <div class="text-font active-tab">1
                                            </div>
                                            <hr class="hr w-100">
                                        </div>
                                    </div>
                                    <div class="col-6 col-md-4 px-0">
                                        <div class="mt-2  px-0 d-flex  align-items-center cursor-pointer">
                                            <div class="text-font active-tab">2
                                            </div>
                                            <hr class="hr w-100">
                                        </div>
                                    </div>
                                    <div class="col-6 col-md-4 px-0">
                                        <div class="mt-2  px-0 d-flex  align-items-center cursor-pointer">
                                            <div class="text-font active-tab">3
                                            </div>
                                            <!-- <hr class="hr w-100"> -->
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row  justify-content-center text-center">
                            <div class="col-md-10 mt-3">
                                <div class="row">
                                    <div class="col-12 col-sm-6 col-md-4 px-0">
                                        <div class="text-head col-md-12 font-weight-600 h5">Onboard and fill your
                                            details</div>
                                        <div class="text-head col-md-12 font-weight-600 small">We request for Basic info
                                            to get you started Quickly</div>
                                        <div class="mt-3 col-md-12" style="border-radius: 10px;">
                                            <img class="w-100 border" style="border-radius: 10px; height: 8rem;"
                                                src="../../../assets/mobileonboarding/onboard.png" alt="">
                                        </div>
                                    </div>
                                    <div class="col-12 col-sm-6 col-md-4 px-0">
                                        <div class="text-head col-md-12 font-weight-600 h5">Pay and Share the App with
                                            your Members</div>
                                        <div class="text-head col-md-12  font-weight-600 small">A share link will be
                                            provided for you to share to all members </div>
                                        <div class="mt-3 col-md-12" style="border-radius: 10px;">
                                            <img class="w-100 border" style="border-radius: 10px; height: 8rem;"
                                                src="../../../assets/mobileonboarding/pay-now.png" alt="">
                                        </div>
                                    </div>
                                    <div class="col-12 col-sm-6 col-md-4 px-0">
                                        <div class="text-head col-md-12  font-weight-600 h5">It’s Done! Start Posting
                                        </div>
                                        <div class="text-head col-md-12 font-weight-600 small">Create the First Post on
                                            your Application.</div>
                                        <div class="mt-3 col-md-12">
                                            <img class="w-100 border" style="border-radius: 10px; height: 8rem;"
                                                src="../../../assets/mobileonboarding/done-posting.png" alt="">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-12 d-flex justify-content-center mb-3">
                        <div class="">
                            <router-link :to="{ name: 'OnboardingProcess' }"
                                class=" d-flex  justify-content-center text-decoration-none"><el-button round
                                    color="#FF4242" size="large" class=" c-pointer ">Get Started<el-icon :size="20">
                                        <Right />
                                    </el-icon></el-button></router-link>
                        </div>
                    </div>
                </div>
            </div>

            <!-- <div class="col-md-12 " style="background: #F9FAFBE3;">
                <div class="row">
                    <div class="col-md-12   mt-3 d-md-flex justify-content-end">
                        <img class="d-none d-md-block" src="../../../assets/mobileonboarding/progressicon3.png" alt="">
                    </div>
                    <div class="col-md-6  d-flex  align-items-center col-12 "
                        :class="{ 'yourFaithbox': yourFaith, 'yourFaithbox1': !yourFaith }">
                        <div class="row d-flex  align-items-center">
                            <div class="col-md-9  text-center ">
                                <div class="h2 font-weight-600 text-head">Your Faith, Anytime, Anywhere.</div>
                                <div class="text-font">Seamlessly receive donations tithes and offerings, Stay
                                    Connected,
                                    and Grow
                                    Spiritually with Faith Connect App.</div>
                            </div>
                            <div class="col-md-9 mt-4 d-flex  justify-content-center">
                                <div></div>
                                <router-link :to="{ name: 'OnboardingProcess' }"
                                    class=" d-flex  justify-content-center text-decoration-none"><el-button round
                                        color="#120DFA" size="large" class=" c-pointer">Start now for
                                        FREE</el-button></router-link>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6 d-flex justify-content-center col-12"
                        :class="{ 'yourFaith': yourFaith, 'yourFaith2': !yourFaith }">
                        <img class=" d-none d-md-block " src="../../../assets/mobileonboarding/phone-three.png" alt="">
                    </div>
                </div>
            </div> -->
        </div>
    </div>
</template>
<script>
import { inject, ref } from 'vue'
// import router from '../../../router';
import deviceBreakpoint from "../../../mixins/deviceBreakpoint";
export default {
    setup() {
        const primarycolor = inject('primarycolor')
        const { mdAndUp, lgAndUp, xlAndUp, xsOnly } = deviceBreakpoint()
        const welcome = ref(true);
        const gateway = ref(false);
        const yourFaith = ref(false);
        const feature = ref(false);
        const next1 = () => {
            welcome.value = false;
            gateway.value = false;
            yourFaith.value = false
            feature.value = true
        }
        const next2 = () => {
            welcome.value = false;
            gateway.value = true;
            yourFaith.value = false
            feature.value = false
        }
        const next3 = () => {
            welcome.value = false;
            gateway.value = false;
            yourFaith.value = true
            feature.value = false
        }

        return {
            primarycolor,
            yourFaith,
            gateway,
            welcome,
            feature,
            next1,
            next2,
            next3,
            mdAndUp, lgAndUp, xlAndUp, xsOnly
        }
    },
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&family=Raleway:wght@100..900&family=Roboto:wght@100&display=swap');

.text-head {
    font-family: Raleway !important;
}

.text-font {
    font-family: Poppins !important;
    ;
}

.devotion {
    background-image: url('../../../assets/mobileonboarding/devotion.png');
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
}

.the-game {
    /* color: linear-gradient(90deg, #F36850 0%, #C0279C 49.01%, #2E115B 100%); */
    background-clip: text;
    /* Clip the background to the text */
    color: transparent;
    /* Hide the text color */
    background-image: linear-gradient(90deg, #F36850 0%, #C0279C 49.01%, #2E115B 100%);
    /* Apply the linear gradient */

}

.feature-gradient {
    background: linear-gradient(90deg, #F36850 0%, #C0279C 49.01%, #2E115B 100%);
    transform: rotate(-90deg);
    text-orientation: upright;
    color: rgba(255, 255, 255, 0.8);
    white-space: nowrap;
    background-clip: text;
    font-size: 90px !important;
}

.gradient {
    background: linear-gradient(180deg, #EAF8F9 50%, #FFFFFF 100%);
}

.active-tab {
    /* background: rgb(0, 106, 220); */
    background: #136ACD;
    padding: 0.6rem 2rem 1rem 1.3rem;
    color: #eee;
    font-weight: 600;
    white-space: initial;
    font-size: 1rem;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    outline: transparent !important;
    /* display: flex;
    justify-content: center;
    align-items: center; */
}

.box1 {
    /* transform: translateX(60%); */
    transition: all 0.3s ease-in-out;
}


.box2 {
    /* transform: translateX(0%); */
    width: 0 !important;
    height: 0;
    overflow: hidden;

    transition: all 0.3s ease-in-out;
}

/* .box3 {
    width: 100% !important;
} */

.box4 {
    width: 0 !important;
    height: 0;
    overflow: hidden;
}

/* .yourFaith3 {
    width: 100% !important;
} */

.yourFaith4 {
    width: 0 !important;
    height: 0;
    overflow: hidden;
}

.yourFaithbox {
    /* transform: translateX(105%); */
    transition: all 0.3s ease-in-out;
}

.yourFaithbox1 {
    /* transform: translateX(0%); */
    width: 0 !important;
    height: 0;
    overflow: hidden;
}

.GatewayText {
    /* transform: translateX(-140%); */
    width: 100% !important;
    transition: all 0.3s ease-in-out;
}

.GatewayText2 {
    /* transform: translateX(60%); */
    width: 0 !important;
    height: 0;
    overflow: hidden;
    transition: all 0.3s ease-in-out;
}

.yourFaith {
    /* transform: translateX(-95%); */
    width: 100% !important;
    transition: all 0.3s ease-in-out;
}

.yourFaith2 {
    /* transform: translateX(0%); */
    width: 0 !important;
    height: 0;
    overflow: hidden;

    transition: all 0.3s ease-in-out;
    ;
}

.welcomebox {
    /* transform: translateX(40% - 60%); */
    transition: all 0.3s ease-in-out;
    /* width: 100% !important; */
}

.welcomebox2 {
    /* transform: translateX(0); */
    width: 0 !important;
    height: 0;
    overflow: hidden;
    transition: all 0.3s ease-in-out;
}

@media screen and (min-width : 781px) {
    .box1 {
        transform: translateX(60%);
        transition: all 0.3s ease-in-out;
    }


    .box2 {
        transform: translateX(0%);
        width: 0 !important;
        height: 0;
        overflow: hidden;

        transition: all 0.3s ease-in-out;
    }

    /* .box3 {
        width: 100% !important;
    } */

    .box4 {
        width: 0 !important;
        height: 0;
        overflow: hidden;
    }

    /* .yourFaith3 {
        width: 100% !important;
    } */

    .yourFaith4 {
        width: 0 !important;
        height: 0;
        overflow: hidden;
    }

    .yourFaithbox {
        transform: translateX(105%);
        transition: all 0.3s ease-in-out;
    }

    .yourFaithbox1 {
        transform: translateX(0%);
        width: 0 !important;
        height: 0;
        overflow: hidden;
    }

    .GatewayText {
        transform: translateX(-140%);
        width: 100% !important;
        transition: all 0.3s ease-in-out;
    }

    .GatewayText2 {
        transform: translateX(60%);
        width: 0 !important;
        height: 0;
        overflow: hidden;
        transition: all 0.3s ease-in-out;
    }

    .yourFaith {
        transform: translateX(-95%);
        width: 100% !important;
        transition: all 0.3s ease-in-out;
    }

    .yourFaith2 {
        transform: translateX(0%);
        width: 0 !important;
        height: 0;
        overflow: hidden;

        transition: all 0.3s ease-in-out;
        ;
    }

    .welcomebox {
        /* transform: translateX(40% - 60%); */
        transition: all 0.3s ease-in-out;
        /* width: 100% !important; */
    }

    .welcomebox2 {
        /* transform: translateX(0); */
        width: 0 !important;
        height: 0;
        overflow: hidden;
        transition: all 0.3s ease-in-out;
    }
}
</style>