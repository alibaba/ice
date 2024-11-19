import Template from './template.js';
import { components } from './components.js';

export default {
  globalObject: 'my',
  projectConfigJson: 'mini.project.json',
  fileType: {
    templ: '.axml',
    style: '.acss',
    config: '.json',
    script: '.js',
    xs: '.sjs',
    skeletonMidExt: '.loading',
  },
  template: new Template(),
  modifyBuildAssets,
  components,
};

function getIsBuildPluginPath(filePath, isBuildPlugin) {
  return isBuildPlugin ? `plugin/${filePath}` : filePath;
}

async function modifyBuildAssets(assets: any, miniPlugin: any) {
    const pages: string[] = [];

    // 筛选出使用了自定义组件的页面
    miniPlugin.pages.forEach(page => {
      const config = miniPlugin.filesConfig[miniPlugin.getConfigFilePath(page.name)].content;
      if (!page.isNative && config?.hasOwnProperty('usingComponents') && Object.keys(config.usingComponents).length) {
        pages.push(page.name);
      }
    });

    if (!pages.length) return;

    const baseXml = assets[getIsBuildPluginPath('base.axml', miniPlugin.options.isBuildPlugin)].source();

    pages.forEach(page => {
      const templateName = `${page}.axml`;
      const assetsItem = assets[templateName];
      const src = assetsItem._value ? assetsItem._value.toString() : assetsItem.source();
      let relativePath;
      const templateCaller = src.replace(/<import src="(.*)base\.axml"\/>/, (_, $1) => {
        relativePath = $1;
        return '';
      });
      const main = baseXml.replace(/<import-sjs name="xs" from="(.*)utils.sjs" \/>/, () => {
        return src.includes('<import-sjs name="xs"')
          ? ''
          : `<import-sjs name="xs" from="${relativePath}utils.sjs" />`;
      });

      const res = `${templateCaller}
${main}`;
      assets[templateName] = {
        size: () => res.length,
        source: () => res,
      };
    });
    if (miniPlugin.options.isBuildPlugin) {
      const miniProjectJSONStr = JSON.stringify({
        miniprogramRoot: 'miniprogram',
        pluginRoot: 'plugin',
        compileType: 'plugin',
      }, null, 2);
      assets['mini.project.json'] = {
        size: () => miniProjectJSONStr.length,
        source: () => miniProjectJSONStr,
      };
      const pluginJSON = JSON.parse(assets['/plugin/plugin.json'].source());
      pluginJSON.publicPages = pluginJSON.pages;
      pluginJSON.pages = Object.values(pluginJSON.publicPages);
      const pluginJSONStr = JSON.stringify(pluginJSON, null, 2);
      assets['/plugin/plugin.json'] = {
        size: () => pluginJSONStr.length,
        source: () => pluginJSONStr,
      };
    }
}
