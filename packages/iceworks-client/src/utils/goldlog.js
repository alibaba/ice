/* eslint no-param-reassign:0 */
import axios from 'axios';
import dateTime from 'date-time';
import browser from 'browser-detect';
import appConfig from '../appConfig';

const browserInfo = browser();

function goldlog(data = {}) {
  data.data.visit_time = dateTime();
  data.data.browser_info = browserInfo;

  return axios({
    method: 'post',
    url: `${appConfig.apiUrl}goldlog/record`,
    data: { ...data },
  });
}

export default goldlog;
