import axios from 'axios'

// https://github.com/axios/axios#request-config
const DEFAULE_CONFIG = {
}

const axiosInstance = axios.create(DEFAULE_CONFIG)

export default axiosInstance
