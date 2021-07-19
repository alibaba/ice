import { IPluginAPI } from 'build-scripts';
import { getDefaultTheme, getThemesName, addTemp } from '../utils/common';
import { setThemesData, parseThemesData } from '../utils/themesUtil';

const watchThemeFiles = async ({ applyMethod, log }: IPluginAPI, themesPath: string, _theme: string) => {
  applyMethod('watchFileChange', /src\/themes\/.*/, async (event: string) => {
    if (event === 'change' || event === 'add' || event === 'unlink') {
      const { themesNames, themesPathList } = await getThemesName(themesPath);

      log.warn(`主题文件发生改变 当前主题包列表：${themesNames.join(', ')}`);

      const { defaultName } = getDefaultTheme(themesNames, _theme);
      const initialThemesData = await parseThemesData(themesPathList, defaultName);
      setThemesData(initialThemesData);
      addTemp(applyMethod, defaultName, themesNames);
    }
  });
};

export { watchThemeFiles };