// just for plugin local tsc build
import { axios } from '@ice/runtime';

const axiosInstance = {
  default: axios.create({})
};

// eslint-disable-next-line
function createAxiosInstance(instanceName?: string) {
  return axiosInstance;
}

export default createAxiosInstance;
