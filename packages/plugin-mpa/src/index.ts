import * as path from 'path';
import * as fs from 'fs-extra';
import { getMpaEntries } from '@builder/app-helpers';
import setMPAConfig from '@builder/mpa-config';
import { IPlugin } from '@alib/build-scripts';

const plugin: IPlugin = (api) => {
  const { context, registerUserConfig, registerCliOption, modifyUserConfig, onGetWebpackConfig, log } = api;
  const { rootDir, userConfig, commandArgs } = context;
  const { mpa } = userConfig;

  // register mpa in build.json
  registerUserConfig({
    name: 'mpa'
  });

  // support --mpa-entry to specify mpa entry
  registerCliOption({
    name: 'mpa-entry',
    commands: ['start'],
  });

  if (mpa) {
    const mpaEntries = getMpaEntries(api);
    let entries = mpaEntries.reduce((acc, { entryName, entryPath }) => {
      return {
        ...acc,
        [entryName]: `src/pages/${entryPath}`
      };
    }, {});

    const finalEntries = {};
    if (commandArgs.mpaEntry) {
      const arr = commandArgs.mpaEntry.split(',');
      arr.forEach((pageName) => {
        const entryName = pageName.toLocaleLowerCase();
        if (entries[entryName]) {
          finalEntries[entryName] = entries[entryName];
        }
      });
      if (Object.keys(finalEntries).length > 0) {
        entries = finalEntries;
        log.info('已启用 --map-entry 指定多页入口 \n', JSON.stringify(entries));
      } else {
        log.warn(`--map-entry ${commandArgs.entry}`, '未能匹配到指定入口');
      }
    } else {
      log.info('使用多页面模式 \n', JSON.stringify(entries));
    }

    // set page template
    onGetWebpackConfig(config => {
      // setMPAConfig(config, { context, entries: mpaEntries, framework: 'react' });
      if (typeof mpa === 'object' && (mpa as any).template) {
        setPageTemplate(rootDir, entries, (mpa as any).template, config);
      }
    });
    console.log(entries);
    // modify entry
    modifyUserConfig('entry', entries);
  }
};

function setPageTemplate(rootDir, entries, template = {}, config) {
  const templateNames = Object.keys(template);
  const entryNames = {};

  templateNames.forEach(templateName => {
    template[templateName].forEach(entryName => {
      const key = entryName.toLocaleLowerCase();
      entryNames[key] = templateName;
    });
  });

  const defaultEntryNames = Object.keys(entries);
  defaultEntryNames.forEach(defaultEntryName => {
    const htmlPluginKey = `HtmlWebpackPlugin_${defaultEntryName}`;
    if (config.plugins.get(htmlPluginKey)) {
      const htmlPluginOption = {};
      const entryTemplate = path.join(rootDir, 'public', entryNames[defaultEntryName] || 'index.html');

      if (fs.existsSync(entryTemplate)) {
        (htmlPluginOption as any).template = entryTemplate;
      }

      config.plugin(htmlPluginKey).tap((args) => [
        Object.assign(
          {},
          ...args,
          htmlPluginOption
        )
      ]);
    }
  });
}

export default plugin;
