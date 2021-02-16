<template>
  <div>
    <div class="main-section">
      <div class="logo-con">
        <a class="logo-link"><img src="../../assets/churchplus-logo.png" alt="Churchplus Logo"></a>
      </div>
      <div class="header">
        <h1>Sign in</h1>
      </div>

      <div class="form-container">
        <div class="error-div" v-if="state.showError && !state.notAUser">
          <p class="error-message">{{ state.errorMessage }}</p>
        </div>

        <div class="error-div" v-if="state.notAUser">
          <p class="error-message">Not a registered user, <a href="/register" class="primary-text font-weight-bold text-decoration-none">Register now</a></p>
        </div>

        <form @submit="login">
          <div>
            <input type="email" v-model="state.credentials.userName" class="input" placeholder="Email" required/>
          </div>
          <div>
            <input class="input" v-model="state.credentials.password" type="password" placeholder="Password" required/>
          </div>
          <div class="f-password-div">
            <router-link to="/forgotpassword" class="forgot-password">Forgot it?</router-link>
          </div>

          <button class="submit-btn sign-in-btn" :class="{ 'btn-loading': loading }" >
            <i class="fas fa-circle-notch fa-spin" v-if="loading"></i>
            <span>Sign in</span>
            <span></span>
          </button>
        </form>

        <div style="margin: 24px 0">
          <span class="or">or</span>
        </div>

        <div v-if="false">
          <button type="submit" class="google-btn btn-logo sign-in-btn">
             <img src="../../assets/google.png" alt="Google Icon">
             <span>Sign up with Google</span>
             <span></span>
          </button>
        </div>
        <div>
          <button class="facebook-btn btn-logo sign-in-btn" >
            <img src="../../assets/facebook-small.png" class="fb-icon" alt="Google Icon">
             <span>Sign in with Facebook</span>
             <span></span>
          </button>
        </div>

      </div>

      <div class="bottom-container">
        <div>
          <p class="sign-up-prompt">Don't have an account yet? <a href="/register" class="sign-up"><strong>Sign up now</strong></a></p>
          <!-- <p class="sign-up-prompt">Don't have an account yet? <router-link to="/register" class="sign-up"><strong>Sign up now</strong></router-link></p> -->
        </div>
      </div>
      <a class="fb-login-button" id="fb" data-width="380px" data-size="large" scope="public_profile,email" onlogin="checkLoginState();" data-button-type="continue_with" data-layout="rounded" data-auto-logout-link="false" data-use-continue-as="false" ref="loginFacebook" style="margin-top: 10px;"></a>
    </div>
  </div>
</template>

<script>
import axios from '@/gateway/backendapi';
import { reactive, ref } from 'vue';
import store from '../../store/store'
import router from '../../router/index';
import setupService from "../../services/setup/setupservice"

export default {
    setup() {

      const state = reactive({
        passwordType: 'password',
        credentials: { },
        showError: false,
        errorMessage: "",
        notAUser: false,
      });
      const loading = ref(false)
      // NProgress.start()

      const loginFacebook = ref(null)

      const login = async (e) => {
        e.preventDefault();
        localStorage.setItem("email", state.credentials.userName)
        state.showError = false;
        state.notUser = false;
        try {
          loading.value = true;
          const res = await axios.post("/login", state.credentials)
          const { data } = res;
          console.log(data, "data");
          if (!data || !data.token) {
            router.push({
              name: "EmailSent",
              params: { email: state.credentials.userName }
            })
            return false;
          }
          setupService.setup();
          
          store.dispatch("setUserData", data);
          localStorage.setItem("token", data.token);
          console.log(data, "Church data");
          if (data.churchSize > 0) {
            router.push("/tenant")
          } else {
            router.push("/next")
          }
        } catch (err) { 
          /*eslint no-undef: "warn"*/
          console.log(err.response, "login error");
          console.log(err, "login error");
          NProgress.done();
          loading.value = false;
          
          const { status } = err.response;
          const { onboarded } = err.response.data;
          if (status && status == 400 && onboarded === false)
          {
            router.push('/onboarding');
          } else {
            if (status === 404) {
              state.notAUser = true;
            } else {
              state.errorMessage = err.response.data.message;
            }
            state.showError = true;
          }
        }
      }

      const itemSelected = (data) => {
        console.log(data);
      }

        const  loginWithFacebook = () => {
          console.log(loginFacebook.value)
            loginFacebook.value.click()
      }

    


        // const handleSdkInit = () => {
        //   FB.value = FB
        //   scope.value = scope
        // }

//       const checkLoginState = () => {
// /*eslint no-undef: "warn"*/
//               FB.getLoginStatus(function (response) {
//                   // $("#authstatus").html("<code>" + response + "</code>");
//                   // console.log(response)
//                   // fetch('https://churchplusv3coreapi.azurewebsites.net/api/People/GetMembershipSummary')
//                   //   .then(response => response.json())
//                   //   .then(data => console.log(data));
//                   // fetch('https://churchplusv3coreapi.azurewebsites.net/api/People/GetMembershipSummary', {
//                   //       method: 'post',
//                   //       files: {}
//                   //     }).then(function(res) {
//                   //       return res.json();
//                   //     }).then(function(data) {
//                   //       console.log(data)
//                   //       // ChromeSamples.log('Created Gist:', data.html_url);
//                   //     })
//                   let token = {
//                     accessToken: response.authResponse.accessToken
//                   }
//                   console.log(response.authResponse.accessToken)
//                   axios.post('https://churchplusv3coreapi.azurewebsites.net/Login/Facebook', token)
//                     .then(res => {
//                       console.log(res.data)
//                       if (res.data.isOnboarded) {
//                         localStorage.setItem("email", res.data.username)
//                         localStorage.setItem("token", res.data.token);
//                         window.location.href = "/tenant";
//                       } else {
//                         localStorage.setItem("email", res.data.username)
//                         localStorage.setItem("token", res.data.token);
//                         window.location.href = "/onboarding";
//                       }
                      
//                     })
//                       .catch(err => console.log(err))
//               });
//               // statusChangeCallback(response);
//       }

      return {
        state,
        login,
        loading,
        itemSelected,
        loginWithFacebook,
        loginFacebook,
        // checkLoginState
      };
    }
};
</script>

<style scoped>
.logo-con {
  display: flex;
  margin-top: 24px;
}

.logo-link {
  width: 100%;
  text-align: center;
}

  .header {
    text-align: center;
    margin-bottom: 41px;
    margin-top: 41px;
  }

  .header h1 {
    font-size: 30px;
  }

  .main-section {
    max-width: 400px;
    margin: auto;
    padding: 10px;
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

  .forgot-password {
    /* font-family: Averta,sans-serif; */
    font-size: 14px;
    line-height: 1.4;
    text-decoration: none;
    color: #136acd;
    font-weight: bold;
    cursor: pointer;
  }

  .input::placeholder {
    font-style: italic;
    font-weight: 600;
    color: #b2c2cd;
    letter-spacing: 1.5px;
  }

  .f-password-div {
    margin-bottom: 8px;
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
    padding: 8px 8px;
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

  
/* .input:not(:focus) {
  font-style: italic;
   color: #b2c2cd;
   letter-spacing: 1.5px;
} */

.or {
  display: flex;
  flex-direction: row;
  color: #8b9ba5;
}
.or:before, .or:after{
  content: "";
  flex: 1 1;
  border-bottom: 1px solid #8b9ba5;
  margin: auto;
}

.or:before {
  margin-right: 10px
}
.or:after {
  margin-left: 10px
}

.google-btn {
  background: #4285f4;
}

.facebook-btn {
  background: #3B5998;
}

.fb-icon {
  background: #fff;
  padding: 0.23rem .6rem;
  border-radius: 50%;
  margin: .25rem;
}

.btn-logo {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1px;
}

.bottom-container {
  text-align: center;
  color: #4d6575;
  font-size: 14px;
  line-height: 1.4;
  margin-top: 60px;
}

.sign-up {
  color: inherit;
  text-decoration: underline;
}

.error-div {
    background: #fff8f8;
    border-color: #ffe9e9;
    padding: 10px 5px;
    margin-bottom: 24px;
    border-radius: 8px;
    border: 1px solid transparent;
    border-left: 5px solid #b52626;
}

.error-message {
    color: #b52626;
    margin-bottom: 0;
}

/* ._5h0i._88va {
    background-color: #3B5998 !important;
    border: 2px solid red !important;
} */

 ._5h0i._88va {
        border: 2px solid red !important;
      }

    .fb_iframe_widget iframe {
    opacity: 0;
}

    .fb_iframe_widget {
      /* background-image: url(../../assets/facebook-small.png);
      background-repeat: no-repeat;  */
      /* background: #3B5998; */
      /* border: 2px solid #3b5998; */
      border-radius: 500px;
      position: relative;
      top: -155px;
      left: 1px;
      padding: 8px;
      width: 100%;
    }

    @media (max-width: 273px) {
      .fb_iframe_widget {
      top: -173px;
  
    }
    }

</style>
