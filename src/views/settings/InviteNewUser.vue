
<template>
    <div>
        <div container>
            <h1 class="mt-3 pl-3 mb-3 font-weight-bolder" style="font-size:34px">{{currentUser ? currentUser.churchName : '' }}</h1>
            <p class="pl-3" style="font-size:16px" >You can invite a new user to access your ChurchPlus account. Only give access to people you trust, since users can see your transactions and other business information.</p>
            <div class="invite-container" style="font-size:14px">
                <h4 class="font-weight-bold ml-0 ml-md-3 ml-sm-0">{{ $route.query.email ? 'Edit New User' : inviteNew}}</h4>
                <!-- <h4 class="font-weight-bold ml-0 ml-md-3 ml-sm-0">{{editContent}}</h4> -->
                <!-- <h4>Bitcoin Price Index</h4>
                <div v-for="currency in info" :key="currency">
                    {{currency.description}}
                    <span class="lighten">
                       <span v-html="currency.symbol"></span>{{ currency.rate_float | currencydecimal }}
                    </span>
                    <h1 class="bg-danger text-light"> {{currency.code}}</h1>


                </div>

                <h4>{{info}}</h4> -->
                <Toast />
               <div class="row">
                   <div class="col-lg-7 col-sm-12 pr-3 mt-3 mt-lg-3 pr-lg-5 pr-sm-3" style="">
                       <div class="row mb-3">
                          <div class="col-lg-4 col-sm-12 text-lg-right text-sm-left"> <label class="">Username</label>
                            </div>
                            <div class="col-lg-8 col-sm-12"> <InputText type="text" required v-model="mail" class="form-control" /></div>
                        </div>
                        <!-- <div class="row mb-3 mt-5">

                            <div class="col-lg-4 col-sm-12 text-lg-right text-sm-left"> <span class="">Email</span>
                            </div>
                            <div class="col-lg-8 col-sm-12 "> <InputText type="text" :disabled="disabled" required v-model="mail" class="form-control"/></div>
                        </div> -->
                        <div class="row mb-3 mt-5">
                          <div class="col-lg-4 col-sm-12 text-lg-right text-sm-left"> <span class="">Phone Number</span>
                            </div>
                            <div class="col-lg-8 col-sm-12 "> <InputText type="number"    class="form-control" required v-model="phoneNumber"  /></div>
                            <!-- <div class="col-lg-8 col-sm-12 "> <input type="number"    class="form-control" required v-model="phoneNumber"  /></div> -->
                        </div>
                         <div class="row mb-3 mt-5" v-if="!disabled">
                          <div class="col-lg-4 col-sm-12 text-lg-right text-sm-left"> <span class="">Password</span>
                            </div>
                            <!-- <div class="col-lg-8 col-sm-12 "> <Password class="form-control" :disabled="disabled" required v-model="password1"  /></div> -->
                            <div class="col-lg-8 col-sm-12 "> <input type="password"  autocomplete="new-password"  :disabled="disabled"  class="form-control" required v-model="password1"  /></div>
                        </div>
                        <div class="row mt-5" v-if="!disabled">
                         <div class="col-lg-4 col-sm-12 text-lg-right text-sm-left"> <span class="">Confirm Password</span>
                            </div>
                            <div class="col-lg-8 col-sm-12 "> <input type="password" class="form-control" autocomplete="new-password" :disabled="disabled" v-model="password2" required /></div>
                        </div>
                        <div class="row">
                    <div class="col-sm-12 mt-4">
                        <div class="ml-5 mt-2 mt-lg-0">
                             <span class="col-lg-1 mb-lg-0 mb-3 font-weight-bold">Roles</span> 
                            <div class="col-12 mt-2" v-for="(item, index) in roles" :key="index">
                            <Checkbox
                                v-model="selectedRole"
                                :value="item"
                                />
                            {{ item }}
                            </div>
                        </div>
                    </div>
                    <div class=" col-12 text-center p-5"  v-if="loading">
                    <i class="pi pi-spin pi-spinner text-center text-primary" style="fontSize: 3rem"></i>
                    </div>
                </div>

                        <!-- <div class="row mb-3">

                            <div class="col-lg-4 col-sm-12 text-lg-right text-sm-left"> <span class="">Secret Questions</span>
                            </div>
                            <div class="col-lg-8 col-sm-12 "> <InputText type="text" class="form-control"/></div>
                        </div> -->
                        <!-- <div class="row mb-3">

                            <div class="col-lg-4 col-sm-12 text-lg-right text-sm-left"> <span class="">Secret Answers</span>
                            </div>
                            <div class="col-lg-8 col-sm-12"> <InputText type="text" class="form-control" /></div>
                        </div> -->
                   </div>

                   <div class="col-lg-5 col-sm-12 mt-lg-0 mt-sm-5 mt-md-5 mt-lg-0 mt-5 pl-lg-5 pr-lg-5 pl-sm-3 pr-3 pr-sm-2">
                       <div class="row">
                            <div class="col-12">
                                <h4 class="adminPermission">Admin Permission</h4>
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
                                        <tr v-for="(item, index) in roles" :key="index">
                                        <td>{{ item }}</td>
                                        <td :class ="{ 'text-success' : selectedRole.find(i => i == item) || selectedRole.some(i => i.toLowerCase() == 'admin') }">
                                             {{ selectedRole.find(i => i == item) || selectedRole.some(i => i.toLowerCase() == "admin") ? "Full Access" : "No Access"}}
                                        </td>
                                        </tr>
                                    </tbody>
                                    </table>

                            </div>

                        </div>
                   </div>
               </div>
                <div class="row mb-lg-5">
                    <div class="col-lg-7">
                    </div>
                    <div class="col-lg-5 col-md-12 col-sm-12 d-flex justify-content-around mt-3">
                        <router-link to="/tenant/settings"> <button type="button" class="btn px-3 btn-outline-secondary mr-3" style="border-radius: 22px; font-size: 16px; font-weight: 600; outline: none; hover:none">Discard</button></router-link>
                        <button type="button" class="btn px-3 primary-bg saveButton ml-3 text-white" style="border-radius:22px; font-size: 16px; font-weight: 600" @click="callButton">Save User</button>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>


<script>
import InputText from 'primevue/inputtext';
// import ProgressSpinner from 'primvue/progressspinner';
import Toast from 'primevue/toast'
// import Password from 'primevue/password';
import Checkbox from 'primevue/checkbox';
import axios from "@/gateway/backendapi";
import store from "@/store/store";
import userRoles from "../../services/user/userRoles"
// import { error } from 'highcharts';
// import ref from 'Vue'
    export default {
        components:{InputText, Checkbox,Toast},
        data() {
		return {
            inviteNew: 'Invite New User',
            roles: [],
            selectedRole: [],
            userName:'',
            disabled: false,
            disable: false,
            mail:'',
            password1: '',
            password2: '',
            phoneNumber: '',
            name2: '',
            info: null,
            defaultEmail: {},
            currentUser: store.getters.currentUser,
            loading: false
		}
	},
    methods:{
          callButton(){
        if(!this.$route.query.email){
            this.createNewUser()
        } else {
            this.updateChurchUser()
        }

    },
        createNewUser(){
            if(this.mail === '') {
                this.$toast.add({
                severity:'error',
                summary:'Confirmed',
                detail:'Input Your Complete Details',
                life: 4000
                });
                return false
            }
            if(this.password1.length < 6){
                this.$toast.add({
                severity:'error',
                summary:'Confirmed',
                detail:'Ensured Your Password is More than 6 character',
                life: 4000
                })
                return false
            }
            // if(this.password1 !== this.password2){
            //     this.$toast.add({
            //     severity:'error',
            //     summary:'Confirmed',
            //     detail:'Ensured Your Password is same',
            //     life: 4000
            //     });
            //     return false
            // }

            let createNew = {
                email : this.mail,
                password: this.password1,                
                name : this.userName,
                roles : this.selectedRole,
                phone: this.phoneNumber

            }
            axios.post(`/api/Settings/CreatNewUser`,createNew)
            .then((res)=>{
                this.$toast.add({
                severity:'success',
                summary:'Confirmed',
                detail:'New User Saved Successfully',
                life: 4000
                });
                console.log(res);
                console.log('wisdom is great');
                this.$router.push('/tenant/settings')
            }).catch((error)=>{
                console.log(error);
                this.$toast.add({
                severity:'error', 
                summary:'Not successful', 
                detail:'Please check your network and try again', 
                life: 4000
                });
            })




        },
        async updateChurchUser(){
            let newUpdate ={
                email: this.mail,
                phone: this.phoneNumber,
                password: this.password1,
                name : this.userName,
                roles : this.selectedRole,
            }
            axios.put(`/api/Settings/UpdateChurchUser`,newUpdate)
            .then((res)=>{
                this.$toast.add({
                severity:'success',
                summary:'Confirmed',
                detail:'New User Saved Successfully',
                life: 4000
                });
                console.log(res);
                this.$router.push('/tenant/settings')

            }).catch((error)=>{
                console.log(error);
                

            })
        },
        async getEmail(){
      if (this.$route.query.email) {
          try{
            const {data} = await axios.get(`/api/Settings/GetChurchUserByEmail?email=${this.$route.query.email}`);
                // this.userName = data.name;
                this.mail = data.email;
                this.password1 = data.password;
                this.password2 = data.password;
                this.phoneNumber = data.phone;
                this.selectedRole = data.roles;
            }catch(error){
                console.log(error);
            }
      }
    },
     async userRole() {
         this.loading = true
          try {
            let roles = await userRoles()
            this.loading = false
            this.roles = roles.data
          } catch (err){
            console.log(err)
            this.loading = false
          }
        },
    },
    created(){
        if (this.$route.query.email){
            this.disabled = true
        }
        
         this.getEmail()
          if(!this.currentUser || !store.currentUser){
      console.log("no current user found");
            axios
            .get(`/api/Membership/GetCurrentSignedInUser`)
            .then((response) =>{
                this.currentUser = response.data;
            console.log(response.data)
            console.log(this.getTypes());


        })
            .catch((error)=> console.log(error))

        }else{
          console.log("current user found");
        }
        this.userRole()

    },
    mounted(){
        //     axios
        // .get(`/api/Settings/GetTenantPeopleClassification`)
        // .then((res) => {res.data;
        //     console.log(res.data);
        // })
        // .catch((err) => console.log(err));
        // .get('https://api.coindesk.com/v1/bpi/currentprice.json')
        // .then(response => (this.info = response.data.bpi))
        // .catch(error=> console.log(error))
        console.log(store.getters.currentUser)
        if(!store.getters.currentUser || store.getters.currentUser.churchName){
            axios
            .get(`/api/Membership/GetCurrentSignedInUser`)
            .then((response) =>{
                this.currentUser = response.data;
            console.log(response.data)

        })
            .catch((error)=> console.log(error))

        }
        


    }
    // const: getCurrentName = computed(() => {
    //   return store.getters.churchName ;
    //   console.log(getCurrentName)
    // }),
    }
</script>

<style scoped>
.invite-container{
    width: 100%;
    margin-top: 20px;
    margin-left: 14px;
    height: 800px;

}
.bg-secondary{
   background-color: #00000063!important
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
.rolesBackground{
    color: green;
}

@media (max-width: 771px) {
    .adminPermission{
        margin-top: 4rem!important;
    }
}
</style>