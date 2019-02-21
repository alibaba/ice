const debug = require('debug')('ice:util:url');
const FUSION_DESIGN_LOCAL_URL = 'http://127.0.0.1:7001'
const FUSION_DESIGN_DAILY_URL = 'https://fusion.taobao.net';
const FUSION_DESIGN_PRE_URL = 'https://pre-www.fusion.design';
const FUSION_DESIGN_URL = 'https://fusion.design';

const URLS = {
  local: {
    fusionDesignUrl: FUSION_DESIGN_LOCAL_URL,
  },
  daily: {
    fusionDesignUrl: FUSION_DESIGN_DAILY_URL,
  },
  pre: {
    fusionDesignUrl: FUSION_DESIGN_PRE_URL,
  },
  prod: {
    fusionDesignUrl: FUSION_DESIGN_URL,
  },
};

let url;
module.exports = function getUrl() {
  if (url) {
    return url;
  }
  const {ENV} = process.env;
  url = URLS[ENV];
  if (!url) {
    url = URLS.prod;
  }
  debug('url: %j', url);
  return url;
}
