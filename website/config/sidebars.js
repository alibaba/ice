/*
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
const getDocsFromDir = require('../scripts/getDocsFromDir');

module.exports = {
  docs: [
    'guide/about',
    'guide/start',
    // 'guide/practice',
    {
      type: 'category',
      label: 'ICE 指南',
      collapsed: false,
      items: getDocsFromDir('guide/basic'),
    },
    {
      type: 'category',
      label: '最佳实践',
      collapsed: false,
      items: getDocsFromDir('guide/best-practices'),
    },
    {
      type: 'category',
      label: '插件',
      collapsed: false,
      items: getDocsFromDir('guide/plugins'),
    },
  ],
  examples: getDocsFromDir('examples'),
};
