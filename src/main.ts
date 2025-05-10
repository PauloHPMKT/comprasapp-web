import { createApp } from 'vue'
import { router } from './routes/create-router'
import './style.css'
import App from './App.vue'

const app = createApp(App)
app.use(router)

app.mount('#app')
