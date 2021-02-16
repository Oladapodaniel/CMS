export default window.onload = () => {
     function facebookSdk () {
        window.fbAsyncInit = function() {
              
            FB.init({
                appId: '725655091722748',
              cookie     : true,
              xfbml      : true,
                version: 'v9.0'
            });
    
            FB.AppEvents.logPageView();
    
          };
    
          (function(d, s, id){
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) {return;}
            js = d.createElement(s); js.id = id;
            js.src = "https://connect.facebook.net/en_US/sdk.js";
            fjs.parentNode.insertBefore(js, fjs);
            }(document, 'script', 'facebook-jssdk'));
    
            const checkLoginState = () => {
    
                FB.getLoginStatus(function (response) {
                    // $("#authstatus").html("<code>" + response + "</code>");
                    // console.log(response)
                    // fetch('https://churchplusv3coreapi.azurewebsites.net/api/People/GetMembershipSummary')
                    //   .then(response => response.json())
                    //   .then(data => console.log(data));
                    // fetch('https://churchplusv3coreapi.azurewebsites.net/api/People/GetMembershipSummary', {
                    //       method: 'post',
                    //       files: {}
                    //     }).then(function(res) {
                    //       return res.json();
                    //     }).then(function(data) {
                    //       console.log(data)
                    //       // ChromeSamples.log('Created Gist:', data.html_url);
                    //     })
                    let token = {
                      accessToken: response.authResponse.accessToken
                    }
                    console.log(response.authResponse.accessToken)
                    axios.post('https://churchplusv3coreapi.azurewebsites.net/Login/Facebook', token)
                      .then(res => {
                        console.log(res.data)
                        if (res.data.isOnboarded) {
                          localStorage.setItem("email", res.data.username)
                          localStorage.setItem("token", res.data.token);
                          window.location.href = "/tenant";
                        } else {
                          localStorage.setItem("email", res.data.username)
                          localStorage.setItem("token", res.data.token);
                          window.location.href = "/onboarding";
                        }
                        
                      })
                        .catch(err => console.log(err))
                });
                // statusChangeCallback(response);
          }
            
    }
}
