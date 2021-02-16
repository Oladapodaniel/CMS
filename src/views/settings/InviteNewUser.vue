<template>
    <div>
        <div container>
            <h1 class="mt-3 pl-3 mb-3 font-weight-bolder" style="font-size:34px">Grace Ministry Users</h1>
            <p class="pl-3" style="font-size:16px" >You can invite a new user to access your ChurchPlus account. Only give access to people you trust, since users can see your transactions and other business information.</p>
            <div class="invite-container" style="font-size:14px">
                <h4 class="font-weight-bold ml-3">Invite New User</h4>
                <!-- <h4>Bitcoin Price Index</h4>
                <div v-for="currency in info" :key="currency">
                    {{currency.description}}
                    <span class="lighten">
                       <span v-html="currency.symbol"></span>{{ currency.rate_float | currencydecimal }}
                    </span>
                    <h1 class="bg-danger text-light"> {{currency.code}}</h1>
                   

                </div>
                
                <h4>{{info}}</h4> -->
               <div class="row">
                   <div class="col-md-7 col-sm-12 border-right mt-3 pr-5" style="">
                       <div class="row mb-3">
                          <div class="col-md-4 pl-0 col-sm-12 text-md-right text-sm-left"> <label class="">Username</label> 
                            </div>  
                            <div class="col-md-8 col-sm-12"> <InputText type="text" class="form-control" v-model="value" /></div>
                        </div>
                         <div class="row mb-3">
                          <div class="col-md-4 col-sm-12  pl-0 text-md-right text-sm-left"> <span class="">Password</span> 
                            </div>  
                            <div class="col-md-8 col-sm-12 "> <Password v-model="value" class="form-control" /></div>
                        </div>
                        <div class="row mb-3">
                         <div class="col-md-4 col-sm-12  pl-0 text-md-right text-sm-left"> <span class="">Confirm Password</span> 
                            </div>  
                            <div class="col-md-8 col-sm-12 "> <Password v-model="value" class="form-control" /></div>
                        </div>
                         <div class="row mb-3">
                        
                            <div class="col-md-4 col-sm-12  pl-0 text-md-right text-sm-left"> <span class="">Email</span> 
                            </div>  
                            <div class="col-md-8 col-sm-12 "> <InputText type="text" class="form-control" v-model="value" /></div>
                        </div>
                        <div class="row mb-3">
                        
                            <div class="col-md-4 col-sm-12  pl-0 text-md-right text-sm-left"> <span class="">Secret Questions</span> 
                            </div>  
                            <div class="col-md-8 col-sm-12 "> <InputText type="text" class="form-control" v-model="value" /></div>
                        </div>
                        <div class="row mb-3">
                        
                            <div class="col-md-4 col-sm-12  pl-0 text-md-right text-sm-left"> <span class="">Secret Answers</span> 
                            </div>  
                            <div class="col-md-8 col-sm-12 "> <InputText type="text" class="form-control" v-model="value" /></div>
                        </div>
                   </div>

                   <div class="col-md-5 col-sm-12 mt-3 pl-5 pr-5">
                       <div class="row">
                            <div class="col-12">
                                <h4>Admin Permission</h4>
                            </div>

                        </div>
                        <div class="row">
                            <div class="col-12">
                                <p>Best for a business partner, family member or trusted accountant</p>
                            </div>

                        </div>
                        <div class="row">
                            <div class="col-12">
                                <table class="table border-none m-0">
                                    <tbody>
                                        <tr>
                                        <td>First timers</td>
                                        <td>Full Access</td>
                                        </tr>
                                        <tr>
                                        <td>New Converts</td>
                                        <td>Full Access</td>
                                        </tr>
                                         <tr>
                                        <td>FollowUps</td>
                                        <td>Full Access</td>
                                        </tr>
                                         <tr>
                                        <td>Center Leader</td>
                                        <td>Full Access</td>
                                        </tr>
                                         <tr>
                                        <td>Financial Account</td>
                                        <td>Full Access</td>
                                        </tr>
                                         <tr>
                                        <td>Reports</td>
                                        <td>Full Access</td>
                                        </tr>
                                    </tbody>
                                    </table>
                                  
                            </div>

                        </div>
                   </div>
               </div>

                <div class="row">
                    <div class="col-md-7 col-sm-12" style="margin-top:px">
                        <!-- Roles -->
                        <div class="ml-5 mt-0">
                            <div class="row mb-2"> 
                                <span class="col-md-3">Role</span> <div class="col-md-7"><Checkbox name="role" value="Admin" v-model="roles" /> Admin</div>
                            </div>
                            <div class="row mb-2">
                               <span class="col-md-3"></span><div class="col-md-7"><Checkbox name="role" value="BasicUser" v-model="roles" /> BasicUser</div>
                            </div>
                            <div class="row mb-2">
                               <span class="col-md-3"></span><div class="col-md-7"><Checkbox name="role" value="CanAccessFirstTimers" v-model="roles" /> CanAccessFirstTimers</div>
                            </div>
                            <div class="row mb-2">
                               <span class="col-md-3"></span><div class="col-md-7"><Checkbox name="role" value="CanAccessFollowUps" v-model="roles" /> CanAccessFollowUps</div>
                            </div>
                            <div class="row mb-2">
                               <span class="col-md-3"></span><div class="col-md-7"><Checkbox name="role" value="CenterLeader" v-model="roles" /> CenterLeader</div>
                            </div>
                            <div class="row mb-2">
                               <span class="col-md-3"></span><div class="col-md-7"><Checkbox name="role" value="FinancialAccount" v-model="roles" /> FinancialAccount</div>
                            </div>
                            <div class="row mb-2">
                               <span class="col-md-3"></span><div class="col-md-7"><Checkbox name="role" value="MobileAdmin" v-model="roles" /> MobileAdmin</div>
                            </div>
                            <div class="row mb-2">
                               <span class="col-md-3"></span><div class="col-md-7"><Checkbox name="role" value="Reports" v-model="roles" /> Reports</div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-5 m-auto">
                        <div class="row" style="margin-top:220px; padding-bottom:20px">
                        <div class=" col-md-6 w-100 button-add">
                            <button type="button" class="btn btn-outline-secondary" style="border-radius: 22px; font-size: 16px; font-weight: 600; outline: none; hover:none">Discard</button>
                           
                        </div> 
                        <div class=" col-md-6 w-100 button-add">
                           <button type="button" class="btn btn-primary saveButton" style="border-radius:22px; font-size: 16px; font-weight: 600">Save User</button>
                        </div> 
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>







<script>
import InputText from 'primevue/inputtext';
import Password from 'primevue/password';
import Checkbox from 'primevue/checkbox';
import axios from "@/gateway/backendapi";
    export default {
        components:{InputText, Password, Checkbox},
        data() {
		return {
            roles: [],
            info: null
            
		}
	} ,
    mounted(){
        axios
      .get(`/api/Settings/GetTenantPeopleClassification`)
      .then((res) => {res.data;
        console.log(res.data);
      })
      .catch((err) => console.log(err));
    // .get('https://api.coindesk.com/v1/bpi/currentprice.json')
    // .then(response => (this.info = response.data.bpi))
    // .catch(error=> console.log(error))

    }
    }
</script>

<style scoped>
.invite-container{
    width: 100%;
    margin-top: 20px;
    margin-left: 14px;
    height: 800px;

}
.new span{
    text-align: right;
}
.table{
    border-radius: 0!important;
}
.button-add button{
    width: 110px;
}
.btn-outline-secondary:hover{
    background-color: white;
    color: rgb(110, 104, 104);
}
.border-right{
    height: 430px!important;
    /* margin-right: -px!important; */
}
.invite-container{
    width: 100%;
    background: #FFFFFF 0% 0% no-repeat padding-box;
    box-shadow: 0px 15px 30px #00000029;
    border: 1px solid #DDE2E6;
    border-radius: 10px;
    opacity: 1;
    height: auto;
    padding: 10px 10px;
}
</style>