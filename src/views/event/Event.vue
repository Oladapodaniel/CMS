<template>
  <div class="event mt-4" @click="hideModals">
    <div class="bg col-md-10 offset-md-1">
      <div class="container first-pane">
        <div class="row">
          <Toast />
        </div>
        <div class="row">
          <div class="col-md-5 events">Events</div>
          <div class="col-md-7">
            <div class="row">
              <div class="col-md-12 d-lg-flex justify-content-end">
                <button class="default-btn">Preview</button>
                <button
                  class="default-btn primary-bg border-0 ml-3"
                  @click="post"
                >
                  <i
                    class="fas fa-circle-notch fa-spin mr-2 text-white"
                    v-if="loading"
                  ></i>
                  <span class="text-white">Save and Continue</span>
                  <span></span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div class="row mt-1">
          <div class="col-md-12">
            <span class="float-right text-danger font-weight-bold">{{
              errorMessage
            }}</span>
          </div>
        </div>
      </div>
      <div class="form col-12 col-sm-12 offset-md-0 col-md-12">
        <div class="row form-header" @click="toggleForm2">
          <div class="col-12 col-sm-6">Events and Activities</div>
          <div class="col-sm-6 text-right">
            <i
              class="fa fa-angle-up"
              :class="{ roll2: showForm2 }"
              aria-hidden="true"
            ></i>
          </div>
        </div>
        <!-- <div class="container"> -->
        <div class="row form-body" :class="{ 'close-slide2': !showForm2 }">
          <div class="col-6 offset-3 offset-sm-0 col-sm-5 col-md-3">
            <div class="drop-box">
              Browse or Drop your banner here.Maximum 5MB in size JPG, PNG, or
              GIF formats.
            </div>
          </div>
          <div class="col-12 col-sm-7 col-md-6 offset-md-3">
            <div class="row nested-row">
              <div class="col-12 col-sm-5">
                <label for="eventName">Event Name</label>
              </div>
              <div class="col-12 col-sm-7">
                <input
                  type="text"
                  v-model="preEventName"
                  class="form-control"
                />
              </div>
              <div class="col-sm-5">
                <label for="venue">Venue</label>
              </div>
              <div class="col-sm-7">
                <input type="text" v-model="venue" class="form-control" />
              </div>
              <div class="col-sm-5">
                <label for="details">Details</label>
              </div>
              <div class="col-sm-7">
                <textarea
                  class="form-control textarea-adjust"
                  rows="3"
                  v-model="details"
                ></textarea>
              </div>
            </div>
          </div>

          <div class="col-sm-12 push-public">
            <div class="row">
              <div class="col-1 mt-3">
                <input type="checkbox" v-model="isPublic" class="form-check" />
              </div>
              <div class="col-10 mt-3">
                <div class="make-public">Make Public</div>
                <div class="public">Make Event publicly visible on app</div>
              </div>
            </div>
          </div>
          <ul
            class="nav nav-tabs w-100 push-down event-reg"
            id="myTab"
            role="tablist"
          >
            <li class="nav-item" role="presentation">
              <a
                class="nav-link active"
                id="home-tab"
                data-toggle="tab"
                href="#home"
                role="tab"
                aria-controls="home"
                aria-selected="true"
                >Event Registration Setting</a
              >
            </li>
            <li class="nav-item" role="presentation">
              <a
                class="nav-link"
                id="profile-tab"
                data-toggle="tab"
                href="#profile"
                role="tab"
                aria-controls="profile"
                aria-selected="false"
                >Event Registration</a
              >
            </li>
          </ul>
          <div class="tab-content w-100" id="myTabContent">
            <div
              class="tab-pane fade show active"
              id="home"
              role="tabpanel"
              aria-labelledby="home-tab"
            >
              <div class="col-sm-12">
                <div class="row enable-reg">
                  <div class="col-1">
                    <input
                      type="checkbox"
                      v-model="check"
                      class="form-check"
                      @click="getPreActivityId"
                    />
                  </div>
                  <div class="col-10">
                    <div>Enable Registration</div>
                  </div>
                </div>
              </div>

              <div v-if="check" class="col-sm-12">
                <div class="row">
                  <!-- <div class="col-sm-12 mt-4"><input type="text" class="form-control"></div> -->
                  <div class="input-group mt-3 col-sm-7">
                    <input
                      type="text"
                      class="form-control"
                      v-model="eventRegistrationLink"
                      aria-label="Recipient's username"
                      aria-describedby="basic-addon2"
                    />
                    <div class="input-group-append">
                      <span class="input-group-text" id="basic-addon2"
                        >COPY</span
                      >
                    </div>
                  </div>
                  <div class="col-sm-5"></div>
                  <div class="col-6 col-sm-4 paid">is this event paid for?</div>
                  <div class="col-3">
                    <div class="form-radio form-radio-inline paid">
                      <input
                        class="form-radio-input"
                        @change="changeValue"
                        name="event"
                        type="radio"
                        label="Yes"
                        value="Yes"
                      />
                      <label class="form-radio-label">Yes</label>
                    </div>
                  </div>
                  <div class="col-3 col-sm-5">
                    <div class="form-radio form-radio-inline paid">
                      <input
                        class="form-radio-input"
                        @change="changeValue"
                        name="event"
                        type="radio"
                        label="No"
                        value="No"
                      />
                      <label class="form-radio-label">No</label>
                    </div>
                  </div>
                  <div
                    v-if="selectedValue == null"
                    class="row form-body col-sm-12"
                  ></div>
                  <div
                    v-else-if="selectedValue == 'Yes'"
                    class="row form-body reg col-sm-12"
                  >
                    <div class="row">
                      <div class="col-sm-4 col-lg-2">Amount</div>
                      <div class="col-12 col-sm-8 col-lg-4">
                        <input
                          type="number"
                          v-model="preEventAmount"
                          class="form-control"
                        />
                      </div>
                      <div class="col-12 col-sm-4 col-lg-2">
                        Email to be sent upon after registration
                      </div>
                      <div class="col-12 col-sm-8 col-lg-4">
                        <textarea
                          class="form-control"
                          v-model="emailRegistration"
                          rows="2"
                        ></textarea>
                      </div>
                      <div class="col-12 col-sm-4 col-lg-2">
                        Event rules and guidelines
                      </div>
                      <div class="col-12 col-sm-8 col-lg-4">
                        <textarea
                          class="form-control"
                          v-model="eventRules"
                          rows="4"
                        ></textarea>
                      </div>
                      <div class="col-12 col-sm-4 col-lg-2">
                        SMS to be sent upon after registration
                      </div>
                      <div class="col-12 col-sm-8 col-lg-4">
                        <textarea
                          class="form-control"
                          v-model="SMSRegistration"
                          rows="4"
                        ></textarea>
                      </div>
                    </div>
                  </div>
                  <div v-else class="row form-body reg col-sm-12">
                    <div class="row">
                      <div class="col-12 col-sm-4 col-lg-2">
                        Email to be sent upon after registration
                      </div>
                      <div class="col-12 col-sm-8 col-lg-4">
                        <textarea
                          class="form-control"
                          v-model="emailRegistration"
                          rows="3"
                        ></textarea>
                      </div>
                      <div class="col-12 col-sm-4 col-lg-2">
                        SMS to be sent upon after registration
                      </div>
                      <div class="col-12 col-sm-8 col-lg-4">
                        <textarea
                          class="form-control"
                          v-model="SMSRegistration"
                          rows="4"
                        ></textarea>
                      </div>
                      <div class="col-12 col-sm-4 col-lg-2">
                        Event rules and guidelines
                      </div>
                      <div class="col-12 col-sm-8 col-lg-4">
                        <textarea
                          class="form-control"
                          v-model="eventRules"
                          rows="4"
                        ></textarea>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              class="tab-pane fade"
              id="profile"
              role="tabpanel"
              aria-labelledby="profile-tab"
            >
              <div class="w-100 box-table">
                <table class="table">
                  <thead>
                    <tr class="event-list">
                      <th scope="col">
                        <input type="checkbox" name="checkbox" class="" />
                      </th>
                      <th scope="col">Picture</th>
                      <th scope="col">Firstname</th>
                      <th scope="col">Phone</th>
                      <th scope="col">Reg.Code</th>
                      <th scope="col">Attended</th>
                      <th scope="col">Paid</th>
                      <th scope="col">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr class="event-list">
                      <th scope="row">
                        <input type="checkbox" name="checkbox" class="" />
                      </th>
                      <td>
                        <div id="img">
                          <img
                            src="../../assets/logo.png"
                            class="img-fluid rounded-circle mb-3"
                            alt=""
                          />
                        </div>
                      </td>
                      <td>Ajose Tosin</td>
                      <td>08041941919</td>
                      <td>0123345</td>
                      <td><input type="radio" name="radio" class="" /></td>
                      <td><input type="radio" name="radio" class="" /></td>
                      <td>01/02/2021</td>
                    </tr>
                    <tr>
                      <th scope="row">
                        <input type="checkbox" name="checkbox" class="" />
                      </th>
                      <td>
                        <div id="img">
                          <img
                            src="../../assets/logo.png"
                            class="img-fluid rounded-circle mb-3"
                            alt=""
                          />
                        </div>
                      </td>
                      <td>Ajose Tosin</td>
                      <td>08041941919</td>
                      <td>0123345</td>
                      <td><input type="radio" name="radio" class="" /></td>
                      <td><input type="radio" name="radio" class="" /></td>
                      <td>01/02/2021</td>
                    </tr>
                    <tr>
                      <th scope="row">
                        <input type="checkbox" name="checkbox" class="" />
                      </th>
                      <td>
                        <div id="img">
                          <img
                            src="../../assets/logo.png"
                            class="img-fluid rounded-circle mb-3"
                            alt=""
                          />
                        </div>
                      </td>
                      <td>Ajose Tosin</td>
                      <td>08041941919</td>
                      <td>0123345</td>
                      <td><input type="radio" name="radio" class="" /></td>
                      <td><input type="radio" name="radio" class="" /></td>
                      <td>01/02/2021</td>
                    </tr>
                  </tbody>
                </table>
                <tr class="offset-sm-3">
                  <td>
                    <!-- WITH ARROWS -->
                    <!--  -->
                    <nav>
                      <ul
                        class="pagination rounded-circle justify-content-end mx-3 my-3"
                      >
                        <li class="page-item">
                          <a class="page-link rounded-circle mr-2" href="#">
                            <span>&lt;</span>
                            <span class="sr-only">Previous</span>
                          </a>
                        </li>
                        <li class="page-item active">
                          <a class="page-link rounded-circle mr-2" href="#"
                            >1</a
                          >
                        </li>
                        <li class="page-item">
                          <a class="page-link rounded-circle mr-2" href="#"
                            >2</a
                          >
                        </li>
                        <li class="page-item">
                          <a class="page-link rounded-circle mr-2" href="#"
                            >3</a
                          >
                        </li>
                        <li class="page-item">
                          <a class="page-link rounded-circle mr-2" href="#"
                            >4</a
                          >
                        </li>
                        <li class="page-item">
                          <a class="page-link rounded-circle mr-2" href="#"
                            >5</a
                          >
                        </li>
                        <li class="page-item">
                          <a class="page-link rounded-circle mr-2" href="#">
                            <span>&gt;</span>
                            <span class="sr-only">Next</span>
                          </a>
                        </li>
                      </ul>
                    </nav>
                  </td>
                </tr>
              </div>
            </div>
            <div
              class="tab-pane fade"
              id="contact"
              role="tabpanel"
              aria-labelledby="contact-tab"
            >
              ...
            </div>
          </div>
        </div>
        <!-- </div> -->
      </div>
      <div class="form">
        <!-- <div class="container"> -->
        <div class="row second-form first-row">
          <div class="col-12 col-sm-7 offset-sm-3 offset-md-0 col-md-5 dropdown-container">
            <div
              class="select-elem-con pointer ofering"
              id="eventCategorySelectElem"
              @click="showCategory = !showCategory"
              v-if="!selectedEventCategoryId && !showEditEventCategory"
            >
              <span class="ofering"
                ><i class="fa fa-calendar ofering"></i>&nbsp;&nbsp;&nbsp;Select
                Category</span
              ><span>
                <i
                  class="pi pi-angle-down offset-sm-2 ofering"
                  :class="{ roll3: showForm3 }"
                  aria-hidden="true"
                ></i
              ></span>
            </div>
            <div
              class="ofering"
              :class="{ 'style-category': showCategory }"
              v-if="showCategory"
              id="showEventCategory"
            >
              <input
                type="text"
                placeholder="Search..."
                class="form-control ofering mb-3"
                v-model="eventText"
              />
              <div
                v-for="(eventCategory, index) in filterEventCategory"
                :key="index"
                class="ofering"
              >
                <div class="ofering" @click="individualEvent(eventCategory)">
                  {{ eventCategory.name }}
                </div>
              </div>
              <div
                v-if="filterEventCategory.length >= 1"
                @click="addEvent"
                class="create cat ofering"
              >
                Add New Event
              </div>
              <div v-else class="create mt-3" @click="individualEvent({})">
                Create "{{ eventText }}" event
              </div>
            </div>

            
            <div class="selected-category" v-if="selectedEventCategoryId">
              <p><i class="fa fa-calendar-alt mr-2"></i> Events</p>
              <h4>{{ selectedEventCategoryName }}</h4>
              <div class="event-buttons">
                <a @click="changeSelectedEventCategory('edit')">Edit Event</a>
                <a @click="changeSelectedEventCategory('change')"
                  >Change Event</a
                >
              </div>
            </div>
            <div class="edit-category" v-if="showEditEventCategory">
              <div class="edit-form">
                <div class="edit-input">
                  <input
                    type="text"
                    name=""
                    id=""
                    v-model="selectedEventCategory.name"
                    autofocus
                  />
                </div>
                <div class="edit-input">
                  <button>Save</button>
                </div>
              </div>
            </div>
          </div>

          <div class="col-12 text-center col-md-7 mt-sm-5">
            <div class="row nested-row">
              <div class=" col-2 col-md-5">
                <label for="date">Date</label>
              </div>
              <div class=" col-10 col-md-7">
                <input
                  placeholder=""
                  v-model="eventDate"
                  type="date"
                  class="form-control"
                  required
                />
              </div>
              <div class=" col-2 col-md-5">
                <label for="topic">Topic</label>
              </div>
              <div class=" col-10 col-md-7">
                <input type="text" v-model="topic" class="form-control" />
              </div>
              
              <div class=" col-2 col-md-5">
                <label for="preacher">Preacher</label>
              </div>
              <div class="col-10 col-md-7">
                <input type="text" v-model="preacher" class="form-control" />
              </div>
            </div>
          </div>
        </div>
        <div class="col-sm-12 offset-sm-1 add">Add Attendance</div>
        <div class="attendance-header d-none d-md-block">
          <div class="row">
            <div class="col-sm-3">Attendance Type</div>
            <div class="col-sm-3 offset-sm-2">Count</div>
            <div class="col-sm-2 offset-sm-1">Total</div>
          </div>
        </div>
        <!-- Attendance Items -->
        <div
          class="attendance-body"
          id="attendanceBody"
          v-for="(item, indx) in attendanceItem"
          :key="indx"
        >
          <div class="row">
            <div class="col-6 col-md-3">
              <select class="form-control" v-if="item.attendanceTypeID && !routeParams" >
                <option
                  v-for="(newAttendance, index) in newAttendances"
                  :key="index"
                  :value="newAttendance.attendanceTypeID"
                  :selected="
                    newAttendance.attendanceTypeID === item.attendanceTypeID
                  "
                >
                  {{ newAttendance.name }}
                </option>
              </select>
              <select class="form-control" v-if="item.attendanceTypeID && routeParams" v-model="item.attendanceTypeID" @change="updateAttendanceId" >
                <option
                  v-for="(newAttendance, index) in newAttendances"
                  :key="index"
                  :value="newAttendance.attendanceTypeID"
                >
                  {{ newAttendance.name }}
                </option>
              </select>
              <input
                type="text"
                class="form-control"
                name=""
                id=""
                v-else-if="!item.attendanceTypeID"
                v-model="item.attendanceTypeName"
                placeholder="Enter Attendance Item"
                ref="attendanceInput"
              />
            </div>
            <div class="col-5 col-md-3 offset-md-2">
              <input
                type="number"
                v-model.number="item.number"
                class="form-control"
                placeholder="Enter Count"
              />
            </div>
            <div class="d-none d-md-block col-sm-2 offset-sm-1">
              {{ item.number }}
            </div>
            <div class="col-1" @click="delAttendance(index)">
              <i class="fa fa-trash" aria-hidden="true"></i>
            </div>
          </div>
        </div>

        <div
          class="col-12 text-center add-attendance ofering"
          id="addAttendance"
          @click="addAttendance"
        >
          <i class="fa fa-plus-circle ofering" aria-hidden="true"></i
          >&nbsp;&nbsp;Add Attendance Item
        </div>
        <div class="display ofering" id="showAttendance" ref="attendanceDrop">
          <input
            type="text"
            class="form-control mb-3 ofering"
            v-model="attendanceText"
            placeholder="Search attendance item"
          />
          <div
            class="ofering pointer"
            @click="attendance(filteredAttendance)"
            v-for="(filteredAttendance, index) in filterAttendance"
            :key="index"
          >
            {{ filteredAttendance.name }}
          </div>
          <div
            v-if="filterAttendance.length >= 1"
            @click="attendance(null)"
            class="create ofering pointer"
          >
            Create New Attendance Item
          </div>
          <div v-else class="create pointer" @click="attendance(null)">
            Create "{{ attendanceText }}" attendance item
          </div>
        </div>
        <!-- <button
          hidden
          type="button"
          id="modalTogglerAttendance"
          class="btn btn-primary"
          data-toggle="modal"
          data-target="#exampleModalAttendance"
        >
          Launch demo modal<div></div>
        </button> -->
        <div class="col-sm-12 empty">
          <div class="row">
            <div class="offset-sm-7 col-2 offset-4">TOTAL</div>
            <div class="col-3">{{ addAttendanceTotal }}</div>
          </div>
        </div>
        <!-- <textarea class="col-sm-12 textarea form-control" rows="5">Note ...</textarea> -->

        <div class="col-12 offset-sm-1 add">Add Offering</div>
        <div class="attendance-header d-none d-lg-block">
          <div class="row">
            <div class="col-sm-3">Offering Item</div>
            <div class="col-sm-2" >Channel</div>
            <div class="col-sm-3" >Amount</div>
            <div class="col-sm-2 offset-sm-1" style="margin-left: 74px">Total</div>
          </div>
        </div>

        <!-- Selected offerings -->
        <div
          class="attendance-body stretch"
          id="offeringBody"
          v-for="(item, index) in offeringItem"
          :key="index"
        >
          <div class="row">
            <div class="col-12 col-sm-8 col-lg-3">
              <select class="form-control" v-if="item.offeringTypeId && !routeParams">
                <option
                  v-for="(newOffering, index) in newOfferings"
                  :key="index"
                  :value="newOffering.id"
                  :selected="newOffering.id === item.offeringTypeId"
                >
                  {{ newOffering.name }}
                </option>
              </select>
            
              <select class="form-control" v-else-if="item.offeringTypeId && routeParams" v-model="item.offeringTypeId" @change="updateOfferingId">
                <option
                  v-for="(newOffering, index) in newOfferings"
                  :key="index"
                  :value="newOffering.id"
                >
                  <p>{{ newOffering.name }}</p>
                </option>
              </select>
              <input
                type="text"
                class="form-control"
                name=""
                id=""
                v-else-if="!item.offeringTypeId"
                v-model="item.name"
                placeholder="Enter Offering Item"
                ref="offeringInput"
              />
            </div>
            <div class="col-3 col-sm-4 col-lg-2">
              <select class="w-100 form-control" v-model="item.channel">
                <!-- <option :value="select">Select</option> -->
                <option value="Cheque">Cheque</option>
                <option value="Cash">Cash</option>
                <option value="Cheque">Cheque</option>
                <option value="POS">POS</option>
                <option value="Online">Online</option>
                <option value="Bank Transfer">Bank Transfer</option>
                <option value="USSD">USSD</option>
                <option value="Text">Text</option>
              </select>
            </div>
            
            <div class="col-3 col-sm-2 col-lg-1">
              <!-- <select class="currency" v-model="item.currency">
                <option v-for="currency in currencyList" :key="currency.id">{{ currency.name }}</option>
              </select> -->
              <!-- <div class="codeModal">
                <div class="currency country-code form-control codeModal" @click="toggleCode"><div class="d-flex justify-content-between align-items-center"><span class="codeModal">{{ item.currency }}</span><i class="pi pi-angle-down"></i></div></div>
            </div>

                <div :class=" { 'flagCode' : showCode, 'hide-code' : !showCode } " class="codeModal ">
                    <input class="codeInput input form-control codeModal" v-model="currencyText">
                <div v-for="currency in filterCurrency" :key="currency.id" class="codeModal" >
                    <div class="col-sm-3"><span style="display: inline-block;" @click="getCurrency">{{ currency.name }}</span>&nbsp;&nbsp;<span style="font-size: 0.8em">{{ currency.country }}</span></div>
                </div>
                <div v-if="filterCurrency.length == 0">No match found</div>
                </div> -->
                <Dropdown v-model="item.currency" :options="currencyList" :filter="true" class="currency p-0" placeholder="NGN" :showClear="false">
                    
                </Dropdown>
            </div>
            <div class="col-6 col-lg-2">
              <input
                type="number"
                class="form-control"
                v-model.number="item.amount"
                placeholder="Enter Amount"
              />
            </div>
            <div
              class="col-1 offset-lg-1 d-none d-lg-block"
            >
              {{ item.amount }}
            </div>
            <div
              class="col-2"
              @click="delOffering(index)"
            >
              <i class="fa fa-trash" aria-hidden="true"></i>
            </div>

          

            <div v-if="item.giver == '' " @click="triggerGiverModal(index)" class="col-8 col-sm-3 offset-sm-5 donor-text pt-0 align-self-center">Add Giver</div>
            <div v-else class="col-8 col-sm-5 offset-sm-5 donor-text-name pt-0 align-self-center mt-1"  @click="triggerGiverModal(index)">{{ item.giver }}     <span class="donor-text">edit</span></div>
            <!-- <div v-else>{{ item.addGiver }}</div> -->
               </div>
        </div>

        <div
          class="col-sm-12 text-center add-attendance ofering"
          id="addOffering"
          @click="addOffering"
        >
          <i class="fa fa-plus-circle ofering" aria-hidden="true"></i
          >&nbsp;&nbsp;Add Offering Item
        </div>
        <div class="display ofering" id="showList" ref="offeringDrop">
          <input
            type="text"
            class="form-control mb-3 ofering"
            v-model="offeringText"
            placeholder="Search Offering item"
          />

          <div
            class="ofering pointer"
            v-for="(newOffering, index) in filterOffering"
            :key="index"
            @click="offering(newOffering)"
          >
            {{ newOffering.name }}
          </div>
          <div
            v-if="filterOffering.length >= 1"
            @click="offering(null)"
            class="create ofering pointer"
          >
            Create New Offering Item
          </div>
          <div
            v-else
            @click="offering({ name: offeringText })"
            class="create pointer"
          >
            Create "{{ offeringText }}" offering item
          </div>
        </div>
        <button
          hidden
          type="button"
          id="modalTogglerOffering"
          class="btn btn-primary"
          data-toggle="modal"
          data-target="#exampleModalOffering"
        >
          Launch demo modal
        </button>

        <div class="col-sm-12 empty">
          <div class="row">
            <div class="col-sm-5 total-2 offset-sm-1">TOTAL</div>
            <div class="col-sm-3">
              <!-- <div>Total Attendance</div>
                                <div>Total Offering</div> -->
              <SelectElem
                :options="[
                  'NGN - Naira',
                  'CAD - Canadian dollar',
                  'AFN - Afghanistan',
                ]"
                name="NGN - Naira"
                value="NGN - Naira"
              />
            </div>
            <div class="col-sm-2 align-self-center offset-sm-1">
              {{ addOfferingTotal }}
            </div>
          </div>
        </div>
        <!-- <div class="col-sm-12 text-center add-attendance" @click="createFirstTimers">Add First Timers</div> -->
        <button
          hidden
          type="button"
          id="modalTogglerFirstTimers"
          class="btn btn-primary"
          data-toggle="modal"
          data-target="#exampleModalFirstTimers"
        >
          Launch demo modal
        </button>
        <!-- <div class="col-sm-12 empty"></div> -->
        <textarea
          class="col-sm-12 textarea form-control"
          placeholder="Notes..."
          rows="5"
        >
        </textarea>
        <!-- </div> -->
      </div>

      <div class="form">
        <div class="container">
          <div class="row row-form form-header pointer" @click="toggleForm3">
            <div class="col-sm-6">
              <div>First Timers and New Convert</div>
            </div>
            <div class="col-sm-6 text-right">
              <i
                class="fa fa-angle-up"
                :class="{ roll3: showForm3 }"
                aria-hidden="true"
              ></i>
            </div>
          </div>
          <div
            class="row form-body close-slide3"
            :class="{ 'slide-down3': showForm3 }"
            @click="toggleForm3"
          >
            <div
              class="col-sm-3 add-first-timer pointer"
              @click="createFirstTimers"
            >
              Add First Timers
            </div>
            <div class="col-sm-3 offset-sm-1 add-new-convert pointer">
              Add New Converts
            </div>
            <div class="col-sm-12 box-table">
              <table class="table">
                <thead>
                  <tr class="event-list">
                    <th><input type="checkbox" name="checkbox" class="" /></th>
                    <!-- <th>PICTURE</th> -->
                    <th>FIRSTNAME</th>
                    <th>LASTNAME</th>
                    <th>PHONE</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    class="event-list"
                    v-for="(item, index) in firstTimers"
                    :key="index"
                  >
                    <th scope="row">
                      <input type="checkbox" name="checkbox" class="" />
                    </th>
                    <!-- <td>
                      <div id="img">
                        <img
                          src="../../assets/logo.png"
                          class="img-fluid rounded-circle mb-3"
                          alt=""
                        />
                      </div>
                    </td> -->
                    <td>{{ item.firstName }}</td>
                    <td>{{ item.lastName }}</td>
                    <td>{{ item.phoneNumber }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div class="container first-pane mt-3 mb-5">
        <div class="row">
          <div class="col-md-12">
            <span class="float-right text-danger font-weight-bold">{{
              errorMessage
            }}</span>
          </div>
        </div>

        <div class="row">
          <div class="col-md-12 d-lg-flex justify-content-end">
            <button class="default-btn">Preview</button>
            <button class="default-btn primary-bg border-0 ml-3" @click="post">
              <i
                class="fas fa-circle-notch fa-spin mr-2 text-white"
                v-if="loading"
              ></i>
              <span class="text-white">Save and Continue</span>
              <span></span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Event Modal Button -->

    <button
              hidden
              type="button"
              id="modalTogglerEvent"
              class="btn btn-primary"
              data-toggle="modal"
              data-target="#exampleModalEvent"
            >
              Launch demo modal
            </button>

    <!-- Event Modal -->
    <div
      class="modal fade"
      id="exampleModalEvent"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <div class="modal-title" id="exampleModalLabel">Add Event</div>
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
              <div class="offset-sm-1 col-sm-3 text-sm-right align-self-center">New Event</div>
              <div class="col-sm-7">
                <input type="text" v-model="eventCreate" class="form-control" />
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-second" data-dismiss="modal">
              Cancel
            </button>
            <button
              type="button"
              class="apply-btn"
              id="closeEvent"
              @click="createNewEvent"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Attendance Modal -->
    <div
      class="modal fade"
      id="exampleModalAttendance"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <div class="modal-title" id="exampleModalLabel">
              Add Attendance Item
            </div>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <!-- Create -->
          <div class="modal-body">
            <div class="row">
              <div class="offset-sm-1 col-sm-3">Attendance Item</div>
              <div class="col-sm-7">
                <input
                  type="text"
                  v-model="attendanceCreate"
                  class="form-control"
                />
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-second" data-dismiss="modal">
              Cancel
            </button>
            <button
              type="button"
              class="apply-btn"
              id="closeAttendance"
              @click="createNewAttendance"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Offering Modal -->
    <div
      class="modal fade"
      id="exampleModalOffering"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <div class="modal-title" id="exampleModalLabel">Add Offering</div>
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
              <div class="offset-sm-1 col-sm-3">Add Item</div>
              <div class="col-sm-7">
                <input
                  type="text"
                  v-model="offeringCreate"
                  class="form-control"
                />
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-second" data-dismiss="modal">
              Cancel
            </button>
            <button
              type="button"
              @click="createNewOffering"
              id="closeOffering"
              class="apply-btn"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>

      <!-- Giver Modal Button -->
    <button
    hidden
          ref="modalTogglerGiver"
          type="button"
          id="modalTogglerGiver"
          class="btn btn-primary"
          data-toggle="modal"
          data-target="#exampleGiver"
        >
          Launch demo modal
      </button>

    <!-- Giver Modal -->
    <div
      class="modal fade"
      id="exampleGiver"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <div class="modal-title" id="exampleModalLabel">Add Giver</div>
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
              <div class="offset-sm-1 col-sm-3 text-sm-right align-self-center">Name</div>
              <div class="col-sm-7">
                <input type="text" v-model="donorText" class="form-control"/>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-second" data-dismiss="modal">
              Cancel
            </button>
            <button
              type="button"
              class="apply-btn"
              id="closeEvent"
              @click="addDonor"
              ref="closeDonorModal"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- First Timers Modal -->
    <div
      class="modal fade"
      id="exampleModalFirstTimers"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <div class="modal-title" id="exampleModalLabel">
              Add First Timers
            </div>
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
            <div class="container">
              <form>
                <div class="form-group row">
                  <label for="Firstname" class="col-sm-3 text-sm-right col-form-label"
                    >Firstname<sup class="text-danger">*</sup></label
                  >
                  <div class="col-sm-6">
                    <input
                      type="text"
                      class="form-control input-first"
                      v-model="firstTimersObj.firstName"
                      id="Firstname"
                      required
                    />
                  </div>
                </div>
                <div class="form-group row">
                  <label for="LastName" class="col-sm-3 text-sm-right col-form-label"
                    >Last Name</label
                  >
                  <div class="col-sm-6">
                    <input
                      type="text"
                      v-model="firstTimersObj.lastName"
                      class="form-control input-first"
                      id="surname"
                      required
                    />
                  </div>
                </div>
                <div class="form-group row">
                  <label for="phone number" class="col-sm-3 text-sm-right col-form-label"
                    >Phone number</label
                  >
                  <div class="col-sm-6">
                    <input
                      type="tel"
                      v-model="firstTimersObj.phoneNumber"
                      class="form-control input-first"
                      id="phone number"
                    />
                  </div>
                </div>
                <div class="form-group row">
                  <label for="email" class="col-sm-3 text-sm-right col-form-label"
                    >Email</label
                  >
                  <div class="col-sm-6">
                    <input
                      type="text"
                      class="form-control input-first"
                      v-model="firstTimersObj.email"
                      id="email"
                    />
                  </div>
                </div>
                <div class="form-group row">
                  <label for="address" class="col-sm-3 text-sm-right col-form-label"
                    >Address</label
                  >
                  <div class="col-sm-6 mb-4">
                    <input
                      type="text"
                      v-model="firstTimersObj.address"
                      class="form-control input-first"
                      id="address"
                    />
                  </div>
                </div>

                <div class="form-group row">
                  <label for="birthday" class="col-sm-3 text-sm-right col-form-label"
                    >Birthday</label
                  >
                  <div class="col-sm-2 mb-4">
                    <SelectElem
                      :options="['day', ...day]"
                      name="day"
                      class="input-first"
                      value="day"
                      @input="select2Value"
                    />
                  </div>
                  <div class="col-sm-2 mb-4 px-sm-0">
                    <SelectElem
                      :options="['month', ...months]"
                      name="month"
                      class="input-first"
                      value="month"
                      @input="select2Value"
                    />
                  </div>
                  <div class="col-sm-2 mb-4">
                    <SelectElem
                      :options="['Year', ...birthYearsArr]"
                      name="year"
                      class="input-first"
                      value="Year"
                      @input="select2Value"
                    />
                  </div>
                  <div class="col-sm-3 mb-4 offset-sm-3 pr-sm-0">
                    <SelectElem
                      :options="[...maritalStatuses]"
                      class="input-first"
                      name="marital status"
                      value="Marital Status"
                      @input="select2Value"
                    />
                  </div>
                  <div class="col-sm-3 mb-4">
                    <SelectElem
                      :options="[...genders]"
                      name="gender"
                      class="input-first"
                      value="gender"
                      @input="select2Value"
                    />
                  </div>
                </div>

                <!-- <div class="col-sm-12 mt-4">Insights</div>-->
                <span
                  class="d-flex justify-content-between align-items-center"
                  @click="toggleForm1"
                >
                  <span>Insights</span
                  ><span style="border: 0px solid red; width: 70%"><hr /></span
                  ><span
                    ><i
                      class="fa fa-angle-up"
                      :class="{ roll1: showForm1 }"
                      aria-hidden="true"
                    ></i>
                  </span>
                </span>

                <div
                  class="form-group row close-slide1"
                  :class="{ 'slide-down1': showForm1 }"
                >
                  <div class="col-sm-6 offset-sm-3 mb-4">
                    <div>How did you hear about us</div>
                    <SelectElem
                      :options="['select', ...howYouHeard]"
                      @input="select2Value"
                      name="howDidYouAboutUsId"
                    />
                  </div>
                  <div class="col-sm-6 offset-sm-3 mb-4">
                    <div>Preferred means of communication</div>
                    <SelectElem
                      :options="['select', ...comMeansArr]"
                      @input="select2Value"
                      name="communicationMeans"
                    />
                  </div>
                  <div class="col-sm-6 offset-sm-3 mb-4">
                    <div>Interested in joining us</div>
                    <SelectElem
                      :options="['select', ...joinInterest]"
                      @input="select2Value"
                      name="interestedInJoining"
                    />
                  </div>
                  <div class="col-sm-6 offset-sm-3 mb-4">
                    <div>Want to be visited?</div>
                    <SelectElem
                      :options="['select...', ...wantVisitArr]"
                      @input="select2Value"
                      name="wantToBeVisited"
                    />
                  </div>
                </div>

                <!-- <div class="col-sm-12 mt-4">Follow up and Retention</div> -->
                <span
                  class="d-flex justify-content-between align-items-center"
                  @click="toggleForm"
                >
                  <span>Follow up and retention</span
                  ><span style="width: 60%"><hr /></span
                  ><span
                    ><i
                      class="fa fa-angle-up"
                      :class="{ roll: showForm }"
                      aria-hidden="true"
                    ></i>
                  </span>
                </span>
                <div
                  class="form-group row close-slide"
                  :class="{ 'slide-down': showForm }"
                >
                  <div class="col-sm-3 offset-sm-3 mt-4 mb-4">
                    Send Welcome SMS
                  </div>
                  <div class="mt-4 mb-4">
                    <input
                      type="checkbox"
                      name="sms"
                      v-model="firstTimersObj.sendWelcomeSms"
                    />
                  </div>

                  <div class="col-sm-3 mt-4 mb-4">Send Welcome Email</div>
                  <div class="mt-4 mb-4">
                    <input
                      type="checkbox"
                      name="sms"
                      value="email"
                      v-model="firstTimersObj.sendWelcomeEmail"
                    />
                  </div>
                  <div class="col-sm-6 offset-sm-3">
                    <div>Assigned automated follow-up</div>
                    <SelectElem
                      options="['List 1', 'List 2', 'List 3', 'List 4']"
                      @input="select2Value"
                      name="automatedFollowUp"
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-second" data-dismiss="modal">
              Cancel
            </button>
            <button
              type="button"
              class="apply-btn"
              id="closeFirstTimers"
              @click="save"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import { onMounted, ref } from "vue";
import SelectElem from "@/components/select/SelectElement.vue";
import axios from "@/gateway/backendapi";
// import store from "@/store/store.js"
// import { useToast } from 'primevue/usetoast';
import Dropdown from 'primevue/dropdown';
export default {
  components: {
    SelectElem, Dropdown
  },
  data() {
    return {
      currDate: "",
      type: null,
      //   currency: '',
      amount: null,
      preEventTopic: "",
      details: "",
      eventRules: "",
      preActivityId: "",
      //   enableRegistration: '',
      eventRegistrationLink: "",
      venue: "",
      emailRegistration: "",
      SMSRegistration: "",
      banner: "",
      isPublic: false,
      offeringItem: [],
      category: null,
      count: null,
      attendanceItem: [],
      firstTimersObj: {},
      firstTimers: [],
      selectedValue: null,
      check: false,
      offeringCreate: null,
      newOfferings: [],
      attendanceCreate: null,
      newAttendances: ["Adult", "Children"],
      channel: "",
      eventCreate: null,
      newEvents: [],
      attendanceText: "",
      offeringText: "",
      day: [
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
      ],
      months: [
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
      ],
      showForm1: false,
      showForm: false,
      showForm2: false,
      showForm3: false,
      topic: "",
      preacher: "",
      preEventAmount: "",
      preEventName: "",
      updatePreEvent: {},
      eventCategories: [],
      selectedEventCategory: {},
      selectedEventCategoryId: "",
      eventDate: new Date().toISOString().substr(0, 10),
      showEditEventCategory: false,
      gender: [],
      comMeansArr: ["Call", "Email", "Visit", "SMS"],
      wantVisitArr: ["Yes", "No", "Maybe", "On Transit"],
      joinInterest: ["Yes", "No", "Maybe", "On Transit"],
      maritalStatusArr: [],
      howDidYouAboutUsId: [],
      // 'Friend',
      // 'Social media',
      // 'Church Flyer',
      // 'Tv',
      // 'Radio',
      showCategory: false,
      eventText: "",
      toggleFocus: true,
      loading: false,
      errorMessage: "",
      firstTimerNameIsInValid: false,
      donorText: "",
      // addGiver: "Add Giver",
      donorBoolean: false,
      offeringToAddDonor: 0,
      currencyList: [],
      showCode: false,
      currencyText: "",
      eventObj: {},
      routeParams: null
    };
  },
  methods: {
    currentDate(){
      this.currDate= this.eventDate
      console.log(this.currDate)
      

    },
    hideModals(e) {
      if (!e.target.classList.contains("ofering")) {
        this.$refs.offeringDrop.classList.remove("offering-drop");
        this.$refs.attendanceDrop.classList.remove("offering-drop");
        this.showCategory = false;
      }
    },
    addAttendance() {
      const showAttendance = document.querySelector("#showAttendance");
      showAttendance.classList.toggle("offering-drop");
    },
    addOffering() {
      const showList = document.querySelector("#showList");
      showList.classList.toggle("offering-drop");
      // console.log(this.offeringItem)
    },
    offering(offObj) {
      if (offObj) {
        this.offeringItem.push({
          name: offObj.name,
          offeringTypeId: offObj.id,
          channel: offObj.channel == undefined || offObj.channel == "" || offObj.channel == null ? "Cash" : offObj.channel,
          currency: offObj.currency == undefined || offObj.currency == "" || offObj.currency == null ? "NGN" : offObj.currency,
          giver: ""
        });
      } else {
        this.offeringItem.push({
          currency: "NGN",
          channel: "Cash"
        });
        this.$nextTick(() => {
          this.$refs.offeringInput.focus();
        });
      }
      console.log(this.offeringItem);
      this.offeringText = "";
      const showList = document.querySelector("#showList");
      showList.classList.toggle("offering-drop");
    },
    attendance(attObj) {
      if (attObj) {
        this.attendanceItem.push({
          attendanceTypeName: attObj.name,
          attendanceTypeID: attObj.attendanceTypeID,
        });
      } else {
        this.attendanceItem.push({
          attendanceTypeName: this.attendanceText,
        });
        this.$nextTick(() => {
          this.$refs.attendanceInput.focus();
        });
      }
      this.attendanceText = "";
      const showAttendance = document.querySelector("#showAttendance");
      showAttendance.classList.remove("offering-drop");
      //
      // if (this.$refs.focusAttendance == undefined) {
      //   this.toggleFocus = !this.toggleFocus
      // } else {
      //   console.log('itis defined')
      //   this.toggleFocus = false
      //   this.$refs.focusAttendance.focus()
      // }
    },
    addEvent(e) {
      this.selectedEventCategoryId = e.target.value;
      //   if (e.target.value == "Add New Event") {
      document.querySelector("#modalTogglerEvent").click();
      //   }
    },
    createOffering() {
      document.querySelector("#modalTogglerOffering").click();
    },
    createAttendance() {
      document.querySelector("#modalTogglerAttendance").click();
    },
    createFirstTimers() {
      document.querySelector("#modalTogglerFirstTimers").click();
    },
    triggerGiverModal (index) {
      this.offeringToAddDonor = index;
      this.$refs.modalTogglerGiver.click()
    },
    save() {
      this.firstTimers.push({
        ...this.firstTimersObj,
      });
      this.$toast.add({
        severity: "success",
        summary: "Success",
        detail: "First timer added",
        life: 2000,
      });
      this.firstTimersObj = {};
      console.log(this.firstTimers);
      document
        .querySelector("#closeFirstTimers")
        .setAttribute("data-dismiss", "modal");
    },
    changeValue(e) {
      this.selectedValue = e.target.value;
    },
    // Create Offering
    createNewOffering() {
      // axios.post(`/api/offering/offeringTypeName?=${this.offeringCreate}`, {offeringTypeName: this.offeringCreate})
      axios
        .post(`/api/offering`, JSON.stringify(this.offeringCreate))
        .then((res) => {
          console.log(res, "new offering");
          this.newOfferings = res.data.map((i) => {
            return { id: i.id, name: i.name };
          });
        })
        .then(err => {
          NProgress.done();
          console.log(err);
        })
      this.offeringCreate = "";
      document
        .querySelector("#closeOffering")
        .setAttribute("data-dismiss", "modal");
    },
    createNewAttendance() {
      console.log("posted");
      /*eslint no-undef: "warn"*/
      axios
        .post(`/postAttendantType`, { name: this.attendanceCreate })
        .then((res) => {
          console.log(res, "new attendance");
        })
        .catch((err) => {
          NProgress.done();
          console.log(err.response, "error saving event");
        });
      // this.newAttendances.push(this.attendanceCreate)
      // this.attendanceCreate = '';
      // console.log(this.newAttendances,"att");
      document
        .querySelector("#closeAttendance")
        .setAttribute("data-dismiss", "modal");
    },
    createNewEvent() {
      this.newEvents.push({
        name: this.eventCreate,
        id: "00000000-0000-0000-0000-000000000000",
      });
      this.selectedEventCategoryName = this.eventCreate;
      this.selectedEventCategoryId = "00000000-0000-0000-0000-000000000000";

      this.eventCreate = "";
      this.showCategory = false;
      document
        .querySelector("#closeEvent")
        .setAttribute("data-dismiss", "modal");
    },
    addDonor () {
      let donorName = this.donorText
      this.offeringItem[this.offeringToAddDonor].giver = donorName
      this.$refs.closeDonorModal.setAttribute("data-dismiss", "modal");
      this.donorBoolean = true
      this.donorText = ""
      console.log(this.offeringItem)
    },
    delAttendance(index) {
      this.attendanceItem.splice(index, 1);
    },
    delOffering(index) {
      this.offeringItem.splice(index, 1);
    },
    toggleForm1() {
      this.showForm1 = !this.showForm1;
    },
    toggleForm() {
      this.showForm = !this.showForm;
    },
    toggleForm2() {
      this.showForm2 = !this.showForm2;
    },
    toggleForm3() {
      this.showForm3 = !this.showForm3;
    },
    post() {
      console.log(this.selectedEventCategoryId);
      // let event = {
      //   date: this.eventDate === "" ? "01.01.0001 00:00:00" : this.eventDate,
      //   topic: this.topic,
      //   preacher: this.preacher,
      //   preEvent: {
      //     name: this.preEventName === "" ? this.selectedEventCategoryName : this.preEventName,
      //     topic: this.preEventTopic,
      //     preActivityId:
      //       this.preActivityId === ""
      //         ? "00000000-0000-0000-0000-000000000000"
      //         : this.preActivityId,
      //     details: this.details,
      //     eventRules: this.eventRules,
      //     enableRegistration: this.check,
      //     isPaidFor: this.selectedValue === "Yes" ? true : false,
      //     amount: this.preEventAmount,
      //     venue: this.venue,
      //     emailRegistration: this.emailRegistration,
      //     SMSRegistration: this.SMSRegistration,
      //     banner: this.banner,
      //     isPublic: this.isPublic,
      //   },
      //   attendances: this.attendanceItem,
      //   offerings: this.offeringItem,
      //   eventCategoryId:
      //     !this.selectedEventCategoryId.includes('-')
      //       ? "00000000-0000-0000-0000-000000000000"
      //       : this.selectedEventCategoryId,
      //   activityFirstTimers: this.firstTimers,
      // };

        this.eventObj = {
        attendances: this.attendanceItem,
        offerings: this.offeringItem.map(i => {
          i.currency = i.currency.split(" ")[0]
          return i
        }),
        activityFirstTimers: this.firstTimers,
      };

      // If preactivity id is empty, dont send preevent as part of the event object, else send it
      if (this.preActivityId) {
        this.eventObj.preEvent = {
          name: this.preEventName,
          topic: this.preEventTopic,
          details: this.details,
          preActivityId:
            this.preActivityId === ""
              ? "00000000-0000-0000-0000-000000000000"
              : this.preActivityId,
          isPaidFor: this.selectedValue === "Yes" ? true : false,
          amount: this.preEventAmount,
          eventRules: this.eventRules,
          enableRegistration: this.check,
          venue: this.venue,
          emailRegistration: this.emailRegistration,
          smsRegistraion: this.SMSRegistration,
          banner: this.banner,
          isPublic: this.isPublic,
        };
      } else {
        this.eventObj.activity = {
          date: this.eventDate === "" ? "01.01.0001 00:00:00" : this.eventDate,
          topic: this.topic,
          preacher: this.preacher,
        };

        // If you chose an event activity, send the id in the event object, else if a new activity was created send the name
        if (
          this.selectedEventCategoryId ==
            "00000000-0000-0000-0000-000000000000" ||
          this.selectedEventCategoryId == this.newEvents.length
        ) {
          this.eventObj.activity.newEventCategoryName = this.selectedEventCategoryName;
        } else {
          this.eventObj.activity.eventCategoryId = this.selectedEventCategoryId;
        }
      }



      let updateEvent = {
        activity: {
          date: this.eventDate,
          topic: this.topic,
          preacher: this.preacher,
          eventCategoryId: this.selectedEventCategoryId
        },
        activityFirstTimers: this.firstTimers,
        attendances: this.attendanceItem,
        offerings: this.offeringItem.map(i => {
          i.currency = i.currency.split(" ")[0]
          return i
        }),
        preEvent: this.updatePreEvent
      }

      let currentEvent = {
        name: this.selectedEventCategoryName,
        preacher: this.preacher,
        topic: this.topic,
        newConvertsCount: 0
      }


      console.log(this.eventObj);
      this.loading = true;
      if (this.$route.params.event) {
        axios.put('/api/events/updateActivity', updateEvent)
          .then(res => {
            this.loading = false
                const activityId = this.$route.params.event
              localStorage.setItem("eventData", JSON.stringify(updateEvent));
              localStorage.setItem(
                "eventDataResponse",
                JSON.stringify(currentEvent )
              );
              this.$router.push({ name: "Report", params: { id: activityId } });
              console.log(res.data, currentEvent, 'markers')
          })
          .catch(err => {
             NProgress.done();
          this.loading = false;
          if (err.response) {
            const { data, status } = err.response;
            if (status === 400) this.errorMessage = typeof data !== "string" ?  "Failed! ensure you provide activity name and date" : data.length < 100 ? data : "An error occurred, please check the fields and try again";
          }
            console.log(err)
          })  
      }
      else {
      axios
        .post("api/Events/CreateActivity", this.eventObj)
        .then((res) => {
          this.loading = false;
          console.log(res, "main post");
          const activityId = res.data.currentEvent.id;
          localStorage.setItem("eventData", JSON.stringify(this.eventObj));
          localStorage.setItem(
            "eventDataResponse",
            JSON.stringify(res.data.currentEvent)
          );
          this.$router.push({ name: "Report", params: { id: activityId } });
        })
        .catch((err) => {
          NProgress.done();
          this.loading = false;
          if (err.response) {
            const { data, status } = err.response;
            if (status === 400) this.errorMessage = typeof data !== "string" ?  "Failed! ensure you provide activity name and date" : data.length < 100 ? data : "An error occurred, please check the fields and try again";
          }
          console.log(err.response);
        });
      }
    },
    getEventCategories() {
      axios.get("/api/EventCategory").then((res) => {
        this.newEvents = res.data.map((i) => {
          return { id: i.id, name: i.name };
        });
      });
    },
    getLookUps() {
      axios.get("/api/LookUp/GetAllLookUps").then((res) => {
        // res.data.map((i) => {
        // })
        console.log(res.data);
        res.data.find((i) => {
          if (i.type.toLowerCase() === "gender") {
            this.gender = i.lookUps;
          }
          if (i.type.toLowerCase() === "marital status") {
            this.maritalStatusArr = i.lookUps;
          }
        });
      });
    },
    changeSelectedEventCategory(action) {
      if (action === "edit") {
        // do something
        this.selectedEventCategoryId = "";
        this.showEditEventCategory = true;
        console.log(this.selectedEventCategory);
      }
      if (action === "change") {
        this.selectedEventCategoryId = "";
      }
    },
    // categorySelected(data) {
    //   if (data.dataType === 'eventcategory') {
    //     this.selectedEventCategory = this.newEvents.find(i => i.name === data.value);
    //     this.selectedEventCategoryId = this.selectedEventCategory.id;
    //   }
    // },
    select2Value(data) {
      if (data.dataType === "day") {
        this.firstTimersObj.birthday = data.value;
      }
      if (data.dataType === "month") {
        switch (data.value) {
          case "January":
            this.firstTimersObj.birthMonth = "1";
            break;
          case "February":
            this.firstTimersObj.birthMonth = "2";
            break;
          case "March":
            this.firstTimersObj.birthMonth = "3";
            break;
          case "April":
            this.firstTimersObj.birthMonth = "4";
            break;
          case "May":
            this.firstTimersObj.birthMonth = "5";
            break;
          case "June":
            this.firstTimersObj.birthMonth = "6";
            break;
          case "July":
            this.firstTimersObj.birthMonth = "7";
            break;
          case "August":
            this.firstTimersObj.birthMonth = "8";
            break;
          case "September":
            this.firstTimersObj.birthMonth = "9";
            break;
          case "October":
            this.firstTimersObj.birthMonth = "10";
            break;
          case "November":
            this.firstTimersObj.birthMonth = "11";
            break;
          case "December":
            this.firstTimersObj.birthMonth = "12";
            break;
          default:
            // firstTimersObj.value.birthMonth = "12";
            console.log("No month chosen");
            break;
        }
      }
      if (data.dataType === "year") {
        this.firstTimersObj.birthYear = data.value;
      }
      if (data.dataType === "marital status") {
        this.firstTimersObj.maritalStatusId = this.maritalStatusArr.find(
          (i) => i.value === data.value
        ).id;
      }
      if (data.dataType === "gender") {
        this.firstTimersObj.genderId = this.gender.find(
          (i) => i.value === data.value
        ).id;
      }
      if (data.dataType === "howDidYouAboutUsId") {
        this.firstTimersObj.howDidYouAboutUsId = this.howDidYouAboutUsId.find(
          (i) => i.name === data.value
        ).id;
        console.log(this.firstTimersObj.howDidYouAboutUsId);
      }
      if (data.dataType === "communicationMeans") {
        this.firstTimersObj.communicationMeans = this.comMeansArr.indexOf(
          data.value
        );
      }
      if (data.dataType === "interestedInJoining") {
        this.firstTimersObj.interestedInJoining = this.joinInterest.indexOf(
          data.value
        );
      }
      if (data.dataType === "wantToBeVisited") {
        this.firstTimersObj.wantToBeVisited = this.wantVisitArr.indexOf(
          data.value
        );
      }
      if (data.dataType === "automatedFollowUp") {
        this.firstTimersObj.autoMatedFollowUp = data.value;
      }
    },
    individualEvent(eventObj) {
      if (eventObj.id) {
        this.selectedEventCategoryName = eventObj.name;
        this.selectedEventCategoryId = eventObj.id;
        console.log(this.selectedEventCategoryId);
      } else {
        let arrLengthId = `${this.newEvents.length + 1}`;
        this.newEvents.push({
          name: this.eventText,
          // id: "00000000-0000-0000-0000-000000000000"
          id: arrLengthId,
        });
        this.selectedEventCategoryName = this.event;
        // this.selectedEventCategoryName = this.eventText;
        // this.selectedEventCategoryId ="00000000-0000-0000-0000-000000000000"
        // alert(this.selectedEventCategoryName)
        // alert(this.eventText)
        this.selectedEventCategoryId = arrLengthId;
      }
      console.log(this.newEvents);
      this.eventText = "";
      // const showEventCategory = document.querySelector("#showEventCategory");
      // showEventCategory.classList.remove("style-category");
      this.showCategory = false;
    },
    getPreActivityId() {
      // console.log(this.check)
      if (this.check == false) {
        axios
          .post("/api/Events/EventPreRegistration", {
            eventCategoryName: this.preEventName,
            eventRegistrationLink: "",
          })
          .then((res) => {
            this.preActivityId = res.data.activityId;
            this.eventRegistrationLink = res.data.eventRegistrationLink;
            console.log(res.data);
          })
          .catch((err) => {
            NProgress.done();
            console.log(err.response)
          });
      }
    },
    getHowDidYouAboutUsId() {
      axios.get("/api/membership/howyouheardaboutus").then((res) => {
        // console.log(res.data)
        this.howDidYouAboutUsId = res.data.map((i) => {
          return { name: i.name, id: i.id };
        });
      });
    },
    getEventById () {
      if (this.$route.params.event) {
        axios.get(`/api/Events/${this.$route.params.event}`)
          .then(res => {
            this.routeParams = this.$route.params.event
          

            this.eventDate = res.data.activity.date.substr(0, 10)
                // let date = new Date(res.data.activity.date)
                // this.eventDate = (date.getMonth()+1) + '/'+date.getDate()+ '/' + date.getFullYear()
                // .toLocaleDateString("sq-AL",{ month: '2-digit', day: '2-digit', year: 'numeric' })
                // .toISOString().substr(0, 10);
            //.toISOString().substr(0, 10)
            this.topic = res.data.activity.topic
            this.preacher = res.data.activity.preacher
            this.selectedEventCategoryId = res.data.activity.eventCategoryId
            this.attendanceItem = res.data.attendances
            this.offeringItem = res.data.offerings
            this.firstTimers = res.data.activityFirstTimers
            this.updatePreEvent = res.data.preEvent
            console.log(this.eventDate)
            console.log(res.data)
          })
          .catch (err => console.log(err.response, "get by id error"))
      }
    },
    getCurrenciesFromCountries () {
      let url = "/api/getallcountries"
      axios.get(url)
        .then(res => {
          this.currencyList = res.data.map(i => {
              return `${i.currency} ${i.name}`
            //   {
            //   name: i.currency,
            //   id: i.id,
            //   country: i.name
            // }
            
          })
        })
        .catch(err => console.log(err))
    },
    toggleCode () {
      this.showCode = !this.showCode
    },
    getCurrency (e) {
      console.log(e.target.innerHTML)
      this.showCode = false
    },
    updateOfferingId (e) {
      // this.offeringItem[index].offeringTypeId = id
      
          let index = this.offeringItem.findIndex(i => i.offeringTypeId === e.target.value)
          console.log(e.target.value, index, 'target', e.target.textContent)
           let offText = this.newOfferings.find(i => i.id === e.target.value).name
           console.log(offText)
           this.offeringItem[index].name = offText
    },
    updateAttendanceId (e) {
      
          let index = this.attendanceItem.findIndex(i => i.attendanceTypeID === e.target.value)
          console.log(e.target.value, index, 'target', e.target.textContent)
          console.log(this.newAttendances, 'new attendances')
           let attText = this.newAttendances.find(i => i.attendanceTypeID === e.target.value).name
           
           this.attendanceItem[index].attendanceTypeName = attText
    }
  },
  created() {
    this.currentDate()

    axios.get("/api/offering").then((res) => {
      this.newOfferings = res.data.map((i) => {
        return { id: i.id, name: i.name };
      });
      console.log(res.data, "offerings on load");
    });
    axios.get("/GetAttendanceType").then((res) => {
      this.newAttendances = res.data.map((i) => {
        return { attendanceTypeID: i.id, name: i.name };
      });
    });
    this.getEventCategories();
    this.getLookUps();
    this.getHowDidYouAboutUsId();
    this.getEventById();
    this.getCurrenciesFromCountries();



  },
  computed: {
    filterAttendance() {
      if (this.attendanceText !== "" && this.newAttendances.length > 0) {
        return this.newAttendances.filter((i) => {
          return i.name
            .toLowerCase()
            .includes(this.attendanceText.toLowerCase());
        });
      } else {
        return this.newAttendances;
      }
    },
    birthYearsArr() {
      const arrOfYears = [];
      let currentYear = new Date().getFullYear();
      while (arrOfYears.length <= 100) {
        arrOfYears.push(currentYear);
        currentYear = currentYear - 1;
      }
      return arrOfYears;
    },
    filterOffering() {
      if (this.offeringText !== "" && this.newOfferings.length > 0) {
        return this.newOfferings.filter((i) => {
          return i.name.toLowerCase().includes(this.offeringText.toLowerCase());
        });
      } else {
        return this.newOfferings;
      }
    },
    filterEventCategory() {
      // let x;
      let arr = [];
      if (this.newEvents.length > 0) {
        console.log(this.newEvents, "new events");
        arr = this.newEvents.filter((i) => {
          return i.name.toLowerCase().includes(this.eventText.toLowerCase());
        });
        // } else if (this.newEvents.length <= 0) {
        // // return this.newEvents.filter((i) => {
        // //     return i.name.toLowerCase().includes(this.eventText.toLowerCase());
        // //     });
        // // console.log(this.eventText)
        //   return this.addEventCategoryText = this.eventText
      } else {
        return this.newEvents;
        // this.addEventCategoryText = this.eventText
      }
      return arr;
    },
    addOfferingTotal() {
      if (this.offeringItem.length <= 0) return 0;
      if (this.offeringItem.length === 1) return this.offeringItem[0].amount;
      const amounts = this.offeringItem.map((i) => +i.amount);
      return amounts.reduce((a, b) => {
        return (a || 0) + (b || 0);
      });
    },
    addAttendanceTotal() {
      if (this.attendanceItem.length <= 0) return 0;
      if (this.attendanceItem.length === 1)
        return this.attendanceItem[0].number;
      const number = this.attendanceItem.map((i) => +i.number);
      return number.reduce((a, b) => {
        return (a || 0) + (b || 0);
      });
    },
    selectedEventCategoryName() {
      console.log(this.selectedEventCategoryId);
      if (!this.selectedEventCategoryId) return "";
      if (!this.newEvents.find((i) => i.id === this.selectedEventCategoryId)) return ""
      return this.newEvents.find((i) => i.id === this.selectedEventCategoryId).name
        
    },
    eventCategoriesArr() {
      const arr = this.newEvents.map((i) => i.name);
      return arr;
    },
    genders() {
      return this.gender.map((i) => {
        return i.value;
      });
    },
    maritalStatuses() {
      return this.maritalStatusArr.map((i) => {
        return i.value;
      });
    },
    howYouHeard() {
      return this.howDidYouAboutUsId.map((i) => {
        return i.name;
      });
    },
    filterCurrency () {
      if (this.currencyText !== "" && this.currencyList.length > 0) {
        return this.currencyList.filter((i) => {
          if (i.name) return i.name.toLowerCase().includes(this.currencyText.toLowerCase()) || i.country.toLowerCase().includes(this.currencyText.toLowerCase())
        })
      } else {
        return this.currencyList
      }
    }
  },
};
</script>

<style scoped>
.event {
  font-family: "Nunito sans";
  /* margin-top: 20px; */
}
.events {
  font: normal normal 800 28px Nunito sans;
}
.btn-preview {
  border: 1px solid #797e81;
  border-radius: 22px;
  margin-left: 46px;
}
.btn-save {
  background: #136acd 0% 0% no-repeat padding-box;
  /* border-radius: 22px;
  color: white; */
  margin-left: 26px;
  text-align: center;
}
.nested-row {
  font-size: 0.9em;
}
.nested-row label {
  color: #02172e;
  margin-top: 10px;
  width: 100%;
}
.nested-row input {
  margin: 5px;
  padding: 5px;
  width: 100%;
  border: 1px solid #b2c2cd;
  border-radius: 5px;
}
/* .container.first-pane {
  margin-top: 5px; 
} */

.event-category {
  display: inline-block;
  background: #ffffff 0% 0% no-repeat padding-box;
  border: 1px solid #dde2e6;
  border-radius: 5px;
  font: normal normal bold 16px Nunito Sans;
  letter-spacing: 0px;
  /* color: #136ACD; */
  width: 100%;
  height: 100%;
  text-align: center;
  text-align-last: center;
}
.dropdown-container select {
  /* for Firefox */
  -moz-appearance: none;
  /* for Safari, Chrome, Opera */
  -webkit-appearance: none;
}
/* for IE10 */
.dropdown-container select::-ms-expand {
  display: none;
}
.new-category {
  text-align: center;
  padding: 30px;
  color: #136acd;
  font: normal normal bold 16px Nunito Sans;
}
.form {
  margin-top: 50px;
  background: #ffffff 0% 0% no-repeat padding-box;
  box-shadow: 0px 3px 15px #797e8159;
  border: 1px solid #dde2e6;
  border-radius: 7px;
}
.form .second-form.row.first-row {
  padding: 50px;
}
.form-body {
  padding: 30px;
}
.attendance-header {
  background-color: #ecf0f3;
  padding: 0 50px;
  border: none;
  border-bottom: 1px solid rgb(204, 204, 204);
}
.attendance-body {
  padding: 0 50px;
  background-color: #ecf0f3;
}

.attendance-body.stretch{
  height: 85px;
}
.attendance-type,
.count {
  background-color: rgb(255, 255, 255);
  width: 80%;
  border-radius: 5px;
  padding: 5px;
}
.attendance-header div,
.attendance-body div {
  padding: 5px;
}
.attendance-header div {
  color: #002044;
  font-weight: 700;
}
.empty {
  border: none;
  border-top: 1px solid rgb(231, 231, 231);
  width: 100%;
  padding: 20px;
  font: normal normal 600 18px/24px Nunito Sans;
}
.total-2 {
  font: normal normal 600 20px/27px Nunito Sans;
  letter-spacing: 0px;
  color: #02172eb9;
  text-align: right;
  align-self: center;
}
.edit {
  font: normal normal bold 13px Nunito Sans;
  letter-spacing: 0px;
  color: #136acd;
}
.add-attendance {
  color: #136acd;
  font-weight: 600;
  border: none;
  border-top: 1px solid rgb(231, 231, 231);
  padding: 20px;
  cursor: pointer;
}
.display {
  display: none;
}
.offering-drop {
  box-shadow: 0px 3px 15px #797e8159;
  z-index: 1;
  position: absolute;
  left: 5%;
  margin-top: -50px;
  padding: 10px 10px;
  width: 90%;
  background: white;
  display: block;
}
.offering-drop div {
  padding: 3px;
}
.offering-drop div:hover {
  padding: 3px;
  background: #ecf0f3;
}
.add {
  font: normal normal bold 16px Nunito Sans;
  letter-spacing: 0px;
  color: #136acd;
  display: inline;
  padding: 10px 15px;
  background: #ecf0f3;
  border-radius: 10px 10px 0px 0px;
  position: relative;
  top: -8px;
}
.textarea {
  border: none;
  border-top: 1px solid rgb(231, 231, 231);
}
.modal-title {
  font: normal normal 800 23px/31px Nunito Sans;
  letter-spacing: 0px;
  color: #002044;
}
.modal-fade {
  background: #002044;
}
.modal-body {
  margin: 10px;
}
.modal-content {
  border: none;
  border-radius: 7px;
}
.btn-second {
  background: #ffffff 0% 0% no-repeat padding-box;
  border: 1px solid #00204494;
  border-radius: 111px;
  height: 41px;
}
.btn-primary {
  background: #136acd 0% 0% no-repeat padding-box;
  border-radius: 111px;
}
.currency {
  width: 163%;
  height: 94%;
  font-size: 0.8em;
  background: rgba(207, 207, 207, 0.651);
  border: none;
  outline: none;
  /* margin-top: -4px; */
}

/* .p-dropdown .p-dropdown-label.p-placeholder {
  padding: 0;
} */

.drop-box {
  border: 2px dotted rgb(211, 211, 211);
  display: inline-block;
  padding: 15%;
  font-size: 0.9em;
}
.textarea-adjust {
  margin: 7px 10px 0px 7px;
}
.form-header {
  font: normal normal bold 18px/24px Nunito Sans;
  letter-spacing: 0px;
  color: #02172e;
  padding: 15px 30px;
  background: #ebeff4;
  border: 1px solid #00204430;
}
.make-public {
  font: normal normal bold 16px/22px Nunito Sans;
  color: #02172e;
}
.public {
  font: normal normal 600 14px/16px Nunito Sans;
  color: #136acd;
}
.push-down {
  margin-top: 5em;
}
.event-reg {
  font: normal normal bold 16px/22px Nunito Sans;
  /* color: #136ACD; */
}
.event-reg-dark {
  font: normal normal bold 16px/22px Nunito Sans;
  /* color: #02172E; */
}
.enable-reg {
  font: normal normal 600 16px/22px Nunito Sans;
  color: #02172e;
  margin-top: 3em;
}
.paid {
  margin-top: 2em;
  font: normal normal normal 16px/22px Nunito Sans;
  letter-spacing: 0px;
  color: #02172e;
}
.create {
  text-align: center;
  font: normal normal bold 16px/22px Nunito Sans;
  letter-spacing: 0px;
  color: #136acd;
}
.total {
  padding: 15px;
  width: 100%;
}
.header1 {
  margin-bottom: 20px;
  color: #136acd;
  font-size: 24px;
}
.attendance1 {
  width: 80%;
  margin: auto;
  padding: 20px;
  justify-content: space-between;
}
.attendance2 {
  display: inline-block;
  font-size: 15px;
}
.attendance3 {
  /* display: inline-block; */
  float: right;
  font-size: 15px;
}
.header2 {
  color: #02172e;
  font-size: 24px;
}
.header5 {
  margin-top: 0;
  color: rgb(77, 73, 73);
  font-size: 15px;
}
.header3 {
  color: #02172e;
  font-size: 42px;
}
.head5 {
  color: rgb(77, 73, 73);
}
hr {
  border-color: 0.01px rgba(158, 157, 157, 0.842);
}
div .maintext {
  font-size: 18px;
}
/* *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
} */
.table {
  padding: 20px 10px 0 10px;
}
.table {
  width: 100%;
  /* box-shadow: 0px 1px 4px #02172E45; */
  box-shadow: none;
  /* border: 1px solid #DDE2E6; */
  border: none;
  /* border-radius: 30px; */
  border-radius: 0;
  /* margin: 0 */
  margin: 24px 0 0 0;
}
.box-table {
  box-shadow: 0px 1px 4px #02172e45;
  border-radius: 30px;
  margin-top: 30px;
  width: 100%;
}
/* @media (min-width: 500px) and (max-width: 600px) {
    .box-table {
        width: 58%
    }
} */
.t-header {
  background-color: #f1f3f9;
}
#img {
  max-width: 30px;
}
tr.event-list th {
  color: #8898aa;
  /* font-size: 11px; */
  font-family: "Nunito Sans" Arial, sans-serif;
  letter-spacing: 1px;
  padding: 10px;
}
tr.event-list td {
  color: #02172e;
  /* padding: 5px; */
  vertical-align: middle;
}
.page-link {
  color: #136acd;
}
.page-link:hover {
  background-color: #136acd;
  color: #fff;
}
.page-link.active:hover {
  background-color: #136acd;
  color: #fff;
}
.add-first-timer {
  background: #ebeff4;
  padding: 10px;
  border-radius: 35px;
  font: normal normal bold 14px/19px Nunito Sans;
  letter-spacing: 0px;
  color: #136acd;
  text-align: center;
}
.add-new-convert {
  background: #ebeff4;
  padding: 10px;
  border-radius: 35px;
  font: normal normal bold 14px/19px Nunito Sans;
  letter-spacing: 0px;
  color: #136acd;
  text-align: center;
}
.input-first {
  /* width: 320px; */
  height: 39px;
  border: 1px solid #b9c5cf;
}
.close-slide1 {
  height: 0;
  overflow: hidden;
  transition: all 0.5s ease-in-out;
}
.slide-down1 {
  height: 365px;
  /* overflow: visible; */
  transition: all 0.5s ease-in-out;
}
.roll1 {
  transition: all 0.5s ease-in-out;
  transform: rotate(180deg);
}
.close-slide {
  height: 0;
  overflow: hidden;
  transition: all 0.5s ease-in-out;
}
.slide-down {
  height: 195px;
  transition: all 0.5s ease-in-out;
}
.roll {
  transition: all 0.5s ease-in-out;
  transform: rotate(180deg);
}
.close-slide2 {
  padding: 0;
  height: 0;
  overflow: hidden;
  transition: all 0.5s ease-in-out;
}
.slide-down2 {
  height: 412px;
  transition: all 0.5s ease-in-out;
  /* padding: 30px */
}
.roll2 {
  transition: all 0.5s ease-in-out;
  transform: rotate(180deg);
}
.close-slide3 {
  padding: 0;
  height: 0;
  overflow: hidden;
  transition: all 0.5s ease-in-out;
}
.slide-down3 {
  height: auto;
  padding: 30px;
  transition: all 0.5s ease-in-out;
}
.roll3 {
  transition: all 0.5s ease-in-out;
  transform: rotate(180deg);
}
.selected-category h4 {
  font-weight: 700;
  font-size: 22px;
}
.event-buttons {
  display: flex;
  justify-content: flex-start;
}
.event-buttons a {
  color: #136acd;
  font-weight: 600;
  margin: 0 24px 0 0;
}
.event-buttons a:hover,
.pointer {
  cursor: pointer;
}
.select-elem-con {
  /* padding: 47px 0; */
  height: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #ebeff4;
  border-radius: 8px;
  font-size: 1.2em;
  font-weight: 600;
  
}

.select-elem-con:hover {
  background: rgba(166, 200, 232, 0.302);
  transition: all 0.4s ease-in-out
}

.edit-category {
  border: 1px solid #ebeff4;
  border-radius: 8px;
  text-align: center;
}
.edit-form {
  margin: 10px 0 50px 0;
}
.edit-input {
  margin-bottom: 20px;
}
.edit-input input {
  border: 1px solid #ebeff4;
  border-radius: 8px;
  width: 95%;
  height: 40px;
  box-sizing: border-box;
}
.edit-form button {
  border-radius: 22px;
  background: #ebeff4;
  outline: transparent;
  padding: 4px;
  width: 80px;
  border: none;
}
.select-calendar-icon {
  position: absolute;
  left: 48px;
  top: 59px;
  z-index: 9;
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
.offering-drop {
  max-height: 300px;
  overflow: auto;
}
.donor-text {
  height: 28px;
  color: #136acd;
  cursor: pointer;
  font-weight: 600px;
  font-size: 0.9em;
}
.donor-text-name {
  color: black;
  text-decoration:none;
  font-weight: 700;
}

.modal-header, .modal-footer {
  border: none;
}

.flagCode {
    width: 160px;
    max-height: 15em;
    overflow-y: scroll;
    overflow-x: hidden;
    box-shadow: -3px 3px 15px #797e8159;
    position: absolute;
    /* top: 49.5%; */
    background: white;
    z-index: 10;
    display: block;
    margin-top: -4px
}

.flagCode div{
        width: 35em;      
    }
    .flagCode div:hover {
        background: rgb(238, 238, 238)
    }

    .hide-code {
  display: none;
  height: 0;
  overflow: hidden;
  /* transition: all 0.4s ease-in-out */
}

input.codeInput {
  width: 80%;
  margin-left: 12px;
  margin-top: 5px;
}


@media (min-width: 576px) {
  .offset-sm-1 {
    margin-left: 4.333333%;
  }
}
@media (max-width: 575px) {
  .btn-preview,
  .btn-save {
    margin-top: 2em;
  }
  .nested-row label {
    text-align: left;
  }
  .nested-row {
    margin-top: 2em;
  }
  .push-public {
    margin-top: 2em;
  }
}
@media (max-width: 991px) {
  .row.form-body.reg .row div {
    margin-top: 2em;
  }
  .attendance-body.stretch {
    height: 135px;
  }
}
</style>