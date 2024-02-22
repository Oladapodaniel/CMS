import { nextTick } from 'vue';
// import axio from 'axios';
import { createI18n } from 'vue-i18n';
// import axios from "@/gateway/backendapi";

let i18n;

export const SUPPORT_LOCALES = [navigator.language || navigator.userLanguage];

export function setI18nLanguage(locale) {
    console.log(locale, 'jjjj');
    loadLocaleMessages(locale);

    if (i18n.mode === 'legacy') {
        i18n.global.locale = locale;
    } else {
        i18n.global.locale.value = locale;
    }

    document.querySelector('html').setAttribute('lang', locale);
    localStorage.setItem('lang', locale);
}

export async function loadLocaleMessages(locale) {
    // load locale messages with dynamic import
    const messages = await import(
    /* webpackChunkName: "locale-[request]" */ `./locales/${locale}.json`
    );
    console.log(messages, 'jjjhhk');

    // set locale and locale message
    i18n.global.setLocaleMessage(locale, messages.default);

    return nextTick();
}

export default function setupI18n() {
    if (!i18n) {
        let locale = localStorage.getItem('lang') || "en-US";

        i18n = createI18n({
            globalInjection: true,
            legacy: false,
            locale: locale,
            fallbackLocale:  navigator.language ? navigator.language : "en-US" 
        });

        setI18nLanguage(locale);
    }
    return i18n;
}