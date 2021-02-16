import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/store'
import Highcharts from 'highcharts';
import VueHighcharts from 'vue-highcharts';
// import axios from "axios";
import axios from "./gateway/backendapi";
// import NProgress from "nprogress";
import CKEditor from '@ckeditor/ckeditor5-vue';
import Toaster from '@meforma/vue-toaster';

import PrimeVue from 'primevue/config';
import Toast from 'primevue/toast'
import Skeleton from 'primevue/skeleton';
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';
import ConfirmDialog from 'primevue/confirmdialog';
import OverlayPanel from 'primevue/overlaypanel';
import SplitButton from 'primevue/splitbutton';
import Checkbox from 'primevue/checkbox';
import Tag from 'primevue/tag';

import ToastService from 'primevue/toastservice';
import ConfirmationService from 'primevue/confirmationservice';


import 'primevue/resources/themes/saga-blue/theme.css'       //theme
import 'primevue/resources/primevue.min.css'                 //core css
import 'primeicons/primeicons.css'                           //icons

NProgress.configure({ showSpinner: false });
axios.interceptors.request.use((config) => {
    if (typeof window === 'undefined') return config;
    const token =  localStorage.getItem('token');
  
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    /*eslint no-undef: "warn"*/
    NProgress.start()
    return config;
  })
  
  // before a response is returned stop nprogress
  axios.interceptors.response.use(response => {
    NProgress.done()
    return response
  })

// axios.defaults.baseURL = "https://churchplusv3coreapi.azurewebsites.net/";
const app = createApp(App);
app.use(store).use(router).use(VueHighcharts, { Highcharts }).use( CKEditor).use(Toaster).use(PrimeVue).use(ToastService).use(ConfirmationService).mount('#app')
// createApp(App).use(store).use(router).use(VueHighcharts, { Highcharts }).use( CKEditor).use(Toaster).use(PrimeVue).use(ToastService).mount('#app')
app.component("Toast", Toast);
app.component("Skeleton", Skeleton);
app.component("Dialog", Dialog);
app.component("Button", Button);
app.component("OverlayPanel", OverlayPanel);
app.component("ConfirmDialog", ConfirmDialog);
app.component("SplitButton", SplitButton);
app.component("Checkbox", Checkbox);
app.component("Tag", Tag);

