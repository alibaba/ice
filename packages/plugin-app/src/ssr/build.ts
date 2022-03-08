import path from 'path';
import esbuild from 'esbuild';
import { createUnplugin } from 'unplugin';
import type { UnpluginOptions } from 'unplugin';

interface Options {
  rootDir: string;
  entry: string;
  outdir: string;
  alias?: Record<string, string>;
  plugins?: UnpluginOptions[];
}

export async function buildEntry(options: Options): Promise<esbuild.BuildResult> {
  const { rootDir, alias = {}, plugins = [], outdir, entry } = options;
  const aliasKey = Object.keys(alias);
  const resolveFilter = new RegExp(`^(${aliasKey.map((str) => {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }).join('|')})$`);

  return esbuild.build({
    outdir: path.join(rootDir, outdir),
    entryPoints: [entry],
    bundle: true,
    // platform: 'node',
    format: 'esm',
    outExtension: { '.js': '.mjs' },
    // FIXME: react imported by plugin cannot be external
    external: ['./node_modules/*', 'react'],
    plugins: [
      // FIXME: alias for auth is not work
      {
        name: 'auth-alias',
        setup(build) {
          build.onResolve({ filter: /^@ice\/plugin-auth\/runtime\/Auth/ }, (args) => {
            return {
              path: path.join(alias['@ice/plugin-auth/runtime'], 'Auth.tsx'),
            };
          });
        },
      },
      {
        name: 'esbuild-alias',
        setup(build) {
          build.onResolve({ filter: resolveFilter }, (args) => ({
            path: alias[args.path],
          }));
        },
      },
      ...plugins.map(plugin => createUnplugin(() => plugin).esbuild()),
    ],
  });
}