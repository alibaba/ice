import type { ModifyWebpackConfig } from '@ice/types/esm/config';

type AssetRuleConfig = [RegExp, Record<string, any>?];

function configAssetsRule(config: AssetRuleConfig) {
  const [test, dataUrl] = config;
  return {
    test,
    generator: {
      dataUrl,
    },
    parser: {
      dataUrlCondition: {
        maxSize: 8 * 1024, // 8kb
      },
    },
  };
}

const assets: ModifyWebpackConfig = (config) => {
  const assetsRule = ([
    [/\.woff2?$/, { mimetype: 'application/font-woff' }],
    [/\.ttf$/, { mimetype: 'application/octet-stream' }],
    [/\.eot$/, { mimetype: 'application/vnd.ms-fontobject' }],
    [/\.svg$/, { mimetype: 'image/svg+xml' }],
    [/\.(png|jpg|webp|jpeg|gif)$/i],
  ] as AssetRuleConfig[]).map((config) => configAssetsRule(config));
  config.module.parser = {
    javascript: {
      url: 'relative',
    },
  };
  config.module.generator = {
    asset: {
      filename: 'assets/[name].[hash:8][ext]',
    },
  };
  config.module.rules.push(...assetsRule);
  return config;
};

export default assets;
