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
    // 'guide/start',
    // 'guide/upgrade',
    {
      type: 'category',
      label: '基础指南',
      collapsed: false,
      items: getDocsFromDir('guide/basic')
    },
    {
      type: 'category',
      label: '进阶指南',
      collapsed: false,
      items: getDocsFromDir('guide/advanced')
    },
  ],
  plugin: [
    {
      type: 'category',
      label: '插件开发',
      collapsed: false,
      items: getDocsFromDir('plugin/develop')
    },
    {
      type: 'category',
      label: '官方插件',
      collapsed: false,
      items: getDocsFromDir('plugin/list')
    },
  ],
  examples: getDocsFromDir('examples'),
};