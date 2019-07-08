/* eslint no-param-reassign:0 */
import axios from 'axios';
import dateTime from 'date-time';
import browser from 'browser-detect';
import appConfig from '../appConfig';

const UA = browser();

function goldlog(data = {}) {
  data.visit_time = dateTime();
  data.UA = UA;

  return axios({
    method: 'post',
    url: `${appConfig.apiUrl}goldlog/record`,
    data,
  });
}

export default goldlog;
