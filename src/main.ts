import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { Quasar, LocalStorage, Notify, Dialog } from 'quasar'
import router from './router/index'
import App from './App.vue'

// Import Quasar css
import '@quasar/extras/material-icons/material-icons.css'
import 'quasar/src/css/index.sass'

// Import custom styles
import './assets/styles/main.scss'

const app = createApp(App)

// Use Pinia for state management
app.use(createPinia())

// Use Vue Router
app.use(router)

// Use Quasar with plugins
app.use(Quasar, {
  plugins: {
    LocalStorage,
    Notify,
    Dialog
  },
  config: {
    notify: {
      position: 'top-right',
      timeout: 2500
    }
  }
})

app.mount('#app')

