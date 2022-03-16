<template>
     <div class="event mt-4" @click="hideModals">
     <div class="bg col-md-10 offset-md-1">
     <div class="container">
        <div class="row">
          <div class="text-center text-sm-left col-sm-5 page-header pt-2">Offering</div>
          <div class=" text-center text-sm-right col-sm-7 ">
            <div class="row">
              <div class="col-md-12 d-lg-flex justify-content-end">
                <div class="dropdown" v-if="false">
                <router-link to="/tenant/offeringcategory">
                <button class="more-btn button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">More <span><i class="pi pi-angle-down btn-icon"></i></span></button></router-link>
                    <div
                      class="dropdown-menu"
                      aria-labelledby="dropdownMenuButton"
                    >
                      <a class="dropdown-item">
                        <router-link to="/tenant/addoffering">Add Offering Category</router-link></a>
                    </div>
                  </div>
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
      

        <div class="form">
        <!-- <div class="container"> -->
        <div class="row second-form first-row">
          <div class="col-12 col-md-6">
              <!-- <button>Select Category</button> -->
              <div class="row nested-row d-flex align-items-end">
              <div class=" col-2 col-md-2 text-right px-0">
                <label for="date">Event</label>
              </div>
              <div class=" col-10 col-md-9">
                <button
                  @click.prevent="selectEventAttended"
                  class="form-control dd text-left close-modal"
                >
                  {{ selectedEventAttended.name ? selectedEventAttended.name.length > 20 ? `${selectedEventAttended.name.slice(0, 20)}...` : selectedEventAttended.name : "Select Event" }}
                 
                </button>
                <i
                @click="selectEventAttended"
                 class="pi pi-chevron-down cursor-pointer manual-dd-icon align-self-center close-modal"></i>
                <div class="input-field manual-dd-con close-modal" v-if="showEventList">
                <div class="manual-dd dd close-modal">
                  <div
                    class="container-fluid dd dd-search-con close-modal"
                    v-if="eventsAttended.length > 5"
                  >
                    <div class="row dd close-modal">
                      <div class="col-md-12 dd px-0 py-1 close-modal">
                        <input
                          type="text"
                          class="form-control close-modal"
                          v-model="eventsSearchString"
                          placeholder="search for event"
                        />
                      </div>
                    </div>
                  </div>

                 

                  <div class="container-fluid dd-list-con">
                    <div class="row">
                      <div class="col-md-12  px-0">
                        <p
                          class="px-1 manual-dd-item mb-0 py-2 px-3 dd"
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
              </div>
            </div>
          </div>

          <div class="col-12 col-md-6">
            <div class="row nested-row align-items-end">
              <div class=" col-2 col-md-1 px-0">
                <label for="date">Date</label>
              </div>
              <div class=" col-10 col-md-9">
                <input
                  placeholder=""
                  v-model="eventDate"
                  type="date"
                  class="form-control"
                  required
                />
              </div>
              <!-- <div class=" col-2 col-md-5">
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
              </div> -->
            </div>
          </div>
        </div>

        <div
                class="modal fade"
                id="eventModal"
                tabindex="-1"
                role="dialog"
                aria-labelledby="eventModalLabel"
                aria-hidden="true"
              >
                <div class="modal-dialog modal-dialog-centered" role="document">
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
                            :visible="displayModal"
                            :style="{ width: '50vw' }"
                            :modal="true"
                          >
                            <div class="row mt-2">
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
       
        <div class="col-12 offset-sm-1 add">Offering</div>
        <div class="attendance-header d-none d-lg-block">
          <div class="row">
            <div class="col-sm-3">Offering Item</div>
            <div class="col-sm-2" >Channel</div>
            <div class="col-sm-3" >Amount</div>
            <div class="col-sm-2 offset-sm-2" style="margin-left: 74px">Total</div>
          </div>
        </div>
        <div
          class="attendance-body stretch"
          id="offeringBody"
          v-for="(item, index) in offeringItem"
          :key="index"
        >
          <div class="row">
            <div class="col-12 col-sm-8 col-lg-3">
              <select class="form-control" v-if="item.financialContributionID && !routeParams">
                <option
                  v-for="(newOffering, index) in newOfferings"
                  :key="index"
                  :value="newOffering.id"
                  :selected="newOffering.id === item.financialContributionID"
                >
                  {{ newOffering.name }}
                </option>
              </select>
            
              <select class="form-control" v-else-if="item.financialContributionID && routeParams" v-model="item.financialContributionID" @change="updateOfferingId">
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
                v-else-if="!item.financialContributionID"
                v-model="item.name"
                placeholder="Enter Offering Item"
                ref="offeringInput"
              />
            </div>
            <div class="col-3 col-sm-4 col-lg-2">
              <select class="w-100 form-control" v-model="item.paymentChannel">
   
                <option value="Cheque">Cheque</option>
                <option value="Cash">Cash</option>
                <option value="Cheque">Cheque</option>
                <option value="POS">POS</option>
                <option value="Online">Online</option>
                <option value="Bank Transfer">Bank Transfer</option>
                <option value="USSD">USSD</option>
             
              </select>
            </div>
            <div class="col-3 col-sm-2 col-lg-1">
              
                <div
                class="currency pointer d-flex justify-content-around align-items-center close-modal"
                @click="item.showCurrency = !item.showCurrency"
                >
                <span class="ofering close-modal">{{ currencyList ? currencyList.find(i => i.id == item.currencyID) ?  currencyList.find(i => i.id == item.currencyID).name : tenantCurrency : "" }}</span
                ><span style="margin-top: 4px">
                    <i
                    class="pi pi-angle-down close-modal"
                    aria-hidden="true"
                    ></i
                ></span>
                </div>
                <div
                  class="ofering close-modal"
                  :class="{ 'style-account': item.showCurrency }"
                  v-if="item.showCurrency"
                  >
                  <div class="p-2">
                      <input
                      type="text"
                      placeholder="Search"
                      class="form-control close-modal ofering mb-1"
                      v-model="currencyText"
                      
                  />
                  </div>
                        <div class="header-border close-modal" v-if="filterCurrency.length > 0">
                          <div class="manual-dd-item close-modal" v-for="item in filterCurrency" :key="item.id">
                              <div class="d-flex justify-content-between p-1 close-modal">
                                  <div class="close-modal offset-sm-1" @click="addCurrency($event, index, item)">{{ item.name }} - {{ item.country }}</div>      
                              </div>                      
                          </div>
                        </div>
                        <div class="header-border close-modal" v-else>
                          <div class="p-3 text-center text-danger">No Match Found</div>
                        </div>
                  
                  
                  </div>
            </div>
            <div class="col-6 col-lg-3">
              <input
                type="text"
                class="form-control"
                v-model="item.amount"
                placeholder="Enter Amount"
                @input="sendAmount($event, index)"
              />
            </div>
            <div
              class="col-1 d-none d-lg-block"
            >
              {{ item.amount }}
            </div>
            <div
              class="col-2"
              @click="delOffering(index)"
            >
              <i class="pi pi-trash" aria-hidden="true"></i>
            </div>

          

            <div v-if="item.donor == '' " data-toggle="modal" data-target="#exampleModal" class="col-8 col-sm-3 offset-sm-5 donor-text pt-0 align-self-center" @click="setAddToDonor(index)">Add Donor</div>
            <div v-else class="col-8 col-sm-5 offset-sm-5 donor-text-name pt-0 align-self-center mt-1"  @click="setAddToDonor(index)" data-toggle="modal" data-target="#exampleModal" >{{ item.donor }}     <span class="donor-text">edit</span></div>
            <!-- <div v-if="item.donor == '' " @click="triggerGiverModal(index)" class="col-8 col-sm-3 offset-sm-5 donor-text pt-0 align-self-center">Add Donor</div>
            <div v-else class="col-8 col-sm-5 offset-sm-5 donor-text-name pt-0 align-self-center mt-1"  @click="triggerGiverModal(index)">{{ item.donor }}     <span class="donor-text">edit</span></div> -->
   
               </div>
        </div>

        <div
          class="col-sm-12 text-center add-attendance ofering"
          id="addOffering"
          @click="addOffering"
        >
          <i class="pi pi-plus-circle ofering" aria-hidden="true"></i
          >&nbsp;&nbsp;Add Offering Item
        </div>
        <div class="display ofering" id="showList" ref="offeringDrop">
          <input
            type="text"
            class="form-control mb-3 ofering"
            v-model="offeringText"
            placeholder="Search Offering item"
            ref="focusInp"
          />
          <i class="pi pi-search" style="position: absolute; right: 20px; margin-top: -42px"></i>

          <div
            class="ofering pointer"
            v-for="(newOffering, index) in filterOffering"
            :key="index"
            @click="offering(newOffering)"
          >
            {{ newOffering.name }}
          </div>
           <!-- @click="offering(null)" -->
           <!-- v-if="filterOffering.length < 1" -->
          <div
            
           type="button" data-toggle="modal" data-target="#exampleModalCenter"
            class="create ofering pointer"
          >
            Create New Offering Item
          </div>
          <!-- <div
            v-else
            @click="offering({ name: offeringText })"
            class="create pointer"
          >
            Create "{{ offeringText }}" offering item
          </div> -->
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

        <!-- Modal -->
        <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
          <div class="modal-dialog modal-lg modal-dialog-centered" role="document">
            <div class="modal-content">
              <div class="modal-header" style="border: none">
                <h5 class="modal-title" id="exampleModalLongTitle">Add Offering</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <div class="container">
                  <div class="row">
                    <div class="col-sm-4 text-right pr-0 align-self-center">
                      <label>Name</label>
                    </div>
                  <div class="col-lg-5 col-sm-12 my-auto">
                      <input type="text" class="form-control textbox-height w-100"  placeholder="" v-model="name" required /> 
                  </div>
                  <div class="col-sm-4 mt-3 text-right pr-0 align-self-center">
                      <label>Income Account</label>
                  </div>
                  <div class="col-lg-5 col-sm-12 mt-3">
                      <Dropdown v-model="selectedIncomeAccount" class="w-100 " :options="incomeAccount" optionLabel="text" :filter="true" placeholder="Select" :showClear="false">
                      </Dropdown>
                  </div>
                  <div class="col-sm-4 mt-3 text-right pr-0">
                      <label>Cash Account</label>
                    </div>
                  <div class="col-lg-5 col-sm-12 mt-3">
                    <Dropdown v-model="selectedCashAccount" :options="cashBankAccount" optionLabel="text" :filter="false" placeholder="Select" class="w-100 p-0" :showClear="false">
                    </Dropdown>
                  </div>
                  <div class="col-sm-12 d-flex" @click="toggleRem">
                      <i class="check-it mr-2">
                      <span class="child" v-if="applyRem"></span>
                    </i>
                    <h6>Apply Remitance</h6>
                  </div>
                  <div class="col-sm-12 mt-3" v-if="applyRem">
                    <hr class="hr"/>
                  </div>
                </div>

                <div v-if="applyRem">
                  <div class="row" v-for="(item, index) in remitance" :key="index">
                  <div class="col-sm-4 mt-5 text-right pr-0 align-self-center">
                      <label>Income Account</label>
                  </div>
                  <div class="col-lg-5 col-sm-12 mt-5">
                      <Dropdown v-model="item.account" class="w-100 " :options="incomeAccount" optionLabel="text" :filter="true" placeholder="Select" :showClear="false">
                      </Dropdown>
                  </div>

                  <div class="col-sm-4 text-right align-self-center mt-3">
                      <label>Percentage %</label>
                    </div>
                  <div class="col-lg-5 col-sm-12 mt-3">
                      <input type="text" class="form-control textbox-height w-100"  placeholder="" v-model="item.percentage" required /> 
                  </div>

                  <div class="col-sm-2 col-12 adjust-down">
                    <button
                      v-on:click="addRemittance"
                      class="btn btnIcons btn-secondary"
                    >
                      <i class="pi pi-plus-circle icons" aria-hidden="true"></i>
                      Add
                    </button>
                  </div>
                  <div class="col-sm-1 adjust-down" @click="deleteItem(index)">
                    <i class="pi pi-trash"></i>
                  </div>
                </div>
                </div>
              </div>
            </div>
              <div class="modal-footer d-flex justify-content-center mt-4  ml-5" style="border: none">
                <button type="button" class="btn secondary-btn px-5" data-dismiss="modal">Close</button>
                <!-- <button type="button" class="btn btn-primary">Save changes</button> -->
               
        <button class="add-person-btn button default-btn border-0" @click="createNewCon">
          Save
        </button>
    
              </div>
            </div>
          </div>
        </div>
  
          
    <!-- Modal -->
        <div
          class="modal fade"
          id="exampleModal"
          tabindex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title font-weight-bold" id="exampleModalLabel">
                  Add Donor
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
                <div class="row my-4">
                  <div class="col-md-4 text-md-right">
                    <label for="" class="font-weight-600">Search Name</label>
                  </div>
                  <div class="col-md-7">
                    <div class="dropdown">
                      <div class="input-group" id="dropdownMenuButton" data-toggle="dropdown">
                        <input
                          type="text"
                          class="form-control"
                          v-model="userSearchString"
                          @input="searchForUsers"
                          autocomplete="off"
                        />
                        <div class="input-group-append">
                          <span class="input-group-text"><i class="pi pi-chevron-down"></i></span>
                        </div>
                      </div>
 
                      <div
                        class="dropdown-menu w-100"
                        aria-labelledby="dropdownMenuButton"
                      >
                        <div class="row w-100 mx-auto" v-if="false">
                          <div class="col-md-12">
                            <input
                              type="text"
                              class="form-control"
                              placeholder="Find event"
                            />
                          </div>
                        </div>

                        <a
                          class="dropdown-item font-weight-700 small-text"
                          href="#"
                          v-for="(member, index) in searchedMembers"
                          :key="index"
                           @click="addExistingMember(member)"
                          >{{ member.name }}</a
                        >
                        <a
                          class="dropdown-item font-weight-700 small-text"
                          href="#"
                          v-if="
                            searchingForMembers && searchedMembers.length === 0
                          "
                          ><i class="pi pi-spin pi-spinner"></i
                        ></a>
                        <p
                          class="modal-promt pl-1 bg-secondary m-0"
                          v-if="
                            userSearchString.length < 3 &&
                            searchedMembers.length === 0
                          "
                        >
                          Enter 3 or more characters
                        </p>
                        <a
                          class="font-weight-bold small-text d-flex justify-content-center py-2 text-decoration-none primary-text c-pointer"
                          style="border-top: 1px solid #002044; color: #136acd"
                          @click="showAddMemberForm"
                          data-dismiss="modal"
                        >
                          <i
                            class="pi pi-plus-circle mr-2 primary-text d-flex align-items-center"
                            style="color: #136acd"
                          ></i>
                            Add new donor
                        </a>
                      </div>
                    </div>

                    <div class="row mt-4 d-flex justify-content-between">
                      <div class="col-6">
                        <button class="default-btn" data-dismiss="modal">Cancel</button>
                      </div>
                      <div class="col-6">
                        <button
                          class="default-btn primary-bg border-0 text-white"
                          data-dismiss="modal"
                          @click="addDonor"
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

        <Dialog
      header="Create New Member"
      v-model:visible="display"
      :style="{ width: '70vw', maxWidth: '600px' }"
      :modal="true"
      position="top"
    >
      <div class="row">
        <div class="col-md-12">
          <NewDonor @cancel="() => display = false" @person-id="getPersonId($event)"/>
        </div>
      </div>
    </Dialog>

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
      <!-- <div
        class="modal fade"
        id="exampleGiver"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header" style="border: none">
              <div class="modal-title" id="exampleModalLabel">Add Donor</div>
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
              <div class="container">
                <div class="row">
                  <div class="col-sm-4 text-right pr-0 align-self-center">
                      <label>Name <span class="text-danger">*</span></label>
                    </div>
                  <div class="col-lg-5 col-sm-12 my-auto">
                      <input type="text" class="form-control textbox-height"  placeholder="" v-model="donorText" required /> 
                  </div>
                  <div class="col-sm-4 mt-3 text-right pr-0 align-self-center">
                      <label>Phone Number</label>
                  </div>
                  <div class="col-lg-5 col-sm-12 my-auto">
                      <input type="text" class="form-control textbox-height"  placeholder="" v-model="donorPhone" required /> 
                  </div>
                  <div class="col-sm-4 mt-3 text-right pr-0 align-self-center">
                      <label>Email</label>
                  </div>
                  <div class="col-lg-5 col-sm-12 my-auto">
                      <input type="text" class="form-control textbox-height"  placeholder="" v-model="donorEmail" required /> 
                  </div>
                </div>
              </div>
            </div>
            <div class="modal-footer" style="border: none">
              <button type="button" class="btn btn-second" data-dismiss="modal">
                Cancel
              </button>
              <button
                type="button"
                class="apply-btn"
                id="closeEvent"
                
                ref="closeDonorModal"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div> -->

        <div class="col-sm-12 empty">
          <div class="row">
            <div class="col-2 col-md-6"></div>
            <div class="col-3 col-md-3 total-2">TOTAL</div>
            <div class="col-3 col-md-1">
              <CurrencyConverter :tenantCurrency="tenantCurrency" :selectedCurrency="selectedCurrencyName" :currencyList="currencyList" :currencyAmount="addOfferingTotal" @conversion-result="convertResult" @currency-rate="setCurrencyRate"
              />
              <!-- <Dropdown :options="['NGN - Naira', 'CAD - Canadian dollar', 'AFN - Afghanistan']" :filter="true" placeholder="NGN - Naira" :showClear="false">
                    
                </Dropdown> -->
            </div>
            <div class="col-4 col-md-2 align-self-center">
              {{ convertedResult ? convertedResult.toFixed(2) : addOfferingTotal ? addOfferingTotal.toFixed(2) : 0.00 }}
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
        <Toast />
      </div>
      <div class="col-12 mt-3 mb-2 justify-content-end d-flex">
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
</template>

<script>
import { ref, onMounted, computed, nextTick } from 'vue'
import axios from "@/gateway/backendapi";
// import SelectElem from "@/components/select/SelectElement.vue";
import { useToast } from "primevue/usetoast";
import Dialog from "primevue/dialog";
import Dropdown from 'primevue/dropdown';
import NewDonor from '../../../components/membership/NewDonor.vue';
import membershipService from "../../../services/membership/membershipservice";
import router from '../../../router';
import { useStore } from 'vuex'
import CurrencyConverter from "../../event/CurrencyConverter"
import CurrencyConverterService from '../../../services/currency-converter/currencyConverter'
import { useRoute } from "vue-router"
import finish from '../../../services/progressbar/progress';
export default {
    components: {
        Dialog, Dropdown, NewDonor, CurrencyConverter
    },
    setup () {
        const toast = useToast();
        const store = useStore()
        const route = useRoute()
        const offeringDrop = ref(null)
        const showEventList = ref(false)
        const eventsAttended = ref([]);
        const eventsSearchString = ref("");
        const newEvents = ref([]);
        const selectedEventAttended = ref({});
        const selectEvent = ref("Select Event");
        const showCategory = ref(false);
        const eventText = ref("");
        const eventDate = ref(new Date().toISOString().substr(0, 10))
        const newEventCategoryName = ref("");
        const displayModal = ref(false);
        const invalidEventDetails = ref(false);
        const savingNewEvent = ref(false);
        const newOfferings = ref([]);
        const offeringText = ref("");
        const offeringItem = ref([]);
        const offeringInput = ref("");
        const currencyText = ref("");
        const currencyList = ref([]);
        const routeParams = ref("");
        const remitance = ref([{}])
        const incomeAccount = ref([])
        const applyRem = ref(false)
        const selectedIncomeAccount = ref("")
        const name = ref("")
        const selectedCashAccount = ref("")
        const cashBankAccount = ref([])
        const offeringToAddDonor = ref(0)
        const donorBoolean = ref(false)
        const modalTogglerGiver = ref("")
        const donorText = ref("")
        const userSearchString = ref("");
        const searchedMembers = ref([]);
        const searchingForMembers = ref(false)
        const display = ref(false);
        const personId = ref("")
        const tenantCurrency = ref("")
        const loading = ref(false)
        const focusInp = ref("")
        const tenantId = ref("")
        const selectedCurrencyName = ref("")
        const currencyAmount = ref("")
        const convertedAmount = ref([])
        const convertedAmount2 = ref([])
        const currencyIndex = ref(0)
        const currencyRate = ref("")
        const convertedResult = ref(0)


        const addOffering = () => {
            offeringDrop.value.classList.toggle("offering-drop");
            focusInp.value.focus()
            }

        const hideModals = (e) => {
            if (!e.target.classList.contains("ofering")) {
                offeringDrop.value.classList.remove("offering-drop");
              }
            if (!e.target.classList.contains("close-modal") ) {
              showEventList.value = false
            }
          }

        const selectEventAttended = () => {
            showEventList.value = !showEventList.value;
            };

        const filteredEvents = computed(() => {
            if (!eventsSearchString.value) return eventsAttended.value;
            return eventsAttended.value.filter((i) =>
                i.name.toLowerCase().includes(eventsSearchString.value.toLowerCase())
            );
            });

        onMounted(() => {
            axios.get("/api/Events/EventActivity").then((res) => {
                eventsAttended.value = res.data;
            });

            axios.get("/api/EventCategory").then((res) => {
                newEvents.value = res.data.map((i) => {
                return { id: i.id, name: i.name };
                });
            });
            });

        const closeManualModalIfOpen = (e) => {
            if (!e.target.classList.contains("dd")) {
                showEventList.value = false;
                eventsSearchString.value = "";
            }
            };

        const eventAttendedSelected = (eventObj) => {
            console.log(eventObj);
            selectedEventAttended.value = eventObj;
            showEventList.value = false;
            eventsSearchString.value = "";
            };

        const newEvent = ref({
            activity: {},
            });

        const individualEvent = (obj) => {
            selectEvent.value = obj.name;
            newEvent.value.activity.eventCategoryId = obj.id;
            showCategory.value = false;
            console.log(obj);
            };

        const filterEventCategory = computed(() => {
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
                summary: "Event Not Created",
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
                selectedEventAttended.value.name = `${data.currentEvent.name} (${data.currentEvent.id})`
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
                // if (error.response.data == "An Event with this name already exist") {
                //     toast.add({
                //     severity: "error",
                //     summary: "Event exist already",
                //     detail: error.response.data,
                //     life: 2500,
                //     });
                // }
                console.log(error)
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

        const getOffering = () => {
              axios.get("/api/financials/contributions/items").then((res) => {
              newOfferings.value = res.data
              //.map((i) => {
              //   return { id: i.id, name: i.name };
              // });
              console.log(res.data, "offerings on load");
            });
            }
            getOffering()

        const filterOffering = computed(() => {
            if (offeringText.value !== "" && newOfferings.value.length > 0) {
              return newOfferings.value.filter((i) => {
                return i.name.toLowerCase().includes(offeringText.value.toLowerCase());
              });
            } else {
              return newOfferings.value;
            }
          })

        const offering = (offObj) => {
      if (offObj) {
            offeringItem.value.push({
              name: offObj.name,
              financialContributionID: offObj.id,
              paymentChannel: offObj.paymentChannel == undefined || offObj.paymentChannel == "" || offObj.paymentChannel == null ? "Cash" : offObj.paymentChannel,
              donor: "",
              date: eventDate.value,
              activityID: selectedEventAttended.value.activityID,
              currencyID: currencyList.value && tenantCurrency.value ? currencyList.value.find(i => i.name === tenantCurrency.value).id : "",
              fromCurrencyRate: `usd${tenantCurrency.value ? tenantCurrency.value.toLowerCase() : ""}`
            });
          } 

          // const currentSignedIn = () => {
              // try {
              //   const res = axios.get("/api/Membership/GetCurrentSignedInUser");
              //   // store.dispatch("setCurrentUser", res.data);
              //   console.log(res.data);
              // } catch (err) {
              //   /*eslint no-undef: "warn"*/
              //   NProgress.done();
              //   console.log(err.response);
              //   // if (err.response && err.response.status === 401) {
              //     // localStorage.setItem("token", "");
              //     // router.push("/");
              //   // }
              // }
              // axios.get('/api/Membership/GetCurrentSignedInUser')
              //   .then(res => console.log(res.data))
              //   .catch(err => console.log(err))
              // }
              // currentSignedIn()
          // else {
          //   offeringItem.value.push({
          //     currency: "NGN",
          //     channel: "Cash"
          //   });

            nextTick(() => {
              // offeringInput.value.focus();
            });

          // }
          offeringDrop.value.classList.remove("offering-drop")
          
        }

        const delOffering = (index) => {
          offeringItem.value.splice(index, 1)
        }

    //     const getCurrenciesFromCountries = () => {
    //   let url = "/api/getallcountries"
    //   axios.get(url)
    //     .then(res => {
    //       currencyList.value = res.data.map(i => {
    //           // return `${i.currency} ${i.name}`
    //           return {
    //           name: i.currency,
    //           id: i.id,
    //           country: i.name
    //         }
            
    //       })
    //     })
    //     .catch(err => console.log(err))
    // }
    // getCurrenciesFromCountries()
    
        const getCurrentlySignedInUser = async() => {
            try {
                const res = await axios.get("/api/Membership/GetCurrentSignedInUser");
                // console.log(res.data)
                tenantId.value = res.data.tenantId
                // if(res.data.country == "Nigeria") {
                //     isPaystackChecked.value = true
                //     isFlutterwave.value = true
                //     isPaypal.value = true
                // } else {
                //     isPaypal.value = true
                //     isFlutterwave.value = true
                // }
                console.log(store.getters.currentUser)
                if (store.getters.currentUser === undefined) {
                   axios.get(`/api/Lookup/TenantCurrency?tenantID=${res.data.tenantId}`)
                  .then(res => {
                    tenantCurrency.value = res.data.currency
                    getOneContribution()
                    console.log(res.data)
                  })
                  .catch(err => console.log(err))
                } else {
                  axios.get(`/api/Lookup/TenantCurrency?tenantID=${store.getters.currentUser.tenantId}`)
                  .then(res => {
                    tenantCurrency.value = res.data.currency
                    getOneContribution()
                  })
                  .catch(err => console.log(err))
                console.log(store.getters.currentUser)  
                }
                
                
            } catch (err) {
                /*eslint no-undef: "warn"*/
                NProgress.done();
                console.log(err);
            }
        }
        getCurrentlySignedInUser()

      // const getTenantCurrency = () => {
        onMounted(() => {
          
        })
        
      // }
      // getTenantCurrency()

      const getAllCurrencies = () => {
          axios.get('/api/lookup/getallcurrencies')
            .then(res => {
              currencyList.value = res.data.map(i => {
                return {
                  name:  i.shortCode,
                  id: i.id,
                  country: i.country
                }
              })
            })
            .catch(err => console.log(err))
      }
      getAllCurrencies()

        const filterCurrency = computed(() => {
          if (currencyText.value !== "" && currencyList.value.length > 0) {
            return currencyList.value.filter((i) => {
              if (i.name) return i.name.toLowerCase().includes(currencyText.value.toLowerCase()) || i.country.toLowerCase().includes(currencyText.value.toLowerCase())
            })
          } else {
            return currencyList.value
          }
        })

      const addOfferingTotal= computed(() => {
        if (convertedAmount.value.length <= 0) return 0;
        // if (convertedAmount.value.length === 1) return convertedAmount.value[0].amount;
        // const amounts = convertedAmount.value.map((i) => +i.amount);
        return convertedAmount.value.reduce((a, b) => {
          return (a || 0) + (b || 0);
        });
      })

      // addContributionTotal() {
      // if (this.convertedAmount2.length <= 0) return 0;
      // // if (this.convertedAmount.length === 1) return this.convertedAmount[0].amount;
      // // const amounts = this.offeringItem.map((i) => +i.amount);
      // // return amounts.reduce((a, b) => {
      // //   return (a || 0) + (b || 0);
      // // });
      // return this.convertedAmount2.reduce((a, b) => {
      //   return +a + +b
      // })

      const addRemittance = () => {
        remitance.value.push({})
      }

      const deleteItem = (index) => {
        remitance.value.splice(index, 1)
      }

      const getIncomeAccount = ()=> {
          axios.get('/api/Financials/Accounts/GetIncomeAccounts')
            .then(res => {
               finish()
                console.log(res)
              incomeAccount.value = res.data
            })
            .catch(err => {
                NProgress.done();
                console.log(err)
            })
        }
        getIncomeAccount()


        const getCashBankAccount = () => {
            axios.get('/api/financials/accounts/getcashbankaccounts')
              .then(res => {
                console.log(res.data)
                cashBankAccount.value = res.data
              })
              .catch (err => {
                console.log(err)
              })
        }
        getCashBankAccount()

        const toggleRem = () => {
          applyRem.value = !applyRem.value
        }

        const createNewCon = (e) => {
          let contributionCategory = {
            name: name.value,
            incomeAccountId: selectedIncomeAccount.value.id,

            cashAccountId: selectedCashAccount.value.id,
            
          }
              if (remitance.value[0].account || remitance.value[0].percentage) {
                contributionCategory.incomeRemittance = remitance.value.map(i => {
                  return {
                    financialFundID: i.account.financialFundID,
                    distinationIncomeAccount: i.account.id,
                    percentage: i.percentage
                  }
                })
              } else {
                contributionCategory.incomeRemittance = null
              }
          console.log(contributionCategory)
          axios.post('/api/financials/contributions/items/save', contributionCategory)
                  .then(res => {

                    newOfferings.value.push({
                      name: name.value,
                      id: res.data.id
                    })
                    toast.add({severity:'success', summary: 'Saved', detail:'Offering Saved', life: 3000});
                    console.log(res)
                    
                  })
                  .catch(err => {
                    toast.add({severity:'error', summary: 'Error', detail:'Not Successful', life: 3000});
                    console.log(err)
                  })
                  e.target.setAttribute('data-dismiss', 'modal')
        }

        const post =  () => {
        let invalidOfferingItem = offeringItem.value.find(i => !i.amount)
        if(invalidOfferingItem){
          toast.add({
              severity: "warn",
              summary: "Enter Amount",
              detail: `Enter amount for Offering item`,
              life: 3000,
          })
          return false
        }
              // let financialContributionTrasaction = {
              //   id: 123,
              //   financialContributionID:123,
              //   date: 123,
              //   tenantID: 123,
              //   activityID: 123,
                
              // }
          loading.value = true
        let contributions = offeringItem.value.map(i => {
          let amount = i.amount.toString()
          const removeCharacters = amount.replace(/[^0-9.]/g, "");
          const toNumber = parseFloat(removeCharacters)
                return {
                  name: i.name,
                  financialContributionID: i.financialContributionID,
                  date: i.date,
                  amount: toNumber ? toNumber : 0,
                  paymentChannel: i.paymentChannel,
                  activityID: i.activityID,
                  personID: i.personID ? i.personID : "",
                  currencyID: i.currencyID
                }
              })

              console.log(contributions)

          if (!route.params.offId) {
            axios.post('/api/Financials/Contributions/Transactions/Save', contributions)
            .then(res => {
              console.log(res)
              localStorage.setItem('contriTransact', JSON.stringify(res.data.returnObject))
              loading.value = false


              if (Object.keys(selectedEventAttended.value).length > 0) {
                router.push({ name: 'OfferingReport', query: { report: eventDate.value, activityID: selectedEventAttended.value.activityID } })
              } else {
                router.push({ name: 'OfferingReport', query: { report: eventDate.value } })
              }
              
              let contriTransact = res.data.returnObject.map(i => {
                return {
                  amount: i.amount,
                  contribution: i.contribution.name,
                  date: i.date,
                  donor: i.personName,
                  eventDate: selectedEventAttended.value.name,
                  eventName: selectedEventAttended.value.name,
                  id: i.id,
                  currencyName: currencyList.value.find(j =>  j.id === i.currencyID).name
                }
              })
              console.log(contriTransact)
              store.dispatch('contributions/newlyAddedContribution', contriTransact)
            })
            .catch(err => {
              loading.value = false
              toast.add({severity:'error', summary: 'Error', detail:'Please try again', life: 3000});
              console.log(err)
            })
          } else {
            contributions[0].id = route.params.offId

            console.log(contributions)

            axios.put(`/api/Financials/Contributions/Transactions/Edit`, contributions)
            .then(res => {
              console.log(res)
              localStorage.setItem('contriTransact', JSON.stringify(res.data.returnObject))
              loading.value = false

              if (Object.keys(selectedEventAttended.value).length > 0) {
                router.push({ name: 'OfferingReport', query: { report: eventDate.value, activityID: selectedEventAttended.value.activityID } })
              } else {
                router.push({ name: 'OfferingReport', query: { report: eventDate.value } })
              }
              
              // let contriTransact = res.data.returnObject.map(i => {
              //   return {
              //     amount: i.amount,
              //     contribution: i.contribution.name,
              //     date: i.date,
              //     donor: i.personName,
              //     eventDate: selectedEventAttended.value.name,
              //     eventName: selectedEventAttended.value.name,
              //     id: i.id,
              //     currencyName: currencyList.value.find(j =>  j.id === i.currencyID).name
              //   }
              // })
              // console.log(contriTransact)
              // store.dispatch('contributions/newlyAddedContribution', contriTransact)
            })
            .catch(err => {
              loading.value = false
              toast.add({severity:'error', summary: 'Error', detail:'Please try again', life: 3000});
              console.log(err)
            })
          }
        }

        const addCurrency =  async (e, index, item) => {
        // console.log(e.target.innerHTML, index)
        // offeringItem.value[index].currency = e.target.innerHTML.split(" ")[0]
          // if (item.id) {
                offeringItem.value[index].currencyID = item.id
                offeringItem.value[index].showCurrency = false
                console.log(item, index)

                selectedCurrencyName.value = e.target.innerHTML.split(" ")[0]
          // } else {
          //       offeringItem.value[index].currencyID = 721
          // }
          offeringItem.value[index].fromCurrencyRate = `usd${item.name.toLowerCase()}`



           let toDestinationCurrencyRate = `usd${tenantCurrency.value.toLowerCase()}`
          let fromCurrencyRate = offeringItem.value[index].fromCurrencyRate

          let amount = offeringItem.value[index].amount ? +offeringItem.value[index].amount : 0

  
          try {
            let result = await CurrencyConverterService.currencyConverter(amount, fromCurrencyRate, toDestinationCurrencyRate)
            console.log(result)
            convertedAmount.value[index] = result
          }
          catch (err) {
            console.log(err)
          }

      }

      const setAddToDonor = (index) => {
        offeringToAddDonor.value = index
      }

       const addDonor = () => {
            let donorName = userSearchString.value
            offeringItem.value[offeringToAddDonor.value].donor = donorName
            donorBoolean.value = true
            userSearchString.value = ""
          }

        const searchForUsers = () => {
          if (userSearchString.value.length >= 3) {
            startSearch(userSearchString.value);
          }
        };

        const startSearch = async (str) => {
          try {
            searchingForMembers.value = true;
            const response = await membershipService.searchMembers(str);
            searchingForMembers.value = false;
            searchedMembers.value = response;
          } catch (error) {
            searchingForMembers.value = false;
            console.log(error);
          }
        };

        const showAddMemberForm = () => {
          display.value = true;
        };

        
        const addExistingMember = (member) => {
          userSearchString.value = member.name;
          offeringItem.value[offeringToAddDonor.value].personID = member.id
          console.log(userSearchString.value, member)
        }

        const getPersonId = (payload) => {
          personId.value = payload
          offeringItem.value[offeringToAddDonor.value].donor = payload.personFirstName
          offeringItem.value[offeringToAddDonor.value].personID = payload.personId
        }

        const getRates = async() => {
            try {
                let { data } = await axios.get('/fxRates')
                store.dispatch("getRates", data)
            }   catch (error) {
                    console.log(error);
            }
        }
        getRates()

        const sendAmount = async(e, index) => {
          let amount = offeringItem.value[index].amount.toString()
          let removeCharacters = amount.replace(/[^0-9.]/g, "");
          let toNumber = parseFloat(removeCharacters)

          currencyAmount.value = e.target.value
          currencyIndex.value = index


          let toDestinationCurrencyRate = `usd${tenantCurrency.value.toLowerCase()}`
          let fromCurrencyRate = offeringItem.value[index].fromCurrencyRate
          // let amount = offeringItem.value[index].amount ? +offeringItem.value[index].amount : 0
          let amountToConvert = toNumber ? toNumber : 0

  
          try {
            let result = await CurrencyConverterService.currencyConverter(amountToConvert, fromCurrencyRate, toDestinationCurrencyRate)
            console.log(result)
            convertedAmount.value[index] = result
          }
          catch (err) {
            console.log(err)
          }
          console.log(toDestinationCurrencyRate)
          console.log(fromCurrencyRate)
          console.log(amount)
        }

        const convertResult = (payload) => {
          convertedResult.value = payload
        }

        const setCurrencyRate = (payload) =>  {
          currencyRate.value = payload
        }

        const getOneContribution = async() => {
          if(route.params.offId) {
            try {
                let { data } = await axios.get(`/api/Financials/Contributions/Transactions/One?ID=${route.params.offId}`)
                console.log(data)
                selectedEventAttended.value = {
                  name: data && data.activity ? data.activity.name : '',
                  activityID: data.activityID
                }
                eventDate.value = data.date.split("T")[0]
                offeringItem.value = [{
                  name: data && data.contribution ? data.contribution.name :  "",
                  financialContributionID: data.financialContributionID,
                  date: data.date.split("T")[0],
                  activityID: data.activityID,
                  paymentChannel: data.paymentChannel,
                  currencyID: data.currencyID,
                  amount: data.amount,
                  currencyName: data.currency.shortCode,
                  fromCurrencyRate: `usd${data.currency.shortCode.toLowerCase()}`
                }]

                getOnePerson(data.personID)

                for (let index = 0; index < offeringItem.value.length; index++) {
                  const i = offeringItem.value[index];
                  let toDestinationCurrencyRate = `usd${tenantCurrency.value.toLowerCase()}`
                  let fromCurrencyRate = i.fromCurrencyRate
                  let amount = i.amount ? +i.amount : 0

          
                  try {
                    let result = await CurrencyConverterService.currencyConverter(amount, fromCurrencyRate, toDestinationCurrencyRate)
                    console.log(result)
                    convertedAmount.value.push(result)
                  }
                  catch (err) {
                    console.log(err)
                  }
                  
                }
                
            }   catch (error) {
                    console.log(error);
            }
          }
        }
        
        
        
        const getOnePerson = async(personId) => {
          if(route.params.offId && personId) {
            try {
                let { data } = await axios.get(`/api/People/GetPersonInfoWithAssignments/${personId}`)
                console.log(data)
                offeringItem.value[offeringToAddDonor.value].donor = `${data.firstName ? data.firstName : ''} ${data.lastName ? data.lastName : ''}`

                offeringItem.value[offeringToAddDonor.value].personID = personId
            }   catch (error) {
                    console.log(error);
            }
          }
        }

        return {
            addOffering, offeringDrop, hideModals, selectEventAttended, showEventList, eventsAttended, filteredEvents, closeManualModalIfOpen, eventAttendedSelected,
            newEvents, selectedEventAttended, eventsSearchString, selectEvent, individualEvent, newEvent, showCategory, filterEventCategory, eventText, eventDate, createNewCat,
            newEventCategoryName, displayModal, openModal, closeModal, toast, createNewEvent, invalidEventDetails, savingNewEvent, newOfferings, filterOffering, offeringText,
            offering, offeringItem, offeringInput, delOffering, currencyText, filterCurrency, currencyList, addOfferingTotal, routeParams, addRemittance, remitance, deleteItem, incomeAccount, selectedIncomeAccount, applyRem, toggleRem, post, name, selectedCashAccount, cashBankAccount, createNewCon, addCurrency, addDonor, offeringToAddDonor, donorBoolean, modalTogglerGiver, donorText, userSearchString, searchedMembers, searchForUsers, searchingForMembers, showAddMemberForm, display, setAddToDonor, addExistingMember, getPersonId, personId, tenantCurrency, loading, focusInp, tenantId, selectedCurrencyName, currencyAmount, sendAmount, convertedAmount, convertedAmount2,  setCurrencyRate, currencyRate, convertResult, convertedResult
    }
  }
}
</script>

<style scoped>
    .page-header {
        font: normal normal 800 29px Nunito sans;
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

        .attendance-header {
        background-color: #ecf0f3;
        padding: 0 50px;
        border: none;
        border-bottom: 1px solid rgb(204, 204, 204);
        }

        .attendance-header div,
        .attendance-body div {
        padding: 5px;
        }
        .attendance-header div {
        color: #002044;
        font-weight: 700;
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
        max-height: 300px;
        overflow: auto;
        }
        .offering-drop div {
        padding: 3px;
        }
        .offering-drop div:hover {
        padding: 3px;
        background: #ecf0f3;
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

        .manual-dd-icon {
        position: absolute;
        top: 28%;
        right: 10%
        }

        .manual-dd-con {
        position: relative;
        }

        .manual-dd {
        width: 100%;
        border: 1px solid #b9c5cf;
        position: absolute;
        background: white;
        z-index: 2;
        top: 0px;
        /* margin-right: 0.5rem; */
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
          margin: 10px;
          width: calc(100%  - 20px);
        }

        .form-control.input.dd {
        text-align: left;
        }

        .dd-list-con {
        max-height: 360px;
        overflow: auto;
        }

        .create {
        text-align: center;
        font: normal normal bold 16px/22px Nunito Sans;
        letter-spacing: 0px;
        color: #136acd;
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

        .modal-body.new-event-modal {
        padding: 0;
        }

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

        .attendance-body {
          padding: 0 50px;
          background-color: #ecf0f3;
        }

        .attendance-body.stretch{
          height: 85px;
        }

        @media (max-width: 991px) {
          .row.form-body.reg .row div {
            margin-top: 2em;
          }
          .attendance-body.stretch {
            height: 135px;
          }
        }

        .currency {
          width: 120%;
          height: 100%;
          font-size: 0.8em;
          background: rgba(207, 207, 207, 0.651);
          border: none;
          outline: none;
          /* margin-top: -4px; */
        }

        .more-btn {
          background: #dde2e6;
        }

        .style-account {
          box-shadow: 0px 3px 15px #797e8159;
          position: absolute;
          background: white;
          z-index: 1;
          width: 382%;
          max-height: 16em;
          overflow-y: auto;
          }
          .style-account div div:hover {
          background-color: #ecf0f3;
          cursor: pointer;
          }

          .btnIcons {
        width: 110px;
        height: 41px;
        color: #136acd;
        background-color: #dde2e6;
        border-radius: 40px;
        border: none;
      }

      .textbox-height {
        height: 42px;
        margin-top: -4px;
        width: 176px;
      }
        
        .check-it {
          border: 2px solid #136acd;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          margin-top: -1px;
        }

        .check-it .child {
          /* border: 2px solid red; */
          display: inline-block;
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: #136acd;
          position: relative;
          left: 3px;
          top: -4px;
        }

        .hr {
          border: 0.8px solid #0020440a;
          /* margin: 0 45px; */
        }

        .adjust-down {
            align-self: flex-end;
        }

        .add-person-btn {
          background: #136acd;
          color: #fff;
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

    .dropdown-menu {
      max-height: 400px;
      overflow: scroll;
    }
</style>