<template>
    <div v-loading="connectingExistingSession" element-loading-text="Hold on while we connect your Whatsapp...">
        <div class="d-flex justify-content-center">
            <img src="../../assets/whatsapp-churchplus.svg" />
        </div>
        <h1 class="send-text s-20 mt-3 text-center">Send Whatsapp Message <br />to
            Members easily</h1>
        <p class="text-center">Sync ChurchPlus with Whatsapp</p>
        <div class="d-flex justify-content-center">
            <el-button :color="primarycolor" @click="createGetWhatsappSession(sessionId, 'createsession')" round
                class="text-white text-center">
                Connect now
            </el-button>
        </div>
    </div>
    <el-dialog v-model="QRCodeDialog" title="" width="50%" class="QRCodeDialog" align-center>
        <div class="d-flex align-items-center flex-column" v-if="isClientReady">
            <img src="../../assets/7efs.gif" width="200" />
            <h1 class="s-20 font-weight-700 text-dark">Whatsapp is Connected</h1>
            <h1 class="s-20 font-weight-700 text-dark"> Successfully.</h1>
            <el-button @click="proceedAction" class="mt-5" text>Click here to proceed</el-button>
        </div>
        <div class="d-flex justify-content-center align-items-center" v-else>
            <div v-loading="qrloading">
                <VueQrcode :value="qrCode" :size="200" :color="{ dark: '#000000ff', light: '#ffffffff' }" type="image/png"
                    level="L" v-if="qrCode" />
                <img src="../../assets/qrcode.png" v-else />
            </div>
            <div class="ml-4">
                <h1 class="send-text s-20">Scan the QR Code <br />with your phone</h1>
                <div>
                    <div>1. Open your Whatsapp app</div>
                    <div>2. Click on Linked Devices</div>
                    <div>3. Click on Link a device</div>
                    <div>4. Scan the code shown</div>
                </div>
            </div>
        </div>
    </el-dialog>
</template>

<script>
import { ref, inject, watchEffect, computed } from "vue";
import VueQrcode from 'vue-qrcode';
import uuid from "uuid";
import { socket } from "@/socket";
import { state } from "@/socket";
import axios from "@/gateway/backendapi";
import store from "../../store/store";
import { useRoute } from "vue-router";
import router from "../../router";
// import { ElMessage } from "element-plus";

export default {
    components: {
        VueQrcode
    },
    setup() {
        const route = useRoute();
        const primarycolor = inject('primarycolor');
        const QRCodeDialog = ref(false);
        const qrCode = ref("");
        let sessionId = ref(`session-${uuid().substring(0, 13)}`);
        const qrloading = ref(false);
        const sessionStatus = ref("");
        const isClientReady = ref(false)
        const connectingExistingSession = ref(false)


        const socketconnected = computed(() => {
            return state.connected;
        })

        const createGetWhatsappSession = (sessionId, type) => {
            if (type == "createsession") {
                QRCodeDialog.value = true
                qrloading.value = true
            } else {
                connectingExistingSession.value = true
            }
            console.log(sessionId)
            console.log('creating session, check WS')
            socket.emit('getsession', { id: sessionId })
        }

        const saveSessionIdonAuthSuccess = async () => {
            console.log(sessionId.value);
            try {
                let response = await axios.post(`/api/Settings/SaveWhatsAppSession?session=${sessionId.value}`);
                console.log(response);
            }
            catch (err) {
                console.error(err)
            }
        }

        const getSessionIdFromBackend = async () => {
            try {
                let { data } = await axios.get("/api/Settings/GetWhatsAppSession");
                console.log(data);
                // if the response has value
                if (data) {
                    sessionId.value = data
                    createGetWhatsappSession(data, 'getsession')
                    sessionStatus.value = 'sessionReady'
                } else {
                    sessionStatus.value = 'noSession'
                }
            }
            catch (err) {
                console.error(err)
            }
        }

        watchEffect(() => {
            socket.emit('connected', 'Hello From Client')
            socket.on('hello', (data) => {
                console.log('Hello Emittted from the server', data)
            })
            socket.on('qr', (data) => {
                console.log('QR RECEIVED', data)
                const { qr } = data
                console.log(qr)
                qrloading.value = false
                qrCode.value = qr
            })

            socket.on('ready', (data) => {
                console.log('READY', data)
                isClientReady.value = true
                connectingExistingSession.value = false
                store.dispatch('communication/isWhatsappClientReady', isClientReady.value)
                // if the get endpoint returned null
                if (sessionStatus.value == 'noSession') {
                    saveSessionIdonAuthSuccess();
                }
            })

            socket.on('allchats', (data) => {
                console.log(data, 'AllChats Here 🥰🎉')
            })


            if (socketconnected.value) {
                console.log('scket cnnected')
                getSessionIdFromBackend();
            } else {
                console.log('scket  nt cnnected')
                connectingExistingSession.value = false;
                // ElMessage({
                //     type: "warn",
                //     message: "Something went wrong, please try again",
                //     duration: 5000,
                // });
            }

        })

        const proceedAction = () => {
            QRCodeDialog = false
            if (route.fullPath == '/tenant/whatsapp/auth') {
                router.push('/tenant/whatsapp')
            }
        }



        return {
            primarycolor,
            QRCodeDialog,
            qrCode,
            createGetWhatsappSession,
            sessionId,
            qrloading,
            isClientReady,
            socketconnected,
            connectingExistingSession,
            proceedAction
        }
    }
}
</script>

<style scoped>
.send-text {
    color: #124191;
    font-weight: 800;
}
</style>