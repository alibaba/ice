import axios from 'axios'

axios.interceptors.response.use(res => {
  return res.data
}, err => {
  return Promise.reject(err)
})

export default {
  install (Vue, options) {
    Vue.prototype.$axios = axios
  }
}
