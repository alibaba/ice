import axios from 'axios';

const axiosInstance = {
  default: axios.create({})
};

// eslint-disable-next-line
function createAxiosInstance(instanceName?: string) {
  return axiosInstance
}

export default createAxiosInstance;
