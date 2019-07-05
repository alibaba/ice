import { controller, provide, post } from 'midway';
import * as rp from 'request';

@provide()
@controller('/api/goldlog')
export class GoldlogController {

    @post('/record')
    async record(ctx) {
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

        await rp({
          method: 'post',
          url: 'http://gm.mmstat.com/iceteam.iceworks.log3',
          data: {
            cache: Math.random(),
            gmkey: 'CLK',
            gokey: encodeURIComponent(gokey),
            logtype: '2',
          },
        });
        ctx.body = {
          success: true
        };
      } else {
        ctx.body = {
          success: false,
        };
      }
    }
  };
