import Vue from 'vue'
import axios from 'axios'

axios.interceptors.response.use(res => res.data, err => Promise.reject(err))

Vue.prototype.$axios = axios
