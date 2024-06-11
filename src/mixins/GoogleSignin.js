import firebase from "@/services/firebase/firebase.js";
import axios from "@/gateway/backendapi";


const GoogleSignIn = () => {

    const handleGoogleLogin = (path, data) => {
        // Create an instance of the Google provider object:
        var provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth()
            .signInWithPopup(provider)
            .then((result) => {
                /** @type {firebase.auth.OAuthCredential} */
                var credential = result.credential;

                // This gives you a Google Access Token. You can use it to
                // access the Google API.
                var token = credential.accessToken;
                // The signed-in user info, it will give you all basic info 
                // of logged-in user
                var user = result.user;
                GoogleAuthSuccess({ credential, user, token })

            }).catch((error) => {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                // The email of the user's account used.
                var email = error.email;
                // The firebase.auth.AuthCredential type that was used.
                var credential = error.credential;

            });
    }

    const GoogleAuthSuccess = ({ credential, user, token }) => {
        let payload = {
            accessToken: token,
        };

        axios
            .post("/Login/Facebook", payload)
            .then((res) => {
                console.log(res.data)
                // if (res.data.success === "Email Required") {
                //     displayModal.value = true;
                //     invalidEmailObj.value = res.data;
                // } else if (res.data.isOnboarded) {
                //     localStorage.setItem("email", res.data.username);
                //     localStorage.setItem("token", res.data.token);
                //     router.push("/tenant");
                // } else {
                //     localStorage.setItem("email", res.data.username);
                //     localStorage.setItem("pretoken", res.data.token);
                //     router.push("/onboarding");
                // }
            })
            .catch((err) => {
                console.log(err);
            });
    }

    return {
        handleGoogleLogin
    }
}

export default GoogleSignIn;