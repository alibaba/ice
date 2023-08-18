import * as path from 'path';
import * as fs from 'fs';
import { postcss } from '@ice/bundles';
import lodash from '@ice/bundles/compiled/lodash/index.js';
import type { Config } from './types.js';

const { mergeWith, isArray } = lodash;

interface Options {
  publicPath: string;
  postcssOptions: Config['postcss'];
  rootDir: string;
  enableRpx2Vw: boolean;
}

export default function getPostcssOpts({
  rootDir,
  userPostcssOptions,
  enableRpx2Vw,
}: {
  rootDir: string;
  userPostcssOptions: Options['postcssOptions'];
  enableRpx2Vw: boolean;
}): Options['postcssOptions'] & { implementation?: typeof postcss } {
  const postcssConfigPath = path.join(rootDir, 'postcss.config.js');
  const defaultPostcssOpts = {
    // lock postcss version
    implementation: postcss,
  };
  if (fs.existsSync(postcssConfigPath)) {
    return defaultPostcssOpts;
  } else {
    const defaultPostcssPlugins = [
      ['@ice/bundles/compiled/postcss-nested'],
      ['@ice/bundles/compiled/postcss-preset-env', {
        // Without any configuration options, PostCSS Preset Env enables Stage 2 features.
        stage: 3,
        autoprefixer: {
          // Disable legacy flexbox support
          flexbox: 'no-2009',
        },
        features: {
          'custom-properties': false,
        },
      }],
    ];
    if (enableRpx2Vw) {
      defaultPostcssPlugins.push(['@ice/bundles/compiled/postcss-plugin-rpx2vw']);
    }
    const postcssOpts = mergeWith(
      {
        ...defaultPostcssOpts,
        postcssOptions: {
          config: false,
          plugins: defaultPostcssPlugins,
        },
      },
      { postcssOptions: userPostcssOptions },
      (objValue, srcValue) => {
        if (isArray(objValue)) {
          return objValue.concat(srcValue);
        }
      },
    );
    return postcssOpts;
  }
}
