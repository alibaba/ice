import type { Plugin } from 'vite';
import { createFilter } from '@rollup/pluginutils';

// moment.js 中存在 require('./locale/' + name)，在 webpack 模式下会全量打包
// vite 模式自动注入 `import 'moment/dist/locale/zh-cn'` 语言包
export default (locales: string | string[]): Plugin => {
  let entryJs = '';
  const include = ['**/*.ts', '**/*.js', '**/*.tsx', '**/*.jsx'];
  const exclude = 'node_modules/**';
  const momentRegex = /moment[/\\]locale[/\\]/;
  const filter = createFilter(include, exclude);
  const momentLocales = typeof locales === 'string' ? [locales] : locales;
  return {
    name: 'vite-plugin-moment',
    enforce: 'pre',
    resolveId(id) {
      // use esm
      if (id.match(momentRegex)) {
        // moment/dist/locale/ 目录下为 esm 产物
        return id.replace(momentRegex, 'moment/dist/locale/');
      }
    },
    transform(code, id) {
      if (!entryJs && filter(id)) {
        entryJs = id;
      }
      if (entryJs === id && momentLocales) {
        // 自动注入 locale，如果源码中已依赖，构建打包后会被去重
        return `${momentLocales.map((locale) => `import 'moment/dist/locale/${locale}';`).join('\n')}\n${code}`;
      }
      return null;
    }
  };
};
