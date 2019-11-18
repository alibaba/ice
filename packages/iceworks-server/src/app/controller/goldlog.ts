import { controller, provide, post } from 'midway-mirror';
import storage from '../../lib/storage';
import goldlog from '../../lib/goldlog';

const { checkAliInternal } = require('ice-npm-utils');
const packageJSON = require('../../../package.json');

@provide()
@controller('/api/goldlog')
export class GoldlogController {

  @post('/record')
  public async record(ctx) {
    if (ctx.request.body) {
      const data = ctx.request.body;
      await goldlog(data);
    }

    ctx.body = {
      success: true,
    };
  }

  @post('/dau')
  public async dau(ctx) {
    const isAlibaba = await checkAliInternal();
    const nowtDate = new Date().toDateString();

    const dauKey = 'lastDate3';
    const lastDate = storage.get(dauKey);
    const locale = storage.get('locale');
    const theme = storage.get('theme');
    if(nowtDate !== lastDate) {
      storage.set(dauKey, nowtDate);
      await goldlog({
        namespace: 'home',
        module: 'log',
        action: 'dau',
        data: {
          group: isAlibaba ? 'alibaba' : 'outer',
          locale,
          theme,
          version: packageJSON.version,
        },
      });
    }

    ctx.body = {
      success: true,
    };
  }
};
