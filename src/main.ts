import { createApp } from 'vue'
import axios from 'axios'
import store from './store'
import router from './router'
import App from './App.vue'

axios.defaults.baseURL = 'http://apis.imooc.com/api/'
axios.interceptors.request.use(config => {
  config.params = { ...config.params, icode: '39AAC8BEC555A23F' }
  if (config.data instanceof FormData) {
    config.data.append('icode', '39AAC8BEC555A23F')
  } else {
    config.data = { ...config.data, icode: '39AAC8BEC555A23F' }
  }
  return config
})

axios.interceptors.request.use(config => {
  store.commit('setLoading', true)
  store.commit('setError', { status: false, message: '' })
  return config
})

axios.interceptors.response.use(config => {
  setTimeout(() => {
    store.commit('setLoading', false)
  }, 1000)
  return config
}, e => {
  const { error } = e.response.data
  store.commit('setError', { status: true, message: error })
  store.commit('setLoading', false)

  return Promise.reject(error)
})

const app = createApp(App)
app.use(router)
app.use(store)
app.mount('#app')
