<template>
  <div
    class="container max-height scroll-div"
    v-for="(item, index) in removeOthers"
    :key="index"
  >
    <div class="row mt-4">
      <div class="col-md-12 px-0">
        <label for="" class="font-weight-600">WhatsApp</label>
      </div>
      <div class="col-md-12">
        <div class="row">
          <div class="col-md-12 px-0">
            <input
              type="checkbox"
              name=""
              id=""
              v-model="item.person"
              @change="handleSendPersonMail"
            />
            The person
          </div>
          <div class="col-md-12 px-0">
            <input
              type="checkbox"
              name=""
              id=""
              v-model="item.parent"
              @change="handleSendPersonsParentMail"
            />
            The person's parent
          </div>
          <div class="col-md-12 px-0">
            <input
              type="checkbox"
              name=""
              id=""
              v-model="item.spouse"
              @change="handleSendPersonsSpouseMail"
            />
            The person's spouse
          </div>
          <div class="col-md-12 px-0">
            <input
              type="checkbox"
              name=""
              id=""
              v-model="item.groupLeader"
              @change="handleSendGroupLeaderMail"
            />
            The Group Leaders
          </div>
        </div>
      </div>
    </div>

    <div class="row mt-4">
      <div class="col-md-12 px-0">
        <label for="" class="font-weight-600">And the following</label>
      </div>
      <div class="col-md-12 px-0">
        <div class="">
          <div class="d-flex flex-wrap">
            <el-tag
              class="mx-1 mb-1"
              size="large"
              closable
              v-for="(item, index) in allSelectedNumbers"
              :key="index"
              @close="
                allSelectedNumbers.splice(index, 1),
                  toOthers.splice(index, 1),
                  getMemberPhoneNumber()
              "
              >{{ item }}</el-tag
            >
          </div>
          <vue-tel-input
            placeholder="Phone number"
            style="height: 40px"
            class="input-width mt-1"
            v-model="phoneNumber"
            @change="handleOtherAddresses"
            mode="international"
          ></vue-tel-input>
          <el-button
            class="mt-2"
            type="primary"
            @click="handleOtherAddresses"
            plain
          >
            <el-icon> <CirclePlusFilled /> </el-icon>&nbsp;Add
          </el-button>
        </div>
        <!-- <input type="text" class="form-control" v-model="item.otherToContacts" @change="handleOtherAddresses">
                <span class="small-text">Separate the addresses with comma</span> -->
      </div>
    </div>

    <div class="row mt-4">
      <div class="col-md-12 px-0">
        <label for="" class="font-weight-600">Message</label>
      </div>
      <div class="col-md-12 px-0">
        <!-- <input type="text" class="form-control" > -->
        <textarea
          name=""
          id=""
          rows="4"
          class="form-control w-100"
          v-model="item.message"
          @input="handleMessage"
        ></textarea>
      </div>
    </div>
    <div class="row mb-5">
      <div class="d-flex align-items-start mt-2">
        <img
          src="../../../../assets/smiling-face.png"
          width="20"
          class="c-pointer emoji-wrapper"
          @click="displayEmoji = !displayEmoji"
        />
        <transition name="el-fade-in-linear">
          <VuemojiPicker
            v-show="displayEmoji"
            @emojiClick="handleEmojiClick"
            class="mt-2 emoji-wrapper"
            style="position: absolute; z-index: 1000"
          />
        </transition>

        <!-- accept="image/*"  -->
        <el-upload
          class="upload-demo"
          multiple
          :limit="1"
          :on-change="chooseFile"
          :on-remove="handleRemove"
          :auto-upload="false"
        >
          <el-icon class="ml-2" style="font-size: 20px; color: #7d7d7d">
            <Paperclip />
          </el-icon>
        </el-upload>

        <!-- Check for image file extensions -->
        <div v-if="isImage(item.fileUrl)">
          <img :src="item.fileUrl" width="200" alt="file" />
        </div>

        <!-- Check for audio file extensions -->
        <div v-if="isAudio(item.fileUrl)">
          <audio controls>
            <source :src="item.fileUrl" />
            Your browser does not support the audio element.
          </audio>
        </div>

        <!-- Check for video file extensions -->
        <div v-if="isVideo(item.fileUrl)">
          <video width="320" height="240" controls>
            <source :src="item.fileUrl" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, ref } from "vue";
import { watchEffect } from "@vue/runtime-core";
import { VuemojiPicker } from "vuemoji-picker";
import axios from "@/gateway/backendapi";
export default {
  props: ["selectedActionIndex", "parameters", "selectWhatsappList"],
  components: {
    VuemojiPicker,
  },
  setup(props, { emit }) {
    // const data = reactive({ ActionType: 3, JSONActionParameters: { } })
    const data = reactive([]);
    const actionType = reactive(3);
    const removeOthers = ref([]);
    const person = ref(false);
    const allSelectedNumbers = ref([]);
    const phoneNumber = ref("");
    const groupMembersData = ref({});
    const displayEmoji = ref(false);
    const fileUrl = ref("");

    const handleSendPersonMail = () => {
      // data.JSONActionParameters.person = e.target.checked;
      if (data[props.selectedActionIndex]) {
        data[props.selectedActionIndex].JSONActionParameters.person =
          removeOthers.value[0].person;
      } else {
        data[props.selectedActionIndex] = new Object();
        data[props.selectedActionIndex].JSONActionParameters = new Object();
        data[props.selectedActionIndex].JSONActionParameters.person =
          removeOthers.value[0].person;
      }
      emit("updateaction", data, props.selectedActionIndex, actionType);
    };

    const parent = ref(false);
    const handleSendPersonsParentMail = () => {
      // data.JSONActionParameters.parent = e.target.checked;
      if (data[props.selectedActionIndex]) {
        console.log(data[props.selectedActionIndex]);
        data[props.selectedActionIndex].JSONActionParameters.parent =
          removeOthers.value[0].parent;
      } else {
        console.log(data[props.selectedActionIndex]);
        data[props.selectedActionIndex] = new Object();
        data[props.selectedActionIndex].JSONActionParameters = new Object();
        data[props.selectedActionIndex].JSONActionParameters.parent =
          removeOthers.value[0].parent;
      }
      emit("updateaction", data, props.selectedActionIndex, actionType);
    };

    const spouse = ref(false);
    const handleSendPersonsSpouseMail = () => {
      // data.JSONActionParameters.spouse = e.target.checked;
      if (data[props.selectedActionIndex]) {
        data[props.selectedActionIndex].JSONActionParameters.spouse =
          removeOthers.value[0].spouse;
      } else {
        data[props.selectedActionIndex] = new Object();
        data[props.selectedActionIndex].JSONActionParameters = new Object();
        data[props.selectedActionIndex].JSONActionParameters.spouse =
          removeOthers.value[0].spouse;
      }
      emit("updateaction", data, props.selectedActionIndex, actionType);
    };

    const groupLeader = ref(false);
    const handleSendGroupLeaderMail = () => {
      // data.JSONActionParameters.groupLeader = e.target.checked;
      if (data[props.selectedActionIndex]) {
        data[props.selectedActionIndex].JSONActionParameters.groupLeader =
          removeOthers.value[0].groupLeader;
      } else {
        data[props.selectedActionIndex] = new Object();
        data[props.selectedActionIndex].JSONActionParameters = new Object();
        data[props.selectedActionIndex].JSONActionParameters.groupLeader =
          removeOthers.value[0].groupLeader;
      }
      emit("updateaction", data, props.selectedActionIndex, actionType);
    };

    const otherToContacts = ref("");
    const handleOtherAddresses = () => {
      allSelectedNumbers.value.push(
        phoneNumber.value.replaceAll(" ", "").trim()
      );
      phoneNumber.value = "";
      removeOthers.value[0].otherToContacts =
        allSelectedNumbers.value.join(",");
      // data.JSONActionParameters.otherToContacts = e.target.value;
      if (data[props.selectedActionIndex]) {
        data[props.selectedActionIndex].JSONActionParameters.otherToContacts =
          removeOthers.value[0].otherToContacts;
      } else {
        data[props.selectedActionIndex] = new Object();
        data[props.selectedActionIndex].JSONActionParameters = new Object();
        data[props.selectedActionIndex].JSONActionParameters.otherToContacts =
          removeOthers.value[0].otherToContacts;
      }
      emit("updateaction", data, props.selectedActionIndex, actionType);
    };

    const message = ref("");
    const handleMessage = () => {
      // data.JSONActionParameters.message = e.target.value;
      if (data[props.selectedActionIndex]) {
        data[props.selectedActionIndex].JSONActionParameters.message =
          removeOthers.value[0].message;
      } else {
        data[props.selectedActionIndex] = new Object();
        data[props.selectedActionIndex].JSONActionParameters = new Object();
        data[props.selectedActionIndex].JSONActionParameters.message =
          removeOthers.value[0].message;
      }
      emit("updateaction", data, props.selectedActionIndex, actionType);
    };

    const getMemberPhoneNumber = async () => {
      memberdataloading.value = true;
      const payload = {
        subject: "",
        message: editorData.value,
        contacts: [],
        isPersonalized: false,
        groupedContacts: [],
        isoCode: "",
        category: "",
        emailAddress: "",
        emailDisplayName: "",
        gateWayToUse: "",
        toOthers: toOthers.value.length > 0 ? toOthers.value.join(",") : "",
      };

      try {
        let { data } = await axios.post(
          "/api/Messaging/getCommunicationAudience",
          payload
        );
        memberdataloading.value = false;
        groupMembersData.value = data.result.contacts;
        console.log(data);
      } catch (err) {
        console.log(err);
        memberdataloading.value = false;
      }
    };

    const parsedData = ref({});
    watchEffect(() => {
      if (props.selectWhatsappList) {
        removeOthers.value = props.selectWhatsappList.filter((i, index) => {
          return index == props.selectedActionIndex;
        });
        console.log(removeOthers.value);
      }

      if (
        removeOthers.value &&
        removeOthers.value[0].action &&
        removeOthers.value[0].action.jsonActionParameters
      ) {
        parsedData.value = JSON.parse(
          removeOthers.value[0].action.jsonActionParameters
        );

        removeOthers.value[0].person = parsedData.value.person;
        data[props.selectedActionIndex] = new Object();
        data[props.selectedActionIndex].JSONActionParameters = new Object();
        data[props.selectedActionIndex].JSONActionParameters.person =
          parsedData.value.person;

        removeOthers.value[0].parent = parsedData.value.parent;
        data[props.selectedActionIndex].JSONActionParameters.parent =
          parsedData.value.parent;

        removeOthers.value[0].spouse = parsedData.value.spouse;
        data[props.selectedActionIndex].JSONActionParameters.spouse =
          parsedData.value.spouse;

        removeOthers.value[0].groupLeader = parsedData.value.groupLeader;
        data[props.selectedActionIndex].JSONActionParameters.groupLeader =
          parsedData.value.groupLeader;

        removeOthers.value[0].otherToContacts =
          parsedData.value.otherToContacts;
        data[props.selectedActionIndex].JSONActionParameters.otherToContacts =
          parsedData.value.otherToContacts;

        removeOthers.value[0].message = parsedData.value.message;
        data[props.selectedActionIndex].JSONActionParameters.message =
          parsedData.value.message;

        removeOthers.value[0].fileUrl = parsedData.value.fileUrl;
        data[props.selectedActionIndex].JSONActionParameters.fileUrl =
          parsedData.value.fileUrl;
      }
    });

    watchEffect(() => {
      if (removeOthers?.value[0]?.otherToContacts) {
        allSelectedNumbers.value =
          removeOthers.value[0].otherToContacts.split(",");
      }
    });

    const chooseFile = async (e) => {
      let formData = new FormData();
      formData.append("MediaFileImage", e.raw);

      try {
        let { data } = await axios.post(
          "/api/Media/UploadWhatsAppAttachment",
          formData
        );
        console.log(data);
        if (data.pictureUrl) {
          fileUrl.value = data.pictureUrl;

          if (data[props.selectedActionIndex]) {
            data[props.selectedActionIndex].JSONActionParameters.fileUrl =
              fileUrl.value;
          } else {
            data[props.selectedActionIndex] = new Object();
            data[props.selectedActionIndex].JSONActionParameters = new Object();
            data[props.selectedActionIndex].JSONActionParameters.fileUrl =
              fileUrl.value;
          }
          emit("updateaction", data, props.selectedActionIndex, actionType);
          console.log("reached");
        }
      } catch (error) {
        console.error(error);
      }
    };

    const handleRemove = () => {
      fileUrl.value = "";
    };

    const handleEmojiClick = (data) => {
      editorData.value += data.unicode;
    };

    const isImage = (fileUrl) => {
      return fileUrl?.match(/\.(jpg|jpeg|png|gif)$/i);
    };

    const isAudio = (fileUrl) => {
      return fileUrl?.match(/\.(mp3|wav|ogg|m4a)$/i);
    };

    const isVideo = (fileUrl) => {
      return fileUrl?.match(/\.(mp4|webm|ogg)$/i);
    };

    return {
      person,
      handleSendPersonMail,
      parent,
      handleSendPersonsParentMail,
      spouse,
      groupLeader,
      handleSendGroupLeaderMail,
      handleSendPersonsSpouseMail,
      otherToContacts,
      handleOtherAddresses,
      handleMessage,
      message,
      removeOthers,
      allSelectedNumbers,
      phoneNumber,
      displayEmoji,
      chooseFile,
      fileUrl,
      handleRemove,
      handleEmojiClick,
      isAudio,
      isImage,
      isVideo,
    };
  },
};
</script>

<style scoped>
.max-height {
  max-height: calc(100vh - 300px);
  overflow-y: scroll;
}
</style>