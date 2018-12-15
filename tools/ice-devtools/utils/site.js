const request = require('request');
const debug = require('debug')('ice:site');
const inquirer = require('inquirer');
const chalk = require('chalk');
const pkg = require('./pkg-json');
const logger = require('./logger');
const tokenUtil = require('./token');
const getUrl = require('./url');

const SITE_URL = getUrl().fusionDesignUrl;
const SITES_URL = `${SITE_URL}/api/v1/mysites`;
const AUTH_HEADER_KEY = 'x-auth-token';

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

function getLocalSite(cwd) {
  const pkgJSON = pkg.getPkgJSON(cwd);
  if (!pkgJSON.materialConfig) {
    logger.fatal('not materialConfig in package.json');
  }
  // 读取到 fusion-site 字段 如果读到了就直接返回
  if (pkgJSON.materialConfig && pkgJSON.materialConfig['fusion-site']) {
    const site = pkgJSON.materialConfig['fusion-site'];
    console.log(chalk.green(`sync to fusion.design site ${site.name}`));
    return site;
  }
  return null;
}


function writeLocalSite (cwd, site) {
  const pkgJSON = pkg.getPkgJSON(cwd);
  const siteData = {
    id: site.id,
    name: site.name,
    url: `${SITE_URL}/api/v1/sites/${site.id}/materials`,
  };
  pkgJSON.materialConfig['fusion-site'] = siteData;

  pkg.writePkgJSON(pkgJSON, cwd);

  return siteData;
}

async function fetchSites(token) {
  const options = {
    method: 'GET',
    uri: SITES_URL,
    headers: {
      [AUTH_HEADER_KEY]: token,
    },
    json: true,
    followRedirect: false,
  };
  // 读取到 sites字段让用户选择
  let sites;
  try {
    sites = await new Promise((resl, reject) => {
      request(options, function(err, res, body) {
        if (err) {
          console.err(err);
          reject(err);
          return;
        }

        if (res.statusCode !== 200) {
          const err = new Error(`Response Code: ${res.statusCode}`);
          err.response = res;
          err.statusCode = res.statusCode;
          debug('res: %j\n%j', res, options);
          reject(err);
          return;
        }
        if (!body.success) {
          const err = new Error('Response Body Not success');
          err.response = body;
          debug('body: %j\n%j', body, options);
          reject(err);
          return;
        }
        resl(body.data);
      });
    });
  } catch (error) {
    const { response } = error;
    if (response && (response.statusCode === 401 || response.statusCode === 403 || response.success === false)) {
      console.log();
      console.log(chalk.red('  token authorization fail, you can find your token at https://fusion.design'));
      tokenUtil.clearToken();
    } else {
      logger.fatal(error);
    }
  }
  return sites;
}

async function selectSite(sites) {
  // 用户选择site
  const answers = await inquirer.prompt([
    {
      type: 'list',
      name: 'site',
      message: 'Please select your site:',
      choices: sites.map((site) => ({
        value: site,
        name: site.name,
      })),
    },
  ]);

  const { site } = answers;
  return site;
}

async function getSite(cwd, token) {

  let site = getLocalSite(cwd);
  // 有则直接用本地的site
  if (site) {
    return site;
  }

  const sites = await fetchSites(token);
  if (!sites) {
    return;
  }

  site = await selectSite(sites);

  return writeLocalSite(cwd, site);;
}

module.exports = {
  getSite, getLocalSite, writeLocalSite,
};

