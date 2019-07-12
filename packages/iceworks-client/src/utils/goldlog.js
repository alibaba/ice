import axios from 'axios';
import dateTime from 'date-time';
import browser from 'browser-detect';
import appConfig from '../appConfig';

const UA = browser();

function goldlog(data = {}) {
  // eslint-disable-next-line @typescript-eslint/camelcase
  data.visit_time = dateTime();
  data.UA = UA;

  return axios({
    method: 'post',
    url: `${appConfig.apiUrl}goldlog/record`,
    data,
  });
}

export default goldlog;
