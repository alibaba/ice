import path from 'path';
import { fileURLToPath } from 'url';
import { createRequire } from 'node:module';
import { REG_NODE_MODULES, REG_TEMPLATE } from '../../helper/index.js';
import type { MiniCombination } from './combination.js';

export interface IRule {
  test?: any;
  exclude?: any[];
  include?: any[];
  use?: any;
  enforce?: 'pre' | 'post';
  issuer?: any;
  loader?: any;
  loaders?: any;
  oneOf?: any;
  options?: any;
  query?: any;
  parser?: any;
  generator?: any;
  resource?: any;
  resourceQuery?: any;
  rules?: any;
  sideEffects?: boolean;
  type?: string;
  resolve?: any;
}

const require = createRequire(import.meta.url);
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const nodeModulesRegx = new RegExp(REG_NODE_MODULES, 'gi');

export class MiniWebpackModule {
  constructor(public combination: MiniCombination) {}

  getLoader(loaderName: string, options?: Record<string, any>) {
    return {
      loader: require.resolve(loaderName),
      options: options || {},
    };
  }

  getModules() {
    const { fileType, sourceRoot, buildAdapter } = this.combination.config;

    const rules: Array<IRule> = [
      {
        // template
        test: REG_TEMPLATE,
        type: 'asset/resource',
        generator: {
          filename: ({ filename }) => {
            const extname = path.extname(filename);
            if (filename.startsWith(`${sourceRoot}/`)) filename = filename.slice(sourceRoot.length + 1);
            return filename.replace(extname, fileType.templ).replace(nodeModulesRegx, 'npm');
          },
        },
        use: [this.getLoader(path.resolve(__dirname, './loaders/miniTemplateLoader'), {
          buildAdapter,
        })],
      },
      {
      test: new RegExp(`\\${fileType.xs || 'wxs'}$`),
        type: 'asset/resource',
        generator: {
        filename({ filename }) {
          return filename
            .replace(`${sourceRoot}/`, '')
            .replace(nodeModulesRegx, 'npm');
        },
      },
      use: [this.getLoader(path.resolve(__dirname, './loaders/miniXScriptLoader'))],
    },
    ];
    return { rules };
  }
}
