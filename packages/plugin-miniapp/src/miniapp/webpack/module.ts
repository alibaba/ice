import path from 'path';
import { fileURLToPath } from 'url';
import { createRequire } from 'node:module';
import { REG_TEMPLATE } from '../../constant.js';
import type { MiniappWebpackOptions } from '../../types.js';


interface IRule {
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

export class MiniWebpackModule {
  config: MiniappWebpackOptions;
  sourceRoot: string;

  constructor(config: MiniappWebpackOptions) {
    this.config = config;
    this.sourceRoot = 'src';
  }

  getLoader(loaderName: string, options?: Record<string, any>) {
    return {
      loader: require.resolve(loaderName),
      options: options || {},
    };
  }

  getModules() {
    const {
      fileType,
    } = this.config;

    const rules: Array<IRule> = [
      {
        // template
        test: REG_TEMPLATE,
        type: 'asset/resource',
        generator: {
          filename({ filename }) {
            const extname = path.extname(filename);
            return filename.replace(`${this.sourceRoot}/`, '').replace(extname, fileType.templ);
          },
        },
        use: [this.getLoader(path.resolve(__dirname, './loaders/miniTemplateLoader'))],
      },
    ];
    return { rules };
  }
}
