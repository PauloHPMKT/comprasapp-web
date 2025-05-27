import { createApp } from 'vue'
import { router } from './routes/create-router'
import App from './App.vue'
import { makeCreateUserProvider } from './services/shared/providers/user-provider'
import { makeCreateCategoryService, makeGetCategoriesService } from './services/shared/providers/category-provider'
import './style.css'

const createUserProvider = makeCreateUserProvider()
const createCategoryProvider = makeCreateCategoryService()
const getCategoriesProvider = makeGetCategoriesService()

const app = createApp(App)
app.use(router)

app.provide('createUserProvider', createUserProvider)
app.provide('createCategoryProvider', createCategoryProvider)
app.provide('getCategoriesProvider', getCategoriesProvider)

app.mount('#app')
