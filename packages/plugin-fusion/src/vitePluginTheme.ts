import * as fs from 'fs';
import { formatPath } from '@builder/app-helpers';
import type { Plugin } from 'vite';

interface PluginOptions {
  themeFile?: string;
  iconFile?: string;
  themeConfig?: Record<string, string>;
}

const sassLangs = '\\.(sass|scss)($|\\?)';
const sassLangRE = new RegExp(sassLangs);

const isSASSRequest = (request: string): boolean => sassLangRE.test(request);
// delete empty lines
function deleteEmptyLine(str: string) {
  const filterLines = str.split('\n').filter((line) => {
    return line !== '';
  });

  filterLines.push('');
  return filterLines.join('\n');
}

function vitePluginTheme(options: PluginOptions): Plugin {
  const { themeFile, themeConfig, iconFile } = options;
  let mainSassFile = '';
  let themeFileVars = '';
  let themeConfigVars = '';
  if (themeFile) {
    themeFileVars = deleteEmptyLine(fs.readFileSync(themeFile).toString());
  }
  
  if (themeConfig) {
    themeConfigVars = Object.keys(themeConfig).map((themeKey) => {
      if (['nextPrefix', 'theme'].includes(themeKey)) {
        return false;
      } else {
        const value = themeConfig[themeKey];
        return `$${themeKey}: ${value};`;
      }
    }).filter(Boolean).join('\n');
  }

  return {
    name: 'vite:fusion-plugin-theme',
    enforce: 'pre',
    transform(code, id) {
      if (!code || !isSASSRequest(id)) {
        return null;
      }
      let prefixVars = '';
      if (themeConfig.nextPrefix && /@alifd[\\/]next[\\/](lib|es)[\\/](.+).scss$/.test(id)) {
        // @deprecated
        // 将 next 1.x 的 prefix 从 next- 改为自定义前缀，解决 0.x&1.x 混用的问题
        prefixVars = `$css-prefix: "${themeConfig.nextPrefix}";`;
      }

      let importVarsCode = '';
      if (!/^node_modules[\\/]/.test(id)) {
        importVarsCode = '@import \'@alifd/next/variables.scss\';';
      }

      let iconImport = '';
      // theme icon only inject once
      const needInjectIcon = !mainSassFile || mainSassFile === id;
      if (iconFile && needInjectIcon) {
        iconImport = `@import '${formatPath(iconFile)}';`;
        mainSassFile = id;
      }

      if (!prefixVars && !themeConfigVars && !themeFileVars && !importVarsCode) {
        return null;
      } else {
        return `${themeFileVars}\n${themeConfigVars}\n${prefixVars}\n${importVarsCode}\n${iconImport}\n${code}`;
      }
    }
  };
}

export default vitePluginTheme;