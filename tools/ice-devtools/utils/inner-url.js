const debug = require('debug')('ice:util:inner-url');
const FUSION_DESIGN_DAILY_URL = 'https://fusion.alibaba.net';
const FUSION_DESIGN_PRE_URL = 'https://pre-fusion.alibaba-inc.com';
const FUSION_DESIGN_URL = 'https://fusion.alibaba-inc.com';

const URLS = {
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
