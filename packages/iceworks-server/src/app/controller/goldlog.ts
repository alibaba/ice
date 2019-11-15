import { controller, provide, post } from 'midway-mirror';
import * as request from 'request-promise-native';
import storage from '../../lib/storage';

const { checkAliInternal } = require('ice-npm-utils');

async function record(data) {
  const dataKeyArray = Object.keys(data);
  const gokey = dataKeyArray.reduce((finnalStr, currentKey, index) => {
    const currentData =
        typeof data[currentKey] === 'string'
          ? data[currentKey]
          : JSON.stringify(data[currentKey]);
    return `${finnalStr}${currentKey}=${currentData}${
      dataKeyArray.length - 1 === index ? '' : '&'
    }`;
  }, '');

  await request({
    method: 'post',
    url: 'http://gm.mmstat.com/iceteam.iceworks.log3',
    json: true,
    body: {
      cache: Math.random(),
      gmkey: 'CLK',
      gokey: encodeURIComponent(gokey),
      logtype: '2',
    },
  });
}

@provide()
@controller('/api/goldlog')
export class GoldlogController {

  @post('/record')
  public async record(ctx) {
    if (ctx.request.body) {
      const data = ctx.request.body;

      try {
        await record(data);
      } catch (error) {
        error.name = 'goldlog-error';
        ctx.logger.error(error);
      }
    }

    ctx.body = {
      success: true,
    };
  }

  @post('/dau')
  public async dau(ctx) {
    const isAlibaba = await checkAliInternal();
    const nowtDate = new Date().toDateString();

    let lastDate = storage.get('lastDate');
    if(nowtDate !== lastDate) {
      storage.set('lastDate', nowtDate);
      record({
        namespace: 'home',
        module: 'log',
        action: 'dau',
        data: {
          group: isAlibaba ? 'alibaba' : 'outer',
        }
      });
    }

    ctx.body = {
      success: true,
    };
  }
};
