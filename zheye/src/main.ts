import { createApp } from 'vue'
import axios from 'axios'
import router from './router'
import store from './store'

import App from './App.vue'
// 替换 baseURL
axios.defaults.baseURL = 'http://apis.imooc.com/api/'
axios.interceptors.request.use(config => {
  // get 请求，添加到 url 中
  config.params = { ...config.params, icode: '784C845500E33482' }
  // 其他请求，添加到 body 中
  // 如果是上传文件，添加到 FormData 中
  if (config.data instanceof FormData) {
    config.data.append('icode', '784C845500E33482')
  } else {
  // 普通的 body 对象，添加到 data 中
    config.data = { ...config.data, icode: '784C845500E33482' }
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
  }, 200)
  return config
})

axios.get('/columns').then(res => {
  console.log(res.data)
})

const app = createApp(App)
app.use(router)
app.use(store)
app.mount('#app')
