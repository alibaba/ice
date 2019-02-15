const request = require('request');
const debug = require('debug')('ice:site');
const inquirer = require('inquirer');
const chalk = require('chalk');
const pkg = require('./pkg-json');
const logger = require('./logger');
const tokenUtil = require('./token');
const getUrl = require('./inner-url');

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
    console.log(chalk.green(`sync to fusion.alibaba-inc.com site ${site.name}`));
    return site;
  }
  return null;
}


function writeLocalSite(cwd, site) {
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
      request(options, function (err, res, body) {
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
    if (!sites || !sites.length) {
      console.log();
      console.log();
      console.log('获取站点失败。您可以自己创建一个站点或者请其他站点把您添加为成员');
      console.log(`创建站点文档: ${chalk.yellow('https://fusion.alibaba-inc.com/help.html#/dev-create-site')}`);
      console.log(`添加成员文档: ${chalk.yellow('https://fusion.alibaba-inc.com/help.html#/site-user-management')}`);
      console.log();
      console.log();
    }
  } catch (error) {
    const { response } = error;
    if (response && (response.statusCode === 401 || response.statusCode === 403)) {
      console.log();
      console.log();
      console.log('鉴权失败,请前往 https://fusion.alibaba-inc.com 重新获取Token 或 请站点所有者把你添加为站点成员.');
      console.log(`Token文档: ${chalk.yellow('https://fusion.alibaba-inc.com/help.html#/dev-create-site')}`);
      console.log(`添加成员文档: ${chalk.yellow('https://fusion.alibaba-inc.com/help.html#/site-user-management')}`);
      response.success === false && console.log(`错误信息: ${chalk.red(response.message)}`);
      console.log();
      console.log();
      tokenUtil.clearToken();
    } else {
      logger.fatal(error);
    }
  }

  return sites;
}

function TokenFirstLyMessage() {
  console.log();
  console.log();
  console.log(`如果这是你第一次使用该功能,或者不知道如何获取Token。\n请查看文档: ${chalk.yellow('https://fusion.alibaba-inc.com/help.html#/dev-create-site')}`);
  console.log();
  console.log();
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
    console.log();
    console.log(chalk.green('已从packge.json中,获取Fusion站点....'));
    console.log();
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

