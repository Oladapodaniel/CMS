<template>
  <div class="container-wide container-top" @click="closeDropdownIfOpen">
    <div class="container-fluid">
      <div class="row mt-3 botom">
        <!-- <div class="col-12"> -->
        <div class="col-12 col-sm-6 c-pointer" @click="groupDetail">
          <div class="font-weight-bold h5 col-12">Group Detail</div>
          <div
            class=""
            :class="{ baseline: showGroup, 'hide-base': !showGroup }"
          ></div>
        </div>
        <div class="col-12 col-sm-6 c-pointer" @click="displayView">
          <div class="font-weight-bold h5 col-12">Attendance & Checkin</div>
          <div
            class=""
            :class="{
              baselinetwo: showAttendanceCheckin,
              'hide-basetwo': !showAttendanceCheckin,
            }"
          ></div>
        </div>
      </div>
      <div class="row mt-3">
        <div class="col-12" v-if="showAttendanceCheckin">
          <div>
            <div>
              <div class="main-body">
                <div class="row">
                  <div
                    class="top my-3 col-sm-12 col-md-12 d-flex flex-wrap pl-0"
                  >
                    <div class="events col-md-6 d-none d-sm-flex">
                      <div>Attendance & Check-in</div>
                    </div>
                    <div class="events col-md-12 col-sm-12 d-sm-none w-100">
                      <div>Attendance & Check-in</div>
                    </div>
                    <div class="actions col-md-6 d-flex justify-content-md-end">
                      <router-link
                        :to="{ name: 'AddCheckin' }"
                        v-if="showAttendanceCheckin"
                      >
                        <button class="buttonn add-person-btn">
                          Add New Attendance
                        </button>
                      </router-link>
                    </div>
                  </div>
                </div>
                <hr class="hr" />
              </div>
              <Attendancecheckin
                :list="attendanceData"
                :totalItems="totalItems"
              />
            </div>
          </div>
        </div>
      </div>

      <div class="row mt-3" v-if="showGroup">
        <div class="col-md-12 head-text">
          <h2 v-if="!route.params.groupId">Add Group</h2>
          <h2 v-else>Update Group</h2>
          <!-- <Toast /> -->
          <ConfirmDialog />
        </div>
        <div class="col-md-12 my-3 px-0">
          <hr class="hr" />
        </div>
      </div>

      <div class="row py-3" v-if="showGroup">
        <div class="col-md-12">
          <div class="row group-form pt-3 my-4">
            <div class="col-md-12">
              <div class="row">
                <div class="col-md-12">
                  <div class="row">
                    <div class="col-md-8 col-lg-7">
                      <div class="row">
                        <div class="col-md-4 text-lg-right">
                          <label for="groupName" class="font-weight-600"
                            >Group name</label
                          >
                        </div>
                        <!-- <div class="col-md-8">
                          <input
                            type="text"
                            v-model="groupData.name"
                            class="form-control"
                            id="formGroup"
                            @input="validateGroupName"
                          />
                        </div> -->
                        <div class="col-md-8">
                          <el-input
                            type="text"
                            v-model="groupData.name"
                            size="large"
                            class="w-100 ml-0"
                            id="formGroup"
                            @input="validateGroupName"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="row mb-5 mt-4">
                <div class="col-md-12">
                  <div class="row">
                    <div class="col-md-8 col-lg-7">
                      <div class="row">
                        <div class="col-md-4 text-lg-right">
                          <label for="description" class="font-weight-600"
                            >Description</label
                          >
                        </div>
                        <!-- <div class="col-md-8">
                          <textarea
                            v-model="groupData.description"
                            name="description"
                            id="description"
                            rows="1"
                            class="form-control w-100"
                          ></textarea>
                        </div> -->

                        <div class="col-md-8">
                          <el-input
                            v-model="groupData.description"
                            name="description"
                            id="description"
                            :rows="3"
                            type="textarea"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="row pb-2">
                <div class="col-md-8 col-lg-7">
                  <div class="row">
                    <div class="col-md-4 text-lg-right"></div>
                    <div class="col-md-8">
                      <div class="row">
                        <div class="col-12 d-flex" v-if="false">
                          <!-- <Checkbox :binary="true" /> -->
                          <el-checkbox :binary="true" size="large" />

                          <label for="description" class="font-weight-600 ml-3">
                            Make Public
                          </label>
                        </div>

                        <div class="col-12 d-flex mt-2">
                          <!-- <Checkbox
                            v-model="groupData.isMobileGroup"
                            :binary="true"
                            :disabled="groupData.isMobileGroup"
                          /> -->

                          <div class="input-width">
                            <el-checkbox
                              v-model="groupData.isMobileGroup"
                              size="large"
                            />
                          </div>
                          <label for="description" class="font-weight-600 ml-3">
                            Enable on Mobile App
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-md-12 col-12 btnn mb-4">
              <!-- <button
                class="
                  default-btn
                  border
                  outline-none
                  font-weight-bold
                  c-pointer
                  text-center
                "
                data-toggle="collapse"
                data-target="#collapseExample"
                aria-expanded="false"
                aria-controls="collapseExample"
              >
                Sub-group
              </button> -->
              <el-button
                class="
                  default-btn
                  border
                  outline-none
                  font-weight-bold
                  c-pointer
                  text-center text-dark
                "
                data-toggle="collapse"
                data-dismiss="modal"
                data-target="#collapseExample"
                aria-expanded="false"
                aria-controls="collapseExample"
                round
              >
                Sub-group
              </el-button>
              <!-- <button
                class="
                  default-btn
                  border
                  outline-none
                  font-weight-bold
                  c-pointer
                  text-center
                "
                :data-toggle="route.params.groupId ? 'modal' : ''"
                data-target="#importgroup"
                ref="modalBtn"
                @click="importMember"
              >
                Import
              </button> -->

              <el-button
                class="
                  default-btn
                  border
                  outline-none
                  font-weight-bold
                  c-pointer
                  text-center text-dark
                "
                :data-toggle="route.params.groupId ? 'modal' : ''"
                data-target="#importgroup"
                ref="modalBtn"
                @click="importMember"
                round
              >
                Import
              </el-button>
              <!-- <button
                class="
                  default-btn
                  outline-none
                  primary-text
                  font-weight-bold
                  border-0
                  c-pointer
                "
                data-toggle="modal"
                data-target="#exampleModal"
                ref="modalBtn"
              >
                Addmember
              </button> -->

              <el-button
                class="
                  default-btn
                  outline-none
                  primary-text
                  font-weight-bold
                  border-0
                  c-pointer
                  text-primary
                  header-btn
                "
                data-toggle="modal"
                data-target="#exampleModal"
                ref="modalBtn"
                size="large"
                round
              >
                Add member
              </el-button>
            </div>
          </div>

          <div class="row mb-4">
            <div class="col-12">
              <div>
                <div class="collapse" id="collapseExample">
                  <div class="card card-body">
                    <div class="row">
                      <div class="col-12 col-md-12">
                        <el-button
                          class="
                            mb-3
                            border
                            outline-none
                            font-weight-bold
                            mr-3
                            text-center
                          "
                          style="
                            border-radius: 3rem;
                            padding: 0.5rem 1.25rem;
                            width: 167px;
                          "
                          type="button"
                          data-toggle="collapse"
                          data-target="#addsubgroup"
                          aria-expanded="false"
                          aria-controls="collapseExample"
                        >
                          Add sub-group
                        </el-button>

                        <div class="collapse" id="addsubgroup">
                          <div class="card card-body">
                            <div class="font-weight-700 mb-3">
                              Select the group or sub-group you want to be a
                              child of this group.
                            </div>

                            <!-- <div class="d-flex flex-column flex-lg-row justify-content-center w-100">
                              <div class="input-width">
                              <div class="col-6 col-sm-6">
                                <div class="mb-1 font-weight-600 w-100">
                                  Parent Group
                                </div>
                                
                                <el-input
                                  type="text"
                                  v-model="groupData.name"
                                  disabled
                                />
                              </div>
                              <div class="col-6 ">
                                <div class="mb-1 font-weight-600 w-100">
                                  Child group
                                </div>
                                <div>
                                  <el-button
                                    class="
                                      d-flex
                                      justify-content-between
                                      align-items-center
                                    "
                                    @click="setGroupProp"
                                  >
                                    <span class="exempt-hide">{{
                                      selectedIntendedSubGroup &&
                                      Object.keys(selectedIntendedSubGroup)
                                        .length > 0
                                        ? selectedIntendedSubGroup.name
                                        : "Select group"
                                    }}</span>
                                   
                                    <el-icon class="exempt-hide">
                                      <ArrowDownBold  />
                                    </el-icon>
                                  </el-button>
                                </div>
                              </div>

                              </div>
                            </div> -->
                          <div class="row">
                          <div class="row my-4">
                            <div class="col-md-5 text-md-right">
                              <label for="">Parent group</label>
                            </div>
                            <div class="col-md-7">
                                <el-input
                                  type="text"
                                  v-model="groupData.name"
                                  disabled
                                />
                            </div>
                          </div>

                          <div class="row my-4">
                            <div class="col-md-5 text-md-right">
                              <label for="">Child group</label>
                            </div>
                            <div class="col-md-7">
                                <el-input
                                  type="text"
                                  v-model="groupData.name"
                                  disabled
                                />
                            </div>
                          </div>
                          </div>
                 





                              <el-button
                                class="
                                  default-btn
                                  primary-bg
                                  border-0
                                  text-white
                                  align-self-center
                                  mt-2
                                "
                                @click="addSubGroup"
                                round
                              >
                                Add sub group
                              </el-button>
                            <div
                              class="div-card p-2 exempt-hide"
                              :class="{
                                'd-none': hideDiv,
                                'd-block': !hideDiv,
                              }"
                            >
                              
                              <el-icon class="text-center
                                  exempt-hide"  v-if="grouploading && getAllGroup.length === 0">
                               <Loading />
                              </el-icon>
                              <input
                                type="text"
                                class="form-control exempt-hide"
                                v-model="searchGroupText"
                                ref="searchGroupRef"
                                placeholder="Search for group"
                              />
                              <GroupTree
                                :items="searchForGroups"
                                :addGroupValue="true"
                                :showCheckBox="true"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="col-12">
                        <!-- @group="setGroupData" -->
                        <GroupTree :items="groupData.children" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="row pb-4 bottom-box group-form">
            <div class="col-md-12">
              <div
                class="
                  d-flex
                  flex-column flex-sm-row
                  justify-content-sm-between
                  p-3
                "
              >
                <div class="col-md-6 text-lg-center">
                  <span class="mid-header-text py-1 px-1"
                    >Members in group</span
                  >
                </div>
               
                <el-input
                  size="small"
                  v-model="searchGroupMemberText"
                  placeholder="Search for group member by name"
                  class="input-with-select"
                  type="text"
                >
                  <template #append>
                    <el-button>
                      <el-icon :size="13">
                        <Search />
                      </el-icon>
                    </el-button>
                  </template>
                </el-input>
              </div>

              <div class="row py-2">
                <div class="col-md-12">
                  <!-- Add Member To Group Modal -->
                  <div
                    class="modal fade"
                    id="exampleModal"
                    tabindex="-1"
                    role="dialog"
                    aria-labelledby="exampleModalLabel"
                    aria-hidden="true"
                  >
                    <div class="modal-dialog" role="document" ref="modal">
                      <div class="modal-content pr-2">
                        <div class="modal-header py-3">
                          <h5
                            class="modal-title font-weight-700"
                            id="exampleModalLabel"
                          >
                            Group membership
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
                        <div class="modal-body">
                          <div class="row">
                            <div class="col-md-12">
                              <div class="row my-3">
                                <div
                                  class="
                                    col-md-4
                                    align-items-center
                                    justify-content-md-end
                                  "
                                >
                                  <label class="font-weight-600"
                                    >Select Members</label
                                  >
                                </div>

                                <div class="col-md-7 col-sm-12 px-1">
                                  <ul
                                    class="px-1 mb-0 m-dd-item"
                                    @click="() => memberSelectInput.focus()"
                                  >
                                    <li
                                      style="list-style: none; min-width: 100px"
                                      v-for="(member, indx) in selectedMembers"
                                      :key="indx"
                                      class="
                                        email-destination
                                        d-flex
                                        justify-content-between
                                        m-1
                                      "
                                    >
                                      <span>{{ member.name }}</span>
                                      <span
                                        class="ml-2 remove-email"
                                        @click="removeMember(indx)"
                                        >x</span
                                      >
                                    </li>
                                    <li
                                      style="list-style: none"
                                      class="m-dd-item"
                                    >
                                      <input
                                        type="text"
                                        class="
                                          border-0
                                          m-dd-item
                                          text
                                          outline-none
                                        "
                                        ref="memberSelectInput"
                                        @input="searchForMembers"
                                        autocomplete="off"
                                        :class="{
                                          'w-100': selectedMembers.length === 0,
                                          'minimized-input-width':
                                            selectedMembers.length > 0,
                                        }"
                                        @focus="showMemberList"
                                        @click="showMemberList"
                                        v-model="searchText"
                                        style="padding: 0.5rem"
                                        :placeholder="`${
                                          selectedMembers.length > 0
                                            ? ''
                                            : 'Select from members'
                                        }`"
                                        @blur="() => (inputBlurred = true)"
                                      />

                                      <!-- <el-input
                                          v-model="input1"
                                          class="w-100 px-1"
                                          size="large"
                                          placeholder="Please Input"
                                          ref="memberSelectInput"
                                          @input="searchForMembers"
                                          autocomplete="off"
                                          :class="{
                                          'w-100':
                                          selectedMembers.length === 0,
                                          'minimized-input-width':
                                           selectedMembers.length > 0,
                                            }"
                                             @blur="() => (inputBlurred = true)"
                                        />      -->
                                    </li>
                                  </ul>
                                  <div
                                    class="
                                      col-md-12
                                      px-0
                                      select-groups-dropdown
                                      m-dd-item
                                    "
                                    v-if="memberListShown"
                                  >
                                    <div
                                      class="dropdownmenu pt-0 w-100 m-dd-item"
                                    >
                                      <a
                                        class="
                                          dropdown-item
                                          px-1
                                          c-pointer
                                          m-dd-item
                                        "
                                        v-for="(
                                          member, index
                                        ) in memberSearchResults"
                                        :key="index"
                                        @click="selectMember(member, index)"
                                        >{{ member.nameResult }}</a
                                      >

                                      <p class="bg-secondary p-1 mb-0">
                                        Enter 3 or more characters
                                      </p>
                                      <!-- v-if="
                                                  wardSearchString.length < 3 &&
                                                  wardSearchedMembers.length === 0
                                                " -->

                                      <p
                                        aria-disabled="true"
                                        class="
                                          btn btn-default
                                          p-1
                                          mb-0
                                          disable
                                          m-dd-item
                                        "
                                        v-if="
                                          memberSearchResults.length === 0 &&
                                          searchText.length >= 3 &&
                                          !loading
                                        "
                                      >
                                        No match found
                                      </p>
                                      <p
                                        class="
                                          btn btn-default
                                          p-1
                                          mb-0
                                          disable
                                          m-dd-item
                                        "
                                        v-if="loading && searchText.length >= 3"
                                      >
                                        <i
                                          class="
                                            fas
                                            fa-circle-notch fa-spin
                                            m-dd-item
                                          "
                                        ></i>
                                      </p>
                                      <a
                                        class="
                                          font-weight-bold
                                          small-text
                                          d-flex
                                          justify-content-center
                                          py-2
                                          text-decoration-none
                                          primary-text
                                          c-pointer
                                        "
                                        style="
                                          border-top: 1px solid #002044;
                                          color: #136acd;
                                        "
                                        @click="showAddMemberForm"
                                        data-dismiss="modal"
                                      >
                                        <i
                                          class="
                                            pi pi-plus-circle
                                            mr-2
                                            primary-text
                                            d-flex
                                            align-items-center
                                          "
                                          style="color: #136acd"
                                        ></i>
                                        Add new member
                                      </a>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <!-- End -->

                              <div class="row mb-3 px-1">
                                <div
                                  class="
                                    col-md-4
                                    text-right
                                    d-flex
                                    align-items-center
                                    justify-content-md-end
                                  "
                                >
                                  <label class="font-weight-600"
                                    >Position in group</label
                                  >
                                </div>
                                <div class="col-md-7 col-sm-12 px-1">
                                  <!-- <input
                                    type="text"
                                    class="form-control"
                                    placeholder="e.g Member"
                                    v-model="position"
                                  /> -->

                                  <el-input
                                    type="text px-1"
                                    placeholder="e.g Member"
                                    v-model="position"
                                    size="large"
                                  />
                                </div>
                              </div>
                              <!-- check box start -->
                              <div class="row ml-4">
                                <div class="col-4 d-flex mt-2" v-if="true">
                                  <!-- <div class="mt-n3"> -->
                                  <label
                                    for="description"
                                    class="font-weight-600"
                                  >
                                    Is Group Leader
                                  </label>
                                  <el-checkbox
                                    v-model="isGroupLeader"
                                    :binary="true"
                                    class="ml-3"
                                  />
                                  <!-- </div> -->
                                </div>

                                <div class="col-4 d-flex mt-2">
                                  <!-- <div class="mt-n3"> -->
                                  <label
                                    for="description"
                                    class="font-weight-600"
                                  >
                                    Enable Login
                                  </label>
                                  <el-checkbox
                                    v-model="enableLogin"
                                    :binary="true"
                                    class="ml-3"
                                  />
                                  <!-- </div> -->
                                </div>
                              </div>
                              <!-- check box end -->
                            </div>
                          </div>
                        </div>
                        <div class="modal-footer mb-2">
                          <el-button
                            type="button"
                            class="default-btn cancel bg-white text-dark"
                            data-dismiss="modal"
                            round
                          >
                            Cancel
                          </el-button>

                          <el-button
                            class="
                              primary-btn
                              default-btn
                              primary-bg
                              border-0
                              outline-none
                              text-white
                            "
                            @click="addSelectedMembersToGroup"
                            :data-dismiss="modalStatus"
                            round
                          >
                            Add member
                          </el-button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- Import Member To Group Modal -->
                  <div
                    class="modal fade"
                    id="importgroup"
                    tabindex="-1"
                    role="dialog"
                    aria-labelledby="importgroupModalLabel"
                    aria-hidden="true"
                  >
                    <div
                      class="modal-dialog modal-lg modal-dialog-centered"
                      role="document"
                      ref="modal"
                    >
                      <div class="modal-content pr-2">
                        <div class="modal-header py-3">
                          <h5
                            class="modal-title font-weight-700"
                            id="importgroupModalLabel"
                          >
                            Import to group
                          </h5>
                          <button
                            type="button"
                            class="close"
                            data-dismiss="modal"
                            aria-label="Close"
                            ref="closeGroupModal"
                          >
                            <span aria-hidden="true">&times;</span>
                          </button>
                        </div>
                        <div class="modal-body">
                          <div class="row">
                            <div class="col-md-12">
                              <ImportToGroup @uploadtogroup="uploadToGroup" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <!-- Modal -->
              <div class="container">
                <!-- Button to Open the Modal -->
                <!-- <button type="button" class="btn btn-primary" >
                        Open modal
                      </button> -->

                <!-- The Modal -->
                <div class="modal fade" id="myModal">
                  <div class="modal-dialog">
                    <div class="modal-content">
                      <!-- Modal Header -->
                      <div class="modal-header">
                        <h4 class="modal-title">
                          <label class="font-weight-900 w-100"
                            >Move Members To Groups</label
                          >
                        </h4>
                        <button
                          type="button"
                          class="close"
                          data-dismiss="modal"
                        >
                          &times;
                        </button>
                      </div>

                      <!-- Modal body -->
                      <div class="modal-body">
                        <div class="col-md-12"></div>
                        <div class="col-md-12 form-group w-100">
                          <!-- <Dropdown
                            :options="getAllGroup"
                            optionLabel="name"
                            placeholder="Select Groups"
                            style="width: 100%"
                            v-model="selectGroupTo"
                          /> -->
                          <button
                            @click="setMoveGroupProp"
                            class="
                              btn
                              border
                              d-flex
                              justify-content-between
                              align-items-center
                              w-100
                            "
                          >
                            <div>
                              {{
                                selectGroupTo &&
                                Object.keys(selectGroupTo).length > 0
                                  ? selectGroupTo.name
                                  : "Select group"
                              }}
                            </div>
                            <i class="pi pi-chevron-down"></i>
                          </button>
                          <div
                            class="move-card p-2 exempt-hide"
                            :class="{
                              'd-none': moveHideDiv,
                              'd-block': !moveHideDiv,
                            }"
                          >
                            <i
                              class="
                                pi pi-spin pi-spinner
                                text-center
                                exempt-hide
                              "
                              v-if="grouploading && getAllGroup.length === 0"
                            ></i>
                            <input
                              type="text"
                              class="form-control exempt-hide"
                              v-model="searchGroupText"
                              ref="searchGroupRef"
                              placeholder="Search for group"
                            />
                            <GroupTree
                              :items="searchForGroups"
                              :addGroupValue="true"
                              @group="setSelectedGroupToMove"
                            />
                          </div>
                        </div>
                      </div>

                      <!-- Modal footer -->
                      <div class="modal-footer">
                        <button
                          type="button"
                          class="btn primary-bg default-btn border-0 text-white"
                          data-dismiss="modal"
                          @click="moveMembers"
                        >
                          Move
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <!-- Modal -->
              <div class="container">
                <!-- Button to Open the Modal -->
                <!-- <button type="button" class="btn btn-primary" >
                        Open modal
                      </button> -->

                <!-- The Modal2 -->
                <div class="modal fade" id="myModal1">
                  <div class="modal-dialog">
                    <div class="modal-content">
                      <!-- Modal Header -->
                      <div class="modal-header">
                        <h4 class="modal-title">
                          <label class="font-weight-900 w-100"
                            >Copy Members To Groups</label
                          >
                        </h4>
                        <button
                          type="button"
                          class="close"
                          data-dismiss="modal"
                        >
                          &times;
                        </button>
                      </div>

                      <!-- Modal body2 -->
                      <div class="modal-body">
                        <div class="col-md-12"></div>
                        <div class="col-md-12 form-group w-100">
                          <!-- <Dropdown
                            :options="getAllGroup"
                            optionLabel="name"
                            placeholder="Select Groups"
                            style="width: 100%"
                            v-model="copyGroupTo"
                          /> -->
                          <button
                            @click="setCopyGroupProp"
                            class="
                              btn
                              border
                              d-flex
                              justify-content-between
                              align-items-center
                              w-100
                            "
                          >
                            <div>
                              {{
                                copyGroupTo &&
                                Object.keys(copyGroupTo).length > 0
                                  ? copyGroupTo.name
                                  : "Select group"
                              }}
                            </div>
                            <i class="pi pi-chevron-down"></i>
                          </button>
                          <div
                            class="move-card p-2 exempt-hide"
                            :class="{
                              'd-none': copyHideDiv,
                              'd-block': !copyHideDiv,
                            }"
                          >
                            <i
                              class="
                                pi pi-spin pi-spinner
                                text-center
                                exempt-hide
                              "
                              v-if="grouploading && getAllGroup.length === 0"
                            ></i>
                            <input
                              type="text"
                              class="form-control exempt-hide"
                              v-model="searchGroupText"
                              ref="searchGroupRef"
                              placeholder="Search for group"
                            />
                            <GroupTree
                              :items="searchForGroups"
                              :addGroupValue="true"
                              @group="setSelectedGroupToCopy"
                            />
                          </div>
                        </div>
                      </div>

                      <!-- Modal footer2 -->
                      <div class="modal-footer">
                        <button
                          type="button"
                          class="btn primary-bg default-btn border-0 text-white"
                          data-dismiss="modal"
                          @click="copyMemberToGroup"
                        >
                          Copy
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                class="row"
                v-if="marked.length > 0 && groupMembers.length > 0"
              >
                <div class="col-md-12 d-flex align-content-between pb-2">
                  <a
                    href="#"
                    class="tool"
                    data-toggle="modal"
                    data-target="#myModal"
                  >
                    <i
                      class="
                        pi pi-reply
                        text-primary
                        c-pointer
                        d-flex
                        align-items-center
                        mr-4
                      "
                      style="font-size: 20px; font-weight: bold"
                      v-tooltip.top="'move to group'"
                    >
                    </i>
                  </a>

                  <a
                    href="#"
                    class="tool"
                    data-toggle="modal"
                    data-target="#myModal1"
                  >
                    <i
                      class="
                        pi pi-copy
                        text-primary
                        c-pointer
                        d-flex
                        align-items-center
                        mr-4
                      "
                      style="font-size: 20px; font-weight: bold"
                      v-tooltip.right="'copy to group'"
                    >
                    </i>
                  </a>
                  <i
                    class="fa fa-file-archive-o text-primary c-pointer mr-4"
                    v-tooltip.top="'Archive member(s)'"
                    @click="openPositionArchive('center')"
                    aria-hidden="true"
                    style="font-size: 20px"
                  ></i>
                  <a href="#" @click="sendMarkedMemberSms"
                    ><i class="pi pi-comment"></i
                  ></a>
                  <a href="#" @click="sendMarkedMemberEmail" class="pl-4"
                    ><i class="pi pi-envelope"></i
                  ></a>
                </div>
              </div>

              <div class="row table-header-row py-2">
                <div class="col-md-1" v-if="groupMembers.length > 0"></div>
                <div class="col-md-3">
                  <span class="py-2 font-weight-bold">NAME</span>
                </div>
                <div class="col-md-2">
                  <span class="py-2 font-weight-bold">POSITION</span>
                </div>

                <div class="col-md-2">
                  <span class="py-2 font-weight-bold">EMAIL</span>
                </div>
                <div class="col-md-2">
                  <span class="py-2 font-weight-bold">PHONE</span>
                </div>
                <div class="col-md-1"></div>
              </div>
              <div class="row" v-if="loadingMembers">
                <div class="col-md-12">
                  <div class="row">
                    <div
                      class="
                        col-md-12
                        d-flex
                        align-items-center
                        justify-content-center
                      "
                    >
                      <i class="fas fa-circle-notch fa-spin py-2"></i>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-12 px-0">
                      <hr class="hr my-0" />
                    </div>
                  </div>
                </div>
              </div>

              <div
                class="row"
                v-if="loadingMembers == false && groupMembers.length === 0"
              >
                <div class="col-md-12">
                  <div class="row">
                    <div
                      class="
                        col-md-12
                        d-flex
                        align-items-center
                        justify-content-center
                      "
                    >
                      <p class="text-center font-weight-bold py-2">
                        No members yet
                      </p>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-12 px-0">
                      <hr class="hr my-0" />
                    </div>
                  </div>
                </div>
              </div>

              <div
                class="row"
                style="border-bottom: 1px solid #00204412"
                v-if="groupMembers.length > 0"
              >
                <input
                  type="checkbox"
                  @change="markAllItem"
                  :checked="marked.length === groupMembers.length"
                  id="all"
                  name="all"
                  class="py-2 ml-3"
                />
                <div class="col text-center p-3 text-success font-weight-700">
                  Approved
                </div>
              </div>

              <div
                style="border-bottom: 1px solid #00204412"
                class="row py-2"
                v-for="(member, index) in searchGroupMembers"
                :key="index"
              >
                <div class="col-md-12">
                  <div class="row">
                    <div
                      class="
                        col-md-1
                        d-flex
                        justify-content-between
                        align-items-center
                      "
                    >
                      <input
                        type="checkbox"
                        class="py-2"
                        name=""
                        id=""
                        @change="mark1Item(member)"
                        :checked="
                          marked.findIndex(
                            (i) => i.personID === member.personID
                          ) >= 0
                        "
                      />
                    </div>
                    <div
                      class="
                        col-md-3
                        d-flex
                        justify-content-between
                        align-items-center
                      "
                    >
                      <span class="py-2 hidden-header">NAME</span>
                      <span class="py-2">{{ member.name }}</span>
                    </div>
                    <div
                      class="
                        col-md-2
                        d-flex
                        justify-content-between
                        align-items-center
                      "
                    >
                      <span class="py-2 hidden-header">POSITION</span>
                      <span class="py-2 text-xs-left">{{
                        member.position
                      }}</span>
                    </div>

                    <div
                      class="
                        col-md-2
                        d-flex
                        justify-content-between
                        align-items-center
                      "
                    >
                      <span class="py-2 hidden-header">EMAIL</span>
                      <span class="py-2">{{
                        member.email && member.email.length > 10
                          ? `${member.email.split("").slice(0, 14).join("")}...`
                          : member.email
                          ? member.email
                          : ""
                      }}</span>
                    </div>
                    <div
                      class="
                        col-md-3
                        d-flex
                        justify-content-between
                        align-items-center
                      "
                    >
                      <span class="py-2 hidden-header">PHONE</span>
                      <span class="py-2">{{ member.phone }}</span>
                    </div>
                    <div
                      class="
                        col-md-1
                        d-flex
                        justify-content-between
                        align-items-center
                      "
                    >
                      <div class="dropdown">
                        <i
                          class="fas fa-ellipsis-v cursor-pointer"
                          id="dropdownMenuButton"
                          data-toggle="dropdown"
                          aria-haspopup="true"
                          aria-expanded="false"
                        ></i>
                        <div
                          class="dropdown-menu"
                          aria-labelledby="dropdownMenuButton"
                        >
                          <!-- <a class="dropdown-item c-pointer" > -->
                          <a
                            class="dropdown-item c-pointer"
                            v-if="member.phone"
                          >
                            <a @click="test(member)"> Send SMS</a>
                          </a>
                          <a
                            class="dropdown-item c-pointer"
                            v-if="member.email"
                          >
                            <!-- <a class="dropdown-item c-pointer"> -->
                            <a @click="testEmail(member)">Send Email</a>
                          </a>
                          <a
                            class="dropdown-item cursor-pointer"
                            @click="archive(member.personID, 'single')"
                          >
                            Archive
                          </a>
                          <a
                            class="dropdown-item c-pointer"
                            @click="confirmDelete(member.id, index)"
                            >Remove</a
                          >
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div
                class="row"
                style="border-bottom: 1px solid #00204412"
                v-if="awaitingApprovals.length > 0"
              >
                <div class="col text-center p-3 text-warning font-weight-700">
                  Waiting Approval
                </div>
              </div>

              <div
                style="border-bottom: 1px solid #00204412"
                class="row py-2"
                v-for="(member, index) in awaitingApprovals"
                :key="index"
              >
                <div class="col-md-12">
                  <div class="row">
                    <div
                      class="
                        col-md-1
                        d-flex
                        justify-content-between
                        align-items-center
                      "
                    >
                      <input
                        type="checkbox"
                        class="py-2"
                        name=""
                        id=""
                        @change="mark1Item(member)"
                        :checked="
                          marked.findIndex(
                            (i) => i.personID === member.personID
                          ) >= 0
                        "
                      />
                    </div>
                    <div
                      class="
                        col-md-3
                        d-flex
                        justify-content-between
                        align-items-center
                      "
                    >
                      <span class="py-2 hidden-header">NAME</span>
                      <span class="py-2">{{ member.name }}</span>
                    </div>
                    <div
                      class="
                        col-md-2
                        d-flex
                        justify-content-between
                        align-items-center
                      "
                    >
                      <span class="py-2 hidden-header">POSITION</span>
                      <span class="py-2 text-xs-left">{{
                        member.position
                      }}</span>
                    </div>
                    <!-- <div
                      class="col-md-2 d-flex justify-content-between align-items-center"
                    >
                      <span class="py-2 hidden-header">ADDRESS</span>
                      <span class="py-2">{{ member.addres }}</span>
                    </div> -->
                    <div
                      class="
                        col-md-2
                        d-flex
                        justify-content-between
                        align-items-center
                      "
                    >
                      <span class="py-2 hidden-header">EMAIL</span>
                      <span class="py-2">{{
                        member.email && member.email.length > 10
                          ? `${member.email.split("").slice(0, 14).join("")}...`
                          : member.email
                          ? member.email
                          : ""
                      }}</span>
                    </div>
                    <div
                      class="
                        col-md-3
                        d-flex
                        justify-content-between
                        align-items-center
                      "
                    >
                      <span class="py-2 hidden-header">PHONE</span>
                      <span class="py-2">{{ member.phone }}</span>
                    </div>
                    <div
                      class="
                        col-md-1
                        d-flex
                        justify-content-between
                        align-items-center
                      "
                    >
                      <div class="dropdown">
                        <i
                          class="fas fa-ellipsis-v cursor-pointer"
                          id="dropdownMenuButton"
                          data-toggle="dropdown"
                          aria-haspopup="true"
                          aria-expanded="false"
                        ></i>
                        <div
                          class="dropdown-menu"
                          aria-labelledby="dropdownMenuButton"
                        >
                          <a
                            class="dropdown-item c-pointer"
                            v-if="member.phone"
                          >
                            <a @click="test(member)">Send SMS</a>
                          </a>
                          <a
                            class="dropdown-item c-pointer"
                            v-if="member.email"
                          >
                            <a @click="testEmail(member)">Send Email</a>
                          </a>
                          <a
                            class="dropdown-item cursor-pointer"
                            @click="requestApproval(member)"
                          >
                            Request Approval
                          </a>
                          <a
                            class="dropdown-item cursor-pointer"
                            @click="archive(member.personID, 'single')"
                          >
                            Archive
                          </a>
                          <a
                            class="dropdown-item c-pointer"
                            @click="confirmDelete(member.id, index)"
                            >Remove</a
                          >
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

      <div class="row py-3 my-3" v-if="showGroup">
        <div class="col-md-12">
          <p
            class="text-right text-danger font-weight-bold pr-2"
            v-if="groupNameIsInvalid"
          >
            Please enter group name
          </p>
        </div>
        <div class="col-md-12 d-flex justify-content-end action-btns">
          <router-link
            to="/tenant/peoplegroups"
            class="secondary-btn bg-white text-dark"
            >Discard</router-link
          >
          <button
            class="primary-btn default-btn primary-bg border-0 outline-none"
            @click="saveGroupData"
            :disabled="savingGroup"
          >
            <i class="fas fa-circle-notch fa-spin" v-if="savingGroup"></i>
            {{ buttonText }}
          </button>
        </div>
      </div>
    </div>
    <Dialog
      header="Create New Member"
      v-model:visible="display"
      :style="{ width: '70vw', maxWidth: '600px' }"
      :modal="true"
      position="top"
    >
      <div class="row">
        <div class="col-md-12">
          <NewPerson
            @cancel="() => (display = false)"
            @person-id="getWardId($event)"
            @show-group-modal="setGroupModal"
          />
        </div>
      </div>
    </Dialog>
    <Dialog
      header="Archive members"
      v-model:visible="displayPositionArchive"
      :breakpoints="{ '960px': '75vw' }"
      :style="{ width: window.innerWidth > 767 ? '50vw' : '100vw' }"
      :position="positionArchive"
      :modal="true"
    >
      <p class="p-m-0">
        You are about to archive your member(s). Do you want to continue ?
      </p>
      <template #footer>
        <div class="d-flex justify-content-end">
          <div
            class="default-btn bg-white text-center mr-2 c-pointer"
            @click="closeArchiveModal"
          >
            No
          </div>
          <div
            class="
              default-btn
              border-0
              primary-bg
              text-center text-white
              c-pointer
            "
            @click="archive('', 'multiple')"
          >
            Yes
          </div>
        </div>
      </template>
    </Dialog>
    <SideBar
      :show="showSMS"
      :title="'Compose SMS'"
      @closesidemodal="() => (showSMS = false)"
    >
      <div class="m-wrapper">
        <smsComponent
          :phoneNumbers="contacts"
          @closesidemodal="() => (showSMS = false)"
        />
      </div>
    </SideBar>
    <SideBar
      :show="showEmail"
      :title="'Compose Email'"
      @closesidemodal="() => (showEmail = false)"
    >
      <div class="m-wrapper2">
        <emailComponent
          :selectedGroupMembers="selectedGroupMembers"
          @closesidemodal="() => (showEmail = false)"
        />
      </div>
    </SideBar>
  </div>
</template>

<script>
import { computed, nextTick, ref, watchEffect } from "vue";
import composeService from "../../services/communication/composer";
import axios from "@/gateway/backendapi";
import router from "@/router/index";
import { useRoute } from "vue-router";
import { useToast } from "primevue/usetoast";
import { useConfirm } from "primevue/useconfirm";
import groupsService from "../../services/groups/groupsservice";
import Tooltip from "primevue/tooltip";
import Dropdown from "primevue/dropdown";
import store from "../../store/store";
import NewPerson from "../../components/membership/NewDonor.vue";
import Dialog from "primevue/dialog";
import finish from "../../services/progressbar/progress.js";
import smsComponent from "./component/smsComponent.vue";
import emailComponent from "./component/emailComponent.vue";
import SideBar from "./sidemodal/SideModal.vue";
// import Attendancecheckin from "../event/attendance&checkin/MarkAttendance.vue"
import Attendancecheckin from "../event/attendance&checkin/AttendanceAndCheckinList.vue";
// import Attendancevue from "../event/attendance&checkin/Attendance.vue"
// import Attendancecheckin from "../event/attendance&checkin/MarkAttendance.vue"
import attendanceservice from "../../services/attendance/attendanceservice";
import ImportToGroup from "../people/ImportInstruction";
import GroupTree from "./component/GroupTree.vue";
import { ElMessage } from "element-plus";
import { useStore } from "vuex";

export default {
  directives: {
    tooltip: Tooltip,
  },
  components: {
    Dropdown,
    Dialog,
    NewPerson,
    Attendancecheckin,
    smsComponent,
    SideBar,
    emailComponent,
    ImportToGroup,
    GroupTree,
  },
  setup() {
    const store = useStore();
    const display = ref(false);
    //  const showWardModal = ref(false)
    const memberDia = ref(true);
    const modalBtn = ref(null);
    const groupData = ref({});
    // const wardSearchString = ref("");
    const searchText = ref("");
    const loading = ref(false);
    const loadingMembers = ref(false);
    const memberSearchResults = ref([]);
    // const wardSearchedMembers = ref([]);
    const position = ref("");
    const memberSelectInput = ref(null);
    const marked = ref([]);
    const confirm = useConfirm();
    let selectMembers = ref("");
    const getAllGroup = ref([]);
    const selectGroupTo = ref({});
    const copyGroupTo = ref({});
    const awaitingApprovals = ref([]);
    const contacts = ref([]);
    const showGroup = ref(true);
    const attendanceData = ref([]);
    const showAttendanceCheckin = ref(false);
    const selectedGroupMembers = ref([]);
    const showSMS = ref(false);
    const isGroupLeader = ref(false);
    const enableLogin = ref(false);
    const showEmail = ref(false);
    const totalItems = ref("");
    const positionArchive = ref("center");
    const displayPositionArchive = ref(false);
    const searchGroupMemberText = ref("");
    const field = ref();
    const groups = ref([]);
    const hideDiv = ref(true);
    const selectedIntendedSubGroup = ref({});
    const searchGroupText = ref("");
    const grouploading = ref(false);
    const searchGroupRef = ref();
    const closeGroupModal = ref();
    const lastGroupChild = ref({});
    const moveHideDiv = ref(true);
    const copyHideDiv = ref(true);

    const getGroups = async () => {
      grouploading.value = true;
      try {
        const { data } = await axios.get("/api/GetAllGroupBasicInformation");
        console.log(getAllGroup.value);
        getAllGroup.value = data;
        grouploading.value = false;
      } catch (error) {
        console.log(error);
        grouploading.value = false;
      }
    };
    getGroups();

    const test = (member) => {
      if (member.phone) {
        showSMS.value = true;
        showEmail.value = false;
        contacts.value = member.phone;
      } else {
        alert("No phone number");
      }
    };
    const testEmail = (member) => {
      if (member.email) {
        showEmail.value = true;
        showSMS.value = false;
        selectedGroupMembers.value.push({ id: member.personID });
      }
    };
    const selectedAttendanceId = ref("");
    const showAddMemberForm = () => {
      display.value = true;
    };

    const displayView = () => {
      showGroup.value = false;
      showAttendanceCheckin.value = true;
    };

    const attendanceCheckin = async () => {
      const response = await attendanceservice.getItems();
      attendanceData.value = response.items.filter(
        (i) => i.groupID === route.params.groupId
      );
      totalItems.value = response.totalItems;
      const attendanceItem = response.items.find(
        (i) => i.groupID === route.params.groupId
      );
      if (attendanceItem && attendanceItem.id)
        selectedAttendanceId.value = attendanceItem.id;
      return attendanceItem;
    };
    attendanceCheckin();
    const groupDetail = async () => {
      showGroup.value = true;
      showAttendanceCheckin.value = false;
    };

    const moveMembers = () => {
      let memberMove = {
        memberIDList: marked.value.map((i) => i.personID),
        groupTo: selectGroupTo.value.id,
        groupFrom: route.params.groupId,
      };
      axios
        .post(`/api/Group/MoveMembers`, memberMove)
        .then((res) => {
          // toast.add({
          //   severity: "success",
          //   summary: "Confirmed",
          //   detail: "Member(s) Moved Successfully",
          //   life: 4000,
          // });
          ElMessage({
            message: "Member(s) Moved Successfully",
            type: "success",
            duration: 4000,
          });
          console.log(res);
          store.dispatch("groups/updateGroupPeopleCount", {
            groupId: selectGroupTo.value.id,
            count: marked.value.length,
            operation: "add",
          });
          store.dispatch("groups/updateGroupPeopleCount", {
            groupId: route.params.groupId,
            count: marked.value.length,
            operation: "remove",
          });

          // Remove from view
          groupMembers.value = groupMembers.value.filter((i) => {
            let match = marked.value.findIndex(
              (j) => j.personID === i.personID
            );
            if (match >= 0) return false;
            return true;
          });
        })
        .catch((err) => {
          finish();
          if (err.toString().toLowerCase().includes("network error")) {
            // toast.add({
            //   severity: "warn",
            //   summary: "Network error",
            //   detail: "Please ensure you have a strong internet",
            //   life: 4000,
            // });
            ElMessage({
              message: "Please ensure you have a strong internet",
              type: "Warn",
              life: "4000",
            });
          } else if (err.toString().toLowerCase().includes("timeout")) {
            // toast.add({
            //   severity: "warn",
            //   summary: "Request took too long",
            //   detail: "Please refresh the page",
            //   life: 4000,
            // });
            ElMessage({
              message: "",
              type: "",
              life: "4000",
              showClose: true,
            });
          }
        });
    };
    const copyMemberToGroup = () => {
      let copyMember = {
        memberIDList: marked.value.map((i) => i.personID),
        groupTo: copyGroupTo.value.id,
        groupFrom: route.params.groupId,
      };
      axios
        .post(`/api/Group/CopyMembers`, copyMember)
        .then((res) => {
          // toast.add({
          //   severity: "success",
          //   summary: "Confirmed",
          //   detail: "Member(s) Copy Successfully",
          //   life: 2500,
          // });
          ElMessage({
            message: "Confirmed",
            type: "success",
            life: "4000",
            showClose: true,
          });
          console.log(res);
          store.dispatch("groups/updateGroupPeopleCopy", {
            groupId: copyGroupTo.value.id,
            count: marked.value.length,
          });
        })
        .catch((err) => {
          finish();
          if (err.toString().toLowerCase().includes("network error")) {
            // toast.add({
            //   severity: "warn",
            //   summary: "Network error",
            //   detail: "Please ensure you have a strong internet",
            //   life: 4000,
            // });
            ElMessage({
              message: "Please ensure you have a strong internet",
              type: "Warn",
              life: "4000",
              showClose: true,
            });
          } else if (err.toString().toLowerCase().includes("timeout")) {
            // toast.add({
            //   severity: "warn",
            //   summary: "Request took too long",
            //   detail: "Please refresh the page",
            //   life: 4000,
            // });
            ElMessage({
              message: "Please refresh the page",
              type: "warn",
              life: "4000",
            });
          }
        });
    };
    const mark1Item = (member) => {
      console.log(member);
      const memberIndex = marked.value.findIndex(
        (i) => i.personID === member.personID
      );
      if (memberIndex < 0) {
        marked.value.push(member);
      } else {
        marked.value.splice(memberIndex, 1);
      }
    };
    const markAllItem = () => {
      if (marked.value.length < groupMembers.value.length) {
        groupMembers.value.forEach((i) => {
          const groupInMarked = marked.value.findIndex(
            (q) => q.personID === i.personID
          );
          if (groupInMarked < 0) {
            marked.value.push(i);
          }
        });
      } else {
        marked.value.splice(0, marked.value.length);
      }
    };

    const confirmDelete = (id, index) => {
      confirm.require({
        message: "Do you want to remove this member?",
        header: "Remove Confirmation",
        icon: "pi pi-info-circle",
        acceptClass: "confirm-delete",
        rejectClass: "cancel-delete",
        accept: () => {
          groupsService
            .removeFromGroup(route.params.groupId, {
              groupId: route.params.groupId,
              personIds: [`${id}`],
            })
            .then((res) => {
              if (res !== false) {
                groupMembers.value.splice(index, 1);
                // toast.add({
                //   severity: "success",
                //   summary: "Confirmed",
                //   detail: "The member was removed",
                //   life: 2500,
                // });
                ElMessage({
                  message: "The member was removed",
                  type: "success",
                  duration: "2500",
                });
                groupsService.editGroupInStore(
                  { name: groupData.value.name, id: route.params.groupId },
                  groupMembers.value.length
                );
              }
            });
        },
        reject: () => {
          // toast.add({severity:'info', summary:'Rejected', detail:'You have rejected', life: 3000});
        },
      });
    };

    const sendMarkedMemberSms = () => {
      contacts.value = marked.value
        .filter((i) => i.phone)
        .map((i) => i.phone)
        .join();
      showSMS.value = true;
    };
    const sendMarkedMemberEmail = () => {
      selectedGroupMembers.value = marked.value.map((i) => {
        i.id = i.personID;
        return i;
      });
      showEmail.value = true;
    };
    const searchForMembers = (e) => {
      if (e.target.value.length >= 3) {
        memberSearchResults.value = [];
        loading.value = true;
        composeService
          .searchMemberDB("/api/Membership/GetSearchedUSers", e.target.value)
          .then((res) => {
            loading.value = false;
            // memberSearchResults.value = res;
            memberSearchResults.value = res.filter((i) => {
              const memberInExistingMembers = selectedMembers.value.findIndex(
                (j) => j.id === i.id
              );
              if (
                memberInExistingMembers >= 0 ||
                groupMembers.value.findIndex((k) => k.personID === i.id) >= 0
              )
                return false;
              return true;
            });
          });
      } else {
        memberSearchResults.value = [];
      }
    };

    const memberListShown = ref(false);
    const inputBlurred = ref(true);
    const showMemberList = () => {
      memberListShown.value = true;
      inputBlurred.value = false;
    };

    const selectedMembers = ref([]);
    const selectMember = (member, index) => {
      selectedMembers.value.push(member);
      memberSearchResults.value.splice(index, 1);
      searchText.value = "";
      memberListShown.value = false;
      memberSearchResults.value = [];
    };

    const removeMember = (index) => {
      selectedMembers.value.splice(index, 1);
    };

    const modalStatus = ref("");
    const groupMembers = ref([]);

    const getWardId = (payload) => {
      let body = {
        name: payload.personFirstName,
        personId: payload.personId,
        email: payload.personEmail,
        phoneNumber: payload.personNumber,
      };
      selectedMembers.value.push(body);
    };
    const addSelectedMembersToGroup = () => {
      if (selectedMembers.value.length === 0) {
        modalStatus.value = "modal";
        return false;
      }
      selectedMembers.value.forEach((i) => {
        i.position = position.value;
        i.personID = i.id;
        i.enableLogin = enableLogin.value;
        i.isGroupLeader = isGroupLeader.value;
        groupMembers.value.push(i);
      });

      if (route.params.groupId) {
        groupData.value.peopleInGroups = groupMembers.value;
        updateGroup(groupData.value, false);
      }
      modalStatus.value = "modal";
      position.value = "";
      memberSearchResults.value = [];
      selectedMembers.value = [];
    };

    const invalidSearchText = computed(() => {
      const searchTextIsValid =
        searchText.value.length < 3 &&
        loading.value == false &&
        memberSearchResults.value.length === 0;
      return searchTextIsValid;
    });

    const groupNameIsInvalid = ref(false);
    const savingGroup = ref(false);
    const toast = useToast();

    const setGroupModal = () => {
      modalBtn.value.click();
    };

    const saveGroupData = () => {
      if (!groupData.value.name) {
        groupNameIsInvalid.value = true;
        return false;
      }

      groupData.value.peopleInGroups = groupMembers.value;
      if (!route.params.groupId) {
        savingGroup.value = true;
        createGroup(groupData.value);
      } else {
        savingGroup.value = true;
        updateGroup(groupData.value, true);
      }
    };

    const updateGroup = (data, redirect) => {
      axios
        .put(`/api/UpdateGroup/${route.params.groupId}`, data)
        .then((res) => {
          savingGroup.value = false;
          groupsService.editGroupInStore(res.data, groupMembers.value.length);

          groupMembers.value.map((i) => {
            const findData = res.data.peopleInGroups.findIndex(
              (j) => j.personID == i.personID
            );
            if (findData >= 0) {
              i.id = res.data.peopleInGroups[findData].id;
            }
            return i;
          });

          // store.dispatch("groups/getGroups")
          if (redirect) {
            router.push("/tenant/peoplegroups");
          } else {
            // toast.add({
            //   severity: "success",
            //   summary: "Group Updated",
            //   detail: "Group members update successfully",
            //   life: 2500,
            // });
            ElMessage({
              message: "Group members updated successfully",
              type: "success",
              duration: "2500",
            });
          }
        })
        .catch((err) => {
          finish();
          savingGroup.value = false;
          console.log(err);
          // toast.add({
          //   severity: "error",
          //   summary: "Update Error",
          //   detail: "Failed updating group",
          //   life: 2500,
          // });
          ElMessage({
            message: "Failed updating group",
            type: "error",
            duration: "2500",
          });
        });
    };

    const createGroup = (data) => {
      axios
        .post("/api/CreateGroup", data)
        .then((res) => {
          console.log(res, "create res");
          groupsService.addGroupToStore(res.data, groupMembers.value.length);
          // store.dispatch("groups/getGroups")
          savingGroup.value = false;
          router.push("/tenant/peoplegroups");
        })
        .catch((err) => {
          finish();
          savingGroup.value = false;
          console.log(err.response);
          ElMessage({
            message: "Failed saving group",
            type: "error",
            duration: "2500",
          });
        });
    };

    const validateGroupName = (e) => {
      if (e.target.value) {
        groupNameIsInvalid.value = false;
      }
    };

    const route = useRoute();

    const getGroupById = async () => {
      try {
        loadingMembers.value = true;

        const { data } = await axios.get(
          `/api/GetGroupsFromId/${route.params.groupId}`,
          groupData.value
        );
        loadingMembers.value = false;
        groupData.value.name = data.name;
        groupData.value.description = data.description;
        groupData.value.isMobileGroup = data.isMobileGroup;
        groupData.value.children = data.children;

        data.peopleInGroups.forEach((i) => {
          const person = {
            id: i.id,
            personID: i.person.id,
            address: i.person.address,
            email: i.person.email,
            name: `${i.person.firstName ? i.person.firstName : ""} ${
              i.person.lastName ? i.person.lastName : ""
            }`,
            phone: i.person.phoneNumber,
            position: i.position,
          };
          groupMembers.value.push(person);
        });

        awaitingApprovals.value = data.awaitingApprovals.map((i) => {
          return {
            personID: i.person.id,
            address: i.person.address,
            email: i.person.email,
            name: `${i.person.firstName ? i.person.firstName : ""} ${
              i.person.lastName ? i.person.lastName : ""
            }`,
            phone: i.person.phoneNumber,
            position: i.position,
            groupID: i.groupID,
          };
        });

        console.log(selectedMembers.value, "SM");
      } catch (error) {
        finish();
        loadingMembers.value = false;
        console.log(error.response);
        if (error.toString().toLowerCase().includes("network error")) {
          // toast.add({
          //   severity: "warn",
          //   summary: "Network error",
          //   detail: "Please ensure you have a strong internet",
          //   life: 4000,
          // });
          ElMessage({
            message: "Please ensure you have a strong internet",
            type: "warn",
            duration: "4000",
          });
        } else if (error.toString().toLowerCase().includes("timeout")) {
          // toast.add({
          //   severity: "warn",
          //   summary: "Request took too long",
          //   detail: "Please refresh the page",
          //   life: 4000,
          // });
          ElMessage({
            message: "Please refresh the page",
            type: "warn",
            duration: "4000",
          });
        }
      }
    };

    const buttonText = computed(() => {
      if (route.params.groupId) return "Update";
      return "Save";
    });

    if (route.params.groupId) getGroupById();

    const closeDropdownIfOpen = (e) => {
      if (!e.target.classList.contains("m-dd-item")) {
        memberListShown.value = false;
        searchText.value = "";
        memberListShown.value = false;
        memberSearchResults.value = [];
      }

      if (
        !e.target.classList.contains("exempt-hide") &&
        !e.target.classList.contains("p-hidden-accessible") &&
        !e.target.classList.contains("p-checkbox-box") &&
        !e.target.classList.contains("p-checkbox-icon")
      ) {
        hideDiv.value = true;
      }
    };

    const importMember = () => {
      if (!route.params.groupId) {
        // toast.add({
        //   severity: "warn",
        //   summary: "Create a group",
        //   detail: "Please ensure you create the group first before you import",
        //   life: 5000,
        // });
        ElMessage({
          message: "Please ensure you create the group first before you import",
          type: "warn",
          duration: "5000",
        });
      }
    };
    const requestApproval = async (member) => {
      const memberToApprove = {
        groupId: member.groupID,
        email: member.email,
        personId: member.personID,
        approvalName: member.name,
        position: member.position,
        phone: member.phone,
      };
      console.log(memberToApprove);
      try {
        const res = await axios.post(
          "/api/ApproveMemberFromApp",
          memberToApprove
        );
        console.log(res);
        // toast.add({
        //   severity: "success",
        //   summary: "Approved",
        //   detail: "Member approved successfully",
        //   life: 4000,
        // });
        ElMessage({
          message: "Member approved successfully",
          type: "Success",
          duration: "4000",
        });
        awaitingApprovals.value = awaitingApprovals.value.filter((i) => {
          return i.personID !== member.personID;
        });

        groupMembers.value.push(member);
      } catch (error) {
        finish();
        if (error.toString().toLowerCase().includes("network error")) {
          // toast.add({
          //   severity: "warn",
          //   summary: "Network error",
          //   detail: "Please ensure you have a strong internet",
          //   life: 4000,
          // });
          ElMessage({
            message: "Please ensure you have a strong internet",
            type: "warn",
            duration: "4000",
          });
        } else if (error.toString().toLowerCase().includes("timeout")) {
          // toast.add({
          //   severity: "warn",
          //   summary: "Request took too long",
          //   detail: "Please refresh the page",
          //   life: 4000,
          // });
          ElMessage({
            message: "Please refresh the page",
            type: "warn",
            duration: "4000",
          });
        }
        console.log(error);
      }
    };

    const uploadToGroup = (payload) => {
      payload.forEach((i) => {
        groupMembers.value.push({
          personID: i.person.id,
          address: i.person.address,
          email: i.person.email,
          name: `${i.person.firstName ? i.person.firstName : ""} ${
            i.person.lastName ? i.person.lastName : ""
          }`,
          phone: i.person.mobilePhone,
          position: i.position,
        });
      });
      closeGroupModal.value.click();
    };

    const openPositionArchive = (pos) => {
      positionArchive.value = pos;
      displayPositionArchive.value = true;
    };

    const closeArchiveModal = () => {
      displayPositionArchive.value = false;
    };

    const archive = async (id, type) => {
      console.log(marked.value);
      let archiveBody =
        type == "single" ? [id] : marked.value.map((i) => i.personID);
      console.log(archiveBody);
      try {
        const { data } = await axios.post("/api/People/archive", archiveBody);
        if (data && type == "single") {
          groupMembers.value = groupMembers.value.filter((item) => {
            return item.personID !== id;
          });
          // toast.add({
          //   severity: "success",
          //   summary: "Archived",
          //   detail: "Member archived succesfully",
          //   life: 5000,
          // });
          ElMessage({
            message: "Member archived successfully",
            type: "success",
            duration: "5000",
          });
        }
        if (data && type == "multiple") {
          groupMembers.value = groupMembers.value.filter((item) => {
            let y = marked.value.findIndex((j) => j.personID == item.personID);
            if (y >= 0) return false;
            return true;
          });
          // toast.add({
          //   severity: "success",
          //   summary: "Archived",
          //   detail: "Member(s) archived succesfully",
          //   life: 5000,
          // });
          ElMessage({
            message: "Member(s) archived successfully",
            type: "success",
            duration: "5000",
          });
          displayPositionArchive.value = false;
        }
      } catch (err) {
        console.log(err);
      }
    };

    const innerWidth = computed(() => {
      return window.innerWidth;
    });

    const searchGroupMembers = computed(() => {
      if (groupMembers.value.length > 0 && searchGroupMemberText.value == "")
        return groupMembers.value;
      return groupMembers.value.filter((i) =>
        i.name.toLowerCase().includes(searchGroupMemberText.value.toLowerCase())
      );
    });

    watchEffect(() => {
      if (store.getters["groups/selectedTreeGroup"]) {
        // console.log(store.getters['groups/selectedTreeGroup'])
        const selectedGroup = store.getters["groups/selectedTreeGroup"];
        hideDiv.value = true;
        selectedIntendedSubGroup.value = selectedGroup;
      }
    });

    const addSubGroup = async () => {
      try {
        const { data } = await axios.post(
          `/api/Group/AddSubGroupToGroup?SuperGroupID=${route.params.groupId}&&SubGroupID=${selectedIntendedSubGroup.value.id}`
        );
        // toast.add({
        //   severity: "success",
        //   summary: "Successful",
        //   detail: `${data.response}`,
        //   life: 4000,
        // });
        ElMessage({
          message: `${data.response}`,
          type: "success",
          duration: "4000",
        });
        groupData.value.children.push(data.returnObject);
        console.log(data);
      } catch (error) {
        console.log(error.response);
        if (error.response) {
          // toast.add({
          //   severity: "error",
          //   summary: "Unsuccessful",
          //   detail: `${error.response}`,
          //   life: 4000,
          // });
          ElMessage({
            message: `${error.response}`,
            type: "error",
            duration: "4000",
          });
        }
      }
    };

    const setCopyGroupProp = () => {
      copyHideDiv.value = !copyHideDiv.value;
      nextTick(() => {
        searchGroupRef.value.focus();
      });
    };

    const setMoveGroupProp = () => {
      moveHideDiv.value = !moveHideDiv.value;
      nextTick(() => {
        searchGroupRef.value.focus();
      });
    };

    const setGroupProp = () => {
      hideDiv.value = !hideDiv.value;
      nextTick(() => {
        searchGroupRef.value.focus();
      });
    };

    const searchForGroups = computed(() => {
      if (!searchGroupText.value && getAllGroup.value.length > 0)
        return getAllGroup.value;
      return getAllGroup.value.filter((i) =>
        i.name.toLowerCase().includes(searchGroupText.value.toLowerCase())
      );
    });

    const setChildGroup = (payload) => {
      console.log(payload);
    };

    watchEffect(() => {
      if (store.getters["groups/selectedTreeGroupList"]) {
        const selectedGroup = store.getters["groups/selectedTreeGroupList"];
        lastGroupChild.value = selectedGroup;
        console.log(selectedGroup);
      }
    });

    const setSelectedGroupToMove = (payload) => {
      if (payload.iconElement.classList.contains("p-3")) {
        selectGroupTo.value = payload.selectedGroup
          ? payload.selectedGroup
          : lastGroupChild.value;
        moveHideDiv.value = true;
      }
    };

    const setSelectedGroupToCopy = (payload) => {
      if (payload.iconElement.classList.contains("p-3")) {
        copyGroupTo.value = payload.selectedGroup
          ? payload.selectedGroup
          : lastGroupChild.value;
        copyHideDiv.value = true;
      }
    };

    return {
      groupData,
      selectedAttendanceId,
      searchForMembers,
      searchText,
      loading,
      memberSearchResults,
      selectMember,
      removeMember,
      selectedMembers,
      groupMembers,
      addSelectedMembersToGroup,
      showAddMemberForm,
      invalidSearchText,
      position,
      modalStatus,
      groupNameIsInvalid,
      saveGroupData,
      validateGroupName,
      buttonText,
      loadingMembers,
      route,
      savingGroup,
      memberSelectInput,
      showMemberList,
      memberListShown,
      inputBlurred,
      closeDropdownIfOpen,
      confirmDelete,
      marked,
      markAllItem,
      mark1Item,
      selectMembers,
      memberDia,
      display,
      getAllGroup,
      selectGroupTo,
      moveMembers,
      copyGroupTo,
      copyMemberToGroup,
      awaitingApprovals,
      requestApproval,
      setGroupModal,
      modalBtn,
      contacts,
      test,
      attendanceCheckin,
      groupDetail,
      showGroup,
      showAttendanceCheckin,
      // wardSearchString,
      getWardId,
      totalItems,
      attendanceData,
      testEmail,
      selectedGroupMembers,
      showSMS,
      showEmail,
      isGroupLeader,
      enableLogin,
      sendMarkedMemberSms,
      sendMarkedMemberEmail,
      // showWardModal
      //  getWardId,
      uploadToGroup,
      closeGroupModal,
      displayView,
      archive,
      openPositionArchive,
      positionArchive,
      displayPositionArchive,
      closeArchiveModal,
      importMember,
      route,
      window,
      innerWidth,
      searchGroupMemberText,
      searchGroupMembers,
      field,
      groups,
      // setSelectedGroup,
      setGroupProp,
      setMoveGroupProp,
      hideDiv,
      moveHideDiv,
      copyHideDiv,
      selectedIntendedSubGroup,
      addSubGroup,
      searchGroupText,
      searchForGroups,
      searchGroupRef,
      setChildGroup,
      grouploading,
      setSelectedGroupToMove,
      lastGroupChild,
      setSelectedGroupToCopy,
      setCopyGroupProp,
      // setGroupData
    };
  },
};
</script>

<style scoped>
* {
  box-sizing: border-box;
}
.botom {
  border-bottom: 7px solid rgb(252, 248, 248);
  border-radius: 2px;
  position: relative;
  /* border-bottom-right-radius: 10px;
  border-bottom-left-radius: 10px; */

  /* height: 4px; */
}
.add-person-btn {
  background: #136acd;
  color: #fff;
}
.buttonn {
  padding: 8px 20px;
  border: none;
  border-radius: 22px;
  font-size: 16px;
  font-weight: 600;
  margin: 0 8px;
  outline: none;
  text-decoration: none;
  box-sizing: border-box;
}

.mid-header-row {
  border-bottom: 1px solid #dde2e6;
}

.events {
  font: normal normal 800 29px Nunito sans;
}
/* hr{
      color: gainsboro;
      background-color: hotpink;
      height: 5px;
      width : 100%;
    } */

.baseline {
  transition: all 150ms ease-in-out;
  background-color: #136acd;
  position: relative;
  border-radius: 10px;
  height: 4px;
  top: 5px;
  left: 0px;
  /* width: 35%; */
  opacity: 1;
}

.hide-base {
  transition: all 150ms ease-in-out;
  background-color: #136acd;
  position: relative;
  border-radius: 10px;
  z-index: 175;
  height: 4px;
  top: 35px;
  left: 0px;
  opacity: 0;
}
.baselinetwo {
  transition: all 150ms ease-in-out;
  background-color: #136acd;
  position: relative;
  border-radius: 10px;
  height: 4px;
  top: 5px;
  left: 0px;
  opacity: 1;
}
.m-wrapper {
  background-color: white !important;
  width: 875px;
  position: absolute;
  right: 0px;
  top: 0;
  height: 100%;
  padding: 70px;
}
.m-wrapper2 {
  background-color: white !important;
  width: 875px;
  position: absolute;
  right: 0px;
  top: 0;
  /* height: 100%; */
  padding: 70px;
}

.hide-basetwo {
  transition: all 150ms ease-in-out;
  background-color: #136acd;
  position: absolute;
  /* background-color: #33475b; */
  /* color: #136acd" */
  border-radius: 10px;
  /* bottom: -2.5px; */
  z-index: 175;
  height: 4px;
  top: 36px;
  left: 0px;
  width: 50%;
  opacity: 0;
}

.btnn {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
}

.dropdown {
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  width: 100%;
}
/* .check-box{
     vertical-align:middle;
  } */
@media screen and (max-width: 947px) {
  .m-wrapper,
  .m-wrapper2 {
    width: 700px;
    padding: 50px;
  }
}

@media screen and (max-width: 767px) {
  /* .baseline {
            width: 40%;
        }
        .hide-base {
            width: 40%;
        } */
  .m-wrapper,
  .m-wrapper2 {
    width: 400px;
    padding: 40px;
  }
}
@media screen and (max-width: 575px) {
  /* .baseline {
            width: 20%;
        }
        .hide-base {
            width: 20%;
        } */
  .events {
    padding-bottom: 22px;
    font: normal normal 800 29px Nunito sans;
    font-size: x-large;
    /* padding-top: -10px; */
  }
  .botom {
    display: flex;
    gap: 1.5rem;
  }
  .c-pointer {
    cursor: pointer;
    flex: 1;
  }
  .m-wrapper,
  .m-wrapper2 {
    width: 350px;
    padding: 20px;
  }
}

@media (max-width: 399px) {
  .actions {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}
.remove-btn {
  background: red !important;
  padding: 10px 20px;
}

.mid-header-text {
  color: #136acd;
  font-weight: bold;
}

.table-header-row {
  background: #ebeff4;
  border-top: 1px solid #dde2e6;
  border-radius: 8px 8px 0 0;
}

.hidden-header {
  display: none;
}

.default-btn {
  background: #ebeff4;
}

.bottom-box {
  border: 1px solid #dde2e6;
  border-radius: 10px;
}

.action-btns a {
  text-decoration: none;
}

.modal-header {
  border-bottom: none !important;
}

.modal-footer {
  border-top: none !important;
}

.select-member {
  padding: 0.1rem 0.4rem;
  border: 1px solid #02172e30;
  border-radius: 30px;
}

.remove-member {
  color: #a9adb1;
  font-weight: bold;
}

.remove-member:hover {
  cursor: pointer;
}

.dropdown-toggle::after {
  margin-left: auto;
  vertical-align: 0.255em;
  content: "";
  border-top: 0.3em solid;
  border-right: 0.3em solid transparent;
  border-bottom: 0;
  border-left: 0.3em solid transparent;
  text-align: right !important;
  right: 10px;
  top: 20px;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.dropdown-toggle:focus {
  outline: none !important;
  border: none;
}

.cancel {
  border: 1px solid #dde2e6;
}

.group-form {
  box-shadow: 0px 5px 15px #00000017;
  border: 1px solid #dde2e6;
  border-radius: 10px;
}

.grey-background {
  background: #ebeff4;
}

.text-grey {
  color: grey;
}

.send-dropdown {
  border: 1px solid #ddd;
  width: 124px;
  position: absolute;
  background: #fff;
}

.send-dropdown a {
  color: #190138;
  font-size: 14px;
  text-decoration: none;
}
.tool {
  text-decoration: none;
}

.hide {
  display: none;
}

.dd-item:hover {
  cursor: pointer;
}

.hint {
  font-size: 14px;
  font-weight: 600;
}

.amber {
  background: #ffbf00 !important;
}

.email-destination {
  padding: 0.1rem 0.4rem;
  border: 1px solid #02172e0d;
  border-radius: 8px;
  background: #02172e14;
}

.remove-email {
  color: #000;
  font-weight: bold;
}

.remove-email:hover {
  cursor: pointer;
}
.btn-primary {
  background: #136acd !important;
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

.fa-ellipsis-v {
  padding: 10px;
}

.div-card {
  position: absolute;
  background: white;
  z-index: 1;
  width: 100%;
  top: 136px;
  box-shadow: 0 0 11px rgba(33, 33, 33, 0.2);
  max-height: 400px;
  overflow: scroll;
}

.move-card {
  position: absolute;
  background: white;
  z-index: 1;
  width: 100%;
  top: 40px;
  box-shadow: 0 0 11px rgba(33, 33, 33, 0.2);
  max-height: 400px;
  overflow: scroll;
}

@media (max-width: 600px) {
  .btnn {
    flex-wrap: wrap;
  }
}
</style>