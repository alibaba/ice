const inquirer = require('inquirer');
const chalk = require('chalk');
const request = require('request-promise-native');
const ora = require('ora');
const _ = require('lodash');
const log = require('../../lib/log');

class FusionSDK {
  constructor(options) {
    this.syncToAli = options.syncToAli;
    this.fusionHost = this.syncToAli ? 'https://fusion.alibaba-inc.com' : 'https://fusion.design';
  }

  async getToken() {
    const helpUrl = `${this.fusionHost}/help.html#/dev-create-site`;
    console.log();
    console.log(`如果这是你第一次使用该功能，或者不知道如何获取Token。\n请查看文档: ${chalk.yellow(helpUrl)}`);
    console.log();

    const { token } = await inquirer.prompt([
      {
        name: 'token',
        message: `Please input your ${this.fusionHost} token: `,
        validate(value) {
          if (!value) {
            return 'token cannot be empty';
          }
          return true;
        },
        filter(value) {
          return value.trim();
        },
      },
    ]);

    return token;
  }

  async getSite(token) {
    const options = {
      method: 'GET',
      uri: `${this.fusionHost}/api/v1/mysites`,
      headers: {
        'x-auth-token': token,
      },
      json: true,
      followRedirect: false,
    };

    log.verbose('fetch fusion sites start', options);
    const { body } = await requestFusion(options, this.fusionHost);
    log.verbose('fetch fusion sites success', body);

    const sites = body.data;

    if (!body.success) {
      throw new Error(body.message || '获取站点列表接口异常');
    }

    if (!sites || !sites.length) {
      console.log();
      console.log();
      console.log('获取站点失败。您可以自己创建一个站点或者请其他站点把您添加为成员');
      console.log(`创建站点文档: ${chalk.yellow(`${this.fusionHost}/help.html#/dev-create-site`)}`);
      console.log(`添加成员文档: ${chalk.yellow(`${this.fusionHost}/help.html#/site-user-management`)}`);
      console.log();
      console.log();
      throw new Error(body.message || '站点列表为空');
    }

    const { site } = await inquirer.prompt([
      {
        type: 'list',
        name: 'site',
        message: 'Please select your site:',
        choices: sites.map((item) => ({
          value: item,
          name: item.name,
        })),
      },
    ]);

    return {
      id: site.id,
      name: site.name,
      url: `${this.fusionHost}/api/v1/sites/${site.id}/materials`,
    };
  }

  async uploadMaterialsData(fusionToken, fusionSite, materialsData) {
    const url = `${this.fusionHost}/api/v1/sites/${fusionSite.id}/materials`;
    const total = materialsData.length;
    let index = 0;

    const uploadMatetial = async (materialData) => {
      const getData = (materialType) => {
        return materialData.filter(item => item.type === materialType).map(item => `${item.npm}@${item.version}`);
      };

      const data = {
        blocks: getData('block'),
        scaffolds: getData('scaffold'),
        components: getData('component'),
      };

      const { body } = await requestFusion({
        url,
        body: data,
        headers: {
          'x-auth-token': fusionToken,
        },
        method: 'PATCH',
        json: true,
      }, this.fusionHost);

      if (!body.success) {
        (body.data || []).forEach((fail) =>
          log.error(`物料 ${fail.npm} 上传失败, 原因: ${fail.reason}`)
        );
        throw new Error('物料上传失败');
      }
    };

    const spinner = ora(`Sync to ${url}, Now: 0/${total}`).start();
    try {
      const concurrency = 4; // 每次请求同步的物料个数
      const groupData = _.chunk(materialsData, concurrency);

      // eslint-disable-next-line no-restricted-syntax
      for (const groupItem of groupData) {
        // eslint-disable-next-line no-await-in-loop
        await uploadMatetial(groupItem);
        index += concurrency;
        spinner.text = `Sync to ${url}, Now: ${index}/${total}`;
      }
      spinner.succeed(`物料上传完成！`);

      // 访问物料的地址
      return url;
    } catch(err) {
      spinner.fail('物料上传失败！');
      throw err;
    }
  }

};

module.exports = FusionSDK;

async function requestFusion(options, fusionHost) {
  try {
    options = {
      ...options,
      resolveWithFullResponse: true,
    };

    const response = await request(options);
    return response;
  } catch(err) {
    if (err.statusCode && (err.statusCode === 403 || err.statusCode === 401)) {
      err.noAuth = true;
      console.log();
      console.log();
      console.log(`鉴权失败，请前往 ${fusionHost} 重新获取 token 或 请站点所有者把你添加为站点成员。`);
      console.log(`token 文档: ${chalk.yellow(`${fusionHost}/help.html#/dev-create-site`)}`);
      console.log(`添加成员文档: ${chalk.yellow(`${fusionHost}/help.html#/site-user-management`)}`);
      if (err.response.success === false) {
        console.log(`错误信息: ${chalk.red(err.response.message)}`);
      }
      console.log();
      console.log();
    }

    throw err;
  }
}
