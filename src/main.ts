import { createApp } from 'vue'
import { router } from './routes/create-router'
import { makeCreateUserProvider } from './services/shared/providers/user-provider'
import './style.css'
import App from './App.vue'

const createUserProvider = makeCreateUserProvider()

const app = createApp(App)
app.use(router)

app.provide('createUserProvider', createUserProvider)
app.mount('#app')
