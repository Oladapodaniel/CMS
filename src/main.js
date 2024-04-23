import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/store'
import Highcharts from 'highcharts';
import VueHighcharts from 'vue-highcharts';
import loadFunnel from 'highcharts/modules/funnel';
import ElementPlus from 'element-plus'
import i18n from './i18n';
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import 'element-plus/theme-chalk/display.css'
import axios from "./gateway/backendapi";
import NProgress from "nprogress";
import CKEditor from '@ckeditor/ckeditor5-vue';
import Toaster from '@meforma/vue-toaster';
// import VueTelInput from 'vue3-tel-input'
// import 'vue3-tel-input/dist/vue3-tel-input.css'
import VueTelInput from 'vue-tel-input';
import 'vue-tel-input/dist/vue-tel-input.css';
// import "./styles/index.scss";
import * as Sentry from "@sentry/vue";

const VueTelInputOptions = {
  mode: "international",
  dropdownOptions: {
    showSearchBox: true,
    showDialCodeInSelection: true,
    disabled: false
    // showFlags: false
  }
  // onlyCountries: ['NG', 'GH', "GB", "US", "CA"]
}

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
import Editor from 'primevue/editor';
import SelectButton from 'primevue/selectbutton';
import ToastService from 'primevue/toastservice';
import ConfirmationService from 'primevue/confirmationservice';
import 'primevue/resources/themes/saga-blue/theme.css'       //theme
import 'primevue/resources/primevue.min.css'                 //core css
import 'primeicons/primeicons.css'                          //icons

import VueGtag from "vue-gtag-next";
import VueLazyloadNext from 'vue-lazyload-next'
import loadimage from './assets/loading.gif';
import errorimage from './assets/file-not-found.png';


NProgress.configure({ showSpinner: false });
axios.interceptors.request.use((config) => {
  if (typeof window === 'undefined') return config;
  const token = localStorage.getItem('token');
  const checkinToken = localStorage.getItem('checkinToken');

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  // config.headers.Authorization = `Bearer ${process.env.VUE_APP_PAYSTACK_SECRET_KEY}`
  /*eslint no-undef: "warn"*/
  NProgress.start()
  return config;
})

// before a response is returned stop nprogress
axios.interceptors.response.use(response => {
  NProgress.done()
  return response
}, error => {
  console.log(error, "there is the error path")
  NProgress.done()
  if (error && error.response && error.response.status == 403) {
    router.push('/errorpage/unauthorized')
  } else {
    return Promise.reject(error)
  }
})


const app = createApp(App);

app.use(VueGtag, {
  property: {
    id: "G-YNZ7GTSYZV"
    // id: "UA-123456-7"
  }
})

app
  .use(
    VueLazyloadNext,
    {
      preLoad: 1.3,
      error: errorimage,
      loading: loadimage,
      attempt: 1
    }
  )
loadFunnel(Highcharts);
app.component("Toast", Toast);
app.component("Skeleton", Skeleton);
app.component("Dialog", Dialog);
app.component("Button", Button);
app.component("OverlayPanel", OverlayPanel);
app.component("SelectButton", SelectButton);
app.component("ConfirmDialog", ConfirmDialog);
app.component("SplitButton", SplitButton);
app.component("Checkbox", Checkbox);
app.component("Tag", Tag);
app.component("Editor", Editor);

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.provide('primarycolor', '#136acd')


// Sentry.init({
//   app,
//   dsn: "https://7cff418eccb8c7340141c13304c531a2@o4506353832099840.ingest.sentry.io/4506353869258752",
//   integrations: [
//     new Sentry.BrowserTracing({
//       // Set 'tracePropagationTargets' to control for which URLs distributed tracing should be enabled
//       tracePropagationTargets: ["localhost", /^https:\/\/yourserver\.io\/api/],
//       routingInstrumentation: Sentry.vueRouterInstrumentation(router),
//     }),
//     new Sentry.Replay(),
//   ],
//   // Performance Monitoring
//   tracesSampleRate: 1.0, // Capture 100% of the transactions
//   // Session Replay
//   replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
//   replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
// });



app.use(store).use(router).use(VueHighcharts, { Highcharts }).use(CKEditor).use(i18n()).use(Toaster).use(PrimeVue).use(ToastService).use(ConfirmationService).use(ElementPlus).use(VueTelInput, VueTelInputOptions).mount('#app')
