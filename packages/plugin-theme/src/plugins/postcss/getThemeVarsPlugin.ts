import { plugin, TransformCallback, } from 'postcss';
import { ThemeVarsType } from '../../utils/themesUtil';

interface Option {
  themeVars: ThemeVarsType
}

/**
 * PostCss 插件
 * 
 * 获取主题包定义的所有变量
 * 
 * 具有副作用
 */
export const getThemeVarsPlugin = plugin('get-theme-files-vars', (option: Option): TransformCallback => {
  const { themeVars } = option;

  const scanVars = (root: any) => {
    root.walkDecls(decl => {
      if (decl.prop && decl.prop.slice(0, 2) === '--') {
        console.log(decl.prop.slice(2));
        themeVars[decl.prop.slice(2)] = decl.value;
      }
    });
  };

  return root => {
    scanVars(root);
  };
});