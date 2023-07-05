import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
//引入element-plus模块
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import '@/assets/css/style.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'


const app = createApp(App)
app.use(ElementPlus)
app.use(store)
app.use(router)
app.mount('#app');

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }