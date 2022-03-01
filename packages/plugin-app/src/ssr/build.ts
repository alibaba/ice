import path from 'path';
import esbuild from 'esbuild';

export async function buildServerEntry(options: any): Promise<esbuild.BuildResult> {
  const { rootDir } = options;

  const outdir = path.join(rootDir, 'build');
  const document = path.join(rootDir, 'src/document.jsx');

  // TODO：sync compiler
  return esbuild.build({
    outdir,
    entryPoints: [document],
    bundle: true,
    platform: 'node',
    external: ['./node_modules/*'],
  });
}