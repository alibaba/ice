import type { ModifyWebpackConfig } from '@ice/types/esm/config';

type AssetRuleConfig = [RegExp, Record<string, any>?, boolean?];

function configAssetsRule(config: AssetRuleConfig) {
  const [test, dataUrl = {}, inlineLimit = true] = config;

  return {
    test,
    type: 'asset',
    parser: {
      ...(inlineLimit ? {
        dataUrlCondition: {
          maxSize: 8 * 1024, // 8kb
        },
      } : {}),
    },
    generator: {
      dataUrl,
    },
  };
}

const assets: ModifyWebpackConfig = (config) => {
  const assetsRule = ([
    [/\.woff2?$/, { mimetype: 'application/font-woff' }],
    [/\.ttf$/, { mimetype: 'application/octet-stream' }],
    [/\.eot$/, { mimetype: 'application/vnd.ms-fontobject' }],
    [/\.svg$/, { mimetype: 'image/svg+xml' }, false],
    [/\.(png|jpg|webp|jpeg|gif)$/i],
  ] as AssetRuleConfig[]).map((config) => configAssetsRule(config));
  config.module.rules.push(...assetsRule);
  return config;
};

export default assets;
