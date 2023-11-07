import type { Configuration } from '@rspack/core';

const getAssetsRule = () => {
  const assetsRule = [
    [/\.woff2?$/], [/\.ttf$/], [/\.eot$/], [/\.svg$/],
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
      ...(urlCondition ? {
        parser: {
          dataUrlCondition: {
            maxSize: 8 * 1024, // 8kb
          },
        },
      } : {}),
      ...(typeof ruleOption === 'object' ? ruleOption : {}),
    };
  }) as Configuration['module']['rules']).concat(queryRules);
};

export default getAssetsRule;
