<template>
  <div class="head-text">
    <div>Add First Timers</div>
  </div>
  <div class="my-con container-top" @click="closeManualModalIfOpen">
    <!-- <div class="header mt-2">
      <h3 class="header-text font-weight-bold">Add First timers</h3>
      <Toast />
    </div> -->

    <el-container>
      <el-row :gutter="15" class="w-100 m-0">
        <el-col class="d-block d-md-none">
          <!-- <div class="grey-bg">
            <div v-if="routeParams">
              <div class="person-img">
                <img v-if="!memberToEdit.pictureUrl" src="../../assets/people/phone-import.svg" alt="Uploaded Image" />
                <img v-else :src="memberToEdit.pictureUrl" alt="Uploaded Image"
                  style="width: 110px; height: 110px; border-radius: 50%; object-fit: cover" />
              </div>
            </div>
            <div v-else>
              <div class="person-img">
                <img v-if="!url" src="../../assets/people/phone-import.svg" alt="Uploaded Image" />
                <img v-else :src="url" alt="Uploaded Image"
                  style="width: 110px; height: 110px; border-radius: 50%; object-fit: cover" />
              </div>
            </div>
            <div>
              <div class="cs-input">
                <label for="imgUpload" class="choose-file">
                  Choose file
                  <input type="file" class="input file-input" placeholder="" id="imgUpload" @change="imageSelected" />
                </label>
              </div>
            </div>
          </div> -->
        </el-col>
        <el-col :sm="16" :md="16" :lg="16" :xl="16" class="p-0">
          <el-form :model="firstTimerObj" ref="ruleForm" :rules="validateRules" style="width: 100%">
            <!-- <el-form-item>
              <div class="d-flex flex-column flex-lg-row justify-content-end w-100">
                <label for="firstName" class="mr-3">Membership</label>
                <el-select-v2 v-model="memberClassificationId" @change="setSelectedMem"
                  :options="memberships.map(i => ({ label: i.name, value: i.id }))" placeholder="--Select membership--"
                  size="large" class="input-width" />
              </div>
            </el-form-item> -->
            <el-form-item>
              <div class="d-flex flex-column flex-lg-row justify-content-end w-100">
                <label for="firstName" class="mr-3">Firstname<span style="color: red"> *</span></label>
                <el-input type="text" class="input-width" v-model="firstTimersObj.firstName" placeholder="First name" />
              </div>
            </el-form-item>
            <el-form-item>
              <div class="d-flex flex-column flex-lg-row justify-content-end w-100">
                <label for="firstName" class="mr-3">Surname</label>
                <el-input type="text" class="input-width" v-model="firstTimersObj.lastName" placeholder="Last name" />
              </div>
            </el-form-item>
            <el-form-item prop="phoneNumber" class="validate-phone">
              <div class="d-flex flex-column flex-lg-row justify-content-end w-100">
                <label for="firstName" class="mr-3">Phone number</label>
                <el-input type="text" ref="validatePhone" @blur="checkForDuplicatePhone" class="input-width"
                  v-model="firstTimersObj.phoneNumber" placeholder="Phone number" />
              </div>
            </el-form-item>
            <el-form-item prop="email" class="validate-email">
              <div class="d-flex flex-column flex-lg-row justify-content-end w-100">
                <label for="firstName" class="mr-3">Email</label>
                <el-input type="text" class="input-width" v-model="firstTimersObj.email" placeholder="Email" />
              </div>
            </el-form-item>
            <!-- ref="validateEmail" @blur="checkForDuplicateEmail" -->
            <!--  <el-form-item>
               <div class="d-flex flex-column flex-lg-row justify-content-end w-100">
                <label for="firstName" class="mr-3">Address</label>
                <el-input type="text" class="input-width" v-model="person.address" placeholder="Address" />
              </div>
            </el-form-item>
            <el-form-item>
              <div class="d-flex flex-column flex-lg-row justify-content-end w-100">
                <label for="firstName" class="mr-3">Person to follow-up</label>
                <div class="input-width">
                  <SearchMembers @memberdetail="setContact" :currentMember="currentContact" />
                </div>
              </div>
            </el-form-item> -->
            <el-form-item>
              <div class="d-flex flex-column flex-lg-row justify-content-end w-100">
                <div class="input-width d-flex">
                  <el-select-v2 v-model="maritalStatusId" @change="setSelectedMaritalStatus"
                  :options="maritalStatusArr.map(i => ({ label: i.value, value: i.id }))" placeholder="Marital status"
                  size="large" class="w-100 mr-1" />
                  <el-select-v2 v-model="genderId" @change="setSelectedGender"
                  :options="genderArr && genderArr.length > 0 ? genderArr.map(i => ({ label: i.value, value: i.id })) : []"
                  placeholder="Gender" size="large" class="w-100 ml-1" />
                </div>
              </div>
            </el-form-item>
            <el-form-item>
              <div class="d-flex flex-column flex-lg-row justify-content-end w-100">
                <label for="firstName" class="mr-3">Event or service attended</label>
                <div class="input-width">
                  <el-dropdown class="w-100" trigger="click">
                    <el-input class="w-100" v-model="selectedEventAttended.name"></el-input>
                    <!-- <el-button class="w-100" size="large" color="#E3E5EB" plain>
                      Dropdown List<el-icon class="el-icon--right"><arrow-down /></el-icon>
                    </el-button> -->
                    <template #dropdown>
                      <el-dropdown-menu class="menu-height">
                        <el-dropdown-item v-for="(event, index) in filteredEvents" :key="index" @click="eventAttendedSelected(event)">{{ event.name }}</el-dropdown-item>
                        <el-dropdown-item class="primary--text" data-toggle="modal" data-target="#eventModal" divided><el-icon><CirclePlus /></el-icon> Create new event</el-dropdown-item>
                      </el-dropdown-menu>
                    </template>
                  </el-dropdown>
                </div>
              </div>
            </el-form-item>
            <!-- <div class="d-flex align-items-center">
              <div class="font-weight-700">Celebrations </div>
              <el-divider>
              </el-divider>
              <el-icon class="angle-icon" @click="(showCelebration = !showCelebration)">
                <ArrowDownBold />
              </el-icon>
            </div> -->
            <!-- <el-collapse-transition>
              <div v-show="showCelebration">
                <el-form-item>
                  <div class="d-flex flex-column flex-lg-row justify-content-end w-100">
                    <div class="mr-3">Birthday</div>
                    <div class="input-width d-flex">
                      <el-select-v2 v-model="person.dayOfBirth"
                        :options="birthDaysArr.map(i => ({ label: i, value: i }))" placeholder="Day" size="large"
                        class="w-100 mr-1" />
                      <el-select-v2 v-model="person.monthOfBirth" :options="months.map(i => ({ label: i, value: i }))"
                        placeholder="Month" size="large" class="w-100 ml-1" />
                      <el-select-v2 v-model="person.yearOfBirth"
                        :options="birthYearsArr.map(i => ({ label: i, value: i }))" placeholder="Year" size="large"
                        class="w-100 ml-1" />
                    </div>
                  </div>
                </el-form-item>
                <el-form-item>
                  <div class="d-flex flex-column flex-lg-row justify-content-end w-100">
                    <div class="mr-3">Wedding Anniversary</div>
                    <div class="input-width d-flex">
                      <el-select-v2 v-model="person.dayOfWedding"
                        :options="annDaysArr.map(i => ({ label: i, value: i }))" placeholder="Day" size="large"
                        class="w-100 mr-1" />
                      <el-select-v2 v-model="person.monthOfWedding"
                        @change="editAnnDateValue('month', person.monthOfWedding)"
                        :options="months.map(i => ({ label: i, value: i }))" placeholder="Month" size="large"
                        class="w-100 ml-1" />
                      <el-select-v2 v-model="person.yearOfWedding"
                        :options="birthYearsArr.map(i => ({ label: i, value: i }))" placeholder="Year" size="large"
                        class="w-100 ml-1" />
                    </div>
                  </div>
                </el-form-item>
              </div>
            </el-collapse-transition> -->


            <div class="d-flex align-items-center">
              <div class="font-weight-700">Additional~Information: </div>
              <el-divider>
              </el-divider>
              <el-icon class="angle-icon" @click="(showAddInfo = !showAddInfo)">
                <ArrowDownBold />
              </el-icon>
            </div>
            <el-collapse-transition>
              <div v-show="showAddInfo">
                <!-- <el-form-item>
                  <div class="d-flex flex-column flex-lg-row justify-content-end w-100">
                    <label for="occupation" class="mr-3">Occupation</label>
                    <el-input type="text" class="input-width" v-model="person.occupation" placeholder="Occupation" />
                  </div>
                </el-form-item>
                <el-form-item>
                  <div class="d-flex flex-column flex-lg-row justify-content-end w-100">
                    <div class="mr-3">Age group</div>
                    <div class="input-width d-flex">
                      <el-select-v2 v-model="ageGroupId" @change="setSelectedAgeGroup"
                        :options="ageGroups.map(i => ({ label: i.name, value: i.id }))" placeholder="Age group"
                        size="large" class="w-100 mr-1" />
                    </div>
                  </div>
                </el-form-item> -->
                <!-- <el-form-item v-for="(item, index) in dynamicCustomFields" :key="index">
                  <div class="d-flex flex-column flex-lg-row justify-content-end w-100">
                    <label for="occupation" class="mr-3">{{ item.label }}</label>
                    <div class="input-width d-flex" v-if="(item.controlType == 1)">
                      <el-select-v2 v-model="item.data"
                        :options="item.parameterValues.split(',').map(i => ({ label: i, value: i }))"
                        :placeholder="item.label" size="large" class="w-100 mr-1" />
                    </div>
                    <el-input type="text" class="input-width" v-model="item.data" :placeholder="item.label"
                      v-if="(item.controlType == 0)" />
                    <el-input type="number" class="input-width" v-model="item.data" :placeholder="item.label"
                      v-if="(item.controlType == 7)" />
                    <el-input type="email" class="input-width" v-model="item.data" :placeholder="item.label"
                      v-if="(item.controlType == 4)" />
                    <div class="input-width" v-if="(item.controlType == 2)">
                      <el-checkbox v-model="item.data" size="large" />
                    </div>
                    <el-date-picker v-model="item.data" class="input-width" type="date" :placeholder="item.label"
                      size="default" v-if="(item.controlType == 3)" />
                    <div class="d-flex align-items-center" v-if="(item.controlType == 6)">
                      <input type="file" class="form-control input-width" @change="uploadImage($event, index)"
                        :placeholder="item.label" />
                      <el-icon class="is-loading ml-2" v-if="customFileLoading">
                        <Loading />
                      </el-icon>
                    </div>
                  </div>
                </el-form-item> -->
                <!-- <el-form-item>
                  <div class="d-flex flex-column flex-lg-row justify-content-end w-100">
                    <label for="" class="mr-3 related-info">Related information Including <br /><span
                        class="small primary--text">small groups and cell/house
                        fellowship
                        membership</span></label>
                    <div class="input-width d-flex">
                      <el-tabs type="border-card" class="w-100">
                        <el-tab-pane label="Group">
                          <span v-for="(item, index) in peopleInGroupIDs" :key="item.id">| &nbsp;
                            <span class="text-grey">{{ item.name }} &nbsp; <i
                                class="pi pi-times-circle text-danger c-pointer"
                                @click="showConfirmModal(index, item)"></i></span>&nbsp; | &nbsp;
                          </span>
                          <div>
                            <button class="info-btn" data-toggle="modal" data-target="#addToGroup" @click.prevent="">
                              Add to Group
                            </button>
                          </div>
                        </el-tab-pane>
                        <el-tab-pane label="Note">
                          <div v-for="(item, index) in personNotes" :key="index">
                            <div class="font-weight-700">{{ item.title }}</div>
                            <div class="mb-2">{{ item.description }}</div>
                          </div>
                          <button class="info-btn" data-toggle="modal" data-target="#personNote" @click.prevent="">
                            New Notes
                          </button>
                        </el-tab-pane>
                      </el-tabs>
                    </div>
                  </div>
                </el-form-item> -->
              </div>
            </el-collapse-transition>
            <!-- <div class="d-flex flex-column flex-lg-row justify-content-end w-100">
              <div></div>
              <div class="input-width d-flex justify-content-center my-4">
                <el-button :loading="loading" :disabled="(loading || !person.firstName || !person.mobilePhone)"
                  color="#136acd" @click="addPerson" round>Save</el-button>
              </div>
            </div> -->
          </el-form>

        </el-col>
        <el-col :xs="24" :sm="8" :md="8" :lg="8" :xl="8">
          <!-- <div class="grey-bg d-none d-md-block">
            <div v-if="routeParams">
              <div class="person-img">
                <img v-if="!memberToEdit.pictureUrl" src="../../assets/people/phone-import.svg" alt="Uploaded Image" />
                <img v-else :src="memberToEdit.pictureUrl" alt="Uploaded Image"
                  style="width: 110px; height: 110px; border-radius: 50%; object-fit: cover" />
              </div>
            </div>
            <div v-else>
              <div class="person-img">
                <img v-if="!url" src="../../assets/people/phone-import.svg" alt="Uploaded Image" />
                <img v-else :src="url" alt="Uploaded Image"
                  style="width: 110px; height: 110px; border-radius: 50%; object-fit: cover" />
              </div>
            </div>
            <div>
              <div class="cs-input">
                <label for="imgUpload" class="choose-file">
                  Choose file
                  <input type="file" class="input file-input" placeholder="" id="imgUpload" @change="imageSelected" />
                </label>
              </div>
            </div>
          </div> -->
        </el-col>
      </el-row>
    </el-container>

    <div class="form-div">
      <form @submit.prevent="onSubmit">
        <div class="bio-div mt-2">
          <p class="form-section-header">Bio:</p>
          <div class="bio-info">
            <div class="inputs">
              <div class="input-field">
                <label for="" class="label">Firstname<span style="color: red"> *</span></label>
                <input type="text" class="input form-control" v-model="firstTimersObj.firstName" name="" id="firstname"
                  required />
              </div>
              <div class="input-field">
                <label for="" class="label">Surname</label>
                <input type="text" class="input form-control" placeholder="" v-model="firstTimersObj.lastName"
                  name="" />
              </div>
              <div class="input-field">
                <label for="" class="label">Phone number</label>
                <div class="d-flex flex-column widen">
                  <input class="input form-control" placeholder="" v-model="firstTimersObj.phoneNumber" type="text"
                    :class="{ 'is-invalid': !isPhoneValid }" id="phone number" ref="validatePhone"
                    @blur="checkForDuplicatePhone" />
                  <div class="invalid-feedback text-danger pl-2">
                    Phone number exist, type a unique phone number.
                  </div>
                </div>
              </div>
              <div class="input-field">
                <label for=""></label>
                <div class="status-n-gender">
                  <div class="status cstm-select">
                    <div class="cs-select">
                      <Dropdown v-model="selectedMaritalStatus" :options="maritalStatusArr" optionLabel="value"
                        placeholder="Marital status" style="width: 100%" />
                    </div>
                  </div>
                  <div class="gender cstm-select">
                    <div class="cs-select">
                      <Dropdown v-model="selectedGender" :options="genderArr" optionLabel="value" placeholder="Gender"
                        style="width: 100%" />
                    </div>
                  </div>
                </div>
              </div>
              <div class="input-field">
                <label for="" class="label">Email</label>
                <div class="d-flex flex-column widen">
                  <input class="input form-control" placeholder="" v-model="firstTimersObj.email" type="email"
                    :class="{ 'is-invalid': !isEmailValid }" id="email" ref="validateEmail"
                    @blur="checkForDuplicateEmail" />
                  <div class="invalid-feedback text-danger pl-2">
                    Email exist, type a unique email.
                  </div>
                </div>
              </div>

              <!-- Test -->
              <div class="input-field">
                <label for="" class="label">Event or Service Attended</label>
                <i class="pi pi-chevron-down dd manual-dd-icon" @click="selectEventAttended"></i>

                <button @click.prevent="selectEventAttended" class="form-control input dd small-text widen">
                  {{
                      selectedEventAttended
                        ? selectedEventAttended.name
                        : "Select service attended"
                  }}
                  {{ newEvent.activity.date }}
                </button>
              </div>
              <div class="input-field manual-dd-con" v-if="showEventList">
                <div class="manual-dd dd">
                  <div class="container-fluid dd dd-search-con" v-if="eventsAttended.length > 5">
                    <div class="row dd">
                      <div class="col-md-12 dd px-0 py-1">
                        <input type="text" class="form-control dd dd-search-field" v-model="eventsSearchString"
                          placeholder="search for event" />
                      </div>
                    </div>
                  </div>

                  <div class="container-fluid dd-list-con">
                    <div class="row">
                      <div class="col-md-12">
                        <p class="px-1 manual-dd-item mb-0 py-2 dd" v-for="(event, index) in filteredEvents"
                          :key="index" @click="eventAttendedSelected(event)">
                          {{ event.name }}
                        </p>
                        <p class="text-center mb-1 mt-1" v-if="
                          eventsSearchString &&
                          eventsAttended.length > 0 &&
                          filteredEvents.length === 0
                        ">
                          No match found
                        </p>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-12 py-2 px-0" v-if="eventsAttended.length > 0">
                        <hr class="hr" />
                      </div>
                      <div class="col-md-12 create-event py-2 text-center">
                        <a class="craete-event-btn font-weight-bold" data-toggle="modal"
                          data-target="#eventModal">Create new event</a>
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
                <input type="text" class="input form-control" placeholder="" v-model="firstTimersObj.address" />
              </div>

              <div class="input-field">
                <label for="" class="label">Birthday</label>
                <div class="status-n-gender">
                  <div class="cstm-select">
                    <div class="cs-select" style="width: 87px">
                      <Dropdown v-model="firstTimersObj.birthday" :options="day" placeholder="Day"
                        style="width: 100%" />
                      <!-- <SelectElem :typ="'membership'" name="birthday" :options="['Day', ...birthDaysArr ]" value="Day" @input="itemSelected"/> -->
                    </div>
                  </div>
                  <div class="cstm-select">
                    <div class="cs-select" style="width: 111px">
                      <Dropdown v-model="birthMonth" :options="month" placeholder="Month" style="width: 100%" />
                    </div>
                  </div>

                  <div class="cstm-select">
                    <div class="cs-select" style="width: 113px">
                      <Dropdown v-model="firstTimersObj.birthYear" :options="year" placeholder="Year"
                        style="width: 100%" />
                    </div>
                  </div>
                </div>
              </div>
              <div class="input-field">
                <label for="" class="label">Choose follow-up person</label>
                <div class="input p-0 border-0 widen">
                  <SearchMembers v-bind:currentMember="firstTimersObj" @memberdetail="setContact" />
                </div>
              </div>
              <div class="input-field">
                <label for="" class="label">Add to group</label>
                <div class="p-2 border add-group">
                  <div v-for="(item, index) in firstTimerInGroup" :key="index">
                    <div class="pt-1">{{ index + 1 }}. {{ item.name }}</div>
                  </div>
                  <div v-if="firstTimerInGroup.length === 0">
                    No group added yet
                  </div>
                  <div class="
                      font-weight-700
                      text-primary
                      border-top
                      text-center
                      c-pointer
                    " data-toggle="modal" data-target="#addToGroup">
                    Add
                  </div>
                </div>
              </div>

              <!-- Custom Field -->
              <div v-for="(item, index) in dynamicCustomFields" :key="index">
                <div class="input-field align-items-sm-center" v-if="item.controlType == 1">
                  <label for="" class="mr-2">{{ item.label }}</label>
                  <div class="cstm-select search-box">
                    <div class="cs-select-dropdown">
                      <Dropdown v-model="item.data" :options="item.parameterValues.split(',')" :placeholder="item.label"
                        style="width: 100%" />
                    </div>
                  </div>
                </div>
                <div class="input-field align-items-sm-center" v-if="item.controlType == 7">
                  <label for="" class="label">{{ item.label }}</label>
                  <input type="number" class="input" placeholder="" v-model="item.data" />
                </div>
                <div class="input-field align-items-sm-center" v-if="item.controlType == 4">
                  <label for="" class="label">{{ item.label }}</label>
                  <input type="email" class="input" placeholder="" v-model="item.data" />
                </div>
                <div class="input-field align-items-sm-center" v-if="item.controlType == 0">
                  <label for="" class="label">{{ item.label }}</label>
                  <input type="text" class="input" placeholder="" v-model="item.data" />
                </div>
                <div class="input-field align-items-sm-center" v-if="item.controlType == 2">
                  <label for="" class="label">{{ item.label }}</label>
                  <div class="input border-0 pl-0">
                    <Checkbox id="binary" v-model="item.data" :binary="true" />
                  </div>
                </div>
                <div class="input-field align-items-sm-center" v-if="item.controlType == 6">
                  <label for="" class="label">{{ item.label }}</label>
                  <input type="file" class="input" placeholder="" />
                </div>
                <div class="input-field align-items-sm-center" v-if="item.controlType == 3">
                  <label for="" class="label">{{ item.label }}</label>
                  <input type="date" class="input" placeholder="" v-model="item.data" />
                </div>
              </div>
            </div>
            <div style="width: 225px; margin: 0 auto">
              <ImageForm @pictureurl="setImageToUrl" />
            </div>
          </div>
        </div>
        <!-- <hr class="hr"> -->

        <div class="">
          <span class="celeb-tab row" @click="showCelebTab">
            <span class="tab-header col-sm-3">Insights:</span>
            <span class="h-rule col-sm-7 pl-0">
              <hr class="hr" />
            </span>
            <span class="col-sm-2">
              <span class="tb-icon-span"><i class="pi pi-angle-down tbb-icon"
                  :class="{ 'tb-icon': !hideCelebTab }"></i></span>
            </span>
          </span>
          <div class="bio-info celeb-info" :class="{ 'hide-tab': hideCelebTab, 'show-tab': !hideCelebTab }">
            <div class="inputs mt-3">
              <div class="input-field">
                <div class="gender cstm-select widen">
                  <div class="cs-select input-dropdown">
                    <Dropdown v-model="selectedAboutUsSource" :options="howDidYouAboutUs" optionLabel="name"
                      placeholder="How did you hear about us?" style="width: 100%" />
                  </div>
                </div>
              </div>
              <div class="input-field">
                <!-- <label for="" class="label">Events or Service Attended</label> -->
                <div class="gender cstm-select widen">
                  <div class="cs-select input-dropdown">
                    <Dropdown v-model="selectedCommunicationMeans" :options="comMeansArr"
                      placeholder="Means of communication" style="width: 100%" />
                  </div>
                </div>
              </div>
              <div class="input-field">
                <!-- <label for="" class="label">Events or Service Attended</label> -->
                <div class="gender cstm-select widen">
                  <div class="cs-select input-dropdown">
                    <Dropdown v-model="selectedJoinInterest" :options="joinInterestArr"
                      placeholder="Interested in joining us?" style="width: 100%" />
                  </div>
                </div>
              </div>
              <div class="input-field">
                <!-- <label for="" class="label">Events or Service Attended</label> -->
                <div class="gender cstm-select widen">
                  <div class="cs-select input-dropdown">
                    <Dropdown v-model="selectedVisitOption" :options="wantVisitArr" placeholder="Want to be visited?"
                      style="width: 100%" />
                  </div>
                </div>
              </div>
            </div>

            <div class="image-div other">
              <!-- Empty space -->
            </div>
          </div>
        </div>

        <div class="inputs mt-2">
          <div class="submit-div">
            <button class="default-btn cancel-btn btn ml-sm-3 mt-3" @click.prevent="onCancel">
              Cancel
            </button>
            <button class="default-btn outline-none ml-sm-3 mt-3" :class="{ 'btn-loading': loading }"
              :disabled="loading">
              <i class="fas fa-circle-notch fa-spin mr-2" v-if="loading"></i>
              <span>Save and add another</span>
              <span></span>
            </button>
            <button class="ml-sm-3 mt-3 submit-btn text-white btn" @click.prevent="saveAndRoute">
              Save
            </button>
          </div>
        </div>

        <div class="container">
          <div class="row">
            <div class="col-md-12 py-4">
              <div class="modal fade" id="eventModal" tabindex="-1" role="dialog" aria-labelledby="eventModalLabel"
                aria-hidden="true">
                <div class="modal-dialog" role="document">
                  <div class="modal-content py-2 px-2">
                    <div class="modal-header">
                      <h5 class="modal-title font-weight-bold" id="exampleModalLabel">
                        Create New Event
                      </h5>
                      <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div class="modal-body new-event-modal">
                      <div class="row my-4">
                        <div class="col-md-4 text-md-right align-self-center">
                          <label for="" class="label font-weight-bold">Event name</label>
                        </div>
                        <div class="col-md-7">
                          <div class="
                              select-elem-con
                              pointer
                              d-flex
                              justify-content-space-between
                            " @click="showCategory = !showCategory">
                            <span class="ofering">{{ selectEvent }}</span><span>
                              <!-- :class="{ roll3: showForm3 }" -->
                              <i class="pi pi-angle-down" aria-hidden="true"></i></span>
                          </div>
                          <div class="ofering" :class="{ 'style-category': showCategory }" v-if="showCategory">
                            <input type="text" placeholder="Search..." class="form-control ofering mb-3"
                              v-model="eventText" />
                            <div v-for="(
                                eventCategory, index
                              ) in filterEventCategory" :key="index" class="ofering">
                              <div class="ofering py-1" @click="individualEvent(eventCategory)">
                                {{ eventCategory.name }}
                              </div>
                            </div>
                            <div v-if="filterEventCategory.length >= 1" @click="openModal" class="create cat ofering">
                              Add New Event
                            </div>
                            <div v-else class="create mt-3" @click="createNewCat(1)">
                              Create "{{ eventText }}" event
                            </div>
                          </div>

                          <!-- <Button label="Show" icon="pi pi-external-link" @click="openModal" /> -->
                          <Dialog header="Add New Event" v-model:visible="displayModal" :style="{ width: '50vw' }"
                            :modal="true">
                            <div class="row">
                              <div class="col-sm-3 align-self-center">
                                Event Name
                              </div>
                              <div class="col-sm-9">
                                <input type="text" class="form-control" v-model="newEventCategoryName" />
                              </div>
                            </div>
                            <template #footer>
                              <!-- <Button label="No" icon="pi pi-times" @click="closeModal" class="p-button-text"/>
                                        <Button label="Yes" icon="pi pi-check" @click="closeModal" autofocus /> -->
                              <div class="
                                  col-md-12
                                  d-md-flex
                                  justify-content-end
                                  p-0
                                ">
                                <button type="button" class="btn secondary-btn px-4" @click="closeModal">
                                  Close
                                </button>
                                <button type="button" class="btn primary-btn px-4 mr-0 text-white"
                                  @click="createNewCat(2)">
                                  Save
                                </button>
                              </div>
                            </template>
                          </Dialog>
                        </div>
                      </div>
                      <div class="row mt-4 mb-4">
                        <div class="col-md-4 text-md-right align-self-center">
                          <label for="" class="label font-weight-bold">Event date</label>
                        </div>
                        <div class="col-md-7">
                          <input type="date" class="form-control" v-model="newEvent.activity.date" />
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
                                <p class="mb-1 text-danger" v-if="invalidEventDetails">
                                  Enter event name and date
                                </p>
                              </div>
                              <div class="col-md-12 d-md-flex justify-content-end">
                                <button type="button" class="btn secondary-btn px-4" data-dismiss="modal">
                                  Close
                                </button>
                                <button type="button" class="btn primary-btn px-4 text-white" data-dismiss="modal"
                                  @click="createNewEvent">
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

        <!-- Modal -->
        <div class="modal fade" id="addToGroup" tabindex="-1" role="dialog" aria-labelledby="addToGroup"
          aria-hidden="true" @click="hideGroupModal">
          <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
              <div class="modal-header" style="background: #ebeff4">
                <h5 class="modal-title font-weight-bold" id="addToGroup">
                  Group Membership
                </h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <div class="row my-4">
                  <div class="col-md-4 text-md-right">
                    <label for="" class="font-weight-600">Name</label>
                  </div>
                  <div class="col-md-7">
                    <!-- <Dropdown
                      v-model="groupToAddTo"
                      :options="allGroups"
                      style="width: 100%"
                      :filter="false"
                      placeholder="Select a group"
                      optionLabel="name"
                    /> -->
                    <!-- <div class="dropdown">
                          <button class="btn w-100 phone-input d-flex justify-content-between align-items-center border" type="button" id="dropdownMemCat" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                              <div>
                              {{ groupToAddTo && Object.keys(groupToAddTo).length > 0 ? groupToAddTo.name : 'Select group' }}</div>
                              <i class="pi pi-chevron-down"></i>
                          </button>
                          <div class="dropdown-menu w-100" aria-labelledby="dropdownMemCat">
                              <a class="dropdown-item c-pointer" v-for="item in allGroups" :key="item.id">
                                  <div @click="setSelectedGroup(item)">{{ item.name }}</div>
                              </a>
                          </div>
                      </div> -->


                    <button class="
                          btn
                          border
                          w-100
                          d-flex
                          justify-content-between
                          align-items-center
                          exempt-hide
                        " type="button" @click="setGroupProp">
                      <div class="exempt-hide">
                        {{
                            Object.keys(groupToAddTo).length > 0
                              ? groupToAddTo.name
                              : "Select a group"
                        }}
                      </div>
                      <i class="pi pi-chevron-down exempt-hide"></i>
                    </button>
                    <div class="div-card p-2 exempt-hide" :class="{
                      'd-none': hideDiv,
                      'd-block': !hideDiv,
                    }">
                      <input type="text" class="form-control exempt-hide" v-model="searchGroupText" ref="searchRef"
                        placeholder="Search for group" />
                      <group-tree :items="searchAllGroups" :addGroupValue="true" class="exempt-hide"
                        @closemodal="setCloseGroupModal" />
                    </div>
                  </div>
                </div>

                <div class="row">
                  <div class="col-md-4 text-md-right">
                    <label for="" class="font-weight-600">Position</label>
                  </div>
                  <div class="col-md-7">
                    <input type="text" v-model="position" class="form-control" placeholder="e.g Member" />
                  </div>
                </div>

                <div class="row">
                  <div class="col-md-4">
                    <label for="" class="font-weight-600"></label>
                  </div>

                  <div class="col-md-7">
                    <div class="col-md-12 mt-3 text-center">
                      <p class="my-1 text-danger" v-if="addToGroupError">
                        Please select a group
                      </p>
                    </div>
                    <div class="row mt-2">
                      <div class="col-md-6 d-md-flex justify-content-end">
                        <button class="default-btn" data-dismiss="modal">
                          Cancel
                        </button>
                      </div>
                      <div class="col-md-6">
                        <button class="default-btn primary-bg border-0 text-white"
                          :data-dismiss="dismissAddToGroupModal" @click="addMemberToGroup">
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
      </form>
    </div>
  </div>
</template>

<script>
import { ref, reactive, onMounted, computed, nextTick, watchEffect } from "vue";
import axios from "@/gateway/backendapi";
import router from "@/router/index";
import Dropdown from "primevue/dropdown";
import { useRoute } from "vue-router";
import { useToast } from "primevue/usetoast";
import Dialog from "primevue/dialog";
import finish from "../../services/progressbar/progress";
import setupService from "../../services/setup/setupservice";
import ImageForm from "../../components/membership/ImageForm.vue";
import SearchMembers from "../../components/membership/MembersSearch.vue";
import grousService from "../../services/groups/groupsservice";
import { useStore } from "vuex";
import allCustomFields from "../../services/customfield/customField";
import GroupTree from "../groups/component/GroupTree.vue";

export default {
  components: {
    Dropdown,
    Dialog,
    ImageForm,
    SearchMembers,
    "group-tree": GroupTree,
  },

  setup() {
    // const $toast = getCurrentInstance().ctx.$toast;
    const toast = useToast();
    const store = useStore();
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
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
      22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
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
      sendWelcomeSMS: false,
      sendWelcomeEmail: true,
    });
    const showCategory = ref(false);
    const eventText = ref("");
    const displayModal = ref(false);
    const selectEvent = ref("Select Event");
    const validatePhone = ref("");
    const validateEmail = ref("");
    const firstTimerPhone = ref("");
    const firstTimerEmail = ref("");
    const routeToFRM = ref(false);
    const firstTimerInGroup = ref([]);
    const allGroups = ref([]);
    const groupToAddTo = ref({});
    const position = ref("");
    const addToGroupError = ref(false);
    const dismissAddToGroupModal = ref("");
    const dynamicCustomFields = ref([]);
    const searchGroupText = ref("");
    const searchRef = ref(null)
    const hideDiv = ref(true)
    const ruleForm = ref()
    const maritalStatusId = ref(null)
    const genderId = ref(null)

    const eventName = computed(() => {
      return newEvents.value.map((i) => i.name);
    });

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
      firstTimersObj.value.groups =
        firstTimerInGroup.value.length > 0
          ? firstTimerInGroup.value.map((i) => {
            return {
              groupId: i.groupId,
              position: i.position,
            };
          })
          : [];

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

      firstTimersObj.value.customAttributeData = dynamicCustomFields.value.map(
        (i) => ({
          customAttributeID: i.id,
          data: i.data,
          entityID: route.params.personId,
        })
      );

      if (route.params.firstTimerId) {
        let updateMember = {
          firstName: firstTimersObj.value.firstName,
          lastName: firstTimersObj.value.lastName,
          phoneNumber: firstTimersObj.value.phoneNumber,
          email: firstTimersObj.value.email,
          activityID: firstTimersObj.value.activityID,
          address: firstTimersObj.value.address,
          birthday: firstTimersObj.value.birthday,
          birthMonth: firstTimersObj.value.birthMonth,
          birthYear: firstTimersObj.value.birthYear,
          howDidYouAboutUsId: selectedAboutUsSource.value
            ? selectedAboutUsSource.value.id
            : null,
          communicationMeans: firstTimersObj.value.communicationMeans,
          interestedInJoining: firstTimersObj.value.interestedInJoining,
          wantsToBeVisited: firstTimersObj.value.wantToBeVisited,
          personId: firstTimersObj.value.personId,
          sendEmail: firstTimersObj.value.sendWelcomeEmail,
          sendSms: firstTimersObj.value.sendWelcomeSMS,
        };

        if (firstTimersObj.value.genderId)
          updateMember.genderId = firstTimersObj.value.genderId;
        if (firstTimersObj.value.maritalStatusId)
          updateMember.maritalStatusId = firstTimersObj.value.maritalStatusId;
        console.log(updateMember);

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
            // if(!routeToFRM.value) {
            router.push("/tenant/firsttimerslist");
            // } else {
            //   router.push(`/tenant/firsttimermanagement/${res.data.personId}`)
            //   routeToFRM.value = false
            // }

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
          finish();
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
              severity: "warn",
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
            finish();
            console.log(res.data);
            loading.value = false;

            toast.add({
              severity: "success",
              summary: "Successful",
              detail: "First timer created successfully",
              life: 2000,
            });

            if (!routeToFRM.value) {
              // router.push("/tenant/firsttimerslist");
              firstTimersObj.value = {};
              selectedGender.value = {};
              selectedMaritalStatus.value = {};
              selectedEventAttended.value = {};
              selectedAboutUsSource.value = {};
              selectedCommunicationMeans.value = {};
              selectedJoinInterest.value = {};
              selectedVisitOption.value = {};
              birthMonth.value = "";

              validatePhone.value.classList.remove("is-valid");
              validateEmail.value.classList.remove("is-valid");
              validatePhone.value.classList.remove("is-invalid");
              validateEmail.value.classList.remove("is-invalid");
            } else {
              setTimeout(() => {
                router.push(
                  `/tenant/firsttimermanagement/${res.data.personID}?memberType=0`
                );
                routeToFRM.value = false;
              }, 2000);
            }
          })
          .catch((err) => {
            finish();
            loading.value = false;
            if (err.response && err.response.data) {
              toast.add({
                severity: "warn",
                summary: "Sorry",
                detail: `${err.response.data}`,
                life: 8000,
              });
            } else {
              toast.add({
                severity: "error",
                summary: "Network Error",
                detail: `Please ensure you have a strong internet  connection`,
                life: 4000,
              });
            }
            console.log(err.response);
          });
      }
    };

    const saveAndRoute = () => {
      routeToFRM.value = true;
      onSubmit();
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
      if (!selectedEventAttended.value.name) return eventsAttended.value;
      return eventsAttended.value.filter((i) =>
        i.name.toLowerCase().includes(selectedEventAttended.value.name.toLowerCase())
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
          summary: "Event not created",
          detail: error.response.data,
          life: 5000,
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
    const ftimerId = ref("");

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
          console.log(res.data, "all lkups");
          res.data.find((i) => {
            if (i.type.toLowerCase() === "gender") {
              genderArr.value = i.lookUps;
            }
            if (i.type.toLowerCase() === "maritalstatus") {
              maritalStatusArr.value = i.lookUps;
              if (ftimerId.value) {
                selectedMaritalStatus.value = maritalStatusArr.value.find(
                  (i) => i.id === firstTimersObj.value.maritalStatusId
                );
                selectedGender.value = genderArr.value.find(
                  (i) => i.id === firstTimersObj.value.genderId
                );
              }
            }
          });
        })
        .catch((err) => {
          finish();
          if (err.response && err.response.status === 401) {
            localStorage.setItem("token", "");
            setupService.clearStore();
            router.push("/");
          }
        });

      axios.get("/api/membership/howyouheardaboutus").then((res) => {
        howDidYouAboutUs.value = res.data.map((i) => {
          return { name: i.name, id: i.id };
        });
        console.log(res.data, "HYH");
      });

      console.log(route.params.firstTimerId);
      if (route.params.firstTimerId) {
        axios
          .get(`/api/People/firstTimer/${route.params.firstTimerId}`)
          .then((res) => {
            console.log(res.data, "DFGHG");
            ftimerId.value = res.data.personId;

            firstTimersObj.value = res.data;
            firstTimersObj.value.sendWelcomeSMS = res.data.sendSms;
            firstTimersObj.value.sendWelcomeEmail = res.data.sendEmail;
            firstTimerEmail.value = res.data.email
            firstTimerPhone.value = res.data.phoneNumber

            selectedGender.value = res.data.genderId
              ? genderArr.value.find((i) => i.id === res.data.genderId)
              : {};

            selectedMaritalStatus.value = res.data.maritalStatusId
              ? maritalStatusArr.value.find(
                (i) => i.id === res.data.maritalStatusId
              )
              : {};

            selectedAboutUsSource.value = getUserSource(
              res.data.howDidYouAboutUsId
            );

            selectedCommunicationMeans.value = res.data.communicationMeans
              ? comMeansArr.value[res.data.communicationMeans - 1]
              : "";

            selectedJoinInterest.value = res.data.interestedInJoining
              ? joinInterestArr.value[res.data.interestedInJoining - 1]
              : "";

            selectedVisitOption.value = res.data.wantsToBeVisited
              ? wantVisitArr.value[res.data.wantsToBeVisited - 1]
              : "";
            console.log(
              wantVisitArr.value[res.data.wantsToBeVisited - 1],
              res.data.wantsToBeVisited
            );

            firstTimersObj.value.birthday = res.data.birthday
              ? Number(res.data.birthday)
              : "";

            firstTimersObj.value.birthYear = res.data.birthYear
              ? +res.data.birthYear
              : "";

            birthMonth.value = res.data.birthMonth
              ? month.value[Number(res.data.birthMonth) - 1]
              : "";
            console.log(eventsAttended.value, "EA");

            selectedEventAttended.value = getEventUserAttended(
              res.data.activityID
            );
          })
          .catch((err) => {
            finish();
            console.log(err);
            toast.add({
              severity: "error",
              summary: "Error getting details",
              detail:
                "Unable to get person details, ensure you have a strong network connection",
              life: 5000,
            });
          });
      }
    });

    const getUserSource = (sourceId) => {
      if (
        sourceId &&
        howDidYouAboutUs.value &&
        howDidYouAboutUs.value.length > 0
      )
        return howDidYouAboutUs.value.find((i) => i.id === sourceId);
      if (!sourceId) {
        axios.get("/api/membership/howyouheardaboutus").then((res) => {
          howDidYouAboutUs.value = res.data.map((i) => {
            return { name: i.name, id: i.id };
          });
          return howDidYouAboutUs.value.find(
            (i) => i.id === res.data.howDidYouAboutUsId
          );
        });
      } else {
        return null;
      }
    };

    const getEventUserAttended = (userEventId) => {
      if (!userEventId) return {};
      if (eventsAttended.value && eventsAttended.value.length > 0)
        return eventsAttended.value.find((i) => i.activityID === userEventId);
      axios.get("/api/Events/EventActivity").then((res) => {
        eventsAttended.value = res.data;
        return eventsAttended.value.find((i) => i.activityID === userEventId);
      });
    };

    const year = computed(() => {
      const arrOfYears = [];
      let currentYear = new Date().getFullYear();
      while (arrOfYears.length <= 100) {
        arrOfYears.push(currentYear);
        currentYear = currentYear - 1;
      }
      return arrOfYears;
    });

    const checkForDuplicatePhone = async (rule, value, callback) => {
      if (firstTimersObj.value.phoneNumber !== firstTimerPhone.value) {
        try {
          let { data } = await axios.get(
            `api/People/checkDuplicate?phoneNumber=${firstTimersObj.value.phoneNumber}`
          );
          if (data === "phone number") {
            return callback(new Error('Phone number already exist, try another'))
          } else if (data === "email and phone number") {
            return callback(new Error('Phone number and email already exist, try another'))
          }
        } catch (error) {
          console.error(error);
        }
      }
    };

    const checkForDuplicateEmail = async (rule, value, callback) => {
      if (firstTimersObj.value.email !== firstTimerEmail.value) {
        try {
          let { data } = await axios.get(
            `api/People/checkDuplicate?email=${firstTimersObj.value.email}`
          );
          console.log(data);
          if (data === "email") {
            return callback(new Error('Email already exist, try another'))
          } else if (data === "email and phone number") {
            return callback(new Error('Email and phone number already exist, try another'))
          }
        } catch (error) {
          console.log(error);
        }
      }
    };

    const validateRules = reactive({
      email: [
        { validator: checkForDuplicateEmail, required: false, trigger: 'blur' },
      ],
      phoneNumber: [
        { validator: checkForDuplicatePhone, required: true, trigger: 'blur' },
      ],
    })

    const setImageToUrl = (payload) => {
      firstTimersObj.value.imageUrl = payload;
    };

    const setContact = (payload) => {
      if (!payload.email) {
        toast.add({
          severity: "warn",
          summary: "No email associate with the person",
          detail:
            "This contact does not have any email records, communicate with this person to create him as a user",
          life: 15000,
        });
      }
      firstTimersObj.value.contactOwnerId = payload.id;
    };

    const getGroups = async () => {
      try {
        let groups = store.getters["groups/groups"];

        if (groups && groups.length > 0) {
          allGroups.value = groups;
          return true;
        } else {
          let group = await grousService.getGroups();
          if (group) {
            allGroups.value = group;
          }
        }
      } catch (error) {
        console.log(error);
      }
    };
    getGroups();

    const addMemberToGroup = async () => {
      addToGroupError.value = false;
      if (!groupToAddTo.value || !groupToAddTo.value.id) {
        addToGroupError.value = true;
        return false;
      }
      dismissAddToGroupModal.value = "modal";
      // if (route.params.personId) {
      // let personInfo = {
      // people: [
      //     {
      //       groupId: groupToAddTo.value.id ,
      //       position: position.value,
      //       personId: route.params.personId
      //     }
      //   ]
      // }

      //   try {
      //   const response = await membershipService.addMemberToGroup(
      //     personInfo, groupToAddTo.value.id
      //   );
      //   console.log("RESPONSE", response);
      //   toast.add({
      //     severity: "success",
      //     summary: "Added Successfully",
      //     detail: `Member add to ${groupToAddTo.value.name}`,
      //     life: 3000,
      //   });

      //   firstTimerInGroup.value.push({
      //     name: groupToAddTo.value.name,
      //     groupId: groupToAddTo.value.id,
      //     position: position.value
      //   })

      //   groupToAddTo.value = {}
      //   position.value = ""
      //   } catch (error) {
      //     console.log(error);
      //   }
      // } else {
      console.log(groupToAddTo.value);
      firstTimerInGroup.value.push({
        name: groupToAddTo.value.name,
        groupId: groupToAddTo.value.id,
        position: position.value,
      });

      groupToAddTo.value = {};
      position.value = "";
      // }
      console.log(firstTimerInGroup.value);
    };

    const setSelectedGroup = (item) => {
      groupToAddTo.value = item;
    };

    const getAllCustomFields = async () => {
      try {
        let data = await allCustomFields.allCustomFields();
        dynamicCustomFields.value = data.filter((i) => i.entityType === 1);
        console.log(dynamicCustomFields.value);
      } catch (err) {
        console.log(err);
      }
    };
    getAllCustomFields();

    const searchAllGroups = computed(() => {
      if (!searchGroupText.value && allGroups.value > 0) return allGroups.value
      return allGroups.value.filter(i => {
        if (i.name) return i.name.toLowerCase().includes(searchGroupText.value.toLowerCase())
      })
    })

    const setGroupProp = () => {
      hideDiv.value = !hideDiv.value;
      nextTick(() => {
        searchRef.value.focus()
      })
    };

    watchEffect(() => {
      if (store.getters['groups/selectedTreeGroup']) {
        console.log(store.getters['groups/selectedTreeGroup'])
        const selectedGroup = store.getters['groups/selectedTreeGroup']
        hideDiv.value = true
        groupToAddTo.value = selectedGroup;
      }
    })

    const hideGroupModal = (e) => {
      if (!e.target.classList.contains("exempt-hide")) {
        hideDiv.value = true
      }
    }

    const setSelectedMaritalStatus = () => {
      selectedMaritalStatus.value = maritalStatusArr.value.find(i => {
        return i.id == maritalStatusId.value
      })
    }

    const setSelectedGender = () => {
      selectedGender.value = genderArr.value.find(i => {
        return i.id == genderId.value
      })
    }

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
      checkForDuplicatePhone,
      checkForDuplicateEmail,
      validatePhone,
      validateEmail,
      firstTimerPhone,
      firstTimerEmail,
      routeToFRM,
      saveAndRoute,
      setImageToUrl,
      setContact,
      firstTimerInGroup,
      allGroups,
      groupToAddTo,
      position,
      addToGroupError,
      dismissAddToGroupModal,
      addMemberToGroup,
      setSelectedGroup,
      dynamicCustomFields,
      searchAllGroups,
      searchRef,
      setGroupProp,
      hideDiv,
      hideGroupModal,
      ruleForm,
      validateRules,
      maritalStatusId,
      genderId,
      setSelectedMaritalStatus,
      setSelectedGender
    };
  },
};
</script>

<style scoped>
* {
  box-sizing: border-box;
  color: #02172e;
}

.input-width {
  width: 100%
}

.input-width {
  width: 100%
}

@media (min-width: 992px) {
  .input-width {
    width: 350px
  }

}


@media (min-width: 576px) {
  .modal-dialog {
    max-width: 650px;
    margin: 1.75rem auto;
    /* padding: 32px; */
  }

  .dropdown-menu {
    max-height: 300px;
    overflow: scroll;
    box-shadow: 0 2px 4px -1px rgb(0 0 0 / 20%), 0 4px 5px 0 rgb(0 0 0 / 14%),
      0 1px 10px 0 rgb(0 0 0 / 12%);
  }
}

.div-card {
  position: absolute;
  background: white;
  z-index: 1;
  width: 100%;
  box-shadow: 0 0 11px rgba(33, 33, 33, 0.2);
  max-height: 400px;
  overflow: scroll;
}

.menu-height {
  max-height: 400px;
  overflow: scroll;
}
</style>
