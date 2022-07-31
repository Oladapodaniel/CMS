<template>
  <div class="container-fluid container-top">
    <div class="row">
      <div class="col-md-12 px-0">
        <div class="container">
          <div class="row mt-4">
            <div class="col-md-5">
              <h2 class="font-weight-bold page-hder">Pledge Overview</h2>
            </div>
            <!-- <div class="col-md-7 d-sm-flex justify-content-md-end">
              <router-link
                :to="{ name: 'MakePledge', path: '/tenant/pledge/makepledge' }"
              >
                <a
                  class="
                    def-btn
                    primary-bg
                    text-white
                    border-0
                    px-sm-2 px-lg-4
                    my-sm-1
                  "
                  >Make new pledge</a
                >
              </router-link>
            </div> -->
            <Toast />
          </div>
          <hr class="mb-4" />
        </div>
        <div class="container">
          <div class="row mb-4 mt-3">
            <div class="col-md-7">
              <span class="theader"> Pledge Name </span>
              <div class="my-3">
                <span class="evt-name">
                  {{ pledgeName ? pledgeName : "" }}
                </span>
              </div>
            </div>

            <div class="col-md-5">
              <span class="theader">Donor</span>
              <div class="my-3">
                <span class="evt-name">{{ personName }}</span>
              </div>
            </div>
            <div class="col-md-7">
              <span class="theader"> Pledged Amount </span>
              <div class="my-3">
                <span class="evt-name">
                  {{ pledgeAmount.toLocaleString() }}
                </span>
              </div>
            </div>

            <div class="col-md-5">
              <span class="theader">Total Target Amount</span>
              <div class="my-3">
                <span class="evt-name">
                  {{
                    Number(selectedPledge.totalTargetAmount).toLocaleString()
                  }}</span
                >
              </div>
            </div>
          </div>

          <!-- =============
          <div class="container-fluid bottom-section px-0">
            <div class="row mx-0" ref="topmost">
              <div class="col-md-8 dark-red-section pl-5">
                <h2 class="evt-report">Pledge</h2>
              </div>
              <div
                class="
                  col-md-4
                  d-flex
                  flex-column
                  light-red-section
                  pr-5
                  text-center
                "
              >
                <span>
                  <span class="mb-n3">Amount Pledged: </span> <br />
                  <span class="recieve">{{ pledgeAmount }}</span>
                </span>
                <span>
                  <span>Total Target Amount: </span> <br />
                  <span class="recieve"
                    >NGN {{ selectedPledge.totalTargetAmount }} &nbsp;</span
                  >
                </span>
              </div>
            </div>

            <div class="row py-5 px-5" ref="middle">
              <div class="col-md-7">
                <span class="evt-label grey-text"> Pledge Name </span>
                <h2 class="font-weight-bold mb-3" style="font-size: 25px">
                  {{ pledgeName }}
                </h2>
                <span class="evt-date text-danger">
                  {{
                    pledgeDate
                      ? new Date(pledgeDate)
                          .toString()
                          .split(" ")
                          .slice(0, 4)
                          .join(" ")
                      : ""
                  }}
                </span>
              </div>
              <div class="col-md-5 pl-0">
                <div class="row">
                  <div class="col-md-6 d-md-flex justify-content-end">
                    <span class="bold-700">Pledge Item: </span>
                  </div>
                  <div class="col-md-6 pl-md-0">
                    <span>{{ pledgeName }}</span>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-6 d-md-flex justify-content-end">
                    <span class="bold-700">Person: </span>
                  </div>
                  <div class="col-md-6 pl-md-0">
                    <span>{{ personName }}</span>
                  </div>
                </div>
              </div>
            </div> -->

          <div class="row mb-5">
            <div class="col-md-12">
              <hr class="mb-0" />
              <div class="pg-content">
                <div class="row mb-3">
                  <div class="col-md-12">
                    <span class="attendance-header">Payment link</span>
                  </div>
                </div>
                <div class="row">
                  <div class="col-12">
                    <div class="row">
                      <div class="col-12 mb-5 mx-3 border shadow rounded">
                        <div class="row">
                          <div
                            class="
                              col-md-2 col-sm-2
                              d-flex
                              align-self-center
                              image
                              mt-4
                            "
                          >
                            <img
                              src="../../assets/link.svg"
                              class="w-100"
                              alt="marked Attendance image"
                              style="width: 60px; height: 60px"
                            />
                          </div>
                          <div class="col-md-10 col-sm-10 mt-3">
                            <a class="text-decoration-none"
                              ><h4
                                class="header4 link-color c-pointer"
                                @click="copyRegLink"
                              >
                                Online Payment Link
                              </h4></a
                            >
                            <p class="mb-4">
                              <span
                                class="
                                  d-flex
                                  align-items-center
                                  justify-content-between
                                "
                                ><input
                                  type="text"
                                  ref="selectedLink"
                                  v-model="pledgePaymentLink"
                                  class="form-control"
                                  placeholder="Link"
                                  style="width: 80%"
                                />
                                <div>
                                  <i
                                    v-tooltip.top="'Copy link'"
                                    class="pi pi-copy ml-2 c-pointer"
                                    @click="copyLink"
                                    style="font-size: 22px"
                                  ></i>
                                  <i
                                    v-tooltip.top="'Send SMS'"
                                    class="pi pi-envelope ml-4 c-pointer"
                                    @click="copyLink"
                                    style="font-size: 22px"
                                  ></i>
                                </div>
                              </span>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    
                    <div class="row">
                      <div class="col-12 mb-5 mx-3 border shadow rounded">
                        <div class="row">
                          <div
                            class="
                              col-md-2 col-sm-2
                              d-flex
                              align-self-center
                              image
                              mt-4
                            "
                          >
                            <img
                              src="../../assets/link.svg"
                              class="w-100"
                              alt="marked Attendance image"
                              style="width: 60px; height: 60px"
                            />
                          </div>
                          <div class="col-md-10 col-sm-10 mt-3">
                            <a class="text-decoration-none"
                              ><h4
                                class="header4 link-color c-pointer"
                                @click="copyRegLink"
                              >
                                Virtual Account
                              </h4></a
                            >
                            <div class="mb-4">
                              <div class="p-2 border">
                                <div class="font-weight-800 text-dark">GTB</div>
                              <div class="font-weight-800 text-dark">0222909641</div>
                              <div class="font-weight-800 text-dark">Sarah Church Account</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div
                    class="
                      col-md-12
                      mt-2 mt-md-0
                      mb-3
                      d-flex
                      justify-content-end
                      
                    "
                  >
                    <button
                      class="default-btn secondary-bg"
                      data-dismiss="modal"
                      @click="makePayment"
                    >
                      Make Payment
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div class="container-fluid">
              <div class="row d-flex justify-content-between align-items-center mt-5">
                <div>
                  <div class="evt-name text-dark">Payments</div>
                </div>
                <div>
                  <div
                    class="
                      cursor-pointer
                      grey-border
                      primary-btn
                      default-btn
                      primary-bg
                      border-0
                      text-white
                    "
                  >
                    Record Payment
                  </div>
                </div>
                <div class="col-md-12 px-0">
                  <hr class="my-3" />
                </div>
              </div>
        
              <div class="container-fluid d-none mt-4 d-md-block">
                <div class="row t-header mt-4 border-bottom pb-2">
                  <div
                    class="small-text text-capitalize col-md-1 font-weight-bold"
                  >
                    Status
                  </div>
                  <div
                    class="small-text text-capitalize col-md-2 font-weight-bold"
                  >
                    Due
                  </div>
                  <div
                    class="small-text text-capitalize col-md-2 font-weight-bold"
                  >
                    Date
                  </div>
                  <div
                    class="small-text text-capitalize col-md-2 font-weight-bold"
                  >
                    Payment day
                  </div>
                  <div
                    class="small-text text-capitalize col-md-2 font-weight-bold"
                  >
                    amount paid
                  </div>
                  <div
                    class="
                      small-text
                      text-capitalize
                      Text-center
                      col-md-2
                      font-weight-bold
                    "
                  >
                    Channel
                  </div>

                  <div
                    class="
                      small-text
                      text-capitalize
                      col-md-1
                      font-weight-bold
                    "
                  >
                    Action
                  </div>
                </div>
              </div>
              <div class="row" style="margin: 0">
                <div class="col-12 pb-2 px-0">
                  <div
                    class="
                      row
                      w-100
                      c-pointer
                      text-dark
                      border-top
                      py-2
                      hover
                      d-flex
                      align-items-center
                    "
                    style="margin: 0"
                  >
                    <div class="col-md-1 p-2">
                      <p
                        class="
                          mb-0
                          d-flex
                          text-danger
                          font-weight-bold
                          justify-content-between
                        "
                      >
                        <span
                          class="
                            text-dark
                            font-weight-bold
                            d-flex d-md-none
                            fontIncrease
                          "
                          style="font-size: 15px"
                          >Status</span
                        >
                        <span
                          class="
                            rounded
                            small
                            font-weight-bold
                            statusbg
                            py-1
                            px-2
                          "
                          >Overdue</span
                        >
                      </p>
                    </div>

                    <div class="col-md-2 py-2">
                      <p
                        class="mb-0 d-flex text-danger justify-content-between"
                      >
                        <span
                          class="
                            text-dark
                            font-weight-bold
                            d-flex d-md-none
                            fontIncrease
                          "
                          style="font-size: 15px"
                          >Due</span
                        >
                        1098 days ago
                      </p>
                    </div>
                    <div class="col-md-2 py-2">
                      <p class="mb-0 d-flex justify-content-between">
                        <span
                          class="
                            text-dark
                            font-weight-bold
                            d-flex d-md-none
                            fontIncrease
                          "
                          style="font-size: 15px"
                          >Date
                        </span>
                        2020-07-16
                      </p>
                    </div>
                    <div class="col-md-2 py-2">
                      <div class="d-flex small justify-content-between">
                        <span
                          class="
                            text-dark
                            font-weight-bold
                            d-flex d-md-none
                            fontIncrease
                          "
                          style="font-size: 15px"
                          >Payment day</span
                        >
                        <div class="small-text">
                          25
                        </div>
                      </div>
                    </div>
                    <div class="col-md-2 py-2">
                      <div class="d-flex small justify-content-between">
                        <span
                          class="
                            text-dark
                            font-weight-bold
                            d-flex d-md-none
                            fontIncrease
                          "
                          style="font-size: 15px"
                          >Amount paid</span
                        >
                        <div class="small-text">
                          Anderson Udokoro
                        </div>
                      </div>
                    </div>
                    <div class="col-md-2 py-2">
                      <div class="d-flex small justify-content-between">
                        <span
                          class="
                            text-dark
                            font-weight-bold
                            d-flex d-md-none
                            fontIncrease
                          "
                          style="font-size: 15px"
                          >Channel</span
                        >
                        <div class="small-text">
                          NGN 111,000.00
                        </div>
                      </div>
                    </div>

                    <div class="col-md-1 py-2">
                      <div class="">
                        <div class="dropdown">
                          <span class="d-flex justify-content-between">
                            <span class="d-md-none d-sm-flex"></span>
                            <span class="d-sm-flex small">
                              <i
                                class="
                                  fas
                                  fa-ellipsis-v
                                  cursor-pointer
                                  ml-2
                                  fontIncrease
                                "
                                id="dropdownMenuButton"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                              ></i>

                              <div
                                class="dropdown-menu"
                                aria-labelledby="dropdownMenuButton"
                              >
            
                                <a class="dropdown-item"
                                  ><router-link
                                    :to="`/tenant/pledge/makepledge?id=`"
                                    class="text-color"
                                    >Edit</router-link
                                  ></a
                                >
                                <a class="dropdown-item">Delete</a>
                              </div>
                            </span>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="row" style="margin: 0">
                <div class="col-12 pb-2 px-0">
                  <div
                    class="
                      row
                      w-100
                      c-pointer
                      text-dark
                      border-top
                      py-2
                      hover
                      d-flex
                      align-items-center
                    "
                    style="margin: 0"
                  >
                    <div class="col-md-1 p-2">
                      <p
                        class="
                          mb-0
                          d-flex
                          text-danger
                          font-weight-bold
                          justify-content-between
                        "
                      >
                        <span
                          class="
                            text-dark
                            font-weight-bold
                            d-flex d-md-none
                            fontIncrease
                          "
                          style="font-size: 15px"
                          >Status</span
                        >
                        <span
                          class="
                            rounded
                            small
                            font-weight-bold
                            statusbg
                            py-1
                            px-2
                          "
                          >Overdue</span
                        >
                      </p>
                    </div>

                    <div class="col-md-2 py-2">
                      <p
                        class="mb-0 d-flex text-danger justify-content-between"
                      >
                        <span
                          class="
                            text-dark
                            font-weight-bold
                            d-flex d-md-none
                            fontIncrease
                          "
                          style="font-size: 15px"
                          >Due</span
                        >
                        1098 days ago
                      </p>
                    </div>
                    <div class="col-md-2 py-2">
                      <p class="mb-0 d-flex justify-content-between">
                        <span
                          class="
                            text-dark
                            font-weight-bold
                            d-flex d-md-none
                            fontIncrease
                          "
                          style="font-size: 15px"
                          >Date
                        </span>
                        2020-07-16
                      </p>
                    </div>
                    <div class="col-md-2 py-2">
                      <div class="d-flex small justify-content-between">
                        <span
                          class="
                            text-dark
                            font-weight-bold
                            d-flex d-md-none
                            fontIncrease
                          "
                          style="font-size: 15px"
                          >Payment day</span
                        >
                        <div class="small-text">
                          25
                        </div>
                      </div>
                    </div>
                    <div class="col-md-2 py-2">
                      <div class="d-flex small justify-content-between">
                        <span
                          class="
                            text-dark
                            font-weight-bold
                            d-flex d-md-none
                            fontIncrease
                          "
                          style="font-size: 15px"
                          >Amount paid</span
                        >
                        <div class="small-text">
                          Anderson Udokoro
                        </div>
                      </div>
                    </div>
                    <div class="col-md-2 py-2">
                      <div class="d-flex small justify-content-between">
                        <span
                          class="
                            text-dark
                            font-weight-bold
                            d-flex d-md-none
                            fontIncrease
                          "
                          style="font-size: 15px"
                          >Channel</span
                        >
                        <div class="small-text">
                          NGN 111,000.00
                        </div>
                      </div>
                    </div>

                    <div class="col-md-1 py-2">
                      <div class="">
                        <div class="dropdown">
                          <span class="d-flex justify-content-between">
                            <span class="d-md-none d-sm-flex"></span>
                            <span class="d-sm-flex small">
                              <i
                                class="
                                  fas
                                  fa-ellipsis-v
                                  cursor-pointer
                                  ml-2
                                  fontIncrease
                                "
                                id="dropdownMenuButton"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                              ></i>

                              <div
                                class="dropdown-menu"
                                aria-labelledby="dropdownMenuButton"
                              >
            
                                <a class="dropdown-item"
                                  ><router-link
                                    :to="`/tenant/pledge/makepledge?id=`"
                                    class="text-color"
                                    >Edit</router-link
                                  ></a
                                >
                                <a class="dropdown-item">Delete</a>
                              </div>
                            </span>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="row" style="margin: 0">
                <div class="col-12 pb-2 px-0">
                  <div
                    class="
                      row
                      w-100
                      c-pointer
                      text-dark
                      border-top
                      py-2
                      hover
                      d-flex
                      align-items-center
                    "
                    style="margin: 0"
                  >
                    <div class="col-md-1 p-2">
                      <p
                        class="
                          mb-0
                          d-flex
                          text-danger
                          font-weight-bold
                          justify-content-between
                        "
                      >
                        <span
                          class="
                            text-dark
                            font-weight-bold
                            d-flex d-md-none
                            fontIncrease
                          "
                          style="font-size: 15px"
                          >Status</span
                        >
                        <span
                          class="
                            rounded
                            small
                            font-weight-bold
                            statusbg
                            py-1
                            px-2
                          "
                          >Overdue</span
                        >
                      </p>
                    </div>

                    <div class="col-md-2 py-2">
                      <p
                        class="mb-0 d-flex text-danger justify-content-between"
                      >
                        <span
                          class="
                            text-dark
                            font-weight-bold
                            d-flex d-md-none
                            fontIncrease
                          "
                          style="font-size: 15px"
                          >Due</span
                        >
                        1098 days ago
                      </p>
                    </div>
                    <div class="col-md-2 py-2">
                      <p class="mb-0 d-flex justify-content-between">
                        <span
                          class="
                            text-dark
                            font-weight-bold
                            d-flex d-md-none
                            fontIncrease
                          "
                          style="font-size: 15px"
                          >Date
                        </span>
                        2020-07-16
                      </p>
                    </div>
                    <div class="col-md-2 py-2">
                      <div class="d-flex small justify-content-between">
                        <span
                          class="
                            text-dark
                            font-weight-bold
                            d-flex d-md-none
                            fontIncrease
                          "
                          style="font-size: 15px"
                          >Payment day</span
                        >
                        <div class="small-text">
                          25
                        </div>
                      </div>
                    </div>
                    <div class="col-md-2 py-2">
                      <div class="d-flex small justify-content-between">
                        <span
                          class="
                            text-dark
                            font-weight-bold
                            d-flex d-md-none
                            fontIncrease
                          "
                          style="font-size: 15px"
                          >Amount paid</span
                        >
                        <div class="small-text">
                          Anderson Udokoro
                        </div>
                      </div>
                    </div>
                    <div class="col-md-2 py-2">
                      <div class="d-flex small justify-content-between">
                        <span
                          class="
                            text-dark
                            font-weight-bold
                            d-flex d-md-none
                            fontIncrease
                          "
                          style="font-size: 15px"
                          >Channel</span
                        >
                        <div class="small-text">
                          NGN 111,000.00
                        </div>
                      </div>
                    </div>

                    <div class="col-md-1 py-2">
                      <div class="">
                        <div class="dropdown">
                          <span class="d-flex justify-content-between">
                            <span class="d-md-none d-sm-flex"></span>
                            <span class="d-sm-flex small">
                              <i
                                class="
                                  fas
                                  fa-ellipsis-v
                                  cursor-pointer
                                  ml-2
                                  fontIncrease
                                "
                                id="dropdownMenuButton"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                              ></i>

                              <div
                                class="dropdown-menu"
                                aria-labelledby="dropdownMenuButton"
                              >
            
                                <a class="dropdown-item"
                                  ><router-link
                                    :to="`/tenant/pledge/makepledge?id=`"
                                    class="text-color"
                                    >Edit</router-link
                                  ></a
                                >
                                <a class="dropdown-item">Delete</a>
                              </div>
                            </span>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="row" style="margin: 0">
                <div class="col-12 pb-2 px-0">
                  <div
                    class="
                      row
                      w-100
                      c-pointer
                      text-dark
                      border-top
                      py-2
                      hover
                      d-flex
                      align-items-center
                    "
                    style="margin: 0"
                  >
                    <div class="col-md-1 p-2">
                      <p
                        class="
                          mb-0
                          d-flex
                          text-danger
                          font-weight-bold
                          justify-content-between
                        "
                      >
                        <span
                          class="
                            text-dark
                            font-weight-bold
                            d-flex d-md-none
                            fontIncrease
                          "
                          style="font-size: 15px"
                          >Status</span
                        >
                        <span
                          class="
                            rounded
                            small
                            font-weight-bold
                            statusbg
                            py-1
                            px-2
                          "
                          >Overdue</span
                        >
                      </p>
                    </div>

                    <div class="col-md-2 py-2">
                      <p
                        class="mb-0 d-flex text-danger justify-content-between"
                      >
                        <span
                          class="
                            text-dark
                            font-weight-bold
                            d-flex d-md-none
                            fontIncrease
                          "
                          style="font-size: 15px"
                          >Due</span
                        >
                        1098 days ago
                      </p>
                    </div>
                    <div class="col-md-2 py-2">
                      <p class="mb-0 d-flex justify-content-between">
                        <span
                          class="
                            text-dark
                            font-weight-bold
                            d-flex d-md-none
                            fontIncrease
                          "
                          style="font-size: 15px"
                          >Date
                        </span>
                        2020-07-16
                      </p>
                    </div>
                    <div class="col-md-2 py-2">
                      <div class="d-flex small justify-content-between">
                        <span
                          class="
                            text-dark
                            font-weight-bold
                            d-flex d-md-none
                            fontIncrease
                          "
                          style="font-size: 15px"
                          >Payment day</span
                        >
                        <div class="small-text">
                          25
                        </div>
                      </div>
                    </div>
                    <div class="col-md-2 py-2">
                      <div class="d-flex small justify-content-between">
                        <span
                          class="
                            text-dark
                            font-weight-bold
                            d-flex d-md-none
                            fontIncrease
                          "
                          style="font-size: 15px"
                          >Amount paid</span
                        >
                        <div class="small-text">
                          Anderson Udokoro
                        </div>
                      </div>
                    </div>
                    <div class="col-md-2 py-2">
                      <div class="d-flex small justify-content-between">
                        <span
                          class="
                            text-dark
                            font-weight-bold
                            d-flex d-md-none
                            fontIncrease
                          "
                          style="font-size: 15px"
                          >Channel</span
                        >
                        <div class="small-text">
                          NGN 111,000.00
                        </div>
                      </div>
                    </div>

                    <div class="col-md-1 py-2">
                      <div class="">
                        <div class="dropdown">
                          <span class="d-flex justify-content-between">
                            <span class="d-md-none d-sm-flex"></span>
                            <span class="d-sm-flex small">
                              <i
                                class="
                                  fas
                                  fa-ellipsis-v
                                  cursor-pointer
                                  ml-2
                                  fontIncrease
                                "
                                id="dropdownMenuButton"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                              ></i>

                              <div
                                class="dropdown-menu"
                                aria-labelledby="dropdownMenuButton"
                              >
            
                                <a class="dropdown-item"
                                  ><router-link
                                    :to="`/tenant/pledge/makepledge?id=`"
                                    class="text-color"
                                    >Edit</router-link
                                  ></a
                                >
                                <a class="dropdown-item">Delete</a>
                              </div>
                            </span>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="row" style="margin: 0">
                <div class="col-12 pb-2 px-0">
                  <div
                    class="
                      row
                      w-100
                      c-pointer
                      text-dark
                      border-top
                      py-2
                      hover
                      d-flex
                      align-items-center
                    "
                    style="margin: 0"
                  >
                    <div class="col-md-1 p-2">
                      <p
                        class="
                          mb-0
                          d-flex
                          text-danger
                          font-weight-bold
                          justify-content-between
                        "
                      >
                        <span
                          class="
                            text-dark
                            font-weight-bold
                            d-flex d-md-none
                            fontIncrease
                          "
                          style="font-size: 15px"
                          >Status</span
                        >
                        <span
                          class="
                            rounded
                            small
                            font-weight-bold
                            statusbg
                            py-1
                            px-2
                          "
                          >Overdue</span
                        >
                      </p>
                    </div>

                    <div class="col-md-2 py-2">
                      <p
                        class="mb-0 d-flex text-danger justify-content-between"
                      >
                        <span
                          class="
                            text-dark
                            font-weight-bold
                            d-flex d-md-none
                            fontIncrease
                          "
                          style="font-size: 15px"
                          >Due</span
                        >
                        1098 days ago
                      </p>
                    </div>
                    <div class="col-md-2 py-2">
                      <p class="mb-0 d-flex justify-content-between">
                        <span
                          class="
                            text-dark
                            font-weight-bold
                            d-flex d-md-none
                            fontIncrease
                          "
                          style="font-size: 15px"
                          >Date
                        </span>
                        2020-07-16
                      </p>
                    </div>
                    <div class="col-md-2 py-2">
                      <div class="d-flex small justify-content-between">
                        <span
                          class="
                            text-dark
                            font-weight-bold
                            d-flex d-md-none
                            fontIncrease
                          "
                          style="font-size: 15px"
                          >Payment day</span
                        >
                        <div class="small-text">
                          25
                        </div>
                      </div>
                    </div>
                    <div class="col-md-2 py-2">
                      <div class="d-flex small justify-content-between">
                        <span
                          class="
                            text-dark
                            font-weight-bold
                            d-flex d-md-none
                            fontIncrease
                          "
                          style="font-size: 15px"
                          >Amount paid</span
                        >
                        <div class="small-text">
                          Anderson Udokoro
                        </div>
                      </div>
                    </div>
                    <div class="col-md-2 py-2">
                      <div class="d-flex small justify-content-between">
                        <span
                          class="
                            text-dark
                            font-weight-bold
                            d-flex d-md-none
                            fontIncrease
                          "
                          style="font-size: 15px"
                          >Channel</span
                        >
                        <div class="small-text">
                          NGN 111,000.00
                        </div>
                      </div>
                    </div>

                    <div class="col-md-1 py-2">
                      <div class="">
                        <div class="dropdown">
                          <span class="d-flex justify-content-between">
                            <span class="d-md-none d-sm-flex"></span>
                            <span class="d-sm-flex small">
                              <i
                                class="
                                  fas
                                  fa-ellipsis-v
                                  cursor-pointer
                                  ml-2
                                  fontIncrease
                                "
                                id="dropdownMenuButton"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                              ></i>

                              <div
                                class="dropdown-menu"
                                aria-labelledby="dropdownMenuButton"
                              >
            
                                <a class="dropdown-item"
                                  ><router-link
                                    :to="`/tenant/pledge/makepledge?id=`"
                                    class="text-color"
                                    >Edit</router-link
                                  ></a
                                >
                                <a class="dropdown-item">Delete</a>
                              </div>
                            </span>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="row" style="margin: 0">
                <div class="col-12 pb-2 px-0">
                  <div
                    class="
                      row
                      w-100
                      c-pointer
                      text-dark
                      border-top
                      py-2
                      hover
                      d-flex
                      align-items-center
                    "
                    style="margin: 0"
                  >
                    <div class="col-md-1 p-2">
                      <p
                        class="
                          mb-0
                          d-flex
                          text-danger
                          font-weight-bold
                          justify-content-between
                        "
                      >
                        <span
                          class="
                            text-dark
                            font-weight-bold
                            d-flex d-md-none
                            fontIncrease
                          "
                          style="font-size: 15px"
                          >Status</span
                        >
                        <span
                          class="
                            rounded
                            small
                            font-weight-bold
                            statusbg
                            py-1
                            px-2
                          "
                          >Overdue</span
                        >
                      </p>
                    </div>

                    <div class="col-md-2 py-2">
                      <p
                        class="mb-0 d-flex text-danger justify-content-between"
                      >
                        <span
                          class="
                            text-dark
                            font-weight-bold
                            d-flex d-md-none
                            fontIncrease
                          "
                          style="font-size: 15px"
                          >Due</span
                        >
                        1098 days ago
                      </p>
                    </div>
                    <div class="col-md-2 py-2">
                      <p class="mb-0 d-flex justify-content-between">
                        <span
                          class="
                            text-dark
                            font-weight-bold
                            d-flex d-md-none
                            fontIncrease
                          "
                          style="font-size: 15px"
                          >Date
                        </span>
                        2020-07-16
                      </p>
                    </div>
                    <div class="col-md-2 py-2">
                      <div class="d-flex small justify-content-between">
                        <span
                          class="
                            text-dark
                            font-weight-bold
                            d-flex d-md-none
                            fontIncrease
                          "
                          style="font-size: 15px"
                          >Payment day</span
                        >
                        <div class="small-text">
                          25
                        </div>
                      </div>
                    </div>
                    <div class="col-md-2 py-2">
                      <div class="d-flex small justify-content-between">
                        <span
                          class="
                            text-dark
                            font-weight-bold
                            d-flex d-md-none
                            fontIncrease
                          "
                          style="font-size: 15px"
                          >Amount paid</span
                        >
                        <div class="small-text">
                          Anderson Udokoro
                        </div>
                      </div>
                    </div>
                    <div class="col-md-2 py-2">
                      <div class="d-flex small justify-content-between">
                        <span
                          class="
                            text-dark
                            font-weight-bold
                            d-flex d-md-none
                            fontIncrease
                          "
                          style="font-size: 15px"
                          >Channel</span
                        >
                        <div class="small-text">
                          NGN 111,000.00
                        </div>
                      </div>
                    </div>

                    <div class="col-md-1 py-2">
                      <div class="">
                        <div class="dropdown">
                          <span class="d-flex justify-content-between">
                            <span class="d-md-none d-sm-flex"></span>
                            <span class="d-sm-flex small">
                              <i
                                class="
                                  fas
                                  fa-ellipsis-v
                                  cursor-pointer
                                  ml-2
                                  fontIncrease
                                "
                                id="dropdownMenuButton"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                              ></i>

                              <div
                                class="dropdown-menu"
                                aria-labelledby="dropdownMenuButton"
                              >
            
                                <a class="dropdown-item"
                                  ><router-link
                                    :to="`/tenant/pledge/makepledge?id=`"
                                    class="text-color"
                                    >Edit</router-link
                                  ></a
                                >
                                <a class="dropdown-item">Delete</a>
                              </div>
                            </span>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- <PledgeTransaction /> -->
          </div>
        </div>
      </div>
    </div>
  </div>
  <ConfirmDialog />
  <Toast />
</template>

<script>
import axios from "@/gateway/backendapi";
import ReportModal from "@/components/firsttimer/ReportModal.vue";
import { ref, computed } from "vue";
import Dropdown from "primevue/dropdown";
import InputText from "primevue/inputtext";
import { useToast } from "primevue/usetoast";
import MembersSearch from "../../components/membership/MembersSearch.vue";
import Loading from "../../components/loading/LoadingComponent";
import router from "../../router";
import { useRoute } from "vue-router";
import finish from "../../services/progressbar/progress";
import CascadeSelect from "primevue/cascadeselect";
import ToggleButton from "../donation/toggleButton.vue";
import PledgeTransaction from "./PledgeTransaction.vue";
import Tooltip from "primevue/tooltip";
export default {
  components: {
    MembersSearch,
    ReportModal,
    Loading,
    Dropdown,
    InputText,
    CascadeSelect,
    ToggleButton,
    PledgeTransaction,
  },
  directives: {
    tooltip: Tooltip,
  },
  setup() {
    const toast = useToast();
    const selectedLink = ref(null);
    const emaildata = ref(null);
    const tenantID = ref("");
    const route = useRoute();
    const churchName = ref("");
    const Address = ref("");
    const loading = ref(false);
    const freewillAmount = ref("");
    const checking = ref(false);
    // const value = ref()
    const isNameValid = ref(true);
    const isEmailValid = ref(true);
    const selectedPledge = ref("");
    const memberName = ref("");
    const allPledgeList = ref([]);
    const amountFrom = ref("");
    const selectedContact = ref({});
    const isActive = ref(null);
    const url = ref("");
    const amountTo = ref("");
    const pledgeCategory = ref([
      { name: "Free will" },
      { name: "Specific" },
      { name: "Range" },
    ]);

    const personName = ref(route.query.name);
    const pledgeName = ref(route.query.pledgeType);
    const pledgeID = ref(route.query.pledgeTypeID);
    const pledgeDate = ref(route.query.date);
    const pledgeAmount = ref(Number(route.query.amount).toLocaleString());

    const shareableLinkField = ref(null);
    const locationTwo = ref(window.location);
    const willCopyLink = ref(false);

    const copyLink2 = () => {
      try {
        willCopyLink.value = true;
        const a = shareableLinkField.value;
        a.select();
        a.setSelectionRange(0, 200); /* For mobile devices */

        /* Copy the text inside the text field */
        document.execCommand("copy");
        toast.add({
          severity: "info",
          summary: "Link Copied",
          detail: "Shareable link copied to your clipboard",
          life: 3000,
        });
      } catch (error) {
        console.log(error);
      }
    };
    url.value = `my.churchplus.co/tenant/pledge/pledgemaking/pledgeTypeID=${route.query.pledgeTypeID}&pledgeType=${pledgeName.value}&id=${route.query.id}&name=${route.query.name}`;

    // const savePledge = async () => {

    // }

    const makePayment = () => {
      router.push(
        `/tenant/pledge/pledgepayment?pledgeTypeID=${route.query.pledgeTypeID}&id=${route.query.id}&name=${route.query.name}`
      );
    };
    const chooseContact = (payload) => {
      // contactRef.value.hide();
      selectedContact.value = payload;
    };

    const pledgePaymentLink = computed(() => {
      if (!route.query.id) return "";
      return `${window.location.origin}/tenant/pledge/pledgepayment?pledgeTypeID=${route.query.pledgeTypeID}&id=${route.query.id}&name=${route.query.name}`;
    });

    const copyLink = () => {
      console.log(selectedLink.value.value, "jkjjhkj");
      selectedLink.value.setSelectionRange(
        0,
        selectedLink.value.value.length
      ); /* For mobile devices */
      selectedLink.value.select();

      /* Copy the text inside the text field */
      document.execCommand("copy");
      toast.add({
        severity: "info",
        summary: "Link Copied",
        detail: "copied to your clipboard",
        life: 3000,
      });
    };
    const sendReport = (messageObj) => {
      const emailData = ref(emaildata.value.innerHTML);
      const message = `
                <!DOCTYPE HTML PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
                <html xmlns="http://www.w3.org/1999/xhtml" style="box-sizing: border-box; font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; font-size: 14px; margin: 0; padding: 0;">
                  <head>
                    <meta name="viewport" content="width=device-width"/>
                    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
                    <title>#title#</title>
                    <style>
                      .topmost {
                        display: flex;
                      }

                      .topmost-box1 {
                        width: 70%;
                        height:133px;
                        display:flex;
                        align-items:center;
                        padding:10px
                      }

                      .topmost-box2{
                        width: 30%;display:flex; flex-direction:column; height:133px; align-items:center; justify-content:center
                      }
                    </style>
                  </head>
                  <body style="-webkit-font-smoothing: antialiased; -webkit-text-size-adjust: none; background: #f6f6f6; box-sizing: border-box; font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; font-size: 14px; height: 100%; line-height: 1.6; margin: 0; padding: 0; width: 100% !important;">
                  
                  ${`${messageObj.data.message}`} <br>

                  ${emailData.value}
                  </body>
                  `;
      const body = {
        // message: topmost.value.innerHTMl.toString(),

        ispersonalized: false,
        contacts: messageObj.data.contacts,
        subject: messageObj.data.subject,
        // user: "+2349086767765",
      };
      if (messageObj.medium === "sms") {
        body.gateWayToUse = "hostedsms";
        body.category = "";
        body.emailAddress = "";
        body.emailDisplayName = "";
        body.isoCode = messageObj.data.isoCode;
        body.toOthers = messageObj.data.toOthers;
      }

      body.message =
        messageObj.medium === "sms" ? messageObj.data.message : message;

      const url =
        messageObj.medium === "sms"
          ? "/api/Messaging/sendSms"
          : "/api/Messaging/sendEmail";

      composerObj
        .sendMessage(url, body)
        .then((res) => {
          btnState.value = "";
          console.log(res, "report response");
          if (res.status === false) {
            toast.add({
              severity: "error",
              summary: "Sending Failed",
              detail: res.message,
              life: 3000,
            });
          } else {
            toast.add({
              severity: "success",
              summary: "Send Success",
              detail: "Your report has been sent",
              life: 3000,
            });
            markAsSent();
          }
        })
        .catch((err) => {
          btnState.value = "";
          console.log(err);
          stopProgressBar();
          toast.add({
            severity: "error",
            summary: "Sending Failed",
            detail: "Report was not sent, please try again",
            life: 3000,
          });
        });
      btnState.value = "modal";
    };

    // const getCurrentlySignedInUser = async () => {
    //   try {
    //     const res = await axios.get("/api/Membership/GetCurrentSignedInUser");
    //     tenantID.value = res.data.tenantId;
    //   } catch (err) {
    //     console.log(err);
    //   }
    // };

    // getCurrentlySignedInUser();

    const active = (payload) => {
      isActive.value = payload;
    };
    const getAllPledgeDefinition = async () => {
      // errorGettingReport.value = false;
      try {
        checking.value = false;
        const res = await axios.get("/api/Pledge/GetAllPledgeDefinitions");
        finish();
        allPledgeList.value = res.data.returnObject;

        getDetails();

        isActive.value = res.data.returnObject.map((i) => {
          return {
            isActive: i.isActive,
          };
        });
        console.log(allPledgeList.value, "getPledgeList");
        checking.value = true;
      } catch (error) {
        console.log(error);
      }
    };
    getAllPledgeDefinition();

    const getDetails = () => {
      selectedPledge.value = allPledgeList.value.find(
        (i) => i.id === route.query.id
      );
      memberName.value = route.query.name;
    };

    const makePledge = async () => {
      const makePledgeDetails = {
        personID: selectedContact.value.id,
        pledgeTypeID: selectedPledge.value.id,
        amountBase: selectedPledge.value.donorPaymentRangeFromAmount,
        amountTop: selectedPledge.value.donorPaymentRangeToAmount,
        amountBase: selectedPledge.donorPaymentSpecificAmount,
        amountBase: freewillAmount.value,
      };

      try {
        const res = await axios.post(
          "api/Pledge/SavePledge",
          makePledgeDetails
        );
        finish();
        console.log(res, "getSinglePledge");
        router.push(
          `/pledge/pledgepayment?ID=${route.query.id}&name=${route.query.name}`
        );
      } catch (error) {
        console.log(error);
      }
    };

    // const getSinglePledgeDefinition = async () =>{
    //         try{
    //             const res = await axios.get(`/api/Pledge/GetSinglePledgeDefinitions?ID${allPledgeList.value.id}`)
    //             finish()
    //             console.log(res,'getSinglePledge');
    //         }
    //         catch (error){
    //             console.log(error)
    //         }
    //     }
    //     getSinglePledgeDefinition()

    const checkNameValue = () => {
      if (churchName.value.length == 0) {
        isNameValid.value = false;
      } else {
        isNameValid.value = true;
      }
    };

    const checkEmailValue = () => {
      if (pastorEmail.value.length == 0) {
        isEmailValid.value = false;
      } else {
        isEmailValid.value = true;
      }
    };

    return {
      url,
      allPledgeList,
      locationTwo,
      shareableLinkField,
      copyLink2,
      willCopyLink,
      emaildata,
      sendReport,
      pledgeID,
      personName,
      pledgeName,
      memberName,
      tenantID,
      checking,
      makePledge,
      chooseContact,
      selectedPledge,
      pledgeDate,
      makePayment,
      pledgeCategory,
      amountTo,
      amountFrom,
      freewillAmount,
      pledgePaymentLink,
      // savePledge,
      checkEmailValue,
      churchName,
      selectedContact,
      Address,
      // value,
      loading,
      checkNameValue,
      isNameValid,
      isEmailValid,
      selectedLink,
      isActive,
      active,
      copyLink,
      pledgeAmount,
    };
  },
};
</script>

<style scoped>
.heading-text {
  font: normal normal 800 1.5rem Nunito sans;
}

.email-data {
  height: 0 !important;
  overflow: hidden !important;
}

.info-div {
  background: #f9f8db;
  border: 1px solid #dde2e6;
  border-radius: 5px 5px 0px 0px;
  text-align: center;
}
.file-icon {
  color: #136acd;
  border: 1px solid #136acd;
  padding: 10px;
  border-radius: 50%;
  height: 40px;
  width: 40px;
  text-align: center;
  font-size: 20px;
  display: flex;
  align-items: center;
}
* {
  color: #1c252c;
  box-sizing: border-box;
}

a {
  text-decoration: none;
  font-weight: 700;
}

.def-btn {
  height: 40px;
  border-radius: 22px;
  /* padding: 0 24px; */
  padding: 8px 10px;
  width: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #dde2e6;
}

.def-btn:hover {
  cursor: pointer;
}

.resend-btn {
  background: transparent !important;
  color: #4d6676 !important;
  border: 1px solid #dde2e6 !important;
}

.approve-btn {
  background: #136acd;
  color: white;
}

.edit-btn {
  border: 1px solid #dde2e6;
}

.unapproved {
  background: #ffffff 0% 0% no-repeat padding-box;
  box-shadow: 0px 3px 15px #00000029;
  border: 1px solid #dde2e6;
  border-radius: 5px;
}

/* .analytics-container {
  
  width: 90%;
  margin: auto;
}

.first-con {
  margin-top: 50px;
} */

.theader {
  font-size: 14px;
  font-weight: 800;
  color: #0f0220;
}
.evt-name {
  color: #136acd;
  font-weight: 800;
  font-size: 22px;
}

.evt-report {
  font-size: 25px;
}
.grey-text {
  color: #8296ae;
}

.date {
  font-size: 20px;
  font-weight: 600;
  color: #1d262d;
}

.draft {
  border: 0.5px solid #252a2f;
  padding: 10px;
  border-radius: 22px 0 0 22px;
  background: grey;
}

.genarationg-report {
  min-height: calc(100vh - 200px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-weight: bold;
  font-size: 20px;
}

.analytics,
.attendance-header {
  background: #1c252c;
  color: #fff;
  width: 155px;
  height: 37px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 24px;
}

.hr-dark {
  border: 1px solid #000;
}

.header4 {
  font: var(--unnamed-font-style-normal) normal var(--unnamed-font-weight-bold)
    18px/24px var(--unnamed-font-family-nunito-sans);
  letter-spacing: var(--unnamed-character-spacing-0);
  text-align: left;
  font: normal normal bold 18px/24px Nunito Sans;
  letter-spacing: 0px;
  color: #02172e;
  opacity: 0.8;
}

.recieve {
  font-size: 20px;
}
.bold-700 {
  font-weight: 700;
}

.dark-red-section {
  /* background: #980404; */
  background: #ff0000b5;
  color: #fff;
  height: 133px;
  display: flex;
  align-items: center;
  border-radius: 5px 0px 0px 0px;
  height: 133px;
  display: flex;
  align-items: center;
  border-radius: 5px 0px 0px 0px;
}
.bottom-section {
  box-shadow: 0px 3px 10px #00000029;
  border: 1px solid #dde2e6;
  border-radius: 5px;
}

.light-red-section {
  /* background: #ff0000b5; */
  background: #980404;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0px 5px 0px 0px;
}

.dark-red-section h2,
.light-red-section span {
  color: #fff;
  font-weight: 800;
}

@media screen and (max-width: 1000px) {
  .container {
    width: 100% !important;
  }

  .def-btn {
    max-width: 280px;
  }
}
</style>