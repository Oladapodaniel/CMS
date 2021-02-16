!<template>
  <div>
    <div class="container">
      <div class="row mt-4">
        <div class="col-md-12">
          <h1 class="font-weight-bold">SMS</h1>
        </div>
      </div>
      <div class="row">
        <div class="col-md-12">
          <hr class="hr" />
        </div>
      </div>

      <!-- Content Box -->
      <main id="main" class="mt-3">
        <div class="container-fluid">
          <div class="row">
            <!-- Side mennu -->
            <div class="col-md-3" id="side-menu">
              <div class="row">
                <div class="col-md-12 d-flex justify-content-center mt-4 mb-5">
                  <button class="btn compose-btn">Compose new SMS</button>
                </div>
              </div>
              <div class="row">
                <div
                  class="col-md-12"
                >
                  <div class="row menu-item-con active py-2">
                    <div class="col-md-8 m-auto">
                      <a class="btn btn-default font-weight-bold">
                        <i class="fas fa-inbox mr-3 menu-icon"></i>
                        <span class="menu-item"
                          >Inbox
                          <span class="inbox-count ml-md-2">3</span></span
                        >
                      </a>
                    </div>
                  </div>

                  <div class="row menu-item-con py-2">
                    <div class="col-md-8 m-auto">
                      <a class="btn btn-default font-weight-bold">
                        <i class="fa fa-location-arrow mr-3 menu-icon"></i>
                        <span class="menu-item">Sent</span>
                    </a>
                    </div>
                  </div>

                  <div class="row menu-item-con py-2">
                    <div class="col-md-8 m-auto">
                      <a class="btn btn-default font-weight-bold">
                        <i class="fa fa-envelope-open mr-3 menu-icon"></i>
                        <span class="menu-item">Draft</span>
                    </a>
                    </div>
                  </div>

                  <div class="row menu-item-con py-2">
                    <div class="col-md-8 m-auto">
                      <a class="btn btn-default font-weight-bold">
                        <i class="fa fa-list-alt mr-3 menu-icon"></i>
                        <span class="menu-item">Contact List</span>
                    </a>
                    </div>
                  </div>

                </div>
              </div>
            </div>

            <!-- Bigger row -->
            <div class="col-md-9">
              <div class="row d-md-flex align-items-center mt-3 mb-4">
                <div class="col-md-7 col-sm-12">
                  <div class="search-div">
                    <span><i class="fa fa-search mr-1"></i></span>
                    <input type="text" placeholder="Search here..." />
                    <span class="mx-2"> | </span>
                    <span class="mx-2">Sort By</span>
                    <span class="font-weight-bold"> Newest</span>
                  </div>
                </div>
                <div class="col-md-4 ml-2 mt-sm-2 units-container">
                  <div class="row d-sm-flex align-items-center units-div">
                    <div class="col-sm-5">
                      <h4 class="font-weight-bold mb-0">302</h4>
                      <p class="font-weight-bold mb-0">SMS Units</p>
                    </div>
                    <div class="col-sm-7 d-sm-flex justify-content-end">
                      <button class="btn buy-btn">
                        <span class="btn-text">
                            BUY UNITS
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div class="row">
                <div class="col-md-12">
                  <div class="row header-row">
                    <div class="col-md-12 px-0">
                      <div class="row light-grey-bg">
                        <div class="col-md-1 text-md-right text-lg-center px-0">
                          <input type="checkbox" />
                        </div>
                        <div class="col-md-5">
                          <span class="th">MESSAGE</span>
                        </div>
                        <div class="col-md-2">
                          <span class="th">SENT BY</span>
                        </div>
                        <div class="col-md-2">
                          <span class="th">UNITS</span>
                        </div>
                        <div class="col-md-2">
                          <span class="th">DELIVERY REPORT</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-12">
                      <hr class="hr mt-0" />
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-12">
                      <div class="row">
                        <div class="col-md-1">
                          <input type="checkbox" />
                        </div>
                        <div class="col-md-5 d-md-flex flex-column">
                          <span
                            class="d-flex justify-content-between msg-n-time"
                          >
                            <span class="font-weight-bold">message</span>
                            <span class="timestamp">Today | 08:45 PM</span>
                          </span>
                          <span class="brief-message"
                            >Lorem ipsum dolor sit amet...</span
                          >
                        </div>
                        <div
                          class="col-md-2 col-ms-12 d-flex justify-content-between"
                        >
                          <span class="hidden-header font-weight-bold"
                            >SENT BY:
                          </span>
                          <span>message</span>
                        </div>
                        <div
                          class="col-md-2 col-ms-12 d-flex justify-content-between"
                        >
                          <span class="hidden-header font-weight-bold"
                            >UNITS:
                          </span>
                          <span>message</span>
                        </div>
                        <div
                          class="col-md-2 col-ms-12 d-flex justify-content-between"
                        >
                          <span class="hidden-header font-weight-bold"
                            >DELIVER REPORT:
                          </span>
                          <span class="view-btn">View</span>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-md-12">
                          <hr class="hr" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="row">
                    <div class="col-md-12">
                      <div class="row">
                        <div class="col-md-1">
                          <input type="checkbox" />
                        </div>
                        <div class="col-md-5 d-md-flex flex-column">
                          <span
                            class="d-flex justify-content-between msg-n-time"
                          >
                            <span class="font-weight-bold">message</span>
                            <span class="timestamp">Today | 08:45 PM</span>
                          </span>
                          <span class="brief-message"
                            >Lorem ipsum dolor sit amet...</span
                          >
                        </div>
                        <div
                          class="col-md-2 col-ms-12 d-flex justify-content-between"
                        >
                          <span class="hidden-header">message: </span>
                          <span>message</span>
                        </div>
                        <div
                          class="col-md-2 col-ms-12 d-flex justify-content-between"
                        >
                          <span class="hidden-header">message: </span>
                          <span>message</span>
                        </div>
                        <div
                          class="col-md-2 col-ms-12 d-flex justify-content-between"
                        >
                          <span class="hidden-header">message: </span>
                          <span class="view-btn">View</span>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-md-12">
                          <hr class="hr" />
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
export default {};
</script>

<style scoped>
#main {
  border: 1px solid #02172e30;
  border-radius: 30px;
}

#side-menu {
  border-right: 1px solid #02172e30;
}

.search-div {
  width: fit-content;
  padding: 10px;
  background: #f5f8f9;
  border-radius: 200px;
}

.search-div input {
  background: none;
  border: none;
  outline: transparent;
}

.brief-message {
  color: #4762f0;
}

.compose-btn {
  background: #136acd;
  box-shadow: 0px 6px 12px #708eb170;
  border-radius: 22px;
  color: #fff;
  height: 42px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.menu-icon {
  font-size: 20px;
}

.units-div {
  border: 1px solid #dde2e6;
  border-radius: 20px;
  padding: 15px 0;
}

.hidden-header {
  display: none;
}

.th {
  font-size: 12px;
  font-weight: 700;
}

.inbox-count {
  background: rgba(19, 106, 205, 0.3);
  padding: 4px 8px;
  border-radius: 22px;
}

.menu-item-con {
    color: #002044;
    opacity: 0.5;
}

.menu-item-con.active {
    background: rgba(19, 106, 205, 0.05);
    border-left: 2px solid #136ACD;
    opacity: 1;
}

.buy-btn {
    background: rgb(112, 142, 177, .33);
    border-radius: 22px;
}

.btn-text {
    opacity: 1;
    font-size: 11px;
    font-weight: 700;
}

.timestamp {
    font-size: 14px;
    color: #333333;
    opacity: 0.5;
}

.view-btn {
    background: #EBEFF4;
    border-radius: 21px;
    padding: 4px 18px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
}

@media screen and (max-width: 767px) {
  .hidden-header {
    display: inline-block;
    font-size: 12px;
  }

  .header-row {
    display: none;
  }

  #menu-items {
    flex-direction: row !important;
  }

  .search-div {
    width: 100%;
  }

  .units-div {
    width: 100%;
  }

  .units-container {
    margin-left: 0;
    margin: auto;
  }
}

@media screen and (max-width: 1000px) {
  .msg-n-time {
    flex-direction: column;
    margin-bottom: 8px;
  }
}

@media screen and (min-width: 1000px) {
  #menu-items {
    min-width: 100% !important;
  }
}
</style>