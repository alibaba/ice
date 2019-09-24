import { controller, provide, post } from 'midway-mirror';
import * as request from 'request-promise-native';

@provide()
@controller('/api/goldlog')
export class GoldlogController {

  @post('/record')
  public async record(ctx) {
    if (ctx.request.body) {
      const data = ctx.request.body;
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

      try {
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
      } catch (error) {
        error.name = 'goldlog-error';
        ctx.logger.error(error);
      }
    }

    ctx.body = {
      success: true,
    };
  }
};
