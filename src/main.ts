import { createApp } from 'vue'
import axios from 'axios'
import store from './store'
import router from './router'
import App from './App.vue'

axios.defaults.baseURL = 'http://apis.imooc.com/api/'
axios.interceptors.request.use(config => {
  config.params = { ...config.params, icode: '29DF160C5591C9FE' }
  if (config.data instanceof FormData) {
    config.data.append('icode', '29DF160C5591C9FE')
  } else {
    config.data = { ...config.data, icode: '29DF160C5591C9FE' }
  }
  return config
})
axios.interceptors.request.use(config => {
  store.commit('setLoading', true)
  return config
})
axios.interceptors.response.use(config => {
  setTimeout(() => {
    store.commit('setLoading', false)
  }, 2000)
  return config
})

const app = createApp(App)
app.use(router)
app.use(store)
app.mount('#app')
