<template>
  <div>
    <div class="container">
      <div class="row mainHeada">
        <div class="col-md-6 col-sm-10 mt-lg-5">
          <h1>Add Group</h1>
        </div>
      </div>
      <div class="row">
        <div class="col-md-12">
          <hr class="hr mb-md-5" />
        </div>
      </div>

      <!-- Content of the Box -->
      <main class="">
        <div id="main" class="container-fluid col-sm-12">
          <div class="row">
            <!-- Group Name row -->
            <div class="col-md-12">
              <div class="row d-md-flex align-items-center mt-2">
                <div class="col-md-12">
                  <div class="row">
                    <div class="col-md-12 gName">
                      <h3 class="ml-md-n3 mb-n2">Group Name</h3>
                    </div>
                  </div>

                  <!-- Context Area -->
                  <div
                    class="row amazing d-flex flex-row justify-content-between mt-lg-3"
                  >
                    <!-- <h4 class="ml-md-n3 mt-lg-1">Amazing Group</h4> -->
                    <!-- <div class="col-md-7 form-group px-0"> <input type="text"
class="inputWithDisable" id="groupName"v-model="groupNameValue"v-bind:disabled="groupNameDisabled"ref="groupName"/></div> -->
                    <div class="col-md-6 mt-3 form-group px-0">
                      <input
                        type="text"
                        class="form-control"
                        id="groupName"
                        v-model="groupNameValue"
                        required
                      />
                    </div>

                    <div class="col-md-6 col-sm-4 mr-lg-n5 amazingE">
                      <!-- <button
                        v-on:click="enableGroupName"
                        class="btn btnIcons btn-secondary"
                      >
                        <i
                          class="fa fa-plus-circle icons"
                          aria-hidden="true"
                        ></i>
                        Add
                      </button> -->
                    </div>
                  </div>

                  <div class="row mt-lg-5 mb-lg-1">
                    <h3>Phone Numbers</h3>
                  </div>
                  <div class="row d-flex flex-row justify-content-between mdiv">
                    <div class="col-md-6 form-group px-0">
                      <textarea name="" id="" class="w-100 grey-rounded-border form-control" rows="5"
                        v-model="enteredValue"
                        required
                      ></textarea>
                    </div>
                    <div class="col-md-5 mr-lg-n5 addIconarea">
                      <button
                        v-on:click="addPhoneNumber"
                        class="btn btnIcons align-self-end btn-secondary mb-2"
                      >
                        <i
                          class="fa fa-plus-circle icons"
                          aria-hidden="true"
                        ></i>
                        Add
                      </button>
                    </div>
                  </div>

                  <div
                    v-for="(phoneNumber, index) in phoneNumbers"
                    :key="index"
                    class="row"
                  >
                    <div class="col-md-6 col-sm-4 addContent spanArea1 mt-1">
                      <div class="row d-md-flex align-items-center">
                        <div class="col-md-7 spanArea col-sm-4">
                          <span>
                            {{ phoneNumber }}
                          </span>
                        </div>
                        <div
                          class="col-md-5 d-md-flex justify-content-end spanArea2"
                        >
                          <button
                            v-on:click="removePhoneNumber(index)"
                            class="btn btn-default text-danger"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- Button Area -->
                  <div class="row mt-md-5 mb-4">
                    <div class="col-md-7">
                      <div class="row d-md-flex align-items-center">
                        <div class="col-md-6 basebtns">
                          <button
                            v-on:click="resetInputFields"
                            class="btn btnBase1 btnBase"
                          >
                            Cancel
                          </button>
                        </div>
                        <div class="col-md-6 basebtns">
                          <button
                            v-on:click="saveGroupDetails"
                            class="btn btnBase btn-primary ml-md-4"
                          >
                            <i
                              class="fas fa-circle-notch fa-spin"
                              v-if="loading"
                            ></i>
                            <span>Save</span>
                            <span></span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import axios from "@/gateway/backendapi";
import router from "../../router/index";

export default {
  data() {
    return {
      phoneNumbers: [],
      enteredValue: "",
      groupNameValue: "",
      groupNameDisabled: true,
      loading: false,
    };
  },

  // this.phoneNumbers.indexOf(this.enteredValue) < 0
  methods: {
    addPhoneNumber() {
      if (this.enteredValue !== "") {
        this.enteredValue.trim();
        if (this.enteredValue.includes(",")) {
          this.enteredValue
            .split(",")
            .forEach((i) => this.phoneNumbers.push(i));
        }
        if (
          this.enteredValue.split(" ").length > 1 &&
          !this.enteredValue.includes(",")
        ) {
          this.enteredValue
            .split(" ")
            .forEach((i) => this.phoneNumbers.push(i));
        }
        if (
          !this.enteredValue.includes(",") &&
          !this.enteredValue.includes(" ")
        ) {
          this.phoneNumbers.push(this.enteredValue);
        }
        this.enteredValue = "";
        console.log(this.phoneNumbers);
      }

      // this.phoneNumbers.push(this.enteredValue);
      // this.enteredValue = "";
      // console.log("am here");
    },
    removePhoneNumber(index) {
      this.phoneNumbers.splice(index, 1);
    },

    enableGroupName() {
      this.groupNameDisabled = false;
      this.$refs.groupName.focus();
    },

    saveGroupDetails() {
      if (
        this.enteredValue !== "" &&
        this.phoneNumbers.indexOf(this.enteredValue) < 0
      ) {
        this.phoneNumbers.push(this.enteredValue);
        this.enteredValue = "";
      }
      let details = {
        id: "",
        groupName: this.groupNameValue,
        phoneNumbers: this.phoneNumbers.join(","),
      };
      console.log(details);
      console.log(this.phoneNumbers);
      this.loading = true;
      axios
        .post("/api/Messaging/createPhoneGroups", details)
        .then((res) => {
          this.loading = false;
          console.log(res);
          router.push("/tenant/sms/contacts");
        })
        .catch((err) => {
          this.loading = false;
          console.log(err);
        });
    },

    resetInputFields() {
      this.enteredValue = "";
      this.groupNameValue = "";
      this.phoneNumbers = "";
    },
  },
};
</script>

<style scoped>
:root {
  --font-color: #02172e;
  --hrule-color: #708eb15c;
  --primary-color: #000000;
}

* {
  color: #02172e;
}

.container {
  outline: none;
  overflow: hidden;
}

#groupName:focus {
  border: none;
}

.inputWithDisable {
  /* background-color: rgba(252, 252, 252, 0.932); */
  border: none;
  outline: transparent;
}

.inputWithDisable:disabled {
  background: transparent;
}

h1,
h3,
h4 {
  font-family: "Nunito Sans";
  color: var(--font-color);
}

h1 {
  font-size: 24px;
  font-weight: bold;
}

h3 {
  font-size: 16px;
  font-weight: bold;
}

h4 {
  font-size: 16px;
}

.hr {
  color: #708eb15c;
}

.addContent {
  border: 1px solid #02172e30;
  border-radius: 5px;
  height: 40px;
}

.btn {
  display: inline-block;
}

.btnIcons {
  width: 110px;
  height: 35px;
  /* color: var(--primary-color); */
  background-color: #dde2e6;
  border-radius: 40px;
  border: none;
}

.btnIcons:hover {
  color: #136acd;
}

.btnBase1 {
  background-color: transparent;
  /* border: 1px var(--primary-color) solid; */
  border: 1px solid #000000;
}

.btnBase {
  box-sizing: border-box;
  width: 108px;
  height: 44px;
  border-radius: 50px;
}

.icons {
  color: var(--primary-color);
  margin-right: 10px;
}

@media only screen and (max-width: 500px) {
  .mainHeada {
    margin-top: 1rem;
  }

  .gName {
    margin: 0 0 1rem -1rem;
  }

  h3 {
    font-size: 17px;
    font-weight: bold;
  }

  .amazing {
    margin: 0 0 2rem -2rem;
    display: flex;
    flex-direction: row;
  }

  .amazingG {
    width: 50%;
    margin-top: 0.5rem;
  }

  .amazingE {
    padding: 0;
    width: 50%;
    margin-left: 1rem;
    /* display: flex; */
    justify-content: flex-end;
  }

  .spanArea1 {
    position: relative;
    margin-top: 1rem;
    display: flex;
  }

  .spanArea2 {
    position: absolute;
    top: 0;
    right: -13.5rem;
  }

  .spanArea {
    width: 40%;
    position: absolute;
  }

  .addIconarea {
    padding: 0;
  }

  .basebtns {
    margin: 2.5rem auto;
    width: 40%;
  }

  #groupName {
    margin-left: 1rem;
  }
}
</style>
