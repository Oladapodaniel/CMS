<template>
  <div v-loading="connectingExistingSession" element-loading-text="Hold on while we connect your Whatsapp...">
    <div class="d-flex justify-content-center">
      <img src="../../assets/whatsapp-churchplus.svg" />
    </div>
    <h1 class="send-text s-20 mt-3 text-center">
      Send Whatsapp Message <br />to Members easily
    </h1>
    <p class="text-center">Sync ChurchPlus with Whatsapp</p>
    <el-alert v-if="serverBusy" title="Server status" type="warning"
      description="The server is currently processing request for another user, please try again later" effect="dark"
      :closable="false" show-icon />
    <div class="d-flex justify-content-center">
      <!-- :disabled="!socketconnected" -->
      <!-- <el-button
        :color="primarycolor"
        @click="createGetWhatsappSession(sessionId, 'createsession')"
        round
        class="text-white text-center mt-3"
      >
        Connect now
      </el-button> -->
      <el-button :color="primarycolor" @click="initialiseWhatsapp" round class="text-white text-center mt-3">
        Connect now
      </el-button>
    </div>
  </div>
  <el-dialog v-model="QRCodeDialog" @close="closeQRDialog" title=""
    :width="mdAndUp || lgAndUp || xlAndUp ? '50%' : '90%'" class="QRCodeDialog" :close-on-click-modal="true"
    :close-on-press-escape="false" :show-close="false" align-center>
    <div class="d-flex align-items-center flex-column" v-if="isClientReady">
      <img src="../../assets/7efs.gif" width="200" />
      <h1 class="s-20 font-weight-700 text-dark">Whatsapp is Connected</h1>
      <h1 class="s-20 font-weight-700 text-dark">Successfully.</h1>
      <el-button @click="proceedAction" round class="mt-5 text-center">
        Proceed
      </el-button>
    </div>
    <div class="d-flex justify-content-md-center flex-column flex-md-row align-items-sm-center" v-else>
      <div v-loading="qrloading">
        <!-- <VueQrcode
          :value="qrCode"
          :size="200"
          class="w-100"
          :color="{ dark: '#000000ff', light: '#ffffffff' }"
          type="image/png"
          level="L"
          v-if="qrCode"
        /> -->
        <img :src="qrCode" class="w-100" v-if="qrCode" />
        <img src="../../assets/qrcode.png" class="w-100" v-else />
      </div>
      <div class="ml-4">
        <h1 class="send-text s-20">Scan the QR Code <br />with your phone</h1>
        <div>
          <div>1. Open your Whatsapp app</div>
          <div>2. Click on Linked Devices</div>
          <div>3. Click on Link a device</div>
          <div>4. Scan the code shown</div>
        </div>
        <div class="spinner-border mt-4" style="color: #124191" role="status" v-if="checkInstanceLoading && !isClientReady">
          <span class="sr-only">Loading</span>
        </div>
      </div>
    </div>
  </el-dialog>
</template>

<script>
import { ref, inject, watchEffect, computed, watch } from "vue";
import VueQrcode from "vue-qrcode";
import uuid from "uuid";
// import { socket } from "@/socket";
// import { state } from "@/socket";
import axios from "@/gateway/backendapi";
import api from "axios";
import store from "../../store/store";
import { useRoute, useRouter } from "vue-router";
// import router from "../../router";
import { ElMessage } from "element-plus";
import deviceBreakpoint from "../../mixins/deviceBreakpoint";
import { ElNotification } from "element-plus";
import { whatsappServerBaseURL } from "../../gateway/backendapi";

export default {
  components: {
    VueQrcode,
  },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const primarycolor = inject("primarycolor");
    const QRCodeDialog = ref(false);
    const qrCode = ref("");
    let sessionId = ref(`session-${uuid().substring(0, 13)}`);
    const qrloading = ref(false);
    const sessionStatus = ref("newSession");
    const isClientReady = ref(false);
    const savingSession = ref(false);
    const connectingExistingSession = ref(false);
    const { mdAndUp, lgAndUp, xlAndUp, xsOnly } = deviceBreakpoint();
    const serverBusy = ref(false);
    const sequentialQRCodeCall = ref(null);
    const sequentialCheckInstanceStatus = ref(null);
    const checkInstanceLoading = ref(false);


    const socketconnected = computed(() => {
      return state.connected;
    });

    const createGetWhatsappSession = (sessionId, type) => {
      if (type == "createsession") {
        QRCodeDialog.value = true;
        qrloading.value = true;
      } else {
        connectingExistingSession.value = true;
      }
      console.log(sessionId);
      console.log("creating session, check WS");
      store.dispatch("communication/whatsappSessionId", sessionId);
      // socket.emit("getsession", { id: sessionId });
    };

    const saveSessionIdonAuthSuccess = async () => {
      savingSession.value = true;
      console.log(sessionId.value);
      try {
        let response = await axios.post(
          `/api/Settings/SaveWhatsAppSession?session=${sessionId.value}`
        );
        savingSession.value = false;
        // isClientReady.value = true
        // closeQRDialog();
        console.log(response);
      } catch (err) {
        console.error(err);
        savingSession.value = false;
      }
    };

    const getSessionIdFromBackend = async () => {
      connectingExistingSession.value = true;
      try {
        let { data } = await axios.get("/api/Settings/GetWhatsAppSession");
        console.log(data, 'gett');
        // if the response has value
        if (data) {
          // Restore the session here
          sessionId.value = data;
          store.dispatch("communication/whatsappSessionId", sessionId.value);
          restoreExistingSession();
          // createGetWhatsappSession(data, "getsession");
          // sessionStatus.value = "sessionReady";
        } else {
          sessionStatus.value = "newSession";
        }
        // else {
        //   // create a new instance
        //   initialiseWhatsapp()
        //   // sessionStatus.value = "noSession";
        // }
      } catch (err) {
        console.error(err);
      }
    };
    if (!isClientReady.value) getSessionIdFromBackend();

    const initialiseWhatsapp = async () => {
      // connectingExistingSession.value = true;
      try {
        let { data } = await api.get(`${whatsappServerBaseURL}initializeWhatsapp?key=${sessionId.value}`);
        console.log(data, 'inited')
        if (!data.error) {
          // Display qrcode
          setTimeout(() => {
            getQRCode();
          }, 4000);
        }
      }
      catch (error) {
        connectingExistingSession.value = false;
        console.error(error)
      }
    }

    const getQRCode = async () => {
      try {
        let { data } = await api.get(`${whatsappServerBaseURL}scanQRCode?key=${sessionId.value}`);
        connectingExistingSession.value = false
        store.dispatch("communication/whatsappSessionId", sessionId.value);
        if (!data.error) {
          if (data?.qrcode?.length > 0) {
            // Display qrcode
            QRCodeDialog.value = true;
            qrCode.value = data.qrcode;
            checkInstanceLoading.value = true
            if (qrCode.value?.length > 0) {
              sequentialQRCodeCall.value = setTimeout(() => {
                getQRCode()
              }, 30000)
            }
          } else {
            initialiseWhatsapp();
          }
        }
      }
      catch (error) {
        console.error(error)
        connectingExistingSession.value = false
      }
    }

    const checkInstanceStatus = async () => {
      try {
        let { data } = await api.get(`${whatsappServerBaseURL}single/instanceInfo?key=${sessionId.value}`);
        console.log(data)
        if (!data.error) {
          if (data && data.instance_data && data.instance_data.user && Object.keys(data.instance_data.user).length > 0) {
            connectingExistingSession.value = false
            isClientReady.value = true;
            store.dispatch("communication/isWhatsappClientReady", isClientReady.value);
            QRCodeDialog.value = true;
            checkInstanceLoading.value = false
            return;
          } else {
            sequentialCheckInstanceStatus.value = setTimeout(() => {
              checkInstanceStatus()
              console.log('inteval')
            }, 10000);
          }
        } else {
          sequentialCheckInstanceStatus.value = setTimeout(() => {
            checkInstanceStatus()
            console.log('inteval')
          }, 10000);
        }
      } catch (error) {
        console.error(error);
        checkInstanceLoading.value = false
      }
    }

    watchEffect(() => {
      if (qrCode.value && qrCode.value.length > 0 && QRCodeDialog.value) {
        checkInstanceStatus();
      }
    })

    const restoreExistingSession = async () => {
      try {
        let { data } = await api.get(`${whatsappServerBaseURL}instance/restore`);
        // connectingExistingSession.value = false
        if (!data.error) {
          if (data.data && data.data.length > 0) {
            let checkSession = data.data.some(i => i.toLowerCase() === sessionId.value.toLowerCase());
            if (checkSession) {
              checkInstanceStatus()
            } else {
              initialiseWhatsapp()
            }
          } else {
            initialiseWhatsapp()
          }
        } else {
          initialiseWhatsapp()
        }
      }
      catch (error) {
        console.error(error)
        connectingExistingSession.value = false
      }
    }



    // ===============
    // 1. Restoring the instances without reloading
    // 2. Refresh QRCode done
    // 3. Proceed after auth should check if instance is established // 
    // 4. Logout done
    // 5. Batch sending of whatsapp messages
    // 6. Schedule whatsapp message


    watchEffect(() => {
      //   socket.emit("connected", "Hello From Client");
      //   socket.on("hello", (data) => {
      //     console.log("Hello Emittted from the server", data);
      //   });
      //   socket.on("qr", (data) => {
      //     console.log("QR RECEIVED", data);
      //     const { qr } = data;
      //     console.log(qr);
      //     QRCodeDialog.value = true;
      //     serverBusy.value = false;
      //     qrloading.value = false;
      //     qrCode.value = qr;

      //     // Reauthenticate user
      //     if (!QRCodeDialog.value) {
      //       connectingExistingSession.value = false;
      //       QRCodeDialog.value = true;
      //     }
      //   });

      //   socket.on("qrcodeexpired", (data) => {
      //     QRCodeDialog.value = false;
      //     ElMessage({
      //       type: "warning",
      //       showClose: true,
      //       message: data.message,
      //       duration: 10000,
      //     });
      //   });

      //   socket.on("whatsapperror", (data) => {
      //     QRCodeDialog.value = false;
      //     connectingExistingSession.value = false;
      //     ElMessage({
      //       type: "error",
      //       showClose: true,
      //       message: data.message,
      //       duration: 10000,
      //     });
      //   });

      //   socket.on("ready", (data) => {
      //     console.log("READY", data);
      //     isClientReady.value = true;
      //     connectingExistingSession.value = false;
      //     store.dispatch("communication/isWhatsappClientReady", isClientReady.value);
      //     QRCodeDialog.value = true;
      //     setTimeout(() => {
      //       if (route.fullPath == "/tenant/whatsapp/auth") {
      //         router.push("/tenant/whatsapp");
      //       }
      //     }, 3000);
      //     if (sessionStatus.value == "noSession") {
      //       saveSessionIdonAuthSuccess();
      //     }
      //   });

      //   // socket.on('remotesessionsaved', (data) => {
      //   //     console.log(data, 'Remote session saved')
      //   //     // if the get session endpoint returned no session, then save the current to backend
      //   // })

      //   socket.on("allchats", (data) => {
      //     store.dispatch("communication/allClientChat", data.chats);
      //     console.log(data, "AllChats Here 🥰🎉");
      //   });

      //   socket.on("reconnectclient", ({ id, message }) => {
      //     createGetWhatsappSession(id, "getsession");
      //     ElMessage({
      //       showClose: true,
      //       message: message,
      //       type: "success",
      //     });
      //   });

      //   socket.on("processing", (data) => {
      //     connectingExistingSession.value = false;
      //     QRCodeDialog.value = false;
      //     serverBusy.value = true
      //     console.log(data.message);
      // });

      // socket.on("readytoserve", (data) => {
      //     connectingExistingSession.value = false;
      //     // QRCodeDialog.value = false;
      //     console.log(data.message);
      //     serverBusy.value = false
      // });

      //   // socket.on('newmessage', (data) => {
      //   //     console.log(data);
      //   //     ElNotification({
      //   //         title: data._data.notifyName,
      //   //         message: !data.hasMedia ? data._data.body : '** Media File **',
      //   //         type: 'success',
      //   //     })

      //   // })

      //   if (socketconnected.value) {
      //     console.log("socket connected");
      //   } else {
      //     console.log("socket not connected");
      //     connectingExistingSession.value = false;
      //   }

    });

    const proceedAction = () => {
      QRCodeDialog.value = false;
      clearTimeout(sequentialQRCodeCall.value)
      clearTimeout(sequentialCheckInstanceStatus.value);
      store.dispatch("communication/whatsappSessionId", sessionId.value);
      if (route.fullPath == "/tenant/whatsapp/auth") {
        router.push("/tenant/whatsapp");
      }

      if (sessionStatus.value === 'newSession') {
        saveSessionIdonAuthSuccess();
        console.log('saving')
      }
    };

    const closeQRDialog = () => {
      clearTimeout(sequentialQRCodeCall.value)
      if (isClientReady.value) {
        if (route.fullPath == "/tenant/whatsapp/auth") {
          router.push("/tenant/whatsapp");
        }
        QRCodeDialog.value = false;
      }
    }

    return {
      primarycolor,
      QRCodeDialog,
      qrCode,
      // createGetWhatsappSession,
      sessionId,
      qrloading,
      isClientReady,
      socketconnected,
      connectingExistingSession,
      proceedAction,
      mdAndUp,
      lgAndUp,
      xlAndUp,
      xsOnly,
      serverBusy,
      initialiseWhatsapp,
      saveSessionIdonAuthSuccess,
      closeQRDialog,
      savingSession,
      sequentialQRCodeCall,
      checkInstanceLoading,
      sequentialCheckInstanceStatus,
      checkInstanceStatus
    };
  },
};
</script>

<style scoped>
.send-text {
  color: #124191;
  font-weight: 800;
}
</style>
