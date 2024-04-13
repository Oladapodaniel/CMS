<template>
  <div class="container-top" :class="{ 'container-slim': lgAndUp || xlAndUp }">
    <div class="container-fluid  py-5 bg-image">
      <div class="row">
        <div class="col-md-12 ">
          <div class="row">
            <div class="col-md-5   mt-4">
              <!-- <div class="col-md-11 "> -->
              <div class="row justify-content-md-end justify-content-center">
                <div class="col-md-9 col-sm-7 px-0 col-8" style="z-index: 9999;"><img class="w-100"
                    src="../../../assets/mobileonboarding/onboard-phone.png" alt=""></div>
              </div>
              <!-- </div> -->
            </div>
            <div class="col-md-7 pl-0 pr-5 mt-2  ">
              <div class="row align-items-center justify-content-center h-100">
                <div class="col-md-12  pl-5  bg-white" style="border-radius: 0 20px 20px 0">
                  <div class="row">
                    <!-- <div class="col-md-12 h1 mt-4 text-head font-weight-600">Welldone! <br>
                      Your app is ready</div> -->
                    <div class="col-md-12 text-head h2 font-weight-bold gradient mt-3">Good Job,
                      Your Church
                      App is Ready!
                    </div>
                    <div class="font-weight-600 mt-2 h5 col-md-12 text-head">
                      Here are your next steps
                    </div>
                    <div class="col-md-12 mt-1  d-flex flex-wrap  ">
                      <div class="col-md-8 px-0 d-flex ">
                        <div>
                          <div class=" mr-1 d-flex align-items-center justify-content-center  text-white"
                            style="width: 30px;  height: 30px; border-radius: 50%; background-color: #535960;">1
                          </div>
                        </div>
                        <div class=" mt-1 text-font" >Copy & Share
                          Download Link </div>
                      </div>
                      <div class="col-md-11 col-10 px-0 mt-2 mt-sm-0 ">
                        <div class="row mt-2">
                          <div class="col-md-6   d-flex">
                            <div class="col-md-5 col-5 px-0  ">
                              <img class="w-100" src="../../../assets/mobileonboarding/small-google-store.png" alt="">
                            </div>
                            <div class="col-md-5 px-0  d-flex align-items-center "  @click="copyLink">
                              <el-button round class="   small p-0   c-pointer"><span  class="small font-weight-600">Copylink</span> </el-button>
                            </div>
                          </div>
                          <div class="col-md-6  d-flex ">
                             <div class="col-md-5 col-5 px-0 mt-2 mt-md-0">
                              <img class="w-100" src="../../../assets/mobileonboarding/small-apple-store.png" alt="">
                            </div>
                            <div class="col-md-5 px-0 d-flex align-items-center"  @click="copyLink2">
                              <el-button round class=" small p-0  c-pointer"><span  class="small font-weight-600">Copylink</span> </el-button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="col-md-8 mt-3 d-flex ">
                      <div class="">
                        <div class=" d-flex align-items-center justify-content-center  text-center  text-white"
                          style="width: 30px; height: 30px; border-radius: 50%;  background-color: #535960;">2</div>
                      </div>
                      <div class="text-font ml-1 ">
                        Click on the button below to make a post
                      </div>
                    </div>
                    <div class="col-md-8   mt-3 mb-2" @click="post">
                      <div class="row justify-content-center text-center">
                        <div class="col-md-11">
                          <el-button round size="large" class=" w-100 primary-bg text-white c-pointer ">Create First
                            post</el-button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- <div class="wave">
    <div class="container">
      <div class="row containerheight">
        <div class="col-lg-6 col-sm-12">
          <div class="col">
         
            <div class="row mt-5">
              <div class="col-lg-12 text-sm-center text-lg-left fss align-text-main">
                <h2 class="font-weight-bold mainheader">Welldone! Your app is ready</h2>
              </div>
            </div>
          
            <div class="row mt-3 align-text">
              <div class="col-lg-12">
                <h5 class="text-wrap h6 line-height">
                  Congrats, you have successfully set up your Churchplus App. <br />
                  <span>But what  should i really do next?</span> <span class="d-none d-lg-inline">👉👉👉</span><span class="d-inline d-lg-none">👇👇👇</span>
                </h5>
              </div>
            </div>
         
            <div class="row mt-5">
              <div class="col-12">
            <div class="image">
              <img
                class="w-100 "
                src="../../../assets/mobileonboarding/phone1.png"
                alt="phone image"
              />
            </div>
          </div>
              
            </div>
            </div>
          </div>
        

        <div class="col-lg-6 col-sm-12">
          <div class="row mt-5">
            <div class="col-12 subheader">
                Here are your next steps 😎
              </div>
              <div class="col-12">
            <div class="row">
              <div class="col-1 mt-3  number-text">1.</div>
              <div class="col-9 mt-4">
                <h5 class="text-wrap h6"> Start Sharing with members of your church</h5>
                <div class="mt-2">
                  <textarea type="text" ref="link" value="https://play.google.com/store/apps/details?id=com.churchplus.app.genericapp" class="border-0 w-100 ctatext link-area" rows="2" style="background: transparent" :disabled="false"></textarea>
                </div>
                <div class="px-0 cta text-center" @click="copyLink">
                <button class="btn default-btn c-pointer ml-md-3">Copy Link</button>
              </div>
              </div>
              
              
            </div>
            <div class="row push-down">
              <div class="col-1 number-text">2.</div>
              <div class="col-9 mt-1 bring-forward line-height">
                Click on the button below to make a post to your mobile app and your social media page for you to get your members engaged with events and activities going on in your church.
                <div class="col-12  px-0 text-center mt-2 bring-forward" @click="post">
                <button class="btn default-btn bg-primary border-0 text-white c-pointer ml-md-3">Post Now</button>
              </div>
              </div>
            </div>

          </div>
          

            
          </div>
          

          
        </div>
      </div>
      <div class="row">
        <div class="custom-shape-divider-bottom-1620296099">
          <svg
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
              class="shape-fill"
            ></path>
          </svg>
        </div>
      </div>
    </div>
    </div>



  <div class="container mt-5 footer-area">
    <div class="row">
      <div class="col-12 text-center mt-5 mb-4">
      </div>
    </div>
  </div> -->

  <Toast />
</template>

<script>
import { ref } from 'vue'
import { useToast } from "primevue/usetoast";
import router from '../../../router';
import deviceBreakpoint from "../../../mixins/deviceBreakpoint";
import { ElMessage, ElMessageBox } from "element-plus";
export default {
  setup() {

    const link = ref("https://play.google.com/store/apps/details?id=com.faithconnect")
    const link2 = ref("https://apps.apple.com/us/developer/peter-ihesie/id971087368")
    const toast = useToast()
    const { mdAndUp, lgAndUp, xlAndUp, xsOnly } = deviceBreakpoint()

    const copyLink = () => {
      const textarea = document.createElement("textarea");
      textarea.value = link.value;

      document.body.appendChild(textarea);

      textarea.select();
      textarea.setSelectionRange(0, 99999);

      document.execCommand("copy");
      document.body.removeChild(textarea)

      ElMessage({
        showClose: true,
        message: "Copied to clipboard",
        type: "success",
      });
    }
    const copyLink2 = () => {
      const textarea = document.createElement("textarea");
      textarea.value = link2.value;

      document.body.appendChild(textarea);

      textarea.select();
      textarea.setSelectionRange(0, 99999);

      document.execCommand("copy");
      document.body.removeChild(textarea)

      ElMessage({
        showClose: true,
        message: "Copied to clipboard",
        type: "success",
      });
    }
    const post = () => {
      router.push({ name: 'SocialPost' })
    }
    return {
      copyLink,
      copyLink2,
      link,
      link2,
      post,
      mdAndUp, lgAndUp, xlAndUp, xsOnly
    }
  },
}
</script>



<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&family=Raleway:wght@100..900&family=Roboto:wght@100&display=swap');

/* * {
    font-family: Poppins;
} */

.text-head {
  font-family: Raleway !important;
}

.text-font {
  font-family: Poppins !important;
}

.gradient {
  /* color: linear-gradient(90deg, #F36850 0%, #C0279C 49.01%, #2E115B 100%); */
  background-clip: text;
  /* Clip the background to the text */
  color: transparent;
  /* Hide the text color */
  background-image: linear-gradient(90deg, #F36850 0%, #C0279C 49.01%, #2E115B 100%);
  /* Apply the linear gradient */

}

.bg-image {
  background-image: url('../../../assets/mobileonboarding/onboard-image-bg.png');
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  border-radius: 15px;
}


.copyright {
  color: #020e1c9f;
  font: normal normal 800 18px/36px Nunito Sans;
}

.containerheight {
  height: 100vh;
}

.mainheader {
  font: normal normal 800 55px/64px Nunito Sans;
  font-family: Nunito Sans;
  color: #020e1c9f;
}

.subheader {
  font: normal normal bold 25px Nunito Sans;
  font-family: Nunito Sans;
  color: #020e1c9f;
  /* margin-top: 80px; */
}

.ctatext {
  font: normal normal bold 18px/27px Nunito Sans;
  font-family: Nunito Sans;
  color: #020e1ca1;
  overflow: hidden;
}

.cta {
  color: #2e67ce;
  /* background-color: #f1faff; */
  border: none;
  outline: none;
}

.image {
  position: relative;
  z-index: 1;
}

.custom-shape-divider-bottom-1620296099 {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  overflow: hidden;
  line-height: 0;
}

.custom-shape-divider-bottom-1620296099 svg {
  position: relative;
  display: block;
  width: calc(161% + 1.3px);
  height: 160px;
  transform: rotateY(180deg);
}

.custom-shape-divider-bottom-1620296099 .shape-fill {
  fill: #fff;
}

@media only screen and (max-width: 360px) {
  .fss {
    margin-top: 1.5rem;
  }

  .mainheader {
    font: normal normal 500 30px/30px Nunito Sans;
    font-family: Nunito Sans;
    color: #020e1c9f;
  }

  .align-text {
    text-align: center;
  }

  .align-text-main {
    text-align: center;
    font-weight: normal;
  }

  .footer-area {
    height: 100vh;
  }

  .show-on-small-screen {
    position: relative;
    z-index: 1;
  }
}

.custom-shape-divider-bottom-1620296099 .shape-fill {
  fill: #fff;
}

@media only screen and (max-width: 576px) {
  .fss {
    margin-top: 3rem;
  }

  .mainheader {
    font: normal normal 500 30px/30px Nunito Sans;
    font-family: Nunito Sans;
    color: #020e1c9f;
  }

  .align-text-main {
    /* text-align: center; */
    font-weight: normal;
  }

  .footer-area {
    height: 100vh;
  }
}

@media only screen and (max-width: 992px) {
  .fss {
    margin-top: 3rem;
  }

  .mainheader {
    font: normal normal 500 30px/30px Nunito Sans;
    font-family: Nunito Sans;
    color: #020e1c9f;
  }

  .align-text {
    text-align: center;
    z-index: 1;
    position: relative;
  }

  .align-text-main {
    text-align: center;
    font-weight: normal;
  }

  .footer-area {
    height: 100vh;
    position: fixed;
  }
}

.link-area:focus {
  border: none;
  outline: none
}

.bring-front {
  z-index: 1;
  margin-top: 56px;
}

.bring-front h5 {
  font-size: 19px;
  font-weight: 700
}

.bring-forward {
  z-index: 1;
}

.number-text {
  font-size: 32px;
}

.line-height {
  line-height: 28px;
}

@media (min-width: 996px) {
  .push-down {
    margin-top: 60px
  }
}

.wave {
  position: relative;
  background: linear-gradient(45deg, #ffffff, transparent);
  height: 80vh;
  width: 83vw;
}
</style>
