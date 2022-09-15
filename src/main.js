import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import { OhVueIcon, addIcons } from "oh-vue-icons";
import { BiMoonFill, OiSearch } from "oh-vue-icons/icons";

addIcons(BiMoonFill, OiSearch);

const app = createApp(App);

app.config.globalProperties.documentBody = document.querySelector("body");

app.component("v-icon", OhVueIcon);
app.use(store);
app.use(router);
app.mount("#app");
