import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import { BootstrapVue3 } from 'bootstrap-vue-3'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css'
import 'vazir-font/dist/Farsi-Digits/font-face-FD.css'
import 'vazir-font/dist/font-face.css'

import { defineRule, configure } from "vee-validate";
import { required, email, min, length } from "@vee-validate/rules";
import fa from "@vee-validate/i18n/dist/locale/fa.json";
import {localize} from "@vee-validate/i18n";

defineRule("required", required);
defineRule("email", email);
defineRule("min", min);
defineRule("length", length);
defineRule("mobile", (value) => {
    // Field is empty, should pass
    if (!value || !value.length) {
        return true;
    }
    if (!(/^(09)\d{9}$/.test(value))) {
        return  'فرمت شماره همراه صحیح نیست'
    }
    return true;
});
defineRule("numeric", (value) => {
    // Field is empty, should pass
    if (!value || !value.length) {
        return true;
    }
    if  (!(/^[\u06F0-\u06F90-9]+$/.test(value))) {
        return  'این فیلد باید از نوع عدد باشد'
    }
    return true;
});

configure({
    generateMessage: localize({
        // en: {
        //     messages: en.messages,
        // },
        fa: {
            messages: fa.messages,
            names: {
                firstName: "نام",
                lastName: "نام خانوادگی",
                mobile: "تلفن همراه",
                phone: "تلفن ثابت",
                address: "آدرس",
                gender: "جنسیت"
            }
        },
    }),
});

const app = createApp(App)
app.use(router)
app.use(BootstrapVue3)
app.mount('#app')
