<template>
  <div class="container-top" :class="{ 'container-slim': lgAndUp || xlAndUp }">
    <div class="row mt-3 botom">
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
                <div class="top my-3 col-sm-12 col-md-12 d-flex flex-wrap pl-0">
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
                      <el-button color="#136acd" class="ml-2 header-btn" round
                        >Add New Attendance</el-button
                      >
                    </router-link>
                  </div>
                </div>
              </div>
              <hr class="hr" />
            </div>
            <!-- <Attendancecheckin :list="attendanceData" :totalItems="totalItems" /> -->
            <Table
              :data="attendanceByGroup"
              :headers="attendanceItemsHeaders"
              :checkMultipleItem="false"
              class="mt-4"
              v-loading="attendanceItemsLoading"
            >
              <template
                #fullEventName="{ item }"
              >
                <router-link
                  class="no-decoration text-dark"
                  :to="{
                    name: 'CheckinType',
                    query: {
                      activityID: item.eventID,
                      activityName: item.fullEventName,
                      groupId: item.groupID,
                      groupName: item.fullGroupName,
                      id: item.id,
                      code: item.attendanceCode,
                    },
                  }"
                >
                  <span>{{ item.fullEventName }}</span>
                </router-link>
              </template>
              <template v-slot:eventDate="{ item }">
                <router-link
                  class="no-decoration text-dark"
                  :to="{
                    name: 'CheckinType',
                    query: {
                      activityID: item.eventID,
                      activityName: item.fullEventName,
                      groupId: item.groupID,
                      groupName: item.fullGroupName,
                      id: item.id,
                      code: item.attendanceCode,
                    },
                  }"
                >
                  <span>{{ formatDate(item.eventDate) }}</span>
                </router-link>
              </template>
              <template v-slot:fullGroupName="{ item }">
                <router-link
                  class="no-decoration text-dark"
                  :to="{
                    name: 'CheckinType',
                    query: {
                      activityID: item.eventID,
                      activityName: item.fullEventName,
                      groupId: item.groupID,
                      groupName: item.fullGroupName,
                      id: item.id,
                      code: item.attendanceCode,
                    },
                  }"
                >
                  <span>{{ item.fullGroupName }}</span>
                </router-link>
              </template>
              <template v-slot:action="{ item }">
                <div class="dropdown">
                  <span class="d-flex justify-content-between">
                    <span>
                      <el-icon
                        id="dropdownMenuButton"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                      >
                        <MoreFilled />
                      </el-icon>
                      <div
                        class="dropdown-menu"
                        aria-labelledby="dropdownMenuButton"
                      >
                        <a class="dropdown-item">
                          <router-link
                            class="text-decoration-none text-dark"
                            :to="{
                              name: 'AttendanceReport',
                              params: { id: item.id },
                            }"
                            >View Details</router-link
                          >
                        </a>
                        <a class="dropdown-item">
                          <router-link
                            class="text-decoration-none text-dark"
                            :to="{
                              name: 'CheckinType',
                              query: {
                                activityID: item.eventID,
                                activityName: item.fullEventName,
                                groupId: item.groupID,
                                groupName: item.fullGroupName,
                                id: item.id,
                                code: item.attendanceCode,
                              },
                            }"
                            >Checkin</router-link
                          >
                        </a>
                        <a
                          class="dropdown-item elipsis-items"
                          href="#"
                          @click.prevent="showConfirmModal(item.id, index)"
                          >Delete
                        </a>
                      </div>
                    </span>
                  </span>
                </div>
              </template>
            </Table>
          </div>
        </div>
      </div>
    </div>

    <div class="row mt-3" v-if="showGroup">
      <div class="col-md-12">
        <h2 v-if="!route.params.groupId" class="head-text">Add Group</h2>
        <h2 v-else class="head-text">Update Group</h2>
        <!-- <Toast /> -->
      </div>
      <div class="col-md-12 my-3 px-0">
        <hr class="hr" />
      </div>
    </div>

    <div class="row py-3" v-if="showGroup">
      <div class="col-md-12">
        <div class="row pt-3 my-4">
          <div class="col-md-12">
            <div class="row">
              <div class="col-md-12">
                <div class="row">
                  <div class="col-md-2 text-lg-right">
                    <label for="groupName" class="font-weight-600"
                      >Group name</label
                    >
                  </div>
                  <div class="col-md-8">
                    <el-input
                      type="text"
                      v-model="groupData.name"
                      class="w-100 ml-0"
                      id="formGroup"
                      @input="validateGroupName"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div class="row mb-2 mt-4">
              <div class="col-md-12">
                <div class="row">
                  <div class="col-md-2 text-lg-right">
                    <label for="description" class="font-weight-600"
                      >Description</label
                    >
                  </div>
                  <div class="col-md-8">
                    <el-input
                      v-model="groupData.description"
                      name="description"
                      id="description"
                      :rows="3"
                      type="textarea"
                    />

                    <div class="d-flex mt-3">
                      <div class="input-width">
                        <el-checkbox
                          v-model="groupData.isMobileGroup"
                          size="large"
                          class="align-checkbox-totop"
                          :disabled="groupData.isMobileGroup"
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
        <div class="row">
          <div class="col-md-12 col-12 btnn">
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
            <el-button
              class="
                default-btn
                outline-none
                font-weight-bold
                border
                c-pointer
                header-btn
                text-dark
                add-member
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

        <div class="row">
          <div class="col-12">
            <div>
              <div class="collapse" id="collapseExample">
                <div class="row">
                  <div class="col-12 col-md-12 mt-2">
                    <div
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
                    </div>

                    <div class="collapse" id="addsubgroup">
                      <div class="card card-body">
                        <div class="font-weight-700 mb-3">
                          Select the group or sub-group you want to be a child
                          of this group.
                        </div>

                        <div class="row w-100">
                          <div class="col-12 col-sm-6 col-md-4">
                            <div class="">
                              <div class="mb-1 font-weight-600 w-100">
                                Parent Group
                              </div>

                              <el-input
                                type="text"
                                v-model="groupData.name"
                                disabled
                              />
                            </div>
                          </div>
                          <div class="col-12 col-sm-6 col-md-5 mt-3 mt-sm-0">
                            <div class="mb-1 font-weight-600 w-100">
                              Child group
                            </div>
                            <div>
                              <el-tree-select
                                v-model="selectedTree"
                                class="w-100"
                                placeholder="Select group"
                                :data="groupMappedTree"
                                :render-after-expand="false"
                                :filter-node-method="filterNodeMethod"
                                @change="setGroupValue"
                                filterable
                                check-strictly
                              />
                            </div>
                          </div>

                          <div class="col-12 col-md-3">
                            <div class="mb-1 mt-3 mt-md-4">
                              <el-button
                                class="
                                  default-btn
                                  primary-bg
                                  border-0
                                  text-white
                                  align-self-center
                                  mt-2
                                "
                                size="large"
                                @click="addSubGroup"
                                round
                              >
                                Add sub group
                              </el-button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-12">
                    <GroupTree :items="groupData.children" />
                    <!-- <div
                      class="font-weight-700 my-3"
                      v-show="
                        groupData.children && groupData.children.length > 0
                      "
                    >
                      Group children
                    </div>
                    <ul>
                      <li
                        v-for="(item, index) in groupData.children"
                        :key="index"
                      >
                        {{ item.name }}
                      </li>
                    </ul> -->
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="row pb-4">
          <div class="col-md-12">
            <div
              class="
                d-flex
                flex-column flex-sm-row
                justify-content-sm-between
                py-3
              "
            >
              <el-input
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

            <div class="row">
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
                      <button type="button" class="close" data-dismiss="modal">
                        &times;
                      </button>
                    </div>

                    <!-- Modal body -->
                    <div class="modal-body">
                      <div class="col-md-12"></div>
                      <div class="col-md-12 form-group w-100">
                        <el-tree-select
                          v-model="moveSelectedTree"
                          class="w-100"
                          placeholder="Select group"
                          :data="groupMappedTree"
                          :render-after-expand="false"
                          :filter-node-method="filterNodeMethod"
                          @change="setSelectedGroupToMove"
                          filterable
                          check-strictly
                        />
                      </div>
                    </div>

                    <!-- Modal footer -->
                    <div class="modal-footer">
                      <el-button data-dismiss="modal" round>Close</el-button>
                      <el-button
                        color="#136acd"
                        @click="moveMembers"
                        :loading="moveLoading"
                        round
                        >Move</el-button
                      >
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- Modal -->
            <div class="container">
              <!-- Button to Open the Modal -->
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
                      <button type="button" class="close" data-dismiss="modal">
                        &times;
                      </button>
                    </div>

                    <!-- Modal body2 -->
                    <div class="modal-body">
                      <div class="col-md-12"></div>
                      <div class="col-md-12 form-group w-100">
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
                              copyGroupTo && Object.keys(copyGroupTo).length > 0
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

            <div class="row" v-if="groupMembers.length > 0">
              <div class="col text-center p-3 text-success font-weight-700">
                Approved
              </div>
            </div>
            <Table
              :data="searchGroupMembers"
              :headers="createGroupHeaders"
              :checkMultipleItem="true"
              @checkedrow="handleSelectionChange"
              v-loading="loadingMembers"
            >
              <template #name="{ item }">
                <span>{{ item.name }}</span>
              </template>
              <template v-slot:position="{ item }">
                <span>{{ item.position }}</span>
              </template>
              <template v-slot:email="{ item }">
                <span>{{ item.email }}</span>
              </template>
              <template v-slot:phone="{ item }">
                <span>{{ item.phone }}</span>
              </template>
              <template v-slot:action="{ item }">
                <el-dropdown>
                  <el-icon id="dropdownMenuButton" data-toggle="dropdown">
                    <MoreFilled />
                  </el-icon>
                  <template #dropdown>
                    <el-dropdown-menu>
                      <el-dropdown-item>
                        <a @click="test(item)"> Send SMS</a>
                      </el-dropdown-item>
                      <el-dropdown-item>
                        <a @click="testEmail(item)">Send Email</a>
                      </el-dropdown-item>
                      <el-dropdown-item>
                        <a @click="archive(item.personID, 'single')">
                          Archive
                        </a>
                      </el-dropdown-item>
                      <el-dropdown-item>
                        <a @click="confirmDelete(item.id, index)">Remove</a>
                      </el-dropdown-item>
                    </el-dropdown-menu>
                  </template>
                </el-dropdown>
              </template>
            </Table>

            <div class="row" v-if="awaitingApprovals.length > 0">
              <div class="col text-center p-3 text-warning font-weight-700">
                Waiting Approval
              </div>
            </div>
            <Table
              :data="awaitingApprovals"
              :headers="createGroupHeaders"
              :checkMultipleItem="true"
              @checkedrow="handleSelectionChange"
              v-if="awaitingApprovals.length > 0"
            >
              <template #name="{ item }">
                <span>{{ item.name }}</span>
              </template>
              <template v-slot:position="{ item }">
                <span>{{ item.position }}</span>
              </template>
              <template v-slot:email="{ item }">
                <span>{{ item.email }}</span>
              </template>
              <template v-slot:phone="{ item }">
                <span>{{ item.phone }}</span>
              </template>
              <template v-slot:action="{ item }">
                <el-dropdown>
                  <el-icon id="dropdownMenuButton" data-toggle="dropdown">
                    <MoreFilled />
                  </el-icon>
                  <template #dropdown>
                    <el-dropdown-menu>
                      <el-dropdown-item>
                        <a @click="test(item)"> Send SMS</a>
                      </el-dropdown-item>
                      <el-dropdown-item>
                        <a @click="testEmail(item)">Send Email</a>
                      </el-dropdown-item>
                      <el-dropdown-item>
                        <a @click="archive(item.personID, 'single')">
                          Archive
                        </a>
                      </el-dropdown-item>
                      <el-dropdown-item>
                        <a @click="confirmDelete(item.id, index)">Remove</a>
                      </el-dropdown-item>
                    </el-dropdown-menu>
                  </template>
                </el-dropdown>
              </template>
            </Table>

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
        <router-link to="/tenant/peoplegroups" class="no-decoration">
          <el-button round>Discard</el-button>
        </router-link>
        <el-button
          color="#136acd"
          :loading="savingGroup"
          @click="saveGroupData"
          :disabled="savingGroup"
          round
          >{{ buttonText }}</el-button
        >
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
import { computed, nextTick, ref } from "vue";
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
import Attendancecheckin from "../event/attendance&checkin/AttendanceAndCheckinList.vue";
import attendanceservice from "../../services/attendance/attendanceservice";
import ImportToGroup from "../people/ImportInstruction";
import GroupTree from "./component/GroupTree.vue";
import collector from "../../services/groupArray/mapTree";
import { ElMessage, ElMessageBox } from "element-plus";
import { useStore } from "vuex";
import grousService from "../../services/groups/groupsservice";
import flatten from "../../services/groupArray/flatTree";
import Table from "@/components/table/Table";
import deviceBreakpoint from "../../mixins/deviceBreakpoint";
import dateFormatter from "../../services/dates/dateformatter";

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
    Table,
  },
  setup() {
    const store = useStore();
    const route = useRoute();
    const display = ref(false);
    //  const showWardModal = ref(false)
    const memberDia = ref(true);
    const selectedTree = ref();
    const moveSelectedTree = ref();
    const groupMappedTree = ref([]);
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
    const selectedIntendedSubGroup = ref({});
    const searchGroupText = ref("");
    const grouploading = ref(false);
    const moveLoading = ref(false);
    const attendanceItemsLoading = ref(false);
    const searchGroupRef = ref();
    const closeGroupModal = ref();
    const lastGroupChild = ref({});
    const copyHideDiv = ref(true);
    const flattenedTree = ref([]);
    const attendanceByGroup = ref([]);
    const { lgAndUp, xlAndUp } = deviceBreakpoint();
    const createGroupHeaders = ref([
      { name: "NAME", value: "name" },
      { name: "POSITION", value: "position" },
      { name: "EMAIL", value: "email" },
      { name: "PHONE", value: "phone" },
      { name: "ACTION", value: "action" },
    ]);
    const attendanceItemsHeaders = ref([
      { name: "EVENT NAME", value: "fullEventName" },
      { name: "DATE", value: "eventDate" },
      { name: "GROUP NAME", value: "fullGroupName" },
      { name: "ACTION", value: "action" },
    ]);

    const getGroups = async () => {
      grouploading.value = true;
      try {
        let data = await grousService.getGroups();
        getAllGroup.value = data.response.groupResonseDTO;
        grouploading.value = false;
        flattenedTree.value = flattenTree(getAllGroup.value);
      } catch (error) {
        console.log(error);
        grouploading.value = false;
      }
    };
    getGroups();

    const flattenTree = (tree) => {
      let treevalue = { children: tree };
      const { children } = collector(treevalue);
      groupMappedTree.value = children;
      if (groupMappedTree.value && groupMappedTree.value.length > 0) {
        return groupMappedTree.value.flatMap(flatten());
      }
    };

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
      attendanceItemsLoading.value = true;
      const response = await attendanceservice.getAttendanceItemsByGroupID(
        route.params.groupId
      );
      attendanceItemsLoading.value = false;
      attendanceByGroup.value = response.items;
    };
    attendanceCheckin();

    const groupDetail = async () => {
      showGroup.value = true;
      showAttendanceCheckin.value = false;
    };

    const moveMembers = () => {
      moveLoading.value = true;
      let memberMove = {
        memberIDList: marked.value.map((i) => i.personID),
        groupTo: selectGroupTo.value.id,
        groupFrom: route.params.groupId,
      };
      axios
        .post(`/api/Group/MoveMembers`, memberMove)
        .then((res) => {
          moveLoading.value = false;
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
          moveLoading.value = false;
          finish();
          if (err.toString().toLowerCase().includes("network error")) {
            ElMessage({
              message: "Please ensure you have a strong internet",
              type: "warning",
              life: "4000",
            });
          } else if (err.toString().toLowerCase().includes("timeout")) {
            ElMessage({
              message: "Request timeout, Please refresh the page and try again",
              type: "warning",
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
          ElMessage({
            message: "Member(s) Copy Successfully",
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
            ElMessage({
              message: "Please ensure you have a strong internet",
              type: "Warn",
              life: "4000",
              showClose: true,
            });
          } else if (err.toString().toLowerCase().includes("timeout")) {
            ElMessage({
              message: "Please refresh the page",
              type: "warn",
              life: "4000",
            });
          }
        });
    };

    const handleSelectionChange = (val) => {
      marked.value = val;
    };

    const confirmDelete = (id, index) => {
      ElMessageBox.confirm(
        "This action will permanently delete this item. Continue?",
        "Confirm delete",
        {
          confirmButtonText: "OK",
          cancelButtonText: "Cancel",
          type: "error",
        }
      ).then(() => {
        groupsService
          .removeFromGroup(route.params.groupId, {
            groupId: route.params.groupId,
            personIds: [`${id}`],
          })
          .then((res) => {
            if (res !== false) {
              groupMembers.value.splice(index, 1);
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
          })
          .catch(() => {
            ElMessage({
              type: "info",
              message: "Discarded",
              duration: 3000,
            });
          });
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

          if (redirect) {
            router.push("/tenant/peoplegroups");
          } else {
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
          ElMessage({
            message: "Please ensure you have a strong internet",
            type: "warn",
            duration: "4000",
          });
        } else if (error.toString().toLowerCase().includes("timeout")) {
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

    const importMember = () => {
      if (!route.params.groupId) {
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
          ElMessage({
            message: "Please ensure you have a strong internet",
            type: "warn",
            duration: "4000",
          });
        } else if (error.toString().toLowerCase().includes("timeout")) {
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

    const setGroupValue = () => {
      const response = flattenedTree.value.find(
        (i) => i.value == selectedTree.value
      );
      selectedIntendedSubGroup.value = {
        name: response.label,
        id: response.value,
      };
    };

    const addSubGroup = async () => {
      try {
        const { data } = await axios.post(
          `/api/Group/AddSubGroupToGroup?SuperGroupID=${route.params.groupId}&&SubGroupID=${selectedIntendedSubGroup.value.id}`
        );
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

    const setSelectedGroupToMove = () => {
      let flattenGroupTree = flattenTree(getAllGroup.value);
      const selectedLabelTree = flattenGroupTree.find(
        (i) => i.value === moveSelectedTree.value
      );
      selectGroupTo.value = {
        name: selectedLabelTree.label,
        id: selectedLabelTree.id,
      };
    };

    const filterNodeMethod = (value, data) =>
      data.label.toLowerCase().includes(value.toLowerCase());

    const setSelectedGroupToCopy = (payload) => {
      if (payload.iconElement.classList.contains("p-3")) {
        copyGroupTo.value = payload.selectedGroup
          ? payload.selectedGroup
          : lastGroupChild.value;
        copyHideDiv.value = true;
      }
    };

    const showConfirmModal = (id) => {
      ElMessageBox.confirm(
        "This action will permanently delete this item. Continue?",
        "Confirm delete",
        {
          confirmButtonText: "OK",
          cancelButtonText: "Cancel",
          type: "error",
        }
      )
        .then(() => {
          deleteAttendance(id);
        })
        .catch(() => {
          ElMessage({
            type: "info",
            message: "Delete discarded",
            duration: 3000,
          });
        });
    };

    const deleteAttendance = (id) => {
      axios
        .delete(`/api/CheckInAttendance/checkout?attendanceId=${id}`)
        .then((res) => {
          console.log(res.status);
          if (res.status === 200) {
            ElMessage({
              type: "success",
              message: "Delete successful",
              duration: 5000,
            });
          } else {
            ElMessage({
              type: "error",
              message: "Delete failed, please try again",
              duration: 3000,
            });
          }
        })
        .catch((err) => {
          if (err.response) {
            console.log(err.response);
            ElMessage({
              type: "info",
              message: "Unable to delete, please try again",
              duration: 3000,
            });
          } else if (
            err.response.toString().toLowerCase().includes("network error")
          ) {
            ElMessage({
              type: "warning",
              message: "Please ensure you have a strong internet and try again",
              duration: 3000,
            });
          }
        });
    };
    const formatDate = (date) => {
      return dateFormatter.monthDayYear(date);
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
      confirmDelete,
      marked,
      handleSelectionChange,
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
      groupMappedTree,
      filterNodeMethod,
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
      uploadToGroup,
      closeGroupModal,
      displayView,
      archive,
      openPositionArchive,
      positionArchive,
      displayPositionArchive,
      closeArchiveModal,
      importMember,
      window,
      innerWidth,
      searchGroupMemberText,
      searchGroupMembers,
      field,
      groups,
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
      selectedTree,
      setGroupValue,
      flattenedTree,
      lgAndUp,
      xlAndUp,
      createGroupHeaders,
      moveSelectedTree,
      flattenTree,
      attendanceByGroup,
      attendanceItemsHeaders,
      showConfirmModal,
      deleteAttendance,
      formatDate,
      moveLoading,
      attendanceItemsLoading,
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
  justify-content: end;
  align-items: center;
}

.label-sub {
  width: 100px;
}

/* .dropdown {
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  width: 100%;
} */

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

/* .bottom-box {
  border: 1px solid #dde2e6;
  border-radius: 10px;
} */

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

/* .group-form { */
/* box-shadow: 0px 5px 15px #00000017;
  border: 1px solid #dde2e6;
  border-radius: 10px; */
/* } */

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
    gap: 0.6rem;
  }
}
</style>
