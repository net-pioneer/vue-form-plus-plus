import '@/assets/styles/main.scss'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import i18n from "@/composables/i18n.js";
import ToastPlugin from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-default.css';
import App from './App.vue'
import router from './router'
import useRequest from "@/composables/useRequest";
const request = useRequest;
const app = createApp(App)

const req = new request.Request();
app.provide<useRequest.Request>("http", req);

app.use(router)
app.use(i18n);
app.use(createPinia())
app.use(ToastPlugin);
app.mount('#app')
