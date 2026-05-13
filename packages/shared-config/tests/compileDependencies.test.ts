import * as path from 'path';
import { fileURLToPath } from 'url';
import { expect, describe, it } from 'vitest';
import compilationPlugin from '../src/unPlugins/compilation';
import compileExcludes from '../src/compileExcludes';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** Bundler-style ids use forward slashes; match compileDependencies RegExp sources. */
const toPosix = (p: string) => p.split(path.sep).join('/');

/**
 * Mirrors compileDependencies -> compileIncludes for a single package name
 * (non-speed-up mode), so dependency paths under node_modules match.
 */
const compileIncludesForPkg = (pkg: string) => [new RegExp(`node_modules/?.+${pkg}/`)];

describe('compileDependencies (compilation transformInclude)', () => {
  const rootDir = path.join(__dirname, '..');

  const createPlugin = (compileIncludes: (string | RegExp)[]) =>
    compilationPlugin({
      rootDir,
      mode: 'production',
      fastRefresh: false,
      compileIncludes,
      compileExcludes,
      enableEnv: true,
    });

  it('includes .cjs files from a dependency matched by compileIncludes in the transpile pipeline', () => {
    const { transformInclude, transform } = createPlugin(compileIncludesForPkg('animejs'));
    const id = toPosix(path.join(rootDir, 'node_modules', 'animejs', 'dist', 'modules', 'index.cjs'));

    expect(transformInclude!(id)).toBe(true);

    const src = 'const o = null;\nconst z = o?.x;\nexport { z };\n';
    return expect(transform!.call({}, src, id)).resolves.toMatchObject({
      code: expect.any(String),
    });
  });

  it('still includes .mjs, .js, .jsx, .ts, and .tsx for matched dependencies', () => {
    const { transformInclude } = createPlugin(compileIncludesForPkg('animejs'));
    const base = toPosix(path.join(rootDir, 'node_modules', 'animejs', 'dist', 'modules', 'index'));
    expect(transformInclude!(`${base}.mjs`)).toBe(true);
    expect(transformInclude!(`${base}.js`)).toBe(true);
    expect(transformInclude!(`${base}.jsx`)).toBe(true);
    expect(transformInclude!(`${base}.ts`)).toBe(true);
    expect(transformInclude!(`${base}.tsx`)).toBe(true);
  });

  it('skips .cjs under node_modules when the package is not matched by compileIncludes', () => {
    const { transformInclude } = createPlugin(compileIncludesForPkg('animejs'));
    const id = toPosix(path.join(rootDir, 'node_modules', 'other-pkg', 'dist', 'index.cjs'));
    expect(transformInclude!(id)).toBe(false);
  });
});
