import crypto from 'crypto';
import type webpack from 'webpack';

interface TestModule {
  size: Function;
  nameForCondition: Function;
}
interface NameModule {
  libIdent?: Function;
  type: string;
}

export const FRAMEWORK_BUNDLES = [
  // runtime dependencies
  'react', 'react-dom', '@ice/runtime', 'react-router', 'react-router-dom',
];

const getSplitChunksConfig = (rootDir: string): webpack.Configuration['optimization']['splitChunks'] => {
  const frameworkRegex = new RegExp(`[\\\\/]node_modules[\\\\/](${FRAMEWORK_BUNDLES.join('|')})[\\\\/]`);
  return {
    chunks: 'all',
    cacheGroups: {
      framework: {
        chunks: 'all',
        name: 'framework',
        test(module: TestModule) {
          const resource = module.nameForCondition && module.nameForCondition();
          if (!resource) {
            return false;
          }
          return frameworkRegex.test(resource);
        },
        priority: 40,
        enforce: true,
      },
      lib: {
        test(module: TestModule) {
          return module.size() > 160000 && /node_modules[/\\]/.test(module.nameForCondition() || '');
        },
        name(module: NameModule) {
          const hash = crypto.createHash('sha1');
          if (!module.libIdent) {
            throw new Error(
              `Encountered unknown module type: ${module.type}.`,
            );
          }
          hash.update(module.libIdent({ context: rootDir }));
          return hash.digest('hex').substring(0, 8);
        },
      },
    },
    maxInitialRequests: 25,
    minSize: 20000,
  };
};

export default getSplitChunksConfig;
