import axios from "@/gateway/backendapi";
import finish from "../services/progressbar/progress";
import router from "../router/index";

const FBLogin = {
    methods: {
        facebookLogin () {
            FB.login(
              function (response) {
                let token = {
                  accessToken: response.authResponse.accessToken,
                };
                axios
                  .post("/Login/Facebook", token)
                  .then((res) => {
                    finish();
                    if (res.data.success === "Email Required") {
                      displayModal.value = true;
                      invalidEmailObj.value = res.data;
                    } else if (res.data.isOnboarded) {
                      localStorage.setItem("email", res.data.username);
                      localStorage.setItem("token", res.data.token);
                      router.push("/tenant");
                    } else {
                      localStorage.setItem("email", res.data.username);
                      localStorage.setItem("pretoken", res.data.token);
                      router.push("/onboarding");
                    }
                  })
                  .catch((err) => {
                    finish();
                    console.log(err);
                  });
              }
            );
          }
    }
}

export default FBLogin