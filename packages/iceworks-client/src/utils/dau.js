import axios from 'axios';
import dateTime from 'date-time';
import browser from 'browser-detect';
import logger from '@utils/logger';
import appConfig from '../appConfig';

const UA = browser();

function dau(data = {}) {
  logger.info('log dau');

  // eslint-disable-next-line @typescript-eslint/camelcase
  data.visit_time = dateTime();
  data.UA = UA;

  return axios({
    method: 'post',
    url: `${appConfig.apiUrl}goldlog/dau`,
    data,
  });
}

let hidden;
let visibilityChange;
if (typeof document.hidden !== 'undefined') { // Opera 12.10 and Firefox 18 and later support
  hidden = 'hidden';
  visibilityChange = 'visibilitychange';
} else if (typeof document.msHidden !== 'undefined') {
  hidden = 'msHidden';
  visibilityChange = 'msvisibilitychange';
} else if (typeof document.webkitHidden !== 'undefined') {
  hidden = 'webkitHidden';
  visibilityChange = 'webkitvisibilitychange';
}

function handleVisibilityChange() {
  if (!document[hidden]) {
    dau();
  }
}

export default function() {
  dau();

  if (typeof document.addEventListener !== 'undefined') {
    document.addEventListener(visibilityChange, handleVisibilityChange, false);
  }

  if (typeof window.addEventListener !== 'undefined') {
    window.addEventListener('focus', handleVisibilityChange);
  }
};
