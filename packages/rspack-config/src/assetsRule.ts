import type { Configuration } from '@rspack/core';

const getAssetsRule = () => {
  const assetsRule = [
    [/\.woff2?$/, { mimetype: 'application/font-woff' }],
    [/\.ttf$/, { mimetype: 'application/octet-stream' }],
    [/\.eot$/, { mimetype: 'application/vnd.ms-fontobject' }],
    [/\.svg$/, { mimetype: 'image/svg+xml' }, false],
    [/\.(png|jpg|webp|jpeg|gif)$/i],
  ];

  const queryRules = [{
    resourceQuery: /raw/,
    type: 'asset/source',
  }, {
    resourceQuery: /url/,
    type: 'asset/resource',
  }];

  return (assetsRule.map(([test, ruleOption = {}, urlCondition = true]) => {
    return {
      test,
      type: 'asset',
      parser: {
        ...(urlCondition ? {
          dataUrlCondition: {
            maxSize: 8 * 1024, // 8kb
          },
        } : {}),
      },
      ...(typeof ruleOption === 'object' ? ruleOption : {}),
    };
  }) as Configuration['module']['rules']).concat(queryRules);
};

export default getAssetsRule;
