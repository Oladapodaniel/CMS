<template>
  <!-- <form @submit.prevent="onSubmit">
    <div class="container my-content">
      <div class="row page-header">
        <div class="col-12">
          <h3 class="header-text font-weight-bold">Add First timers</h3>
        </div>
      </div>

      <div class="row form-container">
        <div class="col-10 offset-1 offset-sm-0 col-sm-12">
          <span class="sub-header">Bio: </span>
          <div class="row first-row">
            <div class="col-12 col-md-4 text-md-right pr-0">
              <label for="firstname"
                >Firstname <span class="required">*</span></label
              >
            </div>
            <div class="col-12 col-md-4 form-group">
              <input
                type="text"
                class="form-control input"
                v-model="firstTimersObj.firstName"
                name=""
                id="firstname"
                required
              />
            </div>
            <div class="col-md-4"></div>
          </div>

          <div class="row">
            <div class="col-12 col-md-4 text-md-right pr-0">
              <label for="">Surname</label>
            </div>
            <div class="col-12 col-md-4 form-group">
              <input
                type="text"
                class="form-control input"
                v-model="firstTimersObj.lastName"
                name=""
              />
            </div>
            <div class="col-md-4"></div>
          </div>

          <div class="row">
            <div class="col-12 col-md-4 text-md-right pr-0">
              <label for="">Phone number</label>
            </div>
            <div class="col-12 col-md-4 form-group">
              <input
                type="text"
                class="form-control input"
                v-model="firstTimersObj.phoneNumber"
              />
            </div>
            <div class="col-md-4"></div>
          </div>

          <div class="row select-elem">
            <div class="col-12 col-md-4 text-md-right pr-0">
              <label for=""></label>
            </div>
            <div class="col-12 col-md-4 form-group">
              <div class="row ">
                <div class="col-md-6 select-div">
                  <Dropdown
                    v-model="selectedMaritalStatus"
                    :options="maritalStatusArr"
                    optionLabel="value"
                    placeholder="Marital status"
                    style="width: 100%"
                  />
                </div>
                <div class="col-md-6 pl-0 select-div">
                  <Dropdown
                    v-model="selectedGender"
                    :options="genderArr"
                    optionLabel="value"
                    placeholder="Gender"
                    style="width: 100%"
                  />
                </div>
              </div>
            </div>
            <div class="col-md-4"></div>
          </div>

          <div class="row">
            <div class="col-12 col-md-4 text-md-right pr-0">
              <label for="">Email</label>
            </div>
            <div class="col-12 col-md-4 form-group">
              <input
                type="text"
                class="form-control input"
                v-model="firstTimersObj.email"
              />
            </div>
            <div class="col-md-4"></div>
          </div>

         
          <div class="row select-elem">
            <div class="col-md-4 text-md-right pr-0">
              <label for="">Event or service attended</label>
            </div>
            <div class="col-12 col-md-4 form-group">
              <Dropdown
                v-model="selectedEventAttended"
                :options="eventsAttended"
                optionLabel="name"
                :filter="true"
                filterPlaceholder="Find event"
                placeholder="Select from events and activities"
                style="width: 100%"
              />              
            </div>
            <div class="col-md-4"></div>
            
          </div>

          <div class="row">
            <div class="col-12 col-md-4 text-md-right pr-0">
              <label for="">Address</label>
            </div>
            <div class="col-12 col-md-4 form-group">
              <input
                type="text"
                class="form-control input"
                v-model="firstTimersObj.address"
              />
            </div>
            <div class="col-md-4"></div>
          </div>

        
          <div class="row select-elem">
            <div class="col-md-4 text-md-right pr-0">
              <label for="">Birthday</label>
            </div>
            <div class="col-12 col-md-4 form-group">
              <div class="row">
                <div class="col-md-4 w-100 form-group pt-0 select-div">
                  <Dropdown
                    v-model="firstTimersObj.birthday"
                    :options="day"
                    placeholder="Day"
                    style="width: 100%"
                  />
                </div>
                <div class="col-md-4 form-group px-0 select-div">
                  <Dropdown
                    v-model="firstTimersObj.birthMonth"
                    :options="month"
                    placeholder="Month"
                    style="width: 100%"
                  />
                </div>
                <div class="col-md-4 form-group select-div">
                  <Dropdown
                    v-model="firstTimersObj.birthYear"
                    :options="year"
                    placeholder="Year"
                    style="width: 100%"
                  />
                </div>
              </div>
            </div>
            <div class="col-md-4"></div>
          </div>
        </div>
      </div>

      <div class="row form-container">
        <div class="col-10 col-sm-12 offset-1 offset-sm-0">
          <div class="row">
            <div class="col-md-11">
              <span
                class="d-flex align-items-center justify-content-between follow-up-header"
              >
                <span class="sub-header">Insights: </span>
                <span class="hr-span" style="width: 80%; margin-top: 10px"
                  ><hr class="hr"
                /></span>
                <span
                  @click="toggleForm1"
                    ><i
                      class="fa fa-angle-up"
                      :class="{ roll1: showForm1 }"
                      aria-hidden="true"
                    ></i>
                  </span>
              </span>
            </div>
          </div>

          
          <div :class="{ 'slide-down1': showForm1 }">
          <div class="row select-elem first-row">
            <div class="col-12 col-md-4 text-md-right pr-0">
     
            </div>
            <div class="col-12 col-md-2 pr-0 form-group">
              <Dropdown
              class="drop-it"
                v-model="selectedAboutUsSource"
                :options="howDidYouAboutUs"
                optionLabel="name"
                placeholder="How you heard?"
                style="width: 100%;"
              />
            </div>
            <div class="col-12 col-md-2 form-group">
              <Dropdown
                v-model="selectedCommunicationMeans"
                :options="comMeansArr"
                placeholder=" Means of communication"
                style="width: 100%"
              />
            </div>
            <div class="col-md-4"></div>
          </div>

          <div class="row select-elem">
            <div class="col-12 col-md-4 text-md-right pr-0">

            </div>
      
            <div class="col-12 col-md-2 pr-0 form-group">
              <Dropdown
                v-model="selectedJoinInterest"
                :options="joinInterestArr"
                placeholder="Interested in joining us?"
                style="width: 100%"
              />
            </div>
            <div class="col-12 col-md-2 form-group">
              <Dropdown
                v-model="selectedVisitOption"
                :options="wantVisitArr"
                placeholder="Want to be visited?"
                style="width: 100%"
              />
            </div>
            <div class="col-md-4"></div>
          </div>

   
          <div class="row select-elem">
            <div class="col-12 col-md-4 text-md-right pr-0">
  
            </div>
  
            <div class="col-md-4"></div>
          </div>

          <div class="row select-elem">
            <div class="col-12 col-md-4 text-md-right pr-0">
 
            </div>

            <div class="col-md-4"></div>
          </div>
          </div>
        </div>
      </div>

      <div class="row form-container">
        <div class="offset-1 offset-md-0 col-10 col-md-12">
          <div class="row">
            <div class="col-md-11">
              <span
                class="d-flex align-items-center justify-content-between follow-up-header"
              >
                <span class="sub-header">Follow up and Retention: </span>
                <span
                  class="followup-hr-span"
                  style="width: 70%; margin-top: 10px"
                  ><hr class="hr"
                /></span>
              </span>
            </div>
          </div>

          <div class="row first-row">
            <div class="col-12 col-md-4 text-md-right pr-0">
              <label for=""></label>
            </div>
            <div class="col-12 col-md-4 form-group">
              <div class="row">
                <div class="col-6 form-group d-flex">
                  <label for="welcomeSms">Send welcome SMS</label>
                  <input
                    type="checkbox"
                    class="check-box"
                    name=""
                    v-model="firstTimersObj.sendWelcomeSMS"
                    id="welcomeSms"
                  />
                </div>
                <div class="col-6 form-group d-flex">
                  <label for="welcomeEmail">Send welcome email</label>
                  <input
                    type="checkbox"
                    checked
                    class="check-box"
                    name=""
                    v-model="firstTimersObj.sendWelcomeEmail"
                    id="welcomeEmail"
                  />
                </div>
              </div>
            </div>

            <div class="col-md-4"></div>
          </div>
          <div class="row">
            <div class="col-12 col-md-4 text-md-right pr-0 form-group">
              <label for="welcomeSms">Assigned automated follow-up</label>
            </div>
            <div class="col-12 col-md-4">
              <Dropdown
                v-model="selectedFollowUp"
                :options="['Option1', 'Option2']"
                placeholder="..."
                style="width: 100%"
              />
            </div>
          </div>
        </div>
      </div>

      <div class="row form-container">
        <div class="col-md-4"></div>
        <div class="col-md-4">
          <div class="row d-flex justify-content-between">
            <div class="col-xs-5 col-sm-5 my-2 pr-0">
              <button
                class="action-btn cancel-btn btn w-100"
                
                @click.prevent="onCancel"
              >
                Cancel
              </button>
            </div>
            <div class="col-xs-5 col-sm-5 my-2 mr-0 form-group">
              <button class="save-btn btn text-light w-100">
                <i
                  class="fas fa-circle-notch fa-spin mr-2 text-white"
                  v-if="loading"
                ></i>
                <span class="text-white">Save</span>
                <span></span>
              </button>
            </div>
          </div>
        </div>
        <div class="col-md-4"></div>
      </div>
    </div>
  </form> -->

  <div class="my-con" @click="closeManualModalIfOpen">
    <div class="header mt-2">
      <h3 class="header-text font-weight-bold">Add First timers</h3>
      <Toast />
    </div>

    <div class="form-div">
      <form @submit.prevent="onSubmit">
        <div class="bio-div mt-2">
          <p class="form-section-header">Bio:</p>
          <div class="bio-info">
            <div class="inputs">
              <div class="input-field">
                <label for="" class="label"
                  >Firstname<span style="color: red"> *</span></label
                >
                <input
                  type="text"
                  class="input"
                  v-model="firstTimersObj.firstName"
                  name=""
                  id="firstname"
                  required
                />
              </div>
              <div class="input-field">
                <label for="" class="label">Surname</label>
                <input
                  type="text"
                  class="input"
                  placeholder=""
                  v-model="firstTimersObj.lastName"
                  name=""
                />
              </div>
              <div class="input-field">
                <label for="" class="label">Phone number</label>
                <input
                  type="text"
                  class="input"
                  placeholder=""
                  v-model="firstTimersObj.phoneNumber"
                />
              </div>
              <div class="input-field">
                <label for=""></label>
                <div class="status-n-gender">
                  <div class="status cstm-select">
                    <div class="cs-select">
                      <Dropdown
                        v-model="selectedMaritalStatus"
                        :options="maritalStatusArr"
                        optionLabel="value"
                        placeholder="Marital status"
                        style="width: 100%"
                      />
                    </div>
                  </div>
                  <div class="gender cstm-select">
                    <div class="cs-select">
                      <Dropdown
                        v-model="selectedGender"
                        :options="genderArr"
                        optionLabel="value"
                        placeholder="Gender"
                        style="width: 100%"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div class="input-field">
                <label for="" class="label">Email</label>
                <input
                  type="text"
                  class="input"
                  placeholder=""
                  v-model="firstTimersObj.email"
                />
              </div>

              <!-- Test -->
              <div class="input-field">
                <label for="" class="label">Event or Service Attended</label>
                <i class="pi pi-chevron-down manual-dd-icon"></i>
                <!-- <input
                  type="text"
                  class="input dd"
                  placeholder=""
                  v-model="selectedEventAttended.name"
                  @click="selectEventAttended"
                  @keydown="preventTying"
                /> -->
                <button
                  @click.prevent="selectEventAttended"
                  class="form-control input dd"
                >
                  {{ selectedEventAttended.name }}
                  {{ newEvent.activity.date }}
                </button>
              </div>
              <div class="input-field manual-dd-con" v-if="showEventList">
                <div class="manual-dd dd">
                  <div
                    class="container-fluid dd dd-search-con"
                    v-if="eventsAttended.length > 5"
                  >
                    <div class="row dd">
                      <div class="col-md-12 dd px-0 py-1">
                        <input
                          type="text"
                          class="form-control dd dd-search-field"
                          v-model="eventsSearchString"
                          placeholder="search for event"
                        />
                      </div>
                    </div>
                  </div>

                  <div class="container-fluid dd-list-con">
                    <div class="row">
                      <div class="col-md-12">
                        <p
                          class="px-1 manual-dd-item mb-0 py-2 dd"
                          v-for="(event, index) in filteredEvents"
                          :key="index"
                          @click="eventAttendedSelected(event)"
                        >
                          {{ event.name }}
                        </p>
                        <p
                          class="text-center mb-1 mt-1"
                          v-if="
                            eventsSearchString &&
                            eventsAttended.length > 0 &&
                            filteredEvents.length === 0
                          "
                        >
                          No match found
                        </p>
                      </div>
                    </div>
                    <div class="row">
                      <div
                        class="col-md-12 py-2 px-0"
                        v-if="eventsAttended.length > 0"
                      >
                        <hr class="hr" />
                      </div>
                      <div class="col-md-12 create-event py-2 text-center">
                        <a
                          class="craete-event-btn font-weight-bold"
                          data-toggle="modal"
                          data-target="#eventModal"
                          >Create new event</a
                        >
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <!-- <div class="input-field">
                <label for="" class="label">Events or Service Attended</label>
                <div class="gender cstm-select">
                  <div class="cs-select" style="width: 330px">
                    <Dropdown
                      v-model="selectedEventAttended"
                      :options="eventsAttended"
                      optionLabel="name"
                      :filter="true"
                      filterPlaceholder="Find event"
                      placeholder="Select from events and activities"
                      style="width: 100%"
                    />
                  </div>
                </div>
              </div> -->
              <div class="input-field">
                <label for="" class="label">Address</label>
                <input
                  type="text"
                  class="input"
                  placeholder=""
                  v-model="firstTimersObj.address"
                />
              </div>

              <div class="input-field">
                <label for="" class="label">Birthday</label>
                <div class="status-n-gender">
                  <div class="date-picker">
                    <div class="cstm-select">
                      <div class="cs-select" style="width: 87px">
                        <Dropdown
                          v-model="firstTimersObj.birthday"
                          :options="day"
                          placeholder="Day"
                          style="width: 100%"
                        />
                        <!-- <SelectElem :typ="'membership'" name="birthday" :options="['Day', ...birthDaysArr ]" value="Day" @input="itemSelected"/> -->
                      </div>
                    </div>
                    <div class="cstm-select">
                      <div class="cs-select" style="width: 111px">
                        <Dropdown
                          v-model="birthMonth"
                          :options="month"
                          placeholder="Month"
                          style="width: 100%"
                        />
                      </div>
                    </div>

                    <div class="cstm-select">
                      <div class="cs-select" style="width: 113px">
                        <Dropdown
                          v-model="firstTimersObj.birthYear"
                          :options="year"
                          placeholder="Year"
                          style="width: 100%"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- <div class="image-div other">
              <div class="grey-bg">
                <div class="person-img">
                  <img
                    v-if="!url"
                    src="../../assets/people/phone-import.svg"
                    alt="Uploaded Image"
                  />
                  <img v-else :src="url" alt="Uploaded Image" />
                </div>
                <div>
                  <div class="cs-input">
                    <label for="imgUpload" class="choose-file">
                      Choose file
                      <input
                        type="file"
                        class="input file-input"
                        placeholder=""
                        id="imgUpload"
                        @change="imageSelected"
                      />
                    </label>
                  </div>
                </div>
                <div>
                  <button class="upload-btn" @click.prevent="uploadImage">
                    Upload
                  </button>
                </div>
              </div>
            </div> -->
          </div>
        </div>
        <!-- <hr class="hr"> -->

        <div class="">
          <span class="celeb-tab" @click="showCelebTab">
            <span class="tab-header">Insights:</span>
            <span class="h-rule"><hr class="hr" /></span>
            <span class="tb-icon-span"
              ><i
                class="fa fa-angle-down tbb-icon"
                :class="{ 'tb-icon': !hideCelebTab }"
              ></i
            ></span>
          </span>
          <div
            class="bio-info celeb-info"
            :class="{ 'hide-tab': hideCelebTab, 'show-tab': !hideCelebTab }"
          >
            <div class="inputs mt-3">
              <div class="input-field">
                <div class="gender cstm-select">
                  <div class="cs-select" style="width: 330px">
                    <Dropdown
                      v-model="selectedAboutUsSource"
                      :options="howDidYouAboutUs"
                      optionLabel="name"
                      placeholder="How did you hear about us?"
                      style="width: 100%"
                    />
                  </div>
                </div>
              </div>
              <div class="input-field">
                <!-- <label for="" class="label">Events or Service Attended</label> -->
                <div class="gender cstm-select">
                  <div class="cs-select" style="width: 330px">
                    <Dropdown
                      v-model="selectedCommunicationMeans"
                      :options="comMeansArr"
                      placeholder=" Means of communication"
                      style="width: 100%"
                    />
                  </div>
                </div>
              </div>
              <div class="input-field">
                <!-- <label for="" class="label">Events or Service Attended</label> -->
                <div class="gender cstm-select">
                  <div class="cs-select" style="width: 330px">
                    <Dropdown
                      v-model="selectedJoinInterest"
                      :options="joinInterestArr"
                      placeholder="Interested in joining us?"
                      style="width: 100%"
                    />
                  </div>
                </div>
              </div>
              <div class="input-field">
                <!-- <label for="" class="label">Events or Service Attended</label> -->
                <div class="gender cstm-select">
                  <div class="cs-select" style="width: 330px">
                    <Dropdown
                      v-model="selectedVisitOption"
                      :options="wantVisitArr"
                      placeholder="Want to be visited?"
                      style="width: 100%"
                    />
                  </div>
                </div>
              </div>

              <!-- <div class="input-field"> 
                <label for="" class="label">Wedding Anniversary</label>
                <div class="status-n-gender">
                  <div class="date-picker">
                    <div class="cstm-select">
                      <div class="cs-select" style="width: 111px">
                        <Dropdown
                         
                          :options="months"
                          placeholder="Month"
                          @change="
                            editAnnDateValue('month', person.monthOfWedding)
                          "
                          style="width: 100%"
                        />
                         <SelectElem :typ="'membership'" name="annmonth" :options="['Month', ...months]" value="Month" @input="itemSelected"/>
                      </div>
                    </div>

                    <div class="cstm-select">
                      <div class="cs-select" style="width: 87px">
                        <Dropdown
                        
                          :options="annDaysArr"
                          placeholder="Day"
                          style="width: 100%"
                        />
                        
                      </div>
                    </div>

                    <div class="cstm-select">
                      <div class="cs-select" style="width: 113px">
                        <Dropdown
                       
                          :options="birthYearsArr"
                          placeholder="Year"
                          style="width: 100%"
                        />
                        
                      </div>
                    </div>
                  </div>
                </div>
              </div> -->
            </div>

            <div class="image-div other">
              <!-- Empty space -->
            </div>
          </div>
        </div>
        <div class="">
          <span class="celeb-tab" @click="showAddInfoTab">
            <span class="tab-header">Follow up and Retention:</span>
            <span class="h-rule"><hr class="hr" /></span>
            <span class="tb-icon-span"
              ><i
                class="fa fa-angle-down tbb-icon"
                :class="{ 'tb-icon': !hideAddInfoTab }"
              ></i
            ></span>
          </span>
          <div
            class="bio-info"
            :class="{
              'hide-tab': hideAddInfoTab,
              'show-occ-tab': !hideAddInfoTab,
            }"
          >
            <div class="inputs mt-3">
              <div class="input-field">
                <span class="">
                  <label for="welcomeSms">Send welcome SMS</label>
                  <input
                    type="checkbox"
                    class="check-box"
                    name=""
                    v-model="firstTimersObj.sendWelcomeSMS"
                    id="welcomeSms"
                  />
                </span>

                <label for="welcomeEmail">Send welcome email</label>
                <input
                  type="checkbox"
                  checked
                  class="check-box"
                  name=""
                  v-model="firstTimersObj.sendWelcomeEmail"
                  id="welcomeEmail"
                />
              </div>

              <div class="input-field">
                <!-- <label for="" class="label">Age</label> -->
                <div class="cstm-select search-box">
                  <div class="cs-select" style="width: 330px">
                    <Dropdown
                      v-model="selectedFollowUp"
                      :options="['Option1', 'Option2']"
                      placeholder="Assigned automated follow-up"
                      style="width: 100%"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div class="image-div other"></div>
          </div>
        </div>

        <!-- <div
          class="add-info--con"
          :class="{
            'hide-tab': hideAddInfoTab,
            'show-addinfo-tab': !hideAddInfoTab,
          }"
        >
          <div class="label-text-box">
            <p>Related information</p>
            <small
              >Including small groups and cell/house fellowship
              membership</small
            >
          </div>
          <div class="info-box">
            <div class="nav-bar">
              <div
                class="groups box"
                @click.prevent="() => (areaInView = 'groups')"
                :class="{ 'white-bg': areaInView === 'groups' }"
              >
                <a class="tab">Groups</a>
              </div>
              <div
                class="house-fel box"
                @click.prevent="() => (areaInView = 'fellowship')"
                :class="{ 'white-bg': areaInView === 'fellowship' }"
              >
                <a class="tab">House fellowship</a>
              </div>
              <div
                class="notes box"
                @click.prevent="() => (areaInView = 'notes')"
                :class="{ 'white-bg': areaInView === 'notes' }"
              >
                <a class="tab">Notes</a>
              </div>
              <div
                class="follow-up box"
                @click.prevent="() => (areaInView = 'followup')"
                :class="{ 'white-bg': areaInView === 'followup' }"
              >
                <a class="tab">Follow-up</a>
              </div>
            </div>
            <div class="info-box-body">
              <button
                @click.prevent="uploadImage"
                class="info-btn"
                v-if="areaInView === 'groups'"
              >
                Add to Group
              </button>
              <button
                @click.prevent="uploadImage"
                class="info-btn"
                v-if="areaInView === 'fellowship'"
              >
                Add to House fellowship
              </button>
              <button
                @click.prevent="uploadImage"
                class="info-btn"
                v-if="areaInView === 'notes'"
              >
                New Notes
              </button>
            </div>
          </div>
        </div> -->

        <div class="error-div">
          <p v-if="!loading">{{ errMessage }}</p>
        </div>
        <div class="inputs">
          <div class="submit-div">
            <button class="action-btn cancel-btn btn" @click.prevent="onCancel">
              Cancel
            </button>

            <button
              class="submit-btn ml-5 outline-none"
              :class="{ 'btn-loading': loading }"
              :disabled="loading"
            >
              <i
                class="fas fa-circle-notch fa-spin mr-2 text-white"
                v-if="loading"
              ></i>
              <span class="text-white">Save</span>
              <span></span>
            </button>
          </div>
        </div>

        <div class="container">
          <div class="row">
            <div class="col-md-12 py-4">
              <div
                class="modal fade"
                id="eventModal"
                tabindex="-1"
                role="dialog"
                aria-labelledby="eventModalLabel"
                aria-hidden="true"
              >
                <div class="modal-dialog" role="document">
                  <div class="modal-content py-2 px-2">
                    <div class="modal-header">
                      <h5
                        class="modal-title font-weight-bold"
                        id="exampleModalLabel"
                      >
                        Create New Event
                      </h5>
                      <button
                        type="button"
                        class="close"
                        data-dismiss="modal"
                        aria-label="Close"
                      >
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div class="modal-body new-event-modal">
                      <div class="row my-4">
                        <div class="col-md-4 text-md-right align-self-center">
                          <label for="" class="label font-weight-bold"
                            >Event name</label
                          >
                        </div>
                        <div class="col-md-7">
                          <!-- <Dropdown
                            v-model="selectedVisitOption"
                            :options="eventName"
                             placeholder="Select Event" 
                             :filter="true" 
                             filterPlaceholder="Search..."
                            style="width: 100%"
                          /> -->
                          <!-- <select class="form-control select-dropdown">
                            <option>Select Event</option>
                            <option v-for="event in newEvents" :key="event.id" class="create-option">{{ event.name }}</option>
                            <option class="create-new-event text-center">Create new event</option>
                          </select> -->
                          <!-- <input
                                        type="text"
                                        class="form-control"
                                        v-model="newEvent.activity.newEventCategoryName"
                                      /> -->
                          <div
                            class="select-elem-con pointer d-flex justify-content-space-between"
                            @click="showCategory = !showCategory"
                          >
                            <span class="ofering">{{ selectEvent }}</span
                            ><span>
                              <i
                                class="pi pi-angle-down"
                                :class="{ roll3: showForm3 }"
                                aria-hidden="true"
                              ></i
                            ></span>
                          </div>
                          <div
                            class="ofering"
                            :class="{ 'style-category': showCategory }"
                            v-if="showCategory"
                          >
                            <input
                              type="text"
                              placeholder="Search..."
                              class="form-control ofering mb-3"
                              v-model="eventText"
                            />
                            <div
                              v-for="(
                                eventCategory, index
                              ) in filterEventCategory"
                              :key="index"
                              class="ofering"
                            >
                              <div
                                class="ofering py-1"
                                @click="individualEvent(eventCategory)"
                              >
                                {{ eventCategory.name }}
                              </div>
                            </div>
                            <div
                              v-if="filterEventCategory.length >= 1"
                              @click="openModal"
                              class="create cat ofering"
                            >
                              Add New Event
                            </div>
                            <div
                              v-else
                              class="create mt-3"
                              @click="createNewCat(1)"
                            >
                              Create "{{ eventText }}" event
                            </div>
                          </div>

                          <!-- <Button label="Show" icon="pi pi-external-link" @click="openModal" /> -->
                          <Dialog
                            header="Add New Event"
                            v-model:visible="displayModal"
                            :style="{ width: '50vw' }"
                            :modal="true"
                          >
                            <div class="row">
                              <div class="col-sm-3 align-self-center">
                                Event Name
                              </div>
                              <div class="col-sm-9">
                                <input
                                  type="text"
                                  class="form-control"
                                  v-model="newEventCategoryName"
                                />
                              </div>
                            </div>
                            <template #footer>
                              <!-- <Button label="No" icon="pi pi-times" @click="closeModal" class="p-button-text"/>
                                        <Button label="Yes" icon="pi pi-check" @click="closeModal" autofocus /> -->
                              <div
                                class="col-md-12 d-md-flex justify-content-end p-0"
                              >
                                <button
                                  type="button"
                                  class="btn secondary-btn px-4"
                                  @click="closeModal"
                                >
                                  Close
                                </button>
                                <button
                                  type="button"
                                  class="btn primary-btn px-4 mr-0 text-white"
                                  @click="createNewCat(2)"
                                >
                                  Save
                                </button>
                              </div>
                            </template>
                          </Dialog>
                        </div>
                      </div>
                      <div class="row mt-4 mb-4">
                        <div class="col-md-4 text-md-right align-self-center">
                          <label for="" class="label font-weight-bold"
                            >Event date</label
                          >
                        </div>
                        <div class="col-md-7">
                          <input
                            type="date"
                            class="form-control"
                            v-model="newEvent.activity.date"
                          />
                        </div>
                      </div>
                    </div>
                    <div class="modal-footer">
                      <div class="container">
                        <div class="row">
                          <div class="col-md-4"></div>
                          <div class="col-md-7">
                            <div class="row">
                              <div class="col-md-12 text-md-right">
                                <p
                                  class="mb-1 text-danger"
                                  v-if="invalidEventDetails"
                                >
                                  Enter event name and date
                                </p>
                              </div>
                              <div
                                class="col-md-12 d-md-flex justify-content-end"
                              >
                                <button
                                  type="button"
                                  class="btn secondary-btn px-4"
                                  data-dismiss="modal"
                                >
                                  Close
                                </button>
                                <button
                                  type="button"
                                  class="btn primary-btn px-4 text-white"
                                  data-dismiss="modal"
                                  @click="createNewEvent"
                                >
                                  Save
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
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, computed } from "vue";
import axios from "@/gateway/backendapi";
import router from "@/router/index";
import Dropdown from "primevue/dropdown";
import { useRoute } from "vue-router";
import { useToast } from "primevue/usetoast";
import Dialog from "primevue/dialog";

export default {
  components: { Dropdown, Dialog },

  setup() {
    // const $toast = getCurrentInstance().ctx.$toast;
    const toast = useToast();

    const showEventList = ref(false);
    const selectEventAttended = () => {
      showEventList.value = !showEventList.value;
    };
    const showError = ref(false);
    const newEvents = ref([]);

    const preventTying = (e) => {
      e.preventDefault();
    };

    const day = ref([
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      10,
      11,
      12,
      13,
      14,
      15,
      16,
      17,
      18,
      19,
      20,
      22,
      23,
      24,
      25,
      26,
      27,
      28,
      29,
      30,
      31,
    ]);
    const month = ref([
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ]);
    const maritalStatusArr = ref([]);
    const selectedMaritalStatus = ref(null);

    const genderArr = ref([]);
    const selectedGender = ref(null);

    const comMeansArr = ref(["Call", "Email", "Visit", "SMS"]);
    const selectedCommunicationMeans = ref(null);

    const joinInterestArr = ref(["Yes", "No", "Maybe", "On Transit"]);
    const selectedJoinInterest = ref(null);

    const wantVisitArr = ref(["Yes", "No", "Maybe", "On Transit"]);
    const selectedVisitOption = ref(null);

    const eventsAttended = ref([]);
    const selectedEventAttended = ref({});

    const howDidYouAboutUs = ref([]);
    const selectedAboutUsSource = ref(null);

    const selectedFollowUp = ref(null);

    const firstTimersObj = ref({
      // howDidYouAboutUsId: selectedAboutUsSource.id,
      // maritalStatusId: "00000000-0000-0000-0000-000000000000",
      // genderId: "00000000-0000-0000-0000-000000000000",
      // maritalStatusId: "00000000-0000-0000-0000-000000000000",
      // maritalStatusId: "00000000-0000-0000-0000-000000000000",
      sendWelcomeSMS: false,
      sendWelcomeEmail: true,
    });

    const eventName = computed(() => {
      return newEvents.value.map((i) => i.name);
    });

    const showCategory = ref(false);
    const eventText = ref("");
    const displayModal = ref(false);
    const selectEvent = ref("Select Event");

    const filterEventCategory = computed(() => {
      // let x;
      let arr = [];
      if (newEvents.value.length > 0) {
        console.log(newEvents.value, "new events");
        arr = newEvents.value.filter((i) => {
          return i.name.toLowerCase().includes(eventText.value.toLowerCase());
        });
      } else {
        return newEvents.value;
      }
      return arr;
    });

    const openModal = () => {
      displayModal.value = true;
    };

    const closeModal = () => {
      displayModal.value = false;
    };

    const newEventCategoryName = ref("");

    const individualEvent = (obj) => {
      selectEvent.value = obj.name;
      newEvent.value.activity.eventCategoryId = obj.id;
      showCategory.value = false;
      console.log(obj);
    };

    const birthMonth = ref(null);

    // const birthMonth = ref(null)

    const hideCelebTab = ref(true);
    const hideAddInfoTab = ref(true);
    const showCelebTab = () => (hideCelebTab.value = !hideCelebTab.value);
    const showAddInfoTab = () => (hideAddInfoTab.value = !hideAddInfoTab.value);

    const loading = ref(false);

    const onSubmit = async () => {
      // firstTimersObj.value.followUpTypeId =
      //   "00000000-0000-0000-0000-000000000000";
      firstTimersObj.value.genderId = selectedGender.value
        ? selectedGender.value.id
        : 0;
      firstTimersObj.value.maritalStatusId = selectedMaritalStatus.value
        ? selectedMaritalStatus.value.id
        : 0;
      firstTimersObj.value.activityID = selectedEventAttended.value
        ? selectedEventAttended.value.activityID
        : "00000000-0000-0000-0000-000000000000";
      firstTimersObj.value.howDidYouAboutUsId = selectedAboutUsSource.value
        ? selectedAboutUsSource.value.id
        : "00000000-0000-0000-0000-000000000000";
      firstTimersObj.value.communicationMeans = selectedCommunicationMeans.value
        ? comMeansArr.value.indexOf(selectedCommunicationMeans.value) + 1
        : 0;
      firstTimersObj.value.interestedInJoining = selectedJoinInterest.value
        ? joinInterestArr.value.indexOf(selectedJoinInterest.value) + 1
        : 0;
      firstTimersObj.value.wantToBeVisited = selectedVisitOption.value
        ? wantVisitArr.value.indexOf(selectedVisitOption.value) + 1
        : 0;
      // console.log(selectedAboutUsSource.value.id)
      switch (birthMonth.value) {
        case "January":
          firstTimersObj.value.birthMonth = "1";
          break;
        case "February":
          firstTimersObj.value.birthMonth = "2";
          break;
        case "March":
          firstTimersObj.value.birthMonth = "3";
          break;
        case "April":
          firstTimersObj.value.birthMonth = "4";
          break;
        case "May":
          firstTimersObj.value.birthMonth = "5";
          break;
        case "June":
          firstTimersObj.value.birthMonth = "6";
          break;
        case "July":
          firstTimersObj.value.birthMonth = "7";
          break;
        case "August":
          firstTimersObj.value.birthMonth = "8";
          break;
        case "September":
          firstTimersObj.value.birthMonth = "9";
          break;
        case "October":
          firstTimersObj.value.birthMonth = "10";
          break;
        case "November":
          firstTimersObj.value.birthMonth = "11";
          break;
        case "December":
          firstTimersObj.value.birthMonth = "12";
          break;
        default:
          // firstTimersObj.value.birthMonth = "12";
          console.log("No month chosen");
          break;
      }

      console.log(birthMonth.value);

      console.log(firstTimersObj.value);
      loading.value = true;

      if (route.params.firstTimerId) {
        let updateMember = {
          firstName: firstTimersObj.value.firstName,
          lastName: firstTimersObj.value.lastName,
          phoneNumber: firstTimersObj.value.phoneNumber,
          email: firstTimersObj.value.email,
          // maritalStatusId: firstTimersObj.value.maritalStatusId,
          // genderId: firstTimersObj.value.genderId,
          activityID: firstTimersObj.value.activityID,
          address: firstTimersObj.value.address,
          birthday: firstTimersObj.value.birthday,
          birthMonth: firstTimersObj.value.birthMonth,
          birthYear: firstTimersObj.value.birthYear,
          howDidYouAboutUsId: firstTimersObj.value.howDidYouAboutUsId,
          communicationMeans: firstTimersObj.value.communicationMeans,
          interestedInJoining: firstTimersObj.value.interestedInJoining,
          wantsToBeVisited: firstTimersObj.value.wantToBeVisited,
          personId: firstTimersObj.value.personId,
          sendWelcomeEmail: firstTimersObj.value.sendWelcomeEmail,
          sendWelcomeSMS: firstTimersObj.value.sendWelcomeSMS,
        };

        if (firstTimersObj.value.genderId)
          updateMember.genderId = firstTimersObj.value.genderId;
        if (firstTimersObj.value.maritalStatusId)
          updateMember.maritalStatusId = firstTimersObj.value.maritalStatusId;

        try {
          loading.value = true;
          const response = await axios.put(
            `/api/People/EditFirstTimer`,
            // {firstName: "Baba", personId: firstTimersObj.value.personId}
            updateMember
            // firstTimersObj.value
          );

          if (response.status === 200 || response.status === 201) {
            loading.value = false;
            router.push("/tenant/firsttimerslist");
            console.log(firstTimersObj);
            toast.add({
              severity: "success",
              summary: "Update Succesful",
              detail: "Update operation was succesful",
              life: 2500,
            });
          }
        } catch (err) {
          loading.value = false;
          NProgress.done();
          if (err.toString().toLowerCase().includes("network error")) {
            toast.add({
              severity: "warn",
              summary: "You 're Offline",
              detail: "Please ensure you have internet access",
              life: 2500,
            });
          } else {
            showError.value = true;
            toast.add({
              severity: "error",
              summary: "Update Failed",
              detail:
                err.response && err.response.data.messsage
                  ? err.response.data.messsage
                  : "Update operation was not succesful",
              life: 2500,
            });
          }
          showError.value = true;
          console.log(err.response);
        }
      } else {
        axios
          .post("/api/people/firsttimer", firstTimersObj.value)
          .then((res) => {
            // NProgress.done();
            console.log(res.data);
            loading.value = false;
            // toast.show(`Saving successful`, {
            //   position: "top-right",
            //   type: "success",
            // });
            router.push("/tenant/firsttimerslist");
          })
          .catch((err) => {
            // NProgress.done();
            loading.value = false;
            // toast.show(`Saving failed`, {
            //   position: "top-right",
            //   type: "error",
            // });
            console.log(err);
          });
      }
    };

    const onCancel = () => {
      router.back();
    };

    const closeManualModalIfOpen = (e) => {
      if (!e.target.classList.contains("dd")) {
        showEventList.value = false;
        eventsSearchString.value = "";
      }
    };

    const eventsSearchString = ref("");
    const filteredEvents = computed(() => {
      if (!eventsSearchString.value) return eventsAttended.value;
      return eventsAttended.value.filter((i) =>
        i.name.includes(eventsSearchString.value)
      );
    });

    const eventAttendedSelected = (eventObj) => {
      console.log(eventObj);
      selectedEventAttended.value = eventObj;
      showEventList.value = false;
      eventsSearchString.value = "";
    };

    const newEvent = ref({
      activity: {},
    });

    const invalidEventDetails = ref(false);
    const savingNewEvent = ref(false);
    const firstTimer = ref({});

    const createNewCat = async (eventParams) => {
      try {
        let data;
        const theText =
          eventParams === 1 ? eventText.value : newEventCategoryName.value;
        data = await axios.post(`/api/EventCategory?name=${theText}`);
        console.log(data.data);
        newEvents.value = data.data;

        toast.add({
          severity: "success",
          summary: "Event created",
          detail: "Your new event was created successfully",
          life: 2500,
        });
      } catch (error) {
        toast.add({
          severity: "error",
          summary: "Opps! Sorry Try again",
          detail: error.response.data,
          life: 2500,
        });
      }
      displayModal.value = false;
      console.log(newEventCategoryName.value);
      newEventCategoryName.value = "";
    };

    const createNewEvent = async () => {
      // console.log(eventsAttended.value);
      invalidEventDetails.value = false;
      if (newEvent.value.activity.date) {
        try {
          savingNewEvent.value = true;
          console.log(newEvent.value);
          const { data } = await axios.post(
            "/api/Events/CreateActivity",
            newEvent.value
          );
          console.log(data);
          selectedEventAttended.value.activityID = data.currentEvent.id;
          selectedEventAttended.value.name = data.currentEvent.name
            ? data.currentEvent.name
            : "New event selected";
          // console.log(selectedEventAttended, "SAE");

          toast.add({
            severity: "success",
            summary: "Event created",
            detail: "Your new event was created successfully",
            life: 2500,
          });
          // newEvent.value.date = "";
          // newEvent.value.preEvent.name = "";

          console.log(data, "data");
        } catch (error) {
          if (error.response.data == "An Event with this name already exist") {
            toast.add({
              severity: "error",
              summary: "Event exist already",
              detail: error.response.data,
              life: 2500,
            });
          }
          /*eslint no-undef: "warn"*/
          NProgress.done();
          savingNewEvent.value = false;
          console.log(error.response);
        }
      } else {
        invalidEventDetails.value = true;
      }

      displayModal.value = false;
    };
    const route = useRoute();

    onMounted(() => {
      axios.get("/api/Events/EventActivity").then((res) => {
        eventsAttended.value = res.data;
      });

      axios.get("/api/EventCategory").then((res) => {
        newEvents.value = res.data.map((i) => {
          return { id: i.id, name: i.name };
        });
      });

      axios
        .get("/api/LookUp/GetAllLookUps")
        .then((res) => {
          // console.log(res.data, 'all lkups')
          res.data.find((i) => {
            if (i.type.toLowerCase() === "gender") {
              genderArr.value = i.lookUps;
              console.log(genderArr.value);
            }
            if (i.type.toLowerCase() === "maritalstatus") {
              maritalStatusArr.value = i.lookUps;
            }
          });
        })
        .catch((err) => {
          if (err.response && err.response.status === 401) {
            localStorage.setItem("token", "");
            router.push("/");
          }
        });

      axios.get("/api/membership/howyouheardaboutus").then((res) => {
        howDidYouAboutUs.value = res.data.map((i) => {
          return { name: i.name, id: i.id };
        });
        // console.log(res.data)
      });

      console.log(route.params.firstTimerId);
      if (route.params.firstTimerId) {
        axios
          .get(`/api/People/firstTimer/${route.params.firstTimerId}`)
          .then((res) => {
            console.log(res.data, "DFGHG");
            firstTimersObj.value = res.data;
          });
      }
    });

    const year = computed(() => {
      const arrOfYears = [];
      let currentYear = new Date().getFullYear();
      while (arrOfYears.length <= 100) {
        arrOfYears.push(currentYear);
        currentYear = currentYear - 1;
      }
      return arrOfYears;
    });

    return {
      onSubmit,
      onCancel,
      firstTimersObj,
      day,
      month,
      year,
      maritalStatusArr,
      genderArr,
      eventsAttended,
      howDidYouAboutUs,
      joinInterestArr,
      wantVisitArr,
      comMeansArr,
      loading,
      selectedGender,
      selectedMaritalStatus,
      selectedEventAttended,
      selectedAboutUsSource,
      selectedCommunicationMeans,
      selectedJoinInterest,
      selectedVisitOption,
      selectedFollowUp,
      hideCelebTab,
      showCelebTab,
      showAddInfoTab,
      hideAddInfoTab,
      birthMonth,
      showEventList,
      selectEventAttended,
      closeManualModalIfOpen,
      filteredEvents,
      eventsSearchString,
      eventAttendedSelected,
      preventTying,
      newEvent,
      createNewEvent,
      invalidEventDetails,
      savingNewEvent,
      route,
      firstTimer,
      showError,
      newEvents,
      eventName,
      showCategory,
      filterEventCategory,
      eventText,
      displayModal,
      openModal,
      closeModal,
      createNewCat,
      newEventCategoryName,
      selectEvent,
      individualEvent,
    };
  },
};
</script>

<style scoped>
* {
  box-sizing: border-box;
  color: #02172e;
}

.show-tab {
  transition: all 0.5s ease-in-out;
  height: 200px;
}

.show-occ-tab {
  transition: all 0.5s ease-in-out;
  height: 100px;
}

.submit-div {
  margin-left: 18em;
}

.inputs {
  width: 70%;
}

.manual-dd-con {
  position: relative;
}

.manual-dd {
  width: 330px;
  border: 1px solid #b9c5cf;
  position: absolute;
  background: white;
  z-index: 2;
  top: -13px;
  margin-right: 0.5rem;
  box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.2), 0 4px 5px 0 rgba(0, 0, 0, 0.14),
    0 1px 10px 0 rgba(0, 0, 0, 0.12);
  max-height: 400px;
  overflow: auto;
}

.manual-dd::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.manual-dd {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}

.manual-dd-item {
  color: #495057;
}

.manual-dd-item:hover {
  background: #e9ecef;
  cursor: pointer;
}

.dd-search-field {
  border-radius: 20px;
}

.create-event a {
  color: #136acd !important;
  text-decoration: none;
}

.create-new-event {
  text-align: center;
  font: normal normal bold 16px/22px Nunito Sans;
  letter-spacing: 0px;
  color: #136acd;
}

.create-event a:hover {
  cursor: pointer;
  padding: 8px;
}

.create {
  text-align: center;
  font: normal normal bold 16px/22px Nunito Sans;
  letter-spacing: 0px;
  color: #136acd;
}

/* .select-dropdown option{
  padding: 20px 10px;
  border: none
}

.select-dropdown option:hover{
  background: rgb(162, 197, 238)
} */

.select-elem-con {
  padding: 5px 10px;
  border: 1px solid #ced4da;
  border-radius: 4px;
  justify-content: space-between;
}

.pointer {
  cursor: pointer;
}

.style-category {
  padding: 10px;
  box-shadow: 0px 3px 15px #797e8159;
  position: absolute;
  /* top: 10px; */
  background: white;
  z-index: 1;
  width: 80%;
  max-height: 20em;
  overflow-y: scroll;
}
.style-category div:hover {
  background-color: #ecf0f3;
  cursor: pointer;
}

.cat {
  padding: 5px;
  border-top: 1px solid #ecf0f3;
}

.form-control.input.dd {
  text-align: left;
}

.manual-dd-icon {
  position: absolute;
  margin-right: 1rem;
}

.dd-search-con {
  max-height: 40px;
}

.dd-list-con {
  max-height: 360px;
  overflow: auto;
}

.modal-footer {
  border-top: none !important;
}

@media (max-width: 620px) {
  .submit-div {
    margin-left: 1em;
  }
}

@media (min-width: 621px) and (max-width: 900px) {
  .submit-div {
    margin-left: 9em;
  }
}

.page-header {
  margin-bottom: 21px;
  margin-top: 15px;
}

.page-header h2 {
  color: #02172e;
  font-weight: 800;
  font-size: 30px;
}

.sub-header {
  color: #002044;
  font-size: 20px;
  font-weight: 700;
}

.form-container {
  margin-bottom: 44px;
}

.input {
  height: 40px;
  border: 1px solid #b9c5cf;
}

.first-row {
  margin-top: 10px;
}

.day-inp {
  border-radius: 8px 0 0 8px;
}

.month-inp {
  border-radius: 0;
}

.year-inp {
  border-radius: 0 8px 8px 0;
}

/* .select-elem {
  height: 50px !important;
} */

#welcomeSms,
#welcomeEmail {
  margin-top: 6px;
  margin-left: 10px;
}

.check-box {
  width: 1.2em;
  height: 1em;
  background-color: white;
  border-radius: 50%;
  vertical-align: middle;
  border: 1px solid #b9c5cf;
  -webkit-appearance: none;
  outline: none;
  cursor: pointer;
}

.action-btn {
  background: #fff;
  border: 1px solid #002044;
  border-radius: 22px;
  width: 104px;
  /* height: 49px; */
  outline: transparent;
}

.save-btn {
  background: #136acd;
  border: none;
  outline: transparent;
  /* padding: 8px 10px; */
  /* color: #fff; */
  /* width: 40px; */
  /* min-width: 104px; */
  color: #fff;
  font-size: 16px;
  border-radius: 22px;
}

.drop-it.placeholder {
  /* Chrome/Opera/Safari */
  /* color: pink; */
  border: 2px solid red;
}

template.p-dropdown-parent {
  border: 2px solid red;
}

.roll1 {
  transition: all 0.5s ease-in-out;
  transform: rotate(180deg);
}

.slide-down1 {
  height: 200px;
  transition: all 0.5s ease-in-out;
}
.close-slide1 {
  height: 0;
  overflow: hidden;
  transition: all 0.5s ease-in-out;
}

.required {
  color: #ef0535;
}

.modal-body.new-event-modal {
  padding: 0;
}

@media screen and (max-width: 767px) {
  .select-elem {
    height: auto !important;
  }

  .select-div {
    padding: 0.8rem !important;
  }
}

.check-box:checked {
  background-color: #0f529f;
}

@media screen and (max-width: 770px) {
  .follow-up-header {
    flex-direction: column;
    justify-content: flex-start;
  }

  .followup-hr-span,
  .hr-span {
    width: 100% !important;
  }

  .sub-header {
    width: 100%;
  }
}

@media screen and (min-width: 770px) and (max-width: 1190px) {
  .followup-hr-span {
    width: 60% !important;
  }
}

@media (min-width: 576px) {
  .modal-dialog {
    max-width: 650px;
    margin: 1.75rem auto;
    /* padding: 32px; */
  }
}
</style>
