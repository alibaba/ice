import { TransformCallback } from 'postcss';
import type { ThemeVarsType } from '../../utils/themesUtil';

interface Option {
  getVarsMap: () => ThemeVarsType
  type?: 'sass' | 'less'
}

/**
 * PossCss 插件
 * 
 * 将 Less/Sass 声明的变量的 value 转为 css var
 * 
 */
export const declVarPlugin = (option: Option): TransformCallback => {
  const { getVarsMap, type = 'less' } = option;

  return root => {
    const varsMap = getVarsMap();

    if (type === 'sass') {
      root.walkDecls(decl => {
        if (decl.prop) {
          const str = decl.prop;
          const name = str.slice(1);

          if (varsMap[name] && str[0] === '$') {
            decl.value = `var(--${name}, ${varsMap[name]})`;
          }
        }
      });
      return;
    }

    if (type === 'less') {
      root.walkAtRules(atRule => {
        if (atRule.name) {
          const str = atRule.name;
          const name = str.slice(0, str.length - 1);

          if (varsMap[name]) {
            atRule.params = `var(--${name}, ${varsMap[name]})`;
          }
        }
      });
    }
  };
};
