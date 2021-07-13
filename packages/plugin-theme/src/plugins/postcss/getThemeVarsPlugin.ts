import type { TransformCallback } from 'postcss';
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
export const getThemeVarsPlugin = (option: Option): TransformCallback => {
  const { themeVars } = option;

  return root => {
    root.walkDecls(decl => {
      if (decl.prop && decl.prop.slice(0, 2) === '--') {
        themeVars[decl.prop.slice(2)] = decl.value;
      }
    });
  };
};