<template>
  <div class="">
    <!-- write up part -->
    <div class="row justify-content-center">
      <div class="col-md-6  mt-5">
        <div class="row">
          <div class="col-12 h2 font-weight-bold text-head  text-center">Video Integration</div>
          <div class="col-12 mt-1 text-font text-center">Set up video feeds for your Mobile App</div>
        </div>
        <div class="row mt-2" v-for="(socialMedia, index) in handles" :key="index">
          <div class="col-md-12">
            <img v-if="socialMedia.name === 'youtube channel ID'" src="../../../assets/mobileonboarding/youtube.svg"
              alt="youtube channel id" />
            <span class="text-font ml-2 mt-2" v-if="socialMedia.name === 'youtube channel ID'">Youtube Channel ID</span>
          </div>
          <div v-if="socialMedia.name === 'youtube channel ID'" class="col-12 mt-1">
            <el-input v-if="socialMedia.name === 'youtube channel ID'" type="text"
              placeholder="Enter your Youtube channel id" v-model="socialMedia.url" class="w-100  outline-none " />
          </div>
        </div>
        <div class="row mt-4">
          <div class="col-12 h2 mt-4 font-weight-bold text-head  text-center">Social Media Handles</div>
          <div class="col-12  text-font text-center">Add your social media handles that you want to make social post
            with.</div>
        </div>

        <div class="row mt-3" v-for="(socialMedia, index) in handles" :key="index">
          <div class="col-12 mt-2 ">
            <img v-if="socialMedia.name === 'facebook handle'" src="../../../assets/social/facebook.svg" alt="facebook" />
            <span class="text-font mt-3 ml-2" v-if="socialMedia.name === 'facebook handle'">Facebook Page</span>
            <img v-if="socialMedia.name === 'twitter handle'" src="../../../assets/social/twitter.svg" alt="twitter" />
            <span class="text-font  ml-2" v-if="socialMedia.name === 'twitter handle'">X Page</span>
            <img v-if="socialMedia.name === 'instagram handle'" src="../../../assets/social/instagram.svg"
              alt="instagram" />
            <span class="text-font  ml-2 " v-if="socialMedia.name === 'instagram handle'">Instagram Page</span>
            <!-- <img
              v-if="socialMedia.name === 'youtube handle'"
              src="../../../assets/mobileonboarding/youtube.svg"
              alt="youtube"
            /> -->

          </div>
          <div class="col-md-12 mt-1 font-italic ">
            <el-input v-if="socialMedia.name != 'youtube channel ID' && socialMedia.name != 'youtube handle'" type="text"
              :placeholder="`Enter your ${socialMedia.name.split(' ')[0]} page url`" v-model="socialMedia.url"
              class="w-100   outline-none " />
          </div>
        </div>
        <div class="row">
          <div class="col-md-12 text-center ml-2  ">
            <span class="text-font">NB:</span>
            <span class="text-font "> Media from your youtube channel will be displayed on the mobile app, ensure to paste
              your
              Channel ID before proceeding.</span>
          </div>
        </div>
        <div class="row">
          <div class="col-md-12 ml-2 mt-4" @click="saveSocialMedia">
            <el-button size="large" round class="text-white w-100 primary-bg">Save and continue</el-button>
          </div>
        </div>
      </div>
      <div @click="skip" class=" my-3 mb-5  text-center col-md-12">
        Skip for now
      </div>

      <!-- image part -->
      <!-- <div class="col-md-6 col-12 bg-image d-none d-md-block">
        <div class="row mt-3">
          <div class="col-md-12 text-center my-5 step">STEP 2 of 4</div>
          <div class="col-12 text-right text-white skip-text py-3 pr-5" @click="skip">Skip  >>></div>
        </div>
        <div></div>
      </div> -->
    </div>
  </div>
  <Toast />
  <div></div>
</template>

<script>
import axios from "@/gateway/backendapi";
// import store from '../../../store/store'
import { useToast } from "primevue/usetoast";
import stopProgressBar from "../../../services/progressbar/progress";
import { ref } from "vue";

export default {
  setup(props, context) {
    const handles = ref([
      { name: "facebook handle", image: "../../../assets/social/facebook.svg" },
      { name: "twitter handle", image: "../../../assets/social/twitter.svg" },
      { name: "instagram handle", image: "../../../assets/social/instagram.svg" },
      { name: "youtube handle", image: "../../../assets/mobileonboarding/youtube.svg" },
      { name: "youtube channel ID", image: "../../../assets/mobileonboarding/youtube.svg" },
    ]);
    let toast = useToast();

    const saveSocialMedia = () => {

      const filtered = handles.value.filter(i => i.url)
      console.log(filtered)
      const body = {
        socialMediaList: filtered.map((i) => {
          if (i.socialMediaId) return {
            name: i.name,
            url: i.url,
            socialMediaId: i.socialMediaId
          };
          return {
            name: i.name,
            url: i.url,
          }
        }),
      };
      axios
        .put(`/mobile/v1/Profile/UpdateSocialMedia`, body)
        .then((res) => {
          // if(res){
          toast.add({
            severity: "success",
            summary: "Update is Successful",
            detail: "Social Media Handles successfully Updated",
            life: 3000,
          });
          let changeState = {
            tab: true,
            churchSetup: false,
            socialMedia: false,
            appBranding: true,
            donationForm: false,
            subscription: false
          }
          context.emit('saved-socialmedia', changeState)

          // }

          console.log(res.data, changeState);
        })
        .catch((err) => {
          stopProgressBar();
          //  toast.add({
          //   severity: "error",
          //   summary: "Social Media Handles",
          //   detail: "Already Exist",
          //   life: 3000,
          // });
          console.log(err);
        });


    };

    const getSocialMediaDetails = () => {
      axios
        .get(`/mobile/v1/Profile/GetChurchProfile`)
        .then((res) => {
          console.log(res, "🎆🎆");
          for (let i of res.data.returnObject.churchSocialMedia) {
            const index = handles.value.findIndex(j => j.name === i.name);
            if (index >= 0) {
              handles.value[index] = i;
            }
          }
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getSocialMediaDetails()

    const skip = () => {
      let urlArray = handles.value.map(i => {
        return {
          url: i.url
        }
      })

      if (urlArray.length > 0) {
        let changeState = {
          tab: true,
          churchSetup: false,
          socialMedia: false,
          appBranding: true,
          donationForm: false,
          subscription: false
        }
        context.emit('saved-socialmedia', changeState)
      } else {
        let changeState = {
          // tab: true,
          churchSetup: false,
          socialMedia: false,
          appBranding: true,
          donationForm: false
        }
        context.emit('saved-socialmedia', changeState)
      }
    }
    return {
      saveSocialMedia,
      handles,
      skip
    };
  },
};
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
  ;
}

.backgroundImage {
  background-image: url("../../../assets/mobileonboarding/socialimage.svg");
  background-repeat: no-repeat, repeat;
  background-size: cover;
  background-color: #cccccc;
  height: 100vh;
  width: 100%;
}

.appHeading1 {
  font: normal normal 800 20px/60px Nunito Sans;
  letter-spacing: 0px;
  color: #031c39;
  opacity: 1;
}

#primaryColour {
  width: 76px;
  height: 34px;
  background: #136acd;
  border-radius: 5px;
  opacity: 1;
}

#secondaryColour {
  width: 76px;
  height: 34px;
  background: #ff5d00 0% 0% no-repeat padding-box;
  border-radius: 5px;
  opacity: 1;
}

#TestColour {
  width: 76px;
  height: 34px;
  background: #fd0604 0% 0% no-repeat padding-box;
  border-radius: 5px;
  opacity: 1;
}

hr {
  width: 523px;
  height: 0px;
  margin: auto;
}

/* #logoBox {
  background: #ffffff 0% 0% no-repeat padding-box;
  border: 1px solid #dde2e6;
  border-radius: 5px;
  opacity: 1;
  width: 437px;
  height: 40px;
} */

.colourText {
  text-align: left;
  font: normal normal bold 18px/24px Nunito Sans;
  letter-spacing: 0px;
  color: #020e1c;
  opacity: 1;
}

.appBranding {
  text-align: left;
  font: normal normal 800 44px/60px Nunito Sans;
  letter-spacing: 0px;
  color: #031c39;
  opacity: 1;
}

.primaryColour {
  text-align: left;
  font: normal normal bold 18px/24px Nunito Sans;
  letter-spacing: 0px;
  color: #020e1c;
  opacity: 1;
}

.logo {
  text-align: left;
  font: normal normal bold 24px/32px Nunito Sans;
  letter-spacing: 0px;
  color: #020e1c;
  opacity: 1;
}

.button1 {
  background: #f1faff 0% 0% no-repeat padding-box;
  border: 0.20000000298023224px solid #7894a6;
  border-radius: 23px;
  opacity: 1;
  width: 180px;
  height: 46px;
  color: #136acd;
}

.button2 {
  text-align: center;
  height: 0;
  position: absolute;
  top: 80%;
  right: 40%;
}

.dash {
  width: 41px;
  height: 4px;
  background: #136acd 0% 0% no-repeat padding-box;
  border-radius: 11px;
  opacity: 1;
}

.dash1 {
  width: 41px;
  height: 4px;
  background: #f7f8fa 0% 0% no-repeat padding-box;
  border-radius: 11px;
  opacity: 1;
}

.smallButton {
  background: #f1faff 0% 0% no-repeat padding-box;
  border: 0.20000000298023224px solid #7894a6;
  border-radius: 23px;
  opacity: 1;
  width: 180px;
  height: 46px;
}

.image-dis {
  display: flex;
  justify-content: center;
  align-items: center;
}

.bg-image {
  background-image: url(../../../assets/mobileonboarding/socialimage.svg);
  background-size: cover;
}

.step {
  font: normal normal bold 18px/24px Nunito Sans;
  letter-spacing: 0px;
  color: #ffffff;
  opacity: 1;
}

.skip-text {
  background: rgba(0, 0, 0, 0.707);
  ;
  position: fixed;
  top: 32em;
  width: 20%
}

/* WebKit, Edge */
::-webkit-input-placeholder {
  color: rgba(184, 184, 184, 0.866);
  font-size: 0.8em;
  font-style: italic;
}

/* Firefox 4-18 */
:-moz-placeholder {
  color: rgba(184, 184, 184, 0.866);
  font-size: 0.8em;
  font-style: italic;
  opacity: 1;
}

/* Firefox 19+ */
::-moz-placeholder {
  color: rgba(203, 203, 203, 0.866);
  font-size: 0.8em;
  font-style: italic;
  opacity: 1;
}

/* IE 10-11 */
:-ms-input-placeholder {
  color: rgba(184, 184, 184, 0.866);
  font-size: 0.8em;
  font-style: italic;
}

/* Edge */
::-ms-input-placeholder {
  color: rgba(184, 184, 184, 0.866);
  font-size: 0.8em;
  font-style: italic;
  ;
}

/* MODERN BROWSER */
::placeholder {
  color: rgba(184, 184, 184, 0.866);
  font-size: 0.8em;
  font-style: italic;
  font-size: 0.8em;
  font-style: italic;
}
</style>