const { text } = require('@ali/ice-chart-develop-cli/schema');

// 文档地址： https://yuque.antfin-inc.com/alivis/material-supply/hn5mca
module.exports = () => {
  const config = {};
  config.styleProps = {
    title: text('title', '标题', '图表标题', '默认标题'),
  };

  config.dataProps = {
    data: {
      default: [], // 默认数据
    },
  };

  return config;
};