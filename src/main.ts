import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import mitt from 'mitt';
import { createPinia } from 'pinia'

import '@/assets/css/base.css'
import '@/assets/css/index.styl';
import '@/assets/css/widget.styl';
import '@/assets/css/config.styl';
import '@/assets/css/themes.styl';

const app = createApp(App)
app.use(createPinia())

app.use(ElementPlus)

const emitter = mitt();

app.config.globalProperties.$bus = emitter

app.config.globalProperties.BASE_URL = process.env.BASE_URL

app.mount('#app')
