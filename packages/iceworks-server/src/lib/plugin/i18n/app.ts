import * as _ from 'lodash';
import * as path from 'path';
import * as fs from 'fs-extra';
import storage from '../../storage';
import { II18n } from '../../../interface';
import recursiveReaddir from '../../recursiveReaddir';

import * as zhCNGlobal from '../../../locale/zh-CN.json';
import * as enUSGlobal from '../../../locale/en-US.json';

const ADAPTER_PATH = path.resolve(__dirname, '../../adapter');

class I18n implements II18n {
  localeMap: {
    [key: string]: object
  };
  constructor() {
    this.localeMap = {
      'zh-CN': zhCNGlobal,
      'en-US': enUSGlobal
    };
  }

  // read locale json file in adapter/**/locale
  async ready() {
    let localeFiles: string[] = await recursiveReaddir(ADAPTER_PATH);

    localeFiles = localeFiles.filter(file => {
      return _.includes(file, 'locale') && path.extname(file) === '.json';
    });

    for (const file of localeFiles) {
      const name = path.basename(file, '.json');
      const content = await fs.readJSON(file);

      this.localeMap[name] = Object.assign({}, this.localeMap[name], content);
    }

    console.log(this.localeMap['zh-CN']);
  }

  public format(localeKey: string, args?: object): string {
    const localeConfig = storage.get('locale');

    const localeTemplate = this.localeMap[localeConfig][localeKey];

    // template replace regex, example: 'hello { user }'
    _.templateSettings.interpolate = /{([\s\S]+?)}/g;
    return _.template(localeTemplate)(args);
  }
}

export default (app) => {
  app.i18n = new I18n();
  app.beforeStart(async () => {
    await app.i18n.ready();
  });
};
