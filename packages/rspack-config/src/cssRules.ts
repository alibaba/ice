import { createRequire } from 'module';
import { sass, less } from '@ice/bundles';
import { getPostcssOpts } from '@ice/shared-config';
import type { Config } from '@ice/shared-config/types';
import type { Configuration } from '@rspack/core';

const require = createRequire(import.meta.url);

type CSSRuleConfig = [string, string?, Record<string, any>?];
interface Options {
  postcssOptions: Config['postcss'];
  rootDir: string;
  enableRpx2Vw: boolean;
  extensionAlias: string[];
}

const getCssRules = ({
  rootDir,
  postcssOptions,
  enableRpx2Vw,
  extensionAlias,
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
    ...extensionAlias.map<CSSRuleConfig>(ext => (ext[0] === '.' ? [ext.slice(1)] : [ext])),
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
