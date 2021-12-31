import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import Element from './plugins/element'
import mitt from 'mitt';
import { createPinia } from 'pinia'

import '@/assets/css/base.css'
import '@/assets/css/index.styl';
import '@/assets/css/widget.styl';
import '@/assets/css/config.styl';
import '@/assets/css/themes.styl';

const app = createApp(App)

const emitter = mitt();

app.config.globalProperties.$bus = emitter

app.config.globalProperties.BASE_URL = process.env.BASE_URL

app.use(createPinia()).use(store).use(Element).mount('#app')
