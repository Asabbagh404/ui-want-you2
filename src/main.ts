import "./assets/main.css";

import { createApp } from "vue";
import { createPinia } from "pinia";
import "primeicons/primeicons.css";

import App from "./App.vue";
import router from "./router";
import PrimeVue from "primevue/config";
import { globalComponents } from "./components/design-system/index";

const app = createApp(App);

app.use(createPinia());
app.use(router).use(PrimeVue, {
  unstyled: true
});

Object.entries(globalComponents).forEach(([name, component]) => {
  app.component(name, component);
});

app.mount("#app");
