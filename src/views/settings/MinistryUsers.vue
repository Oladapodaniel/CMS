<template>
<!-- {{churchUsers && churchUsers.users ? churchUsers.users : ''}}{{searchText}} -->
  <div> 
    <div class="container">
      <div class="row d-md-flex justify-content-between mt-3 mb-4">
        <div class="col-md-7 col-xl-8 col-lg-8 col-sm-12">
          <h2 class="font-weight-bolder churchHeader">{{churchProfile ? churchProfile.churchName : ""}}</h2>
        </div>
        <div class="col-lg-4 col-xl-4 col-md-5 col-sm-12 d-flex justify-content-sm-end  mt-2 link d-lg-flex justify-content-end">
          <router-link
            to="/tenant/settings/invitenewuser"
            class="grey-border primary-bg border-0 text-white addnew default-btn"
            >Add New User</router-link
          >
        </div>
      </div>
      <div class="col-md-12 px-0 my-4">
        <p class="small-text">
          You can invite a new user to access your Church account. Only give
          access to people you trust, since users can see your transactions and
          other business information.
        </p>
      </div>
        
 
 <div class="row table mt-5">
  <div class="col-12 px-0" id="table">
    <div class="top-con" id="ignore2">
        <div class="table-top">
          <div class="col-4">
            <p @click="toggleSearch" class="search-text w-100 mt-2 d-flex justify-content-center">
              <i class="pi pi-search"></i>SEARCH
            </p>
          </div>

          <div class="search d-flex ml-2 mr-3"
          >
            <label
              class="label-search d-flex"
              :class="{
                'show-search': searchIsVisible,
                'hide-search': !searchIsVisible,
              }"
            >
              <input
                type="text"
                placeholder="Search..."
                v-model="searchText"
              />
              <!-- <span class="empty-btn">x</span> -->
              <span class="empty-btn"
                    @click="clearInput">
                    <i class="pi pi-times"></i
            ></span>
              <span class="search-btn"
              @click="removeSearchText">
                <i class="pi pi-search"></i>
              </span>
            </label>
          </div>
        </div>
    </div>
  </div>
   <div class="col-md-12">
     <div class="border-0 bg-danger">
      <div class="row table-header-row py-2  small-text">
        <!-- <div class="col-md-3">
          <span class="py-2 font-weight-bold">Name</span>
        </div> -->
          <div class="col-md-4">
          <span class="py-3 font-weight-bold">Email</span>
        </div>
        <!-- <div class="col-md-3">
          <span class="py-2 font-weight-bold">Phone</span>
        </div> -->
        <div class="col-md-4">
          <span class="py-2 font-weight-bold">Status</span>
        </div>
        <div class="col-md-3">
          <span class="py-2 font-weight-bold">Roles</span>
        </div>
        <div class="col-md-1">
          <span class="py-2 font-weight-bold"></span>
        </div>
      </div>
 </div>
   </div>
   <div class="col-md-12">
      <div class="row small-text tr-border-bottom py-1 header2" v-for="(churchMem, index) in searchChurchUser" :key="index">
            <!-- <div
              class="col-md-3 d-flex justify-content-between"
            >
              <span class="py-2 hidden-header">NAME</span>
               <span class="py-2" v-if="churchMem.name && churchMem.name.length<20"> <router-link class="route" :to="{path:'/tenant/settings/invitenewuser', query:{ email:churchMem.email } }" >{{ churchMem.name}}</router-link></span>
              <span v-else v-tooltip.top="`${churchMem.name}`" class="route"> <router-link  class="route" :to="{path:'/tenant/settings/invitenewuser', query:{ email:churchMem.email } }" >{{ churchMem.name && churchMem.name.substring(0,10)+ "..."}}</router-link></span>
            </div> -->
             <div
              class="col-md-4 d-flex justify-content-between align-items-center"
            >
              <span class="py-2 hidden-header">EMAIL</span>
              <span class="py-2 text-xs-left"  v-if=" churchMem.email && churchMem.email.length<10"> <router-link class="route" :to="{path:'/tenant/settings/invitenewuser', query:{ email:churchMem.email } }">{{ churchMem.email}}</router-link></span>
              <span v-else v-tooltip.top="`${churchMem.email}`"> <router-link class="route" :to="{path:'/tenant/settings/invitenewuser', query:{ email:churchMem.email } }" >{{ churchMem.email && churchMem.email}} </router-link></span>
            </div>
             <!-- <div
              class="col-md-4 d-flex justify-content-between align-items-center"
            >
              <span class="py-2 hidden-header">PHONE</span>
              <span class="py-2" v-if=" churchMem.phone && churchMem.phone.length < 11"> <router-link class="route" :to="{path:'/tenant/settings/invitenewuser', query:{ email:churchMem.email } }">{{ churchMem.phone}}</router-link></span>
              <span v-else v-tooltip.top="`${churchMem.phone}`"> <router-link class="route" :to="{path:'/tenant/settings/invitenewuser', query:{ email:churchMem.email } }" >{{ churchMem.phone && churchMem.phone.substring(0,11)+ "..."}}</router-link></span>
            </div> -->
           
            <div
              class="col-md-4 d-flex justify-content-between align-items-center"
            >
              <span class="py-2 hidden-header">STATUS</span>
              <span class="py-2"><router-link class="route" :to="{path:'/tenant/settings/invitenewuser', query:{ email:churchMem.email } }" >{{churchMem.status}}</router-link></span>
            </div>
            <div
              class="col-md-3 d-flex justify-content-between align-items-center"
            >
              <span class="py-2 hidden-header">ROLES</span>
              <span class="py-2" v-tooltip.top="`${churchMem.roles.join(', ')}`"
              > <router-link class="route" :to="{path:'/tenant/settings/invitenewuser', query:{ email:churchMem.email } }" >{{ `${churchMem && churchMem.roles[0] ? churchMem.roles[0].length > 10 ? churchMem.roles[0].substring(0,10)+ ".." : churchMem.roles[0] : ""}` }}</router-link></span>
              <!-- <span v-else>{{ churchMem ? churchMem.roles ? churchMem.roles[0].substring(0,14)+ ".." : '' : '' }}</span> -->
              <!-- "churchMem ? churchMem.roles ? churchMem.roles[0].length<14 : '' : '' " -->
            </div>
            <!-- {{churchMem && churchMem.roles[0] ? churchMem.roles[0]? churchMem.roles[0] : '' : '' }} -->
            <div
              class="col-sm-12 d-flex col-12 justify-content-sm-end col-md-1 col-lg-1 col-xl-1 d-flex justify-content-end align-items-center"
            >
              <div class="dropdown">
                <i
                  class="fas fa-ellipsis-v cursor-pointer"
                  id="dropdownMenuButton"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                ></i>
                <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                  <a class="dropdown-item">
                    <router-link
                    :to="`/tenant/sms/compose?phone=${churchMem.phone}`"
                      >Send SMS</router-link>
                    </a>
                  <a class="dropdown-item" v-if="churchMem.email">
                    <router-link
                    :to="`/tenant/email/compose?phone=${churchMem.email}`"
                      >Send Email</router-link
                    >
                  </a>
                  <a class="dropdown-item"><router-link :to="{path:'/tenant/settings/invitenewuser', query:{ email:churchMem.email } }"> Edit</router-link></a>
                  <a class="dropdown-item" @click="deletePop(churchMem.email)"> <router-link to="" v-if="churchMem.email !== getCurrentUser.userEmail"> Delete </router-link></a>
                  <a class="dropdown-item" @click="deactivateChurchUser(churchMem.email, index)"> <router-link to=""> Inactive </router-link></a>
                  <a class="dropdown-item" @click="activateChurchUser(churchMem.email, index)"> <router-link to=""> Active </router-link></a>
                </div>
              </div>
            </div>
          </div>
   </div>
   <div class=" col-12 text-center p-5" v-if="loading">
      <i class="pi pi-spin pi-spinner text-center text-primary" style="fontSize: 3rem"></i>
    </div>

 </div>
      <!-- <div
        class="row py-2"
        
      > -->
      <Toast/>
      <ConfirmDialog/>
        <!-- <div class="col-md-12"> -->
         

          <!-- <div class="row">
            <div class="col-md-12 px-0">
              <hr class="hr my-0" />
            </div>
          </div> -->
        <!-- </div> -->


       <!-- </div> -->
      <!-- </div> -->
    </div>
  </div>
</template>

<script>
import store from '@/store/store';
import Tooltip from 'primevue/tooltip';
import Toast from 'primevue/toast';
import ConfirmDialog from 'primevue/confirmdialog'
import axios from "@/gateway/backendapi";
import finish from "../../services/progressbar/progress";
export default {
  components:{
    Toast,
    ConfirmDialog

  },
    directives: {
    'tooltip': Tooltip
},
  data(){
    return{
      getCurrentUser: store.getters.currentUser,
      churchProfile: '',
      searchText: '',
      churchUsers: [],
      churchNames: {},
      loading: false,
      searchIsVisible: false
    }
  },

  computed:{

    searchChurchUser(){
      if (this.churchUsers && this.churchUsers.users && this.churchUsers.users.length > 0 && this.searchText == '' ) return this.churchUsers.users;
       this.churchUsers && this.churchUsers.users ? this.churchUsers.users.forEach((i, index) => {
         if (i.email == null) {
           this.churchUsers.users.splice(index,1)
         }
       }) : []
      return this.churchUsers && this.churchUsers.users ? this.churchUsers.users.filter(i => i.email.toLowerCase().includes(this.searchText.toLowerCase())) : []
    }
    // churchProfile(){
    //   if(!this.getCurrentUser || !this.getCurrentUser.churchName) return "";
    //   return this.getCurrentUser.churchName;
    // }

  },
  methods:{

      toggleSearch (){
       this.searchIsVisible = !this.searchIsVisible;
     },
      removeSearchText (){
        this.searchText = '';
    },
      clearInput (){
        this.searchText = '';
    },

    async churchUser(){
      this.loading = true
      try{
        const { data } = await axios.get('/api/Settings/ChurchUsers')
        this.churchUsers = data;
        console.log(this.churchUsers, 'church users')
        this.loading = false
      }catch(error){
        console.log(error)
      }
    },
    async activateChurchUser(email, index){
      try{
        let response = await axios.post(`/api/Settings/ActivateChurchUser?churchUserEmail=${email}`);
        console.log(response);
         this.churchUsers.users[index].status = "Active";
        this.$toast.add({severity:'success', summary: '', detail:'Status Make Active', life: 3000});
      }catch(error){
        finish()
        console.log(error);

      }
    }, 
      async deactivateChurchUser(email, index) {
      try{
         let response = await axios.post(`/api/Settings/DeactivateChurchUser?churchUserEmail=${email}`);
         console.log(response);
        this.churchUsers.users[index].status = "Inactive";
        this.$toast.add({severity:'success', summary: '', detail:'Status Make Inactive', life: 3000});

      }catch(error){
        finish()
        console.log(error);

      }
      
    },
     
     async deleteChurchUser(email){
      try {
        await axios.post(`/api/Settings/DeleteChurchUser?churchUserEmail=${email}`);
        this.churchUsers.users = this.churchUsers.users.filter(i => i.email !== email);
         this.$toast.add({severity:'success', summary: '', detail:'Church User Deleted Successfully', life: 3000});
      } catch (error){
        finish()
        console.log(error);
      }
    },
     deletePop(email) {
            this.$confirm.require({
                message: 'Are you sure you want to Delete?',
                header: 'Delete Confirmation',
                icon: 'pi pi-exclamation-circle',
                acceptClass: 'confirm-delete',
                rejectClass: 'cancel-delete',
                accept: () => {
                  this.deleteChurchUser(email)
                    //callback to execute when user confirms the action
                },
                reject: () => {
                    'No internet'
                }
            });
        },
        async currentUser () {
          if(!store.getters.currentUser){
             try{
                const { data } = await axios.get('/api/Membership/GetCurrentSignedInUser')
                this.getCurrentUser = data;
                console.log(this.getCurrentUser)
              }catch(error){
                console.log(error)
              }    
            } else {
                this.getCurrentUser = store.getters.currentUser
                console.log(this.getCurrentUser)
            }
        }

  }, 
  mounted(){
    

  },
  created() {
    if(store.getters.currentUser === new Object()){
     
          this.churchProfile = store.getters.currentUser
          console.log(store.getters.currentUser)
          console.log("current user found");
        }else{
           axios
            .get(`/api/Membership/GetCurrentSignedInUser`)
            .then((response) =>{
                this.churchProfile = response.data;
                console.log(this.churchProfile.churchName);
                 console.log("no current user found");
        })
            .catch((error)=> console.log(error))
          
        }
    this.churchUser()
    this.currentUser()
     
  },
};
</script>

<style scoped>
.route{
  color: black!important;
  text-decoration: none!important;

}

.table {
  width: 100% !important;
  box-shadow: 0px 1px 4px #02172e45;
  border: 1px solid #dde2e6;
  border-radius: 30px;
  text-align: left;
  margin-bottom: auto !important;
}

.route:hover{
  color: #136acd!important;

}
.dropdown a{
  color: black!important;
  text-decoration: none;
}
.dropdown a:hover{
  color: #136acd!important;
}

.table-header-row {
  background: #dde2e6;
  border-top: 1px solid #dde2e6;
  border-radius: 8px 8px 0 0;
}
.header2{
  cursor: pointer;

}

.table-top {
  font-weight: 800;
  font-size: 12px;
  display: flex;
  justify-content: flex-end;
}
.table-top label:hover,
.table-top p:hover {
  cursor: pointer;
}

.header2:hover{
  background-color: #eee;
}
.header1{
  font-size: 14px;
  font-weight: 600;
  box-shadow: 0px 3px 6px #2c282821;
  border-radius: 8px;
}

.hidden-header {
  display: none;
}
.addnew{
  text-decoration: none!important;
}
.addnew:hover{
color: white!important;
}
@media screen and (max-width: 1280px) {
    .small-text {
        font-size: 13px;
    }
/* 
    .link {
        font-size: 14px;
    } */
}

@media screen and (max-width: 767px) {
  .hidden-header {
    display: inline-block;
    font-weight: bold;
  }

  .table-header-row {
    display: none;
  }
}
@media screen and (max-width: 402px) {
  .churchHeader{
  font-size: 20px;
}
  
}

@media screen and (max-width: 1024px) {
  .my-con {
    flex-direction: column;
  }
  .table {
    width: 98%;
    margin: 24px auto;
  }
  .summary {
    width: 98%;
    margin: auto;
  }
}

</style>