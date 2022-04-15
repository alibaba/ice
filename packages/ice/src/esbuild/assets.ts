import * as path from 'path';
import * as mrmime from 'mrmime';
import fs from 'fs-extra';

const ASSET_TYPES = [
  // images
  'png',
  'jpe?g',
  'gif',
  'svg',
  'webp',
  // fonts
  'woff2?',
  'eot',
  'ttf',
];

const ASSETS_RE = new RegExp(`\\.(${ASSET_TYPES.join('|')})(\\?.*)?$`);

interface AssetsManifest {
  publicPath: string;
  assets?: {
    [assetPath: string]: string;
  };
}

const createAssetsPlugin = (manifestPath: string, rootDir: string) => ({
  name: 'esbuild-assets',
  setup(build) {
    const assetsManifest: AssetsManifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
    build.onLoad({ filter: ASSETS_RE }, async (args) => {
      const relativePath = path.relative(rootDir, args.path);
      let content = await fs.promises.readFile(args.path);
      let url = '';
      const contentHash = assetsManifest!.assets[relativePath];
      if (contentHash) {
        const basename = path.basename(args.path);
        const extname = path.extname(basename);
        const ext = extname.substring(1);
        const name = basename.slice(0, -extname.length);
        // assets/[name].[hash:8][ext]
        url = `${assetsManifest.publicPath}assets/${name}.${contentHash}.${ext}`;
      } else {
        url = `data:${mrmime.lookup(args.path)};base64,${content.toString('base64')}`;
      }
      return {
        contents: `export default ${JSON.stringify(url)}`,
        loader: 'js',
      };
    });
  },
});

export default createAssetsPlugin;