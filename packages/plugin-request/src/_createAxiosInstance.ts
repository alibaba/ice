// just for plugin local tsc build
// @ts-ignore
import { axios } from '@ice/runtime/axios';

const axiosInstance = {
  default: axios.create({})
};

// eslint-disable-next-line
function createAxiosInstance(instanceName?: string) {
  return axiosInstance;
}

export default createAxiosInstance;
