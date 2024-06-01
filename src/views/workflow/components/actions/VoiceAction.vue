<template>
  <div
    class="container max-height scroll-div pb-5"
    v-for="(item, index) in removeOthers"
    :key="index"
  >
    <div class="row mt-4">
      <div class="col-md-12 px-0">
        <label for="" class="font-weight-600">Voice</label>
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
        <el-input
          type="text"
          v-model="item.otherToContacts"
          @change="handleOtherAddresses"
        />
        <!-- <input type="text" class="form-control" v-model="item.otherToContacts" @change="handleOtherAddresses"> -->
        <span class="small-text">Separate the addresses with comma</span>
      </div>
    </div>

    <div class="row mt-4">
      <div class="col-md-12 px-0">
        <label for="" class="font-weight-600">Voice URL</label>
      </div>
      <!-- v-model="item.voiceURL"  -->
      <div class="col-md-12 px-0">
        <el-dropdown trigger="click" class="w-100">
          <div
            class="d-flex justify-content-between border-contribution text-dark w-100"
            size="large"
          >
            <span
              >{{
                voiceActionType &&
                selectedVoiceType &&
                Object.keys(voiceActionType.find((i) => i.id == selectedVoiceType))
                  .length > 0
                  ? voiceActionType.find((i) => i.id == selectedVoiceType).name
                  : "Choose audio file source"
              }}
            </span>
            <div>
              <el-icon class="el-icon--right">
                <arrow-down />
              </el-icon>
            </div>
          </div>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item
                v-for="(item, index) in voiceActionType"
                :key="index"
                @click="selectedVoiceType = item.id"
              >
                <a class="no-decoration text-dark">
                  {{ item.name }}
                </a>
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
        <el-dropdown trigger="click" class="w-100 mt-3" v-if="selectedVoiceType == 1">
          <div
            class="d-flex justify-content-between border-contribution text-dark w-100"
            size="large"
          >
            <span
              >{{
                Object.keys(selectedVoiceaudio).length > 0
                  ? selectedVoiceaudio.fileBlobName
                  : "Select uploaded audio file"
              }}
            </span>
            <div>
              <el-icon class="el-icon--right">
                <arrow-down />
              </el-icon>
            </div>
          </div>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item
                v-for="(item, index) in voiceAudioList"
                :key="index"
                @click="chooseVoiceAudio(item)"
              >
                <a class="no-decoration text-dark">
                  {{ item.fileBlobName }}
                </a>
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
        <el-upload
          class="upload-demo w-100 mt-3"
          drag
          multiple
          :on-change="handleVoice"
          accept="audio/*"
          :auto-upload="false"
          v-loading="fileLoading"
          v-else-if="selectedVoiceType == 2"
        >
          <el-icon class="el-icon--upload"><upload-filled /></el-icon>
          <div class="el-upload__text">Drop file here or <em>click to upload</em></div>
          <template #tip>
            <div class="el-upload__tip">
              {{ [".m4a", ".mp2", ".mp3", ".ogg", ".wav", ".wma", ".webm"].join(", ") }}
              files are accepted
            </div>
          </template>
        </el-upload>
        <audio controls id="audioPlayer" class="mt-2" style="width: 100%;" :style="'display: ' + (item.voiceURL ? 'block' : 'none')">
          <source :src="item.voiceURL ? item.voiceURL : ''" type="audio/mpeg" />
          Your browser does not support the audio elementt.
        </audio>
      </div>
    </div>
  </div>
</template>
<script>
import { reactive, ref, onMounted } from "@vue/reactivity";
import { watchEffect } from "@vue/runtime-core";
import media_service from "../../../../services/media/media_service";
import membershipService from "../../../../services/membership/membershipservice";
import communicationService from "../../../../services/communication/communicationservice";
export default {
  inheritAttrs: false,
  props: ["selectedActionIndex", "parameters", "selectVoiceList"],
  setup(props, { emit }) {
    // const data = reactive({ ActionType: 2, JSONActionParameters: { } })
    const data = reactive([]);
    const actionType = reactive(2);
    const person = ref(false);
    const removeOthers = ref([]);
    const tenantId = ref("");
    const selectedVoiceaudio = ref({});
    const voiceActionType = ref([
      { name: "Choose from uploaded audio files", id: 1 },
      { name: "Upload a new audio file", id: 2 },
    ]);
    const selectedVoiceType = ref(0);
    const voiceAudioList = ref([]);
    const file = ref(null);
    const fileLoading = ref(false);

    const handleSendPersonMail = (e) => {
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
    const handleSendPersonsParentMail = (e) => {
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
    const handleSendPersonsSpouseMail = (e) => {
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
    const handleSendGroupLeaderMail = (e) => {
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
    const handleOtherAddresses = (e) => {
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

    const getTenantId = () => {
      membershipService
        .getSignedInUser()
        .then((res) => {
          tenantId.value = res.tenantId;
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getTenantId();

    const voiceURL = ref("");

    const handleVoice = async (e) => {
        fileLoading.value = true;
        
        file.value = e.raw;
        let formData = new FormData();
        formData.append("mediaFile", file.value);
        formData.append("tenantId", tenantId.value);
        
        try {
            let data2 = await media_service.uploadMedia(formData);

            // Stop the loading
            fileLoading.value = false;
      
            // Display the audio element for visual cue
            const mediaPlayer = document.getElementById("audioPlayer");

            const reader = new FileReader();
            
            reader.addEventListener("load", function () {
                mediaPlayer.style.display = "block";
                mediaPlayer.src = reader.result;
            });
            
            if (file.value) {
                reader.readAsDataURL(file.value);
            }
        
            // Gather and send the payload to parent component
        if (data[props.selectedActionIndex]) {
            data[props.selectedActionIndex].JSONActionParameters.voiceUrl =
            data2.returnObject.filePath;
        } else {
            data[props.selectedActionIndex] = new Object();
            data[props.selectedActionIndex].JSONActionParameters = new Object();
            data[props.selectedActionIndex].JSONActionParameters.voiceUrl =
            data2.returnObject.filePath;
        }
        emit("updateaction", data, props.selectedActionIndex, actionType);
    } catch (err) {
        fileLoading.value = false;
        console.log(err);
      }
    };

    const parsedData = ref({});
    watchEffect(() => {
      if (props.selectVoiceList) {
        removeOthers.value = props.selectVoiceList.filter((i, index) => {
          return index == props.selectedActionIndex;
        });
      }

      if (
        removeOthers.value &&
        removeOthers.value[0].action &&
        removeOthers.value[0].action.jsonActionParameters
      ) {
        parsedData.value = JSON.parse(removeOthers.value[0].action.jsonActionParameters);

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

        removeOthers.value[0].otherToContacts = parsedData.value.otherToContacts;
        data[props.selectedActionIndex].JSONActionParameters.otherToContacts =
          parsedData.value.otherToContacts;

        removeOthers.value[0].voiceURL = parsedData.value.voiceUrl;
        data[props.selectedActionIndex].JSONActionParameters.voiceUrl =
          parsedData.value.voiceUrl;
      }
    });

    const getAllVoiceAudio = async () => {
      try {
        let data = await communicationService.getAllUploadedVoiceAudio();
        voiceAudioList.value = data;
      } catch (err) {
        console.error(err);
      }
    };
    getAllVoiceAudio();

    const chooseVoiceAudio = (item) => {
      selectedVoiceaudio.value = item;
      const mediaPlayer = document.getElementById("audioPlayer");
      mediaPlayer.src = item.filePath;
      mediaPlayer.style.display = "block";

      data[props.selectedActionIndex].JSONActionParameters.voiceUrl =
        selectedVoiceaudio.value.filePath;

      emit("updateaction", data, props.selectedActionIndex, actionType);
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
      voiceURL,
      handleVoice,
      removeOthers,
      tenantId,
      voiceActionType,
      selectedVoiceType,
      voiceAudioList,
      selectedVoiceaudio,
      chooseVoiceAudio,
      file,
      fileLoading
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
