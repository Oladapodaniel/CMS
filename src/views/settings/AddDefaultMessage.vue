<template>
  <div>
    <div class="container">
      <h1 class="">Default Message</h1>
      <div class="add-container2">
        <h2 class="" style="font-weight: bold">Add Default Message</h2>
        <hr />
        <div class="container-form">
          <div class="row g-3 align-items-center">
            <div class="text-left text-sm-right col-12 col-sm-3">
              <label for="inputPassword6" class="col-form-label"
                >Category:</label
              >
            </div>
            <div class=" col-12  col-sm-9">
              <el-select-v2
                  v-model="selectCategory"
                  :options="Membership.map((i) =>({label: i.name , value: i.value }))"
                  placeholder="Select category"
                  class="w-100"
                  size="large"
                  style="width: 100%; text-align: left"
                />
            </div>
          </div>
          <div class="row g-3 align-items-center">
            <div class="text-left text-sm-right col-12 col-sm-3">
              <label for="inputPassword6" class="col-form-label">Type:</label>
            </div>
            <div class=" col-12  col-sm-9">
              <el-select-v2
                  v-model="selectType"
                  :options="Sms.map((i) =>({label: i.name , value: i.value }))"
                  placeholder="Select type"
                  class="w-100"
                  size="large"
                  style="width: 100%; text-align: left"
                />
            </div>
          </div>
          <div class="row g-3 align-items-center">
            <div class="  text-left text-sm-right col-12 col-sm-3">
              <label for="inputPassword6" class="col-form-label"
                >Subject:</label
              >
            </div>
            <div class=" col-12  col-sm-9">
              <el-input v-model="subject" type="text" class="" id="inputPassword6" />
            </div>
          </div>
          <div class="row g-3 align-items-center">
            <div class="text-left text-sm-right col-12 col-sm-3">
              <label for="inputPassword6" class="col-form-label"
                >Message:</label
              >
            </div>
            <div class="col-12  col-sm-9">
              <el-input
                v-model="message"
                :rows="2"
                type="textarea"
                placeholder=""
                style="border-radius: 5px; width: 100%"
              />
            </div>
          </div>
          <div class="row g-3 align-items-center">
            <div class="col-auto w-25"></div>
            <div class="col-auto w-100">
               <el-button type="primary" class="btn-primary"  style="
                  float: right;
                  margin-left: 20px;
                  border-radius: 22px;
                  font-size: 16px;
                  font-weight: 600;
                " round>Save</el-button>

              <!-- <el-button @click="callButton" class="saveButton btn-primary" :loading="loading" color="136acd" style="
                  float: right;
                  margin-left: 20px;
                  border-radius: 22px;
                  font-size: 16px;
                  font-weight: 600;
                " round>Save</el-button> -->
              <!-- <button
                type="button"
                class="btn btn-primary h-25 saveButton" 
                style="
                  float: right;
                  margin-left: 20px;
                  border-radius: 22px;
                  font-size: 16px;
                  font-weight: 600;
                "
                
              >
                Save
              </button> -->
              <router-link to="/tenant/settings/defaultmessage"
                >
                <el-button style="
                    float: right;
                    border-radius: 22px;
                    font-size: 16px;
                    font-weight: 600;
                    outline: none;
                    hover: none;
                  " round>Discard</el-button>
                <!-- <button
                  type="button"
                  class="btn h-25 btn-outline-secondary discard mobileResp"
                  style="
                    float: right;
                    border-radius: 22px;
                    font-size: 16px;
                    font-weight: 600;
                    outline: none;
                    hover: none;
                  "
                >
                  Discard
                </button> -->
                </router-link
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import messageOptions from "../../services/defaultmessage/default_message_service";
import { ElMessage, ElMessageBox } from "element-plus";
import axios from "@/gateway/backendapi";

export default {
  data() {
    return {
      message: "",
      subject: "",
      selectCategory: null,
      loading: false,
      Membership: messageOptions.Membership,
      selectType: null,
      Sms: messageOptions.Sms,
      defaultMessage: {},
    };
  },
  methods: {
    callButton() {
      this.loading = true
      if (!this.$route.query.messageId) {
        this.createDefaultMessage();
        this.loading = false
      } else {
        this.updateDefaultMessage();
        this.loading = false
      }
    },
    createDefaultMessage() {
      if (
        this.subject === "" ||
        this.message === "" ||
        this.selectType === "" ||
        this.selectCategory === ""
      ) 
      
      {
        ElMessage({
          type: "error",
          message: "Input Your Complete Messages",
        });
      }
      
      let newCreate = {
        subject: this.subject,
        message: this.message,
        messageType: this.selectType,
        category: this.selectCategory,
      };
      axios
        .post(`/api/Settings/CreateDefaultMessage`, newCreate)
        .then((res) => {
          console.log(res);
          ElMessage({
            type: "success",
            message: "Default Message Created succesfully",
          });

          this.$router.push("/tenant/settings/defaultmessage");
        })
        .catch((error) => {
          ElMessage({
            type: "error",
            message: "Failed",
          });
          console.log(error);
        });
    },
    async updateDefaultMessage() {
      let newUpdate = {
        id: this.defaultMessage.returnObject.id,
        subject: this.subject,
        message: this.message,
        messageType: this.selectType.value ? this.selectType.value : this.selectType,
        category: this.selectCategory.value ? this.selectCategory.value : this.selectCategory,
      };
      axios
        .put(`/api/Settings/UpdateDefaultMessage`, newUpdate)
        .then((res) => {
          console.log(res);
          this.$router.push("/tenant/settings/defaultmessage");
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async getDefaultMessage() {
      if (this.$route.query.messageId) {
        try {
          const { data } = await axios.get(
            `/api/Settings/GetDefaultMessage/${this.$route.query.messageId}`
          );
          this.defaultMessage = data;
          this.message = data.returnObject.message;
          this.subject = data.returnObject.subject;
          this.selectCategory = this.Membership.find(
            (i) => i.value === data.returnObject.category
          );
          this.selectType = this.Sms.find(
            (i) => i.value === data.returnObject.messageType
          );
          console.log(this.defaultMessage);
        } catch (error) {
          console.log(error);
        }
      }
    },
  },
  created() {
    this.getDefaultMessage();
  },
};
</script>

<style scoped>
.pagination {
  padding: 10px;
}
* {
  box-sizing: border-box;
}
.container {
  width: 90%;
}
.container h1 {
  font-size: 34px;
  margin-top: 18px;
  text-align: left;
  margin-bottom: 40px;
  font-weight: bolder;
  letter-spacing: 0px;
  color: #02172e;
  opacity: 1;
}
.container-form {
  width: 90%;
  height: auto;
  margin: auto;
}
.add-container2 {
  border-style: solid;
  border-width: 1px;
  border-color: rgb(212, 210, 210);
  border-radius: 10px;
  margin-top: 60px;
}
.add-container2 h2 {
  font-size: 24px;
  padding: 20px 1px 1px 35px;
  text-align: left;
}

.row {
  width: 80% !important;
  margin: auto;
  margin-bottom: 20px;
}
.button-add button {
  width: 80px;
}
.col-auto {
  text-align: right;
}
.btn-outline-secondary:hover {
  background-color: white;
  color: rgb(110, 104, 104);
}
@media screen and (max-width: 992px) {
  .container {
    width: 100%;
  }
  .body {
    background-color: blue;
  }
  .container-form {
    width: 100%;
  }
}
@media screen and (max-width: 375px) {
  .container {
    width: 100%;
  }
  .container-form {
    width: 100%;
  }
  .row {
    width: 90% !important;
    margin: auto;
    margin-bottom: 20px;
  }
}
@media screen and (max-width: 320px) {
  .container {
    width: 100%;
  }

  @media screen and (max-width: 375px) {
    .mobileResp {
      float: left;
    }
  }

  .container h1 {
    font-size: 25px;
    margin-top: 18px;
    text-align: left;
    margin-bottom: 40px;
    font-weight: bolder;
    letter-spacing: 0px;
    color: #02172e;
    opacity: 1;
  }
  .add-container2 h2 {
    font-size: 20px;
    padding: 20px 1px 1px 35px;
    text-align: left;
  }
  .container-form {
    width: 100%;
  }
  .row {
    width: 100% !important;
    margin-bottom: 20px;
    font-size: 13px;
  }
  .saveButton {
    margin-left: 3px !important;
  }
  .row textarea {
    border-color: rgb(119, 119, 119);
  }
}
</style>