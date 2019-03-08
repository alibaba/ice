/**
 * 通过 mock api 的形式模拟实际项目中的接口
 * 可通过 mock/index.js 模拟数据，类似 express 的接口
 * 参考： https://alibaba.github.io/ice/docs/pro/mock
 */
import axios from 'axios';

export async function login(params) {
  return axios({
    url: '/api/login',
    method: 'post',
    data: params,
  });
}

export async function postUserRegister(params) {
  return axios({
    url: '/api/register',
    method: 'post',
    data: params,
  });
}

export async function postUserLogout() {
  return axios({
    url: '/api/logout',
    method: 'post',
  });
}

export async function getUserProfile() {
  return axios('/api/profile');
}

export default {
  login,
  postUserRegister,
  postUserLogout,
  getUserProfile,
};
