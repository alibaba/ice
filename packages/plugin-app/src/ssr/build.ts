import path from 'path';
import esbuild from 'esbuild';
import { createUnplugin } from 'unplugin';
import type { UnpluginOptions } from 'unplugin';

interface Options {
  entry: string;
  outDir: string;
  alias?: Record<string, string>;
  plugins?: UnpluginOptions[];
}

export async function buildEntry(options: Options): Promise<esbuild.BuildResult> {
  const { alias = {}, plugins = [], outDir, entry } = options;
  const aliasKey = Object.keys(alias);
  const resolveFilter = new RegExp(`^(${aliasKey.map((str) => {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }).join('|')})$`);

  return esbuild.build({
    outdir: outDir,
    entryPoints: [entry],
    bundle: true,
    // platform: 'node',
    format: 'esm',
    outExtension: { '.js': '.mjs' },
    // FIXME: react imported by plugin cannot be external
    // FIXME: output in JEST will use require
    external: process.env.JEST_TEST === 'true' ? [] : ['./node_modules/*', 'react'],
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