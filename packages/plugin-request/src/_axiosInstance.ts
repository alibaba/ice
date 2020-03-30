import axios from 'axios';

const DEFAULE_CONFIG = {};

const axiosInstance = axios.create(DEFAULE_CONFIG);

export default axiosInstance;
