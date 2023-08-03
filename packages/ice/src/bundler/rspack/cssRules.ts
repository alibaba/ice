import { createRequire } from 'module';
import { sass, less } from '@ice/bundles';
import { getPostcssOpts } from '@ice/webpack-config';
import type { Config } from '@ice/webpack-config/types';
import type { Configuration } from '@rspack/core';

const require = createRequire(import.meta.url);

type CSSRuleConfig = [string, string?, Record<string, any>?];
interface Options {
  postcssOptions: Config['postcss'];
  rootDir: string;
  enableRpx2Vw: boolean;
}

const getCssRules = ({
  rootDir,
  postcssOptions,
  enableRpx2Vw,
}: Options): Configuration['module']['rules'] => {
  const rules: CSSRuleConfig[] = [
    ['css'],
    ['less', require.resolve('@ice/bundles/compiled/less-loader'), {
      lessOptions: { javascriptEnabled: true },
      implementation: less,
    }],
    ['scss', require.resolve('@ice/bundles/compiled/sass-loader'), {
      implementation: sass,
    }],
  ];

  const defailtOpts = {
    sourceMap: true,
  };
  const postcssOpts = getPostcssOpts({ rootDir, userPostcssOptions: postcssOptions, enableRpx2Vw });
  const cssRules = rules.map(([suffix, loader, options]) => {
    return {
      test: new RegExp(`\\.${suffix}$`),
      use: [
        {
          loader: require.resolve('@ice/bundles/compiled/postcss-loader'),
          options: {
            ...defailtOpts,
            ...postcssOpts,
          },
        },
        loader && {
          loader,
          options: { ...defailtOpts, ...options },
        },
      ].filter(Boolean),
      type: 'css/auto',
    };
  });
  return cssRules;
};

export default getCssRules;
