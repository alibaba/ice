import * as path from 'path';
import * as fse from 'fs-extra';
import type { Plugin } from 'vite';
import { normalizePath } from 'vite';
import { init, parse, ImportSpecifier } from 'es-module-lexer';
import MagicString from 'magic-string';
import { createFilter } from '@rollup/pluginutils';
import * as findUp from 'find-up';

const REGEX_REQUIRE = /require\s*\(['"`]([^`"']+?)[`'"]\)/;

export default (): Plugin => {
  const include = ['**/*.ts', '**/*.js', '**/*.tsx', '**/*.jsx'];
  const exclude = 'node_modules/**';
  const filter = createFilter(include, exclude);
  let needSourcemap = false;
  return {
    name: 'vite-plugin-component-style',
    enforce: 'post',
    
    configResolved(resolvedConfig) {
      needSourcemap = !!resolvedConfig.build.sourcemap;
    },
    async transform(code, id) {
      if (!code || !filter(id)) {
        return null;
      }

      await init;
      let imports: readonly ImportSpecifier[] = [];
      try {
        imports = parse(code)[0];
      } catch (e) {
        console.log('imports error', e);
      }
      if (!imports.length) {
        return null;
      }

      let s: MagicString | undefined;
      const str = () => s || (s = new MagicString(code));
      for (let index = 0; index < imports.length; index++) {
        const { n, se } = imports[index];
        // eslint-disable-next-line no-continue
        if (!n || n.startsWith('.') || n.startsWith('@/') || path.isAbsolute(n)) continue;
        let packageJsonPath = '';
        try {
          packageJsonPath = findUp.sync('package.json', { cwd: require.resolve(n) });
        } catch (err) {
          // ignore errors
        }
        if (packageJsonPath) {
          const { stylePath, module, main } = fse.readJSONSync(packageJsonPath);
          if (stylePath) {
            const mainEntry = path.join(path.dirname(packageJsonPath), module || main);
            const styleFilePath = path.join(path.dirname(mainEntry), stylePath || 'style.js');
            if (fse.existsSync(styleFilePath)) {
              const matches = fse.readFileSync(styleFilePath, 'utf-8').match(new RegExp(REGEX_REQUIRE.source, 'g'));
              if (matches) {
                const styleStatements = matches.map((matchStr) => {
                  const [, requireSource] = matchStr.match(REGEX_REQUIRE);
                  return `import "${!requireSource.startsWith('.') ? requireSource : normalizePath(path.join(path.dirname(styleFilePath), requireSource))}"`;
                });
                str().prependRight(se, `;\n${styleStatements.join(';\n')}`);
              } else {
                // import style
                str().prependRight(se, `;\nimport "${normalizePath(styleFilePath)}"`);
              }
            }
            return {
              map: needSourcemap ? str().generateMap({ hires: true }) : null,
              code: str().toString(),
            };
          }
        }
      }
    }
  };
};