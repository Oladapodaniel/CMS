<template>
  <div>
    <div class="container">
      <div class="row d-md-flex justify-content-between mt-3 mb-5">
        <div class="col-md-12">
          <h2 class="attend">Post Category</h2>
        </div>
      </div>
      <Toast />
      <ConfirmDialog></ConfirmDialog>

      <div class="row grey-border pt-1 pb-5">
        <div class="col-md-12">
          <div class="row">
            <div class="col-md-12">
              <div class="row">
                <div class="col-md-12">
                  <h4 class="mt-2 mb-2 ml-5 attend1">PostCategory Categories</h4>
                </div>
              </div>
              <div class="row">
                <div class="col-md-12 col-12 pt-md-3 pt-4 grey-background">
                  <div class="row d-md-flex justify-content-between align-items-center">
                    <div class="col-md-7 col-12 d-md-flex">
                      <div class="w-100">
                      <input
                        type="text"
                        class="form-control mb-2"
                        placeholder="Post category name"
                        v-model="postName"
                      />
                        <button class="btn primary-btn text-white bold px-4 py-1 mt-sm-3 mt-lg-0 mt-xl-0" @click="savePost">Save</button>
                      </div>
                    </div>
                    <div class="col-md-3 mt-md-0 mt-5 col-12 d-flex justify-content-center flex-column">
                      <div>
                        <img v-show="url" class="picturedp" style="width:100px; height: 100px; object-fit: cover; border-radius: 50%;" :src="url" alt="insert Image">
                        <img v-show="!url" style="width:100px; height: 100px; object-fit: cover; border-radius: 50%;" src="../../assets/people/phone-import.svg" alt="">
                     </div>
                     <div class="mt-2">
                      <label for="imgUpload" class="choose-image btn btn-light">
                        Choose file
                        <input
                          type="file"
                          class="input file-input form-control"
                          placeholder=""
                          id="imgUpload"
                          @change="imageSelected"
                        />
                      </label>
                    </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="row table-header-row py-2 mt-5">
            <div class="col-md-4">
              <span class="py-2 font-weight-bold">NAME</span>
            </div>
            <div class="col-md-3">
              <span class="py-2 font-weight-bold">MAKE PUBLIC</span>
            </div>
            <div class="col-md-5 text-center">
              <span class="py-2 font-weight-bold mr-md-5 mr-0">ACTION</span>
            </div>
          </div>

          <div class="row py-2" v-for="(type, index) in types" :key="index">
            <div class="col-md-12">
              <div class="row">
                <div
                  class="col-md-4 px-md-0 px-5 d-flex justify-content-between align-items-center mb-md-0 mb-5"
                >
                  <span class="py-2 hidden-header">NAME</span>
                  <span class="py-2 text-xs-left mr-md-0 ml-md-3 mr-4">{{ type.name }}</span>
                </div>
                <div
                  class="col-md-3 px-md-0 px-5 d-flex justify-content-between align-items-center mb-md-0 mb-5"
                >
                  <span class="py-2 hidden-header">MAKE PUBLIC</span>
                  <span class="py-2 text-xs-left mr-md-0 ml-md-3 mr-4">
                    <Checkbox id="binary" v-model="type.isPublic" :binary="true" @change="updatePostCategory(index)"/>
                  </span>
                </div>
                <div
                  class="col-md-5 mb-md-0 mb-2 col-12 d-flex justify-md-content-end justify-content-start align-items-end"
                >
                  <span class="py-md-4 hidden-header hidden-header1">ACTION</span>
                  <div class="row">
                    <div class="col-md-6 col-6 d-flex justify-content-center">
                      <button class="btn secondary-btn py-1 px-4" @click="openType(index)">View</button>
                    </div>
                    <div class="col-md-6 col-6 d-flex justify-content-start">
                      <button class="py-1 primary-btn px-3 delbtn" @click="deletePop(type.postCategoryId)">Delete</button>
                    </div>
                  </div>
                </div>
              </div>

              <div class="row grey-background py-2 mt-2" v-if="vissibleTab === `tab_${index}`">
                <div
                  class="col-md-7 d-flex justify-content-between align-items-center mb-md-0 mb-2"
                >
                  <label for="" class="d-flex mt-4">
                    <span class="mr-2">Name</span>
                    <input type="text" class="form-control" v-model="typeName">
                  </label>
                </div>
                <div
                  class="col-md-5 d-flex justify-content-end align-items-center mt-0"
                >
                  <div class="row">
                    <div class="col-md-6 col-6 d-flex justify-content-start">
                      <button class="btn primary-btn save-btn py-1 px-4 ml-md-0 ml-5" @click="updatePost(type.postCategoryId, index)">Save</button>
                    </div>
                    <div class="col-md-6 col-6 d-flex justify-content-end">
                      <button class="btn secondary-btn py-1 px-3" @click="discard">Discard</button>
                    </div>
                  </div>
                </div>
              </div>

              <div class="row">
                <div class="col-md-12 px-0">
                  <hr class="hr my-0" />
                </div>
              </div>
            </div>
          </div>
          <div class=" col-12 text-center p-5" v-if="loading">
             <i class="pi pi-spin pi-spinner text-center text-primary" style="fontSize: 3rem"></i>
         </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "@/gateway/backendapi";
import { ElMessage, ElMessageBox } from 'element-plus';
import Toast from 'primevue/toast';
import ConfirmDialog from 'primevue/confirmdialog';
import finish from '../../services/progressbar/progress';
import store from '@/store/store'

export default {
  components:{
    Toast,
    ConfirmDialog,

  },
  data() {
    return {
      types: [ ],
      vissibleTab: "",
      typeName: "",
      postName: "",
      ageGroup: "",
      loading: false,
      tenantId: "",
     currentUser: store.getters.currentUser,
     image: '',
     url: '',
     makePublic: false
    }
  },

  methods: {
    async getTypes(id) {
      try {
        this.loading = true
        const { data } = await axios.get(`/mobile/v1/Feeds/GetPostCategory?tenantId=${id}&source=web`);
        // email=${this.$route.query.email}
        this.types = data;
        console.log(data);
        this.loading = false
      } catch (error) {
        console.log(error);
      }
    },
    deletePop(id) {
      ElMessageBox.confirm(
        'Are you sure you want to Delete?',
        'Warning',
        {
          confirmButtonText: 'OK',
          cancelButtonText: 'Cancel',
          type: 'warning',
        }
      )
      .then(() => {
          this.deletePost(id)
        })
        .catch(() => {
          ElMessage({
            type: 'info',
            message: 'Delete canceled',
          })
        })
            // this.$confirm.require({
            //     message: 'Are you sure you want to Delete?',
            //     header: 'Delete Confirmation',
            //     icon: 'pi pi-exclamation-circle',
            //     acceptClass: 'confirm-delete',
            //     rejectClass: 'cancel-delete',
            //     accept: () => {
            //       this.deletePost(id)
            //         //callback to execute when user confirms the action
            //     },
            //     reject: () => {
            //         'No internet'
            //     }
            // });
        },
    
    async deletePost(id){
      try {
        let {data} = await axios.delete(`/mobile/v1/Feeds/DeletePostCategory?PostCategoryId=${id}`);
        if(data.status === false){
          ElMessage({
              type: 'error',
              message: 'This people classification you are trying to delete has been used to save Image. You can not delete it. You can rename instead.',
            })
          // this.$toast.add({severity:'error', summary: '', detail: 'This people classification you are trying to delete has been used to save Image. You can not delete it. You can rename instead.', life: 9000})
        }else{
          this.types = this.types.filter(i => i.postCategoryId !== id);
          ElMessage({
              type: 'success',
              message: 'Post Category Deleted Successfully',
            })
        //  this.$toast.add({severity:'success', summary: '', detail:'Post Category Deleted Successfully', life: 3000});
        }
        
      } catch (error){
        finish()
        console.log(error);
      }
    },
    async updatePost(id, index){
      try{
        await axios.put('/mobile/v1/Feeds/UpdatePostCategory', { name: this.typeName, postCategoryId:id});
        this.types[index].name = this.typeName;
        this.discard()
         ElMessage({
              type: 'success',
              message: 'Post Category Updated Successfully',
            })
        // this.$toast.add({severity:'success', summary: '', detail:'Post Category Updated Successfully', life: 3000});
      }catch (error){
        finish()
        console.log(error)
      }
    },
    async savePost(){
      if(this.postName === "" || this.currentUser.tenantId === "" || this.image === ""){
        ElMessage({
              type: 'error',
              message: 'Enter Your Details',
            })
        // this.$toast.add({severity:'error', summary: '', detail:' Enter Your Details', life: 3000});
        return false

      }
       const formData = new FormData();
                formData.append("Name", this.postName ? this.postName : "");
                formData.append("TenantId", this.currentUser.tenantId ? this.currentUser.tenantId : "");
                formData.append("CategoryImage", this.image ? this.image : "")

      try{
         await axios.post(`/mobile/v1/Feeds/CreatePostCategory `, formData);
        this.getTypes(this.currentUser.tenantId)
        this.postName = ""
        ElMessage({
              type: 'success',
              message: 'Post Save Successfully',
            })
        // this.$toast.add({severity:'success', summary: '', detail:' Post Save Successfully', life: 3000});
      }catch (error) {
        finish()
        console.log(error)
      }
    },
    openType(index) {
      this.vissibleTab = `tab_${index}`;
      this.typeName = this.types[index].name;
    },

    discard() {
      this.vissibleTab = "";
    },
    del(index){
        this.types.splice(index, 1)
    },
    imageSelected (e) {
      this.image = e.target.files[0];
      this.url = URL.createObjectURL(this.image);
      console.log(this.url);
    },
    async updatePostCategory (index) {
      const updateBody = this.types[index]
      console.log(updateBody)
      try {
        let { data } = await axios.put('/mobile/v1/Feeds/UpdatePostCategory', updateBody)
        this.$toast.add({
          severity:'success', 
          summary: data.response, 
          detail: this.types[index].isPublic ? 'Post category is now made public for mobile users' : 'Post category is not public anymore', 
          life: 5000
        });
      }
      catch (err) {
        console.log(err)
      }
    }
  },

  created() {
    console.log(this.currentUser);
    
    console.log(this.currentUser);
    if(!this.currentUser || !store.currentUser){
      console.log("no current user found");
            axios
            .get(`/api/Membership/GetCurrentSignedInUser`)
            .then((response) =>{
                this.currentUser = response.data;
            console.log(response.data)
            this.getTypes(this.currentUser.tenantId);
            console.log(this.getTypes());


        })
            .catch((error)=> console.log(error))

        }else{
          console.log("current user found");
        }
  },
 }
</script>

<style scoped>
input::placeholder {
  text-align: center;
}
.input{
  width: 10%;
  height: 0px;
  border: 1px solid #b9c5cf;
  background: #DDE2E6;
}

.table-header-row {
  background: #ebeff4;
  border-top: 1px solid #dde2e6;
  border-radius: 8px 8px 0 0;
}

.hidden-header {
  display: none;
}

.grey-background {
    background: #DDE2E6;
}

.save-btn {
  background: #50AB00;
}
.delbtn:hover{
    background-color:red!important;
    color: white!important;
  }
  .delbtn{
  background-color: #F2BC9E!important;
  color: black!important;
}
.delbtn:focus{
  outline: none!important;
  border: none!important;
}
.attend{
    font: var(--unnamed-font-style-normal) normal 800 34px/46px var(--unnamed-font-family-nunito-sans);
    letter-spacing: var(--unnamed-character-spacing-0);
    text-align: left;
    font: normal normal 800 34px/46px Nunito Sans;
    letter-spacing: 0px;
    color: #02172E;
    opacity: 1;
}
.attend1{
    font: var(--unnamed-font-style-normal) normal var(--unnamed-font-weight-bold) 24px/32px var(--unnamed-font-family-nunito-sans);
    letter-spacing: var(--unnamed-character-spacing-0);
    text-align: left;
    font: normal normal bold 24px/32px Nunito Sans;
    letter-spacing: 0px;
    color: #02172E;
    opacity: 1;
}

@media screen and (max-width: 767px) {
  .hidden-header1{
    display: none!important;
  }
  .hidden-header {
    display: inline-block;
    font-weight: bold;
  }

  .table-header-row {
    display: none;
  }
}
@media screen and (max-width: 390px) {
  .attend{
    font: var(--unnamed-font-style-normal) normal 500 20px/25px var(--unnamed-font-family-nunito-sans);
    letter-spacing: var(--unnamed-character-spacing-0);
    text-align: left;
    font: normal normal 800 20px/25px Nunito Sans;
    letter-spacing: 0px;
    color: #02172E;
    opacity: 1;
}
.attend1{
    font: var(--unnamed-font-style-normal) normal var(--unnamed-font-weight-bold) 24px/32px var(--unnamed-font-family-nunito-sans);
    letter-spacing: var(--unnamed-character-spacing-0);
    text-align: left;
    font: normal normal bold 18px/20px Nunito Sans;
    letter-spacing: 0px;
    color: #02172E;
    opacity: 1;
}
 
.picturedp{
    width: 4rem;
    height: 4rem;
}
img.picturedp{
    width: 100%;
    height: 40px;
    object-fit: cover;
    border-radius: 50%;
}
img{
  width: 30px;
}


  
}
</style>