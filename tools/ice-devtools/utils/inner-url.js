const debug = require('debug')('ice:util:inner-url');
const FUSION_DESIGN_LOCAL_URL = 'aHR0cDovLzEyNy4wLjAuMTo3MDAx'
const FUSION_DESIGN_DAILY_URL = 'aHR0cHM6Ly9mdXNpb24uYWxpYmFiYS5uZXQ=';
const FUSION_DESIGN_PRE_URL = 'aHR0cHM6Ly9wcmUtZnVzaW9uLmFsaWJhYmEtaW5jLmNvbQ==';
const FUSION_DESIGN_URL = 'aHR0cHM6Ly9mdXNpb24uYWxpYmFiYS1pbmMuY29t';

function base64ToAscii(str) {
  return Buffer.from(str, 'base64').toString('ascii');
}

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
  debug('url before decode: %j', url);
  url.fusionDesignUrl = base64ToAscii(url.fusionDesignUrl);
  debug('url: %j', url);
  return url;
}
