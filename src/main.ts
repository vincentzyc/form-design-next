import { createApp } from 'vue'
import App from './App'
import store from './store'
import Element from './plugins/element'

import '@/assets/css/base.css'

createApp(App).use(store).use(Element).mount('#app')
