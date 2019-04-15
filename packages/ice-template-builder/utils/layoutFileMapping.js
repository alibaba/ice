/**
 * Layout 文件映射表
 * 根据用户输入的数据进行组装
 * 生成自定义布局模板
 */
const LAYOUT_TEMPLATE_FILE_MAPPING = {
  aside: ['components/Aside/*'],
  header: ['components/Header/*', 'components/Logo/*'],
  footer: ['components/Footer/*', 'components/Logo/*'],
  layout: ['components/Layout/*'],
};

module.exports = LAYOUT_TEMPLATE_FILE_MAPPING;
