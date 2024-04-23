<template>
  <div class="container-top" :class="{ 'container-slim': lgAndUp || xlAndUp }">
    <div class="row mt-4 justify-content-center">
      <div class="col-md-11 px-0 col-sm-12  mt-4">
        <div class="row justify-content-between ">
          <div class="col-md-5 px-0 mt-4  d-flex  align-items-center ">
            <div class="col-md-12 col-lg-11 px-0   d-none d-md-block" >
              <div class="row">
                <div class="col-md-12 d-flex justify-content-center ">
                  <img class="col-md-6" src="../../assets/home-image.png" alt="">
                </div>
                <div class="col-md-12 d-flex mt-4 justify-content-center h4 ">
                  <div class="col-md-11 col-sm-12 text-center text-head font-weight-bold">
                    {{ navigatorLang === "en-US" ? 'Elevating Your Ministry, Empowering Your Leadership!' :
                      $t('home-content.elevating') }}
                  </div>
                </div>
                <div class="col-md-12 mt-2 d-flex justify-content-center h5 ">
                  <div class="col-md-11 col-sm-12 text-center">
                    {{ navigatorLang === "en-US" ? 'Welcome to the Future of Church Management!' : $t('home-content.future')
                    }}
                  </div>
                </div>
                <div class="col-md-12 mt-4 d-flex justify-content-center">
                  <div class="col-md-11 d-flex justify-content-center col-sm-12  ">
                    <span class=""><img src="../../assets/check-icon.png" alt=""></span>
                    <span class="mt-2 ml-2">{{ navigatorLang === "en-US" ? 'Revolutionize Your Ministry' :
                      $t('home-content.revolutionize') }}</span>
                  </div>
                </div>
                <div class="col-md-12  mt-4 d-flex justify-content-center">
                  <div class="col-md-11 d-flex justify-content-center  col-sm-12 ">
                    <span class="ml-md-4 ml-lg-5 ml-sm-2"><img src="../../assets/check-icon.png" alt=""></span>
                    <span class="mt-2 ml-2 ">{{ navigatorLang === "en-US" ? 'Financial Stewardship Made Simple' :
                      $t('home-content.stewarship') }}</span>
                  </div>
                </div>
                <div class="col-md-12 mt-4 d-flex justify-content-center">
                  <div class="col-md-11 d-flex justify-content-center  ">
                    <span><img src="../../assets/check-icon.png" alt=""></span>
                    <span class="mt-2 ml-2 text-right">{{ navigatorLang === "en-US" ? 'Inspire Generosity with Ease' :
                      $t('home-content.generosity') }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-5 px-0 mt-4 d-flex justify-content-center  align-items-center">
        <!-- <div class="fp-con"> -->
      <div class="col-md-12 col-sm-10 col-11 p-md-4 p-lg-4" style="background: #EBEDFF; border-radius: 10px;">
      <div class="logo-con mt-2">
        <a class="logo-link"><img src="../../assets/churchplusblueLogo.png" alt="Churchplus Logo" /></a>
      </div>
      <div class="fp-header text-head mt-4">
        <h2>{{ navigatorLang === "en-US" ? "Forgot Password?" : $t('forgot-passwordContent.forgotPassword') }}</h2>
      </div>
      <div class="fp-form-con">
        <div class="fp-desc">
          <p class="fp-desc-text"> {{ navigatorLang === "en-US" ? "Enter your primary email and we'll send you instructions on how to reset your password." : $t('forgot-passwordContent.enterPrimaryEmail') }}</p>
        </div>
        <el-form :model="credentials" class="mt-3" @keyup.enter="resetPassword">
          <el-form-item>
            <div class="">{{ navigatorLang === "en-US" ? "Email" : $t('forgot-passwordContent.label.email') }}</div>
            <el-input type="email" placeholder="Email" v-model="credentials.email" :prefix-icon="Message" />
          </el-form-item>
          <el-form-item>
            <el-button size="large" :color="primarycolor" @click="resetPassword" class="w-100 " :loading="loading" round>
              {{ navigatorLang === "en-US" ? "Send Reset Instructions" : $t('forgot-passwordContent.sendReset') }}
            </el-button>
          </el-form-item>
            <div class="row justify-content-center mt-4">
              <div class="col-md-12 pb-5 pt-3 d-flex justify-content-center">
                {{ navigatorLang === "en-US" ? "You Remember your Password?" : $t('forgot-passwordContent.rememberPassword') }}
                <router-link to="/" class="text-dark font-weight-bold"><span class="">{{ navigatorLang ===
                      "en-US" ? "Sign in" : $t('signupContent.signin-text') }}</span></router-link>
              </div>
            </div>
        </el-form>

        <!-- <form action="" @submit.prevent="resetPassword">
          <div>
            <input class="input" v-model="credentials.email" type="email" placeholder="Email" required />
          </div>


          <button class="submit-btn sign-in-btn mt-2">Send Reset Instructions</button>
        </form> -->
      </div>
    </div>
      </div>
        </div>
      </div>
  
      
    </div>
  </div>
</template>

<script>
import authService from "@/services/auth/authservice"
import { reactive, watch, ref, inject } from "vue";
import deviceBreakpoint from "../../mixins/deviceBreakpoint";
import { Message } from '@element-plus/icons-vue'
import { useI18n } from 'vue-i18n';
import { SUPPORT_LOCALES as supportLocales, setI18nLanguage } from '../../i18n';

export default {
  setup() {
    const { mdAndUp, lgAndUp, xlAndUp, xsOnly } = deviceBreakpoint()
    const primarycolor = inject("primarycolor");
    const navigatorLang = ref(navigator.language);


    const { locale } = useI18n({ useScope: 'global' });
    watch(locale, (val) => {
      setI18nLanguage(val);

    });

    return {
      primarycolor,
      navigatorLang,
      mdAndUp, lgAndUp, xlAndUp, xsOnly
    }
  },
  data() {
    return {
      credentials: {},
      Message,
      loading: false,
    }
  },

  methods: {
    resetPassword(e) {
      e.preventDefault()
      authService.forgotPassword(this.credentials.email)
        .then(res => {
          console.log(res.id);
          this.loading = true
          this.$router.push({
            name: "EmailSent",
            params: { email: this.credentials.email }
          })
        })
        .catch(err => {
          console.log(err);
          if (err.response.status) {
            this.loading = false
            this.$router.push({
              name: "EmailSent",
              params: { email: this.credentials.email }
            })
          }
        })
    }
  },
};
</script>

<style scoped>
.logo-con {
  display: flex;
  /* margin-bottom: 24px; */
}

.logo-link {
  width: 100%;
  /* text-align: center; */
}
.logo-link img {
  width: 8rem;
  height: 5rem;
}

.fp-header {
  /* text-align: center; */
  font-size: 32px;
  font-weight: 500;
  color: #1D2939;
}

/* .fp-con {
  padding: 30px 0;
} */

.fp-form-con {
  width: 100%;
  /* max-width: 400px; */
  /* margin: auto; */
  /* padding: 0 10px; */

}



.input {
  /* font-family: Averta,sans-serif; */
  color: #1c252c;
  font-weight: normal;
  width: 100%;
  box-sizing: border-box;
  border-radius: 4px;
  padding: 8px 10px 6px;
  min-height: 40px;
  appearance: none;
  outline: none;
  vertical-align: middle;
  transition: border .1s linear;
  border: 1px solid #b2c2cd;
  margin: 4px 0;
}

.input::placeholder {
  font-style: italic;
  color: #b2c2cd;
  letter-spacing: 1.5px;
}

.submit-btn {
  background: #136acd;
  outline: none;
}

.submit-btn:hover {
  cursor: pointer;
}

.sign-in-btn {
  color: #fff;
  border: 1px solid transparent;
  margin-top: 8px;
  width: 100%;
  padding: 8px 20px;
  box-sizing: border-box;
  text-align: center;
  min-width: 100px;
  border-radius: 500px;
  vertical-align: middle;
  text-decoration: none;
  appearance: none;
  font-weight: 400;
  font-size: 16px;
  outline: none;
}

.input:focus {
  box-shadow: 0 0 0 3px rgba(19, 106, 205, 0.2);
}

.fp-desc {
  /* text-align: center; */
  color: #142129;
}

/* @media screen and (min-width: 1300px) {
  .fp-form-con {
    max-width: 500px;
  }
} */
</style>