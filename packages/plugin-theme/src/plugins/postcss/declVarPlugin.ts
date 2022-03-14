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
  const isVar = (e: string) => e.startsWith('var(');
  const vatFlag = type === 'less' ? '@' : '$';

  return root => {
    const varsMap = getVarsMap();

    root.walkDecls(decl => {
      if (decl.prop && decl.prop[0] !== vatFlag) {
        const value = decl.value.slice(1);

        if (varsMap[value]) {
          decl.value = isVar(value) ? `var(--${value})` : `var(--${value}, ${varsMap[value]})`;
        }
      }
    });
  };
};
