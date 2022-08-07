import { createApp } from 'vue'
import { VueColor } from '../../src'
import App from './App.vue'

import '@unocss/reset/tailwind.css'
import './styles/main.css'
import 'uno.css'
import '../../src/styles/common.css'
import '../../src/styles/sketch.css'
import '../../src/styles/chrome.css'

const app = createApp(App)
app.use(VueColor)
app.mount('#app')
