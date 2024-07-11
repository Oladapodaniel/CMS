<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-12 pb-3">
        <div class="row justify-content-center">
          <div class="col-md-9 pb-3">
            <div>
              <div class="text-head font-weight-bold h2 py-0 my-0 text-black">
                Pending Posts
              </div>
              <div class="fw-300 s-18">Waiting to go Live</div>
            </div>
            <div @click="goBack">
              <span class="s-18 fw-400 cursor-pointer text-black">
                <img src="../../../assets/goback.png" alt="" /> Go back</span
              >
            </div>
          </div>
        </div>

        <div class="row justify-content-center">
          <div class="col-md-9 bordered mt-4">
            <div class="col-md-12">
              <div class="row">
                <div class="col-md-11 py-3">
                  <div class="row">
                    <div class="col-md-12 fw-500 s-20 d-flex align-items-center">
                      <span>Total Posts :</span>
                      <span>{{ pageData.totalPostCount }}</span>
                    </div>
                  </div>

                  <!-- <div class="row mt-4">
                  <div class="col-md-12">
                    <div class="row">
                      <div class="col-12 text-center">
                        <span>Approved</span>
                        <span class="ml-2" style="color: #66bb6a"
                          ><i class="pi pi-circle-on"></i
                        ></span>
                      </div>
                      <div class="col-12 text-center">
                        <span>Not Approved</span>
                        <span class="ml-2"
                          ><i class="pi pi-circle-on" style="color: #ffc107"></i
                        ></span>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-12">
                    <Chart
                      :approved="pageData.approvedPostCount"
                      :pending="pageData.pendingPostCount"
                    />
                  </div>
                </div> -->
                </div>
              </div>
            </div>
            <div class="row p-5 my-4" v-for="(post, index) in pendingPosts" :key="index">
              <div class="col-md-12 bordered1 py-3">
                <!-- User details -->
                <div class="row">
                  <div class="col-2 d-md-flex justify-content-center">
                    <div class="img-holder bg-secondary">
                      <img
                        :src="post.posterDetails.posterImageUrl"
                        alt="User Image"
                        style="height: 40px; width: 100%"
                      />
                    </div>
                  </div>
                  <div class="col-10 pl-md-0">
                    <p
                      class="mb-0 text-head font-weight-600 s-18 py-0 my-0 text-black mb-n2 d-flex justify-content-between"
                    >
                      <span>{{ post.posterDetails.posterName }}</span>
                      <span class="text-warning" v-if="!post.isApproved"
                        ><span class="mr-2">Pending Approval</span
                        ><i class="pi pi-info-circle c-pointer"></i
                      ></span>
                    </p>
                    <small class="mb-0">{{ formatDate(post.date) }}</small>
                  </div>
                </div>

                <!-- Post message -->
                <div class="row">
                  <div class="col-md-12 pt-3">
                    <p class="mb-0">
                      {{ post.content }}
                    </p>
                  </div>
                </div>

                <!-- Post media -->
                <div class="row">
                  <div class="col-md-12 text-center">
                    <span>
                      <img
                        v-if="post.type === 'Picture'"
                        :src="post.mediaUrl"
                        alt=""
                        style="
                          width: auto;
                          max-width: 100%;
                          max-height: 300px;
                          border-radius: 15px;
                        "
                      />
                    </span>
                    <video
                      v-if="post.type === 'Video'"
                      style="width: 100%"
                      height="240"
                      controls
                    >
                      <source :src="post.mediaUrl" />
                      <!-- <source src="movie.mp4" type="video/mp4"> -->
                      Your browser does not support the video tag.
                    </video>
                  </div>
                </div>

                <!-- Post Actions -->
                <div class="row my-3">
                  <div class="col-md-12 d-flex flex-wrap">
                    <a
                      class="text-decoration-none c-pointer default-btn text-dark mr-3"
                      @click="showDeleteModal(post, index)"
                    >
                      <span>Delete</span>
                      <span class="ml-3"><i class="pi pi-times"></i></span>
                    </a>
                    <a
                      class="text-decoration-none c-pointer default-btn text-dark mr-auto"
                      @click="approvePost(post.postId, index)"
                    >
                      <span>Approve</span>
                      <span class="ml-3"><i class="pi pi-check"></i></span>
                    </a>
                    <a
                      class="text-decoration-none c-pointer post-action-link px-3 px-md-4 ml-auto date-range share-btn d-flex align-items-center medium-border-radius"
                    >
                      <span><i class="pi pi-share-alt mr-2"></i></span>
                      <span>Share</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div class="row p-4" v-if="!loading && pendingPosts.length === 0">
              <div class="col-md-12 text-center py-5 mt-4 bordered1 font-weight-600">
                No Pending Posts Found
              </div>
            </div>
          </div>
        </div>

        <!-- SKELETON LOADER -->
        <div class="row mt-2" v-if="loading">
          <div class="col-md-8">
            <div class="row">
              <div class="col-md-12">
                <div class="row">
                  <div class="col-2 my-2">
                    <Skeleton
                      shape="circle"
                      style="width: 100%; height: 70px"
                      class="p-mr-2 small-border-radius"
                    ></Skeleton>
                  </div>
                  <div class="col-10 my-2">
                    <Skeleton
                      style="width: 100%; height: 70px"
                      class="small-border-radius"
                    ></Skeleton>
                  </div>
                </div>
              </div>
              <div class="col-md-12 my-2">
                <Skeleton
                  style="width: 100%; height: 200px"
                  class="p-mb-2 small-border-radius"
                ></Skeleton>
              </div>
              <div class="col-md-12 d-flex">
                <Skeleton
                  width="4rem"
                  class="mr-2 small-border-radius"
                  height="2rem"
                ></Skeleton>
                <Skeleton
                  width="4rem"
                  height="2rem"
                  class="mr-2 small-border-radius"
                ></Skeleton>
              </div>
            </div>

            <div class="row my-4">
              <div class="col-md-12">
                <div class="row">
                  <div class="col-2 my-2">
                    <Skeleton
                      shape="circle"
                      style="width: 100%; height: 70px"
                      class="p-mr-2 small-border-radius"
                    ></Skeleton>
                  </div>
                  <div class="col-10 my-2">
                    <Skeleton style="width: 100%; height: 70px"></Skeleton>
                  </div>
                </div>
              </div>
              <div class="col-md-12 my-2">
                <Skeleton style="width: 100%; height: 200px" class="p-mb-2"></Skeleton>
              </div>
              <div class="col-md-12 d-flex">
                <Skeleton
                  width="4rem"
                  class="mr-2 small-border-radius"
                  height="2rem"
                ></Skeleton>
                <Skeleton
                  width="4rem"
                  height="2rem"
                  class="mr-2 small-border-radius"
                ></Skeleton>
              </div>
            </div>

            <div class="row my-4">
              <div class="col-md-12">
                <div class="row">
                  <div class="col-2 my-2">
                    <Skeleton
                      shape="circle"
                      style="width: 100%; height: 70px"
                      class="p-mr-2 small-border-radius"
                    ></Skeleton>
                  </div>
                  <div class="col-10 my-2">
                    <Skeleton
                      style="width: 100%; height: 70px"
                      class="small-border-radius"
                    ></Skeleton>
                  </div>
                </div>
              </div>
              <div class="col-md-12 my-2">
                <Skeleton
                  style="width: 100%; height: 200px"
                  class="p-mb-2 small-border-radius"
                ></Skeleton>
              </div>
              <div class="col-md-12 d-flex">
                <Skeleton
                  width="4rem"
                  class="mr-2 small-border-radius"
                  height="2rem"
                ></Skeleton>
                <Skeleton
                  width="4rem"
                  height="2rem"
                  class="mr-2 small-border-radius"
                ></Skeleton>
              </div>
            </div>
          </div>
          <div class="col-md-4">
            <Skeleton
              shape="circle"
              style="width: 100%; height: 200px"
              class="p-mr-2 small-border-radius"
            ></Skeleton>
          </div>
        </div>
        <ConfirmDialog />
        <Toast />
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
import social_service from "../../../services/social/social_service";
import router from "../../../router";
import { useStore } from "vuex";
import membershipService from "../../../services/membership/membershipservice";
import dateFormatter from "../../../services/dates/dateformatter";
import Chart from "./components/DoughnutChart";
import { useToast } from "primevue/usetoast";
import { useConfirm } from "primevue/useconfirm";

export default {
  components: { Chart },
  setup() {
    const toast = useToast();
    const store = useStore();
    const loading = ref(true);
    const tenantId =
      store &&
      store.getters &&
      store.getters.currentUser &&
      store.getters.currentUser.tenantId
        ? store.getters.currentUser.tenantId
        : "";
    const pendingPosts = ref([]);
    const pageData = ref({});
    const confirm = useConfirm();

    const deletePost = async (post, index) => {
      try {
        await social_service.deletePost(post.postId);
        pendingPosts.value.splice(index, 1);
        toast.add({
          severity: "success",
          summary: "Post Deleted",
          detail: "The post has been deleted successfully",
          life: 5000,
        });
      } catch (error) {
        toast.add({
          severity: "error",
          summary: "Delete Error",
          detail: "Post could not be deleted, please reload and try again",
          life: 3000,
        });
      }
    };

    const goBack = () => {
      router.go(-1);
    };

    const showDeleteModal = (post, index) => {
      console.log(post, "post");
      confirm.require({
        message: "Are you sure you want to delete this post?",
        header: "Confirmation",
        icon: "pi pi-exclamation-triangle",
        acceptClass: "confirm-delete",
        rejectClass: "cancel-delete",
        accept: () => {
          deletePost(post, index);
        },
        reject: () => {
          console.log("rejected");
        },
      });
    };

    const getPendingPosts = async (tenantId) => {
      try {
        const response = await social_service.getPendingPosts(tenantId);
        loading.value = false;
        console.log(response);
        pageData.value = response;
        pendingPosts.value = response.pendingPosts.filter((i) => !i.isApproved);
      } catch (error) {
        loading.value = false;
        console.log(error);
      }
    };

    if (!tenantId) {
      membershipService.getSignedInUser().then((res) => {
        getPendingPosts(res.tenantId);
      });
    } else {
      getPendingPosts(tenantId);
    }

    const formatDate = (date) => {
      return dateFormatter.monthDayTime(date);
    };

    const approvePost = async (postId, index) => {
      try {
        const response = await social_service.approvePost(postId);
        pendingPosts.value.splice(index, 1);
        toast.add({
          severity: "success",
          summary: "Post Approved",
          detail: "Post has been made public",
          life: 3000,
        });
        console.log(response);
      } catch (error) {
        toast.add({
          severity: "error",
          summary: "Request failed",
          detail: "Post was not approved, please reload and try again",
          life: 3000,
        });
        console.log(error);
      }
    };

    return {
      showDeleteModal,
      pendingPosts,
      formatDate,
      loading,
      approvePost,
      pageData,
      goBack,
    };
  },
};
</script>

<style scoped>
.img-holder {
  border: 1px solid;
  border-radius: 50%;
  width: 48px;
  height: 48px;
  align-items: center;
  display: flex;
  background: white !important;
}

.textarea {
  outline: none;
  margin-top: 10px;
  background: transparent;
}

.post-add-ons {
  background: #f5f6f7;
  border-radius: 0 0 10px 10px;
}

.default-btn {
  display: flex;
  align-items: center;
  max-height: 35px !important;
}

/* .main-post {
        background: #fbfbfb;
    } */

.bordered {
  border: 1px solid #e1e1e1;
  border-radius: 8px;
  background: #fcfcfc;
}
.bordered1 {
  box-shadow: 5px 5px 10px 0px #0000001a;
  border-radius: 8px;
  background: #ffffff;
}

.post-action-link {
  color: #4b5257cc;
}

.small-border-radius {
  border-radius: 10px;
}

.medium-border-radius {
  border-radius: 15px;
}

.comment-field {
  width: calc(100% - 60px);
}

.date-range {
  background: #f7f7f9;
}

.share-btn {
  background: #e6f1ff;
}
</style>
