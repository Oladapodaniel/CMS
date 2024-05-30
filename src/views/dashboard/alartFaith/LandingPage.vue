<template>
  <div class="container-fluid container-top mb-4">
    <div class="row px-5">
      <div class="col-md-4 d-flex align-items-center">
        <img src="../../../assets/alartfaith-icon/logo.png" alt="" />
      </div>
      <div class="col-md-4 d-flex justify-content-between align-items-center">
        <div>
          <div>Home</div>
          <div class="border-line-header"></div>
        </div>
        <div>
          <div>Product</div>
          <!-- <div class="border-line-header"></div> -->
        </div>
        <div>
          <div>Pricing</div>
          <!-- <div class="border-line-header"></div> -->
        </div>
        <div>
          <div>Support</div>
          <!-- <div class="border-line-header"></div> -->
        </div>
      </div>
      <div class="col-md-4 d-flex justify-content-end align-items-center">
        <router-link to="/alatregister" class="text-decoration-none">
          <el-button round class="border-line-btn"> Login</el-button>
        </router-link>
        <router-link to="/alatregister" class="text-decoration-none">
          <el-button size="large" round class="bg-color-btn text-white ml-2">
            Sign up
          </el-button>
        </router-link>
      </div>
    </div>
    <div class="row bg-image mt-4 px-5">
      <div class="col-md-6 d-flex align-items-center">
        <div class="col-md-10">
          <div class="font-weight-bold text-head h2">
            Technology and Financial Solution for Churches
            <span class="text-head h2">& other faith based Organizations</span>
          </div>
          <div class="mt-4">
            <router-link to="/alatregister" class="text-decoration-none">
              <el-button size="large" round class="bg-color-btn text-white">
                Sign up for FREE
              </el-button>
            </router-link>
          </div>
        </div>
      </div>
      <div class="col-md-6">
        <div class="col-md-9 col-12 px-0">
          <img
            src="../../../assets/alartfaith-icon/business-chart1.png"
            class="w-100"
            alt=""
          />
        </div>
      </div>
    </div>
    <div class="row bg-image2 py-5 mt-3 justify-content-center">
      <div class="col-md-7 col-12">
        <div class="col-md-12 col-12 text-center text-head s-30">
          Join 11,200 using ALAT Faith solution
        </div>
        <div
          class="col-md-12 col-12 mt-2 d-flex flex-wrap justify-content-center"
          style="gap: 20px"
        >
          <span class="logo"
            ><img src="../../../assets/alartfaith-icon/image4.png" alt=""
          /></span>
          <span class="logo"
            ><img src="../../../assets/alartfaith-icon/image7.png" alt=""
          /></span>
          <span class="logo"
            ><img src="../../../assets/alartfaith-icon/image5.png" alt=""
          /></span>
          <span class="logo"
            ><img src="../../../assets/alartfaith-icon/image6.png" alt=""
          /></span>
          <span class="logo"
            ><img src="../../../assets/alartfaith-icon/image8.png" alt=""
          /></span>
          <span class="logo"
            ><img src="../../../assets/alartfaith-icon/image9.png" alt=""
          /></span>
          <span class="logo"
            ><img src="../../../assets/alartfaith-icon/image10.png" alt=""
          /></span>
        </div>
        <!-- <img
            style="width: 5rem"
            src="../../../assets/alartfaith-icon/image4.png"
            alt=""
          />
          <img
            style="width: 5rem"
            src="../../../assets/alartfaith-icon/image7.png"
            alt=""
          />
          <img
            style="width: 5rem"
            src="../../../assets/alartfaith-icon/image5.png"
            alt=""
          />
          <img
            style="width: 5rem"
            src="../../../assets/alartfaith-icon/image6.png"
            alt=""
          />
          <img
            style="width: 5rem"
            src="../../../assets/alartfaith-icon/image8.png"
            alt=""
          />
          <img
            style="width: 5rem"
            src="../../../assets/alartfaith-icon/image9.png"
            alt=""
          />
          <img
            style="width: 4.5rem"
            src="../../../assets/alartfaith-icon/image10.png"
            alt=""
          /> -->
      </div>
    </div>
    <div class="container">
      <div class="row mt-5">
        <div class="col-md-12">
          <div class="font-weight-bold text-head col-md-7 h1">Church Technology</div>
          <div class="text-head mt-3 col-md-5 line-height-30 text-dak">
            Automate your entire church administrative processes from membership data
            management, first-timer follow-up, and church remittance to overall church
            administration
          </div>
        </div>
      </div>
      <div class="row mt-5">
        <div class="col-md-4">
          <div class="col-md-12 py-3 border-radius-20 card-bg border3">
            <img class="mt-3" src="../../../assets/alartfaith-icon/Desktop.png" alt="" />
            <div class="text-head mt-3 s-18 font-weight-bold">Church Software</div>
            <div class="s-14 pb-4">
              Build better relationships with members, improve connections and measure
              performance at any time.
            </div>
            <div class="col-md-12 d-flex justify-content-end mt-3">
              <img src="../../../assets/alartfaith-icon/ArrowCircleRight.png" alt="" />
            </div>
          </div>
        </div>
        <div class="col-md-4 mt-5 mt-md-0">
          <div class="col-md-12 py-3 border-radius-20 card-bg border3">
            <img class="mt-3" src="../../../assets/alartfaith-icon/Database.png" alt="" />
            <div class="text-head mt-3 s-18 font-weight-bold">Database Management</div>
            <div class="s-14">
              Easily organize and access crucial member information, event details, and
              donation records with our intuitive database management system.
            </div>
            <div class="col-md-12 d-flex justify-content-end mt-3">
              <img src="../../../assets/alartfaith-icon/ArrowCircleRight.png" alt="" />
            </div>
          </div>
        </div>
        <div class="col-md-4 mt-5 mt-md-0">
          <div class="col-md-12 py-3 border-radius-20 card-bg border3">
            <img
              class="mt-3"
              src="../../../assets/alartfaith-icon/Calculator.png"
              alt=""
            />
            <div class="text-head mt-3 s-18 font-weight-bold">Church Accounting</div>
            <div class="s-14">
              Say goodbye to manual spreadsheets and complicated accounting software. Alat
              Faith simplifies church finances, offering robust accounting tools.
            </div>
            <div class="col-md-12 d-flex justify-content-end mt-3">
              <img src="../../../assets/alartfaith-icon/ArrowCircleRight.png" alt="" />
            </div>
          </div>
        </div>
        <div class="col-md-4 mt-5">
          <div class="col-md-12 py-3 border-radius-20 card-bg border3">
            <img
              class="mt-3"
              src="../../../assets/alartfaith-icon/ChatCircleText.png"
              alt=""
            />
            <div class="text-head mt-3 s-18 font-weight-bold">Communication</div>
            <div class="s-14">
              Communicate important announcements & reminder with member via SMS, Email,
              WhatsApp & Voice
            </div>
            <div class="col-md-12 d-flex justify-content-end mt-3">
              <img src="../../../assets/alartfaith-icon/ArrowCircleRight.png" alt="" />
            </div>
          </div>
        </div>
        <div class="col-md-4 mt-5">
          <div class="col-md-12 py-3 border-radius-20 card-bg border3">
            <img class="mt-3" src="../../../assets/alartfaith-icon/Vector.png" alt="" />
            <div class="text-head mt-3 s-18 font-weight-bold">Branch Management</div>
            <div class="s-14">
              For larger faith-based organizations with multiple locations, Alat Faith
              provides seamless branch management capabilities.
            </div>
            <div class="col-md-12 d-flex justify-content-end mt-3">
              <img src="../../../assets/alartfaith-icon/ArrowCircleRight.png" alt="" />
            </div>
          </div>
        </div>
        <div class="col-md-4 mt-5">
          <div class="col-md-12 py-3 border-radius-20 card-bg border3">
            <img class="mt-3" src="../../../assets/alartfaith-icon/Desktop.png" alt="" />
            <div class="text-head mt-3 s-18 font-weight-bold">Customized Website</div>
            <div class="s-14">
              Enhance your online presence and engage your congregation with a beautifully
              designed, customized website.
            </div>
            <div class="col-md-12 d-flex justify-content-end mt-3">
              <img src="../../../assets/alartfaith-icon/ArrowCircleRight.png" alt="" />
            </div>
          </div>
        </div>
      </div>
      <div class="row mt-5">
        <div class="col-md-6">
          <div class="col-md-12 py-3 border-radius-20 card-bg border3">
            <img class="mt-3" src="../../../assets/alartfaith-icon/Vector2.png" alt="" />
            <div class="text-head mt-3 s-18 font-weight-bold">Mobile Applications</div>
            <div class="s-14">
              Access key features on-the-go with our mobile app, ensuring convenience and
              flexibility for your ministry.
            </div>
            <div class="col-md-12 d-flex justify-content-end mt-3">
              <img src="../../../assets/alartfaith-icon/ArrowCircleRight.png" alt="" />
            </div>
          </div>
        </div>
        <div class="col-md-6 d-block mt-5 d-md-none">
          <div class="col-md-12 px-0">
            <img
              class="w-100"
              src="../../../assets/alartfaith-icon/Rectangle4348.png"
              alt=""
            />
            <!-- <div class="text-head mt-3 s-18 font-weight-bold">Customized Website</div>
                <div class="s-14">Enhance your online presence and engage your congregation with a beautifully designed, customized website.</div>
                <div class="col-md-12 d-flex justify-content-end mt-3">
                    <img src="../../../assets/alartfaith-icon/ArrowCircleRight.png" alt="">
                </div> -->
          </div>
        </div>
        <div class="col-md-6 bg-position d-none d-md-block">
          <div class="col-md-12 d-flex align-items-center h-100 px-0 move-image">
            <img
              class="w-100"
              src="../../../assets/alartfaith-icon/Rectangle4348.png"
              alt=""
            />
            <!-- <div class="text-head mt-3 s-18 font-weight-bold">Customized Website</div>
                <div class="s-14">Enhance your online presence and engage your congregation with a beautifully designed, customized website.</div>
                <div class="col-md-12 d-flex justify-content-end mt-3">
                    <img src="../../../assets/alartfaith-icon/ArrowCircleRight.png" alt="">
                </div> -->
          </div>
        </div>
        <div class="col-md-12 d-none d-md-block">
          <div class="col-md-12 d-flex justify-content-end mt-5">
            <img src="../../../assets/alartfaith-icon/dotted-icon.png" alt="" />
          </div>
        </div>
      </div>
    </div>
    <div class="row d-flex justify-content-center mt-4 mt-md-0">
      <div class="col-md-11 linear-bg px-md-5 px-4 pb-5">
        <div class="row px-md-5 px-0 mt-5 mt-md-0">
          <div class="col-md-6 d-flex align-items-center">
            <div class="col-md-12">
              <div class="text-white text-head s-42 font-weight-bold">
                Financial Services
              </div>
              <div class="s-13 text-white">
                Automate your entire church administrative processes from membership data
                management, first-timer follow-up, and church remittance to overall church
                administration.
              </div>
            </div>
          </div>
          <div class="col-md-6">
            <img class="w-100" src="../../../assets/alartfaith-icon/image11.png" alt="" />
          </div>
        </div>
        <div class="row mb-3 px-md-5 px-0">
          <div class="col-lg-4 col-md-6">
            <div class="col-md-12 py-3 border-radius-20 section-card-border">
              <div class="d-flex col-md-12 justify-content-between">
                <div class="text-head mt-3 text-white s-24 font-weight-bold">
                  Accounts
                </div>
                <img class="mt-3" src="../../../assets/alartfaith-icon/Bank.png" alt="" />
              </div>
              <div class="s-13 py-5 text-white col-md-12">
                Manage your organization's finances with dedicated accounts tailored to
                your needs. Track expenses, monitor balances, and streamline transactions
                with ease.
              </div>
            </div>
          </div>
          <div class="col-lg-4 col-md-6 mt-5 mt-md-0">
            <div class="col-md-12 py-3 border-radius-20 section-card-border">
              <div class="d-flex col-md-12 justify-content-between">
                <div class="text-head mt-3 text-white s-24 font-weight-bold">
                  Online Donation
                </div>
                <img
                  class="mt-3"
                  src="../../../assets/alartfaith-icon/HandHeart.png"
                  alt=""
                />
              </div>
              <div class="s-13 py-5 text-white col-md-12">
                Empower your congregation to give back conveniently and securely with our
                online donation platform. Accept donations seamlessly through various
                payment methods.
              </div>
            </div>
          </div>
          <div class="col-lg-4 col-md-6 mt-5 mt-lg-0">
            <div class="col-md-12 py-3 border-radius-20 section-card-border">
              <div class="d-flex col-md-12 justify-content-between">
                <div class="text-head mt-3 text-white s-24 font-weight-bold">
                  Customized POS
                </div>
                <img
                  class="mt-3"
                  src="../../../assets/alartfaith-icon/CashRegister.png"
                  alt=""
                />
              </div>
              <div class="s-13 py-5 text-white col-md-12">
                Our Point-of-Sale terminals are designed to serve as alternative means for
                payment for tithes and offerings, or any other church contribution.
              </div>
            </div>
          </div>
          <div class="col-lg-4 col-md-6 mt-5">
            <div class="col-md-12 py-3 border-radius-20 section-card-border">
              <div class="d-flex col-md-12 justify-content-between">
                <div class="text-head mt-3 text-white s-24 font-weight-bold">Loans</div>
                <img
                  class="mt-3"
                  src="../../../assets/alartfaith-icon/TipJar.png"
                  alt=""
                />
              </div>
              <div class="s-13 py-5 text-white col-md-12">
                Unlock growth opportunities for your organization with our flexible loan
                options. Our competitive loan products are designed to meet your financial
                needs.
              </div>
            </div>
          </div>
          <div class="col-lg-4 col-md-6 mt-5">
            <div class="col-md-12 py-3 border-radius-20 section-card-border">
              <div class="d-flex col-md-12 justify-content-between">
                <div class="text-head mt-3 text-white s-24 font-weight-bold">
                  Facility Financing
                </div>
                <img class="mt-3" src="../../../assets/alartfaith-icon/City.png" alt="" />
              </div>
              <div class="s-13 py-5 text-white col-md-12">
                Realize your organization's vision for growth and expansion with our
                facility financing solutions. We offer customizable financing options to
                support your long-term goals.
              </div>
            </div>
          </div>
          <div class="col-lg-4 col-md-6 mt-5">
            <div class="col-md-12 py-3 border-radius-20 section-card-border">
              <div class="d-flex col-md-12 justify-content-between">
                <div class="text-head mt-3 text-white s-24 font-weight-bold">
                  USSD Giving
                </div>
                <img
                  class="mt-3"
                  src="../../../assets/alartfaith-icon/Vector3.png"
                  alt=""
                />
              </div>
              <div class="s-13 py-5 text-white col-md-12">
                Enable easy and convenient giving for your congregation with USSD giving.
                Members can quickly and securely donate using their mobile phones,
                ensuring consistent support for your ministry.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row bg-color-2 py-5 mt-5 align-items-center">
      <div class="col-md-6 d-flex align-items-center">
        <div class="col-md-11 col-11">
          <img class="w-100" src="../../../assets/alartfaith-icon/image12.png" alt="" />
        </div>
      </div>
      <div class="col-md-6">
        <div class="col-md-12">
          <div class="row">
            <div class="col-md-12 text-head font-weight-bold s-30 line-height-50">
              Omni-channel messaging platform:
            </div>
            <div class="col-md-12 s-24">
              Church SMS, Email, WhatsApp and Voice Solution
            </div>
            <div class="col-md-12 mt-3">
              <span
                ><img src="../../../assets/alartfaith-icon/check-icon.png" alt=""
              /></span>
              <span class="ml-2">99.9% Delivery </span>
            </div>
            <div class="col-md-12 mt-2">
              <span
                ><img src="../../../assets/alartfaith-icon/check-icon.png" alt=""
              /></span>
              <span class="ml-2">Instant Sender ID</span>
            </div>
            <div class="col-md-12 mt-2">
              <span
                ><img src="../../../assets/alartfaith-icon/check-icon.png" alt=""
              /></span>
              <span class="ml-2">Automated Messages </span>
            </div>
            <div class="col-md-12 mt-2">
              <span
                ><img src="../../../assets/alartfaith-icon/check-icon.png" alt=""
              /></span>
              <span class="ml-2">Instant Communication </span>
            </div>
            <div class="col-md-12 mt-2">
              <span
                ><img src="../../../assets/alartfaith-icon/check-icon.png" alt=""
              /></span>
              <span class="ml-2"> SMS Scheduling </span>
            </div>
            <div class="col-md-12 mt-2">
              <span
                ><img src="../../../assets/alartfaith-icon/check-icon.png" alt=""
              /></span>
              <span class="ml-2">Real-time delivery report analysis</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row justify-content-center mt-5 mb-4">
      <div class="col-md-4">
        <div class="row">
          <div class="col-md-12 text-head font-weight-bold s-20">
            Subscribe to Newsletter
          </div>
          <div class="col-md-12 mt-2">
            <el-input
              type="text"
              placeholder="Email address"
              v-model="emailAddress"
              class="w-100"
            ></el-input>
          </div>
          <div class="col-md-12 mt-3">
            <el-button round color="#5D103A" size="large" class="w-100">
              Count me in
            </el-button>
          </div>
        </div>
      </div>
    </div>
    <div class="row footer-bg justify-content-center mt-5">
      <div class="col-md-10 py-5">
        <div class="row">
          <div class="col-md-4 mt-2">
            <div class="col-md-9 d-flex justify-content-end">
              <img src="../../../assets/alartfaith-icon/logo.png" alt="" />
            </div>
            <div class="col-md-9 text-right">
              Build better relationships with members, improve connections and measure
              performance at any time.
            </div>
          </div>
          <div class="col-md-4">
            <div class="row">
              <div class="col-md-6">
                <div class="col-md-12">
                  <ul>
                    <li class="py-2">Products</li>
                    <li class="py-2">Company</li>
                    <li class="py-2">Resources</li>
                    <li class="py-2">Legal</li>
                    <li class="py-2">Social links</li>
                  </ul>
                </div>
              </div>
              <div class="col-md-6">
                <div class="col-md-12">
                  <ul>
                    <li class="py-2">About</li>
                    <li class="py-2">Pricing</li>
                    <li class="py-2">Support</li>
                    <li class="py-2">Developers</li>
                    <li class="py-2">Help Centre</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-4 mt-3">
            <div class="col-md-12">
              <div>
                <img src="../../../assets/alartfaith-icon/appleplay.png" alt="" />
              </div>
              <div class="mt-3">
                <img src="../../../assets/alartfaith-icon/googleplay.png" alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-12 text-center mt-2 mb-4">
        Copyright © 2024 ALAT FAITH. All rights reserved.
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
export default {
  setup() {
    const emailAddress = ref("");

    return {
      emailAddress,
    };
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&family=Roboto:wght@100&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Raleway:ital,wght@0,100..900;1,100..900&display=swap");

* {
  font-family: Poppins;
}
.text-head {
  font-family: Raleway;
}
.bg-color-2 {
  background-color: #fff4fe;
  /* background-color: #ffcef8; */
  /* opacity: 0.6; */
}
.footer-bg {
  background: #e1e1e1;
}

.bg-color-btn {
  background: linear-gradient(90deg, #971931 0%, #5a0f3a 100%);
}
.border-line-btn {
  border: 1px solid #981d87;
  color: #981d87;
}
.border-line-header {
  border: 1px solid #981d87;
  color: #981d87;
}
.section-card-border {
  border: 1px solid #f33e64;
  background: #5f103a;
  box-shadow: 6px 4px 9.9px 0px #ff006b40;
  height: 18rem;
}
.text-dak {
  color: #000000;
}

.fw-500 {
  font-weight: 500 !important;
}

.border-radius-20 {
  border-radius: 20px;
}
.logo {
  width: 4rem;
}

.logo img {
  width: 100%;
}
.linear-bg {
  background: linear-gradient(180deg, #b51839 0%, #5d103a 100%);
  border-radius: 50px;
}
.border3 {
  border: 3px solid #ffffff;
}

.card-bg {
  box-shadow: 0px 4px 10px 0px #00000026;
  background: #f6f6f6;
}

.line-height-30 {
  line-height: 30px;
}
.line-height-50 {
  line-height: 50px;
}

.bg-image {
  background: url(../../../assets/alartfaith-icon/bg-image1.png);
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
}
.bg-image4 {
  background: url(../../../assets/alartfaith-icon/Rectangle4348.png);
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  z-index: +999;
}
.bg-position {
  position: relative;
}

.move-image {
  position: absolute;
  top: 0;
  left: -55px;
}
.bg-image2 {
  background: #f6f6f6;
}
.s-30 {
  font-size: 30px;
}
.s-32 {
  font-size: 32px;
}
.s-24 {
  font-size: 24px;
}
.s-42 {
  font-size: 42px;
}
.s-18 {
  font-size: 18px;
}
.s-14 {
  font-size: 14px;
  line-height: 18px;
  font-weight: 400;
  /* color:  #303030; */
}
.s-13 {
  font-size: 13px;
  line-height: 18px;
  font-weight: 400;
  /* color:  #303030; */
}
</style>
