<template>
  <div>
    <div class="top-container">
      <div class="loading-div" :class="{ box1: processing }">
        <div class="spin-div">
          <div v-if="processing">
            <i class="loading-icon fas fa-circle-notch fa-spin"></i>
          </div>
          <div>
            <h3 @click="test">{{ navigatorLang === "en-US" ? 'Hang tight!' : $t('processRequestContent.hg-tight') }}</h3>
            <h3>{{ navigatorLang === "en-US" ? "We 're setting things up for you." : $t('processRequestContent.setting-things') }}</h3>
          </div>
        </div>
        <!-- <i class="pi pi-spinner fa-spin"></i> -->
      </div>

      <div class="desc" :class="{ box2: processing }">
        <div class="desc-details">
          <div class="desc-text mobile">
            <h4>{{ navigatorLang === "en-US" ? 'All-in-one Church management software' : $t('processRequestContent.all-in-one') }}</h4>
            <p>
              {{ navigatorLang === "en-US" ? 'Get your church administrative activities and processes automated without hassle.' : $t('processRequestContent.get-ur-church') }}
            </p>
          </div>
          <div class="image-box">
            <img src="../../assets/laptop.png" alt="" />
          </div>
          <div class="desc-text desktop">
            <h4>{{ navigatorLang === "en-US" ? 'All-in-one Church management software' : $t('processRequestContent.all-in-one') }}</h4>
            <p>
              {{ navigatorLang === "en-US" ? 'Get your church administrative activities and processes automated without hassle.' : $t('processRequestContent.get-ur-church') }}
            </p>
          </div>
          <div>
            <div class="spin-div mobile">
              <div v-if="processing">
                <i class="loading-icon fas fa-circle-notch fa-spin"></i>
              </div>
              <div class="mt-2">
                <h3 @click="test">{{ navigatorLang === "en-US" ? 'Hang tight!' : $t('processRequestContent.hg-tight') }}</h3>
                <h3>{{ navigatorLang === "en-US" ? "We 're setting things up for you." : $t('processRequestContent.setting-things') }}</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { onBeforeUnmount, onMounted, watch, ref } from "vue";
import store from "@/store/store";
import router from "@/router/index";
import { useRoute } from "vue-router";
import { useI18n } from 'vue-i18n';
import { SUPPORT_LOCALES as supportLocales, setI18nLanguage } from '../../i18n';

export default {
  beforeRouteEnter(to, from, next) {
    if (store.getters.settingUserUp) return next(true);
    return next("/next");
  },

  setup() {
    const route = useRoute();
    const userSelectedRoute = route.params.option;
    // if (userSelectedRoute.includes("%")) userSelectedRoute.replace("%", "/")
    console.log(userSelectedRoute);
    const navigatorLang = ref(navigator.language);
    
    const { locale } = useI18n({ useScope: 'global' });
    watch(locale, (val) => {
      setI18nLanguage(val);

    });

    onMounted(() => {
      // const url = store.getters.userStartPoint;
      if (route.params.option) {
        localStorage.setItem("userSetup", true);
      }
      setTimeout(() => {
        toggleProcessing();
      }, 200);
      setTimeout(() => {
        const nextRoute = route.params.option;
        // const nextRoute = userSelectedRoute.includes('add') ? `people/${userSelectedRoute}` : userSelectedRoute;
        router.push(nextRoute);
      }, 3000);
    });

    onBeforeUnmount(() => {
      store.dispatch("setUserUp", false);
    });

    const processing = ref(false);
    const toggleProcessing = () => {
      processing.value = !processing.value;
    };

    return { processing, navigatorLang };
  },
};
</script>

<style scoped>
.top-container {
  display: flex;
}

.loading-div {
  width: 55%;
  display: flex;
  transition: all 1s ease-in-out;
}

.spin-div {
  width: 80%;
  margin: auto;
  text-align: center;
}

.spin-div h3 {
  font-size: 32px;
  color: #252a2f;
}

.spin-div.mobile {
  display: none;
}

.loading-icon {
  font-size: 100px;
  color: #4c39a6;
}

.desc {
  display: flex;
  width: 45%;
  height: 100vh;
  background-image: -webkit-linear-gradient(top, #2e67ce 0%, #690c7f 100%);
  transition: all 0.7s ease-in-out;
}

.desc-details {
  width: 80%;
  margin: auto;
}

.image-box img {
  width: 100%;
}

.desc-text {
  text-align: center;
  color: #fff;
}

.desc-text h4 {
  font-size: 20px;
}

.desc-text.mobile {
  display: none;
}

@media screen and (min-width: 601px) {
  .box1 {
    transform: translateX(80%);
  }

  .box2 {
    transform: translateX(-127%);
  }
}

@media screen and (max-width: 600px) {
  .desc {
    width: 100%
  }

  .loading-div.box1 {
    display: none;
  }

  .loading-div {
    width: 100%;
  }

  .spin-div {
    margin: 40px auto;
  }

  .spin-div.mobile {
    display: block;
  }

  .loading-icon {
    color: #B2F3F6;
  }

  .spin-div h3 {
    font-size: 32px;
    color: #ffffff;
  }

  .desc-text.mobile {
    display: block;
  }

  .desc-text.desktop {
    display: none;
  }

}

@media screen and (max-width: 460px) {
  .spin-div h3 {
    font-size: 20px;
  }

  .loading-icon {
    font-size: 60px;
  }
}

@media screen and (min-width: 1300px) {
  .desc-text h4 {
    font-size: 30px;
  }
}
</style>