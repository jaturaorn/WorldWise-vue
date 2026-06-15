import { createApp } from "vue";
import App from "./App.vue";
import { router } from "./router/index.js";
import { createPinia } from "pinia";

const pinia = createPinia();
const app = createApp(App);

// ⚡️ เคล็ดลับ: เรียก .use() แยกกันทีละปลั๊กอินเพื่อให้เปิดใช้งานได้ครบถ้วน
app.use(pinia);
app.use(router);

app.mount("#app");
