import * as path from 'path';

export default (api, renderData, { entryName, pageConfig }) => {
  const { context: { userConfig: { web: webConfig = {} }, rootDir }, getValue } = api;
  const staticConfig = getValue('staticConfig');

  let tabBarPath = path.join(getValue('TEMP_PATH'), 'TabBar/index');
  let showTabBar = false;
  const tabBarConfig = staticConfig.tabBar;

  if (tabBarConfig) {
    if (tabBarConfig.custom) {
      tabBarPath = path.join(rootDir, 'src/components/CustomTabBar/index');
      showTabBar = tabBarConfig.list.indexOf(entryName) > -1;
    } else {
      showTabBar = tabBarConfig.items.some(item => item.pageName === entryName);
    }
  }

  return {
    ...renderData,
    hydrate: Boolean(webConfig.hydrate || webConfig.ssr || webConfig.snapshot || webConfig.staticExport),
    tabBarPath,
    showTabBar,
    tabBarConfig: JSON.stringify(tabBarConfig),
    pageConfig: JSON.stringify(pageConfig),
    entryName,
  };
};
